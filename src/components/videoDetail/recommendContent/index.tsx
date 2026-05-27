import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentItem from './contentItem';
import TimeSlider from '@/components/recommendContent/formList/timeSlider';
import SparkIcon from '@/assets/icons/score-icons/video-detail/sparkle-icon.svg?react';
import InfoIcon from '@/assets/icons/score-icons/video-detail/info-icon.svg?react';
import useCurrentVideoStore from '@/stores/useCurrentVideoStore';
import useUserStore from '@/stores/useUserStore';
import useRecommendStore from '@/stores/useRecommendStore';
import { postRecommend } from '@/api/command';
import { fetchAIContent } from '@/utils/fetchAIContent';
import { parseBraceList, toBraceFormat } from '@/utils/formatBraceList';

interface RecommendItem {
  suggestedTitle: string;
  conceptSummary: string;
}

const FADE_DURATION_MS = 300;

const RecommendContent = () => {
  const navigate = useNavigate();
  const videoAnalysis = useCurrentVideoStore(s => s.videoAnalysis);
  const isLoading = useCurrentVideoStore(s => s.isLoading);
  const channelURL = useUserStore(s => s.channelURL);
  const setFormInput = useRecommendStore(s => s.setFormInput);
  const setRecommendationsStore = useRecommendStore(s => s.setRecommendations);
  const setSelectedSubjectIndex = useRecommendStore(s => s.setSelectedSubjectIndex);
  const setAutoSelectSubject = useRecommendStore(s => s.setAutoSelectSubject);

  const [showForm, setShowForm] = useState(true);
  const [time, setTime] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resultsOpacity, setResultsOpacity] = useState(1);

  // 키워드, 카테고리, 영상 타입은 videoInfo에서 가져옴
  const keywords = videoAnalysis?.videoInfo?.keyword ?? '';
  const rawCategory = videoAnalysis?.videoInfo?.category ?? '';
  const category = toBraceFormat(rawCategory);
  const categoryList = parseBraceList(rawCategory);
  const videoType = videoAnalysis?.videoInfo?.videoType ?? 'long';
  const isShortForm = videoType === 'short';

  // 추천 결과
  const [recommendations, setRecommendations] = useState<RecommendItem[]>([]);

  const fetchRecommendations = useCallback(
    async (options?: { validateTime?: boolean; animateReplace?: boolean }) => {
      const { validateTime = false, animateReplace = false } = options ?? {};

      if (validateTime && !isShortForm && time === 0) {
        setErrorMsg('영상 길이(Time)를 입력해주세요.');
        return;
      }
      setErrorMsg('');

      if (!channelURL) return;

      setIsSearching(true);

      try {
        const res = await postRecommend({
          requestURL: channelURL,
          keywords,
          category,
          videoType,
        });
        const nextRecommendations = res.slice(0, 3);

        if (animateReplace && recommendations.length > 0) {
          setResultsOpacity(0);
          await new Promise(resolve => window.setTimeout(resolve, FADE_DURATION_MS));
          setRecommendations(nextRecommendations);
          requestAnimationFrame(() => setResultsOpacity(1));
        } else {
          setRecommendations(nextRecommendations);
          setResultsOpacity(1);
          setShowForm(false);
        }
      } catch (err) {
        console.error('추천 요청 실패:', err);
      } finally {
        setIsSearching(false);
      }
    },
    [category, channelURL, isShortForm, keywords, recommendations.length, time, videoType],
  );

  const handleSearch = () => {
    void fetchRecommendations({ validateTime: true });
  };

  const handleResearch = () => {
    void fetchRecommendations({ animateReplace: true });
  };

  const handleVideoRecommend = (index: number) => {
    if (!channelURL) return;

    const selectedItem = recommendations[index];
    const title = selectedItem?.suggestedTitle ?? '';
    const concept = selectedItem?.conceptSummary ?? '';

    setFormInput({
      requestURL: channelURL,
      keywords,
      category,
      time: isShortForm ? null : time,
      videoType,
    });
    setRecommendationsStore(recommendations);
    setSelectedSubjectIndex(index);
    setAutoSelectSubject(true);

    fetchAIContent({
      requestURL: channelURL,
      title,
      concept,
      keywords,
      category,
      videoType,
      time: isShortForm ? null : time,
    });

    navigate('/recommend');
  };

  return (
    <div className="flex flex-col w-full px-6 py-7 justify-center items-start gap-3.5 bg-white rounded-xl border-[0.1px] border-[#8257B4]">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-1 text-[#6452CE] typo-body4-semibold">
          <SparkIcon className="w-4 h-4" />
          이어서 만들면 좋은 콘텐츠
        </div>
        {!showForm && (
          <div
            onClick={isSearching ? undefined : handleResearch}
            className={`px-3 py-1 rounded-md text-white typo-body6 transition-colors ${
              isSearching
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#7C5CFF] hover:bg-[#C4B8FF] active:bg-[#C4B8FF] hover:text-[#6452CE] active:text-[#6452CE] cursor-pointer'
            }`}
          >
            {isSearching ? '검색 중...' : '다시 검색'}
          </div>
        )}
      </div>

      <div className="relative w-full">
        {/* 검색 폼 오버레이 */}
        {showForm && (
          <div className="flex flex-col w-full gap-5 py-4">
            {isLoading ? (
              <div className="flex w-full justify-center items-center py-8 text-gray-400 animate-loading-pulse typo-body5">
                데이터를 불러오는 중...
              </div>
            ) : (
              <div className="flex flex-col w-full gap-5 p-5 rounded-xl border-[0.1px] border-[#8257B4]">
                <div className="flex w-full items-start justify-between gap-6 max-md:flex-col max-md:gap-5">
                  {/* 키워드 (고정) */}
                  <div className="flex flex-col w-[30%] gap-2 max-md:w-full">
                    <div className="flex items-center gap-1.5 text-black typo-body4-semibold">
                      Keyword
                      <div className="relative group">
                        <InfoIcon className="w-4 h-4 text-[#8257B4] cursor-pointer" />
                        <div className="absolute left-0 bottom-full mb-2 px-3 py-2 bg-white/85 backdrop-blur-[27px] text-black typo-body6 rounded-xl border border-[#6B42FF] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          해당 영상의 키워드를 기반으로 AI가 콘텐츠를 추천합니다.
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2.5 rounded-lg bg-[#F5EFFF] border border-[#8257B4] text-[#6452CE] typo-body5">
                      {keywords || '키워드 없음'}
                    </div>
                  </div>

                  {/* 카테고리 (고정) */}
                  <div className="flex flex-col w-[30%] min-w-0 gap-2 max-md:w-full">
                    <div className="flex items-center gap-1.5 text-black typo-body4-semibold">
                      Category
                      <div className="relative group">
                        <InfoIcon className="w-4 h-4 text-[#8257B4] cursor-pointer" />
                        <div className="absolute left-0 bottom-full mb-2 px-3 py-2 bg-white/85 backdrop-blur-[27px] text-black typo-body6 rounded-xl border border-[#6B42FF] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          해당 영상의 카테고리를 기반으로 AI가 콘텐츠를 추천합니다.
                        </div>
                      </div>
                    </div>
                    <div
                      className="px-4 py-2.5 rounded-lg bg-[#F5EFFF] border border-[#8257B4] text-[#6452CE] typo-body5 truncate"
                      title={categoryList.length > 0 ? categoryList.join(', ') : undefined}
                    >
                      {categoryList.length > 0 ? categoryList.join(', ') : '카테고리 없음'}
                    </div>
                  </div>

                  {/* 시간 설정 */}
                  <div className="flex flex-col w-[30%] gap-6 max-md:w-full">
                    <div className="text-black typo-body4-semibold">Time</div>
                    {isShortForm ? (
                      <div className="text-gray-400 animate-loading-pulse typo-body5">
                        숏폼은 영상 길이를 설정할 수 없습니다.
                      </div>
                    ) : (
                      <TimeSlider value={time} onChange={setTime} compact />
                    )}
                  </div>
                </div>

                {/* 검색 버튼 */}
                <div className="flex w-full items-center relative">
                  {errorMsg && (
                    <div className="absolute right-0 text-red-500 typo-body5">{errorMsg}</div>
                  )}
                  <div
                    onClick={isSearching ? undefined : handleSearch}
                    className={`flex py-2 px-8 mx-auto justify-center items-center rounded-lg typo-body4-semibold text-white transition-colors ${
                      isSearching
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#7C5CFF] hover:bg-[#6344DD] active:bg-[#8B6FFF] cursor-pointer'
                    }`}
                  >
                    {isSearching ? '검색 중...' : '콘텐츠 추천 받기'}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 추천 결과 */}
        {!showForm && (
          <div
            className="flex w-full justify-center items-stretch gap-5 py-4 transition-opacity ease-in-out max-md:flex-col max-md:gap-4 max-md:overflow-x-auto max-md:script-scroll"
            style={{ opacity: resultsOpacity, transitionDuration: `${FADE_DURATION_MS}ms` }}
          >
            {recommendations.length > 0 ? (
              recommendations.map((item, index) => (
                <ContentItem
                  key={`${item.suggestedTitle}-${index}`}
                  title={item.suggestedTitle}
                  concept={item.conceptSummary}
                  onVideoRecommend={() => handleVideoRecommend(index)}
                />
              ))
            ) : (
              <div className="text-gray-400 typo-body5">추천 결과가 없습니다.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendContent;
