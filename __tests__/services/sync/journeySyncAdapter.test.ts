import { journeySyncAdapter, SyncableJourney } from '../../../src/services/sync/journeySyncAdapter';
import { useJourneyStore } from '../../../src/store/journeyStore';
import { supabase } from '../../../src/services/supabase';
import {
  JourneySession,
  StreakData,
  DEFAULT_CERT_PROGRESS,
  DEFAULT_STREAK,
} from '../../../src/types/journey';

// Mock supabase
jest.mock('../../../src/services/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn(),
  },
}));

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

const createMockSession = (overrides: Partial<JourneySession> = {}): JourneySession => ({
  id: `session_${Date.now()}_${Math.random()}`,
  wpm: 300,
  comprehension: 80,
  effectiveWpm: 240,
  articleId: 'article-1',
  articleType: 'curriculum',
  completedAt: Date.now(),
  vsAfter: 30,
  ...overrides,
});

const createDefaultCertProgress = () => ({
  speed_reader: { ...DEFAULT_CERT_PROGRESS },
  velocity_master: { ...DEFAULT_CERT_PROGRESS },
  transcendent: { ...DEFAULT_CERT_PROGRESS },
});

describe('journeySyncAdapter', () => {
  const mockUser = { id: 'test-user-id' };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store
    useJourneyStore.setState({
      _version: 1,
      velocityScore: 0,
      level: 'novice',
      sessions: [],
      avgWpmLast3: 0,
      avgWpmLast5: 0,
      avgCompLast5: 0,
      avgCompLast10: 0,
      bestWpmAt80: 0,
      userState: 'neutral',
      comfortBand: { floor: 250, median: 300, ceiling: 350 },
      streak: { ...DEFAULT_STREAK },
      baseline: null,
      speedProofs: [],
      certProgress: createDefaultCertProgress(),
      levelHistory: {},
    });
  });

  describe('toSyncItems', () => {
    it('should return empty array when no sessions', () => {
      const result = journeySyncAdapter.toSyncItems();
      expect(result).toEqual([]);
    });

    it('should return journey data when sessions exist', () => {
      const session = createMockSession({ id: 'session-1', completedAt: 2000 });
      useJourneyStore.setState({ sessions: [session] });

      const result = journeySyncAdapter.toSyncItems();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('journey_data');
      expect(result[0].updatedAt).toBe(2000);
      expect(result[0].sessions).toHaveLength(1);
    });

    it('should use latest session completedAt as updatedAt', () => {
      const session1 = createMockSession({ id: 'session-1', completedAt: 1000 });
      const session2 = createMockSession({ id: 'session-2', completedAt: 3000 });
      useJourneyStore.setState({ sessions: [session1, session2] });

      const result = journeySyncAdapter.toSyncItems();

      expect(result[0].updatedAt).toBe(3000);
    });
  });

  describe('fromSyncItems', () => {
    it('should do nothing when items empty', () => {
      const localSession = createMockSession({ id: 'local-1' });
      useJourneyStore.setState({ sessions: [localSession] });

      journeySyncAdapter.fromSyncItems([]);

      const { sessions } = useJourneyStore.getState();
      expect(sessions).toHaveLength(1);
    });

    it('should merge sessions from remote', () => {
      const localSession = createMockSession({ id: 'local-1', completedAt: 1000 });
      useJourneyStore.setState({ sessions: [localSession] });

      const remoteSession = createMockSession({ id: 'remote-1', completedAt: 2000 });
      const remoteJourney: SyncableJourney = {
        id: 'journey_data',
        updatedAt: 2000,
        _version: 1,
        sessions: [remoteSession],
        streak: DEFAULT_STREAK,
        baseline: null,
        speedProofs: [],
        certProgress: createDefaultCertProgress(),
        levelHistory: {},
      };

      journeySyncAdapter.fromSyncItems([remoteJourney]);

      const { sessions } = useJourneyStore.getState();
      expect(sessions).toHaveLength(2);
      expect(sessions.map(s => s.id)).toContain('local-1');
      expect(sessions.map(s => s.id)).toContain('remote-1');
    });

    it('should deduplicate sessions by id keeping newer', () => {
      const localSession = createMockSession({
        id: 'shared-id',
        completedAt: 1000,
        wpm: 200,
      });
      useJourneyStore.setState({ sessions: [localSession] });

      const remoteSession = createMockSession({
        id: 'shared-id',
        completedAt: 2000,
        wpm: 300,
      });
      const remoteJourney: SyncableJourney = {
        id: 'journey_data',
        updatedAt: 2000,
        _version: 1,
        sessions: [remoteSession],
        streak: DEFAULT_STREAK,
        baseline: null,
        speedProofs: [],
        certProgress: createDefaultCertProgress(),
        levelHistory: {},
      };

      journeySyncAdapter.fromSyncItems([remoteJourney]);

      const { sessions } = useJourneyStore.getState();
      expect(sessions).toHaveLength(1);
      expect(sessions[0].wpm).toBe(300); // Remote was newer
    });

    it('should merge certification progress preferring passed exams', () => {
      const localCertProgress = createDefaultCertProgress();
      localCertProgress.speed_reader = {
        ...localCertProgress.speed_reader,
        examPassed: false,
      };
      useJourneyStore.setState({
        sessions: [createMockSession()],
        certProgress: localCertProgress,
      });

      const remoteCertProgress = createDefaultCertProgress();
      remoteCertProgress.speed_reader = {
        ...remoteCertProgress.speed_reader,
        examPassed: true,
        earnedAt: 5000,
      };

      const remoteJourney: SyncableJourney = {
        id: 'journey_data',
        updatedAt: 2000,
        _version: 1,
        sessions: [],
        streak: DEFAULT_STREAK,
        baseline: null,
        speedProofs: [],
        certProgress: remoteCertProgress,
        levelHistory: {},
      };

      journeySyncAdapter.fromSyncItems([remoteJourney]);

      const { certProgress } = useJourneyStore.getState();
      // examPassed should be merged from remote
      expect(certProgress.speed_reader.examPassed).toBe(true);
      expect(certProgress.speed_reader.earnedAt).toBe(5000);
    });

    it('should merge streak keeping longer streak and more recent data', () => {
      const localStreak: StreakData = {
        currentDays: 5,
        longestDays: 10,
        lastCompletedDate: '2024-01-01',
        freezeAvailable: true,
        freezeUsedThisWeek: false,
        freezeLastReset: null,
      };
      useJourneyStore.setState({
        sessions: [createMockSession()],
        streak: localStreak,
      });

      const remoteStreak: StreakData = {
        currentDays: 7,
        longestDays: 15,
        lastCompletedDate: '2024-01-05', // More recent
        freezeAvailable: false,
        freezeUsedThisWeek: true,
        freezeLastReset: null,
      };

      const remoteJourney: SyncableJourney = {
        id: 'journey_data',
        updatedAt: 2000,
        _version: 1,
        sessions: [],
        streak: remoteStreak,
        baseline: null,
        speedProofs: [],
        certProgress: createDefaultCertProgress(),
        levelHistory: {},
      };

      journeySyncAdapter.fromSyncItems([remoteJourney]);

      const { streak } = useJourneyStore.getState();
      expect(streak.currentDays).toBe(7); // Remote was more recent
      expect(streak.longestDays).toBe(15); // Max of both
    });
  });

  describe('push', () => {
    it('should do nothing when items array is empty', async () => {
      await journeySyncAdapter.push([]);

      expect(mockSupabase.auth.getUser).not.toHaveBeenCalled();
    });

    it('should throw error when not authenticated', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: null },
      });

      const items: SyncableJourney[] = [
        {
          id: 'journey_data',
          updatedAt: 1000,
          _version: 1,
          sessions: [createMockSession()],
          streak: DEFAULT_STREAK,
          baseline: null,
          speedProofs: [],
          certProgress: createDefaultCertProgress(),
          levelHistory: {},
        },
      ];

      await expect(journeySyncAdapter.push(items)).rejects.toThrow('Not authenticated');
    });

    it('should upsert items to user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockUpsert = jest.fn().mockResolvedValue({ error: null });
      (mockSupabase.from as jest.Mock).mockReturnValue({
        upsert: mockUpsert,
      });

      const items: SyncableJourney[] = [
        {
          id: 'journey_data',
          updatedAt: 2000,
          _version: 1,
          sessions: [],
          streak: DEFAULT_STREAK,
          baseline: null,
          speedProofs: [],
          certProgress: createDefaultCertProgress(),
          levelHistory: {},
        },
      ];

      await journeySyncAdapter.push(items);

      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockUpsert).toHaveBeenCalledWith(
        [
          {
            user_id: 'test-user-id',
            item_id: 'journey_data',
            item_type: 'journey',
            data: items[0],
            updated_at: '1970-01-01T00:00:02.000Z',
          },
        ],
        { onConflict: 'user_id,item_id' }
      );
    });

    it('should throw error on database failure', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockUpsert = jest.fn().mockResolvedValue({
        error: { message: 'Database error' },
      });
      (mockSupabase.from as jest.Mock).mockReturnValue({
        upsert: mockUpsert,
      });

      const items: SyncableJourney[] = [
        {
          id: 'journey_data',
          updatedAt: 1000,
          _version: 1,
          sessions: [],
          streak: DEFAULT_STREAK,
          baseline: null,
          speedProofs: [],
          certProgress: createDefaultCertProgress(),
          levelHistory: {},
        },
      ];

      await expect(journeySyncAdapter.push(items)).rejects.toEqual({
        message: 'Database error',
      });
    });
  });

  describe('pull', () => {
    it('should throw error when not authenticated', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: null },
      });

      await expect(journeySyncAdapter.pull()).rejects.toThrow('Not authenticated');
    });

    it('should return empty array when no data', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockIs = jest.fn().mockResolvedValue({ data: [], error: null });
      const mockEq2 = jest.fn().mockReturnValue({ is: mockIs });
      const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
      const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
      (mockSupabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      const result = await journeySyncAdapter.pull();

      expect(result).toEqual([]);
    });

    it('should return items from user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockData: SyncableJourney = {
        id: 'journey_data',
        updatedAt: 2000,
        _version: 1,
        sessions: [createMockSession()],
        streak: DEFAULT_STREAK,
        baseline: null,
        speedProofs: [],
        certProgress: createDefaultCertProgress(),
        levelHistory: {},
      };

      const mockIs = jest.fn().mockResolvedValue({
        data: [{ data: mockData }],
        error: null,
      });
      const mockEq2 = jest.fn().mockReturnValue({ is: mockIs });
      const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
      const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
      (mockSupabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      const result = await journeySyncAdapter.pull();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('journey_data');
      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockSelect).toHaveBeenCalledWith('data');
      expect(mockEq1).toHaveBeenCalledWith('user_id', 'test-user-id');
      expect(mockEq2).toHaveBeenCalledWith('item_type', 'journey');
      expect(mockIs).toHaveBeenCalledWith('deleted_at', null);
    });

    it('should throw error on database failure', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockIs = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      });
      const mockEq2 = jest.fn().mockReturnValue({ is: mockIs });
      const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
      const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
      (mockSupabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      await expect(journeySyncAdapter.pull()).rejects.toEqual({
        message: 'Database error',
      });
    });
  });
});
