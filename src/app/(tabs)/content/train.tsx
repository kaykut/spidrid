/**
 * Train Sub-Tab Screen
 *
 * Shows pre-generated curriculum articles for RSVP skill training.
 * Displays MetricsPanel (WPM + Comprehension) at top, followed by topics grid.
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { EdgeFadeScrollView } from '../../../components/common/EdgeFadeScrollView';
import { useTheme } from '../../../components/common/ThemeProvider';
import { MetricsPanel } from '../../../components/journey/MetricsPanel';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../../constants/spacing';
import { TYPOGRAPHY } from '../../../constants/typography';
import { TOPICS } from '../../../data/curriculum';
import { getCurriculumTopicsForInterests } from '../../../data/interests';
import { useLearningStore } from '../../../store/learningStore';
import { useOnboardingStore } from '../../../store/onboardingStore';

export default function TrainScreen() {
  const { theme } = useTheme();
  const { getTopicProgress, getRecentPerformance, getHighestWPM } = useLearningStore();
  const { selectedInterests } = useOnboardingStore();

  // Get recent performance for MetricsPanel
  const recentPerf = getRecentPerformance(5);
  const bestWpm = getHighestWPM();

  // Filter topics based on selected interests
  const allowedTopicIds = getCurriculumTopicsForInterests(selectedInterests);
  const filteredTopics = selectedInterests.length > 0
    ? TOPICS.filter((t) => allowedTopicIds.includes(t.id))
    : TOPICS;

  return (
    <EdgeFadeScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: theme.textColor }]}>Library</Text>

      {/* Metrics Panel - WPM and Comprehension only */}
      <MetricsPanel
        avgWpm={recentPerf.averageWPM}
        avgComprehension={recentPerf.averageAccuracy}
        streakDays={0}
        bestWpmAt80={bestWpm}
        hideStreak
      />

      {/* Demo Button */}
      <TouchableOpacity
        style={[styles.demoButton, { borderColor: theme.accentColor }]}
        onPress={() => router.push('/reader/demo')}
      >
        <Text style={[styles.demoButtonText, { color: theme.accentColor }]}>
          Try RSVP Demo
        </Text>
      </TouchableOpacity>

      {/* Topics Section */}
      <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Topics</Text>

      <View style={styles.topicsGrid}>
        {filteredTopics.map((topic) => {
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
    </EdgeFadeScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.pageTitle,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  demoButton: {
    borderWidth: 1,
    borderRadius: COMPONENT_RADIUS.button,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
  },
  demoButtonText: {
    ...TYPOGRAPHY.button,
  },
  sectionTitle: {
    ...TYPOGRAPHY.sectionHeader,
    marginBottom: SPACING.lg,
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
