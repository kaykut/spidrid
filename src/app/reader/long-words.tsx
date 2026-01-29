/**
 * Long Words Test Screen
 *
 * RSVP playback with only 11-18 character words.
 * Tests dynamic word splitting to prevent wrapping.
 */

import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { PlaybackControls } from '../../components/controls/PlaybackControls';
import { RSVPWord } from '../../components/rsvp/RSVPWord';
import { SPACING, COMPONENT_SPACING } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { useRSVPEngine } from '../../hooks/useRSVPEngine';
import { processText, getAdaptiveFontSize } from '../../services/textProcessor';
import { useSettingsStore } from '../../store/settingsStore';

// Test words: Ordered by length (12-22 chars) for progressive font size testing
const TEST_WORDS = [
  // 12 chars - 42pt
  'introduction',
  'organization',
  'appreciation',
  'conversation',
  'overwhelming',
  'professional',
  'relationship',
  'unemployment',
  'universities',
  'headquarters',

  // 13 chars - 42pt
  'extraordinary',
  'environmental',
  'psychological',
  'philosophical',
  'international',
  'understanding',
  'approximately',
  'manufacturing',
  'inconceivable',
  'comprehension',
  'parliamentary',
  'collaborative',
  'semiconductor',
  'unprecedented',
  'correspondent',
  'comprehensive',
  'technological',
  'inappropriate',
  'retrospective',
  'effectiveness',

  // 14 chars - 40pt
  'photosynthesis',
  'representative',
  'infrastructure',
  'antibacterial',
  'monochromatic',
  'heterogeneous',
  'paradoxically',
  'transportation',
  'accountability',
  'recommendation',
  'discrimination',
  'implementation',
  'reconstruction',
  'interpretation',
  'transformation',
  'classification',
  'rehabilitation',
  'identification',
  'multiplication',
  'specification',
  'simplification',
  'authentication',
  'administration',
  'archaeological',

  // 15 chars - 36pt
  'responsibilities',
  'characteristics',
  'acknowledgement',
  'experimentation',
  'implementations',
  'congratulations',
  'recommendations',
  'interpretations',
  'representations',
  'uncharacterized',
  'acknowledgments',

  // 16 chars - 34pt
  'characterization',
  'instrumentalists',
  'internationalism',
  'uncharacteristic',
  'incomprehensible',
  'intercontinental',
  'experientialists',
  'institutionalize',
  'compartmentalize',
  'constitutionally',
  'extraordinarily',
  'incomprehensibly',
  'internationalize',
  'disqualification',
  'counterintuitive',
  'mischaracterized',

  // 17 chars - 32pt (would use hyphenation in production)
  'telecommunication',
  'counterproductive',
  'misrepresentation',
  'internationalized',
  'compartmentalized',

  // 18 chars - 32pt (would use hyphenation in production)
  'telecommunications',
  'disproportionately',
  'interconnectedness',
  'disproportionality',
  'intercommunication',

  // 19 chars - 30pt (would use hyphenation in production)
  'incomprehensibility',
  'counterproductively',
  'mischaracterization',
  'electrocardiography',
  'microelectronically',
  'telecommunicational',
  'intercommunications',
  'counterintelligence',

  // 20 chars - 30pt (would use hyphenation in production)
  'internationalization',
  'counterintuitiveness',
  'compartmentalization',
  'disproportionalities',
  'uncharacteristically',

  // 21 chars - 30pt (would use hyphenation in production)
  'electrocardiographer',
  'incomprehensibilities',
  'internationalizations',
  'compartmentalizations',
  'counterproductiveness',
  'electrocardiographies',

  // 22 chars - 30pt (would use hyphenation in production)
  'counterrevolutionaries',
  'disproportionatenesses',
];

// Join with spaces to create test text
const LONG_WORD_TEST = TEST_WORDS.join(' ');

export default function LongWordsTestScreen() {
  const { theme } = useTheme();
  const [currentWPM, setCurrentWPM] = useState(250);
  const pauseOnComma = useSettingsStore(state => state.pauseOnComma);
  const pauseOnPeriod = useSettingsStore(state => state.pauseOnPeriod);
  const hyphenationMode = useSettingsStore(state => state.hyphenationMode);

  // Process test content using production logic (WITH hyphenation for 22+ chars)
  const processedWords = useMemo(() => {
    return processText(LONG_WORD_TEST, undefined, { pauseOnComma, pauseOnPeriod, hyphenationMode });
  }, [pauseOnComma, pauseOnPeriod, hyphenationMode]);

  const engine = useRSVPEngine(processedWords, currentWPM);

  // Calculate adaptive font size based on current word length
  const adaptiveFontSize = engine.currentWord
    ? getAdaptiveFontSize(engine.currentWord.display.length)
    : 42;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={28} color={theme.textColor} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: theme.textColor }]}>
            Adaptive Font Size Test
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondaryColor }]}>
            {TEST_WORDS.length} words (12-22 chars)
          </Text>
        </View>
        <View style={styles.backButton} />
      </View>

      {/* Character counter */}
      <View style={styles.charCounterContainer}>
        <Text style={[styles.charCounterLabel, { color: theme.textSecondaryColor }]}>
          Length:
        </Text>
        <Text style={[styles.charCounterValue, { color: theme.accentColor }]}>
          {engine.currentWord?.display.length || 0} chars
        </Text>
        <Text style={[styles.charCounterFont, { color: theme.textSecondaryColor }]}>
          → {adaptiveFontSize}pt
        </Text>
      </View>

      {/* Word display area */}
      <View style={styles.wordArea}>
        <RSVPWord word={engine.currentWord} fontSize={adaptiveFontSize} />
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
                      ? `${theme.accentColor  }20`
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
  charCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  charCounterLabel: {
    fontSize: TYPOGRAPHY.label.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
  },
  charCounterValue: {
    fontSize: TYPOGRAPHY.sectionTitle.fontSize,
    fontWeight: FONT_WEIGHTS.bold,
  },
  charCounterFont: {
    fontSize: TYPOGRAPHY.label.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
  },
  wordArea: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,  // TEST: Custom 4pt padding to maximize text space
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
