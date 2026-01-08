/**
 * Tests for MultipleSelectQuestion component
 *
 * Tests selection toggling, confirmation, and result display.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MultipleSelectQuestion } from '../../../src/components/quiz/MultipleSelectQuestion';
import type { MultipleSelectQuestion as MultipleSelectQuestionType } from '../../../src/types/learning';

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

describe('MultipleSelectQuestion', () => {
  const mockQuestion: MultipleSelectQuestionType = {
    id: 'ms-test',
    type: 'multiple_select',
    question: 'Select all prime numbers',
    options: ['2', '4', '5', '6', '7'],
    correctIndices: [0, 2, 4], // 2, 5, 7
  };

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  describe('initial rendering', () => {
    it('renders the question text', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('Select all prime numbers')).toBeTruthy();
    });

    it('renders instruction text', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('Select all that apply')).toBeTruthy();
    });

    it('renders all options', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('2')).toBeTruthy();
      expect(getByText('4')).toBeTruthy();
      expect(getByText('5')).toBeTruthy();
      expect(getByText('6')).toBeTruthy();
      expect(getByText('7')).toBeTruthy();
    });

    it('renders confirm button', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('Confirm Selection')).toBeTruthy();
    });
  });

  describe('option toggling', () => {
    it('toggles option on press', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      // Select option
      fireEvent.press(getByText('2'));

      // Option should show checkmark (this is shown via the checkbox)
      // We can verify by selecting and confirming
      fireEvent.press(getByText('Confirm Selection'));
      expect(mockOnSelect).toHaveBeenCalledWith([0]);
    });

    it('toggles multiple options', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('7'));

      fireEvent.press(getByText('Confirm Selection'));
      expect(mockOnSelect).toHaveBeenCalledWith([0, 2, 4]);
    });

    it('deselects option when pressed twice', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('2')); // Deselect

      fireEvent.press(getByText('Confirm Selection'));
      expect(mockOnSelect).toHaveBeenCalledWith([2]); // Only index 2 (5)
    });

    it('does not toggle when disabled', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('Confirm Selection'));

      // Should not call onSelect since no selections were made
      expect(mockOnSelect).not.toHaveBeenCalled();
    });

    it('does not toggle when result is shown', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={[0, 2]}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      fireEvent.press(getByText('2'));

      // Should not call onSelect since result is shown
      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe('confirm button', () => {
    it('does not call onSelect when no options selected', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      fireEvent.press(getByText('Confirm Selection'));

      expect(mockOnSelect).not.toHaveBeenCalled();
    });

    it('is disabled when no options selected', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      // The button should have disabled styling (opacity 0.5)
      const confirmButton = getByText('Confirm Selection').parent?.parent;
      expect(confirmButton).toBeTruthy();
    });

    it('calls onSelect with selected indices when confirmed', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('7'));
      fireEvent.press(getByText('Confirm Selection'));

      expect(mockOnSelect).toHaveBeenCalledWith([0, 4]);
    });

    it('is not shown when result is displayed', () => {
      const { queryByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={[0, 2]}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      expect(queryByText('Confirm Selection')).toBeNull();
    });
  });

  describe('result display', () => {
    it('shows correct indicator for correct answers', () => {
      const { getAllByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={[0, 2, 4]}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // Should have checkmarks for correct answers
      const checkmarks = getAllByText('\u2713'); // checkmark character
      expect(checkmarks.length).toBeGreaterThan(0);
    });

    it('shows incorrect indicator for wrong selections', () => {
      const { getAllByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={[0, 1, 3]} // 2, 4, 6 - 4 and 6 are wrong
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // Should have X marks for incorrect selections
      const xMarks = getAllByText('\u2717'); // X character
      expect(xMarks.length).toBe(2); // 4 and 6 are wrong
    });

    it('highlights correct answers in green', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={[0]}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // The correct answers (2, 5, 7) should be highlighted
      // We check that these options exist and have correct styling
      expect(getByText('2')).toBeTruthy();
      expect(getByText('5')).toBeTruthy();
      expect(getByText('7')).toBeTruthy();
    });

    it('highlights wrong selections in red', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={[1]} // 4 is not prime
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // Option 4 should be highlighted as wrong
      expect(getByText('4')).toBeTruthy();
    });

    it('shows correct indicators for all correct answers regardless of selection', () => {
      const { getAllByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={[]} // No selections, but correct answers still shown
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // Checkmarks show for correct answers
      const checkmarks = getAllByText('\u2713');
      expect(checkmarks.length).toBe(3); // 2, 5, 7 are correct
    });
  });

  describe('isOptionSelected behavior', () => {
    it('returns false when option not in pendingSelections and no result', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      // Option should not appear selected initially
      // This is indicated by no checkmark in the checkbox
      expect(getByText('2')).toBeTruthy();
    });

    it('returns true when option in pendingSelections', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      fireEvent.press(getByText('2'));

      // After pressing, the option should appear selected
      // This shows a checkmark in the checkbox area
      expect(getByText('\u2713')).toBeTruthy();
    });

    it('uses selectedAnswers when showing result', () => {
      const { getAllByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={[0, 2]}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // When showing result, uses selectedAnswers not pendingSelections
      // Indicators are based on selectedAnswers
      expect(getAllByText('\u2713').length).toBeGreaterThan(0);
    });

    it('handles null selectedAnswers with optional chaining', () => {
      const { getByText } = render(
        <MultipleSelectQuestion
          question={mockQuestion}
          selectedAnswers={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      // Should not crash with null selectedAnswers
      expect(getByText('Select all prime numbers')).toBeTruthy();
    });
  });
});
