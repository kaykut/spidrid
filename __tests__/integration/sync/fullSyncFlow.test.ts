/**
 * Full Sync Flow Integration Tests
 *
 * End-to-end tests verifying that performFullSync correctly orchestrates
 * all 6 sync adapters (content, generated, curriculum, learning, journey, settings).
 */

import {
  performFullSync,
  pushAllChanges,
  pullAllData,
  getSyncState,
} from '../../../src/services/syncOrchestrator';
import { useContentStore } from '../../../src/store/contentStore';
import { useGeneratedStore } from '../../../src/store/generatedStore';
import {
  resetFactories,
  createMockContent,
  createMockGenerated,
  resetAllStores,
  setupPremiumUser,
  getContentState,
  getGeneratedState,
  createServerRow,
  type StatefulSupabaseMock,
} from '../helpers';

// =============================================================================
// Mock Setup
// =============================================================================

let mockDb: StatefulSupabaseMock;

jest.mock('../../../src/services/supabase', () => {
  // Create mock on first import
  const { createStatefulSupabaseMock } = require('../helpers/mockSupabaseStateful');
  mockDb = createStatefulSupabaseMock();
  return { supabase: mockDb.supabase };
});

// =============================================================================
// Tests
// =============================================================================

describe('Full Sync Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFactories();
    resetAllStores();
    mockDb.clearServerState();
    mockDb.simulateNetworkRestore();
    mockDb.setUserId('test-user-id');
  });

  // ===========================================================================
  // Basic Sync Flow
  // ===========================================================================

  describe('performFullSync basic flow', () => {
    it('should return success with item counts when sync completes', async () => {
      setupPremiumUser();

      // Add local content
      const content = createMockContent({ title: 'Local Article' });
      useContentStore.setState({ importedContent: [content] });

      // Perform sync
      const result = await performFullSync();

      // Verify success
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(result.syncedAt).toBeGreaterThan(0);
      expect(result.itemCounts).toBeDefined();
    });

    it('should update lastSyncAt timestamp on success', async () => {
      setupPremiumUser();

      // Check initial state
      const beforeSync = getSyncState();
      expect(beforeSync.lastSyncAt).toBeNull();

      // Perform sync
      await performFullSync();

      // Verify timestamp updated
      const afterSync = getSyncState();
      expect(afterSync.lastSyncAt).not.toBeNull();
      expect(afterSync.lastSyncAt).toBeGreaterThan(0);
    });

    it('should set sync status to idle after successful sync', async () => {
      setupPremiumUser();

      await performFullSync();

      const state = getSyncState();
      expect(state.status).toBe('idle');
      expect(state.error).toBeNull();
    });
  });

  // ===========================================================================
  // Local-Only Data Preservation
  // ===========================================================================

  describe('local data preservation', () => {
    it('should preserve local-only content items after sync', async () => {
      setupPremiumUser();

      // Add local content
      const content1 = createMockContent({ id: 'local-1', title: 'Local Only' });
      const content2 = createMockContent({ id: 'local-2', title: 'Also Local' });
      useContentStore.setState({ importedContent: [content1, content2] });

      // Sync
      await performFullSync();

      // Verify local content still exists
      const { importedContent } = getContentState();
      expect(importedContent.length).toBe(2);
      expect(importedContent.some(c => c.id === 'local-1')).toBe(true);
      expect(importedContent.some(c => c.id === 'local-2')).toBe(true);
    });

    it('should preserve local-only generated articles after sync', async () => {
      setupPremiumUser();

      // Add local generated article
      const article = createMockGenerated({
        id: 'local-gen-1',
        title: 'Local Generated',
        status: 'complete',
      });
      useGeneratedStore.setState({ articles: [article] });

      // Sync
      await performFullSync();

      // Verify local article still exists
      const { articles } = getGeneratedState();
      expect(articles.length).toBe(1);
      expect(articles[0].id).toBe('local-gen-1');
    });
  });

  // ===========================================================================
  // Remote Data Pull
  // ===========================================================================

  describe('remote data pull', () => {
    it('should pull remote-only content into local store', async () => {
      setupPremiumUser();

      // Seed remote data
      const remoteContent = createMockContent({
        id: 'remote-1',
        title: 'Remote Content',
        createdAt: 2000,
      });
      mockDb.seedData([
        createServerRow('test-user-id', 'remote-1', 'imported', {
          ...remoteContent,
          updatedAt: remoteContent.lastReadAt ?? remoteContent.createdAt,
        }),
      ]);

      // Start with empty local store
      expect(getContentState().importedContent.length).toBe(0);

      // Sync
      await performFullSync();

      // Verify remote content was pulled
      const { importedContent } = getContentState();
      expect(importedContent.length).toBe(1);
      expect(importedContent[0].id).toBe('remote-1');
      expect(importedContent[0].title).toBe('Remote Content');
    });

    it('should merge local and remote content correctly', async () => {
      setupPremiumUser();

      // Add local content
      const localContent = createMockContent({
        id: 'local-only',
        title: 'Local Only',
        createdAt: 1000,
      });
      useContentStore.setState({ importedContent: [localContent] });

      // Seed remote content
      const remoteContent = createMockContent({
        id: 'remote-only',
        title: 'Remote Only',
        createdAt: 2000,
      });
      mockDb.seedData([
        createServerRow('test-user-id', 'remote-only', 'imported', {
          ...remoteContent,
          updatedAt: remoteContent.createdAt,
        }),
      ]);

      // Sync
      await performFullSync();

      // Verify both items exist
      const { importedContent } = getContentState();
      expect(importedContent.length).toBe(2);
      expect(importedContent.some(c => c.id === 'local-only')).toBe(true);
      expect(importedContent.some(c => c.id === 'remote-only')).toBe(true);
    });
  });

  // ===========================================================================
  // Multiple Syncs (Idempotency)
  // ===========================================================================

  describe('multiple syncs', () => {
    it('should not duplicate items after multiple syncs', async () => {
      setupPremiumUser();

      // Add local content
      const content = createMockContent({ id: 'test-item', title: 'Test' });
      useContentStore.setState({ importedContent: [content] });

      // Sync multiple times
      await performFullSync();
      await performFullSync();
      await performFullSync();

      // Verify no duplicates
      const { importedContent } = getContentState();
      expect(importedContent.length).toBe(1);
      expect(importedContent[0].id).toBe('test-item');
    });

    it('should maintain consistent state across sync cycles', async () => {
      setupPremiumUser();

      // Add content
      const content1 = createMockContent({ id: 'item-1' });
      const content2 = createMockContent({ id: 'item-2' });
      useContentStore.setState({ importedContent: [content1, content2] });

      // First sync
      await performFullSync();
      const afterFirst = getContentState().importedContent.length;

      // Add more content
      const content3 = createMockContent({ id: 'item-3' });
      useContentStore.setState({
        importedContent: [...getContentState().importedContent, content3],
      });

      // Second sync
      await performFullSync();
      const afterSecond = getContentState().importedContent.length;

      // Verify counts
      expect(afterFirst).toBe(2);
      expect(afterSecond).toBe(3);
    });
  });

  // ===========================================================================
  // First-Time Device Sync
  // ===========================================================================

  describe('first-time device sync', () => {
    it('should populate empty local stores from cloud data', async () => {
      setupPremiumUser();

      // Seed cloud with existing data
      const cloudContent = createMockContent({
        id: 'cloud-1',
        title: 'Cloud Content',
        createdAt: 5000,
      });
      const cloudArticle = createMockGenerated({
        id: 'cloud-gen-1',
        title: 'Cloud Generated',
        generatedAt: 5000,
        status: 'complete',
      });

      mockDb.seedData([
        createServerRow('test-user-id', 'cloud-1', 'imported', {
          ...cloudContent,
          updatedAt: cloudContent.createdAt,
        }),
        createServerRow('test-user-id', 'cloud-gen-1', 'generated', {
          ...cloudArticle,
          updatedAt: cloudArticle.generatedAt,
        }),
      ]);

      // Verify stores are empty
      expect(getContentState().importedContent.length).toBe(0);
      expect(getGeneratedState().articles.length).toBe(0);

      // Sync
      await performFullSync();

      // Verify stores populated
      expect(getContentState().importedContent.length).toBe(1);
      expect(getContentState().importedContent[0].id).toBe('cloud-1');
      expect(getGeneratedState().articles.length).toBe(1);
      expect(getGeneratedState().articles[0].id).toBe('cloud-gen-1');
    });
  });

  // ===========================================================================
  // Auth Guard
  // ===========================================================================

  describe('authentication requirements', () => {
    it('should fail when user is not logged in', async () => {
      // Don't setup premium user (not logged in)
      resetAllStores();

      const result = await performFullSync();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Not authenticated');
    });

    it('should succeed for premium logged-in user', async () => {
      setupPremiumUser();

      const result = await performFullSync();

      expect(result.success).toBe(true);
    });
  });

  // ===========================================================================
  // Push/Pull Operations
  // ===========================================================================

  describe('pushAllChanges', () => {
    it('should push local changes to cloud', async () => {
      setupPremiumUser();

      // Add local content
      const content = createMockContent({ id: 'push-test', title: 'Push Me' });
      useContentStore.setState({ importedContent: [content] });

      // Push
      const result = await pushAllChanges();

      expect(result.success).toBe(true);

      // Verify data reached "server"
      const serverItems = mockDb.getItemsByType('imported');
      expect(serverItems.length).toBe(1);
      expect(serverItems[0].id).toBe('push-test');
    });
  });

  describe('pullAllData', () => {
    it('should pull cloud data without pushing local', async () => {
      setupPremiumUser();

      // Seed cloud data
      const cloudContent = createMockContent({
        id: 'pull-test',
        title: 'Pull Me',
        createdAt: 3000,
      });
      mockDb.seedData([
        createServerRow('test-user-id', 'pull-test', 'imported', {
          ...cloudContent,
          updatedAt: cloudContent.createdAt,
        }),
      ]);

      // Pull
      const result = await pullAllData();

      expect(result.success).toBe(true);

      // Verify local store updated
      const { importedContent } = getContentState();
      expect(importedContent.length).toBe(1);
      expect(importedContent[0].id).toBe('pull-test');
    });
  });
});
