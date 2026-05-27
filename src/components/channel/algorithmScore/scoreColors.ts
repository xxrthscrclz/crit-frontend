export const getScoreColors = (score: number) => {
  if (score <= 30) {
    return {
      fill: 'var(--color-danger)',
      track: 'var(--color-danger-soft)',
    };
  }
  if (score <= 70) {
    return {
      fill: 'var(--color-warning)',
      track: 'var(--color-warning-soft)',
    };
  }
  return {
    fill: 'var(--color-success)',
    track: 'var(--color-success-track-alpha)',
  };
};
