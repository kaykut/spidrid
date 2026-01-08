/**
 * Tests for Spacing Constants
 *
 * Tests spacing utilities, shadows, padding, and margin helpers.
 */

import {
  BASE_UNIT,
  SPACING,
  COMPONENT_SPACING,
  RADIUS,
  COMPONENT_RADIUS,
  SIZES,
  SHADOWS,
  space,
  padding,
  margin,
} from '../../src/constants/spacing';

describe('spacing constants', () => {
  describe('BASE_UNIT', () => {
    it('is 8', () => {
      expect(BASE_UNIT).toBe(8);
    });
  });

  describe('SPACING', () => {
    it('has xs as 4', () => {
      expect(SPACING.xs).toBe(4);
    });

    it('has sm as 8', () => {
      expect(SPACING.sm).toBe(8);
    });

    it('has md as 12', () => {
      expect(SPACING.md).toBe(12);
    });

    it('has lg as 16', () => {
      expect(SPACING.lg).toBe(16);
    });

    it('has xl as 20', () => {
      expect(SPACING.xl).toBe(20);
    });

    it('has xxl as 24', () => {
      expect(SPACING.xxl).toBe(24);
    });

    it('has xxxl as 32', () => {
      expect(SPACING.xxxl).toBe(32);
    });

    it('has huge as 40', () => {
      expect(SPACING.huge).toBe(40);
    });

    it('has massive as 48', () => {
      expect(SPACING.massive).toBe(48);
    });
  });

  describe('COMPONENT_SPACING', () => {
    it('has cardPadding', () => {
      expect(COMPONENT_SPACING.cardPadding).toBe(20);
    });

    it('has screenPadding', () => {
      expect(COMPONENT_SPACING.screenPadding).toBe(16);
    });

    it('has sectionGap', () => {
      expect(COMPONENT_SPACING.sectionGap).toBe(24);
    });

    it('has listItemGap', () => {
      expect(COMPONENT_SPACING.listItemGap).toBe(12);
    });

    it('has inlineGap', () => {
      expect(COMPONENT_SPACING.inlineGap).toBe(8);
    });

    it('has headerPadding', () => {
      expect(COMPONENT_SPACING.headerPadding).toBe(16);
    });

    it('has tabBarHeight', () => {
      expect(COMPONENT_SPACING.tabBarHeight).toBe(56);
    });
  });

  describe('RADIUS', () => {
    it('has xs as 4', () => {
      expect(RADIUS.xs).toBe(4);
    });

    it('has sm as 6', () => {
      expect(RADIUS.sm).toBe(6);
    });

    it('has md as 8', () => {
      expect(RADIUS.md).toBe(8);
    });

    it('has lg as 12', () => {
      expect(RADIUS.lg).toBe(12);
    });

    it('has xl as 16', () => {
      expect(RADIUS.xl).toBe(16);
    });

    it('has xxl as 20', () => {
      expect(RADIUS.xxl).toBe(20);
    });

    it('has full as 9999', () => {
      expect(RADIUS.full).toBe(9999);
    });
  });

  describe('COMPONENT_RADIUS', () => {
    it('has card as 16', () => {
      expect(COMPONENT_RADIUS.card).toBe(16);
    });

    it('has button as 12', () => {
      expect(COMPONENT_RADIUS.button).toBe(12);
    });

    it('has progressBar as 6', () => {
      expect(COMPONENT_RADIUS.progressBar).toBe(6);
    });

    it('has input as 12', () => {
      expect(COMPONENT_RADIUS.input).toBe(12);
    });

    it('has modal as 20', () => {
      expect(COMPONENT_RADIUS.modal).toBe(20);
    });

    it('has chip as 8', () => {
      expect(COMPONENT_RADIUS.chip).toBe(8);
    });

    it('has node as 9999', () => {
      expect(COMPONENT_RADIUS.node).toBe(9999);
    });
  });

  describe('SIZES', () => {
    it('has progressBarHeight', () => {
      expect(SIZES.progressBarHeight).toBe(8);
    });

    it('has nodeSize', () => {
      expect(SIZES.nodeSize).toBe(16);
    });

    it('has currentNodeSize', () => {
      expect(SIZES.currentNodeSize).toBe(24);
    });

    it('has pathLineWidth', () => {
      expect(SIZES.pathLineWidth).toBe(3);
    });

    it('has touchTarget', () => {
      expect(SIZES.touchTarget).toBe(44);
    });

    it('has icon sizes', () => {
      expect(SIZES.iconSm).toBe(16);
      expect(SIZES.iconMd).toBe(20);
      expect(SIZES.iconLg).toBe(24);
      expect(SIZES.iconXl).toBe(32);
    });
  });

  describe('SHADOWS', () => {
    it('has sm shadow', () => {
      expect(SHADOWS.sm).toEqual({
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      });
    });

    it('has md shadow', () => {
      expect(SHADOWS.md).toEqual({
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
      });
    });

    it('has lg shadow', () => {
      expect(SHADOWS.lg).toEqual({
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      });
    });

    describe('glow()', () => {
      it('creates glow effect with provided color', () => {
        const glowColor = '#ff6b6b';
        const glow = SHADOWS.glow(glowColor);

        expect(glow.shadowColor).toBe(glowColor);
        expect(glow.shadowOffset).toEqual({ width: 0, height: 0 });
        expect(glow.shadowOpacity).toBe(0.6);
        expect(glow.shadowRadius).toBe(8);
        expect(glow.elevation).toBe(0);
      });

      it('creates glow effect with different colors', () => {
        const blueGlow = SHADOWS.glow('#4dabf7');
        expect(blueGlow.shadowColor).toBe('#4dabf7');

        const greenGlow = SHADOWS.glow('#69db7c');
        expect(greenGlow.shadowColor).toBe('#69db7c');

        const yellowGlow = SHADOWS.glow('#ffd43b');
        expect(yellowGlow.shadowColor).toBe('#ffd43b');
      });
    });
  });

  describe('space()', () => {
    it('calculates spacing based on base unit multiplier', () => {
      expect(space(1)).toBe(8);
      expect(space(2)).toBe(16);
      expect(space(3)).toBe(24);
      expect(space(0.5)).toBe(4);
    });

    it('handles zero', () => {
      expect(space(0)).toBe(0);
    });

    it('handles large multipliers', () => {
      expect(space(10)).toBe(80);
    });
  });

  describe('padding()', () => {
    it('creates padding with equal vertical and horizontal when only vertical provided', () => {
      const result = padding(16);

      expect(result).toEqual({
        paddingVertical: 16,
        paddingHorizontal: 16,
      });
    });

    it('creates padding with different vertical and horizontal values', () => {
      const result = padding(16, 24);

      expect(result).toEqual({
        paddingVertical: 16,
        paddingHorizontal: 24,
      });
    });

    it('handles zero values', () => {
      const result = padding(0, 0);

      expect(result).toEqual({
        paddingVertical: 0,
        paddingHorizontal: 0,
      });
    });

    it('uses horizontal defaulting to vertical when horizontal is undefined', () => {
      const result = padding(20, undefined);

      expect(result).toEqual({
        paddingVertical: 20,
        paddingHorizontal: 20,
      });
    });
  });

  describe('margin()', () => {
    it('creates margin with equal vertical and horizontal when only vertical provided', () => {
      const result = margin(16);

      expect(result).toEqual({
        marginVertical: 16,
        marginHorizontal: 16,
      });
    });

    it('creates margin with different vertical and horizontal values', () => {
      const result = margin(16, 24);

      expect(result).toEqual({
        marginVertical: 16,
        marginHorizontal: 24,
      });
    });

    it('handles zero values', () => {
      const result = margin(0, 0);

      expect(result).toEqual({
        marginVertical: 0,
        marginHorizontal: 0,
      });
    });

    it('uses horizontal defaulting to vertical when horizontal is undefined', () => {
      const result = margin(20, undefined);

      expect(result).toEqual({
        marginVertical: 20,
        marginHorizontal: 20,
      });
    });
  });
});
