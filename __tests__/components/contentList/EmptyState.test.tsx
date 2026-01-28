/**
 * Tests for EmptyState component
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EmptyState } from '../../../src/components/contentList/EmptyState';
import { ThemeProvider } from '../../../src/components/common/ThemeProvider';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'empty.title': 'Your reading list is empty',
        'empty.subtitle': 'Add some content to get started',
        'actions.get_started': 'Get Started',
      };
      return translations[key] || key;
    },
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('EmptyState', () => {
  it('renders the empty state message', () => {
    const onAddContent = jest.fn();
    const { getByText } = renderWithProviders(<EmptyState onAddContent={onAddContent} />);

    expect(getByText('Your reading list is empty')).toBeTruthy();
    expect(getByText('Add some content to get started')).toBeTruthy();
  });

  it('renders the get started button', () => {
    const onAddContent = jest.fn();
    const { getByText } = renderWithProviders(<EmptyState onAddContent={onAddContent} />);

    expect(getByText('Get Started')).toBeTruthy();
  });

  it('calls onAddContent when button is pressed', () => {
    const onAddContent = jest.fn();
    const { getByText } = renderWithProviders(<EmptyState onAddContent={onAddContent} />);

    fireEvent.press(getByText('Get Started'));

    expect(onAddContent).toHaveBeenCalledTimes(1);
  });
});
