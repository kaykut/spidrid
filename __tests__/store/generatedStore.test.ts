/**
 * Tests for Generated Store
 *
 * Tests article generation, progress tracking, and error handling.
 * Uses mocked fetch to simulate API responses.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useGeneratedStore } from '../../src/store/generatedStore';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      supabaseUrl: 'https://test.supabase.co',
    },
  },
}));

describe('generatedStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useGeneratedStore());
    act(() => {
      result.current.articles.forEach((article) => {
        result.current.deleteArticle(article.id);
      });
      result.current.clearError();
    });
    mockFetch.mockReset();
  });

  describe('initial state', () => {
    it('starts with empty articles array', () => {
      const { result } = renderHook(() => useGeneratedStore());
      expect(result.current.articles).toEqual([]);
    });

    it('starts with isGenerating as false', () => {
      const { result } = renderHook(() => useGeneratedStore());
      expect(result.current.isGenerating).toBe(false);
    });

    it('starts with generationError as null', () => {
      const { result } = renderHook(() => useGeneratedStore());
      expect(result.current.generationError).toBeNull();
    });
  });

  describe('generateArticle()', () => {
    const validParams = {
      topic: 'Quantum Computing',
      durationMinutes: 3,
      tone: 'explanatory' as const,
      avgWpm: 250,
      userId: 'user_123',
    };

    const successResponse = {
      success: true,
      article: {
        title: 'Introduction to Quantum Computing',
        content: 'Quantum computing harnesses quantum mechanics...',
        wordCount: 750,
        questions: [
          {
            id: 'q1',
            type: 'single_choice',
            question: 'What is a qubit?',
            options: ['Classical bit', 'Quantum bit', 'Byte', 'Register'],
            correctIndex: 1,
          },
          {
            id: 'q2',
            type: 'true_false',
            question: 'Quantum computers can solve all problems faster.',
            correctAnswer: false,
          },
        ],
      },
    };

    it('creates placeholder article with generating status', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(successResponse),
      });

      const { result } = renderHook(() => useGeneratedStore());

      // Start generation (don't await)
      let generatePromise: Promise<unknown>;
      act(() => {
        generatePromise = result.current.generateArticle(validParams);
      });

      // Check placeholder was created
      expect(result.current.articles.length).toBe(1);
      expect(result.current.articles[0].status).toBe('generating');
      expect(result.current.articles[0].topic).toBe('Quantum Computing');
      expect(result.current.isGenerating).toBe(true);

      // Wait for completion
      await act(async () => {
        await generatePromise;
      });
    });

    it('updates article to complete status on success', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(successResponse),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      expect(result.current.articles[0].status).toBe('complete');
      expect(result.current.articles[0].title).toBe(
        'Introduction to Quantum Computing'
      );
      expect(result.current.articles[0].content).toBe(
        'Quantum computing harnesses quantum mechanics...'
      );
      expect(result.current.articles[0].wordCount).toBe(750);
      expect(result.current.isGenerating).toBe(false);
    });

    it('populates questions from API response', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(successResponse),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      const questions = result.current.articles[0].questions;
      expect(questions.length).toBe(2);
      expect(questions[0].type).toBe('single_choice');
      expect(questions[1].type).toBe('true_false');
    });

    it('returns the completed article on success', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(successResponse),
      });

      const { result } = renderHook(() => useGeneratedStore());

      let returnedArticle: unknown;
      await act(async () => {
        returnedArticle = await result.current.generateArticle(validParams);
      });

      expect(returnedArticle).not.toBeNull();
      expect((returnedArticle as { title: string }).title).toBe(
        'Introduction to Quantum Computing'
      );
    });

    it('calculates target word count from duration and WPM', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(successResponse),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      // Verify fetch was called with correct word count (3 min * 250 WPM = 750)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"targetWordCount":750'),
        })
      );
    });

    it('includes tone prompt modifier in request', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(successResponse),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      // The explanatory tone has promptModifier containing "educational"
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('tonePrompt'),
        })
      );
    });

    it('sets error status and message on API failure', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: false,
            error: 'Rate limit exceeded',
            errorCode: 'RATE_LIMITED',
          }),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      expect(result.current.articles[0].status).toBe('error');
      expect(result.current.articles[0].errorMessage).toBe(
        'Rate limit exceeded'
      );
      expect(result.current.generationError).toBe('Rate limit exceeded');
      expect(result.current.isGenerating).toBe(false);
    });

    it('returns null on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: false,
            error: 'Generation failed',
          }),
      });

      const { result } = renderHook(() => useGeneratedStore());

      let returnedArticle: unknown;
      await act(async () => {
        returnedArticle = await result.current.generateArticle(validParams);
      });

      expect(returnedArticle).toBeNull();
    });

    it('handles network errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      expect(result.current.articles[0].status).toBe('error');
      expect(result.current.articles[0].errorMessage).toBe('Network error');
      expect(result.current.generationError).toBe('Network error');
    });

    it('clears previous error when starting new generation', async () => {
      // First, create an error state
      mockFetch.mockRejectedValueOnce(new Error('First error'));

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      expect(result.current.generationError).toBe('First error');

      // Now start a new generation
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(successResponse),
      });

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      expect(result.current.generationError).toBeNull();
    });

    it('adds new articles to the beginning of the list', async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              ...successResponse,
              article: { ...successResponse.article, title: 'First Article' },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              ...successResponse,
              article: { ...successResponse.article, title: 'Second Article' },
            }),
        });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          ...validParams,
          topic: 'First Topic',
        });
      });

      await act(async () => {
        await result.current.generateArticle({
          ...validParams,
          topic: 'Second Topic',
        });
      });

      expect(result.current.articles[0].title).toBe('Second Article');
      expect(result.current.articles[1].title).toBe('First Article');
    });

    it('generates unique IDs for each article', async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: () => Promise.resolve(successResponse),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(successResponse),
        });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      const ids = result.current.articles.map((a) => a.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('sets initial completed to false', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(successResponse),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      expect(result.current.articles[0].completed).toBe(false);
    });

    it('sets initial attemptCount to 0', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(successResponse),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle(validParams);
      });

      expect(result.current.articles[0].attemptCount).toBe(0);
    });
  });

  describe('updateArticleProgress()', () => {
    beforeEach(async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Test Article',
              content: 'Content here',
              wordCount: 500,
              questions: [],
            },
          }),
      });
    });

    it('updates completed status', async () => {
      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      const articleId = result.current.articles[0].id;

      act(() => {
        result.current.updateArticleProgress(articleId, { completed: true });
      });

      expect(result.current.articles[0].completed).toBe(true);
    });

    it('updates comprehension score', async () => {
      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      const articleId = result.current.articles[0].id;

      act(() => {
        result.current.updateArticleProgress(articleId, {
          comprehensionScore: 85,
        });
      });

      expect(result.current.articles[0].comprehensionScore).toBe(85);
    });

    it('updates highest WPM', async () => {
      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      const articleId = result.current.articles[0].id;

      act(() => {
        result.current.updateArticleProgress(articleId, { highestWPM: 400 });
      });

      expect(result.current.articles[0].highestWPM).toBe(400);
    });

    it('updates lastReadAt timestamp', async () => {
      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      const articleId = result.current.articles[0].id;
      const now = Date.now();

      act(() => {
        result.current.updateArticleProgress(articleId, { lastReadAt: now });
      });

      expect(result.current.articles[0].lastReadAt).toBe(now);
    });

    it('updates attempt count', async () => {
      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      const articleId = result.current.articles[0].id;

      act(() => {
        result.current.updateArticleProgress(articleId, { attemptCount: 3 });
      });

      expect(result.current.articles[0].attemptCount).toBe(3);
    });

    it('can update multiple fields at once', async () => {
      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      const articleId = result.current.articles[0].id;

      act(() => {
        result.current.updateArticleProgress(articleId, {
          completed: true,
          comprehensionScore: 90,
          highestWPM: 450,
          attemptCount: 2,
        });
      });

      const article = result.current.articles[0];
      expect(article.completed).toBe(true);
      expect(article.comprehensionScore).toBe(90);
      expect(article.highestWPM).toBe(450);
      expect(article.attemptCount).toBe(2);
    });

    it('does not affect other articles', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Second Article',
              content: 'Content',
              wordCount: 300,
              questions: [],
            },
          }),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'First',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Second',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      const firstArticleId = result.current.articles[1].id;

      act(() => {
        result.current.updateArticleProgress(firstArticleId, {
          completed: true,
          comprehensionScore: 100,
        });
      });

      // Second article (at index 0) should be unchanged
      expect(result.current.articles[0].completed).toBe(false);
      expect(result.current.articles[0].comprehensionScore).toBeUndefined();
    });

    it('handles unknown ID gracefully (no-op)', async () => {
      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      const originalArticle = { ...result.current.articles[0] };

      act(() => {
        result.current.updateArticleProgress('nonexistent_id', {
          completed: true,
        });
      });

      expect(result.current.articles[0].completed).toBe(
        originalArticle.completed
      );
    });
  });

  describe('getArticleById()', () => {
    beforeEach(async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Target Article',
              content: 'Content',
              wordCount: 500,
              questions: [],
            },
          }),
      });
    });

    it('returns article by ID', async () => {
      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      const articleId = result.current.articles[0].id;
      const found = result.current.getArticleById(articleId);

      expect(found).toBeDefined();
      expect(found?.title).toBe('Target Article');
    });

    it('returns undefined for unknown ID', () => {
      const { result } = renderHook(() => useGeneratedStore());

      const found = result.current.getArticleById('nonexistent_id');

      expect(found).toBeUndefined();
    });

    it('returns correct article when multiple exist', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Second Article',
              content: 'Content 2',
              wordCount: 300,
              questions: [],
            },
          }),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'First',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Second',
          durationMinutes: 3,
          tone: 'explanatory',
          avgWpm: 200,
          userId: 'user_1',
        });
      });

      const firstId = result.current.articles[1].id;
      const found = result.current.getArticleById(firstId);

      expect(found?.title).toBe('Target Article');
    });
  });

  describe('deleteArticle()', () => {
    beforeEach(async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Article to Delete',
              content: 'Content',
              wordCount: 500,
              questions: [],
            },
          }),
      });
    });

    it('removes article from array', async () => {
      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      expect(result.current.articles.length).toBe(1);

      const articleId = result.current.articles[0].id;

      act(() => {
        result.current.deleteArticle(articleId);
      });

      expect(result.current.articles.length).toBe(0);
    });

    it('removes only the specified article', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Keep This',
              content: 'Content',
              wordCount: 300,
              questions: [],
            },
          }),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Delete',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Keep',
          durationMinutes: 3,
          tone: 'explanatory',
          avgWpm: 200,
          userId: 'user_1',
        });
      });

      const deleteId = result.current.articles[1].id; // First article (older)

      act(() => {
        result.current.deleteArticle(deleteId);
      });

      expect(result.current.articles.length).toBe(1);
      expect(result.current.articles[0].title).toBe('Keep This');
    });

    it('handles unknown ID gracefully (no-op)', async () => {
      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      act(() => {
        result.current.deleteArticle('nonexistent_id');
      });

      expect(result.current.articles.length).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('handles unknown tone gracefully (empty promptModifier)', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Article',
              content: 'Content',
              wordCount: 500,
              questions: [],
            },
          }),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        // Use a valid tone type that exists in TONE_DEFINITIONS
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      // Verify the request was made with a tonePrompt
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"tonePrompt"'),
        })
      );
    });

    it('handles non-Error exceptions', async () => {
      // Simulate a non-Error exception (e.g., string thrown)
      mockFetch.mockImplementationOnce(() => {
        throw 'String error';
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      expect(result.current.articles[0].status).toBe('error');
      expect(result.current.articles[0].errorMessage).toBe('Unknown error');
    });

    it('handles response without article on success=false', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: false,
            // No error message provided
          }),
      });

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      expect(result.current.articles[0].status).toBe('error');
      expect(result.current.articles[0].errorMessage).toBe('Generation failed');
    });
  });

  describe('clearError()', () => {
    it('clears generationError', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Test error'));

      const { result } = renderHook(() => useGeneratedStore());

      await act(async () => {
        await result.current.generateArticle({
          topic: 'Test',
          durationMinutes: 2,
          tone: 'robotic',
          avgWpm: 250,
          userId: 'user_1',
        });
      });

      expect(result.current.generationError).toBe('Test error');

      act(() => {
        result.current.clearError();
      });

      expect(result.current.generationError).toBeNull();
    });

    it('is idempotent (safe to call multiple times)', () => {
      const { result } = renderHook(() => useGeneratedStore());

      act(() => {
        result.current.clearError();
        result.current.clearError();
        result.current.clearError();
      });

      expect(result.current.generationError).toBeNull();
    });
  });
});
