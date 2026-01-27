/**
 * Curriculum Loader Service
 *
 * Language-aware content loading with English fallback.
 * Uses registry pattern (not dynamic imports) to align with codebase patterns.
 */


// Import all English topic articles
import { ARTS_CULTURE_ARTICLES as ARTS_CULTURE_EN } from '../data/curriculum/en/arts-culture';
import { BUSINESS_CAREERS_ARTICLES as BUSINESS_CAREERS_EN } from '../data/curriculum/en/business-careers';
import { CLIMATE_ENVIRONMENT_ARTICLES as CLIMATE_ENVIRONMENT_EN } from '../data/curriculum/en/climate-environment';
import { FINANCE_INVESTING_ARTICLES as FINANCE_INVESTING_EN } from '../data/curriculum/en/finance-investing';
import { HEALTH_MEDICINE_ARTICLES as HEALTH_MEDICINE_EN } from '../data/curriculum/en/health-medicine';
import { HISTORY_CIVILIZATION_ARTICLES as HISTORY_CIVILIZATION_EN } from '../data/curriculum/en/history-civilization';
import { LIFESTYLE_WELLNESS_ARTICLES as LIFESTYLE_WELLNESS_EN } from '../data/curriculum/en/lifestyle-wellness';
import { NATURE_WILDLIFE_ARTICLES as NATURE_WILDLIFE_EN } from '../data/curriculum/en/nature-wildlife';
import { PSYCHOLOGY_MIND_ARTICLES as PSYCHOLOGY_MIND_EN } from '../data/curriculum/en/psychology-mind';
import { SCIENCE_DISCOVERY_ARTICLES as SCIENCE_DISCOVERY_EN } from '../data/curriculum/en/science-discovery';
import { SELF_IMPROVEMENT_ARTICLES as SELF_IMPROVEMENT_EN } from '../data/curriculum/en/self-improvement';
import { SPACE_COSMOS_ARTICLES as SPACE_COSMOS_EN } from '../data/curriculum/en/space-cosmos';
import { TECHNOLOGY_INTERNET_ARTICLES as TECHNOLOGY_INTERNET_EN } from '../data/curriculum/en/technology-internet';
import { TRIVIA_FACTS_ARTICLES as TRIVIA_FACTS_EN } from '../data/curriculum/en/trivia-facts';
import { WORLD_TRAVEL_ARTICLES as WORLD_TRAVEL_EN } from '../data/curriculum/en/world-travel';
import { useSettingsStore } from '../store/settingsStore';
import { Article } from '../types/learning';

// Import placeholder arrays for other languages (empty for now, filled in M4/M5)
// These will be populated with actual translations in later milestones

// Curriculum registry: Maps language → topic → articles
type TopicMap = Record<string, Article[]>;
type LanguageRegistry = Record<string, TopicMap>;

const curriculumRegistry: LanguageRegistry = {
  en: {
    'arts-culture': ARTS_CULTURE_EN,
    'business-careers': BUSINESS_CAREERS_EN,
    'climate-environment': CLIMATE_ENVIRONMENT_EN,
    'finance-investing': FINANCE_INVESTING_EN,
    'health-medicine': HEALTH_MEDICINE_EN,
    'history-civilization': HISTORY_CIVILIZATION_EN,
    'lifestyle-wellness': LIFESTYLE_WELLNESS_EN,
    'nature-wildlife': NATURE_WILDLIFE_EN,
    'psychology-mind': PSYCHOLOGY_MIND_EN,
    'science-discovery': SCIENCE_DISCOVERY_EN,
    'self-improvement': SELF_IMPROVEMENT_EN,
    'space-cosmos': SPACE_COSMOS_EN,
    'technology-internet': TECHNOLOGY_INTERNET_EN,
    'trivia-facts': TRIVIA_FACTS_EN,
    'world-travel': WORLD_TRAVEL_EN,
  },
  // Other languages: empty topic maps (to be filled in M4/M5)
  cs: {},
  de: {},
  nl: {},
  fr: {},
  it: {},
  pl: {},
  pt: {},
  ro: {},
  es: {},
  sv: {},
};

/**
 * Resolve language to use for content loading
 * Priority: explicit param → user preference → default to English
 */
