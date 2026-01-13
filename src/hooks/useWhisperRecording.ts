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

    try {
      // Stop recording
      await audioRecorder.stop();
      setIsRecording(false);

      // Reset audio mode
      await setAudioModeAsync({
        allowsRecording: false,
      });

      const audioUri = audioRecorder.uri;

      if (!audioUri) {
        setError('Failed to get audio recording');
        return null;
      }

      // Transcribe
      setIsTranscribing(true);
      const result = await transcribeAudio(audioUri);

      // Cleanup audio file
      await deleteAudioFile(audioUri);

      if (result.success && result.text) {
        return result.text;
      }

      setError(result.error || 'Transcription failed');
      return null;
    } catch (err) {
      console.error('Error stopping/transcribing:', err);
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
