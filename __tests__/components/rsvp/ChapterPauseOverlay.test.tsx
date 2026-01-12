/**
 * Tests for ChapterPauseOverlay component
 *
 * Tests the overlay that appears when RSVP playback reaches a chapter break.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../../helpers/renderWithProviders';
import { ChapterPauseOverlay } from '../../../src/components/rsvp/ChapterPauseOverlay';
import { ChapterPauseInfo } from '../../../src/types/playback';

// =============================================================================
// Test Helpers
// =============================================================================

function createChapterInfo(overrides: Partial<ChapterPauseInfo> = {}): ChapterPauseInfo {
  return {
    title: 'Introduction to Testing',
    index: 1,
    ...overrides,
  };
}

// =============================================================================
// Test Suite
// =============================================================================

describe('ChapterPauseOverlay', () => {
  // ===========================================================================
  // Rendering
  // ===========================================================================

  describe('rendering', () => {
    it('displays chapter label with index', () => {
      const chapter = createChapterInfo({ index: 3 });
      const { getByText } = renderWithProviders(
        <ChapterPauseOverlay chapter={chapter} onContinue={jest.fn()} />
      );

      expect(getByText('Chapter 3')).toBeTruthy();
    });

    it('displays chapter title', () => {
      const chapter = createChapterInfo({ title: 'The Scientific Method' });
      const { getByText } = renderWithProviders(
        <ChapterPauseOverlay chapter={chapter} onContinue={jest.fn()} />
      );

      expect(getByText('The Scientific Method')).toBeTruthy();
    });

    it('displays continue button', () => {
      const chapter = createChapterInfo();
      const { getByText } = renderWithProviders(
        <ChapterPauseOverlay chapter={chapter} onContinue={jest.fn()} />
      );

      expect(getByText('Continue Reading')).toBeTruthy();
    });
  });

  // ===========================================================================
  // Interactions
  // ===========================================================================

  describe('interactions', () => {
    it('calls onContinue when continue button is pressed', () => {
      const onContinue = jest.fn();
      const chapter = createChapterInfo();
      const { getByText } = renderWithProviders(
        <ChapterPauseOverlay chapter={chapter} onContinue={onContinue} />
      );

      fireEvent.press(getByText('Continue Reading'));

      expect(onContinue).toHaveBeenCalledTimes(1);
    });
  });

  // ===========================================================================
  // Edge Cases
  // ===========================================================================

  describe('edge cases', () => {
    it('handles long chapter titles', () => {
      const chapter = createChapterInfo({
        title: 'This is an extremely long chapter title that should be truncated properly on the UI to prevent layout issues',
      });
      const { getByText } = renderWithProviders(
        <ChapterPauseOverlay chapter={chapter} onContinue={jest.fn()} />
      );

      expect(getByText(chapter.title)).toBeTruthy();
    });

    it('handles chapter index of 1', () => {
      const chapter = createChapterInfo({ index: 1 });
      const { getByText } = renderWithProviders(
        <ChapterPauseOverlay chapter={chapter} onContinue={jest.fn()} />
      );

      expect(getByText('Chapter 1')).toBeTruthy();
    });

    it('handles large chapter index', () => {
      const chapter = createChapterInfo({ index: 99 });
      const { getByText } = renderWithProviders(
        <ChapterPauseOverlay chapter={chapter} onContinue={jest.fn()} />
      );

      expect(getByText('Chapter 99')).toBeTruthy();
    });

    it('handles empty title', () => {
      const chapter = createChapterInfo({ title: '' });
      const { getByText } = renderWithProviders(
        <ChapterPauseOverlay chapter={chapter} onContinue={jest.fn()} />
      );

      // Component should still render with empty title
      expect(getByText('Chapter 1')).toBeTruthy();
      expect(getByText('Continue Reading')).toBeTruthy();
    });
  });
});
