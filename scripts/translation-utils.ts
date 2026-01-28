/**
 * Translation Utilities
 *
 * Core utility library for curriculum translation scaffolding.
 * Provides functions for article validation, word counting, file operations,
 * and translation status tracking - all designed to minimize LLM token usage.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { Article, Question } from '../src/types/learning';

// ============================================================
// Constants and Types
// ============================================================

/**
 * Supported translation languages (excluding English source)
 */
export const TRANSLATION_LANGUAGES = [
  'cs', // Czech
  'de', // German
  'nl', // Dutch
  'fr', // French
  'it', // Italian
  'pl', // Polish
  'pt', // Portuguese
  'ro', // Romanian
  'es', // Spanish
  'sv', // Swedish
  'tr', // Turkish
] as const;

export type TranslationLanguage = typeof TRANSLATION_LANGUAGES[number] | 'en';

/**
 * All curriculum topics
 */
export const TOPIC_IDS = [
  'science-discovery',
  'health-medicine',
  'history-civilization',
  'technology-internet',
  'nature-wildlife',
  'climate-environment',
  'space-cosmos',
  'psychology-mind',
  'self-improvement',
  'business-careers',
  'finance-investing',
  'trivia-facts',
  'world-travel',
  'arts-culture',
  'lifestyle-wellness',
] as const;

export type TopicId = typeof TOPIC_IDS[number];

/**
 * Human-readable language names for prompts
 */
export const LANGUAGE_NAMES: Record<TranslationLanguage, string> = {
  en: 'English',
  cs: 'Czech (čeština)',
  de: 'German (Deutsch)',
  nl: 'Dutch (Nederlands)',
  fr: 'French (français)',
  it: 'Italian (italiano)',
  pl: 'Polish (polski)',
  pt: 'Portuguese (português)',
  ro: 'Romanian (română)',
  es: 'Spanish (español)',
  sv: 'Swedish (svenska)',
  tr: 'Turkish (Türkçe)',
};

/**
 * Article translation status for a single article
 */
export interface ArticleTranslationStatus {
  /** Word count of translated content (0 = not translated) */
  wordCount: number;
  /** Whether quiz is fully translated and validated */
  quizTranslated: boolean;
  /** Number of quiz questions in this article */
  questionCount: number;
  /** Last update timestamp */
  lastUpdated?: number;
}

/**
 * Topic-level status: map of article IDs to their status
 */
export type TopicTranslationStatus = {
  [articleId: string]: ArticleTranslationStatus;
};

/**
 * Language-level status: map of topics to their article statuses
 */
export type LanguageTranslationStatus = {
  [topicId: string]: TopicTranslationStatus;
};

/**
 * Full 3D tensor: language → topic → article → status
 */
export interface TranslationStatusTensor {
  version: string;
  generatedAt: number;
  languages: {
    [language: string]: LanguageTranslationStatus;
  };
  /** Summary statistics */
  stats: {
    totalArticles: number;
    articlesTranslated: number;
    quizzesTranslated: number;
    totalWords: number;
    wordsTranslated: number;
  };
}

/**
 * Baseline article structure (English source)
 */
export interface BaselineArticle {
  id: string;
  topicId: string;
  title: string;
  content: string;
  wordCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: Question[];
  articleType?: 'practice' | 'certification';
  orderIndex?: number;
  certificationLength?: 'short' | 'medium' | 'long';
}

/**
 * Baseline structure (complete English curriculum)
 */
export interface CurriculumBaseline {
  version: string;
  generatedAt: number;
  topics: {
    [topicId: string]: BaselineArticle[];
  };
}

// ============================================================
// Caching
// ============================================================

/**
 * Cached baseline to avoid repeated file I/O
 */
let baselineCache: CurriculumBaseline | null = null;

/**
 * Cached language files: key = "language:topicId"
 */
const languageFileCache = new Map<string, Article[]>();

// ============================================================
// Core Functions
// ============================================================

