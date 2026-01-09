/**
 * Tests for Animation Constants
 *
 * Tests animation durations, configs, and helper functions.
 */

import {
  DURATION,
  EASING,
  ANIMATION_CONFIG,
  LAYOUT_ANIMATION_EXPAND,
  animateLayout,
  SPRING_CONFIG,
  staggerDelay,
  delay,
} from '../../src/constants/animations';
import { LayoutAnimation } from 'react-native';

// Mock LayoutAnimation.configureNext
jest.spyOn(LayoutAnimation, 'configureNext').mockImplementation(() => { /* noop */ });

describe('animation constants', () => {
  describe('DURATION', () => {
    it('has instant duration', () => {
      expect(DURATION.instant).toBe(100);
    });

    it('has tooltip duration', () => {
      expect(DURATION.tooltip).toBe(150);
    });

    it('has vsPulse duration', () => {
      expect(DURATION.vsPulse).toBe(200);
    });

    it('has transition duration', () => {
      expect(DURATION.transition).toBe(250);
    });

    it('has expand duration', () => {
      expect(DURATION.expand).toBe(300);
    });

    it('has bloom duration', () => {
      expect(DURATION.bloom).toBe(600);
    });

    it('has glowLoop duration', () => {
      expect(DURATION.glowLoop).toBe(2000);
    });
  });

  describe('EASING', () => {
    it('has easeOut function', () => {
      expect(EASING.easeOut).toBeDefined();
    });

    it('has easeInOut function', () => {
      expect(EASING.easeInOut).toBeDefined();
    });

    it('has bloomEase function', () => {
      expect(EASING.bloomEase).toBeDefined();
    });

    it('has linear function', () => {
      expect(EASING.linear).toBeDefined();
    });

    it('has spring function', () => {
      expect(EASING.spring).toBeDefined();
    });
  });

  describe('ANIMATION_CONFIG', () => {
    describe('vsPulse', () => {
      it('has correct duration', () => {
        expect(ANIMATION_CONFIG.vsPulse.duration).toBe(DURATION.vsPulse);
      });

      it('has scale of 1.05', () => {
        expect(ANIMATION_CONFIG.vsPulse.scale).toBe(1.05);
      });

      it('uses native driver', () => {
        expect(ANIMATION_CONFIG.vsPulse.useNativeDriver).toBe(true);
      });
    });

    describe('milestonBloom', () => {
      it('has correct duration', () => {
        expect(ANIMATION_CONFIG.milestonBloom.duration).toBe(DURATION.bloom);
      });

      it('has scaleEnd of 2', () => {
        expect(ANIMATION_CONFIG.milestonBloom.scaleEnd).toBe(2);
      });

      it('uses native driver', () => {
        expect(ANIMATION_CONFIG.milestonBloom.useNativeDriver).toBe(true);
      });
    });

    describe('pathGlow', () => {
      it('has correct duration', () => {
        expect(ANIMATION_CONFIG.pathGlow.duration).toBe(DURATION.glowLoop);
      });

      it('has opacity min and max', () => {
        expect(ANIMATION_CONFIG.pathGlow.opacityMin).toBe(0.3);
        expect(ANIMATION_CONFIG.pathGlow.opacityMax).toBe(0.6);
      });

      it('uses native driver', () => {
        expect(ANIMATION_CONFIG.pathGlow.useNativeDriver).toBe(true);
      });
    });

    describe('expand', () => {
      it('has correct duration', () => {
        expect(ANIMATION_CONFIG.expand.duration).toBe(DURATION.expand);
      });

      it('does not use native driver (height animations)', () => {
        expect(ANIMATION_CONFIG.expand.useNativeDriver).toBe(false);
      });
    });

    describe('tooltip', () => {
      it('has correct duration', () => {
        expect(ANIMATION_CONFIG.tooltip.duration).toBe(DURATION.tooltip);
      });

      it('uses native driver', () => {
        expect(ANIMATION_CONFIG.tooltip.useNativeDriver).toBe(true);
      });
    });

    describe('transition', () => {
      it('has correct duration', () => {
        expect(ANIMATION_CONFIG.transition.duration).toBe(DURATION.transition);
      });

      it('uses native driver', () => {
        expect(ANIMATION_CONFIG.transition.useNativeDriver).toBe(true);
      });
    });
  });

  describe('LAYOUT_ANIMATION_EXPAND', () => {
    it('has correct duration', () => {
      expect(LAYOUT_ANIMATION_EXPAND.duration).toBe(DURATION.expand);
    });

    it('has create config', () => {
      expect(LAYOUT_ANIMATION_EXPAND.create).toBeDefined();
      expect(LAYOUT_ANIMATION_EXPAND.create.type).toBeDefined();
      expect(LAYOUT_ANIMATION_EXPAND.create.property).toBeDefined();
    });

    it('has update config', () => {
      expect(LAYOUT_ANIMATION_EXPAND.update).toBeDefined();
      expect(LAYOUT_ANIMATION_EXPAND.update.type).toBeDefined();
    });

    it('has delete config', () => {
      expect(LAYOUT_ANIMATION_EXPAND.delete).toBeDefined();
      expect(LAYOUT_ANIMATION_EXPAND.delete.type).toBeDefined();
      expect(LAYOUT_ANIMATION_EXPAND.delete.property).toBeDefined();
    });
  });

  describe('animateLayout()', () => {
    it('calls LayoutAnimation.configureNext with expand config', () => {
      animateLayout();

      expect(LayoutAnimation.configureNext).toHaveBeenCalledWith(LAYOUT_ANIMATION_EXPAND);
    });
  });

  describe('SPRING_CONFIG', () => {
    describe('gentle', () => {
      it('has tension of 40', () => {
        expect(SPRING_CONFIG.gentle.tension).toBe(40);
      });

      it('has friction of 7', () => {
        expect(SPRING_CONFIG.gentle.friction).toBe(7);
      });

      it('uses native driver', () => {
        expect(SPRING_CONFIG.gentle.useNativeDriver).toBe(true);
      });
    });

    describe('bouncy', () => {
      it('has tension of 80', () => {
        expect(SPRING_CONFIG.bouncy.tension).toBe(80);
      });

      it('has friction of 5', () => {
        expect(SPRING_CONFIG.bouncy.friction).toBe(5);
      });

      it('uses native driver', () => {
        expect(SPRING_CONFIG.bouncy.useNativeDriver).toBe(true);
      });
    });

    describe('stiff', () => {
      it('has tension of 200', () => {
        expect(SPRING_CONFIG.stiff.tension).toBe(200);
      });

      it('has friction of 20', () => {
        expect(SPRING_CONFIG.stiff.friction).toBe(20);
      });

      it('uses native driver', () => {
        expect(SPRING_CONFIG.stiff.useNativeDriver).toBe(true);
      });
    });
  });

  describe('staggerDelay()', () => {
    it('calculates delay based on index and base delay', () => {
      expect(staggerDelay(0)).toBe(0);
      expect(staggerDelay(1)).toBe(50);
      expect(staggerDelay(2)).toBe(100);
      expect(staggerDelay(5)).toBe(250);
    });

    it('uses default base delay of 50ms', () => {
      expect(staggerDelay(1)).toBe(50);
      expect(staggerDelay(3)).toBe(150);
    });

    it('accepts custom base delay', () => {
      expect(staggerDelay(0, 100)).toBe(0);
      expect(staggerDelay(1, 100)).toBe(100);
      expect(staggerDelay(2, 100)).toBe(200);
      expect(staggerDelay(5, 30)).toBe(150);
    });

    it('handles zero index', () => {
      expect(staggerDelay(0, 50)).toBe(0);
      expect(staggerDelay(0, 100)).toBe(0);
    });
  });

  describe('delay()', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns a promise that resolves after specified time', async () => {
      const callback = jest.fn();
      const promise = delay(100).then(callback);

      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(99);
      await Promise.resolve();
      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      await promise;
      expect(callback).toHaveBeenCalled();
    });

    it('resolves immediately for 0ms delay', async () => {
      const callback = jest.fn();
      const promise = delay(0).then(callback);

      jest.advanceTimersByTime(0);
      await promise;
      expect(callback).toHaveBeenCalled();
    });

    it('resolves with undefined', async () => {
      const delayPromise = delay(100);
      jest.advanceTimersByTime(100);
      const result = await delayPromise;
      expect(result).toBeUndefined();
    });
  });
});
