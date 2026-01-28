import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { ShareIntentBootstrap } from '../../../src/components/common/ShareIntentBootstrap';
import { useShareIntentStore } from '../../../src/store/shareIntentStore';

const mockReplace = jest.fn();
let mockShareIntentContext = {
  hasShareIntent: false,
  shareIntent: null as unknown,
  resetShareIntent: jest.fn(),
};
let mockUrl: string | null = null;

jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: (path: string) => mockReplace(path),
  }),
}));

jest.mock('expo-share-intent', () => ({
  useShareIntentContext: () => mockShareIntentContext,
}));

jest.mock('expo-linking', () => ({
  useLinkingURL: () => mockUrl,
}));

describe('ShareIntentBootstrap', () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockShareIntentContext = {
      hasShareIntent: false,
      shareIntent: null,
      resetShareIntent: jest.fn(),
    };
    mockUrl = null;
    useShareIntentStore.getState().clearPendingPayload();
  });

  it('routes to add when shareTarget is add', async () => {
    mockShareIntentContext = {
      hasShareIntent: true,
      shareIntent: {
        webUrl: 'https://example.com',
        shareTarget: 'add',
      },
      resetShareIntent: jest.fn(),
    };

    render(<ShareIntentBootstrap />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/share/add');
    });

    expect(useShareIntentStore.getState().pendingPayload).toEqual({
      type: 'url',
      url: 'https://example.com',
    });
    expect(mockShareIntentContext.resetShareIntent).toHaveBeenCalled();
  });

  it('routes to add when target is encoded in the url', async () => {
    mockUrl = 'devoro://dataUrl=devoroShareKeyAdd?target=add#weburl';
    mockShareIntentContext = {
      hasShareIntent: true,
      shareIntent: {
        text: 'https://example.com',
      },
      resetShareIntent: jest.fn(),
    };

    render(<ShareIntentBootstrap />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/share/add');
    });
  });

  it('defaults to open for file payloads without target', async () => {
    mockShareIntentContext = {
      hasShareIntent: true,
      shareIntent: {
        files: [
          {
            path: 'file:///tmp/test.pdf',
            fileName: 'test.pdf',
            mimeType: 'application/pdf',
          },
        ],
      },
      resetShareIntent: jest.fn(),
    };

    render(<ShareIntentBootstrap />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/share/open');
    });

    expect(useShareIntentStore.getState().pendingPayload).toEqual({
      type: 'file',
      uri: 'file:///tmp/test.pdf',
      fileName: 'test.pdf',
      mimeType: 'application/pdf',
      source: 'pdf',
    });
  });

  it('resets when payload cannot be resolved', async () => {
    mockShareIntentContext = {
      hasShareIntent: true,
      shareIntent: {
        files: [
          {
            mimeType: 'application/pdf',
          },
        ],
      },
      resetShareIntent: jest.fn(),
    };

    render(<ShareIntentBootstrap />);

    await waitFor(() => {
      expect(mockShareIntentContext.resetShareIntent).toHaveBeenCalled();
    });

    expect(mockReplace).not.toHaveBeenCalled();
    expect(useShareIntentStore.getState().pendingPayload).toBeNull();
  });

  it('does nothing when there is no share intent', () => {
    mockShareIntentContext = {
      hasShareIntent: false,
      shareIntent: null,
      resetShareIntent: jest.fn(),
    };

    render(<ShareIntentBootstrap />);

    expect(mockReplace).not.toHaveBeenCalled();
    expect(mockShareIntentContext.resetShareIntent).not.toHaveBeenCalled();
  });
});
