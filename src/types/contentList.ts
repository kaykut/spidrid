/**
 * Content List Types
 *
 * Types for the unified content list that aggregates all content sources
 * into a single view. This replaces the old playlist concept.
 */

import { DateBucket } from '../utils/dateGrouping';

/**
 * Source of the content - which store it originates from
 * - training: Pre-seeded training articles from static curriculum
 * - imported: User-imported content (URL, PDF, EPUB, text)
 * - generated: AI-generated single articles
 * - curriculum: AI-generated multi-article curricula
 */
export type ContentSource = 'training' | 'imported' | 'generated' | 'curriculum';

/**
 * Content category for filtering - derived from source and metadata
 * - books: Imported EPUB or PDF with >50 pages
 * - articles: Imported URLs/text or short PDFs
 * - learning: AI-generated content (single articles or curricula)
 * - training: Pre-seeded training articles
 */
export type ContentCategory = 'books' | 'articles' | 'learning' | 'training';

/**
 * Reading state of the content item
 * - not_started: Never read
 * - in_progress: Started but not completed
 * - completed: Reading finished (quiz taken if applicable)
 */
export type ContentItemState = 'not_started' | 'in_progress' | 'completed';

/**
 * Unified content item for display in the content list.
 * Aggregates data from various source stores into a consistent shape.
 */
export interface ContentListItem {
  /** Unique identifier for this list item */
  id: string;

  /** Original ID in the source store */
  sourceId: string;

  /** Which store this content comes from */
  source: ContentSource;

  /** Derived category for filtering */
  category: ContentCategory;

  /** Display title */
  title: string;

  /** Total word count */
  wordCount: number;

  /** Page count (for books/PDFs) */
  pageCount?: number;

  /** Current reading state */
  state: ContentItemState;

  /** Reading progress (0-100) */
  progress: number;

  /** Quiz score if completed (0-100) */
  quizScore?: number;

  /** Whether this content has a quiz */
  hasQuiz: boolean;

  /** Reading done but quiz not yet taken */
  quizPending: boolean;

  /** When this content was added (timestamp) */
  addedAt: number;

  /** When this content was last read (timestamp) */
  lastPlayedAt?: number;

  /** Whether this is a curriculum (expandable) */
  isCurriculum?: boolean;

  /** Parent curriculum ID (for curriculum articles) */
  curriculumId?: string;

  /** Curriculum completion progress */
  curriculumProgress?: {
    completed: number;
    total: number;
  };

  /** Nested articles for curricula */
  curriculumArticles?: ContentListItem[];
}

/**
 * Threshold for classifying imported content as "book" vs "article"
 * PDFs and EPUBs with more than 50 pages are considered books
 */
export const BOOK_PAGE_THRESHOLD = 50;

/**
 * Section for SectionList grouping content by date
 */
export interface ContentSection {
  /** Date bucket identifier */
  bucket: DateBucket;

  /** Display title for the section header */
  title: string;

  /** Content items in this section */
  data: ContentListItem[];
}
