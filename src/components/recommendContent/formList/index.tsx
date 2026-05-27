import { useState, useRef, useEffect } from 'react';
import FormContainer from '@/components/recommendContent/formList/formContainer';
import CheckBox from '@/components/recommendContent/formList/checkBox';
import TimeSlider from '@/components/recommendContent/formList/timeSlider';
import ToggleSwitch from '@/components/recommendContent/formList/toggleSwitch';
import InfoIcon from '@/assets/icons/score-icons/video-detail/info-icon.svg?react';
import { postRecommend } from '@/api/command';
import useRecommendStore from '@/stores/useRecommendStore';
import useUserStore from '@/stores/useUserStore';
import { useShallow } from 'zustand/react/shallow';

const categories = [
  '영화 / 애니메이션',
  '자동차',
  '음악',
  '동물',
  '스포츠',
  '여행 / 이벤트',
  '게임',
  '인물 / 블로그',
  '코미디',
  '엔터테인먼트',
  '뉴스 / 정치',
  '노하우 / 스타일',
  '교육',
  '과학 / 기술',
];

const MOBILE_CATEGORY_PREVIEW = 5;

interface FormListProps {
  onSearch?: () => void;
  initialKeyword?: string;
}

const FormList = ({ onSearch, initialKeyword = '' }: FormListProps) => {
  const [collapsed, setCollapsed] = useState(() => {
    const { autoSelectSubject, formInput } = useRecommendStore.getState();
    return autoSelectSubject && !!formInput.keywords;
  });
  const [searched, setSearched] = useState(() => {
    const { autoSelectSubject, formInput } = useRecommendStore.getState();
    return autoSelectSubject && !!formInput.keywords;
  });
  const channelURL = useUserStore(s => s.channelURL);
  const [errorMsg, setErrorMsg] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
  const { setRecommendations, setFormInput, formInput } = useRecommendStore(
    useShallow(s => ({
      setRecommendations: s.setRecommendations,
      setFormInput: s.setFormInput,
      formInput: s.formInput,
    })),
  );

  const isLoggedIn = !!channelURL;
  const [keyword, setKeyword] = useState(formInput.keywords || initialKeyword);
  const [useChannelData, setUseChannelData] = useState(isLoggedIn);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    // formInput.category가 "{카테고리1, 카테고리2}" 형식이면 파싱
    if (formInput.category) {
      const parsed = formInput.category.replace(/[{}]/g, '').split(', ').filter(Boolean);
      return parsed;
    }
    return [];
  });
  const [time, setTime] = useState(formInput.time || 0);
  const [categoryExpanded, setCategoryExpanded] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [formInput.videoType, categoryExpanded]);

  const handleCategoryToggle = (category: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(c => c !== category),
    );
  };

  const handleReset = () => {
    setKeyword('');
    setSelectedCategories([]);
    setTime(0);
  };

  const handleSearch = async () => {
    const missing: string[] = [];
    if (!keyword.trim()) missing.push('Keyword');
    if (selectedCategories.length === 0) missing.push('Category');
    if (formInput.videoType === 'long' && time === 0) missing.push('Time');

    if (missing.length > 0) {
      setErrorMsg(`${missing.join(', ')}을(를) 입력해주세요.`);
      return;
    }

    setErrorMsg('');
    setCollapsed(true);
    setSearched(true);

    const requestURL = useChannelData ? channelURL || '' : '';

    try {
      const res = await postRecommend({
        requestURL,
        keywords: keyword,
        category: `{${selectedCategories.join(', ')}}`,
        videoType: formInput.videoType,
      });
      setRecommendations(res);
      setFormInput({
        requestURL,
        keywords: keyword,
        category: `{${selectedCategories.join(', ')}}`,
        time: formInput.videoType === 'long' ? time : null,
        videoType: formInput.videoType,
      });

      onSearch?.();
    } catch (err) {
      console.error('추천 요청 실패:', err);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-end gap-10 rounded-xl bg-accent-soft px-8 pb-12 pt-18 max-md:w-full max-md:gap-6 max-md:px-3 max-md:pb-8 max-md:pt-12">
      <div
        ref={contentRef}
        className={`flex flex-col w-full collapse-panel gap-4 ${!collapsed ? 'is-open' : ''}`}
        style={
          {
            '--collapse-max-height': collapsed ? '0px' : `${contentHeight}px`,
            '--collapse-opacity': collapsed ? 0 : 1,
          } as React.CSSProperties
        }
      >
        <div className="flex w-full justify-center whitespace-pre-line text-center typo-body1-medium text-muted max-md:text-[12px] max-md:leading-[18px]">
          {
            '원하는 키워드와 채널 정보를 입력하면\nAI가 트렌드와 채널 데이터를 분석해 맞춤 콘텐츠 아이디어를 추천합니다.'
          }
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-6 overflow-visible rounded-xl border border-black/10 bg-white px-8 py-9 max-md:w-full max-md:gap-4 max-md:px-3 max-md:py-5">
          <div className="flex w-full flex-col items-start gap-12 overflow-visible pb-14 pl-6 pr-4 max-md:gap-6 max-md:pb-6 max-md:pl-0 max-md:pr-0">
            <div className="flex w-full items-start gap-6 overflow-visible max-md:flex-col max-md:gap-4">
              <div className="min-w-0 w-full flex-1">
                <FormContainer
                  title="Keyword"
                  placeholder="예) 여행브이로그 / 다이어트 식단"
                  value={keyword}
                  onChange={setKeyword}
                />
              </div>
              <div className="min-w-0 w-full flex-1">
                <FormContainer
                  title="채널 스타일 분석"
                  titleAddon={
                    <div className="relative group overflow-visible">
                      <InfoIcon className="h-4 w-4 shrink-0 cursor-pointer text-brand-tertiary" />
                      <div className="absolute bottom-full left-1/2 z-50 mb-2 invisible -translate-x-1/2 rounded-xl border border-brand bg-white/85 px-3 py-2 text-black opacity-0 typo-body6 whitespace-nowrap backdrop-blur-[27px] transition-all group-hover:visible group-hover:opacity-100">
                        {isLoggedIn
                          ? '내 채널의 콘텐츠 성향을 분석해 추천 결과에 반영합니다.'
                          : '로그인 후 내 채널 데이터를 분석해 맞춤형 주제를 추천할 수 있습니다.'}
                      </div>
                    </div>
                  }
                  titleRight={
                    <ToggleSwitch
                      checked={useChannelData}
                      onChange={setUseChannelData}
                      disabled={!isLoggedIn}
                    />
                  }
                >
                  <div className="flex h-12 items-center self-stretch truncate rounded-lg border border-transparent bg-accent-soft px-3 py-1 typo-body2 text-muted max-md:h-10">
                    {!isLoggedIn
                      ? '로그인 후 사용 가능'
                      : useChannelData
                        ? channelURL
                        : '키워드·카테고리만으로 추천'}
                  </div>
                </FormContainer>
              </div>
            </div>
            <div className="flex w-196 flex-col items-start gap-4 max-md:w-full max-md:gap-3">
              <div className="typo-body1-medium text-primary">Category</div>
              <div className="grid h-78 grid-cols-3 content-start gap-4 self-stretch max-md:h-auto max-md:grid-cols-1 max-md:gap-2">
                {categories.map((category, index) => (
                  <div
                    key={category}
                    className={`w-full ${
                      !categoryExpanded && index >= MOBILE_CATEGORY_PREVIEW ? 'max-md:hidden' : ''
                    }`}
                  >
                    <CheckBox
                      label={category}
                      checked={selectedCategories.includes(category)}
                      onChange={checked => handleCategoryToggle(category, checked)}
                    />
                  </div>
                ))}
              </div>
              {categories.length > MOBILE_CATEGORY_PREVIEW && (
                <button
                  type="button"
                  onClick={() => setCategoryExpanded(prev => !prev)}
                  className="hidden items-center gap-1 text-placeholder typo-label active:text-brand max-md:flex"
                >
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${categoryExpanded ? 'rotate-180' : 'rotate-0'}`}
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {categoryExpanded ? '접기' : '펼치기'}
                </button>
              )}
            </div>
            {formInput.videoType === 'long' && (
              <div className="flex w-196 flex-col items-start gap-4 max-md:w-full max-md:gap-3">
                <div className="typo-body1-medium text-primary">Time</div>
                <TimeSlider value={time} onChange={setTime} />
              </div>
            )}
            <div className="flex w-196 justify-end max-md:w-full">
              <div
                onClick={handleReset}
                className="flex cursor-pointer items-center justify-center rounded-md bg-reset px-3 py-1.5 typo-label text-white transition-colors hover:bg-reset-hover active:bg-reset-active"
              >
                초기화
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex w-full items-center max-md:flex-col max-md:gap-3 max-md:pt-1">
        {errorMsg && (
          <div className="absolute left-0 text-sm text-red-500 max-md:static max-md:text-center max-md:text-xs">
            {errorMsg}
          </div>
        )}
        <div
          onClick={handleSearch}
          className="mx-auto flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-brand-strong px-5 py-2.5 text-center text-white typo-body1-medium tracking-widest active:bg-brand-deep max-md:px-4 max-md:py-2 max-md:tracking-wide"
        >
          {searched ? '다시 검색' : '검색'}
        </div>
        {searched && (
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="absolute right-0 flex cursor-pointer items-center gap-1 text-placeholder typo-label active:text-brand max-md:static max-md:justify-center"
          >
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${collapsed ? 'rotate-0' : 'rotate-180'}`}
              viewBox="0 0 16 16"
            >
              <path
                d="M4 6l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {collapsed ? '펼치기' : '접기'}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormList;
