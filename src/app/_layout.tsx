import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../components/common/ThemeProvider';
import { PdfExtractorProvider } from '../components/PdfExtractorProvider';
import { useSubscriptionStore } from '../store/subscriptionStore';

export default function RootLayout() {
  const initialize = useSubscriptionStore(state => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <ThemeProvider>
      <PdfExtractorProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="reader" options={{ headerShown: false }} />
          <Stack.Screen name="topic" options={{ headerShown: false }} />
          <Stack.Screen name="article" options={{ headerShown: false }} />
          <Stack.Screen name="content" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="testing" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
      </PdfExtractorProvider>
    </ThemeProvider>
  );
}
