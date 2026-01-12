/**
 * Test utility functions and factories.
 */

import { ProcessedWord } from '../../src/types/playback';
import { ArticleProgress } from '../../src/types/learning';
import { JourneyCertProgress, DEFAULT_CERT_PROGRESS, JourneyCertTier } from '../../src/types/journey';
import { GeneratedArticle, ArticleTone, GenerationStatus } from '../../src/types/generated';
import {
  Curriculum,
  CurriculumArticle,
  ArticleGenerationStatus,
  ArticleCompletionStatus,
} from '../../src/types/curriculum';

/**
 * Creates a mock ProcessedWord for testing.
 */
export function createMockWord(
  word: string,
  options: Partial<ProcessedWord> = {}
): ProcessedWord {
  return {
    original: word,
    display: word,
    orpIndex: Math.floor(word.length / 3),
    pauseMultiplier: 1.0,
    sentenceEnd: false,
    paragraphEnd: false,
    ...options,
  };
}

/**
 * Creates an array of mock ProcessedWords from a sentence.
 */
export function createMockWords(sentence: string): ProcessedWord[] {
  return sentence.split(' ').map((word) => {
    const endsWithPunctuation = /[.!?]$/.test(word);
    return createMockWord(word, {
      sentenceEnd: endsWithPunctuation,
      pauseMultiplier: endsWithPunctuation ? 1.8 : 1.0,
    });
  });
}

/**
 * Wait for a specified number of milliseconds.
 * Useful for testing async operations.
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Flush all pending promises.
 */
export function flushPromises(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

// =============================================================================
// Article Progress Factory
// =============================================================================

/**
 * Creates a mock ArticleProgress for testing learningStore and useStats.
 */
export function createArticleProgress(
  overrides: Partial<ArticleProgress> = {}
): ArticleProgress {
  return {
    articleId: 'test-article-1',
    completed: false,
    comprehensionScore: 0,
    highestWPM: 250,
    lastReadAt: Date.now(),
    attemptCount: 0,
    ...overrides,
  };
}

/**
 * Creates multiple ArticleProgress records for testing.
 */
export function createArticleProgressMap(
  configs: Array<{ id: string } & Partial<ArticleProgress>>
): Record<string, ArticleProgress> {
  const result: Record<string, ArticleProgress> = {};
  for (const config of configs) {
    const { id, ...overrides } = config;
    result[id] = createArticleProgress({ articleId: id, ...overrides });
  }
  return result;
}

// =============================================================================
// Certification Progress Factory
// =============================================================================

/**
 * Creates a mock JourneyCertProgress for testing journeyStore.
 */
export function createCertProgress(
  overrides: Partial<JourneyCertProgress> = {}
): JourneyCertProgress {
  return {
    ...DEFAULT_CERT_PROGRESS,
    ...overrides,
  };
}

/**
 * Creates a full certProgress record for all tiers.
 */
export function createFullCertProgress(
  tierOverrides: Partial<Record<JourneyCertTier, Partial<JourneyCertProgress>>> = {}
): Record<JourneyCertTier, JourneyCertProgress> {
  return {
    speed_reader: createCertProgress(tierOverrides.speed_reader),
    velocity_master: createCertProgress(tierOverrides.velocity_master),
    transcendent: createCertProgress(tierOverrides.transcendent),
  };
}

// =============================================================================
// Generated Article Factory
// =============================================================================

/**
 * Creates a mock GeneratedArticle for testing generatedStore.
 */
export function createGeneratedArticle(
  overrides: Partial<GeneratedArticle> = {}
): GeneratedArticle {
  return {
    id: 'gen-article-123',
    topic: 'Test Topic',
    targetDuration: 3,
    tone: 'explanatory' as ArticleTone,
    title: 'Generated Article Title',
    content: 'This is generated content for testing.',
    wordCount: 6,
    questions: [],
    status: 'complete' as GenerationStatus,
    generatedAt: Date.now(),
    completed: false,
    attemptCount: 0,
    ...overrides,
  };
}

// =============================================================================
// Curriculum Factory
// =============================================================================

/**
 * Creates a mock CurriculumArticle for testing curriculumStore.
 */
export function createCurriculumArticle(
  overrides: Partial<CurriculumArticle> = {}
): CurriculumArticle {
  const curriculumId = overrides.curriculumId ?? 'curr_test_123';
  const orderIndex = overrides.orderIndex ?? 0;
  return {
    id: `${curriculumId}-article-${orderIndex}`,
    curriculumId,
    orderIndex,
    title: `Article ${orderIndex + 1}`,
    summary: 'Test summary',
    content: 'Test article content for testing purposes.',
    wordCount: 7,
    questions: [],
    generationStatus: 'generated' as ArticleGenerationStatus,
    completionStatus: (orderIndex === 0 ? 'unlocked' : 'locked') as ArticleCompletionStatus,
    ...overrides,
  };
}

/**
 * Creates a mock Curriculum with articles for testing curriculumStore.
 */
export function createCurriculum(
  overrides: Partial<Curriculum> = {},
  articleOverrides: Array<Partial<CurriculumArticle>> = []
): Curriculum {
  const id = overrides.id ?? 'curr_test_123';
  const articleCount = overrides.articleCount ?? 3;
  const now = Date.now();

  const articles: CurriculumArticle[] = [];
  for (let i = 0; i < articleCount; i++) {
    articles.push(
      createCurriculumArticle({
        curriculumId: id,
        orderIndex: i,
        ...articleOverrides[i],
      })
    );
  }

  return {
    id,
    title: 'Test Curriculum',
    goal: 'Learn testing',
    articleCount,
    tone: 'explanatory' as ArticleTone,
    targetWordCount: 1000,
    createdAt: now,
    updatedAt: now,
    currentArticleIndex: 0,
    completedArticleCount: 0,
    isCompleted: false,
    articles,
    ...overrides,
  };
}
