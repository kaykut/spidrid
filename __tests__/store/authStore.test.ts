import { useAuthStore } from '../../src/store/authStore';
import { supabase } from '../../src/services/supabase';
import { useSubscriptionStore } from '../../src/store/subscriptionStore';

// Get the mocked supabase
jest.mock('../../src/services/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      refreshSession: jest.fn(),
      signInAnonymously: jest.fn(),
      signOut: jest.fn(),
      linkIdentity: jest.fn(),
      signInWithOtp: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  },
}));

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('authStore', () => {
  beforeEach(() => {
    // Reset store state
    useAuthStore.setState({
      isInitialized: false,
      isAnonymous: false,
      isLoggedIn: false,
      userId: null,
      authError: null,
    });
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useAuthStore.getState();
      expect(state.isInitialized).toBe(false);
      expect(state.isAnonymous).toBe(false);
      expect(state.isLoggedIn).toBe(false);
      expect(state.userId).toBeNull();
    });
  });

  describe('initialize', () => {
    it('should use existing session if available', async () => {
      const mockSession = {
        user: { id: 'existing-user-id', is_anonymous: true },
        access_token: 'existing-token',
      };
      (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      await useAuthStore.getState().initialize();

      const state = useAuthStore.getState();
      expect(state.isInitialized).toBe(true);
      expect(state.isAnonymous).toBe(true);
      expect(state.isLoggedIn).toBe(false);
      expect(state.userId).toBe('existing-user-id');
      expect(mockSupabase.auth.signInAnonymously).not.toHaveBeenCalled();
    });

    it('should sign in anonymously when no session exists', async () => {
      (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: null },
        error: null,
      });
      (mockSupabase.auth.signInAnonymously as jest.Mock).mockResolvedValue({
        data: {
          user: { id: 'new-anon-user-id', is_anonymous: true },
          session: { access_token: 'new-token' },
        },
        error: null,
      });

      await useAuthStore.getState().initialize();

      const state = useAuthStore.getState();
      expect(state.isInitialized).toBe(true);
      expect(state.isAnonymous).toBe(true);
      expect(state.isLoggedIn).toBe(false);
      expect(state.userId).toBe('new-anon-user-id');
      expect(mockSupabase.auth.signInAnonymously).toHaveBeenCalled();
    });

    it('should log error when signInAnonymously fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: null },
        error: null,
      });
      (mockSupabase.auth.signInAnonymously as jest.Mock).mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Anonymous sign-ins are not enabled' },
      });

      await useAuthStore.getState().initialize();

      // Should have logged an error
      expect(consoleSpy).toHaveBeenCalledWith(
        '[AuthStore] signInAnonymously failed:',
        'Anonymous sign-ins are not enabled'
      );

      // Should still mark as initialized to prevent infinite retries
      const state = useAuthStore.getState();
      expect(state.isInitialized).toBe(true);
      expect(state.authError).toBe('Anonymous sign-ins are not enabled');

      consoleSpy.mockRestore();
    });

    it('should set authError state when signInAnonymously fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: null },
        error: null,
      });
      (mockSupabase.auth.signInAnonymously as jest.Mock).mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Network error' },
      });

      await useAuthStore.getState().initialize();

      const state = useAuthStore.getState();
      expect(state.authError).toBe('Network error');

      consoleSpy.mockRestore();
    });

    it('should not reinitialize if already initialized', async () => {
      useAuthStore.setState({ isInitialized: true });

      await useAuthStore.getState().initialize();

      expect(mockSupabase.auth.getSession).not.toHaveBeenCalled();
    });

    it('should handle real (non-anonymous) session', async () => {
      const mockSession = {
        user: { id: 'real-user-id', is_anonymous: false },
        access_token: 'real-token',
      };
      (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      await useAuthStore.getState().initialize();

      const state = useAuthStore.getState();
      expect(state.isInitialized).toBe(true);
      expect(state.isAnonymous).toBe(false);
      expect(state.isLoggedIn).toBe(true);
      expect(state.userId).toBe('real-user-id');
    });
  });

  describe('getAccessToken', () => {
    it('should return access token from refreshed session', async () => {
      const mockSession = {
        access_token: 'test-access-token',
      };
      (mockSupabase.auth.refreshSession as jest.Mock).mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const token = await useAuthStore.getState().getAccessToken();

      expect(token).toBe('test-access-token');
      expect(mockSupabase.auth.refreshSession).toHaveBeenCalled();
    });

    it('should fall back to cached session when refresh fails', async () => {
      // Refresh fails
      (mockSupabase.auth.refreshSession as jest.Mock).mockResolvedValue({
        data: { session: null },
        error: { message: 'Refresh failed' },
      });
      // But cached session exists
      (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: { access_token: 'cached-token' } },
        error: null,
      });

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const token = await useAuthStore.getState().getAccessToken();

      expect(token).toBe('cached-token');
      expect(consoleSpy).toHaveBeenCalledWith(
        '[AuthStore] Failed to refresh session:',
        'Refresh failed'
      );
      consoleSpy.mockRestore();
    });

    it('should return null when no session exists', async () => {
      (mockSupabase.auth.refreshSession as jest.Mock).mockResolvedValue({
        data: { session: null },
        error: null,
      });
      (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: null },
        error: null,
      });

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const token = await useAuthStore.getState().getAccessToken();

      expect(token).toBeNull();
      consoleSpy.mockRestore();
    });
  });

  describe('signInWithGoogle', () => {
    it('should call linkIdentity with google provider', async () => {
      (mockSupabase.auth.linkIdentity as jest.Mock).mockResolvedValue({
        data: {},
        error: null,
      });

      await useAuthStore.getState().signInWithGoogle();

      expect(mockSupabase.auth.linkIdentity).toHaveBeenCalledWith({
        provider: 'google',
      });
    });

    it('should throw error when linkIdentity fails', async () => {
      (mockSupabase.auth.linkIdentity as jest.Mock).mockResolvedValue({
        data: null,
        error: new Error('Google auth failed'),
      });

      await expect(useAuthStore.getState().signInWithGoogle()).rejects.toThrow('Google auth failed');
    });
  });

  describe('signInWithMagicLink', () => {
    it('should call signInWithOtp with email', async () => {
      (mockSupabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
        data: {},
        error: null,
      });

      await useAuthStore.getState().signInWithMagicLink('test@example.com');

      expect(mockSupabase.auth.signInWithOtp).toHaveBeenCalledWith({
        email: 'test@example.com',
        options: { shouldCreateUser: false },
      });
    });

    it('should throw error when signInWithOtp fails', async () => {
      (mockSupabase.auth.signInWithOtp as jest.Mock).mockResolvedValue({
        data: null,
        error: new Error('Email auth failed'),
      });

      await expect(useAuthStore.getState().signInWithMagicLink('test@example.com')).rejects.toThrow('Email auth failed');
    });
  });

  describe('signOut', () => {
    it('should sign out and create new anonymous session', async () => {
      // Setup: user is logged in
      useAuthStore.setState({
        isInitialized: true,
        isAnonymous: false,
        isLoggedIn: true,
        userId: 'real-user-id',
      });

      (mockSupabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });
      (mockSupabase.auth.signInAnonymously as jest.Mock).mockResolvedValue({
        data: {
          user: { id: 'new-anon-id', is_anonymous: true },
          session: { access_token: 'new-token' },
        },
        error: null,
      });

      await useAuthStore.getState().signOut();

      expect(mockSupabase.auth.signOut).toHaveBeenCalled();
      expect(mockSupabase.auth.signInAnonymously).toHaveBeenCalled();

      const state = useAuthStore.getState();
      expect(state.isAnonymous).toBe(true);
      expect(state.isLoggedIn).toBe(false);
      expect(state.userId).toBe('new-anon-id');
    });

    it('should call unlinkRevenueCatUser before signing out', async () => {
      // Setup: user is logged in with linked RevenueCat
      useAuthStore.setState({
        isInitialized: true,
        isAnonymous: false,
        isLoggedIn: true,
        userId: 'real-user-id',
      });
      useSubscriptionStore.setState({ linkedUserId: 'real-user-id' });

      (mockSupabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });
      (mockSupabase.auth.signInAnonymously as jest.Mock).mockResolvedValue({
        data: {
          user: { id: 'new-anon-id', is_anonymous: true },
          session: { access_token: 'new-token' },
        },
        error: null,
      });

      // Spy on unlinkRevenueCatUser
      const unlinkSpy = jest.spyOn(useSubscriptionStore.getState(), 'unlinkRevenueCatUser');

      await useAuthStore.getState().signOut();

      // Should have called unlinkRevenueCatUser
      expect(unlinkSpy).toHaveBeenCalled();

      // linkedUserId should now be null
      expect(useSubscriptionStore.getState().linkedUserId).toBeNull();

      unlinkSpy.mockRestore();
    });
  });
});
