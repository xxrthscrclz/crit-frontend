import { metaThemeColor } from '@/constants/colors';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'crit-theme';

export const applyTheme = (theme: ThemeMode) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', metaThemeColor[theme]);
  }
};

export const getStoredTheme = (): ThemeMode => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { state?: { theme?: ThemeMode } };
      if (parsed.state?.theme === 'dark' || parsed.state?.theme === 'light') {
        return parsed.state.theme;
      }
    }
  } catch {
    // ignore
  }
  return 'light';
};

export const initTheme = () => {
  applyTheme(getStoredTheme());
};
