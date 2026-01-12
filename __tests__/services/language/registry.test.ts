/**
 * Tests for the Language Adapter Registry
 */

import { getAdapter, isSupported, getSupportedLanguages } from '../../../src/services/language/registry';
import { englishAdapter } from '../../../src/services/language/adapters/EnglishAdapter';

describe('Language Registry', () => {
  describe('getAdapter', () => {
    it('should return English adapter for "en"', () => {
      const adapter = getAdapter('en');
      expect(adapter.code).toBe('en');
      expect(adapter.name).toBe('English');
    });

    it('should return English adapter as fallback for unknown language', () => {
      const adapter = getAdapter('xx');
      expect(adapter.code).toBe('en');
    });

    it('should return English adapter as fallback for empty string', () => {
      const adapter = getAdapter('');
      expect(adapter.code).toBe('en');
    });

    it('should return a valid adapter with hyphenateSync method', () => {
      const adapter = getAdapter('en');
      expect(typeof adapter.hyphenateSync).toBe('function');
    });
  });

  describe('isSupported', () => {
    it('should return true for "en"', () => {
      expect(isSupported('en')).toBe(true);
    });

    it('should return true for planned languages (es, fr, de, pt, it)', () => {
      expect(isSupported('es')).toBe(true);
      expect(isSupported('fr')).toBe(true);
      expect(isSupported('de')).toBe(true);
      expect(isSupported('pt')).toBe(true);
      expect(isSupported('it')).toBe(true);
    });

    it('should return false for unsupported languages', () => {
      expect(isSupported('xx')).toBe(false);
      expect(isSupported('zh')).toBe(false);
      expect(isSupported('ja')).toBe(false);
    });
  });

  describe('getSupportedLanguages', () => {
    it('should return an array of language codes', () => {
      const languages = getSupportedLanguages();
      expect(Array.isArray(languages)).toBe(true);
      expect(languages.length).toBeGreaterThan(0);
    });

    it('should include English', () => {
      const languages = getSupportedLanguages();
      expect(languages).toContain('en');
    });

    it('should include all planned Latin-script languages', () => {
      const languages = getSupportedLanguages();
      expect(languages).toContain('es');
      expect(languages).toContain('fr');
      expect(languages).toContain('de');
      expect(languages).toContain('pt');
      expect(languages).toContain('it');
    });

    it('should have exactly 6 supported languages', () => {
      const languages = getSupportedLanguages();
      expect(languages.length).toBe(6);
    });
  });

  describe('adapter consistency', () => {
    it('should return the same adapter instance for repeated calls', () => {
      const adapter1 = getAdapter('en');
      const adapter2 = getAdapter('en');
      expect(adapter1).toBe(adapter2);
    });

    it('should return the singleton englishAdapter for "en"', () => {
      const adapter = getAdapter('en');
      expect(adapter).toBe(englishAdapter);
    });
  });
});
