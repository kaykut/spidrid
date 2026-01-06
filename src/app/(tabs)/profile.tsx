import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../components/common/ThemeProvider';
import { EdgeFadeScrollView } from '../../components/common/EdgeFadeScrollView';
import { useLearningStore } from '../../store/learningStore';
import { useContentStore } from '../../store/contentStore';
import { useCertificateStore } from '../../store/certificateStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { useOnboardingStore } from '../../store/onboardingStore';
import { CertificateCard, LockedCertificateCard } from '../../components/certificates/CertificateCard';
import { CertificateViewerModal } from '../../components/certificates/CertificateViewerModal';
import { Paywall } from '../../components/paywall/Paywall';
import { CERTIFICATE_DEFINITIONS, Certificate } from '../../types/certificates';
import { READING_LANGUAGES } from '../../types/settings';
import { FREE_TIER_LIMITS } from '../../types/subscription';
import { themeList } from '../../data/themes';
import { INTERESTS } from '../../data/interests';

export default function ProfileScreen() {
  const { theme, setTheme } = useTheme();
  const { getTotalArticlesCompleted, getHighestWPM } = useLearningStore();
  const { importedContent } = useContentStore();
  const { getAllCertificates, checkAndAwardCertificates } = useCertificateStore();
  const { userName, readingLanguage, setUserName, setReadingLanguage } = useSettingsStore();
  const { isPremium, setPremium, contentAccessCount, resetContentCount, getMaxWPM } = useSubscriptionStore();
  const { selectedInterests } = useOnboardingStore();

  const selectedInterestObjects = INTERESTS.filter((i) => selectedInterests.includes(i.id));

  const [showPaywall, setShowPaywall] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const articlesCompleted = getTotalArticlesCompleted();
  const contentCompleted = importedContent.filter(c => c.readProgress >= 1).length;
  const totalCompleted = articlesCompleted + contentCompleted;
  const highestWPM = getHighestWPM();

  // Check for new certificates on render
  checkAndAwardCertificates(highestWPM);

  const earnedCertificates = getAllCertificates();

  // Calculate progress for locked certificates
  const getProgress = (type: Certificate['type']): number => {
    const def = CERTIFICATE_DEFINITIONS.find(d => d.type === type);
    if (!def) return 0;
    return highestWPM / def.requirement.wpm;
  };

  const currentLanguage = READING_LANGUAGES.find(l => l.code === readingLanguage)?.label || 'English';

  return (
    <>
      <Paywall
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        reason="content_limit"
      />
      <CertificateViewerModal
        certificate={selectedCertificate}
        visible={selectedCertificate !== null}
        onClose={() => setSelectedCertificate(null)}
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
                {earnedCertificates.length}
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

            <Text style={[styles.inputLabel, { color: theme.textColor, marginTop: 16 }]}>
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
                      readingLanguage === lang.code && { backgroundColor: theme.accentColor + '20' },
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

          {/* Interests Section */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Your Interests</Text>
            <TouchableOpacity onPress={() => router.push('/onboarding/topics')}>
              <Text style={[styles.updateLink, { color: theme.accentColor }]}>Update</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
            {selectedInterestObjects.length > 0 ? (
              <View style={styles.interestPills}>
                {selectedInterestObjects.map((interest) => (
                  <View
                    key={interest.id}
                    style={[styles.interestPill, { backgroundColor: theme.accentColor + '20' }]}
                  >
                    <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                    <Text style={[styles.interestLabel, { color: theme.textColor }]}>
                      {interest.label}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={[styles.emptyInterests, { color: theme.textColor }]}>
                No interests selected
              </Text>
            )}
          </View>

          {/* Certificates Section */}
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Certificates</Text>

          {earnedCertificates.length === 0 && (
            <Text style={[styles.emptyText, { color: theme.textColor }]}>
              Increase your reading speed to earn certificates!
            </Text>
          )}

          <View style={styles.certificatesGrid}>
            {CERTIFICATE_DEFINITIONS.map((def) => {
              const earned = earnedCertificates.find(c => c.type === def.type);
              const progress = getProgress(def.type);

              if (earned) {
                return (
                  <CertificateCard
                    key={def.type}
                    certificate={earned}
                    size="small"
                    onPress={() => setSelectedCertificate(earned)}
                  />
                );
              } else {
                return <LockedCertificateCard key={def.type} type={def.type} progress={progress} />;
              }
            })}
          </View>

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
      </EdgeFadeScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  updateLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  interestPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  interestEmoji: {
    fontSize: 14,
  },
  interestLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyInterests: {
    fontSize: 14,
    opacity: 0.6,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 16,
  },
  certificatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    opacity: 0.8,
  },
  textInput: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
  languageSelector: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageList: {
    marginTop: 8,
    borderRadius: 10,
    maxHeight: 200,
  },
  languageOption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  languageOptionText: {
    fontSize: 15,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subscriptionLabel: {
    fontSize: 16,
  },
  subscriptionValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  upgradeButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  upgradeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
  },
  resetText: {
    fontSize: 14,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  themeButton: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  orpPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  devButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16,
  },
  devButtonText: {
    fontSize: 14,
    opacity: 0.7,
  },
  tipsCard: {
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 24,
    opacity: 0.8,
  },
});
