/**
 * useWhisperRecording Hook
 *
 * Encapsulates audio recording and transcription using expo-audio.
 * Provides a simple API for speech-to-text functionality via Whisper.
 */

import { useState, useCallback, useEffect } from 'react';
import {
  useAudioRecorder,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio';
import { transcribeAudio, deleteAudioFile } from '../services/whisperService';

export interface UseWhisperRecordingResult {
  /** Whether audio is currently being recorded */
  isRecording: boolean;
  /** Whether transcription is in progress */
  isTranscribing: boolean;
  /** Error message if something went wrong */
  error: string | null;
  /** Start recording audio */
  startRecording: () => Promise<void>;
  /** Stop recording and transcribe - returns text or null on error */
  stopAndTranscribe: () => Promise<string | null>;
}

export function useWhisperRecording(): UseWhisperRecordingResult {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the audio recorder hook
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  // Cleanup on unmount - stop recording if active
  useEffect(() => {
    return () => {
      if (audioRecorder.isRecording) {
        audioRecorder.stop().catch(() => {
          // Ignore cleanup errors
        });
      }
    };
  }, [audioRecorder]);

  const startRecording = useCallback(async () => {
    setError(null);

    try {
      // Request permissions
      const { granted } = await requestRecordingPermissionsAsync();
      if (!granted) {
        setError('Microphone permission not granted');
        return;
      }

      // Configure audio mode for recording
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      // Prepare and start recording
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to start recording');
    }
  }, [audioRecorder]);

  const stopAndTranscribe = useCallback(async (): Promise<string | null> => {
    setError(null);
    console.log('[useWhisperRecording] stopAndTranscribe called');

    try {
      // Stop recording
      console.log('[useWhisperRecording] Stopping recorder...');
      await audioRecorder.stop();
      setIsRecording(false);
      console.log('[useWhisperRecording] Recorder stopped');

      // Reset audio mode
      await setAudioModeAsync({
        allowsRecording: false,
      });
      console.log('[useWhisperRecording] Audio mode reset');

      const audioUri = audioRecorder.uri;
      console.log('[useWhisperRecording] Audio URI:', audioUri);

      if (!audioUri) {
        console.log('[useWhisperRecording] ERROR: No audio URI');
        setError('Failed to get audio recording');
        return null;
      }

      // Transcribe
      setIsTranscribing(true);
      console.log('[useWhisperRecording] Calling transcribeAudio...');
      const result = await transcribeAudio(audioUri);
      console.log('[useWhisperRecording] Transcribe result:', JSON.stringify(result));

      // Cleanup audio file
      console.log('[useWhisperRecording] Deleting audio file...');
      await deleteAudioFile(audioUri);
      console.log('[useWhisperRecording] Audio file deleted');

      if (result.success && result.text) {
        console.log('[useWhisperRecording] Success! Text:', result.text.substring(0, 50) + '...');
        return result.text;
      } else {
        console.log('[useWhisperRecording] Transcription failed:', result.error);
        setError(result.error || 'Transcription failed');
        return null;
      }
    } catch (err) {
      console.error('[useWhisperRecording] Error stopping/transcribing:', err);
      setError('Failed to transcribe audio');
      return null;
    } finally {
      setIsTranscribing(false);
    }
  }, [audioRecorder]);

  return {
    isRecording,
    isTranscribing,
    error,
    startRecording,
    stopAndTranscribe,
  };
}
