/**
 * Content Tab Layout
 *
 * Container for Train, Read, Learn sub-tabs.
 * Shows ContentSubTabBar at top and renders active sub-tab below.
 */

import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../components/common/ThemeProvider';
import { ContentSubTabBar } from '../../../components/navigation/ContentSubTabBar';
import { useSettingsStore } from '../../../store/settingsStore';

export default function ContentLayout() {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { activeContentTab } = useSettingsStore();

  // On mount, if we're at /content without a sub-route, navigate to last active tab
  useEffect(() => {
    // Check if we're exactly at /content (no sub-route)
    if (pathname === '/content' || pathname === '/(tabs)/content') {
      router.replace(`/(tabs)/content/${activeContentTab}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      edges={['top']}
    >
      <ContentSubTabBar />
      <View style={styles.content}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
