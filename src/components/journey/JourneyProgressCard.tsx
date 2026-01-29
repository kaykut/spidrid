import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COMPONENT_RADIUS } from '../../constants/spacing';
import { JourneyCertProgress, JourneyCertTier } from '../../types/journey';
import { useTheme } from '../common/ThemeProvider';
import { VerticalProgressPath } from './VerticalProgressPath';

interface JourneyProgressCardProps {
  avgWpm: number;
  avgComp: number;
  certProgress: Record<JourneyCertTier, JourneyCertProgress>;
  style?: ViewStyle;
}

export function JourneyProgressCard({
  avgWpm,
  avgComp,
  certProgress,
  style,
}: JourneyProgressCardProps) {
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={[theme.secondaryBackground, theme.secondaryBackgroundGradient]}
      style={[styles.container, style]}
    >
      <VerticalProgressPath
        avgWpm={avgWpm}
        avgComp={avgComp}
        certProgress={certProgress}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: COMPONENT_RADIUS.card / 2,
    overflow: 'hidden',
  },
});
