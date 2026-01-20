/**
 * Czech Language Adapter Tests
 *
 * Comprehensive test suite for Czech language support.
 */

import { czechAdapter } from '../../../src/services/language/adapters/CzechAdapter';
import { CzechAdapter } from '../../../src/services/language/adapters/CzechAdapter';

describe('CzechAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(czechAdapter.code).toBe('cs');
    });

    it('should have correct language name', () => {
      expect(czechAdapter.name).toBe('Czech');
    });

    it('should be an instance of CzechAdapter', () => {
      expect(czechAdapter).toBeInstanceOf(CzechAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split Czech words into syllables', () => {
      const result = czechAdapter.hyphenateSync('počítač');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables).toEqual(expect.arrayContaining([expect.any(String)]));
    });

    it('should handle Czech words with prefixes', () => {
      const result = czechAdapter.hyphenateSync('nepochopení');
      expect(result.syllables.length).toBeGreaterThan(1);
    });

    it('should handle long compound words', () => {
      const result = czechAdapter.hyphenateSync('předpokládat');
      expect(result.syllables.length).toBeGreaterThan(2);
    });
  });

  describe('letterPattern', () => {
    it('should match basic Latin letters', () => {
      expect(czechAdapter.letterPattern.test('a')).toBe(true);
      expect(czechAdapter.letterPattern.test('Z')).toBe(true);
    });

    it('should match Czech special characters', () => {
      expect(czechAdapter.letterPattern.test('á')).toBe(true);
      expect(czechAdapter.letterPattern.test('č')).toBe(true);
      expect(czechAdapter.letterPattern.test('ď')).toBe(true);
      expect(czechAdapter.letterPattern.test('é')).toBe(true);
      expect(czechAdapter.letterPattern.test('ě')).toBe(true);
      expect(czechAdapter.letterPattern.test('í')).toBe(true);
      expect(czechAdapter.letterPattern.test('ň')).toBe(true);
      expect(czechAdapter.letterPattern.test('ó')).toBe(true);
      expect(czechAdapter.letterPattern.test('ř')).toBe(true);
      expect(czechAdapter.letterPattern.test('š')).toBe(true);
      expect(czechAdapter.letterPattern.test('ť')).toBe(true);
      expect(czechAdapter.letterPattern.test('ú')).toBe(true);
      expect(czechAdapter.letterPattern.test('ů')).toBe(true);
      expect(czechAdapter.letterPattern.test('ý')).toBe(true);
      expect(czechAdapter.letterPattern.test('ž')).toBe(true);
    });

    it('should not match punctuation', () => {
      expect(czechAdapter.letterPattern.test('.')).toBe(false);
      expect(czechAdapter.letterPattern.test(',')).toBe(false);
    });
  });

  describe('compoundPrefixes', () => {
    it('should include Czech-specific prefixes', () => {
      expect(czechAdapter.compoundPrefixes).toContain('před');
      expect(czechAdapter.compoundPrefixes).toContain('mezi');
      expect(czechAdapter.compoundPrefixes).toContain('spolu');
      expect(czechAdapter.compoundPrefixes).toContain('ne');
    });

    it('should inherit Greek/Latin prefixes', () => {
      expect(czechAdapter.compoundPrefixes).toContain('photo');
      expect(czechAdapter.compoundPrefixes).toContain('anti');
    });

    it('should have comprehensive prefix list (>60)', () => {
      expect(czechAdapter.compoundPrefixes.length).toBeGreaterThan(60);
    });
  });

  describe('captionKeywords', () => {
    it('should include Czech caption keywords', () => {
      expect(czechAdapter.captionKeywords).toContain('Foto');
      expect(czechAdapter.captionKeywords).toContain('Tabulka');
    });

    it('should have at least 5 keywords', () => {
      expect(czechAdapter.captionKeywords.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match Czech page indicators', () => {
      const patterns = czechAdapter.pdfArtifactPatterns;
      const testCases = ['1', 'Strana 1', '1 z 10', 'Str. 5'];

      testCases.forEach(testCase => {
        const matches = patterns.some(pattern => pattern.test(testCase));
        expect(matches).toBe(true);
      });
    });

    it('should match Czech figure references', () => {
      const patterns = czechAdapter.pdfArtifactPatterns;
      expect(patterns.some(p => p.test('Figura 1'))).toBe(true);
      expect(patterns.some(p => p.test('Tabulka 2.1'))).toBe(true);
    });
  });
});
