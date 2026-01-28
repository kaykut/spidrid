import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SPACING, COMPONENT_RADIUS, LINE_HEIGHTS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS, COLOR_OPACITY } from '../../data/themes';
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
  const { t } = useTranslation('quiz');
  const showResult = selectedAnswer !== null;

  const getButtonStyle = (value: boolean) => {
    let backgroundColor = theme.secondaryBackground;

    if (showResult) {
      const isCorrect = value === question.correctAnswer;
      const isSelected = value === selectedAnswer;

      if (isCorrect) {
        backgroundColor = COLOR_OPACITY.successTint;
      } else if (isSelected) {
        backgroundColor = COLOR_OPACITY.lowTint;
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
          accessibilityLabel={t('true')}
          accessibilityHint={disabled ? undefined : t('a11y.select_true')}
        >
          <Text style={[styles.answerButtonText, { color: theme.textColor }]}>
            {t('true')}
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
          accessibilityLabel={t('false')}
          accessibilityHint={disabled ? undefined : t('a11y.select_false')}
        >
          <Text style={[styles.answerButtonText, { color: theme.textColor }]}>
            {t('false')}
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
    ...TYPOGRAPHY.sectionHeader,
    textAlign: 'center',
    marginBottom: SPACING.xxxl,
    lineHeight: LINE_HEIGHTS.xxxl,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: SPACING.lg,
    justifyContent: 'center',
  },
  answerButton: {
    flex: 1,
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.xl,
    borderRadius: COMPONENT_RADIUS.buttonLarge,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    maxWidth: 160,
  },
  answerButtonText: {
    ...TYPOGRAPHY.metric,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  correctIndicator: {
    ...TYPOGRAPHY.metric,
    color: JOURNEY_COLORS.success,
    fontWeight: FONT_WEIGHTS.bold,
    marginLeft: SPACING.sm,
  },
  incorrectIndicator: {
    ...TYPOGRAPHY.metric,
    color: JOURNEY_COLORS.low,
    fontWeight: FONT_WEIGHTS.bold,
    marginLeft: SPACING.sm,
  },
});
