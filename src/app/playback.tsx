/**
 * Playback Modal
 *
 * Full-screen modal for RSVP reading playback.
 * Receives content via route params, no playlist dependencies.
 * Opens with content loaded but paused.
 */

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/common/ThemeProvider';
import { PlaybackControls } from '../components/controls/PlaybackControls';
import { ChapterPauseOverlay } from '../components/rsvp/ChapterPauseOverlay';
import { RSVPWord } from '../components/rsvp/RSVPWord';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, LETTER_SPACING } from '../constants/typography';
import { JOURNEY_COLORS } from '../data/themes';
import { useRSVPEngine } from '../hooks/useRSVPEngine';
import { getAdapterForContent, getAdapter } from '../services/language';
import { processText, getAdaptiveFontSize } from '../services/textProcessor';
import { useContentStore } from '../store/contentStore';
import { useGeneratedStore } from '../store/generatedStore';
import { useLearningStore } from '../store/learningStore';
import { useSettingsStore } from '../store/settingsStore';
import { ContentSource } from '../types/contentList';
import { resolveContentBySource } from '../utils/contentResolver';
import { savePosition, getSavedPosition, AUTO_SAVE_INTERVAL_MS } from '../utils/positionUtils';
import { splitTitle } from '../utils/titleUtils';

/**
 * Validates saved position index and returns 0 for invalid values
 */
function getValidStartIndex(savedIndex: number | undefined, totalWords: number): number {
  if (savedIndex === undefined || savedIndex < 0 || savedIndex >= totalWords) {
    return 0;
  }
  return savedIndex;
}

