/**
 * Tests for RSVP Engine hook.
 *
 * This hook manages word playback timing, controls, and state.
 * Uses fake timers for deterministic testing of the playback loop.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useRSVPEngine } from '../../src/hooks/useRSVPEngine';
import { ProcessedWord } from '../../src/types/playback';
import { createMockWord } from '../helpers/testUtils';

// Create test words with known properties
function createTestWords(count: number): ProcessedWord[] {
  return Array.from({ length: count }, (_, i) =>
    createMockWord(`word${i}`, {
      pauseMultiplier: 1.0,
      sentenceEnd: false,
    })
  );
}

// Create test words with sentence boundaries
function createSentenceWords(): ProcessedWord[] {
  return [
    createMockWord('First', { pauseMultiplier: 1.0, sentenceEnd: false }),
    createMockWord('sentence.', { pauseMultiplier: 1.8, sentenceEnd: true }),
    createMockWord('Second', { pauseMultiplier: 1.0, sentenceEnd: false }),
    createMockWord('sentence.', { pauseMultiplier: 1.8, sentenceEnd: true }),
    createMockWord('Third', { pauseMultiplier: 1.0, sentenceEnd: false }),
    createMockWord('sentence.', { pauseMultiplier: 1.8, sentenceEnd: true }),
  ];
}

describe('useRSVPEngine', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('initialization', () => {
    it('starts with currentIndex at 0', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      expect(result.current.currentIndex).toBe(0);
    });

    it('starts with isPlaying as false', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      expect(result.current.isPlaying).toBe(false);
    });

    it('uses provided initial WPM', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 300));

      expect(result.current.wpm).toBe(300);
    });

    it('uses default WPM of 250 when not provided', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words));

      expect(result.current.wpm).toBe(250);
    });

    it('sets totalWords to words array length', () => {
      const words = createTestWords(10);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      expect(result.current.totalWords).toBe(10);
    });

    it('starts with progress at 0', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      expect(result.current.progress).toBe(0);
    });

    it('provides current word', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      expect(result.current.currentWord).toEqual(words[0]);
    });
  });

  describe('play()', () => {
    it('sets isPlaying to true', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
      });

      expect(result.current.isPlaying).toBe(true);
    });

    it('resets to index 0 if already at end', () => {
      const words = createTestWords(3);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      // Jump to end
      act(() => {
        result.current.jumpToIndex(2);
      });

      expect(result.current.currentIndex).toBe(2);

      // Play should reset to 0
      act(() => {
        result.current.play();
      });

      expect(result.current.currentIndex).toBe(0);
      expect(result.current.isPlaying).toBe(true);
    });

    it('does not reset index if not at end', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.jumpToIndex(2);
      });

      act(() => {
        result.current.play();
      });

      expect(result.current.currentIndex).toBe(2);
    });
  });

  describe('pause()', () => {
    it('sets isPlaying to false', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
      });

      expect(result.current.isPlaying).toBe(true);

      act(() => {
        result.current.pause();
      });

      expect(result.current.isPlaying).toBe(false);
    });
  });

  describe('toggle()', () => {
    it('toggles from paused to playing', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      expect(result.current.isPlaying).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isPlaying).toBe(true);
    });

    it('toggles from playing to paused', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
      });

      expect(result.current.isPlaying).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isPlaying).toBe(false);
    });
  });

  describe('playback loop', () => {
    it('advances currentIndex when playing', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
      });

      expect(result.current.currentIndex).toBe(0);

      // At 250 WPM, interval is 60000/250 = 240ms (with 1.0 multiplier)
      act(() => {
        jest.advanceTimersByTime(240);
      });

      expect(result.current.currentIndex).toBe(1);
    });

    it('uses correct interval based on WPM', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 500));

      act(() => {
        result.current.play();
      });

      // At 500 WPM, interval is 60000/500 = 120ms
      act(() => {
        jest.advanceTimersByTime(119);
      });

      expect(result.current.currentIndex).toBe(0);

      act(() => {
        jest.advanceTimersByTime(1);
      });

      expect(result.current.currentIndex).toBe(1);
    });

    it('applies pauseMultiplier to interval', () => {
      // Create a word with 1.8 pause multiplier (sentence end)
      const words = [
        createMockWord('hello.', { pauseMultiplier: 1.8, sentenceEnd: true }),
        createMockWord('world', { pauseMultiplier: 1.0, sentenceEnd: false }),
      ];
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
      });

      // At 250 WPM with 1.8 multiplier, interval is 240 * 1.8 = 432ms
      act(() => {
        jest.advanceTimersByTime(431);
      });

      expect(result.current.currentIndex).toBe(0);

      act(() => {
        jest.advanceTimersByTime(1);
      });

      expect(result.current.currentIndex).toBe(1);
    });

    it('stops at end of words', () => {
      const words = createTestWords(2);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
      });

      // Advance through both words
      act(() => {
        jest.advanceTimersByTime(240);
      });

      expect(result.current.currentIndex).toBe(1);
      expect(result.current.isPlaying).toBe(true);

      // Try to advance past end
      act(() => {
        jest.advanceTimersByTime(240);
      });

      expect(result.current.currentIndex).toBe(1); // Stays at last word
      expect(result.current.isPlaying).toBe(false); // Stopped
    });

    it('updates progress during playback', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      expect(result.current.progress).toBe(0);

      act(() => {
        result.current.play();
      });

      act(() => {
        jest.advanceTimersByTime(240);
      });

      // At index 1 of 5 words: 1/(5-1) = 0.25
      expect(result.current.progress).toBe(0.25);

      act(() => {
        jest.advanceTimersByTime(240);
      });

      // At index 2: 2/4 = 0.5
      expect(result.current.progress).toBe(0.5);
    });
  });

  describe('setWPM()', () => {
    it('updates wpm value', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.setWPM(300);
      });

      expect(result.current.wpm).toBe(300);
    });

    it('clamps to minimum of 50', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.setWPM(30);
      });

      expect(result.current.wpm).toBe(50);
    });

    it('clamps to maximum of 1500', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.setWPM(2000);
      });

      expect(result.current.wpm).toBe(1500);
    });

    it('accepts exactly 50', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.setWPM(50);
      });

      expect(result.current.wpm).toBe(50);
    });

    it('accepts exactly 1500', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.setWPM(1500);
      });

      expect(result.current.wpm).toBe(1500);
    });
  });

  describe('rewindSentence()', () => {
    it('jumps to previous sentence start', () => {
      const words = createSentenceWords();
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      // Go to middle of second sentence
      act(() => {
        result.current.jumpToIndex(3);
      });

      expect(result.current.currentIndex).toBe(3);

      act(() => {
        result.current.rewindSentence();
      });

      expect(result.current.currentIndex).toBe(2); // Start of second sentence
    });

    it('pauses playback when rewinding', () => {
      const words = createSentenceWords();
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
        result.current.jumpToIndex(3);
      });

      expect(result.current.isPlaying).toBe(true);

      act(() => {
        result.current.rewindSentence();
      });

      expect(result.current.isPlaying).toBe(false);
    });

    it('stays at 0 when at first sentence', () => {
      const words = createSentenceWords();
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      expect(result.current.currentIndex).toBe(0);

      act(() => {
        result.current.rewindSentence();
      });

      expect(result.current.currentIndex).toBe(0);
    });

    it('goes to start of current sentence when mid-sentence', () => {
      const words = createSentenceWords();
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      // Go to second word of first sentence
      act(() => {
        result.current.jumpToIndex(1);
      });

      act(() => {
        result.current.rewindSentence();
      });

      expect(result.current.currentIndex).toBe(0);
    });
  });

  describe('skipSentence()', () => {
    it('jumps to next sentence start', () => {
      const words = createSentenceWords();
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      expect(result.current.currentIndex).toBe(0);

      act(() => {
        result.current.skipSentence();
      });

      expect(result.current.currentIndex).toBe(2); // Start of second sentence
    });

    it('pauses playback when skipping', () => {
      const words = createSentenceWords();
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
      });

      expect(result.current.isPlaying).toBe(true);

      act(() => {
        result.current.skipSentence();
      });

      expect(result.current.isPlaying).toBe(false);
    });

    it('goes to end when at last sentence', () => {
      const words = createSentenceWords();
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      // Go to last sentence
      act(() => {
        result.current.jumpToIndex(4);
      });

      act(() => {
        result.current.skipSentence();
      });

      expect(result.current.currentIndex).toBe(5); // End of words
    });
  });

  describe('jumpToIndex()', () => {
    it('sets currentIndex to specified value', () => {
      const words = createTestWords(10);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.jumpToIndex(5);
      });

      expect(result.current.currentIndex).toBe(5);
    });

    it('clamps to minimum of 0', () => {
      const words = createTestWords(10);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.jumpToIndex(-5);
      });

      expect(result.current.currentIndex).toBe(0);
    });

    it('clamps to maximum of totalWords - 1', () => {
      const words = createTestWords(10);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.jumpToIndex(100);
      });

      expect(result.current.currentIndex).toBe(9);
    });

    it('updates currentWord when jumping', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.jumpToIndex(3);
      });

      expect(result.current.currentWord).toEqual(words[3]);
    });
  });

  describe('reset()', () => {
    it('sets currentIndex to 0', () => {
      const words = createTestWords(10);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.jumpToIndex(5);
      });

      expect(result.current.currentIndex).toBe(5);

      act(() => {
        result.current.reset();
      });

      expect(result.current.currentIndex).toBe(0);
    });

    it('sets isPlaying to false', () => {
      const words = createTestWords(10);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
      });

      expect(result.current.isPlaying).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.isPlaying).toBe(false);
    });
  });

  describe('timer cleanup', () => {
    it('clears timer on unmount', () => {
      const words = createTestWords(10);
      const { result, unmount } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
      });

      // Unmount should clear timers
      unmount();

      // No error should be thrown when advancing timers after unmount
      expect(() => {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }).not.toThrow();
    });

    it('clears timer when paused', () => {
      const words = createTestWords(10);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      act(() => {
        result.current.play();
      });

      act(() => {
        result.current.pause();
      });

      const currentIndex = result.current.currentIndex;

      // Timer should be cleared, so advancing time shouldn't change index
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.currentIndex).toBe(currentIndex);
    });
  });

  describe('edge cases', () => {
    it('handles empty words array', () => {
      const { result } = renderHook(() => useRSVPEngine([], 250));

      expect(result.current.currentWord).toBeNull();
      expect(result.current.totalWords).toBe(0);
      expect(result.current.progress).toBe(0);
    });

    it('handles single word', () => {
      const words = createTestWords(1);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      expect(result.current.currentWord).toEqual(words[0]);
      expect(result.current.totalWords).toBe(1);
      // Note: progress for single word is 0/(1-1) = NaN
      // This is a known edge case in the implementation
      expect(result.current.progress).toBeNaN();

      // Playing should immediately stop since already at end
      act(() => {
        result.current.play();
      });

      // Reset happens, then starts at 0
      expect(result.current.currentIndex).toBe(0);
    });

    it('handles words array change', () => {
      const initialWords = createTestWords(5);
      const { result, rerender } = renderHook(
        ({ words }: { words: ProcessedWord[] }) => useRSVPEngine(words, 250),
        { initialProps: { words: initialWords } }
      );

      act(() => {
        result.current.jumpToIndex(3);
      });

      expect(result.current.currentIndex).toBe(3);

      // Rerender with new words
      const newWords = createTestWords(10);
      rerender({ words: newWords });

      // Should update totalWords
      expect(result.current.totalWords).toBe(10);
    });
  });

  describe('progress calculation', () => {
    it('calculates progress as currentIndex / (totalWords - 1)', () => {
      const words = createTestWords(5);
      const { result } = renderHook(() => useRSVPEngine(words, 250));

      // At index 0: 0/(5-1) = 0
      expect(result.current.progress).toBe(0);

      act(() => {
        result.current.jumpToIndex(2);
      });

      // At index 2: 2/4 = 0.5
      expect(result.current.progress).toBe(0.5);

      act(() => {
        result.current.jumpToIndex(4);
      });

      // At index 4: 4/4 = 1
      expect(result.current.progress).toBe(1);
    });

    it('returns 0 progress for empty words', () => {
      const { result } = renderHook(() => useRSVPEngine([], 250));

      expect(result.current.progress).toBe(0);
    });
  });
});
