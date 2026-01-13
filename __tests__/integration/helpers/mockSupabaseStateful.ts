/**
 * Stateful Supabase Mock
 *
 * An in-memory mock of Supabase that maintains state across operations.
 * Unlike the basic jest.setup.js mock, this tracks pushed/pulled data
 * to enable realistic integration testing of sync flows.
 */

import { SyncItem } from '../../../src/services/syncService';

// =============================================================================
// Types
// =============================================================================

interface UserContentRow {
  user_id: string;
  item_id: string;
  item_type: string;
  data: SyncItem;
  updated_at: string;
  deleted_at: string | null;
}

type NetworkState = 'online' | 'offline' | 'error';
type NetworkScope = 'all' | 'database'; // 'database' only affects from() calls

// =============================================================================
// Stateful Mock Controller
// =============================================================================

export interface StatefulSupabaseMock {
  supabase: {
    auth: {
      getUser: jest.Mock;
      getSession: jest.Mock;
    };
    from: jest.Mock;
  };
  // Control methods
  setUserId(userId: string): void;
  setNetworkState(state: NetworkState): void;
  /**
   * Simulate network error. By default only affects database operations (scope='database'),
   * allowing auth to still work (as it would with cached credentials).
   * Use scope='all' to also fail auth operations.
   */
  simulateNetworkError(errorMessage?: string, scope?: NetworkScope): void;
  simulateNetworkRestore(): void;
  // Data access
  getServerState(): Map<string, UserContentRow>;
  getItemsByType(itemType: string): SyncItem[];
  clearServerState(): void;
  // Pre-populate data (simulate existing cloud data)
  seedData(rows: UserContentRow[]): void;
}

/**
 * Create a stateful Supabase mock for integration testing.
 *
 * Features:
 * - Maintains in-memory state across push/pull operations
 * - Supports network error simulation
 * - Tracks all upserted/selected data
 *
 * Usage:
 * ```typescript
 * const mockDb = createStatefulSupabaseMock();
 * jest.mock('../../../src/services/supabase', () => ({
 *   supabase: mockDb.supabase,
 * }));
 * ```
 */
