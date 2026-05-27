import SparkleIcon from '@/assets/icons/score-icons/video-detail/sparkle-icon.svg?react';
import CategoryItem from '@/components/trend/categoryVideo/categoryItem';
import type { CategoryTop1Video } from '@/api/command';

interface CategoryVideoProps {
  items: CategoryTop1Video[];
}

const sortByCategoryId = (items: CategoryTop1Video[]) =>
  [...items].sort((a, b) => Number(a.categoryId) - Number(b.categoryId));

const CategoryVideo = ({ items }: CategoryVideoProps) => {
  const sortedItems = sortByCategoryId(items);

  return (
    <div className="flex flex-col w-full justify-center items-center gap-5">
      <div className="flex w-full justify-start items-center gap-2.5">
        <SparkleIcon className="w-6 h-6" />
        <div className="text-[#6B4EFF] typo-body1-medium">카테고리별 인기 동영상</div>
      </div>
      <div className="relative w-full rounded-2xl border border-[#E8E2FF] shadow-[0_4px_24px_rgba(107,78,255,0.05)]">
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"
          aria-hidden
        >
          <div className="absolute inset-0 bg-linear-to-br from-white via-[#FDFCFF] to-[#F8F6FF]" />
          <div className="absolute -top-16 right-8 h-48 w-48 rounded-full bg-[#6B4EFF]/6 blur-3xl" />
          <div className="absolute -bottom-12 left-4 h-40 w-40 rounded-full bg-[#A594F9]/10 blur-2xl" />
        </div>
        <div className="relative z-10 px-5 py-4">
          <div className="flex flex-row justify-start items-start gap-5 overflow-x-auto script-scroll scroll-pl-2 scroll-pr-2 py-3">
            {sortedItems.map(item => (
              <CategoryItem key={item.categoryId} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryVideo;
