import type { TrendHotWord } from '@/api/command';

interface WordItemProps {
  item: TrendHotWord;
  isHashtag?: boolean;
  isSelected?: boolean;
  sizeScale: number;
  onClick: () => void;
}

const WordItem = ({
  item,
  isHashtag = false,
  isSelected = false,
  sizeScale,
  onClick,
}: WordItemProps) => {
  const label = isHashtag ? `# ${item.text.replace(/ /g, '_')}` : item.text;
  const paddingX = 10 + Math.round(sizeScale * 5);
  const paddingY = 6 + Math.round(sizeScale * 3);
  const fontSize = (isHashtag ? 11 : 12) + Math.round(sizeScale * 2);

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ padding: `${paddingY}px ${paddingX}px`, fontSize: `${fontSize}px` }}
      className={`inline-flex max-w-full items-center justify-center rounded-full border-2 font-semibold leading-tight bg-gradient-card shadow-brand-bubble transition-[box-shadow,border-color,background] duration-200 ease-out hover:scale-105 hover:border-brand-secondary hover:bg-gradient-card-hover hover:shadow-brand-bubble-hover active:scale-95 ${
        isSelected
          ? 'scale-105 border-brand bg-gradient-card-selected shadow-brand-bubble-selected'
          : 'border-transparent'
      }`}
    >
      <span className="truncate text-center text-brand-text-deep">{label}</span>
    </button>
  );
};

export default WordItem;
