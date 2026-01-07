import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { findSentenceStarts, findPreviousSentenceStart, findNextSentenceStart } from '../services/textProcessor';
import { ProcessedWord, RSVPEngineControls } from '../types/playback';

/**
 * RSVP Engine Hook
 *
 * Manages word playback timing, controls, and state.
 * WPM timing formula: interval_ms = (60000 / wpm) * pause_multiplier
 */
export function useRSVPEngine(
  words: ProcessedWord[],
  initialWPM: number = 250
): RSVPEngineControls {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWPM] = useState(initialWPM);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sentenceStarts = useMemo(() => findSentenceStarts(words), [words]);

  const currentWord = words[currentIndex] ?? null;
  const totalWords = words.length;
  const progress = totalWords > 0 ? currentIndex / (totalWords - 1) : 0;

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Playback loop
  useEffect(() => {
    if (!isPlaying || !currentWord) {
      return;
    }

    const baseInterval = 60000 / wpm;
    const interval = baseInterval * currentWord.pauseMultiplier;

    timerRef.current = setTimeout(() => {
      if (currentIndex < totalWords - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Reached end
        setIsPlaying(false);
      }
    }, interval);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentIndex, wpm, currentWord, totalWords]);

  const play = useCallback(() => {
    if (currentIndex >= totalWords - 1 && totalWords > 0) {
      // Reset to start if at end
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  }, [currentIndex, totalWords]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const handleSetWPM = useCallback((newWPM: number) => {
    setWPM(Math.max(50, Math.min(1500, newWPM)));
  }, []);

  const rewindSentence = useCallback(() => {
    setIsPlaying(false); // Pause so user sees the change
    const prevStart = findPreviousSentenceStart(sentenceStarts, currentIndex);
    setCurrentIndex(prevStart);
  }, [sentenceStarts, currentIndex]);

  const skipSentence = useCallback(() => {
    setIsPlaying(false); // Pause so user sees the change
    const nextStart = findNextSentenceStart(sentenceStarts, currentIndex, totalWords);
    setCurrentIndex(nextStart);
  }, [sentenceStarts, currentIndex, totalWords]);

  const jumpToIndex = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(totalWords - 1, index)));
  }, [totalWords]);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
  }, []);

  return {
    currentIndex,
    currentWord,
    isPlaying,
    wpm,
    totalWords,
    progress,
    play,
    pause,
    toggle,
    setWPM: handleSetWPM,
    rewindSentence,
    skipSentence,
    jumpToIndex,
    reset,
  };
}
