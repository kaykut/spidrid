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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/common/ThemeProvider';
import { PaywallFeature } from '../components/paywall/PaywallFeature';
import { PlanSelector } from '../components/paywall/PlanSelector';
import {
  LEGAL_URLS,
  type PaywallTrigger,
} from '../constants/paywall';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../constants/typography';
import { JOURNEY_COLORS } from '../data/themes';
import * as PurchasesService from '../services/purchases';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { isNetworkError } from '../utils/networkUtils';
import type { PurchasesPackage } from '../services/purchases';

export default function PaywallScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('subscription');

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
  const subheadlineKey = `paywall.subheadline_${triggerKey}`;
  const subheadline = t(subheadlineKey);

  // Track mount time for analytics (TODO: use when analytics service is integrated)
  const [_mountTime] = useState(Date.now());

  // Analytics: paywall_viewed on mount (includes deep link referrer if present)
  useEffect(() => {
    // TODO: Integrate with analytics service
    // const eventData = { trigger: triggerKey, referrer, source: referrer ? 'deep_link' : undefined };
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
        setError(t('paywall.errors.offline'));
      } else {
        setError(t('paywall.errors.pricing_unavailable'));
      }
    } finally {
      setIsLoadingOfferings(false);
    }
  };

  // Fetch offerings on mount only - intentionally empty deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchOfferings(); }, []);

  // If already premium, dismiss immediately
  useEffect(() => {
    if (isPremium) {
      Alert.alert(t('alerts.already_subscribed_title'), t('alerts.already_subscribed_message'));
      router.back();
    }
  }, [isPremium, t]);

  const handleClose = () => {
    // TODO: Track paywall_dismissed with analytics (timeSpent: Date.now() - mountTime)
    router.back();
  };

  const handlePurchase = async () => {
    const selectedPackage = selectedPlan === 'yearly' ? yearlyPackage : monthlyPackage;
    if (!selectedPackage) {
      return;
    }

    // TODO: Track purchase_initiated with analytics
    setIsPurchasing(true);
    setError(null);

    try {
      const customerInfo = await PurchasesService.purchasePackage(selectedPackage);
      if (customerInfo) {
        const hasPremium = customerInfo.entitlements.active[PurchasesService.getPremiumEntitlement()] !== undefined;
        if (hasPremium) {
          // TODO: Track purchase_completed with analytics
          useSubscriptionStore.setState({ isPremium: true });
          router.back();
          return;
        }
      }
      // TODO: Track purchase_failed with analytics
      setError(t('alerts.purchase_failed'));
    } catch (err: unknown) {
      // Check if user cancelled
      const errorCode = (err as { userCancelled?: boolean })?.userCancelled;
      if (errorCode) {
        // User cancelled - dismiss silently
        // TODO: Track purchase_cancelled with analytics
        return;
      }
      // TODO: Track purchase_failed with analytics
      setError(t('alerts.purchase_failed'));
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleRestore = async () => {
    // TODO: Track restore_initiated with analytics
    const result = await restorePurchases();
    if (result.success) {
      // TODO: Track restore_completed with analytics
      Alert.alert(t('alerts.restored_title'), t('alerts.restored_message'));
      router.back();
    } else if (result.error) {
      // TODO: Track restore_failed with analytics
      Alert.alert(t('alerts.error_title'), result.error);
    } else {
      // TODO: Track restore_no_purchases with analytics
      Alert.alert(t('alerts.no_purchases_title'), result.message || t('alerts.no_purchases'));
    }
  };

  const handleOpenTerms = () => {
    Linking.openURL(LEGAL_URLS.terms);
  };

  const handleOpenPrivacy = () => {
    Linking.openURL(LEGAL_URLS.privacy);
  };

  const handlePlanChange = (plan: 'yearly' | 'monthly') => {
    // TODO: Track plan_selected with analytics
    setSelectedPlan(plan);
  };

  // Get CTA text based on selected plan and trial availability
  const selectedPackage = selectedPlan === 'yearly' ? yearlyPackage : monthlyPackage;
  const trialDays = selectedPackage?.product.introPrice?.periodUnit === 'DAY'
    ? selectedPackage.product.introPrice.periodNumberOfUnits
    : null;
  const ctaText = trialDays
    ? t('paywall.cta.try_free', { days: trialDays })
    : t('paywall.cta.subscribe');

  // Get CTA subtext showing price
  const priceString = selectedPackage?.product.priceString || '';
  const getCtaSubtext = () => {
    if (!selectedPackage) { return null; }
    if (trialDays) { return t('paywall.cta.then_price', { price: priceString }); }
    return t('paywall.cta.price_per_year', { price: priceString });
  };
  const ctaSubtext = getCtaSubtext();

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
        {/* Content */}
        <View style={styles.content}>
          {/* Headline */}
          <Text style={[styles.headline, { color: theme.textColor }]}>
            {t('paywall.headline')}
          </Text>

          {/* Subheadline */}
          <Text style={[styles.subheadline, { color: theme.textSecondaryColor }]}>
            {subheadline}
          </Text>

          {/* Features */}
          <View style={styles.features}>
            <PaywallFeature
              icon="infinite-outline"
              title={t('paywall.features.unlimited_title')}
              subtitle={t('paywall.features.unlimited_subtitle')}
            />
            <PaywallFeature
              icon="sync-outline"
              title={t('paywall.features.sync_title')}
              subtitle={t('paywall.features.sync_subtitle')}
            />
            <PaywallFeature
              icon="speedometer-outline"
              title={t('paywall.features.speed_title')}
              subtitle={t('paywall.features.speed_subtitle')}
            />
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
                    {t('paywall.errors.retry')}
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
            accessibilityLabel={isOffline ? t('paywall.errors.offline') : ctaText}
            accessibilityRole="button"
            accessibilityState={{ disabled: isOffline || (!yearlyPackage && !monthlyPackage) }}
          >
            {isPurchasing ? (
              <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
            ) : (
              <Text style={styles.primaryCtaText}>
                {isOffline ? t('paywall.errors.offline') : ctaText}
              </Text>
            )}
          </TouchableOpacity>

          {/* CTA Subtext showing price */}
          {ctaSubtext && (
            <Text style={[styles.ctaSubtext, { color: theme.textSecondaryColor }]}>
              {ctaSubtext}
            </Text>
          )}

          {/* Cancel anytime reassurance */}
          <Text style={[styles.cancelText, { color: theme.metaColor }]}>
            {t('paywall.trust.cancel_anytime')}
          </Text>

          {/* Footer links */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.footerLink}
              onPress={handleRestore}
              disabled={isRestoring}
              accessibilityLabel={t('paywall.footer.restore')}
              accessibilityRole="button"
            >
              {isRestoring ? (
                <ActivityIndicator size="small" color={theme.metaColor} />
              ) : (
                <Text style={[styles.footerLinkText, { color: theme.metaColor }]}>
                  {t('paywall.footer.restore')}
                </Text>
              )}
            </TouchableOpacity>

            <Text style={[styles.footerDot, { color: theme.metaColor }]}>•</Text>

            <TouchableOpacity
              style={styles.footerLink}
              onPress={handleOpenTerms}
              accessibilityLabel={t('paywall.footer.terms')}
              accessibilityRole="link"
            >
              <Text style={[styles.footerLinkText, { color: theme.metaColor }]}>
                {t('paywall.footer.terms')}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.footerDot, { color: theme.metaColor }]}>•</Text>

            <TouchableOpacity
              style={styles.footerLink}
              onPress={handleOpenPrivacy}
              accessibilityLabel={t('paywall.footer.privacy')}
              accessibilityRole="link"
            >
              <Text style={[styles.footerLinkText, { color: theme.metaColor }]}>
                {t('paywall.footer.privacy')}
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
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: SPACING.lg,
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
    marginBottom: SPACING.xs,
  },
  cancelText: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
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
