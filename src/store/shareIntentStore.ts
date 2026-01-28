import { create } from 'zustand';
import { PendingImportPayload } from '../types/content';

interface ShareIntentState {
  pendingPayload: PendingImportPayload | null;
  setPendingPayload: (payload: PendingImportPayload) => void;
  clearPendingPayload: () => void;
}

export const useShareIntentStore = create<ShareIntentState>((set) => ({
  pendingPayload: null,
  setPendingPayload: (payload) => set({ pendingPayload: payload }),
  clearPendingPayload: () => set({ pendingPayload: null }),
}));
