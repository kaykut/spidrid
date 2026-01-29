import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, LETTER_SPACING } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useJourneyStore } from '../../store/journeyStore';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { useTheme } from '../common/ThemeProvider';
import { JourneyProgressCard } from '../journey/JourneyProgressCard';
import { Ionicons } from '@expo/vector-icons';

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
  const { t } = useTranslation('content');
  const { certProgress, avgWpmLast3, avgCompLast5 } = useJourneyStore();
  const [isExpanded, setIsExpanded] = useState(false);

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
    <View style={styles.content}>
      <View style={styles.row}>
        <StatItem
          value={articlesRead}
          label={t('stats.devoured')}
          color={theme.accentColor}
        />
        <StatItem
          value={formatNumber(totalWords)}
          label={t('stats.words')}
          color={theme.accentColor}
        />
        <StatItem
          value={`${averageComprehension}%`}
          label={t('stats.retention')}
          color={JOURNEY_COLORS.success}
        />
        <StatItem
          value={bestWPM}
          label={t('stats.best_wpm')}
          color={JOURNEY_COLORS.premiumAccent}
        />
      </View>
      <TouchableOpacity
        style={styles.expandToggle}
        onPress={() => setIsExpanded((prev) => !prev)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={SIZES.iconXs}
          color={withOpacity(theme.textColor, OPACITY.medium)}
        />
      </TouchableOpacity>
      {isExpanded ? (
        <View style={styles.journeyContainer}>
          <JourneyProgressCard
            avgWpm={avgWpmLast3}
            avgComp={avgCompLast5}
            certProgress={certProgress}
            style={styles.journeyCard}
          />
        </View>
      ) : null}
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
  content: {
    paddingVertical: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
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
  expandToggle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
  },
  journeyContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  journeyCard: {
    marginTop: SPACING.xs,
  },
});
