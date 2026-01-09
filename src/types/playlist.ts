// Playlist Types

/**
 * Source type for playlist items - determines which queue the item belongs to
 */
export type PlaylistSource = 'training' | 'reading' | 'learning';

/**
 * A single item in the playlist queue
 */
export interface PlaylistItem {
  id: string;                    // Unique playlist item ID (generated)
  contentId: string;             // Reference to Article.id or ImportedContent.id
  source: PlaylistSource;        // Which queue this belongs to
  title: string;                 // Cached for display
  wordCount: number;             // Cached for display
  addedAt: number;               // Timestamp when added

  // Playback state
  progress: number;              // 0-1, where in content we are
  lastPlayedAt?: number;         // Timestamp of last playback
}

/**
 * Current playback state
 */
export interface NowPlaying {
  item: PlaylistItem;
  startedAt: number;
}

/**
 * Resolved content ready for playback
 */
export interface ResolvedContent {
  title: string;
  content: string;
  wordCount: number;
  hasQuiz: boolean;
  questions?: import('./learning').Question[];
}
