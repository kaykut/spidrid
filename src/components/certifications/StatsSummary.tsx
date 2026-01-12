import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, LETTER_SPACING } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useTheme } from '../common/ThemeProvider';

interface StatsSummaryProps {
  articlesRead: number;
  totalWords: number;
  averageComprehension: number;
  bestWPM: number;
  /** When true, renders without gradient background (for use inside GlassView) */
  transparent?: boolean;
}

export function StatsSummary({
  articlesRead,
  totalWords,
  averageComprehension,
  bestWPM,
  transparent = false,
}: StatsSummaryProps) {
  const { theme } = useTheme();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const content = (
    <View style={styles.row}>
      <StatItem
        value={articlesRead}
        label="Articles"
        color={theme.accentColor}
      />
      <StatItem
        value={formatNumber(totalWords)}
        label="Words"
        color={theme.accentColor}
      />
      <StatItem
        value={`${averageComprehension}%`}
        label="Comprehension"
        color={JOURNEY_COLORS.success}
      />
      <StatItem
        value={bestWPM}
        label="Best WPM"
        color={JOURNEY_COLORS.warmAccent}
      />
    </View>
  );

  if (transparent) {
    return <View style={styles.container}>{content}</View>;
  }

  return (
    <LinearGradient
      colors={[theme.secondaryBackground, theme.secondaryBackgroundGradient]}
      style={styles.container}
    >
      {content}
    </LinearGradient>
  );
}

interface StatItemProps {
  value: string | number;
  label: string;
  color: string;
}

function StatItem({ value, label, color }: StatItemProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text
        style={[styles.statLabel, { color: theme.textColor }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: COMPONENT_RADIUS.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
    marginVertical: SPACING.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  statValue: {
    ...TYPOGRAPHY.metricLarge,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: LETTER_SPACING.tight,
  },
});
