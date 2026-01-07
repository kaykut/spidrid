import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../common/ThemeProvider';
import type { MultipleSelectQuestion as MultipleSelectQuestionType } from '../../types/learning';

interface MultipleSelectQuestionProps {
  question: MultipleSelectQuestionType;
  selectedAnswers: number[] | null;
  onSelect: (indices: number[]) => void;
  disabled: boolean;
}

export function MultipleSelectQuestion({
  question,
  selectedAnswers,
  onSelect,
  disabled,
}: MultipleSelectQuestionProps) {
  const { theme } = useTheme();
  const [pendingSelections, setPendingSelections] = useState<number[]>([]);
  const showResult = selectedAnswers !== null;

  const handleOptionToggle = (index: number) => {
    if (disabled || showResult) { return; }

    setPendingSelections((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });
  };

  const handleConfirm = () => {
    if (pendingSelections.length > 0) {
      onSelect(pendingSelections);
    }
  };

  const isOptionSelected = (index: number) => {
    if (showResult) {
      return selectedAnswers?.includes(index) ?? false;
    }
    return pendingSelections.includes(index);
  };

  const isOptionCorrect = (index: number) => {
    return question.correctIndices.includes(index);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.questionText, { color: theme.textColor }]}>
        {question.question}
      </Text>

      <Text style={[styles.instruction, { color: theme.textColor }]}>
        Select all that apply
      </Text>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => {
          const isSelected = isOptionSelected(index);
          const isCorrect = isOptionCorrect(index);

          let backgroundColor = theme.secondaryBackground;
          let borderColor = 'transparent';

          if (showResult) {
            if (isCorrect) {
              backgroundColor = '#69db7c40';
            } else if (isSelected) {
              backgroundColor = '#ff6b6b40';
            }
          } else if (isSelected) {
            borderColor = theme.accentColor;
          }

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                { backgroundColor, borderColor, borderWidth: isSelected && !showResult ? 2 : 0 },
              ]}
              onPress={() => handleOptionToggle(index)}
              disabled={disabled || showResult}
            >
              <View style={[
                styles.checkbox,
                { borderColor: showResult ? 'transparent' : theme.textColor },
                isSelected && !showResult && { backgroundColor: theme.accentColor, borderColor: theme.accentColor },
              ]}>
                {isSelected && !showResult && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
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

      {!showResult && (
        <TouchableOpacity
          style={[
            styles.confirmButton,
            { backgroundColor: pendingSelections.length > 0 ? theme.accentColor : theme.secondaryBackground },
          ]}
          onPress={handleConfirm}
          disabled={pendingSelections.length === 0}
        >
          <Text style={[
            styles.confirmButtonText,
            { color: pendingSelections.length > 0 ? '#ffffff' : theme.textColor, opacity: pendingSelections.length > 0 ? 1 : 0.5 },
          ]}>
            Confirm Selection
          </Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 12,
    lineHeight: 32,
  },
  instruction: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 24,
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
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
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
  confirmButton: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
