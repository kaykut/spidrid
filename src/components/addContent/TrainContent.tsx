/**
 * TrainContent - Training Topics Grid
 *
 * Displays topics grid for selecting pre-generated training content.
 * Extracted from train.tsx for use in add-content modal.
 */

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { TOPICS } from '../../data/curriculum';
import { useLearningStore } from '../../store/learningStore';
import { useTheme } from '../common/ThemeProvider';

interface TrainContentProps {
  onClose: () => void;
}

export function TrainContent({ onClose }: TrainContentProps) {
  const { theme } = useTheme();
  const { getTopicProgress } = useLearningStore();

  const handleTopicPress = (topicId: string) => {
    onClose();
    router.push(`/topic/${topicId}`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.description, { color: theme.textColor }]}>
        Choose from pre-generated articles to practice speed reading skills.
      </Text>
      <View style={styles.topicsGrid}>
        {TOPICS.map((topic) => {
          const progress = getTopicProgress(topic.id);
          const progressPercent = Math.round(
            (progress.articlesCompleted / progress.totalArticles) * 100
          );

          return (
            <TouchableOpacity
              key={topic.id}
              style={[styles.topicCard, { backgroundColor: theme.secondaryBackground }]}
              onPress={() => handleTopicPress(topic.id)}
            >
              <View style={[styles.topicIcon, { backgroundColor: `${topic.color}20` }]}>
                <Text style={styles.topicEmoji}>{topic.icon}</Text>
              </View>
              <Text style={[styles.topicName, { color: theme.textColor }]}>{topic.name}</Text>
              <Text style={[styles.topicDesc, { color: theme.textColor }]} numberOfLines={1}>
                {topic.description}
              </Text>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { backgroundColor: theme.crosshairColor }]}>
                  <View
                    style={[
                      styles.progressFill,
                      { backgroundColor: topic.color, width: `${progressPercent}%` },
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: theme.textColor }]}>
                  {progress.articlesCompleted}/{progress.totalArticles}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: SPACING.xxxl,
  },
  description: {
    ...TYPOGRAPHY.body,
    opacity: 0.7,
    marginBottom: SPACING.xl,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  topicCard: {
    width: '47%',
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.card,
  },
  topicIcon: {
    width: SIZES.iconLg,
    height: SIZES.iconLg,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  topicEmoji: {
    fontSize: SIZES.iconLg,
  },
  topicName: {
    ...TYPOGRAPHY.cardSubtitle,
    marginBottom: SPACING.xs,
  },
  topicDesc: {
    ...TYPOGRAPHY.caption,
    opacity: 0.6,
    marginBottom: SPACING.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  progressBar: {
    flex: 1,
    height: SIZES.progressBarHeight,
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
  },
});
