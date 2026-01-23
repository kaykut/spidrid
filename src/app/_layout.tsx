import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../components/common/ThemeProvider';
import { PdfExtractorProvider } from '../components/PdfExtractorProvider';
import { useAuthDeepLink } from '../hooks/useAuthDeepLink';
import { initializeAutoSync, cleanupAutoSync } from '../hooks/useSyncManager';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const initializeAuth = useAuthStore(state => state.initialize);
  const initializeSubscription = useSubscriptionStore(state => state.initialize);

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
