/**
 * Integration Tests for Learn Screen.
 *
 * Tests the Learn tab with AI article generation and curricula features.
 * Focuses on user flows: premium gating, modal interactions, article list.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import LearnScreen from '../../src/app/(tabs)/content/learn';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Mock expo-router
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
    push: (path: string) => mockRouterPush(path),
  },
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
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
  };
});

// Mock subscriptionStore - controls premium state
const mockIsPremium = jest.fn(() => false);
jest.mock('../../src/store/subscriptionStore', () => ({
  useSubscriptionStore: () => ({
    isPremium: mockIsPremium(),
  }),
}));

// Mock journeyStore
jest.mock('../../src/store/journeyStore', () => ({
  useJourneyStore: () => ({
    avgWpmLast3: 300,
  }),
}));

// Mock generatedStore - controls articles and generation state
const mockArticles: Array<{
  id: string;
  title: string;
  topic: string;
  tone: string;
  wordCount: number;
  status: string;
  generatedAt: number;
  completed: boolean;
  comprehensionScore?: number;
  highestWPM?: number;
  attemptCount: number;
}> = [];
const mockIsGenerating = jest.fn(() => false);
jest.mock('../../src/store/generatedStore', () => ({
  useGeneratedStore: () => ({
    articles: mockArticles,
    isGenerating: mockIsGenerating(),
    generateArticle: jest.fn(),
    getArticleById: jest.fn(),
  }),
}));

// Mock Paywall component to track visibility
const mockPaywallOnClose = jest.fn();
jest.mock('../../src/components/paywall/Paywall', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    Paywall: ({
      visible,
      onClose,
    }: {
      visible: boolean;
      onClose: () => void;
    }) =>
      visible ? (
        <View testID="paywall-modal">
          <Text>Paywall</Text>
          <TouchableOpacity
            testID="paywall-close"
            onPress={() => {
              mockPaywallOnClose();
              onClose();
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      ) : null,
  };
});

// Mock GenerateArticleModal to track visibility
jest.mock('../../src/components/learn', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    GenerateArticleModal: ({
      visible,
      onClose,
    }: {
      visible: boolean;
      onClose: () => void;
    }) =>
      visible ? (
        <View testID="generate-modal">
          <Text>Generate Modal</Text>
          <TouchableOpacity testID="modal-close" onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      ) : null,
    GeneratedArticleCard: ({
      article,
      onPress,
    }: {
      article: { id: string; title: string };
      onPress: () => void;
    }) => (
      <TouchableOpacity testID={`article-card-${article.id}`} onPress={onPress}>
        <Text>{article.title}</Text>
      </TouchableOpacity>
    ),
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('LearnScreen Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockArticles.length = 0;
    mockIsPremium.mockReturnValue(false);
    mockIsGenerating.mockReturnValue(false);
  });

  describe('initial rendering', () => {
    it('renders the screen title', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Learn')).toBeTruthy();
    });

    it('displays Articles tab', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Articles')).toBeTruthy();
    });

    it('displays Curricula tab', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Curricula')).toBeTruthy();
    });

    it('shows Generate Article button', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('+ Generate Article')).toBeTruthy();
    });

    it('shows empty state message when no articles', () => {
      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('No articles yet')).toBeTruthy();
    });
  });

  describe('premium gating', () => {
    it('shows paywall when non-premium user presses generate', () => {
      mockIsPremium.mockReturnValue(false);
      renderWithProviders(<LearnScreen />);

      const generateButton = screen.getByText('+ Generate Article');
      fireEvent.press(generateButton);

      expect(screen.getByTestId('paywall-modal')).toBeTruthy();
    });

    it('does not show generate modal for non-premium user', () => {
      mockIsPremium.mockReturnValue(false);
      renderWithProviders(<LearnScreen />);

      const generateButton = screen.getByText('+ Generate Article');
      fireEvent.press(generateButton);

      expect(screen.queryByTestId('generate-modal')).toBeNull();
    });

    it('shows generate modal for premium user', () => {
      mockIsPremium.mockReturnValue(true);
      renderWithProviders(<LearnScreen />);

      const generateButton = screen.getByText('+ Generate Article');
      fireEvent.press(generateButton);

      expect(screen.getByTestId('generate-modal')).toBeTruthy();
    });

    it('does not show paywall for premium user', () => {
      mockIsPremium.mockReturnValue(true);
      renderWithProviders(<LearnScreen />);

      const generateButton = screen.getByText('+ Generate Article');
      fireEvent.press(generateButton);

      expect(screen.queryByTestId('paywall-modal')).toBeNull();
    });
  });

  describe('segmented control', () => {
    it('shows articles view by default', () => {
      renderWithProviders(<LearnScreen />);

      // Should show generate button (articles view)
      expect(screen.getByText('+ Generate Article')).toBeTruthy();
    });

    it('switches to curricula view when Curricula tab is pressed', () => {
      renderWithProviders(<LearnScreen />);

      const curriculaTab = screen.getByText('Curricula');
      fireEvent.press(curriculaTab);

      // Curricula view shows "Coming Soon"
      expect(screen.getByText('Coming Soon')).toBeTruthy();
    });

    it('hides generate button in curricula view', () => {
      renderWithProviders(<LearnScreen />);

      const curriculaTab = screen.getByText('Curricula');
      fireEvent.press(curriculaTab);

      expect(screen.queryByText('+ Generate Article')).toBeNull();
    });

    it('switches back to articles view', () => {
      renderWithProviders(<LearnScreen />);

      // Go to curricula
      fireEvent.press(screen.getByText('Curricula'));
      expect(screen.getByText('Coming Soon')).toBeTruthy();

      // Go back to articles
      fireEvent.press(screen.getByText('Articles'));
      expect(screen.getByText('+ Generate Article')).toBeTruthy();
    });
  });

  describe('article list', () => {
    it('shows articles when they exist', () => {
      mockArticles.push({
        id: 'art-1',
        title: 'Test Article Title',
        topic: 'Testing',
        tone: 'explanatory',
        wordCount: 500,
        status: 'complete',
        generatedAt: Date.now(),
        completed: false,
        attemptCount: 0,
      });

      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Test Article Title')).toBeTruthy();
    });

    it('only shows complete articles', () => {
      mockArticles.push(
        {
          id: 'art-complete',
          title: 'Complete Article',
          topic: 'Done',
          tone: 'explanatory',
          wordCount: 500,
          status: 'complete',
          generatedAt: Date.now(),
          completed: false,
          attemptCount: 0,
        },
        {
          id: 'art-generating',
          title: 'Generating Article',
          topic: 'WIP',
          tone: 'explanatory',
          wordCount: 0,
          status: 'generating',
          generatedAt: Date.now(),
          completed: false,
          attemptCount: 0,
        }
      );

      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('Complete Article')).toBeTruthy();
      expect(screen.queryByText('Generating Article')).toBeNull();
    });

    it('navigates to reader when article is pressed', () => {
      mockArticles.push({
        id: 'art-nav',
        title: 'Navigate Test',
        topic: 'Navigation',
        tone: 'explanatory',
        wordCount: 500,
        status: 'complete',
        generatedAt: Date.now(),
        completed: false,
        attemptCount: 0,
      });

      renderWithProviders(<LearnScreen />);

      const articleCard = screen.getByTestId('article-card-art-nav');
      fireEvent.press(articleCard);

      expect(mockRouterPush).toHaveBeenCalledWith('/generated/art-nav');
    });

    it('shows "My Articles" section header when articles exist', () => {
      mockArticles.push({
        id: 'art-1',
        title: 'Test Article',
        topic: 'Testing',
        tone: 'explanatory',
        wordCount: 500,
        status: 'complete',
        generatedAt: Date.now(),
        completed: false,
        attemptCount: 0,
      });

      renderWithProviders(<LearnScreen />);

      expect(screen.getByText('My Articles')).toBeTruthy();
    });
  });

  describe('generating state', () => {
    it('disables generate button when generating', () => {
      mockIsGenerating.mockReturnValue(true);
      mockIsPremium.mockReturnValue(true);

      renderWithProviders(<LearnScreen />);

      // The button should show ActivityIndicator instead of text
      expect(screen.queryByText('+ Generate Article')).toBeNull();
    });
  });
});
