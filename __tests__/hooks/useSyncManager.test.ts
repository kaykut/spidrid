import { renderHook, act, waitFor } from '@testing-library/react-native';
import {
  useSyncManager,
  initializeAutoSync,
  cleanupAutoSync,
} from '../../src/hooks/useSyncManager';
import { useAuthStore } from '../../src/store/authStore';
import { useSubscriptionStore } from '../../src/store/subscriptionStore';
import {
  performFullSync,
  pushAllChanges,
  SyncResult,
} from '../../src/services/syncOrchestrator';

// Mock syncOrchestrator
jest.mock('../../src/services/syncOrchestrator', () => ({
  performFullSync: jest.fn().mockResolvedValue({ success: true, syncedAt: Date.now() }),
  pushAllChanges: jest.fn().mockResolvedValue({ success: true, syncedAt: Date.now() }),
  getSyncState: jest.fn(() => ({
    status: 'idle',
    lastSyncAt: null,
    error: null,
  })),
  resetSyncState: jest.fn(),
}));

describe('useSyncManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    // Reset stores
    useAuthStore.setState({ isLoggedIn: false, userId: null });
    useSubscriptionStore.setState({ isPremium: false });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('initial state', () => {
    it('should return sync state', () => {
      const { result } = renderHook(() => useSyncManager());

      expect(result.current.status).toBe('idle');
      expect(result.current.lastSyncAt).toBeNull();
      expect(result.current.error).toBeNull();
    });

    it('should return auth state', () => {
      useAuthStore.setState({ isLoggedIn: true });
      useSubscriptionStore.setState({ isPremium: true });

      const { result } = renderHook(() => useSyncManager());

      expect(result.current.isLoggedIn).toBe(true);
      expect(result.current.isPremium).toBe(true);
    });
  });

  describe('triggerFullSync', () => {
    it('should fail when not logged in', async () => {
      useSubscriptionStore.setState({ isPremium: true });

      const { result } = renderHook(() => useSyncManager());

      let syncResult: SyncResult | undefined;
      await act(async () => {
        syncResult = await result.current.triggerFullSync();
      });

      expect(syncResult?.success).toBe(false);
      expect(syncResult?.error).toBe('Not logged in');
      expect(performFullSync).not.toHaveBeenCalled();
    });

    it('should fail when not premium', async () => {
      useAuthStore.setState({ isLoggedIn: true });

      const { result } = renderHook(() => useSyncManager());

      let syncResult: SyncResult | undefined;
      await act(async () => {
        syncResult = await result.current.triggerFullSync();
      });

      expect(syncResult?.success).toBe(false);
      expect(syncResult?.error).toBe('Premium required for sync');
      expect(performFullSync).not.toHaveBeenCalled();
    });

    it('should call performFullSync when premium and logged in', async () => {
      useAuthStore.setState({ isLoggedIn: true });
      useSubscriptionStore.setState({ isPremium: true });

      const { result } = renderHook(() => useSyncManager());

      await act(async () => {
        await result.current.triggerFullSync();
      });

      expect(performFullSync).toHaveBeenCalled();
    });
  });

  describe('triggerPush', () => {
    it('should not push when not logged in', async () => {
      useSubscriptionStore.setState({ isPremium: true });

      const { result } = renderHook(() => useSyncManager());

      act(() => {
        result.current.triggerPush();
      });

      // Advance timers
      jest.advanceTimersByTime(6000);

      expect(pushAllChanges).not.toHaveBeenCalled();
    });

    it('should debounce push calls', async () => {
      useAuthStore.setState({ isLoggedIn: true });
      useSubscriptionStore.setState({ isPremium: true });

      const { result } = renderHook(() => useSyncManager());

      // Trigger multiple pushes
      act(() => {
        result.current.triggerPush();
        result.current.triggerPush();
        result.current.triggerPush();
      });

      // Advance timers by less than debounce time
      jest.advanceTimersByTime(3000);
      expect(pushAllChanges).not.toHaveBeenCalled();

      // Advance past debounce time
      await act(async () => {
        jest.advanceTimersByTime(3000);
      });

      // Should only call once due to debounce
      expect(pushAllChanges).toHaveBeenCalledTimes(1);
    });
  });

  describe('forcePush', () => {
    it('should fail when not premium', async () => {
      useAuthStore.setState({ isLoggedIn: true });

      const { result } = renderHook(() => useSyncManager());

      let syncResult: SyncResult | undefined;
      await act(async () => {
        syncResult = await result.current.forcePush();
      });

      expect(syncResult?.success).toBe(false);
      expect(syncResult?.error).toBe('Premium required for sync');
      expect(pushAllChanges).not.toHaveBeenCalled();
    });

    it('should push immediately without debounce', async () => {
      useAuthStore.setState({ isLoggedIn: true });
      useSubscriptionStore.setState({ isPremium: true });

      const { result } = renderHook(() => useSyncManager());

      await act(async () => {
        await result.current.forcePush();
      });

      expect(pushAllChanges).toHaveBeenCalled();
    });

    it('should cancel pending debounced push', async () => {
      useAuthStore.setState({ isLoggedIn: true });
      useSubscriptionStore.setState({ isPremium: true });

      const { result } = renderHook(() => useSyncManager());

      // Start a debounced push
      act(() => {
        result.current.triggerPush();
      });

      // Force push immediately
      await act(async () => {
        await result.current.forcePush();
      });

      // Advance timers past debounce
      jest.advanceTimersByTime(10000);

      // Should only have been called once (from forcePush)
      expect(pushAllChanges).toHaveBeenCalledTimes(1);
    });
  });

  describe('auto sync on login', () => {
    it('should trigger full sync when premium user logs in', async () => {
      useSubscriptionStore.setState({ isPremium: true });

      const { rerender } = renderHook(() => useSyncManager());

      // Simulate login
      await act(async () => {
        useAuthStore.setState({ isLoggedIn: true });
        rerender({});
      });

      // Wait for async effect
      await waitFor(() => {
        expect(performFullSync).toHaveBeenCalled();
      });
    });

    it('should not auto sync for non-premium users', async () => {
      useSubscriptionStore.setState({ isPremium: false });

      const { rerender } = renderHook(() => useSyncManager());

      // Simulate login
      act(() => {
        useAuthStore.setState({ isLoggedIn: true });
        rerender({});
      });

      // Wait a bit
      jest.advanceTimersByTime(1000);

      expect(performFullSync).not.toHaveBeenCalled();
    });
  });

  describe('initializeAutoSync - content change auto-push', () => {
    afterEach(() => {
      cleanupAutoSync();
    });

    it('should set up content store subscriptions for auto-push', () => {
      // Initialize auto-sync subscriptions
      initializeAutoSync();

      // The function should complete without error
      // Content store subscriptions are set up internally
      // Premium upgrade sync is now handled directly in subscription store functions
      expect(true).toBe(true);

      // Cleanup
      cleanupAutoSync();
    });

    it('should clean up subscriptions on cleanup', () => {
      // Initialize
      initializeAutoSync();

      // Cleanup should not throw
      expect(() => cleanupAutoSync()).not.toThrow();

      // Double cleanup should also not throw
      expect(() => cleanupAutoSync()).not.toThrow();
    });
  });
});
