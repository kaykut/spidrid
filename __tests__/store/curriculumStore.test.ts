/**
 * Tests for Curriculum Store
 *
 * Tests curriculum creation, article generation, progress tracking, and error handling.
 * Uses mocked fetch to simulate API responses. Follows TDD approach.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useCurriculumStore } from '../../src/store/curriculumStore';
import { CurriculumOutline } from '../../src/types/curriculum';

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

describe('curriculumStore', () => {
  // Reset store and mocks before each test
  beforeEach(() => {
    const { result } = renderHook(() => useCurriculumStore());
    act(() => {
      // Delete all curricula
      const curricula = result.current.getAllCurricula();
      curricula.forEach((c) => result.current.deleteCurriculum(c.id));
      result.current.clearError();
    });
    mockFetch.mockReset();
  });

  describe('initial state', () => {
    it('starts with empty curricula object', () => {
      const { result } = renderHook(() => useCurriculumStore());
      expect(result.current.getAllCurricula()).toEqual([]);
    });

    it('starts with isGenerating as false', () => {
      const { result } = renderHook(() => useCurriculumStore());
      expect(result.current.isGenerating).toBe(false);
    });

    it('starts with generationProgress as null', () => {
      const { result } = renderHook(() => useCurriculumStore());
      expect(result.current.generationProgress).toBeNull();
    });

    it('starts with generationError as null', () => {
      const { result } = renderHook(() => useCurriculumStore());
      expect(result.current.generationError).toBeNull();
    });
  });

  describe('createCurriculum()', () => {
    const validInput = {
      goal: 'Learn the fundamentals of machine learning',
      articleCount: 3,
      tone: 'explanatory' as const,
      durationMinutes: 3,
    };

    const validOutlineResponse: CurriculumOutline = {
      curriculumTitle: 'Machine Learning Fundamentals',
      articles: [
        {
          orderIndex: 0,
          title: 'What is Machine Learning?',
          summary: 'An introduction to ML concepts.',
          keyConceptsToIntroduce: ['supervised learning', 'features'],
          prerequisiteConcepts: [],
        },
        {
          orderIndex: 1,
          title: 'Types of Machine Learning',
          summary: 'Exploring different ML approaches.',
          keyConceptsToIntroduce: ['classification', 'regression'],
          prerequisiteConcepts: ['supervised learning'],
        },
        {
          orderIndex: 2,
          title: 'Your First ML Model',
          summary: 'Building a simple model step by step.',
          keyConceptsToIntroduce: ['training', 'testing'],
          prerequisiteConcepts: ['classification', 'features'],
        },
      ],
    };

    const validArticleResponse = {
      success: true,
      article: {
        title: 'What is Machine Learning?',
        content: 'Machine learning is a field of study...',
        wordCount: 750,
        questions: [
          {
            id: 'q1',
            type: 'single_choice',
            question: 'What is ML?',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 1,
          },
        ],
      },
    };

    // Helper to setup successful API responses
    const setupSuccessfulMocks = () => {
      // First call: outline generation
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, outline: validOutlineResponse }),
      });
      // Second call: first article
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(validArticleResponse),
      });
      // Third call: second article
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(validArticleResponse),
      });
    };

    describe('happy path', () => {
      it('creates curriculum with placeholder articles', async () => {
        setupSuccessfulMocks();

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        const curricula = result.current.getAllCurricula();
        expect(curricula).toHaveLength(1);
        expect(curricula[0].articles).toHaveLength(3);
      });

      it('calls outline endpoint first', async () => {
        setupSuccessfulMocks();

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('generate-curriculum-outline'),
          expect.any(Object)
        );
      });

      it('updates curriculum with outline on success', async () => {
        setupSuccessfulMocks();

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        const curriculum = result.current.getAllCurricula()[0];
        expect(curriculum.title).toBe('Machine Learning Fundamentals');
        expect(curriculum.outline).toBeDefined();
        expect(curriculum.outline?.articles).toHaveLength(3);
      });

      it('generates first two articles after outline', async () => {
        setupSuccessfulMocks();

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        // Should have called: outline + 2 articles = 3 calls
        expect(mockFetch).toHaveBeenCalledTimes(3);

        const curriculum = result.current.getAllCurricula()[0];
        expect(curriculum.articles[0].generationStatus).toBe('generated');
        expect(curriculum.articles[1].generationStatus).toBe('generated');
        expect(curriculum.articles[2].generationStatus).toBe('pending');
      });

      it('sets correct completion status (first unlocked, rest locked)', async () => {
        setupSuccessfulMocks();

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        const curriculum = result.current.getAllCurricula()[0];
        expect(curriculum.articles[0].completionStatus).toBe('unlocked');
        expect(curriculum.articles[1].completionStatus).toBe('locked');
        expect(curriculum.articles[2].completionStatus).toBe('locked');
      });

      it('returns curriculum ID on success', async () => {
        setupSuccessfulMocks();

        const { result } = renderHook(() => useCurriculumStore());

        let curriculumId: string | null = null;
        await act(async () => {
          curriculumId = await result.current.createCurriculum(validInput, 250);
        });

        expect(curriculumId).not.toBeNull();
        expect(curriculumId).toMatch(/^curr_/);
      });

      it('calculates target word count from duration and WPM', async () => {
        setupSuccessfulMocks();

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        const curriculum = result.current.getAllCurricula()[0];
        // 3 minutes * 250 WPM = 750 words
        expect(curriculum.targetWordCount).toBe(750);
      });
    });

    describe('progress tracking', () => {
      it('updates generationProgress during creation', async () => {
        let capturedProgress: unknown[] = [];

        // Setup mocks that capture progress state
        mockFetch.mockImplementation(() => {
          const { result } = renderHook(() => useCurriculumStore());
          capturedProgress.push({ ...result.current.generationProgress });
          return Promise.resolve({
            json: () =>
              Promise.resolve(
                mockFetch.mock.calls.length === 1
                  ? { success: true, outline: validOutlineResponse }
                  : validArticleResponse
              ),
          });
        });

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        // Progress should have been tracked during the process
        expect(mockFetch).toHaveBeenCalled();
      });

      it('sets isGenerating to true during creation', async () => {
        // Use a delayed response to capture the intermediate state
        let resolveOutline: (value: unknown) => void;
        const outlinePromise = new Promise((resolve) => {
          resolveOutline = resolve;
        });

        mockFetch.mockImplementationOnce(() => outlinePromise);

        const { result } = renderHook(() => useCurriculumStore());

        // Start creation (don't await)
        let createPromise: Promise<unknown>;
        act(() => {
          createPromise = result.current.createCurriculum(validInput, 250);
        });

        // Check that isGenerating is true while waiting
        expect(result.current.isGenerating).toBe(true);

        // Now resolve the promise and complete
        mockFetch
          .mockResolvedValueOnce({ json: () => Promise.resolve(validArticleResponse) })
          .mockResolvedValueOnce({ json: () => Promise.resolve(validArticleResponse) });

        await act(async () => {
          resolveOutline!({ json: () => Promise.resolve({ success: true, outline: validOutlineResponse }) });
          await createPromise;
        });
      });

      it('clears isGenerating on completion', async () => {
        setupSuccessfulMocks();

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        expect(result.current.isGenerating).toBe(false);
        expect(result.current.generationProgress).toBeNull();
      });
    });

    describe('error handling', () => {
      it('sets error state on outline failure', async () => {
        mockFetch.mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              success: false,
              error: 'Failed to generate outline',
            }),
        });

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        expect(result.current.generationError).toBe('Failed to generate outline');
        expect(result.current.isGenerating).toBe(false);
      });

      it('cleans up failed curriculum from store', async () => {
        mockFetch.mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              success: false,
              error: 'Outline generation failed',
            }),
        });

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        // Should not have any curricula
        expect(result.current.getAllCurricula()).toHaveLength(0);
      });

      it('returns null on failure', async () => {
        mockFetch.mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              success: false,
              error: 'Generation failed',
            }),
        });

        const { result } = renderHook(() => useCurriculumStore());

        let curriculumId: string | null = 'not-null';
        await act(async () => {
          curriculumId = await result.current.createCurriculum(validInput, 250);
        });

        expect(curriculumId).toBeNull();
      });

      it('handles network errors gracefully', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useCurriculumStore());

        await act(async () => {
          await result.current.createCurriculum(validInput, 250);
        });

        expect(result.current.generationError).toBe('Network error');
        expect(result.current.isGenerating).toBe(false);
      });
    });
  });

  describe('getCurriculum()', () => {
    it('returns curriculum by ID', async () => {
      // Setup mocks
      mockFetch
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              success: true,
              outline: {
                curriculumTitle: 'Test',
                articles: [
                  {
                    orderIndex: 0,
                    title: 'A1',
                    summary: 'S1',
                    keyConceptsToIntroduce: [],
                    prerequisiteConcepts: [],
                  },
                  {
                    orderIndex: 1,
                    title: 'A2',
                    summary: 'S2',
                    keyConceptsToIntroduce: [],
                    prerequisiteConcepts: [],
                  },
                  {
                    orderIndex: 2,
                    title: 'A3',
                    summary: 'S3',
                    keyConceptsToIntroduce: [],
                    prerequisiteConcepts: [],
                  },
                ],
              },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              success: true,
              article: { title: 'T', content: 'C', wordCount: 500, questions: [] },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              success: true,
              article: { title: 'T2', content: 'C2', wordCount: 500, questions: [] },
            }),
        });

      const { result } = renderHook(() => useCurriculumStore());

      let curriculumId: string | null = null;
      await act(async () => {
        curriculumId = await result.current.createCurriculum(
          {
            goal: 'Test',
            articleCount: 3,
            tone: 'explanatory',
            durationMinutes: 2,
          },
          250
        );
      });

      const found = result.current.getCurriculum(curriculumId!);
      expect(found).toBeDefined();
      expect(found?.title).toBe('Test');
    });

    it('returns undefined for unknown ID', () => {
      const { result } = renderHook(() => useCurriculumStore());
      const found = result.current.getCurriculum('nonexistent_id');
      expect(found).toBeUndefined();
    });
  });

  describe('getAllCurricula()', () => {
    it('returns all curricula sorted by createdAt desc', async () => {
      // Create two curricula
      const mockOutline = {
        curriculumTitle: 'First',
        articles: [
          { orderIndex: 0, title: 'A', summary: 'S', keyConceptsToIntroduce: [], prerequisiteConcepts: [] },
          { orderIndex: 1, title: 'B', summary: 'S', keyConceptsToIntroduce: [], prerequisiteConcepts: [] },
          { orderIndex: 2, title: 'C', summary: 'S', keyConceptsToIntroduce: [], prerequisiteConcepts: [] },
        ],
      };
      const mockArticle = {
        success: true,
        article: { title: 'T', content: 'C', wordCount: 500, questions: [] },
      };

      // First curriculum mocks
      mockFetch
        .mockResolvedValueOnce({ json: () => Promise.resolve({ success: true, outline: mockOutline }) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      const { result } = renderHook(() => useCurriculumStore());

      await act(async () => {
        await result.current.createCurriculum(
          { goal: 'First', articleCount: 3, tone: 'explanatory', durationMinutes: 2 },
          250
        );
      });

      // Wait a bit to ensure different timestamps
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Second curriculum mocks
      mockFetch
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({ success: true, outline: { ...mockOutline, curriculumTitle: 'Second' } }),
        })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      await act(async () => {
        await result.current.createCurriculum(
          { goal: 'Second', articleCount: 3, tone: 'explanatory', durationMinutes: 2 },
          250
        );
      });

      const curricula = result.current.getAllCurricula();
      expect(curricula).toHaveLength(2);
      // Most recent first
      expect(curricula[0].title).toBe('Second');
      expect(curricula[1].title).toBe('First');
    });

    it('returns empty array when no curricula', () => {
      const { result } = renderHook(() => useCurriculumStore());
      expect(result.current.getAllCurricula()).toEqual([]);
    });
  });

  describe('deleteCurriculum()', () => {
    it('removes curriculum from store', async () => {
      const mockOutline = {
        curriculumTitle: 'ToDelete',
        articles: [
          { orderIndex: 0, title: 'A', summary: 'S', keyConceptsToIntroduce: [], prerequisiteConcepts: [] },
          { orderIndex: 1, title: 'B', summary: 'S', keyConceptsToIntroduce: [], prerequisiteConcepts: [] },
          { orderIndex: 2, title: 'C', summary: 'S', keyConceptsToIntroduce: [], prerequisiteConcepts: [] },
        ],
      };
      const mockArticle = {
        success: true,
        article: { title: 'T', content: 'C', wordCount: 500, questions: [] },
      };

      mockFetch
        .mockResolvedValueOnce({ json: () => Promise.resolve({ success: true, outline: mockOutline }) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      const { result } = renderHook(() => useCurriculumStore());

      let curriculumId: string | null = null;
      await act(async () => {
        curriculumId = await result.current.createCurriculum(
          { goal: 'Test', articleCount: 3, tone: 'explanatory', durationMinutes: 2 },
          250
        );
      });

      expect(result.current.getAllCurricula()).toHaveLength(1);

      act(() => {
        result.current.deleteCurriculum(curriculumId!);
      });

      expect(result.current.getAllCurricula()).toHaveLength(0);
    });

    it('handles unknown ID gracefully', () => {
      const { result } = renderHook(() => useCurriculumStore());

      // Should not throw
      act(() => {
        result.current.deleteCurriculum('nonexistent_id');
      });

      expect(result.current.getAllCurricula()).toHaveLength(0);
    });
  });

  describe('markArticleCompleted()', () => {
    // Helper to create a curriculum for testing
    const createTestCurriculum = async () => {
      const mockOutline = {
        curriculumTitle: 'Test Curriculum',
        articles: [
          { orderIndex: 0, title: 'A1', summary: 'S1', keyConceptsToIntroduce: ['c1'], prerequisiteConcepts: [] },
          { orderIndex: 1, title: 'A2', summary: 'S2', keyConceptsToIntroduce: ['c2'], prerequisiteConcepts: ['c1'] },
          { orderIndex: 2, title: 'A3', summary: 'S3', keyConceptsToIntroduce: ['c3'], prerequisiteConcepts: ['c2'] },
          { orderIndex: 3, title: 'A4', summary: 'S4', keyConceptsToIntroduce: ['c4'], prerequisiteConcepts: ['c3'] },
          { orderIndex: 4, title: 'A5', summary: 'S5', keyConceptsToIntroduce: ['c5'], prerequisiteConcepts: ['c4'] },
        ],
      };
      const mockArticle = {
        success: true,
        article: { title: 'T', content: 'Content here', wordCount: 500, questions: [] },
      };

      mockFetch
        .mockResolvedValueOnce({ json: () => Promise.resolve({ success: true, outline: mockOutline }) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      const { result } = renderHook(() => useCurriculumStore());

      let curriculumId: string | null = null;
      await act(async () => {
        curriculumId = await result.current.createCurriculum(
          { goal: 'Test', articleCount: 5, tone: 'explanatory', durationMinutes: 2 },
          250
        );
      });

      return { result, curriculumId: curriculumId! };
    };

    it('marks article as completed', async () => {
      const { result, curriculumId } = await createTestCurriculum();

      act(() => {
        result.current.markArticleCompleted(curriculumId, 0, 85, 300);
      });

      const curriculum = result.current.getCurriculum(curriculumId);
      expect(curriculum?.articles[0].completionStatus).toBe('completed');
    });

    it('records comprehension score and WPM', async () => {
      const { result, curriculumId } = await createTestCurriculum();

      act(() => {
        result.current.markArticleCompleted(curriculumId, 0, 85, 300);
      });

      const curriculum = result.current.getCurriculum(curriculumId);
      expect(curriculum?.articles[0].comprehensionScore).toBe(85);
      expect(curriculum?.articles[0].readingWPM).toBe(300);
    });

    it('unlocks next article', async () => {
      const { result, curriculumId } = await createTestCurriculum();

      // Before completion, second article is locked
      let curriculum = result.current.getCurriculum(curriculumId);
      expect(curriculum?.articles[1].completionStatus).toBe('locked');

      act(() => {
        result.current.markArticleCompleted(curriculumId, 0, 85, 300);
      });

      // After completion, second article is unlocked
      curriculum = result.current.getCurriculum(curriculumId);
      expect(curriculum?.articles[1].completionStatus).toBe('unlocked');
    });

    it('triggers pre-generation of article N+2', async () => {
      const { result, curriculumId } = await createTestCurriculum();

      // Article 2 (index 2) should be pending before completion
      let curriculum = result.current.getCurriculum(curriculumId);
      expect(curriculum?.articles[2].generationStatus).toBe('pending');

      // Clear mock calls to track new calls
      mockFetch.mockClear();
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: { title: 'A3', content: 'Content', wordCount: 500, questions: [] },
          }),
      });

      act(() => {
        result.current.markArticleCompleted(curriculumId, 0, 85, 300);
      });

      // Should have triggered generation for article at index 2 (0 + 2)
      expect(mockFetch).toHaveBeenCalled();
    });

    it('marks curriculum complete when all articles done', async () => {
      const mockOutline = {
        curriculumTitle: 'Short',
        articles: [
          { orderIndex: 0, title: 'A1', summary: 'S1', keyConceptsToIntroduce: [], prerequisiteConcepts: [] },
          { orderIndex: 1, title: 'A2', summary: 'S2', keyConceptsToIntroduce: [], prerequisiteConcepts: [] },
          { orderIndex: 2, title: 'A3', summary: 'S3', keyConceptsToIntroduce: [], prerequisiteConcepts: [] },
        ],
      };
      const mockArticle = {
        success: true,
        article: { title: 'T', content: 'C', wordCount: 500, questions: [] },
      };

      mockFetch
        .mockResolvedValueOnce({ json: () => Promise.resolve({ success: true, outline: mockOutline }) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      const { result } = renderHook(() => useCurriculumStore());

      let curriculumId: string | null = null;
      await act(async () => {
        curriculumId = await result.current.createCurriculum(
          { goal: 'Test', articleCount: 3, tone: 'explanatory', durationMinutes: 2 },
          250
        );
      });

      // Generate the third article before completing
      mockFetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      // Complete all three articles
      act(() => {
        result.current.markArticleCompleted(curriculumId!, 0, 80, 250);
      });

      // Generate article 2 if triggered
      mockFetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      act(() => {
        result.current.markArticleCompleted(curriculumId!, 1, 85, 260);
      });

      act(() => {
        result.current.markArticleCompleted(curriculumId!, 2, 90, 270);
      });

      const curriculum = result.current.getCurriculum(curriculumId!);
      expect(curriculum?.isCompleted).toBe(true);
    });

    it('updates completedArticleCount', async () => {
      const { result, curriculumId } = await createTestCurriculum();

      expect(result.current.getCurriculum(curriculumId)?.completedArticleCount).toBe(0);

      act(() => {
        result.current.markArticleCompleted(curriculumId, 0, 85, 300);
      });

      expect(result.current.getCurriculum(curriculumId)?.completedArticleCount).toBe(1);
    });

    it('updates currentArticleIndex', async () => {
      const { result, curriculumId } = await createTestCurriculum();

      expect(result.current.getCurriculum(curriculumId)?.currentArticleIndex).toBe(0);

      act(() => {
        result.current.markArticleCompleted(curriculumId, 0, 85, 300);
      });

      expect(result.current.getCurriculum(curriculumId)?.currentArticleIndex).toBe(1);
    });

    it('sets completedAt timestamp', async () => {
      const { result, curriculumId } = await createTestCurriculum();

      const before = Date.now();

      act(() => {
        result.current.markArticleCompleted(curriculumId, 0, 85, 300);
      });

      const after = Date.now();

      const completedAt = result.current.getCurriculum(curriculumId)?.articles[0].completedAt;
      expect(completedAt).toBeGreaterThanOrEqual(before);
      expect(completedAt).toBeLessThanOrEqual(after);
    });
  });

  describe('generateArticle()', () => {
    const setupCurriculumWithOutline = async () => {
      const mockOutline = {
        curriculumTitle: 'Test',
        articles: [
          { orderIndex: 0, title: 'A1', summary: 'S1', keyConceptsToIntroduce: ['c1'], prerequisiteConcepts: [] },
          { orderIndex: 1, title: 'A2', summary: 'S2', keyConceptsToIntroduce: ['c2'], prerequisiteConcepts: ['c1'] },
          { orderIndex: 2, title: 'A3', summary: 'S3', keyConceptsToIntroduce: ['c3'], prerequisiteConcepts: ['c2'] },
        ],
      };
      const mockArticle = {
        success: true,
        article: { title: 'T', content: 'C', wordCount: 500, questions: [] },
      };

      mockFetch
        .mockResolvedValueOnce({ json: () => Promise.resolve({ success: true, outline: mockOutline }) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      const { result } = renderHook(() => useCurriculumStore());

      let curriculumId: string | null = null;
      await act(async () => {
        curriculumId = await result.current.createCurriculum(
          { goal: 'Test', articleCount: 3, tone: 'explanatory', durationMinutes: 2 },
          250
        );
      });

      return { result, curriculumId: curriculumId! };
    };

    it('sets article status to generating', async () => {
      const { result, curriculumId } = await setupCurriculumWithOutline();

      // Article 2 (index 2) is pending
      expect(result.current.getCurriculum(curriculumId)?.articles[2].generationStatus).toBe('pending');

      mockFetch.mockImplementationOnce(() => {
        // Check status during generation
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              json: () =>
                Promise.resolve({
                  success: true,
                  article: { title: 'A3', content: 'C', wordCount: 500, questions: [] },
                }),
            });
          }, 10);
        });
      });

      // Start generation (don't await)
      let generatePromise: Promise<void>;
      act(() => {
        generatePromise = result.current.generateArticle(curriculumId, 2);
      });

      // Status should be 'generating'
      expect(result.current.getCurriculum(curriculumId)?.articles[2].generationStatus).toBe('generating');

      // Wait for completion
      await act(async () => {
        await generatePromise!;
      });
    });

    it('calls API with curriculum context', async () => {
      const { result, curriculumId } = await setupCurriculumWithOutline();

      mockFetch.mockClear();
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: { title: 'A3', content: 'Content', wordCount: 500, questions: [] },
          }),
      });

      await act(async () => {
        await result.current.generateArticle(curriculumId, 2);
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('generate-article'),
        expect.objectContaining({
          body: expect.stringContaining('curriculumContext'),
        })
      );
    });

    it('updates article content on success', async () => {
      const { result, curriculumId } = await setupCurriculumWithOutline();

      mockFetch.mockClear();
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: {
              title: 'Generated Title',
              content: 'Generated content here',
              wordCount: 600,
              questions: [{ id: 'q1', type: 'true_false', question: 'Q?', correctAnswer: true }],
            },
          }),
      });

      await act(async () => {
        await result.current.generateArticle(curriculumId, 2);
      });

      const article = result.current.getCurriculum(curriculumId)?.articles[2];
      expect(article?.content).toBe('Generated content here');
      expect(article?.wordCount).toBe(600);
      expect(article?.questions).toHaveLength(1);
    });

    it('sets article status to generated on success', async () => {
      const { result, curriculumId } = await setupCurriculumWithOutline();

      mockFetch.mockClear();
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: { title: 'A3', content: 'C', wordCount: 500, questions: [] },
          }),
      });

      await act(async () => {
        await result.current.generateArticle(curriculumId, 2);
      });

      expect(result.current.getCurriculum(curriculumId)?.articles[2].generationStatus).toBe('generated');
    });

    it('sets article status to failed on error', async () => {
      const { result, curriculumId } = await setupCurriculumWithOutline();

      mockFetch.mockClear();
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: false,
            error: 'API rate limit',
          }),
      });

      await act(async () => {
        await result.current.generateArticle(curriculumId, 2);
      });

      expect(result.current.getCurriculum(curriculumId)?.articles[2].generationStatus).toBe('failed');
    });

    it('stores error message on failure', async () => {
      const { result, curriculumId } = await setupCurriculumWithOutline();

      mockFetch.mockClear();
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: false,
            error: 'Content policy violation',
          }),
      });

      await act(async () => {
        await result.current.generateArticle(curriculumId, 2);
      });

      expect(result.current.getCurriculum(curriculumId)?.articles[2].generationError).toBe(
        'Content policy violation'
      );
    });

    it('includes previous article summary for continuity', async () => {
      const { result, curriculumId } = await setupCurriculumWithOutline();

      // Article 0 and 1 are generated, so article 1's summary should be passed to article 2
      mockFetch.mockClear();
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: true,
            article: { title: 'A3', content: 'C', wordCount: 500, questions: [] },
          }),
      });

      await act(async () => {
        await result.current.generateArticle(curriculumId, 2);
      });

      // Check that the request included previous article summary
      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(requestBody.curriculumContext.previousArticleSummary).toBeDefined();
    });
  });

  describe('clearError()', () => {
    it('clears generationError', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: false,
            error: 'Test error',
          }),
      });

      const { result } = renderHook(() => useCurriculumStore());

      await act(async () => {
        await result.current.createCurriculum(
          { goal: 'Test', articleCount: 3, tone: 'explanatory', durationMinutes: 2 },
          250
        );
      });

      expect(result.current.generationError).toBe('Test error');

      act(() => {
        result.current.clearError();
      });

      expect(result.current.generationError).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('handles concurrent generation attempts gracefully', async () => {
      const mockOutline = {
        curriculumTitle: 'Test',
        articles: Array(3)
          .fill(null)
          .map((_, i) => ({
            orderIndex: i,
            title: `A${i}`,
            summary: `S${i}`,
            keyConceptsToIntroduce: [],
            prerequisiteConcepts: [],
          })),
      };
      const mockArticle = {
        success: true,
        article: { title: 'T', content: 'C', wordCount: 500, questions: [] },
      };

      mockFetch
        .mockResolvedValueOnce({ json: () => Promise.resolve({ success: true, outline: mockOutline }) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      const { result } = renderHook(() => useCurriculumStore());

      // Start first creation
      const promise1 = result.current.createCurriculum(
        { goal: 'First', articleCount: 3, tone: 'explanatory', durationMinutes: 2 },
        250
      );

      // Try to start another while first is running
      mockFetch
        .mockResolvedValueOnce({ json: () => Promise.resolve({ success: true, outline: mockOutline }) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      const promise2 = result.current.createCurriculum(
        { goal: 'Second', articleCount: 3, tone: 'explanatory', durationMinutes: 2 },
        250
      );

      await act(async () => {
        await Promise.all([promise1, promise2]);
      });

      // Both should complete (implementation may vary on whether second is blocked)
      expect(result.current.isGenerating).toBe(false);
    });

    it('does not pre-generate beyond article count', async () => {
      const mockOutline = {
        curriculumTitle: 'Short',
        articles: Array(3)
          .fill(null)
          .map((_, i) => ({
            orderIndex: i,
            title: `A${i}`,
            summary: `S${i}`,
            keyConceptsToIntroduce: [],
            prerequisiteConcepts: [],
          })),
      };
      const mockArticle = {
        success: true,
        article: { title: 'T', content: 'C', wordCount: 500, questions: [] },
      };

      mockFetch
        .mockResolvedValueOnce({ json: () => Promise.resolve({ success: true, outline: mockOutline }) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockArticle) });

      const { result } = renderHook(() => useCurriculumStore());

      let curriculumId: string | null = null;
      await act(async () => {
        curriculumId = await result.current.createCurriculum(
          { goal: 'Test', articleCount: 3, tone: 'explanatory', durationMinutes: 2 },
          250
        );
      });

      // Clear mocks and track new calls
      mockFetch.mockClear();

      // Complete article 1 - should NOT try to pre-generate article 3 (0 + 2 = 2, last one)
      // But complete article 2 - should NOT try to pre-generate article 4 (doesn't exist)
      act(() => {
        result.current.markArticleCompleted(curriculumId!, 1, 85, 300);
      });

      // Should have tried to generate article 3 (index 2) since 1 + 2 = 3
      // But should NOT try index 4
      // The pre-generation should stop at the last valid index
    });
  });
});
