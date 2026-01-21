/**
 * Store Test Utilities
 *
 * Utilities for resetting and configuring Zustand stores in integration tests.
 * Ensures clean state between tests and provides common setup patterns.
 */

import { useAuthStore } from '../../../src/store/authStore';
import { useSubscriptionStore } from '../../../src/store/subscriptionStore';
import { useContentStore } from '../../../src/store/contentStore';
import { useGeneratedStore } from '../../../src/store/generatedStore';
import { useCurriculumStore } from '../../../src/store/curriculumStore';
import { useLearningStore } from '../../../src/store/learningStore';
import { useJourneyStore } from '../../../src/store/journeyStore';
import { useSettingsStore } from '../../../src/store/settingsStore';
import { useLocaleStore } from '../../../src/store/localeStore';
import { resetSyncState } from '../../../src/services/syncOrchestrator';
import { ImportedContent } from '../../../src/types/content';
import { GeneratedArticle } from '../../../src/types/generated';
import { DEFAULT_STREAK, DEFAULT_CERT_PROGRESS } from '../../../src/types/journey';

// =============================================================================
// Store Reset Functions
// =============================================================================

/**
 * Reset all stores to their initial state.
 * Call this in beforeEach() for clean test isolation.
 */
export function resetAllStores(): void {
  // Reset auth store
  useAuthStore.setState({
    isInitialized: false,
    isAnonymous: false,
    isLoggedIn: false,
    userId: null,
  });

  // Reset subscription store
  useSubscriptionStore.setState({
    isPremium: false,
    isLoading: false,
    isInitialized: false,
    linkedUserId: null,
  });

  // Reset content store
  useContentStore.setState({
    importedContent: [],
    currentContentId: null,
  });

  // Reset generated store
  useGeneratedStore.setState({
    articles: [],
    isGenerating: false,
    generationError: null,
  });

  // Reset curriculum store
  useCurriculumStore.setState({
    curricula: {},
  });

  // Reset learning store
  useLearningStore.setState({
    articleProgress: {},
  });

  // Reset journey store
  useJourneyStore.setState({
    _version: 1,
    velocityScore: 0,
    level: 'novice',
    sessions: [],
    avgWpmLast3: 0,
    avgWpmLast5: 0,
    avgCompLast5: 0,
    avgCompLast10: 0,
    bestWpmAt80: 0,
    userState: 'neutral',
    comfortBand: { floor: 250, median: 300, ceiling: 350 },
    streak: { ...DEFAULT_STREAK },
    baseline: null,
    speedProofs: [],
    certProgress: {
      speed_reader: { ...DEFAULT_CERT_PROGRESS },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    levelHistory: {},
  });

  // Reset settings store
  useSettingsStore.setState({
    activeContentTab: 'read',
    themeId: 'dark',
    defaultWPM: 300,
    showCrosshairs: true,
    crosshairOpacity: 0.5,
    fontSize: 48,
    hapticFeedback: true,
    userName: '',
    readingLanguage: 'en',
    paragraphPauseEnabled: true,
    moveFinishedToHistory: false,
  });

  // Reset locale store
  useLocaleStore.setState({
    currentLocale: 'en',
    isInitialized: false,
  });

  // Reset sync orchestrator state
  resetSyncState();
}

// =============================================================================
// Common Setup Patterns
// =============================================================================

/**
 * Configure stores for a premium, logged-in user.
 * This is the typical state for sync operations.
 */
export function setupPremiumUser(userId = 'test-user-id'): void {
  useAuthStore.setState({
    isInitialized: true,
    isAnonymous: false,
    isLoggedIn: true,
    userId,
  });

  useSubscriptionStore.setState({
    isPremium: true,
    isInitialized: true,
    isLoading: false,
  });
}

/**
 * Configure stores for an anonymous user.
 * Sync should be disabled for anonymous users.
 */
export function setupAnonymousUser(userId = 'anon-user-id'): void {
  useAuthStore.setState({
    isInitialized: true,
    isAnonymous: true,
    isLoggedIn: false,
    userId,
  });

  useSubscriptionStore.setState({
    isPremium: false,
    isInitialized: true,
    isLoading: false,
  });
}

/**
 * Configure stores for a free (non-premium) logged-in user.
 * Sync should be disabled for non-premium users.
 */
export function setupFreeUser(userId = 'free-user-id'): void {
  useAuthStore.setState({
    isInitialized: true,
    isAnonymous: false,
    isLoggedIn: true,
    userId,
  });

  useSubscriptionStore.setState({
    isPremium: false,
    isInitialized: true,
    isLoading: false,
  });
}

// =============================================================================
// Data Population
// =============================================================================

export interface TestStoreData {
  content?: ImportedContent[];
  generated?: GeneratedArticle[];
  // Add more store data types as needed
}

/**
 * Populate stores with test data.
 * Use after setupPremiumUser() to add data for sync tests.
 */
export function populateStores(data: TestStoreData): void {
  if (data.content) {
    useContentStore.setState({ importedContent: data.content });
  }

  if (data.generated) {
    useGeneratedStore.setState({ articles: data.generated });
  }
}

// =============================================================================
// State Getters (for assertions)
// =============================================================================

/**
 * Get current content store state for assertions
 */
export function getContentState() {
  return useContentStore.getState();
}

/**
 * Get current generated store state for assertions
 */
export function getGeneratedState() {
  return useGeneratedStore.getState();
}

/**
 * Get current journey store state for assertions
 */
export function getJourneyState() {
  return useJourneyStore.getState();
}

/**
 * Get current settings store state for assertions
 */
export function getSettingsState() {
  return useSettingsStore.getState();
}

/**
 * Get current auth store state for assertions
 */
export function getAuthState() {
  return useAuthStore.getState();
}

/**
 * Get current subscription store state for assertions
 */
export function getSubscriptionState() {
  return useSubscriptionStore.getState();
}
