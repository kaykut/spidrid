import { RSVP_FONT_SIZES } from '../constants/typography';
import { ProcessedWord } from '../types/playback';
import { DEFAULT_SETTINGS, HyphenationMode, PauseLevel } from '../types/settings';
import { useSettingsStore } from '../store/settingsStore';
import { getCurrentAdapter } from './language';
import { LanguageAdapter } from './language/types';
import {
  calculateORP,
  calculatePauseMultiplier,
  isSentenceEnd,
  getPauseMultiplierForLevel,
  DEFAULT_PAUSE_MULTIPLIERS,
  PauseMultipliers,
} from './orp';
import { splitLongWord, needsSplitting, DEFAULT_MAX_WORD_LENGTH } from './syllables';

export interface ProcessTextOptions {
  pauseOnComma?: PauseLevel;
  pauseOnPeriod?: PauseLevel;
  hyphenationMode?: HyphenationMode;
}

const STABLE_HYPHENATION_MAX_LENGTH = 14;

function resolvePauseMultipliers(options?: ProcessTextOptions): PauseMultipliers {
  const settings = useSettingsStore.getState();
  const pauseOnComma = options?.pauseOnComma ?? settings.pauseOnComma ?? DEFAULT_SETTINGS.pauseOnComma;
  const pauseOnPeriod = options?.pauseOnPeriod ?? settings.pauseOnPeriod ?? DEFAULT_SETTINGS.pauseOnPeriod;

  return {
    sentenceEnd: getPauseMultiplierForLevel('period', pauseOnPeriod),
    clauseBreak: getPauseMultiplierForLevel('comma', pauseOnComma),
    longWord: DEFAULT_PAUSE_MULTIPLIERS.longWord,
  };
}

function resolveMaxWordLength(options?: ProcessTextOptions): number {
  const settings = useSettingsStore.getState();
  const mode = options?.hyphenationMode ?? settings.hyphenationMode ?? DEFAULT_SETTINGS.hyphenationMode;
  return mode === 'stable' ? STABLE_HYPHENATION_MAX_LENGTH : DEFAULT_MAX_WORD_LENGTH;
}

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
// Chapter info for a word
interface ChapterInfo {
  title: string;
  index: number;
}

export function tokenizeWithParagraphs(
  text: string,
  adapter: LanguageAdapter = getCurrentAdapter()
): {
  tokens: string[];
  paragraphEndIndices: Set<number>;
  headerInfoMap: Map<number, HeaderInfo>;
  chapterInfoMap: Map<number, ChapterInfo>;
} {
  const paragraphs = text.split(adapter.paragraphPattern);
  const tokens: string[] = [];
  const paragraphEndIndices = new Set<number>();
  const headerInfoMap = new Map<number, HeaderInfo>();
  const chapterInfoMap = new Map<number, ChapterInfo>();

  // Regex to match [[HEADER]]...[[/HEADER]] markers
  const headerRegex = /\[\[HEADER\]\]([\s\S]*?)\[\[\/HEADER\]\]/g;

  // Regex to match [DEVORO_CH:index:title] markers
  const chapterRegex = /^\[DEVORO_CH:(\d+):(.+)\]$/;

  // Track pending chapter info to attach to next word
  let pendingChapterInfo: ChapterInfo | null = null;

  for (const paragraph of paragraphs) {
    // Check if this paragraph is a chapter marker
    const chapterMatch = paragraph.trim().match(chapterRegex);
    if (chapterMatch) {
      // Store chapter info to attach to next word
      pendingChapterInfo = {
        index: parseInt(chapterMatch[1], 10),
        title: chapterMatch[2].trim()
      };
      continue; // Skip tokenizing this paragraph
    }

    // Remember the token count before adding new words
    const tokenCountBeforeParagraph = tokens.length;

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
          const firstWordIndexInBatch = tokens.length;
          tokens.push(...beforeWords.map(w => w.trim()));

          // Attach pending chapter info to first word if this is the first paragraph after marker
          if (pendingChapterInfo && tokenCountBeforeParagraph === firstWordIndexInBatch) {
            chapterInfoMap.set(firstWordIndexInBatch, pendingChapterInfo);
            pendingChapterInfo = null;
          }
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

            // Attach pending chapter info to header if this is the first paragraph after marker
            if (pendingChapterInfo && tokenCountBeforeParagraph === startIndex) {
              chapterInfoMap.set(startIndex, pendingChapterInfo);
              pendingChapterInfo = null;
            }
          } else {
            // Long header: word-by-word with isHeader flag
            const startIndex = tokens.length;
            tokens.push(...headerWords.map(w => w.trim()));
            for (let i = startIndex; i < tokens.length; i++) {
              headerInfoMap.set(i, { isHeader: true });
            }

            // Attach pending chapter info to first header word if this is the first paragraph after marker
            if (pendingChapterInfo && tokenCountBeforeParagraph === startIndex) {
              chapterInfoMap.set(startIndex, pendingChapterInfo);
              pendingChapterInfo = null;
            }
          }
        }

        lastEnd = matchEnd;
      }

      // Process text after the last header
      const afterHeader = paragraph.slice(lastEnd);
      const afterWords = afterHeader.split(adapter.wordSplitPattern).filter(w => w.trim().length > 0);
      if (afterWords.length > 0) {
        const firstWordIndexInBatch = tokens.length;
        tokens.push(...afterWords.map(w => w.trim()));

        // Attach pending chapter info to first word if this is the first paragraph after marker
        if (pendingChapterInfo && tokenCountBeforeParagraph === firstWordIndexInBatch) {
          chapterInfoMap.set(firstWordIndexInBatch, pendingChapterInfo);
          pendingChapterInfo = null;
        }
      }
    } else {
      // No headers in this paragraph - simple tokenization
      const words = paragraph.split(adapter.wordSplitPattern).filter(w => w.trim().length > 0);
      if (words.length > 0) {
        const firstWordIndexInBatch = tokens.length;
        tokens.push(...words.map(w => w.trim()));

        // Attach pending chapter info to first word if this is the first paragraph after marker
        if (pendingChapterInfo && tokenCountBeforeParagraph === firstWordIndexInBatch) {
          chapterInfoMap.set(firstWordIndexInBatch, pendingChapterInfo);
          pendingChapterInfo = null;
        }
      }
    }

    // Mark end of paragraph if we added any tokens
    if (tokens.length > 0) {
      paragraphEndIndices.add(tokens.length - 1);
    }
  }

  return { tokens, paragraphEndIndices, headerInfoMap, chapterInfoMap };
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
  adapter: LanguageAdapter = getCurrentAdapter(),
  pauseMultipliers: PauseMultipliers = DEFAULT_PAUSE_MULTIPLIERS
): ProcessedWord {
  return {
    original: word,
    display: word,
    orpIndex: calculateORP(word),
    pauseMultiplier: calculatePauseMultiplier(word, adapter, pauseMultipliers),
    sentenceEnd: isSentenceEnd(word, adapter),
    paragraphEnd,
  };
}

