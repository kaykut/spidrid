/**
 * Polish Language Adapter Tests
 *
 * Comprehensive test suite for Polish language support.
 */

import { polishAdapter } from '../../../src/services/language/adapters/PolishAdapter';
import { PolishAdapter } from '../../../src/services/language/adapters/PolishAdapter';

describe('PolishAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(polishAdapter.code).toBe('pl');
    });

    it('should have correct language name', () => {
      expect(polishAdapter.name).toBe('Polish');
    });

    it('should be an instance of PolishAdapter', () => {
      expect(polishAdapter).toBeInstanceOf(PolishAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split Polish words into syllables', () => {
      const result = polishAdapter.hyphenateSync('komputer');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables).toEqual(expect.arrayContaining([expect.any(String)]));
    });

    it('should handle Polish words with prefixes', () => {
      const result = polishAdapter.hyphenateSync('niepowodzenie');
      expect(result.syllables.length).toBeGreaterThan(1);
    });

    it('should handle long compound words', () => {
      const result = polishAdapter.hyphenateSync('nieporozumienie');
      expect(result.syllables.length).toBeGreaterThan(2);
    });
  });

  describe('letterPattern', () => {
    it('should match basic Latin letters', () => {
      expect(polishAdapter.letterPattern.test('a')).toBe(true);
      expect(polishAdapter.letterPattern.test('Z')).toBe(true);
    });

    it('should match Polish special characters', () => {
      expect(polishAdapter.letterPattern.test('ą')).toBe(true);
      expect(polishAdapter.letterPattern.test('ć')).toBe(true);
      expect(polishAdapter.letterPattern.test('ę')).toBe(true);
      expect(polishAdapter.letterPattern.test('ł')).toBe(true);
      expect(polishAdapter.letterPattern.test('ń')).toBe(true);
      expect(polishAdapter.letterPattern.test('ó')).toBe(true);
      expect(polishAdapter.letterPattern.test('ś')).toBe(true);
      expect(polishAdapter.letterPattern.test('ź')).toBe(true);
      expect(polishAdapter.letterPattern.test('ż')).toBe(true);
    });

    it('should not match punctuation', () => {
      expect(polishAdapter.letterPattern.test('.')).toBe(false);
      expect(polishAdapter.letterPattern.test(',')).toBe(false);
    });
  });

  describe('compoundPrefixes', () => {
    it('should include Polish-specific prefixes', () => {
      expect(polishAdapter.compoundPrefixes).toContain('nie');
      expect(polishAdapter.compoundPrefixes).toContain('przed');
      expect(polishAdapter.compoundPrefixes).toContain('między');
      expect(polishAdapter.compoundPrefixes).toContain('po');
    });

    it('should inherit Greek/Latin prefixes', () => {
      expect(polishAdapter.compoundPrefixes).toContain('photo');
      expect(polishAdapter.compoundPrefixes).toContain('anti');
    });

    it('should have comprehensive prefix list (>65)', () => {
      expect(polishAdapter.compoundPrefixes.length).toBeGreaterThan(65);
    });
  });

  describe('captionKeywords', () => {
    it('should include Polish caption keywords', () => {
      expect(polishAdapter.captionKeywords).toContain('Zdjęcie');
      expect(polishAdapter.captionKeywords).toContain('Tabela');
    });

    it('should have at least 5 keywords', () => {
      expect(polishAdapter.captionKeywords.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match Polish page indicators', () => {
      const patterns = polishAdapter.pdfArtifactPatterns;
      const testCases = ['1', 'Strona 1', '1 z 10', 'Str. 5'];

      testCases.forEach(testCase => {
        const matches = patterns.some(pattern => pattern.test(testCase));
        expect(matches).toBe(true);
      });
    });

    it('should match Polish figure references', () => {
      const patterns = polishAdapter.pdfArtifactPatterns;
      expect(patterns.some(p => p.test('Figura 1'))).toBe(true);
      expect(patterns.some(p => p.test('Tabela 2.1'))).toBe(true);
    });
  });
});
