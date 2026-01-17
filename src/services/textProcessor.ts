import { ChapterMetadata } from '../types/content';
import { ProcessedWord } from '../types/playback';
import { RSVP_FONT_SIZES } from '../constants/typography';
import { getCurrentAdapter } from './language';
import { LanguageAdapter } from './language/types';
import { calculateORP, calculatePauseMultiplier, isSentenceEnd } from './orp';
import { splitLongWord, needsSplitting } from './syllables';

/**
 * Tokenize text into words.
 *
 * Preserves punctuation attached to words (e.g., "Hello," stays as one token).
 * Filters out empty strings and whitespace-only tokens.
 *
 * @param text - Text to tokenize
 * @param adapter - Language adapter for word split pattern (defaults to current language)
 */
export function tokenize(
  text: string,
  adapter: LanguageAdapter = getCurrentAdapter()
): string[] {
  return text
    .split(adapter.wordSplitPattern)
    .map(word => word.trim())
    .filter(word => word.length > 0);
}

// Header info for a word
interface HeaderInfo {
  isHeader: boolean;
  headerText?: string; // Full header text for snapshot display (short headers only)
}

/**
 * Tokenize text with paragraph boundary and header tracking.
 *
 * Splits on double newlines to detect paragraph breaks.
 * Detects [[HEADER]]...[[/HEADER]] markers for header treatment.
 * Returns tokens plus sets of indices for paragraph ends and header info.
 *
 * @param text - Text to tokenize
 * @param adapter - Language adapter for patterns (defaults to current language)
 */
export function tokenizeWithParagraphs(
  text: string,
  adapter: LanguageAdapter = getCurrentAdapter()
): {
  tokens: string[];
  paragraphEndIndices: Set<number>;
  headerInfoMap: Map<number, HeaderInfo>;
} {
  const paragraphs = text.split(adapter.paragraphPattern);
  const tokens: string[] = [];
  const paragraphEndIndices = new Set<number>();
  const headerInfoMap = new Map<number, HeaderInfo>();

  // Regex to match [[HEADER]]...[[/HEADER]] markers
  const headerRegex = /\[\[HEADER\]\]([\s\S]*?)\[\[\/HEADER\]\]/g;

  for (const paragraph of paragraphs) {
    // Check if this paragraph contains header markers
    const headerMatches = [...paragraph.matchAll(headerRegex)];

    if (headerMatches.length > 0) {
      // Process paragraphs with headers
      let lastEnd = 0;

      for (const match of headerMatches) {
        const matchStart = match.index!;
        const matchEnd = matchStart + match[0].length;
        const headerContent = match[1].trim();

        // Process text before the header
        const beforeHeader = paragraph.slice(lastEnd, matchStart);
        const beforeWords = beforeHeader.split(adapter.wordSplitPattern).filter(w => w.trim().length > 0);
        if (beforeWords.length > 0) {
          tokens.push(...beforeWords.map(w => w.trim()));
        }

        // Process the header content
        const headerWords = headerContent.split(adapter.wordSplitPattern).filter(w => w.trim().length > 0);
        if (headerWords.length > 0) {
          const isShortHeader = headerWords.length <= 3 && headerContent.length <= 25;

          if (isShortHeader) {
            // Short header: display as snapshot (single unit)
            // Add a single token for the whole header
            const startIndex = tokens.length;
            tokens.push(headerContent);
            headerInfoMap.set(startIndex, {
              isHeader: true,
              headerText: headerContent,
            });
          } else {
            // Long header: word-by-word with isHeader flag
            const startIndex = tokens.length;
            tokens.push(...headerWords.map(w => w.trim()));
            for (let i = startIndex; i < tokens.length; i++) {
              headerInfoMap.set(i, { isHeader: true });
            }
          }
        }

        lastEnd = matchEnd;
      }

      // Process text after the last header
      const afterHeader = paragraph.slice(lastEnd);
      const afterWords = afterHeader.split(adapter.wordSplitPattern).filter(w => w.trim().length > 0);
      if (afterWords.length > 0) {
        tokens.push(...afterWords.map(w => w.trim()));
      }
    } else {
      // No headers in this paragraph - simple tokenization
      const words = paragraph.split(adapter.wordSplitPattern).filter(w => w.trim().length > 0);
      if (words.length > 0) {
        tokens.push(...words.map(w => w.trim()));
      }
    }

    // Mark end of paragraph if we added any tokens
    if (tokens.length > 0) {
      paragraphEndIndices.add(tokens.length - 1);
    }
  }

  return { tokens, paragraphEndIndices, headerInfoMap };
}

/**
 * Process a single word into a ProcessedWord with ORP data.
 *
 * @param word - Word to process
 * @param paragraphEnd - Whether this word ends a paragraph
 * @param adapter - Language adapter (defaults to current language)
 */
