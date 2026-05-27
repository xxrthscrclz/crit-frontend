import VideoContainer from '@/components/trend/videoContainer';
import type { CategoryTop1Video } from '@/api/command';

interface CategoryItemProps {
  item: CategoryTop1Video;
}

const CategoryItem = ({ item }: CategoryItemProps) => {
  return (
    <div className="flex w-64 shrink-0 flex-col items-center px-0.5 py-1">
      <div className="flex w-full flex-col items-center gap-2.5 rounded-2xl border-2 border-transparent bg-linear-to-br from-[#FAF8FF] via-[#F2EBFF] to-[#E6DCFF] px-3 pt-3 pb-2.5 transition-all duration-300 ease-out origin-center has-[a:hover]:scale-[1.02] has-[a:hover]:border-[#A594F9] has-[a:hover]:from-[#F5F0FF] has-[a:hover]:via-[#EBE3FF] has-[a:hover]:to-[#DDD0FF] has-[a:hover]:shadow-[0_10px_28px_rgba(107,78,255,0.14)] has-[a:active]:scale-[0.99] has-[a:active]:border-[#6B4EFF] has-[a:active]:from-[#EDE8FF] has-[a:active]:via-[#E0D4FF] has-[a:active]:to-[#D4C9FF] has-[a:active]:shadow-[0_6px_20px_rgba(107,78,255,0.2)]">
        <span className="inline-flex max-w-full items-center justify-center rounded-full border border-[#E8E2FF]/80 bg-linear-to-r from-[#F8F6FF] via-[#F3EEFF] to-[#EDE8FF] px-3.5 py-1.5 text-center text-[#6B4EFF] typo-body-bold truncate">
          {item.categoryName}
        </span>
        <VideoContainer
          video={item}
          className="w-full rounded-xl border border-transparent bg-white shadow-none transition-colors duration-200 hover:border-transparent active:border-transparent active:bg-[#F8F6FF]"
        />
      </div>
    </div>
  );
};

export default CategoryItem;
