export const metaThemeColor = {
  light: '#6b4eff',
  dark: '#0f1017',
} as const;

/** PDF 캡처 등 실제 hex가 필요한 경우 */
export const pdfExportBackground = '#ffffff';

/** JS/TS inline style용 — CSS 변수와 동기화 */
export const cssVar = {
  brandPrimary: 'var(--color-brand-primary)',
  brandSecondary: 'var(--color-brand-secondary)',
  brandTertiary: 'var(--color-brand-tertiary)',
  brandStrong: 'var(--color-brand-primary-strong)',
  brandActive: 'var(--color-brand-active)',
  brandDeep: 'var(--color-brand-deep)',
  success: 'var(--color-success)',
  successSoft: 'var(--color-success-soft)',
  successTrack: 'var(--color-success-track)',
  warning: 'var(--color-warning)',
  warningSoft: 'var(--color-warning-soft)',
  danger: 'var(--color-danger)',
  dangerSoft: 'var(--color-danger-soft)',
  chartAccent: 'var(--color-chart-accent)',
  chartAccentSoft: 'var(--color-chart-accent-soft)',
  chartGrid: 'var(--color-chart-grid)',
  bodyMidGray: 'var(--color-body-mid-gray)',
  progressTrack: 'var(--color-progress-track)',
  surface: 'var(--color-bg-surface)',
} as const;

/** 워드클라우드 등 장식용 팔레트 */
export const wordCloudPalette = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#FF8C00',
  '#20B2AA',
  '#9370DB',
  '#3CB371',
  '#FF69B4',
  '#00CED1',
  '#FF9EB5',
  '#7DD3FC',
  '#86EFAC',
  '#FDE68A',
  '#F0ABFC',
  '#FDA4AF',
  '#67E8F9',
  '#A7F3D0',
  '#FCA5A5',
  '#FBBF24',
  '#F9A8D4',
  '#BAE6FD',
] as const;

export const wordCloudPaletteDark = [
  '#FF8A8A',
  '#5EDDD6',
  '#5CC9E0',
  '#A8DCC8',
  '#FFF0A8',
  '#E8B8E8',
  '#FFB347',
  '#40C9C0',
  '#B090E8',
  '#5CD68A',
  '#FF8FC4',
  '#40E0E0',
  '#FFB8CC',
  '#9EE0FF',
  '#A8FFBC',
  '#FFF0A8',
  '#F5C0FF',
  '#FFB8C8',
  '#80F0FF',
  '#C0FFE0',
  '#FFB8B8',
  '#FFD060',
  '#FFB8E0',
  '#C8E8FF',
] as const;

const BRAND_WORD_CLOUD_LIGHT = [
  '#6B4EFF',
  '#8257B4',
  '#9F8CFF',
  '#634DCB',
  '#A594F9',
  '#4F378A',
] as const;

const BRAND_WORD_CLOUD_DARK = [
  '#B4A6FF',
  '#C4B5FD',
  '#D4CBFF',
  '#9F8CFF',
  '#A594F9',
  '#E8E0FF',
] as const;

/** 브랜드 + 장식 워드클라우드 */
export const brandWordCloudPalette = [...BRAND_WORD_CLOUD_LIGHT, ...wordCloudPalette];
export const brandWordCloudPaletteDark = [...BRAND_WORD_CLOUD_DARK, ...wordCloudPaletteDark];
