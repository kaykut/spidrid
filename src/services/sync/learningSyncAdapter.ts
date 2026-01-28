/**
 * Learning Store Sync Adapter
 *
 * Synchronizes article progress between the local Zustand store
 * and Supabase user_content table.
 */

import { useLearningStore } from '../../store/learningStore';
import { ArticleProgress } from '../../types/learning';
import { supabase } from '../supabase';
import { SyncAdapter, SyncItem } from '../syncService';
import { requireSyncEligibility } from './syncAccess';

const ITEM_TYPE = 'learning_progress';

/**
 * Extended ArticleProgress with sync metadata.
 * Uses articleId as id and lastReadAt as updatedAt.
 */
export interface SyncableLearningProgress extends SyncItem {
  id: string;
  updatedAt: number;
  articleId: string;
  completed: boolean;
  comprehensionScore: number;
  highestWPM: number;
  lastReadAt: number;
  attemptCount?: number;
  certificationAttemptUsed?: boolean;
  certificationAttemptScore?: number;
  certificationAttemptWPM?: number;
  attempts?: ArticleProgress['attempts'];
}

/**
 * Convert ArticleProgress to SyncableLearningProgress
 */
function toSyncableLearningProgress(progress: ArticleProgress): SyncableLearningProgress {
  return {
    ...progress,
    id: progress.articleId,
    updatedAt: progress.lastReadAt,
  };
}

/**
 * Convert SyncableLearningProgress back to ArticleProgress
 */
function fromSyncableLearningProgress(syncable: SyncableLearningProgress): ArticleProgress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, updatedAt, ...progress } = syncable;
  return progress as ArticleProgress;
}

export const learningSyncAdapter: SyncAdapter<SyncableLearningProgress> = {
  /**
   * Extract items from the local learningStore
   */
  toSyncItems: (): SyncableLearningProgress[] => {
    const { articleProgress } = useLearningStore.getState();
    return Object.values(articleProgress).map(toSyncableLearningProgress);
  },

  /**
   * Write merged items back to the local learningStore
   * Preserves existing recentCompletions and currentWPM
   */
  fromSyncItems: (items: SyncableLearningProgress[]): void => {
    const articleProgress: Record<string, ArticleProgress> = {};
    for (const item of items) {
      articleProgress[item.articleId] = fromSyncableLearningProgress(item);
    }
    useLearningStore.setState({ articleProgress });
  },

  /**
   * Push items to Supabase user_content table
   */
  push: async (items: SyncableLearningProgress[]): Promise<void> => {
    if (items.length === 0) {return;}

    requireSyncEligibility();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    const upserts = items.map((item) => ({
      user_id: user.id,
      item_id: item.id,
      item_type: ITEM_TYPE,
      data: item,
      updated_at: new Date(item.updatedAt).toISOString(),
    }));

    const { error } = await supabase
      .from('user_content')
      .upsert(upserts, { onConflict: 'user_id,item_id' });

    if (error) {
      throw error;
    }
  },

  /**
   * Pull items from Supabase user_content table
   */
  pull: async (): Promise<SyncableLearningProgress[]> => {
    requireSyncEligibility();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('user_content')
      .select('data')
      .eq('user_id', user.id)
      .eq('item_type', ITEM_TYPE)
      .is('deleted_at', null);

    if (error) {
      throw error;
    }

    return (data || []).map((row) => row.data as SyncableLearningProgress);
  },
};
