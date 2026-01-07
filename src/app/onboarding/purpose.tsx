import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../components/common/ThemeProvider';
import { useOnboardingStore } from '../../store/onboardingStore';

export default function PurposeScreen() {
  const { theme } = useTheme();
  const { setUsageMode } = useOnboardingStore();

  const handleTrainWithContent = () => {
    setUsageMode('train');
    router.push('/onboarding/topics');
  };

  const handleImportOnly = () => {
    setUsageMode('import-only');
    router.push('/onboarding/topics');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          How do you want to use Spidrid?
        </Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: theme.secondaryBackground }]}
            onPress={handleTrainWithContent}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${theme.accentColor  }20` }]}>
              <Text style={styles.emoji}>📚</Text>
            </View>
            <Text style={[styles.optionTitle, { color: theme.textColor }]}>
              Train with our content
            </Text>
            <Text style={[styles.optionDescription, { color: theme.textColor }]}>
              Practice speed reading with curated articles on topics you love
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: theme.secondaryBackground }]}
            onPress={handleImportOnly}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${theme.accentColor  }20` }]}>
              <Text style={styles.emoji}>📥</Text>
            </View>
            <Text style={[styles.optionTitle, { color: theme.textColor }]}>
              Import my own content
            </Text>
            <Text style={[styles.optionDescription, { color: theme.textColor }]}>
              Paste or import text you want to read faster
            </Text>
          </TouchableOpacity>
        </View>
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
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    borderRadius: 16,
    padding: 24,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 28,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
});
