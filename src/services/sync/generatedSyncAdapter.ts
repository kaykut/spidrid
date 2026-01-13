/**
 * Generated Store Sync Adapter
 *
 * Synchronizes AI-generated articles between the local Zustand store
 * and Supabase user_content table.
 */

import { useGeneratedStore } from '../../store/generatedStore';
import { GeneratedArticle } from '../../types/generated';
import { supabase } from '../supabase';
import { SyncAdapter, SyncItem } from '../syncService';

const ITEM_TYPE = 'generated';

/**
 * Extended GeneratedArticle with sync metadata
 */
export interface SyncableGenerated extends SyncItem {
  id: string;
  updatedAt: number;
  topic: string;
  targetDuration: number;
  tone: GeneratedArticle['tone'];
  title: string;
  content: string;
  wordCount: number;
  questions: GeneratedArticle['questions'];
  status: GeneratedArticle['status'];
  errorMessage?: string;
  generatedAt: number;
  completed: boolean;
  comprehensionScore?: number;
  highestWPM?: number;
  lastReadAt?: number;
  attemptCount: number;
}

/**
 * Convert GeneratedArticle to SyncableGenerated
 * Adds updatedAt timestamp based on lastReadAt or generatedAt
 */
function toSyncableGenerated(article: GeneratedArticle): SyncableGenerated {
  return {
    ...article,
    updatedAt: article.lastReadAt || article.generatedAt,
  };
}

/**
 * Convert SyncableGenerated back to GeneratedArticle
 */
function fromSyncableGenerated(syncable: SyncableGenerated): GeneratedArticle {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updatedAt, ...article } = syncable;
  return article as GeneratedArticle;
}

export const generatedSyncAdapter: SyncAdapter<SyncableGenerated> = {
  /**
   * Extract items from the local generatedStore
   * Only sync completed articles
   */
  toSyncItems: (): SyncableGenerated[] => {
    const { articles } = useGeneratedStore.getState();
    return articles
      .filter((a) => a.status === 'complete')
      .map(toSyncableGenerated);
  },

  /**
   * Write merged items back to the local generatedStore
   */
  fromSyncItems: (items: SyncableGenerated[]): void => {
    const articles = items.map(fromSyncableGenerated);
    // Sort by generatedAt descending (newest first)
    articles.sort((a, b) => b.generatedAt - a.generatedAt);
    useGeneratedStore.setState({ articles });
  },

  /**
   * Push items to Supabase user_content table
   */
  push: async (items: SyncableGenerated[]): Promise<void> => {
    if (items.length === 0) {return;}

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
  pull: async (): Promise<SyncableGenerated[]> => {
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

    return (data || []).map((row) => row.data as SyncableGenerated);
  },
};
