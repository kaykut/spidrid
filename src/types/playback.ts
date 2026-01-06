export interface ProcessedWord {
  original: string;
  display: string;
  orpIndex: number;
  pauseMultiplier: number;
  sentenceEnd: boolean;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentIndex: number;
  wpm: number;
}

export interface RSVPEngineControls {
  currentIndex: number;
  currentWord: ProcessedWord | null;
  isPlaying: boolean;
  wpm: number;
  totalWords: number;
  progress: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setWPM: (wpm: number) => void;
  rewindSentence: () => void;
  skipSentence: () => void;
  jumpToIndex: (index: number) => void;
  reset: () => void;
}
