/**
 * Curriculum Store
 *
 * Manages multi-article learning paths (curricula).
 * Handles creation, article generation, progress tracking, and persistence.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Curriculum,
  CurriculumArticle,
  CurriculumCreationInput,
  CurriculumOutline,
  CurriculumContext,
  ArticleGenerationStatus,
  durationToWordCount,
} from '../types/curriculum';
import { TONE_DEFINITIONS } from '../types/generated';
import { Question } from '../types/learning';

const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl || '';

// =============================================================================
// ID Generation
// =============================================================================

const generateCurriculumId = () =>
  `curr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

const generateArticleId = (curriculumId: string, index: number) =>
  `${curriculumId}-article-${index}`;

// =============================================================================
// Types
// =============================================================================

interface GenerationProgress {
  current: number;
  total: number;
  message: string;
}

interface CurriculumState {
  curricula: Record<string, Curriculum>;
  isGenerating: boolean;
  generationProgress: GenerationProgress | null;
  generationError: string | null;
}

interface CurriculumActions {
  createCurriculum: (input: CurriculumCreationInput, avgWpm: number) => Promise<string | null>;
  getCurriculum: (id: string) => Curriculum | undefined;
  getAllCurricula: () => Curriculum[];
  deleteCurriculum: (id: string) => void;
  markArticleCompleted: (curriculumId: string, articleIndex: number, score: number, wpm: number) => void;
  generateArticle: (curriculumId: string, articleIndex: number) => Promise<void>;
  clearError: () => void;
  // Testing and recovery
  addCurriculum: (curriculum: Curriculum) => void;
  clearAllCurricula: () => void;
  recoverStaleGenerations: () => void;
}

type CurriculumStore = CurriculumState & CurriculumActions;

// =============================================================================
// API Types
// =============================================================================

interface OutlineResponse {
  success: boolean;
  outline?: CurriculumOutline;
  error?: string;
}

interface ArticleResponse {
  success: boolean;
  article?: {
    title: string;
    content: string;
    wordCount: number;
    questions: Question[];
  };
  error?: string;
}

// =============================================================================
// Store Implementation
// =============================================================================

export const useCurriculumStore = create<CurriculumStore>()(
  persist(
    (set, get) => ({
      // Initial state
      curricula: {},
      isGenerating: false,
      generationProgress: null,
      generationError: null,

      // =======================================================================
      // Create Curriculum
      // =======================================================================
      createCurriculum: async (input, avgWpm) => {
        const { goal, articleCount, tone, durationMinutes } = input;
        const targetWordCount = durationToWordCount(durationMinutes, avgWpm);
        const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === tone);

        const curriculumId = generateCurriculumId();

        // Create placeholder curriculum with placeholder articles
        const placeholderArticles: CurriculumArticle[] = Array.from(
          { length: articleCount },
          (_, i) => ({
            id: generateArticleId(curriculumId, i),
            curriculumId,
            orderIndex: i,
            title: `Article ${i + 1}`,
            summary: '',
            content: '',
            wordCount: targetWordCount,
            questions: [],
            generationStatus: 'pending' as ArticleGenerationStatus,
            completionStatus: i === 0 ? 'unlocked' : 'locked',
          })
        );

        const placeholderCurriculum: Curriculum = {
          id: curriculumId,
          title: '',
          goal,
          articleCount,
          tone,
          targetWordCount,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          currentArticleIndex: 0,
          completedArticleCount: 0,
          isCompleted: false,
          articles: placeholderArticles,
        };

        // Update state with placeholder
        set({
          isGenerating: true,
          generationProgress: { current: 0, total: articleCount + 1, message: 'Creating outline...' },
          generationError: null,
          curricula: { ...get().curricula, [curriculumId]: placeholderCurriculum },
        });

        try {
          // Step 1: Generate outline
          const outlineResponse = await fetch(`${SUPABASE_URL}/functions/v1/generate-curriculum-outline`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              goal,
              articleCount,
              tone,
              tonePrompt: toneDefinition?.promptModifier || '',
            }),
          });

          const outlineResult: OutlineResponse = await outlineResponse.json();

          if (!outlineResult.success || !outlineResult.outline) {
            throw new Error(outlineResult.error || 'Failed to generate outline');
          }

          const outline = outlineResult.outline;

          // Update curriculum with outline
          set((state) => {
            const curr = state.curricula[curriculumId];
            if (!curr) {return state;}

            return {
              curricula: {
                ...state.curricula,
                [curriculumId]: {
                  ...curr,
                  title: outline.curriculumTitle,
                  outline,
                  articles: curr.articles.map((a, i) => ({
                    ...a,
                    title: outline.articles[i]?.title || a.title,
                    summary: outline.articles[i]?.summary || '',
                  })),
                  updatedAt: Date.now(),
                },
              },
              generationProgress: {
                current: 1,
                total: articleCount + 1,
                message: 'Generating article 1...',
              },
            };
          });

          // Step 2: Generate first two articles
          const articlesToGenerate = Math.min(2, articleCount);
          for (let i = 0; i < articlesToGenerate; i++) {
            set(() => ({
              generationProgress: {
                current: i + 2,
                total: articleCount + 1,
                message: `Generating article ${i + 1}...`,
              },
            }));

            await get().generateArticle(curriculumId, i);
          }

          // Success - clear progress
          set({
            isGenerating: false,
            generationProgress: null,
          });

          return curriculumId;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';

          // Clean up failed curriculum
          set((state) => {
            const { [curriculumId]: _, ...rest } = state.curricula;
            return {
              curricula: rest,
              isGenerating: false,
              generationProgress: null,
              generationError: errorMessage,
            };
          });

          return null;
        }
      },

      // =======================================================================
      // Get Curriculum
      // =======================================================================
      getCurriculum: (id) => {
        return get().curricula[id];
      },

      // =======================================================================
      // Get All Curricula
      // =======================================================================
      getAllCurricula: () => {
        return Object.values(get().curricula).sort((a, b) => b.createdAt - a.createdAt);
      },

      // =======================================================================
      // Delete Curriculum
      // =======================================================================
      deleteCurriculum: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.curricula;
          return { curricula: rest };
        });
      },

      // =======================================================================
      // Mark Article Completed
      // =======================================================================
      markArticleCompleted: (curriculumId, articleIndex, score, wpm) => {
        set((state) => {
          const curriculum = state.curricula[curriculumId];
          if (!curriculum) {return state;}

          const updatedArticles = curriculum.articles.map((a, i) => {
            if (i === articleIndex) {
              return {
                ...a,
                completionStatus: 'completed' as const,
                completedAt: Date.now(),
                comprehensionScore: score,
                readingWPM: wpm,
              };
            }
            // Unlock next article
            if (i === articleIndex + 1 && a.completionStatus === 'locked') {
              return { ...a, completionStatus: 'unlocked' as const };
            }
            return a;
          });

          const completedCount = updatedArticles.filter(
            (a) => a.completionStatus === 'completed'
          ).length;

          return {
            curricula: {
              ...state.curricula,
              [curriculumId]: {
                ...curriculum,
                articles: updatedArticles,
                completedArticleCount: completedCount,
                currentArticleIndex: Math.min(articleIndex + 1, curriculum.articleCount - 1),
                isCompleted: completedCount === curriculum.articleCount,
                updatedAt: Date.now(),
              },
            },
          };
        });

        // Trigger pre-generation of article N+2 (background, don't await)
        const curriculum = get().curricula[curriculumId];
        if (curriculum) {
          const pregenIndex = articleIndex + 2;
          if (
            pregenIndex < curriculum.articleCount &&
            curriculum.articles[pregenIndex]?.generationStatus === 'pending'
          ) {
            // Fire and forget
            get().generateArticle(curriculumId, pregenIndex);
          }
        }
      },

      // =======================================================================
      // Generate Article
      // =======================================================================
      generateArticle: async (curriculumId, articleIndex) => {
        const curriculum = get().curricula[curriculumId];
        if (!curriculum || !curriculum.outline) {return;}

        const articleOutline = curriculum.outline.articles[articleIndex];
        if (!articleOutline) {return;}

        const article = curriculum.articles[articleIndex];
        if (!article || article.generationStatus === 'generating') {return;}

        // Mark as generating with timestamp
        set((state) => {
          const curr = state.curricula[curriculumId];
          if (!curr) {return state;}

          return {
            curricula: {
              ...state.curricula,
              [curriculumId]: {
                ...curr,
                articles: curr.articles.map((a, i) =>
                  i === articleIndex
                    ? { ...a, generationStatus: 'generating' as const, generationStartedAt: Date.now() }
                    : a
                ),
              },
            },
          };
        });

        try {
          const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === curriculum.tone);
          const prevArticle = articleIndex > 0 ? curriculum.articles[articleIndex - 1] : null;

          // Build curriculum context for the article generation
          const curriculumContext: CurriculumContext = {
            curriculumTitle: curriculum.title,
            articleTitle: articleOutline.title,
            articleSummary: articleOutline.summary,
            keyConceptsToIntroduce: articleOutline.keyConceptsToIntroduce,
            prerequisiteConcepts: articleOutline.prerequisiteConcepts,
            previousArticleSummary: prevArticle?.summary || null,
            position: `${articleIndex + 1} of ${curriculum.articleCount}`,
          };

          const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-article`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              topic: `${curriculum.goal} - ${articleOutline.title}`,
              targetWordCount: curriculum.targetWordCount,
              tone: curriculum.tone,
              tonePrompt: toneDefinition?.promptModifier || '',
              userId: 'curriculum-gen',
              curriculumContext,
            }),
          });

          const result: ArticleResponse = await response.json();

          if (!result.success || !result.article) {
            throw new Error(result.error || 'Generation failed');
          }

          // Update article with generated content
          set((state) => {
            const curr = state.curricula[curriculumId];
            if (!curr) {return state;}

            return {
              curricula: {
                ...state.curricula,
                [curriculumId]: {
                  ...curr,
                  articles: curr.articles.map((a, i) =>
                    i === articleIndex
                      ? {
                          ...a,
                          title: result.article!.title,
                          content: result.article!.content,
                          wordCount: result.article!.wordCount,
                          questions: result.article!.questions,
                          generationStatus: 'generated' as const,
                          generatedAt: Date.now(),
                        }
                      : a
                  ),
                  updatedAt: Date.now(),
                },
              },
            };
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';

          // Mark as failed
          set((state) => {
            const curr = state.curricula[curriculumId];
            if (!curr) {return state;}

            return {
              curricula: {
                ...state.curricula,
                [curriculumId]: {
                  ...curr,
                  articles: curr.articles.map((a, i) =>
                    i === articleIndex
                      ? {
                          ...a,
                          generationStatus: 'failed' as const,
                          generationError: errorMessage,
                        }
                      : a
                  ),
                },
              },
            };
          });
        }
      },

      // =======================================================================
      // Clear Error
      // =======================================================================
      clearError: () => {
        set({ generationError: null });
      },

      // =======================================================================
      // Add Curriculum (for testing and direct import)
      // =======================================================================
      addCurriculum: (curriculum) => {
        set((state) => ({
          curricula: { ...state.curricula, [curriculum.id]: curriculum },
        }));
      },

      // =======================================================================
      // Clear All Curricula (for testing)
      // =======================================================================
      clearAllCurricula: () => {
        set({ curricula: {} });
      },

      // =======================================================================
      // Recover Stale Generations
      // =======================================================================
      // Reset articles stuck in 'generating' for >10 minutes to 'pending'
      recoverStaleGenerations: () => {
        const TEN_MINUTES = 10 * 60 * 1000;
        const now = Date.now();

        set((state) => {
          const updatedCurricula = { ...state.curricula };
          let hasChanges = false;

          for (const curriculumId of Object.keys(updatedCurricula)) {
            const curriculum = updatedCurricula[curriculumId];
            const updatedArticles = curriculum.articles.map((article) => {
              if (
                article.generationStatus === 'generating' &&
                article.generationStartedAt &&
                now - article.generationStartedAt > TEN_MINUTES
              ) {
                hasChanges = true;
                return {
                  ...article,
                  generationStatus: 'pending' as const,
                  generationStartedAt: undefined,
                };
              }
              return article;
            });

            if (hasChanges) {
              updatedCurricula[curriculumId] = {
                ...curriculum,
                articles: updatedArticles,
              };
            }
          }

          return hasChanges ? { curricula: updatedCurricula } : state;
        });
      },
    }),
    {
      name: 'spidrid-curriculum',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist curricula, not UI state
        curricula: state.curricula,
      }),
    }
  )
);
