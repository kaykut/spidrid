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
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { animateLayout } from '../../constants/animations';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { enqueueImport } from '../../services/contentProcessingQueue';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { useTheme } from '../common/ThemeProvider';

// Read option keys - labels are looked up via i18n
const READ_OPTION_KEYS = [
  { id: 'url', icon: 'link-outline', key: 'webpage' },
  { id: 'text', icon: 'clipboard-outline', key: 'text' },
  { id: 'ebook', icon: 'book-outline', key: 'ebook' },
] as const;

type ReadOptionId = (typeof READ_OPTION_KEYS)[number]['id'];

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
  const { t } = useTranslation('addContent');
  const { t: tCommon } = useTranslation('common');

  const [readOption, setReadOption] = useState<ReadOptionId | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleImportSuccess = (contentId: string) => {
    setReadOption(null);
    setInputValue('');
    onExpandChange(false);
    onClose();
    router.push(`/content/${contentId}`);
  };

  const handleImportUrl = async () => {
    if (!inputValue.trim()) {return;}
    setIsLoading(true);
    const saved = enqueueImport(
      { type: 'url', url: inputValue.trim() },
      { title: inputValue.trim(), source: 'url', sourceUrl: inputValue.trim() }
    );
    setIsLoading(false);
    handleImportSuccess(saved.id);
  };

  const handleImportText = () => {
    if (!inputValue.trim()) {return;}
    const saved = enqueueImport(
      { type: 'text', text: inputValue.trim() },
      { title: inputValue.trim().split('\n')[0] || t('read.options.text'), source: 'text' }
    );
    handleImportSuccess(saved.id);
  };

  const handlePickEbook = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/epub+zip', 'application/pdf', 'application/x-mobipocket-ebook'],
        copyToCacheDirectory: true,
      });
      if (result.canceled) {return;}
      const asset = result.assets[0];
      const extension = asset.name.toLowerCase().split('.').pop();
      if (extension !== 'epub' && extension !== 'pdf') {
        Alert.alert(t('errors.import_failed'), t('errors.extract_content'));
        return;
      }

      setIsLoading(true);
      const importsDirectory = new FileSystem.Directory(FileSystem.Paths.document, 'imports');
      importsDirectory.create({ intermediates: true, idempotent: true });

      const destinationFile = new FileSystem.File(importsDirectory, `${Date.now()}-${asset.name}`);
      const sourceFile = new FileSystem.File(asset.uri);
      sourceFile.copy(destinationFile);

      const saved = enqueueImport(
        {
          type: 'file',
          uri: destinationFile.uri,
          fileName: asset.name,
          mimeType: asset.mimeType,
          source: extension === 'pdf' ? 'pdf' : 'epub',
        },
        {
          title: asset.name,
          source: extension === 'pdf' ? 'pdf' : 'epub',
          fileName: asset.name,
        }
      );

      setIsLoading(false);
      handleImportSuccess(saved.id);
    } catch {
      setIsLoading(false);
      Alert.alert(tCommon('error'), t('errors.pick_document'));
    }
  };

  return (
    <View
      style={[
        styles.cardWrapper,
        { backgroundColor: theme.secondaryBackground },
        isExpanded && styles.cardExpanded,
      ]}
    >
      <TouchableOpacity style={styles.cardHeader} onPress={handleToggle} activeOpacity={0.7}>
        <View style={[styles.iconContainer, { backgroundColor: withOpacity(theme.accentColor, OPACITY.light) }]}>
          <Ionicons name="book-outline" size={SIZES.iconLg} color={theme.accentColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.textColor }]}>{t('read.title')}</Text>
          <Text style={[styles.description, { color: theme.textColor }]}>
            {t('read.desc')}
          </Text>
        </View>
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <Ionicons name="chevron-forward" size={SIZES.iconMd} color={theme.textColor} style={styles.chevron} />
        </Animated.View>
      </TouchableOpacity>

      {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.optionRow}>
              {READ_OPTION_KEYS.map((option) => (
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
                    readOption === option.id && { borderColor: theme.accentColor },
                  ]}
                  onPress={() => handleOptionPress(option.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={option.icon as keyof typeof Ionicons.glyphMap}
                    size={SIZES.iconXl}
                    color={readOption === option.id ? theme.accentColor : theme.textColor}
                  />
                  <Text
                    style={[
                      styles.optionLabel,
                      { color: readOption === option.id ? theme.accentColor : theme.textColor },
                    ]}
                    numberOfLines={2}
                  >
                    {t(`read.options.${option.key}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {(readOption === 'url' || readOption === 'text') && (
              <View style={styles.inputContainer}>
                {readOption === 'url' ? (
                  <TextInput
                    style={[styles.input, { backgroundColor: theme.backgroundColor, color: theme.textColor }]}
                    placeholder={t('read.placeholders.url')}
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
                    placeholder={t('read.placeholders.text')}
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
                    { backgroundColor: theme.accentColor },
                    (isLoading || !inputValue.trim()) && styles.submitButtonDisabled,
                  ]}
                  onPress={readOption === 'url' ? handleImportUrl : handleImportText}
                  disabled={isLoading || !inputValue.trim()}
                >
                  {isLoading ? (
                    <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
                  ) : (
                    <Text style={styles.submitButtonText}>{readOption === 'url' ? tCommon('actions.import') : tCommon('actions.save_and_read')}</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
    </View>
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
