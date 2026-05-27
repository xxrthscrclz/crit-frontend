import { useState } from 'react';
import CopyIcon from '@/assets/icons/copy-icon.svg?react';
import FullScriptModal from '@/components/recommendContent/formAnswer/scriptEditor/fullScriptModal';
import ReferenceList from '@/components/recommendContent/formAnswer/scriptEditor/referenceList';
import ScriptBlockContent from '@/components/recommendContent/formAnswer/scriptEditor/scriptBlockContent';
import useAIFormStore from '@/stores/useAIFormStore';
import useRecommendStore from '@/stores/useRecommendStore';
import { formatScriptPlainText } from '@/utils/formatScript';

const ScriptEditor = () => {
  const [showFullScriptModal, setShowFullScriptModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const data = useAIFormStore(s => s.data);
  const selectedSubjectIndex = useRecommendStore(s => s.selectedSubjectIndex);
  const draftScript = data?.conceptSummary ?? '';
  const canGenerateFullScript = selectedSubjectIndex !== null;

  const handleCopy = async () => {
    if (!draftScript) return;
    await navigator.clipboard.writeText(formatScriptPlainText(draftScript));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="inline-flex h-102 w-full flex-row gap-5 rounded-xl border border-brand-secondary bg-surface py-6 pl-6 pr-5 max-md:h-full max-md:flex-col max-md:gap-4 max-md:py-4 max-md:pl-4 max-md:pr-3">
        <div className="flex flex-1 flex-col gap-4 animate-fade-in-up max-md:min-h-48 max-md:gap-3">
          <div className="flex w-full items-center justify-between gap-4 max-md:flex-col max-md:items-start max-md:gap-2">
            <div className="typo-title-bold text-primary">AI 대본 초안</div>
            <button
              type="button"
              onClick={() => setShowFullScriptModal(true)}
              disabled={!canGenerateFullScript}
              className="shrink-0 cursor-pointer rounded-lg bg-brand-strong px-4 py-1.5 text-white typo-body6 transition-colors hover:bg-accent-muted hover:text-brand-deep active:bg-accent-muted active:text-brand-deep disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white max-md:px-3"
            >
              풀버전 대본 생성
            </button>
          </div>
          <div className="group relative min-h-0 w-full flex-1 max-md:min-h-40">
            <div className="h-full rounded-xl border border-brand-secondary bg-surface-raised px-3 py-4 max-md:min-h-40 max-md:py-3">
              <div className="h-full overflow-y-auto script-scroll max-md:max-h-64">
                {draftScript ? (
                  <ScriptBlockContent raw={draftScript} />
                ) : (
                  <span className="animate-loading-pulse text-gray-400 typo-body4-semibold">
                    검색 후 대본이 표시됩니다.
                  </span>
                )}
              </div>
            </div>
            {draftScript && (
              <button
                type="button"
                onClick={handleCopy}
                className={`absolute bottom-3 right-3 flex cursor-pointer items-center gap-1.5 rounded-lg border border-brand-secondary bg-white/90 px-2 py-1 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100 ${copied ? 'text-brand' : 'text-placeholder active:text-brand'}`}
              >
                {!copied && <CopyIcon className="h-4 w-4" />}
                <span className="typo-label">{copied ? '복사완료' : '복사'}</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex w-70 shrink-0 flex-col gap-4 animate-fade-in-up animate-delay-150 max-md:w-full max-md:gap-3">
          <div className="flex w-full items-stretch typo-title-bold text-primary">
            참고 영상 및 크리에이터 추천
          </div>
          <ReferenceList />
        </div>
      </div>

      {showFullScriptModal && <FullScriptModal onClose={() => setShowFullScriptModal(false)} />}
    </>
  );
};

export default ScriptEditor;
