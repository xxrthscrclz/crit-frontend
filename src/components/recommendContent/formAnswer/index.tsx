import VideoTitle from '@/components/recommendContent/formAnswer/videoTitle';
import Thumbnail from '@/components/recommendContent/formAnswer/thumbnail';
import ScriptEditor from '@/components/recommendContent/formAnswer/scriptEditor';

const formAnswer = () => {
  return (
    <div className="flex w-250 flex-col items-center justify-start gap-10 rounded-xl bg-[#F5EFFF] px-11 pt-12 pb-22 max-md:w-full max-md:gap-6 max-md:px-3 max-md:py-8">
      <div className="flex h-6 w-full typo-title2 text-[#0A0A0A] animate-fade-in-up max-md:h-auto">
        영상 기획 카드
      </div>
      <div className="flex w-full justify-start gap-4 max-md:flex-col max-md:gap-3">
        <div className="animate-fade-in-up animate-delay-150 flex-1">
          <VideoTitle />
        </div>
        <div className="animate-fade-in-up animate-delay-300 flex-1">
          <Thumbnail />
        </div>
      </div>
      <div className="flex h-6 w-full typo-title2 text-[#0A0A0A] animate-fade-in-up animate-delay-450 max-md:h-auto">
        스크립트 에디터
      </div>
      <div className="flex w-full justify-start animate-fade-in-up animate-delay-600">
        <ScriptEditor />
      </div>
    </div>
  );
};

export default formAnswer;
