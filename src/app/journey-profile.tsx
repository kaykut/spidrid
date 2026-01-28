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
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthModal } from '../components/auth/AuthModal';
import { GlassView } from '../components/common/GlassView';
import { useTheme } from '../components/common/ThemeProvider';
import { VerticalProgressPath } from '../components/journey/VerticalProgressPath';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, FONT_FAMILY } from '../constants/typography';
import { themeList, JOURNEY_COLORS } from '../data/themes';
import { changeLanguage } from '../services/i18n';
import { calculateORP } from '../services/orp';
import { useAuthStore } from '../store/authStore';
import { useJourneyStore } from '../store/journeyStore';
import { useLocaleStore } from '../store/localeStore';
import { useSettingsStore } from '../store/settingsStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { SUPPORTED_LOCALES, type SupportedLocale } from '../types/locale';
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
  const { t } = useTranslation('settings');
  const { t: tSub } = useTranslation('subscription');
  const { t: tAuth } = useTranslation('auth');
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
  const { currentLocale, setLocale } = useLocaleStore();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';

  const fontOptions: Array<{ id: FontFamily; label: string }> = [
    { id: 'system', label: t('fonts.system') },
    { id: 'lora', label: t('fonts.serif') },
    { id: 'inter', label: t('fonts.round') },
    { id: 'reddit-sans-condensed', label: t('fonts.condensed') },
  ];

  const handleClose = () => {
    router.back();
  };

  const handleRestorePurchases = useCallback(async () => {
    const result = await restorePurchases();
    if (result.success) {
      Alert.alert(tSub('alerts.restored_title'), tSub('alerts.restored_message'));
    } else if (result.error) {
      Alert.alert(tSub('alerts.error_title'), result.error);
    } else {
      Alert.alert(tSub('alerts.no_purchases_title'), result.message || tSub('alerts.no_purchases'));
    }
  }, [restorePurchases, tSub]);

  const handleLanguageChange = useCallback(async (locale: SupportedLocale) => {
    setLocale(locale);
    await changeLanguage(locale);
    setShowLanguagePicker(false);
  }, [setLocale]);

  // Get current language display name
  const currentLanguageInfo = SUPPORTED_LOCALES.find(l => l.code === currentLocale) || SUPPORTED_LOCALES[0];

  return (
    <>
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
          <Text style={[styles.pageTitle, { color: theme.textColor }]}>{t('page_title')}</Text>

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
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('sections.theme')}</Text>
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
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('sections.your_info')}</Text>
          <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
            <Text style={[styles.inputLabel, { color: theme.textColor }]}>
              {t('user_info.name_label')}
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
              placeholder={t('user_info.name_placeholder')}
              placeholderTextColor={withOpacity(theme.textColor, OPACITY.strong)}
            />

          </View>

          {/* Language Section */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('sections.language')}</Text>
          <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
            <Text style={[styles.inputLabel, { color: theme.textColor }]}>
              {t('language.app_language')}
            </Text>
            <Text style={[styles.settingDescription, { color: JOURNEY_COLORS.textSecondary }]}>
              {t('language.app_language_desc')}
            </Text>
            <TouchableOpacity
              style={[
                styles.languageSelector,
                {
                  backgroundColor: theme.backgroundColor,
                  borderColor: theme.crosshairColor,
                },
              ]}
              onPress={() => setShowLanguagePicker(true)}
            >
              <View style={styles.languageSelectorContent}>
                <Text style={styles.languageFlag}>{currentLanguageInfo.flag}</Text>
                <Text style={[styles.languageSelectorText, { color: theme.textColor }]}>
                  {currentLanguageInfo.nativeName}
                </Text>
              </View>
              <Ionicons
                name="chevron-down"
                size={SIZES.iconSm}
                color={withOpacity(theme.textColor, OPACITY.medium)}
              />
            </TouchableOpacity>

            <Modal
              visible={showLanguagePicker}
              transparent
              animationType="fade"
              onRequestClose={() => setShowLanguagePicker(false)}
            >
              <TouchableOpacity
                style={styles.languageModalOverlay}
                activeOpacity={1}
                onPress={() => setShowLanguagePicker(false)}
              >
                <View
                  style={[
                    styles.languageModalContent,
                    { backgroundColor: theme.secondaryBackground },
                  ]}
                >
                  <View style={styles.languageModalHeader}>
                    <Text style={[styles.languageModalTitle, { color: theme.textColor }]}>
                      {t('language.app_language')}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowLanguagePicker(false)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons name="close" size={SIZES.iconMd} color={theme.textColor} />
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    style={styles.languageListScroll}
                    showsVerticalScrollIndicator={true}
                  >
                    {SUPPORTED_LOCALES.map((lang) => (
                      <TouchableOpacity
                        key={lang.code}
                        style={[
                          styles.languageOption,
                          { borderBottomColor: withOpacity(theme.textColor, OPACITY.subtle) },
                          currentLocale === lang.code && {
                            backgroundColor: withOpacity(theme.accentColor, OPACITY.light),
                          },
                        ]}
                        onPress={() => handleLanguageChange(lang.code)}
                      >
                        <Text style={styles.languageOptionFlag}>{lang.flag}</Text>
                        <View style={styles.languageOptionContent}>
                          <Text
                            style={[
                              styles.languageOptionText,
                              { color: theme.textColor },
                              currentLocale === lang.code && {
                                color: theme.accentColor,
                                fontWeight: FONT_WEIGHTS.semibold,
                              },
                            ]}
                          >
                            {lang.nativeName}
                          </Text>
                          <Text
                            style={[
                              styles.languageOptionSubtext,
                              { color: JOURNEY_COLORS.textSecondary },
                              currentLocale === lang.code && {
                                color: withOpacity(theme.accentColor, OPACITY.medium),
                              },
                            ]}
                          >
                            {lang.englishName}
                          </Text>
                        </View>
                        {currentLocale === lang.code && (
                          <Ionicons name="checkmark" size={SIZES.iconSm} color={theme.accentColor} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>

          {/* Subscription Section */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{tSub('section_subscription')}</Text>
          <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
            <View style={styles.subscriptionRow}>
              <Text style={[styles.subscriptionLabel, { color: theme.textColor }]}>
                {tSub('status')}
              </Text>
              <Text
                style={[
                  styles.subscriptionValue,
                  { color: isPremium ? theme.accentColor : theme.metaColor },
                ]}
              >
                {isPremium ? tSub('status_premium') : tSub('status_free')}
              </Text>
            </View>
            <View style={styles.subscriptionRow}>
              <Text style={[styles.subscriptionLabel, { color: theme.textColor }]}>
                {tSub('max_wpm')}
              </Text>
              <Text style={[styles.subscriptionValue, { color: theme.textColor }]}>
                {getMaxWPM()}
              </Text>
            </View>
            {!isPremium ? (
              <TouchableOpacity
                style={[styles.upgradeButton, { backgroundColor: theme.accentColor }]}
                onPress={() => router.push({ pathname: '/paywall', params: { trigger: 'upgrade' } })}
              >
                <Text style={styles.upgradeText}>{tSub('upgrade_to_premium')}</Text>
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
                  {tSub('restore_purchases')}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Sync Section - Show for all users, gate behind paywall */}
          <>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
              {tAuth('section_sync')}
            </Text>
              <View style={[styles.card, { backgroundColor: theme.secondaryBackground, position: 'relative' }]}>
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
                          {tAuth('sync.signed_in')}
                        </Text>
                        <Text
                          style={[styles.syncStatusDesc, { color: JOURNEY_COLORS.textSecondary }]}
                          numberOfLines={1}
                        >
                          {userEmail || tAuth('sync.account_verified')}
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
                        {tAuth('sync.status_ready')}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[styles.signOutButton, { borderColor: theme.crosshairColor }]}
                      onPress={signOut}
                    >
                      <Text style={[styles.signOutText, { color: theme.textColor }]}>
                        {tAuth('sync.sign_out')}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={[styles.syncDescription, { color: JOURNEY_COLORS.textSecondary }]}>
                      {tAuth('sync.desc')}
                    </Text>
                    <TouchableOpacity
                      style={[styles.signInButton, { backgroundColor: theme.accentColor }]}
                      onPress={() => {
                        setShowAuthModal(true);
                      }}
                    >
                      <Ionicons
                        name="sync-outline"
                        size={SIZES.iconSm}
                        color={JOURNEY_COLORS.textPrimary}
                      />
                      <Text style={styles.signInText}>{tAuth('sync.sign_in_to_sync')}</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </>

          {/* Reading Settings */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('sections.reading')}</Text>

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
            <Text style={[styles.fontPreviewTitle, { color: theme.textColor }]}>{t('fonts.preview')}</Text>
            <FontPreview fontFamily={fontFamily} theme={theme} />
          </View>

          {/* Existing Reading settings card */}
          <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.textColor }]}>
                  {t('reading.paragraph_pause')}
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textColor }]}>
                  {t('reading.paragraph_pause_desc')}
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
                  {t('reading.move_to_history')}
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textColor }]}>
                  {t('reading.move_to_history_desc')}
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
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('sections.developer')}</Text>
              <TouchableOpacity
                style={[styles.devToolsButton, { borderColor: theme.accentColor }]}
                onPress={() => router.push('/dev-tools')}
              >
                <Ionicons name="flask-outline" size={20} color={theme.accentColor} />
                <Text style={[styles.devToolsText, { color: theme.accentColor }]}>
                  {t('developer.dev_tools')}
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
  languageSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  languageFlag: {
    fontSize: 18,
  },
  languageModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  languageModalContent: {
    width: '100%',
    maxHeight: '70%',
    borderRadius: COMPONENT_RADIUS.modal,
    overflow: 'hidden',
  },
  languageModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  languageModalTitle: {
    ...TYPOGRAPHY.cardTitle,
  },
  languageListScroll: {
    maxHeight: 400,
  },
  languageOption: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    gap: SPACING.md,
  },
  languageOptionFlag: {
    fontSize: 22,
  },
  languageOptionContent: {
    flex: 1,
  },
  languageOptionText: {
    ...TYPOGRAPHY.body,
  },
  languageOptionSubtext: {
    ...TYPOGRAPHY.caption,
    marginTop: 2,
  },
  languageSelectorText: {
    ...TYPOGRAPHY.body,
  },
  settingDescription: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.sm,
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
