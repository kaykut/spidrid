/**
 * Tests for Train Sub-Tab Screen
 *
 * Shows pre-generated curriculum articles for RSVP skill training.
 * Tests verify basic rendering, topic grid display, and navigation.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TrainScreen from '../../src/app/(tabs)/content/train';

// Mock expo-router
const mockRouterPush = jest.fn();

jest.mock('expo-router', () => ({
  router: {
    push: (...args: unknown[]) => mockRouterPush(...args),
  },
}));

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
  }),
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

describe('TrainScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<TrainScreen />);
    // Verify component renders by checking for a topic name
    expect(getByText('Science & Discovery')).toBeTruthy();
  });

  it('renders all topic cards', () => {
    const { getByText } = render(<TrainScreen />);
    expect(getByText('Science & Discovery')).toBeTruthy();
    expect(getByText('Health & Medicine')).toBeTruthy();
  });

  it('displays topic descriptions', () => {
    const { getByText } = render(<TrainScreen />);
    expect(getByText('Breakthrough discoveries')).toBeTruthy();
    expect(getByText('Advances in healthcare')).toBeTruthy();
  });

  it('displays topic progress indicator', () => {
    const { getAllByText } = render(<TrainScreen />);
    // Progress shows articlesCompleted/totalArticles
    const progressTexts = getAllByText('3/10');
    expect(progressTexts.length).toBeGreaterThan(0);
  });

  it('navigates to topic page when topic card is pressed', () => {
    const { getByText } = render(<TrainScreen />);
    const topicCard = getByText('Science & Discovery');

    fireEvent.press(topicCard);

    expect(mockRouterPush).toHaveBeenCalledWith('/topic/science-discovery');
  });

  it('navigates to correct topic for each card', () => {
    const { getByText } = render(<TrainScreen />);

    // Press Health & Medicine topic
    fireEvent.press(getByText('Health & Medicine'));
    expect(mockRouterPush).toHaveBeenCalledWith('/topic/health-medicine');
  });

  it('displays topic icons', () => {
    const { getByText } = render(<TrainScreen />);
    expect(getByText('🔬')).toBeTruthy();
    expect(getByText('💊')).toBeTruthy();
  });
});
