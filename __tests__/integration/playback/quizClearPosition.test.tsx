/**
 * Integration tests for position clearing after quiz completion.
 * Tests that reading positions are cleared after completing quizzes
 * so content starts fresh on next read.
 */

import { useContentStore } from '../../../src/store/contentStore';
import { useGeneratedStore } from '../../../src/store/generatedStore';
import { useCurriculumStore } from '../../../src/store/curriculumStore';
import { clearPosition } from '../../../src/utils/positionUtils';
import {
  createImportedContentWithPosition,
  createGeneratedArticleWithPosition,
  createCurriculumWithPosition,
} from '../../helpers/testUtils';

describe('Quiz Clear Position Integration', () => {
  beforeEach(() => {
    // Reset all stores before each test
    useContentStore.setState({ importedContent: [], currentContentId: null });
    useGeneratedStore.setState({ articles: [] });
    useCurriculumStore.setState({ curricula: {} });
  });

  describe('Generated Articles', () => {
    it('should clear position after quiz completion', () => {
      // Arrange: User read to word 500
      const article = createGeneratedArticleWithPosition(500, { id: 'gen-1', wordCount: 1000 });
      useGeneratedStore.setState({ articles: [article] });

      // Act: Complete quiz (clear position)
      clearPosition('gen-1', 'generated');

      // Assert: Position cleared to undefined
      const state = useGeneratedStore.getState();
      expect(state.articles[0].currentWordIndex).toBeUndefined();
    });

    it('should allow next read to start from beginning after quiz', () => {
      // Arrange: Article with position at word 300
      const article = createGeneratedArticleWithPosition(300, { id: 'gen-2' });
      useGeneratedStore.setState({ articles: [article] });

      // Act: Clear position after quiz
      clearPosition('gen-2', 'generated');

      // Assert: Position is undefined (will start at 0 on next read)
      const state = useGeneratedStore.getState();
      expect(state.articles[0].currentWordIndex).toBeUndefined();
    });

    it('should handle clearing position that was already undefined', () => {
      // Arrange: Fresh article never read
      const article = createGeneratedArticleWithPosition(0, { id: 'gen-3', currentWordIndex: undefined });
      useGeneratedStore.setState({ articles: [article] });

      // Act: Clear position (idempotent operation)
      clearPosition('gen-3', 'generated');

      // Assert: Position remains undefined (no error)
      const state = useGeneratedStore.getState();
      expect(state.articles[0].currentWordIndex).toBeUndefined();
    });
  });

  describe('Curriculum Articles', () => {
    it('should clear position after curriculum article quiz completion', () => {
      // Arrange: Article 1 read to word 250
      const curriculum = createCurriculumWithPosition(1, 250, { id: 'curr-1', articleCount: 3 });
      useCurriculumStore.setState({ curricula: { 'curr-1': curriculum } });

      // Act: Complete quiz for article 1
      clearPosition('curr-1:1', 'curriculum');

      // Assert: Position cleared for article 1
      const state = useCurriculumStore.getState();
      expect(state.curricula['curr-1'].articles[1].currentWordIndex).toBeUndefined();
    });

    it('should clear only the specific article position, not others', () => {
      // Arrange: Multiple articles with positions
      const curriculum = createCurriculumWithPosition(1, 250, { id: 'curr-2', articleCount: 5 });
      curriculum.articles[2] = { ...curriculum.articles[2], currentWordIndex: 100 };
      curriculum.articles[3] = { ...curriculum.articles[3], currentWordIndex: 75 };
      useCurriculumStore.setState({ curricula: { 'curr-2': curriculum } });

      // Act: Clear position for article 1 only
      clearPosition('curr-2:1', 'curriculum');

      // Assert: Article 1 cleared, others unchanged
      const state = useCurriculumStore.getState();
      expect(state.curricula['curr-2'].articles[1].currentWordIndex).toBeUndefined();
      expect(state.curricula['curr-2'].articles[2].currentWordIndex).toBe(100);
      expect(state.curricula['curr-2'].articles[3].currentWordIndex).toBe(75);
    });

    it('should handle invalid curriculum sourceId gracefully', () => {
      // Arrange: Empty store
      useCurriculumStore.setState({ curricula: {} });

      // Act: Attempt to clear position with invalid sourceId
      // Should not throw error
      expect(() => {
        clearPosition('invalid-format', 'curriculum');
      }).not.toThrow();

      // Assert: Store remains empty
      expect(Object.keys(useCurriculumStore.getState().curricula)).toHaveLength(0);
    });
  });

  describe('Imported Content', () => {
    it('should clear position for imported content', () => {
      // Arrange: Imported article read to 60%
      const content = createImportedContentWithPosition(600, {
        id: 'imported-1',
        wordCount: 1000,
        readProgress: 0.6,
      });
      useContentStore.setState({ importedContent: [content] });

      // Act: Clear position (sets to undefined, progress to 1)
      clearPosition('imported-1', 'imported');

      // Assert: Position cleared, progress marked complete
      const state = useContentStore.getState();
      expect(state.importedContent[0].currentWordIndex).toBeUndefined();
      expect(state.importedContent[0].readProgress).toBe(1);
    });

    it('should mark progress as complete when clearing imported content position', () => {
      // Arrange: Partially read content
      const content = createImportedContentWithPosition(200, {
        id: 'imported-2',
        readProgress: 0.2,
      });
      useContentStore.setState({ importedContent: [content] });

      // Act: Clear position
      clearPosition('imported-2', 'imported');

      // Assert: Progress is 1 (complete), position is undefined
      const state = useContentStore.getState();
      expect(state.importedContent[0].readProgress).toBe(1);
      expect(state.importedContent[0].currentWordIndex).toBeUndefined();
    });
  });

  describe('Training Content', () => {
    it('should not persist training content positions (no-op)', () => {
      // Arrange: Training content never persists
      // No store setup needed

      // Act: Attempt to clear training position
      expect(() => {
        clearPosition('training-1', 'training');
      }).not.toThrow();

      // Assert: Stores remain empty (training is never persisted)
      expect(useContentStore.getState().importedContent).toHaveLength(0);
      expect(useGeneratedStore.getState().articles).toHaveLength(0);
      expect(Object.keys(useCurriculumStore.getState().curricula)).toHaveLength(0);
    });
  });

  describe('Integration with playback-quiz.tsx', () => {
    it('should match the quiz completion pattern for generated articles', () => {
      // This tests the pattern used in playback-quiz.tsx:
      // updateArticleProgress(sourceId, {
      //   completed: true,
      //   comprehensionScore: score,
      //   highestWPM: readingWPM,
      //   lastReadAt: Date.now(),
      // });
      // clearPosition(sourceId, source);

      // Arrange: User just finished reading generated article
      const article = createGeneratedArticleWithPosition(800, {
        id: 'gen-quiz-1',
        wordCount: 800,
      });
      useGeneratedStore.setState({ articles: [article] });

      // Act: Simulate quiz completion (like playback-quiz.tsx)
      const { updateArticleProgress } = useGeneratedStore.getState();
      updateArticleProgress('gen-quiz-1', {
        completed: true,
        comprehensionScore: 85,
        highestWPM: 350,
        lastReadAt: Date.now(),
      });
      clearPosition('gen-quiz-1', 'generated');

      // Assert: Article marked complete, position cleared
      const state = useGeneratedStore.getState();
      expect(state.articles[0].completed).toBe(true);
      expect(state.articles[0].comprehensionScore).toBe(85);
      expect(state.articles[0].currentWordIndex).toBeUndefined();
    });

    it('should match the quiz completion pattern for curriculum articles', () => {
      // Arrange: User just finished reading curriculum article
      const curriculum = createCurriculumWithPosition(0, 500, {
        id: 'curr-quiz-1',
        articleCount: 3,
      });
      useCurriculumStore.setState({ curricula: { 'curr-quiz-1': curriculum } });

      // Act: Simulate quiz completion
      const { markArticleCompleted } = useCurriculumStore.getState();
      markArticleCompleted('curr-quiz-1', 0, 90, 400);
      clearPosition('curr-quiz-1:0', 'curriculum');

      // Assert: Article marked complete, position cleared
      const state = useCurriculumStore.getState();
      const article = state.curricula['curr-quiz-1'].articles[0];
      expect(article.completionStatus).toBe('completed');
      expect(article.comprehensionScore).toBe(90);
      expect(article.readingWPM).toBe(400);
      expect(article.currentWordIndex).toBeUndefined();
    });
  });

  describe('Retake Quiz Scenarios', () => {
    it('should allow retaking quiz without restoring old position', () => {
      // Arrange: User completed article and quiz, position cleared
      const article = createGeneratedArticleWithPosition(0, {
        id: 'gen-retake-1',
        currentWordIndex: undefined,
        completed: true,
        comprehensionScore: 70,
      });
      useGeneratedStore.setState({ articles: [article] });

      // Act: User reads again (position starts at 0 since cleared)
      // Then completes again and clears
      const { updateArticleProgress } = useGeneratedStore.getState();
      updateArticleProgress('gen-retake-1', {
        comprehensionScore: 85, // Improved score
      });
      clearPosition('gen-retake-1', 'generated');

      // Assert: Position remains cleared for next attempt
      const state = useGeneratedStore.getState();
      expect(state.articles[0].currentWordIndex).toBeUndefined();
      expect(state.articles[0].comprehensionScore).toBe(85);
    });
  });
});
