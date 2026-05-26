/** "게임" | "게임, 여행" | "{게임}" → API용 "{게임, 여행}" */
export const toBraceFormat = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return '{}';

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed;
  }

  const items = trimmed
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);

  return `{${items.join(', ')}}`;
};

/** "{게임, 여행}" → 화면 표시용 "게임, 여행" */
export const fromBraceFormat = (value: string): string => {
  return value.replace(/^\{|\}$/g, '').trim();
};

/** "{게임, 여행}" → ["게임", "여행"] */
export const parseBraceList = (value: string): string[] => {
  const inner = fromBraceFormat(value);
  if (!inner) return [];

  return inner
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
};
