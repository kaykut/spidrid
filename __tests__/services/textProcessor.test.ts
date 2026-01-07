/**
 * Tests for text processing service.
 *
 * Handles tokenization, word processing, and sentence boundary detection.
 */

import {
  tokenize,
  processWord,
  processText,
  findSentenceStarts,
  findPreviousSentenceStart,
  findNextSentenceStart,
} from '../../src/services/textProcessor';
import { ProcessedWord } from '../../src/types/playback';

describe('tokenize', () => {
  describe('basic word splitting', () => {
    it('splits simple sentence into words', () => {
      expect(tokenize('hello world')).toEqual(['hello', 'world']);
    });

    it('splits sentence with multiple words', () => {
      expect(tokenize('the quick brown fox')).toEqual([
        'the',
        'quick',
        'brown',
        'fox',
      ]);
    });
  });

  describe('whitespace handling', () => {
    it('collapses multiple spaces', () => {
      expect(tokenize('hello    world')).toEqual(['hello', 'world']);
    });

    it('handles tabs', () => {
      expect(tokenize('hello\tworld')).toEqual(['hello', 'world']);
    });

    it('handles newlines', () => {
      expect(tokenize('hello\nworld')).toEqual(['hello', 'world']);
    });

    it('handles mixed whitespace', () => {
      expect(tokenize('hello  \t\n  world')).toEqual(['hello', 'world']);
    });

    it('trims leading whitespace', () => {
      expect(tokenize('   hello world')).toEqual(['hello', 'world']);
    });

    it('trims trailing whitespace', () => {
      expect(tokenize('hello world   ')).toEqual(['hello', 'world']);
    });
  });

  describe('edge cases', () => {
    it('returns empty array for empty string', () => {
      expect(tokenize('')).toEqual([]);
    });

    it('returns empty array for whitespace-only string', () => {
      expect(tokenize('   ')).toEqual([]);
      expect(tokenize('\t\n')).toEqual([]);
    });

    it('returns single word for single word input', () => {
      expect(tokenize('hello')).toEqual(['hello']);
    });
  });

  describe('punctuation preservation', () => {
    it('preserves punctuation attached to words', () => {
      expect(tokenize('Hello, world!')).toEqual(['Hello,', 'world!']);
    });

    it('preserves sentence-ending punctuation', () => {
      expect(tokenize('This is a sentence.')).toEqual([
        'This',
        'is',
        'a',
        'sentence.',
      ]);
    });

    it('preserves multiple punctuation marks', () => {
      expect(tokenize('What?! Really...')).toEqual(['What?!', 'Really...']);
    });
  });
});

describe('processWord', () => {
  it('returns ProcessedWord with correct structure', () => {
    const result = processWord('hello');

    expect(result).toHaveProperty('original');
    expect(result).toHaveProperty('display');
    expect(result).toHaveProperty('orpIndex');
    expect(result).toHaveProperty('pauseMultiplier');
    expect(result).toHaveProperty('sentenceEnd');
  });

  it('preserves original word', () => {
    const result = processWord('hello');
    expect(result.original).toBe('hello');
    expect(result.display).toBe('hello');
  });

  it('calculates correct ORP index', () => {
    const result = processWord('reading');
    expect(result.orpIndex).toBe(2); // 7 chars -> floor(7 * 0.3) = 2
  });

  it('calculates correct pauseMultiplier for normal word', () => {
    const result = processWord('hello');
    expect(result.pauseMultiplier).toBe(1.0);
  });

  it('calculates correct pauseMultiplier for sentence-ending word', () => {
    const result = processWord('hello.');
    expect(result.pauseMultiplier).toBe(1.8);
  });

  it('calculates correct pauseMultiplier for clause break', () => {
    const result = processWord('hello,');
    expect(result.pauseMultiplier).toBe(1.3);
  });

  it('detects sentence end correctly', () => {
    expect(processWord('hello.').sentenceEnd).toBe(true);
    expect(processWord('hello!').sentenceEnd).toBe(true);
    expect(processWord('hello?').sentenceEnd).toBe(true);
    expect(processWord('hello').sentenceEnd).toBe(false);
    expect(processWord('hello,').sentenceEnd).toBe(false);
  });
});

describe('processText', () => {
  it('returns empty array for empty text', () => {
    expect(processText('')).toEqual([]);
  });

  it('returns correct length array', () => {
    const result = processText('hello world');
    expect(result).toHaveLength(2);
  });

  it('processes multiple sentences', () => {
    const result = processText('First sentence. Second sentence.');

    expect(result).toHaveLength(4);
    expect(result[1].sentenceEnd).toBe(true); // "sentence."
    expect(result[3].sentenceEnd).toBe(true); // "sentence."
  });

  it('returns ProcessedWord array with correct structure', () => {
    const result = processText('hello world');

    expect(result[0].original).toBe('hello');
    expect(result[1].original).toBe('world');
    expect(typeof result[0].orpIndex).toBe('number');
    expect(typeof result[0].pauseMultiplier).toBe('number');
  });

  it('handles single word text', () => {
    const result = processText('hello');
    expect(result).toHaveLength(1);
    expect(result[0].original).toBe('hello');
  });
});

