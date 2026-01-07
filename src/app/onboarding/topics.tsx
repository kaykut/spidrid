import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { InterestPill } from '../../components/onboarding/InterestPill';
import { INTERESTS } from '../../data/interests';
import { useOnboardingStore } from '../../store/onboardingStore';

export default function TopicsScreen() {
  const { theme } = useTheme();
  const { selectedInterests, toggleInterest, completeOnboarding, usageMode, hasCompletedOnboarding } = useOnboardingStore();

  const isUpdating = hasCompletedOnboarding;

  const handleContinue = () => {
    if (isUpdating) {
      router.back();
    } else {
      completeOnboarding();
      if (usageMode === 'import-only') {
        router.replace('/(tabs)/read');
      } else {
        router.replace('/(tabs)/learn');
      }
    }
  };

  const canContinue = selectedInterests.length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textColor }]}>What interests you?</Text>
        <Text style={[styles.subtitle, { color: theme.textColor }]}>
          Select topics to personalize your learning
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.pillsContainer}
        showsVerticalScrollIndicator={false}
      >
        {INTERESTS.map((interest) => (
          <InterestPill
            key={interest.id}
            label={interest.label}
            emoji={interest.emoji}
            selected={selectedInterests.includes(interest.id)}
            onPress={() => toggleInterest(interest.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: canContinue ? theme.accentColor : theme.secondaryBackground,
            },
          ]}
          onPress={handleContinue}
          disabled={!canContinue}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.continueButtonText,
              { color: canContinue ? '#ffffff' : theme.textColor, opacity: canContinue ? 1 : 0.5 },
            ]}
          >
            {isUpdating ? 'Save' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 24,
    paddingTop: 0,
    gap: 10,
  },
  footer: {
    padding: 24,
    paddingTop: 16,
  },
  continueButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
