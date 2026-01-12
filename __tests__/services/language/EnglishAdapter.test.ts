/**
 * Tests for the English Language Adapter
 */

import { englishAdapter, EnglishAdapter } from '../../../src/services/language/adapters/EnglishAdapter';

describe('EnglishAdapter', () => {
  describe('basic properties', () => {
    it('should have correct language code', () => {
      expect(englishAdapter.code).toBe('en');
    });

    it('should have correct language name', () => {
      expect(englishAdapter.name).toBe('English');
    });

    it('should be an instance of EnglishAdapter', () => {
      expect(englishAdapter).toBeInstanceOf(EnglishAdapter);
    });
  });

  describe('hyphenateSync', () => {
    it('should split "photosynthesis" into syllables', () => {
      const result = englishAdapter.hyphenateSync('photosynthesis');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('photosynthesis');
    });

    it('should return single syllable for short words', () => {
      const result = englishAdapter.hyphenateSync('the');
      expect(result.syllables).toEqual(['the']);
    });

    it('should split "understanding" into multiple syllables', () => {
      const result = englishAdapter.hyphenateSync('understanding');
      expect(result.syllables.length).toBeGreaterThan(1);
      expect(result.syllables.join('')).toBe('understanding');
    });

    it('should provide hyphenated word with soft hyphens', () => {
      const result = englishAdapter.hyphenateSync('photosynthesis');
      expect(result.hyphenatedWord).toContain('\u00AD'); // Soft hyphen
    });
  });

  describe('letterPattern', () => {
    it('should match ASCII lowercase letters', () => {
      expect(englishAdapter.letterPattern.test('a')).toBe(true);
      expect(englishAdapter.letterPattern.test('z')).toBe(true);
    });

    it('should match ASCII uppercase letters', () => {
      expect(englishAdapter.letterPattern.test('A')).toBe(true);
      expect(englishAdapter.letterPattern.test('Z')).toBe(true);
    });

    it('should not match numbers', () => {
      expect(englishAdapter.letterPattern.test('1')).toBe(false);
      expect(englishAdapter.letterPattern.test('9')).toBe(false);
    });

    it('should not match accented characters', () => {
      expect(englishAdapter.letterPattern.test('é')).toBe(false);
      expect(englishAdapter.letterPattern.test('ñ')).toBe(false);
    });
  });

  describe('captionKeywords', () => {
    it('should include common English caption keywords', () => {
      expect(englishAdapter.captionKeywords).toContain('Photo');
      expect(englishAdapter.captionKeywords).toContain('Image');
      expect(englishAdapter.captionKeywords).toContain('Figure');
    });

    it('should have at least 5 keywords', () => {
      expect(englishAdapter.captionKeywords.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('sentenceEndPattern', () => {
    it('should match period at end of word', () => {
      expect(englishAdapter.sentenceEndPattern.test('word.')).toBe(true);
    });

    it('should match exclamation at end of word', () => {
      expect(englishAdapter.sentenceEndPattern.test('word!')).toBe(true);
    });

    it('should match question mark at end of word', () => {
      expect(englishAdapter.sentenceEndPattern.test('word?')).toBe(true);
    });

    it('should not match comma', () => {
      expect(englishAdapter.sentenceEndPattern.test('word,')).toBe(false);
    });
  });

  describe('clauseBreakPattern', () => {
    it('should match comma at end of word', () => {
      expect(englishAdapter.clauseBreakPattern.test('word,')).toBe(true);
    });

    it('should match semicolon at end of word', () => {
      expect(englishAdapter.clauseBreakPattern.test('word;')).toBe(true);
    });

    it('should match colon at end of word', () => {
      expect(englishAdapter.clauseBreakPattern.test('word:')).toBe(true);
    });

    it('should not match period', () => {
      expect(englishAdapter.clauseBreakPattern.test('word.')).toBe(false);
    });
  });

  describe('pdfArtifactPatterns', () => {
    it('should match standalone page numbers', () => {
      const patterns = englishAdapter.pdfArtifactPatterns;
      const pageNumberPattern = patterns[0];
      expect(pageNumberPattern.test('1')).toBe(true);
      expect(pageNumberPattern.test('Page 1')).toBe(true);
      expect(pageNumberPattern.test('1 of 10')).toBe(true);
    });

    it('should match figure references', () => {
      const patterns = englishAdapter.pdfArtifactPatterns;
      const figurePattern = patterns.find(p => p.source.includes('Figure'));
      expect(figurePattern?.test('Figure 1')).toBe(true);
      expect(figurePattern?.test('Table 2.1')).toBe(true);
    });
  });

  describe('compoundPrefixes', () => {
    it('should include common Greek/Latin prefixes', () => {
      expect(englishAdapter.compoundPrefixes).toContain('photo');
      expect(englishAdapter.compoundPrefixes).toContain('bio');
      expect(englishAdapter.compoundPrefixes).toContain('electro');
    });

    it('should be sorted by length (longest first)', () => {
      const prefixes = englishAdapter.compoundPrefixes;
      const firstPrefix = prefixes[0];
      const lastPrefix = prefixes[prefixes.length - 1];
      expect(firstPrefix.length).toBeGreaterThanOrEqual(lastPrefix.length);
    });
  });

  describe('htmlEntityMap', () => {
    it('should include common HTML entities', () => {
      expect(englishAdapter.htmlEntityMap['&nbsp;']).toBe(' ');
      expect(englishAdapter.htmlEntityMap['&amp;']).toBe('&');
      expect(englishAdapter.htmlEntityMap['&mdash;']).toBe('—');
    });
  });

  describe('quotationEntities', () => {
    it('should map curly quote entities to straight quotes', () => {
      expect(englishAdapter.quotationEntities['&rsquo;']).toBe("'");
      expect(englishAdapter.quotationEntities['&lsquo;']).toBe("'");
      expect(englishAdapter.quotationEntities['&rdquo;']).toBe('"');
      expect(englishAdapter.quotationEntities['&ldquo;']).toBe('"');
    });
  });

  describe('stockAgencies', () => {
    it('should include major stock photo agencies', () => {
      expect(englishAdapter.stockAgencies).toContain('Getty');
      expect(englishAdapter.stockAgencies).toContain('Reuters');
      expect(englishAdapter.stockAgencies).toContain('Shutterstock');
    });
  });
});
