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
  const label = isHashtag ? `#${item.text}` : item.text;
  const paddingX = 10 + Math.round(sizeScale * 10);
  const paddingY = 6 + Math.round(sizeScale * 6);
  const fontSize = 11 + Math.round(sizeScale * 3);

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ padding: `${paddingY}px ${paddingX}px`, fontSize: `${fontSize}px` }}
      className={`inline-flex max-w-full items-center justify-center rounded-full border-2 font-semibold leading-tight transition-all duration-300 ease-out bg-linear-to-br from-[#FAF8FF] via-[#F2EBFF] to-[#E6DCFF] hover:scale-105 hover:border-[#A594F9] hover:from-[#F5F0FF] hover:via-[#EBE3FF] hover:to-[#DDD0FF] hover:shadow-[0_6px_18px_rgba(107,78,255,0.16)] active:scale-95 ${
        isSelected
          ? 'scale-105 border-[#6B4EFF] from-[#F0EBFF] via-[#E4DAFF] to-[#D4C9FF] shadow-[0_8px_22px_rgba(107,78,255,0.22)]'
          : 'border-transparent shadow-[0_2px_8px_rgba(107,78,255,0.08)]'
      }`}
    >
      <span className="truncate text-center text-[#3D2E9E]">{label}</span>
    </button>
  );
};

export default WordItem;
