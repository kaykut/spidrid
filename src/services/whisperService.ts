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
    const token = await useAuthStore.getState().getAccessToken();
    if (!token) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    // Read the audio file as base64
    const audioFile = new File(audioUri);
    const base64Audio = await audioFile.base64();

    // Determine file type from URI (default to m4a for iOS)
    const fileType = audioUri.endsWith('.wav') ? 'wav' : 'm4a';

    // Call Supabase Edge Function with JWT auth
    const url = `${SUPABASE_URL}/functions/v1/transcribe`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        audio: base64Audio,
        fileType,
      }),
    });

    const data = await response.json();

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