describe('findSentenceStarts', () => {
  function createWords(texts: string[]): ProcessedWord[] {
    return texts.map((text) => processWord(text));
  }

  it('always includes index 0 as first sentence start', () => {
    const words = createWords(['hello', 'world']);
    const starts = findSentenceStarts(words);
    expect(starts).toContain(0);
  });

  it('finds sentence starts after sentence-ending words', () => {
    const words = createWords(['Hello.', 'World.']);
    const starts = findSentenceStarts(words);
    expect(starts).toEqual([0, 1]);
  });

  it('handles single sentence correctly', () => {
    const words = createWords(['This', 'is', 'one', 'sentence.']);
    const starts = findSentenceStarts(words);
    expect(starts).toEqual([0]);
  });

  it('handles multiple sentences', () => {
    const words = createWords([
      'First',
      'sentence.',
      'Second',
      'sentence.',
      'Third',
      'sentence.',
    ]);
    const starts = findSentenceStarts(words);
    expect(starts).toEqual([0, 2, 4]);
  });

  it('does not add start for last word even if sentence end', () => {
    const words = createWords(['Only', 'sentence.']);
    const starts = findSentenceStarts(words);
    expect(starts).toEqual([0]);
  });

  it('handles empty array', () => {
    const starts = findSentenceStarts([]);
    expect(starts).toEqual([0]);
  });

  it('handles question marks as sentence ends', () => {
    const words = createWords(['What?', 'Yes.']);
    const starts = findSentenceStarts(words);
    expect(starts).toEqual([0, 1]);
  });

  it('handles exclamation marks as sentence ends', () => {
    const words = createWords(['Wow!', 'Amazing!']);
    const starts = findSentenceStarts(words);
    expect(starts).toEqual([0, 1]);
  });
});

describe('findPreviousSentenceStart', () => {
  describe('basic navigation', () => {
    it('returns previous sentence start', () => {
      const starts = [0, 5, 10];
      expect(findPreviousSentenceStart(starts, 7)).toBe(5);
    });

    it('returns 0 when at or before first sentence', () => {
      const starts = [0, 5, 10];
      expect(findPreviousSentenceStart(starts, 0)).toBe(0);
      expect(findPreviousSentenceStart(starts, 2)).toBe(0);
    });
  });

  describe('mid-sentence behavior', () => {
    it('returns start of current sentence when mid-sentence', () => {
      const starts = [0, 5, 10];
      expect(findPreviousSentenceStart(starts, 7)).toBe(5);
      expect(findPreviousSentenceStart(starts, 6)).toBe(5);
    });

    it('returns previous start when exactly at sentence start', () => {
      const starts = [0, 5, 10];
      expect(findPreviousSentenceStart(starts, 5)).toBe(0);
      expect(findPreviousSentenceStart(starts, 10)).toBe(5);
    });
  });

  describe('edge cases', () => {
    it('handles single sentence start', () => {
      const starts = [0];
      expect(findPreviousSentenceStart(starts, 5)).toBe(0);
    });

    it('returns 0 when no previous start found', () => {
      const starts = [5, 10];
      expect(findPreviousSentenceStart(starts, 3)).toBe(0);
    });

    it('handles large index', () => {
      const starts = [0, 5, 10];
      expect(findPreviousSentenceStart(starts, 100)).toBe(10);
    });
  });
});

describe('findNextSentenceStart', () => {
  describe('basic navigation', () => {
    it('returns next sentence start', () => {
      const starts = [0, 5, 10];
      expect(findNextSentenceStart(starts, 2, 15)).toBe(5);
    });

    it('returns end when at last sentence', () => {
      const starts = [0, 5, 10];
      expect(findNextSentenceStart(starts, 10, 15)).toBe(14); // totalWords - 1
    });
  });

  describe('mid-sentence behavior', () => {
    it('returns next sentence start when mid-sentence', () => {
      const starts = [0, 5, 10];
      expect(findNextSentenceStart(starts, 7, 15)).toBe(10);
    });

    it('returns next start when exactly at sentence start', () => {
      const starts = [0, 5, 10];
      expect(findNextSentenceStart(starts, 0, 15)).toBe(5);
      expect(findNextSentenceStart(starts, 5, 15)).toBe(10);
    });
  });

  describe('edge cases', () => {
    it('returns end when no next start found', () => {
      const starts = [0, 5];
      expect(findNextSentenceStart(starts, 6, 15)).toBe(14);
    });

    it('handles single sentence start', () => {
      const starts = [0];
      expect(findNextSentenceStart(starts, 0, 10)).toBe(9);
    });

    it('handles index at end', () => {
      const starts = [0, 5, 10];
      expect(findNextSentenceStart(starts, 14, 15)).toBe(14);
    });
  });

  describe('multiple jumps', () => {
    it('can chain multiple skip operations', () => {
      const starts = [0, 3, 6, 9];
      const totalWords = 12;

      let index = 0;
      index = findNextSentenceStart(starts, index, totalWords);
      expect(index).toBe(3);

      index = findNextSentenceStart(starts, index, totalWords);
      expect(index).toBe(6);

      index = findNextSentenceStart(starts, index, totalWords);
      expect(index).toBe(9);

      index = findNextSentenceStart(starts, index, totalWords);
      expect(index).toBe(11); // end
    });
  });
});
