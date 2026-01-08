// @ts-nocheck - Test file with mock JSX elements
/**
 * Tests for Root Index Screen.
 *
 * Handles initial redirect based on onboarding state.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '../../src/app/index';

// Mock expo-router
jest.mock('expo-router', () => ({
  Redirect: ({ href }: { href: string }) => <mock-redirect testID="redirect" href={href} />,
}));

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

    expect(redirect.props.href).toBe('/onboarding/purpose');
  });

  it('redirects to read tab for import-only mode', () => {
    mockHasCompletedOnboarding = true;
    mockUsageMode = 'import-only';

    const { getByTestId } = render(<Index />);
    const redirect = getByTestId('redirect');

    expect(redirect.props.href).toBe('/(tabs)/read');
  });

  it('redirects to train tab for train mode', () => {
    mockHasCompletedOnboarding = true;
    mockUsageMode = 'train';

    const { getByTestId } = render(<Index />);
    const redirect = getByTestId('redirect');

    expect(redirect.props.href).toBe('/(tabs)/train');
  });
});
