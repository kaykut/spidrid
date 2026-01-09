/**
 * GeneratedArticleCard Component
 *
 * Card displaying a generated article in the Learn tab list.
 * Shows title, topic, tone, word count, date, and completion stats.
 */

import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { GeneratedArticle, TONE_DEFINITIONS } from '../../types/generated';
import { useTheme } from '../common/ThemeProvider';

interface Props {
  article: GeneratedArticle;
  onPress: () => void;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function GeneratedArticleCard({ article, onPress }: Props) {
  const { theme } = useTheme();
  const toneDefinition = TONE_DEFINITIONS.find((t) => t.id === article.tone);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.secondaryBackground }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textColor }]} numberOfLines={2}>
          {article.title}
        </Text>
        {article.completed && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={SIZES.iconSm} color={theme.accentColor} />
          </View>
        )}
      </View>

      <Text style={[styles.topic, { color: JOURNEY_COLORS.textSecondary }]} numberOfLines={1}>
        "{article.topic}"
      </Text>

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <Text style={styles.metaText}>{toneDefinition?.emoji}</Text>
          <Text style={[styles.metaText, { color: JOURNEY_COLORS.textSecondary }]}>
            {toneDefinition?.label}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons
            name="document-text-outline"
            size={SIZES.iconXs}
            color={JOURNEY_COLORS.textSecondary}
          />
          <Text style={[styles.metaText, { color: JOURNEY_COLORS.textSecondary }]}>
            {article.wordCount} words
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons
            name="calendar-outline"
            size={SIZES.iconXs}
            color={JOURNEY_COLORS.textSecondary}
          />
          <Text style={[styles.metaText, { color: JOURNEY_COLORS.textSecondary }]}>
            {formatDate(article.generatedAt)}
          </Text>
        </View>
      </View>

      {article.completed && article.comprehensionScore !== undefined && (
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Ionicons name="speedometer-outline" size={SIZES.iconSm} color={theme.accentColor} />
            <Text style={[styles.statText, { color: theme.accentColor }]}>
              {article.highestWPM} WPM
            </Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="school-outline" size={SIZES.iconSm} color={theme.accentColor} />
            <Text style={[styles.statText, { color: theme.accentColor }]}>
              {article.comprehensionScore}%
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    ...TYPOGRAPHY.cardTitle,
    flex: 1,
    marginRight: SPACING.sm,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topic: {
    ...TYPOGRAPHY.label,
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    gap: SPACING.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  metaText: {
    ...TYPOGRAPHY.caption,
  },
  stats: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.lg,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statText: {
    ...TYPOGRAPHY.label,
    fontWeight: '500',
  },
});
