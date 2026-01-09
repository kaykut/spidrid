/**
 * Tests for PulseAnimation Component.
 *
 * Subtle scale pulse effect wrapper component.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View, Animated } from 'react-native';
import { PulseAnimation, usePulseAnimation } from '../../../../src/components/journey/animations/PulseAnimation';
import { ThemeProvider } from '../../../../src/components/common/ThemeProvider';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const TestChild = () => <Text>42</Text>;

describe('PulseAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders children when not triggered', () => {
    renderWithProviders(
      <PulseAnimation trigger={false}>
        <TestChild />
      </PulseAnimation>
    );

    expect(screen.getByText('42')).toBeTruthy();
  });

  it('renders children when triggered', () => {
    renderWithProviders(
      <PulseAnimation trigger={true}>
        <TestChild />
      </PulseAnimation>
    );

    expect(screen.getByText('42')).toBeTruthy();
  });

  it('renders multiple children', () => {
    renderWithProviders(
      <PulseAnimation trigger={false}>
        <Text>VS:</Text>
        <Text>42</Text>
      </PulseAnimation>
    );

    expect(screen.getByText('VS:')).toBeTruthy();
    expect(screen.getByText('42')).toBeTruthy();
  });
});

describe('usePulseAnimation hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const HookTestComponent = () => {
    const { style } = usePulseAnimation();

    return (
      <View>
        <Animated.View style={style}>
          <Text>Hook Content</Text>
        </Animated.View>
      </View>
    );
  };

  it('returns animation values and renders children', () => {
    renderWithProviders(<HookTestComponent />);

    expect(screen.getByText('Hook Content')).toBeTruthy();
  });
});