/**
 * 1. Extract topic ID from article ID
 *
 * @example
 * topic('science-discovery-p01', 'en') // 'science-discovery'
 * topic('health-medicine-c03', 'fr') // 'health-medicine'
 *
 * @param article_id - Article ID (format: {topic}-{p|c}{01-13})
 * @param language - Target language (unused but kept for API consistency)
 * @returns Topic ID
 * @throws Error if article ID format is invalid
 */
export function topic(article_id: string, _language: string): string {
  // Article IDs follow pattern: {topic-id}-{p|c}{01-13}
  // Extract everything before the last hyphen and article number
  const match = article_id.match(/^(.+)-[pc]\d+$/);

  if (!match) {
    throw new Error(`Invalid article ID format: ${article_id}. Expected format: {topic-id}-{p|c}{01-13}`);
  }

  return match[1];
}

/**
 * 6. Load and cache the English baseline
 *
 * @returns Complete English curriculum baseline
 * @throws Error if baseline file doesn't exist
 */
export function load_baseline(): CurriculumBaseline {
  if (baselineCache) {
    return baselineCache;
  }

  const baselinePath = path.join(__dirname, 'exports', 'curriculum-baseline-full.json');

  if (!fs.existsSync(baselinePath)) {
    throw new Error(
      `Baseline not found at ${baselinePath}. ` +
      `Run 'npm run generate-baseline' first.`
    );
  }

  const raw = fs.readFileSync(baselinePath, 'utf-8');
  baselineCache = JSON.parse(raw) as CurriculumBaseline;

  return baselineCache;
}

/**
 * 7. Load a language-specific topic file
 *
 * @param language - Target language code
 * @param topicId - Topic ID
 * @returns Array of articles for this topic in this language
 */
export function load_language_topic(
  language: TranslationLanguage,
  topicId: TopicId
): Article[] {
  // Check cache first
  const cacheKey = `${language}:${topicId}`;
  if (languageFileCache.has(cacheKey)) {
    return languageFileCache.get(cacheKey)!;
  }

  // Determine file path
  const filePath = path.join(
    __dirname,
    '..',
    'src',
    'data',
    'curriculum',
    language,
    `${topicId}.ts`
  );

  if (!fs.existsSync(filePath)) {
    // File doesn't exist - return empty array
    return [];
  }

  try {
    // Use dynamic require to load TypeScript module
    // Note: This works because TypeScript files are transpiled at runtime
    const module = require(filePath);

    // Export name follows pattern: TOPIC_ID_ARTICLES (uppercase, hyphens→underscores)
    const exportName = `${topicId.toUpperCase().replace(/-/g, '_')}_ARTICLES`;
    const articles = module[exportName] || [];

    // Cache result
    languageFileCache.set(cacheKey, articles);

    return articles;
  } catch (error) {
    console.warn(`[translation-utils] Failed to load ${language}/${topicId}.ts:`, error);
    return [];
  }
}

/**
 * 8. Get specific article from language file
 *
 * @param article_id - Article ID
 * @param language - Target language
 * @returns Article object or null if not found
 */
export function get_article_from_file(
  article_id: string,
  language: TranslationLanguage
): Article | null {
  const topicId = topic(article_id, language) as TopicId;
  const articles = load_language_topic(language, topicId);
  return articles.find(a => a.id === article_id) || null;
}

/**
 * 5. Extract original English article from baseline
 *
 * @param article_id - Article ID
 * @param language - Language (unused but kept for API consistency)
 * @returns English article from baseline or null if not found
 * @throws Error if topic not found in baseline
 */
export function extract_original_article(
  article_id: string,
  language: TranslationLanguage
): BaselineArticle | null {
  const baseline = load_baseline();
  const topicId = topic(article_id, language);
  const topicArticles = baseline.topics[topicId];

  if (!topicArticles) {
    throw new Error(`Topic not found in baseline: ${topicId}`);
  }

  return topicArticles.find(a => a.id === article_id) || null;
}

