import SlackIcon from '@/assets/icons/score-icons/video-detail/slack-icon.svg?react';
import AICommentIcon from '@/assets/icons/score-icons/video-detail/ai-comment-icon.svg?react';

interface TodayTrendProps {
  aiSummary?: string;
  isLoading?: boolean;
}

const TodayTrend = ({ aiSummary, isLoading = false }: TodayTrendProps) => {
  return (
    <div className="flex w-full flex-col items-stretch gap-2.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft/10">
          <SlackIcon className="h-5 w-5 text-brand" />
        </div>
        <div className="text-brand typo-body1-medium">오늘의 AI 트렌드 요약</div>
      </div>
      <div className="h-px w-[60%] bg-brand-secondary" />
      <div className="relative overflow-hidden rounded-2xl border border-accent-muted shadow-[0_4px_24px_rgba(107,78,255,0.06)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-linear-to-br bg-gradient-panel-br" />
          <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full bg-brand-soft/8 blur-3xl" />
          <div className="absolute -bottom-8 left-12 h-36 w-36 rounded-full bg-brand-secondary/12 blur-2xl" />
        </div>
        <div className="relative z-10 flex gap-6 border-l-4 border-l-brand px-6 py-5 max-md:gap-4 max-md:px-4 max-md:py-4">
          <div className="flex min-w-0 flex-1 flex-col gap-3 max-md:gap-2">
            <span className="inline-flex w-fit items-center rounded-full border border-accent-muted bg-brand-soft/8 px-3 py-1 text-brand typo-body6 max-md:px-2.5 max-md:py-0.5">
              AI 생성 요약
            </span>
            <p className="whitespace-pre-wrap text-body-deep typo-body3-semibold leading-relaxed max-md:text-[12px] max-md:leading-[18px]">
              {aiSummary ? (
                aiSummary
              ) : isLoading ? (
                <span className="text-gray-400 animate-loading-pulse">
                  요약을 불러오는 중입니다...
                </span>
              ) : (
                '요약 데이터가 없습니다.'
              )}
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-center self-center rounded-2xl bg-brand-soft/6 p-5 max-md:hidden">
            <AICommentIcon className="h-20 w-20 text-brand/70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayTrend;
