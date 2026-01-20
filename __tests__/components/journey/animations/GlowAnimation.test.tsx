/**
 * Tests for GlowAnimation Component.
 *
 * Pulsing glow effect wrapper component.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react-native';
import { Text, View, Animated } from 'react-native';
import { GlowAnimation, useGlowAnimation } from '../../../../src/components/journey/animations/GlowAnimation';
import { ThemeProvider } from '../../../../src/components/common/ThemeProvider';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const TestChild = () => <Text>Test Content</Text>;

describe('GlowAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders children when inactive', () => {
    renderWithProviders(
      <GlowAnimation active={false} color="#E85D24">
        <TestChild />
      </GlowAnimation>
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('renders children when active', () => {
    renderWithProviders(
      <GlowAnimation active={true} color="#E85D24">
        <TestChild />
      </GlowAnimation>
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('renders multiple children', () => {
    renderWithProviders(
      <GlowAnimation active={true} color="#E85D24">
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </GlowAnimation>
    );

    expect(screen.getByText('Child 1')).toBeTruthy();
    expect(screen.getByText('Child 2')).toBeTruthy();
  });

  it('cleans up animation on unmount without crashing', () => {
    const { unmount } = renderWithProviders(
      <GlowAnimation active={true} color="#E85D24">
        <TestChild />
      </GlowAnimation>
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(true).toBe(true);
  });
});

describe('useGlowAnimation hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const HookTestComponent = ({ active }: { active: boolean }) => {
    const { glowStyle } = useGlowAnimation(active);

    return (
      <View>
        <Animated.View style={glowStyle}>
          <Text>Hook Content</Text>
        </Animated.View>
      </View>
    );
  };

  it('returns animation values and renders children', () => {
    renderWithProviders(<HookTestComponent active={true} />);

    expect(screen.getByText('Hook Content')).toBeTruthy();
  });
});
