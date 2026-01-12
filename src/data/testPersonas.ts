/**
 * Test Personas Module
 *
 * Provides pre-defined user personas for testing the app at different progress levels.
 * Each persona includes realistic session history, certification progress, and stats.
 *
 * Usage: Import applyPersona() and call with persona ID to set all stores.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { extractFromUrl, extractFromEbook } from '../services/contentExtractor';
import { useContentStore } from '../store/contentStore';
import { useCurriculumStore } from '../store/curriculumStore';
import { useGeneratedStore } from '../store/generatedStore';
import { useJourneyStore } from '../store/journeyStore';
import { useLearningStore } from '../store/learningStore';
import { useSettingsStore } from '../store/settingsStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import type { ImportedContent } from '../types/content';
import type {
  JourneySession,
  SpeedProof,
  JourneyCertTier,
  JourneyCertProgress,
  StreakData,
  BaselineStats,
  ArticleType,
} from '../types/journey';
import type { ArticleProgress, ArticleAttempt } from '../types/learning';
import { calculateEffectiveWpm } from '../utils/journeyCalculations';
import { ARTICLES } from './curriculum';

// =============================================================================
// Types
// =============================================================================

/**
 * Test content item specification for generating imported content
 */
export interface TestContentSpec {
  title: string;
  source: 'url' | 'epub' | 'pdf';
  sourceUrl?: string;
  fileName?: string;
  wordCount: number;
  readProgress: number; // 0-1
  author?: string;
  siteName?: string;
  excerpt?: string;
  /** Days ago this was added (for realistic timestamps) */
  daysAgo: number;
}

export interface TestPersona {
  id: string;
  name: string;
  description: string;
  targetWpm: number;
  targetComprehension: number;
  sessionCount: number;
  certProgress: Record<JourneyCertTier, JourneyCertProgress>;
  speedProofSpecs: Array<{ wpm: number; comprehension: number }>;
  streakDays: number;
  isPremium: boolean;
  /** Test content items to add to contentStore */
  testContent?: TestContentSpec[];
}

// =============================================================================
// Persona Definitions
// =============================================================================

const DEFAULT_CERT_PROGRESS: JourneyCertProgress = {
  vsUnlocked: false,
  speedProofAchieved: false,
  examUnlocked: false,
  examPassed: false,
};

/**
 * Test content items for populating contentStore
 * Mix of URLs, PDFs, and EPUBs at different read progress states
 */
const TEST_CONTENT: TestContentSpec[] = [
  // URL articles
  {
    title: 'Why The Culture Wins: An Appreciation of Iain M. Banks',
    source: 'url',
    sourceUrl: 'https://www.sciphijournal.org/index.php/2017/11/12/why-the-culture-wins-an-appreciation-of-iain-m-banks/',
    wordCount: 3200,
    readProgress: 0.65,
    author: 'Sci Phi Journal',
    siteName: 'Sci Phi Journal',
    excerpt: 'An exploration of the philosophical themes in Banks\' Culture novels',
    daysAgo: 2,
  },
  {
    title: 'What Fields Are Undervalued',
    source: 'url',
    sourceUrl: 'https://paulgraham.com/field.html',
    wordCount: 1850,
    readProgress: 0,
    author: 'Paul Graham',
    siteName: 'paulgraham.com',
    excerpt: 'Some fields are overvalued and some undervalued',
    daysAgo: 5,
  },
  {
    title: 'Woke',
    source: 'url',
    sourceUrl: 'https://paulgraham.com/woke.html',
    wordCount: 2100,
    readProgress: 1,
    author: 'Paul Graham',
    siteName: 'paulgraham.com',
    excerpt: 'What does woke mean and where did it come from?',
    daysAgo: 10,
  },
  // PDF documents (articles - short)
  {
    title: 'App Discovery System Technical Guide',
    source: 'pdf',
    fileName: 'App Discovery System Technical Guide.pdf',
    wordCount: 4500,
    readProgress: 0.3,
    daysAgo: 3,
  },
  {
    title: 'Apptronik BYOGP Closing Documents',
    source: 'pdf',
    fileName: 'Apptronik BYOGP Closing Documents.pdf',
    wordCount: 2800,
    readProgress: 0,
    daysAgo: 7,
  },
  // EPUB books (long content - classified as books)
  {
    title: 'The Time Machine',
    source: 'epub',
    fileName: 'pg77673-images-3.epub',
    wordCount: 35000,
    readProgress: 0.15,
    author: 'H.G. Wells',
    daysAgo: 1,
  },
  {
    title: 'A Tale of Two Cities',
    source: 'epub',
    fileName: 'pg77668-images.epub',
    wordCount: 135000,
    readProgress: 0,
    author: 'Charles Dickens',
    daysAgo: 4,
  },
  {
    title: 'The War of the Worlds',
    source: 'epub',
    fileName: 'pg77675-images-3.epub',
    wordCount: 62000,
    readProgress: 1,
    author: 'H.G. Wells',
    daysAgo: 14,
  },
];

