/**
 * Train Sub-Tab Screen
 *
 * Shows pre-generated curriculum articles for RSVP skill training.
 * Displays topics grid for selecting training content.
 */

import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../../components/common/ThemeProvider';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../../constants/spacing';
import { TYPOGRAPHY } from '../../../constants/typography';
import { TOPICS } from '../../../data/curriculum';
import { useLearningStore } from '../../../store/learningStore';

export default function TrainScreen() {
  const { theme } = useTheme();
  const { getTopicProgress } = useLearningStore();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
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
              onPress={() => router.push(`/topic/${topic.id}`)}
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
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxxl,
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
