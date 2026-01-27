/**
 * PlanSelector Component
 *
 * Displays yearly and monthly plan options with RevenueCat pricing.
 * Shows localized prices, trial information for yearly plans,
 * and visual indication of selected plan.
 */

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
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
          No plans available
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
          <Text style={[styles.planLabel, { color: theme.textColor }]}>Yearly</Text>
          <Text style={[styles.planPrice, { color: theme.textColor }]}>
            {yearlyPackage.product.priceString}
          </Text>
          {yearlyMonthlyEquivalent && (
            <Text style={[styles.planEquivalent, { color: theme.textSecondaryColor }]}>
              {currencySymbol}{yearlyMonthlyEquivalent}/mo
            </Text>
          )}
          {trialDays && (
            <Text style={[styles.planTrial, { color: theme.accentColor }]}>
              {trialDays} day free trial
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
          <Text style={[styles.planLabel, { color: theme.textColor }]}>Monthly</Text>
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
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
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
});
