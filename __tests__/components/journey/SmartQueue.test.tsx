/**
 * Tests for SmartQueue Component.
 *
 * Displays the primary article recommendation with expandable additional options
 * including stretch goal and continue topic cards.
 * Part of the Detailed Journey view (PRD section 5.4).
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { SmartQueue } from '../../../src/components/journey/SmartQueue';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';
import { ArticleRecommendation, UserState } from '../../../src/types/journey';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Mock recommendation data
const mockPrimaryRecommendation: ArticleRecommendation = {
  articleId: 'article-1',
  topicId: 'topic-1',
  title: 'Introduction to Speed Reading',
  topicName: 'Fundamentals',
  wordCount: 1200,
  estimatedMinutes: 4,
  suggestedWpm: 300,
  reason: 'new_topic',
};

const mockStretchRecommendation: ArticleRecommendation = {
  articleId: 'article-1',
  topicId: 'topic-1',
  title: 'Introduction to Speed Reading',
  topicName: 'Fundamentals',
  wordCount: 1200,
  estimatedMinutes: 3,
  suggestedWpm: 400,
  reason: 'stretch_goal',
};

const mockContinueRecommendation: ArticleRecommendation = {
  articleId: 'article-2',
  topicId: 'topic-1',
  title: 'Advanced Techniques',
  topicName: 'Fundamentals',
  wordCount: 1500,
  estimatedMinutes: 5,
  suggestedWpm: 300,
  reason: 'continue_topic',
};

// Default props for testing
const defaultProps = {
  primaryRecommendation: mockPrimaryRecommendation,
  stretchRecommendation: mockStretchRecommendation,
  continueTopicRecommendation: mockContinueRecommendation,
  userState: 'neutral' as UserState,
  onSelectArticle: jest.fn(),
  expanded: false,
  onToggleExpand: jest.fn(),
};

describe('SmartQueue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('renders UP NEXT badge', () => {
      renderWithProviders(<SmartQueue {...defaultProps} />);

      expect(screen.getByText('UP NEXT')).toBeTruthy();
    });

    it('renders primary recommendation title', () => {
      renderWithProviders(<SmartQueue {...defaultProps} />);

      expect(screen.getByText('Introduction to Speed Reading')).toBeTruthy();
    });

    it('renders primary recommendation WPM', () => {
      renderWithProviders(<SmartQueue {...defaultProps} />);

      expect(screen.getByText('300 WPM')).toBeTruthy();
    });

    it('renders topic name in metadata', () => {
      renderWithProviders(<SmartQueue {...defaultProps} />);

      expect(screen.getByText('Fundamentals')).toBeTruthy();
    });

    it('renders estimated minutes', () => {
      renderWithProviders(<SmartQueue {...defaultProps} />);

      expect(screen.getByText('4 min')).toBeTruthy();
    });

    it('renders Start Reading button', () => {
      renderWithProviders(<SmartQueue {...defaultProps} />);

      expect(screen.getByText('Start Reading')).toBeTruthy();
    });
  });

  describe('primary card interaction', () => {
    it('calls onSelectArticle when primary card is pressed', () => {
      const onSelectArticle = jest.fn();
      renderWithProviders(
        <SmartQueue {...defaultProps} onSelectArticle={onSelectArticle} />
      );

      const startButton = screen.getByText('Start Reading');
      fireEvent.press(startButton);

      expect(onSelectArticle).toHaveBeenCalledWith('article-1', 300, 'primary');
    });
  });

  describe('expand toggle', () => {
    it('shows More options when collapsed', () => {
      renderWithProviders(<SmartQueue {...defaultProps} expanded={false} />);

      expect(screen.getByText('More options')).toBeTruthy();
    });

    it('shows Hide options when expanded', () => {
      renderWithProviders(<SmartQueue {...defaultProps} expanded={true} />);

      expect(screen.getByText('Hide options')).toBeTruthy();
    });

    it('calls onToggleExpand when toggle is pressed', () => {
      const onToggleExpand = jest.fn();
      renderWithProviders(
        <SmartQueue {...defaultProps} onToggleExpand={onToggleExpand} />
      );

      const toggleButton = screen.getByText('More options');
      fireEvent.press(toggleButton);

      expect(onToggleExpand).toHaveBeenCalled();
    });

    it('hides toggle when no stretch or continue recommendation', () => {
      renderWithProviders(
        <SmartQueue
          {...defaultProps}
          stretchRecommendation={null}
          continueTopicRecommendation={null}
          userState="consolidate"
        />
      );

      expect(screen.queryByText('More options')).toBeNull();
    });
  });

  describe('expanded options', () => {
    describe('stretch goal card', () => {
      it('shows stretch goal card when expanded', () => {
        renderWithProviders(<SmartQueue {...defaultProps} expanded={true} />);

        expect(screen.getByText('STRETCH GOAL')).toBeTruthy();
      });

      it('shows stretch WPM and delta', () => {
        renderWithProviders(<SmartQueue {...defaultProps} expanded={true} />);

        // Stretch is 400 WPM, primary is 300 WPM, delta is +100
        expect(screen.getByText(/400 WPM \(\+100\)/)).toBeTruthy();
      });

      it('shows Accept Challenge button', () => {
        renderWithProviders(<SmartQueue {...defaultProps} expanded={true} />);

        expect(screen.getByText('Accept Challenge')).toBeTruthy();
      });

      it('calls onSelectArticle with stretch params when pressed', () => {
        const onSelectArticle = jest.fn();
        renderWithProviders(
          <SmartQueue
            {...defaultProps}
            onSelectArticle={onSelectArticle}
            expanded={true}
          />
        );

        const acceptButton = screen.getByText('Accept Challenge');
        fireEvent.press(acceptButton);

        expect(onSelectArticle).toHaveBeenCalledWith('article-1', 400, 'stretch');
      });

      it('hides stretch card in consolidate state', () => {
        renderWithProviders(
          <SmartQueue {...defaultProps} userState="consolidate" expanded={true} />
        );

        expect(screen.queryByText('STRETCH GOAL')).toBeNull();
      });

      it('shows stretch card in push state', () => {
        renderWithProviders(
          <SmartQueue {...defaultProps} userState="push" expanded={true} />
        );

        expect(screen.getByText('STRETCH GOAL')).toBeTruthy();
      });

      it('shows stretch card in neutral state', () => {
        renderWithProviders(
          <SmartQueue {...defaultProps} userState="neutral" expanded={true} />
        );

        expect(screen.getByText('STRETCH GOAL')).toBeTruthy();
      });
    });

    describe('continue topic card', () => {
      it('shows continue topic card when expanded', () => {
        renderWithProviders(<SmartQueue {...defaultProps} expanded={true} />);

        expect(screen.getByText('CONTINUE TOPIC')).toBeTruthy();
      });

      it('shows continue topic title with topic name', () => {
        renderWithProviders(<SmartQueue {...defaultProps} expanded={true} />);

        expect(screen.getByText(/Fundamentals: Advanced Techniques/)).toBeTruthy();
      });

      it('shows Continue button', () => {
        renderWithProviders(<SmartQueue {...defaultProps} expanded={true} />);

        expect(screen.getByText(/Continue/)).toBeTruthy();
      });

      it('calls onSelectArticle with continue params when pressed', () => {
        const onSelectArticle = jest.fn();
        renderWithProviders(
          <SmartQueue
            {...defaultProps}
            onSelectArticle={onSelectArticle}
            expanded={true}
          />
        );

        const continueButton = screen.getByText(/Continue/);
        fireEvent.press(continueButton);

        expect(onSelectArticle).toHaveBeenCalledWith('article-2', 300, 'continue');
      });

      it('shows In progress indicator', () => {
        renderWithProviders(<SmartQueue {...defaultProps} expanded={true} />);

        expect(screen.getByText(/In progress/)).toBeTruthy();
      });
    });
  });

  describe('null recommendations', () => {
    it('does not render stretch when null', () => {
      renderWithProviders(
        <SmartQueue
          {...defaultProps}
          stretchRecommendation={null}
          expanded={true}
        />
      );

      expect(screen.queryByText('STRETCH GOAL')).toBeNull();
    });

    it('does not render continue when null', () => {
      renderWithProviders(
        <SmartQueue
          {...defaultProps}
          continueTopicRecommendation={null}
          expanded={true}
        />
      );

      expect(screen.queryByText('CONTINUE TOPIC')).toBeNull();
    });

    it('does not call onSelectArticle for null stretch', () => {
      const onSelectArticle = jest.fn();
      renderWithProviders(
        <SmartQueue
          {...defaultProps}
          stretchRecommendation={null}
          onSelectArticle={onSelectArticle}
          expanded={true}
        />
      );

      // Press primary instead
      const startButton = screen.getByText('Start Reading');
      fireEvent.press(startButton);

      expect(onSelectArticle).toHaveBeenCalledWith('article-1', 300, 'primary');
    });
  });

  describe('user states', () => {
    it('handles neutral state correctly', () => {
      renderWithProviders(
        <SmartQueue {...defaultProps} userState="neutral" expanded={true} />
      );

      expect(screen.getByText('STRETCH GOAL')).toBeTruthy();
      expect(screen.getByText('CONTINUE TOPIC')).toBeTruthy();
    });

    it('handles push state correctly', () => {
      renderWithProviders(
        <SmartQueue {...defaultProps} userState="push" expanded={true} />
      );

      expect(screen.getByText('STRETCH GOAL')).toBeTruthy();
    });

    it('handles consolidate state correctly - hides stretch', () => {
      renderWithProviders(
        <SmartQueue {...defaultProps} userState="consolidate" expanded={true} />
      );

      expect(screen.queryByText('STRETCH GOAL')).toBeNull();
      expect(screen.getByText('CONTINUE TOPIC')).toBeTruthy();
    });
  });

  describe('collapsed state', () => {
    it('does not render stretch card when collapsed', () => {
      renderWithProviders(<SmartQueue {...defaultProps} expanded={false} />);

      expect(screen.queryByText('STRETCH GOAL')).toBeNull();
    });

    it('does not render continue card when collapsed', () => {
      renderWithProviders(<SmartQueue {...defaultProps} expanded={false} />);

      expect(screen.queryByText('CONTINUE TOPIC')).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('handles zero WPM delta', () => {
      const sameWpmStretch: ArticleRecommendation = {
        ...mockStretchRecommendation,
        suggestedWpm: 300, // Same as primary
      };

      renderWithProviders(
        <SmartQueue
          {...defaultProps}
          stretchRecommendation={sameWpmStretch}
          expanded={true}
        />
      );

      expect(screen.getByText(/300 WPM \(\+0\)/)).toBeTruthy();
    });

    it('handles only continue recommendation with consolidate state', () => {
      renderWithProviders(
        <SmartQueue
          {...defaultProps}
          stretchRecommendation={mockStretchRecommendation}
          continueTopicRecommendation={mockContinueRecommendation}
          userState="consolidate"
          expanded={true}
        />
      );

      // Stretch hidden, continue shown
      expect(screen.queryByText('STRETCH GOAL')).toBeNull();
      expect(screen.getByText('CONTINUE TOPIC')).toBeTruthy();
    });
  });
});
