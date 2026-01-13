/**
 * Tests for useWhisperRecording Hook
 *
 * Tests audio recording and transcription using expo-audio hooks.
 */

import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useWhisperRecording } from '../../src/hooks/useWhisperRecording';
import {
  useAudioRecorder,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio';
import { transcribeAudio, deleteAudioFile } from '../../src/services/whisperService';

// =============================================================================
// Mocks
// =============================================================================

jest.mock('expo-audio');
jest.mock('../../src/services/whisperService');

const mockUseAudioRecorder = useAudioRecorder as jest.Mock;
const mockRequestPermissions = requestRecordingPermissionsAsync as jest.Mock;
const mockSetAudioMode = setAudioModeAsync as jest.Mock;
const mockTranscribeAudio = transcribeAudio as jest.Mock;
const mockDeleteAudioFile = deleteAudioFile as jest.Mock;

// Default mock implementations
const createMockRecorder = (overrides = {}) => ({
  isRecording: false,
  uri: 'file://mock-audio.m4a',
  prepareToRecordAsync: jest.fn().mockResolvedValue(undefined),
  record: jest.fn(),
  stop: jest.fn().mockResolvedValue(undefined),
  ...overrides,
});

// =============================================================================
// Test Setup
// =============================================================================

beforeEach(() => {
  jest.clearAllMocks();
  mockUseAudioRecorder.mockReturnValue(createMockRecorder());
  mockRequestPermissions.mockResolvedValue({ granted: true });
  mockSetAudioMode.mockResolvedValue(undefined);
  mockTranscribeAudio.mockResolvedValue({ success: true, text: 'Hello world' });
  mockDeleteAudioFile.mockResolvedValue(undefined);
});

// =============================================================================
// Tests
// =============================================================================

describe('useWhisperRecording', () => {
  describe('initial state', () => {
    it('returns initial state correctly', () => {
      const { result } = renderHook(() => useWhisperRecording());

      expect(result.current.isRecording).toBe(false);
      expect(result.current.isTranscribing).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.startRecording).toBe('function');
      expect(typeof result.current.stopAndTranscribe).toBe('function');
    });
  });

  describe('startRecording', () => {
    it('starts recording when permission granted', async () => {
      const mockRecorder = createMockRecorder();
      mockUseAudioRecorder.mockReturnValue(mockRecorder);

      const { result } = renderHook(() => useWhisperRecording());

      await act(async () => {
        await result.current.startRecording();
      });

      expect(mockRequestPermissions).toHaveBeenCalled();
      expect(mockSetAudioMode).toHaveBeenCalledWith({
        allowsRecording: true,
        playsInSilentMode: true,
      });
      expect(mockRecorder.prepareToRecordAsync).toHaveBeenCalled();
      expect(mockRecorder.record).toHaveBeenCalled();
      expect(result.current.isRecording).toBe(true);
    });

    it('sets error when permission denied', async () => {
      mockRequestPermissions.mockResolvedValue({ granted: false });

      const { result } = renderHook(() => useWhisperRecording());

      await act(async () => {
        await result.current.startRecording();
      });

      expect(result.current.error).toBe('Microphone permission not granted');
      expect(result.current.isRecording).toBe(false);
    });

    it('sets error when recording fails', async () => {
      const mockRecorder = createMockRecorder({
        prepareToRecordAsync: jest.fn().mockRejectedValue(new Error('Recording failed')),
      });
      mockUseAudioRecorder.mockReturnValue(mockRecorder);

      const { result } = renderHook(() => useWhisperRecording());

      await act(async () => {
        await result.current.startRecording();
      });

      expect(result.current.error).toBe('Failed to start recording');
      expect(result.current.isRecording).toBe(false);
    });
  });

  describe('stopAndTranscribe', () => {
    it('stops recording and returns transcribed text', async () => {
      const mockRecorder = createMockRecorder();
      mockUseAudioRecorder.mockReturnValue(mockRecorder);

      const { result } = renderHook(() => useWhisperRecording());

      // Start recording first
      await act(async () => {
        await result.current.startRecording();
      });

      let transcribedText: string | null = null;
      await act(async () => {
        transcribedText = await result.current.stopAndTranscribe();
      });

      expect(mockRecorder.stop).toHaveBeenCalled();
      expect(mockSetAudioMode).toHaveBeenCalledWith({
        allowsRecording: false,
      });
      expect(mockTranscribeAudio).toHaveBeenCalledWith('file://mock-audio.m4a');
      expect(mockDeleteAudioFile).toHaveBeenCalledWith('file://mock-audio.m4a');
      expect(transcribedText).toBe('Hello world');
      expect(result.current.isRecording).toBe(false);
    });

    it('returns null and sets error when transcription fails', async () => {
      mockTranscribeAudio.mockResolvedValue({ success: false, error: 'API error' });

      const mockRecorder = createMockRecorder();
      mockUseAudioRecorder.mockReturnValue(mockRecorder);

      const { result } = renderHook(() => useWhisperRecording());

      await act(async () => {
        await result.current.startRecording();
      });

      let transcribedText: string | null = null;
      await act(async () => {
        transcribedText = await result.current.stopAndTranscribe();
      });

      expect(transcribedText).toBeNull();
      expect(result.current.error).toBe('API error');
    });

    it('returns null when no audio URI', async () => {
      const mockRecorder = createMockRecorder({ uri: null });
      mockUseAudioRecorder.mockReturnValue(mockRecorder);

      const { result } = renderHook(() => useWhisperRecording());

      await act(async () => {
        await result.current.startRecording();
      });

      let transcribedText: string | null = null;
      await act(async () => {
        transcribedText = await result.current.stopAndTranscribe();
      });

      expect(transcribedText).toBeNull();
      expect(result.current.error).toBe('Failed to get audio recording');
    });

    it('handles stop errors gracefully', async () => {
      const mockRecorder = createMockRecorder({
        stop: jest.fn().mockRejectedValue(new Error('Stop failed')),
      });
      mockUseAudioRecorder.mockReturnValue(mockRecorder);

      const { result } = renderHook(() => useWhisperRecording());

      await act(async () => {
        await result.current.startRecording();
      });

      let transcribedText: string | null = null;
      await act(async () => {
        transcribedText = await result.current.stopAndTranscribe();
      });

      expect(transcribedText).toBeNull();
      expect(result.current.error).toBe('Failed to transcribe audio');
    });
  });

  describe('isTranscribing state', () => {
    it('sets isTranscribing during transcription', async () => {
      let resolveTranscribe: (value: any) => void;
      mockTranscribeAudio.mockReturnValue(
        new Promise((resolve) => {
          resolveTranscribe = resolve;
        })
      );

      const mockRecorder = createMockRecorder();
      mockUseAudioRecorder.mockReturnValue(mockRecorder);

      const { result } = renderHook(() => useWhisperRecording());

      await act(async () => {
        await result.current.startRecording();
      });

      // Start stop and transcribe but don't wait for it
      let transcribePromise: Promise<string | null>;
      act(() => {
        transcribePromise = result.current.stopAndTranscribe();
      });

      // Wait for isTranscribing to become true
      await waitFor(() => {
        expect(result.current.isTranscribing).toBe(true);
      });

      // Resolve the transcription
      await act(async () => {
        resolveTranscribe!({ success: true, text: 'Done' });
        await transcribePromise;
      });

      expect(result.current.isTranscribing).toBe(false);
    });
  });

  describe('error clearing', () => {
    it('clears error on new startRecording', async () => {
      mockRequestPermissions.mockResolvedValueOnce({ granted: false });

      const { result } = renderHook(() => useWhisperRecording());

      // First attempt - fails
      await act(async () => {
        await result.current.startRecording();
      });

      expect(result.current.error).toBe('Microphone permission not granted');

      // Second attempt - succeeds
      mockRequestPermissions.mockResolvedValueOnce({ granted: true });
      const mockRecorder = createMockRecorder();
      mockUseAudioRecorder.mockReturnValue(mockRecorder);

      await act(async () => {
        await result.current.startRecording();
      });

      expect(result.current.error).toBeNull();
    });
  });
});
