/**
 * Tests for Settings Store.
 *
 * Manages user preferences including theme, WPM, and UI settings.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useSettingsStore } from '../../src/store/settingsStore';
import { DEFAULT_SETTINGS } from '../../src/types/settings';
import { themes } from '../../src/data/themes';

describe('settingsStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useSettingsStore());
    act(() => {
      result.current.resetSettings();
    });
  });

  describe('initial state', () => {
    it('starts with default themeId (dark)', () => {
      const { result } = renderHook(() => useSettingsStore());
      expect(result.current.themeId).toBe(DEFAULT_SETTINGS.themeId);
      expect(result.current.themeId).toBe('dark');
    });

    it('starts with default WPM (250)', () => {
      const { result } = renderHook(() => useSettingsStore());
      expect(result.current.defaultWPM).toBe(DEFAULT_SETTINGS.defaultWPM);
      expect(result.current.defaultWPM).toBe(250);
    });

    it('starts with showCrosshairs true', () => {
      const { result } = renderHook(() => useSettingsStore());
      expect(result.current.showCrosshairs).toBe(DEFAULT_SETTINGS.showCrosshairs);
      expect(result.current.showCrosshairs).toBe(true);
    });

    it('starts with crosshairOpacity 0.5', () => {
      const { result } = renderHook(() => useSettingsStore());
      expect(result.current.crosshairOpacity).toBe(DEFAULT_SETTINGS.crosshairOpacity);
      expect(result.current.crosshairOpacity).toBe(0.5);
    });

    it('starts with fontSize 48', () => {
      const { result } = renderHook(() => useSettingsStore());
      expect(result.current.fontSize).toBe(DEFAULT_SETTINGS.fontSize);
      expect(result.current.fontSize).toBe(48);
    });

    it('starts with hapticFeedback true', () => {
      const { result } = renderHook(() => useSettingsStore());
      expect(result.current.hapticFeedback).toBe(DEFAULT_SETTINGS.hapticFeedback);
      expect(result.current.hapticFeedback).toBe(true);
    });

    it('starts with empty userName', () => {
      const { result } = renderHook(() => useSettingsStore());
      expect(result.current.userName).toBe(DEFAULT_SETTINGS.userName);
      expect(result.current.userName).toBe('');
    });

    it('starts with readingLanguage as en', () => {
      const { result } = renderHook(() => useSettingsStore());
      expect(result.current.readingLanguage).toBe(DEFAULT_SETTINGS.readingLanguage);
      expect(result.current.readingLanguage).toBe('en');
    });

    it('has theme object matching themeId', () => {
      const { result } = renderHook(() => useSettingsStore());
      expect(result.current.theme).toBe(themes.dark);
      expect(result.current.theme.id).toBe('dark');
    });
  });

  describe('setTheme()', () => {
    it('updates themeId', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setTheme('sepia');
      });

      expect(result.current.themeId).toBe('sepia');
    });

    it('updates theme object', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setTheme('midnight');
      });

      expect(result.current.theme).toBe(themes.midnight);
      expect(result.current.theme.id).toBe('midnight');
    });

    it('falls back to dark theme for invalid themeId', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setTheme('nonexistent');
      });

      expect(result.current.theme).toBe(themes.dark);
    });

    it('can switch between all themes', () => {
      const { result } = renderHook(() => useSettingsStore());

      const themeIds = ['dark', 'midnight', 'sepia', 'light'];

      themeIds.forEach((themeId) => {
        act(() => {
          result.current.setTheme(themeId);
        });

        expect(result.current.themeId).toBe(themeId);
        expect(result.current.theme.id).toBe(themeId);
      });
    });
  });

  describe('setDefaultWPM()', () => {
    it('updates defaultWPM', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setDefaultWPM(300);
      });

      expect(result.current.defaultWPM).toBe(300);
    });

    it('can set to minimum value', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setDefaultWPM(50);
      });

      expect(result.current.defaultWPM).toBe(50);
    });

    it('can set to maximum value', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setDefaultWPM(1500);
      });

      expect(result.current.defaultWPM).toBe(1500);
    });
  });

  describe('setShowCrosshairs()', () => {
    it('can set to false', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setShowCrosshairs(false);
      });

      expect(result.current.showCrosshairs).toBe(false);
    });

    it('can set to true', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setShowCrosshairs(false);
      });

      act(() => {
        result.current.setShowCrosshairs(true);
      });

      expect(result.current.showCrosshairs).toBe(true);
    });
  });

  describe('setCrosshairOpacity()', () => {
    it('updates crosshairOpacity', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setCrosshairOpacity(0.8);
      });

      expect(result.current.crosshairOpacity).toBe(0.8);
    });

    it('can set to 0', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setCrosshairOpacity(0);
      });

      expect(result.current.crosshairOpacity).toBe(0);
    });

    it('can set to 1', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setCrosshairOpacity(1);
      });

      expect(result.current.crosshairOpacity).toBe(1);
    });
  });

  describe('setFontSize()', () => {
    it('updates fontSize', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setFontSize(36);
      });

      expect(result.current.fontSize).toBe(36);
    });

    it('can set small font size', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setFontSize(24);
      });

      expect(result.current.fontSize).toBe(24);
    });

    it('can set large font size', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setFontSize(72);
      });

      expect(result.current.fontSize).toBe(72);
    });
  });

  describe('setHapticFeedback()', () => {
    it('can set to false', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setHapticFeedback(false);
      });

      expect(result.current.hapticFeedback).toBe(false);
    });

    it('can set to true', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setHapticFeedback(false);
      });

      act(() => {
        result.current.setHapticFeedback(true);
      });

      expect(result.current.hapticFeedback).toBe(true);
    });
  });

  describe('setUserName()', () => {
    it('updates userName', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setUserName('John Doe');
      });

      expect(result.current.userName).toBe('John Doe');
    });

    it('can set empty userName', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setUserName('John');
      });

      act(() => {
        result.current.setUserName('');
      });

      expect(result.current.userName).toBe('');
    });

    it('preserves special characters', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setUserName('Jöhn O\'Dóe');
      });

      expect(result.current.userName).toBe('Jöhn O\'Dóe');
    });
  });

  describe('setReadingLanguage()', () => {
    it('updates readingLanguage', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setReadingLanguage('es');
      });

      expect(result.current.readingLanguage).toBe('es');
    });

    it('can set to any language code', () => {
      const { result } = renderHook(() => useSettingsStore());

      const languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'hi', 'ru'];

      languages.forEach((lang) => {
        act(() => {
          result.current.setReadingLanguage(lang);
        });

        expect(result.current.readingLanguage).toBe(lang);
      });
    });
  });

  describe('resetSettings()', () => {
    it('restores all settings to defaults', () => {
      const { result } = renderHook(() => useSettingsStore());

      // Change all settings
      act(() => {
        result.current.setTheme('sepia');
        result.current.setDefaultWPM(500);
        result.current.setShowCrosshairs(false);
        result.current.setCrosshairOpacity(0.8);
        result.current.setFontSize(60);
        result.current.setHapticFeedback(false);
        result.current.setUserName('Test User');
        result.current.setReadingLanguage('fr');
      });

      // Reset
      act(() => {
        result.current.resetSettings();
      });

      // Verify all defaults
      expect(result.current.themeId).toBe('dark');
      expect(result.current.defaultWPM).toBe(250);
      expect(result.current.showCrosshairs).toBe(true);
      expect(result.current.crosshairOpacity).toBe(0.5);
      expect(result.current.fontSize).toBe(48);
      expect(result.current.hapticFeedback).toBe(true);
      expect(result.current.userName).toBe('');
      expect(result.current.readingLanguage).toBe('en');
    });

    it('restores theme object', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setTheme('light');
      });

      act(() => {
        result.current.resetSettings();
      });

      expect(result.current.theme).toBe(themes.dark);
    });
  });

  describe('theme object', () => {
    it('has correct color properties', () => {
      const { result } = renderHook(() => useSettingsStore());

      const theme = result.current.theme;

      expect(theme).toHaveProperty('id');
      expect(theme).toHaveProperty('name');
      expect(theme).toHaveProperty('backgroundColor');
      expect(theme).toHaveProperty('textColor');
      expect(theme).toHaveProperty('orpColor');
      expect(theme).toHaveProperty('crosshairColor');
      expect(theme).toHaveProperty('accentColor');
      expect(theme).toHaveProperty('secondaryBackground');
    });

    it('dark theme has expected colors', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme.id).toBe('dark');
      expect(result.current.theme.backgroundColor).toBeDefined();
      expect(result.current.theme.textColor).toBeDefined();
    });

    it('light theme has expected colors', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setTheme('light');
      });

      expect(result.current.theme.id).toBe('light');
      expect(result.current.theme.backgroundColor).toBeDefined();
      expect(result.current.theme.textColor).toBeDefined();
    });

    it('sepia theme has expected colors', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setTheme('sepia');
      });

      expect(result.current.theme.id).toBe('sepia');
      expect(result.current.theme.backgroundColor).toBeDefined();
      expect(result.current.theme.textColor).toBeDefined();
    });

    it('midnight theme has expected colors', () => {
      const { result } = renderHook(() => useSettingsStore());

      act(() => {
        result.current.setTheme('midnight');
      });

      expect(result.current.theme.id).toBe('midnight');
      expect(result.current.theme.backgroundColor).toBeDefined();
      expect(result.current.theme.textColor).toBeDefined();
    });
  });
});
