/**
 * Curriculum Article Reader Screen
 *
 * RSVP reader for curriculum articles with progress tracking.
 * Flow:
 * 1. Loading/error states based on article generation status
 * 2. Reading phase with RSVP playback
 * 3. Quiz phase (if questions exist)
 * 4. Results phase with stats and unlock next article
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../components/common/ThemeProvider';
import { PlaybackControls } from '../../../../components/controls/PlaybackControls';
import { QuestionRenderer, QuestionAnswer } from '../../../../components/quiz';
import { RSVPWord } from '../../../../components/rsvp/RSVPWord';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, LETTER_SPACING } from '../../../../constants/typography';
import { JOURNEY_COLORS } from '../../../../data/themes';
import { useRSVPEngine } from '../../../../hooks/useRSVPEngine';
import { processText } from '../../../../services/textProcessor';
import { useCurriculumStore } from '../../../../store/curriculumStore';
import { useJourneyStore } from '../../../../store/journeyStore';
import { useLearningStore } from '../../../../store/learningStore';
import { isAnswerCorrect } from '../../../../utils/calculateQuizScore';

type Phase = 'reading' | 'quiz' | 'results';

export default function CurriculumArticleScreen() {
  const { theme } = useTheme();
  const { curriculumId, articleIndex } = useLocalSearchParams<{
    curriculumId: string;
    articleIndex: string;
  }>();

  const { getCurriculum, markArticleCompleted } = useCurriculumStore();
  const { recordSession } = useJourneyStore();
  const { currentWPM, setCurrentWPM } = useLearningStore();

  const curriculum = getCurriculum(curriculumId || '');
  const articleIdx = parseInt(articleIndex || '0', 10);
  const article = curriculum?.articles?.[articleIdx];

  // Phase management
  const [phase, setPhase] = useState<Phase>('reading');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<QuestionAnswer | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [readingWPM, setReadingWPM] = useState(currentWPM);

  // Process article content for RSVP
  const processedWords = useMemo(() => {
    if (!article?.content) {return [];}

    return processText(
      article.content,
      undefined, // chapters
      undefined  // adapter
    );
  }, [article?.content]);

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
      // No quiz - mark as complete with 100% comprehension
      if (curriculum && article) {
        markArticleCompleted(curriculum.id, articleIdx, 100, engine.wpm);
        recordSession({
          wpm: engine.wpm,
          comprehension: 100,
          articleId: article.id,
          articleType: 'curriculum',
        });
      }
      setPhase('results');
    }
  }, [engine.wpm, article, curriculum, articleIdx, markArticleCompleted, recordSession]);

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
          articleType: 'curriculum',
        });

        // Mark article as completed in curriculum store
        if (curriculum) {
          markArticleCompleted(curriculum.id, articleIdx, score, readingWPM);
        }

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

  // Curriculum not found
  if (!curriculum) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={SIZES.iconMd} color={theme.textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.textColor }]}>Curriculum not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.linkText, { color: theme.accentColor }]}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={[styles.errorText, { color: theme.textColor }]}>Article not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.linkText, { color: theme.accentColor }]}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Article is locked
  if (article.completionStatus === 'locked') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={SIZES.iconMd} color={theme.textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="lock-closed" size={SIZES.iconHuge} color={JOURNEY_COLORS.textSecondary} />
          <Text style={[styles.errorText, { color: theme.textColor, marginTop: SPACING.lg }]}>
            Article Locked
          </Text>
          <Text style={[styles.errorSubtext, { color: JOURNEY_COLORS.textSecondary }]}>
            Complete the previous article to unlock this one.
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.linkText, { color: theme.accentColor, marginTop: SPACING.lg }]}>
              Go back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Article is generating
  if (article.generationStatus === 'generating') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={SIZES.iconMd} color={theme.textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <ActivityIndicator size="large" color={theme.accentColor} />
          <Text style={[styles.errorText, { color: theme.textColor, marginTop: SPACING.lg }]}>
            Generating Article...
          </Text>
          <Text style={[styles.errorSubtext, { color: JOURNEY_COLORS.textSecondary }]}>
            Please wait while we create your article.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Article generation failed
  if (article.generationStatus === 'failed') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={SIZES.iconMd} color={theme.textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={SIZES.iconHuge} color="#ff6b6b" />
          <Text style={[styles.errorText, { color: theme.textColor, marginTop: SPACING.lg }]}>
            Generation Failed
          </Text>
          <Text style={[styles.errorSubtext, { color: JOURNEY_COLORS.textSecondary }]}>
            {article.generationError || 'An error occurred while generating the article.'}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.linkText, { color: theme.accentColor, marginTop: SPACING.lg }]}>
              Go back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = article.questions?.[currentQuestionIndex];
  const finalScore = article.questions?.length
    ? Math.round((correctAnswers / article.questions.length) * 100)
    : 100;
  const totalArticles = curriculum.articles.length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.secondaryBackground }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleDone}>
          <Ionicons name="arrow-back" size={SIZES.iconMd} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textColor }]} numberOfLines={1}>
          {article.title}
        </Text>
        <View style={[styles.badge, { backgroundColor: `${theme.accentColor}20` }]}>
          <Text style={[styles.badgeText, { color: theme.accentColor }]}>
            {articleIdx + 1} of {totalArticles}
          </Text>
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
                Question {currentQuestionIndex + 1} of {article.questions?.length ?? 0}
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
              Article Complete!
            </Text>

            <View style={[styles.resultsCard, { backgroundColor: theme.secondaryBackground }]}>
              {article.questions && article.questions.length > 0 && (
                <>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                      Comprehension
                    </Text>
                    <Text
                      style={[
                        styles.resultValue,
                        { color: finalScore >= 50 ? JOURNEY_COLORS.success : theme.orpColor },
                      ]}
                    >
                      {finalScore}%
                    </Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                      Correct Answers
                    </Text>
                    <Text style={[styles.resultValue, { color: theme.textColor }]}>
                      {correctAnswers} / {article.questions.length}
                    </Text>
                  </View>
                </>
              )}
              <View style={styles.resultRow}>
                <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                  Reading Speed
                </Text>
                <Text style={[styles.resultValue, { color: theme.accentColor }]}>
                  {readingWPM} WPM
                </Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                  Word Count
                </Text>
                <Text style={[styles.resultValue, { color: theme.textColor }]}>
                  {article.wordCount?.toLocaleString() || 0}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: theme.accentColor }]}
              onPress={handleDone}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.retryButton, { borderColor: theme.accentColor }]}
              onPress={handlePlayAgain}
            >
              <Text style={[styles.retryButtonText, { color: theme.accentColor }]}>
                Read Again
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
  headerTitle: {
    ...TYPOGRAPHY.cardSubtitle,
    flex: 1,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.chip,
  },
  badgeText: {
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
    paddingHorizontal: SPACING.xl,
  },
  errorText: {
    ...TYPOGRAPHY.sectionHeader,
    textAlign: 'center',
  },
  errorSubtext: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.sm,
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
