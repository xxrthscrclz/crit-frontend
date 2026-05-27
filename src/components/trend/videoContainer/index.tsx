import EyeIcon from '@/assets/icons/trend-icons/eye-icon.svg?react';
import UploadIcon from '@/assets/icons/score-icons/video-detail/upload-icon.svg?react';
import { getTrendRankBadgeClass } from '@/components/trend/rankBadge';
import type { TrendVideo } from '@/api/command';

interface VideoContainerProps {
  video: TrendVideo;
  className?: string;
  rank?: number;
}

const formatViewCount = (count: number) => count.toLocaleString();

const formatPublishedDate = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date.slice(0, 10).replace(/-/g, '.');
  }
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, '0');
  const d = String(parsed.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
};

const normalizeHashtags = (hashtags: string[] | string): string[] => {
  if (Array.isArray(hashtags)) return hashtags;
  return hashtags
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean);
};

const VideoContainer = ({ video, className = '', rank }: VideoContainerProps) => {
  const tags = normalizeHashtags(video.hashtags);

  return (
    <a
      href={video.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-[#E8E2FF] bg-white shadow-[0_4px_16px_rgba(107,78,255,0.08)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#A594F9] hover:shadow-[0_10px_28px_rgba(107,78,255,0.14)] active:translate-y-0 active:shadow-[0_6px_20px_rgba(107,78,255,0.12)] ${className}`}
    >
      <div className="relative w-full shrink-0">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="aspect-video w-full object-cover"
        />
        {rank != null && (
          <div
            className={`absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg border typo-body-bold shadow-sm ${getTrendRankBadgeClass(rank)}`}
          >
            {rank}
          </div>
        )}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 px-3 py-3">
        <div className="flex h-8 w-full shrink-0 items-center justify-start truncate text-black typo-body6">
          {video.title}
        </div>
        <div className="flex w-full shrink-0 items-center justify-start truncate text-[#6D6D6D] typo-body6">
          {video.channelTitle}
        </div>
        <div className="flex h-5 w-full shrink-0 items-center justify-start gap-1 truncate text-[#6765FF] typo-body6">
          {tags.length > 0 ? (
            tags.map(tag => (
              <span key={tag} className="shrink-0">
                #{tag}
              </span>
            ))
          ) : (
            <span className="shrink-0">#--</span>
          )}
        </div>
        <div className="min-h-10 w-full shrink-0 line-clamp-2 text-black typo-body6 leading-5">
          {video.aiAnalysis}
        </div>
        <div className="min-h-0 flex-1" aria-hidden />
        <div className="flex w-full shrink-0 items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <EyeIcon className="h-4 w-4 shrink-0" />
            <div className="text-black typo-body6">{formatViewCount(video.views)}</div>
          </div>
          <div className="flex items-center justify-center gap-1">
            <UploadIcon className="h-4 w-4 shrink-0" />
            <div className="text-[#6D6D6D] typo-body6">
              {formatPublishedDate(video.publishedAt)}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default VideoContainer;
