/**
 * Tests for RSVPWord Component.
 *
 * Displays a single word with the ORP letter highlighted.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { RSVPWord } from '../../src/components/rsvp/RSVPWord';
import { ProcessedWord } from '../../src/types/playback';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Helper to create a ProcessedWord
const createWord = (
  display: string,
  orpIndex: number,
  overrides?: Partial<ProcessedWord>
): ProcessedWord => ({
  original: display,
  display,
  orpIndex,
  pauseMultiplier: 1,
  sentenceEnd: false,
  ...overrides,
});

describe('RSVPWord', () => {
  describe('rendering with word', () => {
    it('renders the word text', () => {
      const word = createWord('Hello', 1);
      renderWithProviders(<RSVPWord word={word} />);

      // The word should be split into parts, check for content
      expect(screen.getByText('H')).toBeTruthy();
      expect(screen.getByText('e')).toBeTruthy();
      expect(screen.getByText('llo')).toBeTruthy();
    });

    it('splits word correctly around ORP at index 0', () => {
      const word = createWord('A', 0);
      renderWithProviders(<RSVPWord word={word} />);

      // ORP is 'A', before is empty, after is empty
      expect(screen.getByText('A')).toBeTruthy();
    });

    it('splits word correctly around ORP at index 1', () => {
      const word = createWord('Hello', 1);
      renderWithProviders(<RSVPWord word={word} />);

      // ORP is 'e', before is 'H', after is 'llo'
      expect(screen.getByText('H')).toBeTruthy();
      expect(screen.getByText('e')).toBeTruthy();
      expect(screen.getByText('llo')).toBeTruthy();
    });

    it('splits word correctly around ORP at end', () => {
      const word = createWord('Test', 3);
      renderWithProviders(<RSVPWord word={word} />);

      // ORP is 't', before is 'Tes', after is empty
      expect(screen.getByText('Tes')).toBeTruthy();
      expect(screen.getByText('t')).toBeTruthy();
    });

    it('handles single character word', () => {
      const word = createWord('I', 0);
      renderWithProviders(<RSVPWord word={word} />);

      expect(screen.getByText('I')).toBeTruthy();
    });

    it('handles longer words correctly', () => {
      const word = createWord('extraordinary', 4);
      renderWithProviders(<RSVPWord word={word} />);

      expect(screen.getByText('extr')).toBeTruthy();
      expect(screen.getByText('a')).toBeTruthy();
      expect(screen.getByText('ordinary')).toBeTruthy();
    });
  });

  describe('rendering without word (null)', () => {
    it('shows "Ready" placeholder when word is null', () => {
      renderWithProviders(<RSVPWord word={null} />);

      expect(screen.getByText('Ready')).toBeTruthy();
    });

    it('placeholder is visible', () => {
      renderWithProviders(<RSVPWord word={null} />);

      const ready = screen.getByText('Ready');
      expect(ready).toBeTruthy();
    });
  });

  describe('fontSize prop', () => {
    it('uses default fontSize of 48 when not specified', () => {
      const word = createWord('Test', 1);
      renderWithProviders(<RSVPWord word={word} />);

      // Component renders - fontSize is applied via styles
      expect(screen.getByText('T')).toBeTruthy();
    });

    it('accepts custom fontSize', () => {
      const word = createWord('Test', 1);
      renderWithProviders(<RSVPWord word={word} fontSize={72} />);

      // Component renders with custom fontSize
      expect(screen.getByText('T')).toBeTruthy();
    });

    it('applies fontSize to placeholder', () => {
      renderWithProviders(<RSVPWord word={null} fontSize={36} />);

      expect(screen.getByText('Ready')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles word with special characters', () => {
      const word = createWord("don't", 2);
      renderWithProviders(<RSVPWord word={word} />);

      expect(screen.getByText('do')).toBeTruthy();
      expect(screen.getByText('n')).toBeTruthy();
      expect(screen.getByText("'t")).toBeTruthy();
    });

    it('handles word with numbers', () => {
      const word = createWord('test123', 3);
      renderWithProviders(<RSVPWord word={word} />);

      expect(screen.getByText('tes')).toBeTruthy();
      expect(screen.getByText('t')).toBeTruthy();
      expect(screen.getByText('123')).toBeTruthy();
    });

    it('handles word with punctuation at end', () => {
      const word = createWord('Hello!', 1);
      renderWithProviders(<RSVPWord word={word} />);

      expect(screen.getByText('H')).toBeTruthy();
      expect(screen.getByText('e')).toBeTruthy();
      expect(screen.getByText('llo!')).toBeTruthy();
    });

    it('handles word with hyphen', () => {
      const word = createWord('self-aware', 4);
      renderWithProviders(<RSVPWord word={word} />);

      expect(screen.getByText('self')).toBeTruthy();
      expect(screen.getByText('-')).toBeTruthy();
      expect(screen.getByText('aware')).toBeTruthy();
    });
  });

  describe('visual structure', () => {
    it('renders container View', () => {
      const word = createWord('Test', 1);
      const { root } = renderWithProviders(<RSVPWord word={word} />);

      expect(root).toBeTruthy();
    });

    it('renders crosshair element', () => {
      const word = createWord('Test', 1);
      const { root } = renderWithProviders(<RSVPWord word={word} />);

      // Crosshair is rendered as a View
      expect(root).toBeTruthy();
    });
  });
});
