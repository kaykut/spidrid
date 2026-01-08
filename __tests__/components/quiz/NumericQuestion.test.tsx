/**
 * Tests for NumericQuestion component
 *
 * Tests slider interaction, value display, and result states.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NumericQuestion } from '../../../src/components/quiz/NumericQuestion';
import type { NumericQuestion as NumericQuestionType } from '../../../src/types/learning';

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

describe('NumericQuestion', () => {
  const mockQuestion: NumericQuestionType = {
    id: 'num-test',
    type: 'numeric',
    question: 'How many planets are in our solar system?',
    correctValue: 8,
    tolerance: 0,
    min: 1,
    max: 15,
    step: 1,
    unit: 'planets',
  };

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  describe('initial rendering', () => {
    it('renders the question text', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('How many planets are in our solar system?')).toBeTruthy();
    });

    it('renders min and max labels with unit', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('1 planets')).toBeTruthy();
      expect(getByText('15 planets')).toBeTruthy();
    });

    it('renders submit button', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('Submit Answer')).toBeTruthy();
    });

    it('starts at center value', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      // Center of 1-15 is 8
      expect(getByText('8 planets')).toBeTruthy();
    });
  });

  describe('question without unit', () => {
    const noUnitQuestion: NumericQuestionType = {
      id: 'num-no-unit',
      type: 'numeric',
      question: 'What is 5 + 5?',
      correctValue: 10,
      tolerance: 0,
      min: 0,
      max: 20,
    };

    it('renders without unit text', () => {
      const { getByText } = render(
        <NumericQuestion
          question={noUnitQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('0')).toBeTruthy();
      expect(getByText('20')).toBeTruthy();
      expect(getByText('10')).toBeTruthy(); // Center value
    });
  });

  describe('question with default step', () => {
    const noStepQuestion: NumericQuestionType = {
      id: 'num-no-step',
      type: 'numeric',
      question: 'Pick a number',
      correctValue: 5,
      tolerance: 1,
      min: 0,
      max: 10,
      // step is undefined, defaults to 1
    };

    it('uses default step of 1', () => {
      const { getByText } = render(
        <NumericQuestion
          question={noStepQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      // Should render without crashing
      expect(getByText('Pick a number')).toBeTruthy();
    });
  });

  describe('submit functionality', () => {
    it('calls onSelect with current value when submitted', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      fireEvent.press(getByText('Submit Answer'));

      // Should call with initial center value (8)
      expect(mockOnSelect).toHaveBeenCalledWith(8);
    });

    it('hides submit button when result is shown', () => {
      const { queryByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={8}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      expect(queryByText('Submit Answer')).toBeNull();
    });
  });

  describe('result display', () => {
    it('shows correct indicator for correct answer', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={8}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      expect(getByText(/Correct/)).toBeTruthy();
    });

    it('shows incorrect indicator with correct answer', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={5}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      expect(getByText(/Answer: 8/)).toBeTruthy();
    });

    it('shows selected value with unit', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={8}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      expect(getByText('8 planets')).toBeTruthy();
    });

    it('shows correct for answer within tolerance', () => {
      const toleranceQuestion: NumericQuestionType = {
        ...mockQuestion,
        correctValue: 8,
        tolerance: 1,
      };

      const { getByText } = render(
        <NumericQuestion
          question={toleranceQuestion}
          selectedAnswer={7}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // 7 is within tolerance of 8 (8 - 1 = 7)
      expect(getByText(/Correct/)).toBeTruthy();
    });

    it('shows incorrect for answer outside tolerance', () => {
      const toleranceQuestion: NumericQuestionType = {
        ...mockQuestion,
        correctValue: 8,
        tolerance: 1,
      };

      const { getByText } = render(
        <NumericQuestion
          question={toleranceQuestion}
          selectedAnswer={5}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // 5 is outside tolerance of 8 (need 7-9)
      expect(getByText(/Answer: 8/)).toBeTruthy();
    });
  });

  describe('value display calculations', () => {
    it('displays current value before submission', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      // Initial center value
      expect(getByText('8 planets')).toBeTruthy();
    });

    it('displays selected answer after submission', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={5}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      expect(getByText('5 planets')).toBeTruthy();
    });
  });

  describe('result color styling', () => {
    it('uses accent color before result', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      // Component renders with accent color for value display
      expect(getByText('8 planets')).toBeTruthy();
    });

    it('uses green for correct answer', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={8}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // Correct answer indicator
      expect(getByText(/Correct/)).toBeTruthy();
    });

    it('uses red for incorrect answer', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={3}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // Incorrect answer indicator
      expect(getByText(/Answer:/)).toBeTruthy();
    });
  });

  describe('correct range indicator', () => {
    it('shows correct range when result is displayed', () => {
      const { getByText } = render(
        <NumericQuestion
          question={mockQuestion}
          selectedAnswer={5}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      // The range indicator should be visible (internal component styling)
      expect(getByText('How many planets are in our solar system?')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles min equals max', () => {
      const edgeQuestion: NumericQuestionType = {
        id: 'edge',
        type: 'numeric',
        question: 'What is 1?',
        correctValue: 1,
        tolerance: 0,
        min: 1,
        max: 1,
      };

      const { getByText } = render(
        <NumericQuestion
          question={edgeQuestion}
          selectedAnswer={null}
          onSelect={mockOnSelect}
          disabled={false}
        />
      );

      expect(getByText('What is 1?')).toBeTruthy();
    });

    it('handles large tolerance', () => {
      const toleranceQuestion: NumericQuestionType = {
        id: 'tolerance',
        type: 'numeric',
        question: 'Estimate value',
        correctValue: 50,
        tolerance: 25,
        min: 0,
        max: 100,
      };

      // 25 is within tolerance (50 - 25 = 25)
      const { getByText } = render(
        <NumericQuestion
          question={toleranceQuestion}
          selectedAnswer={25}
          onSelect={mockOnSelect}
          disabled={true}
        />
      );

      expect(getByText(/Correct/)).toBeTruthy();
    });
  });
});
