/**
 * Tests for share routes (open/add).
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ShareOpenScreen from '../../src/app/share/open';
import ShareAddScreen from '../../src/app/share/add';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useShareIntentStore } from '../../src/store/shareIntentStore';

const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    replace: (path: string) => mockReplace(path),
  },
  useLocalSearchParams: () => ({}),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'import.processing': 'Processing...',
        'errors.import_failed': 'Import Failed',
        'errors.extract_content': 'Could not extract content',
      };
      return translations[key] || key;
    },
  }),
}));

const mockEnqueueImport = jest.fn();
jest.mock('../../src/services/contentProcessingQueue', () => ({
  enqueueImport: (...args: unknown[]) => mockEnqueueImport(...args),
}));

describe('Share routes', () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockEnqueueImport.mockReset();
    useShareIntentStore.getState().clearPendingPayload();
  });

  it('enqueues shared content and opens the reader', async () => {
    const payload = { type: 'url' as const, url: 'https://example.com' };
    useShareIntentStore.getState().setPendingPayload(payload);
    mockEnqueueImport.mockReturnValue({ id: 'content-1' });

    render(
      <ThemeProvider>
        <ShareOpenScreen />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/content/content-1');
    });

    expect(mockEnqueueImport).toHaveBeenCalledWith(payload);
    expect(useShareIntentStore.getState().pendingPayload).toBeNull();
  });

  it('enqueues shared content and returns to home for add flow', async () => {
    const payload = { type: 'text' as const, text: 'Hello world' };
    useShareIntentStore.getState().setPendingPayload(payload);
    mockEnqueueImport.mockReturnValue({ id: 'content-2' });

    render(
      <ThemeProvider>
        <ShareAddScreen />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/');
    });

    expect(mockEnqueueImport).toHaveBeenCalledWith(payload);
    expect(useShareIntentStore.getState().pendingPayload).toBeNull();
  });
});
