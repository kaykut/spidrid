/**
 * FloatingProfileButton
 *
 * A floating circular button positioned at the top-right corner.
 * Provides quick access to the Profile screen.
 */

import React, { useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DURATION } from '../../constants/animations';
import { SPACING, RADIUS, SIZES } from '../../constants/spacing';
import { useTheme } from '../common/ThemeProvider';

export function FloatingProfileButton() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';
  const glassBackground = isDarkTheme
    ? 'rgba(26, 26, 26, 0.92)'
    : 'rgba(245, 245, 245, 0.95)';
  const borderColor = isDarkTheme
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.08)';
  const iconColor = isDarkTheme ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)';

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.88,
      duration: DURATION.instant,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: DURATION.instant,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    router.push('/(tabs)/profile');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={[
        styles.container,
        {
          top: Math.max(insets.top, SPACING.xl) + SPACING.sm,
          backgroundColor: glassBackground,
          borderColor: borderColor,
        },
      ]}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons
          name="person-outline"
          size={SIZES.iconMd}
          color={iconColor}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: SPACING.xl,
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: SPACING.xs },
        shadowOpacity: 0.15,
        shadowRadius: SPACING.sm,
      },
      android: {
        elevation: SPACING.xs,
      },
    }),
  },
});
