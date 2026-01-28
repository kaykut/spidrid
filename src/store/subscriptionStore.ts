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
  pendingLinkUserId: string | null;
  dailyGenerationCount: number;
  lastGenerationDate: string | null;

  // Actions
  initialize: () => Promise<void>;
  refreshPremiumStatus: () => Promise<void>;
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

const triggerSyncIfEligibleSafe = (): void => {
  // Use dynamic import to avoid circular dependencies
  // Wrapped in try-catch for Jest compatibility (dynamic imports fail without --experimental-vm-modules)
  try {
    void import('../services/syncOrchestrator').then(({ triggerSyncIfEligible }) => {
      triggerSyncIfEligible();
    }).catch(() => {
      // Silently fail if module can't be loaded (e.g., in tests)
    });
  } catch {
    // Dynamic import not supported in test environment
  }
};

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
      pendingLinkUserId: null,
      dailyGenerationCount: 0,
      lastGenerationDate: null,

      // Initialize RevenueCat SDK and check premium status
      initialize: async () => {
        if (get().isInitialized) {return;}
        set({ isLoading: true });

        // Configure RevenueCat (creates anonymous ID)
        const configured = await PurchasesService.configurePurchases();
        if (configured) {
          // Fetch fresh premium status on initialization
          const isPremium = await PurchasesService.checkPremiumStatus(true);
          const wasPremium = get().isPremium;
          set({
            isPremium,
            isLoading: false,
            isInitialized: true
          });

          // Set up listener for CustomerInfo updates (subscription changes, refunds, etc.)
          PurchasesService.setupCustomerInfoListener((updatedIsPremium) => {
            const wasPremiumListener = get().isPremium;
            set({ isPremium: updatedIsPremium });
            if (!wasPremiumListener && updatedIsPremium) {
              triggerSyncIfEligibleSafe();
            }
          });

          if (!wasPremium && isPremium) {
            triggerSyncIfEligibleSafe();
          }

          // Attempt deferred linking if auth already established
          const authStore = require('./authStore') as typeof import('./authStore');
          const { isLoggedIn, userId } = authStore.useAuthStore.getState();
          const linkTarget = get().pendingLinkUserId || userId;
          if (isLoggedIn && linkTarget) {
            get().linkRevenueCatUser(linkTarget).catch((error) => {
              console.error('[Subscription] Deferred link failed:', error);
            });
          }
        } else {
          // RevenueCat not available (Expo Go) - default to free tier
          set({ isPremium: false, isLoading: false, isInitialized: true });
        }
      },

      // Refresh premium status from RevenueCat (forces fresh fetch)
      refreshPremiumStatus: async () => {
        set({ isLoading: true });
        try {
          const isPremium = await PurchasesService.checkPremiumStatus(true);
          const wasPremium = get().isPremium;
          set({ isPremium, isLoading: false });
          if (!wasPremium && isPremium) {
            triggerSyncIfEligibleSafe();
          }

          const pendingLinkUserId = get().pendingLinkUserId;
          if (pendingLinkUserId) {
            get().linkRevenueCatUser(pendingLinkUserId).catch((error) => {
              console.error('[Subscription] Pending link retry failed:', error);
            });
          }
        } catch (error) {
          console.error('[Subscription] Refresh failed:', error);
          set({ isLoading: false });
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

            // Trigger sync after successful purchase
            if (isPremium) {
              triggerSyncIfEligibleSafe();
            }

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
        if (currentLinkedId === supabaseUserId && !get().pendingLinkUserId) {
          return;
        }

        if (!PurchasesService.isAvailable()) {
          set({ pendingLinkUserId: supabaseUserId });
          return;
        }

        set({ isLoading: true, pendingLinkUserId: supabaseUserId });

        try {
          const customerInfo = await PurchasesService.loginUser(supabaseUserId);

          if (customerInfo) {
            // Update premium status from RevenueCat - may have entitlements from another device
            const isPremium = customerInfo.entitlements.active[PurchasesService.getPremiumEntitlement()] !== undefined;
            set({
              linkedUserId: supabaseUserId,
              isPremium,
              isLoading: false,
              pendingLinkUserId: null,
            });

            // Trigger sync now that user is linked and may have premium
            triggerSyncIfEligibleSafe();
          } else {
            // Login failed or RevenueCat unavailable - keep pending to retry later
            set({
              isLoading: false,
              pendingLinkUserId: supabaseUserId,
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
        set({ linkedUserId: null, pendingLinkUserId: null, isPremium: false });
      },

      // Restore purchases from App Store/Play Store (required by Apple guidelines)
      restorePurchases: async (): Promise<RestorePurchasesResult> => {
        set({ isRestoring: true, restoreError: null });

        try {
          const customerInfo = await PurchasesService.restorePurchases();

          if (customerInfo) {
            const isPremium = customerInfo.entitlements.active[PurchasesService.getPremiumEntitlement()] !== undefined;
            set({ isPremium, isRestoring: false });

            // Trigger sync after successful restore
            if (isPremium) {
              triggerSyncIfEligibleSafe();
            }

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

        // Free tier: max articles per day
        return dailyGenerationCount < FREE_TIER_LIMITS.MAX_DAILY_AI_GENERATIONS;
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
        // IMPORTANT: isPremium is NOT persisted to avoid stale data.
        // Always fetch fresh from RevenueCat on app launch.
        // AsyncStorage hydration can be slower than network fetch, causing
        // stale persisted data to overwrite fresh data from RevenueCat.
        dailyGenerationCount: state.dailyGenerationCount,
        lastGenerationDate: state.lastGenerationDate,
      }),
    }
  )
);
