import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import TodayTrend from '@/components/trend/todayTrend';
import PopularVideoSection from '@/components/trend/popularVideo';
import MusicChart from '@/components/trend/musicChart';
import { getTrending, type TrendingResponse } from '@/api/command';
import CategoryVideo from '@/components/trend/categoryVideo';
import HotWord from '@/components/trend/hotWord';
import HotKeywordIcon from '@/assets/icons/trend-icons/hot-keyword-icon.svg?react';
import HotHashtagIcon from '@/assets/icons/trend-icons/hot-hashtag-icon.svg?react';

const formatUpdatedAt = (iso: string) => {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, '0');
  const d = String(parsed.getDate()).padStart(2, '0');
  const h = String(parsed.getHours()).padStart(2, '0');
  const min = String(parsed.getMinutes()).padStart(2, '0');
  return `${y}.${m}.${d} ${h}:${min}`;
};

const TrendPage = () => {
  const [data, setData] = useState<TrendingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const res = await getTrending();
        setData(res);
      } catch (err) {
        console.error('트렌드 데이터 요청 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const popularVideos = data?.popularVideos.slice(0, 5) ?? [];

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-10 px-45 max-md:px-4">
        <div className="flex w-full flex-col items-center justify-center gap-5 animate-fade-in-up">
          <div className="mt-10 flex w-full text-[#6B4EFF] typo-title2 max-md:mt-6">트렌드</div>
          <div className="flex w-full items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2">
            <div className="text-black typo-body2">
              실시간으로 급상승 중인 주제와 카테고리를 한눈에 확인해보세요.
            </div>
            <div className="shrink-0 text-[#6D6D6D] typo-body2">
              {data ? `데이터 기준 ${formatUpdatedAt(data.updatedAt)}` : '데이터 기준 —'}
            </div>
          </div>
          <div className="h-px w-full bg-[#A594F9]" />
        </div>
        <div className="w-full animate-fade-in-up animate-delay-150">
          <TodayTrend aiSummary={data?.aiSummary} isLoading={isLoading} />
        </div>
        <div className="w-full animate-fade-in-up animate-delay-300">
          <PopularVideoSection videos={popularVideos} isLoading={isLoading} />
        </div>
        <div className="flex w-full items-start gap-5 animate-fade-in-up animate-delay-450 max-md:flex-col">
          <div className="min-w-0 w-full flex-1">
            <MusicChart
              title="실시간 인기 국내 차트 TOP 10"
              items={data?.musicChartKR ?? []}
              dividerClassName="bg-[#6B4EFF]"
              listKeyPrefix="kr"
              accent="primary"
              isLoading={isLoading}
            />
          </div>
          <div className="min-w-0 w-full flex-1">
            <MusicChart
              title="실시간 인기 글로벌 차트 TOP 10"
              items={data?.musicChartGlobal ?? []}
              dividerClassName="bg-[#A594F9]"
              listKeyPrefix="global"
              accent="lavender"
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="w-full animate-fade-in-up animate-delay-600">
          <CategoryVideo items={data?.categoryTop1 ?? []} isLoading={isLoading} />
        </div>
        <div className="flex w-full flex-row items-start gap-5 animate-fade-in-up animate-delay-600 max-md:flex-col">
          <div className="flex min-w-0 flex-1 flex-col">
            <HotWord
              variant="keyword"
              title="핫 키워드 TOP 20"
              icon={HotKeywordIcon}
              items={data?.hotKeywords ?? []}
              isLoading={isLoading}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <HotWord
              variant="hashtag"
              title="핫 해시태그 TOP 20"
              icon={HotHashtagIcon}
              items={data?.hotHashtags ?? []}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrendPage;
