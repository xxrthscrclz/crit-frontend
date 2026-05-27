import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Keywords from '@/components/keywordsContent/keywords';
import KeywordCard from '@/components/keywordsContent/keywordCard';
import useKeywordStore from '@/stores/useKeywordStore';
import useTrendKeywordsStore from '@/stores/useTrendKeywordsStore';
import { getKeywords } from '@/api/command';

const Main = () => {
  const selectedKeyword = useKeywordStore(s => s.selectedKeyword);
  const setSelectedKeyword = useKeywordStore(s => s.setSelectedKeyword);
  const setKeywords = useTrendKeywordsStore(s => s.setKeywords);
  const setLoading = useTrendKeywordsStore(s => s.setLoading);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setSelectedKeyword(null);

    const fetchKeywords = async () => {
      setLoading(true);
      try {
        const res = await getKeywords();
        setKeywords(res);
      } catch (err) {
        console.error('트렌드 키워드 요청 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchKeywords();
  }, [setSelectedKeyword, setKeywords, setLoading]);

  useEffect(() => {
    if (selectedKeyword) {
      setAnimationKey(prev => prev + 1);
    }
  }, [selectedKeyword]);

  return (
    <div className="relative flex min-h-screen flex-col bg-linear-to-br from-[#F5EFFF] via-white to-[#E8F4F8]">
      <div className="pointer-events-none absolute top-20 left-10 h-72 w-72 rounded-full bg-[#9F8CFF] opacity-10 blur-3xl max-md:hidden" />
      <div className="pointer-events-none absolute top-40 right-20 h-96 w-96 rounded-full bg-[#4ECDC4] opacity-10 blur-3xl max-md:hidden" />
      <div className="pointer-events-none absolute bottom-40 left-1/4 h-80 w-80 rounded-full bg-[#FF6B6B] opacity-10 blur-3xl max-md:hidden" />
      <div className="pointer-events-none absolute bottom-20 right-10 h-64 w-64 rounded-full bg-[#FFEAA7] opacity-15 blur-3xl max-md:hidden" />

      <Header />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 p-10 px-8 max-md:px-4 max-md:py-8">
        <div className="flex flex-col items-center text-center">
          <div className="typo-title1">
            <span className="text-gray-500">트렌드를 읽고, 콘텐츠를 만들다 </span>
            <span className="animate-crit-glow">단 하나의 시작, CRiT</span>
          </div>
          <div className="mt-2 text-gray-600 typo-body4">
            지금 뜨는 키워드로 주제를 추천받으세요.
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-8 max-md:flex-col max-md:gap-6">
          <div className="transition-all duration-500 max-md:w-full">
            <Keywords isShifted={!!selectedKeyword} />
          </div>
          {selectedKeyword && (
            <div className="flex shrink-0 items-center justify-center max-md:w-full">
              <KeywordCard animationKey={animationKey} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
