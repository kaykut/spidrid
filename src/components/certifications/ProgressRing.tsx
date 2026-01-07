import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../common/ThemeProvider';

interface ProgressRingProps {
  /** Progress value from 0 to 1 */
  progress: number;
  /** Size of the ring in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Progress color */
  color?: string;
  /** Show percentage text in center */
  showPercentage?: boolean;
  /** Center content (overrides showPercentage) */
  centerContent?: React.ReactNode;
}

export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 8,
  color,
  showPercentage = true,
  centerContent,
}: ProgressRingProps) {
  const { theme } = useTheme();
  const progressColor = color || theme.accentColor;

  // Calculate percentage
  const percentage = Math.round(progress * 100);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background circle (using borders) */}
      <View
        style={[
          styles.backgroundRing,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: theme.secondaryBackground,
          },
        ]}
      />

      {/* Progress arc - we'll use multiple segments to simulate an arc */}
      <View
        style={[
          styles.progressContainer,
          { width: size, height: size },
        ]}
      >
        {/* Top segment */}
        {progress > 0 && (
          <View
            style={[
              styles.progressSegment,
              {
                width: size,
                height: size / 2,
                borderTopLeftRadius: size / 2,
                borderTopRightRadius: size / 2,
                borderWidth: strokeWidth,
                borderBottomWidth: 0,
                borderColor: progressColor,
                opacity: progress >= 0.5 ? 1 : progress * 2,
              },
            ]}
          />
        )}
        {/* Bottom segment */}
        {progress > 0.5 && (
          <View
            style={[
              styles.progressSegmentBottom,
              {
                width: size,
                height: size / 2,
                borderBottomLeftRadius: size / 2,
                borderBottomRightRadius: size / 2,
                borderWidth: strokeWidth,
                borderTopWidth: 0,
                borderColor: progressColor,
                opacity: (progress - 0.5) * 2,
              },
            ]}
          />
        )}
      </View>

      {/* Center content */}
      <View style={[styles.centerContent, { width: size, height: size }]}>
        {centerContent || (showPercentage && (
          <Text style={[styles.percentageText, { color: theme.textColor }]}>
            {percentage}%
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  backgroundRing: {
    position: 'absolute',
  },
  progressContainer: {
    position: 'absolute',
  },
  progressSegment: {
    position: 'absolute',
    top: 0,
  },
  progressSegmentBottom: {
    position: 'absolute',
    bottom: 0,
  },
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
