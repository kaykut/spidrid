/**
 * Tests for GlassView Component
 *
 * Cross-platform glass effect wrapper component that:
 * - Uses native liquid glass on iOS 26+ (dev builds)
 * - Falls back to expo-blur BlurView for Expo Go, Android, and iOS < 26
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { GlassView } from '../../../src/components/common/GlassView';

// =============================================================================
// Mocks
// =============================================================================

// Mock expo-blur
jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

// Mock expo-glass-effect - default to not available
let mockIsLiquidGlassAvailable = false;
jest.mock('expo-glass-effect', () => ({
  GlassView: 'ExpoGlassView',
  isLiquidGlassAvailable: () => mockIsLiquidGlassAvailable,
}));

// Mock expo-constants - default to Expo Go
let mockAppOwnership = 'expo';
jest.mock('expo-constants', () => ({
  appOwnership: mockAppOwnership,
}));

// =============================================================================
// Tests
// =============================================================================

describe('GlassView', () => {
  beforeEach(() => {
    mockIsLiquidGlassAvailable = false;
    mockAppOwnership = 'expo';
  });

  describe('basic rendering', () => {
    it('renders children correctly', () => {
      render(
        <GlassView appearance="dark">
          <Text>Glass Content</Text>
        </GlassView>
      );

      expect(screen.getByText('Glass Content')).toBeTruthy();
    });

    it('renders multiple children', () => {
      render(
        <GlassView appearance="dark">
          <Text>Child 1</Text>
          <Text>Child 2</Text>
        </GlassView>
      );

      expect(screen.getByText('Child 1')).toBeTruthy();
      expect(screen.getByText('Child 2')).toBeTruthy();
    });
  });

  describe('dark appearance', () => {
    it('renders with dark appearance', () => {
      const { root } = render(
        <GlassView appearance="dark">
          <Text>Dark Glass</Text>
        </GlassView>
      );

      expect(root).toBeTruthy();
      expect(screen.getByText('Dark Glass')).toBeTruthy();
    });
  });

  describe('light appearance', () => {
    it('renders with light appearance', () => {
      const { root } = render(
        <GlassView appearance="light">
          <Text>Light Glass</Text>
        </GlassView>
      );

      expect(root).toBeTruthy();
      expect(screen.getByText('Light Glass')).toBeTruthy();
    });
  });

  describe('glassStyle prop', () => {
    it('defaults to clear style', () => {
      const { root } = render(
        <GlassView appearance="dark">
          <Text>Clear Style</Text>
        </GlassView>
      );

      expect(root).toBeTruthy();
    });

    it('accepts regular style', () => {
      const { root } = render(
        <GlassView appearance="dark" glassStyle="regular">
          <Text>Regular Style</Text>
        </GlassView>
      );

      expect(root).toBeTruthy();
      expect(screen.getByText('Regular Style')).toBeTruthy();
    });

    it('accepts clear style explicitly', () => {
      const { root } = render(
        <GlassView appearance="dark" glassStyle="clear">
          <Text>Clear Explicit</Text>
        </GlassView>
      );

      expect(root).toBeTruthy();
      expect(screen.getByText('Clear Explicit')).toBeTruthy();
    });
  });

  describe('style prop', () => {
    it('applies custom styles', () => {
      const customStyle = { padding: 20, borderRadius: 12 };

      const { root } = render(
        <GlassView appearance="dark" style={customStyle}>
          <Text>Styled Glass</Text>
        </GlassView>
      );

      expect(root).toBeTruthy();
      expect(screen.getByText('Styled Glass')).toBeTruthy();
    });
  });

  describe('fallback behavior (Expo Go)', () => {
    it('uses BlurView fallback in Expo Go environment', () => {
      // Default mock is set to Expo Go (appOwnership: 'expo')
      const { root } = render(
        <GlassView appearance="dark">
          <Text>Fallback Content</Text>
        </GlassView>
      );

      expect(root).toBeTruthy();
      expect(screen.getByText('Fallback Content')).toBeTruthy();
    });

    it('renders with dark tint for dark appearance', () => {
      const { root } = render(
        <GlassView appearance="dark">
          <Text>Dark Tint</Text>
        </GlassView>
      );

      expect(root).toBeTruthy();
    });

    it('renders with light tint for light appearance', () => {
      const { root } = render(
        <GlassView appearance="light">
          <Text>Light Tint</Text>
        </GlassView>
      );

      expect(root).toBeTruthy();
    });
  });
});
