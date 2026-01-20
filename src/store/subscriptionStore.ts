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
  linkedUserId: string | null;
  dailyGenerationCount: number;
  lastGenerationDate: string | null;

  // Actions
  initialize: () => Promise<void>;
  purchaseProduct: () => Promise<boolean>;
  linkRevenueCatUser: (supabaseUserId: string) => Promise<void>;
  unlinkRevenueCatUser: () => Promise<void>;
  restorePurchases: () => Promise<RestorePurchasesResult>;

  // Helpers
  getMaxWPM: () => number;
  canUseWPM: (wpm: number) => boolean;
  canGenerateArticle: () => boolean;
  incrementGenerationCount: () => void;
  resetDailyCount: () => void;
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
      linkedUserId: null,
      dailyGenerationCount: 0,
      lastGenerationDate: null,

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

      // Get max WPM based on subscription
      getMaxWPM: () => {
        return get().isPremium ? PREMIUM_LIMITS.MAX_WPM : FREE_TIER_LIMITS.MAX_WPM;
      },

      // Check if user can use specific WPM
      canUseWPM: (wpm: number) => {
        const maxWPM = get().getMaxWPM();
        return wpm <= maxWPM;
      },

      // Check if user can generate an AI article (premium = unlimited, free = 3/day)
      //
      // TIMEZONE BEHAVIOR: This uses device local time via toDateString(). Users traveling
      // across timezones may experience:
      // - Traveling east (e.g., NYC → Tokyo): Counter may reset early as device clock jumps forward
      // - Traveling west (e.g., Tokyo → NYC): Counter may not reset until device catches up
      //
      // This is acceptable for the current implementation as it affects a small percentage of users.
      // If this becomes a significant issue, consider switching to UTC-based date tracking:
      //   const today = new Date().toISOString().split('T')[0];
      //
      // Tradeoff: UTC-based tracking would be consistent globally but less intuitive for users
      // (reset time would vary by timezone - e.g., 8pm EST vs midnight EST).
      canGenerateArticle: () => {
        const { isPremium, dailyGenerationCount, lastGenerationDate } = get();

        // Premium users have unlimited generation
        if (isPremium) {
          return true;
        }

        // Check if date has changed since last generation
        const today = new Date().toDateString();
        if (lastGenerationDate !== today) {
          // New day - reset counter and allow generation
          set({ dailyGenerationCount: 0, lastGenerationDate: today });
          return true;
        }

        // Free tier: max 3 articles per day
        return dailyGenerationCount < 3;
      },

      // Increment generation count after successful article generation
      incrementGenerationCount: () => {
        set((state) => ({
          dailyGenerationCount: state.dailyGenerationCount + 1,
          lastGenerationDate: new Date().toDateString(),
        }));
      },

      // Reset daily count (for testing only)
      resetDailyCount: () => {
        set({ dailyGenerationCount: 0, lastGenerationDate: null });
      },
    }),
    {
      name: 'devoro-subscription',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isPremium: state.isPremium,
        dailyGenerationCount: state.dailyGenerationCount,
        lastGenerationDate: state.lastGenerationDate,
      }),
    }
  )
);
