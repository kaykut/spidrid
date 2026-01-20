/**
 * Dev Tools Screen
 *
 * Unified developer tools screen consolidating all dev/debug features:
 * - Persona & State Management
 * - Premium & Subscription Controls
 * - Authentication Testing
 * - Content & Storage Inspection
 * - RSVP & Visual Tests
 *
 * Only accessible in __DEV__ mode.
 */

import { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassView } from '../components/common/GlassView';
import { useTheme } from '../components/common/ThemeProvider';
import { SPACING, COMPONENT_RADIUS, SIZES, COMPONENT_SPACING, SHADOWS } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../constants/typography';
import { JOURNEY_COLORS } from '../data/themes';
import { useAuthStore } from '../store/authStore';
import { useContentStore } from '../store/contentStore';
import { useJourneyStore } from '../store/journeyStore';
import { useSubscriptionStore } from '../store/subscriptionStore';

// Helper to convert hex to rgba with alpha
function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function DevToolsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Store access
  const { velocityScore, sessions, certProgress } = useJourneyStore();
  const { isPremium } = useSubscriptionStore();
  const { isLoggedIn } = useAuthStore();
  const { importedContent } = useContentStore();

  // Calculate certs earned
  const certsEarned = Object.values(certProgress).filter((p) => p.examPassed).length;

  // Handle auth token clearing
  const handleClearAuthToken = useCallback(async () => {
    Alert.alert(
      'Clear Auth Token',
      'This will clear the Supabase auth token and force a new anonymous sign-in. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('supabase.auth.token');
              Alert.alert(
                'Cleared',
                'Auth token cleared. Restart the app to get a fresh anonymous session.'
              );
            } catch (_error) {
              Alert.alert('Error', 'Failed to clear auth token');
            }
          },
        },
      ]
    );
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Glass Header */}
      <GlassView
        appearance={theme.id === 'dark' || theme.id === 'midnight' ? 'dark' : 'light'}
        style={[styles.header, { paddingTop: insets.top + SPACING.md }]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={SIZES.iconLg} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>Developer Tools</Text>
        <View style={styles.headerSpacer} />
      </GlassView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ============================================================ */}
        {/* SECTION 1: JOURNEY STATE */}
        {/* ============================================================ */}

        <Text style={[styles.sectionHeader, { color: theme.textColor }]}>
          Journey State
        </Text>

        <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
          <View style={styles.stateRow}>
            <Text style={[styles.stateLabel, { color: theme.textColor }]}>Current State</Text>
            <Text style={[styles.stateValue, { color: theme.accentColor }]}>
              VS {velocityScore} • {sessions.length} sessions • {certsEarned} certs
            </Text>
          </View>
        </View>

        {/* ============================================================ */}
        {/* SECTION 2: SUBSCRIPTION STATUS (READ-ONLY) */}
        {/* ============================================================ */}

        <Text style={[styles.sectionHeader, { color: theme.textColor }]}>
          Subscription
        </Text>

        <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: theme.textColor }]}>Status:</Text>
            {isPremium ? (
              <View style={styles.statusBadge}>
                <Ionicons name="checkmark-circle" size={16} color={JOURNEY_COLORS.success} />
                <Text style={[styles.statusText, { color: JOURNEY_COLORS.success }]}>
                  Premium
                </Text>
              </View>
            ) : (
              <Text style={[styles.statusText, { color: JOURNEY_COLORS.textSecondary }]}>
                Free
              </Text>
            )}
          </View>
        </View>

        {/* ============================================================ */}
        {/* SECTION 3: AUTHENTICATION TESTING */}
        {/* ============================================================ */}

        <Text style={[styles.sectionHeader, { color: theme.textColor }]}>
          Authentication
        </Text>

        <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: theme.textColor }]}>Auth Status:</Text>
            <Text style={[styles.statusText, { color: JOURNEY_COLORS.textSecondary }]}>
              {isLoggedIn ? 'Signed in' : 'Not signed in'}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.devButton, { borderColor: JOURNEY_COLORS.low }]}
            onPress={handleClearAuthToken}
          >
            <Text style={[styles.devButtonText, { color: JOURNEY_COLORS.low }]}>
              Clear Auth Token (Debug)
            </Text>
          </TouchableOpacity>
        </View>

        {/* ============================================================ */}
        {/* SECTION 4: CONTENT & STORAGE INSPECTION */}
        {/* ============================================================ */}

        <Text style={[styles.sectionHeader, { color: theme.textColor }]}>
          Storage & Content
        </Text>

        <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: theme.textColor }]}>Imported Content:</Text>
            <Text style={[styles.statusText, { color: JOURNEY_COLORS.textSecondary }]}>
              {importedContent.length} items
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.navButton, { borderColor: theme.accentColor }]}
            onPress={() => router.push('/debug-storage')}
          >
            <Text style={[styles.navButtonText, { color: theme.accentColor }]}>
              Debug Storage
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.accentColor} />
          </TouchableOpacity>
        </View>

        {/* ============================================================ */}
        {/* SECTION 5: RSVP & VISUAL TESTS */}
        {/* ============================================================ */}

        <Text style={[styles.sectionHeader, { color: theme.textColor }]}>
          Visual Tests
        </Text>

        <View style={[styles.card, { backgroundColor: theme.secondaryBackground }]}>
          <TouchableOpacity
            style={[styles.navButton, { borderColor: theme.accentColor }]}
            onPress={() => router.push('/reader/long-words')}
          >
            <Text style={[styles.navButtonText, { color: theme.accentColor }]}>
              Test Long Words
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.accentColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, { borderColor: theme.accentColor, marginBottom: 0 }]}
            onPress={() => router.push('/reader/demo')}
          >
            <Text style={[styles.navButtonText, { color: theme.accentColor }]}>
              Demo Reader
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.accentColor} />
          </TouchableOpacity>
        </View>

        {/* Bottom padding */}
        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>

      {/* Top gradient overlay */}
      <LinearGradient
        colors={[theme.backgroundColor, hexToRGBA(theme.backgroundColor, 0)]}
        style={[styles.gradientTop, { height: insets.top + SPACING.massive }]}
        pointerEvents="none"
      />
    </View>
  );
}

