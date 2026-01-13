/**
 * Sync Manager Hook
 *
 * Manages multi-device synchronization with:
 * - Automatic sync on login
 * - Debounced push for incremental changes
 * - Sync status tracking
 */

import { useEffect, useCallback, useRef } from 'react';
import {
  performFullSync,
  pushAllChanges,
  getSyncState,
  SyncResult,
  SyncStatus,
} from '../services/syncOrchestrator';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';

// =============================================================================
// Constants
// =============================================================================

/** Debounce delay for push operations (in ms) */
const PUSH_DEBOUNCE_MS = 5000; // 5 seconds

/** Minimum time between full syncs (in ms) */
const MIN_SYNC_INTERVAL_MS = 30000; // 30 seconds

// =============================================================================
// Types
// =============================================================================

export interface SyncManagerState {
  status: SyncStatus;
  lastSyncAt: number | null;
  error: string | null;
  isPremium: boolean;
  isLoggedIn: boolean;
}

export interface SyncManagerActions {
  /** Trigger a full sync (pull + merge + push) */
  triggerFullSync: () => Promise<SyncResult>;
  /** Trigger a push of local changes (debounced) */
  triggerPush: () => void;
  /** Force an immediate push (no debounce) */
  forcePush: () => Promise<SyncResult>;
}

// =============================================================================
// Hook
// =============================================================================

export function useSyncManager(): SyncManagerState & SyncManagerActions {
  const { isLoggedIn } = useAuthStore();
  const { isPremium } = useSubscriptionStore();
  const pushTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncTimeRef = useRef<number | null>(null);

  // Get current sync state
  const syncState = getSyncState();

  // Clear any pending push on unmount
  useEffect(() => {
    return () => {
      if (pushTimeoutRef.current) {
        clearTimeout(pushTimeoutRef.current);
      }
    };
  }, []);

  // Trigger full sync on login (if premium)
  useEffect(() => {
    if (isLoggedIn && isPremium) {
      // Avoid syncing too frequently
      const now = Date.now();
      if (
        !lastSyncTimeRef.current ||
        now - lastSyncTimeRef.current > MIN_SYNC_INTERVAL_MS
      ) {
        performFullSync().then((result) => {
          if (result.success) {
            lastSyncTimeRef.current = result.syncedAt;
          }
        });
      }
    }
  }, [isLoggedIn, isPremium]);

  // Full sync action
  const triggerFullSync = useCallback(async (): Promise<SyncResult> => {
    if (!isLoggedIn || !isPremium) {
      return {
        success: false,
        error: !isPremium ? 'Premium required for sync' : 'Not logged in',
        syncedAt: Date.now(),
      };
    }

    const result = await performFullSync();
    if (result.success) {
      lastSyncTimeRef.current = result.syncedAt;
    }
    return result;
  }, [isLoggedIn, isPremium]);

  // Debounced push action
  const triggerPush = useCallback((): void => {
    if (!isLoggedIn || !isPremium) {
      return;
    }

    // Clear any existing timeout
    if (pushTimeoutRef.current) {
      clearTimeout(pushTimeoutRef.current);
    }

    // Set new timeout
    pushTimeoutRef.current = setTimeout(async () => {
      await pushAllChanges();
    }, PUSH_DEBOUNCE_MS);
  }, [isLoggedIn, isPremium]);

  // Force push action (no debounce)
  const forcePush = useCallback(async (): Promise<SyncResult> => {
    if (!isLoggedIn || !isPremium) {
      return {
        success: false,
        error: !isPremium ? 'Premium required for sync' : 'Not logged in',
        syncedAt: Date.now(),
      };
    }

    // Clear any pending debounced push
    if (pushTimeoutRef.current) {
      clearTimeout(pushTimeoutRef.current);
      pushTimeoutRef.current = null;
    }

    return pushAllChanges();
  }, [isLoggedIn, isPremium]);

  return {
    status: syncState.status,
    lastSyncAt: syncState.lastSyncAt,
    error: syncState.error,
    isPremium,
    isLoggedIn,
    triggerFullSync,
    triggerPush,
    forcePush,
  };
}

// =============================================================================
// Store Subscriber for Auto-Push
// =============================================================================

let autoSyncUnsubscribers: (() => void)[] = [];

/**
 * Initialize auto-sync subscriptions.
 * Call this once at app startup to enable automatic pushing of changes.
 */
export function initializeAutoSync(): void {
  // Clean up any existing subscriptions
  cleanupAutoSync();

  // Import stores dynamically to avoid circular dependencies
  const stores = [
    require('../store/contentStore').useContentStore,
    require('../store/generatedStore').useGeneratedStore,
    require('../store/curriculumStore').useCurriculumStore,
    require('../store/learningStore').useLearningStore,
    require('../store/journeyStore').useJourneyStore,
    require('../store/settingsStore').useSettingsStore,
  ];

  // Subscribe to each store
  for (const store of stores) {
    const unsubscribe = store.subscribe(() => {
      const { isLoggedIn } = useAuthStore.getState();
      const { isPremium } = useSubscriptionStore.getState();

      if (isLoggedIn && isPremium) {
        // Debounced push - clear any existing timeout and set new one
        // This uses a simple approach; the hook provides better control
        setTimeout(() => {
          pushAllChanges().catch((error) => {
            console.error('[AutoSync] Push failed:', error);
          });
        }, PUSH_DEBOUNCE_MS);
      }
    });

    autoSyncUnsubscribers.push(unsubscribe);
  }
}

/**
 * Clean up auto-sync subscriptions.
 * Call this when the app is closing or sync is disabled.
 */
export function cleanupAutoSync(): void {
  for (const unsubscribe of autoSyncUnsubscribers) {
    unsubscribe();
  }
  autoSyncUnsubscribers = [];
}
