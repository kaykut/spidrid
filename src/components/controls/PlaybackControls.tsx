import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../common/ThemeProvider';
import { useSubscriptionStore } from '../../store/subscriptionStore';

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
        >
          <Text style={[styles.wpmButtonText, { color: theme.textColor }]}>-</Text>
        </TouchableOpacity>

        <View style={styles.wpmDisplay}>
          <Text style={[styles.wpmValue, { color: theme.accentColor }]}>{wpm}</Text>
          <Text style={[styles.wpmLabel, { color: theme.textColor }]}>
            WPM{!isPremium && ` (max ${maxWPM})`}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.wpmButton, { backgroundColor: theme.secondaryBackground }]}
          onPress={increaseWPM}
        >
          <Text style={[styles.wpmButtonText, { color: theme.textColor }]}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Main controls */}
      <View style={styles.mainControls}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: theme.secondaryBackground }]}
          onPress={onRewind}
        >
          <Ionicons name="play-skip-back" size={24} color={theme.textColor} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: theme.accentColor }]}
          onPress={onToggle}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: theme.secondaryBackground }]}
          onPress={onSkip}
        >
          <Ionicons name="play-skip-forward" size={24} color={theme.textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  counter: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  wpmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  wpmButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wpmButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  wpmDisplay: {
    alignItems: 'center',
    minWidth: 80,
  },
  wpmValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  wpmLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