export const TEST_PERSONAS: TestPersona[] = [
  // At-Milestone Personas
  {
    id: 'pace-newcomer',
    name: 'Pace Newcomer',
    description: 'Just hit the Pace milestone (300 WPM)',
    targetWpm: 300,
    targetComprehension: 82,
    sessionCount: 25,
    certProgress: {
      speed_reader: { ...DEFAULT_CERT_PROGRESS },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    speedProofSpecs: [],
    streakDays: 5,
    isPremium: true,
    testContent: TEST_CONTENT, // All test content types
  },
  {
    id: 'speed-reader-fresh',
    name: 'Fresh Speed Reader',
    description: 'Just earned Speed Reader certification (600 WPM)',
    targetWpm: 600,
    targetComprehension: 84,
    sessionCount: 35,
    certProgress: {
      speed_reader: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 2, // 2 days ago
      },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    speedProofSpecs: [{ wpm: 620, comprehension: 82 }],
    streakDays: 12,
    isPremium: true,
    testContent: TEST_CONTENT,
  },
  {
    id: 'velocity-master-pro',
    name: 'Velocity Master Pro',
    description: 'Has Speed Reader + Velocity Master (1200 WPM)',
    targetWpm: 1200,
    targetComprehension: 82,
    sessionCount: 45,
    certProgress: {
      speed_reader: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 30, // 30 days ago
      },
      velocity_master: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 7, // 7 days ago
      },
      transcendent: {
        vsUnlocked: false,
        speedProofAchieved: false,
        examUnlocked: false,
        examPassed: false,
      },
    },
    speedProofSpecs: [
      { wpm: 650, comprehension: 80 },
      { wpm: 950, comprehension: 78 },
    ],
    streakDays: 21,
    isPremium: true,
    testContent: TEST_CONTENT,
  },

  // Mid-Journey Personas
  {
    id: 'mid-quick-seeker',
    name: 'Quick Seeker',
    description: 'Between Pace and Quick milestones (375 WPM)',
    targetWpm: 375,
    targetComprehension: 78,
    sessionCount: 22,
    certProgress: {
      speed_reader: { ...DEFAULT_CERT_PROGRESS },
      velocity_master: { ...DEFAULT_CERT_PROGRESS },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    speedProofSpecs: [],
    streakDays: 3,
    isPremium: true,
    testContent: TEST_CONTENT,
  },
  {
    id: 'mid-velocity-bound',
    name: 'Velocity Bound',
    description: 'Has Speed Reader, working toward Velocity Master (750 WPM)',
    targetWpm: 750,
    targetComprehension: 82,
    sessionCount: 38,
    certProgress: {
      speed_reader: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 14, // 14 days ago
      },
      velocity_master: {
        vsUnlocked: true,
        speedProofAchieved: false,
        examUnlocked: false,
        examPassed: false,
      },
      transcendent: { ...DEFAULT_CERT_PROGRESS },
    },
    speedProofSpecs: [{ wpm: 630, comprehension: 80 }],
    streakDays: 8,
    isPremium: true,
    testContent: TEST_CONTENT,
  },
  {
    id: 'mid-transcendent-path',
    name: 'Transcendent Path',
    description: 'Has SR + VM, working toward Transcendent (1050 WPM)',
    targetWpm: 1050,
    targetComprehension: 80,
    sessionCount: 42,
    certProgress: {
      speed_reader: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 45, // 45 days ago
      },
      velocity_master: {
        vsUnlocked: true,
        speedProofAchieved: true,
        examUnlocked: true,
        examPassed: true,
        earnedAt: Date.now() - 86400000 * 10, // 10 days ago
      },
      transcendent: {
        vsUnlocked: false,
        speedProofAchieved: false,
        examUnlocked: false,
        examPassed: false,
      },
    },
    speedProofSpecs: [
      { wpm: 620, comprehension: 82 },
      { wpm: 920, comprehension: 76 },
    ],
    streakDays: 15,
    isPremium: true,
    testContent: TEST_CONTENT,
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get practice article IDs for session generation
 */