/**
 * Process full text into array of ProcessedWords.
 * Uses paragraph-aware tokenization to mark paragraph ends.
 * Detects chapter starts from embedded markers and headers.
 * Splits long words at syllable boundaries for RSVP display.
 *
 * @param text - Text to process
 * @param adapter - Language adapter (defaults to current language)
 */
export function processText(
  text: string,
  adapter: LanguageAdapter = getCurrentAdapter(),
  options?: ProcessTextOptions
): ProcessedWord[] {
  const { tokens, paragraphEndIndices, headerInfoMap, chapterInfoMap } = tokenizeWithParagraphs(text, adapter);
  const pauseMultipliers = resolvePauseMultipliers(options);
  const maxWordLength = resolveMaxWordLength(options);

  // Use chapter info from embedded markers
  const chapterStartMap = chapterInfoMap;

  // Process tokens, potentially splitting long words into multiple ProcessedWords
  const result: ProcessedWord[] = [];

  for (let index = 0; index < tokens.length; index++) {
    const word = tokens[index];
    const isParagraphEnd = paragraphEndIndices.has(index);
    const chapterStart = chapterStartMap.get(index);
    const headerInfo = headerInfoMap.get(index);

    // Check if this word needs splitting (skip headers - they're handled differently)
    if (needsSplitting(word, maxWordLength) && !headerInfo?.headerText) {
      const chunks = splitLongWord(word, maxWordLength, adapter);

      chunks.forEach((chunk, chunkIndex) => {
        const isFirstChunk = chunkIndex === 0;
        const isLastChunk = chunkIndex === chunks.length - 1;

        const processedChunk: ProcessedWord = {
          original: word,
          display: chunk,
          orpIndex: calculateORP(chunk),
          pauseMultiplier: calculatePauseMultiplier(chunk, adapter, pauseMultipliers),
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
      const baseWord = processWord(word, isParagraphEnd, adapter, pauseMultipliers);

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
 * reducing font size for longer words. By default, words 22+ chars trigger
 * hyphenation in processText(), or earlier if aggressive hyphenation is enabled.
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
 * - 22+ chars: Will be hyphenated by processText by default; chunks use appropriate size
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
  if (wordLength <= 13) {
    return RSVP_FONT_SIZES.size42;
  }
  if (wordLength === 14) {
    return RSVP_FONT_SIZES.size38;
  }
  if (wordLength === 15) {
    return RSVP_FONT_SIZES.size34;
  }
  if (wordLength === 16) {
    return RSVP_FONT_SIZES.size32;
  }
  if (wordLength === 17) {
    return RSVP_FONT_SIZES.size30;
  }
  if (wordLength <= 19) {
    return RSVP_FONT_SIZES.size28;  // 18-19
  }
  if (wordLength === 20) {
    return RSVP_FONT_SIZES.size26;
  }
  return RSVP_FONT_SIZES.size24;  // 21+ chars (but 22+ should be hyphenated)
}

/**
 * Process text WITHOUT word splitting for testing adaptive font sizing.
 *
 * DIFFERENCE FROM processText(): Skips splitLongWord() call entirely.
 * Used to test whether adaptive font sizing alone can prevent wrapping.
 *
 * @param text - Text to process
 * @param adapter - Language adapter (defaults to current language)
 */
export function processTextNoSplit(
  text: string,
  adapter: LanguageAdapter = getCurrentAdapter(),
  options?: ProcessTextOptions
): ProcessedWord[] {
  const { tokens, paragraphEndIndices, headerInfoMap, chapterInfoMap } = tokenizeWithParagraphs(text, adapter);
  const pauseMultipliers = resolvePauseMultipliers(options);

  // Use chapter info from embedded markers
  const chapterStartMap = chapterInfoMap;

  const result: ProcessedWord[] = [];

  for (let index = 0; index < tokens.length; index++) {
    const word = tokens[index];
    const isParagraphEnd = paragraphEndIndices.has(index);
    const chapterStart = chapterStartMap.get(index);
    const headerInfo = headerInfoMap.get(index);

    // NO SPLITTING - process all words as-is
    const baseWord = processWord(word, isParagraphEnd, adapter, pauseMultipliers);

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
