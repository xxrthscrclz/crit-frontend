import { useState } from 'react';
import ShareIcon from '@/assets/icons/share-icon.svg?react';
import PlayIcon from '@/assets/icons/trend-icons/play-icon.svg?react';
import { getTrendRankBadgeClass } from '@/components/trend/rankBadge';
import type { MusicChartItem } from '@/api/command';

interface MusicContainerProps {
  rank: number;
  item: MusicChartItem;
}

const MusicContainer = ({ rank, item }: MusicContainerProps) => {
  const [shared, setShared] = useState(false);

  const handlePlay = () => {
    window.open(item.videoUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, url: item.videoUrl });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        // 사용자가 공유 취소한 경우
      }
    } else {
      await navigator.clipboard.writeText(item.videoUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="group flex w-full shrink-0 items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-[#6B4EFF]/6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border typo-body-bold ${getTrendRankBadgeClass(rank)}`}
        >
          {rank}
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-0.5">
          <div className="truncate text-black typo-body-bold">{item.title}</div>
          <div className="truncate text-[#6D6D6D] typo-body6">{item.artist}</div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 opacity-80 transition-opacity duration-200 group-hover:opacity-100">
        <button
          type="button"
          onClick={handlePlay}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#6D6D6D] transition-colors hover:bg-[#6B4EFF]/10 hover:text-[#6B4EFF] active:text-[#6B4EFF]"
          aria-label={`${item.title} 재생`}
        >
          <PlayIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={handleShare}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-[#6B4EFF]/10 ${
            shared ? 'text-[#6B4EFF]' : 'text-[#6D6D6D] hover:text-[#6B4EFF] active:text-[#6B4EFF]'
          }`}
          aria-label={`${item.title} 공유`}
        >
          <ShareIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MusicContainer;
