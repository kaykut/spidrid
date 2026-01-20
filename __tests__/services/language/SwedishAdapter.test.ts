/**
 * Swedish Language Adapter Tests
 *
 * Comprehensive test suite for Swedish language support.
 */

import { swedishAdapter } from '../../../src/services/language/adapters/SwedishAdapter';
import { SwedishAdapter } from '../../../src/services/language/adapters/SwedishAdapter';

describe('SwedishAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(swedishAdapter.code).toBe('sv');
    });

    it('should have correct language name', () => {
      expect(swedishAdapter.name).toBe('Swedish');
    });

    it('should be an instance of SwedishAdapter', () => {
      expect(swedishAdapter).toBeInstanceOf(SwedishAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split Swedish words into syllables', () => {
      const result = swedishAdapter.hyphenateSync('dator');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables).toEqual(expect.arrayContaining([expect.any(String)]));
    });

    it('should handle Swedish words with prefixes', () => {
      const result = swedishAdapter.hyphenateSync('förståelse');
      expect(result.syllables.length).toBeGreaterThan(1);
    });

    it('should handle long compound words', () => {
      const result = swedishAdapter.hyphenateSync('återuppbyggnad');
      expect(result.syllables.length).toBeGreaterThan(2);
    });
  });

  describe('letterPattern', () => {
    it('should match basic Latin letters', () => {
      expect(swedishAdapter.letterPattern.test('a')).toBe(true);
      expect(swedishAdapter.letterPattern.test('Z')).toBe(true);
    });

    it('should match Swedish special characters', () => {
      expect(swedishAdapter.letterPattern.test('å')).toBe(true);
      expect(swedishAdapter.letterPattern.test('ä')).toBe(true);
      expect(swedishAdapter.letterPattern.test('ö')).toBe(true);
      expect(swedishAdapter.letterPattern.test('Å')).toBe(true);
      expect(swedishAdapter.letterPattern.test('Ä')).toBe(true);
      expect(swedishAdapter.letterPattern.test('Ö')).toBe(true);
    });

    it('should not match punctuation', () => {
      expect(swedishAdapter.letterPattern.test('.')).toBe(false);
      expect(swedishAdapter.letterPattern.test(',')).toBe(false);
    });
  });

  describe('compoundPrefixes', () => {
    it('should include Swedish-specific prefixes', () => {
      expect(swedishAdapter.compoundPrefixes).toContain('för');
      expect(swedishAdapter.compoundPrefixes).toContain('över');
      expect(swedishAdapter.compoundPrefixes).toContain('mellan');
      expect(swedishAdapter.compoundPrefixes).toContain('åter');
    });

    it('should inherit Greek/Latin prefixes', () => {
      expect(swedishAdapter.compoundPrefixes).toContain('photo');
      expect(swedishAdapter.compoundPrefixes).toContain('anti');
    });

    it('should have comprehensive prefix list (>65)', () => {
      expect(swedishAdapter.compoundPrefixes.length).toBeGreaterThan(65);
    });
  });

  describe('captionKeywords', () => {
    it('should include Swedish caption keywords', () => {
      expect(swedishAdapter.captionKeywords).toContain('Foto');
      expect(swedishAdapter.captionKeywords).toContain('Tabell');
    });

    it('should have at least 5 keywords', () => {
      expect(swedishAdapter.captionKeywords.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match Swedish page indicators', () => {
      const patterns = swedishAdapter.pdfArtifactPatterns;
      const testCases = ['1', 'Sida 1', '1 av 10', 'Sid. 5'];

      testCases.forEach(testCase => {
        const matches = patterns.some(pattern => pattern.test(testCase));
        expect(matches).toBe(true);
      });
    });

    it('should match Swedish figure references', () => {
      const patterns = swedishAdapter.pdfArtifactPatterns;
      expect(patterns.some(p => p.test('Figur 1'))).toBe(true);
      expect(patterns.some(p => p.test('Tabell 2.1'))).toBe(true);
    });
  });
});
