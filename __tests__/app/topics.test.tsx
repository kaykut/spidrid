/**
 * Tests for Topics Browser Screen
 *
 * Sub-screen accessible from Journey tab's "Browse All Topics" button.
 * Shows topic grid with progress indicators.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TopicsScreen from '../../src/app/topics';

// Mock expo-router
const mockRouterPush = jest.fn();
const mockRouterBack = jest.fn();

jest.mock('expo-router', () => ({
  router: {
    push: (...args: unknown[]) => mockRouterPush(...args),
    back: (...args: unknown[]) => mockRouterBack(...args),
  },
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
  };
});

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
      articlesCompleted: 5,
      totalArticles: 13,
      averageScore: 88,
    }),
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
    {
      id: 'history-civilization',
      name: 'History & Civilization',
      description: 'Journey through time',
      icon: '🏛️',
      color: '#fab005',
    },
  ],
}));

// Mock interests data with mutable return value
let mockAllowedTopicIds: string[] = [];
jest.mock('../../src/data/interests', () => ({
  getCurriculumTopicsForInterests: () => mockAllowedTopicIds,
}));

describe('TopicsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to default values
    mockSelectedInterests = [];
    mockAllowedTopicIds = [];
  });

  it('renders without crashing', () => {
    const { getByText } = render(<TopicsScreen />);
    expect(getByText('Topics')).toBeTruthy();
  });

  it('displays the page title', () => {
    const { getByText } = render(<TopicsScreen />);
    expect(getByText('Topics')).toBeTruthy();
  });

  it('renders the back button icon', () => {
    const { getByTestId } = render(<TopicsScreen />);
    expect(getByTestId('icon-chevron-back')).toBeTruthy();
  });

  it('navigates back when back button is pressed', () => {
    const { getByTestId } = render(<TopicsScreen />);
    // Find the back button by its parent touchable - the icon is inside a TouchableOpacity
    const backIcon = getByTestId('icon-chevron-back');
    const backButton = backIcon.parent?.parent;

    if (backButton) {
      fireEvent.press(backButton);
      expect(mockRouterBack).toHaveBeenCalled();
    }
  });

  it('renders topic cards', () => {
    const { getByText } = render(<TopicsScreen />);
    expect(getByText('Science & Discovery')).toBeTruthy();
    expect(getByText('Health & Medicine')).toBeTruthy();
    expect(getByText('History & Civilization')).toBeTruthy();
  });

  it('navigates to topic page when topic card is pressed', () => {
    const { getByText } = render(<TopicsScreen />);
    const topicCard = getByText('Science & Discovery');

    fireEvent.press(topicCard);

    expect(mockRouterPush).toHaveBeenCalledWith('/topic/science-discovery');
  });

  it('displays topic descriptions', () => {
    const { getByText } = render(<TopicsScreen />);
    expect(getByText('Breakthrough discoveries')).toBeTruthy();
    expect(getByText('Advances in healthcare')).toBeTruthy();
  });

  it('displays topic icons/emojis', () => {
    const { getAllByText } = render(<TopicsScreen />);
    // Topic emojis should be rendered
    expect(getAllByText('🔬').length).toBeGreaterThan(0);
    expect(getAllByText('💊').length).toBeGreaterThan(0);
  });

  it('displays topic progress indicator', () => {
    const { getAllByText } = render(<TopicsScreen />);
    // Progress shows articlesCompleted/totalArticles
    const progressTexts = getAllByText('5/13');
    expect(progressTexts.length).toBeGreaterThan(0);
  });

  it('renders the EdgeFadeScrollView wrapper', () => {
    const { getByTestId } = render(<TopicsScreen />);
    expect(getByTestId('edge-fade-scroll-view')).toBeTruthy();
  });

  it('applies theme background color to container', () => {
    const { getByTestId } = render(<TopicsScreen />);
    const safeArea = getByTestId('safe-area-view');
    expect(safeArea.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: mockTheme.backgroundColor }),
      ])
    );
  });
});

describe('TopicsScreen navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('navigates to health topic when Health & Medicine card is pressed', () => {
    const { getByText } = render(<TopicsScreen />);
    const topicCard = getByText('Health & Medicine');

    fireEvent.press(topicCard);

    expect(mockRouterPush).toHaveBeenCalledWith('/topic/health-medicine');
  });

  it('navigates to history topic when History & Civilization card is pressed', () => {
    const { getByText } = render(<TopicsScreen />);
    const topicCard = getByText('History & Civilization');

    fireEvent.press(topicCard);

    expect(mockRouterPush).toHaveBeenCalledWith('/topic/history-civilization');
  });
});

describe('TopicsScreen topic filtering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to default values
    mockSelectedInterests = [];
    mockAllowedTopicIds = [];
  });

  it('shows all topics when no interests are selected', () => {
    const { getByText } = render(<TopicsScreen />);
    expect(getByText('Science & Discovery')).toBeTruthy();
    expect(getByText('Health & Medicine')).toBeTruthy();
    expect(getByText('History & Civilization')).toBeTruthy();
  });

  it('filters topics when interests are selected', () => {
    // Set up mocks to simulate selected interests
    mockSelectedInterests = ['science'];
    mockAllowedTopicIds = ['science-discovery'];

    const { getByText, queryByText } = render(<TopicsScreen />);

    // Should show the filtered topic
    expect(getByText('Science & Discovery')).toBeTruthy();

    // Other topics should not appear
    expect(queryByText('Health & Medicine')).toBeNull();
    expect(queryByText('History & Civilization')).toBeNull();
  });
});

