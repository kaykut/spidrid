import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { themes } from '../data/themes';
import { UserSettings, DEFAULT_SETTINGS, Theme } from '../types/settings';

type ContentTab = 'train' | 'read' | 'learn';

interface SettingsState extends UserSettings {
  theme: Theme;
  activeContentTab: ContentTab;
  setTheme: (themeId: string) => void;
  setDefaultWPM: (wpm: number) => void;
  setShowCrosshairs: (show: boolean) => void;
  setCrosshairOpacity: (opacity: number) => void;
  setFontSize: (size: number) => void;
  setHapticFeedback: (enabled: boolean) => void;
  setUserName: (name: string) => void;
  setReadingLanguage: (language: string) => void;
  setActiveContentTab: (tab: ContentTab) => void;
  resetSettings: () => void;

  // Testing only - directly set state for persona testing
  hydrateForTesting: (state: {
    defaultWPM: number;
    userName: string;
  }) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      theme: themes[DEFAULT_SETTINGS.themeId],
      activeContentTab: 'train' as ContentTab,

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
      setActiveContentTab: (activeContentTab) => set({ activeContentTab }),

      resetSettings: () => set({
        ...DEFAULT_SETTINGS,
        theme: themes[DEFAULT_SETTINGS.themeId],
      }),

      // Testing only
      hydrateForTesting: (testState) => set({
        defaultWPM: testState.defaultWPM,
        userName: testState.userName,
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
        activeContentTab: state.activeContentTab,
      }),
    }
  )
);
