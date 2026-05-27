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
  const label = isHashtag ? `# ${item.text}` : item.text;
  const paddingX = 10 + Math.round(sizeScale * 5);
  const paddingY = 6 + Math.round(sizeScale * 3);
  const fontSize = (isHashtag ? 11 : 12) + Math.round(sizeScale * 2);

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ padding: `${paddingY}px ${paddingX}px`, fontSize: `${fontSize}px` }}
      className={`inline-flex max-w-full items-center justify-center rounded-full border-2 font-semibold leading-tight bg-linear-to-br from-[#FAF8FF] via-[#F2EBFF] to-[#E6DCFF] shadow-[0_2px_10px_rgba(107,78,255,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] transition-[box-shadow,border-color,background] duration-200 ease-out hover:scale-105 hover:border-[#A594F9] hover:from-[#F5F0FF] hover:via-[#EBE3FF] hover:to-[#DDD0FF] hover:shadow-[0_8px_22px_rgba(107,78,255,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] active:scale-95 ${
        isSelected
          ? 'scale-105 border-[#6B4EFF] from-[#F0EBFF] via-[#E4DAFF] to-[#D4C9FF] shadow-[0_10px_26px_rgba(107,78,255,0.24),inset_0_1px_0_rgba(255,255,255,0.9)]'
          : 'border-transparent'
      }`}
    >
      <span className="truncate text-center text-[#3D2E9E]">{label}</span>
    </button>
  );
};

export default WordItem;