export default function PlaybackModal() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('playback');
  const { t: tCommon } = useTranslation('common');
  const params = useLocalSearchParams<{ sourceId: string; source: string }>();
  const sourceId = params.sourceId ?? '';
  const source = (params.source ?? 'imported') as ContentSource;

  const { currentWPM, setCurrentWPM, startArticle } = useLearningStore();
  const { updateProgress } = useContentStore();
  const { updateArticleProgress: updateGeneratedProgress } = useGeneratedStore();
  // Track reading WPM for results
  const [readingWPM, setReadingWPM] = useState(currentWPM);
  const [isComplete, setIsComplete] = useState(false);

  // Ref to track latest state for cleanup effects (avoids stale closure bugs)
  const latestStateRef = useRef({
    currentIndex: 0,
    isComplete: false,
    progress: 0,
    sourceId,
    source,
  });

  // Resolve content from params
  const resolvedContent = useMemo(() => {
    if (!sourceId) {
      return null;
    }
    return resolveContentBySource(sourceId, source);
  }, [sourceId, source]);

  // Get reading language setting for per-content language detection
  const readingLanguage = useSettingsStore(state => state.readingLanguage);
  const pauseOnComma = useSettingsStore(state => state.pauseOnComma);
  const pauseOnPeriod = useSettingsStore(state => state.pauseOnPeriod);
  const hyphenationMode = useSettingsStore(state => state.hyphenationMode);

  // Process text into words for RSVP engine
  const processedWords = useMemo(() => {
    if (!resolvedContent?.content) {
      return [];
    }

    // Get adapter based on content + user setting
    const adapter = readingLanguage === 'auto'
      ? getAdapterForContent(resolvedContent.content) // Auto-detect with franc
      : getAdapter(readingLanguage); // Force user's choice

    return processText(resolvedContent.content, adapter, { pauseOnComma, pauseOnPeriod, hyphenationMode });
  }, [resolvedContent?.content, readingLanguage, pauseOnComma, pauseOnPeriod, hyphenationMode]);

  // Restore saved reading position (if available)
  const savedPosition = useMemo(() => {
    if (!sourceId || processedWords.length === 0) {
      return 0;
    }

    const rawPosition = getSavedPosition(sourceId, source);
    return getValidStartIndex(rawPosition, processedWords.length);
  }, [sourceId, source, processedWords.length]);

  // Mark article as started when content is loaded
  useEffect(() => {
    if (sourceId && (source === 'training' || source === 'generated' || source === 'curriculum')) {
      startArticle(sourceId);
    }
  }, [sourceId, source, startArticle]);

  // RSVP engine - starts paused, resumes from saved position if available
  const engine = useRSVPEngine(processedWords, currentWPM, savedPosition);

  // Calculate adaptive font size based on current word length
  const adaptiveFontSize = engine.currentWord
    ? getAdaptiveFontSize(engine.currentWord.display.length)
    : 42;

  // Keep ref updated with latest state (for cleanup effects)
  useEffect(() => {
    latestStateRef.current = {
      currentIndex: engine.currentIndex,
      isComplete,
      progress: engine.progress,
      sourceId,
      source,
    };
  }, [engine.currentIndex, isComplete, engine.progress, sourceId, source]);

  // Handle playback completion
  const handlePlaybackComplete = useCallback(() => {
    setReadingWPM(engine.wpm);
    setIsComplete(true);

    // Update progress based on source type (for non-quiz content)
    // Clear position on completion so next read starts fresh
    if (source === 'imported') {
      updateProgress(sourceId, 1, undefined);
    } else if (source === 'generated' && !resolvedContent?.hasQuiz) {
      // Mark generated article as completed (no quiz)
      updateGeneratedProgress(sourceId, {
        completed: true,
        highestWPM: engine.wpm,
        lastReadAt: Date.now(),
        currentWordIndex: undefined,
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

  // Periodic auto-save every 15 seconds while playing
  useEffect(() => {
    if (!engine.isPlaying || !sourceId || !source) {
      return;
    }

    const saveInterval = setInterval(() => {
      const state = latestStateRef.current;
      savePosition(sourceId, source, state.currentIndex, state.progress);
    }, AUTO_SAVE_INTERVAL_MS);

    return () => clearInterval(saveInterval);
  }, [engine.isPlaying, sourceId, source]);

  // Save position on unmount (modal close)
  useEffect(() => {
    return () => {
      const state = latestStateRef.current;
      // Don't save if content was completed (position already cleared)
      if (state.isComplete || !state.sourceId || state.source === 'training') {
        return;
      }

      // Save position on unmount
      savePosition(state.sourceId, state.source, state.currentIndex, state.progress);
    };
  }, []); // Empty deps - only runs on unmount

  // Save position when app backgrounds (while playback modal is open)
  // This ensures reading position is persisted if the app is backgrounded without
  // closing the modal. Note: This is LOCAL storage save only, not server sync.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        const state = latestStateRef.current;
        // Save current reading position to local storage
        if (!state.isComplete && state.sourceId && state.source !== 'training') {
          savePosition(state.sourceId, state.source, state.currentIndex, state.progress);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []); // Empty deps - subscription uses latestStateRef

  const handleClose = () => {
    // Save current position before closing
    savePosition(sourceId, source, engine.currentIndex, engine.progress);
    router.back();
  };

  const handleWPMLimitHit = () => {
    router.push({ pathname: '/paywall', params: { trigger: 'wpm_limit' } });
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
        style={[styles.closeButton, { top: insets.top + SPACING.md, left: SPACING.md }]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={SIZES.iconLg} color={theme.textColor} />
      </TouchableOpacity>

      {/* Title - absolute positioned, centered (supports two-line split) */}
      {(() => {
        const title = resolvedContent?.title ?? t('default_title');
        const { primary, subtitle } = splitTitle(title);
        return (
          <View
            style={[
              styles.headerTitleContainer,
              { top: insets.top + SPACING.md },
            ]}
          >
            <Text
              style={[styles.headerTitle, { color: theme.textColor }]}
              numberOfLines={1}
            >
              {primary}
            </Text>
            {subtitle && (
              <Text
                style={[styles.headerSubtitle, { color: theme.textColor }]}
                numberOfLines={1}
              >
                {subtitle}
              </Text>
            )}
          </View>
        );
      })()}

      <View style={[styles.content, { paddingTop: insets.top + SIZES.touchTarget + SPACING.lg, paddingBottom: insets.bottom + SPACING.lg }]}>
        {/* Results View */}
        {isComplete && !resolvedContent?.hasQuiz ? (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, { color: theme.textColor }]}>
              {t('results.complete')}
            </Text>

            <View style={[styles.resultsCard, { backgroundColor: theme.secondaryBackground }]}>
              <View style={styles.resultRow}>
                <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                  {t('results.reading_speed')}
                </Text>
                <Text style={[styles.resultValue, { color: theme.accentColor }]}>
                  {readingWPM} WPM
                </Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={[styles.resultLabel, { color: theme.textColor }]}>
                  {t('results.words_read')}
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
        ) : (
          /* RSVP Playback View */
          <>
            {/* RSVP Display Area */}
            <View style={styles.rsvpContainer}>
              {!hasContent && (
                <View style={styles.emptyState}>
                  <Text style={[styles.emptyTitle, { color: theme.textColor }]}>
                    {t('empty.content_not_found')}
                  </Text>
                  <Text style={[styles.emptySubtitle, { color: theme.textColor }]}>
                    {t('empty.content_not_loaded')}
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
                <RSVPWord word={engine.currentWord} fontSize={adaptiveFontSize} />
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
  headerTitleContainer: {
    position: 'absolute',
    zIndex: 10,
    left: SIZES.touchTarget + SPACING.lg,
    right: SIZES.touchTarget + SPACING.lg,
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.cardTitle,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...TYPOGRAPHY.label,
    textAlign: 'center',
    opacity: 0.7,
    marginTop: SPACING.xxs,
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
