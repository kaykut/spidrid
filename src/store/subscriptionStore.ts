import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FREE_TIER_LIMITS, PREMIUM_LIMITS } from '../types/subscription';

interface SubscriptionStore {
  // State
  isPremium: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  contentAccessCount: number;

  // Actions
  initialize: () => Promise<void>;
  setPremium: (isPremium: boolean) => void;
  incrementContentCount: () => void;
  resetContentCount: () => void;
  simulatePurchase: () => Promise<boolean>;
  simulateRestore: () => Promise<boolean>;

  // Helpers
  canAccessContent: () => boolean;
  getMaxWPM: () => number;
  canUseWPM: (wpm: number) => boolean;
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isPremium: false,
      isLoading: false,
      isInitialized: false,
      contentAccessCount: 0,

      // Initialize (would call RevenueCat in production)
      initialize: async () => {
        if (get().isInitialized) return;
        set({ isLoading: true });

        // In production, this would call:
        // await initializePurchases();
        // const isPremium = await checkPremiumStatus();

        // For Expo Go, just mark as initialized
        await new Promise(resolve => setTimeout(resolve, 100));
        set({ isLoading: false, isInitialized: true });
      },

      // Set premium status
      setPremium: (isPremium) => {
        set({ isPremium });
      },

      // Increment content access count
      incrementContentCount: () => {
        set(state => ({ contentAccessCount: state.contentAccessCount + 1 }));
      },

      // Reset content count (for testing)
      resetContentCount: () => {
        set({ contentAccessCount: 0 });
      },

      // Simulate purchase (for Expo Go testing)
      simulatePurchase: async () => {
        set({ isLoading: true });
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ isPremium: true, isLoading: false });
        return true;
      },

      // Simulate restore purchases
      simulateRestore: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 500));
        // In real app, this would check RevenueCat for existing entitlements
        set({ isLoading: false });
        return get().isPremium;
      },

      // Check if user can access more content
      canAccessContent: () => {
        const { isPremium, contentAccessCount } = get();
        return isPremium || contentAccessCount < FREE_TIER_LIMITS.MAX_CONTENT;
      },

      // Get max WPM based on subscription
      getMaxWPM: () => {
        return get().isPremium ? PREMIUM_LIMITS.MAX_WPM : FREE_TIER_LIMITS.MAX_WPM;
      },

      // Check if user can use specific WPM
      canUseWPM: (wpm: number) => {
        const maxWPM = get().getMaxWPM();
        return wpm <= maxWPM;
      },
    }),
    {
      name: 'spidrid-subscription',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isPremium: state.isPremium,
        contentAccessCount: state.contentAccessCount,
      }),
    }
  )
);
