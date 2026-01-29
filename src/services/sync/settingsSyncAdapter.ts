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
import { UserSettings, DEFAULT_SETTINGS } from '../../types/settings';
import { supabase } from '../supabase';
import { SyncAdapter, SyncItem } from '../syncService';
import { requireSyncEligibility } from './syncAccess';

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
    pauseOnComma: state.pauseOnComma,
    pauseOnPeriod: state.pauseOnPeriod,
    pauseOnParagraph: state.pauseOnParagraph,
    hyphenationMode: state.hyphenationMode,
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
    const legacyParagraphPause = (remoteSettings as Partial<SyncableSettings> & { paragraphPauseEnabled?: boolean }).paragraphPauseEnabled;
    const resolvedPauseOnParagraph = remoteSettings.pauseOnParagraph
      ?? (legacyParagraphPause !== undefined ? (legacyParagraphPause ? 'short' : 'off') : DEFAULT_SETTINGS.pauseOnParagraph);

    // Update store with remote settings
    useSettingsStore.setState({
      themeId: remoteSettings.themeId ?? DEFAULT_SETTINGS.themeId,
      defaultWPM: remoteSettings.defaultWPM ?? DEFAULT_SETTINGS.defaultWPM,
      showCrosshairs: remoteSettings.showCrosshairs ?? DEFAULT_SETTINGS.showCrosshairs,
      crosshairOpacity: remoteSettings.crosshairOpacity ?? DEFAULT_SETTINGS.crosshairOpacity,
      fontSize: remoteSettings.fontSize ?? DEFAULT_SETTINGS.fontSize,
      fontFamily: remoteSettings.fontFamily ?? DEFAULT_SETTINGS.fontFamily,
      hapticFeedback: remoteSettings.hapticFeedback ?? DEFAULT_SETTINGS.hapticFeedback,
      userName: remoteSettings.userName ?? DEFAULT_SETTINGS.userName,
      readingLanguage: remoteSettings.readingLanguage ?? DEFAULT_SETTINGS.readingLanguage,
      pauseOnComma: remoteSettings.pauseOnComma ?? DEFAULT_SETTINGS.pauseOnComma,
      pauseOnPeriod: remoteSettings.pauseOnPeriod ?? DEFAULT_SETTINGS.pauseOnPeriod,
      pauseOnParagraph: resolvedPauseOnParagraph,
      hyphenationMode: remoteSettings.hyphenationMode ?? DEFAULT_SETTINGS.hyphenationMode,
      moveFinishedToHistory: remoteSettings.moveFinishedToHistory ?? DEFAULT_SETTINGS.moveFinishedToHistory,
      activeContentTab: remoteSettings.activeContentTab ?? 'train',
    });
  },

  /**
   * Push settings to Supabase
   */
  push: async (items: SyncableSettings[]): Promise<void> => {
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
   * Pull settings from Supabase
   */
  pull: async (): Promise<SyncableSettings[]> => {
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

    return (data || []).map((row) => row.data as SyncableSettings);
  },
};
