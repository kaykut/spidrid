/**
 * Paywall Route
 *
 * Full-screen modal route for premium subscription paywall.
 * Slides up from the bottom and can be dismissed via X button or swipe gesture.
 *
 * Route params:
 * - trigger: PaywallTrigger - The reason the paywall was shown (e.g., 'upgrade', 'daily_limit')
 */

import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/common/ThemeProvider';
import { PaywallFeature } from '../components/paywall/PaywallFeature';
import { PlanSelector } from '../components/paywall/PlanSelector';
import {
  PAYWALL_COPY,
  PAYWALL_SUBHEADLINES,
  LEGAL_URLS,
  type PaywallTrigger,
} from '../constants/paywall';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../constants/typography';
import { JOURNEY_COLORS } from '../data/themes';
import * as PurchasesService from '../services/purchases';
import type { PurchasesPackage } from '../services/purchases';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { isNetworkError } from '../utils/networkUtils';

export default function PaywallScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  // Parse route params including deep link support
  // Deep link format: devoro://paywall?trigger=upgrade&referrer=marketing_email
  const { trigger = 'default', referrer } = useLocalSearchParams<{
    trigger?: string;
    referrer?: string;
  }>();

  // Subscription state
  const { isPremium, isLoading, isRestoring, restorePurchases } = useSubscriptionStore();

  // Local state
  const [yearlyPackage, setYearlyPackage] = useState<PurchasesPackage | null>(null);
  const [monthlyPackage, setMonthlyPackage] = useState<PurchasesPackage | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');
  const [isLoadingOfferings, setIsLoadingOfferings] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  // Get contextual subheadline based on trigger
  const triggerKey = (trigger as PaywallTrigger) || 'default';
  const subheadline = PAYWALL_SUBHEADLINES[triggerKey] || PAYWALL_COPY.defaultSubheadline;

  // Track mount time for analytics
  const [mountTime] = useState(Date.now());

  // Analytics: paywall_viewed on mount (includes deep link referrer if present)
  useEffect(() => {
    const eventData: Record<string, string | undefined> = { trigger: triggerKey };
    if (referrer) {
      eventData.referrer = referrer;
      eventData.source = 'deep_link';
    }
    console.log('[Analytics] paywall_viewed', eventData);
  }, [triggerKey, referrer]);

  // Fetch offerings function (reusable for retry)
  const fetchOfferings = async () => {
    setIsLoadingOfferings(true);
    setError(null);
    setIsOffline(false);
    try {
      const offerings = await PurchasesService.getOfferings();
      const yearly = offerings.find(pkg => pkg.identifier === '$rc_annual') || null;
      const monthly = offerings.find(pkg => pkg.identifier === '$rc_monthly') || null;
      setYearlyPackage(yearly);
      setMonthlyPackage(monthly);
    } catch (err) {
      console.error('[Paywall] Failed to fetch offerings:', err);
      if (isNetworkError(err)) {
        setIsOffline(true);
        setError('Connect to internet to subscribe');
      } else {
        setError('Pricing unavailable');
      }
    } finally {
      setIsLoadingOfferings(false);
    }
  };

  // Fetch offerings on mount
  useEffect(() => {
    fetchOfferings();
  }, []);

  // If already premium, dismiss immediately
  useEffect(() => {
    if (isPremium) {
      Alert.alert('Already Subscribed', "You're already a premium member!");
      router.back();
    }
  }, [isPremium]);

  const handleClose = () => {
    const timeSpent = Math.round((Date.now() - mountTime) / 1000);
    console.log('[Analytics] paywall_dismissed', { trigger: triggerKey, timeSpent });
    router.back();
  };

  const handlePurchase = async () => {
    const selectedPackage = selectedPlan === 'yearly' ? yearlyPackage : monthlyPackage;
    if (!selectedPackage) {
      return;
    }

    console.log('[Analytics] purchase_initiated', { plan: selectedPlan, trigger: triggerKey });
    setIsPurchasing(true);
    setError(null);

    try {
      const customerInfo = await PurchasesService.purchasePackage(selectedPackage);
      if (customerInfo) {
        const hasPremium = customerInfo.entitlements.active[PurchasesService.getPremiumEntitlement()] !== undefined;
        if (hasPremium) {
          console.log('[Analytics] purchase_completed', { plan: selectedPlan, trigger: triggerKey });
          useSubscriptionStore.setState({ isPremium: true });
          router.back();
          return;
        }
      }
      console.log('[Analytics] purchase_failed', { plan: selectedPlan, trigger: triggerKey, reason: 'no_entitlement' });
      setError('Purchase failed. Please try again.');
    } catch (err: unknown) {
      // Check if user cancelled
      const errorCode = (err as { userCancelled?: boolean })?.userCancelled;
      if (errorCode) {
        console.log('[Analytics] purchase_cancelled', { plan: selectedPlan, trigger: triggerKey });
        // User cancelled - dismiss silently
        return;
      }
      console.error('[Paywall] Purchase error:', err);
      console.log('[Analytics] purchase_failed', { plan: selectedPlan, trigger: triggerKey, reason: 'error' });
      setError('Purchase failed. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleRestore = async () => {
    console.log('[Analytics] restore_initiated', { trigger: triggerKey });
    const result = await restorePurchases();
    if (result.success) {
      console.log('[Analytics] restore_completed', { success: true, trigger: triggerKey });
      Alert.alert('Purchases Restored!', 'Your subscription has been restored.');
      router.back();
    } else if (result.error) {
      console.log('[Analytics] restore_completed', { success: false, trigger: triggerKey, error: result.error });
      Alert.alert('Error', result.error);
    } else {
      console.log('[Analytics] restore_completed', { success: false, trigger: triggerKey, noPurchases: true });
      Alert.alert('No Purchases Found', result.message || 'No previous purchases found.');
    }
  };

  const handleOpenTerms = () => {
    Linking.openURL(LEGAL_URLS.terms);
  };

  const handleOpenPrivacy = () => {
    Linking.openURL(LEGAL_URLS.privacy);
  };

  const handlePlanChange = (plan: 'yearly' | 'monthly') => {
    console.log('[Analytics] plan_selected', { plan, trigger: triggerKey });
    setSelectedPlan(plan);
  };

  // Get CTA text based on selected plan and trial availability
  const selectedPackage = selectedPlan === 'yearly' ? yearlyPackage : monthlyPackage;
  const trialDays = selectedPackage?.product.introPrice?.periodUnit === 'DAY'
    ? selectedPackage.product.introPrice.periodNumberOfUnits
    : null;
  const ctaText = trialDays
    ? PAYWALL_COPY.ctaWithTrial.replace('{trial_days}', String(trialDays))
    : PAYWALL_COPY.ctaWithoutTrial;

  // Get CTA subtext showing price
  const priceString = selectedPackage?.product.priceString || '';
  const ctaSubtext = selectedPackage
    ? (trialDays
        ? PAYWALL_COPY.ctaSubtextWithTrial.replace('{price}', priceString)
        : PAYWALL_COPY.ctaSubtextWithoutTrial.replace('{price}', priceString))
    : null;

  // Image height is ~30% of screen
  const imageHeight = screenHeight * 0.3;

  return (
    <View
      testID="paywall-screen"
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {/* Close button */}
      <TouchableOpacity
        testID="paywall-close-button"
        style={[styles.closeButton, { top: insets.top + SPACING.sm }]}
        onPress={handleClose}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityLabel="Close paywall"
        accessibilityRole="button"
      >
        <Ionicons name="close" size={SIZES.iconLg} color={theme.textColor} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + SPACING.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration image */}
        <Image
          source={require('../../assets/paywall_image.jpg')}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="cover"
        />

        {/* Content */}
        <View style={styles.content}>
          {/* Headline */}
          <Text style={[styles.headline, { color: theme.textColor }]}>
            {PAYWALL_COPY.headline}
          </Text>

          {/* Subheadline */}
          <Text style={[styles.subheadline, { color: theme.textSecondaryColor }]}>
            {subheadline}
          </Text>

          {/* Features */}
          <View style={styles.features}>
            {PAYWALL_COPY.features.map((feature, index) => (
              <PaywallFeature
                key={index}
                icon={feature.icon as keyof typeof Ionicons.glyphMap}
                title={feature.title}
                subtitle={feature.subtitle}
              />
            ))}
          </View>

          {/* Plan Selector */}
          <View style={styles.planSelectorContainer}>
            <PlanSelector
              yearlyPackage={yearlyPackage}
              monthlyPackage={monthlyPackage}
              selectedPlan={selectedPlan}
              onPlanChange={handlePlanChange}
              isLoading={isLoadingOfferings}
            />
          </View>

          {/* Error message with retry button */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={[styles.error, { color: theme.orpColor }]}>{error}</Text>
              <TouchableOpacity
                style={[styles.retryButton, { borderColor: theme.accentColor }]}
                onPress={fetchOfferings}
                disabled={isLoadingOfferings}
              >
                {isLoadingOfferings ? (
                  <ActivityIndicator size="small" color={theme.accentColor} />
                ) : (
                  <Text style={[styles.retryButtonText, { color: theme.accentColor }]}>
                    Retry
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Primary CTA */}
          <TouchableOpacity
            testID="paywall-primary-cta"
            style={[
              styles.primaryCta,
              { backgroundColor: theme.accentColor },
              (isOffline || (!yearlyPackage && !monthlyPackage)) && styles.ctaDisabled,
            ]}
            onPress={handlePurchase}
            disabled={isPurchasing || isLoading || isOffline || (!yearlyPackage && !monthlyPackage)}
            accessibilityLabel={isOffline ? 'Connect to internet to subscribe' : ctaText}
            accessibilityRole="button"
            accessibilityState={{ disabled: isOffline || (!yearlyPackage && !monthlyPackage) }}
          >
            {isPurchasing ? (
              <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
            ) : (
              <Text style={styles.primaryCtaText}>
                {isOffline ? 'Connect to internet' : ctaText}
              </Text>
            )}
          </TouchableOpacity>

          {/* CTA Subtext showing price */}
          {ctaSubtext && (
            <Text style={[styles.ctaSubtext, { color: theme.textSecondaryColor }]}>
              {ctaSubtext}
            </Text>
          )}

          {/* Secondary CTA */}
          <TouchableOpacity
            style={styles.secondaryCta}
            onPress={handleClose}
            accessibilityLabel="Dismiss paywall"
            accessibilityRole="button"
          >
            <Text style={[styles.secondaryCtaText, { color: theme.textSecondaryColor }]}>
              {PAYWALL_COPY.secondaryCta}
            </Text>
          </TouchableOpacity>

          {/* Footer links */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.footerLink}
              onPress={handleRestore}
              disabled={isRestoring}
              accessibilityLabel="Restore purchases"
              accessibilityRole="button"
            >
              {isRestoring ? (
                <ActivityIndicator size="small" color={theme.metaColor} />
              ) : (
                <Text style={[styles.footerLinkText, { color: theme.metaColor }]}>
                  Restore purchases
                </Text>
              )}
            </TouchableOpacity>

            <Text style={[styles.footerDot, { color: theme.metaColor }]}>•</Text>

            <TouchableOpacity
              style={styles.footerLink}
              onPress={handleOpenTerms}
              accessibilityLabel="Terms of service"
              accessibilityRole="link"
            >
              <Text style={[styles.footerLinkText, { color: theme.metaColor }]}>
                Terms
              </Text>
            </TouchableOpacity>

            <Text style={[styles.footerDot, { color: theme.metaColor }]}>•</Text>

            <TouchableOpacity
              style={styles.footerLink}
              onPress={handleOpenPrivacy}
              accessibilityLabel="Privacy policy"
              accessibilityRole="link"
            >
              <Text style={[styles.footerLinkText, { color: theme.metaColor }]}>
                Privacy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: SPACING.md,
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
    flexGrow: 1,
  },
  image: {
    width: '100%',
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  headline: {
    ...TYPOGRAPHY.pageTitle,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subheadline: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  features: {
    marginBottom: SPACING.lg,
  },
  planSelectorContainer: {
    marginBottom: SPACING.lg,
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  error: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  retryButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  retryButtonText: {
    ...TYPOGRAPHY.buttonSmall,
  },
  primaryCta: {
    height: 54,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  ctaDisabled: {
    opacity: 0.5,
  },
  primaryCtaText: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.button,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  ctaSubtext: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  secondaryCta: {
    height: SIZES.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  secondaryCtaText: {
    ...TYPOGRAPHY.body,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  footerLink: {
    minHeight: SIZES.touchTarget,
    paddingHorizontal: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLinkText: {
    ...TYPOGRAPHY.caption,
  },
  footerDot: {
    ...TYPOGRAPHY.caption,
  },
});
