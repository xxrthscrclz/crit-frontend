import { getScoreColors } from '@/components/channel/algorithmScore/scoreColors';

interface VideoItemProps {
  title: string;
  thumbnailUrl?: string;
  score: number;
  description: string;
  onClick?: () => void;
}

const VideoItem = ({ title, thumbnailUrl, score, description, onClick }: VideoItemProps) => {
  const { fill } = getScoreColors(score);

  return (
    <div
      className="flex w-full px-7.5 py-6 gap-7.5 self-stretch rounded-xl bg-white border hover:bg-input-highlight active:bg-input-highlight border-brand-secondary hover:border-brand active:border-brand cursor-pointer max-md:flex-col max-md:gap-3 max-md:px-3 max-md:py-3"
      onClick={onClick}
    >
      <div className="w-76 shrink-0 aspect-video rounded-xl overflow-hidden max-md:w-full">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex w-full h-full items-center justify-center text-gray-400 typo-body2">
            썸네일이 표시됩니다.
          </div>
        )}
      </div>
      <div className="flex flex-col w-full py-3.5 gap-7.5 justify-center items-center max-md:min-w-0 max-md:items-start max-md:gap-3 max-md:py-0">
        <div className="flex w-full justify-start text-black typo-title1 max-md:line-clamp-2 max-md:text-left">
          {title}
        </div>
        <div className="flex flex-col w-full gap-2.5 justify-center items-center max-md:items-start max-md:gap-2">
          <div className="flex w-full justify-start items-center gap-0.5">
            <div
              className="typo-title1 text-score-dynamic"
              style={{ '--score-color': fill } as React.CSSProperties}
            >
              {score}
            </div>
            <div className="typo-body1-medium text-black">&nbsp;/ 100점</div>
          </div>
          <div className="flex w-full justify-start text-black typo-body3">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
