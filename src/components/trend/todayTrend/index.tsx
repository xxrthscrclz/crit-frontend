import SlackIcon from '@/assets/icons/score-icons/video-detail/slack-icon.svg?react';
import AICommentIcon from '@/assets/icons/score-icons/video-detail/ai-comment-icon.svg?react';

interface TodayTrendProps {
  aiSummary?: string;
}

const TodayTrend = ({ aiSummary }: TodayTrendProps) => {
  return (
    <div className="flex w-full flex-col items-stretch gap-2.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6B4EFF]/10">
          <SlackIcon className="h-5 w-5 text-[#6B4EFF]" />
        </div>
        <div className="text-[#6B4EFF] typo-body1-medium">오늘의 AI 트렌드 요약</div>
      </div>
      <div className="h-px w-[60%] bg-[#A594F9]" />
      <div className="relative overflow-hidden rounded-2xl border border-[#E8E2FF] shadow-[0_4px_24px_rgba(107,78,255,0.06)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-linear-to-br from-white via-[#FDFCFF] to-[#F5F0FF]" />
          <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full bg-[#6B4EFF]/8 blur-3xl" />
          <div className="absolute -bottom-8 left-12 h-36 w-36 rounded-full bg-[#A594F9]/12 blur-2xl" />
        </div>
        <div className="relative z-10 flex gap-6 border-l-4 border-l-[#6B4EFF] px-6 py-5">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <span className="inline-flex w-fit items-center rounded-full border border-[#E8E2FF] bg-[#6B4EFF]/8 px-3 py-1 text-[#6B4EFF] typo-body6">
              AI 생성 요약
            </span>
            <p className="text-[#2D2640] typo-body3-semibold leading-relaxed whitespace-pre-wrap">
              {aiSummary ?? '요약을 불러오는 중입니다...'}
            </p>
          </div>
          <div className="hidden shrink-0 items-center justify-center self-center rounded-2xl bg-[#6B4EFF]/6 p-5 sm:flex">
            <AICommentIcon className="h-20 w-20 text-[#6B4EFF]/70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayTrend;
