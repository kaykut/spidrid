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
  setFontFamily: (family: import('../types/settings').FontFamily) => void;
  setHapticFeedback: (enabled: boolean) => void;
  setUserName: (name: string) => void;
  setReadingLanguage: (language: string) => void;
  setParagraphPauseEnabled: (enabled: boolean) => void;
  setMoveFinishedToHistory: (enabled: boolean) => void;
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
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setHapticFeedback: (hapticFeedback) => set({ hapticFeedback }),
      setUserName: (userName) => set({ userName }),
      setReadingLanguage: (readingLanguage) => set({ readingLanguage }),
      setParagraphPauseEnabled: (paragraphPauseEnabled) => set({ paragraphPauseEnabled }),
      setMoveFinishedToHistory: (moveFinishedToHistory) => set({ moveFinishedToHistory }),
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
        fontFamily: state.fontFamily,
        hapticFeedback: state.hapticFeedback,
        userName: state.userName,
        readingLanguage: state.readingLanguage,
        paragraphPauseEnabled: state.paragraphPauseEnabled,
        moveFinishedToHistory: state.moveFinishedToHistory,
        activeContentTab: state.activeContentTab,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.themeId && themes[state.themeId]) {
          state.theme = themes[state.themeId];
        }
      },
    }
  )
);
