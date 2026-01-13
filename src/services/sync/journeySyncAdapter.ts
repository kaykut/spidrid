/**
 * Journey Store Sync Adapter
 *
 * Synchronizes journey data including:
 * - Session history
 * - Streak data
 * - Baseline stats
 * - Speed proofs
 * - Certification progress (M18 combined here)
 * - Level history
 *
 * This is synced as a single document per user since all the data
 * is interrelated and should be merged atomically.
 */

import { useJourneyStore } from '../../store/journeyStore';
import {
  JourneySession,
  StreakData,
  BaselineStats,
  SpeedProof,
  JourneyCertProgress,
  JourneyCertTier,
  VelocityLevel,
} from '../../types/journey';
import { supabase } from '../supabase';
import { SyncAdapter, SyncItem } from '../syncService';

const ITEM_TYPE = 'journey';
const JOURNEY_DOC_ID = 'journey_data';

/**
 * Syncable journey data structure
 */
export interface SyncableJourney extends SyncItem {
  id: string;
  updatedAt: number;
  _version: number;
  sessions: JourneySession[];
  streak: StreakData;
  baseline: BaselineStats | null;
  speedProofs: SpeedProof[];
  certProgress: Record<JourneyCertTier, JourneyCertProgress>;
  levelHistory: Partial<Record<VelocityLevel, number>>;
}

/**
 * Extract journey data from store as SyncableJourney
 */
function toSyncableJourney(): SyncableJourney | null {
  const state = useJourneyStore.getState();

  // Don't sync if no sessions yet
  if (state.sessions.length === 0) {
    return null;
  }

  // Get latest session timestamp as updatedAt
  const latestSession = state.sessions[state.sessions.length - 1];
  const updatedAt = latestSession?.completedAt || Date.now();

  return {
    id: JOURNEY_DOC_ID,
    updatedAt,
    _version: state._version,
    sessions: state.sessions,
    streak: state.streak,
    baseline: state.baseline,
    speedProofs: state.speedProofs,
    certProgress: state.certProgress,
    levelHistory: state.levelHistory,
  };
}

/**
 * Merge remote sessions with local sessions
 * Keeps unique sessions by id, preferring newer ones
 */
function mergeSessions(local: JourneySession[], remote: JourneySession[]): JourneySession[] {
  const sessionMap = new Map<string, JourneySession>();

  // Add all local sessions
  for (const session of local) {
    sessionMap.set(session.id, session);
  }

  // Merge remote sessions (only add if newer or doesn't exist)
  for (const session of remote) {
    const existing = sessionMap.get(session.id);
    if (!existing || session.completedAt > existing.completedAt) {
      sessionMap.set(session.id, session);
    }
  }

  // Sort by completedAt and keep last 100
  return Array.from(sessionMap.values())
    .sort((a, b) => a.completedAt - b.completedAt)
    .slice(-100);
}

/**
 * Merge speed proofs, keeping unique by achievedAt timestamp
 */
function mergeSpeedProofs(local: SpeedProof[], remote: SpeedProof[]): SpeedProof[] {
  const proofMap = new Map<number, SpeedProof>();

  for (const proof of [...local, ...remote]) {
    const key = proof.achievedAt;
    const existing = proofMap.get(key);
    // Keep the one with higher WPM if same timestamp
    if (!existing || proof.wpm > existing.wpm) {
      proofMap.set(key, proof);
    }
  }

  return Array.from(proofMap.values()).sort((a, b) => a.achievedAt - b.achievedAt);
}

/**
 * Merge certification progress - keep the most advanced progress
 */
