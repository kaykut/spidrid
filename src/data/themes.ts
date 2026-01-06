import { Theme } from '../types/settings';

export const themes: Record<string, Theme> = {
  dark: {
    id: 'dark',
    name: 'Dark',
    backgroundColor: '#0a0a0a',
    textColor: '#ffffff',
    orpColor: '#ff6b6b',
    crosshairColor: '#333333',
    accentColor: '#4dabf7',
    secondaryBackground: '#1a1a1a',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    backgroundColor: '#1a1a2e',
    textColor: '#eaeaea',
    orpColor: '#e94560',
    crosshairColor: '#16213e',
    accentColor: '#0f3460',
    secondaryBackground: '#16213e',
  },
  sepia: {
    id: 'sepia',
    name: 'Sepia',
    backgroundColor: '#f4ecd8',
    textColor: '#5c4033',
    orpColor: '#c41e3a', // Cardinal red - good contrast against brown text
    crosshairColor: '#d4c4a8',
    accentColor: '#704214',
    secondaryBackground: '#ebe3d1',
  },
  light: {
    id: 'light',
    name: 'Light',
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    orpColor: '#dc3545',
    crosshairColor: '#e0e0e0',
    accentColor: '#007bff',
    secondaryBackground: '#f5f5f5',
  },
};

export const themeList = Object.values(themes);
