/**
 * Tests for Playlist Store.
 *
 * Manages reading queues (training, reading, learning),
 * now playing state, and playback control.
 */

import { renderHook, act } from '@testing-library/react-native';
import { usePlaylistStore } from '../../src/store/playlistStore';
import { useContentStore } from '../../src/store/contentStore';

// Mock the curriculum to provide predictable test data
jest.mock('../../src/data/curriculum/index', () => ({
  getArticleById: jest.fn((id: string) => {
    if (id === 'test-article-1') {
      return { id: 'test-article-1', title: 'Test Article 1', wordCount: 500 };
    }
    if (id === 'test-article-2') {
      return { id: 'test-article-2', title: 'Test Article 2', wordCount: 750 };
    }
    return null;
  }),
}));

describe('playlistStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => usePlaylistStore());
    act(() => {
      result.current.clearQueue('training');
      result.current.clearQueue('reading');
      result.current.clearQueue('learning');
      result.current.stopPlayback();
    });

    // Reset content store
    const { result: contentResult } = renderHook(() => useContentStore());
    act(() => {
      // Add test content to reading queue
      contentResult.current.addContent({
        title: 'Imported Content 1',
        content: 'This is imported content for testing.',
        wordCount: 300,
        source: 'text',
      });
    });
  });

  describe('initial state', () => {
    it('starts with empty queues', () => {
      const { result } = renderHook(() => usePlaylistStore());

      expect(result.current.trainingQueue).toEqual([]);
      expect(result.current.readingQueue).toEqual([]);
      expect(result.current.learningQueue).toEqual([]);
    });

    it('starts with training as active queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      expect(result.current.activeQueue).toBe('training');
    });

    it('starts with nowPlaying as null', () => {
      const { result } = renderHook(() => usePlaylistStore());

      expect(result.current.nowPlaying).toBeNull();
    });
  });

  describe('loadContent()', () => {
    it('creates item and sets as nowPlaying for training content', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      expect(result.current.nowPlaying).not.toBeNull();
      expect(result.current.nowPlaying?.item.contentId).toBe('test-article-1');
      expect(result.current.nowPlaying?.item.title).toBe('Test Article 1');
      expect(result.current.nowPlaying?.item.wordCount).toBe(500);
    });

    it('adds item to the front of the queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      const queue = result.current.getQueue('training');
      expect(queue).toHaveLength(1);
      expect(queue[0].contentId).toBe('test-article-1');
    });

    it('sets startedAt timestamp on nowPlaying', () => {
      const { result } = renderHook(() => usePlaylistStore());
      const beforeLoad = Date.now();

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      const afterLoad = Date.now();
      expect(result.current.nowPlaying?.startedAt).toBeGreaterThanOrEqual(beforeLoad);
      expect(result.current.nowPlaying?.startedAt).toBeLessThanOrEqual(afterLoad);
    });

    it('moves existing item to top if already in queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
        result.current.loadContent('test-article-2', 'training');
      });

      // Article 2 should now be at top
      let queue = result.current.getQueue('training');
      expect(queue[0].contentId).toBe('test-article-2');

      // Load article 1 again - should move to top
      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      queue = result.current.getQueue('training');
      expect(queue[0].contentId).toBe('test-article-1');
      expect(queue[1].contentId).toBe('test-article-2');
    });

    it('does not duplicate item when loading existing content', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
        result.current.loadContent('test-article-1', 'training');
      });

      const queue = result.current.getQueue('training');
      expect(queue).toHaveLength(1);
    });

    it('sets activeQueue to the source type', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      expect(result.current.activeQueue).toBe('training');
    });

    it('does nothing for nonexistent content', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('nonexistent', 'training');
      });

      expect(result.current.nowPlaying).toBeNull();
      expect(result.current.getQueue('training')).toHaveLength(0);
    });
  });

  describe('addToQueue()', () => {
    it('adds item to bottom of queue by default', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
        result.current.addToQueue('test-article-2', 'training');
      });

      const queue = result.current.getQueue('training');
      expect(queue[0].contentId).toBe('test-article-1');
      expect(queue[1].contentId).toBe('test-article-2');
    });

    it('adds item to top when position is "top"', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
        result.current.addToQueue('test-article-2', 'training', 'top');
      });

      const queue = result.current.getQueue('training');
      expect(queue[0].contentId).toBe('test-article-2');
      expect(queue[1].contentId).toBe('test-article-1');
    });

    it('prevents duplicate items in queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
        result.current.addToQueue('test-article-1', 'training');
      });

      const queue = result.current.getQueue('training');
      expect(queue).toHaveLength(1);
    });

    it('does not add nonexistent content', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('nonexistent', 'training');
      });

      expect(result.current.getQueue('training')).toHaveLength(0);
    });
  });

  describe('removeFromQueue()', () => {
    it('removes item from queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      const queue = result.current.getQueue('training');
      const itemId = queue[0].id;

      act(() => {
        result.current.removeFromQueue(itemId, 'training');
      });

      expect(result.current.getQueue('training')).toHaveLength(0);
    });

    it('clears nowPlaying if removed item was playing', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      const playingId = result.current.nowPlaying?.item.id;
      expect(playingId).toBeDefined();

      act(() => {
        result.current.removeFromQueue(playingId!, 'training');
      });

      expect(result.current.nowPlaying).toBeNull();
    });

    it('does not affect nowPlaying when removing different item', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
        result.current.addToQueue('test-article-2', 'training');
      });

      const queue = result.current.getQueue('training');
      const secondItemId = queue[1].id;

      act(() => {
        result.current.removeFromQueue(secondItemId, 'training');
      });

      expect(result.current.nowPlaying).not.toBeNull();
      expect(result.current.nowPlaying?.item.contentId).toBe('test-article-1');
    });
  });

  describe('clearQueue()', () => {
    it('removes all items from specified queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
        result.current.addToQueue('test-article-2', 'training');
      });

      expect(result.current.getQueue('training')).toHaveLength(2);

      act(() => {
        result.current.clearQueue('training');
      });

      expect(result.current.getQueue('training')).toHaveLength(0);
    });

    it('clears nowPlaying if playing item from cleared queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      expect(result.current.nowPlaying).not.toBeNull();

      act(() => {
        result.current.clearQueue('training');
      });

      expect(result.current.nowPlaying).toBeNull();
    });

    it('does not affect other queues', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
        result.current.addToQueue('test-article-2', 'training');
      });

      // Get content id from content store
      const { result: contentResult } = renderHook(() => useContentStore());
      const importedContent = contentResult.current.importedContent[0];

      if (importedContent) {
        act(() => {
          result.current.addToQueue(importedContent.id, 'reading');
        });
      }

      act(() => {
        result.current.clearQueue('training');
      });

      expect(result.current.getQueue('training')).toHaveLength(0);
      // Reading queue should be unaffected
      expect(result.current.getQueue('reading').length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('moveToTopAndLoad()', () => {
    it('moves item to top of queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
        result.current.addToQueue('test-article-2', 'training');
      });

      const queue = result.current.getQueue('training');
      const secondItemId = queue[1].id;

      act(() => {
        result.current.moveToTopAndLoad(secondItemId, 'training');
      });

      const newQueue = result.current.getQueue('training');
      expect(newQueue[0].contentId).toBe('test-article-2');
    });

    it('sets moved item as nowPlaying', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
        result.current.addToQueue('test-article-2', 'training');
      });

      const queue = result.current.getQueue('training');
      const secondItemId = queue[1].id;

      act(() => {
        result.current.moveToTopAndLoad(secondItemId, 'training');
      });

      expect(result.current.nowPlaying?.item.contentId).toBe('test-article-2');
    });

    it('sets activeQueue to source', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
      });

      const queue = result.current.getQueue('training');

      act(() => {
        result.current.setActiveQueue('reading');
      });

      expect(result.current.activeQueue).toBe('reading');

      act(() => {
        result.current.moveToTopAndLoad(queue[0].id, 'training');
      });

      expect(result.current.activeQueue).toBe('training');
    });

    it('does nothing for nonexistent item', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
      });

      const originalQueue = result.current.getQueue('training');

      act(() => {
        result.current.moveToTopAndLoad('nonexistent-id', 'training');
      });

      expect(result.current.getQueue('training')).toEqual(originalQueue);
    });
  });

  describe('updateProgress()', () => {
    it('updates progress on queue item', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      const itemId = result.current.nowPlaying?.item.id;

      act(() => {
        result.current.updateProgress(itemId!, 0.5);
      });

      const queue = result.current.getQueue('training');
      expect(queue[0].progress).toBe(0.5);
    });

    it('updates progress on nowPlaying item', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      const itemId = result.current.nowPlaying?.item.id;

      act(() => {
        result.current.updateProgress(itemId!, 0.75);
      });

      expect(result.current.nowPlaying?.item.progress).toBe(0.75);
    });

    it('sets lastPlayedAt timestamp', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      const itemId = result.current.nowPlaying?.item.id;
      const beforeUpdate = Date.now();

      act(() => {
        result.current.updateProgress(itemId!, 0.5);
      });

      const afterUpdate = Date.now();
      const queue = result.current.getQueue('training');

      expect(queue[0].lastPlayedAt).toBeGreaterThanOrEqual(beforeUpdate);
      expect(queue[0].lastPlayedAt).toBeLessThanOrEqual(afterUpdate);
    });

    it('finds and updates item across different queues', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
      });

      const queue = result.current.getQueue('training');
      const itemId = queue[0].id;

      // Update with wrong source - should still find it
      act(() => {
        result.current.updateProgress(itemId, 0.3);
      });

      expect(result.current.getQueue('training')[0].progress).toBe(0.3);
    });
  });

  describe('stopPlayback()', () => {
    it('sets nowPlaying to null', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      expect(result.current.nowPlaying).not.toBeNull();

      act(() => {
        result.current.stopPlayback();
      });

      expect(result.current.nowPlaying).toBeNull();
    });
  });

  describe('setActiveQueue()', () => {
    it('changes active queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      expect(result.current.activeQueue).toBe('training');

      act(() => {
        result.current.setActiveQueue('reading');
      });

      expect(result.current.activeQueue).toBe('reading');

      act(() => {
        result.current.setActiveQueue('learning');
      });

      expect(result.current.activeQueue).toBe('learning');
    });
  });

  describe('setNowPlaying()', () => {
    it('sets nowPlaying with item', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
      });

      const queue = result.current.getQueue('training');
      const item = queue[0];

      act(() => {
        result.current.setNowPlaying(item);
      });

      expect(result.current.nowPlaying?.item).toEqual(item);
    });

    it('sets startedAt when setting nowPlaying', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
      });

      const queue = result.current.getQueue('training');
      const beforeSet = Date.now();

      act(() => {
        result.current.setNowPlaying(queue[0]);
      });

      const afterSet = Date.now();

      expect(result.current.nowPlaying?.startedAt).toBeGreaterThanOrEqual(beforeSet);
      expect(result.current.nowPlaying?.startedAt).toBeLessThanOrEqual(afterSet);
    });

    it('clears nowPlaying when passed null', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.loadContent('test-article-1', 'training');
      });

      expect(result.current.nowPlaying).not.toBeNull();

      act(() => {
        result.current.setNowPlaying(null);
      });

      expect(result.current.nowPlaying).toBeNull();
    });
  });

  describe('getQueue()', () => {
    it('returns correct queue for each source', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
      });

      expect(result.current.getQueue('training')).toHaveLength(1);
      expect(result.current.getQueue('reading')).toHaveLength(0);
      expect(result.current.getQueue('learning')).toHaveLength(0);
    });
  });

  describe('getQueueLength()', () => {
    it('returns correct length for each queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
        result.current.addToQueue('test-article-2', 'training');
      });

      expect(result.current.getQueueLength('training')).toBe(2);
      expect(result.current.getQueueLength('reading')).toBe(0);
    });
  });

  describe('isInQueue()', () => {
    it('returns true for content in queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
      });

      expect(result.current.isInQueue('test-article-1', 'training')).toBe(true);
    });

    it('returns false for content not in queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      expect(result.current.isInQueue('test-article-1', 'training')).toBe(false);
    });

    it('returns false when content is in different queue', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
      });

      expect(result.current.isInQueue('test-article-1', 'reading')).toBe(false);
    });
  });

  describe('reorderQueue()', () => {
    it('moves item from one position to another', () => {
      const { result } = renderHook(() => usePlaylistStore());

      act(() => {
        result.current.addToQueue('test-article-1', 'training');
        result.current.addToQueue('test-article-2', 'training');
      });

      // Move first item to second position
      act(() => {
        result.current.reorderQueue('training', 0, 1);
      });

      const queue = result.current.getQueue('training');
      expect(queue[0].contentId).toBe('test-article-2');
      expect(queue[1].contentId).toBe('test-article-1');
    });
  });
});
