/**
 * Auth-Sync Integration Tests
 *
 * Tests verifying the integration between authentication state changes
 * and sync operations, including auto-sync on login for premium users.
 */

import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useSyncManager } from '../../../src/hooks/useSyncManager';
import { useAuthStore } from '../../../src/store/authStore';
import { useSubscriptionStore } from '../../../src/store/subscriptionStore';
import { SyncResult } from '../../../src/services/syncOrchestrator';
import {
  resetFactories,
  resetAllStores,
  setupPremiumUser,
  type StatefulSupabaseMock,
} from '../helpers';

// =============================================================================
// Mock Setup
// =============================================================================

let mockDb: StatefulSupabaseMock;

// Mock the sync orchestrator to track calls
const mockPerformFullSync = jest.fn().mockResolvedValue({ success: true, syncedAt: Date.now() });
const mockPushAllChanges = jest.fn().mockResolvedValue({ success: true, syncedAt: Date.now() });

jest.mock('../../../src/services/syncOrchestrator', () => ({
  performFullSync: (...args: unknown[]) => mockPerformFullSync(...args),
  pushAllChanges: (...args: unknown[]) => mockPushAllChanges(...args),
  getSyncState: jest.fn(() => ({ status: 'idle', lastSyncAt: null, error: null })),
  resetSyncState: jest.fn(),
}));

jest.mock('../../../src/services/supabase', () => {
  const { createStatefulSupabaseMock } = require('../helpers/mockSupabaseStateful');
  mockDb = createStatefulSupabaseMock();
  return { supabase: mockDb.supabase };
});

// =============================================================================
// Tests
// =============================================================================

