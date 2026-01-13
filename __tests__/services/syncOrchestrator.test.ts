import {
  performFullSync,
  pushAllChanges,
  pullAllData,
  syncSingleAdapter,
  getSyncState,
  resetSyncState,
} from '../../src/services/syncOrchestrator';
import { useAuthStore } from '../../src/store/authStore';

// Mock all sync adapters
jest.mock('../../src/services/sync', () => ({
  contentSyncAdapter: {
    toSyncItems: jest.fn(() => []),
    fromSyncItems: jest.fn(),
    push: jest.fn().mockResolvedValue(undefined),
    pull: jest.fn().mockResolvedValue([]),
  },
  generatedSyncAdapter: {
    toSyncItems: jest.fn(() => []),
    fromSyncItems: jest.fn(),
    push: jest.fn().mockResolvedValue(undefined),
    pull: jest.fn().mockResolvedValue([]),
  },
  curriculumSyncAdapter: {
    toSyncItems: jest.fn(() => []),
    fromSyncItems: jest.fn(),
    push: jest.fn().mockResolvedValue(undefined),
    pull: jest.fn().mockResolvedValue([]),
  },
  learningSyncAdapter: {
    toSyncItems: jest.fn(() => []),
    fromSyncItems: jest.fn(),
    push: jest.fn().mockResolvedValue(undefined),
    pull: jest.fn().mockResolvedValue([]),
  },
  journeySyncAdapter: {
    toSyncItems: jest.fn(() => []),
    fromSyncItems: jest.fn(),
    push: jest.fn().mockResolvedValue(undefined),
    pull: jest.fn().mockResolvedValue([]),
  },
  settingsSyncAdapter: {
    toSyncItems: jest.fn(() => []),
    fromSyncItems: jest.fn(),
    push: jest.fn().mockResolvedValue(undefined),
    pull: jest.fn().mockResolvedValue([]),
  },
}));

// Get mocked adapters
import {
  contentSyncAdapter,
  generatedSyncAdapter,
  settingsSyncAdapter,
} from '../../src/services/sync';

const mockContentAdapter = contentSyncAdapter as jest.Mocked<typeof contentSyncAdapter>;
const mockGeneratedAdapter = generatedSyncAdapter as jest.Mocked<typeof generatedSyncAdapter>;
const mockSettingsAdapter = settingsSyncAdapter as jest.Mocked<typeof settingsSyncAdapter>;