function mergeCertProgress(
  local: Record<JourneyCertTier, JourneyCertProgress>,
  remote: Record<JourneyCertTier, JourneyCertProgress>
): Record<JourneyCertTier, JourneyCertProgress> {
  const tiers: JourneyCertTier[] = ['speed_reader', 'velocity_master', 'transcendent'];
  const merged = { ...local };

  for (const tier of tiers) {
    const localProgress = local[tier];
    const remoteProgress = remote[tier];

    // If either has passed the exam, mark as passed
    if (remoteProgress.examPassed && !localProgress.examPassed) {
      merged[tier] = {
        ...merged[tier],
        examPassed: true,
        earnedAt: remoteProgress.earnedAt,
      };
    }

    // Keep the most advanced unlock state
    merged[tier] = {
      ...merged[tier],
      vsUnlocked: localProgress.vsUnlocked || remoteProgress.vsUnlocked,
      speedProofAchieved: localProgress.speedProofAchieved || remoteProgress.speedProofAchieved,
      examUnlocked: localProgress.examUnlocked || remoteProgress.examUnlocked,
    };
  }

  return merged;
}

/**
 * Merge streak data - keep the better streak
 */
function mergeStreak(local: StreakData, remote: StreakData): StreakData {
  // Compare last completed dates
  const localDate = local.lastCompletedDate ? new Date(local.lastCompletedDate).getTime() : 0;
  const remoteDate = remote.lastCompletedDate ? new Date(remote.lastCompletedDate).getTime() : 0;

  // Use the more recent streak data
  if (remoteDate > localDate) {
    return {
      ...remote,
      longestDays: Math.max(local.longestDays, remote.longestDays),
    };
  }

  return {
    ...local,
    longestDays: Math.max(local.longestDays, remote.longestDays),
  };
}

export const journeySyncAdapter: SyncAdapter<SyncableJourney> = {
  /**
   * Extract journey data from store
   */
  toSyncItems: (): SyncableJourney[] => {
    const journey = toSyncableJourney();
    return journey ? [journey] : [];
  },

  /**
   * Write merged journey data back to store
   */
  fromSyncItems: (items: SyncableJourney[]): void => {
    const remoteJourney = items.find((i) => i.id === JOURNEY_DOC_ID);
    if (!remoteJourney) {return;}

    const localState = useJourneyStore.getState();

    // Merge sessions
    const mergedSessions = mergeSessions(localState.sessions, remoteJourney.sessions);

    // Merge speed proofs
    const mergedProofs = mergeSpeedProofs(localState.speedProofs, remoteJourney.speedProofs);

    // Merge certification progress
    const mergedCertProgress = mergeCertProgress(localState.certProgress, remoteJourney.certProgress);

    // Merge streak
    const mergedStreak = mergeStreak(localState.streak, remoteJourney.streak);

    // Use most recent baseline (by capturedAt)
    let baseline = localState.baseline;
    if (remoteJourney.baseline) {
      if (!baseline || remoteJourney.baseline.capturedAt > baseline.capturedAt) {
        baseline = remoteJourney.baseline;
      }
    }

    // Merge level history (keep earliest achievement)
    const levelHistory = { ...localState.levelHistory };
    for (const [level, timestamp] of Object.entries(remoteJourney.levelHistory)) {
      const existing = levelHistory[level as VelocityLevel];
      if (!existing || timestamp < existing) {
        levelHistory[level as VelocityLevel] = timestamp;
      }
    }

    // Update store
    useJourneyStore.setState({
      sessions: mergedSessions,
      speedProofs: mergedProofs,
      certProgress: mergedCertProgress,
      streak: mergedStreak,
      baseline,
      levelHistory,
    });

    // Recalculate derived values
    useJourneyStore.getState().recalculateAll();
  },

  /**
   * Push journey data to Supabase
   */
  push: async (items: SyncableJourney[]): Promise<void> => {
    if (items.length === 0) {return;}

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    const upserts = items.map((item) => ({
      user_id: user.id,
      item_id: item.id,
      item_type: ITEM_TYPE,
      data: item,
      updated_at: new Date(item.updatedAt).toISOString(),
    }));

    const { error } = await supabase
      .from('user_content')
      .upsert(upserts, { onConflict: 'user_id,item_id' });

    if (error) {
      throw error;
    }
  },

  /**
   * Pull journey data from Supabase
   */
  pull: async (): Promise<SyncableJourney[]> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('user_content')
      .select('data')
      .eq('user_id', user.id)
      .eq('item_type', ITEM_TYPE)
      .is('deleted_at', null);

    if (error) {
      throw error;
    }

    return (data || []).map((row) => row.data as SyncableJourney);
  },
};
