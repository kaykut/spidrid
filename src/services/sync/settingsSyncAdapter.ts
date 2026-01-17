/**
 * Settings Store Sync Adapter
 *
 * Synchronizes user settings between the local Zustand store
 * and Supabase user_content table.
 *
 * Settings are synced as a single document per user.
 * Uses last-write-wins for conflict resolution.
 */

import { useSettingsStore } from '../../store/settingsStore';
import { UserSettings } from '../../types/settings';
import { supabase } from '../supabase';
import { SyncAdapter, SyncItem } from '../syncService';

const ITEM_TYPE = 'settings';
const SETTINGS_DOC_ID = 'user_settings';

/**
 * Syncable settings data structure
 */
export interface SyncableSettings extends SyncItem, UserSettings {
  id: string;
  updatedAt: number;
  activeContentTab: 'train' | 'read' | 'learn';
}

/**
 * Extract settings from store as SyncableSettings
 */
function toSyncableSettings(): SyncableSettings {
  const state = useSettingsStore.getState();

  return {
    id: SETTINGS_DOC_ID,
    updatedAt: Date.now(), // Use current time as updatedAt
    themeId: state.themeId,
    defaultWPM: state.defaultWPM,
    showCrosshairs: state.showCrosshairs,
    crosshairOpacity: state.crosshairOpacity,
    fontSize: state.fontSize,
    fontFamily: state.fontFamily,
    hapticFeedback: state.hapticFeedback,
    userName: state.userName,
    readingLanguage: state.readingLanguage,
    paragraphPauseEnabled: state.paragraphPauseEnabled,
    moveFinishedToHistory: state.moveFinishedToHistory,
    activeContentTab: state.activeContentTab,
  };
}

export const settingsSyncAdapter: SyncAdapter<SyncableSettings> = {
  /**
   * Extract settings from store
   */
  toSyncItems: (): SyncableSettings[] => {
    return [toSyncableSettings()];
  },

  /**
   * Write settings to store
   * Uses last-write-wins - remote settings overwrite local
   */
  fromSyncItems: (items: SyncableSettings[]): void => {
    const remoteSettings = items.find((i) => i.id === SETTINGS_DOC_ID);
    if (!remoteSettings) {return;}

    // Update store with remote settings
    useSettingsStore.setState({
      themeId: remoteSettings.themeId,
      defaultWPM: remoteSettings.defaultWPM,
      showCrosshairs: remoteSettings.showCrosshairs,
      crosshairOpacity: remoteSettings.crosshairOpacity,
      fontSize: remoteSettings.fontSize,
      fontFamily: remoteSettings.fontFamily,
      hapticFeedback: remoteSettings.hapticFeedback,
      userName: remoteSettings.userName,
      readingLanguage: remoteSettings.readingLanguage,
      paragraphPauseEnabled: remoteSettings.paragraphPauseEnabled,
      moveFinishedToHistory: remoteSettings.moveFinishedToHistory,
      activeContentTab: remoteSettings.activeContentTab,
    });
  },

  /**
   * Push settings to Supabase
   */
  push: async (items: SyncableSettings[]): Promise<void> => {
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
   * Pull settings from Supabase
   */
  pull: async (): Promise<SyncableSettings[]> => {
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

    return (data || []).map((row) => row.data as SyncableSettings);
  },
};
