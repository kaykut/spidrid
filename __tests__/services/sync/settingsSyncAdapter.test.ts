import { settingsSyncAdapter, SyncableSettings } from '../../../src/services/sync/settingsSyncAdapter';
import { useSettingsStore } from '../../../src/store/settingsStore';
import { supabase } from '../../../src/services/supabase';
import { DEFAULT_SETTINGS } from '../../../src/types/settings';
import { themes } from '../../../src/data/themes';
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

const createMockSettings = (overrides: Partial<SyncableSettings> = {}): SyncableSettings => ({
  id: 'user_settings',
  updatedAt: Date.now(),
  ...DEFAULT_SETTINGS,
  activeContentTab: 'train',
  ...overrides,
});

describe('settingsSyncAdapter', () => {
  const mockUser = { id: 'test-user-id' };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store to defaults
    useSettingsStore.setState({
      ...DEFAULT_SETTINGS,
      theme: themes[DEFAULT_SETTINGS.themeId],
    });
  });

  describe('toSyncItems', () => {
    it('should return settings with correct id', () => {
      const result = settingsSyncAdapter.toSyncItems();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('user_settings');
    });

    it('should include all persisted settings', () => {
      useSettingsStore.setState({
        themeId: 'midnight',
        defaultWPM: 350,
        showCrosshairs: false,
        userName: 'Test User',
      });

      const result = settingsSyncAdapter.toSyncItems();

      expect(result[0].themeId).toBe('midnight');
      expect(result[0].defaultWPM).toBe(350);
      expect(result[0].showCrosshairs).toBe(false);
      expect(result[0].userName).toBe('Test User');
    });

    it('should include updatedAt timestamp', () => {
      const before = Date.now();
      const result = settingsSyncAdapter.toSyncItems();
      const after = Date.now();

      expect(result[0].updatedAt).toBeGreaterThanOrEqual(before);
      expect(result[0].updatedAt).toBeLessThanOrEqual(after);
    });
  });

  describe('fromSyncItems', () => {
    it('should do nothing when items empty', () => {
      useSettingsStore.setState({ userName: 'Original' });

      settingsSyncAdapter.fromSyncItems([]);

      const { userName } = useSettingsStore.getState();
      expect(userName).toBe('Original');
    });

    it('should update store with remote settings', () => {
      const remoteSettings = createMockSettings({
        themeId: 'sepia',
        defaultWPM: 400,
        userName: 'Remote User',
        showCrosshairs: false,
      });

      settingsSyncAdapter.fromSyncItems([remoteSettings]);

      const state = useSettingsStore.getState();
      expect(state.themeId).toBe('sepia');
      expect(state.defaultWPM).toBe(400);
      expect(state.userName).toBe('Remote User');
      expect(state.showCrosshairs).toBe(false);
    });

    it('should ignore items with wrong id', () => {
      useSettingsStore.setState({ userName: 'Original' });

      const wrongIdSettings = createMockSettings({
        id: 'wrong_id',
        userName: 'Should Not Apply',
      });

      settingsSyncAdapter.fromSyncItems([wrongIdSettings]);

      const { userName } = useSettingsStore.getState();
      expect(userName).toBe('Original');
    });
  });

  describe('push', () => {
    it('should do nothing when items array is empty', async () => {
      await settingsSyncAdapter.push([]);

      expect(mockSupabase.auth.getUser).not.toHaveBeenCalled();
    });

    it('should throw error when not eligible for sync', async () => {
      // Mock syncAccess to throw (not authenticated or not premium)
      mockSyncAccess.requireSyncEligibility.mockImplementationOnce(() => {
        throw new Error('Authentication and premium subscription required');
      });

      const items: SyncableSettings[] = [createMockSettings()];

      await expect(settingsSyncAdapter.push(items)).rejects.toThrow('Authentication and premium subscription required');
    });

    it('should upsert items to user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockUpsert = jest.fn().mockResolvedValue({ error: null });
      (mockSupabase.from as jest.Mock).mockReturnValue({
        upsert: mockUpsert,
      });

      const items: SyncableSettings[] = [createMockSettings({ updatedAt: 2000 })];

      await settingsSyncAdapter.push(items);

      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockUpsert).toHaveBeenCalledWith(
        [
          {
            user_id: 'test-user-id',
            item_id: 'user_settings',
            item_type: 'settings',
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

      const items: SyncableSettings[] = [createMockSettings()];

      await expect(settingsSyncAdapter.push(items)).rejects.toEqual({
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

      await expect(settingsSyncAdapter.pull()).rejects.toThrow('Authentication and premium subscription required');
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

      const result = await settingsSyncAdapter.pull();

      expect(result).toEqual([]);
    });

    it('should return items from user_content table', async () => {
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockData = createMockSettings({ themeId: 'light' });

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

      const result = await settingsSyncAdapter.pull();

      expect(result).toHaveLength(1);
      expect(result[0].themeId).toBe('light');
      expect(mockSupabase.from).toHaveBeenCalledWith('user_content');
      expect(mockSelect).toHaveBeenCalledWith('data');
      expect(mockEq1).toHaveBeenCalledWith('user_id', 'test-user-id');
      expect(mockEq2).toHaveBeenCalledWith('item_type', 'settings');
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

      await expect(settingsSyncAdapter.pull()).rejects.toEqual({
        message: 'Database error',
      });
    });
  });
});
