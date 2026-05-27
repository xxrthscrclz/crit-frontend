import { useEffect, useRef, useState } from 'react';
import CopyIcon from '@/assets/icons/copy-icon.svg?react';
import RefreshIcon from '@/assets/icons/refresh-icon.svg?react';

interface VideoTitleProps {
  title: string;
  isRegenerating?: boolean;
  onRegenerate?: () => void | Promise<void>;
}

const FADE_DURATION_MS = 300;

const VideoTitle = ({ title, isRegenerating = false, onRegenerate }: VideoTitleProps) => {
  const [copied, setCopied] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(title);
  const [opacity, setOpacity] = useState(1);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    if (title === prevTitleRef.current) return;

    const prevTitle = prevTitleRef.current;
    prevTitleRef.current = title;

    if (!prevTitle && title) {
      const timer = window.setTimeout(() => {
        setDisplayTitle(title);
        setOpacity(1);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const fadeOutTimer = window.setTimeout(() => setOpacity(0), 0);
    const fadeInTimer = window.setTimeout(() => {
      setDisplayTitle(title);
      requestAnimationFrame(() => setOpacity(1));
    }, FADE_DURATION_MS);

    return () => {
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(fadeInTimer);
    };
  }, [title]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayTitle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    if (isRegenerating || !onRegenerate) return;
    onRegenerate();
  };

  const formattedTitle = displayTitle ? displayTitle.replace(/\(/g, '\n(') : '';

  return (
    <div className="flex items-center justify-end gap-10 self-stretch rounded-xl border border-[#A594F9] bg-[#FAFAFA] px-4 py-3 max-md:flex-col max-md:gap-3 max-md:px-3">
      <div
        className="w-64 typo-body4-semibold text-black whitespace-pre-line transition-opacity ease-in-out max-md:min-w-0 max-md:flex-1 max-md:w-full"
        style={{ opacity, transitionDuration: `${FADE_DURATION_MS}ms` }}
      >
        {displayTitle ? (
          formattedTitle
        ) : (
          <span className="text-gray-400 animate-loading-pulse">제목을 생성하고 있습니다...</span>
        )}
      </div>
      <div className="flex h-12 w-17 flex-col justify-end max-md:h-auto max-md:w-auto max-md:flex-row max-md:gap-4">
        <div
          onClick={handleCopy}
          className={`flex justify-end items-center gap-1.5 cursor-pointer ${copied ? 'text-[#6B4EFF]' : 'text-[#0a0a0a89] active:text-[#6B4EFF]'}`}
        >
          {!copied && <CopyIcon className="w-4 h-4" />}
          <div className="typo-label">{copied ? '복사완료' : '복사'}</div>
        </div>
        <div
          onClick={handleRegenerate}
          className={`flex justify-end items-center gap-1.5 ${isRegenerating || !onRegenerate ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${isRegenerating ? 'text-[#6B4EFF]' : 'text-[#0a0a0a89] active:text-[#6B4EFF]'}`}
        >
          <RefreshIcon className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          <div className="typo-label">{isRegenerating ? '생성 중' : '다시생성'}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
