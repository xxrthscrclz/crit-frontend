import BarGraphIcon from '@/assets/icons/score-icons/video-detail/bar-graph-icon.svg?react';
import MusicContainer from '@/components/trend/musicContainer';
import type { MusicChartItem } from '@/api/command';

interface MusicChartProps {
  title: string;
  items: MusicChartItem[];
  dividerClassName?: string;
  listKeyPrefix: string;
  accent?: 'primary' | 'lavender';
  isLoading?: boolean;
}

const MusicChart = ({
  title,
  items,
  dividerClassName = 'bg-brand',
  listKeyPrefix,
  accent = 'primary',
  isLoading = false,
}: MusicChartProps) => {
  const glowClass = accent === 'primary' ? 'bg-brand-soft/6' : 'bg-brand-secondary/10';

  return (
    <div className="flex w-full min-w-0 flex-col items-stretch gap-2.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft/10">
          <BarGraphIcon className="h-5 w-5 text-brand" />
        </div>
        <div className="min-w-0 text-brand typo-body1-medium">{title}</div>
      </div>
      <div className={`h-px w-[60%] max-md:w-full ${dividerClassName}`} />
      <div className="relative max-h-100 overflow-hidden rounded-2xl border border-accent-muted shadow-[0_4px_20px_rgba(107,78,255,0.05)] max-md:max-h-none">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-linear-to-b bg-gradient-panel-b" />
          <div className={`absolute -right-6 top-0 h-32 w-32 rounded-full blur-2xl ${glowClass}`} />
        </div>
        <div className="relative z-10 px-3 py-3 max-md:px-2 max-md:py-2">
          <div className="flex max-h-92 flex-col gap-1 overflow-y-auto script-scroll pr-1 max-md:max-h-none max-md:gap-0.5 max-md:pr-0">
            {items.length > 0 ? (
              items.map((item, index) => (
                <MusicContainer key={`${listKeyPrefix}-${index}`} rank={index + 1} item={item} />
              ))
            ) : isLoading ? (
              <div className="flex items-center justify-center py-16 text-gray-400 animate-loading-pulse typo-body3">
                차트를 불러오는 중입니다...
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicChart;
