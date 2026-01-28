import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
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
  pendingOAuthProvider: 'google' | null;

  initialize: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const generateNonce = async (): Promise<string> => {
  const bytes = await Crypto.getRandomBytesAsync(32);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  isInitialized: false,
  isAnonymous: false,
  isLoggedIn: false,
  userId: null,
  userEmail: null,
  authError: null,
  pendingOAuthProvider: null,

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
        const wasLoggedIn = get().isLoggedIn;
        const isNowLoggedIn = !isAnonymous;

        set({
          isAnonymous,
          isLoggedIn: isNowLoggedIn,
          userId,
          userEmail,
          pendingOAuthProvider: null,
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
        set({
          isAnonymous: false,
          isLoggedIn: false,
          userId: null,
          userEmail: null,
          pendingOAuthProvider: null,
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
        pendingOAuthProvider: null,
      });
      return;
    }

    // No session - sign in anonymously
    const { data, error: signInError } = await supabase.auth.signInAnonymously();

    if (signInError || !data.user) {
      console.error(
        '[AuthStore] signInAnonymously failed:',
        signInError?.message || 'No user returned',
        signInError
      );

      // Even on error, mark as initialized to prevent infinite retries
      set({
        isInitialized: true,
        authError: signInError?.message || 'Authentication failed',
        pendingOAuthProvider: null,
      });
      return;
    }

    set({
      isInitialized: true,
      isAnonymous: true,
      isLoggedIn: false,
      userId: data.user.id,
      pendingOAuthProvider: null,
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
    set({ pendingOAuthProvider: 'google' });
    const { error } = await supabase.auth.linkIdentity({
      provider: 'google',
    });

    if (error) {
      set({ pendingOAuthProvider: null });
      throw error;
    }
  },

  // Sign in with Apple - native iOS flow only
  signInWithApple: async () => {
    if (Platform.OS !== 'ios') {
      throw new Error('Apple sign-in is only available on iOS.');
    }

    const isAvailable = await AppleAuthentication.isAvailableAsync();
    if (!isAvailable) {
      throw new Error('Apple sign-in is not available on this device.');
    }

    const nonce = await generateNonce();
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
      nonce,
    });

    if (!credential.identityToken) {
      throw new Error('Apple sign-in failed. Please try again.');
    }

    const { error } = await supabase.auth.linkIdentity({
      provider: 'apple',
      token: credential.identityToken,
      nonce,
    });

    if (error?.code === 'identity_already_exists') {
      const { error: signInError } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
        nonce,
      });

      if (signInError) {
        throw signInError;
      }
    } else if (error) {
      throw error;
    }

    const givenName = credential.fullName?.givenName ?? '';
    const familyName = credential.fullName?.familyName ?? '';
    const fullName = [givenName, familyName].filter(Boolean).join(' ').trim();

    if (fullName) {
      await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          given_name: givenName || undefined,
          family_name: familyName || undefined,
        },
      });
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
        pendingOAuthProvider: null,
      });
      return;
    }

    set({
      isAnonymous: true,
      isLoggedIn: false,
      userId: data.user.id,
      userEmail: null,
      pendingOAuthProvider: null,
    });
  },
}));
