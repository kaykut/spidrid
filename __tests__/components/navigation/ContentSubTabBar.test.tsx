/**
 * Tests for ContentSubTabBar Component.
 *
 * Horizontal sub-tab bar for Content tab with Train, Read, Learn sub-tabs.
 * Tests rendering, tab selection, navigation, and theme variations.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ContentSubTabBar } from '../../../src/components/navigation/ContentSubTabBar';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';
import { useSettingsStore } from '../../../src/store/settingsStore';

// Mock expo-router
const mockReplace = jest.fn();
let mockPathname = '/content/train';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => mockPathname,
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  }),
}));

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Helper to set pathname for tests
const setMockPathname = (pathname: string) => {
  mockPathname = pathname;
};

describe('ContentSubTabBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setMockPathname('/content/train');
  });

  describe('basic rendering', () => {
    it('renders without crashing', () => {
      const { root } = renderWithProviders(<ContentSubTabBar />);

      expect(root).toBeTruthy();
    });

    it('renders all three sub-tabs', () => {
      renderWithProviders(<ContentSubTabBar />);

      // Check tab labels are rendered
      expect(screen.getByText('Train')).toBeTruthy();
      expect(screen.getByText('Read')).toBeTruthy();
      expect(screen.getByText('Learn')).toBeTruthy();
    });

    it('renders icons for all tabs', () => {
      renderWithProviders(<ContentSubTabBar />);

      // Icons render via mock - there should be 3 icons (one per tab)
      const icons = screen.getAllByTestId('icon-Ionicons');
      expect(icons).toHaveLength(3);
    });
  });

  describe('active state', () => {
    it('identifies Train tab as active when pathname includes /content/train', () => {
      setMockPathname('/content/train');
      renderWithProviders(<ContentSubTabBar />);

      // The Train tab should be active (we verify by icon name in mock)
      const icons = screen.getAllByTestId('icon-Ionicons');
      // Active tabs show filled icon (barbell), inactive show outline
      expect(icons[0]).toHaveTextContent('barbell');
    });

    it('identifies Read tab as active when pathname includes /content/read', () => {
      setMockPathname('/content/read');
      renderWithProviders(<ContentSubTabBar />);

      const icons = screen.getAllByTestId('icon-Ionicons');
      // Read tab (index 1) should show filled icon
      expect(icons[1]).toHaveTextContent('document-text');
    });

    it('identifies Learn tab as active when pathname includes /content/learn', () => {
      setMockPathname('/content/learn');
      renderWithProviders(<ContentSubTabBar />);

      const icons = screen.getAllByTestId('icon-Ionicons');
      // Learn tab (index 2) should show filled icon
      expect(icons[2]).toHaveTextContent('book');
    });

    it('shows outline icons for inactive tabs', () => {
      setMockPathname('/content/train');
      renderWithProviders(<ContentSubTabBar />);

      const icons = screen.getAllByTestId('icon-Ionicons');
      // Train is active (filled), Read and Learn should be outline
      expect(icons[1]).toHaveTextContent('document-text-outline');
      expect(icons[2]).toHaveTextContent('book-outline');
    });
  });

  describe('navigation', () => {
    it('navigates to train when Train tab is pressed', () => {
      renderWithProviders(<ContentSubTabBar />);

      const trainTab = screen.getByText('Train');
      fireEvent.press(trainTab);

      expect(mockReplace).toHaveBeenCalledWith('/(tabs)/content/train');
    });

    it('navigates to read when Read tab is pressed', () => {
      renderWithProviders(<ContentSubTabBar />);

      const readTab = screen.getByText('Read');
      fireEvent.press(readTab);

      expect(mockReplace).toHaveBeenCalledWith('/(tabs)/content/read');
    });

    it('navigates to learn when Learn tab is pressed', () => {
      renderWithProviders(<ContentSubTabBar />);

      const learnTab = screen.getByText('Learn');
      fireEvent.press(learnTab);

      expect(mockReplace).toHaveBeenCalledWith('/(tabs)/content/learn');
    });

    it('updates settings store active content tab on tab press', () => {
      renderWithProviders(<ContentSubTabBar />);

      const readTab = screen.getByText('Read');
      fireEvent.press(readTab);

      // Verify the store was updated
      const activeTab = useSettingsStore.getState().activeContentTab;
      expect(activeTab).toBe('read');
    });

    it('calls setActiveContentTab before navigation', () => {
      const setActiveContentTabSpy = jest.spyOn(
        useSettingsStore.getState(),
        'setActiveContentTab'
      );

      renderWithProviders(<ContentSubTabBar />);

      const learnTab = screen.getByText('Learn');
      fireEvent.press(learnTab);

      expect(setActiveContentTabSpy).toHaveBeenCalledWith('learn');
      setActiveContentTabSpy.mockRestore();
    });
  });

  describe('theme variations', () => {
    it('renders correctly with dark theme (default)', () => {
      const { root } = renderWithProviders(<ContentSubTabBar />);

      expect(root).toBeTruthy();
    });

    it('renders correctly with light theme', () => {
      // Set theme to light
      useSettingsStore.getState().setTheme('light');

      const { root } = renderWithProviders(<ContentSubTabBar />);

      expect(root).toBeTruthy();
    });

    it('renders correctly with midnight theme', () => {
      useSettingsStore.getState().setTheme('midnight');

      const { root } = renderWithProviders(<ContentSubTabBar />);

      expect(root).toBeTruthy();
    });

    it('renders correctly with sepia theme', () => {
      useSettingsStore.getState().setTheme('sepia');

      const { root } = renderWithProviders(<ContentSubTabBar />);

      expect(root).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles pathname without content segment', () => {
      setMockPathname('/profile');
      const { root } = renderWithProviders(<ContentSubTabBar />);

      // Should render without errors, no tab active
      expect(root).toBeTruthy();
    });

    it('handles empty pathname', () => {
      setMockPathname('');
      const { root } = renderWithProviders(<ContentSubTabBar />);

      expect(root).toBeTruthy();
    });

    it('handles deeply nested pathname', () => {
      setMockPathname('/content/train/session/123');
      renderWithProviders(<ContentSubTabBar />);

      // Train should still be identified as active
      const icons = screen.getAllByTestId('icon-Ionicons');
      expect(icons[0]).toHaveTextContent('barbell');
    });
  });
});

describe('ContentSubTabBar tab icons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uses correct icon names for Train tab', () => {
    setMockPathname('/content/train');
    renderWithProviders(<ContentSubTabBar />);

    const icons = screen.getAllByTestId('icon-Ionicons');
    // Train active: barbell, Read inactive: document-text-outline, Learn inactive: book-outline
    expect(icons[0]).toHaveTextContent('barbell');
  });

  it('uses correct icon names for Read tab', () => {
    setMockPathname('/content/read');
    renderWithProviders(<ContentSubTabBar />);

    const icons = screen.getAllByTestId('icon-Ionicons');
    expect(icons[1]).toHaveTextContent('document-text');
  });

  it('uses correct icon names for Learn tab', () => {
    setMockPathname('/content/learn');
    renderWithProviders(<ContentSubTabBar />);

    const icons = screen.getAllByTestId('icon-Ionicons');
    expect(icons[2]).toHaveTextContent('book');
  });
});
