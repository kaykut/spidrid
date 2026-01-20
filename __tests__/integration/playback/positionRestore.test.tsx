/**
 * Integration tests for position restore on playback modal reopen.
 * Tests that saved reading positions are correctly restored when reopening content.
 */

import { useContentStore } from '../../../src/store/contentStore';
import { useGeneratedStore } from '../../../src/store/generatedStore';
import { useCurriculumStore } from '../../../src/store/curriculumStore';
import { getSavedPosition } from '../../../src/utils/positionUtils';
import {
  createImportedContentWithPosition,
  createGeneratedArticleWithPosition,
  createCurriculumWithPosition,
  createMockContent,
  createGeneratedArticle,
  createCurriculum,
} from '../../helpers/testUtils';

describe('Position Restore Integration', () => {
  beforeEach(() => {
    // Reset all stores before each test
    useContentStore.setState({ importedContent: [], currentContentId: null });
    useGeneratedStore.setState({ articles: [] });
    useCurriculumStore.setState({ curricula: {} });
  });

  describe('Imported Content', () => {
    it('should restore position at word 500 when reopening', () => {
      // Arrange: Create imported content with saved position at word 500
      const content = createImportedContentWithPosition(500, { id: 'imported-1' });
      useContentStore.setState({ importedContent: [content] });

      // Act: Get saved position
      const position = getSavedPosition('imported-1', 'imported');

      // Assert: Position is restored correctly
      expect(position).toBe(500);
    });

    it('should restore position at word 0 if explicitly saved', () => {
      // Arrange: User read to beginning and closed
      const content = createImportedContentWithPosition(0, { id: 'imported-2' });
      useContentStore.setState({ importedContent: [content] });

      // Act
      const position = getSavedPosition('imported-2', 'imported');

      // Assert
      expect(position).toBe(0);
    });

    it('should return undefined for content with no saved position', () => {
      // Arrange: Fresh content never opened
      const content = createMockContent({ id: 'imported-3', currentWordIndex: undefined });
      useContentStore.setState({ importedContent: [content] });

      // Act
      const position = getSavedPosition('imported-3', 'imported');

      // Assert: No position saved
      expect(position).toBeUndefined();
    });

    it('should handle negative position (invalid data)', () => {
      // Arrange: Corrupted data with negative position
      const content = createImportedContentWithPosition(-50, { id: 'imported-4' });
      useContentStore.setState({ importedContent: [content] });

      // Act
      const position = getSavedPosition('imported-4', 'imported');

      // Assert: Returns the invalid position (validation happens in playback.tsx)
      expect(position).toBe(-50);
    });
  });

  describe('Generated Articles', () => {
    it('should restore position at word 75 when reopening', () => {
      // Arrange: Generated article with saved position at word 75
      const article = createGeneratedArticleWithPosition(75, { id: 'gen-1' });
      useGeneratedStore.setState({ articles: [article] });

      // Act
      const position = getSavedPosition('gen-1', 'generated');

      // Assert
      expect(position).toBe(75);
    });

    it('should return undefined for article with no saved position', () => {
      // Arrange: Fresh generated article
      const article = createGeneratedArticle({ id: 'gen-2', currentWordIndex: undefined });
      useGeneratedStore.setState({ articles: [article] });

      // Act
      const position = getSavedPosition('gen-2', 'generated');

      // Assert
      expect(position).toBeUndefined();
    });

    it('should return undefined for non-existent article', () => {
      // Arrange: Empty store
      useGeneratedStore.setState({ articles: [] });

      // Act
      const position = getSavedPosition('gen-nonexistent', 'generated');

      // Assert
      expect(position).toBeUndefined();
    });
  });

  describe('Curriculum Articles', () => {
    it('should restore position at word 30 when reopening curriculum article', () => {
      // Arrange: Curriculum with article 2 saved at word 30
      const curriculum = createCurriculumWithPosition(2, 30, { id: 'curr-1' });
      useCurriculumStore.setState({ curricula: { 'curr-1': curriculum } });

      // Act
      const position = getSavedPosition('curr-1:2', 'curriculum');

      // Assert
      expect(position).toBe(30);
    });

    it('should return undefined for curriculum article with no saved position', () => {
      // Arrange: Fresh curriculum
      const curriculum = createCurriculum({ id: 'curr-2' });
      useCurriculumStore.setState({ curricula: { 'curr-2': curriculum } });

      // Act
      const position = getSavedPosition('curr-2:0', 'curriculum');

      // Assert
      expect(position).toBeUndefined();
    });

    it('should return undefined for invalid curriculum sourceId format', () => {
      // Arrange: Curriculum exists but sourceId is malformed
      const curriculum = createCurriculum({ id: 'curr-3' });
      useCurriculumStore.setState({ curricula: { 'curr-3': curriculum } });

      // Act: Invalid format (no colon separator)
      const position = getSavedPosition('invalid-format', 'curriculum');

      // Assert
      expect(position).toBeUndefined();
    });

    it('should return undefined for non-existent curriculum', () => {
      // Arrange: Empty store
      useCurriculumStore.setState({ curricula: {} });

      // Act
      const position = getSavedPosition('curr-nonexistent:0', 'curriculum');

      // Assert
      expect(position).toBeUndefined();
    });

    it('should handle out-of-bounds article index gracefully', () => {
      // Arrange: Curriculum with 3 articles
      const curriculum = createCurriculum({ id: 'curr-4', articleCount: 3 });
      useCurriculumStore.setState({ curricula: { 'curr-4': curriculum } });

      // Act: Try to access article index 99 (out of bounds)
      const position = getSavedPosition('curr-4:99', 'curriculum');

      // Assert: Returns undefined (article doesn't exist)
      expect(position).toBeUndefined();
    });
  });

  describe('Training Articles', () => {
    it('should always return undefined for training content (never saves position)', () => {
      // Act: Training articles never save position
      const position = getSavedPosition('training-1', 'training');

      // Assert: Always undefined
      expect(position).toBeUndefined();
    });
  });

  describe('Position Validation (Integration with playback.tsx logic)', () => {
    it('should work with getValidStartIndex to clamp out-of-bounds positions', () => {
      // This tests the integration between getSavedPosition and getValidStartIndex
      // from playback.tsx

      // Simulate getValidStartIndex logic from playback.tsx
      const getValidStartIndex = (
        savedIndex: number | undefined,
        totalWords: number
      ): number => {
        if (savedIndex === undefined || savedIndex < 0 || savedIndex >= totalWords) {
          return 0;
        }
        return savedIndex;
      };

      // Arrange: Content with position beyond word count
      const content = createImportedContentWithPosition(9999, { id: 'imported-5', wordCount: 100 });
      useContentStore.setState({ importedContent: [content] });

      // Act
      const rawPosition = getSavedPosition('imported-5', 'imported');
      const validPosition = getValidStartIndex(rawPosition, 100);

      // Assert: Position clamped to 0 (out of bounds)
      expect(rawPosition).toBe(9999);
      expect(validPosition).toBe(0);
    });

    it('should work with getValidStartIndex to accept valid positions', () => {
      const getValidStartIndex = (
        savedIndex: number | undefined,
        totalWords: number
      ): number => {
        if (savedIndex === undefined || savedIndex < 0 || savedIndex >= totalWords) {
          return 0;
        }
        return savedIndex;
      };

      // Arrange: Content with valid position
      const content = createImportedContentWithPosition(50, { id: 'imported-6', wordCount: 100 });
      useContentStore.setState({ importedContent: [content] });

      // Act
      const rawPosition = getSavedPosition('imported-6', 'imported');
      const validPosition = getValidStartIndex(rawPosition, 100);

      // Assert: Position accepted as-is
      expect(rawPosition).toBe(50);
      expect(validPosition).toBe(50);
    });
  });
});
