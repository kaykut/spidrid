import { renderHook } from '@testing-library/react-native';
import * as Linking from 'expo-linking';
import { supabase } from '../../src/services/supabase';
import { useAuthDeepLink } from '../../src/hooks/useAuthDeepLink';

// Get the mocked modules
jest.mock('expo-linking');
jest.mock('../../src/services/supabase', () => ({
  supabase: {
    auth: {
      setSession: jest.fn(),
    },
  },
}));

const mockLinking = Linking as jest.Mocked<typeof Linking>;
const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('useAuthDeepLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mockLinking.getInitialURL as jest.Mock).mockResolvedValue(null);
    (mockLinking.addEventListener as jest.Mock).mockReturnValue({ remove: jest.fn() });
    (mockSupabase.auth.setSession as jest.Mock).mockResolvedValue({ data: { session: null }, error: null });
  });

  it('should check for initial URL on mount', async () => {
    renderHook(() => useAuthDeepLink());

    // Give the async effect time to run
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockLinking.getInitialURL).toHaveBeenCalled();
  });

  it('should set up URL event listener', () => {
    renderHook(() => useAuthDeepLink());

    expect(mockLinking.addEventListener).toHaveBeenCalledWith('url', expect.any(Function));
  });

  it('should clean up event listener on unmount', () => {
    const mockRemove = jest.fn();
    (mockLinking.addEventListener as jest.Mock).mockReturnValue({ remove: mockRemove });

    const { unmount } = renderHook(() => useAuthDeepLink());
    unmount();

    expect(mockRemove).toHaveBeenCalled();
  });

  it('should call setSession when initial URL contains tokens', async () => {
    const authUrl = 'spidrid://auth/callback#access_token=test-access-token&refresh_token=test-refresh-token';
    (mockLinking.getInitialURL as jest.Mock).mockResolvedValue(authUrl);

    renderHook(() => useAuthDeepLink());

    // Give the async effect time to run
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockSupabase.auth.setSession).toHaveBeenCalledWith({
      access_token: 'test-access-token',
      refresh_token: 'test-refresh-token',
    });
  });

  it('should not call setSession when initial URL has no tokens', async () => {
    const noTokenUrl = 'spidrid://some-other-path';
    (mockLinking.getInitialURL as jest.Mock).mockResolvedValue(noTokenUrl);

    renderHook(() => useAuthDeepLink());

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockSupabase.auth.setSession).not.toHaveBeenCalled();
  });

  it('should handle URL events with tokens', async () => {
    let urlEventHandler: ((event: { url: string }) => void) | undefined;
    (mockLinking.addEventListener as jest.Mock).mockImplementation((event, handler) => {
      if (event === 'url') {
        urlEventHandler = handler;
      }
      return { remove: jest.fn() };
    });

    renderHook(() => useAuthDeepLink());

    // Simulate URL event
    const authUrl = 'spidrid://auth/callback#access_token=event-access-token&refresh_token=event-refresh-token';
    urlEventHandler?.({ url: authUrl });

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockSupabase.auth.setSession).toHaveBeenCalledWith({
      access_token: 'event-access-token',
      refresh_token: 'event-refresh-token',
    });
  });

  it('should not call setSession when no initial URL', async () => {
    (mockLinking.getInitialURL as jest.Mock).mockResolvedValue(null);

    renderHook(() => useAuthDeepLink());

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockSupabase.auth.setSession).not.toHaveBeenCalled();
  });
});
