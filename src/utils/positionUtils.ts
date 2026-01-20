import { ContentSource } from '../types/contentList';
import { useContentStore } from '../store/contentStore';
import { useGeneratedStore } from '../store/generatedStore';
import { useCurriculumStore } from '../store/curriculumStore';

// =============================================================================
// Constants
// =============================================================================

/**
 * Auto-save interval for periodic position saving during playback.
 * Saves reading position every 15 seconds while content is playing.
 */
export const AUTO_SAVE_INTERVAL_MS = 15000; // 15 seconds

// =============================================================================
// Types
// =============================================================================

/**
 * Curriculum sourceId format: "curriculumId:articleIndex"
 * Example: "curr_123_abc:2" means curriculum ID "curr_123_abc", article index 2
 */
export interface CurriculumSourceParts {
  curriculumId: string;
  articleIndex: number;
}

// =============================================================================
// Curriculum ID Parsing
// =============================================================================

/**
 * Parse curriculum sourceId into parts.
 * Curriculum sourceIds follow the format: "curriculumId:articleIndex"
 *
 * @param sourceId - The curriculum sourceId to parse (e.g., "curr_123_abc:2")
 * @returns Object with curriculumId and articleIndex, or null if invalid
 *
 * @example
 * parseCurriculumSourceId("curr_123_abc:2")
 * // Returns: { curriculumId: "curr_123_abc", articleIndex: 2 }
 *
 * parseCurriculumSourceId("invalid")
 * // Returns: null
 */
export function parseCurriculumSourceId(sourceId: string): CurriculumSourceParts | null {
  const [curriculumId, articleIndexStr] = sourceId.split(':');
  const articleIndex = parseInt(articleIndexStr, 10);

  if (!curriculumId || isNaN(articleIndex)) {
    return null;
  }

  return { curriculumId, articleIndex };
}

// =============================================================================
// Position Save/Restore
// =============================================================================

/**
 * Save reading position for content.
 * Training articles are never saved (always start fresh).
 *
 * @param sourceId - The content identifier
 * @param source - The content source type
 * @param currentIndex - The current word index to save
 * @param progress - Optional progress value (0-1), required for imported content
 *
 * @example
 * // Save imported content position
 * savePosition("imported_123", "imported", 500, 0.5);
 *
 * // Save generated article position
 * savePosition("gen_456", "generated", 75);
 *
 * // Save curriculum article position
 * savePosition("curr_789:2", "curriculum", 30);
 *
 * // Training content - does nothing
 * savePosition("training_1", "training", 100);
 */
export function savePosition(
  sourceId: string,
  source: ContentSource,
  currentIndex: number,
  progress?: number
): void {
  if (source === 'training') {
    return;
  }

  if (source === 'imported') {
    const { updateProgress } = useContentStore.getState();
    updateProgress(sourceId, progress ?? 0, currentIndex);
  } else if (source === 'generated') {
    const { updateArticleProgress } = useGeneratedStore.getState();
    updateArticleProgress(sourceId, { currentWordIndex: currentIndex });
  } else if (source === 'curriculum') {
    const parts = parseCurriculumSourceId(sourceId);
    if (parts) {
      const { saveArticlePosition } = useCurriculumStore.getState();
      saveArticlePosition(parts.curriculumId, parts.articleIndex, currentIndex);
    }
  }
}

/**
 * Clear reading position (used after quiz completion).
 * Sets position to undefined so next read starts fresh.
 *
 * @param sourceId - The content identifier
 * @param source - The content source type
 *
 * @example
 * // Clear position after completing quiz
 * clearPosition("gen_456", "generated");
 * clearPosition("curr_789:2", "curriculum");
 */
export function clearPosition(
  sourceId: string,
  source: ContentSource
): void {
  if (source === 'imported') {
    const { updateProgress } = useContentStore.getState();
    updateProgress(sourceId, 1, undefined);
  } else if (source === 'generated') {
    const { updateArticleProgress } = useGeneratedStore.getState();
    updateArticleProgress(sourceId, { currentWordIndex: undefined });
  } else if (source === 'curriculum') {
    const parts = parseCurriculumSourceId(sourceId);
    if (parts) {
      const { saveArticlePosition } = useCurriculumStore.getState();
      saveArticlePosition(parts.curriculumId, parts.articleIndex, undefined);
    }
  }
}

/**
 * Retrieve saved reading position.
 *
 * @param sourceId - The content identifier
 * @param source - The content source type
 * @returns Word index to resume from, or undefined if no saved position
 *
 * @example
 * // Get saved position for imported content
 * const position = getSavedPosition("imported_123", "imported");
 * // Returns: 500 (or undefined if not saved)
 *
 * // Get saved position for curriculum article
 * const position = getSavedPosition("curr_789:2", "curriculum");
 * // Returns: 30 (or undefined if not saved)
 */
export function getSavedPosition(
  sourceId: string,
  source: ContentSource
): number | undefined {
  if (source === 'imported') {
    const { getCurrentWordIndex } = useContentStore.getState();
    return getCurrentWordIndex(sourceId);
  } else if (source === 'generated') {
    const article = useGeneratedStore.getState().getArticleById(sourceId);
    return article?.currentWordIndex;
  } else if (source === 'curriculum') {
    const parts = parseCurriculumSourceId(sourceId);
    if (parts) {
      const { getArticlePosition } = useCurriculumStore.getState();
      return getArticlePosition(parts.curriculumId, parts.articleIndex);
    }
  }
  return undefined;
}
