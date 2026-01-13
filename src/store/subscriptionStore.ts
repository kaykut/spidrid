import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as PurchasesService from '../services/purchases';
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
  isRestoring: boolean;
  restoreError: string | null;
  contentAccessCount: number;
  linkedUserId: string | null;

  // Actions
  initialize: () => Promise<void>;
  setPremium: (isPremium: boolean) => void;
  incrementContentCount: () => void;
  resetContentCount: () => void;
  purchaseProduct: () => Promise<boolean>;
  linkRevenueCatUser: (supabaseUserId: string) => Promise<void>;
  unlinkRevenueCatUser: () => Promise<void>;
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
      // Initial state - determined by RevenueCat, not hardcoded
      isPremium: false,
      isLoading: false,
      isInitialized: false,
      isRestoring: false,
      restoreError: null,
      contentAccessCount: 0,
      linkedUserId: null,

      // Initialize RevenueCat SDK and check premium status
      initialize: async () => {
        if (get().isInitialized) {return;}
        set({ isLoading: true });

        const configured = await PurchasesService.configurePurchases();
        if (configured) {
          const isPremium = await PurchasesService.checkPremiumStatus();
          set({ isPremium, isLoading: false, isInitialized: true });
        } else {
          // RevenueCat not available (Expo Go) - default to free tier
          set({ isPremium: false, isLoading: false, isInitialized: true });
        }
      },

      // Set premium status (for testing and manual override)
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

      // Purchase a subscription product
      purchaseProduct: async () => {
        set({ isLoading: true });

        try {
          const offerings = await PurchasesService.getOfferings();
          if (offerings.length === 0) {
            console.warn('[Subscription] No offerings available');
            set({ isLoading: false });
            return false;
          }

          const customerInfo = await PurchasesService.purchasePackage(offerings[0]);
          if (customerInfo) {
            const isPremium = customerInfo.entitlements.active[PurchasesService.getPremiumEntitlement()] !== undefined;
            set({ isPremium, isLoading: false });
            return isPremium;
          }

          set({ isLoading: false });
          return false;
        } catch (error) {
          console.error('[Subscription] Purchase failed:', error);
          set({ isLoading: false });
          return false;
        }
      },

      // Link RevenueCat customer with Supabase user ID for multi-device sync
      linkRevenueCatUser: async (supabaseUserId: string) => {
        const currentLinkedId = get().linkedUserId;

        // Already linked to this user
        if (currentLinkedId === supabaseUserId) {
          return;
        }

        set({ isLoading: true });

        try {
          const customerInfo = await PurchasesService.loginUser(supabaseUserId);

          if (customerInfo) {
            // Update premium status from RevenueCat - may have entitlements from another device
            const isPremium = customerInfo.entitlements.active[PurchasesService.getPremiumEntitlement()] !== undefined;
            set({
              linkedUserId: supabaseUserId,
              isPremium,
              isLoading: false,
            });
          } else {
            // RevenueCat not available - just track the linked user locally
            set({
              linkedUserId: supabaseUserId,
              isLoading: false,
            });
          }
        } catch (error) {
          console.error('[Subscription] Failed to link RevenueCat user:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      // Unlink RevenueCat customer on sign out
      unlinkRevenueCatUser: async () => {
        await PurchasesService.logoutUser();
        set({ linkedUserId: null });
      },

      // Restore purchases from App Store/Play Store (required by Apple guidelines)
      restorePurchases: async (): Promise<RestorePurchasesResult> => {
        set({ isRestoring: true, restoreError: null });

        try {
          const customerInfo = await PurchasesService.restorePurchases();

          if (customerInfo) {
            const isPremium = customerInfo.entitlements.active[PurchasesService.getPremiumEntitlement()] !== undefined;
            set({ isPremium, isRestoring: false });
            return isPremium
              ? { success: true }
              : { success: false, message: 'No purchases to restore' };
          }

          // RevenueCat not available
          set({ isRestoring: false });
          return { success: false, message: 'Purchase restoration not available' };
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
