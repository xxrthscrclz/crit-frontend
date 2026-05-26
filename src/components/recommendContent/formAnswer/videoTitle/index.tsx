import { useState } from 'react';
import VideoTitleItem from '@/components/recommendContent/formAnswer/videoTitle/videoTitleItem';
import useAIFormStore from '@/stores/useAIFormStore';
import useRecommendStore from '@/stores/useRecommendStore';
import { postTitleResearch } from '@/api/command';
import { useShallow } from 'zustand/react/shallow';

const VideoTitle = () => {
  const data = useAIFormStore(s => s.data);
  const updateSuggestedTitle = useAIFormStore(s => s.updateSuggestedTitle);
  const { formInput, recommendations, selectedSubjectIndex } = useRecommendStore(
    useShallow(s => ({
      formInput: s.formInput,
      recommendations: s.recommendations,
      selectedSubjectIndex: s.selectedSubjectIndex,
    })),
  );
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);

  const titles = data?.suggestedTitles ?? [];
  const subject = selectedSubjectIndex != null ? recommendations[selectedSubjectIndex] : null;

  const handleRegenerate = async (index: number) => {
    if (!data || !titles[index]) return;

    setRegeneratingIndex(index);

    try {
      const res = await postTitleResearch({
        requestURL: formInput.requestURL,
        title: titles[index],
        concept: subject?.conceptSummary ?? '',
        keywords: formInput.keywords,
        category: formInput.category,
        videoType: formInput.videoType,
        time: formInput.videoType === 'short' ? null : formInput.time,
      });

      updateSuggestedTitle(index, res.suggestedTitle);
    } catch (err) {
      console.error('제목 재생성 요청 실패:', err);
    } finally {
      setRegeneratingIndex(null);
    }
  };

  return (
    <div className="inline-flex w-full py-6 pl-6 pr-5 flex-col items-start gap-5 rounded-xl bg-[#fff] border border-[#A594F9]">
      <div className="flex w-full typo-title-bold text-[#0A0A0A] items-stretch">AI 추천 제목</div>
      {titles.length > 0
        ? titles.map((title, i) => (
            <VideoTitleItem
              key={i}
              title={title}
              isRegenerating={regeneratingIndex === i}
              onRegenerate={() => handleRegenerate(i)}
            />
          ))
        : [0, 1, 2].map(i => <VideoTitleItem key={i} title="" />)}
    </div>
  );
};

export default VideoTitle;
