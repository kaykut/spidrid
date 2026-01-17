/**
 * AnimatedListItem - Wrapper for list items with selective entrance animation
 *
 * Provides slide + fade animations based on item change type:
 * - NEW items: Animated.View with slide in from right + fade in (250ms, staggered)
 * - EXISTING items: Regular View (allows LayoutAnimation to handle removal fade-out)
 *
 * Supports staggered entrance with 50ms delay per item (capped at 10 items).
 *
 * IMPORTANT: Existing items use regular View instead of Animated.View because
 * LayoutAnimation cannot animate removal of components controlled by Animated.View.
 */

import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import { DURATION, EASING } from '../../constants/animations';

interface AnimatedListItemProps {
  children: React.ReactNode;
  index: number;
  changeType: 'new' | 'existing' | 'removed';
  slideDirection?: 'left' | 'right';
  onExitComplete?: () => void;
  style?: ViewStyle;
}

const SLIDE_DISTANCE_HORIZONTAL = 80; // Horizontal slide distance for enter/exit animations
const MAX_STAGGERED_ITEMS = 10; // Cap stagger to first 10 items

export function AnimatedListItem({
  children,
  index,
  changeType,
  slideDirection: _slideDirection = 'right',
  onExitComplete,
  style,
}: AnimatedListItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // NEW ITEMS: Slide in from right + fade in
    if (changeType === 'new') {
      translateX.setValue(SLIDE_DISTANCE_HORIZONTAL); // Start off-screen right
      translateY.setValue(0);
      opacity.setValue(0);

      // Calculate stagger delay (cap at 10 items)
      const effectiveIndex = Math.min(index, MAX_STAGGERED_ITEMS);
      const delay = effectiveIndex * 50; // 50ms stagger

      // Animate in
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: DURATION.transition, // 250ms
          delay,
          easing: EASING.easeOut,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: DURATION.transition,
          delay,
          easing: EASING.easeOut,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // REMOVED ITEMS: Fade out only (no horizontal movement)
    if (changeType === 'removed') {
      console.warn('[AnimatedListItem] Starting fade-out animation for index:', index);
      translateX.setValue(0); // Stay in place
      opacity.setValue(1); // Start visible

      // Fade out only
      Animated.timing(opacity, {
        toValue: 0,
        duration: DURATION.transition, // 250ms
        easing: EASING.easeOut,
        useNativeDriver: true,
      }).start((finished) => {
        console.warn('[AnimatedListItem] Fade-out animation finished:', {
          index,
          finished,
        });
        // Notify parent when fade completes
        onExitComplete?.();
      });
    }
  }, [changeType, index, translateX, translateY, opacity, onExitComplete]);

  // EXISTING items: Render as regular View so LayoutAnimation can animate their removal
  if (changeType === 'existing') {
    return <View style={style}>{children}</View>;
  }

  // NEW items: Render as Animated.View for slide-in animation
  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ translateX }, { translateY }],
          opacity,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
