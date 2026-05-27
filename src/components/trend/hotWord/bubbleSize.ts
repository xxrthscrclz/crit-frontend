/** 검색량·사용량 + 순위 → 버블 sizeScale (0.35 ~ 1) */
export const getBubbleSizeScale = (
  value: number,
  minValue: number,
  maxValue: number,
  rankIndex: number,
  total: number,
) => {
  if (total <= 0) return 0.85;
  if (total === 1) return 1;

  const valueRatio = maxValue === minValue ? 1 : (value - minValue) / (maxValue - minValue);
  const rankRatio = 1 - rankIndex / (total - 1);
  const blended = valueRatio * 0.45 + rankRatio * 0.55;
  const eased = Math.pow(blended, 0.65);

  return 0.35 + eased * 0.65;
};
