import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../components/common/ThemeProvider';
import { PdfExtractorProvider } from '../components/PdfExtractorProvider';
import { useSubscriptionStore } from '../store/subscriptionStore';

export default function RootLayout() {
  const initialize = useSubscriptionStore(state => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              }}
            />
            <Stack.Screen
              name="add-content"
              options={{
                presentation: 'fullScreenModal',
                animation: 'slide_from_bottom',
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="playback"
              options={{
                presentation: 'fullScreenModal',
                animation: 'slide_from_bottom',
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="playback-quiz"
              options={{
                presentation: 'fullScreenModal',
                animation: 'slide_from_bottom',
                gestureEnabled: true,
                headerShown: false,
              }}
            />
          </Stack>
        </PdfExtractorProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
