/**
 * Conflict Resolution Integration Tests
 *
 * Tests verifying the Last-Write-Wins (LWW) merge strategy
 * across multi-device sync scenarios.
 */

import { mergeItems, SyncItem } from '../../../src/services/syncService';
import { performFullSync } from '../../../src/services/syncOrchestrator';
import { useContentStore } from '../../../src/store/contentStore';
import {
  resetFactories,
  createSyncableContent,
  createMockSession,
  createConflictPair,
  resetAllStores,
  setupPremiumUser,
  getContentState,
  createServerRow,
  type SyncableContent,
  type StatefulSupabaseMock,
} from '../helpers';

// Helper to cast SyncableContent arrays to SyncItem arrays for mergeItems
const toSyncItems = (items: SyncableContent[]): SyncItem[] =>
  items as unknown as SyncItem[];

// Helper to adapt createSyncableContent for createConflictPair
const syncableContentFactory = (overrides: Partial<SyncItem>): SyncItem =>
  createSyncableContent(overrides as Partial<SyncableContent>) as unknown as SyncItem;

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

describe('Conflict Resolution Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetFactories();
    resetAllStores();
    mockDb.clearServerState();
    mockDb.simulateNetworkRestore();
    mockDb.setUserId('test-user-id');
  });

  // ===========================================================================
  // Last-Write-Wins (LWW) Strategy
  // ===========================================================================

  describe('Last-Write-Wins (LWW) strategy', () => {
    it('should keep remote version when remote.updatedAt > local.updatedAt', () => {
      const { local, remote } = createConflictPair(
        syncableContentFactory,
        1000, // local timestamp
        2000  // remote timestamp (newer)
      );

      const merged = mergeItems([local], [remote]);

      expect(merged).toHaveLength(1);
      expect(merged[0].updatedAt).toBe(2000);
      expect((merged[0] as unknown as SyncableContent).title).toBe('Remote Version');
    });

    it('should keep local version when local.updatedAt > remote.updatedAt', () => {
      const { local, remote } = createConflictPair(
        syncableContentFactory,
        2000, // local timestamp (newer)
        1000  // remote timestamp
      );

      const merged = mergeItems([local], [remote]);

      expect(merged).toHaveLength(1);
      expect(merged[0].updatedAt).toBe(2000);
      expect((merged[0] as unknown as SyncableContent).title).toBe('Local Version');
    });

    it('should keep local version when timestamps are equal (deterministic tiebreaker)', () => {
      const { local, remote } = createConflictPair(
        syncableContentFactory,
        1500, // same timestamp
        1500  // same timestamp
      );

      const merged = mergeItems([local], [remote]);

      expect(merged).toHaveLength(1);
      // Local should win on tie (added first to map)
      expect((merged[0] as unknown as SyncableContent).title).toBe('Local Version');
    });

    it('should handle rapid edits within same second', () => {
      const edit1 = createSyncableContent({
        id: 'rapid-edit',
        title: 'Edit 1',
        updatedAt: 1000001,
      });

      const edit2 = createSyncableContent({
        id: 'rapid-edit',
        title: 'Edit 2',
        updatedAt: 1000002, // 1ms later
      });

      const merged = mergeItems(toSyncItems([edit1]), toSyncItems([edit2]));

      expect(merged[0].updatedAt).toBe(1000002);
      expect((merged[0] as unknown as SyncableContent).title).toBe('Edit 2');
    });
  });

  // ===========================================================================
  // Multi-Device Convergence
  // ===========================================================================

  describe('multi-device convergence', () => {
    it('should converge to same state regardless of merge order', () => {
      const deviceAVersion = createSyncableContent({
        id: 'shared-item',
        title: 'Device A Edit',
        updatedAt: 1000,
      });

      const deviceBVersion = createSyncableContent({
        id: 'shared-item',
        title: 'Device B Edit',
        updatedAt: 2000, // Newer
      });

      // Scenario 1: A merges with B
      const merged1 = mergeItems(toSyncItems([deviceAVersion]), toSyncItems([deviceBVersion]));

      // Scenario 2: B merges with A
      const merged2 = mergeItems(toSyncItems([deviceBVersion]), toSyncItems([deviceAVersion]));

      // Both should converge to B's version (newer)
      expect((merged1[0] as unknown as SyncableContent).title).toBe('Device B Edit');
      expect((merged2[0] as unknown as SyncableContent).title).toBe('Device B Edit');
      expect(merged1[0].updatedAt).toBe(merged2[0].updatedAt);
    });

    it('should maintain all unique items across devices', () => {
      const deviceAItems = [
        createSyncableContent({ id: 'a-only', title: 'A Only', updatedAt: 1000 }),
        createSyncableContent({ id: 'shared', title: 'A Version', updatedAt: 1000 }),
      ];

      const deviceBItems = [
        createSyncableContent({ id: 'b-only', title: 'B Only', updatedAt: 2000 }),
        createSyncableContent({ id: 'shared', title: 'B Version', updatedAt: 2000 }),
      ];

      const merged = mergeItems(toSyncItems(deviceAItems), toSyncItems(deviceBItems));

      expect(merged).toHaveLength(3);
      expect(merged.some(i => i.id === 'a-only')).toBe(true);
      expect(merged.some(i => i.id === 'b-only')).toBe(true);
      expect(merged.some(i => i.id === 'shared')).toBe(true);

      // Shared item should have B's version (newer)
      const shared = merged.find(i => i.id === 'shared') as unknown as SyncableContent;
      expect(shared.title).toBe('B Version');
    });
  });

  // ===========================================================================
  // End-to-End Conflict Resolution
  // ===========================================================================

  describe('end-to-end conflict resolution', () => {
    it('should resolve conflict during full sync (remote newer)', async () => {
      setupPremiumUser();

      // Local has older version
      const localContent = createSyncableContent({
        id: 'conflict-item',
        title: 'Local Old',
        updatedAt: 1000,
      });
      useContentStore.setState({
        importedContent: [{ ...localContent }],
      });

      // Remote has newer version
      const remoteContent = createSyncableContent({
        id: 'conflict-item',
        title: 'Remote New',
        updatedAt: 2000,
      });
      mockDb.seedData([
        createServerRow('test-user-id', 'conflict-item', 'imported', remoteContent as unknown as SyncItem),
      ]);

      // Sync
      await performFullSync();

      // Verify remote version won
      const { importedContent } = getContentState();
      expect(importedContent).toHaveLength(1);
      expect(importedContent[0].title).toBe('Remote New');
    });

    it('should resolve conflict during full sync (local newer)', async () => {
      setupPremiumUser();

      // Local has newer version
      const localContent = createSyncableContent({
        id: 'conflict-item',
        title: 'Local New',
        updatedAt: 2000,
      });
      useContentStore.setState({
        importedContent: [{ ...localContent }],
      });

      // Remote has older version
      const remoteContent = createSyncableContent({
        id: 'conflict-item',
        title: 'Remote Old',
        updatedAt: 1000,
      });
      mockDb.seedData([
        createServerRow('test-user-id', 'conflict-item', 'imported', remoteContent as unknown as SyncItem),
      ]);

      // Sync
      await performFullSync();

      // Verify local version won
      const { importedContent } = getContentState();
      expect(importedContent).toHaveLength(1);
      expect(importedContent[0].title).toBe('Local New');
    });
  });

  // ===========================================================================
  // Journey Session Merge
  // ===========================================================================

  describe('journey session merge', () => {
    it('should merge sessions from multiple devices without duplicates', () => {
      const deviceASessions = [
        createMockSession({ id: 'session-a1', completedAt: 1000 }),
        createMockSession({ id: 'session-shared', completedAt: 1500 }),
      ];

      const deviceBSessions = [
        createMockSession({ id: 'session-b1', completedAt: 2000 }),
        createMockSession({ id: 'session-shared', completedAt: 2500 }), // Newer version
      ];

      // Merge using session completedAt as updatedAt
      const localItems: SyncItem[] = deviceASessions.map(s => ({
        ...s,
        updatedAt: s.completedAt,
      }));
      const remoteItems: SyncItem[] = deviceBSessions.map(s => ({
        ...s,
        updatedAt: s.completedAt,
      }));

      const merged = mergeItems(localItems, remoteItems);

      expect(merged).toHaveLength(3);
      expect(merged.some(s => s.id === 'session-a1')).toBe(true);
      expect(merged.some(s => s.id === 'session-b1')).toBe(true);
      expect(merged.some(s => s.id === 'session-shared')).toBe(true);

      // Shared session should have B's version (newer)
      const shared = merged.find(s => s.id === 'session-shared');
      expect(shared?.updatedAt).toBe(2500);
    });
  });

  // ===========================================================================
  // Mixed Scenario (Complex Merge)
  // ===========================================================================

  describe('complex merge scenarios', () => {
    it('should handle mixed scenario: new, conflicting, and equal items', () => {
      const localItems = [
        createSyncableContent({ id: '1', title: 'Local Only', updatedAt: 1000 }),
        createSyncableContent({ id: '2', title: 'Local Newer', updatedAt: 2000 }),
        createSyncableContent({ id: '3', title: 'Local Older', updatedAt: 1000 }),
        createSyncableContent({ id: '4', title: 'Equal Local', updatedAt: 1500 }),
      ];

      const remoteItems = [
        createSyncableContent({ id: '2', title: 'Remote Older', updatedAt: 1000 }),
        createSyncableContent({ id: '3', title: 'Remote Newer', updatedAt: 2000 }),
        createSyncableContent({ id: '4', title: 'Equal Remote', updatedAt: 1500 }),
        createSyncableContent({ id: '5', title: 'Remote Only', updatedAt: 3000 }),
      ];

      const merged = mergeItems(toSyncItems(localItems), toSyncItems(remoteItems));

      expect(merged).toHaveLength(5);

      // Local only preserved
      expect(merged.find(i => i.id === '1')).toBeDefined();

      // Local newer wins
      expect((merged.find(i => i.id === '2') as unknown as SyncableContent).title).toBe('Local Newer');

      // Remote newer wins
      expect((merged.find(i => i.id === '3') as unknown as SyncableContent).title).toBe('Remote Newer');

      // Equal: local wins
      expect((merged.find(i => i.id === '4') as unknown as SyncableContent).title).toBe('Equal Local');

      // Remote only added
      expect(merged.find(i => i.id === '5')).toBeDefined();
    });

    it('should handle large batch merges efficiently', () => {
      // Create 100 items on each device with 20% overlap
      const localItems = Array.from({ length: 100 }, (_, i) =>
        createSyncableContent({
          id: `item-${i}`,
          title: `Local ${i}`,
          updatedAt: 1000 + i,
        })
      );

      const remoteItems = Array.from({ length: 100 }, (_, i) =>
        createSyncableContent({
          id: `item-${i + 80}`, // 20 overlap with local
          title: `Remote ${i}`,
          updatedAt: 2000 + i,
        })
      );

      const startTime = Date.now();
      const merged = mergeItems(toSyncItems(localItems), toSyncItems(remoteItems));
      const duration = Date.now() - startTime;

      // Should complete quickly (< 100ms)
      expect(duration).toBeLessThan(100);

      // Should have 180 unique items (100 + 100 - 20 overlap)
      expect(merged).toHaveLength(180);
    });
  });

  // ===========================================================================
  // Edge Cases
  // ===========================================================================

  describe('edge cases', () => {
    it('should handle empty arrays', () => {
      expect(mergeItems([], [])).toEqual([]);
      expect(mergeItems(toSyncItems([createSyncableContent()]), [])).toHaveLength(1);
      expect(mergeItems([], toSyncItems([createSyncableContent()]))).toHaveLength(1);
    });

    it('should handle single item merge', () => {
      const item = createSyncableContent({ id: 'single', updatedAt: 1000 });
      const merged = mergeItems(toSyncItems([item]), toSyncItems([item]));

      expect(merged).toHaveLength(1);
      expect(merged[0].id).toBe('single');
    });

    it('should handle items with same id but very different timestamps', () => {
      const veryOld = createSyncableContent({
        id: 'time-travel',
        title: 'Very Old',
        updatedAt: 1,
      });

      const veryNew = createSyncableContent({
        id: 'time-travel',
        title: 'Very New',
        updatedAt: 9999999999999,
      });

      const merged = mergeItems(toSyncItems([veryOld]), toSyncItems([veryNew]));

      expect(merged).toHaveLength(1);
      expect((merged[0] as unknown as SyncableContent).title).toBe('Very New');
    });
  });
});
