import { generatedSyncAdapter, SyncableGenerated } from '../../../src/services/sync/generatedSyncAdapter';
import { useGeneratedStore } from '../../../src/store/generatedStore';
import { supabase } from '../../../src/services/supabase';
import { GeneratedArticle } from '../../../src/types/generated';
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

const createMockArticle = (overrides: Partial<GeneratedArticle> = {}): GeneratedArticle => ({
  id: 'gen-1',
  topic: 'Test Topic',
  targetDuration: 3,
  tone: 'explanatory',
  title: 'Test Article',
  content: 'Test content for the article',
  wordCount: 5,
  questions: [],
  status: 'complete',
  generatedAt: 1000,
  completed: false,
  attemptCount: 0,
  ...overrides,
});

describe('generatedSyncAdapter', () => {
  const mockUser = { id: 'test-user-id' };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store
    useGeneratedStore.setState({ articles: [], isGenerating: false, generationError: null });
  });

  describe('toSyncItems', () => {
    it('should return empty array when store is empty', () => {
      const result = generatedSyncAdapter.toSyncItems();
      expect(result).toEqual([]);
    });

    it('should convert GeneratedArticle to SyncableGenerated', () => {
      const article = createMockArticle();
      useGeneratedStore.setState({ articles: [article] });

      const result = generatedSyncAdapter.toSyncItems();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        ...article,
        updatedAt: 1000, // Uses generatedAt when no lastReadAt
      });
    });

    it('should use lastReadAt as updatedAt when available', () => {
      const article = createMockArticle({
        generatedAt: 1000,
        lastReadAt: 2000,
      });
      useGeneratedStore.setState({ articles: [article] });

      const result = generatedSyncAdapter.toSyncItems();

      expect(result[0].updatedAt).toBe(2000);
    });

    it('should only include completed articles', () => {
      const completedArticle = createMockArticle({ id: 'complete-1', status: 'complete' });
      const pendingArticle = createMockArticle({ id: 'pending-1', status: 'pending' });
      const generatingArticle = createMockArticle({ id: 'generating-1', status: 'generating' });
      const errorArticle = createMockArticle({ id: 'error-1', status: 'error' });

      useGeneratedStore.setState({
        articles: [completedArticle, pendingArticle, generatingArticle, errorArticle],
      });

      const result = generatedSyncAdapter.toSyncItems();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('complete-1');
    });
  });

  describe('fromSyncItems', () => {
    it('should write items to store', () => {
      const items: SyncableGenerated[] = [
        { ...createMockArticle({ id: 'gen-1' }), updatedAt: 1000 },
        { ...createMockArticle({ id: 'gen-2' }), updatedAt: 2000 },
      ];

      generatedSyncAdapter.fromSyncItems(items);

      const { articles } = useGeneratedStore.getState();
      expect(articles).toHaveLength(2);
    });

    it('should sort items by generatedAt descending', () => {
      const items: SyncableGenerated[] = [
        { ...createMockArticle({ id: 'old', generatedAt: 1000 }), updatedAt: 1000 },
        { ...createMockArticle({ id: 'new', generatedAt: 3000 }), updatedAt: 3000 },
        { ...createMockArticle({ id: 'mid', generatedAt: 2000 }), updatedAt: 2000 },
      ];

      generatedSyncAdapter.fromSyncItems(items);

      const { articles } = useGeneratedStore.getState();
      expect(articles[0].id).toBe('new');
      expect(articles[1].id).toBe('mid');
      expect(articles[2].id).toBe('old');
    });

    it('should strip updatedAt from items', () => {
      const items: SyncableGenerated[] = [
        { ...createMockArticle({ id: 'gen-1' }), updatedAt: 2000 },
      ];

      generatedSyncAdapter.fromSyncItems(items);

      const { articles } = useGeneratedStore.getState();
      expect((articles[0] as unknown as SyncableGenerated).updatedAt).toBeUndefined();
    });
  });

  describe('push', () => {
    it('should do nothing when items array is empty', async () => {
      await generatedSyncAdapter.push([]);

      expect(mockSupabase.auth.getUser).not.toHaveBeenCalled();
    });

    it('should throw error when not eligible for sync', async () => {
      // Mock syncAccess to throw (not authenticated or not premium)
      mockSyncAccess.requireSyncEligibility.mockImplementationOnce(() => {
        throw new Error('Authentication and premium subscription required');
      });

      const items: SyncableGenerated[] = [
        { ...createMockArticle(), updatedAt: 1000 },
      ];

      await expect(generatedSyncAdapter.push(items)).rejects.toThrow('Authentication and premium subscription required');
    });

    it('should upsert items to user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockUpsert = jest.fn().mockResolvedValue({ error: null });
      (mockSupabase.from as jest.Mock).mockReturnValue({
        upsert: mockUpsert,
      });

      const items: SyncableGenerated[] = [
        { ...createMockArticle({ id: 'gen-1' }), updatedAt: 1000 },
      ];

      await generatedSyncAdapter.push(items);

      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockUpsert).toHaveBeenCalledWith(
        [
          {
            user_id: 'test-user-id',
            item_id: 'gen-1',
            item_type: 'generated',
            data: items[0],
            updated_at: '1970-01-01T00:00:01.000Z',
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

      const items: SyncableGenerated[] = [
        { ...createMockArticle(), updatedAt: 1000 },
      ];

      await expect(generatedSyncAdapter.push(items)).rejects.toEqual({
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

      await expect(generatedSyncAdapter.pull()).rejects.toThrow('Authentication and premium subscription required');
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

      const result = await generatedSyncAdapter.pull();

      expect(result).toEqual([]);
    });

    it('should return items from user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockData: SyncableGenerated = {
        ...createMockArticle({ id: 'synced-gen-1' }),
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

      const result = await generatedSyncAdapter.pull();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockData);
      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockSelect).toHaveBeenCalledWith('data');
      expect(mockEq1).toHaveBeenCalledWith('user_id', 'test-user-id');
      expect(mockEq2).toHaveBeenCalledWith('item_type', 'generated');
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

      await expect(generatedSyncAdapter.pull()).rejects.toEqual({
        message: 'Database error',
      });
    });
  });
});
