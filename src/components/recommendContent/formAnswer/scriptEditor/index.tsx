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
      <div className="inline-flex w-full h-102 py-6 pl-6 pr-5 gap-5 rounded-xl bg-[#fff] border border-[#A594F9]">
        <div className="flex flex-1 flex-col gap-4 animate-fade-in-up">
          <div className="flex w-full justify-between items-center gap-4">
            <div className="typo-title-bold text-[#0A0A0A]">AI 대본 초안</div>
            <button
              type="button"
              onClick={() => setShowFullScriptModal(true)}
              disabled={!canGenerateFullScript}
              className="shrink-0 px-4 py-1.5 rounded-lg bg-[#7C5CFF] text-white typo-body6 transition-colors hover:bg-[#C4B8FF] hover:text-[#6452CE] active:bg-[#C4B8FF] active:text-[#6452CE] disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed cursor-pointer"
            >
              풀버전 대본 생성
            </button>
          </div>
          <div className="relative group w-full flex-1 min-h-0">
            <div className="h-full rounded-xl bg-[#FAFAFA] border border-[#A594F9] py-4 px-3">
              <div className="h-full overflow-y-auto script-scroll">
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
                className={`absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-[#A594F9] bg-white/90 px-2 py-1 shadow-sm opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 cursor-pointer ${copied ? 'text-[#6B4EFF]' : 'text-[#0a0a0a89] active:text-[#6B4EFF]'}`}
              >
                {!copied && <CopyIcon className="w-4 h-4" />}
                <span className="typo-label">{copied ? '복사완료' : '복사'}</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex w-70 shrink-0 flex-col gap-4 animate-fade-in-up animate-delay-150">
          <div className="flex w-full typo-title-bold text-[#0A0A0A] items-stretch">
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
