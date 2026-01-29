import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { PauseLevel } from '../../types/settings';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { useTheme } from '../common/ThemeProvider';

const LEVELS: PauseLevel[] = ['off', 'short', 'medium', 'long'];
const DOT_SIZE = SIZES.sliderTrack;

interface PauseLevelSliderProps {
  label: string;
  description?: string;
  value: PauseLevel;
  onChange: (value: PauseLevel) => void;
  legendLabels: Record<PauseLevel, string>;
  notRecommendedLabel?: string;
}

export function PauseLevelSlider({
  label,
  description,
  value,
  onChange,
  legendLabels,
  notRecommendedLabel,
}: PauseLevelSliderProps) {
  const { theme } = useTheme();
  const [trackWidth, setTrackWidth] = useState(0);
  const trackOffset = SIZES.sliderThumb / 2;

  const selectedIndex = LEVELS.indexOf(value);
  const step = trackWidth > 0 ? trackWidth / (LEVELS.length - 1) : 0;
  const thumbLeft = trackOffset + step * selectedIndex - SIZES.sliderThumb / 2;
  const fillWidth = step * selectedIndex;

  const updateFromX = (x: number) => {
    if (trackWidth <= 0) {return;}
    const clamped = Math.max(trackOffset, Math.min(trackOffset + trackWidth, x));
    const normalized = clamped - trackOffset;
    const index = Math.round(normalized / step);
    const nextValue = LEVELS[Math.max(0, Math.min(LEVELS.length - 1, index))];
    if (nextValue !== value) {
      onChange(nextValue);
    }
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => updateFromX(event.nativeEvent.locationX),
        onPanResponderMove: (event) => updateFromX(event.nativeEvent.locationX),
        onPanResponderRelease: (event) => updateFromX(event.nativeEvent.locationX),
      }),
    [trackWidth, step, value, onChange]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
        <Text style={[styles.valueLabel, { color: theme.textSecondaryColor }]}>
          {legendLabels[value]}
        </Text>
      </View>
      {description ? (
        <Text style={[styles.description, { color: JOURNEY_COLORS.textSecondary }]}>
          {description}
        </Text>
      ) : null}
      <View
        style={styles.sliderArea}
        onLayout={(event) => {
          const width = event.nativeEvent.layout.width - SIZES.sliderThumb;
          setTrackWidth(Math.max(0, width));
        }}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            styles.track,
            {
              backgroundColor: theme.trackColor,
              left: trackOffset,
              right: trackOffset,
            },
          ]}
        />
        <View
          style={[
            styles.trackFill,
            {
              backgroundColor: theme.accentColor,
              left: trackOffset,
              width: fillWidth,
            },
          ]}
        />
        {LEVELS.map((level, index) => {
          const isActive = index <= selectedIndex;
          const dotLeft = trackOffset + step * index - DOT_SIZE / 2;
          return (
            <View
              key={`pause-dot-${level}`}
              style={[
                styles.dot,
                {
                  left: dotLeft,
                  backgroundColor: isActive ? theme.accentColor : withOpacity(theme.textColor, OPACITY.subtle),
                },
              ]}
            />
          );
        })}
        <View
          style={[
            styles.thumb,
            {
              left: thumbLeft,
              backgroundColor: theme.accentColor,
              shadowColor: theme.accentColor,
            },
          ]}
        />
      </View>
      <View style={styles.legendRow}>
        {LEVELS.map((level) => (
          <Text
            key={`pause-label-${level}`}
            style={[
              styles.legendLabel,
              {
                color: value === level
                  ? theme.textColor
                  : withOpacity(theme.textColor, OPACITY.medium),
              },
            ]}
          >
            {legendLabels[level]}
          </Text>
        ))}
      </View>
      {notRecommendedLabel && value === 'off' ? (
        <Text style={[styles.notRecommended, { color: JOURNEY_COLORS.warning }]}>
          {notRecommendedLabel}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.body,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  valueLabel: {
    ...TYPOGRAPHY.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.sm,
  },
  sliderArea: {
    height: SIZES.touchTarget,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    height: SIZES.sliderTrack,
    borderRadius: COMPONENT_RADIUS.progressBar,
  },
  trackFill: {
    position: 'absolute',
    height: SIZES.sliderTrack,
    borderRadius: COMPONENT_RADIUS.progressBar,
  },
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  thumb: {
    position: 'absolute',
    width: SIZES.sliderThumb,
    height: SIZES.sliderThumb,
    borderRadius: SIZES.sliderThumb / 2,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  legendLabel: {
    ...TYPOGRAPHY.caption,
  },
  notRecommended: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xs,
  },
});
