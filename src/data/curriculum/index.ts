/**
 * Curriculum Index
 *
 * This module re-exports all curriculum data for the 15 topics.
 * Each topic has:
 * - 10 practice articles (progressively longer: 500-3000 words)
 * - 3 certification texts (short: 1000w, medium: 2000w, long: 3000w)
 */

// Import all topic article arrays
import { Article } from '../../types/learning';
import { ARTS_CULTURE_ARTICLES } from './arts-culture';
import { BUSINESS_CAREERS_ARTICLES } from './business-careers';
import { CLIMATE_ENVIRONMENT_ARTICLES } from './climate-environment';
import { FINANCE_INVESTING_ARTICLES } from './finance-investing';
import { HEALTH_MEDICINE_ARTICLES } from './health-medicine';
import { HISTORY_CIVILIZATION_ARTICLES } from './history-civilization';
import { LIFESTYLE_WELLNESS_ARTICLES } from './lifestyle-wellness';
import { NATURE_WILDLIFE_ARTICLES } from './nature-wildlife';
import { PSYCHOLOGY_MIND_ARTICLES } from './psychology-mind';
import { SCIENCE_DISCOVERY_ARTICLES } from './science-discovery';
import { SELF_IMPROVEMENT_ARTICLES } from './self-improvement';
import { SPACE_COSMOS_ARTICLES } from './space-cosmos';
import { TECHNOLOGY_INTERNET_ARTICLES } from './technology-internet';
import { TRIVIA_FACTS_ARTICLES } from './trivia-facts';
import { WORLD_TRAVEL_ARTICLES } from './world-travel';

export { TOPICS, getTopicById } from './topics';

/**
 * All articles from all topics combined
 */
export const ARTICLES: Article[] = [
  ...SCIENCE_DISCOVERY_ARTICLES,
  ...HEALTH_MEDICINE_ARTICLES,
  ...HISTORY_CIVILIZATION_ARTICLES,
  ...TECHNOLOGY_INTERNET_ARTICLES,
  ...NATURE_WILDLIFE_ARTICLES,
  ...CLIMATE_ENVIRONMENT_ARTICLES,
  ...SPACE_COSMOS_ARTICLES,
  ...PSYCHOLOGY_MIND_ARTICLES,
  ...SELF_IMPROVEMENT_ARTICLES,
  ...BUSINESS_CAREERS_ARTICLES,
  ...FINANCE_INVESTING_ARTICLES,
  ...TRIVIA_FACTS_ARTICLES,
  ...WORLD_TRAVEL_ARTICLES,
  ...ARTS_CULTURE_ARTICLES,
  ...LIFESTYLE_WELLNESS_ARTICLES,
];

/**
 * Get articles for a specific topic
 */
export function getArticlesByTopic(topicId: string): Article[] {
  return ARTICLES.filter((a) => a.topicId === topicId);
}

/**
 * Get a specific article by ID
 */
export function getArticleById(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

/**
 * Get practice articles for a topic (sorted by orderIndex)
 */
export function getPracticeArticles(topicId: string): Article[] {
  return ARTICLES.filter(
    (a) => a.topicId === topicId && (a.articleType === 'practice' || !a.articleType)
  ).sort((a, b) => (a.orderIndex ?? 1) - (b.orderIndex ?? 1));
}

/**
 * Get certification articles for a topic (sorted by orderIndex)
 */
export function getCertificationArticles(topicId: string): Article[] {
  return ARTICLES.filter(
    (a) => a.topicId === topicId && a.articleType === 'certification'
  ).sort((a, b) => (a.orderIndex ?? 1) - (b.orderIndex ?? 1));
}
