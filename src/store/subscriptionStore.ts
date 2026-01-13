import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FREE_TIER_LIMITS, PREMIUM_LIMITS } from '../types/subscription';

interface RestorePurchasesResult {
  success: boolean;
  message?: string;
  error?: string;
}

interface SubscriptionStore {
  // State
  isPremium: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  isRestoring: boolean; // True while restore purchases is in progress
  restoreError: string | null; // Error message from last restore attempt
  contentAccessCount: number;
  linkedUserId: string | null; // RevenueCat-linked Supabase user ID

  // Actions
  initialize: () => Promise<void>;
  setPremium: (isPremium: boolean) => void;
  incrementContentCount: () => void;
  resetContentCount: () => void;
  simulatePurchase: () => Promise<boolean>;
  simulateRestore: () => Promise<boolean>;
  /**
   * Link RevenueCat customer with Supabase user ID.
   * This enables multi-device sync of premium status.
   * In production, calls Purchases.logIn() from react-native-purchases.
   */
  linkRevenueCatUser: (supabaseUserId: string) => Promise<void>;
  /**
   * Unlink RevenueCat customer on sign out.
   * This prevents entitlement leakage to the next anonymous user.
   * In production, calls Purchases.logOut() from react-native-purchases.
   */
  unlinkRevenueCatUser: () => Promise<void>;
  /**
   * Restore purchases from App Store/Play Store.
   * Required by Apple App Store guidelines for subscription apps.
   * In production, calls Purchases.restorePurchases() from react-native-purchases.
   */
  restorePurchases: () => Promise<RestorePurchasesResult>;

  // Helpers
  canAccessContent: () => boolean;
  getMaxWPM: () => number;
  canUseWPM: (wpm: number) => boolean;

  // Testing only - directly set state for persona testing
  hydrateForTesting: (state: {
    isPremium: boolean;
    contentAccessCount: number;
  }) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isPremium: true, // DEV: Set to false for production
      isLoading: false,
      isInitialized: false,
      isRestoring: false,
      restoreError: null,
      contentAccessCount: 0,
      linkedUserId: null,

      // Initialize (would call RevenueCat in production)
      initialize: async () => {
        if (get().isInitialized) {return;}
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

      /**
       * Link RevenueCat customer with Supabase user ID.
       * In production, this would call:
       *   import Purchases from 'react-native-purchases';
       *   const { customerInfo } = await Purchases.logIn(supabaseUserId);
       *   const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
       *
       * This enables:
       * 1. Premium status to sync across devices when user signs in
       * 2. Purchases on one device to be recognized on other devices
       * 3. User-level subscription tracking in RevenueCat dashboard
       */
      linkRevenueCatUser: async (supabaseUserId: string) => {
        const currentLinkedId = get().linkedUserId;

        // Already linked to this user
        if (currentLinkedId === supabaseUserId) {
          return;
        }

        set({ isLoading: true });

        try {
          // In production, this would be:
          // const { customerInfo } = await Purchases.logIn(supabaseUserId);
          // const isPremium = customerInfo.entitlements.active['premium'] !== undefined;

          // For Expo Go, simulate the API call
          await new Promise(resolve => setTimeout(resolve, 200));

          // Update linked user ID and check premium status
          set({
            linkedUserId: supabaseUserId,
            isLoading: false,
          });

          // In production: If the linked user has premium entitlements from
          // another device, isPremium would be updated here
        } catch (error) {
          console.error('[Subscription] Failed to link RevenueCat user:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      /**
       * Unlink RevenueCat customer on sign out.
       * In production, this would call:
       *   import Purchases from 'react-native-purchases';
       *   await Purchases.logOut();
       *
       * This ensures:
       * 1. The next anonymous user doesn't inherit previous user's premium status
       * 2. Clean separation between user sessions in RevenueCat
       */
      unlinkRevenueCatUser: async () => {
        // In production, this would be:
        // await Purchases.logOut();

        // For Expo Go, just clear the linked user state
        set({ linkedUserId: null });
      },

      /**
       * Restore purchases from App Store/Play Store.
       * In production, this would call:
       *   import Purchases from 'react-native-purchases';
       *   const customerInfo = await Purchases.restorePurchases();
       *   const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
       *
       * Required by Apple App Store guidelines for apps with subscriptions.
       * This allows users to recover their premium status after reinstalling
       * or switching devices without signing in.
       */
      restorePurchases: async (): Promise<RestorePurchasesResult> => {
        set({ isRestoring: true, restoreError: null });

        try {
          // In production, this would be:
          // const customerInfo = await Purchases.restorePurchases();
          // const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
          // set({ isPremium, isRestoring: false });
          // return { success: isPremium };

          // For Expo Go, simulate by checking current premium status
          // (In production, this would query the App Store/Play Store)
          await new Promise(resolve => setTimeout(resolve, 500));

          const currentPremium = get().isPremium;
          set({ isRestoring: false });

          if (currentPremium) {
            return { success: true };
          }

          return { success: false, message: 'No purchases to restore' };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          set({ isRestoring: false, restoreError: errorMessage });
          return { success: false, error: errorMessage };
        }
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

      // Testing only
      hydrateForTesting: (testState) => {
        set({
          isPremium: testState.isPremium,
          contentAccessCount: testState.contentAccessCount,
        });
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
