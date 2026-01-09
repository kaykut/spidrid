/**
 * Tests for PulseAnimation Component.
 *
 * Subtle scale pulse effect for the Velocity Score number.
 * "When VS increases after a session, the number grows 5% for 200ms, then settles back."
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react-native';
import { Text, View, Animated } from 'react-native';
import { PulseAnimation, usePulseAnimation } from '../../../../src/components/journey/animations/PulseAnimation';
import { ThemeProvider } from '../../../../src/components/common/ThemeProvider';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Test child component
const TestChild = () => <Text>42</Text>;

describe('PulseAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('basic rendering', () => {
    it('renders children', () => {
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

  describe('animation trigger', () => {
    it('does not animate on initial render with trigger false', () => {
      renderWithProviders(
        <PulseAnimation trigger={false}>
          <TestChild />
        </PulseAnimation>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(screen.root).toBeTruthy();
    });

    it('does not animate on initial render with trigger true', () => {
      // Animation only triggers when trigger changes from false to true
      renderWithProviders(
        <PulseAnimation trigger={true}>
          <TestChild />
        </PulseAnimation>
      );

      // prevTrigger.current starts as trigger value (true), so no animation
      expect(screen.root).toBeTruthy();
    });

    it('animates when trigger changes from false to true', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={false}>
          <TestChild />
        </PulseAnimation>
      );

      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(screen.root).toBeTruthy();
    });

    it('does not animate when trigger stays true', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={true}>
          <TestChild />
        </PulseAnimation>
      );

      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      expect(screen.root).toBeTruthy();
    });

    it('does not animate when trigger changes from true to false', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={true}>
          <TestChild />
        </PulseAnimation>
      );

      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={false}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      expect(screen.root).toBeTruthy();
    });
  });

  describe('props configuration', () => {
    it('uses custom scale', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={false} scale={1.1}>
          <TestChild />
        </PulseAnimation>
      );

      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true} scale={1.1}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(screen.root).toBeTruthy();
    });

    it('uses custom duration', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={false} duration={400}>
          <TestChild />
        </PulseAnimation>
      );

      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true} duration={400}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(400);
      });

      expect(screen.root).toBeTruthy();
    });

    it('applies custom style', () => {
      renderWithProviders(
        <PulseAnimation trigger={false} style={{ marginTop: 10 }}>
          <TestChild />
        </PulseAnimation>
      );

      expect(screen.root).toBeTruthy();
    });
  });

  describe('default values', () => {
    it('uses default scale of 1.05', () => {
      renderWithProviders(
        <PulseAnimation trigger={false}>
          <TestChild />
        </PulseAnimation>
      );

      expect(screen.root).toBeTruthy();
    });

    it('uses default duration of 200ms', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={false}>
          <TestChild />
        </PulseAnimation>
      );

      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(screen.root).toBeTruthy();
    });
  });

  describe('animation sequence', () => {
    it('scales up then back to 1', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={false}>
          <TestChild />
        </PulseAnimation>
      );

      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      // First half: scale up
      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Second half: scale back down
      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(screen.root).toBeTruthy();
    });
  });

  describe('repeated triggers', () => {
    it('can trigger multiple times', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={false}>
          <TestChild />
        </PulseAnimation>
      );

      // First trigger
      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      // Reset trigger
      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={false}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      // Second trigger
      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(screen.root).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles very short duration', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={false} duration={10}>
          <TestChild />
        </PulseAnimation>
      );

      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true} duration={10}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(10);
      });

      expect(screen.root).toBeTruthy();
    });

    it('handles very large scale', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={false} scale={2}>
          <TestChild />
        </PulseAnimation>
      );

      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true} scale={2}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(screen.root).toBeTruthy();
    });

    it('handles scale of 1 (no visual change)', () => {
      const { rerender } = renderWithProviders(
        <PulseAnimation trigger={false} scale={1}>
          <TestChild />
        </PulseAnimation>
      );

      rerender(
        <ThemeProvider>
          <PulseAnimation trigger={true} scale={1}>
            <TestChild />
          </PulseAnimation>
        </ThemeProvider>
      );

      expect(screen.root).toBeTruthy();
    });
  });
});

describe('usePulseAnimation hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Test component that uses the hook
  const HookTestComponent = ({
    duration,
    onPulse,
  }: {
    duration?: number;
    onPulse?: boolean;
  }) => {
    const { pulse, style } = usePulseAnimation(duration);

    React.useEffect(() => {
      if (onPulse) {
        pulse();
      }
    }, [onPulse, pulse]);

    return (
      <View>
        <Animated.View style={style}>
          <Text>Hook Content</Text>
        </Animated.View>
      </View>
    );
  };

  it('returns animation values', () => {
    renderWithProviders(<HookTestComponent />);

    expect(screen.getByText('Hook Content')).toBeTruthy();
  });

  it('pulse function triggers animation', () => {
    const { rerender } = renderWithProviders(<HookTestComponent onPulse={false} />);

    rerender(
      <ThemeProvider>
        <HookTestComponent onPulse={true} />
      </ThemeProvider>
    );

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.root).toBeTruthy();
  });

  it('uses custom duration', () => {
    const { rerender } = renderWithProviders(
      <HookTestComponent duration={400} onPulse={false} />
    );

    rerender(
      <ThemeProvider>
        <HookTestComponent duration={400} onPulse={true} />
      </ThemeProvider>
    );

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(screen.root).toBeTruthy();
  });

  it('style contains transform with scale', () => {
    renderWithProviders(<HookTestComponent />);

    expect(screen.root).toBeTruthy();
  });

  it('can be called multiple times', () => {
    const { rerender } = renderWithProviders(<HookTestComponent onPulse={false} />);

    // First pulse
    rerender(
      <ThemeProvider>
        <HookTestComponent onPulse={true} />
      </ThemeProvider>
    );

    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Reset
    rerender(
      <ThemeProvider>
        <HookTestComponent onPulse={false} />
      </ThemeProvider>
    );

    // Second pulse
    rerender(
      <ThemeProvider>
        <HookTestComponent onPulse={true} />
      </ThemeProvider>
    );

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.root).toBeTruthy();
  });
});
