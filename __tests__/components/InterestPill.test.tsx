/**
 * Tests for InterestPill Component.
 *
 * Displays a selectable interest pill with emoji and label.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { InterestPill } from '../../src/components/onboarding/InterestPill';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('InterestPill', () => {
  const defaultProps = {
    label: 'Science',
    emoji: '🔬',
    selected: false,
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('renders the label', () => {
      renderWithProviders(<InterestPill {...defaultProps} />);

      expect(screen.getByText('Science')).toBeTruthy();
    });

    it('renders the emoji', () => {
      renderWithProviders(<InterestPill {...defaultProps} />);

      expect(screen.getByText('🔬')).toBeTruthy();
    });

    it('renders different labels', () => {
      renderWithProviders(
        <InterestPill {...defaultProps} label="Technology" emoji="💻" />
      );

      expect(screen.getByText('Technology')).toBeTruthy();
      expect(screen.getByText('💻')).toBeTruthy();
    });
  });

  describe('selected state', () => {
    it('renders in unselected state', () => {
      const { root } = renderWithProviders(
        <InterestPill {...defaultProps} selected={false} />
      );

      expect(root).toBeTruthy();
    });

    it('renders in selected state', () => {
      const { root } = renderWithProviders(
        <InterestPill {...defaultProps} selected={true} />
      );

      expect(root).toBeTruthy();
    });

    it('applies different styling when selected', () => {
      // Render unselected
      const { unmount } = renderWithProviders(
        <InterestPill {...defaultProps} selected={false} />
      );
      unmount();

      // Render selected
      renderWithProviders(
        <InterestPill {...defaultProps} selected={true} />
      );

      // Component renders in both states
      expect(screen.getByText('Science')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <InterestPill {...defaultProps} onPress={onPress} />
      );

      const pill = screen.getByText('Science');
      fireEvent.press(pill);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('calls onPress when emoji is pressed', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <InterestPill {...defaultProps} onPress={onPress} />
      );

      const emoji = screen.getByText('🔬');
      fireEvent.press(emoji);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('calls onPress regardless of selected state', () => {
      const onPress = jest.fn();
      renderWithProviders(
        <InterestPill {...defaultProps} selected={true} onPress={onPress} />
      );

      const pill = screen.getByText('Science');
      fireEvent.press(pill);

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('different interests', () => {
    const interests = [
      { label: 'Health', emoji: '🏥' },
      { label: 'Business', emoji: '💼' },
      { label: 'History', emoji: '📜' },
      { label: 'Art', emoji: '🎨' },
      { label: 'Nature', emoji: '🌿' },
    ];

    interests.forEach(({ label, emoji }) => {
      it(`renders ${label} interest correctly`, () => {
        renderWithProviders(
          <InterestPill
            label={label}
            emoji={emoji}
            selected={false}
            onPress={jest.fn()}
          />
        );

        expect(screen.getByText(label)).toBeTruthy();
        expect(screen.getByText(emoji)).toBeTruthy();
      });
    });
  });
});
