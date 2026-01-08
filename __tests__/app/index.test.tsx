/**
 * Tests for Root Index Screen.
 *
 * Handles initial redirect based on onboarding state.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '../../src/app/index';

// Mock expo-router with proper React element
jest.mock('expo-router', () => {
  const { View } = require('react-native');
  return {
    Redirect: ({ href }: { href: string }) => (
      <View testID="redirect" accessibilityHint={href} />
    ),
  };
});

// Mock onboarding store with different states
let mockHasCompletedOnboarding = false;
let mockUsageMode = 'train';

jest.mock('../../src/store/onboardingStore', () => ({
  useOnboardingStore: () => ({
    hasCompletedOnboarding: mockHasCompletedOnboarding,
    usageMode: mockUsageMode,
  }),
}));

describe('Index', () => {
  beforeEach(() => {
    mockHasCompletedOnboarding = false;
    mockUsageMode = 'train';
  });

  it('redirects to onboarding when not completed', () => {
    mockHasCompletedOnboarding = false;

    const { getByTestId } = render(<Index />);
    const redirect = getByTestId('redirect');

    expect(redirect.props.accessibilityHint).toBe('/onboarding/purpose');
  });

  it('redirects to read tab for import-only mode', () => {
    mockHasCompletedOnboarding = true;
    mockUsageMode = 'import-only';

    const { getByTestId } = render(<Index />);
    const redirect = getByTestId('redirect');

    expect(redirect.props.accessibilityHint).toBe('/(tabs)/content/read');
  });

  it('redirects to train tab for train mode', () => {
    mockHasCompletedOnboarding = true;
    mockUsageMode = 'train';

    const { getByTestId } = render(<Index />);
    const redirect = getByTestId('redirect');

    expect(redirect.props.accessibilityHint).toBe('/(tabs)/content/train');
  });
});
