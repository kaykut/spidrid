/**
 * Topics Browser Screen
 *
 * Sub-screen accessible from Journey tab's "Browse All Topics" button.
 * Shows topic grid with progress indicators.
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EdgeFadeScrollView } from '../components/common/EdgeFadeScrollView';
import { useTheme } from '../components/common/ThemeProvider';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { TOPICS } from '../data/curriculum';
import { getCurriculumTopicsForInterests } from '../data/interests';
import { useLearningStore } from '../store/learningStore';
import { useOnboardingStore } from '../store/onboardingStore';

export default function TopicsScreen() {
  const { theme } = useTheme();
  const { getTopicProgress } = useLearningStore();
  const { selectedInterests } = useOnboardingStore();

  // Filter topics based on selected interests
  const allowedTopicIds = getCurriculumTopicsForInterests(selectedInterests);
  const filteredTopics = selectedInterests.length > 0
    ? TOPICS.filter((t) => allowedTopicIds.includes(t.id))
    : TOPICS;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={SIZES.iconLg} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>Topics</Text>
        <View style={styles.backButton} />
      </View>

      <EdgeFadeScrollView contentContainerStyle={styles.content}>
        {/* Topics Grid */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...TYPOGRAPHY.pageTitle,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.huge,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  topicCard: {
    width: '48%',
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.lg,
  },
  topicIcon: {
    width: SIZES.touchTarget + 4,
    height: SIZES.touchTarget + 4,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
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
    height: SPACING.xs,
    borderRadius: SPACING.xs / 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    opacity: 0.7,
  },
});
