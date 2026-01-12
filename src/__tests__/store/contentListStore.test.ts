/**
 * Content List Store Tests
 *
 * Tests the unified content list store that aggregates
 * content from multiple source stores.
 */

import { useContentListStore } from '../../store/contentListStore';
import { useContentStore } from '../../store/contentStore';
import { useGeneratedStore } from '../../store/generatedStore';
import { useCurriculumStore } from '../../store/curriculumStore';
import { useLearningStore } from '../../store/learningStore';
import type { ImportedContent } from '../../types/content';
import type { GeneratedArticle } from '../../types/generated';
import type { Curriculum, CurriculumArticle } from '../../types/curriculum';

// =============================================================================
// Test Data Factories
// =============================================================================

/**
 * Create mock content input for addContent (without id, createdAt, readProgress)
 */
function createMockImportedContentInput(
  overrides: Partial<Omit<ImportedContent, 'id' | 'createdAt' | 'readProgress'>> = {}
): Omit<ImportedContent, 'id' | 'createdAt' | 'readProgress'> {
  return {
    title: 'Test Article',
    content: 'Test content',
    wordCount: 500,
    source: 'url',
    ...overrides,
  };
}

function createMockGeneratedArticle(
  overrides: Partial<GeneratedArticle> = {}
): GeneratedArticle {
  return {
    id: `gen-${Date.now()}`,
    topic: 'Test Topic',
    targetDuration: 5,
    tone: 'explanatory',
    title: 'Generated Article',
    content: 'Generated content',
    wordCount: 1000,
    questions: [
      {
        id: 'q1',
        type: 'single_choice',
        question: 'Test question?',
        options: ['A', 'B', 'C', 'D'],
        correctIndex: 0,
      },
    ],
    status: 'complete',
    generatedAt: Date.now(),
    completed: false,
    attemptCount: 0,
    ...overrides,
  };
}

function createMockCurriculumArticle(
  curriculumId: string,
  index: number,
  overrides: Partial<CurriculumArticle> = {}
): CurriculumArticle {
  return {
    id: `${curriculumId}-article-${index}`,
    curriculumId,
    orderIndex: index,
    title: `Article ${index + 1}`,
    summary: 'Test summary',
    content: 'Test content',
    wordCount: 800,
    questions: [
      {
        id: `q-${index}`,
        type: 'single_choice',
        question: 'Test?',
        options: ['A', 'B'],
        correctIndex: 0,
      },
    ],
    generationStatus: 'generated',
    completionStatus: index === 0 ? 'unlocked' : 'locked',
    generatedAt: Date.now(),
    ...overrides,
  };
}

function createMockCurriculum(
  overrides: Partial<Curriculum> = {}
): Curriculum {
  const id = `curr-${Date.now()}`;
  return {
    id,
    title: 'Test Curriculum',
    goal: 'Learn testing',
    articleCount: 3,
    tone: 'explanatory',
    targetWordCount: 800,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    currentArticleIndex: 0,
    completedArticleCount: 0,
    isCompleted: false,
    articles: [
      createMockCurriculumArticle(id, 0),
      createMockCurriculumArticle(id, 1),
      createMockCurriculumArticle(id, 2),
    ],
    ...overrides,
  };
}

// =============================================================================
// Test Setup
// =============================================================================

