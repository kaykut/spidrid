import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../common/ThemeProvider';
import type { TrueFalseQuestion as TrueFalseQuestionType } from '../../types/learning';

interface TrueFalseQuestionProps {
  question: TrueFalseQuestionType;
  selectedAnswer: boolean | null;
  onSelect: (answer: boolean) => void;
  disabled: boolean;
}

export function TrueFalseQuestion({
  question,
  selectedAnswer,
  onSelect,
  disabled,
}: TrueFalseQuestionProps) {
  const { theme } = useTheme();
  const showResult = selectedAnswer !== null;

  const getButtonStyle = (value: boolean) => {
    let backgroundColor = theme.secondaryBackground;

    if (showResult) {
      const isCorrect = value === question.correctAnswer;
      const isSelected = value === selectedAnswer;

      if (isCorrect) {
        backgroundColor = '#69db7c40';
      } else if (isSelected) {
        backgroundColor = '#ff6b6b40';
      }
    }

    return backgroundColor;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.questionText, { color: theme.textColor }]}>
        {question.question}
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.answerButton, { backgroundColor: getButtonStyle(true) }]}
          onPress={() => onSelect(true)}
          disabled={disabled}
          accessibilityRole="radio"
          accessibilityState={{ selected: selectedAnswer === true, disabled }}
          accessibilityLabel="True"
          accessibilityHint={disabled ? undefined : 'Double tap to select True'}
        >
          <Text style={[styles.answerButtonText, { color: theme.textColor }]}>
            True
          </Text>
          {showResult && question.correctAnswer === true && (
            <Text style={styles.correctIndicator}>✓</Text>
          )}
          {showResult && selectedAnswer === true && question.correctAnswer !== true && (
            <Text style={styles.incorrectIndicator}>✗</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.answerButton, { backgroundColor: getButtonStyle(false) }]}
          onPress={() => onSelect(false)}
          disabled={disabled}
          accessibilityRole="radio"
          accessibilityState={{ selected: selectedAnswer === false, disabled }}
          accessibilityLabel="False"
          accessibilityHint={disabled ? undefined : 'Double tap to select False'}
        >
          <Text style={[styles.answerButtonText, { color: theme.textColor }]}>
            False
          </Text>
          {showResult && question.correctAnswer === false && (
            <Text style={styles.correctIndicator}>✓</Text>
          )}
          {showResult && selectedAnswer === false && question.correctAnswer !== false && (
            <Text style={styles.incorrectIndicator}>✗</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 32,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  answerButton: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    maxWidth: 160,
  },
  answerButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  correctIndicator: {
    fontSize: 20,
    color: '#69db7c',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  incorrectIndicator: {
    fontSize: 20,
    color: '#ff6b6b',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
