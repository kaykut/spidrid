import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ImportedContent, PendingImportPayload } from '../types/content';

interface ContentStore {
  // State
  importedContent: ImportedContent[];
  currentContentId: string | null;

  // Actions
  addContent: (content: Omit<ImportedContent, 'id' | 'createdAt' | 'readProgress'>) => ImportedContent;
  enqueueContent: (
    payload: PendingImportPayload,
    metadata: {
      title: string;
      source: ImportedContent['source'];
      sourceUrl?: string;
      fileName?: string;
    }
  ) => ImportedContent;
  finalizeContent: (
    id: string,
    content: Omit<ImportedContent, 'id' | 'createdAt' | 'readProgress' | 'currentWordIndex' | 'lastReadAt'>
  ) => void;
  updateProcessingProgress: (id: string, progress: number) => void;
  markProcessingError: (id: string, error: string) => void;
  updateProgress: (id: string, progress: number, currentWordIndex?: number) => void;
  getCurrentWordIndex: (id: string) => number | undefined;
  updateLastRead: (id: string) => void;
  deleteContent: (id: string) => void;
  getContentById: (id: string) => ImportedContent | undefined;
  setCurrentContent: (id: string | null) => void;
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
          processingStatus: content.processingStatus ?? 'ready',
        };
        set((state) => ({
          importedContent: [newContent, ...state.importedContent],
        }));
        return newContent;
      },

      enqueueContent: (payload, metadata) => {
        const newContent: ImportedContent = {
          id: generateId(),
          title: metadata.title,
          content: '',
          wordCount: 0,
          source: metadata.source,
          sourceUrl: metadata.sourceUrl,
          fileName: metadata.fileName,
          createdAt: Date.now(),
          readProgress: 0,
          processingStatus: 'processing',
          processingProgress: payload.type === 'file' ? 0 : undefined,
          processingPayload: payload,
        };

        set((state) => ({
          importedContent: [newContent, ...state.importedContent],
        }));

        return newContent;
      },

      finalizeContent: (id, content) => {
        // Prevent accidental overwrites of identity/progress fields.
         
        const {
          id: _id,
          createdAt: _createdAt,
          readProgress: _readProgress,
          currentWordIndex: _currentWordIndex,
          lastReadAt: _lastReadAt,
          processingStatus: _processingStatus,
          processingProgress: _processingProgress,
          processingError: _processingError,
          processingPayload: _processingPayload,
          ...safeContent
        } = content as ImportedContent;
        set((state) => ({
          importedContent: state.importedContent.map((item) => {
            if (item.id !== id) {
              return item;
            }

            return {
              ...item,
              ...safeContent,
              processingStatus: 'ready',
              processingProgress: undefined,
              processingError: undefined,
              processingPayload: undefined,
            };
          }),
        }));
      },

      updateProcessingProgress: (id, progress) => {
        const clamped = Math.max(0, Math.min(100, Math.round(progress)));
        set((state) => ({
          importedContent: state.importedContent.map((item) =>
            item.id === id
              ? { ...item, processingProgress: clamped }
              : item
          ),
        }));
      },

      markProcessingError: (id, error) => {
        set((state) => ({
          importedContent: state.importedContent.map((item) =>
            item.id === id
              ? {
                  ...item,
                  processingStatus: 'error',
                  processingError: error,
                  processingProgress: undefined,
                }
              : item
          ),
        }));
      },

      updateProgress: (id, progress, currentWordIndex) => {
        set((state) => ({
          importedContent: state.importedContent.map((c) =>
            c.id === id
              ? { ...c, readProgress: progress, currentWordIndex }
              : c
          ),
        }));
      },

      getCurrentWordIndex: (id) => {
        return get().importedContent.find((c) => c.id === id)?.currentWordIndex;
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
    }),
    {
      name: 'devoro-content',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        importedContent: state.importedContent,
      }),
    }
  )
);
