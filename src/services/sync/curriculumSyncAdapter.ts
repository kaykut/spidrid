/**
 * Curriculum Store Sync Adapter
 *
 * Synchronizes multi-article learning paths (curricula) between
 * the local Zustand store and Supabase user_content table.
 */

import { useCurriculumStore } from '../../store/curriculumStore';
import { Curriculum } from '../../types/curriculum';
import { supabase } from '../supabase';
import { SyncAdapter, SyncItem } from '../syncService';
import { requireSyncEligibility } from './syncAccess';

const ITEM_TYPE = 'curriculum';

/**
 * Extended Curriculum with sync metadata.
 * Curriculum already has updatedAt, so it's naturally syncable.
 */
export interface SyncableCurriculum extends SyncItem {
  id: string;
  updatedAt: number;
  title: string;
  goal: string;
  articleCount: number;
  tone: Curriculum['tone'];
  targetWordCount: number;
  hasQuizzes: boolean;
  createdAt: number;
  currentArticleIndex: number;
  completedArticleCount: number;
  isCompleted: boolean;
  outline?: Curriculum['outline'];
  articles: Curriculum['articles'];
}

/**
 * Convert Curriculum to SyncableCurriculum
 */
function toSyncableCurriculum(curriculum: Curriculum): SyncableCurriculum {
  return curriculum as SyncableCurriculum;
}

/**
 * Convert SyncableCurriculum back to Curriculum
 */
function fromSyncableCurriculum(syncable: SyncableCurriculum): Curriculum {
  return syncable as Curriculum;
}

export const curriculumSyncAdapter: SyncAdapter<SyncableCurriculum> = {
  /**
   * Extract items from the local curriculumStore
   * Only sync curricula that have an outline (successfully created)
   */
  toSyncItems: (): SyncableCurriculum[] => {
    const { curricula } = useCurriculumStore.getState();
    return Object.values(curricula)
      .filter((c) => c.outline !== undefined) // Only sync successfully created curricula
      .map(toSyncableCurriculum);
  },

  /**
   * Write merged items back to the local curriculumStore
   */
  fromSyncItems: (items: SyncableCurriculum[]): void => {
    const curricula: Record<string, Curriculum> = {};
    for (const item of items) {
      curricula[item.id] = fromSyncableCurriculum(item);
    }
    useCurriculumStore.setState({ curricula });
  },

  /**
   * Push items to Supabase user_content table
   */
  push: async (items: SyncableCurriculum[]): Promise<void> => {
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
  pull: async (): Promise<SyncableCurriculum[]> => {
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

    return (data || []).map((row) => row.data as SyncableCurriculum);
  },
};
