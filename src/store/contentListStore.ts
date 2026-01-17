/**
 * Content List Store
 *
 * Provides a unified view of all content from multiple source stores.
 * This store does NOT persist - it computes the list from other stores on demand.
 *
 * Sources:
 * - contentStore: Imported content (URL, PDF, EPUB, text)
 * - generatedStore: AI-generated single articles
 * - curriculumStore: AI-generated multi-article curricula
 * - learningStore + static curriculum: Training articles
 */

import { create } from 'zustand';
import { ARTICLES, TOPICS } from '../data/curriculum';
import {
  ContentCategory,
  ContentListItem,
  ContentItemState,
  ContentSection,
  BOOK_PAGE_THRESHOLD,
} from '../types/contentList';
import {
  DateBucket,
  DATE_BUCKET_LABELS,
  DATE_BUCKET_ORDER,
  getDateBucket,
} from '../utils/dateGrouping';
import { useContentStore } from './contentStore';
import { useCurriculumStore } from './curriculumStore';
import { useGeneratedStore } from './generatedStore';
import { useLearningStore } from './learningStore';
import { useSettingsStore } from './settingsStore';

// =============================================================================
// Store Interface
// =============================================================================

interface ContentListState {
  /** Currently active filter (null = show all) */
  activeFilter: ContentCategory | null;

  /** Set the active filter */
  setFilter: (filter: ContentCategory | null) => void;

  /** Get the unified content list (computed from source stores) */
  getContentList: () => ContentListItem[];

  /** Get content list grouped by date sections */
  getGroupedContentList: () => ContentSection[];

  /** Get only completed items for History view */
  getHistoryList: () => ContentListItem[];

  /** Get history list grouped by date sections */
  getGroupedHistoryList: () => ContentSection[];

  /** Check if there is any content at all (ignores filter) */
  hasAnyContent: () => boolean;

