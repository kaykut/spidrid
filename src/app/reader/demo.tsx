import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { PlaybackControls } from '../../components/controls/PlaybackControls';
import { Paywall } from '../../components/paywall/Paywall';
import { RSVPWord } from '../../components/rsvp/RSVPWord';
import { SPACING, COMPONENT_SPACING, space, LINE_HEIGHTS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { useRSVPEngine } from '../../hooks/useRSVPEngine';
import { processText } from '../../services/textProcessor';

const DEMO_TEXT = `The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. Speed reading is a collection of methods for increasing reading speed without unacceptable reductions in comprehension or retention. RSVP, or Rapid Serial Visual Presentation, displays words one at a time in a fixed position on the screen. The red letter you see is called the Optimal Recognition Point, or ORP. By fixing your eye on this point, you eliminate the need for saccadic eye movements, which normally consume about 80% of reading time. With practice, you can reach speeds of 500 to 1000 words per minute while maintaining good comprehension.`;

export default function DemoReaderScreen() {
  const { theme } = useTheme();
  const words = useMemo(() => processText(DEMO_TEXT), []);
  const engine = useRSVPEngine(words, 250);
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <>
    <Paywall
      visible={showPaywall}
      onClose={() => setShowPaywall(false)}
      reason="wpm_limit"
    />
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.accentColor }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>RSVP Demo</Text>
        <View style={styles.backButton} />
      </View>

      {/* Word display area */}
      <View style={styles.wordArea}>
        <RSVPWord word={engine.currentWord} fontSize={SPACING.massive} />
      </View>

      {/* Controls */}
      <PlaybackControls
        isPlaying={engine.isPlaying}
        wpm={engine.wpm}
        progress={engine.progress}
        currentIndex={engine.currentIndex}
        totalWords={engine.totalWords}
        onToggle={engine.toggle}
        onWPMChange={engine.setWPM}
        onRewind={engine.rewindSentence}
        onSkip={engine.skipSentence}
        onWPMLimitHit={() => setShowPaywall(true)}
      />

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={[styles.instructionText, { color: theme.textColor }]}>
          Focus on the <Text style={{ color: theme.orpColor }}>red letter</Text> in each word.
          {'\n'}Let the words come to you.
        </Text>
      </View>
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
    paddingHorizontal: COMPONENT_SPACING.screenPadding,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: space(10),
  },
  backText: {
    fontSize: TYPOGRAPHY.button.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
  },
  title: {
    fontSize: TYPOGRAPHY.levelName.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
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
    fontSize: TYPOGRAPHY.buttonSmall.fontSize,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: LINE_HEIGHTS.xl,
  },
});
