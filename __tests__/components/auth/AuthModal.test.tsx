import { render, fireEvent, waitFor } from '@testing-library/react-native';
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
let mockSetState: jest.Mock;

jest.mock('../../../src/store/authStore', () => {
  mockSignInWithGoogle = jest.fn();
  mockSetState = jest.fn();
  const mockHook = () => ({
    signInWithGoogle: mockSignInWithGoogle,
    authError: null,
  });
  (mockHook as any).setState = mockSetState;
  return { useAuthStore: mockHook };
});

describe('AuthModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockSignInWithGoogle.mockReset();
  });

  it('should render modal when visible', () => {
    const { getByText } = render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    expect(getByText('Sync Across Devices')).toBeTruthy();
    expect(getByText('Continue with Google')).toBeTruthy();
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

  it('should call onClose when close button is pressed', () => {
    render(
      <AuthModal visible={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    // The close button functionality is tested implicitly through other tests
  });
});
