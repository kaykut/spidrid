import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CertificationReadyModal } from '../../components/certifications';
import { useTheme } from '../../components/common/ThemeProvider';
import { PlaybackControls } from '../../components/controls/PlaybackControls';
import { Paywall } from '../../components/paywall/Paywall';
import { QuestionRenderer, QuestionAnswer } from '../../components/quiz';
import { RSVPWord } from '../../components/rsvp/RSVPWord';
import { SPACING, RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { getArticleById, getTopicById } from '../../data/curriculum';
import { useCertificationDetection } from '../../hooks/useCertificationDetection';
import { useRSVPEngine } from '../../hooks/useRSVPEngine';
import { processText } from '../../services/textProcessor';
import { useJourneyStore } from '../../store/journeyStore';
import { useLearningStore } from '../../store/learningStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { isAnswerCorrect } from '../../utils/calculateQuizScore';

type Phase = 'reading' | 'quiz' | 'results';

export default function ArticleReaderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { completeArticle, currentWPM, setCurrentWPM } = useLearningStore();
  const { getMaxWPM } = useSubscriptionStore();
  const { recordSession } = useJourneyStore();

  // Certification detection
  const {
    state: certState,
    checkAfterPractice,
    dismissReadiness,
    startCertificationTest,
  } = useCertificationDetection();

  const article = getArticleById(id);
  const topic = article ? getTopicById(article.topicId) : null;
  const isPracticeArticle = article?.articleType !== 'certification';

  const [phase, setPhase] = useState<Phase>('reading');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<QuestionAnswer | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [readingWPM, setReadingWPM] = useState(currentWPM);

  const words = useMemo(
    () => (article ? processText(article.content) : []),
    [article]
  );

  const engine = useRSVPEngine(words, Math.min(currentWPM, getMaxWPM()));

  // Handle reading completion
  const handleReadingComplete = useCallback(() => {
    setReadingWPM(engine.wpm);
    setPhase('quiz');
  }, [engine.wpm]);

  // Check if reading is complete when engine reaches end
  React.useEffect(() => {
    if (engine.progress === 1 && !engine.isPlaying && phase === 'reading' && words.length > 0) {
      // Small delay to let user see last word
      const timer = setTimeout(handleReadingComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [engine.progress, engine.isPlaying, phase, words.length, handleReadingComplete]);

  if (!article || !topic) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.errorText, { color: theme.textColor }]}>Article not found</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = article.questions[currentQuestionIndex];

  const handleAnswer = (answer: QuestionAnswer) => {
    if (currentAnswer !== null) { return; }
    setCurrentAnswer(answer);

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
        completeArticle(article.id, score, readingWPM);

        // Record in journey store for VS tracking
        recordSession({
          wpm: readingWPM,
          comprehension: score,
          articleId: article.id,
          articleType: article.articleType === 'certification' ? 'certification' : 'curriculum',
        });

        // Check certification readiness for practice articles
        if (isPracticeArticle) {
          // Delay slightly to let the store update with the new completion
          setTimeout(() => {
            checkAfterPractice();
          }, 100);
        }

        setPhase('results');
      }
    }, 1000);
  };

  const handleWPMChange = (wpm: number) => {
    engine.setWPM(wpm);
    setCurrentWPM(wpm);
  };

  const finalScore = Math.round((correctAnswers / article.questions.length) * 100);

  const handleTakeCertificationTest = () => {
    startCertificationTest();
    // Navigate to certification text selection screen
    // For now, just go back to topic screen where they can select a certification text
    router.back();
  };

  return (
    <>
      <Paywall
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        reason="wpm_limit"
      />
      <CertificationReadyModal
        tier={certState.readyTier}
        currentWPM={certState.currentWPM}
        currentVS={certState.currentVS}
        visible={certState.showReadinessModal}
        onTakeTest={handleTakeCertificationTest}
        onKeepPracticing={dismissReadiness}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={[styles.backText, { color: theme.accentColor }]}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.topicLabel, { color: topic.color }]}>{topic.name}</Text>
            <Text style={[styles.articleTitle, { color: theme.textColor }]} numberOfLines={1}>
              {article.title}
            </Text>
          </View>
          <View style={styles.backButton} />
        </View>

        {phase === 'reading' && (
          <>
            {/* Word display area */}
            <View style={styles.wordArea}>
              <RSVPWord word={engine.currentWord} fontSize={48} />
            </View>

            {/* Controls */}
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
              onWPMLimitHit={() => setShowPaywall(true)}
            />

            {/* Instructions */}
            <View style={styles.instructions}>
              <Text style={[styles.instructionText, { color: theme.textColor }]}>
                Focus on the <Text style={{ color: theme.orpColor }}>red letter</Text>.
                {'\n'}Comprehension quiz follows after reading.
              </Text>
            </View>
          </>
        )}

        {phase === 'quiz' && currentQuestion && (
          <View style={styles.quizContainer}>
            <View style={styles.quizProgress}>
              <Text style={[styles.quizProgressText, { color: theme.textColor }]}>
                Question {currentQuestionIndex + 1} of {article.questions.length}
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

        {phase === 'results' && (
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
                    { color: finalScore >= 50 ? '#69db7c' : theme.orpColor },
                  ]}
                >
                  {finalScore}%
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
              <View style={styles.resultRow}>
                <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                  Correct Answers
                </Text>
                <Text style={[styles.resultValue, { color: theme.textColor }]}>
                  {correctAnswers} / {article.questions.length}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: theme.accentColor }]}
              onPress={() => router.back()}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.retryButton, { borderColor: theme.accentColor }]}
              onPress={() => {
                setPhase('reading');
                setCurrentQuestionIndex(0);
                setCurrentAnswer(null);
                setCorrectAnswers(0);
                engine.reset();
              }}
            >
              <Text style={[styles.retryButtonText, { color: theme.accentColor }]}>
                Read Again
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
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
    width: 80,
  },
  backText: {
    ...TYPOGRAPHY.cardSubtitle,
    fontWeight: '500',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  topicLabel: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  articleTitle: {
    ...TYPOGRAPHY.cardSubtitle,
    fontWeight: '500',
  },
  wordArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  instructionText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '400',
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 20,
  },
  quizContainer: {
    flex: 1,
    padding: SPACING.xl,
  },
  quizProgress: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  quizProgressText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '400',
    opacity: 0.6,
  },
  resultsContainer: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'center',
  },
  resultsTitle: {
    ...TYPOGRAPHY.pageTitle,
    textAlign: 'center',
    marginBottom: SPACING.xxxl,
  },
  resultsCard: {
    borderRadius: RADIUS.xxl,
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
    ...TYPOGRAPHY.body,
    fontSize: 16,
  },
  resultValue: {
    ...TYPOGRAPHY.metricLarge,
  },
  doneButton: {
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg + 2,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  doneButtonText: {
    color: '#ffffff',
    ...TYPOGRAPHY.levelName,
    fontSize: 18,
    textTransform: 'none',
    letterSpacing: 0,
  },
  retryButton: {
    paddingVertical: SPACING.lg - 2,
    borderRadius: RADIUS.lg + 2,
    alignItems: 'center',
    borderWidth: 2,
  },
  retryButtonText: {
    ...TYPOGRAPHY.button,
  },
  errorText: {
    ...TYPOGRAPHY.levelName,
    fontSize: 18,
    textTransform: 'none',
    letterSpacing: 0,
    textAlign: 'center',
    marginTop: SPACING.huge,
  },
});
