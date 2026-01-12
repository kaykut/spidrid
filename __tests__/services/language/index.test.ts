/**
 * Tests for the Language Services Public API
 */

import { getCurrentAdapter, getAdapterForContent, detectLanguage } from '../../../src/services/language/index';
import { useSettingsStore } from '../../../src/store/settingsStore';

// Mock the settings store
jest.mock('../../../src/store/settingsStore', () => ({
  useSettingsStore: Object.assign(
    jest.fn((selector) => {
      const state = { readingLanguage: 'en' };
      return selector ? selector(state) : state;
    }),
    {
      getState: jest.fn(() => ({ readingLanguage: 'en' })),
    }
  ),
}));

describe('Language Services Public API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to English
    (useSettingsStore.getState as jest.Mock).mockReturnValue({ readingLanguage: 'en' });
  });

  describe('getCurrentAdapter', () => {
    it('should return English adapter when setting is "en"', () => {
      (useSettingsStore.getState as jest.Mock).mockReturnValue({ readingLanguage: 'en' });
      const adapter = getCurrentAdapter();
      expect(adapter.code).toBe('en');
    });

    it('should return English adapter when setting is "auto"', () => {
      (useSettingsStore.getState as jest.Mock).mockReturnValue({ readingLanguage: 'auto' });
      const adapter = getCurrentAdapter();
      expect(adapter.code).toBe('en'); // Fallback for auto
    });

    it('should return adapter for specified language', () => {
      (useSettingsStore.getState as jest.Mock).mockReturnValue({ readingLanguage: 'es' });
      const adapter = getCurrentAdapter();
      // Currently falls back to English until Spanish adapter is implemented
      expect(adapter).toBeDefined();
      expect(typeof adapter.hyphenateSync).toBe('function');
    });
  });

  describe('getAdapterForContent', () => {
    it('should return specified language adapter when override is not "auto"', () => {
      const adapter = getAdapterForContent('Some text', 'en');
      expect(adapter.code).toBe('en');
    });

    it('should detect language when override is "auto"', () => {
      const adapter = getAdapterForContent('The quick brown fox jumps over the lazy dog.', 'auto');
      // Currently detection returns English
      expect(adapter.code).toBe('en');
    });

    it('should fall back to English for empty text with auto', () => {
      const adapter = getAdapterForContent('', 'auto');
      expect(adapter.code).toBe('en');
    });

    it('should use detection when no override specified', () => {
      const adapter = getAdapterForContent('Some English text here.');
      expect(adapter.code).toBe('en');
    });
  });

  describe('detectLanguage', () => {
    it('should return null for very short text', () => {
      const result = detectLanguage('Hi');
      expect(result).toBeNull();
    });

    it('should return a language code for longer text', () => {
      // Detection requires at least 10 words for reliability
      const result = detectLanguage('The quick brown fox jumps over the lazy dog. This is a test sentence that has enough words for detection.');
      expect(result).toBe('en');
    });
  });

  describe('exports', () => {
    it('should export getAdapter from registry', () => {
      const { getAdapter } = require('../../../src/services/language/index');
      expect(typeof getAdapter).toBe('function');
    });

    it('should export isSupported from registry', () => {
      const { isSupported } = require('../../../src/services/language/index');
      expect(typeof isSupported).toBe('function');
    });

    it('should export getSupportedLanguages from registry', () => {
      const { getSupportedLanguages } = require('../../../src/services/language/index');
      expect(typeof getSupportedLanguages).toBe('function');
    });

    it('should export type LanguageAdapter', () => {
      // Type exports can't be tested at runtime, but we can verify the module structure
      const langModule = require('../../../src/services/language/index');
      expect(langModule).toBeDefined();
    });
  });
});
