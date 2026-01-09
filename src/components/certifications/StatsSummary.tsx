import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, COMPONENT_RADIUS, COMPONENT_SPACING, COMPONENT_SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, LETTER_SPACING } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useTheme } from '../common/ThemeProvider';

interface StatsSummaryProps {
  articlesRead: number;
  totalWords: number;
  averageAccuracy: number;
  bestWPM: number;
  tiersEarned: number;
}

export function StatsSummary({
  articlesRead,
  totalWords,
  averageAccuracy,
  bestWPM,
  tiersEarned,
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

  return (
    <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
      <View style={styles.row}>
        <StatItem
          value={articlesRead}
          label="Articles"
          color={theme.accentColor}
        />
        <StatItem
          value={formatNumber(totalWords)}
          label="Words Read"
          color={theme.accentColor}
        />
      </View>
      <View style={styles.row}>
        <StatItem
          value={`${averageAccuracy}%`}
          label="Avg. Accuracy"
          color={JOURNEY_COLORS.success}
        />
        <StatItem
          value={bestWPM}
          label="Best WPM"
          color={JOURNEY_COLORS.warmAccent}
        />
        <StatItem
          value={`${tiersEarned}/3`}
          label="Tiers"
          color={JOURNEY_COLORS.certificationAccent}
        />
      </View>
    </View>
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
      <Text style={[styles.statLabel, { color: theme.textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: COMPONENT_SPACING.cardPadding,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: SPACING.sm,
  },
  statItem: {
    alignItems: 'center',
    minWidth: COMPONENT_SIZES.statMinWidth,
  },
  statValue: {
    ...TYPOGRAPHY.metricLarge,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: LETTER_SPACING.tight,
  },
});
