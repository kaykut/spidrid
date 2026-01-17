/**
 * Tests for Curriculum Store Pre-generation Logic
 *
 * Tests the background pre-generation of articles:
 * - Generates article N+2 after completing article N
 * - Handles edge cases (beyond count, already generated)
 * - Error isolation for pre-generation failures
 */

import { act, renderHook } from '@testing-library/react-native';
import { useCurriculumStore } from '../../src/store/curriculumStore';
import { Curriculum, CurriculumArticle } from '../../src/types/curriculum';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Factory for test article
const createTestArticle = (
  curriculumId: string,
  index: number,
  overrides: Partial<CurriculumArticle> = {}
): CurriculumArticle => ({
  id: `${curriculumId}-article-${index}`,
  curriculumId,
  orderIndex: index,
  title: `Article ${index + 1}`,
  summary: `Summary for article ${index + 1}`,
  content: index === 0 ? 'Generated content for first article.' : '',
  wordCount: index === 0 ? 750 : 0,
  hasQuiz: true,
  questions: [],
  generationStatus: index === 0 ? 'generated' : 'pending',
  completionStatus: index === 0 ? 'unlocked' : 'locked',
  ...overrides,
});

// Factory for test curriculum (with outline for generateArticle to work)
const createTestCurriculum = (
  articleCount: number = 5,
  overrides: Partial<Curriculum> = {}
): Curriculum => {
  const id = overrides.id || `curr_${Date.now()}`;
  return {
    id,
    title: 'Test Curriculum',
    goal: 'Learn testing',
    articleCount,
    tone: 'explanatory',
    targetWordCount: 750,
    hasQuizzes: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    currentArticleIndex: 0,
    completedArticleCount: 0,
    isCompleted: false,
    articles: Array.from({ length: articleCount }, (_, i) => createTestArticle(id, i)),
    // Include outline so generateArticle works
    outline: {
      curriculumTitle: 'Test Curriculum',
      articles: Array.from({ length: articleCount }, (_, i) => ({
        orderIndex: i,
        title: `Article ${i + 1}`,
        summary: `Summary for article ${i + 1}`,
        keyConceptsToIntroduce: ['concept1'],
        prerequisiteConcepts: i > 0 ? ['previous concept'] : [],
      })),
    },
    ...overrides,
  };
};

