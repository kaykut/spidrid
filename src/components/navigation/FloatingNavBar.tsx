import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DURATION } from '../../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES, SHADOWS } from '../../constants/spacing';
import { OVERLAY_COLORS, COLOR_OPACITY } from '../../data/themes';
import { useTheme } from '../common/ThemeProvider';

interface NavItem {
  name: string;
  route: '/(tabs)/journey' | '/(tabs)/play' | '/(tabs)/content';
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: 'Journey',
    route: '/(tabs)/journey',
    activeIcon: 'stats-chart',
    inactiveIcon: 'stats-chart-outline',
  },
  {
    name: 'Read',
    route: '/(tabs)/play',
    activeIcon: 'book',
    inactiveIcon: 'book-outline',
  },
  {
    name: 'Library',
    route: '/(tabs)/content',
    activeIcon: 'file-tray-stacked',
    inactiveIcon: 'file-tray-stacked-outline',
  },
];

export function FloatingNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const isActive = (route: string) => {
    const routeName = route.replace('/(tabs)/', '');
    return pathname.includes(routeName);
  };

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';
  const glassBackground = isDarkTheme
    ? OVERLAY_COLORS.glassDark
    : OVERLAY_COLORS.glassLight;
  const borderColor = isDarkTheme
    ? OVERLAY_COLORS.glassBorderDark
    : OVERLAY_COLORS.glassBorderLight;

  return (
    <View
      style={[
        styles.container,
        {
          bottom: Math.max(insets.bottom, SPACING.xl) + SPACING.md,
          backgroundColor: glassBackground,
          borderColor: borderColor,
        },
      ]}
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.route);
        return (
          <NavButton
            key={item.name}
            item={item}
            active={active}
            activeColor={theme.accentColor}
            inactiveColor={isDarkTheme ? OVERLAY_COLORS.inactiveDark : OVERLAY_COLORS.inactiveLight}
            onPress={() => router.push(item.route)}
          />
        );
      })}
    </View>
  );
}

interface NavButtonProps {
  item: NavItem;
  active: boolean;
  activeColor: string;
  inactiveColor: string;
  onPress: () => void;
}

function NavButton({ item, active, activeColor, inactiveColor, onPress }: NavButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={styles.navButton}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: scaleAnim }] },
          active && styles.activeIconContainer,
        ]}
      >
        <Ionicons
          name={active ? item.activeIcon : item.inactiveIcon}
          size={SIZES.iconLg}
          color={active ? activeColor : inactiveColor}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.badge,
    borderWidth: 1,
    gap: SPACING.xs,
    ...SHADOWS.lg,
  },
  navButton: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: SPACING.huge,
    height: SPACING.huge,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: COMPONENT_RADIUS.modal,
  },
  activeIconContainer: {
    backgroundColor: COLOR_OPACITY.accentSubtle,
  },
});
