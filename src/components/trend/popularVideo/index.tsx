import SparkleIcon from '@/assets/icons/score-icons/video-detail/sparkle-icon.svg?react';
import VideoContainer from '@/components/trend/videoContainer';
import type { PopularVideo as PopularVideoItem } from '@/api/command';

interface PopularVideoSectionProps {
  videos: PopularVideoItem[];
  isLoading?: boolean;
}

const PopularVideoSection = ({ videos, isLoading = false }: PopularVideoSectionProps) => {
  return (
    <div className="flex w-full flex-col items-stretch gap-2.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6B4EFF]/10">
          <SparkleIcon className="h-5 w-5 text-[#6B4EFF]" />
        </div>
        <div className="text-[#6B4EFF] typo-body1-medium">실시간 인기 동영상 TOP 5</div>
      </div>
      <div className="h-px w-[60%] bg-[#A594F9]" />
      <div className="relative overflow-hidden rounded-2xl border border-[#E8E2FF] shadow-[0_4px_24px_rgba(107,78,255,0.05)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-linear-to-br from-white via-[#FDFCFF] to-[#F8F6FF]" />
          <div className="absolute -top-12 right-16 h-40 w-40 rounded-full bg-[#6B4EFF]/5 blur-3xl" />
        </div>
        <div className="relative z-10 flex items-stretch gap-4 px-5 py-4">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div key={video.videoId} className="min-w-0 flex-1">
                <VideoContainer video={video} rank={index + 1} className="h-full" />
              </div>
            ))
          ) : isLoading ? (
            <div className="flex w-full items-center justify-center py-16 text-gray-400 animate-loading-pulse typo-body3">
              인기 동영상을 불러오는 중입니다...
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PopularVideoSection;
