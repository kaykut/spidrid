import { learningSyncAdapter, SyncableLearningProgress } from '../../../src/services/sync/learningSyncAdapter';
import { useLearningStore } from '../../../src/store/learningStore';
import { supabase } from '../../../src/services/supabase';
import { ArticleProgress } from '../../../src/types/learning';
import * as syncAccess from '../../../src/services/sync/syncAccess';

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
const mockSyncAccess = syncAccess as jest.Mocked<typeof syncAccess>;

const createMockProgress = (overrides: Partial<ArticleProgress> = {}): ArticleProgress => ({
  articleId: 'article-1',
  completed: true,
  comprehensionScore: 85,
  highestWPM: 350,
  lastReadAt: 2000,
  attemptCount: 2,
  attempts: [
    { timestamp: 1000, score: 70, wpm: 300, isCertificationAttempt: false },
    { timestamp: 2000, score: 85, wpm: 350, isCertificationAttempt: false },
  ],
  ...overrides,
});

describe('learningSyncAdapter', () => {
  const mockUser = { id: 'test-user-id' };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store
    useLearningStore.setState({
      articleProgress: {},
      currentArticleId: null,
      currentWPM: 250,
      recentCompletions: [],
    });
  });

  describe('toSyncItems', () => {
    it('should return empty array when store is empty', () => {
      const result = learningSyncAdapter.toSyncItems();
      expect(result).toEqual([]);
    });

    it('should convert ArticleProgress to SyncableLearningProgress', () => {
      const progress = createMockProgress();
      useLearningStore.setState({
        articleProgress: { [progress.articleId]: progress },
      });

      const result = learningSyncAdapter.toSyncItems();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('article-1');
      expect(result[0].updatedAt).toBe(2000); // Uses lastReadAt
      expect(result[0].articleId).toBe('article-1');
    });

    it('should include multiple progress records', () => {
      const progress1 = createMockProgress({ articleId: 'article-1', lastReadAt: 1000 });
      const progress2 = createMockProgress({ articleId: 'article-2', lastReadAt: 2000 });

      useLearningStore.setState({
        articleProgress: {
          [progress1.articleId]: progress1,
          [progress2.articleId]: progress2,
        },
      });

      const result = learningSyncAdapter.toSyncItems();

      expect(result).toHaveLength(2);
    });
  });

  describe('fromSyncItems', () => {
    it('should write items to store', () => {
      const items: SyncableLearningProgress[] = [
        { ...createMockProgress({ articleId: 'article-1' }), id: 'article-1', updatedAt: 1000 },
        { ...createMockProgress({ articleId: 'article-2' }), id: 'article-2', updatedAt: 2000 },
      ];

      learningSyncAdapter.fromSyncItems(items);

      const { articleProgress } = useLearningStore.getState();
      expect(Object.keys(articleProgress)).toHaveLength(2);
      expect(articleProgress['article-1']).toBeDefined();
      expect(articleProgress['article-2']).toBeDefined();
    });

    it('should strip id and updatedAt from items', () => {
      const items: SyncableLearningProgress[] = [
        { ...createMockProgress({ articleId: 'article-1' }), id: 'article-1', updatedAt: 2000 },
      ];

      learningSyncAdapter.fromSyncItems(items);

      const { articleProgress } = useLearningStore.getState();
      const progress = articleProgress['article-1'] as unknown as SyncableLearningProgress;
      expect(progress.id).toBeUndefined();
      expect(progress.updatedAt).toBeUndefined();
    });

    it('should preserve other store state', () => {
      useLearningStore.setState({
        currentWPM: 400,
        recentCompletions: [
          { articleId: 'old', wpm: 300, score: 80, timestamp: 1000, isCertificationText: false },
        ],
      });

      const items: SyncableLearningProgress[] = [
        { ...createMockProgress(), id: 'article-1', updatedAt: 1000 },
      ];

      learningSyncAdapter.fromSyncItems(items);

      const state = useLearningStore.getState();
      expect(state.currentWPM).toBe(400);
      expect(state.recentCompletions).toHaveLength(1);
    });
  });

  describe('push', () => {
    it('should do nothing when items array is empty', async () => {
      await learningSyncAdapter.push([]);

      expect(mockSupabase.auth.getUser).not.toHaveBeenCalled();
    });

    it('should throw error when not eligible for sync', async () => {
      // Mock syncAccess to throw (not authenticated or not premium)
      mockSyncAccess.requireSyncEligibility.mockImplementationOnce(() => {
        throw new Error('Authentication and premium subscription required');
      });

      const items: SyncableLearningProgress[] = [
        { ...createMockProgress(), id: 'article-1', updatedAt: 1000 },
      ];

      await expect(learningSyncAdapter.push(items)).rejects.toThrow('Authentication and premium subscription required');
    });

    it('should upsert items to user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockUpsert = jest.fn().mockResolvedValue({ error: null });
      (mockSupabase.from as jest.Mock).mockReturnValue({
        upsert: mockUpsert,
      });

      const items: SyncableLearningProgress[] = [
        { ...createMockProgress({ articleId: 'article-1' }), id: 'article-1', updatedAt: 2000 },
      ];

      await learningSyncAdapter.push(items);

      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockUpsert).toHaveBeenCalledWith(
        [
          {
            user_id: 'test-user-id',
            item_id: 'article-1',
            item_type: 'learning_progress',
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

      const items: SyncableLearningProgress[] = [
        { ...createMockProgress(), id: 'article-1', updatedAt: 1000 },
      ];

      await expect(learningSyncAdapter.push(items)).rejects.toEqual({
        message: 'Database error',
      });
    });
  });

  describe('pull', () => {
    it('should throw error when not eligible for sync', async () => {
      // Mock syncAccess to throw (not authenticated or not premium)
      mockSyncAccess.requireSyncEligibility.mockImplementationOnce(() => {
        throw new Error('Authentication and premium subscription required');
      });

      await expect(learningSyncAdapter.pull()).rejects.toThrow('Authentication and premium subscription required');
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

      const result = await learningSyncAdapter.pull();

      expect(result).toEqual([]);
    });

    it('should return items from user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockData: SyncableLearningProgress = {
        ...createMockProgress({ articleId: 'synced-article' }),
        id: 'synced-article',
        updatedAt: 2000,
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

      const result = await learningSyncAdapter.pull();

      expect(result).toHaveLength(1);
      expect(result[0].articleId).toBe('synced-article');
      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockSelect).toHaveBeenCalledWith('data');
      expect(mockEq1).toHaveBeenCalledWith('user_id', 'test-user-id');
      expect(mockEq2).toHaveBeenCalledWith('item_type', 'learning_progress');
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

      await expect(learningSyncAdapter.pull()).rejects.toEqual({
        message: 'Database error',
      });
    });
  });
});
