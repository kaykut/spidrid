/**
 * Tests for Train Sub-Tab Screen
 *
 * Shows pre-generated curriculum articles for RSVP skill training.
 * Tests verify basic rendering, metrics display, and navigation.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TrainScreen from '../../src/app/(tabs)/content/train';

// Mock expo-router
const mockRouterPush = jest.fn();
const mockRouterBack = jest.fn();

jest.mock('expo-router', () => ({
  router: {
    push: (...args: unknown[]) => mockRouterPush(...args),
    back: (...args: unknown[]) => mockRouterBack(...args),
  },
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <View style={style} testID="safe-area-view">{children}</View>
    ),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, style }: { children?: React.ReactNode; style?: object }) => (
      <View style={style} testID="linear-gradient">{children}</View>
    ),
  };
});

// Mock ThemeProvider
const mockTheme = {
  id: 'dark',
  name: 'Dark',
  backgroundColor: '#0a0a0a',
  textColor: '#ffffff',
  orpColor: '#ff6b6b',
  crosshairColor: '#333333',
  accentColor: '#00D4AA',
  secondaryBackground: '#1a1a1a',
};

jest.mock('../../src/components/common/ThemeProvider', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: jest.fn(),
  }),
}));

// Mock learningStore
jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    getTopicProgress: () => ({
      topicId: 'test-topic',
      articlesCompleted: 3,
      totalArticles: 10,
      averageScore: 85,
    }),
    getRecentPerformance: () => ({
      averageWPM: 280,
      averageAccuracy: 82,
      articleCount: 5,
    }),
    getHighestWPM: () => 350,
  }),
}));

// Mock onboardingStore with mutable selected interests
let mockSelectedInterests: string[] = [];
jest.mock('../../src/store/onboardingStore', () => ({
  useOnboardingStore: () => ({
    get selectedInterests() {
      return mockSelectedInterests;
    },
  }),
}));

// Mock EdgeFadeScrollView
jest.mock('../../src/components/common/EdgeFadeScrollView', () => ({
  EdgeFadeScrollView: ({
    children,
    contentContainerStyle,
  }: {
    children: React.ReactNode;
    contentContainerStyle?: object;
  }) => {
    const { ScrollView } = require('react-native');
    return (
      <ScrollView testID="edge-fade-scroll-view" contentContainerStyle={contentContainerStyle}>
        {children}
      </ScrollView>
    );
  },
}));

// Mock MetricsPanel component
jest.mock('../../src/components/journey/MetricsPanel', () => ({
  MetricsPanel: ({
    avgWpm,
    avgComprehension,
    bestWpmAt80,
  }: {
    avgWpm: number;
    avgComprehension: number;
    streakDays: number;
    bestWpmAt80: number;
    hideStreak?: boolean;
  }) => {
    const { View, Text } = require('react-native');
    return (
      <View testID="metrics-panel">
        <Text testID="metrics-avg-wpm">{avgWpm}</Text>
        <Text testID="metrics-avg-comp">{avgComprehension}</Text>
        <Text testID="metrics-best-wpm">{bestWpmAt80}</Text>
      </View>
    );
  },
}));

// Mock curriculum data with minimal topics
jest.mock('../../src/data/curriculum', () => ({
  TOPICS: [
    {
      id: 'science-discovery',
      name: 'Science & Discovery',
      description: 'Breakthrough discoveries',
      icon: '🔬',
      color: '#4dabf7',
    },
    {
      id: 'health-medicine',
      name: 'Health & Medicine',
      description: 'Advances in healthcare',
      icon: '💊',
      color: '#ff6b6b',
    },
  ],
}));

// Mock interests data with mutable return value
let mockAllowedTopicIds: string[] = [];
jest.mock('../../src/data/interests', () => ({
  getCurriculumTopicsForInterests: () => mockAllowedTopicIds,
}));

describe('TrainScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to default values
    mockSelectedInterests = [];
    mockAllowedTopicIds = [];
  });

  it('renders without crashing', () => {
    const { getByText } = render(<TrainScreen />);
    expect(getByText('Train')).toBeTruthy();
  });

  it('displays the page title', () => {
    const { getByText } = render(<TrainScreen />);
    expect(getByText('Train')).toBeTruthy();
  });

  it('renders the MetricsPanel component', () => {
    const { getByTestId } = render(<TrainScreen />);
    expect(getByTestId('metrics-panel')).toBeTruthy();
  });

  it('displays the demo button', () => {
    const { getByText } = render(<TrainScreen />);
    expect(getByText('Try RSVP Demo')).toBeTruthy();
  });

  it('navigates to demo reader when demo button is pressed', () => {
    const { getByText } = render(<TrainScreen />);
    const demoButton = getByText('Try RSVP Demo');

    fireEvent.press(demoButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/reader/demo');
  });

  it('displays the Topics section title', () => {
    const { getByText } = render(<TrainScreen />);
    expect(getByText('Topics')).toBeTruthy();
  });

  it('renders topic cards', () => {
    const { getByText } = render(<TrainScreen />);
    expect(getByText('Science & Discovery')).toBeTruthy();
    expect(getByText('Health & Medicine')).toBeTruthy();
  });

  it('navigates to topic page when topic card is pressed', () => {
    const { getByText } = render(<TrainScreen />);
    const topicCard = getByText('Science & Discovery');

    fireEvent.press(topicCard);

    expect(mockRouterPush).toHaveBeenCalledWith('/topic/science-discovery');
  });

  it('displays topic descriptions', () => {
    const { getByText } = render(<TrainScreen />);
    expect(getByText('Breakthrough discoveries')).toBeTruthy();
  });

  it('displays topic progress indicator', () => {
    const { getAllByText } = render(<TrainScreen />);
    // Progress shows articlesCompleted/totalArticles
    const progressTexts = getAllByText('3/10');
    expect(progressTexts.length).toBeGreaterThan(0);
  });

  it('passes correct avgWpm to MetricsPanel', () => {
    const { getByTestId } = render(<TrainScreen />);
    const avgWpm = getByTestId('metrics-avg-wpm');
    expect(avgWpm.props.children).toBe(280);
  });

  it('passes correct avgComprehension to MetricsPanel', () => {
    const { getByTestId } = render(<TrainScreen />);
    const avgComp = getByTestId('metrics-avg-comp');
    expect(avgComp.props.children).toBe(82);
  });

  it('passes correct bestWpm to MetricsPanel', () => {
    const { getByTestId } = render(<TrainScreen />);
    const bestWpm = getByTestId('metrics-best-wpm');
    expect(bestWpm.props.children).toBe(350);
  });

  it('renders the EdgeFadeScrollView wrapper', () => {
    const { getByTestId } = render(<TrainScreen />);
    expect(getByTestId('edge-fade-scroll-view')).toBeTruthy();
  });
});

describe('TrainScreen topic filtering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to default values
    mockSelectedInterests = [];
    mockAllowedTopicIds = [];
  });

  it('filters topics when interests are selected', () => {
    // Set up mocks to simulate selected interests
    mockSelectedInterests = ['science'];
    mockAllowedTopicIds = ['science-discovery'];

    const { getByText, queryByText } = render(<TrainScreen />);

    // Should show the filtered topic
    expect(getByText('Science & Discovery')).toBeTruthy();

    // Health & Medicine should not appear because it's not in allowedTopicIds
    expect(queryByText('Health & Medicine')).toBeNull();
  });

  it('shows all topics when no interests are selected', () => {
    // Reset to no interests
    mockSelectedInterests = [];
    mockAllowedTopicIds = [];

    const { getByText } = render(<TrainScreen />);

    // Both topics should be visible
    expect(getByText('Science & Discovery')).toBeTruthy();
    expect(getByText('Health & Medicine')).toBeTruthy();
  });
});

