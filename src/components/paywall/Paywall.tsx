import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../common/ThemeProvider';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { MOCK_OFFERING, FREE_TIER_LIMITS, PREMIUM_LIMITS } from '../../types/subscription';

interface PaywallProps {
  visible: boolean;
  onClose: () => void;
  reason?: 'wpm_limit' | 'content_limit';
}

export function Paywall({ visible, onClose, reason = 'content_limit' }: PaywallProps) {
  const { theme } = useTheme();
  const { simulatePurchase, simulateRestore, isLoading } = useSubscriptionStore();
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    setError(null);
    const success = await simulatePurchase();
    if (success) {
      onClose();
    } else {
      setError('Purchase failed. Please try again.');
    }
  };

  const handleRestore = async () => {
    setError(null);
    const restored = await simulateRestore();
    if (restored) {
      onClose();
    } else {
      setError('No previous purchases found.');
    }
  };

  const reasonText = reason === 'wpm_limit'
    ? `Free tier is limited to ${FREE_TIER_LIMITS.MAX_WPM} WPM`
    : `You've reached the free limit of ${FREE_TIER_LIMITS.MAX_CONTENT} articles`;

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
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={[styles.closeText, { color: theme.textColor }]}>✕</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={[styles.title, { color: theme.textColor }]}>
            Upgrade to Premium
          </Text>

          {/* Reason */}
          <Text style={[styles.reason, { color: theme.orpColor }]}>
            {reasonText}
          </Text>

          {/* Benefits */}
          <View style={styles.benefits}>
            <BenefitItem
              text={`Read up to ${PREMIUM_LIMITS.MAX_WPM} WPM`}
              theme={theme}
            />
            <BenefitItem
              text="Unlimited articles & imports"
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
            {MOCK_OFFERING.priceString}
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
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.purchaseText}>Subscribe Now</Text>
            )}
          </TouchableOpacity>

          {/* Restore */}
          <TouchableOpacity
            style={styles.restoreButton}
            onPress={handleRestore}
            disabled={isLoading}
          >
            <Text style={[styles.restoreText, { color: theme.textColor }]}>
              Restore Purchases
            </Text>
          </TouchableOpacity>

          {/* Dev note */}
          <Text style={[styles.devNote, { color: theme.textColor }]}>
            (Dev mode: Simulated purchase)
          </Text>
        </View>
      </View>
    </Modal>
  );
}

function BenefitItem({ text, theme }: { text: string; theme: any }) {
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 1,
  },
  closeText: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  reason: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  benefits: {
    marginBottom: 24,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  purchaseButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  purchaseText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  restoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  restoreText: {
    fontSize: 14,
    opacity: 0.7,
  },
  devNote: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 8,
  },
});
