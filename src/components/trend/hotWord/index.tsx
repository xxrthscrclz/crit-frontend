import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { useNavigate } from 'react-router-dom';
import WordItem from '@/components/trend/hotWord/wordItem';
import { getBubbleSizeScale } from '@/components/trend/hotWord/bubbleSize';
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
  const [bubbleScale, setBubbleScale] = useState(1);
  const bubblePanelRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const isHashtag = variant === 'hashtag';
  const displayItems = items.slice(0, HOT_WORD_LIMIT);
  const valueLabel = isHashtag ? '태그 사용량' : '검색량';

  const { minValue, maxValue, rankByText } = useMemo(() => {
    if (displayItems.length === 0) {
      return { minValue: 0, maxValue: 0, rankByText: new Map<string, number>() };
    }
    const values = displayItems.map(item => item.value);
    const sorted = [...displayItems].sort((a, b) => b.value - a.value);
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
      rankByText: new Map(sorted.map((item, index) => [item.text, index])),
    };
  }, [displayItems]);

  const handleRecommend = () => {
    if (!selected) return;
    navigate('/recommend', { state: { keyword: selected.text } });
  };

  const handleYoutubeSearch = () => {
    if (!selected) return;
    const query = isHashtag ? `#${selected.text}` : selected.text;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWordClick = (item: TrendHotWord) => {
    setSelected(prev => (prev?.text === item.text ? null : item));
  };

  useEffect(() => {
    const panel = bubblePanelRef.current;
    const bubbles = bubblesRef.current;
    if (!panel || !bubbles) return;

    const updateScale = () => {
      const styles = getComputedStyle(panel);
      const paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const available = panel.clientHeight - paddingY;
      const needed = bubbles.scrollHeight;
      if (available <= 0 || needed <= 0) {
        setBubbleScale(1);
        return;
      }
      const next = Math.max(0.88, Math.min(1, available / needed));
      setBubbleScale(prev => (Math.abs(prev - next) < 0.01 ? prev : next));
    };

    const runUpdate = () => requestAnimationFrame(updateScale);
    const observer = new ResizeObserver(runUpdate);
    observer.observe(panel);
    observer.observe(bubbles);
    runUpdate();

    return () => observer.disconnect();
  }, [displayItems, selected]);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col">
      <div className="flex h-full w-full flex-col items-stretch gap-2.5">
        <div className="flex w-full items-center gap-2.5">
          <Icon className="h-8 w-8 shrink-0 text-[#6B4EFF]" />
          <div className="text-[#6B4EFF] typo-body1-medium">{title}</div>
        </div>
        <div
          className={`h-px bg-[#A594F9] transition-all duration-600 ease-out ${
            selected ? 'w-full' : 'w-[60%]'
          }`}
        />
        <div
          ref={bubblePanelRef}
          className="relative box-border flex h-92 w-[60%] shrink-0 flex-col overflow-visible rounded-xl border border-[#A594F9] bg-white py-3 pl-3 pr-4"
        >
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-visible pt-1">
            <div
              ref={bubblesRef}
              className="flex w-full flex-wrap content-start items-center justify-center gap-2 transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${bubbleScale})`,
                transformOrigin: 'top center',
              }}
            >
              {displayItems.map(item => (
                <WordItem
                  key={item.text}
                  item={item}
                  isHashtag={isHashtag}
                  isSelected={selected?.text === item.text}
                  sizeScale={getBubbleSizeScale(
                    item.value,
                    minValue,
                    maxValue,
                    rankByText.get(item.text) ?? 0,
                    displayItems.length,
                  )}
                  onClick={() => handleWordClick(item)}
                />
              ))}
            </div>
          </div>

          <div
            className={`absolute top-1/2 right-0 z-20 h-[80%] -translate-y-1/2 transition-all duration-600 ease-out ${
              selected
                ? 'w-72 translate-x-full animate-slide-in-right-slow'
                : 'w-3 translate-x-[calc(100%-6px)]'
            }`}
          >
            <div
              className={`relative flex h-full min-h-28 w-[80%] flex-col gap-4 overflow-hidden rounded-r-2xl border border-[#A594F9] border-l-[6px] border-l-[#6B4EFF] bg-white shadow-[0_12px_32px_rgba(107,78,255,0.18)] transition-all duration-600 ${
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
                  <div className="flex w-full flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleRecommend}
                      className="w-[80%] rounded-xl bg-[#6B4EFF] py-2 text-white typo-body6 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    >
                      {isHashtag ? '이 해시태그로 영상 추천받기' : '이 키워드로 영상 추천받기'}
                    </button>
                    <button
                      type="button"
                      onClick={handleYoutubeSearch}
                      className="w-full rounded-xl border border-[#6B4EFF] bg-white py-2 text-[#6B4EFF] typo-body6 transition-all duration-200 hover:bg-[#6B4EFF]/8 active:scale-[0.98]"
                    >
                      {isHashtag
                        ? '이 해시태그 관련 유튜브 영상 탐색하기'
                        : '이 키워드 관련 유튜브 영상 탐색하기'}
                    </button>
                  </div>
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
