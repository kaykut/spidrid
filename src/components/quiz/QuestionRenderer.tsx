import React from 'react';
import { View } from 'react-native';
import { normalizeQuestion } from '../../types/learning';
import { MultipleSelectQuestion } from './MultipleSelectQuestion';
import { NumericQuestion } from './NumericQuestion';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { TrueFalseQuestion } from './TrueFalseQuestion';
import type {
  Question,
  ComprehensionQuestion,
} from '../../types/learning';

export type QuestionAnswer =
  | { type: 'single_choice'; value: number }
  | { type: 'multiple_select'; value: number[] }
  | { type: 'true_false'; value: boolean }
  | { type: 'numeric'; value: number };

interface QuestionRendererProps {
  question: Question | ComprehensionQuestion;
  answer: QuestionAnswer | null;
  onAnswer: (answer: QuestionAnswer) => void;
  disabled: boolean;
}

/**
 * Dispatcher component that renders the appropriate question component
 * based on the question type
 */
export function QuestionRenderer({
  question,
  answer,
  onAnswer,
  disabled,
}: QuestionRendererProps) {
  const normalized = normalizeQuestion(question);

  switch (normalized.type) {
    case 'single_choice':
      return (
        <SingleChoiceQuestion
          question={normalized}
          selectedAnswer={answer?.type === 'single_choice' ? answer.value : null}
          onSelect={(index) => onAnswer({ type: 'single_choice', value: index })}
          disabled={disabled}
        />
      );

    case 'multiple_select':
      return (
        <MultipleSelectQuestion
          question={normalized}
          selectedAnswers={answer?.type === 'multiple_select' ? answer.value : null}
          onSelect={(indices) => onAnswer({ type: 'multiple_select', value: indices })}
          disabled={disabled}
        />
      );

    case 'true_false':
      return (
        <TrueFalseQuestion
          question={normalized}
          selectedAnswer={answer?.type === 'true_false' ? answer.value : null}
          onSelect={(value) => onAnswer({ type: 'true_false', value })}
          disabled={disabled}
        />
      );

    case 'numeric':
      return (
        <NumericQuestion
          question={normalized}
          selectedAnswer={answer?.type === 'numeric' ? answer.value : null}
          onSelect={(value) => onAnswer({ type: 'numeric', value })}
          disabled={disabled}
        />
      );

    default:
      // This should never happen with proper typing, but just in case
      return <View />;
  }
}

// Re-export components for direct use if needed
export { SingleChoiceQuestion } from './SingleChoiceQuestion';
export { MultipleSelectQuestion } from './MultipleSelectQuestion';
export { TrueFalseQuestion } from './TrueFalseQuestion';
export { NumericQuestion } from './NumericQuestion';