function resolveLanguage(languageParam?: string): string {
  // 1. Explicit parameter wins
  if (languageParam && languageParam !== 'auto') {
    return languageParam;
  }

  // 2. Check user preference from settingsStore
  const userLanguage = useSettingsStore.getState().readingLanguage;

  // 3. Handle 'auto' mode: default to English for curriculum content
  // (Auto-detection is for user-imported content, not structured curriculum)
  if (userLanguage === 'auto') {
    return 'en';
  }

  return userLanguage;
}

/**
 * Get articles for a topic in specified language with fallback to English
 */
function getArticlesForLanguage(topicId: string, language: string): Article[] {
  // Check if language exists in registry
  const topicMap = curriculumRegistry[language];
  if (!topicMap) {
    // Language not in registry, fall back to English
    return curriculumRegistry.en[topicId] || [];
  }

  // Check if topic exists and has articles for this language
  const articles = topicMap[topicId];
  if (!articles || articles.length === 0) {
    // Topic not translated yet or empty, fall back to English
    return curriculumRegistry.en[topicId] || [];
  }

  return articles;
}

/**
 * Extract topic ID from article ID
 * Examples:
 *   "science-discovery-p01" → "science-discovery"
 *   "health-medicine-c2" → "health-medicine"
 */
function extractTopicId(articleId: string): string {
  // Remove the last segment after the last hyphen (-p01, -c1, etc.)
  const lastHyphenIndex = articleId.lastIndexOf('-');
  if (lastHyphenIndex === -1) {
    return articleId; // No hyphen found, return as-is
  }

  const lastSegment = articleId.substring(lastHyphenIndex + 1);

  // Check if last segment starts with 'p' or 'c' (practice/certification indicator)
  if (lastSegment.match(/^[pc]\d+$/)) {
    return articleId.substring(0, lastHyphenIndex);
  }

  // Not a standard format, return as-is
  return articleId;
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Get a single article by ID in the user's preferred language
 * Falls back to English if translation missing
 */
export function getArticleByIdLocalized(
  id: string,
  language?: string
): Article | undefined {
  const resolvedLang = resolveLanguage(language);
  const topicId = extractTopicId(id);

  const articles = getArticlesForLanguage(topicId, resolvedLang);
  return articles.find(article => article.id === id);
}

/**
 * Get all articles for a topic in the user's preferred language
 * Falls back to English if translation missing
 */
export function getArticlesByTopicLocalized(
  topicId: string,
  language?: string
): Article[] {
  const resolvedLang = resolveLanguage(language);
  return getArticlesForLanguage(topicId, resolvedLang);
}

/**
 * Get practice articles for a topic (sorted by orderIndex)
 */
export function getPracticeArticlesLocalized(
  topicId: string,
  language?: string
): Article[] {
  const articles = getArticlesByTopicLocalized(topicId, language);
  return articles
    .filter(article => article.articleType === 'practice' || !article.articleType)
    .sort((a, b) => (a.orderIndex ?? 1) - (b.orderIndex ?? 1));
}

/**
 * Get certification articles for a topic (sorted by orderIndex)
 */
export function getCertificationArticlesLocalized(
  topicId: string,
  language?: string
): Article[] {
  const articles = getArticlesByTopicLocalized(topicId, language);
  return articles
    .filter(article => article.articleType === 'certification')
    .sort((a, b) => (a.orderIndex ?? 1) - (b.orderIndex ?? 1));
}

// ============================================================================
// Legacy API (backward compatibility)
// ============================================================================

/**
 * Get a specific article by ID (English only - legacy)
 * @deprecated Use getArticleByIdLocalized instead
 */
export function getArticleById(id: string): Article | undefined {
  return getArticleByIdLocalized(id, 'en');
}

/**
 * Get articles for a topic (English only - legacy)
 * @deprecated Use getArticlesByTopicLocalized instead
 */
export function getArticlesByTopic(topicId: string): Article[] {
  return getArticlesByTopicLocalized(topicId, 'en');
}

/**
 * Get practice articles for a topic (English only - legacy)
 * @deprecated Use getPracticeArticlesLocalized instead
 */
export function getPracticeArticles(topicId: string): Article[] {
  return getPracticeArticlesLocalized(topicId, 'en');
}

/**
 * Get certification articles for a topic (English only - legacy)
 * @deprecated Use getCertificationArticlesLocalized instead
 */
export function getCertificationArticles(topicId: string): Article[] {
  return getCertificationArticlesLocalized(topicId, 'en');
}
