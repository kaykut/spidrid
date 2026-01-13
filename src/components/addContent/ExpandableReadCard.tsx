import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Keyboard,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { animateLayout } from '../../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { extractFromUrl, createFromText, extractFromEbook } from '../../services/contentExtractor';
import { useContentStore } from '../../store/contentStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { useTheme } from '../common/ThemeProvider';
import { Paywall } from '../paywall/Paywall';
import { usePdfExtractor } from '../PdfExtractorProvider';

const READ_OPTIONS = [
  { id: 'url', icon: 'link-outline', label: 'A webpage' },
  { id: 'text', icon: 'clipboard-outline', label: 'Plain Text' },
  { id: 'ebook', icon: 'book-outline', label: 'Epub & PDF' },
] as const;

type ReadOptionId = (typeof READ_OPTIONS)[number]['id'];

interface ExpandableReadCardProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  onClose: () => void;
}

const getReadOptionCardWidth = () => {
  const screenWidth = Dimensions.get('window').width;
  return (screenWidth - SPACING.lg * 2 - SPACING.md * 2 - SPACING.sm * 2) / 3;
};

export function ExpandableReadCard({ isExpanded, onExpandChange, onClose }: ExpandableReadCardProps) {
  const { theme } = useTheme();
  const { extractPdf } = usePdfExtractor();
  const { addContent } = useContentStore();
  const { canAccessContent, incrementContentCount, isPremium } = useSubscriptionStore();

  const [readOption, setReadOption] = useState<ReadOptionId | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const readOptionCardWidth = getReadOptionCardWidth();

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const chevronRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const handleToggle = () => {
    animateLayout();
    const newExpanded = !isExpanded;
    onExpandChange(newExpanded);
    if (!newExpanded) {
      setReadOption(null);
      setInputValue('');
      Keyboard.dismiss();
    }
  };

  const handleOptionPress = async (optionId: ReadOptionId) => {
    if (optionId === 'ebook') {
      await handlePickEbook();
      return;
    }
    animateLayout();
    if (readOption === optionId) {
      setReadOption(null);
      setInputValue('');
    } else {
      setReadOption(optionId);
      setInputValue('');
    }
  };

  const checkImportLimit = (): boolean => {
    if (isPremium) {return true;}
    if (!canAccessContent()) {
      setShowPaywall(true);
      return false;
    }
    return true;
  };

  const handleImportSuccess = (contentId: string) => {
    if (!isPremium) {
      incrementContentCount();
    }
    setReadOption(null);
    setInputValue('');
    onExpandChange(false);
    onClose();
    router.push(`/content/${contentId}`);
  };

  const handleImportUrl = async () => {
    if (!inputValue.trim() || !checkImportLimit()) {return;}
    setIsLoading(true);
    const result = await extractFromUrl(inputValue.trim());
    setIsLoading(false);
    if (result.success && result.content) {
      const saved = addContent(result.content);
      handleImportSuccess(saved.id);
    } else {
      Alert.alert('Import Failed', result.error || 'Could not extract content from URL');
    }
  };

  const handleImportText = () => {
    if (!inputValue.trim() || !checkImportLimit()) {return;}
    const result = createFromText(inputValue.trim());
    if (result.success && result.content) {
      const saved = addContent(result.content);
      handleImportSuccess(saved.id);
    } else {
      Alert.alert('Import Failed', result.error || 'Could not process text');
    }
  };

  const handlePickEbook = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/epub+zip', 'application/pdf', 'application/x-mobipocket-ebook'],
        copyToCacheDirectory: true,
      });
      if (result.canceled || !checkImportLimit()) {return;}
      const asset = result.assets[0];
      setIsLoading(true);
      const importResult = await extractFromEbook(asset.uri, asset.name, { pdfExtractor: extractPdf });
      setIsLoading(false);
      if (importResult.success && importResult.content) {
        const saved = addContent(importResult.content);
        handleImportSuccess(saved.id);
      } else {
        Alert.alert('Import Failed', importResult.error || 'Could not extract content');
      }
    } catch {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  return (
    <>
      <Paywall visible={showPaywall} onClose={() => setShowPaywall(false)} reason="content_limit" />
      <View
        style={[
          styles.cardWrapper,
          { backgroundColor: theme.secondaryBackground },
          isExpanded && styles.cardExpanded,
        ]}
      >
        <TouchableOpacity style={styles.cardHeader} onPress={handleToggle} activeOpacity={0.7}>
          <View style={[styles.iconContainer, { backgroundColor: `${JOURNEY_COLORS.accent}20` }]}>
            <Ionicons name="book-outline" size={SIZES.iconLg} color={JOURNEY_COLORS.accent} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.textColor }]}>Read</Text>
            <Text style={[styles.description, { color: theme.textColor }]}>
              Speed read your own articles or books from PDFs, EPUBs, or links
            </Text>
          </View>
          <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
            <Ionicons name="chevron-forward" size={SIZES.iconMd} color={theme.textColor} style={styles.chevron} />
          </Animated.View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.optionRow}>
              {READ_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard,
                    {
                      width: readOptionCardWidth,
                      height: readOptionCardWidth,
                      backgroundColor: theme.backgroundColor,
                    },
                    readOption === option.id && styles.optionCardSelected,
                    readOption === option.id && { borderColor: JOURNEY_COLORS.accent },
                  ]}
                  onPress={() => handleOptionPress(option.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={option.icon as keyof typeof Ionicons.glyphMap}
                    size={SIZES.iconXl}
                    color={readOption === option.id ? JOURNEY_COLORS.accent : theme.textColor}
                  />
                  <Text
                    style={[
                      styles.optionLabel,
                      { color: readOption === option.id ? JOURNEY_COLORS.accent : theme.textColor },
                    ]}
                    numberOfLines={2}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {(readOption === 'url' || readOption === 'text') && (
              <View style={styles.inputContainer}>
                {readOption === 'url' ? (
                  <TextInput
                    style={[styles.input, { backgroundColor: theme.backgroundColor, color: theme.textColor }]}
                    placeholder="Enter URL (e.g., https://example.com/article)"
                    placeholderTextColor={`${theme.textColor}60`}
                    value={inputValue}
                    onChangeText={setInputValue}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                    returnKeyType="go"
                    onSubmitEditing={handleImportUrl}
                  />
                ) : (
                  <TextInput
                    style={[styles.textArea, { backgroundColor: theme.backgroundColor, color: theme.textColor }]}
                    placeholder="Paste your text here..."
                    placeholderTextColor={`${theme.textColor}60`}
                    value={inputValue}
                    onChangeText={setInputValue}
                    multiline
                    textAlignVertical="top"
                  />
                )}
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    { backgroundColor: JOURNEY_COLORS.accent },
                    (isLoading || !inputValue.trim()) && styles.submitButtonDisabled,
                  ]}
                  onPress={readOption === 'url' ? handleImportUrl : handleImportText}
                  disabled={isLoading || !inputValue.trim()}
                >
                  {isLoading ? (
                    <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
                  ) : (
                    <Text style={styles.submitButtonText}>{readOption === 'url' ? 'Import' : 'Save & Read'}</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: COMPONENT_RADIUS.card,
    overflow: 'hidden',
  },
  cardExpanded: {
    paddingBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  iconContainer: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.cardSubtitle,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.body,
    opacity: 0.7,
  },
  chevron: {
    opacity: 0.5,
    marginLeft: SPACING.sm,
  },
  expandedContent: {
    paddingHorizontal: SPACING.md,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  optionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: COMPONENT_RADIUS.chip,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: SPACING.sm,
  },
  optionCardSelected: {
    borderWidth: 2,
  },
  optionLabel: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  input: {
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.input,
    ...TYPOGRAPHY.body,
  },
  textArea: {
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.input,
    ...TYPOGRAPHY.body,
    height: 120,
  },
  submitButton: {
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.button,
  },
});
