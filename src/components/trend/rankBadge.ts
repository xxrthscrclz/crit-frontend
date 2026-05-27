export const getTrendRankBadgeClass = (rank: number) => {
  if (rank === 1) {
    return 'border-[#F5D76E] bg-linear-to-br from-[#FFF8E7] to-[#FFE9A8] text-[#9A7209]';
  }
  if (rank === 2) {
    return 'border-[#D0D0D0] bg-linear-to-br from-[#F8F8F8] to-[#ECECEC] text-[#5C5C5C]';
  }
  if (rank === 3) {
    return 'border-[#E8B49A] bg-linear-to-br from-[#FFF0E8] to-[#FFD4B8] text-[#B85C20]';
  }
  return 'border-[#E8E2FF] bg-[#F3EEFF] text-[#6B4EFF]';
};
