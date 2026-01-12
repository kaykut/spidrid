import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ImportedContent } from '../types/content';

interface ContentStore {
  // State
  importedContent: ImportedContent[];
  currentContentId: string | null;

  // Actions
  addContent: (content: Omit<ImportedContent, 'id' | 'createdAt' | 'readProgress'>) => ImportedContent;
  updateProgress: (id: string, progress: number) => void;
  updateLastRead: (id: string) => void;
  deleteContent: (id: string) => void;
  getContentById: (id: string) => ImportedContent | undefined;
  setCurrentContent: (id: string | null) => void;
  clearAllContent: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      importedContent: [],
      currentContentId: null,

      addContent: (content) => {
        const newContent: ImportedContent = {
          ...content,
          id: generateId(),
          createdAt: Date.now(),
          readProgress: 0,
        };
        set((state) => ({
          importedContent: [newContent, ...state.importedContent],
        }));
        return newContent;
      },

      updateProgress: (id, progress) => {
        set((state) => ({
          importedContent: state.importedContent.map((c) =>
            c.id === id ? { ...c, readProgress: progress } : c
          ),
        }));
      },

      updateLastRead: (id) => {
        set((state) => ({
          importedContent: state.importedContent.map((c) =>
            c.id === id ? { ...c, lastReadAt: Date.now() } : c
          ),
        }));
      },

      deleteContent: (id) => {
        set((state) => ({
          importedContent: state.importedContent.filter((c) => c.id !== id),
        }));
      },

      getContentById: (id) => {
        return get().importedContent.find((c) => c.id === id);
      },

      setCurrentContent: (id) => {
        set({ currentContentId: id });
      },

      clearAllContent: () => {
        set({ importedContent: [], currentContentId: null });
      },
    }),
    {
      name: 'spidrid-content',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        importedContent: state.importedContent,
      }),
    }
  )
);
