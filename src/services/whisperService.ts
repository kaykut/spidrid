/**
 * Whisper Service
 *
 * Speech-to-text transcription using OpenAI Whisper API via Supabase Edge Function.
 * Audio recording is handled by useWhisperRecording hook (uses expo-audio).
 */

import Constants from 'expo-constants';
import { File } from 'expo-file-system';
import { useAuthStore } from '../store/authStore';

const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl || '';
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.supabaseAnonKey || '';

// =============================================================================
// Types
// =============================================================================

export interface TranscribeResult {
  success: boolean;
  text?: string;
  error?: string;
}

// =============================================================================
// Transcription Functions
// =============================================================================

/**
 * Transcribe audio file using OpenAI Whisper via Supabase Edge Function
 */
export async function transcribeAudio(audioUri: string): Promise<TranscribeResult> {
  try {
    // Get access token for authenticated API call
    const authState = useAuthStore.getState();
    console.log('[whisperService] Auth state:', {
      isInitialized: authState.isInitialized,
      isAnonymous: authState.isAnonymous,
      userId: authState.userId,
    });

    console.log('[whisperService] Refreshing session to get fresh token...');
    const token = await authState.getAccessToken();
    if (!token) {
      console.log('[whisperService] No token available after refresh');
      return {
        success: false,
        error: 'Not authenticated',
      };
    }
    console.log('[whisperService] Got fresh token');

    // Decode JWT to check all claims (without verifying signature)
    try {
      const header = JSON.parse(atob(token.split('.')[0]));
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('[whisperService] JWT header:', header);
      console.log('[whisperService] JWT payload (full):', payload);
      console.log('[whisperService] JWT expiry check:', {
        exp: payload.exp,
        expDate: new Date(payload.exp * 1000).toISOString(),
        now: new Date().toISOString(),
        isExpired: Date.now() > payload.exp * 1000,
      });
    } catch (e) {
      console.log('[whisperService] Could not decode JWT:', e);
    }

    // Read the audio file as base64
    const audioFile = new File(audioUri);
    const base64Audio = await audioFile.base64();

    // Determine file type from URI (default to m4a for iOS)
    const fileType = audioUri.endsWith('.wav') ? 'wav' : 'm4a';

    // Call Supabase Edge Function with JWT auth
    const url = `${SUPABASE_URL}/functions/v1/transcribe`;

    console.log('[whisperService] Request:', {
      url,
      hasToken: !!token,
      tokenPrefix: token?.substring(0, 20) + '...',
      hasApiKey: !!SUPABASE_ANON_KEY,
      audioLength: base64Audio?.length,
      fileType,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        audio: base64Audio,
        fileType,
      }),
    });

    const data = await response.json();

    console.log('[whisperService] Response:', {
      status: response.status,
      ok: response.ok,
      data,
    });

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Transcription failed',
      };
    }

    if (!data?.text) {
      return {
        success: false,
        error: 'No transcription returned',
      };
    }

    return {
      success: true,
      text: data.text,
    };
  } catch (error) {
    console.error('[whisperService] Error transcribing audio:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// =============================================================================
// Cleanup
// =============================================================================

/**
 * Delete temporary audio file
 */
export async function deleteAudioFile(uri: string): Promise<void> {
  try {
    const file = new File(uri);
    if (file.exists) {
      file.delete();
    }
  } catch (error) {
    console.error('Error deleting audio file:', error);
  }
}
