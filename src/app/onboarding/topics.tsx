import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { InterestPill } from '../../components/onboarding/InterestPill';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
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
    padding: SPACING.xxl,
    paddingBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.pageTitle,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.button.fontSize,
    fontWeight: TYPOGRAPHY.button.fontWeight,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.xxl,
    paddingTop: 0,
    gap: SPACING.md,
  },
  footer: {
    padding: SPACING.xxl,
    paddingTop: SPACING.lg,
  },
  continueButton: {
    borderRadius: COMPONENT_RADIUS.button,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  continueButtonText: {
    ...TYPOGRAPHY.button,
  },
});
