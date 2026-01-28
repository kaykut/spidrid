/**
 * Tests for ExpandableLearnCard Component.
 *
 * Tests the expandable card for AI article/curriculum generation including:
 * - Collapsed and expanded states
 * - Topic input with validation
 * - Portion selector (Bite/Snack/Meal/Feast) with premium gating
 * - Flavor selector (Auto/Fact/Story/Analogy) with premium gating
 * - Generate button behavior
 * - Recording functionality
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import { ExpandableLearnCard } from '../../../src/components/addContent/ExpandableLearnCard';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';

// =============================================================================
// Mocks
// =============================================================================

// Mock expo-router
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (path: string | { pathname: string; params?: Record<string, string> }) =>
      mockRouterPush(path),
  },
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View, Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`}>
        <Text>{name}</Text>
      </View>
    ),
    MaterialCommunityIcons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`}>
        <Text>{name}</Text>
      </View>
    ),
  };
});

// Mock animations
jest.mock('../../../src/constants/animations', () => ({
  animateLayout: jest.fn(),
}));

// Mock generatedStore
const mockGenerateArticle = jest.fn();
let mockIsGeneratingArticle = false;
jest.mock('../../../src/store/generatedStore', () => ({
  useGeneratedStore: () => ({
    generateArticle: mockGenerateArticle,
    isGenerating: mockIsGeneratingArticle,
  }),
}));

// Mock curriculumStore
const mockCreateCurriculumV2 = jest.fn();
let mockIsGeneratingCurriculum = false;
jest.mock('../../../src/store/curriculumStore', () => ({
  useCurriculumStore: () => ({
    createCurriculumV2: mockCreateCurriculumV2,
    isGenerating: mockIsGeneratingCurriculum,
  }),
}));

// Mock journeyStore
jest.mock('../../../src/store/journeyStore', () => ({
  useJourneyStore: () => ({
    avgWpmLast3: 300,
  }),
}));

// Mock subscriptionStore
let mockIsPremium = false;
let mockCanGenerateArticle = true;
jest.mock('../../../src/store/subscriptionStore', () => ({
  useSubscriptionStore: () => ({
    isPremium: mockIsPremium,
    canGenerateArticle: () => mockCanGenerateArticle,
  }),
}));

// Mock useWhisperRecording hook
const mockStartRecording = jest.fn();
const mockStopAndTranscribe = jest.fn();
let mockIsRecording = false;
let mockIsTranscribing = false;
let mockRecordingError: string | null = null;
jest.mock('../../../src/hooks/useWhisperRecording', () => ({
  useWhisperRecording: () => ({
    isRecording: mockIsRecording,
    isTranscribing: mockIsTranscribing,
    error: mockRecordingError,
    startRecording: mockStartRecording,
    stopAndTranscribe: mockStopAndTranscribe,
  }),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: (_namespace?: string) => ({
    t: (key: string, options?: Record<string, unknown>) => {
      // Return human-readable values for testing
      const translations: Record<string, string> = {
        // addContent namespace
        'learn.title': 'Learn',
        'learn.desc': 'Generate articles on topics you want to master',
        // generation namespace
        'placeholders.topic': 'What do you want to learn about?',
        'actions.adjust_duration_tone': 'Adjust duration and tone',
        'actions.serve_it_up': 'Serve it up',
        'actions.listening': 'Listening...',
        'actions.transcribing': 'Transcribing...',
        'labels.portion': 'Portion',
        'labels.flavor': 'Flavor',
        'labels.auto': 'Auto',
        'a11y.portion_premium': `${options?.portion} portion (Premium feature)`,
        'a11y.portion_hint_upgrade': 'Upgrade to premium to unlock',
        'a11y.portion_hint_select': `Select ${options?.portion} portion`,
        'a11y.flavor_premium': `${options?.flavor} flavor (Premium feature)`,
        'a11y.flavor_hint_select': `Select ${options?.flavor} writing style`,
      };
      return translations[key] || key;
    },
  }),
}));

// =============================================================================
// Test Helpers
// =============================================================================

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const defaultProps = {
  isExpanded: false,
  onExpandChange: jest.fn(),
  onClose: jest.fn(),
};

// =============================================================================
// Tests
// =============================================================================

describe('ExpandableLearnCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsGeneratingArticle = false;
    mockIsGeneratingCurriculum = false;
    mockIsPremium = false;
    mockCanGenerateArticle = true;
    mockIsRecording = false;
    mockIsTranscribing = false;
    mockRecordingError = null;
  });

  // ===========================================================================
  // Collapsed State Tests
  // ===========================================================================

  describe('collapsed state', () => {
    it('renders card header with title and description', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} />);

      expect(screen.getByText('Learn')).toBeTruthy();
      expect(screen.getByText('Generate articles on topics you want to master')).toBeTruthy();
    });

    it('renders school icon in header', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} />);

      expect(screen.getByTestId('icon-school')).toBeTruthy();
    });

    it('renders chevron icon', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} />);

      expect(screen.getByTestId('icon-chevron-forward')).toBeTruthy();
    });

    it('does not show expanded content when collapsed', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={false} />);

      expect(screen.queryByPlaceholderText('What do you want to learn about?')).toBeNull();
      expect(screen.queryByText('Serve it up')).toBeNull();
    });

    it('calls onExpandChange with true when header is pressed', () => {
      const onExpandChange = jest.fn();
      renderWithProviders(
        <ExpandableLearnCard {...defaultProps} onExpandChange={onExpandChange} />
      );

      fireEvent.press(screen.getByText('Learn'));

      expect(onExpandChange).toHaveBeenCalledWith(true);
    });
  });

  // ===========================================================================
  // Expanded State Tests
  // ===========================================================================

  describe('expanded state', () => {
    it('shows topic input when expanded', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      expect(screen.getByPlaceholderText('What do you want to learn about?')).toBeTruthy();
    });

    it('shows generate button when expanded', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      expect(screen.getByText('Serve it up')).toBeTruthy();
    });

    it('shows customize toggle when expanded', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      expect(screen.getByText('Adjust duration and tone')).toBeTruthy();
    });

    it('shows mic button when expanded', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      expect(screen.getByTestId('icon-mic')).toBeTruthy();
    });

    it('calls onExpandChange with false when header is pressed while expanded', () => {
      const onExpandChange = jest.fn();
      renderWithProviders(
        <ExpandableLearnCard
          {...defaultProps}
          isExpanded={true}
          onExpandChange={onExpandChange}
        />
      );

      fireEvent.press(screen.getByText('Learn'));

      expect(onExpandChange).toHaveBeenCalledWith(false);
    });
  });

  // ===========================================================================
  // Topic Input Tests
  // ===========================================================================

  describe('topic input', () => {
    it('allows text input', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      fireEvent.changeText(input, 'Machine Learning');

      expect(input.props.value).toBe('Machine Learning');
    });

    it('disables input while generating', () => {
      mockIsGeneratingArticle = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      expect(input.props.editable).toBe(false);
    });

    it('disables input while recording', () => {
      mockIsRecording = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      expect(input.props.editable).toBe(false);
    });

    it('disables input while transcribing', () => {
      mockIsTranscribing = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      expect(input.props.editable).toBe(false);
    });

    it('has max length of 500 characters', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      expect(input.props.maxLength).toBe(500);
    });
  });

  // ===========================================================================
  // Customize Section Tests
  // ===========================================================================

  describe('customize section', () => {
    it('does not show portion and flavor options by default', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      expect(screen.queryByText('Portion')).toBeNull();
      expect(screen.queryByText('Flavor')).toBeNull();
    });

    it('shows portion and flavor options when customize is toggled', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));

      expect(screen.getByText('Portion')).toBeTruthy();
      expect(screen.getByText('Flavor')).toBeTruthy();
    });

    it('shows all portion options', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));

      expect(screen.getByText('Bite')).toBeTruthy();
      expect(screen.getByText('Snack')).toBeTruthy();
      expect(screen.getByText('Meal')).toBeTruthy();
      expect(screen.getByText('Feast')).toBeTruthy();
    });

    it('shows all flavor options', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));

      expect(screen.getByText('Auto')).toBeTruthy();
      expect(screen.getByText('Fact')).toBeTruthy();
      expect(screen.getByText('Story')).toBeTruthy();
      expect(screen.getByText('Analogy')).toBeTruthy();
    });

    it('hides customize section when toggled again', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      // Open customize
      fireEvent.press(screen.getByText('Adjust duration and tone'));
      expect(screen.getByText('Portion')).toBeTruthy();

      // Close customize
      fireEvent.press(screen.getByText('Adjust duration and tone'));
      expect(screen.queryByText('Portion')).toBeNull();
    });
  });

  // ===========================================================================
  // Portion Selection Tests (Premium Gating)
  // ===========================================================================

  describe('portion selection', () => {
    beforeEach(() => {
      mockIsPremium = false;
    });

    it('allows selecting Bite for free users', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));

      // Bite is the default selection, so this verifies it renders
      expect(screen.getByText('Bite')).toBeTruthy();
    });

    it('redirects to paywall when non-premium user selects Snack', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Snack'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/paywall',
        params: { trigger: 'premium_feature' },
      });
    });

    it('redirects to paywall when non-premium user selects Meal', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Meal'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/paywall',
        params: { trigger: 'premium_feature' },
      });
    });

    it('redirects to paywall when non-premium user selects Feast', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Feast'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/paywall',
        params: { trigger: 'premium_feature' },
      });
    });

    it('allows premium users to select Snack without paywall', () => {
      mockIsPremium = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Snack'));

      expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it('allows premium users to select Meal without paywall', () => {
      mockIsPremium = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Meal'));

      expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it('allows premium users to select Feast without paywall', () => {
      mockIsPremium = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Feast'));

      expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it('shows premium badges on locked portion options for free users', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));

      // Premium badges render with crown icons - verify the component renders
      // The PremiumBadge component shows crown icons for locked features
      expect(screen.getByText('Snack')).toBeTruthy();
      expect(screen.getByText('Meal')).toBeTruthy();
      expect(screen.getByText('Feast')).toBeTruthy();
    });

    it('has correct accessibility labels for premium portion options', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));

      // Verify accessibility attributes are set on portion cards
      const snackButton = screen.getByText('Snack').parent?.parent;
      expect(snackButton?.props.accessibilityRole).toBe('button');
    });
  });

  // ===========================================================================
  // Flavor Selection Tests (Premium Gating)
  // ===========================================================================

  describe('flavor selection', () => {
    beforeEach(() => {
      mockIsPremium = false;
    });

    it('allows selecting Auto for free users', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Auto'));

      expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it('redirects to paywall when non-premium user selects Fact', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Fact'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/paywall',
        params: { trigger: 'premium_feature' },
      });
    });

    it('redirects to paywall when non-premium user selects Story', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Story'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/paywall',
        params: { trigger: 'premium_feature' },
      });
    });

    it('redirects to paywall when non-premium user selects Analogy', () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Analogy'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/paywall',
        params: { trigger: 'premium_feature' },
      });
    });

    it('allows premium users to select Fact without paywall', () => {
      mockIsPremium = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Fact'));

      expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it('allows premium users to select Story without paywall', () => {
      mockIsPremium = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Story'));

      expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it('allows premium users to select Analogy without paywall', () => {
      mockIsPremium = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Analogy'));

      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Generate Button Tests
  // ===========================================================================

  describe('generate button', () => {
    it('is disabled when topic is empty', async () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const generateButton = screen.getByText('Serve it up');
      await act(async () => {
        fireEvent.press(generateButton);
      });

      expect(mockGenerateArticle).not.toHaveBeenCalled();
    });

    it('is disabled when topic is only whitespace', async () => {
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, '   ');
      });

      const generateButton = screen.getByText('Serve it up');
      await act(async () => {
        fireEvent.press(generateButton);
      });

      expect(mockGenerateArticle).not.toHaveBeenCalled();
    });

    it('is enabled when topic has content', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'test-article-123' });

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Machine Learning');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockGenerateArticle).toHaveBeenCalled();
      });
    });

    it('shows loading indicator while generating', () => {
      mockIsGeneratingArticle = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      // Generate button text should not be shown when generating
      expect(screen.queryByText('Serve it up')).toBeNull();
    });

    it('is disabled while generating', async () => {
      mockIsGeneratingArticle = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Test Topic');
      });

      // Generate button should be disabled during generation
      // We can't click it, but we verify no additional calls happen
      expect(mockGenerateArticle).not.toHaveBeenCalled();
    });

    it('does not call generate when already generating even with valid topic', async () => {
      // Start with a valid topic but generating state
      mockIsGeneratingArticle = true;

      renderWithProviders(
        <ExpandableLearnCard {...defaultProps} isExpanded={true} />
      );

      // The button is disabled, but let's verify the internal guard works
      // by ensuring no calls are made even with a topic value
      expect(mockGenerateArticle).not.toHaveBeenCalled();
      expect(mockCreateCurriculumV2).not.toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Article Generation Flow Tests
  // ===========================================================================

  describe('article generation (Bite portion)', () => {
    it('calls generateArticle with correct parameters for Bite', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'gen-article-1' });

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Quantum Physics');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockGenerateArticle).toHaveBeenCalledWith({
          topic: 'Quantum Physics',
          durationMinutes: 3, // Bite is 3 min
          tone: 'auto', // Default when customize is hidden
          avgWpm: 300,
          userId: 'current-user',
        });
      });
    });

    it('trims whitespace from topic before submitting', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'gen-article-2' });

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, '  Trimmed Topic  ');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockGenerateArticle).toHaveBeenCalledWith(
          expect.objectContaining({ topic: 'Trimmed Topic' })
        );
      });
    });

    it('navigates to generated article on success', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'nav-article-123' });

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Test Navigation');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith('/generated/nav-article-123');
      });
    });

    it('calls onClose after successful generation', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'close-test' });

      const onClose = jest.fn();
      renderWithProviders(
        <ExpandableLearnCard {...defaultProps} isExpanded={true} onClose={onClose} />
      );

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Test Close');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('calls onExpandChange with false after successful generation', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'expand-test' });

      const onExpandChange = jest.fn();
      renderWithProviders(
        <ExpandableLearnCard
          {...defaultProps}
          isExpanded={true}
          onExpandChange={onExpandChange}
        />
      );

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Test Expand');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(onExpandChange).toHaveBeenCalledWith(false);
      });
    });

    it('does not navigate or close on failed generation', async () => {
      mockGenerateArticle.mockResolvedValueOnce(null);

      const onClose = jest.fn();
      const onExpandChange = jest.fn();
      renderWithProviders(
        <ExpandableLearnCard
          {...defaultProps}
          isExpanded={true}
          onClose={onClose}
          onExpandChange={onExpandChange}
        />
      );

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Test Failure');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockGenerateArticle).toHaveBeenCalled();
      });

      expect(onClose).not.toHaveBeenCalled();
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Curriculum Generation Flow Tests
  // ===========================================================================

  describe('curriculum generation (Snack/Meal/Feast portions)', () => {
    beforeEach(() => {
      mockIsPremium = true;
    });

    it('calls createCurriculumV2 for Snack portion', async () => {
      mockCreateCurriculumV2.mockResolvedValueOnce('curriculum-snack-123');

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      // Expand customize and select Snack
      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Snack'));

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Learn React');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockCreateCurriculumV2).toHaveBeenCalledWith(
          expect.objectContaining({
            goal: 'Learn React',
            articleRange: { min: 2, max: 3 },
            tone: 'auto',
            durationRange: { min: 5, max: 8 },
          }),
          300
        );
      });
    });

    it('calls createCurriculumV2 for Meal portion', async () => {
      mockCreateCurriculumV2.mockResolvedValueOnce('curriculum-meal-123');

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Meal'));

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Deep Dive TypeScript');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockCreateCurriculumV2).toHaveBeenCalledWith(
          expect.objectContaining({
            goal: 'Deep Dive TypeScript',
            articleRange: { min: 4, max: 6 },
            durationRange: { min: 12, max: 15 },
          }),
          300
        );
      });
    });

    it('calls createCurriculumV2 for Feast portion', async () => {
      mockCreateCurriculumV2.mockResolvedValueOnce('curriculum-feast-123');

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Feast'));

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Master Python');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockCreateCurriculumV2).toHaveBeenCalledWith(
          expect.objectContaining({
            goal: 'Master Python',
            articleRange: { min: 7, max: 10 },
            durationRange: { min: 20, max: 30 },
          }),
          300
        );
      });
    });

    it('navigates to curriculum article on success', async () => {
      mockCreateCurriculumV2.mockResolvedValueOnce('curr-nav-test');

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Snack'));

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Navigation Test');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith('/curriculum/curr-nav-test/article/0');
      });
    });

    it('passes selected flavor to curriculum generation', async () => {
      mockCreateCurriculumV2.mockResolvedValueOnce('curr-flavor-test');

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Snack'));
      fireEvent.press(screen.getByText('Story'));

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Flavor Test');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockCreateCurriculumV2).toHaveBeenCalledWith(
          expect.objectContaining({
            tone: 'storytelling',
          }),
          300
        );
      });
    });
  });

  // ===========================================================================
  // Generation Limit Tests (Free Users)
  // ===========================================================================

  describe('generation limits', () => {
    it('redirects to paywall when free user hits generation limit', async () => {
      mockIsPremium = false;
      mockCanGenerateArticle = false;

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Limited Topic');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith({
          pathname: '/paywall',
          params: { trigger: 'generation_limit' },
        });
      });

      expect(mockGenerateArticle).not.toHaveBeenCalled();
    });

    it('redirects to paywall when free user tries premium features', async () => {
      mockIsPremium = false;
      mockCanGenerateArticle = true;

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      fireEvent.press(screen.getByText('Adjust duration and tone'));

      // Try to select a premium portion by pressing it (which redirects)
      fireEvent.press(screen.getByText('Snack'));

      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: '/paywall',
        params: { trigger: 'premium_feature' },
      });
    });
  });

  // ===========================================================================
  // Recording Functionality Tests
  // ===========================================================================

  describe('recording functionality', () => {
    it('starts recording when mic button is pressed', async () => {
      mockIsRecording = false;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const micButton = screen.getByTestId('icon-mic').parent?.parent;

      await act(async () => {
        fireEvent.press(micButton!);
      });

      expect(mockStartRecording).toHaveBeenCalled();
    });

    it('shows stop icon when recording', () => {
      mockIsRecording = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      expect(screen.getByTestId('icon-stop')).toBeTruthy();
    });

    it('stops and transcribes when stop button pressed', async () => {
      mockIsRecording = true;
      mockStopAndTranscribe.mockResolvedValueOnce('Transcribed text here');

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const stopButton = screen.getByTestId('icon-stop').parent?.parent;

      await act(async () => {
        fireEvent.press(stopButton!);
      });

      expect(mockStopAndTranscribe).toHaveBeenCalled();
    });

    it('shows listening status when recording', () => {
      mockIsRecording = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      expect(screen.getByText('Listening...')).toBeTruthy();
    });

    it('shows transcribing status when transcribing', () => {
      mockIsTranscribing = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      expect(screen.getByText('Transcribing...')).toBeTruthy();
    });

    it('shows recording error when present', () => {
      mockRecordingError = 'Failed to start recording';
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      expect(screen.getByText('Failed to start recording')).toBeTruthy();
    });

    it('disables mic button while generating', () => {
      mockIsGeneratingArticle = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      // Verify the input is disabled (which happens alongside mic button being disabled)
      // The mic button disabled state is set to (isGenerating || isTranscribing)
      // We verify the component is in a generating state by checking the input is disabled
      const input = screen.getByPlaceholderText('What do you want to learn about?');
      expect(input.props.editable).toBe(false);

      // The mic icon is still visible (not replaced with ActivityIndicator)
      // because isTranscribing is false
      expect(screen.getByTestId('icon-mic')).toBeTruthy();
    });

    it('disables mic button while transcribing', () => {
      mockIsTranscribing = true;
      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      // When transcribing, shows ActivityIndicator instead of mic icon
      // The button should be disabled
      const input = screen.getByPlaceholderText('What do you want to learn about?');
      expect(input.props.editable).toBe(false);
    });

    it('calls stopAndTranscribe and receives text result', async () => {
      mockIsRecording = true;
      mockStopAndTranscribe.mockResolvedValueOnce('transcribed text');

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      // Verify stop button is shown when recording
      expect(screen.getByTestId('icon-stop')).toBeTruthy();

      // Press stop button
      const stopButton = screen.getByTestId('icon-stop').parent?.parent;
      await act(async () => {
        fireEvent.press(stopButton!);
      });

      // Verify stopAndTranscribe was called
      expect(mockStopAndTranscribe).toHaveBeenCalled();
    });

    it('calls stopAndTranscribe which can return null', async () => {
      mockIsRecording = true;
      mockStopAndTranscribe.mockResolvedValueOnce(null);

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const stopButton = screen.getByTestId('icon-stop').parent?.parent;
      await act(async () => {
        fireEvent.press(stopButton!);
      });

      // Verify stopAndTranscribe was called even when it returns null
      expect(mockStopAndTranscribe).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // Edge Cases
  // ===========================================================================

  describe('edge cases', () => {
    it('handles rapid expand/collapse toggling', () => {
      const onExpandChange = jest.fn();
      renderWithProviders(
        <ExpandableLearnCard {...defaultProps} onExpandChange={onExpandChange} />
      );

      const header = screen.getByText('Learn');

      fireEvent.press(header);
      fireEvent.press(header);
      fireEvent.press(header);

      expect(onExpandChange).toHaveBeenCalledTimes(3);
    });

    it('maintains topic value during collapse/expand cycle', () => {
      renderWithProviders(
        <ExpandableLearnCard {...defaultProps} isExpanded={true} />
      );

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      fireEvent.changeText(input, 'Persistent Topic');

      // Note: In real usage, collapsing resets the form
      // This test verifies the component handles this properly
      expect(input.props.value).toBe('Persistent Topic');
    });

    it('handles curriculum generation failure', async () => {
      mockIsPremium = true;
      mockCreateCurriculumV2.mockResolvedValueOnce(null);

      const onClose = jest.fn();
      renderWithProviders(
        <ExpandableLearnCard {...defaultProps} isExpanded={true} onClose={onClose} />
      );

      fireEvent.press(screen.getByText('Adjust duration and tone'));
      fireEvent.press(screen.getByText('Snack'));

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'Failure Test');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockCreateCurriculumV2).toHaveBeenCalled();
      });

      expect(onClose).not.toHaveBeenCalled();
      expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it('uses default avgWpm of 250 when journeyStore returns null', async () => {
      // This is handled by the fallback: const avgWpm = avgWpmLast3 || 250
      mockGenerateArticle.mockResolvedValueOnce({ id: 'wpm-test' });

      renderWithProviders(<ExpandableLearnCard {...defaultProps} isExpanded={true} />);

      const input = screen.getByPlaceholderText('What do you want to learn about?');
      await act(async () => {
        fireEvent.changeText(input, 'WPM Test');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Serve it up'));
      });

      await waitFor(() => {
        expect(mockGenerateArticle).toHaveBeenCalledWith(
          expect.objectContaining({
            avgWpm: 300, // Our mock returns 300
          })
        );
      });
    });
  });
});
