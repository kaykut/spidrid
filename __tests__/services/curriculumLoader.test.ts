/**
 * Tests for curriculumLoader service
 * Language-aware article loading with English fallback
 */

import {
  getArticleByIdLocalized,
  getArticlesByTopicLocalized,
  getPracticeArticlesLocalized,
  getCertificationArticlesLocalized,
} from '../../src/services/curriculumLoader';
import { useSettingsStore } from '../../src/store/settingsStore';

// Mock settingsStore
jest.mock('../../src/store/settingsStore');

describe('curriculumLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock: return English as reading language
    (useSettingsStore.getState as jest.Mock).mockReturnValue({
      readingLanguage: 'en',
    });
  });

  describe('getArticleByIdLocalized', () => {
    it('should return article in English by default', () => {
      const article = getArticleByIdLocalized('science-discovery-p01', 'en');

      expect(article).toBeDefined();
      expect(article?.id).toBe('science-discovery-p01');
      expect(article?.topicId).toBe('science-discovery');
      expect(article?.title).toBe('The Water Cycle'); // English title
      expect(article?.difficulty).toBe('beginner');
    });

    it('should fall back to English if translation missing', () => {
      // Request French article (doesn't exist yet in M2)
      const article = getArticleByIdLocalized('science-discovery-p01', 'fr');

      expect(article).toBeDefined();
      expect(article?.id).toBe('science-discovery-p01');
      // Should return English version since French not yet translated
      expect(article?.title).toBe('The Water Cycle');
    });

    it('should use settingsStore language if no param provided', () => {
      // Mock settingsStore to return 'de'
      (useSettingsStore.getState as jest.Mock).mockReturnValue({
        readingLanguage: 'de',
      });

      const article = getArticleByIdLocalized('science-discovery-p01');

      expect(article).toBeDefined();
      // Should fall back to English since German not yet translated
      expect(article?.title).toBe('The Water Cycle');
    });

    it('should return undefined for non-existent article', () => {
      const article = getArticleByIdLocalized('invalid-article-id', 'en');
      expect(article).toBeUndefined();
    });

    it('should handle article IDs with different formats', () => {
      // Test practice article
      const practiceArticle = getArticleByIdLocalized('science-discovery-p05', 'en');
      expect(practiceArticle).toBeDefined();
      expect(practiceArticle?.articleType).toBe('practice');

      // Test certification article
      const certArticle = getArticleByIdLocalized('science-discovery-c1', 'en');
      expect(certArticle).toBeDefined();
      expect(certArticle?.articleType).toBe('certification');
    });
  });

  describe('getArticlesByTopicLocalized', () => {
    it('should return all 13 articles for a topic in English', () => {
      const articles = getArticlesByTopicLocalized('science-discovery', 'en');

      expect(articles).toHaveLength(13); // 10 practice + 3 certification
      expect(articles[0].topicId).toBe('science-discovery');

      // Verify we have both types
      const practiceCount = articles.filter(a => a.articleType === 'practice').length;
      const certCount = articles.filter(a => a.articleType === 'certification').length;
      expect(practiceCount).toBe(10);
      expect(certCount).toBe(3);
    });

    it('should fall back to English for untranslated languages', () => {
      const articles = getArticlesByTopicLocalized('health-medicine', 'es');

      expect(articles).toHaveLength(13); // Falls back to English
      expect(articles[0].topicId).toBe('health-medicine');
    });

    it('should return empty array for invalid topic', () => {
      const articles = getArticlesByTopicLocalized('invalid-topic-id', 'en');
      expect(articles).toEqual([]);
    });

    it('should handle all 15 topics', () => {
      const topics = [
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
      ];

      topics.forEach(topicId => {
        const articles = getArticlesByTopicLocalized(topicId, 'en');
        expect(articles).toHaveLength(13);
      });
    });
  });

  describe('getPracticeArticlesLocalized', () => {
    it('should return only practice articles (10) sorted by orderIndex', () => {
      const articles = getPracticeArticlesLocalized('science-discovery', 'en');

      expect(articles).toHaveLength(10);

      // Verify all are practice type
      articles.forEach(article => {
        expect(article.articleType).toBe('practice');
      });

      // Verify sorting by orderIndex
      expect(articles[0].orderIndex).toBe(1);
      expect(articles[9].orderIndex).toBe(10);

      // Verify sequential order
      for (let i = 0; i < articles.length; i++) {
        expect(articles[i].orderIndex).toBe(i + 1);
      }
    });

    it('should fall back to English for untranslated languages', () => {
      const articles = getPracticeArticlesLocalized('technology-internet', 'it');

      expect(articles).toHaveLength(10);
      expect(articles[0].articleType).toBe('practice');
    });
  });

  describe('getCertificationArticlesLocalized', () => {
    it('should return only certification articles (3) sorted by orderIndex', () => {
      const articles = getCertificationArticlesLocalized('science-discovery', 'en');

      expect(articles).toHaveLength(3);

      // Verify all are certification type
      articles.forEach(article => {
        expect(article.articleType).toBe('certification');
      });

      // Verify sorting by orderIndex
      expect(articles[0].orderIndex).toBe(1);
      expect(articles[1].orderIndex).toBe(2);
      expect(articles[2].orderIndex).toBe(3);

      // Verify certification lengths
      expect(articles[0].certificationLength).toBe('short');
      expect(articles[1].certificationLength).toBe('medium');
      expect(articles[2].certificationLength).toBe('long');
    });

    it('should fall back to English for untranslated languages', () => {
      const articles = getCertificationArticlesLocalized('health-medicine', 'ro');

      expect(articles).toHaveLength(3);
      expect(articles[0].articleType).toBe('certification');
    });
  });

  describe('Language resolution priority', () => {
    it('should use explicit parameter over settingsStore', () => {
      (useSettingsStore.getState as jest.Mock).mockReturnValue({
        readingLanguage: 'de',
      });

      const article = getArticleByIdLocalized('science-discovery-p01', 'en');

      expect(article).toBeDefined();
      // Should use 'en' parameter, not 'de' from store
      expect(article?.title).toBe('The Water Cycle');
    });

    it('should default to English when readingLanguage is "auto"', () => {
      (useSettingsStore.getState as jest.Mock).mockReturnValue({
        readingLanguage: 'auto',
      });

      const article = getArticleByIdLocalized('science-discovery-p01');

      expect(article).toBeDefined();
      // Should use English default for curriculum content
      expect(article?.title).toBe('The Water Cycle');
    });

    it('should respect settingsStore language when no explicit param', () => {
      (useSettingsStore.getState as jest.Mock).mockReturnValue({
        readingLanguage: 'cs',
      });

      const article = getArticleByIdLocalized('science-discovery-p01');

      expect(article).toBeDefined();
      // Should fall back to English since Czech not yet translated
      expect(article?.title).toBe('The Water Cycle');
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined orderIndex gracefully', () => {
      // Some old articles might not have orderIndex
      const articles = getPracticeArticlesLocalized('science-discovery', 'en');

      // Should not throw error
      expect(articles).toHaveLength(10);
    });

    it('should handle empty topic gracefully', () => {
      const articles = getArticlesByTopicLocalized('', 'en');
      expect(articles).toEqual([]);
    });

    it('should handle null language parameter', () => {
      (useSettingsStore.getState as jest.Mock).mockReturnValue({
        readingLanguage: 'en',
      });

      const article = getArticleByIdLocalized('science-discovery-p01', undefined);
      expect(article).toBeDefined();
    });
  });
});
