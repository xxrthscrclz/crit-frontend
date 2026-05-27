import { useMemo, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { useNavigate } from 'react-router-dom';
import WordItem from '@/components/trend/hotWord/wordItem';
import type { TrendHotWord } from '@/api/command';

const HOT_WORD_LIMIT = 20;

interface HotWordProps {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  items: TrendHotWord[];
  variant: 'keyword' | 'hashtag';
}

const formatValue = (value: number) => {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}만`;
  }
  return value.toLocaleString();
};

const HotWord = ({ title, icon: Icon, items, variant }: HotWordProps) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<TrendHotWord | null>(null);
  const isHashtag = variant === 'hashtag';
  const displayItems = items.slice(0, HOT_WORD_LIMIT);
  const valueLabel = isHashtag ? '태그 사용량' : '검색량';

  const { minValue, maxValue } = useMemo(() => {
    if (displayItems.length === 0) return { minValue: 0, maxValue: 0 };
    const values = displayItems.map(item => item.value);
    return { minValue: Math.min(...values), maxValue: Math.max(...values) };
  }, [displayItems]);

  const getSizeScale = (value: number) => {
    if (maxValue === minValue) return 1;
    return (value - minValue) / (maxValue - minValue);
  };

  const handleRecommend = () => {
    if (!selected) return;
    navigate('/recommend', { state: { keyword: selected.text } });
  };

  const handleWordClick = (item: TrendHotWord) => {
    setSelected(prev => (prev?.text === item.text ? null : item));
  };

  return (
    <div className="relative w-full min-w-0">
      <div className="flex w-full flex-col items-stretch gap-2.5">
        <div className="flex w-full items-center gap-2.5">
          <Icon className="h-8 w-8 shrink-0 text-[#6B4EFF]" />
          <div className="text-[#6B4EFF] typo-body1-medium">{title}</div>
        </div>
        <div
          className={`h-px bg-[#A594F9] transition-all duration-600 ease-out ${
            selected ? 'w-full' : 'w-[60%]'
          }`}
        />
        <div className="w-[60%] not-only:relative overflow-visible rounded-xl border border-[#A594F9] bg-white py-4 pl-4 pr-6">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {displayItems.map(item => (
              <WordItem
                key={item.text}
                item={item}
                isHashtag={isHashtag}
                isSelected={selected?.text === item.text}
                sizeScale={getSizeScale(item.value)}
                onClick={() => handleWordClick(item)}
              />
            ))}
          </div>

          <div
            className={`absolute top-1/2 right-0 z-20 -translate-y-1/2 transition-all duration-600 ease-out ${
              selected
                ? 'w-72 translate-x-full animate-slide-in-right-slow'
                : 'w-3 translate-x-[calc(100%-6px)]'
            }`}
          >
            <div
              className={`relative flex w-[80%] h-full min-h-28 flex-col gap-4 overflow-hidden rounded-r-2xl border border-[#A594F9] border-l-[6px] border-l-[#6B4EFF] bg-white shadow-[0_12px_32px_rgba(107,78,255,0.18)] transition-all duration-[600ms] ${
                selected ? 'px-5 py-5 opacity-100' : 'pointer-events-none px-0 py-0 opacity-100'
              }`}
            >
              {selected && (
                <>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
                    aria-label="닫기"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                  <div className="pr-6 text-[#6B4EFF] typo-title1 break-keep">
                    {isHashtag ? `#${selected.text}` : selected.text}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-500 typo-body5">{valueLabel}</div>
                    <div className="text-black typo-title2">{formatValue(selected.value)}</div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRecommend}
                    className="w-[80%] rounded-xl bg-[#6B4EFF] py-2 text-white typo-body6 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  >
                    {isHashtag ? '이 해시태그로 영상 추천받기' : '이 키워드로 영상 추천받기'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotWord;
