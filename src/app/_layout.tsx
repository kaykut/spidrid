import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '../components/common/ThemeProvider';
import { PdfExtractorProvider } from '../components/PdfExtractorProvider';
import { useAuthDeepLink } from '../hooks/useAuthDeepLink';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { initializeAutoSync, cleanupAutoSync } from '../hooks/useSyncManager';
import { loadOrMeasureFontMetrics, loadMeasuredPadding } from '../services/fontMetrics';
import { FontMetricsCalibrator } from '../components/fontMetrics/FontMetricsCalibrator';
import { RSVP_DISPLAY } from '../constants/typography';
import { useSettingsStore } from '../store/settingsStore';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const initializeAuth = useAuthStore(state => state.initialize);
  const initializeSubscription = useSubscriptionStore(state => state.initialize);
  const fontFamily = useSettingsStore(state => state.fontFamily);

  // Font metrics calibration state
  const [needsCalibration, setNeedsCalibration] = useState(false);
  const fontSize = RSVP_DISPLAY.fontSize ?? 48;

  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    'Lora': require('../../fonts/Lora/Lora-VariableFont_wght.ttf'),
    'Inter': require('../../fonts/Inter/Inter-VariableFont_opsz,wght.ttf'),
    'RedditSansCondensed': require('../../fonts/Reddit_Sans_Condensed/RedditSansCondensed-VariableFont_wght.ttf'),
  });

  // Handle deep links for magic link authentication
  useAuthDeepLink();

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      if (fontError) {
        console.error('[_layout] Font loading error:', fontError);
      }
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    console.log('[_layout] === useEffect triggered ===');
    console.log('[_layout] Calling initializeAuth()');
    initializeAuth();
    console.log('[_layout] Calling initializeSubscription()');
    initializeSubscription();
    console.log('[_layout] Calling initializeAutoSync()');
    initializeAutoSync();

    return () => {
      console.log('[_layout] Cleanup: calling cleanupAutoSync()');
      cleanupAutoSync();
    };
  }, [initializeAuth, initializeSubscription]);

  // Pre-load font metrics calibration on app start
  useEffect(() => {
    async function initCalibration() {
      console.log('[_layout] Checking font metrics calibration...');

      // Load container padding from previous session
      await loadMeasuredPadding();

      // Check if font metrics are already calibrated
      const metrics = await loadOrMeasureFontMetrics(fontFamily, fontSize);
      if (!metrics) {
        console.log('[_layout] Font metrics not found, triggering calibration');
        setNeedsCalibration(true);
      } else {
        console.log('[_layout] Font metrics loaded from cache');
      }
    }
    initCalibration();
  }, [fontFamily, fontSize]);

  // Return null while fonts are loading
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <PdfExtractorProvider>
            {/* Hidden calibration component - only renders if needed */}
            {needsCalibration && (
              <FontMetricsCalibrator
                fontFamily={fontFamily}
                fontSize={fontSize}
                onComplete={() => {
                  console.log('[_layout] Font metrics calibration complete');
                  setNeedsCalibration(false);
                }}
              />
            )}

            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="reader" options={{ headerShown: false }} />
              <Stack.Screen name="topic" options={{ headerShown: false }} />
              <Stack.Screen name="article" options={{ headerShown: false }} />
              <Stack.Screen name="content" options={{ headerShown: false }} />
              <Stack.Screen name="testing" options={{ presentation: 'modal', headerShown: false }} />
              <Stack.Screen
                name="journey-profile"
                options={{
                  presentation: 'fullScreenModal',
                  animation: 'slide_from_bottom',
                  gestureEnabled: true,
                  headerShown: false,
                  contentStyle: { backgroundColor: 'transparent' },
                }}
              />
              <Stack.Screen
                name="add-content"
                options={{
                  presentation: 'fullScreenModal',
                  animation: 'slide_from_bottom',
                  gestureEnabled: true,
                  headerShown: false,
                  contentStyle: { backgroundColor: 'transparent' },
                }}
              />
              <Stack.Screen
                name="playback"
                options={{
                  presentation: 'fullScreenModal',
                  animation: 'slide_from_bottom',
                  gestureEnabled: true,
                  headerShown: false,
                  contentStyle: { backgroundColor: 'transparent' },
                }}
              />
              <Stack.Screen
                name="playback-quiz"
                options={{
                  presentation: 'fullScreenModal',
                  animation: 'slide_from_bottom',
                  gestureEnabled: true,
                  headerShown: false,
                  contentStyle: { backgroundColor: 'transparent' },
                }}
              />
              <Stack.Screen
                name="history"
                options={{
                  presentation: 'fullScreenModal',
                  animation: 'slide_from_bottom',
                  gestureEnabled: true,
                  headerShown: false,
                  contentStyle: { backgroundColor: 'transparent' },
                }}
              />
            </Stack>
          </PdfExtractorProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
