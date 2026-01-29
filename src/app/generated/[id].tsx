/**
 * Generated Article Reader Screen
 *
 * RSVP reader for AI-generated articles.
 * Follows the same flow as the main play screen:
 * 1. Reading phase with RSVP playback
 * 2. Quiz phase (if questions exist)
 * 3. Results phase with stats
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { PlaybackControls } from '../../components/controls/PlaybackControls';
import { QuestionRenderer, QuestionAnswer } from '../../components/quiz';
import { RSVPWord } from '../../components/rsvp/RSVPWord';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, LETTER_SPACING } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useRSVPEngine } from '../../hooks/useRSVPEngine';
import { getAdapterForContent, getAdapter } from '../../services/language';
import { processText } from '../../services/textProcessor';
import { useGeneratedStore } from '../../store/generatedStore';
import { useJourneyStore } from '../../store/journeyStore';
import { useLearningStore } from '../../store/learningStore';
import { useSettingsStore } from '../../store/settingsStore';
import { isAnswerCorrect } from '../../utils/calculateQuizScore';
import { splitTitle } from '../../utils/titleUtils';

type Phase = 'reading' | 'quiz' | 'results';

export default function GeneratedArticleScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation('playback');
  const { t: tQuiz } = useTranslation('quiz');
  const { t: tCommon } = useTranslation('common');

  const { getArticleById, updateArticleProgress } = useGeneratedStore();
  const { recordSession } = useJourneyStore();
  const { currentWPM, setCurrentWPM } = useLearningStore();

  const article = getArticleById(id || '');

  // Phase management
  const [phase, setPhase] = useState<Phase>('reading');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<QuestionAnswer | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [readingWPM, setReadingWPM] = useState(currentWPM);

  // Get reading language setting for per-content language detection
  const readingLanguage = useSettingsStore(state => state.readingLanguage);
  const pauseOnComma = useSettingsStore(state => state.pauseOnComma);
  const pauseOnPeriod = useSettingsStore(state => state.pauseOnPeriod);
  const hyphenationMode = useSettingsStore(state => state.hyphenationMode);

  // Process article content for RSVP
  const processedWords = useMemo(() => {
    if (!article?.content) {return [];}

    // Get adapter based on content + user setting
    const adapter = readingLanguage === 'auto'
      ? getAdapterForContent(article.content)
      : getAdapter(readingLanguage);

    return processText(article.content, adapter, { pauseOnComma, pauseOnPeriod, hyphenationMode });
  }, [article?.content, readingLanguage, pauseOnComma, pauseOnPeriod, hyphenationMode]);

  // RSVP engine
  const engine = useRSVPEngine(processedWords, currentWPM);

  // Reset function
  const resetState = useCallback(() => {
    setPhase('reading');
    setCurrentQuestionIndex(0);
    setCurrentAnswer(null);
    setCorrectAnswers(0);
    engine.reset();
  }, [engine]);

  // Handle playback completion
  const handlePlaybackComplete = useCallback(() => {
    setReadingWPM(engine.wpm);
    if (article?.questions && article.questions.length > 0) {
      setPhase('quiz');
    } else {
      setPhase('results');
    }
  }, [engine.wpm, article?.questions]);

  // Detect playback completion
  useEffect(() => {
    if (
      engine.progress === 1 &&
      !engine.isPlaying &&
      phase === 'reading' &&
      processedWords.length > 0
    ) {
      const timer = setTimeout(handlePlaybackComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [engine.progress, engine.isPlaying, phase, processedWords.length, handlePlaybackComplete]);

  // Handle WPM changes
  const handleWPMChange = (wpm: number) => {
    engine.setWPM(wpm);
    setCurrentWPM(wpm);
  };

  // Handle quiz answers
  const handleAnswer = (answer: QuestionAnswer) => {
    if (currentAnswer !== null || !article?.questions) {return;}
    setCurrentAnswer(answer);

    const currentQuestion = article.questions[currentQuestionIndex];
    const isCorrect = isAnswerCorrect(currentQuestion, answer);
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    // Move to next question or results after delay
    setTimeout(() => {
      if (currentQuestionIndex < article.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setCurrentAnswer(null);
      } else {
        // Calculate final score and save
        const finalCorrect = correctAnswers + (isCorrect ? 1 : 0);
        const score = Math.round((finalCorrect / article.questions.length) * 100);

        // Record to journey store
        recordSession({
          wpm: readingWPM,
          comprehension: score,
          articleId: article.id,
          articleType: 'generated',
        });

        // Update article progress
        updateArticleProgress(article.id, {
          completed: true,
          comprehensionScore: score,
          highestWPM: Math.max(readingWPM, article.highestWPM || 0),
          lastReadAt: Date.now(),
          attemptCount: (article.attemptCount || 0) + 1,
        });

        setPhase('results');
      }
    }, 1000);
  };

  const handleDone = () => {
    router.back();
  };

  const handlePlayAgain = () => {
    resetState();
  };

  // Article not found
  if (!article) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={SIZES.iconMd} color={theme.textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.textColor }]}>{t('errors.article_not_found')}</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.linkText, { color: theme.accentColor }]}>{t('errors.go_back')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = article.questions?.[currentQuestionIndex];
  const finalScore = article.questions?.length
    ? Math.round((correctAnswers / article.questions.length) * 100)
    : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.secondaryBackground }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleDone}>
          <Ionicons name="arrow-back" size={SIZES.iconMd} color={theme.textColor} />
        </TouchableOpacity>
        {(() => {
          const { primary, subtitle } = splitTitle(article.title);
          return (
            <View style={styles.headerTitleContainer}>
              <Text style={[styles.headerTitle, { color: theme.textColor }]} numberOfLines={1}>
                {primary}
              </Text>
              {subtitle && (
                <Text style={[styles.headerSubtitle, { color: theme.textColor }]} numberOfLines={1}>
                  {subtitle}
                </Text>
              )}
            </View>
          );
        })()}
        <View style={[styles.aiBadge, { backgroundColor: `${theme.accentColor}20` }]}>
          <Text style={[styles.aiBadgeText, { color: theme.accentColor }]}>AI</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Reading Phase */}
        {phase === 'reading' && (
          <>
            <View style={styles.rsvpContainer}>
              <RSVPWord word={engine.currentWord} />
            </View>
            <PlaybackControls
              isPlaying={engine.isPlaying}
              wpm={engine.wpm}
              progress={engine.progress}
              currentIndex={engine.currentIndex}
              totalWords={engine.totalWords}
              onToggle={engine.toggle}
              onWPMChange={handleWPMChange}
              onRewind={engine.rewindSentence}
              onSkip={engine.skipSentence}
            />
          </>
        )}

        {/* Quiz Phase */}
        {phase === 'quiz' && currentQuestion && (
          <ScrollView style={styles.quizContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.quizProgress}>
              <Text style={[styles.quizProgressText, { color: theme.textColor }]}>
                {tQuiz('question_progress', { current: currentQuestionIndex + 1, total: article.questions?.length ?? 0 })}
              </Text>
            </View>

            <QuestionRenderer
              question={currentQuestion}
              answer={currentAnswer}
              onAnswer={handleAnswer}
              disabled={currentAnswer !== null}
            />
          </ScrollView>
        )}

        {/* Results Phase */}
        {phase === 'results' && (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, { color: theme.textColor }]}>
              {t('results.reading_complete')}
            </Text>

            <View style={[styles.resultsCard, { backgroundColor: theme.secondaryBackground }]}>
              {article.questions && article.questions.length > 0 && (
                <>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                      {t('results.comprehension')}
                    </Text>
                    <Text
                      style={[
                        styles.resultValue,
                        { color: finalScore >= 50 ? JOURNEY_COLORS.success : JOURNEY_COLORS.low },
                      ]}
                    >
                      {finalScore}%
                    </Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                      {t('results.correct_answers')}
                    </Text>
                    <Text style={[styles.resultValue, { color: theme.textColor }]}>
                      {correctAnswers} / {article.questions.length}
                    </Text>
                  </View>
                </>
              )}
              <View style={styles.resultRow}>
                <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                  {t('results.reading_speed')}
                </Text>
                <Text style={[styles.resultValue, { color: theme.accentColor }]}>
                  {readingWPM} {tCommon('wpm_suffix')}
                </Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                  {t('results.word_count')}
                </Text>
                <Text style={[styles.resultValue, { color: theme.textColor }]}>
                  {article.wordCount.toLocaleString()}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: theme.accentColor }]}
              onPress={handleDone}
            >
              <Text style={styles.doneButtonText}>{tCommon('actions.done')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.retryButton, { borderColor: theme.accentColor }]}
              onPress={handlePlayAgain}
            >
              <Text style={[styles.retryButtonText, { color: theme.accentColor }]}>
                {t('results.read_again')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: SPACING.sm,
    marginRight: SPACING.sm,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    ...TYPOGRAPHY.cardSubtitle,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.label,
    opacity: 0.7,
    marginTop: SPACING.xxs,
  },
  aiBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.chip,
  },
  aiBadgeText: {
    ...TYPOGRAPHY.caption,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  rsvpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.md,
  },
  linkText: {
    ...TYPOGRAPHY.button,
  },
  quizContainer: {
    flex: 1,
    paddingTop: SPACING.xl,
  },
  quizProgress: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  quizProgressText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.6,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  resultsTitle: {
    ...TYPOGRAPHY.pageTitle,
    textAlign: 'center',
    marginBottom: SPACING.xxxl,
  },
  resultsCard: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.xxl,
    marginBottom: SPACING.xxxl,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  resultLabel: {
    ...TYPOGRAPHY.button,
    fontWeight: FONT_WEIGHTS.regular,
  },
  resultValue: {
    ...TYPOGRAPHY.metricLarge,
  },
  doneButton: {
    paddingVertical: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.card,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  doneButtonText: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.levelName,
    textTransform: 'none',
    letterSpacing: LETTER_SPACING.none,
  },
  retryButton: {
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.card,
    alignItems: 'center',
    borderWidth: 2,
  },
  retryButtonText: {
    ...TYPOGRAPHY.button,
  },
});
