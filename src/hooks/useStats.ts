/**
 * useStats Hook
 *
 * Calculates user statistics for display on the home screen.
 * Extracts stats logic from journey-profile for reuse.
 */

import { useJourneyStore } from '../store/journeyStore';
import { useLearningStore } from '../store/learningStore';
import { CERTIFICATION_TIER_DEFINITIONS } from '../types/certificates';

export interface Stats {
  articlesRead: number;
  totalWords: number;
  averageComprehension: number;
  bestWPM: number;
  tiersEarned: number;
}

export function useStats(): Stats {
  const { articleProgress, getHighestWPM } = useLearningStore();
  const { certProgress } = useJourneyStore();

  // Count completed articles
  const articlesRead = Object.values(articleProgress).filter((p) => p.completed).length;

  // Estimate total words (1000 per article)
  const totalWords = Object.values(articleProgress).reduce((sum, p) => {
    return sum + (p.completed ? 1000 : 0);
  }, 0);

  // Calculate average comprehension accuracy
  const accuracyScores = Object.values(articleProgress)
    .filter((p) => p.completed && p.comprehensionScore > 0)
    .map((p) => p.comprehensionScore);
  const averageComprehension =
    accuracyScores.length > 0
      ? Math.round(accuracyScores.reduce((a, b) => a + b, 0) / accuracyScores.length)
      : 0;

  // Get highest WPM achieved
  const bestWPM = getHighestWPM();

  // Count certification tiers earned
  const tiersEarned = CERTIFICATION_TIER_DEFINITIONS.filter(
    (def) => certProgress[def.tier]?.examPassed
  ).length;

  return {
    articlesRead,
    totalWords,
    averageComprehension,
    bestWPM,
    tiersEarned,
  };
}
