/**
 * Turkish Language Adapter Tests
 *
 * Tests Turkish-specific text processing for RSVP reading.
 * Focus: Syllabification works correctly for comfortable reading.
 */

import { turkishAdapter } from '../../../src/services/language/adapters/TurkishAdapter';
import { TurkishAdapter } from '../../../src/services/language/adapters/TurkishAdapter';

describe('TurkishAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(turkishAdapter.code).toBe('tr');
    });

    it('should have correct language name', () => {
      expect(turkishAdapter.name).toBe('Turkish');
    });

    it('should be an instance of TurkishAdapter', () => {
      expect(turkishAdapter).toBeInstanceOf(TurkishAdapter);
    });
  });

  describe('hyphenateSync - syllabification for RSVP', () => {
    it('should split common Turkish words into syllables', () => {
      // "merhaba" (hello) - common greeting
      const result = turkishAdapter.hyphenateSync('merhaba');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('merhaba');
    });

    it('should handle words with soft g (ğ)', () => {
      // "değil" (not) - soft g lengthens preceding vowel
      const result = turkishAdapter.hyphenateSync('değil');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('değil');
    });

    it('should handle words with dotless i (ı)', () => {
      // "ışık" (light) - starts with dotless i
      const result = turkishAdapter.hyphenateSync('ışık');
      expect(result.syllables.join('')).toBe('ışık');
    });

    it('should handle long agglutinative words', () => {
      // "öğretmenlerimizden" (from our teachers) - typical Turkish suffix chain
      const result = turkishAdapter.hyphenateSync('öğretmenlerimizden');
      expect(result.syllables.length).toBeGreaterThan(3);
      expect(result.syllables.join('')).toBe('öğretmenlerimizden');
    });

    it('should handle words with cedilla (ç, ş)', () => {
      // "çalışmak" (to work)
      const result = turkishAdapter.hyphenateSync('çalışmak');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('çalışmak');
    });

    it('should handle words with umlauts (ö, ü)', () => {
      // "gözlük" (glasses)
      const result = turkishAdapter.hyphenateSync('gözlük');
      expect(result.syllables.join('')).toBe('gözlük');
    });
  });

  describe('letterPattern - Turkish alphabet recognition', () => {
    it('should match basic Latin letters', () => {
      expect(turkishAdapter.letterPattern.test('a')).toBe(true);
      expect(turkishAdapter.letterPattern.test('Z')).toBe(true);
    });

    it('should match Turkish special characters', () => {
      // Turkish-specific letters
      expect(turkishAdapter.letterPattern.test('ç')).toBe(true);
      expect(turkishAdapter.letterPattern.test('Ç')).toBe(true);
      expect(turkishAdapter.letterPattern.test('ğ')).toBe(true);
      expect(turkishAdapter.letterPattern.test('Ğ')).toBe(true);
      expect(turkishAdapter.letterPattern.test('ı')).toBe(true); // dotless i
      expect(turkishAdapter.letterPattern.test('İ')).toBe(true); // dotted I
      expect(turkishAdapter.letterPattern.test('ö')).toBe(true);
      expect(turkishAdapter.letterPattern.test('Ö')).toBe(true);
      expect(turkishAdapter.letterPattern.test('ş')).toBe(true);
      expect(turkishAdapter.letterPattern.test('Ş')).toBe(true);
      expect(turkishAdapter.letterPattern.test('ü')).toBe(true);
      expect(turkishAdapter.letterPattern.test('Ü')).toBe(true);
    });

    it('should not match punctuation', () => {
      expect(turkishAdapter.letterPattern.test('.')).toBe(false);
      expect(turkishAdapter.letterPattern.test(',')).toBe(false);
      expect(turkishAdapter.letterPattern.test(' ')).toBe(false);
    });
  });

  describe('captionKeywords', () => {
    it('should include Turkish caption keywords', () => {
      expect(turkishAdapter.captionKeywords).toContain('Fotoğraf');
      expect(turkishAdapter.captionKeywords).toContain('Tablo');
      expect(turkishAdapter.captionKeywords).toContain('Şekil');
    });

    it('should have at least 5 keywords', () => {
      expect(turkishAdapter.captionKeywords.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match Turkish page indicators', () => {
      const patterns = turkishAdapter.pdfArtifactPatterns;
      const testCases = ['1', 'Sayfa 1', '1/10'];

      testCases.forEach(testCase => {
        const matches = patterns.some(pattern => pattern.test(testCase));
        expect(matches).toBe(true);
      });
    });

    it('should match Turkish figure references', () => {
      const patterns = turkishAdapter.pdfArtifactPatterns;
      expect(patterns.some(p => p.test('Şekil 1'))).toBe(true);
      expect(patterns.some(p => p.test('Tablo 2.1'))).toBe(true);
    });
  });

  describe('compoundPrefixes', () => {
    it('should inherit Greek/Latin prefixes used in Turkish loanwords', () => {
      expect(turkishAdapter.compoundPrefixes).toContain('photo');
      expect(turkishAdapter.compoundPrefixes).toContain('anti');
      expect(turkishAdapter.compoundPrefixes).toContain('tele');
    });
  });
});
