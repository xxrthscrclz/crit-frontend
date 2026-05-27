import BulbIcon from '@/assets/icons/score-icons/video-detail/purple-bulb-icon.svg?react';

interface ContentItemProps {
  title: string;
  concept: string;
  onVideoRecommend?: () => void;
  isLoading?: boolean;
}

const ContentItem = ({ title, concept, onVideoRecommend, isLoading = false }: ContentItemProps) => {
  return (
    <div className="flex flex-col w-full px-5.5 py-4.5 justify-between items-center gap-3 rounded-xl border-[0.5px] border-accent">
      <div className="flex w-full justify-between items-center gap-2">
        <div className="flex justify-start items-start gap-2.5">
          <BulbIcon className="crit-icon-brand shrink-0" />
          <div className="flex flex-col gap-1.5 w-full justify-center items-start">
            <div className="w-full justify-start items-center text-black typo-body4-semibold">
              {title}
            </div>
            <div className="w-full justify-start items-center text-black typo-body5">{concept}</div>
          </div>
        </div>
      </div>
      <div
        onClick={isLoading ? undefined : onVideoRecommend}
        className={`px-23 py-1 justify-center items-center rounded-xl border-[0.5px] border-accent shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] typo-body6 transition-colors ${
          isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'text-brand-text-purple cursor-pointer hover:bg-accent-muted hover:text-brand-text-purple active:bg-accent-muted'
        }`}
      >
        {isLoading ? 'AI 콘텐츠 생성 중...' : '영상 추천'}
      </div>
    </div>
  );
};

export default ContentItem;