function getPracticeArticleIds(): string[] {
  return ARTICLES
    .filter((a) => a.articleType === 'practice' || !a.articleType)
    .map((a) => a.id);
}

/**
 * Generate a random number within a range
 */
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp a number between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get today's date string in YYYY-MM-DD format
 */
function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get the last Monday's date string
 */
function getLastMondayDateString(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysToSubtract);
  return lastMonday.toISOString().split('T')[0];
}

// =============================================================================
// Session & Data Generators
// =============================================================================

/**
 * Generate realistic session history for a persona
 */
export function generatePersonaSessions(persona: TestPersona): JourneySession[] {
  const sessions: JourneySession[] = [];
  const articleIds = getPracticeArticleIds();
  const now = Date.now();

  // Work backwards from 1 hour ago
  let timestamp = now - 3600000;

  for (let i = 0; i < persona.sessionCount; i++) {
    // Go back 4-48 hours between sessions
    const hoursBack = randomInRange(4, 48);
    timestamp -= hoursBack * 3600000;

    // Generate WPM with variance
    const wpm = clamp(
      persona.targetWpm + randomInRange(-50, 50),
      100,
      1500
    );

    // Generate comprehension with variance
    const comprehension = clamp(
      persona.targetComprehension + randomInRange(-10, 10),
      70,
      95
    );

    const effectiveWpm = calculateEffectiveWpm(wpm, comprehension);

    // Cycle through article IDs
    const articleId = articleIds[i % articleIds.length];

    sessions.push({
      id: generateSessionId(),
      wpm,
      comprehension,
      effectiveWpm,
      articleId,
      articleType: 'curriculum' as ArticleType,
      completedAt: timestamp,
      vsAfter: 0, // Will be recalculated
    });
  }

  // Return in chronological order (oldest first)
  return sessions.reverse();
}

/**
 * Generate speed proofs from specifications
 */
export function generateSpeedProofs(
  specs: Array<{ wpm: number; comprehension: number }>
): SpeedProof[] {
  const now = Date.now();

  return specs.map((spec, index) => ({
    wpm: spec.wpm,
    comprehension: spec.comprehension,
    achievedAt: now - 86400000 * (specs.length - index) * 7, // Spaced 1 week apart
  }));
}

/**
 * Generate baseline stats from first 3 sessions
 */
export function generateBaseline(sessions: JourneySession[]): BaselineStats | null {
  if (sessions.length < 3) {
    return null;
  }

  const first3 = sessions.slice(0, 3);
  const avgWpm = Math.round(
    first3.reduce((sum, s) => sum + s.wpm, 0) / 3
  );
  const avgComprehension = Math.round(
    first3.reduce((sum, s) => sum + s.comprehension, 0) / 3
  );

  return {
    avgWpm,
    avgComprehension,
    capturedAt: first3[2].completedAt,
    sessionCount: 3,
  };
}

