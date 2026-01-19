#!/usr/bin/env node
/**
 * Script to clear the sync timestamp from AsyncStorage
 * Run this to fix the sync issue after cache was cleared
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

async function clearSyncTimestamp() {
  try {
    // Get all keys
    const keys = await AsyncStorage.getAllKeys();

    // Find sync timestamp keys
    const syncKeys = keys.filter(key => key.includes('dream_sync_timestamp'));

    if (syncKeys.length === 0) {
      console.log('No sync timestamps found');
      return;
    }

    // Remove sync timestamp keys
    await AsyncStorage.multiRemove(syncKeys);
    console.log(`Cleared ${syncKeys.length} sync timestamp(s):`, syncKeys);

  } catch (error) {
    console.error('Error clearing sync timestamps:', error);
  }
}

clearSyncTimestamp();