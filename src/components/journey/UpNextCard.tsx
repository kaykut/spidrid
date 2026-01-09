/**
 * UpNextCard Component
 *
 * Single article recommendation card for the Simple Version Journey.
 * Features article info, WPM slider, and start reading CTA.
 *
 * Implements PRD Section 4.4 - "Quiet Velocity" design language.
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { SPACING, COMPONENT_RADIUS, COMPONENT_SPACING, SIZES, SHADOWS, LINE_HEIGHTS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useTheme } from '../common/ThemeProvider';

// =============================================================================
// Types
// =============================================================================

export interface UpNextCardProps {
  /** Article identifier */
  articleId: string;
  /** Article title */
  title: string;
  /** Topic name for metadata display */
  topicName: string;
  /** Word count for the article */
  wordCount: number;
  /** Initially suggested WPM for the slider */
  suggestedWpm: number;
  /** Minimum WPM for slider (default: 100) */
  minWpm?: number;
  /** Maximum WPM for slider (default: 1000) */
  maxWpm?: number;
  /** WPM step increment (default: 25) */
  wpmStep?: number;
  /** Called when user taps "Start Reading" */
  onStart: (articleId: string, wpm: number) => void;
  /** Called when WPM slider value changes */
  onWpmChange?: (wpm: number) => void;
}

// =============================================================================
// Constants
// =============================================================================

const TEAL_ACCENT = JOURNEY_COLORS.accent;
const DEFAULT_MIN_WPM = 100;
const DEFAULT_MAX_WPM = 1000;
const DEFAULT_WPM_STEP = 25;
const THUMB_SIZE = 24;
const TRACK_HEIGHT = 6;
const SLIDER_PADDING = SPACING.lg;

// Calculate slider width based on screen width minus card padding
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_HORIZONTAL_PADDING = COMPONENT_SPACING.screenPadding * 2;
const SLIDER_WIDTH = SCREEN_WIDTH - CARD_HORIZONTAL_PADDING - (COMPONENT_SPACING.cardPadding * 2) - (SLIDER_PADDING * 2);

// =============================================================================
// Helpers
// =============================================================================

/**
 * Calculate estimated reading time in minutes
 */
function calculateReadingTime(wordCount: number, wpm: number): number {
  if (wpm <= 0) {return 0;}
  return Math.ceil(wordCount / wpm);
}

/**
 * Format word count with comma separators
 */
function formatWordCount(count: number): string {
  return count.toLocaleString();
}

// =============================================================================
// Component
// =============================================================================

