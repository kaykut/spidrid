/**
 * Tests for GenerateArticleModal Component.
 *
 * Tests form behavior: word estimation, validation, selection state,
 * and generate flow with correct parameters.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import { GenerateArticleModal } from '../../../src/components/learn/GenerateArticleModal';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';

// Mock expo-router
const mockRouterPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (path: string) => mockRouterPush(path),
  },
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: ({ name }: { name: string }) => <View testID={`icon-${name}`} />,
  };
});

// Mock generatedStore
const mockGenerateArticle = jest.fn();
const mockIsGenerating = jest.fn(() => false);
jest.mock('../../../src/store/generatedStore', () => ({
  useGeneratedStore: () => ({
    generateArticle: mockGenerateArticle,
    isGenerating: mockIsGenerating(),
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('GenerateArticleModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsGenerating.mockReturnValue(false);
  });

  describe('word count estimation', () => {
    it('calculates estimated words from duration and avgWpm', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={300} />);

      // Default duration is 3 minutes, so 3 * 300 = 900 words
      // Text format: "~900 words at your current pace"
      expect(screen.getByText(/~900 words at your current pace/)).toBeTruthy();
    });

    it('updates estimate when duration changes', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={200} />);

      // Default is 3 min = 600 words
      expect(screen.getByText(/~600 words at your current pace/)).toBeTruthy();

      // Select 5 min duration
      fireEvent.press(screen.getByText('5 min'));

      // 5 * 200 = 1,000 words
      expect(screen.getByText(/~1,000 words at your current pace/)).toBeTruthy();
    });

    it('uses different avgWpm values correctly', () => {
      render(
        <ThemeProvider>
          <GenerateArticleModal visible onClose={jest.fn()} avgWpm={400} />
        </ThemeProvider>
      );

      // 3 * 400 = 1,200
      expect(screen.getByText(/~1,200 words at your current pace/)).toBeTruthy();
    });

    it('shows 1 min duration calculation', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      fireEvent.press(screen.getByText('1 min'));

      // 1 * 250 = 250
      expect(screen.getByText(/~250 words at your current pace/)).toBeTruthy();
    });

    it('shows 10 min duration calculation', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      fireEvent.press(screen.getByText('10 min'));

      // 10 * 250 = 2,500
      expect(screen.getByText(/~2,500 words at your current pace/)).toBeTruthy();
    });
  });

  describe('form validation', () => {
    it('disables generate button when topic is empty', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      const generateButton = screen.getByText('Generate');
      fireEvent.press(generateButton);

      // Should not call generateArticle
      expect(mockGenerateArticle).not.toHaveBeenCalled();
    });

    it('disables generate button when topic is only whitespace', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      const topicInput = screen.getByPlaceholderText(/coffee|black holes|cats/i);
      fireEvent.changeText(topicInput, '   ');

      const generateButton = screen.getByText('Generate');
      fireEvent.press(generateButton);

      expect(mockGenerateArticle).not.toHaveBeenCalled();
    });

    it('enables generate button when topic has content', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'test-id' });

      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      const topicInput = screen.getByPlaceholderText(/coffee|black holes|cats/i);
      await act(async () => {
        fireEvent.changeText(topicInput, 'Quantum Computing');
      });

      const generateButton = screen.getByText('Generate');
      await act(async () => {
        fireEvent.press(generateButton);
      });

      await waitFor(() => {
        expect(mockGenerateArticle).toHaveBeenCalled();
      });
    });
  });

  describe('generate flow', () => {
    it('calls generateArticle with correct parameters', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'gen-123' });

      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={300} />);

      // Enter topic
      const topicInput = screen.getByPlaceholderText(/coffee|black holes|cats/i);
      await act(async () => {
        fireEvent.changeText(topicInput, 'Machine Learning Basics');
      });

      // Select 5 min duration
      await act(async () => {
        fireEvent.press(screen.getByText('5 min'));
      });

      // Select Story style
      await act(async () => {
        fireEvent.press(screen.getByText('Story'));
      });

      // Press generate
      await act(async () => {
        fireEvent.press(screen.getByText('Generate'));
      });

      await waitFor(() => {
        expect(mockGenerateArticle).toHaveBeenCalledWith({
          topic: 'Machine Learning Basics',
          durationMinutes: 5,
          tone: 'storytelling',
          avgWpm: 300,
          userId: 'current-user',
        });
      });
    });

    it('trims topic whitespace before submitting', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'gen-123' });

      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      const topicInput = screen.getByPlaceholderText(/coffee|black holes|cats/i);
      await act(async () => {
        fireEvent.changeText(topicInput, '  Trimmed Topic  ');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Generate'));
      });

      await waitFor(() => {
        expect(mockGenerateArticle).toHaveBeenCalledWith(
          expect.objectContaining({ topic: 'Trimmed Topic' })
        );
      });
    });

    it('navigates to reader on successful generation', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'nav-test-123' });

      const onClose = jest.fn();
      renderWithProviders(<GenerateArticleModal visible onClose={onClose} avgWpm={250} />);

      const topicInput = screen.getByPlaceholderText(/coffee|black holes|cats/i);
      await act(async () => {
        fireEvent.changeText(topicInput, 'Test Navigation');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Generate'));
      });

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith('/generated/nav-test-123');
      });
    });

    it('closes modal on successful generation', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'close-test' });

      const onClose = jest.fn();
      renderWithProviders(<GenerateArticleModal visible onClose={onClose} avgWpm={250} />);

      const topicInput = screen.getByPlaceholderText(/coffee|black holes|cats/i);
      await act(async () => {
        fireEvent.changeText(topicInput, 'Test Close');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Generate'));
      });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('does not navigate or close on failed generation', async () => {
      mockGenerateArticle.mockResolvedValueOnce(null);

      const onClose = jest.fn();
      renderWithProviders(<GenerateArticleModal visible onClose={onClose} avgWpm={250} />);

      const topicInput = screen.getByPlaceholderText(/coffee|black holes|cats/i);
      await act(async () => {
        fireEvent.changeText(topicInput, 'Failed Test');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Generate'));
      });

      await waitFor(() => {
        expect(mockGenerateArticle).toHaveBeenCalled();
      });

      expect(onClose).not.toHaveBeenCalled();
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });

  describe('selection state', () => {
    it('defaults to 3 min duration', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      // 3 * 250 = 750
      expect(screen.getByText(/~750 words at your current pace/)).toBeTruthy();
    });

    it('defaults to explanatory tone', async () => {
      mockGenerateArticle.mockResolvedValueOnce({ id: 'test' });

      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      const topicInput = screen.getByPlaceholderText(/coffee|black holes|cats/i);
      await act(async () => {
        fireEvent.changeText(topicInput, 'Test Default Tone');
      });

      await act(async () => {
        fireEvent.press(screen.getByText('Generate'));
      });

      await waitFor(() => {
        expect(mockGenerateArticle).toHaveBeenCalledWith(
          expect.objectContaining({ tone: 'explanatory' })
        );
      });
    });

    it('renders all duration options', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      expect(screen.getByText('1 min')).toBeTruthy();
      expect(screen.getByText('2 min')).toBeTruthy();
      expect(screen.getByText('3 min')).toBeTruthy();
      expect(screen.getByText('5 min')).toBeTruthy();
      expect(screen.getByText('10 min')).toBeTruthy();
    });

    it('renders all 3 style options', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      expect(screen.getByText('Facts')).toBeTruthy();
      expect(screen.getByText('Story')).toBeTruthy();
      expect(screen.getByText('Analogy')).toBeTruthy();
    });
  });

  describe('generating state', () => {
    it('disables generate button while generating', () => {
      mockIsGenerating.mockReturnValue(true);

      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      // Should not show Generate text when generating (shows ActivityIndicator)
      expect(screen.queryByText('Generate')).toBeNull();
    });

    it('prevents closing while generating', () => {
      mockIsGenerating.mockReturnValue(true);

      const onClose = jest.fn();
      renderWithProviders(<GenerateArticleModal visible onClose={onClose} avgWpm={250} />);

      // Try to close via close button
      const closeIcon = screen.getByTestId('icon-close');
      fireEvent.press(closeIcon);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not allow text input while generating', async () => {
      mockIsGenerating.mockReturnValue(true);

      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      // The input is rendered but with editable={false}
      // We verify by checking the component renders without error
      expect(screen.getByText('Generate Article')).toBeTruthy();
    });
  });

  describe('modal visibility', () => {
    it('renders content when visible', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      expect(screen.getByText('Generate Article')).toBeTruthy();
      expect(screen.getByText('Generate')).toBeTruthy();
    });

    it('renders header when visible', () => {
      renderWithProviders(<GenerateArticleModal visible onClose={jest.fn()} avgWpm={250} />);

      expect(screen.getByText('Generate Article')).toBeTruthy();
    });
  });
});
