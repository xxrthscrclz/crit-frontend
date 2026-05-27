import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/header';
import TabList from '@/components/recommendContent/tabList';
import FormList from '@/components/recommendContent/formList';
import FormAnswer from '@/components/recommendContent/formAnswer';
import FormSubject from '@/components/recommendContent/formSubject';
import useRecommendStore from '@/stores/useRecommendStore';
import useAIFormStore from '@/stores/useAIFormStore';

import Footer from '@/components/footer';

const RecommendPage = () => {
  const location = useLocation();
  const initialKeyword = (location.state as { keyword?: string })?.keyword || '';

  const autoSelectSubject = useRecommendStore(s => s.autoSelectSubject);
  const setAutoSelectSubject = useRecommendStore(s => s.setAutoSelectSubject);
  const videoType = useRecommendStore(s => s.formInput.videoType);
  const setVideoType = useRecommendStore(s => s.setVideoType);
  const clearRecommendStore = useRecommendStore(s => s.clear);
  const clearAIFormStore = useAIFormStore(s => s.clear);

  const isAutoEntry = () => {
    const { autoSelectSubject, recommendations } = useRecommendStore.getState();
    return autoSelectSubject && recommendations.length > 0;
  };

  const [showSubject, setShowSubject] = useState(isAutoEntry);
  const [showAnswer, setShowAnswer] = useState(isAutoEntry);

  // 외부 진입 플래그는 마운트 시 한 번 소비 (React state가 아닌 store만 갱신)
  useEffect(() => {
    const { autoSelectSubject, selectedSubjectIndex, recommendations } =
      useRecommendStore.getState();
    if (autoSelectSubject && selectedSubjectIndex !== null && recommendations.length > 0) {
      setAutoSelectSubject(false);
    }
  }, [setAutoSelectSubject]);

  // 페이지 떠날 때 store 초기화 (autoSelectSubject가 아닌 경우에만)
  useEffect(() => {
    return () => {
      // 다른 페이지로 이동 시 store 초기화
      if (!autoSelectSubject) {
        clearRecommendStore();
        clearAIFormStore();
      }
    };
  }, [autoSelectSubject, clearRecommendStore, clearAIFormStore]);

  const handleSearch = () => {
    setShowSubject(true);
    setShowAnswer(false);
  };

  const handleSelectSubject = () => {
    setShowAnswer(true);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-10 px-10 max-md:gap-6 max-md:px-4">
        <div className="mx-auto mt-20 flex w-full max-w-250 flex-col items-center animate-fade-in-up max-md:mt-8">
          <div className="relative z-10 mb-[-32px] flex w-full justify-center">
            <TabList
              tabs={['롱폼', '숏폼']}
              activeIndex={videoType === 'long' ? 0 : 1}
              onChange={index => setVideoType(index === 0 ? 'long' : 'short')}
            />
          </div>
          <FormList onSearch={handleSearch} initialKeyword={initialKeyword} />
        </div>
        {showSubject && (
          <div className="w-full max-w-250 animate-fade-in-up">
            <FormSubject onSelect={handleSelectSubject} />
          </div>
        )}
        {showAnswer && (
          <div className="mx-auto flex w-full max-w-250 flex-col items-center self-stretch animate-fade-in-up">
            <FormAnswer />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecommendPage;