/**
 * 2. Check if article content is translated
 *
 * An article is considered translated if:
 * - The article exists in the language file
 * - wordCount > 0
 *
 * @param article_id - Article ID
 * @param language - Target language
 * @returns true if article is translated
 */
export function is_article_translated(
  article_id: string,
  language: TranslationLanguage
): boolean {
  if (language === 'en') return true; // English is always "translated"

  const article = get_article_from_file(article_id, language);
  return article !== null && article.wordCount > 0;
}

/**
 * 3. Get word count for article in target language
 *
 * @param article_id - Article ID
 * @param language - Target language
 * @returns Word count or null if article not found/translated
 */
export function article_wordcount(
  article_id: string,
  language: TranslationLanguage
): number | null {
  const article = get_article_from_file(article_id, language);

  if (!article) return null;
  if (article.wordCount === 0) return null;

  return article.wordCount;
}

/**
 * 4. Check if quiz is translated
 *
 * A quiz is considered translated if:
 * - The article exists in the language file
 * - questions array exists and has same length as English baseline
 * - First question text is DIFFERENT from English (actually translated, not just copied)
 *
 * @param article_id - Article ID
 * @param language - Target language
 * @returns true if quiz is translated and validated
 */
export function is_quiz_translated(
  article_id: string,
  language: TranslationLanguage
): boolean {
  if (language === 'en') return true; // English quiz always "translated"

  const article = get_article_from_file(article_id, language);
  const originalArticle = extract_original_article(article_id, 'en');

  if (!article || !originalArticle) return false;
  if (!article.questions || article.questions.length === 0) return false;
  if (article.questions.length !== originalArticle.questions.length) return false;

  // KEY CHECK: Compare first question text to detect if actually translated
  // Quiz is only considered translated if question text differs from English
  const targetFirstQ = article.questions[0]?.question || '';
  const englishFirstQ = originalArticle.questions[0]?.question || '';

  return targetFirstQ !== englishFirstQ && targetFirstQ.length > 0;
}

/**
 * 9. Validate word count deviation
 *
 * Checks if translated word count is within 20% of English baseline.
 *
 * @param english_count - Word count in English
 * @param translated_count - Word count in translated language
 * @returns Validation result with deviation percentage
 */
export function validate_wordcount_deviation(
  english_count: number,
  translated_count: number
): { valid: boolean; deviation: number; message?: string } {
  const deviation = Math.abs(translated_count - english_count) / english_count;
  const valid = deviation <= 0.20; // 20% tolerance

  if (!valid) {
    return {
      valid: false,
      deviation: deviation * 100,
      message: `Word count deviation ${(deviation * 100).toFixed(1)}% exceeds 20% threshold. ` +
               `English: ${english_count} words, Translated: ${translated_count} words.`
    };
  }

  return { valid: true, deviation: deviation * 100 };
}

/**
 * 10. Calculate actual word count from content string
 *
 * @param content - Article content text
 * @returns Word count
 */
export function calculate_wordcount(content: string): number {
  // Remove extra whitespace and count words
  const words = content.trim().split(/\s+/);
  return words.filter(w => w.length > 0).length;
}

/**
 * 11. Update a language-specific topic file with new/updated articles
 *
 * IMPORTANT: This performs a surgical update - only modifies specified articles.
 * Existing articles in the file are preserved unless their ID matches an updated article.
 *
 * @param language - Target language
 * @param topicId - Topic ID
 * @param updatedArticles - Articles to add or update
 */
