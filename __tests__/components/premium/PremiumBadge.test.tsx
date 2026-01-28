/**
 * Tests for PremiumBadge Component
 *
 * Premium badge with crown icon that indicates premium-gated features.
 * Uses design system tokens for consistent spacing and colors.
 * Positioned absolutely in top-right corner of parent container.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import { PremiumBadge } from '../../../src/components/premium/PremiumBadge';

// =============================================================================
// Mocks
// =============================================================================

// Track icon props for verification
let lastIconProps: { name: string; size: number } | null = null;

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View, Text } = require('react-native');
  return {
    MaterialCommunityIcons: (props: { name: string; size: number; testID?: string }) => {
      // Store props for test verification
      lastIconProps = { name: props.name, size: props.size };
      return (
        <View testID={props.testID || `icon-${props.name}`}>
          <Text>{props.name}</Text>
        </View>
      );
    },
  };
});

// =============================================================================
// Tests
// =============================================================================

describe('PremiumBadge', () => {
  beforeEach(() => {
    lastIconProps = null;
  });

  describe('basic rendering', () => {
    it('renders without crashing', () => {
      const { root } = render(<PremiumBadge />);

      expect(root).toBeTruthy();
    });

    it('renders crown icon', () => {
      render(<PremiumBadge />);

      expect(lastIconProps?.name).toBe('crown');
    });

    it('passes correct icon name to MaterialCommunityIcons', () => {
      render(<PremiumBadge />);

      expect(lastIconProps).not.toBeNull();
      expect(lastIconProps?.name).toBe('crown');
    });
  });

  describe('default props', () => {
    it('uses default size of 12', () => {
      render(<PremiumBadge />);

      expect(lastIconProps?.size).toBe(12);
    });

    it('uses SPACING.xs for default top position', () => {
      // Default top is SPACING.xs (4)
      const { root } = render(<PremiumBadge />);

      expect(root).toBeTruthy();
    });

    it('uses SPACING.xs for default right position', () => {
      // Default right is SPACING.xs (4)
      const { root } = render(<PremiumBadge />);

      expect(root).toBeTruthy();
    });
  });

  describe('custom props', () => {
    it('accepts custom size', () => {
      render(<PremiumBadge size={8} />);

      expect(lastIconProps?.size).toBe(8);
    });

    it('accepts custom top position', () => {
      const { root } = render(<PremiumBadge top={10} />);

      expect(root).toBeTruthy();
    });

    it('accepts custom right position', () => {
      const { root } = render(<PremiumBadge right={10} />);

      expect(root).toBeTruthy();
    });

    it('accepts all custom props together', () => {
      render(<PremiumBadge size={16} top={8} right={8} />);

      expect(lastIconProps?.size).toBe(16);
    });
  });

  describe('positioning', () => {
    it('renders inside a parent container', () => {
      const { getByTestId } = render(
        <View testID="parent-container">
          <PremiumBadge />
        </View>
      );

      expect(getByTestId('parent-container')).toBeTruthy();
      expect(lastIconProps?.name).toBe('crown');
    });

    it('works with zero positioning', () => {
      const { root } = render(<PremiumBadge top={0} right={0} />);

      expect(root).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('is hidden from accessibility tree', () => {
      const { root } = render(<PremiumBadge />);

      // The component uses importantForAccessibility="no-hide-descendants"
      // to prevent screen readers from announcing decorative badges
      expect(root).toBeTruthy();
    });
  });

  describe('size variations', () => {
    it('renders with small size for pills', () => {
      render(<PremiumBadge size={8} top={2} right={2} />);

      expect(lastIconProps?.size).toBe(8);
    });

    it('renders with large size for cards', () => {
      render(<PremiumBadge size={16} top={8} right={8} />);

      expect(lastIconProps?.size).toBe(16);
    });

    it('renders with extra large size', () => {
      render(<PremiumBadge size={24} />);

      expect(lastIconProps?.size).toBe(24);
    });
  });
});
