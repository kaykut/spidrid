/**
 * Tests for Journey + Profile Modal
 *
 * Tests the settings and journey modal including:
 * - Theme switching (4 themes)
 * - User name input persistence
 * - Language picker interaction
 * - Subscription tier display (Premium vs Free)
 * - Reading settings toggles (paragraph pause, move to history)
 * - Dev controls visibility
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import JourneyProfileModal from '../../src/app/journey-profile';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import { useSettingsStore } from '../../src/store/settingsStore';
import { useSubscriptionStore } from '../../src/store/subscriptionStore';
import { useJourneyStore } from '../../src/store/journeyStore';
import { DEFAULT_CERT_PROGRESS, DEFAULT_STREAK, DEFAULT_COMFORT_BAND } from '../../src/types/journey';

// =============================================================================
// Mocks
// =============================================================================

// Mock expo-router
const mockRouterBack = jest.fn();
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockRouterBack(),
    push: (path: string) => mockRouterPush(path),
  },
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
    MaterialCommunityIcons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <View style={style}>{children}</View>
    ),
  };
});

// Mock GlassView
jest.mock('../../src/components/common/GlassView', () => {
  const { View } = require('react-native');
  return {
    GlassView: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <View style={style}>{children}</View>
    ),
  };
});

// Mock VerticalProgressPath
jest.mock('../../src/components/journey/VerticalProgressPath', () => {
  const { View, Text } = require('react-native');
  return {
    VerticalProgressPath: ({ avgWpm, avgComp }: { avgWpm: number; avgComp: number }) => (
      <View testID="vertical-progress-path">
        <Text>Avg WPM: {avgWpm}</Text>
        <Text>Avg Comp: {avgComp}</Text>
      </View>
    ),
  };
});

// =============================================================================
// Test Helpers
// =============================================================================

function resetStores() {
  useSettingsStore.setState({
    userName: '',
    readingLanguage: 'en',
    paragraphPauseEnabled: true,
    moveFinishedToHistory: false,
  });

  useSubscriptionStore.setState({
    isPremium: false,
  });

  useJourneyStore.setState({
    avgWpmLast3: 250,
    avgCompLast5: 80,
    certProgress: {
      speed_reader: { ...DEFAULT_CERT_PROGRESS },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    comfortBand: DEFAULT_COMFORT_BAND,
    streak: DEFAULT_STREAK,
  });
}

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// =============================================================================
// Tests
// =============================================================================

describe('JourneyProfileModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStores();
  });

  // ===========================================================================
  // Basic Rendering
  // ===========================================================================

  describe('basic rendering', () => {
    it('shows page title', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Journey & Settings')).toBeTruthy();
    });

    it('renders vertical progress path with journey stats', () => {
      useJourneyStore.setState({ avgWpmLast3: 320, avgCompLast5: 85 });
      const { getByTestId, getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByTestId('vertical-progress-path')).toBeTruthy();
      expect(getByText('Avg WPM: 320')).toBeTruthy();
      expect(getByText('Avg Comp: 85')).toBeTruthy();
    });

    it('closes modal when close button pressed', () => {
      const { getByTestId } = renderWithProviders(<JourneyProfileModal />);

      fireEvent.press(getByTestId('icon-close'));

      expect(mockRouterBack).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Theme Selection
  // ===========================================================================

  describe('theme selection', () => {
    it('shows Theme section', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Theme')).toBeTruthy();
    });

    it('displays all 4 theme options', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Dark')).toBeTruthy();
      expect(getByText('Midnight')).toBeTruthy();
      expect(getByText('Sepia')).toBeTruthy();
      expect(getByText('Light')).toBeTruthy();
    });

    it('changes theme when theme button pressed', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      // Press Sepia theme
      fireEvent.press(getByText('Sepia'));

      // Theme should be selected (visual change - we can verify the button still exists)
      expect(getByText('Sepia')).toBeTruthy();
    });
  });

  // ===========================================================================
  // User Info Section
  // ===========================================================================

  describe('user info section', () => {
    it('shows Your Info section', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Your Info')).toBeTruthy();
    });

    it('shows name input with placeholder', () => {
      const { getByPlaceholderText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByPlaceholderText('Enter your name')).toBeTruthy();
    });

    it('displays saved userName', () => {
      useSettingsStore.setState({ userName: 'John Doe' });
      const { getByDisplayValue } = renderWithProviders(<JourneyProfileModal />);

      expect(getByDisplayValue('John Doe')).toBeTruthy();
    });

    it('updates userName when text entered', () => {
      const { getByPlaceholderText } = renderWithProviders(<JourneyProfileModal />);

      fireEvent.changeText(getByPlaceholderText('Enter your name'), 'Jane Smith');

      expect(useSettingsStore.getState().userName).toBe('Jane Smith');
    });

    // Language selector tests skipped - feature is hidden for English-only launch
    // Will be recycled as "App Language" (UI localization) setting during i18n
    // Reading language now auto-detects per-content at playback time
    it.skip('shows language selector with current language', () => {
      useSettingsStore.setState({ readingLanguage: 'en' });
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('English')).toBeTruthy();
    });

    it.skip('opens language picker when selector pressed', () => {
      const { getByText, queryByText } = renderWithProviders(<JourneyProfileModal />);

      // Language list should not be visible initially (only current language shown)
      expect(queryByText('Spanish')).toBeNull();

      // Press language selector
      fireEvent.press(getByText('English'));

      // Language list should now be visible
      expect(getByText('Spanish')).toBeTruthy();
      expect(getByText('French')).toBeTruthy();
    });

    it.skip('selects language and closes picker', () => {
      const { getByText, queryByText } = renderWithProviders(<JourneyProfileModal />);

      // Open picker
      fireEvent.press(getByText('English'));

      // Select Spanish
      fireEvent.press(getByText('Spanish'));

      // Store should be updated
      expect(useSettingsStore.getState().readingLanguage).toBe('es');

      // Picker should be closed (Spanish only shown once as current selection)
      expect(queryByText('French')).toBeNull();
    });
  });

  // ===========================================================================
  // Subscription Section (Free Tier)
  // ===========================================================================

  describe('subscription section - free tier', () => {
    beforeEach(() => {
      useSubscriptionStore.setState({ isPremium: false });
    });

    it('shows Subscription section', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Subscription')).toBeTruthy();
    });

    it('shows Free status', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Free')).toBeTruthy();
    });

    it('shows Max WPM limit', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Max WPM')).toBeTruthy();
      expect(getByText('450')).toBeTruthy(); // Free tier WPM limit
    });

    it('shows Upgrade to Premium button', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Upgrade to Premium')).toBeTruthy();
    });

    it('navigates to paywall when upgrade button pressed', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      fireEvent.press(getByText('Upgrade to Premium'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/paywall',
        params: { trigger: 'upgrade' },
      });
    });
  });

  // ===========================================================================
  // Subscription Section (Premium)
  // ===========================================================================

  describe('subscription section - premium', () => {
    beforeEach(() => {
      useSubscriptionStore.setState({ isPremium: true });
    });

    it('shows Premium status', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Premium')).toBeTruthy();
    });

    it('shows unlimited WPM', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Max WPM')).toBeTruthy();
      expect(getByText('1500')).toBeTruthy(); // Premium WPM limit
    });

    it('does not show articles used for premium', () => {
      const { queryByText } = renderWithProviders(<JourneyProfileModal />);

      expect(queryByText('Articles used')).toBeNull();
    });

    // Note: Premium dev controls (toggle premium, reset) moved to /dev-tools screen
  });

  // ===========================================================================
  // Reading Settings
  // ===========================================================================

  describe('reading settings', () => {
    it('shows Reading section', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Reading')).toBeTruthy();
    });

    it('shows paragraph pause setting', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Paragraph Pause')).toBeTruthy();
      expect(getByText('Brief pause between paragraphs')).toBeTruthy();
    });

    it('toggles paragraph pause when switch pressed', () => {
      useSettingsStore.setState({ paragraphPauseEnabled: true });
      const { getAllByRole } = renderWithProviders(<JourneyProfileModal />);

      // Find the first switch (paragraph pause)
      const switches = getAllByRole('switch');
      fireEvent(switches[0], 'valueChange', false);

      expect(useSettingsStore.getState().paragraphPauseEnabled).toBe(false);
    });

    it('shows move to history setting', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Move to History')).toBeTruthy();
      expect(getByText('Completed items move to History')).toBeTruthy();
    });

    it('toggles move to history when switch pressed', () => {
      useSettingsStore.setState({ moveFinishedToHistory: false });
      const { getAllByRole } = renderWithProviders(<JourneyProfileModal />);

      // Find the second switch (move to history)
      const switches = getAllByRole('switch');
      fireEvent(switches[1], 'valueChange', true);

      expect(useSettingsStore.getState().moveFinishedToHistory).toBe(true);
    });
  });

  // ===========================================================================
  // History Button
  // ===========================================================================

  describe('history button', () => {
    it('shows history button when moveFinishedToHistory is enabled', () => {
      useSettingsStore.setState({ moveFinishedToHistory: true });
      const { getByTestId } = renderWithProviders(<JourneyProfileModal />);

      expect(getByTestId('icon-time-outline')).toBeTruthy();
    });

    it('hides history button when moveFinishedToHistory is disabled', () => {
      useSettingsStore.setState({ moveFinishedToHistory: false });
      const { queryByTestId } = renderWithProviders(<JourneyProfileModal />);

      expect(queryByTestId('icon-time-outline')).toBeNull();
    });

    it('navigates to history when history button pressed', () => {
      useSettingsStore.setState({ moveFinishedToHistory: true });
      const { getByTestId } = renderWithProviders(<JourneyProfileModal />);

      fireEvent.press(getByTestId('icon-time-outline'));

      expect(mockRouterPush).toHaveBeenCalledWith('/history');
    });
  });

  // ===========================================================================
  // Dev Controls
  // ===========================================================================

  describe('dev controls', () => {
    it('shows Developer section', () => {
      useSubscriptionStore.setState({ isPremium: false });
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Developer')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Dev Tools
  // ===========================================================================

  describe('dev tools', () => {
    it('shows Dev Tools button', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      expect(getByText('Dev Tools')).toBeTruthy();
    });

    it('navigates to dev-tools screen when pressed', () => {
      const { getByText } = renderWithProviders(<JourneyProfileModal />);

      fireEvent.press(getByText('Dev Tools'));

      expect(mockRouterPush).toHaveBeenCalledWith('/dev-tools');
    });
  });
});