export function processWord(
  word: string,
  paragraphEnd: boolean = false,
  adapter: LanguageAdapter = getCurrentAdapter()
): ProcessedWord {
  return {
    original: word,
    display: word,
    orpIndex: calculateORP(word),
    pauseMultiplier: calculatePauseMultiplier(word, adapter),
    sentenceEnd: isSentenceEnd(word, adapter),
    paragraphEnd,
  };
}

/**
 * Map character offsets to word indices.
 * Given the original text and chapter metadata with character offsets,
 * computes the word index where each chapter starts.
 */
export function mapChapterOffsetsToWordIndices(
  text: string,
  chapters: ChapterMetadata[]
): ChapterMetadata[] {
  if (chapters.length === 0) {return [];}

  // Build a map of character position -> word index
  // We scan through the text, tracking current character position and word count
  const charToWordIndex: Map<number, number> = new Map();
  let wordIndex = 0;
  let inWord = false;

  for (let i = 0; i <= text.length; i++) {
    const char = text[i];
    const isWhitespace = !char || /\s/.test(char);

    if (!isWhitespace && !inWord) {
      // Starting a new word
      inWord = true;
      charToWordIndex.set(i, wordIndex);
    } else if (isWhitespace && inWord) {
      // Ending a word
      inWord = false;
      wordIndex++;
    }
  }

  // Map each chapter's character offset to the nearest word index
  return chapters.map((chapter) => {
    // Find the first word that starts at or after the chapter offset
    let closestWordIndex = 0;
    for (const [charPos, wIndex] of charToWordIndex) {
      if (charPos >= chapter.startCharOffset) {
        closestWordIndex = wIndex;
        break;
      }
      closestWordIndex = wIndex;
    }

    return {
      ...chapter,
      startWordIndex: closestWordIndex,
    };
  });
}

/**
 * Process full text into array of ProcessedWords.
 * Uses paragraph-aware tokenization to mark paragraph ends.
 * Optionally marks chapter starts and detects headers.
 * Splits long words at syllable boundaries for RSVP display.
 *
 * @param text - Text to process
 * @param chapters - Optional chapter metadata
 * @param adapter - Language adapter (defaults to current language)
 */
export function processText(
  text: string,
  chapters?: ChapterMetadata[],
  adapter: LanguageAdapter = getCurrentAdapter()
): ProcessedWord[] {
  const { tokens, paragraphEndIndices, headerInfoMap } = tokenizeWithParagraphs(text, adapter);

  // Map chapter offsets to word indices if chapters are provided
  const mappedChapters = chapters ? mapChapterOffsetsToWordIndices(text, chapters) : [];

  // Build a map of word index -> chapter info
  const chapterStartMap = new Map<number, { title: string; index: number }>();
  mappedChapters.forEach((chapter, index) => {
    if (chapter.startWordIndex !== undefined) {
      chapterStartMap.set(chapter.startWordIndex, {
        title: chapter.title,
        index: index + 1, // 1-based chapter number
      });
    }
  });

  // Process tokens, potentially splitting long words into multiple ProcessedWords
  const result: ProcessedWord[] = [];

  for (let index = 0; index < tokens.length; index++) {
    const word = tokens[index];
    const isParagraphEnd = paragraphEndIndices.has(index);
    const chapterStart = chapterStartMap.get(index);
    const headerInfo = headerInfoMap.get(index);

    // Check if this word needs splitting (skip headers - they're handled differently)
    if (needsSplitting(word) && !headerInfo?.headerText) {
      const chunks = splitLongWord(word, undefined, adapter);

      chunks.forEach((chunk, chunkIndex) => {
        const isFirstChunk = chunkIndex === 0;
        const isLastChunk = chunkIndex === chunks.length - 1;

        const processedChunk: ProcessedWord = {
          original: word,
          display: chunk,
          orpIndex: calculateORP(chunk),
          pauseMultiplier: calculatePauseMultiplier(chunk, adapter),
          sentenceEnd: isLastChunk && isSentenceEnd(word, adapter),
          paragraphEnd: isLastChunk && isParagraphEnd,
          fullWord: word,
          isContinuation: !isFirstChunk,
        };

        // Only apply chapter start and header info to first chunk
        if (isFirstChunk) {
          if (chapterStart) {
            processedChunk.chapterStart = chapterStart;
          }
          if (headerInfo) {
            processedChunk.isHeader = true;
          }
        }

        result.push(processedChunk);
      });
    } else {
      // Normal word processing (no splitting needed)
      const baseWord = processWord(word, isParagraphEnd, adapter);

      // Apply chapter start if present
      if (chapterStart) {
        baseWord.chapterStart = chapterStart;
      }

      // Apply header info if present
      if (headerInfo) {
        baseWord.isHeader = true;
        if (headerInfo.headerText) {
          baseWord.headerText = headerInfo.headerText;
        }
      }

      result.push(baseWord);
    }
  }

  return result;
}

/**
 * Find indices where sentences start.
 * Used for rewind/skip functionality.
 */
