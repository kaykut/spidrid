import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { SPACING, RADIUS, SIZES, SHADOWS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { useTheme } from '../common/ThemeProvider';
import type { NumericQuestion as NumericQuestionType } from '../../types/learning';

interface NumericQuestionProps {
  question: NumericQuestionType;
  selectedAnswer: number | null;
  onSelect: (value: number) => void;
  disabled: boolean;
}

const SLIDER_WIDTH = Dimensions.get('window').width - (SPACING.huge * 2);
const THUMB_SIZE = SIZES.iconXl;

export function NumericQuestion({
  question,
  selectedAnswer,
  onSelect,
  disabled,
}: NumericQuestionProps) {
  const { theme } = useTheme();
  const showResult = selectedAnswer !== null;

  const { min, max, step = 1, unit = '', correctValue, tolerance } = question;

  // Calculate initial value at center or correct answer
  const initialValue = Math.round((min + max) / 2 / step) * step;
  const [currentValue, setCurrentValue] = useState(initialValue);

  const valueToPosition = (value: number) => {
    const ratio = (value - min) / (max - min);
    return ratio * SLIDER_WIDTH;
  };

  const positionToValue = (position: number) => {
    const ratio = Math.max(0, Math.min(1, position / SLIDER_WIDTH));
    const rawValue = min + ratio * (max - min);
    // Snap to step
    return Math.round(rawValue / step) * step;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled && !showResult,
    onMoveShouldSetPanResponder: () => !disabled && !showResult,
    onPanResponderMove: (_, gestureState) => {
      const position = Math.max(0, Math.min(SLIDER_WIDTH, gestureState.moveX - SPACING.huge));
      const value = positionToValue(position);
      setCurrentValue(value);
    },
  });

  const handleSubmit = () => {
    onSelect(currentValue);
  };

  const isCorrect = showResult && Math.abs(selectedAnswer! - correctValue) <= tolerance;
  const displayValue = showResult ? selectedAnswer! : currentValue;

  // Calculate positions for correct range indicator
  const correctMinPos = valueToPosition(Math.max(min, correctValue - tolerance));
  const correctMaxPos = valueToPosition(Math.min(max, correctValue + tolerance));

  return (
    <View style={styles.container}>
      <Text style={[styles.questionText, { color: theme.textColor }]}>
        {question.question}
      </Text>

      <View style={styles.valueDisplay}>
        <Text style={[styles.currentValue, { color: theme.accentColor }]}>
          {displayValue}{unit ? ` ${unit}` : ''}
        </Text>
        {showResult && (
          <Text style={[
            styles.resultText,
            { color: isCorrect ? '#69db7c' : '#ff6b6b' },
          ]}>
            {isCorrect ? '✓ Correct!' : `✗ Answer: ${correctValue}${unit ? ` ${unit}` : ''}`}
          </Text>
        )}
      </View>

      <View style={styles.sliderContainer}>
        {/* Track */}
        <View style={[styles.track, { backgroundColor: theme.secondaryBackground }]}>
          {/* Correct range indicator (shown after answer) */}
          {showResult && (
            <View
              style={[
                styles.correctRange,
                {
                  left: correctMinPos,
                  width: correctMaxPos - correctMinPos,
                },
              ]}
            />
          )}

          {/* Filled portion */}
          <View
            style={[
              styles.trackFill,
              {
                width: valueToPosition(displayValue),
                backgroundColor: showResult
                  ? (isCorrect ? '#69db7c' : '#ff6b6b')
                  : theme.accentColor,
              },
            ]}
          />
        </View>

        {/* Thumb */}
        <View
          {...panResponder.panHandlers}
          style={[
            styles.thumb,
            {
              left: valueToPosition(displayValue) - THUMB_SIZE / 2 + SPACING.huge,
              backgroundColor: showResult
                ? (isCorrect ? '#69db7c' : '#ff6b6b')
                : theme.accentColor,
            },
          ]}
        />

        {/* Min/Max labels */}
        <View style={styles.labelsContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            {min}{unit ? ` ${unit}` : ''}
          </Text>
          <Text style={[styles.label, { color: theme.textColor }]}>
            {max}{unit ? ` ${unit}` : ''}
          </Text>
        </View>
      </View>

      {!showResult && (
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: theme.accentColor }]}
          onPress={handleSubmit}
          disabled={disabled}
        >
          <Text style={styles.submitButtonText}>Submit Answer</Text>
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
    marginBottom: SPACING.xxl,
    lineHeight: SPACING.xxxl,
  },
  valueDisplay: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  currentValue: {
    ...TYPOGRAPHY.vsNumber,
    fontSize: SPACING.massive, // 48px for large numeric display
  },
  resultText: {
    ...TYPOGRAPHY.button,
    marginTop: SPACING.sm,
  },
  sliderContainer: {
    paddingHorizontal: SPACING.huge,
    height: SPACING.huge * 2, // 80px
  },
  track: {
    height: SIZES.progressBarHeight,
    borderRadius: RADIUS.xs,
    marginTop: SPACING.md,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: RADIUS.xs,
  },
  correctRange: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#69db7c60',
  },
  thumb: {
    position: 'absolute',
    top: 0,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    ...SHADOWS.md,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.7,
  },
  submitButton: {
    marginTop: SPACING.xxl,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    ...TYPOGRAPHY.button,
  },
});