  /** Delete an item (delegates to appropriate source store) */
  deleteItem: (item: ContentListItem) => void;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Estimate page count from word count (approximately 250 words per page)
 */
function estimatePageCount(wordCount: number): number {
  return Math.ceil(wordCount / 250);
}

/**
 * Determine content state from progress and completion
 */
function getContentState(
  progress: number,
  completed: boolean
): ContentItemState {
  if (completed) {
    return 'completed';
  }
  if (progress > 0) {
    return 'in_progress';
  }
  return 'not_started';
}

/**
 * Determine curriculum state from completion status
 */
function getCurriculumState(
  isCompleted: boolean,
  completedCount: number
): ContentItemState {
  if (isCompleted) {
    return 'completed';
  }
  if (completedCount > 0) {
    return 'in_progress';
  }
  return 'not_started';
}

// =============================================================================
// Store Implementation
// =============================================================================

export const useContentListStore = create<ContentListState>((set, get) => ({
  activeFilter: null,

  setFilter: (filter) => {
    set({ activeFilter: filter });
  },

  getContentList: () => {
    const items: ContentListItem[] = [];
    const filter = get().activeFilter;

    // Get source stores
    const { importedContent } = useContentStore.getState();
    const { articles: generatedArticles } = useGeneratedStore.getState();
    const { curricula } = useCurriculumStore.getState();
    const { articleProgress } = useLearningStore.getState();

    // =========================================================================
    // 1. Imported Content (books & articles)
    // =========================================================================
    for (const content of importedContent) {
      const pageCount = estimatePageCount(content.wordCount);
      const isBook =
        content.source === 'epub' ||
        (content.source === 'pdf' && pageCount > BOOK_PAGE_THRESHOLD);
      const category: ContentCategory = isBook ? 'books' : 'articles';

      // Skip if doesn't match filter
      if (filter && filter !== category) {
        continue;
      }

      const state = getContentState(
        content.readProgress * 100,
        content.readProgress >= 1
      );

      items.push({
        id: `imported-${content.id}`,
        sourceId: content.id,
        source: 'imported',
        category,
        title: content.title,
        wordCount: content.wordCount,
        pageCount: isBook ? pageCount : undefined,
        state,
        progress: Math.round(content.readProgress * 100),
        hasQuiz: false,
        quizPending: false,
        addedAt: content.createdAt,
        lastPlayedAt: content.lastReadAt,
      });
    }

    // =========================================================================
    // 2. Generated Articles (learning)
    // =========================================================================
    if (!filter || filter === 'learning') {
      for (const article of generatedArticles) {
        // Only show completed articles (not generating/error)
        if (article.status !== 'complete') {
          continue;
        }

        const progress = article.completed ? 100 : 0;
        const state = getContentState(progress, article.completed);

        items.push({
          id: `generated-${article.id}`,
          sourceId: article.id,
          source: 'generated',
          category: 'learning',
          title: article.title,
          wordCount: article.wordCount,
          state,
          progress,
          quizScore: article.comprehensionScore,
          hasQuiz: article.questions.length > 0, // Generated articles don't have hasQuiz field
          quizPending: !article.completed && article.questions.length > 0,
          addedAt: article.generatedAt,
          lastPlayedAt: article.lastReadAt,
        });
      }
    }

    // =========================================================================
    // 3. Curricula (learning)
    // =========================================================================
    if (!filter || filter === 'learning') {
      for (const curriculum of Object.values(curricula)) {
        // Build nested article items
        const curriculumArticles: ContentListItem[] = [];

        for (const article of curriculum.articles) {
          // Only show generated articles
          if (article.generationStatus !== 'generated') {
            continue;
          }

          const articleState = getContentState(
            article.completionStatus === 'completed' ? 100 : 0,
            article.completionStatus === 'completed'
          );

          curriculumArticles.push({
            id: `curriculum-article-${article.id}`,
            sourceId: `${article.curriculumId}:${article.orderIndex}`,
            source: 'curriculum',
            category: 'learning',
            title: article.title,
            wordCount: article.wordCount,
            state: articleState,
            progress: article.completionStatus === 'completed' ? 100 : 0,
            quizScore: article.comprehensionScore,
            hasQuiz: article.hasQuiz && article.questions.length > 0,
            quizPending:
              article.completionStatus !== 'completed' &&
              article.hasQuiz &&
              article.questions.length > 0,
            addedAt: article.generatedAt || curriculum.createdAt,
            lastPlayedAt: article.completedAt,
            curriculumId: curriculum.id,
          });
        }

        // Only show curriculum if it has at least one generated article
        if (curriculumArticles.length === 0) {
          continue;
        }

        const completedCount = curriculum.articles.filter(
          (a) => a.completionStatus === 'completed'
        ).length;
        const totalWords = curriculum.articles.reduce(
          (sum, a) => sum + (a.wordCount || 0),
          0
        );

        items.push({
          id: `curriculum-${curriculum.id}`,
          sourceId: curriculum.id,
          source: 'curriculum',
          category: 'learning',
          title: curriculum.title,
          wordCount: totalWords,
          state: getCurriculumState(curriculum.isCompleted, completedCount),
          progress: Math.round((completedCount / curriculum.articleCount) * 100),
          hasQuiz: true, // Curricula have quizzes per article
          quizPending: false,
          addedAt: curriculum.createdAt,
          lastPlayedAt: curriculum.updatedAt,
          isCurriculum: true,
          curriculumProgress: {
            completed: completedCount,
            total: curriculum.articleCount,
          },
          curriculumArticles,
        });
      }
    }

    // =========================================================================
    // 4. Training Articles
    // =========================================================================
    if (!filter || filter === 'training') {
      // Group articles by topic for display
      for (const topic of TOPICS) {
        const topicArticles = ARTICLES.filter((a) => a.topicId === topic.id);

        for (const article of topicArticles) {
          const progress = articleProgress[article.id];
          if (!progress) {
            // Skip articles that haven't been started
            continue;
          }

          const completed = progress?.completed ?? false;
          const progressPercent = completed ? 100 : 0;
          const state = getContentState(progressPercent, completed);

          // Use first attempt timestamp as "added" date, fall back to lastReadAt
          const firstAttemptAt = progress.attempts?.[0]?.timestamp;
          const addedAt = firstAttemptAt || progress.lastReadAt || 0;

          items.push({
            id: `training-${article.id}`,
            sourceId: article.id,
            source: 'training',
            category: 'training',
            title: article.title,
            wordCount: article.wordCount,
            state,
            progress: progressPercent,
            quizScore: progress?.comprehensionScore,
            hasQuiz: article.questions.length > 0,
            quizPending: false, // Training articles don't have pending quiz state
            addedAt,
            lastPlayedAt: progress?.lastReadAt,
          });
        }
      }
    }

    // =========================================================================
    // Sort by addedAt descending (most recent first)
    // Training articles (addedAt = 0) go to the end
    // =========================================================================
    items.sort((a, b) => {
      // Training articles at the end
      if (a.addedAt === 0 && b.addedAt !== 0) {
        return 1;
      }
      if (b.addedAt === 0 && a.addedAt !== 0) {
        return -1;
      }
      // Otherwise sort by addedAt descending
      return b.addedAt - a.addedAt;
    });

    // =========================================================================
    // Filter out completed items if "Move to History" setting is enabled
    // =========================================================================
    const { moveFinishedToHistory } = useSettingsStore.getState();
    if (moveFinishedToHistory) {
      return items.filter((item) => item.state !== 'completed');
    }

    return items;
  },

  getGroupedContentList: () => {
    const items = get().getContentList();

    // Group items by date bucket
    const bucketMap = new Map<DateBucket, ContentListItem[]>();

    for (const item of items) {
      const bucket = getDateBucket(item.addedAt);
      if (!bucketMap.has(bucket)) {
        bucketMap.set(bucket, []);
      }
      bucketMap.get(bucket)!.push(item);
    }

    // Build sections in order, omitting empty buckets
    const sections: ContentSection[] = [];
    for (const bucket of DATE_BUCKET_ORDER) {
      const data = bucketMap.get(bucket);
      if (data && data.length > 0) {
        sections.push({
          bucket,
          title: DATE_BUCKET_LABELS[bucket],
          data,
        });
      }
    }

    return sections;
  },

  getHistoryList: () => {
    const items: ContentListItem[] = [];

    // Get source stores
    const { importedContent } = useContentStore.getState();
    const { articles: generatedArticles } = useGeneratedStore.getState();
    const { curricula } = useCurriculumStore.getState();
    const { articleProgress } = useLearningStore.getState();

    // =========================================================================
    // 1. Imported Content (completed only)
    // =========================================================================
    for (const content of importedContent) {
      if (content.readProgress < 1) {
        continue; // Skip incomplete
      }

      const pageCount = estimatePageCount(content.wordCount);
      const isBook =
        content.source === 'epub' ||
        (content.source === 'pdf' && pageCount > BOOK_PAGE_THRESHOLD);
      const category: ContentCategory = isBook ? 'books' : 'articles';

      items.push({
        id: `imported-${content.id}`,
        sourceId: content.id,
        source: 'imported',
        category,
        title: content.title,
        wordCount: content.wordCount,
        pageCount: isBook ? pageCount : undefined,
        state: 'completed',
        progress: 100,
        hasQuiz: false,
        quizPending: false,
        addedAt: content.createdAt,
        lastPlayedAt: content.lastReadAt,
      });
    }

    // =========================================================================
    // 2. Generated Articles (completed only)
    // =========================================================================
    for (const article of generatedArticles) {
      if (article.status !== 'complete' || !article.completed) {
        continue;
      }

      items.push({
        id: `generated-${article.id}`,
        sourceId: article.id,
        source: 'generated',
        category: 'learning',
        title: article.title,
        wordCount: article.wordCount,
        state: 'completed',
        progress: 100,
        quizScore: article.comprehensionScore,
        hasQuiz: article.questions.length > 0,
        quizPending: false,
        addedAt: article.generatedAt,
        lastPlayedAt: article.lastReadAt,
      });
    }

    // =========================================================================
    // 3. Curricula (completed only)
    // =========================================================================
    for (const curriculum of Object.values(curricula)) {
      if (!curriculum.isCompleted) {
        continue; // Skip incomplete curricula
      }

      // Build nested article items (all completed)
      const curriculumArticles: ContentListItem[] = [];
      for (const article of curriculum.articles) {
        // Show all articles in history
        curriculumArticles.push({
          id: `curriculum-article-${article.id}`,
          sourceId: `${article.curriculumId}:${article.orderIndex}`,
          source: 'curriculum',
          category: 'learning',
          title: article.title,
          wordCount: article.wordCount,
          state: article.completionStatus === 'completed' ? 'completed' : 'in_progress',
          progress: article.completionStatus === 'completed' ? 100 : 0,
          quizScore: article.comprehensionScore,
          hasQuiz: article.questions.length > 0,
          quizPending: false,
          addedAt: article.generatedAt || curriculum.createdAt,
          lastPlayedAt: article.completedAt,
          curriculumId: curriculum.id,
        });
      }

      if (curriculumArticles.length === 0) {
        continue;
      }

      const totalWords = curriculum.articles.reduce(
        (sum, a) => sum + (a.wordCount || 0),
        0
      );

      items.push({
        id: `curriculum-${curriculum.id}`,
        sourceId: curriculum.id,
        source: 'curriculum',
        category: 'learning',
        title: curriculum.title,
        wordCount: totalWords,
        state: 'completed',
        progress: 100,
        hasQuiz: true,
        quizPending: false,
        addedAt: curriculum.createdAt,
        lastPlayedAt: curriculum.updatedAt,
        isCurriculum: true,
        curriculumProgress: {
          completed: curriculum.articleCount,
          total: curriculum.articleCount,
        },
        curriculumArticles,
      });
    }

    // =========================================================================
    // 4. Training Articles (completed only)
    // =========================================================================
    for (const topic of TOPICS) {
      const topicArticles = ARTICLES.filter((a) => a.topicId === topic.id);

      for (const article of topicArticles) {
        const progress = articleProgress[article.id];
        if (!progress?.completed) {
          continue; // Skip incomplete
        }

        // Use first attempt timestamp as "added" date, fall back to lastReadAt
        const firstAttemptAt = progress.attempts?.[0]?.timestamp;
        const addedAt = firstAttemptAt || progress.lastReadAt || 0;

        items.push({
          id: `training-${article.id}`,
          sourceId: article.id,
          source: 'training',
          category: 'training',
          title: article.title,
          wordCount: article.wordCount,
          state: 'completed',
          progress: 100,
          quizScore: progress.comprehensionScore,
          hasQuiz: article.questions.length > 0,
          quizPending: false,
          addedAt,
          lastPlayedAt: progress.lastReadAt,
        });
      }
    }

    // Sort by lastPlayedAt descending (most recently completed first)
    // Fall back to addedAt if no lastPlayedAt
    items.sort((a, b) => {
      const aTime = a.lastPlayedAt || a.addedAt;
      const bTime = b.lastPlayedAt || b.addedAt;
      // Training articles (addedAt = 0) go to the end
      if (aTime === 0 && bTime !== 0) {
        return 1;
      }
      if (bTime === 0 && aTime !== 0) {
        return -1;
      }
      return bTime - aTime;
    });

    return items;
  },

  getGroupedHistoryList: () => {
    const items = get().getHistoryList();

    // Group items by date bucket (using lastPlayedAt for history)
    const bucketMap = new Map<DateBucket, ContentListItem[]>();

    for (const item of items) {
      const timestamp = item.lastPlayedAt || item.addedAt;
      const bucket = getDateBucket(timestamp);
      if (!bucketMap.has(bucket)) {
        bucketMap.set(bucket, []);
      }
      bucketMap.get(bucket)!.push(item);
    }

    // Build sections in order, omitting empty buckets
    const sections: ContentSection[] = [];
    for (const bucket of DATE_BUCKET_ORDER) {
      const data = bucketMap.get(bucket);
      if (data && data.length > 0) {
        sections.push({
          bucket,
          title: DATE_BUCKET_LABELS[bucket],
          data,
        });
      }
    }

    return sections;
  },

  hasAnyContent: () => {
    // Check each source store for any content (quick check, ignores filter)
    const { importedContent } = useContentStore.getState();
    if (importedContent.length > 0) {
      return true;
    }

    const { articles: generatedArticles } = useGeneratedStore.getState();
    if (generatedArticles.some((a) => a.status === 'complete')) {
      return true;
    }

    const { curricula } = useCurriculumStore.getState();
    const hasCurricula = Object.values(curricula).some((c) =>
      c.articles.some((a) => a.generationStatus === 'generated')
    );
    if (hasCurricula) {
      return true;
    }

    // Training articles are always available
    return ARTICLES.length > 0;
  },

  deleteItem: (item) => {
    switch (item.source) {
      case 'imported':
        useContentStore.getState().deleteContent(item.sourceId);
        break;
      case 'generated':
        useGeneratedStore.getState().deleteArticle(item.sourceId);
        break;
      case 'curriculum':
        useCurriculumStore.getState().deleteCurriculum(item.sourceId);
        break;
      case 'training':
        // Training articles cannot be deleted (static content)
        console.warn('Training articles cannot be deleted');
        break;
      default:
        // Exhaustive check - this should never happen
        break;
    }
  },
}));
