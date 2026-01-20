/**
 * Journey + Profile Modal
 *
 * Full-screen modal combining journey stats and profile settings.
 * Accessed via the top-right FAB from the content list.
 */

import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthModal } from '../components/auth/AuthModal';
import { GlassView } from '../components/common/GlassView';
import { useTheme } from '../components/common/ThemeProvider';
import { VerticalProgressPath } from '../components/journey/VerticalProgressPath';
import { Paywall } from '../components/paywall/Paywall';
import { PremiumBadge } from '../components/premium/PremiumBadge';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, FONT_FAMILY } from '../constants/typography';
import { themeList, JOURNEY_COLORS } from '../data/themes';
import { calculateORP } from '../services/orp';
import { useAuthStore } from '../store/authStore';
import { useJourneyStore } from '../store/journeyStore';
import { useSettingsStore } from '../store/settingsStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { type FontFamily, type Theme } from '../types/settings';
import { withOpacity, OPACITY } from '../utils/colorUtils';

// Helper to convert hex to rgba with alpha
function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Font Preview Component
interface FontPreviewProps {
  fontFamily: FontFamily;
  theme: Theme;
}

function FontPreview({ fontFamily, theme }: FontPreviewProps) {
  const word = 'choreography';
  const fontSize = 32; // Smaller size to fit in preview container
  const orpIndex = calculateORP(word); // Returns 4 for 12-char word

  const before = word.slice(0, orpIndex);
  const orpChar = word[orpIndex];
  const after = word.slice(orpIndex + 1);

  let rsvpFontFamily = FONT_FAMILY;
  if (fontFamily === 'lora') {
    rsvpFontFamily = 'Lora';
  } else if (fontFamily === 'inter') {
    rsvpFontFamily = 'Inter';
  } else if (fontFamily === 'reddit-sans-condensed') {
    rsvpFontFamily = 'RedditSansCondensed';
  }

  return (
    <View style={styles.previewWordContainer}>
      {/* Crosshair */}
      <View style={[styles.previewCrosshair, { backgroundColor: theme.crosshairColor }]} />

      {/* Word row */}
      <View style={styles.previewWordRow}>
        <View style={styles.previewBeforeContainer}>
          <Text style={[styles.previewWord, { color: theme.textColor, fontSize, fontFamily: rsvpFontFamily }]}>
            {before}
          </Text>
        </View>

        <Text style={[styles.previewWord, styles.previewOrpChar, { color: theme.orpColor, fontSize, fontFamily: rsvpFontFamily }]}>
          {orpChar}
        </Text>

        <View style={styles.previewAfterContainer}>
          <Text style={[styles.previewWord, { color: theme.textColor, fontSize, fontFamily: rsvpFontFamily }]}>
            {after}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function JourneyProfileModal() {
  const { theme, setTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const { certProgress, avgWpmLast3, avgCompLast5 } = useJourneyStore();
  const {
    userName,
    fontFamily,
    paragraphPauseEnabled,
    moveFinishedToHistory,
    setUserName,
    setFontFamily,
    setParagraphPauseEnabled,
    setMoveFinishedToHistory,
  } = useSettingsStore();
  const {
    isPremium,
    getMaxWPM,
    isRestoring,
    restorePurchases,
  } = useSubscriptionStore();
  const { isLoggedIn, userEmail, signOut } = useAuthStore();

  const [showPaywall, setShowPaywall] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';

  const fontOptions: Array<{ id: FontFamily; label: string }> = [
    { id: 'system', label: 'System' },
    { id: 'lora', label: 'Serif' },
    { id: 'inter', label: 'Round' },
    { id: 'reddit-sans-condensed', label: 'Condensed' },
  ];

  const handleClose = () => {
    router.back();
  };

  const handleRestorePurchases = useCallback(async () => {
    const result = await restorePurchases();
    if (result.success) {
      Alert.alert('Restored', 'Your purchases have been restored successfully.');
    } else if (result.error) {
      Alert.alert('Error', result.error);
    } else {
      Alert.alert('No Purchases', result.message || 'No purchases found to restore.');
    }
  }, [restorePurchases]);

  return (
    <>
      <Paywall
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
      />
      <AuthModal
        visible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          // Could trigger sync here in future
        }}
      />
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {/* Fixed close button with glass background */}
        <View style={[styles.closeButtonContainer, { top: insets.top + SPACING.sm }]}>
          <GlassView
            appearance={isDarkTheme ? 'dark' : 'light'}
            style={styles.closeButtonGlass}
          >
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButtonTouchable}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={SIZES.iconLg} color={theme.textColor} />
            </TouchableOpacity>
          </GlassView>
        </View>

        {/* History button (top-right) - only show when setting is enabled */}
        {moveFinishedToHistory && (
          <View style={[styles.historyButtonContainer, { top: insets.top + SPACING.sm }]}>
            <GlassView
              appearance={isDarkTheme ? 'dark' : 'light'}
              style={styles.historyButtonGlass}
            >
              <TouchableOpacity
                onPress={() => router.push('/history')}
                style={styles.historyButtonTouchable}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="time-outline" size={SIZES.iconLg} color={theme.textColor} />
              </TouchableOpacity>
            </GlassView>
          </View>
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + SIZES.touchTarget + SPACING.md, paddingBottom: insets.bottom + SPACING.xxxl },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Page title */}
          <Text style={[styles.pageTitle, { color: theme.textColor }]}>Journey & Settings</Text>

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

            {/*
              HIDDEN FOR ENGLISH-ONLY LAUNCH
              Recycle as "App Language" (UI localization) setting during internationalization.
              Reading language now auto-detects per-content at playback time.

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
            */}
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
                  { color: isPremium ? theme.accentColor : theme.metaColor },
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
            {!isPremium ? (
              <TouchableOpacity
                style={[styles.upgradeButton, { backgroundColor: theme.accentColor }]}
                onPress={() => setShowPaywall(true)}
              >
                <Text style={styles.upgradeText}>Upgrade to Premium</Text>
              </TouchableOpacity>
            ) : null}
            {/* Restore Purchases - available for all users per Apple guidelines */}
            <TouchableOpacity
              style={[styles.restoreButton, { borderColor: theme.crosshairColor }]}
              onPress={handleRestorePurchases}
              disabled={isRestoring}
            >
              {isRestoring ? (
                <ActivityIndicator size="small" color={theme.textColor} />
              ) : (
                <Text style={[styles.restoreButtonText, { color: theme.textColor }]}>
                  Restore Purchases
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Sync Section - Show for all users, gate behind paywall */}
          <>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
              Sync Across Devices
            </Text>
              <View style={[styles.card, { backgroundColor: theme.secondaryBackground, position: 'relative' }]}>
                {!isPremium && <PremiumBadge />}
                {isLoggedIn ? (
                  <>
                    <View style={styles.syncStatusRow}>
                      <Ionicons
                        name="checkmark-circle"
                        size={SIZES.iconMd}
                        color={JOURNEY_COLORS.success}
                      />
                      <View style={styles.syncStatusInfo}>
                        <Text style={[styles.syncStatusLabel, { color: theme.textColor }]}>
                          Signed In
                        </Text>
                        <Text
                          style={[styles.syncStatusDesc, { color: JOURNEY_COLORS.textSecondary }]}
                          numberOfLines={1}
                        >
                          {userEmail || 'Account verified'}
                        </Text>
                      </View>
                    </View>

                    {/* Sync Status Indicator */}
                    <View style={styles.syncStatusIndicator}>
                      <Ionicons
                        name="cloud-outline"
                        size={SIZES.iconSm}
                        color={JOURNEY_COLORS.textSecondary}
                      />
                      <Text style={[styles.syncStatusText, { color: JOURNEY_COLORS.textSecondary }]}>
                        Ready to sync • Data sync coming soon
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[styles.signOutButton, { borderColor: theme.crosshairColor }]}
                      onPress={signOut}
                    >
                      <Text style={[styles.signOutText, { color: theme.textColor }]}>
                        Sign Out
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={[styles.syncDescription, { color: JOURNEY_COLORS.textSecondary }]}>
                      Sign in to sync your reading progress, certificates, and settings across all
                      your devices.
                    </Text>
                    <TouchableOpacity
                      style={[styles.signInButton, { backgroundColor: theme.accentColor }]}
                      onPress={() => {
                        if (!isPremium) {
                          setShowPaywall(true);
                        } else {
                          setShowAuthModal(true);
                        }
                      }}
                    >
                      <Ionicons
                        name="sync-outline"
                        size={SIZES.iconSm}
                        color={JOURNEY_COLORS.textPrimary}
                      />
                      <Text style={styles.signInText}>Sign In to Sync</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </>

          {/* Reading Settings */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Reading</Text>

          {/* Font Selector */}
          <View style={styles.fontGrid}>
            {fontOptions.map((option) => {
              const isActive = fontFamily === option.id;
              let displayFontFamily = FONT_FAMILY;
              if (option.id === 'lora') {
                displayFontFamily = 'Lora';
              } else if (option.id === 'inter') {
                displayFontFamily = 'Inter';
              } else if (option.id === 'reddit-sans-condensed') {
                displayFontFamily = 'RedditSansCondensed';
              }

              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.fontButton,
                    { backgroundColor: theme.secondaryBackground, borderColor: theme.crosshairColor },
                    isActive && { borderColor: theme.accentColor, borderWidth: 3 },
                  ]}
                  onPress={() => setFontFamily(option.id)}
                >
                  <Text
                    style={[
                      styles.fontLabel,
                      {
                        color: theme.textColor,
                        fontFamily: displayFontFamily
                      }
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Font Preview */}
          <View style={[styles.fontPreviewContainer, { backgroundColor: theme.secondaryBackground }]}>
            <Text style={[styles.fontPreviewTitle, { color: theme.textColor }]}>Preview</Text>
            <FontPreview fontFamily={fontFamily} theme={theme} />
          </View>

          {/* Existing Reading settings card */}
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
            <View style={[styles.settingRow, { marginTop: SPACING.md }]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.textColor }]}>
                  Move to History
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textColor }]}>
                  Completed items move to History
                </Text>
              </View>
              <Switch
                value={moveFinishedToHistory}
                onValueChange={setMoveFinishedToHistory}
                trackColor={{ false: theme.trackColor, true: theme.accentColor }}
                thumbColor={theme.textColor}
              />
            </View>
          </View>

          {/* Dev Tools - Consolidated */}
          {__DEV__ && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Developer</Text>
              <TouchableOpacity
                style={[styles.devToolsButton, { borderColor: theme.accentColor }]}
                onPress={() => router.push('/dev-tools')}
              >
                <Ionicons name="flask-outline" size={20} color={theme.accentColor} />
                <Text style={[styles.devToolsText, { color: theme.accentColor }]}>
                  Dev Tools
                </Text>
                <Ionicons name="chevron-forward" size={20} color={theme.accentColor} />
              </TouchableOpacity>
            </>
          )}
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
  closeButtonContainer: {
    position: 'absolute',
    left: SPACING.md,
    zIndex: 10,
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
  },
  closeButtonGlass: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: SIZES.touchTarget / 2,
    overflow: 'hidden',
  },
  closeButtonTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyButtonContainer: {
    position: 'absolute',
    right: SPACING.md,
    zIndex: 10,
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
  },
  historyButtonGlass: {
    width: SIZES.touchTarget,
    height: SIZES.touchTarget,
    borderRadius: SIZES.touchTarget / 2,
    overflow: 'hidden',
  },
  historyButtonTouchable: {
    flex: 1,
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
    marginBottom: SPACING.md,
  },
  progressContainer: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: COMPONENT_RADIUS.card / 2,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.levelName.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  themeGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  themeButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.button,
    borderWidth: 2,
    alignItems: 'center',
  },
  themeName: {
    ...TYPOGRAPHY.caption,
  },
  orpPreview: {
    width: SIZES.iconSm,
    height: SIZES.iconSm,
    borderRadius: COMPONENT_RADIUS.badge,
    marginTop: SPACING.xs,
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
  restoreButton: {
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    marginTop: SPACING.sm,
    borderWidth: 1,
  },
  restoreButtonText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.7,
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
  devToolsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    borderWidth: 1,
    marginBottom: SPACING.xxl,
    gap: SPACING.sm,
  },
  devToolsText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.medium,
    flex: 1,
    textAlign: 'center',
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
  syncDescription: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.lg,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    gap: SPACING.sm,
  },
  signInText: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.button,
  },
  syncStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  syncStatusInfo: {
    flex: 1,
  },
  syncStatusLabel: {
    ...TYPOGRAPHY.body,
    fontSize: TYPOGRAPHY.button.fontSize,
  },
  syncStatusDesc: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    marginTop: SPACING.xs,
  },
  syncStatusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: withOpacity(JOURNEY_COLORS.textSecondary, 0.05),
    borderRadius: COMPONENT_RADIUS.button,
    marginBottom: SPACING.md,
  },
  syncStatusText: {
    ...TYPOGRAPHY.caption,
    fontSize: 12,
  },
  signOutButton: {
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    borderWidth: 1,
  },
  signOutText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
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
  // Font selector styles
  fontGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  fontButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
    borderRadius: COMPONENT_RADIUS.button,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontLabel: {
    fontSize: 14,
    fontWeight: FONT_WEIGHTS.medium,
    textAlign: 'center',
  },
  fontPreviewContainer: {
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.card,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  fontPreviewTitle: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.md,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // Font preview component styles
  previewWordContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '100%',
  },
  previewCrosshair: {
    position: 'absolute',
    width: 2,
    height: 70,
    opacity: 0.3,
  },
  previewWordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'nowrap',
  },
  previewBeforeContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  previewAfterContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  previewWord: {
    fontWeight: FONT_WEIGHTS.regular,
  },
  previewOrpChar: {
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
