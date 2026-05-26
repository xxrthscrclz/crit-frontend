export type ScriptBlock =
  | { type: 'section'; label: string }
  | { type: 'stage'; label: string }
  | { type: 'text'; content: string };

const normalizeRawScript = (text: string) => text.replace(/\\n/g, '\n').trim();

const isStageDirection = (label: string) =>
  /카메라|화면|컷|B-roll|자막|전환|엔딩|미디어/i.test(label);

const isSectionHeader = (label: string) =>
  /부$|인트로|본론|클로징|마무리|오프닝|아웃트로|훅/i.test(label);

/** 풀버전·짧은 대본 공통 블록 파싱 */
export const parseScriptBlocks = (text: string): ScriptBlock[] => {
  const lines = normalizeRawScript(text)
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const blocks: ScriptBlock[] = [];

  for (const line of lines) {
    const bracketMatch = line.match(/^\[([^\]]+)\](.*)$/);
    if (!bracketMatch) {
      blocks.push({ type: 'text', content: line });
      continue;
    }

    const label = bracketMatch[1].trim();
    const rest = bracketMatch[2].trim();

    if (isStageDirection(label)) {
      blocks.push({ type: 'stage', label: `[${label}]` });
      if (rest) blocks.push({ type: 'text', content: rest });
      continue;
    }

    if (isSectionHeader(label)) {
      blocks.push({
        type: 'section',
        label: rest ? `[${label}] ${rest}` : `[${label}]`,
      });
      continue;
    }

    blocks.push({ type: 'stage', label: `[${label}]` });
    if (rest) blocks.push({ type: 'text', content: rest });
  }

  return blocks;
};

/** 복사·PDF용 평문 */
export const formatScriptPlainText = (text: string) => {
  return parseScriptBlocks(text)
    .map(block => {
      if (block.type === 'text') return block.content;
      return block.label;
    })
    .join('\n\n');
};
