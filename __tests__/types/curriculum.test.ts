/**
 * Tests for Curriculum Types
 *
 * Tests type definitions, interfaces, and helper functions for curricula.
 * These tests validate the shape and constraints of curriculum data structures.
 */

import {
  ArticleGenerationStatus,
  ArticleCompletionStatus,
  CurriculumArticle,
  CurriculumOutline,
  Curriculum,
  CurriculumCreationInput,
  ARTICLE_COUNT_MIN,
  ARTICLE_COUNT_MAX,
  isValidArticleCount,
  durationToWordCount,
} from '../../src/types/curriculum';
import { ArticleTone } from '../../src/types/generated';

describe('curriculum types', () => {
  describe('ArticleGenerationStatus', () => {
    it('accepts valid generation statuses', () => {
      const statuses: ArticleGenerationStatus[] = ['pending', 'generating', 'generated', 'failed'];
      expect(statuses).toHaveLength(4);
      statuses.forEach((status) => {
        expect(['pending', 'generating', 'generated', 'failed']).toContain(status);
      });
    });
  });

  describe('ArticleCompletionStatus', () => {
    it('accepts valid completion statuses', () => {
      const statuses: ArticleCompletionStatus[] = ['locked', 'unlocked', 'in_progress', 'completed'];
      expect(statuses).toHaveLength(4);
      statuses.forEach((status) => {
        expect(['locked', 'unlocked', 'in_progress', 'completed']).toContain(status);
      });
    });
  });

  describe('CurriculumArticle interface', () => {
    const createValidArticle = (overrides: Partial<CurriculumArticle> = {}): CurriculumArticle => ({
      id: 'curr_123-article-0',
      curriculumId: 'curr_123',
      orderIndex: 0,
      title: 'Introduction to Machine Learning',
      summary: 'An overview of ML concepts',
      content: 'Machine learning is a subset of artificial intelligence...',
      wordCount: 750,
      questions: [],
      generationStatus: 'generated',
      completionStatus: 'unlocked',
      ...overrides,
    });

    it('creates valid article with required fields', () => {
      const article = createValidArticle();
      expect(article.id).toBeDefined();
      expect(article.curriculumId).toBeDefined();
      expect(article.orderIndex).toBe(0);
      expect(article.title).toBeDefined();
      expect(article.generationStatus).toBe('generated');
      expect(article.completionStatus).toBe('unlocked');
    });

    it('accepts optional fields when present', () => {
      const article = createValidArticle({
        generatedAt: Date.now(),
        completedAt: Date.now(),
        comprehensionScore: 85,
        readingWPM: 300,
        generationError: undefined,
      });
      expect(article.generatedAt).toBeDefined();
      expect(article.completedAt).toBeDefined();
      expect(article.comprehensionScore).toBe(85);
      expect(article.readingWPM).toBe(300);
    });

    it('handles failed generation with error message', () => {
      const article = createValidArticle({
        generationStatus: 'failed',
        generationError: 'API rate limit exceeded',
      });
      expect(article.generationStatus).toBe('failed');
      expect(article.generationError).toBe('API rate limit exceeded');
    });

    it('correctly represents locked article', () => {
      const article = createValidArticle({
        completionStatus: 'locked',
        content: '', // Locked articles may have empty content
        generationStatus: 'pending',
      });
      expect(article.completionStatus).toBe('locked');
      expect(article.generationStatus).toBe('pending');
    });

    it('correctly represents completed article', () => {
      const article = createValidArticle({
        completionStatus: 'completed',
        completedAt: Date.now(),
        comprehensionScore: 90,
        readingWPM: 350,
      });
      expect(article.completionStatus).toBe('completed');
      expect(article.comprehensionScore).toBe(90);
    });
  });

  describe('CurriculumOutline interface', () => {
    const createValidOutline = (): CurriculumOutline => ({
      curriculumTitle: 'Machine Learning Fundamentals',
      articles: [
        {
          orderIndex: 0,
          title: 'What is Machine Learning?',
          summary: 'An introduction to ML concepts and terminology.',
          keyConceptsToIntroduce: ['supervised learning', 'features', 'labels'],
          prerequisiteConcepts: [],
        },
        {
          orderIndex: 1,
          title: 'Types of Machine Learning',
          summary: 'Exploring supervised, unsupervised, and reinforcement learning.',
          keyConceptsToIntroduce: ['classification', 'regression', 'clustering'],
          prerequisiteConcepts: ['supervised learning', 'features'],
        },
      ],
    });

    it('creates valid outline with title and articles', () => {
      const outline = createValidOutline();
      expect(outline.curriculumTitle).toBeDefined();
      expect(outline.articles).toHaveLength(2);
    });

    it('first article has no prerequisites', () => {
      const outline = createValidOutline();
      expect(outline.articles[0].prerequisiteConcepts).toHaveLength(0);
    });

    it('subsequent articles have prerequisites from earlier articles', () => {
      const outline = createValidOutline();
      expect(outline.articles[1].prerequisiteConcepts).toContain('supervised learning');
    });

    it('each article has key concepts to introduce', () => {
      const outline = createValidOutline();
      outline.articles.forEach((article) => {
        expect(article.keyConceptsToIntroduce.length).toBeGreaterThan(0);
      });
    });

    it('articles have sequential orderIndex values', () => {
      const outline = createValidOutline();
      outline.articles.forEach((article, index) => {
        expect(article.orderIndex).toBe(index);
      });
    });
  });

  describe('Curriculum interface', () => {
    const createValidCurriculum = (overrides: Partial<Curriculum> = {}): Curriculum => ({
      id: 'curr_123_abc',
      title: 'Machine Learning Fundamentals',
      goal: 'Learn the basics of machine learning',
      articleCount: 5,
      tone: 'explanatory' as ArticleTone,
      targetWordCount: 750,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      currentArticleIndex: 0,
      completedArticleCount: 0,
      isCompleted: false,
      articles: [],
      ...overrides,
    });

    it('creates valid curriculum with required fields', () => {
      const curriculum = createValidCurriculum();
      expect(curriculum.id).toBeDefined();
      expect(curriculum.title).toBeDefined();
      expect(curriculum.goal).toBeDefined();
      expect(curriculum.articleCount).toBe(5);
      expect(curriculum.tone).toBe('explanatory');
    });

    it('tracks progress with currentArticleIndex', () => {
      const curriculum = createValidCurriculum({
        currentArticleIndex: 2,
        completedArticleCount: 2,
      });
      expect(curriculum.currentArticleIndex).toBe(2);
      expect(curriculum.completedArticleCount).toBe(2);
    });

    it('marks curriculum as completed when all articles done', () => {
      const curriculum = createValidCurriculum({
        articleCount: 3,
        completedArticleCount: 3,
        isCompleted: true,
      });
      expect(curriculum.isCompleted).toBe(true);
      expect(curriculum.completedArticleCount).toBe(curriculum.articleCount);
    });

    it('includes outline when available', () => {
      const outline: CurriculumOutline = {
        curriculumTitle: 'ML Fundamentals',
        articles: [],
      };
      const curriculum = createValidCurriculum({ outline });
      expect(curriculum.outline).toBeDefined();
      expect(curriculum.outline?.curriculumTitle).toBe('ML Fundamentals');
    });

    it('starts without outline (outline is optional)', () => {
      const curriculum = createValidCurriculum();
      expect(curriculum.outline).toBeUndefined();
    });
  });

  describe('CurriculumCreationInput interface', () => {
    const createValidInput = (): CurriculumCreationInput => ({
      goal: 'Learn the fundamentals of machine learning',
      articleCount: 5,
      tone: 'explanatory' as ArticleTone,
      durationMinutes: 3,
    });

    it('creates valid input with all required fields', () => {
      const input = createValidInput();
      expect(input.goal).toBeDefined();
      expect(input.articleCount).toBe(5);
      expect(input.tone).toBe('explanatory');
      expect(input.durationMinutes).toBe(3);
    });

    it('accepts minimum article count', () => {
      const input = { ...createValidInput(), articleCount: 3 };
      expect(input.articleCount).toBe(ARTICLE_COUNT_MIN);
    });

    it('accepts maximum article count', () => {
      const input = { ...createValidInput(), articleCount: 10 };
      expect(input.articleCount).toBe(ARTICLE_COUNT_MAX);
    });

    it('accepts all valid tones', () => {
      const tones: ArticleTone[] = ['explanatory', 'explanatory', 'storytelling', 'storytelling', 'analogical'];
      tones.forEach((tone) => {
        const input = { ...createValidInput(), tone };
        expect(input.tone).toBe(tone);
      });
    });
  });

  describe('isValidArticleCount()', () => {
    it('returns true for valid counts (3-10)', () => {
      expect(isValidArticleCount(3)).toBe(true);
      expect(isValidArticleCount(5)).toBe(true);
      expect(isValidArticleCount(10)).toBe(true);
    });

    it('returns false for counts below minimum', () => {
      expect(isValidArticleCount(0)).toBe(false);
      expect(isValidArticleCount(1)).toBe(false);
      expect(isValidArticleCount(2)).toBe(false);
    });

    it('returns false for counts above maximum', () => {
      expect(isValidArticleCount(11)).toBe(false);
      expect(isValidArticleCount(100)).toBe(false);
    });

    it('returns false for negative numbers', () => {
      expect(isValidArticleCount(-1)).toBe(false);
      expect(isValidArticleCount(-10)).toBe(false);
    });

    it('returns false for non-integers', () => {
      expect(isValidArticleCount(3.5)).toBe(false);
      expect(isValidArticleCount(5.1)).toBe(false);
    });
  });

  describe('durationToWordCount()', () => {
    it('calculates word count from duration and WPM', () => {
      // 3 minutes * 250 WPM = 750 words
      expect(durationToWordCount(3, 250)).toBe(750);
    });

    it('uses default WPM of 250 when not provided', () => {
      // 3 minutes * 250 WPM = 750 words
      expect(durationToWordCount(3)).toBe(750);
    });

    it('enforces minimum word count of 500', () => {
      // 1 minute * 100 WPM = 100 words, but minimum is 500
      expect(durationToWordCount(1, 100)).toBe(500);
    });

    it('enforces maximum word count of 5000', () => {
      // 10 minutes * 600 WPM = 6000 words, but maximum is 5000
      expect(durationToWordCount(10, 600)).toBe(5000);
    });

    it('rounds to nearest integer', () => {
      // 3 minutes * 233 WPM = 699 words (above minimum 500)
      expect(durationToWordCount(3, 233)).toBe(699);
    });

    it('handles edge cases', () => {
      expect(durationToWordCount(0, 250)).toBe(500); // Minimum enforced
      expect(durationToWordCount(1, 500)).toBe(500); // Exactly minimum
      expect(durationToWordCount(10, 500)).toBe(5000); // Exactly maximum
    });
  });

  describe('constants', () => {
    it('defines minimum article count as 3', () => {
      expect(ARTICLE_COUNT_MIN).toBe(3);
    });

    it('defines maximum article count as 10', () => {
      expect(ARTICLE_COUNT_MAX).toBe(10);
    });
  });
});
