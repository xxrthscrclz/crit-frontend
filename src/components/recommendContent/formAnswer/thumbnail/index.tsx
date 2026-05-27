import useAIFormStore from '@/stores/useAIFormStore';

const Thumbnail = () => {
  const data = useAIFormStore(s => s.data);
  const thumbnailImage = data?.thumbnail?.thumbnailImage ?? '';
  const thumbnailGuide = data?.thumbnail?.thumbnailGuide ?? '';

  return (
    <div className="inline-flex w-full flex-col items-start gap-5 rounded-xl border border-[#A594F9] bg-[#fff] py-6 pl-6 pr-5 max-md:gap-4 max-md:px-3 max-md:py-4">
      <div className="flex w-full items-stretch typo-title-bold text-[#0A0A0A]">썸네일 가이드</div>
      <div className="flex w-full flex-col items-center gap-4 max-md:gap-3">
        <div className="aspect-video w-[80%] overflow-hidden rounded-xl border border-[#A594F9] bg-[#FAFAFA] max-md:w-full">
          {thumbnailImage ? (
            <img src={thumbnailImage} alt="썸네일" className="w-full h-full object-cover" />
          ) : (
            <div className="flex w-full h-full items-center justify-center text-gray-400 typo-body2 animate-loading-pulse">
              썸네일이 표시됩니다.
            </div>
          )}
        </div>
        <div className="h-15 w-full shrink-0 overflow-x-hidden overflow-y-auto whitespace-pre-line break-keep rounded-lg px-3 py-2 typo-body4-semibold leading-6 text-[#0A0A0A] script-scroll max-md:h-12 max-md:px-2 max-md:leading-5">
          {thumbnailGuide || (
            <span className="animate-loading-pulse text-gray-400">썸네일 가이드가 표시됩니다.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
