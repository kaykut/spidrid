import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || '';

console.warn('[Supabase] Initializing client with:');
console.warn('[Supabase] URL:', supabaseUrl);
console.warn('[Supabase] Anon Key prefix:', `${supabaseAnonKey.substring(0, 20)  }...`);
// Determine key format
let keyFormat = 'UNKNOWN';
if (supabaseAnonKey.startsWith('sb_publishable')) {
  keyFormat = 'NEW (sb_publishable)';
} else if (supabaseAnonKey.startsWith('eyJ')) {
  keyFormat = 'LEGACY (JWT)';
}
console.warn('[Supabase] Anon Key format:', keyFormat);

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
