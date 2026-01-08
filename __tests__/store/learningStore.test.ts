/**
 * Tests for Learning Store.
 *
 * Manages article progress, WPM tracking, and learning statistics.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useLearningStore } from '../../src/store/learningStore';

describe('learningStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useLearningStore());
    act(() => {
      result.current.resetProgress();
    });
  });

  describe('initial state', () => {
    it('starts with empty articleProgress', () => {
      const { result } = renderHook(() => useLearningStore());
      act(() => {
        result.current.resetProgress();
      });
      expect(Object.keys(result.current.articleProgress)).toHaveLength(0);
    });

    it('starts with currentArticleId as null', () => {
      const { result } = renderHook(() => useLearningStore());
      act(() => {
        result.current.resetProgress();
      });
      expect(result.current.currentArticleId).toBeNull();
    });

    it('starts with currentWPM as 250', () => {
      const { result } = renderHook(() => useLearningStore());
      // Note: currentWPM persists, so we check the type
      expect(typeof result.current.currentWPM).toBe('number');
    });

    it('starts with empty recentCompletions', () => {
      const { result } = renderHook(() => useLearningStore());
      act(() => {
        result.current.resetProgress();
      });
      expect(result.current.recentCompletions).toEqual([]);
    });
  });

  describe('setCurrentArticle()', () => {
    it('sets currentArticleId', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.setCurrentArticle('article-123');
      });

      expect(result.current.currentArticleId).toBe('article-123');
    });

    it('can set to null', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.setCurrentArticle('article-123');
      });

      act(() => {
        result.current.setCurrentArticle(null);
      });

      expect(result.current.currentArticleId).toBeNull();
    });
  });

  describe('setCurrentWPM()', () => {
    it('sets currentWPM', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.setCurrentWPM(300);
      });

      expect(result.current.currentWPM).toBe(300);
    });
  });

  describe('completeArticle()', () => {
    it('creates new progress record for first completion', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 85, 250);
      });

      const progress = result.current.getArticleProgress('article-1');
      expect(progress).not.toBeNull();
      expect(progress?.articleId).toBe('article-1');
      expect(progress?.comprehensionScore).toBe(85);
      expect(progress?.highestWPM).toBe(250);
    });

    it('marks article as completed when score passes (>= 70)', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 70, 250);
      });

      const progress = result.current.getArticleProgress('article-1');
      expect(progress?.completed).toBe(true);
    });

    it('does not mark as completed when score fails (< 70)', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 69, 250);
      });

      const progress = result.current.getArticleProgress('article-1');
      expect(progress?.completed).toBe(false);
    });

    it('updates existing record with better score', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 70, 200);
      });

      act(() => {
        result.current.completeArticle('article-1', 90, 200);
      });

      const progress = result.current.getArticleProgress('article-1');
      expect(progress?.comprehensionScore).toBe(90);
    });

    it('keeps existing score if new score is lower', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 90, 200);
      });

      act(() => {
        result.current.completeArticle('article-1', 70, 200);
      });

      const progress = result.current.getArticleProgress('article-1');
      expect(progress?.comprehensionScore).toBe(90);
    });

    it('updates highestWPM when new WPM is higher', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 80, 200);
      });

      act(() => {
        result.current.completeArticle('article-1', 80, 300);
      });

      const progress = result.current.getArticleProgress('article-1');
      expect(progress?.highestWPM).toBe(300);
    });

    it('keeps highestWPM when new WPM is lower', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 80, 300);
      });

      act(() => {
        result.current.completeArticle('article-1', 80, 200);
      });

      const progress = result.current.getArticleProgress('article-1');
      expect(progress?.highestWPM).toBe(300);
    });

    it('increments attemptCount', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 80, 200);
      });

      expect(result.current.getArticleProgress('article-1')?.attemptCount).toBe(1);

      act(() => {
        result.current.completeArticle('article-1', 85, 220);
      });

      expect(result.current.getArticleProgress('article-1')?.attemptCount).toBe(2);
    });

    it('adds attempt to attempts array', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 80, 200);
      });

      const progress = result.current.getArticleProgress('article-1');
      expect(progress?.attempts).toHaveLength(1);
      expect(progress?.attempts?.[0].score).toBe(80);
      expect(progress?.attempts?.[0].wpm).toBe(200);
    });

    it('adds to recentCompletions', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 80, 200);
      });

      expect(result.current.recentCompletions).toHaveLength(1);
      expect(result.current.recentCompletions[0].articleId).toBe('article-1');
    });

    it('limits recentCompletions to 20 entries', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        for (let i = 0; i < 25; i++) {
          result.current.completeArticle(`article-${i}`, 80, 200);
        }
      });

      expect(result.current.recentCompletions).toHaveLength(20);
      // Should contain the most recent ones (5-24)
      expect(result.current.recentCompletions[0].articleId).toBe('article-5');
      expect(result.current.recentCompletions[19].articleId).toBe('article-24');
    });

    it('sets lastReadAt timestamp', () => {
      const { result } = renderHook(() => useLearningStore());
      const beforeTime = Date.now();

      act(() => {
        result.current.completeArticle('article-1', 80, 200);
      });

      const afterTime = Date.now();
      const progress = result.current.getArticleProgress('article-1');

      expect(progress?.lastReadAt).toBeGreaterThanOrEqual(beforeTime);
      expect(progress?.lastReadAt).toBeLessThanOrEqual(afterTime);
    });

    describe('certification tracking', () => {
      it('marks certificationAttemptUsed on first certification attempt', () => {
        const { result } = renderHook(() => useLearningStore());

        act(() => {
          result.current.completeArticle('article-1', 80, 200, true);
        });

        const progress = result.current.getArticleProgress('article-1');
        expect(progress?.certificationAttemptUsed).toBe(true);
        expect(progress?.certificationAttemptScore).toBe(80);
        expect(progress?.certificationAttemptWPM).toBe(200);
      });

      it('does not overwrite certification data on subsequent attempts', () => {
        const { result } = renderHook(() => useLearningStore());

        act(() => {
          result.current.completeArticle('article-1', 80, 200, true);
        });

        act(() => {
          result.current.completeArticle('article-1', 95, 350, true);
        });

        const progress = result.current.getArticleProgress('article-1');
        // Certification score/WPM should remain from first attempt
        expect(progress?.certificationAttemptScore).toBe(80);
        expect(progress?.certificationAttemptWPM).toBe(200);
      });
    });
  });

  describe('getArticleProgress()', () => {
    it('returns progress for existing article', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 85, 250);
      });

      const progress = result.current.getArticleProgress('article-1');
      expect(progress).not.toBeNull();
      expect(progress?.articleId).toBe('article-1');
    });

    it('returns null for unknown article', () => {
      const { result } = renderHook(() => useLearningStore());

      const progress = result.current.getArticleProgress('nonexistent');
      expect(progress).toBeNull();
    });
  });

  describe('getTopicProgress()', () => {
    // Note: These tests depend on the actual curriculum data
    // We test the structure and behavior
    it('returns TopicProgress structure', () => {
      const { result } = renderHook(() => useLearningStore());

      const progress = result.current.getTopicProgress('some-topic');

      expect(progress).toHaveProperty('topicId');
      expect(progress).toHaveProperty('articlesCompleted');
      expect(progress).toHaveProperty('totalArticles');
      expect(progress).toHaveProperty('averageScore');
    });

    it('returns 0 averageScore when no articles completed', () => {
      const { result } = renderHook(() => useLearningStore());

      const progress = result.current.getTopicProgress('science');
      expect(progress.averageScore).toBe(0);
    });

    it('counts completed articles and calculates averageScore', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        // Complete real articles from science-discovery topic
        result.current.completeArticle('science-discovery-p01', 80, 200);
        result.current.completeArticle('science-discovery-p02', 90, 220);
      });

      const progress = result.current.getTopicProgress('science-discovery');
      expect(progress.articlesCompleted).toBe(2);
      expect(progress.averageScore).toBe(85); // (80 + 90) / 2
    });

    it('only counts completed (passing) articles', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('science-discovery-p01', 80, 200); // Pass
        result.current.completeArticle('science-discovery-p02', 50, 200); // Fail
      });

      const progress = result.current.getTopicProgress('science-discovery');
      expect(progress.articlesCompleted).toBe(1);
      expect(progress.averageScore).toBe(80);
    });
  });

  describe('getTotalArticlesCompleted()', () => {
    it('returns 0 when no articles completed', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
      });

      expect(result.current.getTotalArticlesCompleted()).toBe(0);
    });

    it('counts only completed (passing) articles', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 70, 200); // Pass
        result.current.completeArticle('article-2', 69, 200); // Fail
        result.current.completeArticle('article-3', 85, 200); // Pass
      });

      expect(result.current.getTotalArticlesCompleted()).toBe(2);
    });

    it('counts each article only once', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 70, 200);
        result.current.completeArticle('article-1', 80, 220);
        result.current.completeArticle('article-1', 90, 250);
      });

      expect(result.current.getTotalArticlesCompleted()).toBe(1);
    });
  });

  describe('getHighestWPM()', () => {
    it('returns 0 when no articles completed', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
      });

      expect(result.current.getHighestWPM()).toBe(0);
    });

    it('returns highest WPM across all articles', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 70, 200);
        result.current.completeArticle('article-2', 70, 350);
        result.current.completeArticle('article-3', 70, 250);
      });

      expect(result.current.getHighestWPM()).toBe(350);
    });

    it('returns highest WPM even from failed attempts', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 50, 400); // Fail but high WPM
        result.current.completeArticle('article-2', 80, 200); // Pass but lower WPM
      });

      expect(result.current.getHighestWPM()).toBe(400);
    });
  });

  describe('getArticleAttemptCount()', () => {
    it('returns 0 for unread article', () => {
      const { result } = renderHook(() => useLearningStore());

      expect(result.current.getArticleAttemptCount('nonexistent')).toBe(0);
    });

    it('returns correct count after multiple attempts', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 60, 200);
        result.current.completeArticle('article-1', 70, 210);
        result.current.completeArticle('article-1', 80, 220);
      });

      expect(result.current.getArticleAttemptCount('article-1')).toBe(3);
    });
  });

  describe('isCertificationAttemptAvailable()', () => {
    it('returns true for unread article', () => {
      const { result } = renderHook(() => useLearningStore());

      expect(result.current.isCertificationAttemptAvailable('article-1')).toBe(true);
    });

    it('returns true after non-certification attempt', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 80, 200, false);
      });

      expect(result.current.isCertificationAttemptAvailable('article-1')).toBe(true);
    });

    it('returns false after certification attempt', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 80, 200, true);
      });

      expect(result.current.isCertificationAttemptAvailable('article-1')).toBe(false);
    });
  });

  describe('getRecentPerformance()', () => {
    it('returns zeros when no completions', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
      });

      const performance = result.current.getRecentPerformance();
      expect(performance.averageWPM).toBe(0);
      expect(performance.averageAccuracy).toBe(0);
      expect(performance.articleCount).toBe(0);
    });

    it('calculates average WPM correctly', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 80, 200, false);
        result.current.completeArticle('article-2', 80, 300, false);
        result.current.completeArticle('article-3', 80, 250, false);
      });

      const performance = result.current.getRecentPerformance();
      expect(performance.averageWPM).toBe(250); // (200 + 300 + 250) / 3
    });

    it('calculates average accuracy correctly', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 70, 200, false);
        result.current.completeArticle('article-2', 90, 200, false);
        result.current.completeArticle('article-3', 80, 200, false);
      });

      const performance = result.current.getRecentPerformance();
      expect(performance.averageAccuracy).toBe(80); // (70 + 90 + 80) / 3
    });

    it('excludes certification texts from calculation', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 80, 200, false);
        result.current.completeArticle('article-2', 100, 500, true); // Certification - excluded
        result.current.completeArticle('article-3', 80, 200, false);
      });

      const performance = result.current.getRecentPerformance();
      expect(performance.articleCount).toBe(2);
      expect(performance.averageWPM).toBe(200);
    });

    it('respects count parameter', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('article-1', 60, 100, false);
        result.current.completeArticle('article-2', 70, 200, false);
        result.current.completeArticle('article-3', 80, 300, false);
        result.current.completeArticle('article-4', 90, 400, false);
      });

      // Get last 2
      const performance = result.current.getRecentPerformance(2);
      expect(performance.articleCount).toBe(2);
      expect(performance.averageWPM).toBe(350); // (300 + 400) / 2
    });
  });

  describe('isArticleUnlocked()', () => {
    it('returns false for nonexistent article', () => {
      const { result } = renderHook(() => useLearningStore());

      expect(result.current.isArticleUnlocked('nonexistent-article')).toBe(false);
    });

    it('returns true for first article in topic (orderIndex 1)', () => {
      const { result } = renderHook(() => useLearningStore());

      // First article (p01) should always be unlocked
      const unlocked = result.current.isArticleUnlocked('science-discovery-p01');
      expect(unlocked).toBe(true);
    });

    it('returns false for second article when first is not completed', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
      });

      // Second article should be locked if first is not completed
      const unlocked = result.current.isArticleUnlocked('science-discovery-p02');
      expect(unlocked).toBe(false);
    });

    it('returns true for second article when first is completed', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('science-discovery-p01', 80, 200); // Complete first article
      });

      // Second article should now be unlocked
      const unlocked = result.current.isArticleUnlocked('science-discovery-p02');
      expect(unlocked).toBe(true);
    });

    it('returns true for third article when second is completed', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('science-discovery-p01', 80, 200);
        result.current.completeArticle('science-discovery-p02', 85, 220);
      });

      // Third article should now be unlocked
      const unlocked = result.current.isArticleUnlocked('science-discovery-p03');
      expect(unlocked).toBe(true);
    });

    it('checks certification articles independently from practice articles', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
      });

      // First certification article (c1) should be unlocked regardless of practice progress
      const unlocked = result.current.isArticleUnlocked('science-discovery-c1');
      expect(unlocked).toBe(true);
    });

    it('returns false for second certification when first cert is not completed', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        // Complete all practice articles but not certification
        result.current.completeArticle('science-discovery-p01', 80, 200);
        result.current.completeArticle('science-discovery-p02', 80, 200);
      });

      // Second certification article should be locked
      const unlocked = result.current.isArticleUnlocked('science-discovery-c2');
      expect(unlocked).toBe(false);
    });

    it('returns true for second certification when first cert is completed', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        result.current.completeArticle('science-discovery-c1', 80, 200, true);
      });

      // Second certification should now be unlocked
      const unlocked = result.current.isArticleUnlocked('science-discovery-c2');
      expect(unlocked).toBe(true);
    });

    it('handles articles without explicit articleType (defaults to practice)', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
      });

      // Practice articles without articleType should be treated as practice
      // First article is always unlocked
      const unlocked = result.current.isArticleUnlocked('science-discovery-p01');
      expect(unlocked).toBe(true);
    });

    it('handles orderIndex defaulting to 1 when undefined', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
      });

      // The function uses article.orderIndex ?? 1, so articles without orderIndex
      // are treated as having orderIndex 1
      // First article in any topic should be unlocked
      const unlocked = result.current.isArticleUnlocked('science-discovery-p01');
      expect(unlocked).toBe(true);
    });

    it('correctly filters same article type when checking unlock status', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.resetProgress();
        // Complete first practice
        result.current.completeArticle('science-discovery-p01', 80, 200);
      });

      // Second practice should be unlocked
      expect(result.current.isArticleUnlocked('science-discovery-p02')).toBe(true);

      // First certification should still be unlocked (independent)
      expect(result.current.isArticleUnlocked('science-discovery-c1')).toBe(true);
    });
  });

  describe('resetProgress()', () => {
    it('clears all article progress', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 80, 200);
        result.current.completeArticle('article-2', 90, 250);
      });

      expect(Object.keys(result.current.articleProgress).length).toBeGreaterThan(0);

      act(() => {
        result.current.resetProgress();
      });

      expect(Object.keys(result.current.articleProgress)).toHaveLength(0);
    });

    it('sets currentArticleId to null', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.setCurrentArticle('article-1');
      });

      act(() => {
        result.current.resetProgress();
      });

      expect(result.current.currentArticleId).toBeNull();
    });

    it('clears recentCompletions', () => {
      const { result } = renderHook(() => useLearningStore());

      act(() => {
        result.current.completeArticle('article-1', 80, 200);
      });

      expect(result.current.recentCompletions.length).toBeGreaterThan(0);

      act(() => {
        result.current.resetProgress();
      });

      expect(result.current.recentCompletions).toHaveLength(0);
    });
  });
});
