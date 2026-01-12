/**
 * MiniTopicCard
 *
 * Compact topic card for 3-per-row grid in expandable Practice section.
 * Shows icon, title, and progress bar + counter.
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { Topic, TopicProgress } from '../../types/learning';
import { useTheme } from '../common/ThemeProvider';

interface MiniTopicCardProps {
  topic: Topic;
  progress: TopicProgress;
  cardWidth: number;
  backgroundColor?: string;
  onPress: () => void;
}

const ICON_CONTAINER_SIZE = 28;
const CARD_HEIGHT = 80;

export function MiniTopicCard({
  topic,
  progress,
  cardWidth,
  backgroundColor,
  onPress,
}: MiniTopicCardProps) {
  const { theme } = useTheme();

  const progressPercent =
    progress.totalArticles > 0
      ? Math.round((progress.articlesCompleted / progress.totalArticles) * 100)
      : 0;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          width: cardWidth,
          backgroundColor: backgroundColor ?? theme.secondaryBackground,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: `${topic.color}20` }]}>
        <Text style={styles.iconEmoji}>{topic.icon}</Text>
      </View>

      {/* Title */}
      <Text
        style={[styles.title, { color: theme.textColor }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {topic.name}
      </Text>

      {/* Progress bar + counter */}
      <View style={styles.progressRow}>
        <View style={[styles.progressTrack, { backgroundColor: theme.crosshairColor }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: topic.color,
                width: `${progressPercent}%`,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: theme.textColor }]}>
          {progress.articlesCompleted}/{progress.totalArticles}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    padding: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.chip,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 16,
  },
  title: {
    ...TYPOGRAPHY.labelSmall,
    textAlign: 'center',
    lineHeight: 14,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: SPACING.xs,
  },
  progressTrack: {
    flex: 1,
    height: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.progressBar,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: COMPONENT_RADIUS.progressBar,
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    opacity: 0.6,
    fontSize: 10,
  },
});
