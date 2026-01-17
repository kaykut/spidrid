/**
 * Tests for ORP (Optimal Recognition Point) calculation service.
 *
 * The ORP is the letter where the eye naturally focuses for fastest word recognition.
 * Using standard calculation: floor((len - 1) / 3).
 */

import {
  calculateORP,
  calculatePauseMultiplier,
  isSentenceEnd,
} from '../../src/services/orp';

describe('calculateORP', () => {
  describe('1-character words', () => {
    it('returns index 0 for single character words', () => {
      expect(calculateORP('a')).toBe(0);
      expect(calculateORP('I')).toBe(0);
      expect(calculateORP('5')).toBe(0);
    });
  });

  describe('2-3 character words (floor((len-1)/3) = 0)', () => {
    it('returns correct ORP for 2-char words', () => {
      expect(calculateORP('an')).toBe(0); // floor((2-1)/3) = 0
      expect(calculateORP('is')).toBe(0);
    });

    it('returns correct ORP for 3-char words', () => {
      expect(calculateORP('the')).toBe(0); // floor((3-1)/3) = 0
      expect(calculateORP('and')).toBe(0);
    });
  });

  describe('4-6 character words (floor((len-1)/3) = 1)', () => {
    it('returns correct ORP for 4-char words', () => {
      expect(calculateORP('word')).toBe(1); // floor((4-1)/3) = 1
      expect(calculateORP('test')).toBe(1);
    });

    it('returns correct ORP for 5-char words', () => {
      expect(calculateORP('hello')).toBe(1); // floor((5-1)/3) = 1
      expect(calculateORP('world')).toBe(1);
    });

    it('returns correct ORP for 6-char words', () => {
      expect(calculateORP('simple')).toBe(1); // floor((6-1)/3) = 1
    });
  });

  describe('7-9 character words (floor((len-1)/3) = 2)', () => {
    it('returns correct ORP for 7-char words', () => {
      expect(calculateORP('reading')).toBe(2); // floor((7-1)/3) = 2
    });

    it('returns correct ORP for 8-char words', () => {
      expect(calculateORP('thinking')).toBe(2); // floor((8-1)/3) = 2
    });

    it('returns correct ORP for 9-char words', () => {
      expect(calculateORP('beautiful')).toBe(2); // floor((9-1)/3) = 2
    });
  });

  describe('10-12 character words (floor((len-1)/3) = 3)', () => {
    it('returns correct ORP for 10-char words', () => {
      expect(calculateORP('understand')).toBe(3); // floor((10-1)/3) = 3
    });

    it('returns correct ORP for 11-char words', () => {
      expect(calculateORP('information')).toBe(3); // floor((11-1)/3) = 3
    });

    it('returns correct ORP for 12-char words', () => {
      expect(calculateORP('relationship')).toBe(3); // floor((12-1)/3) = 3
    });
  });

  describe('13-15 character words (floor((len-1)/3) = 4)', () => {
    it('returns correct ORP for 13-char words', () => {
      expect(calculateORP('understanding')).toBe(4); // floor((13-1)/3) = 4
    });

    it('returns correct ORP for 14-char words', () => {
      expect(calculateORP('recommendation')).toBe(4); // floor((14-1)/3) = 4
    });

    it('returns correct ORP for 15-char words', () => {
      expect(calculateORP('experimentation')).toBe(4); // floor((15-1)/3) = 4
    });
  });

  describe('16+ character words', () => {
    it('returns correct ORP for very long words', () => {
      expect(calculateORP('internationalization')).toBe(6); // floor((20-1)/3) = 6
    });
  });

  describe('edge cases', () => {
    it('returns 0 for empty string', () => {
      expect(calculateORP('')).toBe(0);
    });
  });
});

describe('calculatePauseMultiplier', () => {
  describe('sentence-ending punctuation', () => {
    it('returns 3.0 for period', () => {
      expect(calculatePauseMultiplier('word.')).toBe(3.0);
    });

    it('returns 3.0 for exclamation mark', () => {
      expect(calculatePauseMultiplier('word!')).toBe(3.0);
    });

    it('returns 3.0 for question mark', () => {
      expect(calculatePauseMultiplier('word?')).toBe(3.0);
    });

    it('returns 3.0 for multiple sentence-ending punctuation', () => {
      expect(calculatePauseMultiplier('what?!')).toBe(3.0);
      expect(calculatePauseMultiplier('wow...')).toBe(3.0);
    });
  });

  describe('clause break punctuation', () => {
    it('returns 1.5 for comma', () => {
      expect(calculatePauseMultiplier('word,')).toBe(1.5);
    });

    it('returns 1.5 for semicolon', () => {
      expect(calculatePauseMultiplier('word;')).toBe(1.5);
    });

    it('returns 1.5 for colon', () => {
      expect(calculatePauseMultiplier('word:')).toBe(1.5);
    });
  });

  describe('long words', () => {
    it('returns 1.2 for words longer than 12 characters', () => {
      expect(calculatePauseMultiplier('understanding')).toBe(1.2); // 13 chars
      expect(calculatePauseMultiplier('recommendation')).toBe(1.2); // 14 chars
    });

    it('returns 1.0 for words exactly 12 characters', () => {
      expect(calculatePauseMultiplier('relationship')).toBe(1.0); // 12 chars
    });
  });

  describe('normal words', () => {
    it('returns 1.0 for regular words without punctuation', () => {
      expect(calculatePauseMultiplier('hello')).toBe(1.0);
      expect(calculatePauseMultiplier('world')).toBe(1.0);
      expect(calculatePauseMultiplier('the')).toBe(1.0);
    });
  });

  describe('punctuation precedence', () => {
    it('prioritizes sentence-ending over long word', () => {
      // A long word with sentence-ending punctuation should return 3.0
      expect(calculatePauseMultiplier('understanding.')).toBe(3.0);
    });

    it('prioritizes sentence-ending over clause break', () => {
      // This would be unusual but tests precedence
      expect(calculatePauseMultiplier('word?')).toBe(3.0);
    });
  });
});

describe('isSentenceEnd', () => {
  describe('sentence-ending punctuation', () => {
    it('returns true for period', () => {
      expect(isSentenceEnd('word.')).toBe(true);
    });

    it('returns true for exclamation mark', () => {
      expect(isSentenceEnd('word!')).toBe(true);
    });

    it('returns true for question mark', () => {
      expect(isSentenceEnd('word?')).toBe(true);
    });

    it('returns true for multiple periods (ellipsis)', () => {
      expect(isSentenceEnd('word...')).toBe(true);
    });
  });

  describe('non-sentence-ending punctuation', () => {
    it('returns false for comma', () => {
      expect(isSentenceEnd('word,')).toBe(false);
    });

    it('returns false for semicolon', () => {
      expect(isSentenceEnd('word;')).toBe(false);
    });

    it('returns false for colon', () => {
      expect(isSentenceEnd('word:')).toBe(false);
    });
  });

  describe('no punctuation', () => {
    it('returns false for words without punctuation', () => {
      expect(isSentenceEnd('hello')).toBe(false);
      expect(isSentenceEnd('world')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(isSentenceEnd('')).toBe(false);
    });
  });
});
