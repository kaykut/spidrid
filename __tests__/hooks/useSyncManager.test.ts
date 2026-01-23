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

  describe('initializeAutoSync - premium upgrade trigger', () => {
    afterEach(() => {
      cleanupAutoSync();
    });

    it('should trigger full sync when user becomes premium (while logged in)', async () => {
      // Setup: logged-in free user
      useAuthStore.setState({ isLoggedIn: true, userId: 'user-123' });
      useSubscriptionStore.setState({ isPremium: false });

      // Initialize auto-sync subscriptions
      initializeAutoSync();

      // Clear any calls from initialization
      jest.clearAllMocks();

      // Simulate premium upgrade
      await act(async () => {
        useSubscriptionStore.setState({ isPremium: true });
      });

      // Verify full sync was triggered
      await waitFor(() => {
        expect(performFullSync).toHaveBeenCalledTimes(1);
      });
    });

    it('should not trigger sync when user becomes premium but not logged in', async () => {
      // Setup: anonymous free user
      useAuthStore.setState({ isLoggedIn: false, userId: null });
      useSubscriptionStore.setState({ isPremium: false });

      // Initialize auto-sync subscriptions
      initializeAutoSync();

      // Clear any calls from initialization
      jest.clearAllMocks();

      // Simulate premium upgrade without login
      await act(async () => {
        useSubscriptionStore.setState({ isPremium: true });
      });

      // Wait a bit
      jest.advanceTimersByTime(1000);

      // Verify no sync triggered (user must be logged in)
      expect(performFullSync).not.toHaveBeenCalled();
    });

    it('should not trigger sync when already premium (no transition)', async () => {
      // Setup: already premium user
      useAuthStore.setState({ isLoggedIn: true, userId: 'user-123' });
      useSubscriptionStore.setState({ isPremium: true });

      // Initialize auto-sync subscriptions
      initializeAutoSync();

      // Clear any calls from initialization
      jest.clearAllMocks();

      // Simulate subscription store change without premium transition
      await act(async () => {
        useSubscriptionStore.setState({ isPremium: true, isLoading: false });
      });

      // Wait a bit
      jest.advanceTimersByTime(1000);

      // Verify no sync triggered (no transition from false to true)
      expect(performFullSync).not.toHaveBeenCalled();
    });

    it('should reset wasPremium state on cleanup', async () => {
      // Setup: logged-in premium user
      useAuthStore.setState({ isLoggedIn: true, userId: 'user-123' });
      useSubscriptionStore.setState({ isPremium: true });

      // Initialize auto-sync subscriptions
      initializeAutoSync();

      // Cleanup
      cleanupAutoSync();

      // Re-initialize with free user
      useAuthStore.setState({ isLoggedIn: true, userId: 'user-456' });
      useSubscriptionStore.setState({ isPremium: false });
      initializeAutoSync();

      // Clear any calls
      jest.clearAllMocks();

      // Upgrade to premium - should trigger sync (wasPremium was reset)
      await act(async () => {
        useSubscriptionStore.setState({ isPremium: true });
      });

      // Verify sync triggered
      await waitFor(() => {
        expect(performFullSync).toHaveBeenCalledTimes(1);
      });

      // Cleanup
      cleanupAutoSync();
    });
  });
});
