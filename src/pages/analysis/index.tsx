import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import UserProfile from '@/components/channel/userProfile';
import AlgorithmScore from '@/components/channel/algorithmScore';
import SummaryChannel from '@/components/channel/summaryChannel';
import GuideChannel from '@/components/channel/guideChannel';
import VideoChannel from '@/components/channel/videoChannel';
import DetailAnalysis from '@/pages/analysis/detailAnalysis';
import { getChannelAnalysis } from '@/api/command';
import useChannelStore from '@/stores/useChannelStore';
import useCurrentVideoStore from '@/stores/useCurrentVideoStore';
import useUserStore from '@/stores/useUserStore';

const AnalysisPage = () => {
  const setData = useChannelStore(s => s.setData);
  const clearVideo = useCurrentVideoStore(s => s.clear);
  const channelURL = useUserStore(s => s.channelURL);
  const [showDetail, setShowDetail] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async (force = false) => {
    if (!channelURL) return;
    try {
      const res = await getChannelAnalysis(channelURL, force);
      setData(res);
    } catch (err) {
      console.error('채널 분석 요청 실패:', err);
    }
  };

  useEffect(() => {
    if (!channelURL) return;

    const loadChannelAnalysis = async () => {
      try {
        const res = await getChannelAnalysis(channelURL, false);
        setData(res);
      } catch (err) {
        console.error('채널 분석 요청 실패:', err);
      }
    };

    loadChannelAnalysis();
  }, [setData, channelURL]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData(true);
    setIsRefreshing(false);
  };

  const handleVideoClick = () => {
    setSlideDirection('right');
    setShowDetail(true);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    clearVideo();
    setSlideDirection('left');
    setShowDetail(false);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center ${showDetail ? 'bg-[#F5EFFF]' : 'bg-white'}`}
    >
      <Header />
      {!showDetail ? (
        <div
          key="list"
          className={`flex w-300 flex-col items-center overflow-hidden px-10 pt-10 max-md:w-full max-md:px-4 max-md:pt-6 ${slideDirection === 'left' ? 'animate-slide-in-left' : ''}`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-7 pb-2.5 animate-fade-in-up">
            <UserProfile onRefresh={handleRefresh} isRefreshing={isRefreshing} />
            <div className="h-0.25 w-full bg-[#A594F9]" />
          </div>
          <div className="flex w-full items-center justify-center gap-2 pb-2.5 animate-fade-in-up animate-delay-150 max-md:flex-col">
            <AlgorithmScore />
            <SummaryChannel />
          </div>
          <div className="flex w-full justify-center items-center pb-2.5 animate-fade-in-up animate-delay-300">
            <GuideChannel />
          </div>
          <div className="flex w-full justify-center items-center pt-2.5 animate-fade-in-up animate-delay-450">
            <VideoChannel onVideoClick={handleVideoClick} />
          </div>
        </div>
      ) : (
        <div
          key="detail"
          className={`flex flex-col w-full justify-center items-center bg-transparent overflow-hidden ${slideDirection === 'right' ? 'animate-slide-in-right' : ''}`}
        >
          <DetailAnalysis onBack={handleBack} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AnalysisPage;
