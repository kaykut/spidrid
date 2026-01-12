export interface ProcessedWord {
  original: string;
  display: string;
  orpIndex: number;
  pauseMultiplier: number;
  sentenceEnd: boolean;
  // Phase 1: Paragraph pause
  paragraphEnd: boolean;
  // Phase 2: Chapter auto-pause
  chapterStart?: { title: string; index: number };
  // Phase 3: Header treatment
  isHeader?: boolean;
  headerText?: string; // Full header for snapshot display (≤3 words)
  // Long word splitting
  isContinuation?: boolean; // True for 2nd+ parts of a split word
  fullWord?: string; // Original word before splitting (for context)
}

export interface PlaybackState {
  isPlaying: boolean;
  currentIndex: number;
  wpm: number;
}

export interface ChapterPauseInfo {
  title: string;
  index: number;
}

export interface RSVPEngineControls {
  currentIndex: number;
  currentWord: ProcessedWord | null;
  isPlaying: boolean;
  wpm: number;
  totalWords: number;
  progress: number;
  chapterPaused: ChapterPauseInfo | null;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setWPM: (wpm: number) => void;
  rewindSentence: () => void;
  skipSentence: () => void;
  jumpToIndex: (index: number) => void;
  reset: () => void;
  resumeFromChapter: () => void;
}
