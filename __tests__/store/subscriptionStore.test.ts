/**
 * Tests for Subscription Store.
 *
 * Manages premium subscription state, content access limits, and WPM limits.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useSubscriptionStore } from '../../src/store/subscriptionStore';
import { FREE_TIER_LIMITS, PREMIUM_LIMITS } from '../../src/types/subscription';
import * as PurchasesService from '../../src/services/purchases';

// Get the mocked purchases service
const mockPurchasesService = PurchasesService as jest.Mocked<typeof PurchasesService>;

describe('subscriptionStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useSubscriptionStore.setState({
      isPremium: false,
      isLoading: false,
      isInitialized: false,
      isRestoring: false,
      restoreError: null,
      contentAccessCount: 0,
      linkedUserId: null,
    });
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('starts with isPremium as false', () => {
      const { result } = renderHook(() => useSubscriptionStore());
      expect(result.current.isPremium).toBe(false);
    });

    it('starts with contentAccessCount as 0', () => {
      const { result } = renderHook(() => useSubscriptionStore());
      expect(result.current.contentAccessCount).toBe(0);
    });

    it('starts with isLoading as false', () => {
      const { result } = renderHook(() => useSubscriptionStore());
      expect(result.current.isLoading).toBe(false);
    });

    it('starts with linkedUserId as null', () => {
      const { result } = renderHook(() => useSubscriptionStore());
      expect(result.current.linkedUserId).toBeNull();
    });
  });

  describe('initialize()', () => {
    it('sets isInitialized to true after initialization', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.initialize();
      });

      expect(result.current.isInitialized).toBe(true);
    });

    it('sets isLoading to false after initialization', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.initialize();
      });

      expect(result.current.isLoading).toBe(false);
    });

    it('is idempotent - calling twice does not reinitialize', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.initialize();
      });

      const firstInitTime = result.current.isInitialized;

      await act(async () => {
        await result.current.initialize();
      });

      // Should still be initialized
      expect(result.current.isInitialized).toBe(firstInitTime);
      // configurePurchases should only be called once
      expect(mockPurchasesService.configurePurchases).toHaveBeenCalledTimes(1);
    });

    it('sets isPremium based on RevenueCat when SDK is available', async () => {
      mockPurchasesService.configurePurchases.mockResolvedValueOnce(true);
      mockPurchasesService.checkPremiumStatus.mockResolvedValueOnce(true);

      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.initialize();
      });

      expect(result.current.isPremium).toBe(true);
    });

    it('defaults to free tier when SDK is not available', async () => {
      mockPurchasesService.configurePurchases.mockResolvedValueOnce(false);

      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.initialize();
      });

      expect(result.current.isPremium).toBe(false);
      expect(mockPurchasesService.checkPremiumStatus).not.toHaveBeenCalled();
    });
  });

  describe('setPremium()', () => {
    it('updates isPremium to true', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(true);
      });

      expect(result.current.isPremium).toBe(true);
    });

    it('updates isPremium to false', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(true);
      });

      act(() => {
        result.current.setPremium(false);
      });

      expect(result.current.isPremium).toBe(false);
    });
  });

  describe('incrementContentCount()', () => {
    it('increments contentAccessCount by 1', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.incrementContentCount();
      });

      expect(result.current.contentAccessCount).toBe(1);
    });

    it('increments multiple times correctly', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.incrementContentCount();
        result.current.incrementContentCount();
        result.current.incrementContentCount();
      });

      expect(result.current.contentAccessCount).toBe(3);
    });
  });

  describe('resetContentCount()', () => {
    it('resets contentAccessCount to 0', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.incrementContentCount();
        result.current.incrementContentCount();
      });

      expect(result.current.contentAccessCount).toBeGreaterThan(0);

      act(() => {
        result.current.resetContentCount();
      });

      expect(result.current.contentAccessCount).toBe(0);
    });
  });

  describe('canAccessContent()', () => {
    it('returns true for premium users regardless of count', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(true);
        // Set count above limit
        for (let i = 0; i < FREE_TIER_LIMITS.MAX_CONTENT + 5; i++) {
          result.current.incrementContentCount();
        }
      });

      expect(result.current.canAccessContent()).toBe(true);
    });

    it('returns true for free tier when count is below limit', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(false);
        result.current.resetContentCount();
      });

      expect(result.current.canAccessContent()).toBe(true);
    });

    it('returns true for free tier when count equals limit - 1', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(false);
        result.current.resetContentCount();
        for (let i = 0; i < FREE_TIER_LIMITS.MAX_CONTENT - 1; i++) {
          result.current.incrementContentCount();
        }
      });

      expect(result.current.canAccessContent()).toBe(true);
    });

    it('returns false for free tier when count reaches limit', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(false);
        result.current.resetContentCount();
        for (let i = 0; i < FREE_TIER_LIMITS.MAX_CONTENT; i++) {
          result.current.incrementContentCount();
        }
      });

      expect(result.current.canAccessContent()).toBe(false);
    });

    it('returns false for free tier when count exceeds limit', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(false);
        result.current.resetContentCount();
        for (let i = 0; i < FREE_TIER_LIMITS.MAX_CONTENT + 3; i++) {
          result.current.incrementContentCount();
        }
      });

      expect(result.current.canAccessContent()).toBe(false);
    });
  });

  describe('getMaxWPM()', () => {
    it('returns premium limit for premium users', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(true);
      });

      expect(result.current.getMaxWPM()).toBe(PREMIUM_LIMITS.MAX_WPM);
      expect(result.current.getMaxWPM()).toBe(1500);
    });

    it('returns free tier limit for non-premium users', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(false);
      });

      expect(result.current.getMaxWPM()).toBe(FREE_TIER_LIMITS.MAX_WPM);
      expect(result.current.getMaxWPM()).toBe(450);
    });
  });

  describe('canUseWPM()', () => {
    describe('premium user', () => {
      it('returns true for WPM at premium limit', () => {
        const { result } = renderHook(() => useSubscriptionStore());

        act(() => {
          result.current.setPremium(true);
        });

        expect(result.current.canUseWPM(1500)).toBe(true);
      });

      it('returns true for WPM below premium limit', () => {
        const { result } = renderHook(() => useSubscriptionStore());

        act(() => {
          result.current.setPremium(true);
        });

        expect(result.current.canUseWPM(1000)).toBe(true);
        expect(result.current.canUseWPM(450)).toBe(true);
        expect(result.current.canUseWPM(50)).toBe(true);
      });

      it('returns false for WPM above premium limit', () => {
        const { result } = renderHook(() => useSubscriptionStore());

        act(() => {
          result.current.setPremium(true);
        });

        expect(result.current.canUseWPM(1501)).toBe(false);
        expect(result.current.canUseWPM(2000)).toBe(false);
      });
    });

    describe('free tier user', () => {
      it('returns true for WPM at free tier limit', () => {
        const { result } = renderHook(() => useSubscriptionStore());

        act(() => {
          result.current.setPremium(false);
        });

        expect(result.current.canUseWPM(450)).toBe(true);
      });

      it('returns true for WPM below free tier limit', () => {
        const { result } = renderHook(() => useSubscriptionStore());

        act(() => {
          result.current.setPremium(false);
        });

        expect(result.current.canUseWPM(250)).toBe(true);
        expect(result.current.canUseWPM(50)).toBe(true);
      });

      it('returns false for WPM above free tier limit', () => {
        const { result } = renderHook(() => useSubscriptionStore());

        act(() => {
          result.current.setPremium(false);
        });

        expect(result.current.canUseWPM(451)).toBe(false);
        expect(result.current.canUseWPM(500)).toBe(false);
        expect(result.current.canUseWPM(1000)).toBe(false);
      });
    });
  });

  describe('purchaseProduct()', () => {
    it('returns false when no offerings available', async () => {
      mockPurchasesService.getOfferings.mockResolvedValueOnce([]);

      const { result } = renderHook(() => useSubscriptionStore());
      let purchaseResult: boolean = true;

      await act(async () => {
        purchaseResult = await result.current.purchaseProduct();
      });

      expect(purchaseResult).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('sets isPremium to true after successful purchase', async () => {
      mockPurchasesService.getOfferings.mockResolvedValueOnce([
        { identifier: 'premium', packageType: 'MONTHLY', product: { identifier: 'monthly', title: 'Premium', description: 'Monthly', priceString: '$4.99', price: 4.99 } },
      ]);
      mockPurchasesService.purchasePackage.mockResolvedValueOnce({
        entitlements: { active: { premium: { isActive: true } } },
      });

      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.purchaseProduct();
      });

      expect(result.current.isPremium).toBe(true);
    });

    it('returns false when purchase fails', async () => {
      mockPurchasesService.getOfferings.mockResolvedValueOnce([
        { identifier: 'premium', packageType: 'MONTHLY', product: { identifier: 'monthly', title: 'Premium', description: 'Monthly', priceString: '$4.99', price: 4.99 } },
      ]);
      mockPurchasesService.purchasePackage.mockRejectedValueOnce(new Error('Purchase cancelled'));

      const { result } = renderHook(() => useSubscriptionStore());
      let purchaseResult: boolean = true;

      await act(async () => {
        purchaseResult = await result.current.purchaseProduct();
      });

      expect(purchaseResult).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('linkRevenueCatUser()', () => {
    it('sets linkedUserId after linking', async () => {
      mockPurchasesService.loginUser.mockResolvedValueOnce(null);

      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.linkRevenueCatUser('user-123');
      });

      expect(result.current.linkedUserId).toBe('user-123');
      expect(result.current.isLoading).toBe(false);
    });

    it('updates premium status from RevenueCat response', async () => {
      mockPurchasesService.loginUser.mockResolvedValueOnce({
        entitlements: { active: { premium: { isActive: true } } },
      });

      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.linkRevenueCatUser('user-123');
      });

      expect(result.current.linkedUserId).toBe('user-123');
      expect(result.current.isPremium).toBe(true);
    });

    it('skips linking if already linked to same user', async () => {
      mockPurchasesService.loginUser.mockResolvedValueOnce(null);

      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.linkRevenueCatUser('user-123');
      });

      expect(result.current.linkedUserId).toBe('user-123');

      // Try to link again - should not call SDK
      await act(async () => {
        await result.current.linkRevenueCatUser('user-123');
      });

      expect(mockPurchasesService.loginUser).toHaveBeenCalledTimes(1);
    });

    it('allows relinking to different user', async () => {
      mockPurchasesService.loginUser.mockResolvedValue(null);

      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.linkRevenueCatUser('user-123');
      });

      expect(result.current.linkedUserId).toBe('user-123');

      await act(async () => {
        await result.current.linkRevenueCatUser('user-456');
      });

      expect(result.current.linkedUserId).toBe('user-456');
      expect(mockPurchasesService.loginUser).toHaveBeenCalledTimes(2);
    });
  });

  describe('unlinkRevenueCatUser()', () => {
    beforeEach(() => {
      useSubscriptionStore.setState({ linkedUserId: 'user-123' });
    });

    it('clears linkedUserId after unlinking', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      expect(result.current.linkedUserId).toBe('user-123');

      await act(async () => {
        await result.current.unlinkRevenueCatUser();
      });

      expect(result.current.linkedUserId).toBeNull();
      expect(mockPurchasesService.logoutUser).toHaveBeenCalled();
    });

    it('handles unlinking when linkedUserId is already null', async () => {
      useSubscriptionStore.setState({ linkedUserId: null });
      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.unlinkRevenueCatUser();
      });

      expect(result.current.linkedUserId).toBeNull();
    });

    it('can be called multiple times safely', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.unlinkRevenueCatUser();
      });

      expect(result.current.linkedUserId).toBeNull();

      // Calling again should not throw
      await act(async () => {
        await result.current.unlinkRevenueCatUser();
      });

      expect(result.current.linkedUserId).toBeNull();
    });
  });

  describe('restorePurchases()', () => {
    beforeEach(() => {
      useSubscriptionStore.setState({ isPremium: false, isRestoring: false, restoreError: null });
    });

    it('sets isRestoring to true while restoring', async () => {
      mockPurchasesService.restorePurchases.mockResolvedValueOnce(null);

      const { result } = renderHook(() => useSubscriptionStore());

      let restorePromise: ReturnType<typeof result.current.restorePurchases>;

      act(() => {
        restorePromise = result.current.restorePurchases();
      });

      expect(result.current.isRestoring).toBe(true);

      await act(async () => {
        await restorePromise;
      });

      expect(result.current.isRestoring).toBe(false);
    });

    it('returns success: true when premium entitlement found', async () => {
      mockPurchasesService.restorePurchases.mockResolvedValueOnce({
        entitlements: { active: { premium: { isActive: true } } },
      });

      const { result } = renderHook(() => useSubscriptionStore());
      let restoreResult: { success: boolean; message?: string };

      await act(async () => {
        restoreResult = await result.current.restorePurchases();
      });

      expect(restoreResult!.success).toBe(true);
      expect(result.current.isPremium).toBe(true);
    });

    it('returns success: false with message when no purchases to restore', async () => {
      mockPurchasesService.restorePurchases.mockResolvedValueOnce({
        entitlements: { active: {} },
      });

      const { result } = renderHook(() => useSubscriptionStore());
      let restoreResult: { success: boolean; message?: string };

      await act(async () => {
        restoreResult = await result.current.restorePurchases();
      });

      expect(restoreResult!.success).toBe(false);
      expect(restoreResult!.message).toBe('No purchases to restore');
    });

    it('returns not available message when SDK is not configured', async () => {
      mockPurchasesService.restorePurchases.mockResolvedValueOnce(null);

      const { result } = renderHook(() => useSubscriptionStore());
      let restoreResult: { success: boolean; message?: string };

      await act(async () => {
        restoreResult = await result.current.restorePurchases();
      });

      expect(restoreResult!.success).toBe(false);
      expect(restoreResult!.message).toBe('Purchase restoration not available');
    });

    it('handles errors from restorePurchases', async () => {
      mockPurchasesService.restorePurchases.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useSubscriptionStore());
      let restoreResult: { success: boolean; error?: string };

      await act(async () => {
        restoreResult = await result.current.restorePurchases();
      });

      expect(restoreResult!.success).toBe(false);
      expect(restoreResult!.error).toBe('Network error');
      expect(result.current.restoreError).toBe('Network error');
    });

    it('clears restoreError on successful restore', async () => {
      useSubscriptionStore.setState({ restoreError: 'Previous error' });

      mockPurchasesService.restorePurchases.mockResolvedValueOnce({
        entitlements: { active: { premium: { isActive: true } } },
      });

      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        await result.current.restorePurchases();
      });

      expect(result.current.restoreError).toBeNull();
    });
  });

  describe('constants validation', () => {
    it('FREE_TIER_LIMITS.MAX_CONTENT is 2', () => {
      expect(FREE_TIER_LIMITS.MAX_CONTENT).toBe(2);
    });

    it('FREE_TIER_LIMITS.MAX_WPM is 450', () => {
      expect(FREE_TIER_LIMITS.MAX_WPM).toBe(450);
    });

    it('PREMIUM_LIMITS.MAX_WPM is 1500', () => {
      expect(PREMIUM_LIMITS.MAX_WPM).toBe(1500);
    });
  });
});