/**
 * Generate streak data for a persona
 */
export function generateStreak(streakDays: number): StreakData {
  return {
    currentDays: streakDays,
    longestDays: Math.max(streakDays, streakDays + randomInRange(0, 5)),
    lastCompletedDate: getTodayDateString(),
    freezeAvailable: true,
    freezeUsedThisWeek: false,
    freezeLastReset: getLastMondayDateString(),
  };
}

/**
 * Generate article progress from sessions for learningStore
 */
export function generateArticleProgress(
  sessions: JourneySession[]
): Record<string, ArticleProgress> {
  const progress: Record<string, ArticleProgress> = {};

  sessions.forEach((session) => {
    const existing = progress[session.articleId];

    const attempt: ArticleAttempt = {
      timestamp: session.completedAt,
      score: session.comprehension,
      wpm: session.wpm,
      isCertificationAttempt: false,
    };

    if (existing) {
      existing.comprehensionScore = Math.max(existing.comprehensionScore, session.comprehension);
      existing.highestWPM = Math.max(existing.highestWPM, session.wpm);
      existing.lastReadAt = session.completedAt;
      existing.attemptCount = (existing.attemptCount || 0) + 1;
      existing.attempts = [...(existing.attempts || []), attempt];
    } else {
      progress[session.articleId] = {
        articleId: session.articleId,
        completed: session.comprehension >= 70,
        comprehensionScore: session.comprehension,
        highestWPM: session.wpm,
        lastReadAt: session.completedAt,
        attemptCount: 1,
        attempts: [attempt],
      };
    }
  });

  return progress;
}

/**
 * Generate imported content from test content specs
 * Fetches real content from URLs, uses placeholder for local files
 */
export async function generateImportedContent(
  specs: TestContentSpec[]
): Promise<ImportedContent[]> {
  const now = Date.now();
  const DAY_MS = 86400000;

  const results: ImportedContent[] = [];

  for (let index = 0; index < specs.length; index++) {
    const spec = specs[index];
    const createdAt = now - spec.daysAgo * DAY_MS;
    const lastReadAt = spec.readProgress > 0 ? now - randomInRange(1, spec.daysAgo) * DAY_MS : undefined;

    let content = `[Placeholder content for ${spec.title}]`;
    let wordCount = spec.wordCount;
    let title = spec.title;
    let author = spec.author;
    let excerpt = spec.excerpt;
    let siteName = spec.siteName;

    // For URLs, actually fetch the content
    if (spec.source === 'url' && spec.sourceUrl) {
      try {
        const result = await extractFromUrl(spec.sourceUrl);
        if (result.success && result.content) {
          content = result.content.content;
          wordCount = result.content.wordCount;
          title = result.content.title || spec.title;
          author = result.content.author || spec.author;
          excerpt = result.content.excerpt || spec.excerpt;
          siteName = result.content.siteName || spec.siteName;
        }
      } catch (error) {
        console.warn(`Failed to fetch URL content for ${spec.title}:`, error);
      }
    }

    results.push({
      id: `test_content_${index}_${Math.random().toString(36).substring(2, 9)}`,
      title,
      content,
      wordCount,
      source: spec.source,
      sourceUrl: spec.sourceUrl,
      fileName: spec.fileName,
      createdAt,
      lastReadAt,
      readProgress: spec.readProgress,
      author,
      excerpt,
      siteName,
    });
  }

  return results;
}

/**
 * Load a local test file (PDF/EPUB) and add it to the content store
 * Call this with a file URI from document picker
 */
export async function loadTestFile(
  fileUri: string,
  fileName: string,
  readProgress: number = 0
): Promise<ImportedContent | null> {
  try {
    const result = await extractFromEbook(fileUri, fileName);
    if (result.success && result.content) {
      const now = Date.now();
      const content: ImportedContent = {
        id: `test_file_${Math.random().toString(36).substring(2, 9)}`,
        title: result.content.title,
        content: result.content.content,
        wordCount: result.content.wordCount,
        source: result.content.source,
        fileName,
        createdAt: now,
        readProgress,
      };

      // Add to content store
      const contentStore = useContentStore.getState();
      const existingContent = contentStore.importedContent;
      contentStore.hydrateForTesting({
        importedContent: [...existingContent, content],
      });

      return content;
    }
    return null;
  } catch (error) {
    console.error(`Failed to load test file ${fileName}:`, error);
    return null;
  }
}

