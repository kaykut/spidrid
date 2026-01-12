import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getArticlesByTopic } from '../data/curriculum';
import {
  ArticleProgress,
  TopicProgress,
  ArticleAttempt,
  isPassing,
} from '../types/learning';

/**
 * Recent performance stats (for certification readiness detection)
 */
export interface RecentPerformance {
  averageWPM: number;
  averageAccuracy: number;
  articleCount: number;
}

interface LearningStore {
  // State
  articleProgress: Record<string, ArticleProgress>;
  currentArticleId: string | null;
  currentWPM: number;
  /** History of recent completions for performance tracking */
  recentCompletions: Array<{
    articleId: string;
    wpm: number;
    score: number;
    timestamp: number;
    isCertificationText: boolean;
  }>;

  // Actions
  setCurrentArticle: (articleId: string | null) => void;
  setCurrentWPM: (wpm: number) => void;

  /**
   * Complete an article with score and WPM
   * @param articleId Article ID
   * @param score Comprehension score (0-100)
   * @param wpm Reading speed
   * @param isCertificationText Whether this is a certification text (first attempt tracked specially)
   */
  completeArticle: (
    articleId: string,
    score: number,
    wpm: number,
    isCertificationText?: boolean
  ) => void;

  getArticleProgress: (articleId: string) => ArticleProgress | null;
  getTopicProgress: (topicId: string) => TopicProgress;
  getTotalArticlesCompleted: () => number;
  getHighestWPM: () => number;

  /**
   * Get number of times an article has been read
   */
  getArticleAttemptCount: (articleId: string) => number;

  /**
   * Check if a certification article's first attempt is still available
   */
  isCertificationAttemptAvailable: (articleId: string) => boolean;

  /**
   * Get recent practice performance (for certification readiness detection)
   * @param count Number of recent articles to consider (default 5)
   */
  getRecentPerformance: (count?: number) => RecentPerformance;

  /**
   * Check if an article is unlocked based on linear progression
   */
  isArticleUnlocked: (articleId: string) => boolean;

  resetProgress: () => void;

  // Testing only - directly set state for persona testing
  hydrateForTesting: (state: {
    articleProgress: Record<string, ArticleProgress>;
    currentWPM: number;
    recentCompletions: Array<{
      articleId: string;
      wpm: number;
      score: number;
      timestamp: number;
      isCertificationText: boolean;
    }>;
  }) => void;
}

export const useLearningStore = create<LearningStore>()(
  persist(
    (set, get) => ({
      articleProgress: {},
      currentArticleId: null,
      currentWPM: 250,
      recentCompletions: [],

      setCurrentArticle: (articleId) => {
        set({ currentArticleId: articleId });
      },

      setCurrentWPM: (wpm) => {
        set({ currentWPM: wpm });
      },

      completeArticle: (articleId, score, wpm, isCertificationText = false) => {
        set((state) => {
          const existing = state.articleProgress[articleId];
          const now = Date.now();

          // Build attempt record
          const attempt: ArticleAttempt = {
            timestamp: now,
            score,
            wpm,
            isCertificationAttempt: isCertificationText && !existing?.certificationAttemptUsed,
          };

          // Build new progress
          const newProgress: ArticleProgress = {
            articleId,
            completed: existing?.completed || isPassing(score),
            comprehensionScore: existing
              ? Math.max(existing.comprehensionScore, score)
              : score,
            highestWPM: existing ? Math.max(existing.highestWPM, wpm) : wpm,
            lastReadAt: now,
            attemptCount: (existing?.attemptCount || 0) + 1,
            attempts: [...(existing?.attempts || []), attempt],
            // Certification tracking - only set on first attempt
            certificationAttemptUsed: isCertificationText
              ? true
              : existing?.certificationAttemptUsed,
            certificationAttemptScore: isCertificationText && !existing?.certificationAttemptUsed
              ? score
              : existing?.certificationAttemptScore,
            certificationAttemptWPM: isCertificationText && !existing?.certificationAttemptUsed
              ? wpm
              : existing?.certificationAttemptWPM,
          };

          // Add to recent completions (keep last 20)
          const newRecentCompletions = [
            ...state.recentCompletions,
            {
              articleId,
              wpm,
              score,
              timestamp: now,
              isCertificationText,
            },
          ].slice(-20);

          return {
            articleProgress: {
              ...state.articleProgress,
              [articleId]: newProgress,
            },
            recentCompletions: newRecentCompletions,
          };
        });
      },

      getArticleProgress: (articleId) => {
        return get().articleProgress[articleId] || null;
      },

      getTopicProgress: (topicId) => {
        const articles = getArticlesByTopic(topicId);
        const progress = get().articleProgress;

        let completed = 0;
        let totalScore = 0;

        articles.forEach((article) => {
          const p = progress[article.id];
          if (p?.completed) {
            completed++;
            totalScore += p.comprehensionScore;
          }
        });

        return {
          topicId,
          articlesCompleted: completed,
          totalArticles: articles.length,
          averageScore: completed > 0 ? Math.round(totalScore / completed) : 0,
        };
      },

      getTotalArticlesCompleted: () => {
        const progress = get().articleProgress;
        return Object.values(progress).filter(p => p.completed).length;
      },

      getHighestWPM: () => {
        const progress = get().articleProgress;
        const wpmValues = Object.values(progress).map(p => p.highestWPM);
        return wpmValues.length > 0 ? Math.max(...wpmValues) : 0;
      },

      getArticleAttemptCount: (articleId) => {
        const progress = get().articleProgress[articleId];
        return progress?.attemptCount || 0;
      },

      isCertificationAttemptAvailable: (articleId) => {
        const progress = get().articleProgress[articleId];
        return !progress?.certificationAttemptUsed;
      },

      getRecentPerformance: (count = 5) => {
        const { recentCompletions } = get();

        // Filter to only practice articles (not certification texts)
        const practiceCompletions = recentCompletions
          .filter(c => !c.isCertificationText)
          .slice(-count);

        if (practiceCompletions.length === 0) {
          return { averageWPM: 0, averageAccuracy: 0, articleCount: 0 };
        }

        const totalWPM = practiceCompletions.reduce((sum, c) => sum + c.wpm, 0);
        const totalScore = practiceCompletions.reduce((sum, c) => sum + c.score, 0);

        return {
          averageWPM: Math.round(totalWPM / practiceCompletions.length),
          averageAccuracy: Math.round(totalScore / practiceCompletions.length),
          articleCount: practiceCompletions.length,
        };
      },

      // All articles are now unlocked - linear progression removed
      isArticleUnlocked: () => true,

      resetProgress: () => {
        set({
          articleProgress: {},
          currentArticleId: null,
          recentCompletions: [],
        });
      },

      hydrateForTesting: (testState) => {
        set({
          articleProgress: testState.articleProgress,
          currentWPM: testState.currentWPM,
          recentCompletions: testState.recentCompletions,
        });
      },
    }),
    {
      name: 'spidrid-learning',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        articleProgress: state.articleProgress,
        currentWPM: state.currentWPM,
        recentCompletions: state.recentCompletions,
      }),
    }
  )
);
