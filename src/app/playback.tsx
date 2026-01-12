/**
 * Playback Modal
 *
 * Full-screen modal for RSVP reading playback.
 * Receives content via route params, no playlist dependencies.
 * Opens with content loaded but paused.
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/common/ThemeProvider';
import { PlaybackControls } from '../components/controls/PlaybackControls';
import { ChapterPauseOverlay } from '../components/rsvp/ChapterPauseOverlay';
import { RSVPWord } from '../components/rsvp/RSVPWord';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, LETTER_SPACING } from '../constants/typography';
import { JOURNEY_COLORS } from '../data/themes';
import { useRSVPEngine } from '../hooks/useRSVPEngine';
import { processText } from '../services/textProcessor';
import { useContentStore } from '../store/contentStore';
import { useGeneratedStore } from '../store/generatedStore';
import { useLearningStore } from '../store/learningStore';
import { ContentSource } from '../types/contentList';
import { resolveContentBySource } from '../utils/contentResolver';

export default function PlaybackModal() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ sourceId: string; source: string }>();
  const sourceId = params.sourceId ?? '';
  const source = (params.source ?? 'imported') as ContentSource;

  const { currentWPM, setCurrentWPM, startArticle } = useLearningStore();
  const { updateProgress } = useContentStore();
  const { updateArticleProgress: updateGeneratedProgress } = useGeneratedStore();

  // Track reading WPM for results
  const [readingWPM, setReadingWPM] = useState(currentWPM);
  const [isComplete, setIsComplete] = useState(false);

  // Resolve content from params
  const resolvedContent = useMemo(() => {
    if (!sourceId) {
      return null;
    }
    return resolveContentBySource(sourceId, source);
  }, [sourceId, source]);

  // Process text into words for RSVP engine
  const processedWords = useMemo(() => {
    if (!resolvedContent?.content) {
      return [];
    }
    return processText(resolvedContent.content);
  }, [resolvedContent?.content]);

  // Mark article as started when content is loaded
  useEffect(() => {
    if (sourceId && (source === 'training' || source === 'generated' || source === 'curriculum')) {
      startArticle(sourceId);
    }
  }, [sourceId, source, startArticle]);

  // RSVP engine - starts paused (default behavior)
  const engine = useRSVPEngine(processedWords, currentWPM);

  // Handle playback completion
  const handlePlaybackComplete = useCallback(() => {
    setReadingWPM(engine.wpm);
    setIsComplete(true);

    // Update progress based on source type (for non-quiz content)
    if (source === 'imported') {
      updateProgress(sourceId, 1);
    } else if (source === 'generated' && !resolvedContent?.hasQuiz) {
      // Mark generated article as completed (no quiz)
      updateGeneratedProgress(sourceId, {
        completed: true,
        highestWPM: engine.wpm,
        lastReadAt: Date.now(),
      });
    }
    // Note: Training and curriculum completion happens in quiz modal

    // Navigate to quiz if content has quiz questions
    if (resolvedContent?.hasQuiz && resolvedContent.questions && resolvedContent.questions.length > 0) {
      router.push({
        pathname: '/playback-quiz',
        params: {
          sourceId,
          source,
          wpm: String(engine.wpm),
        },
      });
    }
  }, [
    engine.wpm,
    source,
    sourceId,
    resolvedContent?.hasQuiz,
    resolvedContent?.questions,
    updateProgress,
    updateGeneratedProgress,
  ]);

  // Detect playback completion
  useEffect(() => {
    if (
      engine.progress === 1 &&
      !engine.isPlaying &&
      !isComplete &&
      processedWords.length > 0
    ) {
      const timer = setTimeout(handlePlaybackComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [engine.progress, engine.isPlaying, isComplete, processedWords.length, handlePlaybackComplete]);

  const handleClose = () => {
    router.back();
  };

  const handleWPMLimitHit = () => {
    // TODO: Show paywall modal for premium WPM limits
  };

  const handleWPMChange = (wpm: number) => {
    engine.setWPM(wpm);
    setCurrentWPM(wpm);
  };

  const handlePlayAgain = () => {
    setIsComplete(false);
    engine.reset();
  };

  const handleDone = () => {
    router.back();
  };

  // Determine if we have content loaded
  const hasContent = sourceId && resolvedContent;

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Close button - absolute positioned in safe area */}
      <TouchableOpacity
        onPress={handleClose}
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
        numberOfLines={1}
      >
        {resolvedContent?.title ?? 'Reading'}
      </Text>

      <View style={[styles.content, { paddingTop: insets.top + SIZES.touchTarget, paddingBottom: insets.bottom }]}>
        {/* Results View */}
        {isComplete && !resolvedContent?.hasQuiz ? (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, { color: theme.textColor }]}>
              Complete!
            </Text>

            <View style={[styles.resultsCard, { backgroundColor: theme.secondaryBackground }]}>
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
                  Words Read
                </Text>
                <Text style={[styles.resultValue, { color: theme.textColor }]}>
                  {resolvedContent?.wordCount ?? 0}
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
        ) : (
          /* RSVP Playback View */
          <>
            {/* RSVP Display Area */}
            <View style={styles.rsvpContainer}>
              {!hasContent && (
                <View style={styles.emptyState}>
                  <Text style={[styles.emptyTitle, { color: theme.textColor }]}>
                    Content Not Found
                  </Text>
                  <Text style={[styles.emptySubtitle, { color: theme.textColor }]}>
                    The requested content could not be loaded.
                  </Text>
                </View>
              )}
              {hasContent && engine.chapterPaused && (
                <ChapterPauseOverlay
                  chapter={engine.chapterPaused}
                  onContinue={engine.resumeFromChapter}
                />
              )}
              {hasContent && !engine.chapterPaused && (
                <RSVPWord word={engine.currentWord} />
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
