import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { Appearance } from 'react-native';
import { useSettingsStore } from '../../store/settingsStore';
import { Theme } from '../../types/settings';

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeId: string) => void;
  isDarkTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

/**
 * Determines if a theme should use iOS dark mode
 * dark & midnight = dark mode; sepia & light = light mode
 */
function getIsDarkTheme(themeId: string): boolean {
  return themeId === 'dark' || themeId === 'midnight';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const isDarkTheme = getIsDarkTheme(theme.id);

  // Signal color scheme to iOS for native components (glass effects, status bar, etc.)
  useEffect(() => {
    const colorScheme = isDarkTheme ? 'dark' : 'light';
    Appearance.setColorScheme(colorScheme);
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