export function update_language_topic_file(
  language: TranslationLanguage,
  topicId: TopicId,
  updatedArticles: Article[]
): void {
  // Load existing articles
  const existingArticles = load_language_topic(language, topicId);

  // Create a map for quick lookup
  const articleMap = new Map(existingArticles.map(a => [a.id, a]));

  // Update/add new articles
  updatedArticles.forEach(article => {
    articleMap.set(article.id, article);
  });

  // Convert back to array and sort by orderIndex
  const finalArticles = Array.from(articleMap.values())
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  // Generate TypeScript file content
  const fileContent = generateTopicFileContent(topicId, finalArticles);

  // Determine file path
  const filePath = path.join(
    __dirname,
    '..',
    'src',
    'data',
    'curriculum',
    language,
    `${topicId}.ts`
  );

  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write file
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  // Invalidate internal cache
  const cacheKey = `${language}:${topicId}`;
  languageFileCache.delete(cacheKey);

  // Also invalidate Node.js require cache to ensure fresh reads
  try {
    delete require.cache[require.resolve(filePath)];
  } catch {
    // File not in cache yet, ignore
  }
}

/**
 * Generate TypeScript file content for a topic
 *
 * @param topicId - Topic ID
 * @param articles - Array of articles
 * @returns TypeScript file content as string
 */
function generateTopicFileContent(topicId: TopicId, articles: Article[]): string {
  const exportName = `${topicId.toUpperCase().replace(/-/g, '_')}_ARTICLES`;

  return `import { Article } from '../../../types/learning';

export const ${exportName}: Article[] = ${JSON.stringify(articles, null, 2)};
`;
}

// ============================================================
// Validation Helpers
// ============================================================

/**
 * Check if a topic ID is valid
 */
export function isValidTopicId(topicId: string): topicId is TopicId {
  return TOPIC_IDS.includes(topicId as TopicId);
}

/**
 * Check if a language code is valid
 */
export function isValidLanguage(language: string): language is TranslationLanguage {
  return language === 'en' || TRANSLATION_LANGUAGES.includes(language as any);
}

/**
 * Get all article IDs for a topic from baseline
 *
 * @param topicId - Topic ID
 * @returns Array of article IDs
 */
export function get_article_ids_for_topic(topicId: TopicId): string[] {
  const baseline = load_baseline();
  const articles = baseline.topics[topicId];

  if (!articles) {
    return [];
  }

  return articles.map(a => a.id);
}

/**
 * Clear all caches (useful for testing)
 */
export function clear_caches(): void {
  baselineCache = null;
  languageFileCache.clear();
}

// ============================================================
// Status Tensor Utilities
// ============================================================

/**
 * Load the translation status tensor from disk
 *
 * @returns The current translation status tensor
 * @throws Error if file doesn't exist
 */
export function loadStatusTensor(): TranslationStatusTensor {
  const statusPath = path.join(__dirname, '..', 'translation-status.json');

  if (!fs.existsSync(statusPath)) {
    throw new Error(
      'translation-status.json not found. Run: npm run generate-project-status'
    );
  }

  return JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
}

/**
 * Save the translation status tensor to disk
 *
 * @param tensor - The tensor to save
 */
export function saveStatusTensor(tensor: TranslationStatusTensor): void {
  const statusPath = path.join(__dirname, '..', 'translation-status.json');
  tensor.generatedAt = Date.now();
  fs.writeFileSync(statusPath, JSON.stringify(tensor, null, 2), 'utf-8');
}

/**
 * Recalculate global stats from the tensor data
 *
 * @param tensor - The tensor to update (mutates in place)
 */
export function recalculateStats(tensor: TranslationStatusTensor): void {
  let articlesTranslated = 0;
  let quizzesTranslated = 0;
  let wordsTranslated = 0;

  for (const lang of Object.values(tensor.languages)) {
    for (const topic of Object.values(lang)) {
      for (const status of Object.values(topic)) {
        if (status.wordCount > 0) {
          articlesTranslated++;
          wordsTranslated += status.wordCount;
        }
        if (status.quizTranslated) {
          quizzesTranslated++;
        }
      }
    }
  }

  tensor.stats.articlesTranslated = articlesTranslated;
  tensor.stats.quizzesTranslated = quizzesTranslated;
  tensor.stats.wordsTranslated = wordsTranslated;
}
