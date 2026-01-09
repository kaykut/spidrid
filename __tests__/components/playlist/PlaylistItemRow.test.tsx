/**
 * Tests for PlaylistItemRow Component
 *
 * Tests queue item display, double-tap to play, remove functionality,
 * and visual state (now playing indicator, progress).
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import { PlaylistItemRow } from '../../../src/components/playlist/PlaylistItemRow';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';
import { PlaylistItem } from '../../../src/types/playlist';

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
  };
});

const createMockItem = (overrides: Partial<PlaylistItem> = {}): PlaylistItem => ({
  id: 'item-1',
  contentId: 'content-1',
  source: 'training',
  title: 'Test Article Title',
  wordCount: 500,
  addedAt: Date.now(),
  progress: 0,
  ...overrides,
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('PlaylistItemRow', () => {
  const mockOnDoubleTap = jest.fn();
  const mockOnRemove = jest.fn();
  const mockOnDragStart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('rendering', () => {
    it('renders item title', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem()}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText('Test Article Title')).toBeTruthy();
    });

    it('renders word count', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem({ wordCount: 1500 })}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText('1,500 words')).toBeTruthy();
    });

    it('renders drag handle icon', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem()}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('icon-menu')).toBeTruthy();
    });

    it('renders remove button icon', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem()}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('icon-close-circle')).toBeTruthy();
    });
  });

  describe('progress display', () => {
    it('does not show progress when progress is 0', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem({ progress: 0 })}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.queryByText('0%')).toBeNull();
    });

    it('shows progress percentage when progress > 0', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem({ progress: 0.5 })}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText('50%')).toBeTruthy();
    });

    it('shows 100% when progress is complete', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem({ progress: 1 })}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText('100%')).toBeTruthy();
    });

    it('rounds progress to whole number', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem({ progress: 0.333 })}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText('33%')).toBeTruthy();
    });
  });

  describe('now playing state', () => {
    it('shows play icon when isNowPlaying is true', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem()}
          isNowPlaying={true}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('icon-play')).toBeTruthy();
    });

    it('does not show play icon when isNowPlaying is false', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem()}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.queryByTestId('icon-play')).toBeNull();
    });
  });

  describe('double-tap interaction', () => {
    it('triggers onDoubleTap when tapped twice quickly', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem()}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      const title = screen.getByText('Test Article Title');

      // First tap
      fireEvent.press(title);

      // Second tap within DOUBLE_TAP_DELAY (300ms)
      act(() => {
        jest.advanceTimersByTime(100);
      });
      fireEvent.press(title);

      expect(mockOnDoubleTap).toHaveBeenCalledTimes(1);
    });

    it('does not trigger onDoubleTap on single tap', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem()}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      const title = screen.getByText('Test Article Title');
      fireEvent.press(title);

      expect(mockOnDoubleTap).not.toHaveBeenCalled();
    });

    it('does not trigger onDoubleTap if second tap is too slow', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem()}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      const title = screen.getByText('Test Article Title');

      // First tap
      fireEvent.press(title);

      // Wait longer than DOUBLE_TAP_DELAY
      act(() => {
        jest.advanceTimersByTime(400);
      });

      // Second tap
      fireEvent.press(title);

      expect(mockOnDoubleTap).not.toHaveBeenCalled();
    });
  });

  describe('remove interaction', () => {
    it('triggers onRemove when remove button is pressed', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem()}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      const removeIcon = screen.getByTestId('icon-close-circle');
      const removeButton = removeIcon.parent;

      if (removeButton) {
        fireEvent.press(removeButton);
      }

      expect(mockOnRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('drag interaction', () => {
    it('triggers onDragStart on long press of drag handle', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem()}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
          onDragStart={mockOnDragStart}
        />
      );

      const dragIcon = screen.getByTestId('icon-menu');
      const dragHandle = dragIcon.parent;

      if (dragHandle) {
        fireEvent(dragHandle, 'longPress');
      }

      expect(mockOnDragStart).toHaveBeenCalledTimes(1);
    });
  });

  describe('source-specific styling', () => {
    it('renders training item correctly', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem({ source: 'training' })}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText('Test Article Title')).toBeTruthy();
    });

    it('renders reading item correctly', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem({ source: 'reading' })}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText('Test Article Title')).toBeTruthy();
    });

    it('renders learning item correctly', () => {
      renderWithProviders(
        <PlaylistItemRow
          item={createMockItem({ source: 'learning' })}
          isNowPlaying={false}
          onDoubleTap={mockOnDoubleTap}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText('Test Article Title')).toBeTruthy();
    });
  });
});
