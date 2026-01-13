/**
 * useAuthDeepLink Hook
 *
 * Handles deep link callbacks for magic link authentication.
 * Listens for incoming URLs and completes the authentication flow.
 */

import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { supabase } from '../services/supabase';

/**
 * Extract tokens from a Supabase auth callback URL
 * The URL format is typically: spidrid://auth/callback#access_token=...&refresh_token=...
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
 * Handle the auth callback URL by setting the session with Supabase
 */
async function handleAuthCallback(url: string): Promise<void> {
  const { accessToken, refreshToken } = extractTokensFromUrl(url);

  if (!accessToken || !refreshToken) {
    return;
  }

  // Set the session with Supabase - this will trigger onAuthStateChange
  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    console.error('Error setting session from deep link:', error);
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
