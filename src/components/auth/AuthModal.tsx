/**
 * AuthModal Component
 *
 * Bottom sheet modal for authenticating with Google OAuth.
 * Used by premium users to enable multi-device sync.
 */

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { JOURNEY_COLORS, OVERLAY_COLORS } from '../../data/themes';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../common/ThemeProvider';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ visible, onClose, onSuccess }: AuthModalProps) {
  const { theme } = useTheme();
  const { signInWithGoogle, authError } = useAuthStore();

  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Combine local error (from signInWithGoogle throwing) with store error (from deep link callback)
  const error = localError || authError;

  const handleGoogleSignIn = async () => {
    // Clear both local error and store error
    setLocalError(null);
    useAuthStore.setState({ authError: null });
    setIsLoadingGoogle(true);

    try {
      await signInWithGoogle();
      onSuccess();
      onClose();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setIsLoadingGoogle(false);
    }
  };


  const handleClose = () => {
    if (!isLoadingGoogle) {
      setLocalError(null);
      useAuthStore.setState({ authError: null });
      onClose();
    }
  };


  const renderAuthOptions = () => (
    <>
      <Text style={[styles.description, { color: JOURNEY_COLORS.textSecondary }]}>
        Sign in to sync your reading progress, certificates, and settings across all your devices.
      </Text>

      <View style={[styles.warningContainer, { backgroundColor: `${JOURNEY_COLORS.warning}15`, borderColor: `${JOURNEY_COLORS.warning}30` }]}>
        <Ionicons name="information-circle-outline" size={SIZES.iconSm} color={JOURNEY_COLORS.warning} />
        <Text style={[styles.warningText, { color: JOURNEY_COLORS.textSecondary }]}>
          Signing in will sync your cloud data to this device. Any articles or progress created locally before signing in will not be transferred.
        </Text>
      </View>

      {error && (
        <View style={[styles.errorContainer, { backgroundColor: `${JOURNEY_COLORS.low}20` }]}>
          <Ionicons name="alert-circle" size={SIZES.iconSm} color={JOURNEY_COLORS.low} />
          <Text style={[styles.errorText, { color: JOURNEY_COLORS.low }]}>{error}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.googleButton, { backgroundColor: theme.secondaryBackground }]}
        onPress={handleGoogleSignIn}
        disabled={isLoadingGoogle}
        activeOpacity={0.8}
      >
        {isLoadingGoogle ? (
          <ActivityIndicator color={theme.textColor} />
        ) : (
          <>
            <Ionicons name="logo-google" size={SIZES.iconMd} color={theme.textColor} />
            <Text style={[styles.googleButtonText, { color: theme.textColor }]}>
              Continue with Google
            </Text>
          </>
        )}
      </TouchableOpacity>
    </>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
          <View style={[styles.header, { borderBottomColor: theme.secondaryBackground }]}>
            <Text style={[styles.headerTitle, { color: theme.textColor }]}>
              Sync Across Devices
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              disabled={isLoadingGoogle}
            >
              <Ionicons
                name="close"
                size={SIZES.iconMd}
                color={isLoadingGoogle ? JOURNEY_COLORS.textTertiary : theme.textColor}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {renderAuthOptions()}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: OVERLAY_COLORS.modalBackdrop,
  },
  container: {
    borderTopLeftRadius: COMPONENT_RADIUS.modal,
    borderTopRightRadius: COMPONENT_RADIUS.modal,
    paddingBottom: SPACING.huge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.xl,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...TYPOGRAPHY.sectionHeader,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  content: {
    padding: SPACING.xl,
  },
  description: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.lg,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  warningText: {
    ...TYPOGRAPHY.caption,
    flex: 1,
    lineHeight: 18,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: COMPONENT_RADIUS.chip,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    flex: 1,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: COMPONENT_RADIUS.button,
    paddingVertical: SPACING.lg,
    gap: SPACING.sm,
  },
  googleButtonText: {
    ...TYPOGRAPHY.button,
  },
});
