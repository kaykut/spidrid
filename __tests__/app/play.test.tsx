/**
 * Tests for Play Tab Screen
 *
 * This is a placeholder screen that shows when no content is playing.
 * Tests verify basic rendering and navigation.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import PlayScreen from '../../src/app/(tabs)/play';

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

// Mock playlistStore
jest.mock('../../src/store/playlistStore', () => ({
  usePlaylistStore: () => ({
    nowPlaying: null,
    updateProgress: jest.fn(),
    stopPlayback: jest.fn(),
  }),
}));

// Mock learningStore
jest.mock('../../src/store/learningStore', () => ({
  useLearningStore: () => ({
    completeArticle: jest.fn(),
    currentWPM: 250,
    setCurrentWPM: jest.fn(),
  }),
}));

// Mock journeyStore
jest.mock('../../src/store/journeyStore', () => ({
  useJourneyStore: () => ({
    recordSession: jest.fn(),
  }),
}));

// Mock playlist components
jest.mock('../../src/components/playlist', () => {
  const { View, Text } = require('react-native');
  return {
    NowPlayingBar: ({ item }: { item: unknown }) => (
      <View testID="now-playing-bar">
        <Text>{item ? 'Playing' : 'No content loaded'}</Text>
      </View>
    ),
    PlaylistBottomSheet: () => <View testID="playlist-bottom-sheet" />,
  };
});

// Mock RSVP components
jest.mock('../../src/components/rsvp/RSVPWord', () => ({
  RSVPWord: () => null,
}));

jest.mock('../../src/components/rsvp/ChapterPauseOverlay', () => ({
  ChapterPauseOverlay: () => null,
}));

// Mock quiz components
jest.mock('../../src/components/quiz', () => ({
  QuestionRenderer: () => null,
  QuestionAnswer: null,
}));

// Mock controls
jest.mock('../../src/components/controls/PlaybackControls', () => ({
  PlaybackControls: () => null,
}));

// Mock RSVP engine hook
jest.mock('../../src/hooks/useRSVPEngine', () => ({
  useRSVPEngine: () => ({
    currentWord: null,
    isPlaying: false,
    wpm: 250,
    progress: 0,
    currentIndex: 0,
    totalWords: 0,
    chapterPaused: null,
    toggle: jest.fn(),
    setWPM: jest.fn(),
    reset: jest.fn(),
    rewindSentence: jest.fn(),
    skipSentence: jest.fn(),
    resumeFromChapter: jest.fn(),
  }),
}));

// Mock textProcessor
jest.mock('../../src/services/textProcessor', () => ({
  processText: () => [],
}));

// Mock contentResolver
jest.mock('../../src/utils/contentResolver', () => ({
  resolveContent: () => null,
}));

// Mock quiz utils
jest.mock('../../src/utils/calculateQuizScore', () => ({
  isAnswerCorrect: () => false,
}));

describe('PlayScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<PlayScreen />);
    expect(getByText('Read')).toBeTruthy();
  });

  it('displays the page title', () => {
    const { getByText } = render(<PlayScreen />);
    expect(getByText('Read')).toBeTruthy();
  });

  it('displays the empty state title', () => {
    const { getByText } = render(<PlayScreen />);
    expect(getByText('Ready to Read')).toBeTruthy();
  });

  it('displays the empty state description', () => {
    const { getByText } = render(<PlayScreen />);
    expect(getByText(/Add content from Training or Reading to begin/)).toBeTruthy();
  });

  it('applies theme background color to container', () => {
    const { getByTestId } = render(<PlayScreen />);
    const safeArea = getByTestId('safe-area-view');
    expect(safeArea.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: mockTheme.backgroundColor }),
      ])
    );
  });
});
