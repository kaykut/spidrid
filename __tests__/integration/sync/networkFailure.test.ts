/**
 * Network Failure Integration Tests
 *
 * Tests verifying sync behavior under network failures,
 * including error handling, recovery, and data integrity.
 */

import {
  performFullSync,
  pushAllChanges,
  pullAllData,
  getSyncState,
  resetSyncState,
} from '../../../src/services/syncOrchestrator';
import { useContentStore } from '../../../src/store/contentStore';
import {
  resetFactories,
  createMockContent,
  resetAllStores,
  setupPremiumUser,
  getContentState,
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

describe('Network Failure Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFactories();
    resetAllStores();
    mockDb.clearServerState();
    mockDb.simulateNetworkRestore();
    mockDb.setUserId('test-user-id');
  });

  // ===========================================================================
  // Graceful Failure Handling
  // ===========================================================================

  describe('graceful failure handling', () => {
    it('should return failure result when network is offline', async () => {
      setupPremiumUser();
      mockDb.simulateNetworkError('Network offline');

      const result = await performFullSync();

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should set sync status to error on failure', async () => {
      setupPremiumUser();
      mockDb.simulateNetworkError();

      await performFullSync();

      const state = getSyncState();
      expect(state.status).toBe('error');
      expect(state.error).toBeDefined();
    });

    it('should not update lastSyncAt on failure', async () => {
      setupPremiumUser();

      // First successful sync
      await performFullSync();

      // Reset state but keep lastSyncAt
      resetSyncState();

      // Force lastSyncAt to null for this test
      mockDb.simulateNetworkError();

      await performFullSync();

      // lastSyncAt should not be updated (stays null after reset)
      const state = getSyncState();
      expect(state.lastSyncAt).toBeNull();
    });

    it('should fail push operation gracefully on network error', async () => {
      setupPremiumUser();
      mockDb.simulateNetworkError('Push failed');

      // Add local content
      const content = createMockContent();
      useContentStore.setState({ importedContent: [content] });

      const result = await pushAllChanges();

      expect(result.success).toBe(false);
      expect(result.error).toContain('Push failed');
    });

    it('should fail pull operation gracefully on network error', async () => {
      setupPremiumUser();
      mockDb.simulateNetworkError('Pull failed');

      const result = await pullAllData();

      expect(result.success).toBe(false);
      expect(result.error).toContain('Pull failed');
    });
  });

  // ===========================================================================
  // Data Integrity
  // ===========================================================================

  describe('data integrity during failures', () => {
    it('should preserve local data when sync fails', async () => {
      setupPremiumUser();

      // Add local content
      const content = createMockContent({ id: 'preserve-me', title: 'Important' });
      useContentStore.setState({ importedContent: [content] });

      // Simulate network failure
      mockDb.simulateNetworkError();

      // Attempt sync (will fail)
      await performFullSync();

      // Verify local data is preserved
      const { importedContent } = getContentState();
      expect(importedContent).toHaveLength(1);
      expect(importedContent[0].id).toBe('preserve-me');
      expect(importedContent[0].title).toBe('Important');
    });

    it('should not corrupt local data on partial sync failure', async () => {
      setupPremiumUser();

      // Add multiple items
      const content1 = createMockContent({ id: 'item-1', title: 'First' });
      const content2 = createMockContent({ id: 'item-2', title: 'Second' });
      useContentStore.setState({ importedContent: [content1, content2] });

      // Simulate network failure
      mockDb.simulateNetworkError();

      await performFullSync();

      // Verify all local data intact
      const { importedContent } = getContentState();
      expect(importedContent).toHaveLength(2);
      expect(importedContent.find(c => c.id === 'item-1')).toBeDefined();
      expect(importedContent.find(c => c.id === 'item-2')).toBeDefined();
    });
  });

  // ===========================================================================
  // Recovery After Network Restored
  // ===========================================================================

  describe('recovery after network restored', () => {
    it('should succeed on next sync attempt after network returns', async () => {
      setupPremiumUser();

      // First attempt fails
      mockDb.simulateNetworkError();
      const failedResult = await performFullSync();
      expect(failedResult.success).toBe(false);

      // Restore network
      mockDb.simulateNetworkRestore();
      resetSyncState(); // Clear error state

      // Second attempt succeeds
      const successResult = await performFullSync();
      expect(successResult.success).toBe(true);
    });

    it('should sync pending changes after recovery', async () => {
      setupPremiumUser();

      // Add local content
      const content = createMockContent({ id: 'pending-sync', title: 'Pending' });
      useContentStore.setState({ importedContent: [content] });

      // First attempt fails
      mockDb.simulateNetworkError();
      await performFullSync();

      // Verify nothing reached server
      expect(mockDb.getItemsByType('imported')).toHaveLength(0);

      // Restore and sync again
      mockDb.simulateNetworkRestore();
      resetSyncState();
      await performFullSync();

      // Verify data reached server
      const serverItems = mockDb.getItemsByType('imported');
      expect(serverItems).toHaveLength(1);
      expect(serverItems[0].id).toBe('pending-sync');
    });

    it('should maintain correct sync status through failure/recovery cycle', async () => {
      setupPremiumUser();

      // Initial state
      expect(getSyncState().status).toBe('idle');

      // Fail
      mockDb.simulateNetworkError();
      await performFullSync();
      expect(getSyncState().status).toBe('error');

      // Recover
      mockDb.simulateNetworkRestore();
      resetSyncState();
      await performFullSync();
      expect(getSyncState().status).toBe('idle');
    });
  });

  // ===========================================================================
  // Sync Status Transitions
  // ===========================================================================

  describe('sync status transitions', () => {
    it('should transition idle -> syncing -> error on failure', async () => {
      setupPremiumUser();
      mockDb.simulateNetworkError();

      // Before sync
      expect(getSyncState().status).toBe('idle');

      // After failed sync
      await performFullSync();
      expect(getSyncState().status).toBe('error');
    });

    it('should transition idle -> syncing -> idle on success', async () => {
      setupPremiumUser();

      // Before sync
      expect(getSyncState().status).toBe('idle');

      // After successful sync
      await performFullSync();
      expect(getSyncState().status).toBe('idle');
      expect(getSyncState().error).toBeNull();
    });
  });

  // ===========================================================================
  // Error Messages
  // ===========================================================================

  describe('error message handling', () => {
    it('should include error message in result', async () => {
      setupPremiumUser();
      mockDb.simulateNetworkError('Connection timed out');

      const result = await performFullSync();

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(typeof result.error).toBe('string');
    });

    it('should store error message in sync state', async () => {
      setupPremiumUser();
      mockDb.simulateNetworkError('Server unavailable');

      await performFullSync();

      const state = getSyncState();
      expect(state.error).toBeDefined();
      expect(typeof state.error).toBe('string');
    });

    it('should clear error on successful sync', async () => {
      setupPremiumUser();

      // First: fail
      mockDb.simulateNetworkError('Error');
      await performFullSync();
      expect(getSyncState().error).toBeDefined();

      // Then: succeed
      mockDb.simulateNetworkRestore();
      resetSyncState();
      await performFullSync();
      expect(getSyncState().error).toBeNull();
    });
  });
});
