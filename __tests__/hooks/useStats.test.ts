/**
 * Tests for useStats hook
 *
 * Tests the stats aggregation hook that computes:
 * - articlesRead: count of completed articles
 * - totalWords: estimated total words read (1000 per article)
 * - averageComprehension: average score of completed articles
 * - bestWPM: highest WPM achieved
 * - tiersEarned: count of certification tiers passed
 */

import { renderHook } from '@testing-library/react-native';
import { useStats } from '../../src/hooks/useStats';
import { useLearningStore } from '../../src/store/learningStore';
import { useJourneyStore } from '../../src/store/journeyStore';
import {
  createArticleProgressMap,
  createFullCertProgress,
} from '../helpers/testUtils';
import {
  DEFAULT_CERT_PROGRESS,
  DEFAULT_STREAK,
  DEFAULT_COMFORT_BAND,
} from '../../src/types/journey';

// =============================================================================
// Test Helpers
// =============================================================================

function resetStores() {
  // Reset learning store
  useLearningStore.setState({
    articleProgress: {},
    currentArticleId: null,
    currentWPM: 0,
    recentCompletions: [],
  });

  // Reset journey store
  useJourneyStore.setState({
    _version: 1,
    velocityScore: 0,
    level: 'novice' as const,
    sessions: [],
    avgWpmLast3: 0,
    avgWpmLast5: 0,
    avgCompLast5: 0,
    avgCompLast10: 0,
    bestWpmAt80: 0,
    userState: 'neutral' as const,
    comfortBand: DEFAULT_COMFORT_BAND,
    streak: DEFAULT_STREAK,
    baseline: null,
    speedProofs: [],
    certProgress: {
      speed_reader: { ...DEFAULT_CERT_PROGRESS },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    levelHistory: {},
  });
}

// =============================================================================
// Test Suite
// =============================================================================

describe('useStats', () => {
  beforeEach(() => {
    resetStores();
  });

  // ===========================================================================
  // Empty State
  // ===========================================================================

  describe('with no data', () => {
    it('returns zero for all stats when no articles read', () => {
      const { result } = renderHook(() => useStats());

      expect(result.current.articlesRead).toBe(0);
      expect(result.current.totalWords).toBe(0);
      expect(result.current.averageComprehension).toBe(0);
      expect(result.current.bestWPM).toBe(0);
      expect(result.current.tiersEarned).toBe(0);
    });
  });

  // ===========================================================================
  // Articles Read Count
  // ===========================================================================

  describe('articlesRead', () => {
    it('counts only completed articles', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', completed: true },
          { id: 'article-2', completed: false },
          { id: 'article-3', completed: true },
          { id: 'article-4', completed: false },
        ]),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.articlesRead).toBe(2);
    });

    it('returns 0 when no articles completed', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', completed: false },
          { id: 'article-2', completed: false },
        ]),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.articlesRead).toBe(0);
    });
  });

  // ===========================================================================
  // Total Words
  // ===========================================================================

  describe('totalWords', () => {
    it('estimates 1000 words per completed article', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', completed: true },
          { id: 'article-2', completed: true },
          { id: 'article-3', completed: true },
        ]),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.totalWords).toBe(3000);
    });

    it('ignores incomplete articles in word count', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', completed: true },
          { id: 'article-2', completed: false },
        ]),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.totalWords).toBe(1000);
    });
  });

  // ===========================================================================
  // Average Comprehension
  // ===========================================================================

  describe('averageComprehension', () => {
    it('calculates average of completed articles with scores > 0', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', completed: true, comprehensionScore: 80 },
          { id: 'article-2', completed: true, comprehensionScore: 90 },
          { id: 'article-3', completed: true, comprehensionScore: 70 },
        ]),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.averageComprehension).toBe(80); // (80+90+70)/3
    });

    it('excludes articles with score 0 from average', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', completed: true, comprehensionScore: 80 },
          { id: 'article-2', completed: true, comprehensionScore: 0 },
          { id: 'article-3', completed: true, comprehensionScore: 100 },
        ]),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.averageComprehension).toBe(90); // (80+100)/2
    });

    it('excludes incomplete articles from average', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', completed: true, comprehensionScore: 80 },
          { id: 'article-2', completed: false, comprehensionScore: 100 },
        ]),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.averageComprehension).toBe(80);
    });

    it('returns 0 when no articles have scores', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', completed: true, comprehensionScore: 0 },
        ]),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.averageComprehension).toBe(0);
    });

    it('rounds average to nearest integer', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', completed: true, comprehensionScore: 85 },
          { id: 'article-2', completed: true, comprehensionScore: 86 },
        ]),
      });

      const { result } = renderHook(() => useStats());

      // (85+86)/2 = 85.5, rounds to 86
      expect(result.current.averageComprehension).toBe(86);
    });
  });

  // ===========================================================================
  // Best WPM
  // ===========================================================================

  describe('bestWPM', () => {
    it('returns highest WPM from learning store', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', highestWPM: 300 },
          { id: 'article-2', highestWPM: 450 },
          { id: 'article-3', highestWPM: 350 },
        ]),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.bestWPM).toBe(450);
    });

    it('returns 0 when no WPM data', () => {
      const { result } = renderHook(() => useStats());

      expect(result.current.bestWPM).toBe(0);
    });
  });

  // ===========================================================================
  // Tiers Earned
  // ===========================================================================

  describe('tiersEarned', () => {
    it('counts certification tiers where examPassed is true', () => {
      useJourneyStore.setState({
        certProgress: createFullCertProgress({
          speed_reader: { examPassed: true },
          velocity_master: { examPassed: true },
          transcendent: { examPassed: false },
        }),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.tiersEarned).toBe(2);
    });

    it('returns 0 when no tiers earned', () => {
      useJourneyStore.setState({
        certProgress: createFullCertProgress(),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.tiersEarned).toBe(0);
    });

    it('returns 3 when all tiers earned', () => {
      useJourneyStore.setState({
        certProgress: createFullCertProgress({
          speed_reader: { examPassed: true },
          velocity_master: { examPassed: true },
          transcendent: { examPassed: true },
        }),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.tiersEarned).toBe(3);
    });
  });

  // ===========================================================================
  // Integration
  // ===========================================================================

  describe('integration', () => {
    it('computes all stats correctly together', () => {
      useLearningStore.setState({
        articleProgress: createArticleProgressMap([
          { id: 'article-1', completed: true, comprehensionScore: 85, highestWPM: 350 },
          { id: 'article-2', completed: true, comprehensionScore: 95, highestWPM: 400 },
          { id: 'article-3', completed: false, comprehensionScore: 0, highestWPM: 200 },
        ]),
      });

      useJourneyStore.setState({
        certProgress: createFullCertProgress({
          speed_reader: { examPassed: true },
        }),
      });

      const { result } = renderHook(() => useStats());

      expect(result.current.articlesRead).toBe(2);
      expect(result.current.totalWords).toBe(2000);
      expect(result.current.averageComprehension).toBe(90); // (85+95)/2
      expect(result.current.bestWPM).toBe(400);
      expect(result.current.tiersEarned).toBe(1);
    });
  });
});
