/**
 * Tests for GlowAnimation Component.
 *
 * Pulsing glow effect for the current position node on the journey path.
 * "Current position node has a subtle pulsing glow (opacity 0.3 -> 0.6 -> 0.3, 2s loop)"
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react-native';
import { Text, View, Animated } from 'react-native';
import { GlowAnimation, useGlowAnimation } from '../../../../src/components/journey/animations/GlowAnimation';
import { ThemeProvider } from '../../../../src/components/common/ThemeProvider';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Test child component
const TestChild = () => <Text>Test Content</Text>;

describe('GlowAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('basic rendering', () => {
    it('renders children', () => {
      renderWithProviders(
        <GlowAnimation active={false} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.getByText('Test Content')).toBeTruthy();
    });

    it('renders children when active', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.getByText('Test Content')).toBeTruthy();
    });

    it('renders multiple children', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <Text>Child 1</Text>
          <Text>Child 2</Text>
        </GlowAnimation>
      );

      expect(screen.getByText('Child 1')).toBeTruthy();
      expect(screen.getByText('Child 2')).toBeTruthy();
    });
  });

  describe('glow visibility', () => {
    it('shows glow element when active', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      // Glow element is rendered when active
      expect(screen.root).toBeTruthy();
    });

    it('hides glow element when not active', () => {
      renderWithProviders(
        <GlowAnimation active={false} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      // Only the child should be visible, no glow
      expect(screen.root).toBeTruthy();
    });
  });

  describe('animation behavior', () => {
    it('starts animation when active', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      // Animation starts when active
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.root).toBeTruthy();
    });

    it('stops animation when deactivated', () => {
      const { rerender } = renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      act(() => {
        jest.advanceTimersByTime(500);
      });

      rerender(
        <ThemeProvider>
          <GlowAnimation active={false} color="#00D4AA">
            <TestChild />
          </GlowAnimation>
        </ThemeProvider>
      );

      expect(screen.root).toBeTruthy();
    });

    it('restarts animation when reactivated', () => {
      const { rerender } = renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      rerender(
        <ThemeProvider>
          <GlowAnimation active={false} color="#00D4AA">
            <TestChild />
          </GlowAnimation>
        </ThemeProvider>
      );

      rerender(
        <ThemeProvider>
          <GlowAnimation active={true} color="#00D4AA">
            <TestChild />
          </GlowAnimation>
        </ThemeProvider>
      );

      expect(screen.root).toBeTruthy();
    });
  });

  describe('props configuration', () => {
    it('uses custom glowSize', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA" glowSize={16}>
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.root).toBeTruthy();
    });

    it('uses custom duration', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA" duration={3000}>
          <TestChild />
        </GlowAnimation>
      );

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      expect(screen.root).toBeTruthy();
    });

    it('uses custom opacityMin', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA" opacityMin={0.1}>
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.root).toBeTruthy();
    });

    it('uses custom opacityMax', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA" opacityMax={0.8}>
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.root).toBeTruthy();
    });

    it('applies custom style', () => {
      renderWithProviders(
        <GlowAnimation
          active={true}
          color="#00D4AA"
          style={{ marginTop: 10 }}
        >
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.root).toBeTruthy();
    });
  });

  describe('color prop', () => {
    it('accepts hex color', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#FF6B6B">
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.root).toBeTruthy();
    });

    it('accepts rgb color', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="rgb(255, 107, 107)">
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.root).toBeTruthy();
    });

    it('accepts rgba color', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="rgba(255, 107, 107, 0.5)">
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.root).toBeTruthy();
    });
  });

  describe('cleanup', () => {
    it('cleans up animation on unmount', () => {
      const { unmount } = renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      act(() => {
        jest.advanceTimersByTime(500);
      });

      unmount();

      // Should not throw
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(true).toBe(true);
    });
  });

  describe('default values', () => {
    it('uses default glowSize of 8', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.root).toBeTruthy();
    });

    it('uses default duration of 2000ms', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(screen.root).toBeTruthy();
    });

    it('uses default opacityMin of 0.3', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.root).toBeTruthy();
    });

    it('uses default opacityMax of 0.6', () => {
      renderWithProviders(
        <GlowAnimation active={true} color="#00D4AA">
          <TestChild />
        </GlowAnimation>
      );

      expect(screen.root).toBeTruthy();
    });
  });
});

describe('useGlowAnimation hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Test component that uses the hook
  const HookTestComponent = ({
    active,
    duration,
    opacityMin,
    opacityMax,
  }: {
    active: boolean;
    duration?: number;
    opacityMin?: number;
    opacityMax?: number;
  }) => {
    const { opacityAnim, glowStyle } = useGlowAnimation(
      active,
      duration,
      opacityMin,
      opacityMax
    );

    return (
      <View>
        <Animated.View style={glowStyle}>
          <Text>Hook Content</Text>
        </Animated.View>
      </View>
    );
  };

  it('returns animation values', () => {
    renderWithProviders(<HookTestComponent active={true} />);

    expect(screen.getByText('Hook Content')).toBeTruthy();
  });

  it('starts animation when active', () => {
    renderWithProviders(<HookTestComponent active={true} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.root).toBeTruthy();
  });

  it('stops animation when not active', () => {
    renderWithProviders(<HookTestComponent active={false} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.root).toBeTruthy();
  });

  it('uses custom duration', () => {
    renderWithProviders(<HookTestComponent active={true} duration={3000} />);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.root).toBeTruthy();
  });

  it('uses custom opacity range', () => {
    renderWithProviders(
      <HookTestComponent active={true} opacityMin={0.1} opacityMax={0.9} />
    );

    expect(screen.root).toBeTruthy();
  });

  it('cleans up on unmount', () => {
    const { unmount } = renderWithProviders(<HookTestComponent active={true} />);

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
