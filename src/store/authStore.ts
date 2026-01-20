import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { useSubscriptionStore } from './subscriptionStore';

interface AuthState {
  isInitialized: boolean;
  isAnonymous: boolean;
  isLoggedIn: boolean;
  userId: string | null;
  userEmail: string | null; // User's email address (null for anonymous users)
  authError: string | null; // Error message from last auth failure

  initialize: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
  signInWithGoogle: () => Promise<void>;
  signUpWithPassword: (email: string, password: string) => Promise<{ user: unknown; session: unknown } | null>;
  signInWithPassword: (email: string, password: string) => Promise<{ user: unknown; session: unknown } | null>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  isInitialized: false,
  isAnonymous: false,
  isLoggedIn: false,
  userId: null,
  userEmail: null,
  authError: null,

  // Initialize authentication - check for existing session or create anonymous
  initialize: async () => {
    console.log('[AuthStore] === initialize() called ===');
    console.log('[AuthStore] isInitialized:', get().isInitialized);

    if (get().isInitialized) {
      console.log('[AuthStore] Already initialized, returning');
      return;
    }

    console.log('[AuthStore] Setting up auth state change listener');
    // Set up auth state change listener to handle session updates
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[AuthStore] onAuthStateChange event:', _event);
      console.log('[AuthStore] session:', session ? {
        userId: session.user?.id,
        isAnonymous: session.user?.is_anonymous
      } : 'null');

      if (session) {
        const isAnonymous = session.user?.is_anonymous ?? false;
        const userId = session.user?.id ?? null;
        const userEmail = session.user?.email ?? null;
        const wasLoggedIn = get().isLoggedIn;
        const isNowLoggedIn = !isAnonymous;

        set({
          isAnonymous,
          isLoggedIn: isNowLoggedIn,
          userId,
          userEmail,
        });

        // Link RevenueCat user when user logs in (not anonymous)
        // This syncs premium status across devices
        if (!wasLoggedIn && isNowLoggedIn && userId) {
          useSubscriptionStore.getState().linkRevenueCatUser(userId).catch((error) => {
            console.error('[Auth] Failed to link RevenueCat user:', error);
          });

          // Restore purchases after login to handle "guest purchase then login" scenario
          // This ensures purchases made before signing in transfer to the authenticated account
          useSubscriptionStore.getState().restorePurchases().catch((error) => {
            console.error('[Auth] Failed to restore purchases after login:', error);
          });
        }
      } else {
        console.log('[AuthStore] No session in onAuthStateChange');
        set({
          isAnonymous: false,
          isLoggedIn: false,
          userId: null,
          userEmail: null,
        });
      }
    });

    console.log('[AuthStore] Checking for existing session...');
    // Check for existing session
    const { data: { session }, error } = await supabase.auth.getSession();

    console.log('[AuthStore] getSession result:', {
      hasSession: !!session,
      error: error?.message,
      userId: session?.user?.id,
      isAnonymous: session?.user?.is_anonymous
    });

    if (session && !error) {
      console.log('[AuthStore] Using existing session');
      // Use existing session
      const isAnonymous = session.user?.is_anonymous ?? false;
      set({
        isInitialized: true,
        isAnonymous,
        isLoggedIn: !isAnonymous,
        userId: session.user?.id ?? null,
        userEmail: session.user?.email ?? null,
      });
      return;
    }

    console.log('[AuthStore] No existing session - calling signInAnonymously()');
    // No session - sign in anonymously
    const { data, error: signInError } = await supabase.auth.signInAnonymously();

    console.log('[AuthStore] signInAnonymously result:', {
      hasUser: !!data?.user,
      userId: data?.user?.id,
      error: signInError?.message,
      errorDetails: signInError
    });

    if (signInError || !data.user) {
      // Log the error for debugging
      console.error(
        '[AuthStore] signInAnonymously failed:',
        signInError?.message || 'No user returned',
        signInError
      );

      // Even on error, mark as initialized to prevent infinite retries
      set({
        isInitialized: true,
        authError: signInError?.message || 'Authentication failed',
      });
      return;
    }

    console.log('[AuthStore] signInAnonymously SUCCESS - user created:', data.user.id);
    set({
      isInitialized: true,
      isAnonymous: true,
      isLoggedIn: false,
      userId: data.user.id,
    });
  },

  // Get access token for API calls
  // Refreshes session to ensure token is valid with server
  getAccessToken: async () => {
    // Refresh session to get a fresh, server-validated token
    // getSession() returns cached tokens that may be stale
    const { data: { session }, error } = await supabase.auth.refreshSession();

    if (error || !session) {
      console.log('[AuthStore] Failed to refresh session:', error?.message);
      // Fall back to cached session
      const { data: cached } = await supabase.auth.getSession();
      return cached.session?.access_token ?? null;
    }

    return session.access_token;
  },

  // Sign in with Google - links Google identity to current anonymous session
  signInWithGoogle: async () => {
    const { error } = await supabase.auth.linkIdentity({
      provider: 'google',
    });

    if (error) {
      throw error;
    }
  },

  // Sign up with email and password - creates new permanent account
  signUpWithPassword: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      // Map common errors to user-friendly messages
      if (error.message.toLowerCase().includes('already registered')) {
        throw new Error('This email is already registered. Try signing in instead.');
      }
      if (error.message.toLowerCase().includes('password')) {
        throw new Error('Password must be at least 8 characters long');
      }
      throw error;
    }

    // Supabase sends verification email automatically
    return data;
  },

  // Sign in with existing email and password
  signInWithPassword: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Map common errors to user-friendly messages
      if (error.message.toLowerCase().includes('invalid')) {
        throw new Error('Invalid email or password');
      }
      throw error;
    }

    return data;
  },

  // Request password reset email
  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'devoro://auth/callback',
    });

    if (error) {
      throw error;
    }
  },

  // Sign out and create new anonymous session
  signOut: async () => {
    // First, unlink RevenueCat to prevent entitlement leakage
    await useSubscriptionStore.getState().unlinkRevenueCatUser();

    await supabase.auth.signOut();

    // Create new anonymous session
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error || !data.user) {
      set({
        isAnonymous: false,
        isLoggedIn: false,
        userId: null,
        userEmail: null,
      });
      return;
    }

    set({
      isAnonymous: true,
      isLoggedIn: false,
      userId: data.user.id,
      userEmail: null,
    });
  },
}));
