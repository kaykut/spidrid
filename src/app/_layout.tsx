import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../components/common/ThemeProvider';
import { PdfExtractorProvider } from '../components/PdfExtractorProvider';
import { useAuthDeepLink } from '../hooks/useAuthDeepLink';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';

export default function RootLayout() {
  const initializeAuth = useAuthStore(state => state.initialize);
  const initializeSubscription = useSubscriptionStore(state => state.initialize);

  // Handle deep links for magic link authentication
  useAuthDeepLink();

  useEffect(() => {
    initializeAuth();
    initializeSubscription();
  }, [initializeAuth, initializeSubscription]);

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
