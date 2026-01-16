import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  GeneratedArticle,
  ArticleTone,
  GenerationStatus,
  GenerateArticleResponse,
  TONE_DEFINITIONS,
} from '../types/generated';
import { useAuthStore } from './authStore';

const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl || '';

const generateId = () => `gen_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

interface GeneratedState {
  articles: GeneratedArticle[];
  isGenerating: boolean;
  generationError: string | null;
}

interface GeneratedActions {
  generateArticle: (params: {
    topic: string;
    durationMinutes: number;
    tone: ArticleTone;
    avgWpm: number;
    userId: string;
  }) => Promise<GeneratedArticle | null>;
  updateArticleProgress: (
    id: string,
    updates: Partial<
      Pick<GeneratedArticle, 'completed' | 'comprehensionScore' | 'highestWPM' | 'lastReadAt' | 'attemptCount'>
    >
  ) => void;
  getArticleById: (id: string) => GeneratedArticle | undefined;
  deleteArticle: (id: string) => void;
  clearError: () => void;
  clearAllArticles: () => void;
}

type GeneratedStore = GeneratedState & GeneratedActions;

export const useGeneratedStore = create<GeneratedStore>()(
  persist(
    (set, get) => ({
      articles: [],
      isGenerating: false,
      generationError: null,

      generateArticle: async ({ topic, durationMinutes, tone, avgWpm, userId }) => {
        const targetWordCount = Math.round(durationMinutes * avgWpm);
        const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === tone);

        const placeholderId = generateId();
        const placeholderArticle: GeneratedArticle = {
          id: placeholderId,
          topic,
          targetDuration: durationMinutes,
          tone,
          title: '',
          content: '',
          wordCount: 0,
          questions: [],
          status: 'generating',
          generatedAt: Date.now(),
          completed: false,
          attemptCount: 0,
        };

        set({ isGenerating: true, generationError: null });
        set((state) => ({ articles: [placeholderArticle, ...state.articles] }));

        try {
          // Get access token for authenticated API call
          const token = await useAuthStore.getState().getAccessToken();
          if (!token) {
            throw new Error('Not authenticated');
          }

          const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-article`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              topic,
              targetWordCount,
              tone,
              tonePrompt: toneDefinition?.promptModifier || '',
              userId,
            }),
          });

          const result: GenerateArticleResponse = await response.json();

          if (!result.success || !result.article) {
            throw new Error(result.error || 'Generation failed');
          }

          const completedArticle: GeneratedArticle = {
            ...placeholderArticle,
            title: result.article.title,
            content: result.article.content,
            wordCount: result.article.wordCount,
            questions: result.article.questions,
            status: 'complete',
          };

          set((state) => ({
            articles: state.articles.map((a) => (a.id === placeholderId ? completedArticle : a)),
            isGenerating: false,
          }));

          return completedArticle;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';

          set((state) => ({
            articles: state.articles.map((a) =>
              a.id === placeholderId ? { ...a, status: 'error' as GenerationStatus, errorMessage } : a
            ),
            isGenerating: false,
            generationError: errorMessage,
          }));

          return null;
        }
      },

      updateArticleProgress: (id, updates) => {
        set((state) => ({
          articles: state.articles.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        }));
      },

      getArticleById: (id) => {
        return get().articles.find((a) => a.id === id);
      },

      deleteArticle: (id) => {
        set((state) => ({
          articles: state.articles.filter((a) => a.id !== id),
        }));
      },

      clearError: () => {
        set({ generationError: null });
      },

      clearAllArticles: () => {
        set({ articles: [], isGenerating: false, generationError: null });
      },
    }),
    {
      name: 'spidrid-generated',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        articles: state.articles.filter((a) => a.status === 'complete'),
      }),
    }
  )
);
