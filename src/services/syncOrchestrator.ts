/**
 * Sync Orchestrator
 *
 * Coordinates multi-device synchronization across all stores.
 * Provides full sync, incremental sync, and push-only operations.
 */

import { useAuthStore } from '../store/authStore';
import {
  contentSyncAdapter,
  generatedSyncAdapter,
  curriculumSyncAdapter,
  learningSyncAdapter,
  journeySyncAdapter,
  settingsSyncAdapter,
} from './sync';
import { mergeItems, SyncItem, SyncAdapter } from './syncService';

// =============================================================================
// Types
// =============================================================================

export interface SyncResult {
  success: boolean;
  error?: string;
  syncedAt: number;
  itemCounts?: {
    content: number;
    generated: number;
    curriculum: number;
    learning: number;
    journey: number;
    settings: number;
  };
}

export type SyncStatus = 'idle' | 'syncing' | 'error';

// =============================================================================
// Sync State (in-memory, not persisted)
// =============================================================================

let lastSyncAt: number | null = null;
let syncStatus: SyncStatus = 'idle';
let syncError: string | null = null;

export function getSyncState() {
  return {
    lastSyncAt,
    status: syncStatus,
    error: syncError,
  };
}

/**
 * Reset sync state (for testing only)
 */
export function resetSyncState(): void {
  lastSyncAt = null;
  syncStatus = 'idle';
  syncError = null;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Check if user is authenticated and can sync
 */
function canSync(): boolean {
  const { isLoggedIn } = useAuthStore.getState();
  return isLoggedIn;
}

/**
 * Generic sync operation for an adapter
 * 1. Pull remote items
 * 2. Merge with local items
 * 3. Write merged items to local store
 * 4. Push local items to remote
 */
async function syncAdapter<T extends SyncItem>(
  adapter: SyncAdapter<T>,
  adapterName: string
): Promise<number> {
  try {
    // Pull remote items
    const remoteItems = await adapter.pull();

    // Get local items
    const localItems = adapter.toSyncItems();

    // Merge local and remote
    const mergedItems = mergeItems(localItems, remoteItems);

    // Write merged items to local store
    adapter.fromSyncItems(mergedItems);

    // Push all local items to remote (upsert)
    const itemsToPush = adapter.toSyncItems();
    await adapter.push(itemsToPush);

    return mergedItems.length;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[Sync] ${adapterName} sync failed:`, message);
    throw error;
  }
}

// =============================================================================
// Full Sync
// =============================================================================

/**
 * Perform a full sync of all data across all stores.
 * This is typically called:
 * - On app launch after authentication
 * - When user manually triggers sync
 * - After extended offline period
 */
export async function performFullSync(): Promise<SyncResult> {
  if (!canSync()) {
    return {
      success: false,
      error: 'Not authenticated',
      syncedAt: Date.now(),
    };
  }

  if (syncStatus === 'syncing') {
    return {
      success: false,
      error: 'Sync already in progress',
      syncedAt: Date.now(),
    };
  }

  syncStatus = 'syncing';
  syncError = null;

  const itemCounts = {
    content: 0,
    generated: 0,
    curriculum: 0,
    learning: 0,
    journey: 0,
    settings: 0,
  };

  try {
    // Sync all adapters in parallel where possible
    // Settings and journey are independent, content types are independent
    const [
      contentCount,
      generatedCount,
      curriculumCount,
      learningCount,
      journeyCount,
      settingsCount,
    ] = await Promise.all([
      syncAdapter(contentSyncAdapter, 'content'),
      syncAdapter(generatedSyncAdapter, 'generated'),
      syncAdapter(curriculumSyncAdapter, 'curriculum'),
      syncAdapter(learningSyncAdapter, 'learning'),
      syncAdapter(journeySyncAdapter, 'journey'),
      syncAdapter(settingsSyncAdapter, 'settings'),
    ]);

    itemCounts.content = contentCount;
    itemCounts.generated = generatedCount;
    itemCounts.curriculum = curriculumCount;
    itemCounts.learning = learningCount;
    itemCounts.journey = journeyCount;
    itemCounts.settings = settingsCount;

    lastSyncAt = Date.now();
    syncStatus = 'idle';

    return {
      success: true,
      syncedAt: lastSyncAt,
      itemCounts,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sync failed';
    syncStatus = 'error';
    syncError = message;

    return {
      success: false,
      error: message,
      syncedAt: Date.now(),
    };
  }
}

// =============================================================================
// Push Only (for incremental updates)
// =============================================================================

/**
 * Push local changes to remote without pulling.
 * Used for incremental sync when we know local changes need to be pushed.
 */
export async function pushAllChanges(): Promise<SyncResult> {
  if (!canSync()) {
    return {
      success: false,
      error: 'Not authenticated',
      syncedAt: Date.now(),
    };
  }

  if (syncStatus === 'syncing') {
    return {
      success: false,
      error: 'Sync already in progress',
      syncedAt: Date.now(),
    };
  }

  syncStatus = 'syncing';
  syncError = null;

  try {
    // Push all adapters in parallel
    await Promise.all([
      contentSyncAdapter.push(contentSyncAdapter.toSyncItems()),
      generatedSyncAdapter.push(generatedSyncAdapter.toSyncItems()),
      curriculumSyncAdapter.push(curriculumSyncAdapter.toSyncItems()),
      learningSyncAdapter.push(learningSyncAdapter.toSyncItems()),
      journeySyncAdapter.push(journeySyncAdapter.toSyncItems()),
      settingsSyncAdapter.push(settingsSyncAdapter.toSyncItems()),
    ]);

    lastSyncAt = Date.now();
    syncStatus = 'idle';

    return {
      success: true,
      syncedAt: lastSyncAt,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Push failed';
    syncStatus = 'error';
    syncError = message;

    return {
      success: false,
      error: message,
      syncedAt: Date.now(),
    };
  }
}

// =============================================================================
// Pull Only (for initial sync on new device)
// =============================================================================

/**
 * Pull remote data and merge with local without pushing.
 * Used when syncing a new device for the first time.
 */
export async function pullAllData(): Promise<SyncResult> {
  if (!canSync()) {
    return {
      success: false,
      error: 'Not authenticated',
      syncedAt: Date.now(),
    };
  }

  if (syncStatus === 'syncing') {
    return {
      success: false,
      error: 'Sync already in progress',
      syncedAt: Date.now(),
    };
  }

  syncStatus = 'syncing';
  syncError = null;

  const itemCounts = {
    content: 0,
    generated: 0,
    curriculum: 0,
    learning: 0,
    journey: 0,
    settings: 0,
  };

  try {
    // Pull and merge for all adapters
    const pullAndMerge = async <T extends SyncItem>(
      adapter: SyncAdapter<T>
    ): Promise<number> => {
      const remoteItems = await adapter.pull();
      const localItems = adapter.toSyncItems();
      const mergedItems = mergeItems(localItems, remoteItems);
      adapter.fromSyncItems(mergedItems);
      return mergedItems.length;
    };

    const [
      contentCount,
      generatedCount,
      curriculumCount,
      learningCount,
      journeyCount,
      settingsCount,
    ] = await Promise.all([
      pullAndMerge(contentSyncAdapter),
      pullAndMerge(generatedSyncAdapter),
      pullAndMerge(curriculumSyncAdapter),
      pullAndMerge(learningSyncAdapter),
      pullAndMerge(journeySyncAdapter),
      pullAndMerge(settingsSyncAdapter),
    ]);

    itemCounts.content = contentCount;
    itemCounts.generated = generatedCount;
    itemCounts.curriculum = curriculumCount;
    itemCounts.learning = learningCount;
    itemCounts.journey = journeyCount;
    itemCounts.settings = settingsCount;

    lastSyncAt = Date.now();
    syncStatus = 'idle';

    return {
      success: true,
      syncedAt: lastSyncAt,
      itemCounts,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Pull failed';
    syncStatus = 'error';
    syncError = message;

    return {
      success: false,
      error: message,
      syncedAt: Date.now(),
    };
  }
}

// =============================================================================
// Single Adapter Sync (for targeted updates)
// =============================================================================

export type AdapterName = 'content' | 'generated' | 'curriculum' | 'learning' | 'journey' | 'settings';

/**
 * Sync a single adapter.
 * Useful for targeted sync after specific operations.
 */
export async function syncSingleAdapter(adapterName: AdapterName): Promise<SyncResult> {
  if (!canSync()) {
    return {
      success: false,
      error: 'Not authenticated',
      syncedAt: Date.now(),
    };
  }

  const adapters: Record<AdapterName, SyncAdapter<SyncItem>> = {
    content: contentSyncAdapter as unknown as SyncAdapter<SyncItem>,
    generated: generatedSyncAdapter as unknown as SyncAdapter<SyncItem>,
    curriculum: curriculumSyncAdapter as unknown as SyncAdapter<SyncItem>,
    learning: learningSyncAdapter as unknown as SyncAdapter<SyncItem>,
    journey: journeySyncAdapter as unknown as SyncAdapter<SyncItem>,
    settings: settingsSyncAdapter as unknown as SyncAdapter<SyncItem>,
  };

  const adapter = adapters[adapterName];
  if (!adapter) {
    return {
      success: false,
      error: `Unknown adapter: ${adapterName}`,
      syncedAt: Date.now(),
    };
  }

  try {
    const count = await syncAdapter(adapter, adapterName);
    return {
      success: true,
      syncedAt: Date.now(),
      itemCounts: {
        content: adapterName === 'content' ? count : 0,
        generated: adapterName === 'generated' ? count : 0,
        curriculum: adapterName === 'curriculum' ? count : 0,
        learning: adapterName === 'learning' ? count : 0,
        journey: adapterName === 'journey' ? count : 0,
        settings: adapterName === 'settings' ? count : 0,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sync failed';
    return {
      success: false,
      error: message,
      syncedAt: Date.now(),
    };
  }
}
