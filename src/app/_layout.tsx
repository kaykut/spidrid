import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../components/common/ThemeProvider';
import { PdfExtractorProvider } from '../components/PdfExtractorProvider';
import { useAuthDeepLink } from '../hooks/useAuthDeepLink';
import { initializeAutoSync, cleanupAutoSync } from '../hooks/useSyncManager';
import { initI18n } from '../services/i18n';
import { useAuthStore } from '../store/authStore';
import { useLocaleStore } from '../store/localeStore';
import { useSubscriptionStore } from '../store/subscriptionStore';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const initializeAuth = useAuthStore(state => state.initialize);
  const initializeSubscription = useSubscriptionStore(state => state.initialize);
  const initializeLocale = useLocaleStore(state => state.initialize);

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

    // Initialize i18n with detected locale
    const setupI18n = async () => {
      try {
        console.log('[_layout] Calling initializeLocale()');
        await initializeLocale();
        const locale = useLocaleStore.getState().currentLocale || 'en';
        console.log('[_layout] Initializing i18n with locale:', locale);
        await initI18n(locale);
      } catch (error) {
        console.error('[_layout] i18n initialization failed:', error);
        // App continues with English fallback
      }
    };

    setupI18n().catch(err => {
      console.error('[_layout] setupI18n error:', err);
    });

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
  }, [initializeAuth, initializeSubscription, initializeLocale]);

  // Save reading positions when app backgrounds
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // Trigger sync push to save any pending position updates
        import('../services/syncOrchestrator').then(({ pushAllChanges }) => {
          pushAllChanges().catch(err => {
            console.warn('[_layout] Background sync failed:', err);
          });
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Return null while fonts are loading
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <PdfExtractorProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="reader" options={{ headerShown: false }} />
              <Stack.Screen name="topic" options={{ headerShown: false }} />
              <Stack.Screen name="article" options={{ headerShown: false }} />
              <Stack.Screen name="content" options={{ headerShown: false }} />
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
              <Stack.Screen
                name="dev-tools"
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
