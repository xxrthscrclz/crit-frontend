import { useState, useRef, useEffect } from 'react';
import SubjectItem from '@/components/recommendContent/formSubject/subjectItem';
import useRecommendStore from '@/stores/useRecommendStore';
import { fetchAIContent } from '@/utils/fetchAIContent';
import { useShallow } from 'zustand/react/shallow';

interface FormSubjectProps {
  onSelect?: () => void;
}

const FormSubject = ({ onSelect }: FormSubjectProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
  const { recommendations, formInput, setSelectedSubjectIndex } = useRecommendStore(
    useShallow(s => ({
      recommendations: s.recommendations,
      formInput: s.formInput,
      setSelectedSubjectIndex: s.setSelectedSubjectIndex,
    })),
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(() => {
    const { autoSelectSubject, selectedSubjectIndex } = useRecommendStore.getState();
    return autoSelectSubject ? selectedSubjectIndex : null;
  });
  const [collapsed, setCollapsed] = useState(() => {
    const { autoSelectSubject, selectedSubjectIndex } = useRecommendStore.getState();
    return autoSelectSubject && selectedSubjectIndex !== null;
  });

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [recommendations]);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    setSelectedSubjectIndex(index);
    setCollapsed(true);

    const item = recommendations[index];
    const title = item?.suggestedTitle ?? '';
    const concept = item?.conceptSummary ?? '';

    fetchAIContent({
      requestURL: formInput.requestURL,
      title,
      concept,
      keywords: formInput.keywords,
      category: formInput.category,
      videoType: formInput.videoType,
      time: formInput.videoType === 'short' ? null : formInput.time,
    });

    onSelect?.();
  };

  return (
    <div className="flex w-250 flex-col items-center justify-end gap-10 rounded-xl bg-[#F5EFFF] px-8 py-14 max-md:w-full max-md:gap-6 max-md:px-3 max-md:py-8">
      <div
        ref={contentRef}
        className="collapse-panel flex w-full flex-col items-center gap-10 max-md:gap-6"
        style={
          {
            '--collapse-max-height': collapsed ? '0px' : `${contentHeight}px`,
            '--collapse-opacity': collapsed ? 0 : 1,
          } as React.CSSProperties
        }
      >
        <div className="flex w-full justify-center typo-title-bold text-[#717171] text-center whitespace-pre-line">
          {
            '다음 영상으로 제작하기 좋은 콘텐츠 주제를 확인해보세요.\n관심 있는 주제를 클릭하면 상세 기획을 확인할 수 있습니다.'
          }
        </div>
        {recommendations.length > 0
          ? recommendations.map((item, i) => (
              <div
                key={i}
                className="animate-fade-in-up animate-delay-stagger w-full flex justify-center"
                style={{ '--stagger-index': i } as React.CSSProperties}
              >
                <SubjectItem
                  subject={item.suggestedTitle}
                  subjectContent={item.conceptSummary}
                  selected={selectedIndex === i}
                  onClick={() => handleClick(i)}
                />
              </div>
            ))
          : [0, 1, 2].map(i => (
              <div
                key={i}
                className="animate-fade-in-up animate-delay-stagger w-full flex justify-center"
                style={{ '--stagger-index': i } as React.CSSProperties}
              >
                <SubjectItem />
              </div>
            ))}
      </div>
      {selectedIndex !== null && (
        <div className="flex w-full items-center relative">
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="absolute right-0 flex items-center gap-1 cursor-pointer text-[#0a0a0a89] active:text-[#6B4EFF] typo-label"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-0' : 'rotate-180'}`}
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
        </div>
      )}
    </div>
  );
};

export default FormSubject;