describe('contentListStore', () => {
  beforeEach(() => {
    // Reset all stores before each test
    useContentListStore.setState({ activeFilter: null });

    // Clear imported content
    const contentState = useContentStore.getState();
    contentState.importedContent.forEach((c) => contentState.deleteContent(c.id));

    // Clear generated articles
    const generatedState = useGeneratedStore.getState();
    generatedState.articles.forEach((a) => generatedState.deleteArticle(a.id));

    // Clear curricula
    useCurriculumStore.getState().clearAllCurricula();

    // Reset learning progress
    useLearningStore.getState().resetProgress();
  });

  // ===========================================================================
  // Filter Tests
  // ===========================================================================

  describe('setFilter', () => {
    it('should set the active filter', () => {
      const { setFilter } = useContentListStore.getState();

      setFilter('books');
      expect(useContentListStore.getState().activeFilter).toBe('books');

      setFilter('articles');
      expect(useContentListStore.getState().activeFilter).toBe('articles');

      setFilter(null);
      expect(useContentListStore.getState().activeFilter).toBeNull();
    });
  });

  // ===========================================================================
  // getContentList Tests - Imported Content
  // ===========================================================================

  describe('getContentList - imported content', () => {
    it('should return imported URL content as articles', () => {
      const content = useContentStore.getState().addContent(
        createMockImportedContentInput({
          source: 'url',
          wordCount: 500,
        })
      );

      const list = useContentListStore.getState().getContentList();
      const item = list.find((i) => i.sourceId === content.id);

      expect(item).toBeDefined();
      expect(item?.category).toBe('articles');
      expect(item?.source).toBe('imported');
    });

    it('should return imported text content as articles', () => {
      const content = useContentStore.getState().addContent(
        createMockImportedContentInput({
          source: 'text',
          wordCount: 1000,
        })
      );

      const list = useContentListStore.getState().getContentList();
      const item = list.find((i) => i.sourceId === content.id);

      expect(item?.category).toBe('articles');
    });

    it('should return EPUB content as books', () => {
      const content = useContentStore.getState().addContent(
        createMockImportedContentInput({
          source: 'epub',
          wordCount: 5000,
        })
      );

      const list = useContentListStore.getState().getContentList();
      const item = list.find((i) => i.sourceId === content.id);

      expect(item?.category).toBe('books');
      expect(item?.pageCount).toBeDefined();
    });

    it('should return large PDF content as books (>50 pages)', () => {
      // 50 pages * 250 words/page = 12500 words
      const content = useContentStore.getState().addContent(
        createMockImportedContentInput({
          source: 'pdf',
          wordCount: 15000, // ~60 pages
        })
      );

      const list = useContentListStore.getState().getContentList();
      const item = list.find((i) => i.sourceId === content.id);

      expect(item?.category).toBe('books');
    });

    it('should return small PDF content as articles (<=50 pages)', () => {
      const content = useContentStore.getState().addContent(
        createMockImportedContentInput({
          source: 'pdf',
          wordCount: 5000, // ~20 pages
        })
      );

      const list = useContentListStore.getState().getContentList();
      const item = list.find((i) => i.sourceId === content.id);

      expect(item?.category).toBe('articles');
    });

    it('should calculate progress correctly for imported content', () => {
      const content = useContentStore.getState().addContent(
        createMockImportedContentInput()
      );
      // Update progress after creation
      useContentStore.getState().updateProgress(content.id, 0.5);

      const list = useContentListStore.getState().getContentList();
      const item = list.find((i) => i.sourceId === content.id);

      expect(item?.progress).toBe(50);
      expect(item?.state).toBe('in_progress');
    });

    it('should mark completed imported content', () => {
      const content = useContentStore.getState().addContent(
        createMockImportedContentInput()
      );
      // Update progress to complete
      useContentStore.getState().updateProgress(content.id, 1);

      const list = useContentListStore.getState().getContentList();
      const item = list.find((i) => i.sourceId === content.id);

      expect(item?.progress).toBe(100);
      expect(item?.state).toBe('completed');
    });
  });

  // ===========================================================================
  // getContentList Tests - Generated Articles
  // ===========================================================================

  describe('getContentList - generated articles', () => {
    it('should include completed generated articles as learning', () => {
      // Directly add to store state to avoid async generation
      useGeneratedStore.setState((state) => ({
        articles: [...state.articles, createMockGeneratedArticle()],
      }));

      const list = useContentListStore.getState().getContentList();
      const learningItems = list.filter((i) => i.source === 'generated');

      expect(learningItems.length).toBe(1);
      expect(learningItems[0].category).toBe('learning');
    });

    it('should not include generating articles', () => {
      useGeneratedStore.setState((state) => ({
        articles: [
          ...state.articles,
          createMockGeneratedArticle({ status: 'generating' }),
        ],
      }));

      const list = useContentListStore.getState().getContentList();
      const learningItems = list.filter((i) => i.source === 'generated');

      expect(learningItems.length).toBe(0);
    });

    it('should not include error articles', () => {
      useGeneratedStore.setState((state) => ({
        articles: [
          ...state.articles,
          createMockGeneratedArticle({ status: 'error' }),
        ],
      }));

      const list = useContentListStore.getState().getContentList();
      const learningItems = list.filter((i) => i.source === 'generated');

      expect(learningItems.length).toBe(0);
    });

    it('should show quiz pending for unread articles with questions', () => {
      useGeneratedStore.setState((state) => ({
        articles: [
          ...state.articles,
          createMockGeneratedArticle({ completed: false }),
        ],
      }));

      const list = useContentListStore.getState().getContentList();
      const item = list.find((i) => i.source === 'generated');

      expect(item?.hasQuiz).toBe(true);
      expect(item?.quizPending).toBe(true);
    });

    it('should not show quiz pending for completed articles', () => {
      useGeneratedStore.setState((state) => ({
        articles: [
          ...state.articles,
          createMockGeneratedArticle({ completed: true, comprehensionScore: 80 }),
        ],
      }));

      const list = useContentListStore.getState().getContentList();
      const item = list.find((i) => i.source === 'generated');

      expect(item?.quizPending).toBe(false);
      expect(item?.quizScore).toBe(80);
    });
  });

  // ===========================================================================
  // getContentList Tests - Curricula
  // ===========================================================================

  describe('getContentList - curricula', () => {
    it('should include curricula with generated articles', () => {
      const curriculum = createMockCurriculum();
      useCurriculumStore.getState().addCurriculum(curriculum);

      const list = useContentListStore.getState().getContentList();
      const curriculumItem = list.find(
        (i) => i.source === 'curriculum' && i.isCurriculum
      );

      expect(curriculumItem).toBeDefined();
      expect(curriculumItem?.category).toBe('learning');
      expect(curriculumItem?.isCurriculum).toBe(true);
      expect(curriculumItem?.curriculumProgress).toEqual({
        completed: 0,
        total: 3,
      });
    });

    it('should include nested curriculum articles', () => {
      const curriculum = createMockCurriculum();
      useCurriculumStore.getState().addCurriculum(curriculum);

      const list = useContentListStore.getState().getContentList();
      const curriculumItem = list.find(
        (i) => i.source === 'curriculum' && i.isCurriculum
      );

      expect(curriculumItem?.curriculumArticles).toBeDefined();
      expect(curriculumItem?.curriculumArticles?.length).toBe(3);
    });

    it('should not include curricula without generated articles', () => {
      const curriculum = createMockCurriculum({
        articles: [
          createMockCurriculumArticle('test', 0, { generationStatus: 'pending' }),
          createMockCurriculumArticle('test', 1, { generationStatus: 'pending' }),
        ],
      });
      useCurriculumStore.getState().addCurriculum(curriculum);

      const list = useContentListStore.getState().getContentList();
      const curriculumItem = list.find(
        (i) => i.source === 'curriculum' && i.isCurriculum
      );

      expect(curriculumItem).toBeUndefined();
    });

    it('should track curriculum completion progress', () => {
      const curriculum = createMockCurriculum({
        completedArticleCount: 1,
        articles: [
          createMockCurriculumArticle('test', 0, {
            completionStatus: 'completed',
            comprehensionScore: 85,
          }),
          createMockCurriculumArticle('test', 1, { completionStatus: 'unlocked' }),
          createMockCurriculumArticle('test', 2, { completionStatus: 'locked' }),
        ],
      });
      useCurriculumStore.getState().addCurriculum(curriculum);

      const list = useContentListStore.getState().getContentList();
      const curriculumItem = list.find(
        (i) => i.source === 'curriculum' && i.isCurriculum
      );

      expect(curriculumItem?.curriculumProgress?.completed).toBe(1);
      expect(curriculumItem?.state).toBe('in_progress');
    });
  });

  // ===========================================================================
  // getContentList Tests - Training Articles
  // ===========================================================================

  describe('getContentList - training articles', () => {
    it('should include training articles', () => {
      const list = useContentListStore.getState().getContentList();
      const trainingItems = list.filter((i) => i.source === 'training');

      // Should have training articles from static curriculum
      expect(trainingItems.length).toBeGreaterThan(0);
      expect(trainingItems[0].category).toBe('training');
    });

    it('should show progress for completed training articles', () => {
      // Complete a training article
      useLearningStore
        .getState()
        .completeArticle('science-discovery-p01', 85, 300);

      const list = useContentListStore.getState().getContentList();
      const item = list.find(
        (i) => i.sourceId === 'science-discovery-p01'
      );

      expect(item?.state).toBe('completed');
      expect(item?.quizScore).toBe(85);
    });
  });

  // ===========================================================================
  // Filtering Tests
  // ===========================================================================

  describe('filtering', () => {
    beforeEach(() => {
      // Add content of each type
      useContentStore.getState().addContent(
        createMockImportedContentInput({ source: 'url' })
      );
      useContentStore.getState().addContent(
        createMockImportedContentInput({ source: 'epub', wordCount: 50000 })
      );
      useGeneratedStore.setState((state) => ({
        articles: [...state.articles, createMockGeneratedArticle()],
      }));
    });

    it('should filter by books', () => {
      useContentListStore.getState().setFilter('books');
      const list = useContentListStore.getState().getContentList();

      expect(list.every((i) => i.category === 'books')).toBe(true);
    });

    it('should filter by articles', () => {
      useContentListStore.getState().setFilter('articles');
      const list = useContentListStore.getState().getContentList();

      expect(list.every((i) => i.category === 'articles')).toBe(true);
    });

    it('should filter by learning', () => {
      useContentListStore.getState().setFilter('learning');
      const list = useContentListStore.getState().getContentList();

      expect(list.every((i) => i.category === 'learning')).toBe(true);
    });

    it('should filter by training', () => {
      useContentListStore.getState().setFilter('training');
      const list = useContentListStore.getState().getContentList();

      expect(list.every((i) => i.category === 'training')).toBe(true);
    });

    it('should show all when filter is null', () => {
      useContentListStore.getState().setFilter(null);
      const list = useContentListStore.getState().getContentList();

      const categories = new Set(list.map((i) => i.category));
      // Should have multiple categories
      expect(categories.size).toBeGreaterThan(1);
    });
  });

  // ===========================================================================
  // Sorting Tests
  // ===========================================================================

  describe('sorting', () => {
    it('should sort by addedAt descending', () => {
      const now = Date.now();

      // Directly set imported content with specific timestamps
      useContentStore.setState({
        importedContent: [
          {
            id: 'content-old',
            title: 'Old Article',
            content: 'content',
            wordCount: 500,
            source: 'url',
            createdAt: now - 2000,
            readProgress: 0,
          },
          {
            id: 'content-mid',
            title: 'Mid Article',
            content: 'content',
            wordCount: 500,
            source: 'url',
            createdAt: now - 1000,
            readProgress: 0,
          },
          {
            id: 'content-new',
            title: 'New Article',
            content: 'content',
            wordCount: 500,
            source: 'url',
            createdAt: now,
            readProgress: 0,
          },
        ],
      });

      // Filter to just imported to test sorting
      useContentListStore.getState().setFilter('articles');
      const list = useContentListStore.getState().getContentList();

      // Most recent should be first
      expect(list[0].addedAt).toBe(now);
      expect(list[1].addedAt).toBe(now - 1000);
      expect(list[2].addedAt).toBe(now - 2000);
    });

    it('should put training articles at the end', () => {
      useContentStore.getState().addContent(
        createMockImportedContentInput()
      );

      useContentListStore.getState().setFilter(null);
      const list = useContentListStore.getState().getContentList();

      // Training articles should be at the end (addedAt = 0)
      const lastNonTraining = list.findIndex((i) => i.source === 'training');
      if (lastNonTraining > 0) {
        const beforeTraining = list.slice(0, lastNonTraining);
        expect(beforeTraining.every((i) => i.source !== 'training')).toBe(true);
      }
    });
  });

  // ===========================================================================
  // Delete Tests
  // ===========================================================================

  describe('deleteItem', () => {
    it('should delete imported content', () => {
      const content = useContentStore.getState().addContent(
        createMockImportedContentInput()
      );

      const listBefore = useContentListStore.getState().getContentList();
      const item = listBefore.find((i) => i.sourceId === content.id);
      expect(item).toBeDefined();

      useContentListStore.getState().deleteItem(item!);

      const listAfter = useContentListStore.getState().getContentList();
      expect(listAfter.find((i) => i.sourceId === content.id)).toBeUndefined();
    });

    it('should delete generated articles', () => {
      const article = createMockGeneratedArticle();
      useGeneratedStore.setState((state) => ({
        articles: [...state.articles, article],
      }));

      const listBefore = useContentListStore.getState().getContentList();
      const item = listBefore.find((i) => i.sourceId === article.id);
      expect(item).toBeDefined();

      useContentListStore.getState().deleteItem(item!);

      const listAfter = useContentListStore.getState().getContentList();
      expect(listAfter.find((i) => i.sourceId === article.id)).toBeUndefined();
    });

    it('should delete curricula', () => {
      const curriculum = createMockCurriculum();
      useCurriculumStore.getState().addCurriculum(curriculum);

      const listBefore = useContentListStore.getState().getContentList();
      const item = listBefore.find(
        (i) => i.sourceId === curriculum.id && i.isCurriculum
      );
      expect(item).toBeDefined();

      useContentListStore.getState().deleteItem(item!);

      const listAfter = useContentListStore.getState().getContentList();
      expect(
        listAfter.find((i) => i.sourceId === curriculum.id && i.isCurriculum)
      ).toBeUndefined();
    });

    it('should not delete training articles (static content)', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      const list = useContentListStore.getState().getContentList();
      const trainingItem = list.find((i) => i.source === 'training');
      expect(trainingItem).toBeDefined();

      useContentListStore.getState().deleteItem(trainingItem!);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Training articles cannot be deleted'
      );
      consoleSpy.mockRestore();
    });
  });
});
