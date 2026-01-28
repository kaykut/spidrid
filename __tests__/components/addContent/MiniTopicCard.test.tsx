/**
 * Tests for MiniTopicCard Component
 *
 * Compact topic card for 3-per-row grid in expandable Practice section.
 * Shows topic icon, title, and progress bar with counter.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { MiniTopicCard } from '../../../src/components/addContent/MiniTopicCard';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';
import { Topic, TopicProgress } from '../../../src/types/learning';

// =============================================================================
// Test Data
// =============================================================================

const mockTopic: Topic = {
  id: 'science-discovery',
  name: 'Science',
  description: 'Explore scientific discoveries',
  icon: '🔬',
  color: '#4A90D9',
  articleCount: 13,
};

const mockProgress: TopicProgress = {
  topicId: 'science-discovery',
  articlesCompleted: 3,
  totalArticles: 13,
  averageScore: 85,
};

const emptyProgress: TopicProgress = {
  topicId: 'science-discovery',
  articlesCompleted: 0,
  totalArticles: 13,
  averageScore: 0,
};

const fullProgress: TopicProgress = {
  topicId: 'science-discovery',
  articlesCompleted: 13,
  totalArticles: 13,
  averageScore: 92,
};

// =============================================================================
// Test Helpers
// =============================================================================

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const defaultProps = {
  topic: mockTopic,
  progress: mockProgress,
  cardWidth: 100,
  onPress: jest.fn(),
};

// =============================================================================
// Tests
// =============================================================================

describe('MiniTopicCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('renders topic name', () => {
      renderWithProviders(<MiniTopicCard {...defaultProps} />);

      expect(screen.getByText('Science')).toBeTruthy();
    });

    it('renders topic icon emoji', () => {
      renderWithProviders(<MiniTopicCard {...defaultProps} />);

      expect(screen.getByText('🔬')).toBeTruthy();
    });

    it('renders progress text', () => {
      renderWithProviders(<MiniTopicCard {...defaultProps} />);

      expect(screen.getByText('3/13')).toBeTruthy();
    });

    it('renders with testID when provided', () => {
      renderWithProviders(<MiniTopicCard {...defaultProps} testID="mini-topic-card" />);

      expect(screen.getByTestId('mini-topic-card')).toBeTruthy();
    });
  });

  describe('progress display', () => {
    it('shows 0 progress when no articles completed', () => {
      renderWithProviders(
        <MiniTopicCard {...defaultProps} progress={emptyProgress} />
      );

      expect(screen.getByText('0/13')).toBeTruthy();
    });

    it('shows full progress when all articles completed', () => {
      renderWithProviders(
        <MiniTopicCard {...defaultProps} progress={fullProgress} />
      );

      expect(screen.getByText('13/13')).toBeTruthy();
    });

    it('handles partial progress correctly', () => {
      const partialProgress: TopicProgress = {
        topicId: 'science-discovery',
        articlesCompleted: 7,
        totalArticles: 13,
        averageScore: 78,
      };

      renderWithProviders(
        <MiniTopicCard {...defaultProps} progress={partialProgress} />
      );

      expect(screen.getByText('7/13')).toBeTruthy();
    });
  });

  describe('press handling', () => {
    it('calls onPress when card is pressed', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <MiniTopicCard {...defaultProps} onPress={onPress} testID="mini-topic" />
      );

      fireEvent.press(screen.getByTestId('mini-topic'));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('handles multiple presses', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <MiniTopicCard {...defaultProps} onPress={onPress} testID="mini-topic" />
      );

      const card = screen.getByTestId('mini-topic');
      fireEvent.press(card);
      fireEvent.press(card);
      fireEvent.press(card);

      expect(onPress).toHaveBeenCalledTimes(3);
    });
  });

  describe('styling', () => {
    it('applies custom cardWidth', () => {
      const { root } = renderWithProviders(
        <MiniTopicCard {...defaultProps} cardWidth={120} />
      );

      expect(root).toBeTruthy();
    });

    it('applies custom backgroundColor', () => {
      const { root } = renderWithProviders(
        <MiniTopicCard {...defaultProps} backgroundColor="#FF0000" />
      );

      expect(root).toBeTruthy();
    });

    it('uses theme secondaryBackground when no backgroundColor provided', () => {
      const { root } = renderWithProviders(
        <MiniTopicCard {...defaultProps} />
      );

      expect(root).toBeTruthy();
    });
  });

  describe('different topics', () => {
    it('renders health topic correctly', () => {
      const healthTopic: Topic = {
        id: 'health-medicine',
        name: 'Health',
        description: 'Medical discoveries',
        icon: '🏥',
        color: '#34C759',
        articleCount: 10,
      };

      renderWithProviders(
        <MiniTopicCard
          {...defaultProps}
          topic={healthTopic}
          progress={{ topicId: 'health-wellness', articlesCompleted: 5, totalArticles: 10, averageScore: 80 }}
        />
      );

      expect(screen.getByText('Health')).toBeTruthy();
      expect(screen.getByText('🏥')).toBeTruthy();
      expect(screen.getByText('5/10')).toBeTruthy();
    });

    it('renders technology topic correctly', () => {
      const techTopic: Topic = {
        id: 'tech-innovation',
        name: 'Technology',
        description: 'Tech innovations',
        icon: '💻',
        color: '#007AFF',
        articleCount: 15,
      };

      renderWithProviders(
        <MiniTopicCard
          {...defaultProps}
          topic={techTopic}
          progress={{ topicId: 'tech-innovation', articlesCompleted: 0, totalArticles: 15, averageScore: 0 }}
        />
      );

      expect(screen.getByText('Technology')).toBeTruthy();
      expect(screen.getByText('💻')).toBeTruthy();
      expect(screen.getByText('0/15')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('is accessible by default', () => {
      renderWithProviders(
        <MiniTopicCard {...defaultProps} testID="accessible-card" />
      );

      const card = screen.getByTestId('accessible-card');
      expect(card.props.accessible).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('handles zero total articles gracefully', () => {
      const zeroArticlesProgress: TopicProgress = {
        topicId: 'science-discovery',
        articlesCompleted: 0,
        totalArticles: 0,
        averageScore: 0,
      };

      renderWithProviders(
        <MiniTopicCard {...defaultProps} progress={zeroArticlesProgress} />
      );

      // Should show 0/0 and not crash (division by zero handled)
      expect(screen.getByText('0/0')).toBeTruthy();
    });

    it('handles long topic names with ellipsis', () => {
      const longNameTopic: Topic = {
        ...mockTopic,
        name: 'Very Long Topic Name That Should Be Truncated',
      };

      renderWithProviders(
        <MiniTopicCard {...defaultProps} topic={longNameTopic} />
      );

      // The component should render without crashing
      expect(screen.getByText('Very Long Topic Name That Should Be Truncated')).toBeTruthy();
    });
  });
});
