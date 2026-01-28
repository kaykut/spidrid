import { contentSyncAdapter, SyncableContent } from '../../../src/services/sync/contentSyncAdapter';
import { useContentStore } from '../../../src/store/contentStore';
import { supabase } from '../../../src/services/supabase';
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

describe('contentSyncAdapter', () => {
  const mockUser = { id: 'test-user-id' };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store
    useContentStore.setState({ importedContent: [] });
  });

  describe('toSyncItems', () => {
    it('should return empty array when store is empty', () => {
      const result = contentSyncAdapter.toSyncItems();
      expect(result).toEqual([]);
    });

    it('should convert ImportedContent to SyncableContent', () => {
      const content = {
        id: 'content-1',
        title: 'Test Article',
        content: 'Some content here',
        wordCount: 3,
        source: 'url' as const,
        sourceUrl: 'https://example.com',
        createdAt: 1000,
        readProgress: 0.5,
      };

      useContentStore.setState({ importedContent: [content] });

      const result = contentSyncAdapter.toSyncItems();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        ...content,
        updatedAt: 1000, // Uses createdAt when no lastReadAt
      });
    });

    it('should use lastReadAt as updatedAt when available', () => {
      const content = {
        id: 'content-1',
        title: 'Test Article',
        content: 'Some content here',
        wordCount: 3,
        source: 'pdf' as const,
        fileName: 'test.pdf',
        createdAt: 1000,
        lastReadAt: 2000,
        readProgress: 1,
      };

      useContentStore.setState({ importedContent: [content] });

      const result = contentSyncAdapter.toSyncItems();

      expect(result[0].updatedAt).toBe(2000);
    });
  });

  describe('fromSyncItems', () => {
    it('should write items to store', () => {
      const items: SyncableContent[] = [
        {
          id: 'content-1',
          title: 'Article 1',
          content: 'Content 1',
          wordCount: 2,
          source: 'text',
          createdAt: 1000,
          readProgress: 0,
          updatedAt: 1000,
        },
        {
          id: 'content-2',
          title: 'Article 2',
          content: 'Content 2',
          wordCount: 2,
          source: 'url',
          sourceUrl: 'https://example.com',
          createdAt: 2000,
          readProgress: 0.5,
          updatedAt: 2000,
        },
      ];

      contentSyncAdapter.fromSyncItems(items);

      const { importedContent } = useContentStore.getState();
      expect(importedContent).toHaveLength(2);
    });

    it('should sort items by createdAt descending', () => {
      const items: SyncableContent[] = [
        {
          id: 'old',
          title: 'Old Article',
          content: 'Old',
          wordCount: 1,
          source: 'text',
          createdAt: 1000,
          readProgress: 0,
          updatedAt: 1000,
        },
        {
          id: 'new',
          title: 'New Article',
          content: 'New',
          wordCount: 1,
          source: 'text',
          createdAt: 3000,
          readProgress: 0,
          updatedAt: 3000,
        },
        {
          id: 'mid',
          title: 'Mid Article',
          content: 'Mid',
          wordCount: 1,
          source: 'text',
          createdAt: 2000,
          readProgress: 0,
          updatedAt: 2000,
        },
      ];

      contentSyncAdapter.fromSyncItems(items);

      const { importedContent } = useContentStore.getState();
      expect(importedContent[0].id).toBe('new');
      expect(importedContent[1].id).toBe('mid');
      expect(importedContent[2].id).toBe('old');
    });

    it('should strip updatedAt from items', () => {
      const items: SyncableContent[] = [
        {
          id: 'content-1',
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
          createdAt: 1000,
          readProgress: 0,
          updatedAt: 2000,
        },
      ];

      contentSyncAdapter.fromSyncItems(items);

      const { importedContent } = useContentStore.getState();
      expect((importedContent[0] as unknown as SyncableContent).updatedAt).toBeUndefined();
    });
  });

  describe('push', () => {
    it('should do nothing when items array is empty', async () => {
      await contentSyncAdapter.push([]);

      expect(mockSupabase.auth.getUser).not.toHaveBeenCalled();
    });

    it('should throw error when not eligible for sync', async () => {
      // Mock syncAccess to throw (not authenticated or not premium)
      mockSyncAccess.requireSyncEligibility.mockImplementationOnce(() => {
        throw new Error('Authentication and premium subscription required');
      });

      const items: SyncableContent[] = [
        {
          id: 'content-1',
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
          createdAt: 1000,
          readProgress: 0,
          updatedAt: 1000,
        },
      ];

      await expect(contentSyncAdapter.push(items)).rejects.toThrow('Authentication and premium subscription required');
    });

    it('should upsert items to user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockUpsert = jest.fn().mockResolvedValue({ error: null });
      (mockSupabase.from as jest.Mock).mockReturnValue({
        upsert: mockUpsert,
      });

      const items: SyncableContent[] = [
        {
          id: 'content-1',
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
          createdAt: 1000,
          readProgress: 0,
          updatedAt: 1000,
        },
      ];

      await contentSyncAdapter.push(items);

      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockUpsert).toHaveBeenCalledWith(
        [
          {
            user_id: 'test-user-id',
            item_id: 'content-1',
            item_type: 'imported',
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

      const items: SyncableContent[] = [
        {
          id: 'content-1',
          title: 'Test',
          content: 'Content',
          wordCount: 1,
          source: 'text',
          createdAt: 1000,
          readProgress: 0,
          updatedAt: 1000,
        },
      ];

      await expect(contentSyncAdapter.push(items)).rejects.toEqual({
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

      await expect(contentSyncAdapter.pull()).rejects.toThrow('Authentication and premium subscription required');
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

      const result = await contentSyncAdapter.pull();

      expect(result).toEqual([]);
    });

    it('should return items from user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockData: SyncableContent = {
        id: 'content-1',
        title: 'Synced Article',
        content: 'Content from server',
        wordCount: 3,
        source: 'url',
        sourceUrl: 'https://example.com',
        createdAt: 1000,
        readProgress: 0.5,
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

      const result = await contentSyncAdapter.pull();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockData);
      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockSelect).toHaveBeenCalledWith('data');
      expect(mockEq1).toHaveBeenCalledWith('user_id', 'test-user-id');
      expect(mockEq2).toHaveBeenCalledWith('item_type', 'imported');
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

      await expect(contentSyncAdapter.pull()).rejects.toEqual({
        message: 'Database error',
      });
    });
  });
});
