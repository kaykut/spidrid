/**
 * Tests for text processing service.
 *
 * Handles tokenization, word processing, and sentence boundary detection.
 */

import {
  tokenize,
  tokenizeWithParagraphs,
  processWord,
  processText,
  processTextNoSplit,
  mapChapterOffsetsToWordIndices,
  findSentenceStarts,
  findPreviousSentenceStart,
  findNextSentenceStart,
  getAdaptiveFontSize,
} from '../../src/services/textProcessor';
import { ProcessedWord } from '../../src/types/playback';
import { ChapterMetadata } from '../../src/types/content';

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

describe('tokenizeWithParagraphs', () => {
  describe('paragraph detection', () => {
    it('splits text on double newlines', () => {
      const text = 'First paragraph.\n\nSecond paragraph.';
      const { tokens } = tokenizeWithParagraphs(text);

      expect(tokens).toEqual(['First', 'paragraph.', 'Second', 'paragraph.']);
    });

    it('marks last word of each paragraph in paragraphEndIndices', () => {
      const text = 'First paragraph.\n\nSecond paragraph.';
      const { paragraphEndIndices } = tokenizeWithParagraphs(text);

      // 'paragraph.' at index 1 is end of first paragraph
      // 'paragraph.' at index 3 is end of second paragraph
      expect(paragraphEndIndices.has(1)).toBe(true);
      expect(paragraphEndIndices.has(3)).toBe(true);
      expect(paragraphEndIndices.size).toBe(2);
    });

    it('handles single paragraph (no double newlines)', () => {
      const text = 'Just one paragraph here.';
      const { tokens, paragraphEndIndices } = tokenizeWithParagraphs(text);

      expect(tokens).toEqual(['Just', 'one', 'paragraph', 'here.']);
      expect(paragraphEndIndices.has(3)).toBe(true);
      expect(paragraphEndIndices.size).toBe(1);
    });

    it('handles empty paragraphs gracefully', () => {
      const text = 'First.\n\n\n\nSecond.';
      const { tokens } = tokenizeWithParagraphs(text);

      // Empty paragraphs between should not add tokens
      expect(tokens).toEqual(['First.', 'Second.']);
    });

    it('handles Windows line endings', () => {
      const text = 'First paragraph.\r\n\r\nSecond paragraph.';
      const { tokens, paragraphEndIndices } = tokenizeWithParagraphs(text);

      expect(tokens.length).toBeGreaterThan(0);
      expect(paragraphEndIndices.size).toBeGreaterThan(0);
    });

    it('handles three paragraphs', () => {
      const text = 'One.\n\nTwo.\n\nThree.';
      const { tokens, paragraphEndIndices } = tokenizeWithParagraphs(text);

      expect(tokens).toEqual(['One.', 'Two.', 'Three.']);
      expect(paragraphEndIndices.has(0)).toBe(true); // 'One.'
      expect(paragraphEndIndices.has(1)).toBe(true); // 'Two.'
      expect(paragraphEndIndices.has(2)).toBe(true); // 'Three.'
    });
  });

  describe('header detection', () => {
    it('detects [[HEADER]]...[[/HEADER]] markers', () => {
      const text = '[[HEADER]]Chapter 1[[/HEADER]]\n\nSome content.';
      const { tokens, headerInfoMap } = tokenizeWithParagraphs(text);

      expect(tokens[0]).toBe('Chapter 1');
      expect(headerInfoMap.has(0)).toBe(true);
      expect(headerInfoMap.get(0)?.isHeader).toBe(true);
    });

    it('marks short headers (<=3 words, <=25 chars) as single token with headerText', () => {
      const text = '[[HEADER]]Short Title[[/HEADER]]\n\nContent here.';
      const { tokens, headerInfoMap } = tokenizeWithParagraphs(text);

      expect(tokens[0]).toBe('Short Title');
      expect(headerInfoMap.get(0)?.isHeader).toBe(true);
      expect(headerInfoMap.get(0)?.headerText).toBe('Short Title');
    });

    it('marks long headers word-by-word with isHeader flag', () => {
      const text = '[[HEADER]]This is a very long header with many words[[/HEADER]]\n\nContent.';
      const { tokens, headerInfoMap } = tokenizeWithParagraphs(text);

      // Long header should be split into words
      expect(tokens[0]).toBe('This');
      expect(headerInfoMap.get(0)?.isHeader).toBe(true);
      expect(headerInfoMap.get(0)?.headerText).toBeUndefined(); // No headerText for long headers

      // All header words should be marked
      for (let i = 0; i < 9; i++) {
        expect(headerInfoMap.has(i)).toBe(true);
        expect(headerInfoMap.get(i)?.isHeader).toBe(true);
      }
    });

    it('handles multiple headers in one text', () => {
      const text = '[[HEADER]]Chapter 1[[/HEADER]]\n\nContent one.\n\n[[HEADER]]Chapter 2[[/HEADER]]\n\nContent two.';
      const { tokens, headerInfoMap } = tokenizeWithParagraphs(text);

      // First header
      expect(tokens[0]).toBe('Chapter 1');
      expect(headerInfoMap.get(0)?.isHeader).toBe(true);

      // Find second header
      const chapter2Index = tokens.indexOf('Chapter 2');
      expect(chapter2Index).toBeGreaterThan(0);
      expect(headerInfoMap.get(chapter2Index)?.isHeader).toBe(true);
    });

    it('processes text before and after headers correctly', () => {
      const text = 'Before text. [[HEADER]]Title[[/HEADER]] After text.';
      const { tokens, headerInfoMap } = tokenizeWithParagraphs(text);

      expect(tokens[0]).toBe('Before');
      expect(tokens[1]).toBe('text.');
      expect(tokens[2]).toBe('Title');
      expect(tokens[3]).toBe('After');
      expect(tokens[4]).toBe('text.');

      // Only the header word should be marked
      expect(headerInfoMap.has(0)).toBe(false);
      expect(headerInfoMap.has(1)).toBe(false);
      expect(headerInfoMap.get(2)?.isHeader).toBe(true);
      expect(headerInfoMap.has(3)).toBe(false);
    });

    it('handles header at exactly 3 words and 25 chars', () => {
      const text = '[[HEADER]]One Two Three[[/HEADER]]'; // 13 chars, 3 words - short
      const { tokens, headerInfoMap } = tokenizeWithParagraphs(text);

      expect(tokens[0]).toBe('One Two Three');
      expect(headerInfoMap.get(0)?.headerText).toBe('One Two Three');
    });

    it('handles header with 4 words as long header', () => {
      const text = '[[HEADER]]One Two Three Four[[/HEADER]]';
      const { tokens, headerInfoMap } = tokenizeWithParagraphs(text);

      // 4 words should be treated as long header (word-by-word)
      expect(tokens[0]).toBe('One');
      expect(headerInfoMap.get(0)?.headerText).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('returns empty tokens for empty text', () => {
      const { tokens, paragraphEndIndices, headerInfoMap } = tokenizeWithParagraphs('');

      expect(tokens).toEqual([]);
      expect(paragraphEndIndices.size).toBe(0);
      expect(headerInfoMap.size).toBe(0);
    });

    it('handles text with only headers', () => {
      const text = '[[HEADER]]Title[[/HEADER]]';
      const { tokens, headerInfoMap } = tokenizeWithParagraphs(text);

      expect(tokens).toEqual(['Title']);
      expect(headerInfoMap.get(0)?.isHeader).toBe(true);
    });

    it('handles whitespace-only text', () => {
      const { tokens } = tokenizeWithParagraphs('   \n\n   ');
      expect(tokens).toEqual([]);
    });

    it('handles nested whitespace in headers', () => {
      const text = '[[HEADER]]  Spaced   Title  [[/HEADER]]';
      const { tokens } = tokenizeWithParagraphs(text);

      // Should trim the header content
      expect(tokens[0]).toBe('Spaced   Title');
    });
  });
});

describe('mapChapterOffsetsToWordIndices', () => {
  it('returns empty array for empty chapters', () => {
    const result = mapChapterOffsetsToWordIndices('Some text here', []);
    expect(result).toEqual([]);
  });

  it('maps character offset 0 to word index 0', () => {
    const text = 'First word here.';
    const chapters: ChapterMetadata[] = [
      { title: 'Chapter 1', startCharOffset: 0 },
    ];

    const result = mapChapterOffsetsToWordIndices(text, chapters);

    expect(result[0].startWordIndex).toBe(0);
    expect(result[0].title).toBe('Chapter 1');
  });

  it('maps mid-text offset to correct word index', () => {
    const text = 'First Second Third Fourth';
    // 'First ' = 6 chars, 'Second ' = 7 chars, so 'Third' starts at char 13
    const chapters: ChapterMetadata[] = [
      { title: 'Chapter 1', startCharOffset: 13 },
    ];

    const result = mapChapterOffsetsToWordIndices(text, chapters);

    expect(result[0].startWordIndex).toBe(2); // 'Third' is word index 2
  });

  it('handles chapter starting at word boundary', () => {
    const text = 'Word1 Word2 Word3';
    // 'Word1 Word2 ' = 12 chars, 'Word3' starts at char 12
    const chapters: ChapterMetadata[] = [
      { title: 'Ch', startCharOffset: 12 },
    ];

    const result = mapChapterOffsetsToWordIndices(text, chapters);

    expect(result[0].startWordIndex).toBe(2);
  });

  it('handles multiple chapters in sequence', () => {
    const text = 'One Two Three Four Five';
    const chapters: ChapterMetadata[] = [
      { title: 'Chapter 1', startCharOffset: 0 },
      { title: 'Chapter 2', startCharOffset: 8 }, // 'Three' starts at 8
      { title: 'Chapter 3', startCharOffset: 20 }, // 'Five' starts at 20
    ];

    const result = mapChapterOffsetsToWordIndices(text, chapters);

    expect(result[0].startWordIndex).toBe(0);
    expect(result[1].startWordIndex).toBe(2);
    expect(result[2].startWordIndex).toBe(4);
  });

  it('handles text with irregular whitespace', () => {
    const text = 'First   Second\t\tThird';
    const chapters: ChapterMetadata[] = [
      { title: 'Ch', startCharOffset: 0 },
    ];

    const result = mapChapterOffsetsToWordIndices(text, chapters);

    expect(result[0].startWordIndex).toBe(0);
  });

  it('preserves original chapter properties', () => {
    const chapters: ChapterMetadata[] = [
      { title: 'My Chapter', startCharOffset: 0 },
    ];

    const result = mapChapterOffsetsToWordIndices('Some text', chapters);

    expect(result[0].title).toBe('My Chapter');
    expect(result[0].startCharOffset).toBe(0);
    expect(result[0].startWordIndex).toBeDefined();
  });
});

describe('processText with chapters', () => {
  it('applies chapterStart info to correct word indices', () => {
    const text = 'First Second Third';
    const chapters: ChapterMetadata[] = [
      { title: 'Chapter 1', startCharOffset: 0 },
    ];

    const result = processText(text, chapters);

    expect(result[0].chapterStart).toBeDefined();
    expect(result[0].chapterStart?.title).toBe('Chapter 1');
    expect(result[0].chapterStart?.index).toBe(1); // 1-based
  });

  it('handles multiple chapters', () => {
    const text = 'One Two Three Four';
    const chapters: ChapterMetadata[] = [
      { title: 'Part 1', startCharOffset: 0 },
      { title: 'Part 2', startCharOffset: 8 }, // 'Three' starts at char 8
    ];

    const result = processText(text, chapters);

    expect(result[0].chapterStart?.title).toBe('Part 1');
    expect(result[0].chapterStart?.index).toBe(1);
    expect(result[2].chapterStart?.title).toBe('Part 2');
    expect(result[2].chapterStart?.index).toBe(2);
  });

  it('handles chapter at first word', () => {
    const text = 'Beginning of text.';
    const chapters: ChapterMetadata[] = [
      { title: 'Intro', startCharOffset: 0 },
    ];

    const result = processText(text, chapters);

    expect(result[0].chapterStart?.title).toBe('Intro');
  });

  it('words without chapters have no chapterStart', () => {
    const text = 'First Second Third';
    const chapters: ChapterMetadata[] = [
      { title: 'Chapter 1', startCharOffset: 0 },
    ];

    const result = processText(text, chapters);

    // Only first word has chapter start
    expect(result[0].chapterStart).toBeDefined();
    expect(result[1].chapterStart).toBeUndefined();
    expect(result[2].chapterStart).toBeUndefined();
  });

  it('combines chapters with paragraph boundaries', () => {
    const text = 'First.\n\nSecond.';
    const chapters: ChapterMetadata[] = [
      { title: 'Ch1', startCharOffset: 0 },
    ];

    const result = processText(text, chapters);

    expect(result[0].chapterStart?.title).toBe('Ch1');
    expect(result[0].paragraphEnd).toBe(true); // 'First.' ends paragraph
  });

  it('combines chapters with headers', () => {
    const text = '[[HEADER]]Title[[/HEADER]]\n\nContent here.';
    const chapters: ChapterMetadata[] = [
      { title: 'Chapter', startCharOffset: 0 },
    ];

    const result = processText(text, chapters);

    // First token is the header
    expect(result[0].isHeader).toBe(true);
    expect(result[0].chapterStart?.title).toBe('Chapter');
  });
});

describe('getAdaptiveFontSize', () => {
  it('returns 42pt for words ≤13 chars', () => {
    expect(getAdaptiveFontSize(1)).toBe(42);
    expect(getAdaptiveFontSize(8)).toBe(42);
    expect(getAdaptiveFontSize(13)).toBe(42);
  });

  it('returns 38pt for 14 char words', () => {
    expect(getAdaptiveFontSize(14)).toBe(38);
  });

  it('returns 34pt for 15 char words', () => {
    expect(getAdaptiveFontSize(15)).toBe(34);
  });

  it('returns 32pt for 16 char words', () => {
    expect(getAdaptiveFontSize(16)).toBe(32);
  });

  it('returns 30pt for 17 char words', () => {
    expect(getAdaptiveFontSize(17)).toBe(30);
  });

  it('returns 28pt for 18-19 char words', () => {
    expect(getAdaptiveFontSize(18)).toBe(28);
    expect(getAdaptiveFontSize(19)).toBe(28);
  });

  it('returns 26pt for 20 char words', () => {
    expect(getAdaptiveFontSize(20)).toBe(26);
  });

  it('returns 24pt for 21+ char words', () => {
    expect(getAdaptiveFontSize(21)).toBe(24);
    expect(getAdaptiveFontSize(25)).toBe(24);  // 22+ will be hyphenated, but function returns 24
  });
});

describe('processTextNoSplit', () => {
  it('processes text without splitting long words', () => {
    const text = 'telecommunications photosynthesis';
    const result = processTextNoSplit(text);

    // Should have exactly 2 words (no splitting)
    expect(result).toHaveLength(2);
    expect(result[0].display).toBe('telecommunications');
    expect(result[1].display).toBe('photosynthesis');

    // Words should NOT have fullWord or isContinuation flags
    expect(result[0].fullWord).toBeUndefined();
    expect(result[0].isContinuation).toBeUndefined();
    expect(result[1].fullWord).toBeUndefined();
    expect(result[1].isContinuation).toBeUndefined();
  });

  it('has same behavior as processText for short words', () => {
    const text = 'hello world test';
    const withSplit = processText(text);
    const noSplit = processTextNoSplit(text);

    // Same number of words for short text
    expect(noSplit).toHaveLength(withSplit.length);
    expect(noSplit.map(w => w.display)).toEqual(withSplit.map(w => w.display));
  });

  it('preserves paragraph boundaries', () => {
    const text = 'First paragraph.\n\nSecond paragraph.';
    const result = processTextNoSplit(text);

    // Should have 4 words total
    expect(result).toHaveLength(4);

    // First paragraph ends at second word
    expect(result[1].paragraphEnd).toBe(true);

    // Second paragraph ends at fourth word
    expect(result[3].paragraphEnd).toBe(true);
  });

  it('preserves header markers', () => {
    const text = '[[HEADER]]Short Title[[/HEADER]]\n\nContent here.';
    const result = processTextNoSplit(text);

    // First word should be header
    expect(result[0].isHeader).toBe(true);
    expect(result[0].headerText).toBe('Short Title');
  });

  it('preserves chapter start markers', () => {
    const text = 'First word. Second word.';
    const chapters: ChapterMetadata[] = [
      { title: 'Chapter 1', startCharOffset: 0 },
    ];

    const result = processTextNoSplit(text, chapters);

    // First word should have chapter start
    expect(result[0].chapterStart).toBeDefined();
    expect(result[0].chapterStart?.title).toBe('Chapter 1');
    expect(result[0].chapterStart?.index).toBe(1);
  });

  it('correctly handles very long words without splitting', () => {
    const text = 'counterrevolutionaries internationalization';
    const result = processTextNoSplit(text);

    // Should have exactly 2 words (no splitting even for 20+ char words)
    expect(result).toHaveLength(2);
    expect(result[0].display).toBe('counterrevolutionaries');
    expect(result[0].display.length).toBe(22);
    expect(result[1].display).toBe('internationalization');
    expect(result[1].display.length).toBe(20);

    // No splitting metadata
    expect(result[0].fullWord).toBeUndefined();
    expect(result[0].isContinuation).toBeUndefined();
    expect(result[1].fullWord).toBeUndefined();
    expect(result[1].isContinuation).toBeUndefined();
  });
});
