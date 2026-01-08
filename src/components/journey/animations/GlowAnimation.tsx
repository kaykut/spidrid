/**
 * GlowAnimation
 *
 * Pulsing glow effect for the current position node on the journey path.
 * "Current position node has a subtle pulsing glow (opacity 0.3 → 0.6 → 0.3, 2s loop)"
 *
 * Usage:
 * <GlowAnimation active={isCurrentNode} color={JOURNEY_COLORS.accent}>
 *   <View style={styles.node} />
 * </GlowAnimation>
 */

import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { ANIMATION_CONFIG } from '../../../constants/animations';
import { SIZES } from '../../../constants/spacing';

export interface GlowAnimationProps {
  children: React.ReactNode;
  /** Whether the glow animation is active */
  active: boolean;
  /** Color of the glow (default: teal accent) */
  color: string;
  /** Size of the glow spread beyond the element (default: 8) */
  glowSize?: number;
  /** Loop duration in ms (default: 2000) */
  duration?: number;
  /** Minimum opacity (default: 0.3) */
  opacityMin?: number;
  /** Maximum opacity (default: 0.6) */
  opacityMax?: number;
  /** Additional styles for the container */
  style?: StyleProp<ViewStyle>;
}

export function GlowAnimation({
  children,
  active,
  color,
  glowSize = SIZES.progressBarHeight,
  duration = ANIMATION_CONFIG.pathGlow.duration,
  opacityMin = ANIMATION_CONFIG.pathGlow.opacityMin,
  opacityMax = ANIMATION_CONFIG.pathGlow.opacityMax,
  style,
}: GlowAnimationProps) {
  const opacityAnim = useRef(new Animated.Value(opacityMin)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (active) {
      // Create looping animation
      animationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: opacityMax,
            duration: duration / 2,
            easing: ANIMATION_CONFIG.pathGlow.easing,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: opacityMin,
            duration: duration / 2,
            easing: ANIMATION_CONFIG.pathGlow.easing,
            useNativeDriver: true,
          }),
        ])
      );
      animationRef.current.start();
    } else {
      // Stop animation and reset
      if (animationRef.current) {
        animationRef.current.stop();
      }
      opacityAnim.setValue(0);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [active, duration, opacityMin, opacityMax, opacityAnim]);

  return (
    <View style={[styles.container, style]}>
      {active && (
        <Animated.View
          style={[
            styles.glow,
            {
              backgroundColor: color,
              opacity: opacityAnim,
              // Expand glow beyond the element
              top: -glowSize,
              left: -glowSize,
              right: -glowSize,
              bottom: -glowSize,
              borderRadius: 9999, // Full round for nodes
            },
          ]}
        />
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    // Additional blur effect via shadow (iOS only, but graceful fallback)
    shadowColor: 'transparent', // Will be overridden by parent
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
});

/**
 * Hook version for more control over glow animation
 */
export function useGlowAnimation(
  active: boolean,
  duration: number = ANIMATION_CONFIG.pathGlow.duration,
  opacityMin: number = ANIMATION_CONFIG.pathGlow.opacityMin,
  opacityMax: number = ANIMATION_CONFIG.pathGlow.opacityMax
) {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (active) {
      opacityAnim.setValue(opacityMin);
      animationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: opacityMax,
            duration: duration / 2,
            easing: ANIMATION_CONFIG.pathGlow.easing,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: opacityMin,
            duration: duration / 2,
            easing: ANIMATION_CONFIG.pathGlow.easing,
            useNativeDriver: true,
          }),
        ])
      );
      animationRef.current.start();
    } else {
      if (animationRef.current) {
        animationRef.current.stop();
      }
      opacityAnim.setValue(0);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [active, duration, opacityMin, opacityMax, opacityAnim]);

  return {
    opacityAnim,
    glowStyle: {
      opacity: opacityAnim,
    },
  };
}
