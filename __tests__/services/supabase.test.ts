import { supabase } from '../../src/services/supabase';

// Mock expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      supabaseUrl: 'https://test.supabase.co',
      supabaseAnonKey: 'test-anon-key',
    },
  },
}));

describe('supabase client', () => {
  it('should export a supabase client', () => {
    expect(supabase).toBeDefined();
  });

  it('should have auth methods available', () => {
    expect(supabase.auth).toBeDefined();
    expect(supabase.auth.getSession).toBeDefined();
    expect(supabase.auth.signInAnonymously).toBeDefined();
  });
});
