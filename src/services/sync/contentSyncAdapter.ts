/**
 * Content Store Sync Adapter
 *
 * Synchronizes imported content (URLs, PDFs, EPUBs, text) between
 * the local Zustand store and Supabase user_content table.
 */

import { useContentStore } from '../../store/contentStore';
import { ImportedContent } from '../../types/content';
import { supabase } from '../supabase';
import { SyncAdapter, SyncItem } from '../syncService';

const ITEM_TYPE = 'imported';

/**
 * Extended ImportedContent with sync metadata
 */
export interface SyncableContent extends SyncItem {
  id: string;
  updatedAt: number;
  title: string;
  content: string;
  wordCount: number;
  source: 'url' | 'text' | 'epub' | 'pdf' | 'mobi';
  sourceUrl?: string;
  fileName?: string;
  createdAt: number;
  lastReadAt?: number;
  readProgress: number;
  author?: string;
  excerpt?: string;
  siteName?: string;
}

/**
 * Convert ImportedContent to SyncableContent
 * Adds updatedAt timestamp if not present
 */
function toSyncableContent(content: ImportedContent): SyncableContent {
  return {
    ...content,
    // Use lastReadAt or createdAt as the updatedAt timestamp
    updatedAt: content.lastReadAt || content.createdAt,
  };
}

/**
 * Convert SyncableContent back to ImportedContent
 */
function fromSyncableContent(syncable: SyncableContent): ImportedContent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updatedAt, ...content } = syncable;
  return content as ImportedContent;
}

export const contentSyncAdapter: SyncAdapter<SyncableContent> = {
  /**
   * Extract items from the local contentStore
   */
  toSyncItems: (): SyncableContent[] => {
    const { importedContent } = useContentStore.getState();
    return importedContent.map(toSyncableContent);
  },

  /**
   * Write merged items back to the local contentStore
   */
  fromSyncItems: (items: SyncableContent[]): void => {
    const contents = items.map(fromSyncableContent);
    // Sort by createdAt descending (newest first)
    contents.sort((a, b) => b.createdAt - a.createdAt);
    useContentStore.setState({ importedContent: contents });
  },

  /**
   * Push items to Supabase user_content table
   */
  push: async (items: SyncableContent[]): Promise<void> => {
    if (items.length === 0) {return;}

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    // Upsert each item
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
  pull: async (): Promise<SyncableContent[]> => {
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

    return (data || []).map((row) => row.data as SyncableContent);
  },
};
