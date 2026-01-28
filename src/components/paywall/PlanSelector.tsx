/**
 * PlanSelector Component
 *
 * Displays yearly and monthly plan options with RevenueCat pricing.
 * Shows localized prices, trial information for yearly plans,
 * and visual indication of selected plan.
 */

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS } from '../../data/themes';
import { useTheme } from '../common/ThemeProvider';
import type { PurchasesPackage } from '../../services/purchases';

interface PlanSelectorProps {
  yearlyPackage: PurchasesPackage | null;
  monthlyPackage: PurchasesPackage | null;
  selectedPlan: 'yearly' | 'monthly';
  onPlanChange: (plan: 'yearly' | 'monthly') => void;
  isLoading: boolean;
}

export function PlanSelector({
  yearlyPackage,
  monthlyPackage,
  selectedPlan,
  onPlanChange,
  isLoading,
}: PlanSelectorProps) {
  const { theme } = useTheme();
  const { t } = useTranslation('subscription');

  if (isLoading) {
    return (
      <View testID="plan-selector-loading" style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.accentColor} />
      </View>
    );
  }

  const hasAnyPackage = yearlyPackage || monthlyPackage;

  if (!hasAnyPackage) {
    return (
      <View style={styles.noPlansContainer}>
        <Text style={[styles.noPlansText, { color: theme.textSecondaryColor }]}>
          {t('paywall.plans.no_plans')}
        </Text>
      </View>
    );
  }

  // Calculate monthly equivalent for yearly plan
  const yearlyMonthlyEquivalent = yearlyPackage
    ? (yearlyPackage.product.price / 12).toFixed(2)
    : null;

  // Extract currency symbol from priceString (e.g., "$39.99" → "$", "€39.99" → "€")
  const currencySymbol = yearlyPackage?.product.priceString?.replace(/[\d.,\s]/g, '').trim() || '$';

  // Extract trial info from yearly plan
  const trialDays = yearlyPackage?.product.introPrice?.periodUnit === 'DAY'
    ? yearlyPackage.product.introPrice.periodNumberOfUnits
    : null;

  return (
    <View style={styles.container}>
      {yearlyPackage && (
        <TouchableOpacity
          testID="yearly-plan-card"
          style={[
            styles.planCard,
            {
              backgroundColor: theme.secondaryBackground,
              borderColor: selectedPlan === 'yearly' ? theme.accentColor : theme.trackColor,
              borderWidth: 2,
            },
          ]}
          onPress={() => onPlanChange('yearly')}
          activeOpacity={0.7}
          accessibilityLabel={`Yearly plan, ${yearlyPackage.product.priceString}${trialDays ? `, ${trialDays} day free trial` : ''}`}
          accessibilityRole="button"
          accessibilityState={{ selected: selectedPlan === 'yearly' }}
        >
          {/* Most Popular label - centered above card */}
          <View style={[styles.mostPopularLabel, { backgroundColor: theme.accentColor }]}>
            <Text style={styles.mostPopularText}>{t('paywall.plans.most_popular')}</Text>
          </View>
          {/* Savings badge - top right corner */}
          <View style={styles.savingsBadge}>
            <Text style={styles.savingsBadgeText}>{t('paywall.plans.save_percent', { percent: 17 })}</Text>
          </View>
          <Text style={[styles.planLabel, { color: theme.textColor }]}>{t('paywall.plans.yearly')}</Text>
          <Text style={[styles.planPrice, { color: theme.textColor }]}>
            {yearlyPackage.product.priceString}
          </Text>
          {yearlyMonthlyEquivalent && (
            <Text style={[styles.planEquivalent, { color: theme.textSecondaryColor }]}>
              {t('paywall.plans.per_month', { price: `${currencySymbol}${yearlyMonthlyEquivalent}` })}
            </Text>
          )}
          {trialDays && (
            <Text style={[styles.planTrial, { color: theme.accentColor }]}>
              {t('paywall.plans.free_trial', { days: trialDays })}
            </Text>
          )}
        </TouchableOpacity>
      )}

      {monthlyPackage && (
        <TouchableOpacity
          testID="monthly-plan-card"
          style={[
            styles.planCard,
            {
              backgroundColor: theme.secondaryBackground,
              borderColor: selectedPlan === 'monthly' ? theme.accentColor : theme.trackColor,
              borderWidth: 2,
            },
          ]}
          onPress={() => onPlanChange('monthly')}
          activeOpacity={0.7}
          accessibilityLabel={`Monthly plan, ${monthlyPackage.product.priceString}`}
          accessibilityRole="button"
          accessibilityState={{ selected: selectedPlan === 'monthly' }}
        >
          <Text style={[styles.planLabel, { color: theme.textColor }]}>{t('paywall.plans.monthly')}</Text>
          <Text style={[styles.planPrice, { color: theme.textColor }]}>
            {monthlyPackage.product.priceString}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.lg, // Room for "Most Popular" label above card
  },
  loadingContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPlansContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPlansText: {
    ...TYPOGRAPHY.body,
  },
  planCard: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90,
  },
  planLabel: {
    ...TYPOGRAPHY.cardSubtitle,
    marginBottom: SPACING.xs,
  },
  planPrice: {
    ...TYPOGRAPHY.button,
    marginBottom: SPACING.xs,
  },
  planEquivalent: {
    ...TYPOGRAPHY.caption,
  },
  planTrial: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xs,
  },
  savingsBadge: {
    position: 'absolute',
    bottom: -SPACING.sm,
    alignSelf: 'center',
    backgroundColor: JOURNEY_COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xxs,
    borderRadius: COMPONENT_RADIUS.chip,
    zIndex: 1,
  },
  savingsBadgeText: {
    ...TYPOGRAPHY.caption,
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  mostPopularLabel: {
    position: 'absolute',
    top: -SPACING.lg,
    alignSelf: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xxs,
    borderRadius: COMPONENT_RADIUS.chip,
    zIndex: 2,
  },
  mostPopularText: {
    ...TYPOGRAPHY.caption,
    color: JOURNEY_COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
