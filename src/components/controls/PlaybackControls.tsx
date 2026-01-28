import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SPACING, COMPONENT_RADIUS, SIZES, space } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { useTheme } from '../common/ThemeProvider';

interface PlaybackControlsProps {
  isPlaying: boolean;
  wpm: number;
  progress: number;
  currentIndex: number;
  totalWords: number;
  onToggle: () => void;
  onWPMChange: (wpm: number) => void;
  onRewind: () => void;
  onSkip: () => void;
  onWPMLimitHit?: () => void;
}

// Component-specific sizes based on 8pt grid
const CONTROL_SIZES = {
  controlButton: space(7), // 56
  playButton: space(9), // 72
  wpmDisplayMinWidth: space(10), // 80
  progressBarHeight: SIZES.progressBarHeight, // 8
  progressBarRadius: COMPONENT_RADIUS.progressBar, // 6
  playIconSize: SIZES.iconMd, // 32
};

/**
 * PlaybackControls Component
 *
 * Provides play/pause, WPM adjustment, and navigation controls.
 */
export function PlaybackControls({
  isPlaying,
  wpm,
  progress,
  currentIndex,
  totalWords,
  onToggle,
  onWPMChange,
  onRewind,
  onSkip,
  onWPMLimitHit,
}: PlaybackControlsProps) {
  const { theme } = useTheme();
  const { t } = useTranslation('playback');
  const { t: tCommon } = useTranslation('common');
  const { getMaxWPM, isPremium } = useSubscriptionStore();
  const maxWPM = getMaxWPM();

  const decreaseWPM = () => onWPMChange(Math.max(50, wpm - 50));
  const increaseWPM = () => {
    const newWPM = wpm + 50;
    if (newWPM > maxWPM) {
      onWPMLimitHit?.();
    } else {
      onWPMChange(newWPM);
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <View style={[styles.progressBar, { backgroundColor: theme.crosshairColor }]}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: theme.accentColor, width: `${progress * 100}%` },
          ]}
        />
      </View>

      {/* Word counter */}
      <Text style={[styles.counter, { color: theme.textColor }]}>
        {currentIndex + 1} / {totalWords}
      </Text>

      {/* WPM controls */}
      <View style={styles.wpmContainer}>
        <TouchableOpacity
          style={[styles.wpmButton, { backgroundColor: theme.secondaryBackground }]}
          onPress={decreaseWPM}
          testID="playback.controls.wpm-decrease-btn"
          accessible={true}
        >
          <Text style={[styles.wpmButtonText, { color: theme.textColor }]}>-</Text>
        </TouchableOpacity>

        <View style={styles.wpmDisplay} testID="playback.controls.wpm-display">
          <Text style={[styles.wpmValue, { color: theme.accentColor }]}>{wpm}</Text>
          <Text style={[styles.wpmLabel, { color: theme.textColor }]}>
            {tCommon('wpm_suffix')}{!isPremium && ` ${t('controls.max_wpm', { max: maxWPM })}`}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.wpmButton, { backgroundColor: theme.secondaryBackground }]}
          onPress={increaseWPM}
          testID="playback.controls.wpm-increase-btn"
          accessible={true}
        >
          <Text style={[styles.wpmButtonText, { color: theme.textColor }]}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Main controls */}
      <View style={styles.mainControls}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: theme.secondaryBackground }]}
          onPress={onRewind}
          testID="playback.controls.skip-back-btn"
          accessible={true}
        >
          <Ionicons name="play-skip-back" size={SIZES.iconLg} color={theme.textColor} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: theme.accentColor }]}
          onPress={onToggle}
          testID="playback.controls.play-pause-btn"
          accessible={true}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={CONTROL_SIZES.playIconSize} color={JOURNEY_COLORS.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: theme.secondaryBackground }]}
          onPress={onSkip}
          testID="playback.controls.skip-forward-btn"
          accessible={true}
        >
          <Ionicons name="play-skip-forward" size={SIZES.iconLg} color={theme.textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.xl,
    gap: SPACING.lg,
  },
  progressBar: {
    height: CONTROL_SIZES.progressBarHeight,
    borderRadius: CONTROL_SIZES.progressBarRadius,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: CONTROL_SIZES.progressBarRadius,
  },
  counter: {
    fontSize: TYPOGRAPHY.buttonSmall.fontSize,
    fontWeight: FONT_WEIGHTS.regular,
    textAlign: 'center',
    opacity: 0.7,
  },
  wpmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.lg,
  },
  wpmButton: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wpmButtonText: {
    fontSize: TYPOGRAPHY.metricLarge.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  wpmDisplay: {
    alignItems: 'center',
    minWidth: CONTROL_SIZES.wpmDisplayMinWidth,
  },
  wpmValue: {
    ...TYPOGRAPHY.statValue,
  },
  wpmLabel: {
    ...TYPOGRAPHY.labelSmall,
    opacity: 0.7,
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xl,
  },
  controlButton: {
    width: CONTROL_SIZES.controlButton,
    height: CONTROL_SIZES.controlButton,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: CONTROL_SIZES.playButton,
    height: CONTROL_SIZES.playButton,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
