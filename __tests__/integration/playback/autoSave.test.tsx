/**
 * Integration tests for periodic auto-save during playback.
 * Tests that reading positions are automatically saved every 15 seconds while playing.
 */

import { useContentStore } from '../../../src/store/contentStore';
import { useGeneratedStore } from '../../../src/store/generatedStore';
import { useCurriculumStore } from '../../../src/store/curriculumStore';
import { savePosition, AUTO_SAVE_INTERVAL_MS } from '../../../src/utils/positionUtils';
import {
  createMockContent,
  createGeneratedArticle,
  createCurriculum,
} from '../../helpers/testUtils';

// Mock timers for testing intervals
jest.useFakeTimers();

describe('Auto-Save Integration', () => {
  beforeEach(() => {
    // Reset all stores before each test
    useContentStore.setState({ importedContent: [], currentContentId: null });
    useGeneratedStore.setState({ articles: [] });
    useCurriculumStore.setState({ curricula: {} });

    // Clear all timers
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    // Restore real timers
    jest.useRealTimers();
  });

  describe('Imported Content', () => {
    it('should auto-save position every 15 seconds while playing', () => {
      // Arrange: Fresh imported content
      const content = createMockContent({ id: 'imported-1', wordCount: 1000 });
      useContentStore.setState({ importedContent: [content] });

      // Simulate playback loop saving position every 15 seconds
      let currentIndex = 0;
      const saveInterval = setInterval(() => {
        currentIndex += 100; // Simulate reading 100 words per interval
        savePosition('imported-1', 'imported', currentIndex, currentIndex / 1000);
      }, AUTO_SAVE_INTERVAL_MS);

      // Act: Fast-forward time by 15 seconds
      jest.advanceTimersByTime(AUTO_SAVE_INTERVAL_MS);

      // Assert: Position saved once at word 100
      const state1 = useContentStore.getState();
      expect(state1.importedContent[0].currentWordIndex).toBe(100);

      // Act: Fast-forward another 15 seconds
      jest.advanceTimersByTime(AUTO_SAVE_INTERVAL_MS);

      // Assert: Position saved again at word 200
      const state2 = useContentStore.getState();
      expect(state2.importedContent[0].currentWordIndex).toBe(200);

      // Act: Fast-forward 45 seconds total (3 more intervals)
      jest.advanceTimersByTime(AUTO_SAVE_INTERVAL_MS * 3);


      // Assert: Position saved 3 more times, now at word 500
      const state3 = useContentStore.getState();
      expect(state3.importedContent[0].currentWordIndex).toBe(500);

      clearInterval(saveInterval);
    });

    it('should save correct progress ratio alongside position', () => {
      // Arrange
      const content = createMockContent({ id: 'imported-2', wordCount: 1000 });
      useContentStore.setState({ importedContent: [content] });

      // Act: Save at word 500 of 1000
      savePosition('imported-2', 'imported', 500, 0.5);

      // Assert: Both position and progress saved
      const state = useContentStore.getState();
      expect(state.importedContent[0].currentWordIndex).toBe(500);
      expect(state.importedContent[0].readProgress).toBe(0.5);
    });
  });

  describe('Generated Articles', () => {
    it('should auto-save position every 15 seconds for generated articles', () => {
      // Arrange
      const article = createGeneratedArticle({ id: 'gen-1', wordCount: 800 });
      useGeneratedStore.setState({ articles: [article] });

      // Simulate playback
      let currentIndex = 0;
      const saveInterval = setInterval(() => {
        currentIndex += 80;
        savePosition('gen-1', 'generated', currentIndex);
      }, AUTO_SAVE_INTERVAL_MS);

      // Act: Fast-forward 30 seconds (2 saves)
      jest.advanceTimersByTime(AUTO_SAVE_INTERVAL_MS * 2);


      // Assert: Saved twice at word 160
      const state = useGeneratedStore.getState();
      expect(state.articles[0].currentWordIndex).toBe(160);

      clearInterval(saveInterval);
    });
  });

  describe('Curriculum Articles', () => {
    it('should auto-save position for curriculum articles', () => {
      // Arrange
      const curriculum = createCurriculum({ id: 'curr-1', articleCount: 3 });
      useCurriculumStore.setState({ curricula: { 'curr-1': curriculum } });

      // Simulate playback of article 1
      let currentIndex = 0;
      const saveInterval = setInterval(() => {
        currentIndex += 50;
        savePosition('curr-1:1', 'curriculum', currentIndex);
      }, AUTO_SAVE_INTERVAL_MS);

      // Act: Fast-forward 15 seconds
      jest.advanceTimersByTime(AUTO_SAVE_INTERVAL_MS);


      // Assert: Position saved at word 50 for article 1
      const state = useCurriculumStore.getState();
      expect(state.curricula['curr-1'].articles[1].currentWordIndex).toBe(50);

      clearInterval(saveInterval);
    });
  });

  describe('Training Articles', () => {
    it('should NOT auto-save position for training content', () => {
      // Arrange: No training content in store (it never persists)
      // Training content is ephemeral and doesn't use stores

      // Simulate playback
      let currentIndex = 0;
      const saveInterval = setInterval(() => {
        currentIndex += 100;
        savePosition('training-1', 'training', currentIndex);
      }, AUTO_SAVE_INTERVAL_MS);

      // Act: Fast-forward 30 seconds (2 attempted saves)
      jest.advanceTimersByTime(AUTO_SAVE_INTERVAL_MS * 2);


      // Assert: No position saved (training content is never persisted)
      // Stores remain empty
      expect(useContentStore.getState().importedContent).toHaveLength(0);
      expect(useGeneratedStore.getState().articles).toHaveLength(0);
      expect(Object.keys(useCurriculumStore.getState().curricula)).toHaveLength(0);

      clearInterval(saveInterval);
    });
  });

  describe('Auto-Save Behavior', () => {
    it('should use AUTO_SAVE_INTERVAL_MS constant (15000ms)', () => {
      expect(AUTO_SAVE_INTERVAL_MS).toBe(15000);
    });

    it('should save position at word 0 if starting from beginning', () => {
      // Arrange
      const content = createMockContent({ id: 'imported-3' });
      useContentStore.setState({ importedContent: [content] });

      // Act: Save at very start
      savePosition('imported-3', 'imported', 0, 0);

      // Assert: Position saved as 0 (not undefined)
      const state = useContentStore.getState();
      expect(state.importedContent[0].currentWordIndex).toBe(0);
    });

    it('should handle rapid successive saves (last write wins)', () => {
      // Arrange
      const content = createMockContent({ id: 'imported-4' });
      useContentStore.setState({ importedContent: [content] });

      // Act: Multiple rapid saves
      savePosition('imported-4', 'imported', 100, 0.1);
      savePosition('imported-4', 'imported', 200, 0.2);
      savePosition('imported-4', 'imported', 300, 0.3);

      // Assert: Last save wins
      const state = useContentStore.getState();
      expect(state.importedContent[0].currentWordIndex).toBe(300);
      expect(state.importedContent[0].readProgress).toBe(0.3);
    });

    it('should continue saving across multiple intervals without gaps', () => {
      // Arrange
      const article = createGeneratedArticle({ id: 'gen-2', wordCount: 1000 });
      useGeneratedStore.setState({ articles: [article] });

      // Simulate continuous playback
      let currentIndex = 0;
      const saveInterval = setInterval(() => {
        currentIndex += 50;
        savePosition('gen-2', 'generated', currentIndex);
      }, AUTO_SAVE_INTERVAL_MS);

      // Act: Fast-forward through 5 intervals (75 seconds)
      jest.advanceTimersByTime(AUTO_SAVE_INTERVAL_MS * 5);


      // Assert: Position progressed smoothly to word 250
      const state = useGeneratedStore.getState();
      expect(state.articles[0].currentWordIndex).toBe(250);

      clearInterval(saveInterval);
    });
  });

  describe('Integration with playback.tsx auto-save logic', () => {
    it('should match the auto-save interval pattern from playback.tsx', () => {
      // This test verifies the integration pattern used in playback.tsx:
      // const saveInterval = setInterval(() => {
      //   const state = latestStateRef.current;
      //   savePosition(sourceId, source, state.currentIndex, state.progress);
      // }, AUTO_SAVE_INTERVAL_MS);

      // Arrange: Initialize content in store
      const content = createMockContent({ id: 'imported-5', wordCount: 1000 });
      useContentStore.setState({ importedContent: [content] });

      // Simulate playback.tsx pattern with ref
      const latestStateRef = {
        current: { currentIndex: 0, progress: 0, sourceId: 'imported-5', source: 'imported' as const }
      };

      const saveInterval = setInterval(() => {
        const state = latestStateRef.current;
        savePosition(state.sourceId, state.source, state.currentIndex, state.progress);
      }, AUTO_SAVE_INTERVAL_MS);

      // Simulate playback advancing
      latestStateRef.current = { ...latestStateRef.current, currentIndex: 100, progress: 0.1 };
      jest.advanceTimersByTime(AUTO_SAVE_INTERVAL_MS);

      // Assert: Position saved using ref values
      let state = useContentStore.getState();
      expect(state.importedContent[0].currentWordIndex).toBe(100);

      // Act: Continue playback
      latestStateRef.current = { ...latestStateRef.current, currentIndex: 200, progress: 0.2 };
      jest.advanceTimersByTime(AUTO_SAVE_INTERVAL_MS);


      // Assert: Updated position saved
      state = useContentStore.getState();
      expect(state.importedContent[0].currentWordIndex).toBe(200);

      clearInterval(saveInterval);
    });
  });
});
