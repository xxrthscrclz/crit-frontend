import VideoContainer from '@/components/trend/videoContainer';
import type { CategoryTop1Video } from '@/api/command';

interface CategoryItemProps {
  item: CategoryTop1Video;
}

const CategoryItem = ({ item }: CategoryItemProps) => {
  return (
    <div className="flex w-64 shrink-0 flex-col items-center px-0.5 py-1">
      <div className="flex w-full flex-col items-stretch gap-2.5 rounded-2xl border-2 border-transparent interactive-gradient-card bg-gradient-card px-3 pt-3 pb-2.5 transition-all duration-300 ease-out origin-center has-[a:hover]:scale-[1.02] has-[a:hover]:border-brand-secondary has-[a:hover]:shadow-brand-card-hover has-[a:active]:scale-[0.99] has-[a:active]:border-brand has-[a:active]:shadow-brand-card-active max-md:gap-1.5 max-md:px-2.5 max-md:pt-2.5 max-md:pb-2">
        <span className="inline-flex max-w-full items-center justify-center self-center truncate rounded-full border border-accent-muted/80 bg-linear-to-r bg-gradient-pill px-3.5 py-1.5 text-center text-brand typo-body-bold max-md:px-2 max-md:py-1">
          {item.categoryName}
        </span>
        <div className="w-full min-w-0">
          <VideoContainer
            video={item}
            compactMobile
            className="h-full w-full rounded-xl border border-transparent bg-white shadow-none transition-colors duration-200 hover:border-transparent active:border-transparent active:bg-accent-soft"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
