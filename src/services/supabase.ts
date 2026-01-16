import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || '';

console.log('[Supabase] Initializing client with:');
console.log('[Supabase] URL:', supabaseUrl);
console.log('[Supabase] Anon Key prefix:', supabaseAnonKey.substring(0, 20) + '...');
console.log('[Supabase] Anon Key format:', supabaseAnonKey.startsWith('sb_publishable') ? 'NEW (sb_publishable)' : supabaseAnonKey.startsWith('eyJ') ? 'LEGACY (JWT)' : 'UNKNOWN');

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