describe('syncOrchestrator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset sync state
    resetSyncState();
    // Reset auth store
    useAuthStore.setState({ isLoggedIn: true, userId: 'test-user' });
    // Reset mock implementations to default success state
    (mockContentAdapter.pull as jest.Mock).mockResolvedValue([]);
    (mockContentAdapter.push as jest.Mock).mockResolvedValue(undefined);
    (mockContentAdapter.toSyncItems as jest.Mock).mockReturnValue([]);
    (mockContentAdapter.fromSyncItems as jest.Mock).mockImplementation(() => {});
    (mockGeneratedAdapter.pull as jest.Mock).mockResolvedValue([]);
    (mockGeneratedAdapter.push as jest.Mock).mockResolvedValue(undefined);
    (mockGeneratedAdapter.toSyncItems as jest.Mock).mockReturnValue([]);
    (mockGeneratedAdapter.fromSyncItems as jest.Mock).mockImplementation(() => {});
    (mockSettingsAdapter.pull as jest.Mock).mockResolvedValue([]);
    (mockSettingsAdapter.push as jest.Mock).mockResolvedValue(undefined);
    (mockSettingsAdapter.toSyncItems as jest.Mock).mockReturnValue([]);
    (mockSettingsAdapter.fromSyncItems as jest.Mock).mockImplementation(() => {});
  });

  describe('getSyncState', () => {
    it('should return initial sync state', () => {
      const state = getSyncState();

      expect(state.status).toBe('idle');
      expect(state.error).toBeNull();
    });
  });

  describe('performFullSync', () => {
    it('should fail when not authenticated', async () => {
      useAuthStore.setState({ isLoggedIn: false });

      const result = await performFullSync();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Not authenticated');
    });

    it('should call all adapters on full sync', async () => {
      const result = await performFullSync();

      expect(result.success).toBe(true);
      expect(mockContentAdapter.pull).toHaveBeenCalled();
      expect(mockContentAdapter.toSyncItems).toHaveBeenCalled();
      expect(mockContentAdapter.fromSyncItems).toHaveBeenCalled();
      expect(mockContentAdapter.push).toHaveBeenCalled();
    });

    it('should return item counts', async () => {
      (mockContentAdapter.pull as jest.Mock).mockResolvedValue([
        { id: '1', updatedAt: 1000 },
        { id: '2', updatedAt: 2000 },
      ]);
      (mockContentAdapter.toSyncItems as jest.Mock).mockReturnValue([
        { id: '1', updatedAt: 1000 },
        { id: '2', updatedAt: 2000 },
      ]);

      const result = await performFullSync();

      expect(result.success).toBe(true);
      expect(result.itemCounts).toBeDefined();
      expect(result.itemCounts?.content).toBe(2);
    });

    it('should handle adapter errors gracefully', async () => {
      (mockContentAdapter.pull as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );

      const result = await performFullSync();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });

    it('should update sync state on success', async () => {
      await performFullSync();

      const state = getSyncState();
      expect(state.status).toBe('idle');
      expect(state.lastSyncAt).not.toBeNull();
    });

    it('should update sync state on error', async () => {
      (mockContentAdapter.pull as jest.Mock).mockRejectedValue(
        new Error('Sync failed')
      );

      await performFullSync();

      const state = getSyncState();
      expect(state.status).toBe('error');
      expect(state.error).toBe('Sync failed');
    });
  });

  describe('pushAllChanges', () => {
    it('should fail when not authenticated', async () => {
      useAuthStore.setState({ isLoggedIn: false });

      const result = await pushAllChanges();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Not authenticated');
    });

    it('should push all adapters without pulling', async () => {
      const result = await pushAllChanges();

      expect(result.success).toBe(true);
      expect(mockContentAdapter.push).toHaveBeenCalled();
      expect(mockContentAdapter.pull).not.toHaveBeenCalled();
    });

    it('should handle push errors', async () => {
      (mockContentAdapter.push as jest.Mock).mockRejectedValue(
        new Error('Push failed')
      );

      const result = await pushAllChanges();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Push failed');
    });
  });

  describe('pullAllData', () => {
    it('should fail when not authenticated', async () => {
      useAuthStore.setState({ isLoggedIn: false });

      const result = await pullAllData();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Not authenticated');
    });

    it('should pull and merge without pushing', async () => {
      const result = await pullAllData();

      expect(result.success).toBe(true);
      expect(mockContentAdapter.pull).toHaveBeenCalled();
      expect(mockContentAdapter.fromSyncItems).toHaveBeenCalled();
      expect(mockContentAdapter.push).not.toHaveBeenCalled();
    });

    it('should return item counts', async () => {
      (mockSettingsAdapter.pull as jest.Mock).mockResolvedValue([
        { id: 'user_settings', updatedAt: 1000 },
      ]);
      (mockSettingsAdapter.toSyncItems as jest.Mock).mockReturnValue([]);

      const result = await pullAllData();

      expect(result.success).toBe(true);
      expect(result.itemCounts?.settings).toBe(1);
    });
  });

  describe('syncSingleAdapter', () => {
    it('should fail when not authenticated', async () => {
      useAuthStore.setState({ isLoggedIn: false });

      const result = await syncSingleAdapter('content');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Not authenticated');
    });

    it('should sync only the specified adapter', async () => {
      const result = await syncSingleAdapter('content');

      expect(result.success).toBe(true);
      expect(mockContentAdapter.pull).toHaveBeenCalled();
      expect(mockContentAdapter.push).toHaveBeenCalled();
      // Other adapters should not be called
      expect(mockGeneratedAdapter.pull).not.toHaveBeenCalled();
    });

    it('should return error for unknown adapter', async () => {
      const result = await syncSingleAdapter('unknown' as 'content');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Unknown adapter');
    });

    it('should return correct item count for synced adapter', async () => {
      (mockContentAdapter.pull as jest.Mock).mockResolvedValue([
        { id: '1', updatedAt: 1000 },
      ]);
      (mockContentAdapter.toSyncItems as jest.Mock).mockReturnValue([
        { id: '1', updatedAt: 1000 },
      ]);

      const result = await syncSingleAdapter('content');

      expect(result.success).toBe(true);
      expect(result.itemCounts?.content).toBe(1);
      expect(result.itemCounts?.generated).toBe(0);
    });
  });
});
