/**
 * Tests for Dutch Language Adapter
 */

import { dutchAdapter, DutchAdapter } from '../../../src/services/language/adapters/DutchAdapter';

describe('DutchAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(dutchAdapter.code).toBe('nl');
    });

    it('should have correct language name', () => {
      expect(dutchAdapter.name).toBe('Dutch');
    });

    it('should be an instance of DutchAdapter', () => {
      expect(dutchAdapter).toBeInstanceOf(DutchAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split Dutch words into syllables', () => {
      const result = dutchAdapter.hyphenateSync('begrijpen');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('begrijpen');
    });

    it('should handle Dutch words with prefixes', () => {
      const result = dutchAdapter.hyphenateSync('voorkomen');
      expect(result.syllables.join('')).toBe('voorkomen');
    });

    it('should handle long compound words', () => {
      const result = dutchAdapter.hyphenateSync('samenwerking');
      expect(result.syllables.join('')).toBe('samenwerking');
    });
  });

  describe('letterPattern', () => {
    it('should match basic Latin letters', () => {
      expect(dutchAdapter.letterPattern.test('a')).toBe(true);
      expect(dutchAdapter.letterPattern.test('Z')).toBe(true);
    });

    it('should match accented vowels', () => {
      expect(dutchAdapter.letterPattern.test('é')).toBe(true);
      expect(dutchAdapter.letterPattern.test('ë')).toBe(true);
      expect(dutchAdapter.letterPattern.test('ï')).toBe(true);
    });

    it('should not match punctuation', () => {
      expect(dutchAdapter.letterPattern.test('.')).toBe(false);
      expect(dutchAdapter.letterPattern.test(',')).toBe(false);
    });
  });

  describe('compoundPrefixes', () => {
    it('should include Dutch-specific prefixes', () => {
      expect(dutchAdapter.compoundPrefixes).toContain('voor');
      expect(dutchAdapter.compoundPrefixes).toContain('over');
      expect(dutchAdapter.compoundPrefixes).toContain('onder');
      expect(dutchAdapter.compoundPrefixes).toContain('be');
      expect(dutchAdapter.compoundPrefixes).toContain('ge');
    });

    it('should inherit Greek/Latin prefixes', () => {
      expect(dutchAdapter.compoundPrefixes).toContain('photo');
      expect(dutchAdapter.compoundPrefixes).toContain('anti');
    });

    it('should have comprehensive prefix list', () => {
      expect(dutchAdapter.compoundPrefixes.length).toBeGreaterThan(60);
    });
  });

  describe('captionKeywords', () => {
    it('should include Dutch caption keywords', () => {
      expect(dutchAdapter.captionKeywords).toContain('Foto');
      expect(dutchAdapter.captionKeywords).toContain('Afbeelding');
      expect(dutchAdapter.captionKeywords).toContain('Figuur');
    });

    it('should have at least 5 keywords', () => {
      expect(dutchAdapter.captionKeywords.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match Dutch page indicators', () => {
      const patterns = dutchAdapter.pdfArtifactPatterns;
      const pagePattern = patterns[0];
      expect(pagePattern.test('Pagina 1')).toBe(true);
      expect(pagePattern.test('1 van 10')).toBe(true);
      expect(pagePattern.test('5')).toBe(true);
    });

    it('should match Dutch figure references', () => {
      const patterns = dutchAdapter.pdfArtifactPatterns;
      const figurePattern = patterns.find(p => p.source.includes('Figuur'));
      expect(figurePattern?.test('Figuur 1')).toBe(true);
      expect(figurePattern?.test('Tabel 2.1')).toBe(true);
    });
  });
});
