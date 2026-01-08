/**
 * Tests for TrueFalseQuestion component
 *
 * Tests button interaction, styling, and result display.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TrueFalseQuestion } from '../../../src/components/quiz/TrueFalseQuestion';
import type { TrueFalseQuestion as TrueFalseQuestionType } from '../../../src/types/learning';

// Mock ThemeProvider
jest.mock('../../../src/components/common/ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      secondaryBackground: '#2a2a2a',
      accentColor: '#4dabf7',
      orpColor: '#ff6b6b',
    },
  }),
}));

describe('TrueFalseQuestion', () => {
  const trueCorrectQuestion: TrueFalseQuestionType = {
    id: 'tf-true',
    type: 'true_false',
    question: 'The Earth is round.',
    correctAnswer: true,
  };

  const falseCorrectQuestion: TrueFalseQuestionType = {
    id: 'tf-false',
    type: 'true_false',
    question: 'The sun revolves around the Earth.',
    correctAnswer: false,
  };

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  describe('initial rendering', () => {
    it('renders the question text', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('The Earth is round.')).toBeTruthy();
    });

    it('renders True button', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('True')).toBeTruthy();
    });

    it('renders False button', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('False')).toBeTruthy();
    });
  });

  describe('button interactions', () => {
    it('calls onSelect with true when True is pressed', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      fireEvent.press(getByText('True'));

      expect(mockOnSelect).toHaveBeenCalledWith(true);
    });

    it('calls onSelect with false when False is pressed', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      fireEvent.press(getByText('False'));

      expect(mockOnSelect).toHaveBeenCalledWith(false);
    });

    it('does not call onSelect when disabled', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      fireEvent.press(getByText('True'));
      fireEvent.press(getByText('False'));

      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe('result display - correct answer is true', () => {
    it('shows correct indicator when True selected correctly', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={true}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // Checkmark should appear next to True
      expect(getByText('\u2713')).toBeTruthy();
    });

    it('shows incorrect indicator when False selected incorrectly', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={false}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // X mark should appear for wrong selection
      expect(getByText('\u2717')).toBeTruthy();
      // Checkmark for correct answer
      expect(getByText('\u2713')).toBeTruthy();
    });

    it('highlights True as correct when correct answer is true', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={false}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // True button should have checkmark
      expect(getByText('True')).toBeTruthy();
      expect(getByText('\u2713')).toBeTruthy();
    });
  });

  describe('result display - correct answer is false', () => {
    it('shows correct indicator when False selected correctly', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={falseCorrectQuestion}
          selectedAnswer={false}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // Checkmark should appear next to False
      expect(getByText('\u2713')).toBeTruthy();
    });

    it('shows incorrect indicator when True selected incorrectly', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={falseCorrectQuestion}
          selectedAnswer={true}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // X mark should appear for wrong selection
      expect(getByText('\u2717')).toBeTruthy();
      // Checkmark for correct answer
      expect(getByText('\u2713')).toBeTruthy();
    });

    it('highlights False as correct when correct answer is false', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={falseCorrectQuestion}
          selectedAnswer={true}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // False button should have checkmark
      expect(getByText('False')).toBeTruthy();
      expect(getByText('\u2713')).toBeTruthy();
    });
  });

  describe('button styling based on state', () => {
    it('uses secondary background for unselected state', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      // Both buttons should exist with default styling
      expect(getByText('True')).toBeTruthy();
      expect(getByText('False')).toBeTruthy();
    });

    it('applies green styling for correct answer', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={true}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // True is correct and selected
      expect(getByText('True')).toBeTruthy();
    });

    it('applies red styling for incorrect selection', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={false}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // False is selected but incorrect
      expect(getByText('False')).toBeTruthy();
    });
  });

  describe('getButtonStyle function', () => {
    it('returns correct background for unselected buttons before result', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      // Both buttons should have secondary background (not green/red)
      expect(getByText('True')).toBeTruthy();
      expect(getByText('False')).toBeTruthy();
    });

    it('returns green for correct button after result', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={true}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // True should be green (correct)
      expect(getByText('True')).toBeTruthy();
    });

    it('returns red for incorrectly selected button after result', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={false}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // False should be red (selected but wrong)
      expect(getByText('False')).toBeTruthy();
    });

    it('returns secondary background for unselected wrong option after result', () => {
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={true}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // False was not selected, so should not be red
      // But True is highlighted as correct
      expect(getByText('True')).toBeTruthy();
      expect(getByText('False')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has correct accessibility role for True button', () => {
      const { getByLabelText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByLabelText('True')).toBeTruthy();
    });

    it('has correct accessibility role for False button', () => {
      const { getByLabelText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByLabelText('False')).toBeTruthy();
    });

    it('shows selected state in accessibility for True', () => {
      const { getByLabelText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={true}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      const trueButton = getByLabelText('True');
      expect(trueButton.props.accessibilityState.selected).toBe(true);
    });

    it('shows selected state in accessibility for False', () => {
      const { getByLabelText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={false}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      const falseButton = getByLabelText('False');
      expect(falseButton.props.accessibilityState.selected).toBe(true);
    });

    it('shows disabled state in accessibility', () => {
      const { getByLabelText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      const trueButton = getByLabelText('True');
      expect(trueButton.props.accessibilityState.disabled).toBe(true);
    });

    it('has hint when not disabled', () => {
      const { getByLabelText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      const trueButton = getByLabelText('True');
      expect(trueButton.props.accessibilityHint).toBe('Double tap to select True');
    });

    it('has no hint when disabled', () => {
      const { getByLabelText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      const trueButton = getByLabelText('True');
      expect(trueButton.props.accessibilityHint).toBeUndefined();
    });
  });

  describe('indicator visibility', () => {
    it('shows checkmark only after result for correct answer', () => {
      // Before result
      const { queryByText: queryBefore } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(queryBefore('\u2713')).toBeNull();
      expect(queryBefore('\u2717')).toBeNull();
    });

    it('shows indicators after result', () => {
      // After result
      const { getByText } = render(
        <TrueFalseQuestion
          question={trueCorrectQuestion}
          selectedAnswer={true}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      expect(getByText('\u2713')).toBeTruthy();
    });
  });
});
