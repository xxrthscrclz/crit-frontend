import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@/assets/icons/user-info-icons/close-icon.svg?react';
import CopyIcon from '@/assets/icons/copy-icon.svg?react';
import DownloadIcon from '@/assets/icons/download-icon.svg?react';
import { postAIFullScript } from '@/api/command';
import useRecommendStore from '@/stores/useRecommendStore';
import { formatScriptPlainText } from '@/utils/formatScript';
import { downloadElementAsPdf } from '@/utils/downloadElementAsPdf';
import ScriptBlockContent from '@/components/recommendContent/formAnswer/scriptEditor/scriptBlockContent';
import { useShallow } from 'zustand/react/shallow';

interface FullScriptModalProps {
  onClose: () => void;
}

const FullScriptModal = ({ onClose }: FullScriptModalProps) => {
  const { formInput, recommendations, selectedSubjectIndex } = useRecommendStore(
    useShallow(s => ({
      formInput: s.formInput,
      recommendations: s.recommendations,
      selectedSubjectIndex: s.selectedSubjectIndex,
    })),
  );

  const [script, setScript] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const subject = selectedSubjectIndex != null ? recommendations[selectedSubjectIndex] : null;

    const fetchFullScript = async () => {
      setIsLoading(true);
      setErrorMsg('');

      try {
        const res = await postAIFullScript({
          requestURL: formInput.requestURL,
          title: subject?.suggestedTitle ?? '',
          concept: subject?.conceptSummary ?? '',
          keywords: formInput.keywords,
          category: formInput.category,
          videoType: formInput.videoType,
          time: formInput.videoType === 'short' ? null : formInput.time,
        });
        setScript(res.conceptSummary ?? '');
      } catch (err) {
        console.error('풀버전 대본 요청 실패:', err);
        setErrorMsg('풀버전 대본을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchFullScript();
  }, [formInput, recommendations, selectedSubjectIndex]);

  const handleCopy = async () => {
    if (!script) return;
    await navigator.clipboard.writeText(formatScriptPlainText(script));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePdfDownload = async () => {
    if (!pdfContentRef.current) return;

    setIsPdfDownloading(true);
    try {
      await downloadElementAsPdf(pdfContentRef.current, '풀버전_AI_대본.pdf');
    } catch (err) {
      console.error('PDF 저장 실패:', err);
    } finally {
      setIsPdfDownloading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 animate-fade-in px-6"
      onClick={onClose}
    >
      <div
        className="flex flex-col w-full max-w-200 max-h-[85vh] bg-white rounded-xl border-2 border-accent shadow-[0_4px_24px_rgba(130,87,180,0.25)] animate-modal-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between px-6 py-5 border-b border-accent-muted">
          <h2 className="typo-title-bold text-brand-deep">풀버전 AI 대본</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-placeholder hover:text-brand hover:bg-accent-soft cursor-pointer transition-colors"
            aria-label="닫기"
          >
            <CloseIcon className="crit-icon-brand w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5 script-scroll">
          {isLoading ? (
            <div className="flex flex-col gap-3 py-8">
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-4 rounded-md bg-accent-soft animate-loading-pulse"
                  style={{ width: `${85 - i * 12}%` }}
                />
              ))}
              <p className="text-center text-gray-400 typo-body5 pt-4 animate-loading-pulse">
                AI가 풀버전 대본을 작성하고 있습니다...
              </p>
            </div>
          ) : errorMsg ? (
            <p className="text-red-500 typo-body5 text-center py-8">{errorMsg}</p>
          ) : (
            <div ref={pdfContentRef}>
              <ScriptBlockContent raw={script} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-accent-muted">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!script || isLoading}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border border-brand-secondary bg-white typo-label transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              copied ? 'text-brand' : 'text-placeholder hover:text-brand active:text-brand'
            }`}
          >
            {!copied && <CopyIcon className="w-4 h-4" />}
            <span>{copied ? '복사완료' : '복사'}</span>
          </button>
          <button
            type="button"
            onClick={handlePdfDownload}
            disabled={!script || isLoading || isPdfDownloading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-brand-secondary bg-white text-placeholder hover:text-brand active:text-brand typo-label transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>{isPdfDownloading ? '저장 중...' : 'PDF 저장'}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default FullScriptModal;
