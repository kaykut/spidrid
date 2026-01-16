/**
 * Long Words Test Screen
 *
 * RSVP playback with only 11-18 character words.
 * Tests dynamic word splitting to prevent wrapping.
 */

import { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { PlaybackControls } from '../../components/controls/PlaybackControls';
import { RSVPWord } from '../../components/rsvp/RSVPWord';
import { SPACING, COMPONENT_SPACING } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, RSVP_DISPLAY } from '../../constants/typography';
import { useRSVPEngine } from '../../hooks/useRSVPEngine';
import { processText } from '../../services/textProcessor';
import { useSettingsStore } from '../../store/settingsStore';

// Test words: 11-18 characters only
const TEST_WORDS = [
  'introducing',       // 11 chars - THE problematic word
  'photosynthesis',    // 14 chars
  'extraordinary',     // 13 chars
  'inconceivable',     // 13 chars
  'comprehension',     // 13 chars
  'telecommunications', // 18 chars
  'representative',    // 14 chars
  'infrastructure',    // 14 chars
  'environmental',     // 13 chars
  'psychological',     // 13 chars
  'philosophical',     // 13 chars
  'technological',     // 13 chars
  'international',     // 13 chars
  'revolutionary',     // 13 chars
  'organization',      // 12 chars
  'construction',      // 12 chars
  'contribution',      // 12 chars
  'developments',      // 12 chars
  'achievements',      // 12 chars
  'consequences',      // 12 chars
  'overwhelming',      // 12 chars
  'appreciation',      // 12 chars
  'significance',      // 12 chars
  'approximately',     // 13 chars
  'unbelievable',      // 12 chars
  'supernatural',      // 12 chars
  'conversation',      // 12 chars
  'neighborhood',      // 12 chars
  'independence',      // 12 chars
  'professional',      // 12 chars
  'relationship',      // 12 chars
  'understanding',     // 13 chars
  'characterize',      // 12 chars
  'considerable',      // 12 chars
  'unemployment',      // 12 chars
  'breakthrough',      // 12 chars
  'questionable',      // 12 chars
  'headquarters',      // 12 chars
  'universities',      // 12 chars
  'combinations',      // 12 chars
  'deliberately',      // 12 chars
  'manufacturing',     // 13 chars
  'celebrations',      // 12 chars
  'investigators',     // 13 chars
  'laboratories',      // 12 chars
  'subsequently',      // 12 chars
  'incorporated',      // 12 chars
  'illustrations',     // 13 chars
  'establishing',      // 12 chars
  'contemporary',      // 12 chars
];

// Join with spaces to create test text
const LONG_WORD_TEST = TEST_WORDS.join(' ');

