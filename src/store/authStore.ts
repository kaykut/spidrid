import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { useSubscriptionStore } from './subscriptionStore';

interface AuthState {
  isInitialized: boolean;
  isAnonymous: boolean;
  isLoggedIn: boolean;
  userId: string | null;
  authError: string | null; // Error message from last auth failure

  initialize: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
  signInWithGoogle: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  isInitialized: false,
  isAnonymous: false,
  isLoggedIn: false,
  userId: null,
  authError: null,

  // Initialize authentication - check for existing session or create anonymous
  initialize: async () => {
    console.warn('[AuthStore] === initialize() called ===');
    console.warn('[AuthStore] isInitialized:', get().isInitialized);

    if (get().isInitialized) {
      console.warn('[AuthStore] Already initialized, returning');
      return;
    }

    console.warn('[AuthStore] Setting up auth state change listener');
    // Set up auth state change listener to handle session updates
    supabase.auth.onAuthStateChange((_event, session) => {
      console.warn('[AuthStore] onAuthStateChange event:', _event);
      console.warn('[AuthStore] session:', session ? {
        userId: session.user?.id,
        isAnonymous: session.user?.is_anonymous
      } : 'null');

      if (session) {
        const isAnonymous = session.user?.is_anonymous ?? false;
        const userId = session.user?.id ?? null;
        const wasLoggedIn = get().isLoggedIn;
        const isNowLoggedIn = !isAnonymous;

        set({
          isAnonymous,
          isLoggedIn: isNowLoggedIn,
          userId,
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
        console.warn('[AuthStore] No session in onAuthStateChange');
        set({
          isAnonymous: false,
          isLoggedIn: false,
          userId: null,
        });
      }
    });

    console.warn('[AuthStore] Checking for existing session...');
    // Check for existing session
    const { data: { session }, error } = await supabase.auth.getSession();

    console.warn('[AuthStore] getSession result:', {
      hasSession: !!session,
      error: error?.message,
      userId: session?.user?.id,
      isAnonymous: session?.user?.is_anonymous
    });

    if (session && !error) {
      console.warn('[AuthStore] Using existing session');
      // Use existing session
      const isAnonymous = session.user?.is_anonymous ?? false;
      set({
        isInitialized: true,
        isAnonymous,
        isLoggedIn: !isAnonymous,
        userId: session.user?.id ?? null,
      });
      return;
    }

    console.warn('[AuthStore] No existing session - calling signInAnonymously()');
    // No session - sign in anonymously
    const { data, error: signInError } = await supabase.auth.signInAnonymously();

    console.warn('[AuthStore] signInAnonymously result:', {
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

    console.warn('[AuthStore] signInAnonymously SUCCESS - user created:', data.user.id);
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
      console.warn('[AuthStore] Failed to refresh session:', error?.message);
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

  // Sign in with Magic Link - sends OTP email to link to current session
  signInWithMagicLink: async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // Link to existing anonymous user, don't create new
      },
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
      });
      return;
    }

    set({
      isAnonymous: true,
      isLoggedIn: false,
      userId: data.user.id,
    });
  },
}));
