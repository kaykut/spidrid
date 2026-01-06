import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSettings, DEFAULT_SETTINGS, Theme } from '../types/settings';
import { themes } from '../data/themes';

interface SettingsState extends UserSettings {
  theme: Theme;
  setTheme: (themeId: string) => void;
  setDefaultWPM: (wpm: number) => void;
  setShowCrosshairs: (show: boolean) => void;
  setCrosshairOpacity: (opacity: number) => void;
  setFontSize: (size: number) => void;
  setHapticFeedback: (enabled: boolean) => void;
  setUserName: (name: string) => void;
  setReadingLanguage: (language: string) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      theme: themes[DEFAULT_SETTINGS.themeId],

      setTheme: (themeId) => set({
        themeId,
        theme: themes[themeId] || themes.dark
      }),

      setDefaultWPM: (defaultWPM) => set({ defaultWPM }),
      setShowCrosshairs: (showCrosshairs) => set({ showCrosshairs }),
      setCrosshairOpacity: (crosshairOpacity) => set({ crosshairOpacity }),
      setFontSize: (fontSize) => set({ fontSize }),
      setHapticFeedback: (hapticFeedback) => set({ hapticFeedback }),
      setUserName: (userName) => set({ userName }),
      setReadingLanguage: (readingLanguage) => set({ readingLanguage }),

      resetSettings: () => set({
        ...DEFAULT_SETTINGS,
        theme: themes[DEFAULT_SETTINGS.themeId],
      }),
    }),
    {
      name: 'spidrid-settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        themeId: state.themeId,
        defaultWPM: state.defaultWPM,
        showCrosshairs: state.showCrosshairs,
        crosshairOpacity: state.crosshairOpacity,
        fontSize: state.fontSize,
        hapticFeedback: state.hapticFeedback,
        userName: state.userName,
        readingLanguage: state.readingLanguage,
      }),
    }
  )
);
