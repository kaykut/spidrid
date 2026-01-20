import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { JOURNEY_COLORS, OVERLAY_COLORS } from '../../data/themes';
import * as PurchasesService from '../../services/purchases';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { FREE_TIER_LIMITS, PREMIUM_LIMITS } from '../../types/subscription';
import { useTheme } from '../common/ThemeProvider';

interface PaywallProps {
  visible: boolean;
  onClose: () => void;
  reason?: 'wpm_limit' | 'generation_limit';
}

export function Paywall({ visible, onClose, reason }: PaywallProps) {
  const { theme } = useTheme();
  const { purchaseProduct, restorePurchases, isLoading, isRestoring } = useSubscriptionStore();
  const [error, setError] = useState<string | null>(null);
  const [priceString, setPriceString] = useState<string>('Loading...');

  // Fetch real price from RevenueCat when modal opens
  useEffect(() => {
    if (visible) {
      PurchasesService.getOfferings().then(offerings => {
        if (offerings.length > 0) {
          setPriceString(offerings[0].product.priceString);
        } else {
          setPriceString('Not available');
        }
      });
    }
  }, [visible]);

  const handlePurchase = async () => {
    setError(null);
    const success = await purchaseProduct();
    if (success) {
      onClose();
    } else {
      setError('Purchase failed. Please try again.');
    }
  };

  const handleRestore = async () => {
    setError(null);
    const result = await restorePurchases();
    if (result.success) {
      onClose();
    } else if (result.error) {
      setError(result.error);
    } else {
      setError(result.message || 'No previous purchases found.');
    }
  };

  let reasonText = '';
  if (reason === 'wpm_limit') {
    reasonText = `Free tier is limited to ${FREE_TIER_LIMITS.MAX_WPM} WPM`;
  } else if (reason === 'generation_limit') {
    reasonText = 'Free tier is limited to 3 AI-generated articles per day';
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
          {/* Header */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            testID="paywall.close-btn"
            accessible={true}
          >
            <Text style={[styles.closeText, { color: theme.textColor }]}>✕</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={[styles.title, { color: theme.textColor }]}>
            Upgrade to Premium
          </Text>

          {/* Reason */}
          {reasonText ? (
            <Text style={[styles.reason, { color: theme.orpColor }]}>
              {reasonText}
            </Text>
          ) : null}

          {/* Benefits */}
          <View style={styles.benefits}>
            <BenefitItem
              text={`Read up to ${PREMIUM_LIMITS.MAX_WPM} WPM`}
              theme={theme}
            />
            <BenefitItem
              text="Unlimited AI article generation"
              theme={theme}
            />
            <BenefitItem
              text="All topics & curriculum"
              theme={theme}
            />
            <BenefitItem
              text="Earn speed certificates"
              theme={theme}
            />
          </View>

          {/* Price */}
          <Text style={[styles.price, { color: theme.accentColor }]}>
            {priceString}
          </Text>

          {/* Error */}
          {error && (
            <Text style={[styles.error, { color: theme.orpColor }]}>
              {error}
            </Text>
          )}

          {/* Purchase button */}
          <TouchableOpacity
            style={[styles.purchaseButton, { backgroundColor: theme.accentColor }]}
            onPress={handlePurchase}
            disabled={isLoading || priceString === 'Loading...' || priceString === 'Not available'}
            testID="paywall.upgrade-btn"
            accessible={true}
          >
            {isLoading ? (
              <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
            ) : (
              <Text style={styles.purchaseText}>Subscribe Now</Text>
            )}
          </TouchableOpacity>

          {/* Restore */}
          <TouchableOpacity
            style={styles.restoreButton}
            onPress={handleRestore}
            disabled={isLoading || isRestoring}
          >
            {isRestoring ? (
              <ActivityIndicator size="small" color={theme.textColor} />
            ) : (
              <Text style={[styles.restoreText, { color: theme.textColor }]}>
                Restore Purchases
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function BenefitItem({ text, theme }: { text: string; theme: { accentColor: string; textColor: string } }) {
  return (
    <View style={styles.benefitRow}>
      <Text style={[styles.checkmark, { color: theme.accentColor }]}>✓</Text>
      <Text style={[styles.benefitText, { color: theme.textColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: OVERLAY_COLORS.modalBackdrop,
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: COMPONENT_RADIUS.modal,
    borderTopRightRadius: COMPONENT_RADIUS.modal,
    padding: SPACING.xxl,
    paddingBottom: SPACING.huge,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
    padding: SPACING.sm,
    zIndex: 1,
  },
  closeText: {
    fontSize: TYPOGRAPHY.metricLarge.fontSize,
  },
  title: {
    fontSize: TYPOGRAPHY.statLarge.fontSize,
    fontWeight: FONT_WEIGHTS.bold,
    textAlign: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  reason: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  benefits: {
    marginBottom: SPACING.xxl,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  checkmark: {
    ...TYPOGRAPHY.levelName,
    fontWeight: FONT_WEIGHTS.bold,
    marginRight: SPACING.md,
  },
  benefitText: {
    ...TYPOGRAPHY.cardSubtitle,
    fontWeight: FONT_WEIGHTS.regular,
  },
  price: {
    ...TYPOGRAPHY.metricLarge,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  error: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  purchaseButton: {
    paddingVertical: SPACING.lg,
    borderRadius: COMPONENT_RADIUS.button,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  purchaseText: {
    color: JOURNEY_COLORS.textPrimary,
    fontSize: TYPOGRAPHY.levelName.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  restoreButton: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  restoreText: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.7,
  },
});
