/**
 * Playback Quiz Modal
 *
 * Quiz flow after completing reading with quiz content.
 * Receives content info via route params, shows quiz questions.
 * On completion, saves score and closes both modals.
 */

import { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/common/ThemeProvider';
import { QuestionRenderer, QuestionAnswer } from '../components/quiz';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, LETTER_SPACING } from '../constants/typography';
import { JOURNEY_COLORS } from '../data/themes';
import { useCurriculumStore } from '../store/curriculumStore';
import { useGeneratedStore } from '../store/generatedStore';
import { useJourneyStore } from '../store/journeyStore';
import { useLearningStore } from '../store/learningStore';
import { ContentSource } from '../types/contentList';
import { isAnswerCorrect } from '../utils/calculateQuizScore';
import { resolveContentBySource } from '../utils/contentResolver';
import { clearPosition } from '../utils/positionUtils';

export default function PlaybackQuizModal() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ sourceId: string; source: string; wpm: string }>();
  const sourceId = params.sourceId ?? '';
  const source = (params.source ?? 'training') as ContentSource;
  const readingWPM = parseInt(params.wpm ?? '250', 10);

  const { completeArticle } = useLearningStore();
  const { recordSession } = useJourneyStore();
  const { updateArticleProgress } = useGeneratedStore();
  const { markArticleCompleted } = useCurriculumStore();

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<QuestionAnswer | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Resolve content for quiz questions
  const resolvedContent = useMemo(() => {
    if (!sourceId) {
      return null;
    }
    return resolveContentBySource(sourceId, source);
  }, [sourceId, source]);

  const questions = resolvedContent?.questions ?? [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const finalScore = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // Handle quiz answer
  const handleAnswer = useCallback(
    (answer: QuestionAnswer) => {
      if (currentAnswer !== null || !currentQuestion) {
        return;
      }
      setCurrentAnswer(answer);

      const isCorrect = isAnswerCorrect(currentQuestion, answer);
      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
      }

      // Move to next question or complete after delay
      setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setCurrentAnswer(null);
        } else {
          // Calculate final score and save
          const finalCorrect = correctAnswers + (isCorrect ? 1 : 0);
          const score = Math.round((finalCorrect / totalQuestions) * 100);

          // Save score based on source type
          if (source === 'training') {
            completeArticle(sourceId, score, readingWPM);
            recordSession({
              wpm: readingWPM,
              comprehension: score,
              articleId: sourceId,
              articleType: 'curriculum',
            });
          } else if (source === 'generated') {
            updateArticleProgress(sourceId, {
              completed: true,
              comprehensionScore: score,
              highestWPM: readingWPM,
              lastReadAt: Date.now(),
            });
            clearPosition(sourceId, source);
            recordSession({
              wpm: readingWPM,
              comprehension: score,
              articleId: sourceId,
              articleType: 'generated',
            });
          } else if (source === 'curriculum') {
            const [curriculumId, articleIndexStr] = sourceId.split(':');
            const articleIndex = parseInt(articleIndexStr, 10);
            if (curriculumId && !isNaN(articleIndex)) {
              markArticleCompleted(curriculumId, articleIndex, score, readingWPM);
              clearPosition(sourceId, source);
              recordSession({
                wpm: readingWPM,
                comprehension: score,
                articleId: sourceId,
                articleType: 'curriculum',
              });
            }
          }

          setIsComplete(true);
        }
      }, 1000);
    },
    [
      currentAnswer,
      currentQuestion,
      currentQuestionIndex,
      totalQuestions,
      correctAnswers,
      source,
      sourceId,
      readingWPM,
      completeArticle,
      recordSession,
      updateArticleProgress,
      markArticleCompleted,
    ]
  );

  const handleDone = () => {
    // Go back to content list (closes both modals)
    router.dismissAll();
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setCurrentAnswer(null);
    setCorrectAnswers(0);
    setIsComplete(false);
  };

  // No questions available
  if (!currentQuestion && !isComplete) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {/* Close button - absolute positioned in safe area */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.closeButton, { top: insets.top + SPACING.sm, left: SPACING.md }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={SIZES.iconLg} color={theme.textColor} />
        </TouchableOpacity>

        {/* Title - absolute positioned, centered */}
        <Text
          style={[
            styles.headerTitle,
            { top: insets.top + SPACING.sm + (SIZES.touchTarget - 20) / 2, color: theme.textColor },
          ]}
        >
          Quiz
        </Text>

        <View style={[styles.emptyState, { paddingTop: insets.top + SIZES.touchTarget }]}>
          <Text style={[styles.emptyTitle, { color: theme.textColor }]}>
            No Quiz Available
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.textColor }]}>
            This content does not have quiz questions.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Close button - absolute positioned in safe area */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.closeButton, { top: insets.top + SPACING.sm, left: SPACING.md }]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={SIZES.iconLg} color={theme.textColor} />
      </TouchableOpacity>

      {/* Title - absolute positioned, centered */}
      <Text
        style={[
          styles.headerTitle,
          { top: insets.top + SPACING.sm + (SIZES.touchTarget - 20) / 2, color: theme.textColor },
        ]}
      >
        {isComplete ? 'Results' : 'Comprehension Quiz'}
      </Text>

      <View style={[styles.content, { paddingTop: insets.top + SIZES.touchTarget, paddingBottom: insets.bottom }]}>
        {/* Results View */}
        {isComplete ? (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, { color: theme.textColor }]}>
              Complete!
            </Text>

            <View style={[styles.resultsCard, { backgroundColor: theme.secondaryBackground }]}>
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
                  {correctAnswers} / {totalQuestions}
                </Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                  Reading Speed
                </Text>
                <Text style={[styles.resultValue, { color: theme.accentColor }]}>
                  {readingWPM} WPM
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
              onPress={handleRetakeQuiz}
            >
              <Text style={[styles.retryButtonText, { color: theme.accentColor }]}>
                Retake Quiz
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Quiz View */
          <View style={styles.quizContainer}>
            <View style={styles.quizProgress}>
              <Text style={[styles.quizProgressText, { color: theme.textColor }]}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </Text>
            </View>

            <QuestionRenderer
              question={currentQuestion}
              answer={currentAnswer}
              onAnswer={handleAnswer}
              disabled={currentAnswer !== null}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    zIndex: 10,
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    position: 'absolute',
    zIndex: 10,
    left: SIZES.touchTarget + SPACING.xl,
    right: SIZES.touchTarget + SPACING.xl,
    ...TYPOGRAPHY.cardTitle,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    ...TYPOGRAPHY.sectionHeader,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    opacity: 0.6,
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
