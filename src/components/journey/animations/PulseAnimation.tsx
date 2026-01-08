/**
 * PulseAnimation
 *
 * Subtle scale pulse effect for the Velocity Score number.
 * "When VS increases after a session, the number grows 5% for 200ms, then settles back."
 *
 * Usage:
 * <PulseAnimation trigger={vsIncreased}>
 *   <Text style={styles.vsNumber}>{velocityScore}</Text>
 * </PulseAnimation>
 */

import React, { useRef, useEffect } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';
import { ANIMATION_CONFIG } from '../../../constants/animations';

export interface PulseAnimationProps {
  children: React.ReactNode;
  /** When true, triggers the pulse animation */
  trigger: boolean;
  /** Scale factor at peak of pulse (default: 1.05) */
  scale?: number;
  /** Animation duration in ms (default: 200) */
  duration?: number;
  /** Additional styles for the container */
  style?: StyleProp<ViewStyle>;
}

export function PulseAnimation({
  children,
  trigger,
  scale = ANIMATION_CONFIG.vsPulse.scale,
  duration = ANIMATION_CONFIG.vsPulse.duration,
  style,
}: PulseAnimationProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevTrigger = useRef(trigger);

  useEffect(() => {
    // Only animate when trigger changes from false to true
    if (trigger && !prevTrigger.current) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: scale,
          duration: duration / 2,
          easing: ANIMATION_CONFIG.vsPulse.easing,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: duration / 2,
          easing: ANIMATION_CONFIG.vsPulse.easing,
          useNativeDriver: true,
        }),
      ]).start();
    }
    prevTrigger.current = trigger;
  }, [trigger, scale, duration, scaleAnim]);

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      {children}
    </Animated.View>
  );
}

/**
 * Hook version for more control
 */
export function usePulseAnimation(duration: number = ANIMATION_CONFIG.vsPulse.duration) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const pulse = (targetScale: number = ANIMATION_CONFIG.vsPulse.scale) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: targetScale,
        duration: duration / 2,
        easing: ANIMATION_CONFIG.vsPulse.easing,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: duration / 2,
        easing: ANIMATION_CONFIG.vsPulse.easing,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    scaleAnim,
    pulse,
    style: { transform: [{ scale: scaleAnim }] },
  };
}
