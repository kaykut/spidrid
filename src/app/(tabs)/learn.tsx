import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../components/common/ThemeProvider';
import { EdgeFadeScrollView } from '../../components/common/EdgeFadeScrollView';
import { TOPICS } from '../../data/curriculum';
import { useLearningStore } from '../../store/learningStore';
import { useOnboardingStore } from '../../store/onboardingStore';
import { getCurriculumTopicsForInterests } from '../../data/interests';

export default function LearnScreen() {
  const { theme } = useTheme();
  const { getTopicProgress, getTotalArticlesCompleted, getHighestWPM } = useLearningStore();
  const { selectedInterests } = useOnboardingStore();

  const totalCompleted = getTotalArticlesCompleted();
  const highestWPM = getHighestWPM();

  // Filter topics based on selected interests
  const allowedTopicIds = getCurriculumTopicsForInterests(selectedInterests);
  const filteredTopics = selectedInterests.length > 0
    ? TOPICS.filter((t) => allowedTopicIds.includes(t.id))
    : TOPICS;

  return (
    <EdgeFadeScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: theme.textColor }]}>Learn</Text>

        {/* Stats Summary */}
        <View style={[styles.statsCard, { backgroundColor: theme.secondaryBackground }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.accentColor }]}>{totalCompleted}</Text>
            <Text style={[styles.statLabel, { color: theme.textColor }]}>Articles</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.crosshairColor }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.accentColor }]}>
              {highestWPM || '—'}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textColor }]}>Best WPM</Text>
          </View>
        </View>

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
                <View style={[styles.topicIcon, { backgroundColor: topic.color + '20' }]}>
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
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    marginHorizontal: 16,
  },
  demoButton: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  demoButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  topicCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
  },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  topicEmoji: {
    fontSize: 24,
  },
  topicName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  topicDesc: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
