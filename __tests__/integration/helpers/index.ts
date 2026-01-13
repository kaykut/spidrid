/**
 * Integration Test Helpers
 *
 * Re-exports all test utilities for convenient importing.
 */

// Test data factories
export {
  resetFactories,
  createMockContent,
  createSyncableContent,
  createMockGenerated,
  createSyncableGenerated,
  createMockSession,
  createMockStreak,
  createConflictPair,
  createMockContentBatch,
  createMockGeneratedBatch,
  createMockSessionBatch,
  expectMergedItem,
  expectConverged,
  type SyncableContent,
  type SyncableGenerated,
} from './syncTestFactories';

// Store utilities
export {
  resetAllStores,
  setupPremiumUser,
  setupAnonymousUser,
  setupFreeUser,
  populateStores,
  getContentState,
  getGeneratedState,
  getJourneyState,
  getSettingsState,
  getAuthState,
  getSubscriptionState,
  type TestStoreData,
} from './storeTestUtils';

// Stateful Supabase mock
export {
  createStatefulSupabaseMock,
  createServerRow,
  getGlobalMock,
  resetGlobalMock,
  type StatefulSupabaseMock,
} from './mockSupabaseStateful';
