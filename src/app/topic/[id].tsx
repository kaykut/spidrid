import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { SPACING, COMPONENT_RADIUS, SIZES, COMPONENT_SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, LETTER_SPACING } from '../../constants/typography';
import { getTopicById, getArticlesByTopic } from '../../data/curriculum';
import { JOURNEY_COLORS, OVERLAY_COLORS, COLOR_OPACITY, DIFFICULTY_COLORS } from '../../data/themes';
import { useCertificateStore } from '../../store/certificateStore';
import { useLearningStore } from '../../store/learningStore';
import { Article } from '../../types/learning';
import { withOpacity, OPACITY } from '../../utils/colorUtils';

export default function TopicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { t } = useTranslation(['topics', 'common', 'errors']);
  const { getArticleProgress, getTopicProgress } = useLearningStore();
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
        <Text style={[styles.errorText, { color: theme.textColor }]}>{t('errors:topic.not_found')}</Text>
      </SafeAreaView>
    );
  }

  const handleArticlePress = (articleId: string) => {
    router.push(`/article/${articleId}`);
  };

  const handlePlayPress = (articleId: string) => {
    router.push({
      pathname: '/playback',
      params: { sourceId: articleId, source: 'training' },
    });
  };

  const difficultyColor = (difficulty: string) => {
    return DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS] || theme.textColor;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.accentColor }]}>← {t('common:actions.back')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Topic Header */}
        <View style={styles.topicHeader}>
          <View style={[styles.topicIcon, { backgroundColor: withOpacity(topic.color, OPACITY.light) }]}>
            <Text style={styles.topicEmoji}>{topic.icon}</Text>
          </View>
          <Text style={[styles.topicName, { color: theme.textColor }]}>{topic.name}</Text>
          <Text style={[styles.topicDesc, { color: theme.textColor }]}>{topic.description}</Text>
          <Text style={[styles.progressLabel, { color: theme.textColor }]}>
            {topicProgress.averageScore > 0
              ? t('progress_with_avg', {
                  completed: topicProgress.articlesCompleted,
                  total: topicProgress.totalArticles,
                  avg: topicProgress.averageScore
                })
              : t('progress_format', {
                  completed: topicProgress.articlesCompleted,
                  total: topicProgress.totalArticles
                })
            }
          </Text>
        </View>

        {/* Practice Articles */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('practice_articles')}</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.textColor }]}>
            {t('practice_desc')}
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
              onPlay={() => handlePlayPress(article.id)}
              t={t}
            />
          ))}
        </View>

        {/* Certification Articles Section */}
        {certificationArticles.length > 0 && (
          <>
            <View style={[styles.sectionHeader, styles.certificationSection]}>
              <View style={styles.sectionTitleRow}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  {t('certification_tests')}
                </Text>
                {isReadyForCertification && (
                  <View style={[styles.readyBadge, { backgroundColor: JOURNEY_COLORS.success }]}>
                    <Text style={styles.readyBadgeText}>{t('ready_badge')}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.sectionSubtitle, { color: theme.textColor }]}>
                {t('certification_desc')}
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
                  onPlay={() => handlePlayPress(article.id)}
                  isCertification={true}
                  t={t}
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
  onPlay: () => void;
  isCertification?: boolean;
  t: (key: string, params?: Record<string, unknown>) => string;
}

function ArticleCard({
  article,
  index,
  topicColor,
  theme,
  progress,
  difficultyColor,
  onPress,
  onPlay,
  isCertification = false,
  t,
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
      accessibilityLabel={`${article.title}, ${article.wordCount} ${t('common:words')}, ${article.difficulty}`}
      accessibilityHint={isCompleted ? t('a11y.completed') : t('a11y.tap_to_read')}
    >
      <View style={styles.articleHeader}>
        <View
          style={[
            styles.articleNumber,
            { backgroundColor: isCertification ? JOURNEY_COLORS.certificationAccent : topicColor },
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
              <Text style={[styles.certificationLength, { color: JOURNEY_COLORS.certificationAccent }]}>
                {lengthLabel}
              </Text>
            ) : (
              <Text style={[styles.difficulty, { color: difficultyColor(article.difficulty) }]}>
                {article.difficulty}
              </Text>
            )}
            <Text style={[styles.wordCount, { color: theme.textColor }]}>
              · {article.wordCount} {t('common:words')}
            </Text>
          </View>
        </View>
        {/* Play button */}
        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: theme.accentColor }]}
          onPress={onPlay}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="play" size={SIZES.iconSm} color={JOURNEY_COLORS.textPrimary} />
        </TouchableOpacity>
        {isCompleted && (
          <View style={[styles.completedBadge, { backgroundColor: theme.accentColor }]}>
            <Text style={styles.completedText}>✓</Text>
          </View>
        )}
      </View>
      {isCompleted && progress && (
        <View style={[styles.progressInfo, { borderTopColor: theme.crosshairColor }]}>
          <Text style={[styles.progressText, { color: theme.textColor }]}>
            {t('score_label', { score: progress.comprehensionScore })}
          </Text>
          <Text style={[styles.progressText, { color: theme.textColor }]}>
            {t('best_wpm', { wpm: progress.highestWPM })}
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
    fontWeight: FONT_WEIGHTS.medium,
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
    width: COMPONENT_SIZES.iconContainerMd,
    height: COMPONENT_SIZES.iconContainerMd,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  topicEmoji: {
    fontSize: SIZES.iconXxl,
  },
  topicName: {
    ...TYPOGRAPHY.statLarge,
    marginBottom: SPACING.sm,
  },
  topicDesc: {
    ...TYPOGRAPHY.body,
    fontSize: TYPOGRAPHY.cardSubtitle.fontSize,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  progressLabel: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
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
    width: SIZES.iconXxl,
    height: SIZES.iconXxl,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  articleNumberText: {
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.bold,
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
    fontWeight: FONT_WEIGHTS.medium,
    textTransform: 'capitalize',
  },
  wordCount: {
    ...TYPOGRAPHY.caption,
    opacity: 0.6,
  },
  playButton: {
    width: SIZES.iconXl,
    height: SIZES.iconXl,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  completedBadge: {
    width: SIZES.iconLg + SPACING.xs,
    height: SIZES.iconLg + SPACING.xs,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.bold,
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
    textTransform: 'none',
    letterSpacing: LETTER_SPACING.none,
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
    textTransform: 'none',
    letterSpacing: LETTER_SPACING.none,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.6,
  },
  certificationSection: {
    marginTop: SPACING.xxl,
    paddingTop: SPACING.xxl,
    borderTopWidth: 1,
    borderTopColor: OVERLAY_COLORS.dividerLight,
  },
  readyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.chip,
  },
  readyBadgeText: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.caption,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  certificationCard: {
    borderWidth: 1,
    borderColor: COLOR_OPACITY.certificationTint,
  },
  certificationLength: {
    ...TYPOGRAPHY.caption,
    fontWeight: FONT_WEIGHTS.semibold,
    textTransform: 'capitalize',
  },
});