export function UpNextCard({
  articleId,
  title,
  topicName,
  wordCount,
  suggestedWpm,
  minWpm = DEFAULT_MIN_WPM,
  maxWpm = DEFAULT_MAX_WPM,
  wpmStep = DEFAULT_WPM_STEP,
  onStart,
  onWpmChange,
}: UpNextCardProps) {
  const { theme } = useTheme();
  const [selectedWpm, setSelectedWpm] = useState(suggestedWpm);
  const sliderRef = useRef<View>(null);
  const sliderOffset = useRef<number>(0);

  const estimatedMinutes = calculateReadingTime(wordCount, selectedWpm);

  // Convert WPM value to position on the slider track
  const valueToPosition = useCallback(
    (value: number): number => {
      const ratio = (value - minWpm) / (maxWpm - minWpm);
      return ratio * SLIDER_WIDTH;
    },
    [minWpm, maxWpm]
  );

  // Convert position on slider track to WPM value
  const positionToValue = useCallback(
    (position: number): number => {
      const ratio = Math.max(0, Math.min(1, position / SLIDER_WIDTH));
      const rawValue = minWpm + ratio * (maxWpm - minWpm);
      // Snap to step
      return Math.round(rawValue / wpmStep) * wpmStep;
    },
    [minWpm, maxWpm, wpmStep]
  );

  // Handle slider drag
  const handleSliderMove = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      const position = Math.max(0, Math.min(SLIDER_WIDTH, gestureState.moveX - sliderOffset.current));
      const value = positionToValue(position);
      setSelectedWpm(value);
      onWpmChange?.(value);
    },
    [positionToValue, onWpmChange]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Calculate the offset from the left edge of the slider container
        sliderRef.current?.measure((_x, _y, _width, _height, pageX) => {
          sliderOffset.current = pageX + SLIDER_PADDING;
        });
      },
      onPanResponderMove: handleSliderMove,
      onPanResponderRelease: handleSliderMove,
    })
  ).current;

  const handleStart = useCallback(() => {
    onStart(articleId, selectedWpm);
  }, [articleId, selectedWpm, onStart]);

  // Calculate thumb position
  const thumbPosition = valueToPosition(selectedWpm);

  return (
    <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
      {/* Section Label */}
      <Text style={[styles.sectionLabel, { color: JOURNEY_COLORS.textSecondary }]}>
        UP NEXT
      </Text>

      {/* Article Title */}
      <Text
        style={[styles.title, { color: theme.textColor }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {title}
      </Text>

      {/* Metadata Row */}
      <View style={styles.metadataRow}>
        <Text style={[styles.metadata, { color: JOURNEY_COLORS.textSecondary }]}>
          {topicName}
        </Text>
        <Text style={[styles.metadataSeparator, { color: JOURNEY_COLORS.textTertiary }]}>
          {' \u2022 '}
        </Text>
        <Text style={[styles.metadata, { color: JOURNEY_COLORS.textSecondary }]}>
          {formatWordCount(wordCount)} words
        </Text>
        <Text style={[styles.metadataSeparator, { color: JOURNEY_COLORS.textTertiary }]}>
          {' \u2022 '}
        </Text>
        <Text style={[styles.metadata, { color: JOURNEY_COLORS.textSecondary }]}>
          ~{estimatedMinutes} min
        </Text>
      </View>

      {/* WPM Slider Section */}
      <View style={styles.sliderSection}>
        <View style={styles.sliderHeader}>
          <Text style={[styles.sliderLabel, { color: JOURNEY_COLORS.textSecondary }]}>
            Reading Speed
          </Text>
          <Text style={[styles.wpmValue, { color: TEAL_ACCENT }]}>
            {selectedWpm} WPM
          </Text>
        </View>

        {/* Custom Slider */}
        <View
          ref={sliderRef}
          style={styles.sliderContainer}
          {...panResponder.panHandlers}
        >
          {/* Track Background */}
          <View style={[styles.sliderTrack, { backgroundColor: JOURNEY_COLORS.surfaceLight }]}>
            {/* Filled Track */}
            <View
              style={[
                styles.sliderTrackFill,
                {
                  width: thumbPosition,
                  backgroundColor: TEAL_ACCENT,
                },
              ]}
            />
          </View>

          {/* Thumb */}
          <View
            style={[
              styles.sliderThumb,
              {
                left: thumbPosition - THUMB_SIZE / 2 + SLIDER_PADDING,
                backgroundColor: JOURNEY_COLORS.textPrimary,
              },
            ]}
          />
        </View>

        {/* Range Labels */}
        <View style={styles.sliderRange}>
          <Text style={[styles.rangeLabel, { color: JOURNEY_COLORS.textTertiary }]}>
            {minWpm}
          </Text>
          <Text style={[styles.rangeLabel, { color: JOURNEY_COLORS.textTertiary }]}>
            {maxWpm}
          </Text>
        </View>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: TEAL_ACCENT }]}
        activeOpacity={0.8}
        onPress={handleStart}
      >
        <Text style={styles.startButtonText}>Start Reading</Text>
      </TouchableOpacity>
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles = StyleSheet.create({
  container: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: COMPONENT_SPACING.cardPadding,
  },
  sectionLabel: {
    ...TYPOGRAPHY.sectionTitle,
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.cardTitle,
    lineHeight: LINE_HEIGHTS.loose,
    marginBottom: SPACING.sm,
  },
  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  metadata: {
    ...TYPOGRAPHY.label,
  },
  metadataSeparator: {
    ...TYPOGRAPHY.label,
  },
  sliderSection: {
    marginBottom: SPACING.xl,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sliderLabel: {
    ...TYPOGRAPHY.label,
  },
  wpmValue: {
    ...TYPOGRAPHY.metric,
    fontSize: TYPOGRAPHY.button.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  sliderContainer: {
    height: SIZES.touchTarget,
    justifyContent: 'center',
    paddingHorizontal: SLIDER_PADDING,
  },
  sliderTrack: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    overflow: 'hidden',
  },
  sliderTrackFill: {
    height: '100%',
    borderRadius: TRACK_HEIGHT / 2,
  },
  sliderThumb: {
    position: 'absolute',
    top: (SIZES.touchTarget - THUMB_SIZE) / 2,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    ...SHADOWS.md,
  },
  sliderRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SLIDER_PADDING,
    marginTop: SPACING.xs,
  },
  rangeLabel: {
    ...TYPOGRAPHY.caption,
    fontVariant: ['tabular-nums'],
  },
  startButton: {
    paddingVertical: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    ...TYPOGRAPHY.button,
    color: JOURNEY_COLORS.background,
  },
});