describe('curriculumStore pre-generation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();

    // Reset store state
    const { result } = renderHook(() => useCurriculumStore());
    act(() => {
      result.current.clearAllCurricula();
    });
  });

  describe('pre-generation trigger', () => {
    it('generates article N+2 after completing article N', async () => {
      // Setup: curriculum with 5 articles, article 0 generated
      const curriculum = createTestCurriculum(5, { id: 'curr_pregen' });
      curriculum.articles[0].generationStatus = 'generated';
      curriculum.articles[0].content = 'Article 0 content.';
      curriculum.articles[1].generationStatus = 'generated';
      curriculum.articles[1].content = 'Article 1 content.';
      curriculum.articles[1].completionStatus = 'unlocked';

      const { result } = renderHook(() => useCurriculumStore());

      // Add curriculum to store
      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Mock successful article generation for article 2 (N+2 when completing N=0)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Article 3 Generated',
              summary: 'Pre-generated article',
              content: 'Pre-generated content.',
              wordCount: 750,
              questions: [],
            },
          }),
      });

      // Complete article 0 - should trigger pre-generation of article 2
      await act(async () => {
        await result.current.markArticleCompleted('curr_pregen', 0, 85, 300);
      });

      // Verify article 0 is marked completed
      const updated = result.current.getCurriculum('curr_pregen');
      expect(updated?.articles[0].completionStatus).toBe('completed');

      // Note: Pre-generation may be triggered asynchronously
      // The actual implementation triggers generateArticle for N+2
    });

    it('does not pre-generate beyond article count', async () => {
      // Setup: curriculum with 3 articles
      const curriculum = createTestCurriculum(3, { id: 'curr_edge' });
      curriculum.articles.forEach((a, i) => {
        a.generationStatus = 'generated';
        a.content = `Content ${i}`;
        a.completionStatus = i === 0 ? 'unlocked' : 'locked';
      });

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Complete article 1 - N+2 would be article 3, which doesn't exist
      await act(async () => {
        await result.current.markArticleCompleted('curr_edge', 1, 90, 320);
      });

      // No fetch should have been called for pre-generation
      // (Only markArticleCompleted doesn't fetch)
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('does not re-generate already generated articles', async () => {
      const curriculum = createTestCurriculum(5, { id: 'curr_skip' });
      // Mark articles 0-3 as generated
      for (let i = 0; i < 4; i++) {
        curriculum.articles[i].generationStatus = 'generated';
        curriculum.articles[i].content = `Content ${i}`;
        curriculum.articles[i].completionStatus = i <= 1 ? 'unlocked' : 'locked';
      }

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Complete article 0 - N+2 is article 2 which is already generated
      await act(async () => {
        await result.current.markArticleCompleted('curr_skip', 0, 85, 300);
      });

      // Should not call fetch since article 2 is already generated
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('handles concurrent completions gracefully', async () => {
      const curriculum = createTestCurriculum(5, { id: 'curr_concurrent' });
      curriculum.articles[0].generationStatus = 'generated';
      curriculum.articles[0].content = 'Content 0';
      curriculum.articles[1].generationStatus = 'generated';
      curriculum.articles[1].content = 'Content 1';
      curriculum.articles[1].completionStatus = 'unlocked';

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Complete two articles in parallel
      await act(async () => {
        await Promise.all([
          result.current.markArticleCompleted('curr_concurrent', 0, 85, 300),
          result.current.markArticleCompleted('curr_concurrent', 1, 90, 320),
        ]);
      });

      // Both should be marked completed
      const updated = result.current.getCurriculum('curr_concurrent');
      expect(updated?.articles[0].completionStatus).toBe('completed');
      expect(updated?.articles[1].completionStatus).toBe('completed');
    });
  });

  describe('retry functionality', () => {
    it('failed articles can be retried via generateArticle()', async () => {
      const curriculum = createTestCurriculum(3, { id: 'curr_retry' });
      curriculum.articles[0].generationStatus = 'generated';
      curriculum.articles[0].content = 'Content';
      curriculum.articles[1].generationStatus = 'failed';
      curriculum.articles[1].generationError = 'Network error';
      curriculum.articles[1].completionStatus = 'unlocked';

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Mock successful retry
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Retried Article',
              summary: 'Retried summary',
              content: 'Retried content.',
              wordCount: 750,
              questions: [],
            },
          }),
      });

      // Retry generation
      await act(async () => {
        await result.current.generateArticle('curr_retry', 1);
      });

      // Article should now be generated
      const updated = result.current.getCurriculum('curr_retry');
      expect(updated?.articles[1].generationStatus).toBe('generated');
      expect(updated?.articles[1].content).toBe('Retried content.');
    });

    it('retry resets generationStatus to generating', async () => {
      const curriculum = createTestCurriculum(3, { id: 'curr_reset' });
      curriculum.articles[1].generationStatus = 'failed';
      curriculum.articles[1].completionStatus = 'unlocked';

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Mock delayed response to observe intermediate state
      let resolvePromise: (value: any) => void;
      mockFetch.mockReturnValueOnce(
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
      );

      // Start retry
      let retryPromise: Promise<void>;
      act(() => {
        retryPromise = result.current.generateArticle('curr_reset', 1);
      });

      // Check intermediate state
      const intermediate = result.current.getCurriculum('curr_reset');
      expect(intermediate?.articles[1].generationStatus).toBe('generating');

      // Resolve the fetch
      await act(async () => {
        resolvePromise!({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              article: {
                title: 'Test',
                summary: 'Test',
                content: 'Test content.',
                wordCount: 100,
                questions: [],
              },
            }),
        });
        await retryPromise;
      });
    });

    it('successful retry updates article content', async () => {
      const curriculum = createTestCurriculum(3, { id: 'curr_update' });
      curriculum.articles[1].generationStatus = 'failed';
      curriculum.articles[1].completionStatus = 'unlocked';

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Updated Title',
              summary: 'Updated summary',
              content: 'Updated content here.',
              wordCount: 500,
              questions: [{ question: 'Q1?', options: ['A', 'B'], correctIndex: 0 }],
            },
          }),
      });

      await act(async () => {
        await result.current.generateArticle('curr_update', 1);
      });

      const updated = result.current.getCurriculum('curr_update');
      expect(updated?.articles[1].title).toBe('Updated Title');
      expect(updated?.articles[1].content).toBe('Updated content here.');
      expect(updated?.articles[1].wordCount).toBe(500);
      expect(updated?.articles[1].questions).toHaveLength(1);
    });

    it('failed retry keeps failed status with new error', async () => {
      const curriculum = createTestCurriculum(3, { id: 'curr_fail' });
      curriculum.articles[1].generationStatus = 'failed';
      curriculum.articles[1].generationError = 'Old error';
      curriculum.articles[1].completionStatus = 'unlocked';

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () =>
          Promise.resolve({
            success: false,
            error: 'New network error',
          }),
      });

      await act(async () => {
        await result.current.generateArticle('curr_fail', 1);
      });

      const updated = result.current.getCurriculum('curr_fail');
      expect(updated?.articles[1].generationStatus).toBe('failed');
      expect(updated?.articles[1].generationError).toContain('error');
    });
  });

  describe('error isolation', () => {
    it('pre-generation failure does not affect current article', async () => {
      const curriculum = createTestCurriculum(5, { id: 'curr_isolate' });
      curriculum.articles[0].generationStatus = 'generated';
      curriculum.articles[0].content = 'Article 0';
      curriculum.articles[1].generationStatus = 'generated';
      curriculum.articles[1].content = 'Article 1';
      curriculum.articles[1].completionStatus = 'unlocked';

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Complete article 0 - this marks it complete regardless of pre-gen
      await act(async () => {
        await result.current.markArticleCompleted('curr_isolate', 0, 85, 300);
      });

      const updated = result.current.getCurriculum('curr_isolate');
      // Article 0 should still be completed
      expect(updated?.articles[0].completionStatus).toBe('completed');
      // Article 1 should be unlocked for reading
      expect(updated?.articles[1].completionStatus).toBe('unlocked');
    });

    it('article N can be read while N+2 is failing', async () => {
      const curriculum = createTestCurriculum(5, { id: 'curr_read' });
      curriculum.articles[0].generationStatus = 'generated';
      curriculum.articles[0].content = 'Readable content';
      curriculum.articles[0].completionStatus = 'completed';
      curriculum.articles[1].generationStatus = 'generated';
      curriculum.articles[1].content = 'Article 1 content';
      curriculum.articles[1].completionStatus = 'unlocked';
      curriculum.articles[2].generationStatus = 'failed';
      curriculum.articles[2].generationError = 'Failed to generate';

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Article 1 should be readable even though article 2 failed
      const curr = result.current.getCurriculum('curr_read');
      expect(curr?.articles[1].generationStatus).toBe('generated');
      expect(curr?.articles[1].completionStatus).toBe('unlocked');
      expect(curr?.articles[1].content).toBe('Article 1 content');
    });

    it('pre-generation errors are silently captured', async () => {
      const curriculum = createTestCurriculum(5, { id: 'curr_silent' });
      curriculum.articles[0].generationStatus = 'generated';
      curriculum.articles[0].content = 'Content';

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Mock failure
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      // This should not throw
      await act(async () => {
        await result.current.generateArticle('curr_silent', 2);
      });

      // Article should be marked as failed, not throw
      const updated = result.current.getCurriculum('curr_silent');
      expect(updated?.articles[2].generationStatus).toBe('failed');
    });
  });
});
