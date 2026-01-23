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
        'Anonymous sign-ins are not enabled',
        { message: 'Anonymous sign-ins are not enabled' }
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

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
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

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
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

  describe('userEmail behavior', () => {
    beforeEach(() => {
      // Reset to clean state with userEmail
      useAuthStore.setState({
        isInitialized: false,
        isAnonymous: false,
        isLoggedIn: false,
        userId: null,
        userEmail: null,
        authError: null,
      });
    });

    describe('email extraction from session', () => {
      it('BEHAVIOR: should extract email when user signs in with password', async () => {
        // GIVEN: Supabase returns session with email
        const mockAuthStateCallback = jest.fn();
        (mockSupabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
          mockAuthStateCallback.mockImplementation(callback);
          return { data: { subscription: { unsubscribe: jest.fn() } } };
        });

        // Mock getSession to return no session (anonymous path)
        (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
          data: { session: null },
          error: null,
        });
        (mockSupabase.auth.signInAnonymously as jest.Mock).mockResolvedValue({
          data: {
            user: { id: 'temp-anon', is_anonymous: true },
            session: { access_token: 'temp-token' },
          },
          error: null,
        });

        // Initialize to set up listener
        await useAuthStore.getState().initialize();

        // WHEN: Auth state changes with email
        mockAuthStateCallback('SIGNED_IN', {
          user: {
            id: 'user-123',
            email: 'test@example.com',
            is_anonymous: false,
          },
          access_token: 'token',
        });

        // THEN: Email is observable in store
        const state = useAuthStore.getState();
        expect(state.userEmail).toBe('test@example.com');
        expect(state.isLoggedIn).toBe(true);
        expect(state.isAnonymous).toBe(false);
      });

      it('BEHAVIOR: should extract email when initializing with existing session', async () => {
        // GIVEN: Existing session with email
        (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
          data: {
            session: {
              user: {
                id: 'existing-user',
                email: 'existing@example.com',
                is_anonymous: false,
              },
              access_token: 'existing-token',
            },
          },
          error: null,
        });

        // WHEN: Store initializes
        await useAuthStore.getState().initialize();

        // THEN: Email is extracted from session
        const state = useAuthStore.getState();
        expect(state.userEmail).toBe('existing@example.com');
        expect(state.isLoggedIn).toBe(true);
      });

      it('BEHAVIOR: should handle missing email gracefully (OAuth edge case)', async () => {
        // GIVEN: Session exists but email is undefined
        (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
          data: {
            session: {
              user: {
                id: 'oauth-user',
                email: undefined,
                is_anonymous: false,
              },
              access_token: 'oauth-token',
            },
          },
          error: null,
        });

        // WHEN: Store initializes
        await useAuthStore.getState().initialize();

        // THEN: Email is null (not undefined)
        const state = useAuthStore.getState();
        expect(state.userEmail).toBeNull();
        expect(state.isLoggedIn).toBe(true);
      });
    });

    describe('email cleared on sign out', () => {
      it('BEHAVIOR: should clear email when user signs out', async () => {
        // GIVEN: User is signed in with email
        useAuthStore.setState({
          isLoggedIn: true,
          userEmail: 'user@example.com',
          userId: 'user-123',
          isAnonymous: false,
        });

        (mockSupabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });
        (mockSupabase.auth.signInAnonymously as jest.Mock).mockResolvedValue({
          data: {
            user: { id: 'anon-id', is_anonymous: true },
            session: { access_token: 'anon-token' },
          },
          error: null,
        });

        // WHEN: User signs out
        await useAuthStore.getState().signOut();

        // THEN: Email is cleared
        const state = useAuthStore.getState();
        expect(state.userEmail).toBeNull();
        expect(state.isLoggedIn).toBe(false);
        expect(state.isAnonymous).toBe(true);
      });

      it('BEHAVIOR: should clear email when session ends', async () => {
        // GIVEN: User is signed in
        useAuthStore.setState({
          isLoggedIn: true,
          userEmail: 'user@example.com',
          isAnonymous: false,
        });

        const mockAuthStateCallback = jest.fn();
        (mockSupabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
          mockAuthStateCallback.mockImplementation(callback);
          return { data: { subscription: { unsubscribe: jest.fn() } } };
        });

        await useAuthStore.getState().initialize();

        // WHEN: Session ends (null session)
        mockAuthStateCallback('SIGNED_OUT', null);

        // THEN: Email is cleared
        expect(useAuthStore.getState().userEmail).toBeNull();
        expect(useAuthStore.getState().isLoggedIn).toBe(false);
      });
    });

    describe('anonymous users', () => {
      it('BEHAVIOR: should have null email for anonymous users', async () => {
        // GIVEN: Anonymous session
        (mockSupabase.auth.getSession as jest.Mock).mockResolvedValue({
          data: { session: null },
          error: null,
        });
        (mockSupabase.auth.signInAnonymously as jest.Mock).mockResolvedValue({
          data: {
            user: {
              id: 'anon-123',
              is_anonymous: true,
              email: null,
            },
            session: { access_token: 'anon-token' },
          },
          error: null,
        });

        // WHEN: Store initializes with anonymous user
        await useAuthStore.getState().initialize();

        // THEN: Email is null
        const state = useAuthStore.getState();
        expect(state.userEmail).toBeNull();
        expect(state.isAnonymous).toBe(true);
        expect(state.isLoggedIn).toBe(false);
      });
    });

    describe('edge cases', () => {
      it('EDGE: should handle email with special characters', async () => {
        const mockAuthStateCallback = jest.fn();
        (mockSupabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
          mockAuthStateCallback.mockImplementation(callback);
          return { data: { subscription: { unsubscribe: jest.fn() } } };
        });

        await useAuthStore.getState().initialize();

        // WHEN: Session has email with special characters
        mockAuthStateCallback('SIGNED_IN', {
          user: {
            id: 'user-123',
            email: 'user+test@example.com',
            is_anonymous: false,
          },
        });

        // THEN: Email is stored correctly
        expect(useAuthStore.getState().userEmail).toBe('user+test@example.com');
      });

      it('EDGE: should handle very long email', async () => {
        const mockAuthStateCallback = jest.fn();
        (mockSupabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
          mockAuthStateCallback.mockImplementation(callback);
          return { data: { subscription: { unsubscribe: jest.fn() } } };
        });

        await useAuthStore.getState().initialize();

        const longEmail = 'very.long.email.address.that.could.cause.issues@subdomain.example.com';

        // WHEN: Session has very long email
        mockAuthStateCallback('SIGNED_IN', {
          user: {
            id: 'user-123',
            email: longEmail,
            is_anonymous: false,
          },
        });

        // THEN: Email is stored correctly
        expect(useAuthStore.getState().userEmail).toBe(longEmail);
      });

      it('EDGE: should handle empty string email', async () => {
        const mockAuthStateCallback = jest.fn();
        (mockSupabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
          mockAuthStateCallback.mockImplementation(callback);
          return { data: { subscription: { unsubscribe: jest.fn() } } };
        });

        await useAuthStore.getState().initialize();

        // WHEN: Session has empty string email (shouldn't happen but defensively handle)
        mockAuthStateCallback('SIGNED_IN', {
          user: {
            id: 'user-123',
            email: '',
            is_anonymous: false,
          },
        });

        // THEN: Empty string is stored (truthy check will fail, showing fallback)
        expect(useAuthStore.getState().userEmail).toBe('');
      });
    });

    describe('state consistency', () => {
      it('INVARIANT: email should be null when isAnonymous is true', async () => {
        // Test invariant: anonymous users never have emails
        const mockAuthStateCallback = jest.fn();
        (mockSupabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
          mockAuthStateCallback.mockImplementation(callback);
          return { data: { subscription: { unsubscribe: jest.fn() } } };
        });

        await useAuthStore.getState().initialize();

        // WHEN: Anonymous session
        mockAuthStateCallback('SIGNED_IN', {
          user: {
            id: 'anon-123',
            is_anonymous: true,
            email: null,
          },
        });

        const state = useAuthStore.getState();
        expect(state.isAnonymous).toBe(true);
        expect(state.userEmail).toBeNull();
      });

      it('INVARIANT: email should exist when isLoggedIn is true (except OAuth edge cases)', async () => {
        // Test that logged-in users typically have emails
        const mockAuthStateCallback = jest.fn();
        (mockSupabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
          mockAuthStateCallback.mockImplementation(callback);
          return { data: { subscription: { unsubscribe: jest.fn() } } };
        });

        await useAuthStore.getState().initialize();

        // WHEN: Real user signs in
        mockAuthStateCallback('SIGNED_IN', {
          user: {
            id: 'user-123',
            email: 'user@example.com',
            is_anonymous: false,
          },
        });

        const state = useAuthStore.getState();
        expect(state.isLoggedIn).toBe(true);
        expect(state.userEmail).toBeTruthy();
      });
    });
  });
});
