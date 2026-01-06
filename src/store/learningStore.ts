import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArticleProgress, TopicProgress } from '../types/learning';
import { TOPICS, getArticlesByTopic } from '../data/curriculum';

interface LearningStore {
  // State
  articleProgress: Record<string, ArticleProgress>;
  currentArticleId: string | null;
  currentWPM: number;

  // Actions
  setCurrentArticle: (articleId: string | null) => void;
  setCurrentWPM: (wpm: number) => void;
  completeArticle: (articleId: string, score: number, wpm: number) => void;
  getArticleProgress: (articleId: string) => ArticleProgress | null;
  getTopicProgress: (topicId: string) => TopicProgress;
  getTotalArticlesCompleted: () => number;
  getHighestWPM: () => number;
  resetProgress: () => void;
}

export const useLearningStore = create<LearningStore>()(
  persist(
    (set, get) => ({
      articleProgress: {},
      currentArticleId: null,
      currentWPM: 250,

      setCurrentArticle: (articleId) => {
        set({ currentArticleId: articleId });
      },

      setCurrentWPM: (wpm) => {
        set({ currentWPM: wpm });
      },

      completeArticle: (articleId, score, wpm) => {
        set((state) => {
          const existing = state.articleProgress[articleId];
          const newProgress: ArticleProgress = {
            articleId,
            completed: true,
            comprehensionScore: score,
            highestWPM: existing ? Math.max(existing.highestWPM, wpm) : wpm,
            lastReadAt: Date.now(),
          };
          return {
            articleProgress: {
              ...state.articleProgress,
              [articleId]: newProgress,
            },
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

      resetProgress: () => {
        set({ articleProgress: {}, currentArticleId: null });
      },
    }),
    {
      name: 'spidrid-learning',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        articleProgress: state.articleProgress,
        currentWPM: state.currentWPM,
      }),
    }
  )
);
