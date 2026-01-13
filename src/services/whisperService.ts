/**
 * Whisper Service
 *
 * Speech-to-text transcription using OpenAI Whisper API via Supabase Edge Function.
 * Audio recording is handled by useWhisperRecording hook (uses expo-audio).
 */

import { File } from 'expo-file-system';
import Constants from 'expo-constants';

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
  console.log('[whisperService] transcribeAudio called with URI:', audioUri);
  console.log('[whisperService] SUPABASE_URL:', SUPABASE_URL);

  try {
    // Read the audio file as base64
    console.log('[whisperService] Creating File object...');
    const audioFile = new File(audioUri);
    console.log('[whisperService] File object created, calling base64()...');
    const base64Audio = await audioFile.base64();
    console.log('[whisperService] base64 length:', base64Audio?.length || 'null/undefined');

    // Determine file type from URI (default to m4a for iOS)
    const fileType = audioUri.endsWith('.wav') ? 'wav' : 'm4a';
    console.log('[whisperService] File type:', fileType);

    // Call Supabase Edge Function
    const url = `${SUPABASE_URL}/functions/v1/transcribe`;
    console.log('[whisperService] Fetching:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audio: base64Audio,
        fileType,
      }),
    });

    console.log('[whisperService] Response status:', response.status);
    const data = await response.json();
    console.log('[whisperService] Response data:', JSON.stringify(data).substring(0, 200));

    if (!response.ok) {
      console.log('[whisperService] Response not OK, returning error');
      return {
        success: false,
        error: data.error || 'Transcription failed',
      };
    }

    if (!data?.text) {
      console.log('[whisperService] No text in response');
      return {
        success: false,
        error: 'No transcription returned',
      };
    }

    console.log('[whisperService] Success! Text:', data.text.substring(0, 50));
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
