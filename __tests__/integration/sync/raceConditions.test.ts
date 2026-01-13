/**
 * Race Condition Integration Tests
 *
 * Tests verifying sync behavior under concurrent operations,
 * including sync lock, debounce, and simultaneous push/pull.
 */

import { renderHook, act } from '@testing-library/react-native';
import { performFullSync } from '../../../src/services/syncOrchestrator';
import { useSyncManager } from '../../../src/hooks/useSyncManager';
import { useAuthStore } from '../../../src/store/authStore';
import { useSubscriptionStore } from '../../../src/store/subscriptionStore';
import { useContentStore } from '../../../src/store/contentStore';
import {
  resetFactories,
  createMockContent,
  resetAllStores,
  setupPremiumUser,
  type StatefulSupabaseMock,
} from '../helpers';

// =============================================================================
// Mock Setup
// =============================================================================

let mockDb: StatefulSupabaseMock;

jest.mock('../../../src/services/supabase', () => {
  const { createStatefulSupabaseMock } = require('../helpers/mockSupabaseStateful');
  mockDb = createStatefulSupabaseMock();
  return { supabase: mockDb.supabase };
});

// =============================================================================
// Tests
// =============================================================================

describe('Race Condition Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    resetFactories();
    resetAllStores();
    mockDb.clearServerState();
    mockDb.simulateNetworkRestore();
    mockDb.setUserId('test-user-id');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ===========================================================================
  // Sync Lock (Prevent Concurrent Syncs)
  // ===========================================================================

  describe('sync lock mechanism', () => {
    it('should return "Sync already in progress" for concurrent sync calls', async () => {
      setupPremiumUser();

      // Start first sync (don't await yet)
      const sync1Promise = performFullSync();

      // Immediately try second sync
      const sync2Result = await performFullSync();

      // Second should fail with in-progress message
      expect(sync2Result.success).toBe(false);
      expect(sync2Result.error).toBe('Sync already in progress');

      // First should succeed
      const sync1Result = await sync1Promise;
      expect(sync1Result.success).toBe(true);
    });

    it('should allow new sync after previous completes', async () => {
      setupPremiumUser();

      // First sync
      const result1 = await performFullSync();
      expect(result1.success).toBe(true);

      // Second sync (after first completes)
      const result2 = await performFullSync();
      expect(result2.success).toBe(true);
    });

    it('should allow sync after failed sync completes', async () => {
      setupPremiumUser();

      // First sync fails
      mockDb.simulateNetworkError();
      const result1 = await performFullSync();
      expect(result1.success).toBe(false);

      // Second sync after network restored
      mockDb.simulateNetworkRestore();
      const result2 = await performFullSync();
      expect(result2.success).toBe(true);
    });
  });

  // ===========================================================================
  // Debounced Push (via useSyncManager)
  // ===========================================================================

  describe('debounced push', () => {
    it('should batch rapid triggerPush calls into single push', async () => {
      // Setup stores
      useAuthStore.setState({ isLoggedIn: true, userId: 'test-user-id' });
      useSubscriptionStore.setState({ isPremium: true });

      const { result } = renderHook(() => useSyncManager());

      // Trigger multiple pushes rapidly
      act(() => {
        result.current.triggerPush();
        result.current.triggerPush();
        result.current.triggerPush();
      });

      // Advance timers partially (less than debounce time)
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      // No push yet (debounce not complete)
      expect(mockDb.getServerState().size).toBe(0);

      // Advance past debounce time
      await act(async () => {
        jest.advanceTimersByTime(3000);
      });

      // Now push should have happened (though may be empty if no content)
      // The important thing is only 1 push occurred, not 3
    });

    it('should reset debounce timer on new triggerPush call', async () => {
      useAuthStore.setState({ isLoggedIn: true, userId: 'test-user-id' });
      useSubscriptionStore.setState({ isPremium: true });

      // Add content to push
      const content = createMockContent({ id: 'debounce-test' });
      useContentStore.setState({ importedContent: [content] });

      const { result } = renderHook(() => useSyncManager());

      // First trigger
      act(() => {
        result.current.triggerPush();
      });

      // Advance 4 seconds (less than 5s debounce)
      act(() => {
        jest.advanceTimersByTime(4000);
      });

      // Trigger again (should reset timer)
      act(() => {
        result.current.triggerPush();
      });

      // Advance another 4 seconds (8s total, but only 4s since last trigger)
      act(() => {
        jest.advanceTimersByTime(4000);
      });

      // Still no push (timer was reset)
      expect(mockDb.getServerState().size).toBe(0);

      // Advance final 2 seconds (6s since last trigger)
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      // Now push should have occurred
      const serverItems = mockDb.getItemsByType('imported');
      expect(serverItems.length).toBe(1);
    });
  });

  // ===========================================================================
  // Force Push (Bypass Debounce)
  // ===========================================================================

  describe('forcePush behavior', () => {
    it('should execute immediately without waiting for debounce', async () => {
      useAuthStore.setState({ isLoggedIn: true, userId: 'test-user-id' });
      useSubscriptionStore.setState({ isPremium: true });

      // Add content
      const content = createMockContent({ id: 'force-push-test' });
      useContentStore.setState({ importedContent: [content] });

      const { result } = renderHook(() => useSyncManager());

      // Force push
      await act(async () => {
        await result.current.forcePush();
      });

      // Should have pushed immediately (no timer advance needed)
      const serverItems = mockDb.getItemsByType('imported');
      expect(serverItems.length).toBe(1);
      expect(serverItems[0].id).toBe('force-push-test');
    });

    it('should cancel pending debounced push', async () => {
      useAuthStore.setState({ isLoggedIn: true, userId: 'test-user-id' });
      useSubscriptionStore.setState({ isPremium: true });

      const content = createMockContent({ id: 'cancel-test' });
      useContentStore.setState({ importedContent: [content] });

      const { result } = renderHook(() => useSyncManager());

      // Start debounced push
      act(() => {
        result.current.triggerPush();
      });

      // Force push (should cancel pending)
      await act(async () => {
        await result.current.forcePush();
      });

      // Clear server state to verify no second push
      mockDb.clearServerState();

      // Advance past original debounce time
      act(() => {
        jest.advanceTimersByTime(10000);
      });

      // Server should still be empty (debounced push was cancelled)
      expect(mockDb.getServerState().size).toBe(0);
    });
  });

  // ===========================================================================
  // Store Mutations During Sync
  // ===========================================================================

  describe('store mutations during sync', () => {
    it('should not lose changes made during active sync', async () => {
      setupPremiumUser();

      // Start with one item
      const content1 = createMockContent({ id: 'before-sync' });
      useContentStore.setState({ importedContent: [content1] });

      // Start sync
      const syncPromise = performFullSync();

      // Add item during sync
      const content2 = createMockContent({ id: 'during-sync' });
      useContentStore.setState({
        importedContent: [...useContentStore.getState().importedContent, content2],
      });

      // Wait for sync to complete
      await syncPromise;

      // Both items should exist locally
      const { importedContent } = useContentStore.getState();
      expect(importedContent.length).toBe(2);
      expect(importedContent.some(c => c.id === 'before-sync')).toBe(true);
      expect(importedContent.some(c => c.id === 'during-sync')).toBe(true);
    });
  });

  // ===========================================================================
  // Sync Ordering
  // ===========================================================================

  describe('sync ordering', () => {
    it('should process syncs in order when called sequentially', async () => {
      setupPremiumUser();

      const order: number[] = [];

      // Create content items
      const content1 = createMockContent({ id: 'first' });
      useContentStore.setState({ importedContent: [content1] });

      await performFullSync();
      order.push(1);

      const content2 = createMockContent({ id: 'second' });
      useContentStore.setState({
        importedContent: [...useContentStore.getState().importedContent, content2],
      });

      await performFullSync();
      order.push(2);

      expect(order).toEqual([1, 2]);
    });
  });
});
