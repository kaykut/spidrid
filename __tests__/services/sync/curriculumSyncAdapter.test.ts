import { curriculumSyncAdapter, SyncableCurriculum } from '../../../src/services/sync/curriculumSyncAdapter';
import { useCurriculumStore } from '../../../src/store/curriculumStore';
import { supabase } from '../../../src/services/supabase';
import { Curriculum } from '../../../src/types/curriculum';

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

const createMockCurriculum = (overrides: Partial<Curriculum> = {}): Curriculum => ({
  id: 'curr-1',
  title: 'Test Curriculum',
  goal: 'Learn testing',
  articleCount: 3,
  tone: 'explanatory',
  targetWordCount: 750,
  createdAt: 1000,
  updatedAt: 2000,
  currentArticleIndex: 0,
  completedArticleCount: 0,
  isCompleted: false,
  outline: {
    curriculumTitle: 'Test Curriculum',
    articles: [
      {
        orderIndex: 0,
        title: 'Article 1',
        summary: 'First article',
        keyConceptsToIntroduce: ['concept1'],
        prerequisiteConcepts: [],
      },
    ],
  },
  articles: [
    {
      id: 'curr-1-article-0',
      curriculumId: 'curr-1',
      orderIndex: 0,
      title: 'Article 1',
      summary: 'First article',
      content: 'Content here',
      wordCount: 750,
      questions: [],
      generationStatus: 'generated',
      completionStatus: 'unlocked',
    },
  ],
  ...overrides,
});

describe('curriculumSyncAdapter', () => {
  const mockUser = { id: 'test-user-id' };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store
    useCurriculumStore.setState({
      curricula: {},
      isGenerating: false,
      generationProgress: null,
      generationError: null,
    });
  });

  describe('toSyncItems', () => {
    it('should return empty array when store is empty', () => {
      const result = curriculumSyncAdapter.toSyncItems();
      expect(result).toEqual([]);
    });

    it('should convert Curriculum to SyncableCurriculum', () => {
      const curriculum = createMockCurriculum();
      useCurriculumStore.setState({ curricula: { [curriculum.id]: curriculum } });

      const result = curriculumSyncAdapter.toSyncItems();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('curr-1');
      expect(result[0].updatedAt).toBe(2000);
    });

    it('should only include curricula with outline', () => {
      const withOutline = createMockCurriculum({ id: 'with-outline' });
      const withoutOutline = createMockCurriculum({
        id: 'without-outline',
        outline: undefined,
      });

      useCurriculumStore.setState({
        curricula: {
          [withOutline.id]: withOutline,
          [withoutOutline.id]: withoutOutline,
        },
      });

      const result = curriculumSyncAdapter.toSyncItems();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('with-outline');
    });

    it('should include multiple curricula', () => {
      const curr1 = createMockCurriculum({ id: 'curr-1' });
      const curr2 = createMockCurriculum({ id: 'curr-2' });

      useCurriculumStore.setState({
        curricula: {
          [curr1.id]: curr1,
          [curr2.id]: curr2,
        },
      });

      const result = curriculumSyncAdapter.toSyncItems();

      expect(result).toHaveLength(2);
    });
  });

  describe('fromSyncItems', () => {
    it('should write items to store', () => {
      const items: SyncableCurriculum[] = [
        createMockCurriculum({ id: 'curr-1' }) as SyncableCurriculum,
        createMockCurriculum({ id: 'curr-2' }) as SyncableCurriculum,
      ];

      curriculumSyncAdapter.fromSyncItems(items);

      const { curricula } = useCurriculumStore.getState();
      expect(Object.keys(curricula)).toHaveLength(2);
      expect(curricula['curr-1']).toBeDefined();
      expect(curricula['curr-2']).toBeDefined();
    });

    it('should replace existing curricula', () => {
      const existing = createMockCurriculum({ id: 'curr-1', title: 'Old Title' });
      useCurriculumStore.setState({ curricula: { [existing.id]: existing } });

      const updated = createMockCurriculum({ id: 'curr-1', title: 'New Title' });
      curriculumSyncAdapter.fromSyncItems([updated as SyncableCurriculum]);

      const { curricula } = useCurriculumStore.getState();
      expect(curricula['curr-1'].title).toBe('New Title');
    });
  });

  describe('push', () => {
    it('should do nothing when items array is empty', async () => {
      await curriculumSyncAdapter.push([]);

      expect(mockSupabase.auth.getUser).not.toHaveBeenCalled();
    });

    it('should throw error when not authenticated', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: null },
      });

      const items: SyncableCurriculum[] = [
        createMockCurriculum() as SyncableCurriculum,
      ];

      await expect(curriculumSyncAdapter.push(items)).rejects.toThrow('Not authenticated');
    });

    it('should upsert items to user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockUpsert = jest.fn().mockResolvedValue({ error: null });
      (mockSupabase.from as jest.Mock).mockReturnValue({
        upsert: mockUpsert,
      });

      const items: SyncableCurriculum[] = [
        createMockCurriculum({ id: 'curr-1', updatedAt: 2000 }) as SyncableCurriculum,
      ];

      await curriculumSyncAdapter.push(items);

      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockUpsert).toHaveBeenCalledWith(
        [
          {
            user_id: 'test-user-id',
            item_id: 'curr-1',
            item_type: 'curriculum',
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

      const items: SyncableCurriculum[] = [
        createMockCurriculum() as SyncableCurriculum,
      ];

      await expect(curriculumSyncAdapter.push(items)).rejects.toEqual({
        message: 'Database error',
      });
    });
  });

  describe('pull', () => {
    it('should throw error when not authenticated', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: null },
      });

      await expect(curriculumSyncAdapter.pull()).rejects.toThrow('Not authenticated');
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

      const result = await curriculumSyncAdapter.pull();

      expect(result).toEqual([]);
    });

    it('should return items from user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockData = createMockCurriculum({ id: 'synced-curr-1' });

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

      const result = await curriculumSyncAdapter.pull();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('synced-curr-1');
      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockSelect).toHaveBeenCalledWith('data');
      expect(mockEq1).toHaveBeenCalledWith('user_id', 'test-user-id');
      expect(mockEq2).toHaveBeenCalledWith('item_type', 'curriculum');
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

      await expect(curriculumSyncAdapter.pull()).rejects.toEqual({
        message: 'Database error',
      });
    });
  });
});
