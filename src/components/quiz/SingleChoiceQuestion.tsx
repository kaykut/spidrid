import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../common/ThemeProvider';
import type { SingleChoiceQuestion as SingleChoiceQuestionType } from '../../types/learning';

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestionType;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  disabled: boolean;
}

export function SingleChoiceQuestion({
  question,
  selectedAnswer,
  onSelect,
  disabled,
}: SingleChoiceQuestionProps) {
  const { theme } = useTheme();
  const showResult = selectedAnswer !== null;

  return (
    <View style={styles.container}>
      <Text style={[styles.questionText, { color: theme.textColor }]}>
        {question.question}
      </Text>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctIndex;

          let backgroundColor = theme.secondaryBackground;
          if (showResult) {
            if (isCorrect) {
              backgroundColor = '#69db7c40';
            } else if (isSelected) {
              backgroundColor = '#ff6b6b40';
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, { backgroundColor }]}
              onPress={() => onSelect(index)}
              disabled={disabled}
              accessibilityRole="radio"
              accessibilityState={{
                selected: isSelected,
                disabled,
              }}
              accessibilityLabel={`Option ${index + 1}: ${option}`}
              accessibilityHint={disabled ? undefined : 'Double tap to select this answer'}
            >
              <Text style={[styles.optionText, { color: theme.textColor }]}>
                {option}
              </Text>
              {showResult && isCorrect && (
                <Text style={styles.correctIndicator}>✓</Text>
              )}
              {showResult && isSelected && !isCorrect && (
                <Text style={styles.incorrectIndicator}>✗</Text>
              )}
            </TouchableOpacity>
          );
        })}
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
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  correctIndicator: {
    fontSize: 20,
    color: '#69db7c',
    fontWeight: 'bold',
  },
  incorrectIndicator: {
    fontSize: 20,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
});