export function createStatefulSupabaseMock(): StatefulSupabaseMock {
  // In-memory "database" keyed by "user_id:item_id"
  const serverState = new Map<string, UserContentRow>();

  // Current user context
  let currentUserId = 'test-user-id';

  // Network state
  let networkState: NetworkState = 'online';
  let networkErrorMessage = 'Network error';
  let networkScope: NetworkScope = 'database';

  // Helper to create compound key
  const makeKey = (userId: string, itemId: string) => `${userId}:${itemId}`;

  // Create table mock with stateful operations
  const createTableMock = (tableName: string) => {
    // Only support user_content table for now
    if (tableName !== 'user_content') {
      return {
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              is: jest.fn().mockResolvedValue({ data: [], error: null }),
            }),
          }),
        }),
        upsert: jest.fn().mockResolvedValue({ error: null }),
      };
    }

    return {
      select: jest.fn().mockImplementation((_columns: string) => {
        return {
          eq: jest.fn().mockImplementation((_field1: string, value1: string) => {
            // First .eq() is user_id
            return {
              eq: jest.fn().mockImplementation((_field2: string, value2: string) => {
                // Second .eq() is item_type
                return {
                  is: jest.fn().mockImplementation((_field3: string, _value3: null) => {
                    // .is() filters out deleted items

                    // Check network state
                    if (networkState === 'offline' || networkState === 'error') {
                      return Promise.resolve({
                        data: null,
                        error: { message: networkErrorMessage },
                      });
                    }

                    // Filter items by user_id and item_type
                    const items: { data: SyncItem }[] = [];
                    for (const row of serverState.values()) {
                      if (
                        row.user_id === value1 &&
                        row.item_type === value2 &&
                        row.deleted_at === null
                      ) {
                        items.push({ data: row.data });
                      }
                    }

                    return Promise.resolve({
                      data: items,
                      error: null,
                    });
                  }),
                };
              }),
            };
          }),
        };
      }),

      upsert: jest.fn().mockImplementation((rows: UserContentRow[], _options?: { onConflict?: string }) => {
        // Check network state
        if (networkState === 'offline' || networkState === 'error') {
          return Promise.resolve({
            error: { message: networkErrorMessage },
          });
        }

        // Store each row
        for (const row of rows) {
          const key = makeKey(row.user_id, row.item_id);
          serverState.set(key, {
            ...row,
            deleted_at: null,
          });
        }

        return Promise.resolve({ error: null });
      }),

      delete: jest.fn().mockImplementation(() => {
        return {
          eq: jest.fn().mockImplementation((_field: string, value: string) => {
            // Mark items as deleted
            if (networkState === 'offline' || networkState === 'error') {
              return Promise.resolve({
                error: { message: networkErrorMessage },
              });
            }

            for (const [_key, row] of serverState.entries()) {
              if (row.user_id === value) {
                row.deleted_at = new Date().toISOString();
              }
            }

            return Promise.resolve({ error: null });
          }),
        };
      }),
    };
  };

  const supabase = {
    auth: {
      getUser: jest.fn().mockImplementation(() => {
        // Only fail auth if scope is 'all'
        if ((networkState === 'offline' || networkState === 'error') && networkScope === 'all') {
          return Promise.resolve({
            data: { user: null },
            error: { message: networkErrorMessage },
          });
        }
        // Auth stays working with scope='database' (simulating cached credentials)
        return Promise.resolve({
          data: { user: { id: currentUserId } },
          error: null,
        });
      }),
      getSession: jest.fn().mockImplementation(() => {
        // Only fail auth if scope is 'all'
        if ((networkState === 'offline' || networkState === 'error') && networkScope === 'all') {
          return Promise.resolve({
            data: { session: null },
            error: { message: networkErrorMessage },
          });
        }
        return Promise.resolve({
          data: {
            session: {
              access_token: 'mock-access-token',
              user: { id: currentUserId },
            },
          },
          error: null,
        });
      }),
    },
    from: jest.fn().mockImplementation((tableName: string) => createTableMock(tableName)),
  };

  return {
    supabase,

    setUserId(userId: string): void {
      currentUserId = userId;
    },

    setNetworkState(state: NetworkState): void {
      networkState = state;
    },

    simulateNetworkError(errorMessage = 'Network error', scope: NetworkScope = 'database'): void {
      networkState = 'error';
      networkErrorMessage = errorMessage;
      networkScope = scope;
    },

    simulateNetworkRestore(): void {
      networkState = 'online';
      networkScope = 'database';
    },

    getServerState(): Map<string, UserContentRow> {
      return serverState;
    },

    getItemsByType(itemType: string): SyncItem[] {
      const items: SyncItem[] = [];
      for (const row of serverState.values()) {
        if (row.item_type === itemType && row.deleted_at === null) {
          items.push(row.data);
        }
      }
      return items;
    },

    clearServerState(): void {
      serverState.clear();
    },

    seedData(rows: UserContentRow[]): void {
      for (const row of rows) {
        const key = makeKey(row.user_id, row.item_id);
        serverState.set(key, row);
      }
    },
  };
}

// =============================================================================
// Helper Functions for Creating Server-Side Data
// =============================================================================

/**
 * Create a user_content row for seeding the mock database
 */
export function createServerRow(
  userId: string,
  itemId: string,
  itemType: string,
  data: SyncItem
): UserContentRow {
  return {
    user_id: userId,
    item_id: itemId,
    item_type: itemType,
    data,
    updated_at: new Date(data.updatedAt).toISOString(),
    deleted_at: null,
  };
}

// =============================================================================
// Global Mock Instance (for tests that need shared state)
// =============================================================================

let globalMock: StatefulSupabaseMock | null = null;

/**
 * Get or create a global mock instance.
 * Useful when you need the same mock across multiple test files.
 */
export function getGlobalMock(): StatefulSupabaseMock {
  if (!globalMock) {
    globalMock = createStatefulSupabaseMock();
  }
  return globalMock;
}

/**
 * Reset the global mock instance
 */
export function resetGlobalMock(): void {
  if (globalMock) {
    globalMock.clearServerState();
    globalMock.simulateNetworkRestore();
  }
}
