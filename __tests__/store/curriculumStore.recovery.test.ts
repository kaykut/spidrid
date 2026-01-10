/**
 * Tests for Curriculum Store Stale Generation Recovery
 *
 * Tests recovery logic for articles stuck in 'generating' state:
 * - Articles stuck for >10min reset to 'pending'
 * - Recovery runs on store hydration
 * - Recent generations are not affected
 */

import { act, renderHook } from '@testing-library/react-native';
import { useCurriculumStore } from '../../src/store/curriculumStore';
import { Curriculum, CurriculumArticle } from '../../src/types/curriculum';

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
  content: '',
  wordCount: 0,
  questions: [],
  generationStatus: 'pending',
  completionStatus: index === 0 ? 'unlocked' : 'locked',
  ...overrides,
});

// Factory for test curriculum
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
    createdAt: Date.now(),
    updatedAt: Date.now(),
    currentArticleIndex: 0,
    completedArticleCount: 0,
    isCompleted: false,
    articles: Array.from({ length: articleCount }, (_, i) => createTestArticle(id, i)),
    ...overrides,
  };
};

describe('curriculumStore recovery', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset store state
    const { result } = renderHook(() => useCurriculumStore());
    act(() => {
      result.current.clearAllCurricula();
    });
  });

  describe('app restart recovery', () => {
    it('articles stuck in generating for >10min reset to pending', async () => {
      const TEN_MINUTES_AGO = Date.now() - 11 * 60 * 1000; // 11 minutes ago

      const curriculum = createTestCurriculum(3, { id: 'curr_stale' });
      curriculum.articles[1].generationStatus = 'generating';
      curriculum.articles[1].generationStartedAt = TEN_MINUTES_AGO;

      const { result } = renderHook(() => useCurriculumStore());

      // Add the curriculum (simulating rehydration)
      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Run recovery
      act(() => {
        result.current.recoverStaleGenerations();
      });

      const recovered = result.current.getCurriculum('curr_stale');
      expect(recovered?.articles[1].generationStatus).toBe('pending');
    });

    it('recovery does not affect recently started generations', async () => {
      const FIVE_MINUTES_AGO = Date.now() - 5 * 60 * 1000; // 5 minutes ago

      const curriculum = createTestCurriculum(3, { id: 'curr_recent' });
      curriculum.articles[1].generationStatus = 'generating';
      curriculum.articles[1].generationStartedAt = FIVE_MINUTES_AGO;

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      // Run recovery
      act(() => {
        result.current.recoverStaleGenerations();
      });

      const notRecovered = result.current.getCurriculum('curr_recent');
      // Should still be generating since it's recent
      expect(notRecovered?.articles[1].generationStatus).toBe('generating');
    });

    it('recovery handles multiple curricula', async () => {
      const STALE_TIME = Date.now() - 15 * 60 * 1000;
      const RECENT_TIME = Date.now() - 3 * 60 * 1000;

      const curriculum1 = createTestCurriculum(3, { id: 'curr_multi_1' });
      curriculum1.articles[1].generationStatus = 'generating';
      curriculum1.articles[1].generationStartedAt = STALE_TIME;

      const curriculum2 = createTestCurriculum(3, { id: 'curr_multi_2' });
      curriculum2.articles[0].generationStatus = 'generating';
      curriculum2.articles[0].generationStartedAt = RECENT_TIME;

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum1);
        result.current.addCurriculum(curriculum2);
      });

      act(() => {
        result.current.recoverStaleGenerations();
      });

      // Curriculum 1's stale article should be reset
      const c1 = result.current.getCurriculum('curr_multi_1');
      expect(c1?.articles[1].generationStatus).toBe('pending');

      // Curriculum 2's recent article should not be reset
      const c2 = result.current.getCurriculum('curr_multi_2');
      expect(c2?.articles[0].generationStatus).toBe('generating');
    });

    it('recovery preserves other article states', async () => {
      const STALE_TIME = Date.now() - 12 * 60 * 1000;

      const curriculum = createTestCurriculum(5, { id: 'curr_preserve' });
      curriculum.articles[0].generationStatus = 'generated';
      curriculum.articles[0].content = 'Generated content';
      curriculum.articles[0].completionStatus = 'completed';
      curriculum.articles[1].generationStatus = 'generating';
      curriculum.articles[1].generationStartedAt = STALE_TIME;
      curriculum.articles[2].generationStatus = 'failed';
      curriculum.articles[3].generationStatus = 'pending';

      const { result } = renderHook(() => useCurriculumStore());

      act(() => {
        result.current.addCurriculum(curriculum);
      });

      act(() => {
        result.current.recoverStaleGenerations();
      });

      const recovered = result.current.getCurriculum('curr_preserve');
      // Article 0 should still be generated and completed
      expect(recovered?.articles[0].generationStatus).toBe('generated');
      expect(recovered?.articles[0].completionStatus).toBe('completed');
      // Article 1 should be reset to pending
      expect(recovered?.articles[1].generationStatus).toBe('pending');
      // Article 2 should still be failed
      expect(recovered?.articles[2].generationStatus).toBe('failed');
      // Article 3 should still be pending
      expect(recovered?.articles[3].generationStatus).toBe('pending');
    });
  });
});
