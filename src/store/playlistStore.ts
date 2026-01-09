import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getArticleById } from '../data/curriculum/index';
import { PlaylistItem, PlaylistSource, NowPlaying } from '../types/playlist';
import { useContentStore } from './contentStore';

const generateId = () => Math.random().toString(36).substring(2, 15);

interface PlaylistState {
  // Three separate queues
  trainingQueue: PlaylistItem[];
  readingQueue: PlaylistItem[];
  learningQueue: PlaylistItem[];

  // Current playback
  activeQueue: PlaylistSource;
  nowPlaying: NowPlaying | null;

  // Actions
  loadContent: (contentId: string, source: PlaylistSource) => void;
  addToQueue: (contentId: string, source: PlaylistSource, position?: 'top' | 'bottom') => void;
  removeFromQueue: (itemId: string, source: PlaylistSource) => void;
  clearQueue: (source: PlaylistSource) => void;
  reorderQueue: (source: PlaylistSource, fromIndex: number, toIndex: number) => void;
  moveToTopAndLoad: (itemId: string, source: PlaylistSource) => void;

  // Playback control
  setActiveQueue: (source: PlaylistSource) => void;
  updateProgress: (itemId: string, progress: number) => void;
  stopPlayback: () => void;
  setNowPlaying: (item: PlaylistItem | null) => void;

  // Helpers
  getQueue: (source: PlaylistSource) => PlaylistItem[];
  getQueueLength: (source: PlaylistSource) => number;
  isInQueue: (contentId: string, source: PlaylistSource) => boolean;
}

/**
 * Create a PlaylistItem from a content ID and source
 */
function createPlaylistItem(contentId: string, source: PlaylistSource): PlaylistItem | null {
  // Get content metadata based on source type
  const getMetadata = (): { title: string; wordCount: number } | null => {
    if (source === 'training') {
      const article = getArticleById(contentId);
      return article ? { title: article.title, wordCount: article.wordCount } : null;
    }
    if (source === 'reading') {
      const content = useContentStore.getState().getContentById(contentId);
      return content ? { title: content.title, wordCount: content.wordCount } : null;
    }
    return null; // Learning not implemented yet
  };

  const metadata = getMetadata();
  if (!metadata) {return null;}

  return {
    id: generateId(),
    contentId,
    source,
    title: metadata.title,
    wordCount: metadata.wordCount,
    addedAt: Date.now(),
    progress: 0,
  };
}

/**
 * Get the queue key for a given source
 */
function getQueueKey(source: PlaylistSource): 'trainingQueue' | 'readingQueue' | 'learningQueue' {
  switch (source) {
    case 'training':
      return 'trainingQueue';
    case 'reading':
      return 'readingQueue';
    case 'learning':
      return 'learningQueue';
    default:
      return 'trainingQueue';
  }
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      trainingQueue: [],
      readingQueue: [],
      learningQueue: [],
      activeQueue: 'training',
      nowPlaying: null,

      loadContent: (contentId, source) => {
        const existingItem = get()
          .getQueue(source)
          .find((item) => item.contentId === contentId);

        if (existingItem) {
          // Move existing item to top and set as now playing
          get().moveToTopAndLoad(existingItem.id, source);
        } else {
          // Create new item and add to top
          const newItem = createPlaylistItem(contentId, source);
          if (!newItem) {return;}

          const queueKey = getQueueKey(source);
          set((state) => ({
            [queueKey]: [newItem, ...state[queueKey]],
            activeQueue: source,
            nowPlaying: { item: newItem, startedAt: Date.now() },
          }));
        }
      },

      addToQueue: (contentId, source, position = 'bottom') => {
        // Don't add duplicates
        if (get().isInQueue(contentId, source)) {return;}

        const newItem = createPlaylistItem(contentId, source);
        if (!newItem) {return;}

        const queueKey = getQueueKey(source);
        set((state) => ({
          [queueKey]:
            position === 'top'
              ? [newItem, ...state[queueKey]]
              : [...state[queueKey], newItem],
        }));
      },

      removeFromQueue: (itemId, source) => {
        const queueKey = getQueueKey(source);
        set((state) => {
          const newQueue = state[queueKey].filter((item) => item.id !== itemId);
          // If removing now playing item, clear it
          const updates: Partial<PlaylistState> = { [queueKey]: newQueue };
          if (state.nowPlaying?.item.id === itemId) {
            updates.nowPlaying = null;
          }
          return updates;
        });
      },

      clearQueue: (source) => {
        const queueKey = getQueueKey(source);
        set((state) => {
          const updates: Partial<PlaylistState> = { [queueKey]: [] };
          // If now playing item is from this queue, clear it
          if (state.nowPlaying?.item.source === source) {
            updates.nowPlaying = null;
          }
          return updates;
        });
      },

      reorderQueue: (source, fromIndex, toIndex) => {
        const queueKey = getQueueKey(source);
        set((state) => {
          const queue = [...state[queueKey]];
          const [removed] = queue.splice(fromIndex, 1);
          queue.splice(toIndex, 0, removed);
          return { [queueKey]: queue };
        });
      },

      moveToTopAndLoad: (itemId, source) => {
        const queueKey = getQueueKey(source);
        set((state) => {
          const queue = [...state[queueKey]];
          const itemIndex = queue.findIndex((item) => item.id === itemId);
          if (itemIndex === -1) {return state;}

          const [item] = queue.splice(itemIndex, 1);
          queue.unshift(item);

          return {
            [queueKey]: queue,
            activeQueue: source,
            nowPlaying: { item, startedAt: Date.now() },
          };
        });
      },

      setActiveQueue: (source) => {
        set({ activeQueue: source });
      },

      updateProgress: (itemId, progress) => {
        // Find which queue the item is in and update it
        const state = get();
        const sources: PlaylistSource[] = ['training', 'reading', 'learning'];

        for (const source of sources) {
          const queueKey = getQueueKey(source);
          const queue = state[queueKey];
          const itemIndex = queue.findIndex((item) => item.id === itemId);

          if (itemIndex !== -1) {
            set((s) => ({
              [queueKey]: s[queueKey].map((item) =>
                item.id === itemId
                  ? { ...item, progress, lastPlayedAt: Date.now() }
                  : item
              ),
              // Also update nowPlaying if it's the same item
              nowPlaying:
                s.nowPlaying?.item.id === itemId
                  ? {
                      ...s.nowPlaying,
                      item: { ...s.nowPlaying.item, progress, lastPlayedAt: Date.now() },
                    }
                  : s.nowPlaying,
            }));
            break;
          }
        }
      },

      stopPlayback: () => {
        set({ nowPlaying: null });
      },

      setNowPlaying: (item) => {
        set({
          nowPlaying: item ? { item, startedAt: Date.now() } : null,
        });
      },

      getQueue: (source) => {
        return get()[getQueueKey(source)];
      },

      getQueueLength: (source) => {
        return get().getQueue(source).length;
      },

      isInQueue: (contentId, source) => {
        return get()
          .getQueue(source)
          .some((item) => item.contentId === contentId);
      },
    }),
    {
      name: 'spidrid-playlist',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        trainingQueue: state.trainingQueue,
        readingQueue: state.readingQueue,
        learningQueue: state.learningQueue,
        activeQueue: state.activeQueue,
        nowPlaying: state.nowPlaying,
      }),
    }
  )
);
