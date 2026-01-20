/**
 * Romanian Language Adapter Tests
 *
 * Comprehensive test suite for Romanian language support.
 */

import { romanianAdapter } from '../../../src/services/language/adapters/RomanianAdapter';
import { RomanianAdapter } from '../../../src/services/language/adapters/RomanianAdapter';

describe('RomanianAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(romanianAdapter.code).toBe('ro');
    });

    it('should have correct language name', () => {
      expect(romanianAdapter.name).toBe('Romanian');
    });

    it('should be an instance of RomanianAdapter', () => {
      expect(romanianAdapter).toBeInstanceOf(RomanianAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split Romanian words into syllables', () => {
      const result = romanianAdapter.hyphenateSync('calculator');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables).toEqual(expect.arrayContaining([expect.any(String)]));
    });

    it('should handle Romanian words with prefixes', () => {
      const result = romanianAdapter.hyphenateSync('neînțelegere');
      expect(result.syllables.length).toBeGreaterThan(1);
    });

    it('should handle long compound words', () => {
      const result = romanianAdapter.hyphenateSync('recunoaștere');
      expect(result.syllables.length).toBeGreaterThan(2);
    });
  });

  describe('letterPattern', () => {
    it('should match basic Latin letters', () => {
      expect(romanianAdapter.letterPattern.test('a')).toBe(true);
      expect(romanianAdapter.letterPattern.test('Z')).toBe(true);
    });

    it('should match Romanian special characters', () => {
      expect(romanianAdapter.letterPattern.test('ă')).toBe(true);
      expect(romanianAdapter.letterPattern.test('â')).toBe(true);
      expect(romanianAdapter.letterPattern.test('î')).toBe(true);
      expect(romanianAdapter.letterPattern.test('ș')).toBe(true);
      expect(romanianAdapter.letterPattern.test('ț')).toBe(true);
    });

    it('should not match punctuation', () => {
      expect(romanianAdapter.letterPattern.test('.')).toBe(false);
      expect(romanianAdapter.letterPattern.test(',')).toBe(false);
    });
  });

  describe('compoundPrefixes', () => {
    it('should include Romanian-specific prefixes', () => {
      expect(romanianAdapter.compoundPrefixes).toContain('ne');
      expect(romanianAdapter.compoundPrefixes).toContain('pre');
      expect(romanianAdapter.compoundPrefixes).toContain('împre');
      expect(romanianAdapter.compoundPrefixes).toContain('în');
    });

    it('should inherit Greek/Latin prefixes', () => {
      expect(romanianAdapter.compoundPrefixes).toContain('photo');
      expect(romanianAdapter.compoundPrefixes).toContain('anti');
    });

    it('should have comprehensive prefix list (>55)', () => {
      expect(romanianAdapter.compoundPrefixes.length).toBeGreaterThan(55);
    });
  });

  describe('captionKeywords', () => {
    it('should include Romanian caption keywords', () => {
      expect(romanianAdapter.captionKeywords).toContain('Fotografie');
      expect(romanianAdapter.captionKeywords).toContain('Tabel');
    });

    it('should have at least 5 keywords', () => {
      expect(romanianAdapter.captionKeywords.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match Romanian page indicators', () => {
      const patterns = romanianAdapter.pdfArtifactPatterns;
      const testCases = ['1', 'Pagina 1', '1 din 10', 'Pag. 5'];

      testCases.forEach(testCase => {
        const matches = patterns.some(pattern => pattern.test(testCase));
        expect(matches).toBe(true);
      });
    });

    it('should match Romanian figure references', () => {
      const patterns = romanianAdapter.pdfArtifactPatterns;
      expect(patterns.some(p => p.test('Figura 1'))).toBe(true);
      expect(patterns.some(p => p.test('Tabel 2.1'))).toBe(true);
    });
  });
});
