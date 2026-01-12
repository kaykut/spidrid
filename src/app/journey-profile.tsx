/**
 * Journey + Profile Modal
 *
 * Full-screen modal combining journey stats and profile settings.
 * Accessed via the top-right FAB from the content list.
 */

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/common/ThemeProvider';
import { VerticalProgressPath } from '../components/journey/VerticalProgressPath';
import { Paywall } from '../components/paywall/Paywall';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../constants/typography';
import { themeList, JOURNEY_COLORS } from '../data/themes';
import { useJourneyStore } from '../store/journeyStore';
import { useSettingsStore } from '../store/settingsStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { READING_LANGUAGES } from '../types/settings';
import { FREE_TIER_LIMITS } from '../types/subscription';
import { withOpacity, OPACITY } from '../utils/colorUtils';

// Helper to convert hex to rgba with alpha
function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function JourneyProfileModal() {
  const { theme, setTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const { certProgress, avgWpmLast3, avgCompLast5 } = useJourneyStore();
  const {
    userName,
    readingLanguage,
    paragraphPauseEnabled,
    setUserName,
    setReadingLanguage,
    setParagraphPauseEnabled,
  } = useSettingsStore();
  const {
    isPremium,
    setPremium,
    contentAccessCount,
    resetContentCount,
    getMaxWPM,
  } = useSubscriptionStore();

  const [showPaywall, setShowPaywall] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const currentLanguage =
    READING_LANGUAGES.find((l) => l.code === readingLanguage)?.label || 'English';

  const handleClose = () => {
    router.back();
  };

  return (
    <>
      <Paywall
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        reason="content_limit"
      />
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {/* Close button - absolute positioned in safe area */}
        <TouchableOpacity
          onPress={handleClose}
          style={[styles.closeButton, { top: insets.top + SPACING.sm, left: SPACING.md }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={SIZES.iconLg} color={theme.textColor} />
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + SIZES.touchTarget + SPACING.md, paddingBottom: insets.bottom + SPACING.xxxl },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Page title - now part of scroll content */}
          <Text style={[styles.pageTitle, { color: theme.textColor }]}>Journey & Profile</Text>
          {/* ====== JOURNEY SECTION ====== */}

          {/* Vertical Progress Path */}
          <LinearGradient
            colors={[theme.secondaryBackground, theme.secondaryBackgroundGradient]}
            style={styles.progressContainer}
          >
            <VerticalProgressPath
              avgWpm={avgWpmLast3}
              avgComp={avgCompLast5}
              certProgress={certProgress}
            />
          </LinearGradient>

          {/* ====== PROFILE SECTION ====== */}

          {/* Theme Section */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Theme</Text>
          <View style={styles.themeGrid}>
            {themeList.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[
                  styles.themeButton,
                  { backgroundColor: t.backgroundColor, borderColor: t.crosshairColor },
                  theme.id === t.id && { borderColor: theme.accentColor, borderWidth: 3 },
                ]}
                onPress={() => setTheme(t.id)}
              >
                <Text style={[styles.themeName, { color: t.textColor }]}>{t.name}</Text>
                <View style={[styles.orpPreview, { backgroundColor: t.orpColor }]} />
              </TouchableOpacity>
            ))}
          </View>

          {/* User Profile Section */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Your Info</Text>
          <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
            <Text style={[styles.inputLabel, { color: theme.textColor }]}>
              Name (for certificates)
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                  borderColor: theme.crosshairColor,
                },
              ]}
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter your name"
              placeholderTextColor={withOpacity(theme.textColor, OPACITY.strong)}
            />

            <Text
              style={[styles.inputLabel, { color: theme.textColor, marginTop: SPACING.lg }]}
            >
              Reading Language
            </Text>
            <TouchableOpacity
              style={[
                styles.languageSelector,
                {
                  backgroundColor: theme.backgroundColor,
                  borderColor: theme.crosshairColor,
                },
              ]}
              onPress={() => setShowLanguagePicker(!showLanguagePicker)}
            >
              <Text style={{ color: theme.textColor }}>{currentLanguage}</Text>
              <Text style={{ color: theme.textColor, opacity: 0.5 }}>
                {showLanguagePicker ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {showLanguagePicker && (
              <View style={[styles.languageList, { backgroundColor: theme.backgroundColor }]}>
                {READING_LANGUAGES.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.languageOption,
                      readingLanguage === lang.code && {
                        backgroundColor: withOpacity(theme.accentColor, OPACITY.light),
                      },
                    ]}
                    onPress={() => {
                      setReadingLanguage(lang.code);
                      setShowLanguagePicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.languageOptionText,
                        { color: theme.textColor },
                        readingLanguage === lang.code && {
                          color: theme.accentColor,
                          fontWeight: FONT_WEIGHTS.semibold,
                        },
                      ]}
                    >
                      {lang.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Subscription Section */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Subscription</Text>
          <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
            <View style={styles.subscriptionRow}>
              <Text style={[styles.subscriptionLabel, { color: theme.textColor }]}>
                Status
              </Text>
              <Text
                style={[
                  styles.subscriptionValue,
                  { color: isPremium ? theme.accentColor : theme.orpColor },
                ]}
              >
                {isPremium ? 'Premium' : 'Free'}
              </Text>
            </View>
            <View style={styles.subscriptionRow}>
              <Text style={[styles.subscriptionLabel, { color: theme.textColor }]}>
                Max WPM
              </Text>
              <Text style={[styles.subscriptionValue, { color: theme.textColor }]}>
                {getMaxWPM()}
              </Text>
            </View>
            {!isPremium && (
              <View style={styles.subscriptionRow}>
                <Text style={[styles.subscriptionLabel, { color: theme.textColor }]}>
                  Articles used
                </Text>
                <Text style={[styles.subscriptionValue, { color: theme.textColor }]}>
                  {contentAccessCount} / {FREE_TIER_LIMITS.MAX_CONTENT}
                </Text>
              </View>
            )}
            {!isPremium ? (
              <TouchableOpacity
                style={[styles.upgradeButton, { backgroundColor: theme.accentColor }]}
                onPress={() => setShowPaywall(true)}
              >
                <Text style={styles.upgradeText}>Upgrade to Premium</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.resetButton, { borderColor: theme.orpColor }]}
                onPress={() => setPremium(false)}
              >
                <Text style={[styles.resetText, { color: theme.orpColor }]}>
                  Reset to Free (Dev)
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Reading Settings */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Reading</Text>
          <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.textColor }]}>
                  Paragraph Pause
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textColor }]}>
                  Brief pause between paragraphs
                </Text>
              </View>
              <Switch
                value={paragraphPauseEnabled}
                onValueChange={setParagraphPauseEnabled}
                trackColor={{ false: theme.trackColor, true: theme.accentColor }}
                thumbColor={theme.textColor}
              />
            </View>
          </View>

          {/* Dev controls */}
          {!isPremium && contentAccessCount > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Developer</Text>
              <TouchableOpacity
                style={[styles.devButton, { borderColor: theme.crosshairColor }]}
                onPress={resetContentCount}
              >
                <Text style={[styles.devButtonText, { color: theme.textColor }]}>
                  Reset Article Count
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Component Gallery (Dev) */}
          <TouchableOpacity
            style={[styles.flaskButton, { backgroundColor: theme.secondaryBackground }]}
            onPress={() => router.push('/testing')}
          >
            <Ionicons
              name="flask-outline"
              size={SIZES.iconMd}
              color={theme.textColor}
              style={{ opacity: 0.5 }}
            />
            <Text style={[styles.flaskText, { color: theme.textColor }]}>
              Component Gallery
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Top gradient overlay */}
        <LinearGradient
          colors={[theme.backgroundColor, hexToRGBA(theme.backgroundColor, 0)]}
          style={[styles.gradientTop, { height: insets.top + SPACING.xxxl }]}
          pointerEvents="none"
        />

        {/* Bottom gradient overlay */}
        <LinearGradient
          colors={[hexToRGBA(theme.backgroundColor, 0), theme.backgroundColor]}
          style={[styles.gradientBottom, { height: insets.bottom + SPACING.xxxl }]}
          pointerEvents="none"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    zIndex: 10,
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  pageTitle: {
    ...TYPOGRAPHY.pageTitle,
    marginBottom: SPACING.xl,
  },
  progressContainer: {
    borderRadius: COMPONENT_RADIUS.card,
    marginTop: SPACING.xl,
    padding: COMPONENT_RADIUS.card / 2,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.levelName.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.md,
    marginTop: SPACING.xl,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  themeButton: {
    width: '47%',
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    borderWidth: 2,
    alignItems: 'center',
  },
  themeName: {
    ...TYPOGRAPHY.cardSubtitle,
    marginBottom: SPACING.sm,
  },
  orpPreview: {
    width: SIZES.iconLg,
    height: SIZES.iconLg,
    borderRadius: COMPONENT_RADIUS.badge,
  },
  card: {
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.card,
    marginBottom: SPACING.sm,
  },
  inputLabel: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: SPACING.sm,
    opacity: 0.8,
  },
  textInput: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    borderWidth: 1,
    ...TYPOGRAPHY.body,
    fontSize: TYPOGRAPHY.button.fontSize,
  },
  languageSelector: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageList: {
    marginTop: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.button,
    maxHeight: 200,
  },
  languageOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  languageOptionText: {
    ...TYPOGRAPHY.body,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  subscriptionLabel: {
    ...TYPOGRAPHY.body,
    fontSize: TYPOGRAPHY.button.fontSize,
  },
  subscriptionValue: {
    ...TYPOGRAPHY.cardSubtitle,
  },
  upgradeButton: {
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  upgradeText: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.button,
  },
  resetButton: {
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    marginTop: SPACING.sm,
    borderWidth: 1,
  },
  resetText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  settingLabel: {
    ...TYPOGRAPHY.body,
    fontSize: TYPOGRAPHY.button.fontSize,
  },
  settingDesc: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.6,
    marginTop: SPACING.xs,
  },
  devButton: {
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: SPACING.lg,
  },
  devButtonText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.7,
  },
  flaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
    gap: SPACING.sm,
  },
  flaskText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.5,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