export function findSentenceStarts(words: ProcessedWord[]): number[] {
  const starts: number[] = [0]; // First word is always a sentence start

  for (let i = 0; i < words.length - 1; i++) {
    if (words[i].sentenceEnd) {
      starts.push(i + 1);
    }
  }

  return starts;
}

/**
 * Find the sentence start index before or at the given index.
 */
export function findPreviousSentenceStart(
  sentenceStarts: number[],
  currentIndex: number
): number {
  // Find the largest sentence start that is less than currentIndex
  for (let i = sentenceStarts.length - 1; i >= 0; i--) {
    if (sentenceStarts[i] < currentIndex) {
      return sentenceStarts[i];
    }
  }
  return 0;
}

/**
 * Find the sentence start index after the given index.
 */
export function findNextSentenceStart(
  sentenceStarts: number[],
  currentIndex: number,
  totalWords: number
): number {
  for (const start of sentenceStarts) {
    if (start > currentIndex) {
      return start;
    }
  }
  return totalWords - 1; // Stay at end if no next sentence
}

/**
 * Calculate adaptive font size based on word length.
 *
 * Ensures long words don't wrap on narrow screens (375px iPhone SE) by
 * reducing font size for longer words. Words 22+ chars trigger hyphenation
 * in processText().
 *
 * Font size mappings:
 * - ≤13 chars: 42pt (majority of words, full size)
 * - 14 chars: 38pt
 * - 15 chars: 34pt
 * - 16 chars: 32pt
 * - 17 chars: 30pt
 * - 18-19 chars: 28pt
 * - 20 chars: 26pt
 * - 21 chars: 24pt
 * - 22+ chars: Will be hyphenated by processText, chunks use appropriate size
 *
 * @param wordLength - The length of the word to display
 * @returns Appropriate font size in points
 *
 * @example
 * getAdaptiveFontSize(10)  // 42 - short word, full size
 * getAdaptiveFontSize(13)  // 42 - still full size
 * getAdaptiveFontSize(14)  // 38 - first reduction
 * getAdaptiveFontSize(17)  // 30
 * getAdaptiveFontSize(19)  // 28
 * getAdaptiveFontSize(21)  // 24 - last size before hyphenation
 */
export function getAdaptiveFontSize(wordLength: number): number {
  if (wordLength <= 13) return RSVP_FONT_SIZES.size42;
  if (wordLength === 14) return RSVP_FONT_SIZES.size38;
  if (wordLength === 15) return RSVP_FONT_SIZES.size34;
  if (wordLength === 16) return RSVP_FONT_SIZES.size32;
  if (wordLength === 17) return RSVP_FONT_SIZES.size30;
  if (wordLength <= 19) return RSVP_FONT_SIZES.size28;  // 18-19
  if (wordLength === 20) return RSVP_FONT_SIZES.size26;
  return RSVP_FONT_SIZES.size24;  // 21+ chars (but 22+ should be hyphenated)
}

/**
 * Process text WITHOUT word splitting for testing adaptive font sizing.
 *
 * DIFFERENCE FROM processText(): Skips splitLongWord() call entirely.
 * Used to test whether adaptive font sizing alone can prevent wrapping.
 *
 * @param text - Text to process
 * @param chapters - Optional chapter metadata
 * @param adapter - Language adapter (defaults to current language)
 */
export function processTextNoSplit(
  text: string,
  chapters?: ChapterMetadata[],
  adapter: LanguageAdapter = getCurrentAdapter()
): ProcessedWord[] {
  const { tokens, paragraphEndIndices, headerInfoMap } = tokenizeWithParagraphs(text, adapter);

  // Map chapter offsets to word indices if chapters are provided
  const mappedChapters = chapters ? mapChapterOffsetsToWordIndices(text, chapters) : [];

  // Build a map of word index -> chapter info
  const chapterStartMap = new Map<number, { title: string; index: number }>();
  mappedChapters.forEach((chapter, index) => {
    if (chapter.startWordIndex !== undefined) {
      chapterStartMap.set(chapter.startWordIndex, {
        title: chapter.title,
        index: index + 1, // 1-based chapter number
      });
    }
  });

  const result: ProcessedWord[] = [];

  for (let index = 0; index < tokens.length; index++) {
    const word = tokens[index];
    const isParagraphEnd = paragraphEndIndices.has(index);
    const chapterStart = chapterStartMap.get(index);
    const headerInfo = headerInfoMap.get(index);

    // NO SPLITTING - process all words as-is
    const baseWord = processWord(word, isParagraphEnd, adapter);

    // Apply chapter start if present
    if (chapterStart) {
      baseWord.chapterStart = chapterStart;
    }

    // Apply header info if present
    if (headerInfo) {
      baseWord.isHeader = true;
      if (headerInfo.headerText) {
        baseWord.headerText = headerInfo.headerText;
      }
    }

    result.push(baseWord);
  }

  return result;
}
