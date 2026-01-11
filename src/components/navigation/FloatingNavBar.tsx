import React, { useRef } from 'react';
import {
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
import { GlassView } from '../common/GlassView';
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
    activeIcon: 'glasses',
    inactiveIcon: 'glasses-outline',
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

  return (
    <GlassView
      appearance={isDarkTheme ? 'dark' : 'light'}
      style={[
        styles.container,
        {
          bottom: Math.max(insets.bottom, SPACING.xl) + SPACING.md,
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
    </GlassView>
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
          size={SIZES.iconMd}
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
    overflow: 'hidden',
    gap: SPACING.xs,
    ...SHADOWS.lg,
  },
  navButton: {
    width: SPACING.xl,
    height: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: SPACING.xl,
    height: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: COMPONENT_RADIUS.modal,
  },
  activeIconContainer: {
    backgroundColor: COLOR_OPACITY.accentSubtle,
  },
});
