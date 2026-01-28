/**
 * Tests for Card Layout utilities
 */

import { CARD_LAYOUT, useCardLayout, getCardIconSize, cardBaseStyles } from '../../../src/components/contentList/cardLayout';

describe('cardLayout', () => {
  describe('CARD_LAYOUT', () => {
    it('has consistent iconContainerWidth calculation', () => {
      const expected = CARD_LAYOUT.iconMarginLeft + CARD_LAYOUT.iconSize + CARD_LAYOUT.iconMarginRight;
      expect(CARD_LAYOUT.iconContainerWidth).toBe(expected);
    });

    it('has consistent chevronButtonWidth calculation', () => {
      expect(CARD_LAYOUT.chevronButtonWidth).toBe(CARD_LAYOUT.chevronIconSize);
    });
  });

  describe('useCardLayout', () => {
    const mockScreenWidth = 375; // iPhone SE width

    it('calculates layout for chevron right element', () => {
      const layout = useCardLayout({ rightElement: 'chevron', screenWidth: mockScreenWidth });

      expect(layout.cardWidth).toBe(mockScreenWidth - (CARD_LAYOUT.cardMarginHorizontal * 2));
      expect(layout.rightSpace).toBe(44); // SIZES.touchTarget
      expect(layout.iconSpace).toBe(CARD_LAYOUT.iconContainerWidth);
      expect(layout.titleContainerWidth).toBeGreaterThan(0);
    });

    it('calculates layout for score right element', () => {
      const layout = useCardLayout({ rightElement: 'score', screenWidth: mockScreenWidth });

      expect(layout.rightSpace).toBe(48); // Score width
    });

    it('calculates layout for no right element', () => {
      const layout = useCardLayout({ rightElement: 'none', screenWidth: mockScreenWidth });

      expect(layout.rightSpace).toBe(0);
    });

    it('uses window width when screenWidth not provided', () => {
      const layout = useCardLayout({ rightElement: 'chevron' });

      expect(layout.cardWidth).toBeGreaterThan(0);
      expect(layout.titleContainerWidth).toBeGreaterThan(0);
    });
  });

  describe('getCardIconSize', () => {
    it('returns the icon size from CARD_LAYOUT', () => {
      expect(getCardIconSize()).toBe(CARD_LAYOUT.iconSize);
    });
  });

  describe('cardBaseStyles', () => {
    it('has card style defined', () => {
      expect(cardBaseStyles.card).toBeDefined();
    });

    it('has iconContainer style defined', () => {
      expect(cardBaseStyles.iconContainer).toBeDefined();
    });

    it('has titleContainer style defined', () => {
      expect(cardBaseStyles.titleContainer).toBeDefined();
    });
  });
});
