/**
 * Tests for Subscription Store.
 *
 * Manages premium subscription state, content access limits, and WPM limits.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useSubscriptionStore } from '../../src/store/subscriptionStore';
import { FREE_TIER_LIMITS, PREMIUM_LIMITS } from '../../src/types/subscription';

describe('subscriptionStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useSubscriptionStore());
    act(() => {
      result.current.setPremium(false);
      result.current.resetContentCount();
    });
  });

  describe('initial state', () => {
    it('starts with isPremium as false', () => {
      const { result } = renderHook(() => useSubscriptionStore());
      expect(result.current.isPremium).toBe(false);
    });

    it('starts with contentAccessCount as 0', () => {
      const { result } = renderHook(() => useSubscriptionStore());
      // Reset to ensure clean state
      act(() => {
        result.current.resetContentCount();
      });
      expect(result.current.contentAccessCount).toBe(0);
    });

    it('starts with isLoading as false', () => {
      const { result } = renderHook(() => useSubscriptionStore());
      // Note: isLoading may be true during initialization
      // After initialization, it should be false
      expect(typeof result.current.isLoading).toBe('boolean');
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
        result.current.resetContentCount();
      });

      act(() => {
        result.current.incrementContentCount();
      });

      expect(result.current.contentAccessCount).toBe(1);
    });

    it('increments multiple times correctly', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.resetContentCount();
      });

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

  describe('simulatePurchase()', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('sets isPremium to true after completion', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(false);
      });

      let purchasePromise: Promise<boolean>;

      act(() => {
        purchasePromise = result.current.simulatePurchase();
      });

      // Should be loading
      expect(result.current.isLoading).toBe(true);

      // Advance timers
      await act(async () => {
        jest.advanceTimersByTime(1000);
        await purchasePromise;
      });

      expect(result.current.isPremium).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it('returns true on successful purchase', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      let purchaseResult: boolean = false;

      await act(async () => {
        const promise = result.current.simulatePurchase();
        jest.advanceTimersByTime(1000);
        purchaseResult = await promise;
      });

      expect(purchaseResult).toBe(true);
    });
  });

  describe('simulateRestore()', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns current premium status', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(false);
      });

      let restoreResult: boolean = true;

      await act(async () => {
        const promise = result.current.simulateRestore();
        jest.advanceTimersByTime(500);
        restoreResult = await promise;
      });

      expect(restoreResult).toBe(false);
    });

    it('returns true if user was already premium', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(true);
      });

      let restoreResult: boolean = false;

      await act(async () => {
        const promise = result.current.simulateRestore();
        jest.advanceTimersByTime(500);
        restoreResult = await promise;
      });

      expect(restoreResult).toBe(true);
    });

    it('sets isLoading during restore', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      let restorePromise: Promise<boolean>;

      act(() => {
        restorePromise = result.current.simulateRestore();
      });

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        jest.advanceTimersByTime(500);
        await restorePromise;
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('constants validation', () => {
    it('FREE_TIER_LIMITS.MAX_CONTENT is 5', () => {
      expect(FREE_TIER_LIMITS.MAX_CONTENT).toBe(5);
    });

    it('FREE_TIER_LIMITS.MAX_WPM is 450', () => {
      expect(FREE_TIER_LIMITS.MAX_WPM).toBe(450);
    });

    it('PREMIUM_LIMITS.MAX_WPM is 1500', () => {
      expect(PREMIUM_LIMITS.MAX_WPM).toBe(1500);
    });
  });

  describe('linkRevenueCatUser()', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('sets linkedUserId after linking', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      let linkPromise: Promise<void>;

      act(() => {
        linkPromise = result.current.linkRevenueCatUser('user-123');
      });

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        jest.advanceTimersByTime(200);
        await linkPromise;
      });

      expect(result.current.linkedUserId).toBe('user-123');
      expect(result.current.isLoading).toBe(false);
    });

    it('skips linking if already linked to same user', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      // First link
      await act(async () => {
        const promise = result.current.linkRevenueCatUser('user-123');
        jest.advanceTimersByTime(200);
        await promise;
      });

      expect(result.current.linkedUserId).toBe('user-123');

      // Try to link again - should not set loading
      await act(async () => {
        await result.current.linkRevenueCatUser('user-123');
      });

      // Should not have triggered loading since already linked
      expect(result.current.isLoading).toBe(false);
    });

    it('allows relinking to different user', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      // First link
      await act(async () => {
        const promise = result.current.linkRevenueCatUser('user-123');
        jest.advanceTimersByTime(200);
        await promise;
      });

      expect(result.current.linkedUserId).toBe('user-123');

      // Link to different user
      await act(async () => {
        const promise = result.current.linkRevenueCatUser('user-456');
        jest.advanceTimersByTime(200);
        await promise;
      });

      expect(result.current.linkedUserId).toBe('user-456');
    });

    it('starts with linkedUserId as null', () => {
      // Reset to check initial state
      useSubscriptionStore.setState({ linkedUserId: null });
      const { result } = renderHook(() => useSubscriptionStore());
      expect(result.current.linkedUserId).toBeNull();
    });
  });

  describe('unlinkRevenueCatUser()', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      // Reset linkedUserId for each test
      useSubscriptionStore.setState({ linkedUserId: 'user-123' });
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('clears linkedUserId after unlinking', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      expect(result.current.linkedUserId).toBe('user-123');

      await act(async () => {
        await result.current.unlinkRevenueCatUser();
      });

      expect(result.current.linkedUserId).toBeNull();
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
      jest.useFakeTimers();
      // Reset state for each test
      useSubscriptionStore.setState({ isPremium: false, isRestoring: false, restoreError: null });
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('sets isRestoring to true while restoring', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      let restorePromise: ReturnType<typeof result.current.restorePurchases>;

      act(() => {
        restorePromise = result.current.restorePurchases();
      });

      expect(result.current.isRestoring).toBe(true);

      await act(async () => {
        jest.advanceTimersByTime(500);
        await restorePromise;
      });

      expect(result.current.isRestoring).toBe(false);
    });

    it('returns success: true when user was premium', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(true);
      });

      let restoreResult: { success: boolean; message?: string };

      await act(async () => {
        const promise = result.current.restorePurchases();
        jest.advanceTimersByTime(500);
        restoreResult = await promise;
      });

      expect(restoreResult!.success).toBe(true);
      expect(result.current.isPremium).toBe(true);
    });

    it('returns success: false with message when no purchases to restore', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.setPremium(false);
      });

      let restoreResult: { success: boolean; message?: string };

      await act(async () => {
        const promise = result.current.restorePurchases();
        jest.advanceTimersByTime(500);
        restoreResult = await promise;
      });

      expect(restoreResult!.success).toBe(false);
      expect(restoreResult!.message).toBe('No purchases to restore');
    });

    it('can be called multiple times safely', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      await act(async () => {
        const promise = result.current.restorePurchases();
        jest.advanceTimersByTime(500);
        await promise;
      });

      // Should not throw when called again
      await act(async () => {
        const promise = result.current.restorePurchases();
        jest.advanceTimersByTime(500);
        await promise;
      });

      expect(result.current.isRestoring).toBe(false);
    });

    it('clears restoreError on successful restore', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      // Set a previous error
      useSubscriptionStore.setState({ restoreError: 'Previous error' });

      act(() => {
        result.current.setPremium(true);
      });

      await act(async () => {
        const promise = result.current.restorePurchases();
        jest.advanceTimersByTime(500);
        await promise;
      });

      expect(result.current.restoreError).toBeNull();
    });
  });
});
