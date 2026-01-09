/**
 * Tests for QuestionRenderer component - Milestone 6
 *
 * Tests that the correct question component is dispatched based on question type.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuestionRenderer } from '../../../src/components/quiz';
import type {
  SingleChoiceQuestion,
  MultipleSelectQuestion,
  TrueFalseQuestion,
  NumericQuestion,
  ComprehensionQuestion,
} from '../../../src/types/learning';

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

describe('QuestionRenderer', () => {
  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    mockOnAnswer.mockClear();
  });

  describe('single_choice questions', () => {
    const question: SingleChoiceQuestion = {
      id: 'sc-1',
      type: 'single_choice',
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctIndex: 1,
    };

    it('renders question text', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('What is the capital of France?')).toBeTruthy();
    });

    it('renders all options', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('London')).toBeTruthy();
      expect(getByText('Paris')).toBeTruthy();
      expect(getByText('Berlin')).toBeTruthy();
      expect(getByText('Madrid')).toBeTruthy();
    });

    it('calls onAnswer with correct value when option is tapped', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      fireEvent.press(getByText('Paris'));

      expect(mockOnAnswer).toHaveBeenCalledWith({
        type: 'single_choice',
        value: 1,
      });
    });

    it('shows correct indicator when answered correctly', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={{ type: 'single_choice', value: 1 }}
          onAnswer={mockOnAnswer}
          disabled={true}
        />
      );

      // Paris should have a checkmark indicator
      expect(getByText('✓')).toBeTruthy();
    });
  });

  describe('multiple_select questions', () => {
    const question: MultipleSelectQuestion = {
      id: 'ms-1',
      type: 'multiple_select',
      question: 'Select all even numbers',
      options: ['2', '3', '4', '5'],
      correctIndices: [0, 2],
    };

    it('renders question text', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('Select all even numbers')).toBeTruthy();
    });

    it('renders instruction text', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('Select all that apply')).toBeTruthy();
    });

    it('renders confirm button', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('Confirm Selection')).toBeTruthy();
    });
  });

  describe('true_false questions', () => {
    const question: TrueFalseQuestion = {
      id: 'tf-1',
      type: 'true_false',
      question: 'The Earth is round',
      correctAnswer: true,
    };

    it('renders question text', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('The Earth is round')).toBeTruthy();
    });

    it('renders True and False buttons', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('True')).toBeTruthy();
      expect(getByText('False')).toBeTruthy();
    });

    it('calls onAnswer with true when True is tapped', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      fireEvent.press(getByText('True'));

      expect(mockOnAnswer).toHaveBeenCalledWith({
        type: 'true_false',
        value: true,
      });
    });

    it('calls onAnswer with false when False is tapped', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      fireEvent.press(getByText('False'));

      expect(mockOnAnswer).toHaveBeenCalledWith({
        type: 'true_false',
        value: false,
      });
    });
  });

  describe('numeric questions', () => {
    const question: NumericQuestion = {
      id: 'num-1',
      type: 'numeric',
      question: 'How many days are in a week?',
      correctValue: 7,
      tolerance: 0,
      min: 1,
      max: 14,
      unit: 'days',
    };

    it('renders question text', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('How many days are in a week?')).toBeTruthy();
    });

    it('renders submit button', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('Submit Answer')).toBeTruthy();
    });

    it('renders min and max labels with unit', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('1 days')).toBeTruthy();
      expect(getByText('14 days')).toBeTruthy();
    });
  });

  describe('legacy ComprehensionQuestion format', () => {
    const legacyQuestion: ComprehensionQuestion = {
      id: 'legacy-1',
      question: 'What is 1+1?',
      options: ['1', '2', '3', '4'],
      correctIndex: 1,
    };

    it('normalizes legacy question and renders as single_choice', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={legacyQuestion}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      expect(getByText('What is 1+1?')).toBeTruthy();
      expect(getByText('1')).toBeTruthy();
      expect(getByText('2')).toBeTruthy();
    });

    it('calls onAnswer with single_choice type for legacy question', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={legacyQuestion}
          answer={null}
          onAnswer={mockOnAnswer}
          disabled={false}
        />
      );

      fireEvent.press(getByText('2'));

      expect(mockOnAnswer).toHaveBeenCalledWith({
        type: 'single_choice',
        value: 1,
      });
    });
  });

  describe('disabled state', () => {
    const question: SingleChoiceQuestion = {
      id: 'sc-disabled',
      type: 'single_choice',
      question: 'Test question',
      options: ['A', 'B'],
      correctIndex: 0,
    };

    it('does not call onAnswer when disabled', () => {
      const { getByText } = render(
        <QuestionRenderer
          question={question}
          answer={{ type: 'single_choice', value: 0 }}
          onAnswer={mockOnAnswer}
          disabled={true}
        />
      );

      fireEvent.press(getByText('A'));
      fireEvent.press(getByText('B'));

      expect(mockOnAnswer).not.toHaveBeenCalled();
    });
  });
});
