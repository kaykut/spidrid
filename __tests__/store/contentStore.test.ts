/**
 * Tests for Content Store.
 *
 * Manages user-imported content (from URLs and pasted text).
 */

import { renderHook, act } from '@testing-library/react-native';
import { useContentStore } from '../../src/store/contentStore';

describe('contentStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useContentStore());
    act(() => {
      // Clear all content
      result.current.importedContent.forEach((content) => {
        result.current.deleteContent(content.id);
      });
      result.current.setCurrentContent(null);
    });
  });

  describe('initial state', () => {
    it('starts with empty importedContent array', () => {
      const { result } = renderHook(() => useContentStore());
      expect(result.current.importedContent).toEqual([]);
    });

    it('starts with currentContentId as null', () => {
      const { result } = renderHook(() => useContentStore());
      expect(result.current.currentContentId).toBeNull();
    });
  });

  describe('addContent()', () => {
    it('adds content to array', () => {
      const { result } = renderHook(() => useContentStore());

      act(() => {
        result.current.addContent({
          title: 'Test Article',
          content: 'This is test content',
          wordCount: 4,
          source: 'text',
        });
      });

      expect(result.current.importedContent).toHaveLength(1);
      expect(result.current.importedContent[0].title).toBe('Test Article');
    });

    it('generates unique ID', () => {
      const { result } = renderHook(() => useContentStore());

      let content1: { id: string };
      let content2: { id: string };

      act(() => {
        content1 = result.current.addContent({
          title: 'Article 1',
          content: 'Content 1',
          wordCount: 2,
          source: 'text',
        });
      });

      act(() => {
        content2 = result.current.addContent({
          title: 'Article 2',
          content: 'Content 2',
          wordCount: 2,
          source: 'text',
        });
      });

      expect(content1!.id).toBeDefined();
      expect(content2!.id).toBeDefined();
      expect(content1!.id).not.toBe(content2!.id);
    });

    it('sets initial readProgress to 0', () => {
      const { result } = renderHook(() => useContentStore());

      let newContent: { readProgress: number };

      act(() => {
        newContent = result.current.addContent({
          title: 'Test Article',
          content: 'This is test content',
          wordCount: 4,
          source: 'text',
        });
      });

      expect(newContent!.readProgress).toBe(0);
    });

    it('sets createdAt timestamp', () => {
      const { result } = renderHook(() => useContentStore());
      const before = Date.now();

      let newContent: { createdAt: number };

      act(() => {
        newContent = result.current.addContent({
          title: 'Test Article',
          content: 'This is test content',
          wordCount: 4,
          source: 'text',
        });
      });

      const after = Date.now();
      expect(newContent!.createdAt).toBeGreaterThanOrEqual(before);
      expect(newContent!.createdAt).toBeLessThanOrEqual(after);
    });

    it('adds new content to the beginning of array', () => {
      const { result } = renderHook(() => useContentStore());

      act(() => {
        result.current.addContent({
          title: 'First',
          content: 'First content',
          wordCount: 2,
          source: 'text',
        });
      });

      act(() => {
        result.current.addContent({
          title: 'Second',
          content: 'Second content',
          wordCount: 2,
          source: 'text',
        });
      });

      expect(result.current.importedContent[0].title).toBe('Second');
      expect(result.current.importedContent[1].title).toBe('First');
    });

    it('preserves sourceUrl for url imports', () => {
      const { result } = renderHook(() => useContentStore());

      let newContent: { sourceUrl?: string };

      act(() => {
        newContent = result.current.addContent({
          title: 'URL Article',
          content: 'Content from URL',
          wordCount: 3,
          source: 'url',
          sourceUrl: 'https://example.com/article',
        });
      });

      expect(newContent!.sourceUrl).toBe('https://example.com/article');
    });

    it('returns the created content', () => {
      const { result } = renderHook(() => useContentStore());

      let newContent: { id: string; title: string };

      act(() => {
        newContent = result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      expect(newContent!).toEqual(expect.objectContaining({
        title: 'Test',
        content: 'Content',
        wordCount: 1,
        source: 'text',
        readProgress: 0,
      }));
      expect(newContent!.id).toBeDefined();
    });
  });

  describe('updateProgress()', () => {
    it('updates progress for correct item', () => {
      const { result } = renderHook(() => useContentStore());

      let content: { id: string };

      act(() => {
        content = result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      act(() => {
        result.current.updateProgress(content!.id, 0.5);
      });

      expect(result.current.importedContent[0].readProgress).toBe(0.5);
    });

    it('does not affect other items', () => {
      const { result } = renderHook(() => useContentStore());

      let content1: { id: string };
      let content2: { id: string };

      act(() => {
        content1 = result.current.addContent({
          title: 'First',
          content: 'Content 1',
          wordCount: 2,
          source: 'text',
        });
        content2 = result.current.addContent({
          title: 'Second',
          content: 'Content 2',
          wordCount: 2,
          source: 'text',
        });
      });

      act(() => {
        result.current.updateProgress(content1!.id, 0.75);
      });

      const first = result.current.importedContent.find(c => c.id === content1!.id);
      const second = result.current.importedContent.find(c => c.id === content2!.id);

      expect(first?.readProgress).toBe(0.75);
      expect(second?.readProgress).toBe(0);
    });

    it('handles unknown ID gracefully (no-op)', () => {
      const { result } = renderHook(() => useContentStore());

      act(() => {
        result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      const lengthBefore = result.current.importedContent.length;

      act(() => {
        result.current.updateProgress('nonexistent-id', 0.5);
      });

      expect(result.current.importedContent.length).toBe(lengthBefore);
    });

    it('allows setting progress to 0', () => {
      const { result } = renderHook(() => useContentStore());

      let content: { id: string };

      act(() => {
        content = result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
        result.current.updateProgress(content.id, 0.5);
      });

      act(() => {
        result.current.updateProgress(content!.id, 0);
      });

      expect(result.current.importedContent[0].readProgress).toBe(0);
    });

    it('allows setting progress to 1', () => {
      const { result } = renderHook(() => useContentStore());

      let content: { id: string };

      act(() => {
        content = result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      act(() => {
        result.current.updateProgress(content!.id, 1);
      });

      expect(result.current.importedContent[0].readProgress).toBe(1);
    });
  });

  describe('updateLastRead()', () => {
    it('sets lastReadAt timestamp', () => {
      const { result } = renderHook(() => useContentStore());

      let content: { id: string };

      act(() => {
        content = result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      const before = Date.now();

      act(() => {
        result.current.updateLastRead(content!.id);
      });

      const after = Date.now();
      const item = result.current.importedContent[0];

      expect(item.lastReadAt).toBeGreaterThanOrEqual(before);
      expect(item.lastReadAt).toBeLessThanOrEqual(after);
    });

    it('updates lastReadAt on subsequent calls', () => {
      const { result } = renderHook(() => useContentStore());

      let content: { id: string };

      act(() => {
        content = result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      act(() => {
        result.current.updateLastRead(content!.id);
      });

      const firstRead = result.current.importedContent[0].lastReadAt;

      // Small delay to ensure different timestamp
      act(() => {
        result.current.updateLastRead(content!.id);
      });

      const secondRead = result.current.importedContent[0].lastReadAt;

      expect(secondRead).toBeGreaterThanOrEqual(firstRead!);
    });

    it('handles unknown ID gracefully (no-op)', () => {
      const { result } = renderHook(() => useContentStore());

      act(() => {
        result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      const originalLastReadAt = result.current.importedContent[0].lastReadAt;

      act(() => {
        result.current.updateLastRead('nonexistent-id');
      });

      // The existing content should be unchanged
      expect(result.current.importedContent).toHaveLength(1);
      expect(result.current.importedContent[0].lastReadAt).toBe(originalLastReadAt);
    });

    it('does not affect other items when updating lastRead', () => {
      const { result } = renderHook(() => useContentStore());

      let content1: { id: string };
      let content2: { id: string };

      act(() => {
        content1 = result.current.addContent({
          title: 'First',
          content: 'Content 1',
          wordCount: 2,
          source: 'text',
        });
        content2 = result.current.addContent({
          title: 'Second',
          content: 'Content 2',
          wordCount: 2,
          source: 'text',
        });
      });

      const originalLastReadAt2 = result.current.importedContent.find(c => c.id === content2!.id)?.lastReadAt;

      act(() => {
        result.current.updateLastRead(content1!.id);
      });

      // content2 should be unchanged
      const second = result.current.importedContent.find(c => c.id === content2!.id);
      expect(second?.lastReadAt).toBe(originalLastReadAt2);
    });
  });

  describe('deleteContent()', () => {
    it('removes content from array', () => {
      const { result } = renderHook(() => useContentStore());

      let content: { id: string };

      act(() => {
        content = result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      expect(result.current.importedContent).toHaveLength(1);

      act(() => {
        result.current.deleteContent(content!.id);
      });

      expect(result.current.importedContent).toHaveLength(0);
    });

    it('removes only the specified content', () => {
      const { result } = renderHook(() => useContentStore());

      let content1: { id: string };
      let content2: { id: string };

      act(() => {
        content1 = result.current.addContent({
          title: 'Keep',
          content: 'Content 1',
          wordCount: 2,
          source: 'text',
        });
        content2 = result.current.addContent({
          title: 'Delete',
          content: 'Content 2',
          wordCount: 2,
          source: 'text',
        });
      });

      act(() => {
        result.current.deleteContent(content2!.id);
      });

      expect(result.current.importedContent).toHaveLength(1);
      expect(result.current.importedContent[0].id).toBe(content1!.id);
      expect(result.current.importedContent[0].title).toBe('Keep');
    });

    it('handles unknown ID gracefully (no-op)', () => {
      const { result } = renderHook(() => useContentStore());

      act(() => {
        result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      act(() => {
        result.current.deleteContent('nonexistent-id');
      });

      expect(result.current.importedContent).toHaveLength(1);
    });
  });

  describe('getContentById()', () => {
    it('returns content by ID', () => {
      const { result } = renderHook(() => useContentStore());

      let content: { id: string };

      act(() => {
        content = result.current.addContent({
          title: 'Target',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      const found = result.current.getContentById(content!.id);

      expect(found).toBeDefined();
      expect(found?.title).toBe('Target');
    });

    it('returns undefined for unknown ID', () => {
      const { result } = renderHook(() => useContentStore());

      const found = result.current.getContentById('nonexistent-id');

      expect(found).toBeUndefined();
    });

    it('returns correct content when multiple exist', () => {
      const { result } = renderHook(() => useContentStore());

      let content2: { id: string };

      act(() => {
        result.current.addContent({
          title: 'First',
          content: 'Content 1',
          wordCount: 2,
          source: 'text',
        });
        content2 = result.current.addContent({
          title: 'Second',
          content: 'Content 2',
          wordCount: 2,
          source: 'text',
        });
        result.current.addContent({
          title: 'Third',
          content: 'Content 3',
          wordCount: 2,
          source: 'text',
        });
      });

      const found = result.current.getContentById(content2!.id);

      expect(found?.title).toBe('Second');
    });
  });

  describe('setCurrentContent()', () => {
    it('sets currentContentId', () => {
      const { result } = renderHook(() => useContentStore());

      let content: { id: string };

      act(() => {
        content = result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
      });

      act(() => {
        result.current.setCurrentContent(content!.id);
      });

      expect(result.current.currentContentId).toBe(content!.id);
    });

    it('clears currentContentId when set to null', () => {
      const { result } = renderHook(() => useContentStore());

      let content: { id: string };

      act(() => {
        content = result.current.addContent({
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
        });
        result.current.setCurrentContent(content.id);
      });

      expect(result.current.currentContentId).not.toBeNull();

      act(() => {
        result.current.setCurrentContent(null);
      });

      expect(result.current.currentContentId).toBeNull();
    });

    it('can change currentContentId', () => {
      const { result } = renderHook(() => useContentStore());

      let content1: { id: string };
      let content2: { id: string };

      act(() => {
        content1 = result.current.addContent({
          title: 'First',
          content: 'Content 1',
          wordCount: 2,
          source: 'text',
        });
        content2 = result.current.addContent({
          title: 'Second',
          content: 'Content 2',
          wordCount: 2,
          source: 'text',
        });
      });

      act(() => {
        result.current.setCurrentContent(content1!.id);
      });

      expect(result.current.currentContentId).toBe(content1!.id);

      act(() => {
        result.current.setCurrentContent(content2!.id);
      });

      expect(result.current.currentContentId).toBe(content2!.id);
    });
  });
});
