import { Redirect } from 'expo-router';
import { useOnboardingStore } from '../store/onboardingStore';

export default function Index() {
  const { hasCompletedOnboarding, usageMode } = useOnboardingStore();

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding/purpose" />;
  }

  if (usageMode === 'import-only') {
    return <Redirect href="/(tabs)/read" />;
  }

  return <Redirect href="/(tabs)/learn" />;
}
