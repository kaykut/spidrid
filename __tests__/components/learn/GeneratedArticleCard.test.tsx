/**
 * Tests for GeneratedArticleCard Component.
 *
 * Tests display logic: title, topic, tone, stats, and completion state.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { GeneratedArticleCard } from '../../../src/components/learn/GeneratedArticleCard';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';
import { GeneratedArticle } from '../../../src/types/generated';

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || `icon-${name}`}>{name}</Text>
    ),
  };
});

const createArticle = (overrides: Partial<GeneratedArticle> = {}): GeneratedArticle => ({
  id: 'test-article-1',
  topic: 'How black holes form',
  targetDuration: 3,
  tone: 'explanatory',
  title: 'The Birth of Black Holes',
  content: 'Article content here...',
  wordCount: 750,
  questions: [],
  status: 'complete',
  generatedAt: new Date('2024-03-15').getTime(),
  completed: false,
  attemptCount: 0,
  ...overrides,
});

const renderWithProviders = (article: GeneratedArticle, onPress = jest.fn()) => {
  return render(
    <ThemeProvider>
      <GeneratedArticleCard article={article} onPress={onPress} />
    </ThemeProvider>
  );
};

describe('GeneratedArticleCard', () => {
  describe('basic display', () => {
    it('displays the article title', () => {
      renderWithProviders(createArticle({ title: 'Understanding Quantum Physics' }));

      expect(screen.getByText('Understanding Quantum Physics')).toBeTruthy();
    });

    it('displays the topic in quotes', () => {
      renderWithProviders(createArticle({ topic: 'Machine learning basics' }));

      expect(screen.getByText('"Machine learning basics"')).toBeTruthy();
    });

    it('displays the word count', () => {
      renderWithProviders(createArticle({ wordCount: 1200 }));

      expect(screen.getByText('1200 words')).toBeTruthy();
    });
  });

  describe('tone display', () => {
    it('displays explanatory tone with emoji', () => {
      renderWithProviders(createArticle({ tone: 'explanatory' }));

      expect(screen.getByText('📚')).toBeTruthy();
      expect(screen.getByText('Explanatory')).toBeTruthy();
    });

    it('displays robotic tone with emoji', () => {
      renderWithProviders(createArticle({ tone: 'robotic' }));

      expect(screen.getByText('🤖')).toBeTruthy();
      expect(screen.getByText('Robotic')).toBeTruthy();
    });

    it('displays sarcastic tone with emoji', () => {
      renderWithProviders(createArticle({ tone: 'sarcastic' }));

      expect(screen.getByText('😏')).toBeTruthy();
      expect(screen.getByText('Sarcastic')).toBeTruthy();
    });

    it('displays storytelling tone with emoji', () => {
      renderWithProviders(createArticle({ tone: 'storytelling' }));

      expect(screen.getByText('📖')).toBeTruthy();
      expect(screen.getByText('Storytelling')).toBeTruthy();
    });

    it('displays analogical tone with emoji', () => {
      renderWithProviders(createArticle({ tone: 'analogical' }));

      expect(screen.getByText('🔗')).toBeTruthy();
      expect(screen.getByText('Analogical')).toBeTruthy();
    });
  });

  describe('completion state', () => {
    it('shows checkmark badge when completed', () => {
      renderWithProviders(createArticle({ completed: true, comprehensionScore: 80 }));

      expect(screen.getByText('checkmark-circle')).toBeTruthy();
    });

    it('does not show checkmark badge when not completed', () => {
      renderWithProviders(createArticle({ completed: false }));

      expect(screen.queryByText('checkmark-circle')).toBeNull();
    });

    it('shows stats when completed with comprehension score', () => {
      renderWithProviders(
        createArticle({
          completed: true,
          comprehensionScore: 85,
          highestWPM: 320,
        })
      );

      expect(screen.getByText('320 WPM')).toBeTruthy();
      expect(screen.getByText('85%')).toBeTruthy();
    });

    it('does not show stats when not completed', () => {
      renderWithProviders(
        createArticle({
          completed: false,
          comprehensionScore: undefined,
          highestWPM: undefined,
        })
      );

      expect(screen.queryByText(/WPM/)).toBeNull();
      expect(screen.queryByText(/%$/)).toBeNull();
    });

    it('does not show stats when completed but no comprehension score', () => {
      renderWithProviders(
        createArticle({
          completed: true,
          comprehensionScore: undefined,
        })
      );

      // The stats section only renders when BOTH completed AND comprehensionScore exists
      expect(screen.queryByText('speedometer-outline')).toBeNull();
    });
  });

  describe('interactions', () => {
    it('calls onPress when card is pressed', () => {
      const onPress = jest.fn();
      renderWithProviders(createArticle(), onPress);

      const card = screen.getByText('The Birth of Black Holes');
      fireEvent.press(card);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('calls onPress when pressing any part of the card', () => {
      const onPress = jest.fn();
      renderWithProviders(createArticle({ topic: 'Press anywhere' }), onPress);

      // Press the topic text
      const topic = screen.getByText('"Press anywhere"');
      fireEvent.press(topic);

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('date formatting', () => {
    it('displays formatted date', () => {
      // Create article with specific date
      const article = createArticle({
        generatedAt: new Date('2024-06-15').getTime(),
      });

      renderWithProviders(article);

      // Should show formatted date (locale-dependent, but should contain month and day)
      // Jun 15 or 15 Jun depending on locale
      expect(screen.getByText(/Jun.?15|15.?Jun/i)).toBeTruthy();
    });
  });

  describe('different articles', () => {
    it('renders first article correctly', () => {
      renderWithProviders(
        createArticle({
          title: 'Article One',
          topic: 'Topic One',
          tone: 'robotic',
          wordCount: 500,
        })
      );

      expect(screen.getByText('Article One')).toBeTruthy();
      expect(screen.getByText('"Topic One"')).toBeTruthy();
      expect(screen.getByText('Robotic')).toBeTruthy();
      expect(screen.getByText('500 words')).toBeTruthy();
    });

    it('renders second article correctly', () => {
      renderWithProviders(
        createArticle({
          title: 'Article Two',
          topic: 'Topic Two',
          tone: 'storytelling',
          wordCount: 1000,
        })
      );

      expect(screen.getByText('Article Two')).toBeTruthy();
      expect(screen.getByText('"Topic Two"')).toBeTruthy();
      expect(screen.getByText('Storytelling')).toBeTruthy();
      expect(screen.getByText('1000 words')).toBeTruthy();
    });
  });
});
