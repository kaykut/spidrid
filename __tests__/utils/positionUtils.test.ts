import {
  parseCurriculumSourceId,
  savePosition,
  clearPosition,
  getSavedPosition,
  AUTO_SAVE_INTERVAL_MS,
} from '../../src/utils/positionUtils';
import { useContentStore } from '../../src/store/contentStore';
import { useGeneratedStore } from '../../src/store/generatedStore';
import { useCurriculumStore } from '../../src/store/curriculumStore';

// Mock the stores
jest.mock('../../src/store/contentStore');
jest.mock('../../src/store/generatedStore');
jest.mock('../../src/store/curriculumStore');

describe('positionUtils', () => {
  describe('AUTO_SAVE_INTERVAL_MS', () => {
    it('should be 15000 milliseconds (15 seconds)', () => {
      expect(AUTO_SAVE_INTERVAL_MS).toBe(15000);
    });
  });

  describe('parseCurriculumSourceId', () => {
    it('should parse valid curriculum sourceId', () => {
      const result = parseCurriculumSourceId('curr_123_abc:2');
      expect(result).toEqual({
        curriculumId: 'curr_123_abc',
        articleIndex: 2,
      });
    });

    it('should parse sourceId with index 0', () => {
      const result = parseCurriculumSourceId('curr_xyz:0');
      expect(result).toEqual({
        curriculumId: 'curr_xyz',
        articleIndex: 0,
      });
    });

    it('should return null for invalid format (no colon)', () => {
      const result = parseCurriculumSourceId('invalid');
      expect(result).toBeNull();
    });

    it('should return null for missing curriculum ID', () => {
      const result = parseCurriculumSourceId(':5');
      expect(result).toBeNull();
    });

    it('should return null for missing article index', () => {
      const result = parseCurriculumSourceId('curr_123:');
      expect(result).toBeNull();
    });

    it('should return null for non-numeric article index', () => {
      const result = parseCurriculumSourceId('curr_123:abc');
      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      const result = parseCurriculumSourceId('');
      expect(result).toBeNull();
    });

    it('should handle negative article index', () => {
      const result = parseCurriculumSourceId('curr_123:-1');
      expect(result).toEqual({
        curriculumId: 'curr_123',
        articleIndex: -1,
      });
    });
  });

  describe('savePosition', () => {
    let mockUpdateProgress: jest.Mock;
    let mockUpdateArticleProgress: jest.Mock;
    let mockSaveArticlePosition: jest.Mock;

    beforeEach(() => {
      mockUpdateProgress = jest.fn();
      mockUpdateArticleProgress = jest.fn();
      mockSaveArticlePosition = jest.fn();

      (useContentStore.getState as jest.Mock) = jest.fn(() => ({
        updateProgress: mockUpdateProgress,
      }));

      (useGeneratedStore.getState as jest.Mock) = jest.fn(() => ({
        updateArticleProgress: mockUpdateArticleProgress,
      }));

      (useCurriculumStore.getState as jest.Mock) = jest.fn(() => ({
        saveArticlePosition: mockSaveArticlePosition,
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should save position for imported content with progress', () => {
      savePosition('imported_123', 'imported', 500, 0.5);

      expect(mockUpdateProgress).toHaveBeenCalledWith('imported_123', 0.5, 500);
      expect(mockUpdateArticleProgress).not.toHaveBeenCalled();
      expect(mockSaveArticlePosition).not.toHaveBeenCalled();
    });

    it('should save position for imported content without progress (defaults to 0)', () => {
      savePosition('imported_123', 'imported', 500);

      expect(mockUpdateProgress).toHaveBeenCalledWith('imported_123', 0, 500);
    });

    it('should save position for generated content', () => {
      savePosition('gen_456', 'generated', 75);

      expect(mockUpdateArticleProgress).toHaveBeenCalledWith('gen_456', {
        currentWordIndex: 75,
      });
      expect(mockUpdateProgress).not.toHaveBeenCalled();
      expect(mockSaveArticlePosition).not.toHaveBeenCalled();
    });

    it('should save position for curriculum content', () => {
      savePosition('curr_789:2', 'curriculum', 30);

      expect(mockSaveArticlePosition).toHaveBeenCalledWith('curr_789', 2, 30);
      expect(mockUpdateProgress).not.toHaveBeenCalled();
      expect(mockUpdateArticleProgress).not.toHaveBeenCalled();
    });

    it('should not save position for training content', () => {
      savePosition('training_1', 'training', 100);

      expect(mockUpdateProgress).not.toHaveBeenCalled();
      expect(mockUpdateArticleProgress).not.toHaveBeenCalled();
      expect(mockSaveArticlePosition).not.toHaveBeenCalled();
    });

    it('should handle invalid curriculum sourceId gracefully', () => {
      savePosition('invalid_curriculum', 'curriculum', 30);

      expect(mockSaveArticlePosition).not.toHaveBeenCalled();
    });

    it('should save position at index 0', () => {
      savePosition('gen_456', 'generated', 0);

      expect(mockUpdateArticleProgress).toHaveBeenCalledWith('gen_456', {
        currentWordIndex: 0,
      });
    });
  });

  describe('clearPosition', () => {
    let mockUpdateProgress: jest.Mock;
    let mockUpdateArticleProgress: jest.Mock;
    let mockSaveArticlePosition: jest.Mock;

    beforeEach(() => {
      mockUpdateProgress = jest.fn();
      mockUpdateArticleProgress = jest.fn();
      mockSaveArticlePosition = jest.fn();

      (useContentStore.getState as jest.Mock) = jest.fn(() => ({
        updateProgress: mockUpdateProgress,
      }));

      (useGeneratedStore.getState as jest.Mock) = jest.fn(() => ({
        updateArticleProgress: mockUpdateArticleProgress,
      }));

      (useCurriculumStore.getState as jest.Mock) = jest.fn(() => ({
        saveArticlePosition: mockSaveArticlePosition,
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should clear position for imported content', () => {
      clearPosition('imported_123', 'imported');

      expect(mockUpdateProgress).toHaveBeenCalledWith('imported_123', 1, undefined);
      expect(mockUpdateArticleProgress).not.toHaveBeenCalled();
      expect(mockSaveArticlePosition).not.toHaveBeenCalled();
    });

    it('should clear position for generated content', () => {
      clearPosition('gen_456', 'generated');

      expect(mockUpdateArticleProgress).toHaveBeenCalledWith('gen_456', {
        currentWordIndex: undefined,
      });
      expect(mockUpdateProgress).not.toHaveBeenCalled();
      expect(mockSaveArticlePosition).not.toHaveBeenCalled();
    });

    it('should clear position for curriculum content', () => {
      clearPosition('curr_789:2', 'curriculum');

      expect(mockSaveArticlePosition).toHaveBeenCalledWith('curr_789', 2, undefined);
      expect(mockUpdateProgress).not.toHaveBeenCalled();
      expect(mockUpdateArticleProgress).not.toHaveBeenCalled();
    });

    it('should handle training content (no-op)', () => {
      clearPosition('training_1', 'training');

      // Should not throw, but also should not call any store methods
      expect(mockUpdateProgress).not.toHaveBeenCalled();
      expect(mockUpdateArticleProgress).not.toHaveBeenCalled();
      expect(mockSaveArticlePosition).not.toHaveBeenCalled();
    });

    it('should handle invalid curriculum sourceId gracefully', () => {
      clearPosition('invalid_curriculum', 'curriculum');

      expect(mockSaveArticlePosition).not.toHaveBeenCalled();
    });
  });

  describe('getSavedPosition', () => {
    let mockGetCurrentWordIndex: jest.Mock;
    let mockGetArticleById: jest.Mock;
    let mockGetArticlePosition: jest.Mock;

    beforeEach(() => {
      mockGetCurrentWordIndex = jest.fn();
      mockGetArticleById = jest.fn();
      mockGetArticlePosition = jest.fn();

      (useContentStore.getState as jest.Mock) = jest.fn(() => ({
        getCurrentWordIndex: mockGetCurrentWordIndex,
      }));

      (useGeneratedStore.getState as jest.Mock) = jest.fn(() => ({
        getArticleById: mockGetArticleById,
      }));

      (useCurriculumStore.getState as jest.Mock) = jest.fn(() => ({
        getArticlePosition: mockGetArticlePosition,
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should get saved position for imported content', () => {
      mockGetCurrentWordIndex.mockReturnValue(500);

      const result = getSavedPosition('imported_123', 'imported');

      expect(result).toBe(500);
      expect(mockGetCurrentWordIndex).toHaveBeenCalledWith('imported_123');
    });

    it('should return undefined for imported content with no saved position', () => {
      mockGetCurrentWordIndex.mockReturnValue(undefined);

      const result = getSavedPosition('imported_123', 'imported');

      expect(result).toBeUndefined();
    });

    it('should get saved position for generated content', () => {
      mockGetArticleById.mockReturnValue({
        id: 'gen_456',
        currentWordIndex: 75,
      });

      const result = getSavedPosition('gen_456', 'generated');

      expect(result).toBe(75);
      expect(mockGetArticleById).toHaveBeenCalledWith('gen_456');
    });

    it('should return undefined for generated content with no saved position', () => {
      mockGetArticleById.mockReturnValue({
        id: 'gen_456',
        currentWordIndex: undefined,
      });

      const result = getSavedPosition('gen_456', 'generated');

      expect(result).toBeUndefined();
    });

    it('should return undefined for missing generated article', () => {
      mockGetArticleById.mockReturnValue(undefined);

      const result = getSavedPosition('gen_456', 'generated');

      expect(result).toBeUndefined();
    });

    it('should get saved position for curriculum content', () => {
      mockGetArticlePosition.mockReturnValue(30);

      const result = getSavedPosition('curr_789:2', 'curriculum');

      expect(result).toBe(30);
      expect(mockGetArticlePosition).toHaveBeenCalledWith('curr_789', 2);
    });

    it('should return undefined for curriculum content with no saved position', () => {
      mockGetArticlePosition.mockReturnValue(undefined);

      const result = getSavedPosition('curr_789:2', 'curriculum');

      expect(result).toBeUndefined();
    });

    it('should return undefined for invalid curriculum sourceId', () => {
      const result = getSavedPosition('invalid_curriculum', 'curriculum');

      expect(result).toBeUndefined();
      expect(mockGetArticlePosition).not.toHaveBeenCalled();
    });

    it('should return undefined for training content', () => {
      const result = getSavedPosition('training_1', 'training');

      expect(result).toBeUndefined();
    });

    it('should get position 0 if explicitly saved as 0', () => {
      mockGetCurrentWordIndex.mockReturnValue(0);

      const result = getSavedPosition('imported_123', 'imported');

      expect(result).toBe(0);
    });
  });
});
