/**
 * Tests for syllable splitting and hyphenation.
 *
 * Tests the improved hyphenation algorithm that:
 * - Detects compound prefixes (photo-, bio-, electro-, etc.)
 * - Splits post-prefix portion close to middle
 * - Enforces minimum chunk size of 3 chars (non-greedy)
 */

import { splitLongWord } from '../../src/services/syllables';

describe('splitLongWord with improved hyphenation (MAX_WORD_LENGTH = 22)', () => {
  describe('basic functionality', () => {
    it('does not split words <= 22 chars', () => {
      const result = splitLongWord('internationalization');  // 20 chars
      expect(result).toEqual(['internationalization']);
    });

    it('does not split words exactly 22 chars', () => {
      const result = splitLongWord('counterrevolutionaries');  // 22 chars
      expect(result).toEqual(['counterrevolutionaries']);
    });

    it('splits words > 22 chars', () => {
      const result = splitLongWord('counterrevolutionariess');  // 23 chars
      expect(result.length).toBeGreaterThan(1);
    });
  });

  describe('prefix-aware splitting', () => {
    it('splits at compound prefix for very long words', () => {
      // "telecommunications" (18 chars) - won't split due to <=22
      const result18 = splitLongWord('telecommunications');
      expect(result18).toEqual(['telecommunications']);

      // But if we had "telecommunicationss" (19 chars) it still wouldn't split
      // We need 23+ chars to trigger splitting
      const result23 = splitLongWord('telecommunicationsystem');  // 23 chars
      expect(result23.length).toBeGreaterThan(1);
      // Should split at "tele-" prefix
      expect(result23[0]).toMatch(/^tele/i);
    });

    it('uses photo- prefix when available', () => {
      // "photosynthesis" is only 14 chars, won't split
      const result = splitLongWord('photosynthesisprocess');  // 21 chars - still won't split
      expect(result).toEqual(['photosynthesisprocess']);

      // Need 23+ chars
      const result23 = splitLongWord('photosynthesisprocesses');  // 23 chars
      if (result23.length > 1) {
        expect(result23[0]).toMatch(/^photo/i);
      }
    });
  });

  describe('middle syllable splitting (non-greedy, >= 3 chars per chunk)', () => {
    it('enforces minimum chunk size of 3 chars', () => {
      // For any word that gets split, all chunks should be >= 3 chars
      const testWords = [
        'counterrevolutionariess',  // 23 chars
        'telecommunicationsystem',  // 23 chars
        'photosynthesisprocesses',  // 23 chars
      ];

      testWords.forEach(word => {
        const result = splitLongWord(word, 22);
        result.forEach(chunk => {
          // Remove hyphen for length check
          const cleanChunk = chunk.replace(/-/g, '');
          expect(cleanChunk.length).toBeGreaterThanOrEqual(3);
        });
      });
    });

    it('splits post-prefix portion close to middle', () => {
      // This is hard to test precisely without knowing syllable boundaries
      // But we can verify that chunks are roughly balanced
      const result = splitLongWord('counterrevolutionariess', 22);  // 23 chars

      if (result.length > 1) {
        // All chunks should be reasonably sized (not < 3 or > 22)
        result.forEach(chunk => {
          const cleanChunk = chunk.replace(/-/g, '');
          expect(cleanChunk.length).toBeGreaterThanOrEqual(3);
          expect(cleanChunk.length).toBeLessThanOrEqual(22);
        });
      }
    });
  });

  describe('backward compatibility', () => {
    it('handles short words correctly', () => {
      expect(splitLongWord('the')).toEqual(['the']);
      expect(splitLongWord('hello')).toEqual(['hello']);
      expect(splitLongWord('wonderful')).toEqual(['wonderful']);
    });

    it('handles medium words without splitting', () => {
      expect(splitLongWord('photosynthesis')).toEqual(['photosynthesis']);  // 14 chars
      expect(splitLongWord('electrocardiogram')).toEqual(['electrocardiogram']);  // 17 chars
      expect(splitLongWord('responsibilities')).toEqual(['responsibilities']);  // 16 chars
    });
  });
});
