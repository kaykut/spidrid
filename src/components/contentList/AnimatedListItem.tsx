/**
 * AnimatedListItem - Wrapper for list items with entrance animation
 *
 * Provides slide + fade animation for content list items when filters change.
 * Slides up from bottom (24pt) while fading in (0→1) over 250ms.
 * Supports staggered entrance with 50ms delay per item (capped at 10 items).
 */

import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { DURATION, EASING } from '../../constants/animations';

interface AnimatedListItemProps {
  children: React.ReactNode;
  index: number;
  animationKey: number;
  style?: ViewStyle;
}

const SLIDE_DISTANCE = 24; // 3 grid units (8pt × 3)
const MAX_STAGGERED_ITEMS = 10; // Cap stagger to first 10 items

export function AnimatedListItem({
  children,
  index,
  animationKey,
  style,
}: AnimatedListItemProps) {
  const translateY = useRef(new Animated.Value(SLIDE_DISTANCE)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset animation values
    translateY.setValue(SLIDE_DISTANCE);
    opacity.setValue(0);

    // Calculate stagger delay (cap at 10 items to prevent long delays)
    const effectiveIndex = Math.min(index, MAX_STAGGERED_ITEMS);
    const delay = effectiveIndex * 50; // 50ms stagger

    // Animate in with slide + fade
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: DURATION.transition, // 250ms
        delay,
        easing: EASING.easeOut,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: DURATION.transition, // 250ms
        delay,
        easing: EASING.easeOut,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animationKey, index, translateY, opacity]);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
