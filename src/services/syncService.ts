/**
 * Sync Service
 *
 * Core infrastructure for multi-device sync.
 * Provides merge algorithms and sync adapter interfaces.
 */

/**
 * Base interface for items that can be synced.
 * All syncable items must have an id and updatedAt timestamp.
 */
export interface SyncItem {
  id: string;
  updatedAt: number;
  [key: string]: unknown;
}

/**
 * Interface for sync adapters that connect Zustand stores to Supabase tables.
 * Each store that needs sync implements an adapter following this interface.
 */
export interface SyncAdapter<T extends SyncItem> {
  /** Extract items from the local Zustand store */
  toSyncItems: () => T[];
  /** Write merged items back to the local Zustand store */
  fromSyncItems: (items: T[]) => void;
  /** Push items to Supabase (upsert) */
  push: (items: T[]) => Promise<void>;
  /** Pull items from Supabase */
  pull: () => Promise<T[]>;
}

/**
 * Merge two arrays of sync items using latest-timestamp-wins strategy.
 *
 * Algorithm:
 * 1. Create a Map keyed by item id
 * 2. Add all local items to the map
 * 3. For each remote item:
 *    - If no local item with that id exists, add it
 *    - If a local item exists, keep the one with the newer updatedAt
 * 4. Return the map values as an array
 *
 * This strategy ensures:
 * - No data loss (union of all unique items)
 * - Conflict resolution based on recency
 * - Deterministic results
 *
 * @param local Items from the local Zustand store
 * @param remote Items from Supabase
 * @returns Merged array with conflicts resolved
 */
export function mergeItems<T extends SyncItem>(local: T[], remote: T[]): T[] {
  const merged = new Map<string, T>();

  // Add all local items
  for (const item of local) {
    merged.set(item.id, item);
  }

  // Merge remote items
  for (const item of remote) {
    const existing = merged.get(item.id);

    if (!existing) {
      // New item from remote - add it
      merged.set(item.id, item);
    } else if (item.updatedAt > existing.updatedAt) {
      // Remote is newer - replace local
      merged.set(item.id, item);
    }
    // else: local is newer or equal, keep local
  }

  return Array.from(merged.values());
}

/**
 * Find items that exist in the first array but not in the second.
 * Useful for identifying local-only items that need to be pushed.
 *
 * @param items Array to check
 * @param existing Array of existing items
 * @returns Items from first array that don't exist in second
 */
export function findNewItems<T extends SyncItem>(items: T[], existing: T[]): T[] {
  const existingIds = new Set(existing.map(item => item.id));
  return items.filter(item => !existingIds.has(item.id));
}

/**
 * Find items that have been modified since a given timestamp.
 * Useful for incremental sync.
 *
 * @param items Array to filter
 * @param since Timestamp to compare against
 * @returns Items updated after the given timestamp
 */
export function findModifiedSince<T extends SyncItem>(items: T[], since: number): T[] {
  return items.filter(item => item.updatedAt > since);
}
