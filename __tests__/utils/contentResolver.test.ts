/**
 * Tests for Content Resolver
 *
 * Resolves PlaylistItems and content IDs to their full content.
 */

import { resolveContent, resolveContentById } from '../../src/utils/contentResolver';
import { getArticleById } from '../../src/data/curriculum/index';
import { useContentStore } from '../../src/store/contentStore';
import { PlaylistItem } from '../../src/types/playlist';

// Mock dependencies
jest.mock('../../src/data/curriculum/index');
jest.mock('../../src/store/contentStore');

const mockGetArticleById = getArticleById as jest.MockedFunction<typeof getArticleById>;
const mockUseContentStore = useContentStore as jest.MockedFunction<typeof useContentStore>;

describe('contentResolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('resolveContentById', () => {
    describe('training content', () => {
      it('resolves training article from curriculum', () => {
        mockGetArticleById.mockReturnValue({
          id: 'article-1',
          topicId: 'topic-1',
          title: 'Test Article',
          content: 'Article content here.',
          wordCount: 500,
          difficulty: 'beginner',
          questions: [
            {
              id: 'q1',
              type: 'single_choice',
              question: 'Test?',
              options: ['A', 'B'],
              correctIndex: 0,
            },
          ],
        });

        const result = resolveContentById('article-1', 'training');

        expect(result).not.toBeNull();
        expect(result?.title).toBe('Test Article');
        expect(result?.content).toBe('Article content here.');
        expect(result?.wordCount).toBe(500);
        expect(result?.hasQuiz).toBe(true);
        expect(result?.questions).toHaveLength(1);
      });

      it('returns null for non-existent training article', () => {
        mockGetArticleById.mockReturnValue(undefined);

        const result = resolveContentById('nonexistent', 'training');

        expect(result).toBeNull();
      });

      it('normalizes legacy question format', () => {
        mockGetArticleById.mockReturnValue({
          id: 'article-1',
          topicId: 'topic-1',
          title: 'Test Article',
          content: 'Content.',
          wordCount: 100,
          difficulty: 'beginner',
          questions: [
            // Legacy format without 'type' field
            {
              id: 'q1',
              question: 'Legacy question?',
              options: ['A', 'B', 'C'],
              correctIndex: 1,
            } as any,
          ],
        });

        const result = resolveContentById('article-1', 'training');

        expect(result?.questions?.[0].type).toBe('single_choice');
      });

      it('sets hasQuiz false when no questions', () => {
        mockGetArticleById.mockReturnValue({
          id: 'article-1',
          topicId: 'topic-1',
          title: 'Test Article',
          content: 'Content.',
          wordCount: 100,
          difficulty: 'beginner',
          questions: [],
        });

        const result = resolveContentById('article-1', 'training');

        expect(result?.hasQuiz).toBe(false);
        expect(result?.questions).toHaveLength(0);
      });
    });

    describe('reading content', () => {
      it('resolves reading content from store', () => {
        const mockGetContentById = jest.fn().mockReturnValue({
          id: 'content-1',
          title: 'Imported Article',
          content: 'Imported content here.',
          wordCount: 300,
          source: 'url',
        });

        (mockUseContentStore as any).getState = jest.fn().mockReturnValue({
          getContentById: mockGetContentById,
        });

        const result = resolveContentById('content-1', 'reading');

        expect(result).not.toBeNull();
        expect(result?.title).toBe('Imported Article');
        expect(result?.content).toBe('Imported content here.');
        expect(result?.wordCount).toBe(300);
        expect(result?.hasQuiz).toBe(false);
      });

      it('returns null for non-existent reading content', () => {
        const mockGetContentById = jest.fn().mockReturnValue(undefined);

        (mockUseContentStore as any).getState = jest.fn().mockReturnValue({
          getContentById: mockGetContentById,
        });

        const result = resolveContentById('nonexistent', 'reading');

        expect(result).toBeNull();
      });
    });
  });

  describe('resolveContent', () => {
    it('resolves content from PlaylistItem', () => {
      mockGetArticleById.mockReturnValue({
        id: 'article-1',
        topicId: 'topic-1',
        title: 'Playlist Article',
        content: 'Content.',
        wordCount: 200,
        difficulty: 'beginner',
        questions: [],
      });

      const item: PlaylistItem = {
        id: 'item-1',
        contentId: 'article-1',
        source: 'training',
        title: 'Playlist Article',
        wordCount: 200,
        addedAt: Date.now(),
        progress: 0,
      };

      const result = resolveContent(item);

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Playlist Article');
    });

    it('handles reading source from PlaylistItem', () => {
      const mockGetContentById = jest.fn().mockReturnValue({
        id: 'content-1',
        title: 'Reading Item',
        content: 'Content.',
        wordCount: 150,
        source: 'text',
      });

      (mockUseContentStore as any).getState = jest.fn().mockReturnValue({
        getContentById: mockGetContentById,
      });

      const item: PlaylistItem = {
        id: 'item-1',
        contentId: 'content-1',
        source: 'reading',
        title: 'Reading Item',
        wordCount: 150,
        addedAt: Date.now(),
        progress: 0,
      };

      const result = resolveContent(item);

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Reading Item');
    });
  });
});
