import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../components/common/ThemeProvider';
import { RSVPWord } from '../../components/rsvp/RSVPWord';
import { PlaybackControls } from '../../components/controls/PlaybackControls';
import { useRSVPEngine } from '../../hooks/useRSVPEngine';
import { processText } from '../../services/textProcessor';
import { useContentStore } from '../../store/contentStore';
import { useLearningStore } from '../../store/learningStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { Paywall } from '../../components/paywall/Paywall';

export default function ContentReaderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { getContentById, updateProgress, updateLastRead } = useContentStore();
  const { currentWPM, setCurrentWPM } = useLearningStore();
  const { getMaxWPM } = useSubscriptionStore();

  const [showPaywall, setShowPaywall] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const content = getContentById(id);

  const words = useMemo(
    () => (content ? processText(content.content) : []),
    [content]
  );

  // Calculate starting position from saved progress
  const startIndex = useMemo(() => {
    if (!content || content.readProgress >= 1) return 0;
    return Math.floor(content.readProgress * (words.length - 1));
  }, [content, words.length]);

  const engine = useRSVPEngine(words, Math.min(currentWPM, getMaxWPM()));

  // Jump to saved position on mount
  useEffect(() => {
    if (startIndex > 0 && words.length > 0) {
      engine.jumpToIndex(startIndex);
    }
  }, [startIndex]);

  // Update progress as user reads
  useEffect(() => {
    if (!content || words.length === 0) return;

    const progress = engine.currentIndex / (words.length - 1);

    // Save progress periodically (every 5%)
    const savedProgress = content.readProgress;
    if (progress - savedProgress > 0.05 || progress >= 1) {
      updateProgress(id, Math.min(progress, 1));
    }

    // Check for completion
    if (progress >= 1 && !engine.isPlaying && !isComplete) {
      setIsComplete(true);
      updateProgress(id, 1);
    }
  }, [engine.currentIndex, engine.isPlaying, words.length, content?.readProgress, isComplete]);

  // Update last read timestamp
  useEffect(() => {
    updateLastRead(id);
  }, [id]);

  if (!content) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.errorText, { color: theme.textColor }]}>Content not found</Text>
      </SafeAreaView>
    );
  }

  const handleWPMChange = (wpm: number) => {
    engine.setWPM(wpm);
    setCurrentWPM(wpm);
  };

  const handleBack = () => {
    // Save final progress before leaving
    const progress = words.length > 0 ? engine.currentIndex / (words.length - 1) : 0;
    updateProgress(id, Math.min(progress, 1));
    router.back();
  };

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
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={[styles.backText, { color: theme.accentColor }]}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.sourceLabel, { color: theme.accentColor }]}>
              {content.source === 'url' ? '🔗 Web' : '📝 Text'}
            </Text>
            <Text style={[styles.contentTitle, { color: theme.textColor }]} numberOfLines={1}>
              {content.title}
            </Text>
          </View>
          <View style={styles.backButton} />
        </View>

        {isComplete ? (
          <View style={styles.completeContainer}>
            <Text style={[styles.completeTitle, { color: theme.textColor }]}>
              Complete!
            </Text>
            <Text style={[styles.completeSubtitle, { color: theme.textColor }]}>
              You finished reading {content.wordCount} words
            </Text>

            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: theme.accentColor }]}
              onPress={handleBack}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.rereadButton, { borderColor: theme.accentColor }]}
              onPress={() => {
                setIsComplete(false);
                engine.reset();
                updateProgress(id, 0);
              }}
            >
              <Text style={[styles.rereadButtonText, { color: theme.accentColor }]}>
                Read Again
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
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
                {'\n'}Progress is saved automatically.
              </Text>
            </View>
          </>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 80,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  sourceLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  wordArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  instructionText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 20,
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  completeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  completeSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 40,
  },
  doneButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 14,
    marginBottom: 12,
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  rereadButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    borderWidth: 2,
  },
  rereadButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});