// ============================================================
// Styles
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: COMPONENT_SPACING.screenPadding,
    paddingBottom: SPACING.md,
    zIndex: 10,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    ...TYPOGRAPHY.pageTitle,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: SIZES.iconLg + SPACING.xs * 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: COMPONENT_SPACING.screenPadding,
    paddingTop: SPACING.lg,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  sectionHeader: {
    ...TYPOGRAPHY.sectionTitle,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  card: {
    padding: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.card,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  stateRow: {
    marginBottom: SPACING.md,
  },
  stateLabel: {
    ...TYPOGRAPHY.label,
    marginBottom: SPACING.xs,
    opacity: 0.6,
  },
  stateValue: {
    ...TYPOGRAPHY.body,
    fontWeight: FONT_WEIGHTS.medium,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  statusLabel: {
    ...TYPOGRAPHY.label,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statusText: {
    ...TYPOGRAPHY.body,
  },
  personaScroll: {
    marginHorizontal: -SPACING.lg,
    marginBottom: SPACING.sm,
  },
  personaScrollContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  personaButton: {
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
    backgroundColor: 'rgba(255,255,255,0.1)',
    minWidth: 120,
    alignItems: 'center',
  },
  personaButtonActive: {
    borderWidth: 2,
    // borderColor should be applied inline with theme.accentColor if this style is used
  },
  personaButtonReset: {
    backgroundColor: 'rgba(255,100,100,0.2)',
  },
  personaButtonLabel: {
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.medium,
    fontSize: TYPOGRAPHY.body.fontSize,
    marginBottom: SPACING.xs,
  },
  personaButtonDetail: {
    color: JOURNEY_COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption.fontSize,
  },
  applyingText: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.body.fontSize,
    textAlign: 'center',
  },
  devButton: {
    paddingVertical: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  devButtonText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.7,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  navButtonText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    flex: 1,
  },
});
