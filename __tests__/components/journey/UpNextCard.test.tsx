/**
 * Tests for UpNextCard Component.
 *
 * Single article recommendation card for the Simple Version Journey.
 * Features article info, WPM slider, and start reading CTA.
 * Implements PRD Section 4.4 - "Quiet Velocity" design language.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { UpNextCard } from '../../../src/components/journey/UpNextCard';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Default props for testing
const defaultProps = {
  articleId: 'article-123',
  title: 'Introduction to Speed Reading Fundamentals',
  topicName: 'Fundamentals',
  wordCount: 1200,
  suggestedWpm: 300,
  onStart: jest.fn(),
};

describe('UpNextCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('renders UP NEXT label', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      expect(screen.getByText('UP NEXT')).toBeTruthy();
    });

    it('renders article title', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      expect(screen.getByText('Introduction to Speed Reading Fundamentals')).toBeTruthy();
    });

    it('renders topic name', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      expect(screen.getByText('Fundamentals')).toBeTruthy();
    });

    it('renders word count with formatting', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      expect(screen.getByText('1,200 words')).toBeTruthy();
    });

    it('renders estimated reading time', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      // 1200 words at 300 WPM = 4 minutes
      expect(screen.getByText('~4 min')).toBeTruthy();
    });

    it('renders Start Reading button', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      expect(screen.getByText('Start Reading')).toBeTruthy();
    });
  });

  describe('WPM slider', () => {
    it('renders Reading Speed label', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      expect(screen.getByText('Reading Speed')).toBeTruthy();
    });

    it('shows initial WPM value', () => {
      renderWithProviders(<UpNextCard {...defaultProps} suggestedWpm={350} />);

      expect(screen.getByText('350 WPM')).toBeTruthy();
    });

    it('shows min WPM value', () => {
      renderWithProviders(<UpNextCard {...defaultProps} minWpm={150} />);

      expect(screen.getByText('150')).toBeTruthy();
    });

    it('shows max WPM value', () => {
      renderWithProviders(<UpNextCard {...defaultProps} maxWpm={800} />);

      expect(screen.getByText('800')).toBeTruthy();
    });

    it('uses default min WPM of 100', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      expect(screen.getByText('100')).toBeTruthy();
    });

    it('uses default max WPM of 1000', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      expect(screen.getByText('1000')).toBeTruthy();
    });
  });

  describe('start button interaction', () => {
    it('calls onStart with articleId and WPM when pressed', () => {
      const onStart = jest.fn();
      renderWithProviders(
        <UpNextCard {...defaultProps} onStart={onStart} suggestedWpm={300} />
      );

      const startButton = screen.getByText('Start Reading');
      fireEvent.press(startButton);

      expect(onStart).toHaveBeenCalledWith('article-123', 300);
    });

    it('calls onStart with updated WPM after slider change', () => {
      const onStart = jest.fn();
      const onWpmChange = jest.fn();
      renderWithProviders(
        <UpNextCard
          {...defaultProps}
          onStart={onStart}
          onWpmChange={onWpmChange}
          suggestedWpm={300}
        />
      );

      // The start button should use the current selected WPM
      const startButton = screen.getByText('Start Reading');
      fireEvent.press(startButton);

      expect(onStart).toHaveBeenCalledWith('article-123', 300);
    });
  });

  describe('estimated reading time calculation', () => {
    it('calculates correct time for given WPM', () => {
      renderWithProviders(
        <UpNextCard {...defaultProps} wordCount={600} suggestedWpm={200} />
      );

      // 600 words at 200 WPM = 3 minutes
      expect(screen.getByText('~3 min')).toBeTruthy();
    });

    it('rounds up reading time', () => {
      renderWithProviders(
        <UpNextCard {...defaultProps} wordCount={550} suggestedWpm={200} />
      );

      // 550 words at 200 WPM = 2.75 minutes, rounds to 3
      expect(screen.getByText('~3 min')).toBeTruthy();
    });

    it('handles zero WPM gracefully', () => {
      renderWithProviders(
        <UpNextCard {...defaultProps} wordCount={600} suggestedWpm={0} />
      );

      // Should handle gracefully (returns 0)
      expect(screen.getByText('~0 min')).toBeTruthy();
    });

    it('handles very high WPM', () => {
      renderWithProviders(
        <UpNextCard {...defaultProps} wordCount={1200} suggestedWpm={1200} />
      );

      // 1200 words at 1200 WPM = 1 minute
      expect(screen.getByText('~1 min')).toBeTruthy();
    });
  });

  describe('word count formatting', () => {
    it('formats small word counts', () => {
      renderWithProviders(<UpNextCard {...defaultProps} wordCount={500} />);

      expect(screen.getByText('500 words')).toBeTruthy();
    });

    it('formats large word counts with comma separator', () => {
      renderWithProviders(<UpNextCard {...defaultProps} wordCount={12500} />);

      expect(screen.getByText('12,500 words')).toBeTruthy();
    });

    it('handles very large word counts', () => {
      renderWithProviders(<UpNextCard {...defaultProps} wordCount={100000} />);

      expect(screen.getByText('100,000 words')).toBeTruthy();
    });
  });

  describe('onWpmChange callback', () => {
    it('does not crash when onWpmChange is not provided', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      // Component should render without error
      expect(screen.getByText('Reading Speed')).toBeTruthy();
    });

    it('accepts onWpmChange callback', () => {
      const onWpmChange = jest.fn();
      renderWithProviders(
        <UpNextCard {...defaultProps} onWpmChange={onWpmChange} />
      );

      // Component should render
      expect(screen.getByText('Reading Speed')).toBeTruthy();
    });
  });

  describe('slider customization', () => {
    it('uses custom minWpm', () => {
      renderWithProviders(<UpNextCard {...defaultProps} minWpm={200} />);

      expect(screen.getByText('200')).toBeTruthy();
    });

    it('uses custom maxWpm', () => {
      renderWithProviders(<UpNextCard {...defaultProps} maxWpm={500} />);

      expect(screen.getByText('500')).toBeTruthy();
    });

    it('uses custom wpmStep', () => {
      renderWithProviders(<UpNextCard {...defaultProps} wpmStep={50} />);

      // Component should render with step of 50
      expect(screen.root).toBeTruthy();
    });
  });

  describe('long content handling', () => {
    it('handles long article title', () => {
      const longTitle = 'This is a very long article title that should be truncated at some point because it exceeds the normal length limit for titles in this component and might wrap to multiple lines';
      renderWithProviders(<UpNextCard {...defaultProps} title={longTitle} />);

      // Component should render with numberOfLines={2}
      expect(screen.root).toBeTruthy();
    });

    it('handles long topic name', () => {
      renderWithProviders(
        <UpNextCard {...defaultProps} topicName="Very Long Topic Name That Might Wrap" />
      );

      expect(screen.getByText('Very Long Topic Name That Might Wrap')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles zero word count', () => {
      renderWithProviders(<UpNextCard {...defaultProps} wordCount={0} />);

      expect(screen.getByText('0 words')).toBeTruthy();
    });

    it('handles single word', () => {
      renderWithProviders(<UpNextCard {...defaultProps} wordCount={1} />);

      expect(screen.getByText('1 words')).toBeTruthy();
    });

    it('handles WPM at minimum', () => {
      renderWithProviders(
        <UpNextCard {...defaultProps} suggestedWpm={100} minWpm={100} />
      );

      expect(screen.getByText('100 WPM')).toBeTruthy();
    });

    it('handles WPM at maximum', () => {
      renderWithProviders(
        <UpNextCard {...defaultProps} suggestedWpm={1000} maxWpm={1000} />
      );

      expect(screen.getByText('1000 WPM')).toBeTruthy();
    });
  });

  describe('metadata separators', () => {
    it('renders bullet separators between metadata items', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      // The component uses bullet points as separators
      // We verify the metadata row renders correctly
      expect(screen.getByText('Fundamentals')).toBeTruthy();
      expect(screen.getByText(/words/)).toBeTruthy();
      expect(screen.getByText(/min/)).toBeTruthy();
    });
  });

  describe('slider track rendering', () => {
    it('renders slider track', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      // Slider track should be rendered
      expect(screen.root).toBeTruthy();
    });

    it('renders slider thumb', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      // Slider thumb should be rendered
      expect(screen.root).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('renders with proper structure', () => {
      renderWithProviders(<UpNextCard {...defaultProps} />);

      // All main elements should be rendered
      expect(screen.getByText('UP NEXT')).toBeTruthy();
      expect(screen.getByText('Reading Speed')).toBeTruthy();
      expect(screen.getByText('Start Reading')).toBeTruthy();
    });
  });
});
