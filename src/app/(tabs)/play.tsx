/**
 * Play Tab Screen
 *
 * Unified playback screen for RSVP reading.
 * Shows current content with RSVP controls and playlist bottom sheet.
 * Displays quiz for training articles after playback completes.
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { PlaybackControls } from '../../components/controls/PlaybackControls';
import { NowPlayingBar, PlaylistBottomSheet } from '../../components/playlist';
import { QuestionRenderer, QuestionAnswer } from '../../components/quiz';
import { RSVPWord } from '../../components/rsvp/RSVPWord';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, LETTER_SPACING } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useRSVPEngine } from '../../hooks/useRSVPEngine';
import { processText } from '../../services/textProcessor';
import { useJourneyStore } from '../../store/journeyStore';
import { useLearningStore } from '../../store/learningStore';
import { usePlaylistStore } from '../../store/playlistStore';
import { PlaylistSource } from '../../types/playlist';
import { isAnswerCorrect } from '../../utils/calculateQuizScore';
import { resolveContent } from '../../utils/contentResolver';

const BOTTOM_SHEET_PEEK_HEIGHT = 140;

type Phase = 'playing' | 'quiz' | 'results';

export default function PlayScreen() {
  const { theme } = useTheme();
  const { nowPlaying, updateProgress, stopPlayback } = usePlaylistStore();
  const { completeArticle, currentWPM, setCurrentWPM } = useLearningStore();
  const { recordSession } = useJourneyStore();

  // Phase management
  const [phase, setPhase] = useState<Phase>('playing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<QuestionAnswer | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [readingWPM, setReadingWPM] = useState(currentWPM);

  // Resolve content from now playing item
  const resolvedContent = useMemo(() => {
    if (!nowPlaying?.item) {return null;}
    return resolveContent(nowPlaying.item);
  }, [nowPlaying?.item]);

  // Process text into words for RSVP engine
  const processedWords = useMemo(() => {
    if (!resolvedContent?.content) {return [];}
    return processText(resolvedContent.content);
  }, [resolvedContent?.content]);

  // RSVP engine
  const engine = useRSVPEngine(processedWords, currentWPM);

  // Reset quiz state when content changes
  useEffect(() => {
    setPhase('playing');
    setCurrentQuestionIndex(0);
    setCurrentAnswer(null);
    setCorrectAnswers(0);
  }, [nowPlaying?.item?.id]);

  // Update progress in store when playback progresses
  useEffect(() => {
    if (nowPlaying?.item && engine.progress > 0) {
      updateProgress(nowPlaying.item.id, engine.progress);
    }
  }, [engine.progress, nowPlaying?.item, updateProgress]);

  // Handle playback completion
  const handlePlaybackComplete = useCallback(() => {
    setReadingWPM(engine.wpm);
    if (resolvedContent?.hasQuiz && resolvedContent.questions && resolvedContent.questions.length > 0) {
      setPhase('quiz');
    } else {
      // No quiz, just go to results
      setPhase('results');
    }
  }, [engine.wpm, resolvedContent?.hasQuiz, resolvedContent?.questions]);

  // Detect playback completion
  useEffect(() => {
    if (
      engine.progress === 1 &&
      !engine.isPlaying &&
      phase === 'playing' &&
      processedWords.length > 0
    ) {
      const timer = setTimeout(handlePlaybackComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [engine.progress, engine.isPlaying, phase, processedWords.length, handlePlaybackComplete]);

  const handleWPMLimitHit = () => {
    // TODO: Show paywall modal for premium WPM limits
  };

  const handleWPMChange = (wpm: number) => {
    engine.setWPM(wpm);
    setCurrentWPM(wpm);
  };

  const handleItemSelect = (_itemId: string, _source: PlaylistSource) => {
    // Item is already loaded via moveToTopAndLoad in the bottom sheet
    // Reset to playing phase when new content is selected
    setPhase('playing');
    setCurrentQuestionIndex(0);
    setCurrentAnswer(null);
    setCorrectAnswers(0);
  };

  const handleAnswer = (answer: QuestionAnswer) => {
    if (currentAnswer !== null || !resolvedContent?.questions) {return;}
    setCurrentAnswer(answer);

    const currentQuestion = resolvedContent.questions[currentQuestionIndex];
    const isCorrect = isAnswerCorrect(currentQuestion, answer);
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    // Move to next question or results after delay
    setTimeout(() => {
      if (currentQuestionIndex < resolvedContent.questions!.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setCurrentAnswer(null);
      } else {
        // Calculate final score and save
        const finalCorrect = correctAnswers + (isCorrect ? 1 : 0);
        const score = Math.round((finalCorrect / resolvedContent.questions!.length) * 100);

        // Save progress for training articles
        if (nowPlaying?.item?.source === 'training') {
          completeArticle(nowPlaying.item.contentId, score, readingWPM);
          recordSession({
            wpm: readingWPM,
            comprehension: score,
            articleId: nowPlaying.item.contentId,
            articleType: 'curriculum',
          });
        }

        setPhase('results');
      }
    }, 1000);
  };

  const handlePlayAgain = () => {
    setPhase('playing');
    setCurrentQuestionIndex(0);
    setCurrentAnswer(null);
    setCorrectAnswers(0);
    engine.reset();
  };

  const handleDone = () => {
    // Clear now playing and return to empty state
    stopPlayback();
    setPhase('playing');
    setCurrentQuestionIndex(0);
    setCurrentAnswer(null);
    setCorrectAnswers(0);
  };

  // Determine if we have content loaded
  const hasContent = nowPlaying?.item && resolvedContent;
  const currentQuestion = resolvedContent?.questions?.[currentQuestionIndex];
  const finalScore = resolvedContent?.questions?.length
    ? Math.round((correctAnswers / resolvedContent.questions.length) * 100)
    : 0;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      edges={['top']}
    >
      <View style={styles.content}>
        {/* Header */}
        <Text style={[styles.title, { color: theme.textColor }]}>Player</Text>

        {/* Now Playing Info */}
        <NowPlayingBar item={nowPlaying?.item ?? null} progress={engine.progress} />

        {/* Playing Phase */}
        {phase === 'playing' && (
          <>
            {/* RSVP Display Area */}
            <View style={styles.rsvpContainer}>
              {hasContent ? (
                <RSVPWord word={engine.currentWord} />
              ) : (
                <View style={styles.emptyState}>
                  <Text style={[styles.emptyTitle, { color: theme.textColor }]}>
                    Ready to Read
                  </Text>
                  <Text style={[styles.emptySubtitle, { color: theme.textColor }]}>
                    Add content from Training or Reading to begin
                  </Text>
                </View>
              )}
            </View>

            {/* Playback Controls */}
            {hasContent && (
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
                onWPMLimitHit={handleWPMLimitHit}
              />
            )}
          </>
        )}

        {/* Quiz Phase */}
        {phase === 'quiz' && currentQuestion && (
          <View style={styles.quizContainer}>
            <View style={styles.quizProgress}>
              <Text style={[styles.quizProgressText, { color: theme.textColor }]}>
                Question {currentQuestionIndex + 1} of {resolvedContent?.questions?.length ?? 0}
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

        {/* Results Phase */}
        {phase === 'results' && (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, { color: theme.textColor }]}>
              Complete!
            </Text>

            <View style={[styles.resultsCard, { backgroundColor: theme.secondaryBackground }]}>
              {resolvedContent?.hasQuiz && (
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
                      {correctAnswers} / {resolvedContent?.questions?.length ?? 0}
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

      {/* Playlist Bottom Sheet - always visible at bottom */}
      <PlaylistBottomSheet
        peekHeight={BOTTOM_SHEET_PEEK_HEIGHT}
        onItemSelect={handleItemSelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingBottom: BOTTOM_SHEET_PEEK_HEIGHT,
  },
  title: {
    ...TYPOGRAPHY.pageTitle,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  rsvpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
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
