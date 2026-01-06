import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../components/common/ThemeProvider';
import { RSVPWord } from '../../components/rsvp/RSVPWord';
import { PlaybackControls } from '../../components/controls/PlaybackControls';
import { useRSVPEngine } from '../../hooks/useRSVPEngine';
import { processText } from '../../services/textProcessor';
import { getArticleById, getTopicById } from '../../data/curriculum';
import { useLearningStore } from '../../store/learningStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { useCertificateStore } from '../../store/certificateStore';
import { Paywall } from '../../components/paywall/Paywall';
import { NewCertificateModal } from '../../components/certificates/NewCertificateModal';
import { Certificate } from '../../types/certificates';

type Phase = 'reading' | 'quiz' | 'results';

export default function ArticleReaderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const { completeArticle, currentWPM, setCurrentWPM, getHighestWPM } = useLearningStore();
  const { getMaxWPM } = useSubscriptionStore();
  const { checkAndAwardCertificates } = useCertificateStore();

  const article = getArticleById(id);
  const topic = article ? getTopicById(article.topicId) : null;

  const [phase, setPhase] = useState<Phase>('reading');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [readingWPM, setReadingWPM] = useState(currentWPM);
  const [newCertificate, setNewCertificate] = useState<Certificate | null>(null);

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

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    // Move to next question or results after delay
    setTimeout(() => {
      if (currentQuestionIndex < article.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate final score and save
        const finalCorrect = correctAnswers + (isCorrect ? 1 : 0);
        const score = Math.round((finalCorrect / article.questions.length) * 100);
        completeArticle(article.id, score, readingWPM);

        // Check for new certificates
        const highestWPM = Math.max(getHighestWPM(), readingWPM);
        const newCerts = checkAndAwardCertificates(highestWPM);
        if (newCerts.length > 0) {
          setNewCertificate(newCerts[0]); // Show first new certificate
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

  return (
    <>
      <Paywall
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        reason="wpm_limit"
      />
      <NewCertificateModal
        certificate={newCertificate}
        visible={newCertificate !== null}
        onClose={() => setNewCertificate(null)}
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

            <Text style={[styles.questionText, { color: theme.textColor }]}>
              {currentQuestion.question}
            </Text>

            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctIndex;
                const showResult = selectedAnswer !== null;

                let backgroundColor = theme.secondaryBackground;
                if (showResult) {
                  if (isCorrect) backgroundColor = '#69db7c40';
                  else if (isSelected) backgroundColor = '#ff6b6b40';
                }

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.optionButton, { backgroundColor }]}
                    onPress={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <Text style={[styles.optionText, { color: theme.textColor }]}>
                      {option}
                    </Text>
                    {showResult && isCorrect && (
                      <Text style={styles.correctIndicator}>✓</Text>
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <Text style={styles.incorrectIndicator}>✗</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
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
                setSelectedAnswer(null);
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
  topicLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  articleTitle: {
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
  quizContainer: {
    flex: 1,
    padding: 20,
  },
  quizProgress: {
    alignItems: 'center',
    marginBottom: 24,
  },
  quizProgressText: {
    fontSize: 14,
    opacity: 0.6,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  correctIndicator: {
    fontSize: 20,
    color: '#69db7c',
    fontWeight: 'bold',
  },
  incorrectIndicator: {
    fontSize: 20,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  resultsCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  resultLabel: {
    fontSize: 16,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  doneButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  retryButton: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});
