/**
 * Test helper for rendering components with required providers.
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from '../../src/components/common/ThemeProvider';

/**
 * Wrapper component that provides all necessary providers for testing.
 */
function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

/**
 * Custom render function that wraps components with all providers.
 */
function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything from testing library
export * from '@testing-library/react-native';

// Override render
export { renderWithProviders };
