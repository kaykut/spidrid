/**
 * Tests for Journey Tab Screen
 *
 * Shows the unified journey progress with vertical milestone path.
 * Tests verify basic rendering and stat display.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import JourneyScreen from '../../src/app/(tabs)/journey';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
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

// Mock journeyStore
jest.mock('../../src/store/journeyStore', () => ({
  useJourneyStore: () => ({
    certProgress: {
      speed_reader: { examPassed: false },
      velocity_master: { examPassed: false },
      transcendent: { examPassed: false },
    },
    avgWpmLast3: 250,
    avgCompLast5: 85,
  }),
}));

// Mock learningStore
jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    articleProgress: {},
    getHighestWPM: () => 300,
  }),
}));

// Mock StatsSummary component
jest.mock('../../src/components/certifications', () => ({
  StatsSummary: ({
    articlesRead,
    totalWords,
    averageAccuracy,
    bestWPM,
    tiersEarned,
  }: {
    articlesRead: number;
    totalWords: number;
    averageAccuracy: number;
    bestWPM: number;
    tiersEarned: number;
  }) => {
    const { View, Text } = require('react-native');
    return (
      <View testID="stats-summary">
        <Text testID="articles-read">{articlesRead}</Text>
        <Text testID="total-words">{totalWords}</Text>
        <Text testID="average-accuracy">{averageAccuracy}</Text>
        <Text testID="best-wpm">{bestWPM}</Text>
        <Text testID="tiers-earned">{tiersEarned}</Text>
      </View>
    );
  },
}));

// Mock VerticalProgressPath component
jest.mock('../../src/components/journey/VerticalProgressPath', () => ({
  VerticalProgressPath: ({
    avgWpm,
    avgComp,
  }: {
    avgWpm: number;
    avgComp: number;
    certProgress: object;
  }) => {
    const { View, Text } = require('react-native');
    return (
      <View testID="vertical-progress-path">
        <Text testID="avg-wpm">{avgWpm}</Text>
        <Text testID="avg-comp">{avgComp}</Text>
      </View>
    );
  },
}));

// Mock certification tier definitions
jest.mock('../../src/types/certificates', () => ({
  CERTIFICATION_TIER_DEFINITIONS: [
    { tier: 'speed_reader', name: 'Speed Reader' },
    { tier: 'velocity_master', name: 'Velocity Master' },
    { tier: 'transcendent', name: 'Transcendent' },
  ],
}));

describe('JourneyScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<JourneyScreen />);
    expect(getByText('Journey')).toBeTruthy();
  });

  it('displays the page title', () => {
    const { getByText } = render(<JourneyScreen />);
    expect(getByText('Journey')).toBeTruthy();
  });

  it('renders the StatsSummary component', () => {
    const { getByTestId } = render(<JourneyScreen />);
    expect(getByTestId('stats-summary')).toBeTruthy();
  });

  it('renders the VerticalProgressPath component', () => {
    const { getByTestId } = render(<JourneyScreen />);
    expect(getByTestId('vertical-progress-path')).toBeTruthy();
  });

  it('displays the info card title', () => {
    const { getByText } = render(<JourneyScreen />);
    expect(getByText('How Certification Works')).toBeTruthy();
  });

  it('displays certification instructions', () => {
    const { getByText } = render(<JourneyScreen />);
    expect(getByText(/Build your Velocity Score/)).toBeTruthy();
  });

  it('passes correct avgWpm to VerticalProgressPath', () => {
    const { getByTestId } = render(<JourneyScreen />);
    const avgWpmText = getByTestId('avg-wpm');
    expect(avgWpmText.props.children).toBe(250);
  });

  it('passes correct avgComp to VerticalProgressPath', () => {
    const { getByTestId } = render(<JourneyScreen />);
    const avgCompText = getByTestId('avg-comp');
    expect(avgCompText.props.children).toBe(85);
  });

  it('calculates tiers earned correctly when none are passed', () => {
    const { getByTestId } = render(<JourneyScreen />);
    const tiersEarned = getByTestId('tiers-earned');
    expect(tiersEarned.props.children).toBe(0);
  });

  it('applies theme background color to container', () => {
    const { getByTestId } = render(<JourneyScreen />);
    const safeArea = getByTestId('safe-area-view');
    expect(safeArea.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: mockTheme.backgroundColor }),
      ])
    );
  });
});

describe('JourneyScreen with completed articles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes bestWPM from learningStore', () => {
    const { getByTestId } = render(<JourneyScreen />);
    const bestWpm = getByTestId('best-wpm');
    expect(bestWpm.props.children).toBe(300);
  });
});

describe('JourneyScreen with article progress data', () => {
  beforeAll(() => {
    // Reset and re-mock learningStore with actual article progress
    jest.resetModules();
    jest.doMock('../../src/store/learningStore', () => ({
      useLearningStore: () => ({
        articleProgress: {
          'article-1': {
            articleId: 'article-1',
            completed: true,
            comprehensionScore: 85,
            highestWPM: 280,
          },
          'article-2': {
            articleId: 'article-2',
            completed: true,
            comprehensionScore: 90,
            highestWPM: 300,
          },
          'article-3': {
            articleId: 'article-3',
            completed: false,
            comprehensionScore: 0,
            highestWPM: 0,
          },
        },
        getHighestWPM: () => 300,
      }),
    }));
  });

  afterAll(() => {
    jest.resetModules();
  });

  it('calculates articlesRead correctly', () => {
    // This test verifies the reduce/filter logic paths are executed
     
    const JourneyScreenModule = require('../../src/app/(tabs)/journey');
    const { getByTestId } = render(<JourneyScreenModule.default />);
    const articlesRead = getByTestId('articles-read');
    // With doMock, should count completed articles (2)
    expect(articlesRead.props.children).toBe(2);
  });

  it('calculates totalWords correctly', () => {
     
    const JourneyScreenModule = require('../../src/app/(tabs)/journey');
    const { getByTestId } = render(<JourneyScreenModule.default />);
    const totalWords = getByTestId('total-words');
    // 2 completed articles * 1000 words each = 2000
    expect(totalWords.props.children).toBe(2000);
  });

  it('calculates averageAccuracy correctly', () => {
     
    const JourneyScreenModule = require('../../src/app/(tabs)/journey');
    const { getByTestId } = render(<JourneyScreenModule.default />);
    const avgAccuracy = getByTestId('average-accuracy');
    // (85 + 90) / 2 = 87.5, rounded = 88
    expect(avgAccuracy.props.children).toBe(88);
  });
});