export default function LongWordsTestScreen() {
  const { theme } = useTheme();
  const fontFamily = useSettingsStore(state => state.fontFamily);
  const [currentWPM, setCurrentWPM] = useState(250);

  // Track screen dimensions for rotation handling
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  // Process test content with dynamic splitting
  const processedWords = useMemo(() => {
    const fontSize = RSVP_DISPLAY.fontSize ?? 48;
    return processText(
      LONG_WORD_TEST,
      undefined, // chapters
      undefined, // adapter
      fontSize,
      fontFamily,
      screenDimensions.width
    );
  }, [fontFamily, screenDimensions.width]);

  const engine = useRSVPEngine(processedWords, currentWPM);

  // Listen for screen rotation/dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      console.log('[long-words] Screen dimensions changed:', window.width, 'x', window.height);
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={28} color={theme.textColor} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: theme.textColor }]}>
            Word Splitting Test
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondaryColor }]}>
            {TEST_WORDS.length} long words (11-18 chars)
          </Text>
        </View>
        <View style={styles.backButton} />
      </View>

      {/* Info banner */}
      <View style={[styles.infoBanner, { backgroundColor: theme.metaColor + '15' }]}>
        <Ionicons name="information-circle" size={20} color={theme.metaColor} />
        <View style={styles.infoTextContainer}>
          <Text style={[styles.infoText, { color: theme.metaColor }]}>
            Watch for wrapping or over-splitting
          </Text>
          <Text style={[styles.infoTextSmall, { color: theme.metaColor }]}>
            All words should display on single line
          </Text>
        </View>
      </View>

      {/* Word display area */}
      <View style={styles.wordArea}>
        <RSVPWord word={engine.currentWord} fontSize={RSVP_DISPLAY.fontSize ?? 48} />
      </View>

      {/* Current word info */}
      <View style={styles.currentWordInfo}>
        <Text style={[styles.currentWordLabel, { color: theme.textSecondaryColor }]}>
          Word {engine.currentIndex + 1} of {engine.totalWords}
        </Text>
        <Text style={[styles.currentWordText, { color: theme.textColor }]}>
          {engine.currentWord?.display || '—'}
        </Text>
        {engine.currentWord?.fullWord && (
          <Text style={[styles.fullWordText, { color: theme.metaColor }]}>
            Full: {engine.currentWord.fullWord} ({engine.currentWord.fullWord.length} chars)
          </Text>
        )}
        {engine.currentWord?.isContinuation && (
          <Text style={[styles.continuationText, { color: theme.accentColor }]}>
            ⚠️ Continuation of split word
          </Text>
        )}
      </View>

      {/* Controls */}
      <PlaybackControls
        isPlaying={engine.isPlaying}
        wpm={engine.wpm}
        progress={engine.progress}
        currentIndex={engine.currentIndex}
        totalWords={engine.totalWords}
        onToggle={engine.toggle}
        onWPMChange={(wpm) => {
          engine.setWPM(wpm);
          setCurrentWPM(wpm);
        }}
        onRewind={engine.rewindSentence}
        onSkip={engine.skipSentence}
      />

      {/* Test word list (scrollable) */}
      <View style={styles.wordListContainer}>
        <Text style={[styles.wordListTitle, { color: theme.textSecondaryColor }]}>
          Test Words ({TEST_WORDS.length}):
        </Text>
        <ScrollView
          style={styles.wordList}
          showsVerticalScrollIndicator={true}
        >
          {TEST_WORDS.map((word, index) => {
            // Check if this word is currently playing
            const isCurrent = engine.currentWord?.original === word ||
                            engine.currentWord?.fullWord === word;

            return (
              <View
                key={index}
                style={[
                  styles.wordListItem,
                  {
                    backgroundColor: isCurrent
                      ? theme.accentColor + '20'
                      : 'transparent'
                  }
                ]}
              >
                <Text style={[styles.wordListNumber, { color: theme.textSecondaryColor }]}>
                  {(index + 1).toString().padStart(2, '0')}.
                </Text>
                <Text style={[styles.wordListWord, { color: theme.textColor }]}>
                  {word}
                </Text>
                <Text style={[styles.wordListLength, { color: theme.metaColor }]}>
                  ({word.length})
                </Text>
              </View>
            );
          })}
        </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: COMPONENT_SPACING.screenPadding,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.sectionTitle.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    marginTop: SPACING.xxs,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: COMPONENT_SPACING.screenPadding,
    paddingVertical: SPACING.sm,
    marginHorizontal: COMPONENT_SPACING.screenPadding,
    marginBottom: SPACING.md,
    borderRadius: 8,
    gap: SPACING.sm,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: TYPOGRAPHY.label.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
  },
  infoTextSmall: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    marginTop: SPACING.xxs,
  },
  wordArea: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentWordInfo: {
    paddingHorizontal: COMPONENT_SPACING.screenPadding,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  currentWordLabel: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: SPACING.xxs,
  },
  currentWordText: {
    fontSize: TYPOGRAPHY.body.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  fullWordText: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    marginTop: SPACING.xxs,
    fontStyle: 'italic',
  },
  continuationText: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    marginTop: SPACING.xxs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  wordListContainer: {
    flex: 1,
    paddingHorizontal: COMPONENT_SPACING.screenPadding,
    paddingBottom: SPACING.md,
  },
  wordListTitle: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: SPACING.xs,
  },
  wordList: {
    flex: 1,
  },
  wordListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.xxs,
    borderRadius: 4,
  },
  wordListNumber: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    width: 30,
  },
  wordListWord: {
    flex: 1,
    fontSize: TYPOGRAPHY.label.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
  },
  wordListLength: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
  },
});
