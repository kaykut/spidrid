/**
 * Curriculum Module
 *
 * Re-exports curriculum data from the modular curriculum/ folder.
 * This file maintains backwards compatibility with existing imports.
 *
 * The curriculum has been expanded to 15 topics with:
 * - 10 practice articles per topic (500-3000 words, progressive difficulty)
 * - 3 certification texts per topic (short: 1000w, medium: 2000w, long: 3000w)
 */

// Re-export everything from the new curriculum module
export {
  TOPICS,
  ARTICLES,
  getTopicById,
  getArticlesByTopic,
  getArticleById,
  getPracticeArticles,
  getCertificationArticles,
} from './curriculum/index';
