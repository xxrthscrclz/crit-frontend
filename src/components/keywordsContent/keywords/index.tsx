import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import useKeywordStore from '@/stores/useKeywordStore';
import useTrendKeywordsStore from '@/stores/useTrendKeywordsStore';
import { brandWordCloudPalette, brandWordCloudPaletteDark } from '@/constants/colors';
import useThemeStore from '@/stores/useThemeStore';
import type { KeywordData } from '@/stores/useTrendKeywordsStore';

interface KeywordsProps {
  isShifted?: boolean;
}

const Keywords = ({ isShifted = false }: KeywordsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const setSelectedKeyword = useKeywordStore(s => s.setSelectedKeyword);
  const keywords = useTrendKeywordsStore(s => s.keywords);
  const isLoading = useTrendKeywordsStore(s => s.isLoading);
  const theme = useThemeStore(s => s.theme);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setRefreshKey(prev => prev + 1);
        setIsFading(false);
      }, 500);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const width = Math.max(280, Math.min(container.clientWidth, 800));
      const height = Math.round(width * 0.75);
      setDimensions({ width, height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || keywords.length === 0) return;

    const { width, height } = dimensions;

    d3.select(svgRef.current).selectAll('*').remove();

    const maxValue = Math.max(...keywords.map(d => d.value));
    const minValue = Math.min(...keywords.map(d => d.value));
    const fontScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range([10, Math.min(70, width / 12)]);

    const colors = theme === 'dark' ? brandWordCloudPaletteDark : brandWordCloudPalette;

    const layout = cloud<KeywordData & cloud.Word>()
      .size([width, height])
      .words(keywords.map(d => ({ ...d, size: fontScale(d.value) })))
      .padding(3)
      .rotate(() => (Math.random() > 0.7 ? 90 : 0))
      .font('Pretendard')
      .fontSize(d => d.size || 12)
      .on('end', words => {
        const svg = d3
          .select(svgRef.current)
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2},${height / 2})`);

        svg
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('font-family', 'Pretendard')
          .style('font-weight', '600')
          .style('fill', () => colors[Math.floor(Math.random() * colors.length)])
          .style('cursor', 'pointer')
          .style('opacity', 0)
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
          .text(d => d.text || '')
          .transition()
          .duration(800)
          .delay((_, i) => i * 1)
          .style('opacity', 1);

        svg.selectAll('text').on('click', function () {
          const d = d3.select(this).datum() as KeywordData & cloud.Word;
          setSelectedKeyword({ text: d.text || '', value: d.value });
        });
      });

    layout.start();
  }, [dimensions, keywords, setSelectedKeyword, refreshKey, theme]);

  const placeholderClass =
    'flex w-[800px] h-[600px] items-center justify-center max-md:h-[min(75vw,600px)] max-md:min-h-[220px] max-md:w-full max-md:max-w-[800px]';

  if (isLoading) {
    return (
      <div ref={containerRef} className={placeholderClass}>
        <div className="text-gray-400 animate-loading-pulse typo-body3">
          트렌드 키워드를 불러오는 중...
        </div>
      </div>
    );
  }

  if (keywords.length === 0) {
    return (
      <div ref={containerRef} className={placeholderClass}>
        <div className="text-gray-400 typo-body3">키워드 데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`flex w-full max-w-[800px] items-center justify-center transition-all duration-500 ease-in-out ${
        isShifted ? '-translate-x-20 max-md:translate-x-0' : 'translate-x-0'
      } ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      <svg ref={svgRef} className="max-w-full" />
    </div>
  );
};

export default Keywords;
