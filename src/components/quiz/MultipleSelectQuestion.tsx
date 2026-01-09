import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SPACING, COMPONENT_RADIUS, SIZES, LINE_HEIGHTS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS, COLOR_OPACITY, COLORS } from '../../data/themes';
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
          let borderColor: string = COLORS.transparent;

          if (showResult) {
            if (isCorrect) {
              backgroundColor = COLOR_OPACITY.successTint;
            } else if (isSelected) {
              backgroundColor = COLOR_OPACITY.lowTint;
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
                { borderColor: showResult ? COLORS.transparent : theme.textColor },
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
            { color: pendingSelections.length > 0 ? JOURNEY_COLORS.textPrimary : theme.textColor, opacity: pendingSelections.length > 0 ? 1 : 0.5 },
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
    ...TYPOGRAPHY.sectionHeader,
    textAlign: 'center',
    marginBottom: SPACING.md,
    lineHeight: LINE_HEIGHTS.xxxl,
  },
  instruction: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: SPACING.xxl,
  },
  optionsContainer: {
    gap: SPACING.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.buttonLarge,
  },
  checkbox: {
    width: SIZES.iconLg,
    height: SIZES.iconLg,
    borderRadius: COMPONENT_RADIUS.chip / 2,
    borderWidth: 2,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.bold,
  },
  optionText: {
    flex: 1,
    ...TYPOGRAPHY.button,
  },
  correctIndicator: {
    ...TYPOGRAPHY.metric,
    color: JOURNEY_COLORS.success,
    fontWeight: FONT_WEIGHTS.bold,
  },
  incorrectIndicator: {
    ...TYPOGRAPHY.metric,
    color: JOURNEY_COLORS.low,
    fontWeight: FONT_WEIGHTS.bold,
  },
  confirmButton: {
    marginTop: SPACING.xxl,
    paddingVertical: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
  },
  confirmButtonText: {
    ...TYPOGRAPHY.button,
  },
});
