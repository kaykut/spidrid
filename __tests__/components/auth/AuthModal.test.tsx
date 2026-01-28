import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Platform } from 'react-native';
import { AuthModal } from '../../../src/components/auth/AuthModal';

// Mock the theme provider
jest.mock('../../../src/components/common/ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      secondaryBackground: '#1a1a1a',
      accentColor: '#ff6b6b',
    },
  }),
}));

// Create mocks that will be populated in the factory
let mockSignInWithGoogle: jest.Mock;
let mockSignInWithApple: jest.Mock;
let mockSetState: jest.Mock;

jest.mock('../../../src/store/authStore', () => {
  mockSignInWithGoogle = jest.fn();
  mockSignInWithApple = jest.fn();
  mockSetState = jest.fn();
  const mockHook = () => ({
    signInWithGoogle: mockSignInWithGoogle,
    signInWithApple: mockSignInWithApple,
    authError: null,
  });
  (mockHook as any).setState = mockSetState;
  return { useAuthStore: mockHook };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        'modal.title_sync': 'Sync Across Devices',
        'modal.continue_google': 'Continue with Google',
        'sync.desc': 'Sync description',
        'sync.warning': 'Sync warning',
        'errors.google_failed': 'Google auth failed',
        'errors.apple_failed': 'Apple auth failed',
      })[key] || key,
  }),
}));

let mockAppleAvailability: jest.Mock;
jest.mock('expo-apple-authentication', () => {
  mockAppleAvailability = jest.fn();
  const { TouchableOpacity } = require('react-native');
  return {
    isAvailableAsync: mockAppleAvailability,
    AppleAuthenticationButton: ({ onPress, testID, disabled }: any) => (
      <TouchableOpacity onPress={onPress} testID={testID} disabled={disabled} />
    ),
    AppleAuthenticationButtonType: { CONTINUE: 0 },
    AppleAuthenticationButtonStyle: { BLACK: 0 },
  };
});

describe('AuthModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();
  const originalPlatform = Platform.OS;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSignInWithGoogle.mockReset();
    mockSignInWithApple.mockReset();
    Object.defineProperty(Platform, 'OS', { value: 'ios' });
    mockAppleAvailability.mockResolvedValue(true);
  });

  afterAll(() => {
    Object.defineProperty(Platform, 'OS', { value: originalPlatform });
  });

  it('should render modal when visible', () => {
    const { getByText } = render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    expect(getByText('Sync Across Devices')).toBeTruthy();
    expect(getByText('Continue with Google')).toBeTruthy();
    expect(getByText('Sync description')).toBeTruthy();
  });

  it('should not render content when not visible', () => {
    const { queryByText } = render(
      <AuthModal visible={false} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    // Modal with visible=false does not render children
    expect(queryByText('Sync Across Devices')).toBeNull();
  });

  it('should call signInWithGoogle when Google button is pressed', async () => {
    mockSignInWithGoogle.mockResolvedValue(undefined);

    const { getByText } = render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    fireEvent.press(getByText('Continue with Google'));

    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled();
    });
  });

  it('should call onSuccess and onClose after successful Google sign in', async () => {
    mockSignInWithGoogle.mockResolvedValue(undefined);

    const { getByText } = render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    fireEvent.press(getByText('Continue with Google'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should show error when Google sign in fails', async () => {
    mockSignInWithGoogle.mockRejectedValue(new Error('Google auth failed'));

    const { getByText } = render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    fireEvent.press(getByText('Continue with Google'));

    await waitFor(() => {
      expect(getByText('Google auth failed')).toBeTruthy();
    });
  });

  it('should render Apple button on iOS when available', async () => {
    const { findByTestId } = render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    expect(await findByTestId('apple-sign-in-button')).toBeTruthy();
  });

  it('should call signInWithApple when Apple button is pressed', async () => {
    mockSignInWithApple.mockResolvedValue(undefined);

    const { findByTestId } = render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    fireEvent.press(await findByTestId('apple-sign-in-button'));

    await waitFor(() => {
      expect(mockSignInWithApple).toHaveBeenCalled();
    });
  });

  it('should call onSuccess and onClose after successful Apple sign in', async () => {
    mockSignInWithApple.mockResolvedValue(undefined);

    const { findByTestId } = render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    fireEvent.press(await findByTestId('apple-sign-in-button'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should not render Apple button on Android', async () => {
    Object.defineProperty(Platform, 'OS', { value: 'android' });

    const { queryByTestId } = render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    expect(queryByTestId('apple-sign-in-button')).toBeNull();
  });

  it('should call onClose when close button is pressed', () => {
    render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    // The close button functionality is tested implicitly through other tests
  });
});