/**
 * Generate recent completions array for learningStore
 */
export function generateRecentCompletions(
  sessions: JourneySession[]
): Array<{
  articleId: string;
  wpm: number;
  score: number;
  timestamp: number;
  isCertificationText: boolean;
}> {
  // Get last 20 sessions
  return sessions.slice(-20).map((session) => ({
    articleId: session.articleId,
    wpm: session.wpm,
    score: session.comprehension,
    timestamp: session.completedAt,
    isCertificationText: false,
  }));
}

// =============================================================================
// Main Functions
// =============================================================================

/**
 * Apply a test persona to all stores
 */
export async function applyPersona(personaId: string): Promise<boolean> {
  const persona = TEST_PERSONAS.find((p) => p.id === personaId);
  if (!persona) {
    console.error(`Persona not found: ${personaId}`);
    return false;
  }

  // Generate data
  const sessions = generatePersonaSessions(persona);
  const speedProofs = generateSpeedProofs(persona.speedProofSpecs);
  const baseline = generateBaseline(sessions);
  const streak = generateStreak(persona.streakDays);
  const articleProgress = generateArticleProgress(sessions);
  const recentCompletions = generateRecentCompletions(sessions);

  // Apply to journeyStore
  const journeyStore = useJourneyStore.getState();
  journeyStore.hydrateForTesting({
    sessions,
    speedProofs,
    certProgress: persona.certProgress,
    streak,
    baseline,
  });

  // Apply to learningStore
  const learningStore = useLearningStore.getState();
  learningStore.hydrateForTesting({
    articleProgress,
    currentWPM: persona.targetWpm,
    recentCompletions,
  });

  // Apply to subscriptionStore
  const subscriptionStore = useSubscriptionStore.getState();
  subscriptionStore.hydrateForTesting({
    isPremium: persona.isPremium,
    contentAccessCount: 0,
  });

  // Apply to settingsStore
  const settingsStore = useSettingsStore.getState();
  settingsStore.hydrateForTesting({
    defaultWPM: persona.targetWpm,
    userName: persona.name,
  });

  // Apply test content to contentStore (if persona has test content)
  if (persona.testContent && persona.testContent.length > 0) {
    const importedContent = await generateImportedContent(persona.testContent);
    const contentStore = useContentStore.getState();
    contentStore.hydrateForTesting({ importedContent });
  }

  return true;
}

/**
 * Reset all stores to clean slate (new user state)
 */
export async function resetToCleanSlate(): Promise<void> {
  // Nuclear option: clear ALL AsyncStorage
  await AsyncStorage.clear();

  // Reset journeyStore
  useJourneyStore.getState().resetJourneyData();

  // Reset learningStore
  useLearningStore.getState().resetProgress();

  // Reset subscriptionStore to free tier
  useSubscriptionStore.getState().hydrateForTesting({
    isPremium: false,
    contentAccessCount: 0,
  });

  // Reset settingsStore to defaults
  useSettingsStore.getState().resetSettings();

  // Reset content stores
  useContentStore.getState().clearAllContent();
  useGeneratedStore.getState().clearAllArticles();
  useCurriculumStore.getState().clearAllCurricula();
}

/**
 * Get persona by ID
 */
export function getPersonaById(personaId: string): TestPersona | undefined {
  return TEST_PERSONAS.find((p) => p.id === personaId);
}

/**
 * Get the count of earned certifications for a persona
 */
export function getPersonaCertCount(persona: TestPersona): number {
  return Object.values(persona.certProgress).filter((p) => p.examPassed).length;
}
