/**
 * Integration Tests for Learn Screen - Curricula Segment.
 *
 * Tests the curricula tab: creation button, curriculum list,
 * premium gating, and navigation to articles.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';
import LearnScreen from '../../src/app/(tabs)/content/learn';
import { Curriculum } from '../../src/types/curriculum';

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || `icon-${name}`}>{name}</Text>
    ),
  };
});

// Mock expo-router
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (path: string) => mockRouterPush(path),
  },
}));

// Mock stores
let mockIsPremium = true;
let mockCurricula: Curriculum[] = [];
let mockIsGenerating = false;

jest.mock('../../src/store/subscriptionStore', () => ({
  useSubscriptionStore: () => ({
    isPremium: mockIsPremium,
  }),
}));

jest.mock('../../src/store/generatedStore', () => ({
  useGeneratedStore: () => ({
    articles: [],
    isGenerating: false,
  }),
}));

jest.mock('../../src/store/journeyStore', () => ({
  useJourneyStore: () => ({
    avgWpmLast3: 250,
  }),
}));

jest.mock('../../src/store/curriculumStore', () => ({
  useCurriculumStore: () => ({
    getAllCurricula: () => mockCurricula,
    isGenerating: mockIsGenerating,
    generationProgress: null,
    generationError: null,
  }),
}));

// Mock Paywall
jest.mock('../../src/components/paywall/Paywall', () => {
  const { View, Text } = require('react-native');
  return {
    Paywall: ({ visible }: { visible: boolean }) =>
      visible ? (
        <View testID="paywall">
          <Text>Paywall</Text>
        </View>
      ) : null,
  };
});

// Mock curriculum components
jest.mock('../../src/components/learn/curriculum', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    CurriculumAccordion: ({
      curriculum,
      onArticlePress,
    }: {
      curriculum: Curriculum;
      onArticlePress: (index: number) => void;
    }) => (
      <View testID={`curriculum-${curriculum.id}`}>
        <Text>{curriculum.title}</Text>
        <TouchableOpacity testID={`article-tap-${curriculum.id}`} onPress={() => onArticlePress(0)}>
          <Text>Tap Article</Text>
        </TouchableOpacity>
      </View>
    ),
    CurriculumCreationWizard: ({
      visible,
      onClose,
    }: {
      visible: boolean;
      onClose: () => void;
    }) =>
      visible ? (
        <View testID="curriculum-wizard">
          <Text>Curriculum Wizard</Text>
          <TouchableOpacity testID="wizard-close" onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      ) : null,
  };
});

// Factory for test curricula
const createTestCurriculum = (overrides: Partial<Curriculum> = {}): Curriculum => ({
  id: 'curr_123',
  title: 'Machine Learning Fundamentals',
  goal: 'Learn ML basics',
  articleCount: 5,
  tone: 'explanatory',
  targetWordCount: 750,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  currentArticleIndex: 0,
  completedArticleCount: 0,
  isCompleted: false,
  articles: [],
  ...overrides,
});

// Render helper
const renderWithProviders = () => {
  return render(
    <ThemeProvider>
      <LearnScreen />
    </ThemeProvider>
  );
};

describe('LearnScreen - Curricula Segment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsPremium = true;
    mockCurricula = [];
    mockIsGenerating = false;
  });

  describe('segment switching', () => {
    it('shows Articles segment by default', () => {
      renderWithProviders();
      expect(screen.getByText('+ Generate Article')).toBeTruthy();
    });

    it('switches to Curricula segment on tap', () => {
      renderWithProviders();

      fireEvent.press(screen.getByText('Curricula'));

      expect(screen.getByText('+ Create Curriculum')).toBeTruthy();
    });
  });

  describe('curricula segment', () => {
    it('shows "Create Curriculum" button', () => {
      renderWithProviders();
      fireEvent.press(screen.getByText('Curricula'));

      expect(screen.getByText('+ Create Curriculum')).toBeTruthy();
    });

    it('shows empty state when no curricula', () => {
      mockCurricula = [];
      renderWithProviders();
      fireEvent.press(screen.getByText('Curricula'));

      expect(screen.getByText(/No curricula yet/i)).toBeTruthy();
    });

    it('renders CurriculumAccordion for each curriculum', () => {
      mockCurricula = [
        createTestCurriculum({ id: 'curr_1', title: 'Curriculum One' }),
        createTestCurriculum({ id: 'curr_2', title: 'Curriculum Two' }),
      ];

      renderWithProviders();
      fireEvent.press(screen.getByText('Curricula'));

      expect(screen.getByTestId('curriculum-curr_1')).toBeTruthy();
      expect(screen.getByTestId('curriculum-curr_2')).toBeTruthy();
    });

    it('premium gates curriculum creation', () => {
      mockIsPremium = false;
      renderWithProviders();
      fireEvent.press(screen.getByText('Curricula'));

      fireEvent.press(screen.getByText('+ Create Curriculum'));

      expect(screen.getByTestId('paywall')).toBeTruthy();
    });
  });

  describe('curriculum creation flow', () => {
    it('opens CurriculumCreationWizard on button tap', () => {
      mockIsPremium = true;
      renderWithProviders();
      fireEvent.press(screen.getByText('Curricula'));

      fireEvent.press(screen.getByText('+ Create Curriculum'));

      expect(screen.getByTestId('curriculum-wizard')).toBeTruthy();
    });
  });

  describe('navigation', () => {
    it('navigates to curriculum article reader on article tap', () => {
      mockCurricula = [createTestCurriculum({ id: 'curr_nav_test' })];
      renderWithProviders();
      fireEvent.press(screen.getByText('Curricula'));

      fireEvent.press(screen.getByTestId('article-tap-curr_nav_test'));

      expect(mockRouterPush).toHaveBeenCalledWith('/curriculum/curr_nav_test/article/0');
    });
  });
});
