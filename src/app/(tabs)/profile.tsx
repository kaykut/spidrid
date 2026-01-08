import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { MilestoneBadge } from '../../components/certifications';
import { EdgeFadeScrollView } from '../../components/common/EdgeFadeScrollView';
import { useTheme } from '../../components/common/ThemeProvider';
import { Paywall } from '../../components/paywall/Paywall';
import { SPACING, RADIUS, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { themeList } from '../../data/themes';
import { useContentStore } from '../../store/contentStore';
import { useJourneyStore } from '../../store/journeyStore';
import { useLearningStore } from '../../store/learningStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { CertificationTier, CERTIFICATION_TIER_DEFINITIONS } from '../../types/certificates';
import { READING_LANGUAGES } from '../../types/settings';
import { FREE_TIER_LIMITS } from '../../types/subscription';

export default function ProfileScreen() {
  const { theme, setTheme } = useTheme();
  const { getTotalArticlesCompleted, getHighestWPM } = useLearningStore();
  const { importedContent } = useContentStore();
  const { certProgress } = useJourneyStore();
  const { userName, readingLanguage, setUserName, setReadingLanguage } = useSettingsStore();
  const { isPremium, setPremium, contentAccessCount, resetContentCount, getMaxWPM } = useSubscriptionStore();

  // Get earned certifications
  const earnedCerts = CERTIFICATION_TIER_DEFINITIONS.filter(def => certProgress[def.tier]?.examPassed);

  const [showPaywall, setShowPaywall] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const articlesCompleted = getTotalArticlesCompleted();
  const contentCompleted = importedContent.filter(c => c.readProgress >= 1).length;
  const totalCompleted = articlesCompleted + contentCompleted;
  const highestWPM = getHighestWPM();

  const currentLanguage = READING_LANGUAGES.find(l => l.code === readingLanguage)?.label || 'English';

  return (
    <>
      <Paywall
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        reason="content_limit"
      />
      <EdgeFadeScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.textColor }]}>Profile</Text>

          {/* Stats */}
          <View style={[styles.statsCard, { backgroundColor: theme.secondaryBackground }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.accentColor }]}>{totalCompleted}</Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>Completed</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.crosshairColor }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.accentColor }]}>
                {highestWPM || '—'}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>Best WPM</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.crosshairColor }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.accentColor }]}>
                {earnedCerts.length}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>Certificates</Text>
            </View>
          </View>

          {/* User Profile Section */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Your Info</Text>
          <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
            <Text style={[styles.inputLabel, { color: theme.textColor }]}>Name (for certificates)</Text>
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
              placeholderTextColor={`${theme.textColor}60`}
            />

            <Text style={[styles.inputLabel, { color: theme.textColor, marginTop: SPACING.lg }]}>
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
                      readingLanguage === lang.code && { backgroundColor: `${theme.accentColor  }20` },
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
                        readingLanguage === lang.code && { color: theme.accentColor, fontWeight: '600' },
                      ]}
                    >
                      {lang.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Certification Journey Section */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Certification Journey</Text>
            <TouchableOpacity onPress={() => router.navigate('/(tabs)/journey')}>
              <Text style={[styles.updateLink, { color: theme.accentColor }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.journeyCard, { backgroundColor: theme.secondaryBackground }]}
            onPress={() => router.navigate('/(tabs)/journey')}
            activeOpacity={0.8}
          >
            <View style={styles.journeyBadges}>
              {(['speed_reader', 'velocity_master', 'transcendent'] as CertificationTier[]).map((tier) => (
                <MilestoneBadge
                  key={tier}
                  tier={tier}
                  progress={certProgress[tier]}
                  size="medium"
                />
              ))}
            </View>
            <Text style={[styles.journeyText, { color: theme.textColor }]}>
              {earnedCerts.length === 0
                ? 'Start earning certification tiers!'
                : earnedCerts.length === 3
                ? 'All tiers earned! '
                : `${earnedCerts.length}/3 tiers earned`}
            </Text>
          </TouchableOpacity>

          {/* Subscription Section */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Subscription</Text>
          <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
            <View style={styles.subscriptionRow}>
              <Text style={[styles.subscriptionLabel, { color: theme.textColor }]}>Status</Text>
              <Text style={[styles.subscriptionValue, { color: isPremium ? theme.accentColor : theme.orpColor }]}>
                {isPremium ? 'Premium' : 'Free'}
              </Text>
            </View>
            <View style={styles.subscriptionRow}>
              <Text style={[styles.subscriptionLabel, { color: theme.textColor }]}>Max WPM</Text>
              <Text style={[styles.subscriptionValue, { color: theme.textColor }]}>{getMaxWPM()}</Text>
            </View>
            {!isPremium && (
              <View style={styles.subscriptionRow}>
                <Text style={[styles.subscriptionLabel, { color: theme.textColor }]}>Articles used</Text>
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
                <Text style={[styles.resetText, { color: theme.orpColor }]}>Reset to Free (Dev)</Text>
              </TouchableOpacity>
            )}
          </View>

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

          {/* Dev controls */}
          {!isPremium && contentAccessCount > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Developer</Text>
              <TouchableOpacity
                style={[styles.devButton, { borderColor: theme.crosshairColor }]}
                onPress={resetContentCount}
              >
                <Text style={[styles.devButtonText, { color: theme.textColor }]}>Reset Article Count</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Tips */}
          <View style={[styles.tipsCard, { backgroundColor: theme.secondaryBackground }]}>
            <Text style={[styles.tipsTitle, { color: theme.textColor }]}>Speed Reading Tips</Text>
            <Text style={[styles.tipText, { color: theme.textColor }]}>
              • Focus on the red ORP letter{'\n'}
              • Let words come to you — don't read ahead{'\n'}
              • Start slow, increase WPM gradually{'\n'}
              • Practice daily for best results
            </Text>
          </View>

          {/* Component Gallery (Dev) */}
          <TouchableOpacity
            style={[styles.flaskButton, { backgroundColor: theme.secondaryBackground }]}
            onPress={() => router.push('/testing')}
          >
            <Ionicons name="flask-outline" size={20} color={theme.textColor} style={{ opacity: 0.5 }} />
            <Text style={[styles.flaskText, { color: theme.textColor }]}>Component Gallery</Text>
          </TouchableOpacity>
      </EdgeFadeScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.pageTitle,
    marginBottom: SPACING.xl,
  },
  statsCard: {
    flexDirection: 'row',
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.xl,
    marginBottom: SPACING.xxl,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...TYPOGRAPHY.metricLarge,
    fontSize: 28,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    opacity: 0.7,
    marginTop: SPACING.xs,
  },
  statDivider: {
    width: 1,
    marginHorizontal: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.levelName,
    fontSize: 18,
    textTransform: 'none',
    letterSpacing: 0,
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  updateLink: {
    ...TYPOGRAPHY.buttonSmall,
  },
  journeyCard: {
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.card,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  journeyBadges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: SPACING.md,
  },
  journeyText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '500',
  },
  card: {
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    marginBottom: SPACING.sm,
  },
  inputLabel: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '500',
    marginBottom: SPACING.sm,
    opacity: 0.8,
  },
  textInput: {
    paddingHorizontal: SPACING.lg - 2,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md + 2,
    borderWidth: 1,
    ...TYPOGRAPHY.body,
    fontSize: 16,
  },
  languageSelector: {
    paddingHorizontal: SPACING.lg - 2,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md + 2,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageList: {
    marginTop: SPACING.sm,
    borderRadius: RADIUS.md + 2,
    maxHeight: 200,
  },
  languageOption: {
    paddingHorizontal: SPACING.lg - 2,
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
    fontSize: 16,
  },
  subscriptionValue: {
    ...TYPOGRAPHY.cardSubtitle,
  },
  upgradeButton: {
    paddingVertical: SPACING.lg - 2,
    borderRadius: RADIUS.md + 2,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  upgradeText: {
    color: '#ffffff',
    ...TYPOGRAPHY.button,
  },
  resetButton: {
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md + 2,
    alignItems: 'center',
    marginTop: SPACING.sm,
    borderWidth: 1,
  },
  resetText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '400',
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
    borderRadius: SIZES.iconLg / 2,
  },
  devButton: {
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md + 2,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: SPACING.lg,
  },
  devButtonText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '400',
    opacity: 0.7,
  },
  tipsCard: {
    borderRadius: COMPONENT_RADIUS.card,
    padding: SPACING.xl,
    marginTop: SPACING.lg,
  },
  tipsTitle: {
    ...TYPOGRAPHY.cardSubtitle,
    marginBottom: SPACING.md,
  },
  tipText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '400',
    lineHeight: 24,
    opacity: 0.8,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabelContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  toggleLabel: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    fontWeight: '500',
  },
  toggleSubtext: {
    ...TYPOGRAPHY.caption,
    opacity: 0.6,
    marginTop: 2,
  },
  premiumNote: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.sm,
    fontWeight: '500',
  },
  flaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md + 2,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
    gap: SPACING.sm,
  },
  flaskText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: '400',
    opacity: 0.5,
  },
});
