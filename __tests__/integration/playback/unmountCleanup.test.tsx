/**
 * Integration tests for unmount cleanup with refs.
 * Tests that reading positions are saved correctly on unmount using refs
 * to avoid stale closure bugs.
 */

import { useContentStore } from '../../../src/store/contentStore';
import { useGeneratedStore } from '../../../src/store/generatedStore';
import { useCurriculumStore } from '../../../src/store/curriculumStore';
import { savePosition } from '../../../src/utils/positionUtils';
import type { ContentSource } from '../../../src/types/contentList';
import {
  createMockContent,
  createGeneratedArticle,
  createCurriculum,
} from '../../helpers/testUtils';

describe('Unmount Cleanup Integration', () => {
  beforeEach(() => {
    // Reset all stores before each test
    useContentStore.setState({ importedContent: [], currentContentId: null });
    useGeneratedStore.setState({ articles: [] });
    useCurriculumStore.setState({ curricula: {} });
  });

  describe('Ref-Based State Capture', () => {
    it('should save position using ref values on unmount (avoids stale closures)', () => {
      // This tests the pattern from playback.tsx unmount cleanup:
      // useEffect(() => {
      //   return () => {
      //     const state = latestStateRef.current;
      //     savePosition(state.sourceId, state.source, state.currentIndex, state.progress);
      //   };
      // }, []);

      // Arrange: Initialize content
      const content = createMockContent({ id: 'imported-1', wordCount: 1000 });
      useContentStore.setState({ importedContent: [content] });

      // Simulate ref pattern (ref holds latest state, not closure state)
      const latestStateRef = {
        current: {
          currentIndex: 500,
          progress: 0.5,
          sourceId: 'imported-1',
          source: 'imported' as ContentSource,
          isComplete: false,
        }
      };

      // Act: Simulate unmount cleanup
      const state = latestStateRef.current;
      if (!state.isComplete && state.source !== 'training') {
        savePosition(state.sourceId, state.source, state.currentIndex, state.progress);
      }

      // Assert: Position saved from ref (not stale closure)
      const result = useContentStore.getState();
      expect(result.importedContent[0].currentWordIndex).toBe(500);
      expect(result.importedContent[0].readProgress).toBe(0.5);
    });

    it('should skip save if content was completed (ref indicates completion)', () => {
      // Arrange
      const content = createMockContent({ id: 'imported-2' });
      useContentStore.setState({ importedContent: [content] });

      // Ref shows completion
      const latestStateRef = {
        current: {
          currentIndex: 800,
          progress: 1,
          sourceId: 'imported-2',
          source: 'imported' as ContentSource,
          isComplete: true, // Completed!
        }
      };

      // Act: Unmount cleanup (should not save because isComplete)
      const state = latestStateRef.current;
      if (!state.isComplete && state.source !== 'training') {
        savePosition(state.sourceId, state.source, state.currentIndex, state.progress);
      }

      // Assert: No save occurred (position remains undefined)
      const result = useContentStore.getState();
      expect(result.importedContent[0].currentWordIndex).toBeUndefined();
    });

    it('should skip save for training content (ref indicates training source)', () => {
      // Arrange: Training content never persists
      const latestStateRef = {
        current: {
          currentIndex: 300,
          progress: 0.3,
          sourceId: 'training-1',
          source: 'training' as ContentSource,
          isComplete: false,
        }
      };

      // Act: Unmount cleanup (should not save because training)
      const state = latestStateRef.current;
      if (!state.isComplete && state.source !== 'training') {
        savePosition(state.sourceId, state.source, state.currentIndex, state.progress);
      }

      // Assert: No save occurred (stores remain empty)
      expect(useContentStore.getState().importedContent).toHaveLength(0);
    });
  });

  describe('Multiple State Updates (Ref Prevents Stale Closures)', () => {
    it('should use latest ref value, not closure value', () => {
      // This demonstrates why refs are needed: closure captures old state
      // but ref always points to latest

      // Arrange
      const content = createMockContent({ id: 'imported-3', wordCount: 1000 });
      useContentStore.setState({ importedContent: [content] });

      // Initial state (would be captured by closure)
      const latestStateRef = {
        current: {
          currentIndex: 100,
          progress: 0.1,
          sourceId: 'imported-3',
          source: 'imported' as ContentSource,
          isComplete: false,
        }
      };

      // Simulate playback progress (ref updated, closure would still see 100)
      latestStateRef.current = { ...latestStateRef.current, currentIndex: 500, progress: 0.5 };
      latestStateRef.current = { ...latestStateRef.current, currentIndex: 700, progress: 0.7 };
      latestStateRef.current = { ...latestStateRef.current, currentIndex: 900, progress: 0.9 };

      // Act: Unmount uses ref (gets latest value 900, not closure value 100)
      const state = latestStateRef.current;
      savePosition(state.sourceId, state.source, state.currentIndex, state.progress);

      // Assert: Latest value saved (900), not stale closure value (100)
      const result = useContentStore.getState();
      expect(result.importedContent[0].currentWordIndex).toBe(900);
      expect(result.importedContent[0].readProgress).toBe(0.9);
    });
  });

  describe('Unmount Cleanup for All Content Types', () => {
    it('should save imported content position on unmount', () => {
      // Arrange
      const content = createMockContent({ id: 'imported-4', wordCount: 800 });
      useContentStore.setState({ importedContent: [content] });

      const latestStateRef = {
        current: {
          currentIndex: 400,
          progress: 0.5,
          sourceId: 'imported-4',
          source: 'imported' as ContentSource,
          isComplete: false,
        }
      };

      // Act: Unmount cleanup
      const state = latestStateRef.current;
      if (!state.isComplete && state.source !== 'training') {
        savePosition(state.sourceId, state.source, state.currentIndex, state.progress);
      }

      // Assert
      const result = useContentStore.getState();
      expect(result.importedContent[0].currentWordIndex).toBe(400);
    });

    it('should save generated article position on unmount', () => {
      // Arrange
      const article = createGeneratedArticle({ id: 'gen-1', wordCount: 600 });
      useGeneratedStore.setState({ articles: [article] });

      const latestStateRef = {
        current: {
          currentIndex: 300,
          progress: 0.5,
          sourceId: 'gen-1',
          source: 'generated' as ContentSource,
          isComplete: false,
        }
      };

      // Act
      const state = latestStateRef.current;
      if (!state.isComplete && state.source !== 'training') {
        savePosition(state.sourceId, state.source, state.currentIndex);
      }

      // Assert
      const result = useGeneratedStore.getState();
      expect(result.articles[0].currentWordIndex).toBe(300);
    });

    it('should save curriculum article position on unmount', () => {
      // Arrange
      const curriculum = createCurriculum({ id: 'curr-1', articleCount: 3 });
      useCurriculumStore.setState({ curricula: { 'curr-1': curriculum } });

      const latestStateRef = {
        current: {
          currentIndex: 150,
          progress: 0.3,
          sourceId: 'curr-1:1',
          source: 'curriculum' as ContentSource,
          isComplete: false,
        }
      };

      // Act
      const state = latestStateRef.current;
      if (!state.isComplete && state.source !== 'training') {
        savePosition(state.sourceId, state.source, state.currentIndex);
      }

      // Assert
      const result = useCurriculumStore.getState();
      expect(result.curricula['curr-1'].articles[1].currentWordIndex).toBe(150);
    });
  });

  describe('Empty Dependency Array Pattern', () => {
    it('should match playback.tsx unmount cleanup pattern with empty deps', () => {
      // This verifies the pattern from playback.tsx:
      // useEffect(() => {
      //   return () => { /* cleanup using ref */ };
      // }, []); // Empty deps - only runs on unmount

      // The empty dependency array means:
      // 1. Effect runs once on mount
      // 2. Cleanup runs once on unmount
      // 3. Closure would capture initial state
      // 4. Ref avoids stale closure by holding latest state

      // Arrange
      const content = createMockContent({ id: 'imported-5', wordCount: 1000 });
      useContentStore.setState({ importedContent: [content] });

      // Simulate the ref being updated throughout component lifecycle
      const latestStateRef = {
        current: {
          currentIndex: 0, // Initial
          progress: 0,
          sourceId: 'imported-5',
          source: 'imported' as ContentSource,
          isComplete: false,
        }
      };

      // Component mounts, useEffect with empty deps runs, closure captures initial state
      // But ref is used in cleanup, so it will get latest value

      // Simulate updates during playback (ref updates, closure doesn't)
      latestStateRef.current = { ...latestStateRef.current, currentIndex: 250, progress: 0.25 };
      latestStateRef.current = { ...latestStateRef.current, currentIndex: 600, progress: 0.6 };

      // Component unmounts, cleanup runs
      // Cleanup uses ref (latest: 600), not closure (initial: 0)
      const state = latestStateRef.current;
      if (!state.isComplete && state.source !== 'training') {
        savePosition(state.sourceId, state.source, state.currentIndex, state.progress);
      }

      // Assert: Latest state saved, not initial closure state
      const result = useContentStore.getState();
      expect(result.importedContent[0].currentWordIndex).toBe(600);
      expect(result.importedContent[0].currentWordIndex).not.toBe(0); // NOT the closure value
    });
  });

  describe('Ref Update Integration', () => {
    it('should handle ref updates from multiple sources', () => {
      // Simulates playback.tsx where latestStateRef is updated from multiple places:
      // 1. engine.currentIndex changes
      // 2. isComplete changes
      // 3. engine.progress changes

      // Arrange
      const content = createMockContent({ id: 'imported-6', wordCount: 1000 });
      useContentStore.setState({ importedContent: [content] });

      const latestStateRef = {
        current: {
          currentIndex: 0,
          progress: 0,
          sourceId: 'imported-6',
          source: 'imported' as ContentSource,
          isComplete: false,
        }
      };

      // Simulate playback engine updates (like in playback.tsx useEffect)
      // useEffect(() => {
      //   latestStateRef.current = {
      //     currentIndex: engine.currentIndex, <-- updates frequently
      //     isComplete, <-- updates once at end
      //     progress: engine.progress, <-- updates frequently
      //     sourceId,
      //     source,
      //   };
      // }, [engine.currentIndex, isComplete, engine.progress, sourceId, source]);

      // Simulate frequent updates
      for (let i = 100; i <= 800; i += 100) {
        latestStateRef.current = {
          ...latestStateRef.current,
          currentIndex: i,
          progress: i / 1000,
        };
      }

      // Act: Unmount cleanup
      const state = latestStateRef.current;
      if (!state.isComplete && state.source !== 'training') {
        savePosition(state.sourceId, state.source, state.currentIndex, state.progress);
      }

      // Assert: Final ref value saved
      const result = useContentStore.getState();
      expect(result.importedContent[0].currentWordIndex).toBe(800);
      expect(result.importedContent[0].readProgress).toBe(0.8);
    });
  });
});
