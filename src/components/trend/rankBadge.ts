export const getTrendRankBadgeClass = (rank: number) => {
  if (rank === 1) {
    return 'rank-badge-gold border';
  }
  if (rank === 2) {
    return 'rank-badge-silver border';
  }
  if (rank === 3) {
    return 'rank-badge-bronze border';
  }
  return 'border-accent-muted bg-accent-soft text-brand';
};
