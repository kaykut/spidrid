import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { SPACING, RADIUS, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { getTopicById, getArticlesByTopic } from '../../data/curriculum';
import { useCertificateStore } from '../../store/certificateStore';
import { useLearningStore } from '../../store/learningStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { Article } from '../../types/learning';

export default function TopicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { getArticleProgress, getTopicProgress } = useLearningStore();
  const { canAccessContent, incrementContentCount, isPremium } = useSubscriptionStore();
  const { getCertificationProgress } = useCertificateStore();

  const topic = getTopicById(id);
  const articles = getArticlesByTopic(id);
  const topicProgress = getTopicProgress(id);
  const certificationProgress = getCertificationProgress();

  // Separate practice and certification articles
  const practiceArticles = articles.filter(a => a.articleType !== 'certification');
  const certificationArticles = articles.filter(a => a.articleType === 'certification');

  // Check if user is ready for any certification tier (exam is unlocked but not passed)
  const isReadyForCertification = (certificationProgress.tierProgress.speed_reader?.examUnlocked && !certificationProgress.tierProgress.speed_reader?.examPassed) ||
    (certificationProgress.tierProgress.velocity_master?.examUnlocked && !certificationProgress.tierProgress.velocity_master?.examPassed) ||
    (certificationProgress.tierProgress.transcendent?.examUnlocked && !certificationProgress.tierProgress.transcendent?.examPassed);

  if (!topic) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.errorText, { color: theme.textColor }]}>Topic not found</Text>
      </SafeAreaView>
    );
  }

  const handleArticlePress = (articleId: string) => {
    const progress = getArticleProgress(articleId);

    // If not completed and not premium, check content limit
    if (!progress?.completed && !isPremium) {
      if (!canAccessContent()) {
        router.push('/paywall?reason=content_limit');
        return;
      }
      incrementContentCount();
    }

    router.push(`/article/${articleId}`);
  };

  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#69db7c';
      case 'intermediate':
        return '#fab005';
      case 'advanced':
        return '#ff6b6b';
      default:
        return theme.textColor;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.accentColor }]}>← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Topic Header */}
        <View style={styles.topicHeader}>
          <View style={[styles.topicIcon, { backgroundColor: `${topic.color  }20` }]}>
            <Text style={styles.topicEmoji}>{topic.icon}</Text>
          </View>
          <Text style={[styles.topicName, { color: theme.textColor }]}>{topic.name}</Text>
          <Text style={[styles.topicDesc, { color: theme.textColor }]}>{topic.description}</Text>
          <Text style={[styles.progressLabel, { color: theme.textColor }]}>
            {topicProgress.articlesCompleted} of {topicProgress.totalArticles} completed
            {topicProgress.averageScore > 0 && ` · ${topicProgress.averageScore}% avg`}
          </Text>
        </View>

        {/* Practice Articles */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Practice Articles</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.textColor }]}>
            Build your speed reading skills
          </Text>
        </View>
        <View style={styles.articlesList}>
          {practiceArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index + 1}
              topicColor={topic.color}
              theme={theme}
              progress={getArticleProgress(article.id)}
              difficultyColor={difficultyColor}
              onPress={() => handleArticlePress(article.id)}
            />
          ))}
        </View>

        {/* Certification Articles Section */}
        {certificationArticles.length > 0 && (
          <>
            <View style={[styles.sectionHeader, styles.certificationSection]}>
              <View style={styles.sectionTitleRow}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  Certification Tests
                </Text>
                {isReadyForCertification && (
                  <View style={[styles.readyBadge, { backgroundColor: '#69db7c' }]}>
                    <Text style={styles.readyBadgeText}>Ready!</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.sectionSubtitle, { color: theme.textColor }]}>
                Demonstrate your mastery
              </Text>
            </View>
            <View style={styles.articlesList}>
              {certificationArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index + 1}
                  topicColor={topic.color}
                  theme={theme}
                  progress={getArticleProgress(article.id)}
                  difficultyColor={difficultyColor}
                  onPress={() => handleArticlePress(article.id)}
                  isCertification={true}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface ArticleCardProps {
  article: Article;
  index: number;
  topicColor: string;
  theme: {
    textColor: string;
    secondaryBackground: string;
    accentColor: string;
    crosshairColor: string;
  };
  progress: { completed: boolean; comprehensionScore: number; highestWPM: number } | null | undefined;
  difficultyColor: (d: string) => string;
  onPress: () => void;
  isCertification?: boolean;
}

function ArticleCard({
  article,
  index,
  topicColor,
  theme,
  progress,
  difficultyColor,
  onPress,
  isCertification = false,
}: ArticleCardProps) {
  const isCompleted = progress?.completed;
  const lengthLabel = article.certificationLength
    ? article.certificationLength.charAt(0).toUpperCase() + article.certificationLength.slice(1)
    : null;

  return (
    <TouchableOpacity
      style={[
        styles.articleCard,
        { backgroundColor: theme.secondaryBackground },
        isCertification && styles.certificationCard,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${article.title}, ${article.wordCount} words, ${article.difficulty}`}
      accessibilityHint={isCompleted ? 'Completed' : 'Tap to read'}
    >
      <View style={styles.articleHeader}>
        <View
          style={[
            styles.articleNumber,
            { backgroundColor: isCertification ? '#9775fa' : topicColor },
          ]}
        >
          {isCertification ? (
            <Text style={styles.articleNumberText}>🏆</Text>
          ) : (
            <Text style={styles.articleNumberText}>{index}</Text>
          )}
        </View>
        <View style={styles.articleInfo}>
          <Text style={[styles.articleTitle, { color: theme.textColor }]}>
            {article.title}
          </Text>
          <View style={styles.articleMeta}>
            {isCertification && lengthLabel ? (
              <Text style={[styles.certificationLength, { color: '#9775fa' }]}>
                {lengthLabel}
              </Text>
            ) : (
              <Text style={[styles.difficulty, { color: difficultyColor(article.difficulty) }]}>
                {article.difficulty}
              </Text>
            )}
            <Text style={[styles.wordCount, { color: theme.textColor }]}>
              · {article.wordCount} words
            </Text>
          </View>
        </View>
        {isCompleted && (
          <View style={[styles.completedBadge, { backgroundColor: theme.accentColor }]}>
            <Text style={styles.completedText}>✓</Text>
          </View>
        )}
      </View>
      {isCompleted && progress && (
        <View style={[styles.progressInfo, { borderTopColor: theme.crosshairColor }]}>
          <Text style={[styles.progressText, { color: theme.textColor }]}>
            Score: {progress.comprehensionScore}%
          </Text>
          <Text style={[styles.progressText, { color: theme.textColor }]}>
            Best: {progress.highestWPM} WPM
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backText: {
    ...TYPOGRAPHY.cardSubtitle,
    fontWeight: '500',
  },
  content: {
    padding: SPACING.xl,
    paddingBottom: SPACING.huge,
  },
  topicHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  topicIcon: {
    width: 72,
    height: 72,
    borderRadius: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  topicEmoji: {
    fontSize: 36,
  },
  topicName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  topicDesc: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  progressLabel: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '400',
    opacity: 0.6,
  },
  articlesList: {
    gap: SPACING.md,
  },
  articleCard: {
    borderRadius: COMPONENT_RADIUS.card,
    overflow: 'hidden',
  },
  articleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  articleNumber: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  articleNumberText: {
    color: '#ffffff',
    fontWeight: 'bold',
    ...TYPOGRAPHY.cardSubtitle,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    ...TYPOGRAPHY.cardSubtitle,
    marginBottom: SPACING.xs,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficulty: {
    ...TYPOGRAPHY.caption,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  wordCount: {
    ...TYPOGRAPHY.caption,
    opacity: 0.6,
  },
  completedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
  },
  progressText: {
    ...TYPOGRAPHY.label,
    opacity: 0.7,
  },
  errorText: {
    ...TYPOGRAPHY.levelName,
    fontSize: 18,
    textTransform: 'none',
    letterSpacing: 0,
    textAlign: 'center',
    marginTop: SPACING.huge,
  },
  sectionHeader: {
    marginBottom: SPACING.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.levelName,
    fontSize: 18,
    textTransform: 'none',
    letterSpacing: 0,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '400',
    opacity: 0.6,
  },
  certificationSection: {
    marginTop: SPACING.xxl,
    paddingTop: SPACING.xxl,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  readyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.chip,
  },
  readyBadgeText: {
    color: '#ffffff',
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
  },
  certificationCard: {
    borderWidth: 1,
    borderColor: 'rgba(151, 117, 250, 0.3)',
  },
  certificationLength: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
