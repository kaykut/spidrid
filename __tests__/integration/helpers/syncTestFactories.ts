/**
 * Sync Test Data Factories
 *
 * Factory functions for creating deterministic test data with controlled timestamps.
 * All factories use a counter for unique IDs to ensure test reproducibility.
 */

import { ImportedContent } from '../../../src/types/content';
import { GeneratedArticle, ArticleTone } from '../../../src/types/generated';
import { JourneySession, StreakData, DEFAULT_STREAK } from '../../../src/types/journey';
import { SyncItem } from '../../../src/services/syncService';

// Counter for generating unique IDs
let idCounter = 0;

/**
 * Reset ID counter between tests for deterministic behavior
 */
export function resetFactories(): void {
  idCounter = 0;
}

// =============================================================================
// Content Factories
// =============================================================================

export interface SyncableContent extends ImportedContent {
  updatedAt: number;
}

/**
 * Create mock ImportedContent with controlled values
 */
export function createMockContent(
  overrides: Partial<ImportedContent> = {}
): ImportedContent {
  const id = overrides.id ?? `content-${++idCounter}`;
  const createdAt = overrides.createdAt ?? 1000 + idCounter * 100;

  return {
    id,
    title: `Test Content ${idCounter}`,
    content: `Content body for ${id}. This is test content.`,
    wordCount: 100,
    source: 'text',
    createdAt,
    readProgress: 0,
    ...overrides,
  };
}

/**
 * Create SyncableContent with explicit updatedAt
 */
export function createSyncableContent(
  overrides: Partial<SyncableContent> = {}
): SyncableContent {
  const content = createMockContent(overrides);
  return {
    ...content,
    updatedAt: overrides.updatedAt ?? content.lastReadAt ?? content.createdAt,
  };
}

// =============================================================================
// Generated Article Factories
// =============================================================================

export interface SyncableGenerated extends GeneratedArticle {
  updatedAt: number;
}

/**
 * Create mock GeneratedArticle with controlled values
 */
export function createMockGenerated(
  overrides: Partial<GeneratedArticle> = {}
): GeneratedArticle {
  const id = overrides.id ?? `gen-${++idCounter}`;
  const generatedAt = overrides.generatedAt ?? 1000 + idCounter * 100;

  return {
    id,
    topic: `Topic ${idCounter}`,
    targetDuration: 3,
    tone: 'explanatory' as ArticleTone,
    title: `Generated Article ${idCounter}`,
    content: `Generated content for ${id}. This is AI-generated.`,
    wordCount: 300,
    questions: [],
    status: 'complete',
    generatedAt,
    completed: false,
    attemptCount: 0,
    ...overrides,
  };
}

/**
 * Create SyncableGenerated with explicit updatedAt
 */
export function createSyncableGenerated(
  overrides: Partial<SyncableGenerated> = {}
): SyncableGenerated {
  const article = createMockGenerated(overrides);
  return {
    ...article,
    updatedAt: overrides.updatedAt ?? article.lastReadAt ?? article.generatedAt,
  };
}

// =============================================================================
// Journey Factories
// =============================================================================

/**
 * Create mock JourneySession with controlled values
 */
export function createMockSession(
  overrides: Partial<JourneySession> = {}
): JourneySession {
  const id = overrides.id ?? `session-${++idCounter}`;
  const completedAt = overrides.completedAt ?? 1000 + idCounter * 100;

  return {
    id,
    wpm: 300,
    comprehension: 80,
    effectiveWpm: 240,
    articleId: `article-${idCounter}`,
    articleType: 'curriculum',
    completedAt,
    vsAfter: 30,
    ...overrides,
  };
}

/**
 * Create mock StreakData with controlled values
 */
export function createMockStreak(
  overrides: Partial<StreakData> = {}
): StreakData {
  return {
    ...DEFAULT_STREAK,
    ...overrides,
  };
}

// =============================================================================
// Conflict Testing Utilities
// =============================================================================

/**
 * Create a conflict scenario with two versions of same item at different timestamps.
 * Useful for testing LWW (Last Write Wins) merge strategy.
 *
 * @param factory - Factory function to create items
 * @param localTimestamp - Timestamp for local version
 * @param remoteTimestamp - Timestamp for remote version
 * @returns Object with local and remote versions
 */
export function createConflictPair<T extends SyncItem>(
  factory: (overrides: Partial<T>) => T,
  localTimestamp: number,
  remoteTimestamp: number
): { local: T; remote: T; sharedId: string } {
  const sharedId = `conflict-${++idCounter}`;

  return {
    sharedId,
    local: factory({
      id: sharedId,
      title: 'Local Version',
      updatedAt: localTimestamp,
    } as unknown as Partial<T>),
    remote: factory({
      id: sharedId,
      title: 'Remote Version',
      updatedAt: remoteTimestamp,
    } as unknown as Partial<T>),
  };
}

/**
 * Create multiple items for batch testing
 */
export function createMockContentBatch(count: number): ImportedContent[] {
  return Array.from({ length: count }, () => createMockContent());
}

/**
 * Create multiple generated articles for batch testing
 */
export function createMockGeneratedBatch(count: number): GeneratedArticle[] {
  return Array.from({ length: count }, () => createMockGenerated());
}

/**
 * Create multiple sessions for batch testing
 */
export function createMockSessionBatch(count: number): JourneySession[] {
  return Array.from({ length: count }, () => createMockSession());
}

// =============================================================================
// Assertion Helpers
// =============================================================================

/**
 * Assert that merged result contains expected item with correct timestamp
 */
export function expectMergedItem<T extends SyncItem>(
  merged: T[],
  id: string,
  expectedUpdatedAt: number
): void {
  const item = merged.find((i) => i.id === id);
  if (!item) {
    throw new Error(`Item with id '${id}' not found in merged result`);
  }
  if (item.updatedAt !== expectedUpdatedAt) {
    throw new Error(
      `Expected updatedAt ${expectedUpdatedAt}, got ${item.updatedAt}`
    );
  }
}

/**
 * Assert that two arrays have converged (same items regardless of order)
 */
export function expectConverged<T extends { id: string }>(
  arr1: T[],
  arr2: T[]
): void {
  if (arr1.length !== arr2.length) {
    throw new Error(
      `Array lengths differ: ${arr1.length} vs ${arr2.length}`
    );
  }
  const ids1 = new Set(arr1.map((i) => i.id));
  const ids2 = new Set(arr2.map((i) => i.id));

  for (const id of ids1) {
    if (!ids2.has(id)) {
      throw new Error(`Item '${id}' in first array but not in second`);
    }
  }
}
