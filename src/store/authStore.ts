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
  signInWithOAuth: (provider: 'google' | 'apple') => Promise<void>;
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
    if (get().isInitialized) {
      return;
    }

    // Set up auth state change listener to handle session updates
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const isAnonymous = session.user?.is_anonymous ?? false;
        const userId = session.user?.id ?? null;
        const userEmail = session.user?.email ?? null;

        const prevState = get();
        const wasLoggedIn = prevState.isLoggedIn;
        const isNowLoggedIn = !isAnonymous;
        const prevUserId = prevState.userId;

        // Detect user ID change (not just anonymous → authenticated)
        // This happens when Device 2 signs in with existing account from Device 1
        const userIdChanged = prevUserId && userId && prevUserId !== userId;

        set({
          isAnonymous,
          isLoggedIn: isNowLoggedIn,
          userId,
          userEmail,
        });

        // Link RevenueCat when transitioning to authenticated
        // (First time login OR user ID change)
        if ((!wasLoggedIn && isNowLoggedIn) || userIdChanged) {
          if (userId) {
            // CRITICAL: These must be sequential, not parallel
            // linkRevenueCatUser MUST complete before restorePurchases
            (async () => {
              try {
                await useSubscriptionStore.getState().linkRevenueCatUser(userId);
                await useSubscriptionStore.getState().restorePurchases();
              } catch (error) {
                console.error('[Auth] Failed to link and restore:', error);
              }
            })();
          }
        }
      } else {
        set({
          isAnonymous: false,
          isLoggedIn: false,
          userId: null,
          userEmail: null,
        });
      }
    });

    // Check for existing session
    const { data: { session }, error } = await supabase.auth.getSession();

    if (session && !error) {
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

    // No session - sign in anonymously
    const { data, error: signInError } = await supabase.auth.signInAnonymously();

    if (signInError || !data.user) {
      // Even on error, mark as initialized to prevent infinite retries
      set({
        isInitialized: true,
        authError: signInError?.message || 'Authentication failed',
      });
      return;
    }

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
      // Fall back to cached session
      const { data: cached } = await supabase.auth.getSession();
      return cached.session?.access_token ?? null;
    }

    return session.access_token;
  },

  // Sign in with OAuth (for returning users on Device 2+)
  // Use this when user already has an account and wants to sign in
  signInWithOAuth: async (provider: 'google' | 'apple') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      throw error;
    }
  },

  // Sign in with Google - smart fallback for new vs returning users
  // Try OAuth first (returning user), fall back to linkIdentity (new user)
  signInWithGoogle: async () => {
    // Try signInWithOAuth first (for returning users on Device 2+)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (!error) {
      return; // Success, returning user
    }

    // If OAuth fails, try linkIdentity for new user
    const { error: linkError } = await supabase.auth.linkIdentity({
      provider: 'google',
    });

    if (linkError) {
      throw linkError;
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
