/**
 * Tests for Whisper Service
 *
 * Tests transcription functionality (transcribeAudio, deleteAudioFile).
 * Recording functionality has been moved to useWhisperRecording hook.
 */

import { transcribeAudio, deleteAudioFile } from '../../src/services/whisperService';
import { File } from 'expo-file-system';

// =============================================================================
// Mocks
// =============================================================================

// Mock File class from expo-file-system
const mockBase64 = jest.fn();
const mockDelete = jest.fn();
let mockExistsValue = true;

jest.mock('expo-file-system', () => ({
  File: jest.fn().mockImplementation(() => ({
    base64: mockBase64,
    delete: mockDelete,
    get exists() {
      return mockExistsValue;
    },
  })),
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      supabaseUrl: 'https://test.supabase.co',
    },
  },
}));

// Mock authStore
const mockGetAccessToken = jest.fn();
jest.mock('../../src/store/authStore', () => ({
  useAuthStore: {
    getState: () => ({
      getAccessToken: mockGetAccessToken,
    }),
  },
}));

// Global fetch mock
const mockFetch = jest.fn();
global.fetch = mockFetch;

// =============================================================================
// Test Setup
// =============================================================================

beforeEach(() => {
  jest.clearAllMocks();
  mockExistsValue = true;
  mockBase64.mockResolvedValue('base64audiodata');
  mockGetAccessToken.mockResolvedValue('test-access-token');
});

// =============================================================================
// Tests
// =============================================================================

describe('transcribeAudio', () => {
  it('returns transcribed text on success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ text: 'Hello world' }),
    });

    const result = await transcribeAudio('file://audio.m4a');

    expect(result.success).toBe(true);
    expect(result.text).toBe('Hello world');
    expect(File).toHaveBeenCalledWith('file://audio.m4a');
    expect(mockBase64).toHaveBeenCalled();
    expect(mockGetAccessToken).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(
      'https://test.supabase.co/functions/v1/transcribe',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-access-token',
        },
        body: JSON.stringify({
          audio: 'base64audiodata',
          fileType: 'm4a',
        }),
      })
    );
  });

  it('returns error when no auth token is available', async () => {
    mockGetAccessToken.mockResolvedValue(null);

    const result = await transcribeAudio('file://audio.m4a');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Not authenticated');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('detects wav file type from URI', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ text: 'Test' }),
    });

    await transcribeAudio('file://audio.wav');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({
          audio: 'base64audiodata',
          fileType: 'wav',
        }),
      })
    );
  });

  it('returns error when API returns error response', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Rate limit exceeded' }),
    });

    const result = await transcribeAudio('file://audio.m4a');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Rate limit exceeded');
  });

  it('returns error when response has no text', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const result = await transcribeAudio('file://audio.m4a');

    expect(result.success).toBe(false);
    expect(result.error).toBe('No transcription returned');
  });

  it('returns error when file read fails', async () => {
    mockBase64.mockRejectedValue(new Error('File not found'));

    const result = await transcribeAudio('file://nonexistent.m4a');

    expect(result.success).toBe(false);
    expect(result.error).toBe('File not found');
  });

  it('returns error when fetch throws', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const result = await transcribeAudio('file://audio.m4a');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Network error');
  });

  it('returns generic error for non-Error exceptions', async () => {
    mockFetch.mockRejectedValue('Unknown failure');

    const result = await transcribeAudio('file://audio.m4a');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Unknown error occurred');
  });
});

describe('deleteAudioFile', () => {
  it('deletes the file when it exists', async () => {
    mockExistsValue = true;

    await deleteAudioFile('file://audio.m4a');

    expect(File).toHaveBeenCalledWith('file://audio.m4a');
    expect(mockDelete).toHaveBeenCalled();
  });

  it('does not delete when file does not exist', async () => {
    mockExistsValue = false;

    await deleteAudioFile('file://audio.m4a');

    expect(File).toHaveBeenCalledWith('file://audio.m4a');
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it('handles deletion errors gracefully', async () => {
    mockExistsValue = true;
    mockDelete.mockImplementation(() => {
      throw new Error('Delete failed');
    });

    // Should not throw
    await expect(deleteAudioFile('file://audio.m4a')).resolves.toBeUndefined();
  });
});
