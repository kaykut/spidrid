/**
 * useAuthDeepLink Hook
 *
 * Handles deep link callbacks for magic link authentication.
 * Listens for incoming URLs and completes the authentication flow.
 */

import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

/**
 * Extract tokens from a Supabase auth callback URL
 * The URL format is typically: devoro://auth/callback#access_token=...&refresh_token=...
 */
function extractTokensFromUrl(url: string): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  try {
    // Parse the URL hash fragment (everything after #)
    const hashIndex = url.indexOf('#');
    if (hashIndex === -1) {
      return { accessToken: null, refreshToken: null };
    }

    const hash = url.substring(hashIndex + 1);
    const params = new URLSearchParams(hash);

    return {
      accessToken: params.get('access_token'),
      refreshToken: params.get('refresh_token'),
    };
  } catch {
    return { accessToken: null, refreshToken: null };
  }
}

/**
 * Extract error information from a Supabase auth callback URL
 * The URL format is: devoro://auth/callback#error=identity_already_exists&error_description=...
 */
function extractErrorFromUrl(url: string): {
  error: string | null;
  errorDescription: string | null;
} {
  try {
    // Parse the URL hash fragment (everything after #)
    const hashIndex = url.indexOf('#');
    if (hashIndex === -1) {
      return { error: null, errorDescription: null };
    }

    const hash = url.substring(hashIndex + 1);
    const params = new URLSearchParams(hash);

    return {
      error: params.get('error'),
      errorDescription: params.get('error_description'),
    };
  } catch {
    return { error: null, errorDescription: null };
  }
}

/**
 * Handle the auth callback URL by setting the session with Supabase
 */
async function handleAuthCallback(url: string): Promise<void> {
  // Clear any previous auth error when processing a new callback
  useAuthStore.setState({ authError: null });

  const { accessToken, refreshToken } = extractTokensFromUrl(url);

  if (!accessToken || !refreshToken) {
    // Check for error in the callback
    const { error, errorDescription } = extractErrorFromUrl(url);

    if (error === 'identity_already_exists') {
      // Google account is already linked to another user
      // This happens on Device 2 when trying to link an identity that was already
      // linked on Device 1. We need to sign in to the existing account instead.
      console.warn('[Auth] Identity already exists, signing in to existing account');

      // Trigger a new OAuth flow to sign in (not link)
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'devoro://auth/callback',
        },
      });

      if (signInError) {
        console.error('[Auth] Failed to sign in with OAuth:', signInError);
        useAuthStore.setState({
          authError: signInError.message || 'Sign in failed. Please try again.',
        });
      }
      return;
    }

    if (error) {
      console.error('[Auth] OAuth callback error:', error, errorDescription);
      useAuthStore.setState({
        authError: errorDescription || error || 'Authentication failed. Please try again.',
      });
    }
    return;
  }

  // Set the session with Supabase - this will trigger onAuthStateChange
  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    console.error('[Auth] Error setting session from deep link:', error);
    useAuthStore.setState({
      authError: error.message || 'Failed to complete sign in. Please try again.',
    });
  }
}

/**
 * Hook to listen for auth deep links and complete authentication
 * Should be called in the root layout component
 */
export function useAuthDeepLink(): void {
  useEffect(() => {
    // Handle the initial URL if app was opened via deep link
    async function handleInitialUrl() {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        await handleAuthCallback(initialUrl);
      }
    }

    handleInitialUrl();

    // Listen for incoming URLs while app is running
    const subscription = Linking.addEventListener('url', async (event) => {
      await handleAuthCallback(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