describe('Auth-Sync Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFactories();
    resetAllStores();
    if (mockDb) {
      mockDb.clearServerState();
      mockDb.simulateNetworkRestore();
      mockDb.setUserId('test-user-id');
    }
  });

  // ===========================================================================
  // Login Triggers Sync
  // ===========================================================================

  describe('login triggers sync', () => {
    it('should trigger fullSync when premium user logs in', async () => {
      // Start as logged out
      useAuthStore.setState({ isLoggedIn: false, userId: null });
      useSubscriptionStore.setState({ isPremium: true }); // Premium but not logged in

      const { result: _result, rerender } = renderHook(() => useSyncManager());

      // Verify no sync yet
      expect(mockPerformFullSync).not.toHaveBeenCalled();

      // Simulate login
      await act(async () => {
        useAuthStore.setState({ isLoggedIn: true, userId: 'new-user-id' });
        rerender({});
      });

      // Wait for sync effect
      await waitFor(() => {
        expect(mockPerformFullSync).toHaveBeenCalled();
      });
    });

    it('should NOT trigger sync for non-premium login', async () => {
      // Start as logged out
      useAuthStore.setState({ isLoggedIn: false, userId: null });
      useSubscriptionStore.setState({ isPremium: false }); // Free user

      const { result: _result, rerender } = renderHook(() => useSyncManager());

      // Simulate login as free user
      await act(async () => {
        useAuthStore.setState({ isLoggedIn: true, userId: 'free-user-id' });
        rerender({});
      });

      // Wait a bit to ensure no sync is triggered
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(mockPerformFullSync).not.toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Logout Behavior
  // ===========================================================================

  describe('logout behavior', () => {
    it('should NOT trigger sync after logout', async () => {
      // Start as logged in premium
      setupPremiumUser();

      const { result: _result, rerender } = renderHook(() => useSyncManager());

      // Clear any login-triggered syncs
      mockPerformFullSync.mockClear();

      // Simulate logout
      await act(async () => {
        useAuthStore.setState({ isLoggedIn: false, userId: null, isAnonymous: true });
        rerender({});
      });

      // Wait a bit
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(mockPerformFullSync).not.toHaveBeenCalled();
    });

    it('should reject manual sync attempts after logout', async () => {
      // Start as logged out
      useAuthStore.setState({ isLoggedIn: false });
      useSubscriptionStore.setState({ isPremium: true });

      const { result } = renderHook(() => useSyncManager());

      let syncResult: SyncResult | undefined;
      await act(async () => {
        syncResult = await result.current.triggerFullSync();
      });

      expect(syncResult?.success).toBe(false);
      expect(syncResult?.error).toBe('Not logged in');
    });
  });

  // ===========================================================================
  // Premium Status Changes
  // ===========================================================================

  describe('premium status changes', () => {
    it('should NOT allow sync when user downgrades from premium', async () => {
      // Start as premium logged in
      useAuthStore.setState({ isLoggedIn: true, userId: 'user-id' });
      useSubscriptionStore.setState({ isPremium: true });

      const { result, rerender } = renderHook(() => useSyncManager());

      // Downgrade to free
      await act(async () => {
        useSubscriptionStore.setState({ isPremium: false });
        rerender({});
      });

      // Try to sync manually
      let syncResult: SyncResult | undefined;
      await act(async () => {
        syncResult = await result.current.triggerFullSync();
      });

      expect(syncResult?.success).toBe(false);
      expect(syncResult?.error).toBe('Premium required for sync');
    });

    it('should allow sync after upgrading to premium', async () => {
      // Start as free logged in
      useAuthStore.setState({ isLoggedIn: true, userId: 'user-id' });
      useSubscriptionStore.setState({ isPremium: false });

      const { result, rerender } = renderHook(() => useSyncManager());

      // Upgrade to premium
      await act(async () => {
        useSubscriptionStore.setState({ isPremium: true });
        rerender({});
      });

      // Try to sync manually
      await act(async () => {
        await result.current.triggerFullSync();
      });

      // Should have called the underlying sync function
      expect(mockPerformFullSync).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Sync State Exposure
  // ===========================================================================

  describe('sync state exposure', () => {
    it('should expose isLoggedIn from auth store', () => {
      useAuthStore.setState({ isLoggedIn: true });

      const { result } = renderHook(() => useSyncManager());

      expect(result.current.isLoggedIn).toBe(true);
    });

    it('should expose isPremium from subscription store', () => {
      useSubscriptionStore.setState({ isPremium: true });

      const { result } = renderHook(() => useSyncManager());

      expect(result.current.isPremium).toBe(true);
    });

    it('should update when auth state changes', async () => {
      useAuthStore.setState({ isLoggedIn: false });

      const { result, rerender } = renderHook(() => useSyncManager());

      expect(result.current.isLoggedIn).toBe(false);

      await act(async () => {
        useAuthStore.setState({ isLoggedIn: true });
        rerender({});
      });

      expect(result.current.isLoggedIn).toBe(true);
    });
  });

  // ===========================================================================
  // RevenueCat Linking
  // ===========================================================================

  describe('RevenueCat user linking', () => {
    it('should have linkedUserId null initially', () => {
      const { linkedUserId } = useSubscriptionStore.getState();
      expect(linkedUserId).toBeNull();
    });

    it('should update linkedUserId after linking', async () => {
      await act(async () => {
        await useSubscriptionStore.getState().linkRevenueCatUser('linked-user-123');
      });

      const { linkedUserId } = useSubscriptionStore.getState();
      expect(linkedUserId).toBe('linked-user-123');
    });

    it('should skip linking if already linked to same user', async () => {
      // First link
      await act(async () => {
        await useSubscriptionStore.getState().linkRevenueCatUser('user-123');
      });

      // Try to link again (should be no-op)
      await act(async () => {
        await useSubscriptionStore.getState().linkRevenueCatUser('user-123');
      });

      // Should not have triggered loading
      expect(useSubscriptionStore.getState().isLoading).toBe(false);
    });
  });

  // ===========================================================================
  // Combined Auth + Premium Guard
  // ===========================================================================

  describe('combined auth + premium guard', () => {
    it('should require both logged in AND premium for sync', async () => {
      const { result, rerender } = renderHook(() => useSyncManager());

      // Case 1: Not logged in, not premium
      useAuthStore.setState({ isLoggedIn: false });
      useSubscriptionStore.setState({ isPremium: false });
      rerender({});

      let syncResult = await result.current.triggerFullSync();
      expect(syncResult.success).toBe(false);

      // Case 2: Logged in, not premium
      useAuthStore.setState({ isLoggedIn: true });
      useSubscriptionStore.setState({ isPremium: false });
      rerender({});

      syncResult = await result.current.triggerFullSync();
      expect(syncResult.success).toBe(false);
      expect(syncResult.error).toBe('Premium required for sync');

      // Case 3: Not logged in, premium
      useAuthStore.setState({ isLoggedIn: false });
      useSubscriptionStore.setState({ isPremium: true });
      rerender({});

      syncResult = await result.current.triggerFullSync();
      expect(syncResult.success).toBe(false);
      expect(syncResult.error).toBe('Not logged in');

      // Case 4: Logged in AND premium - should succeed
      useAuthStore.setState({ isLoggedIn: true });
      useSubscriptionStore.setState({ isPremium: true });
      rerender({});

      await act(async () => {
        syncResult = await result.current.triggerFullSync();
      });

      expect(mockPerformFullSync).toHaveBeenCalled();
    });
  });
});
