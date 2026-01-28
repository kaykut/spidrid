/**
 * AuthModal Component
 *
 * Bottom sheet modal for authenticating with Google OAuth and Apple ID.
 * Used by premium users to enable multi-device sync.
 */

import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('auth');
  const { signInWithGoogle, signInWithApple, authError } = useAuthStore();

  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isAppleAvailable, setIsAppleAvailable] = useState(false);
  const isLoadingGoogle = loadingProvider === 'google';
  const isLoadingApple = loadingProvider === 'apple';
  const isAnyLoading = loadingProvider !== null;

  // Combine local error (from signInWithGoogle throwing) with store error (from deep link callback)
  const error = localError || authError;

  const handleGoogleSignIn = async () => {
    // Clear both local error and store error
    setLocalError(null);
    useAuthStore.setState({ authError: null });
    setLoadingProvider('google');

    try {
      await signInWithGoogle();
      onSuccess();
      onClose();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : t('errors.google_failed'));
    } finally {
      setLoadingProvider(null);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (Platform.OS !== 'ios') {
      return () => {
        isMounted = false;
      };
    }

    AppleAuthentication.isAvailableAsync()
      .then((available) => {
        if (isMounted) {
          setIsAppleAvailable(available);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsAppleAvailable(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAppleSignIn = async () => {
    setLocalError(null);
    useAuthStore.setState({ authError: null });
    setLoadingProvider('apple');

    try {
      await signInWithApple();
      onSuccess();
      onClose();
    } catch (err) {
      if ((err as { code?: string })?.code !== 'ERR_REQUEST_CANCELED') {
        setLocalError(err instanceof Error ? err.message : t('errors.apple_failed'));
      }
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleClose = () => {
    if (!isAnyLoading) {
      setLocalError(null);
      useAuthStore.setState({ authError: null });
      onClose();
    }
  };


  const renderAuthOptions = () => (
    <>
      <Text style={[styles.description, { color: JOURNEY_COLORS.textSecondary }]}>
        {t('sync.desc')}
      </Text>

      <View style={[styles.warningContainer, { backgroundColor: `${JOURNEY_COLORS.warning}15`, borderColor: `${JOURNEY_COLORS.warning}30` }]}>
        <Ionicons name="information-circle-outline" size={SIZES.iconSm} color={JOURNEY_COLORS.warning} />
        <Text style={[styles.warningText, { color: JOURNEY_COLORS.textSecondary }]}>
          {t('sync.warning')}
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
        disabled={isAnyLoading}
        activeOpacity={0.8}
      >
        {isLoadingGoogle ? (
          <ActivityIndicator color={theme.textColor} />
        ) : (
          <>
            <Ionicons name="logo-google" size={SIZES.iconMd} color={theme.textColor} />
            <Text style={[styles.googleButtonText, { color: theme.textColor }]}>
              {t('modal.continue_google')}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {Platform.OS === 'ios' && isAppleAvailable ? (
        <View style={styles.appleButtonWrapper}>
          {/* AppleAuthenticationButton doesn't support disabled prop,
              so we handle loading state inside the onPress handler */}
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={COMPONENT_RADIUS.button}
            style={[styles.appleButton, isAnyLoading && { opacity: 0.5 }]}
            onPress={() => {
              if (!isAnyLoading) {
                void handleAppleSignIn();
              }
            }}
            testID="apple-sign-in-button"
          />
          {isLoadingApple ? (
            <View style={styles.appleLoadingOverlay}>
              <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
            </View>
          ) : null}
        </View>
      ) : null}
    </>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
          <View style={[styles.header, { borderBottomColor: theme.secondaryBackground }]}>
            <Text style={[styles.headerTitle, { color: theme.textColor }]}>
              {t('modal.title_sync')}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              disabled={isAnyLoading}
            >
              <Ionicons
                name="close"
                size={SIZES.iconMd}
                color={isAnyLoading ? JOURNEY_COLORS.textTertiary : theme.textColor}
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
  appleButtonWrapper: {
    marginTop: SPACING.sm,
    position: 'relative',
  },
  appleButton: {
    width: '100%',
    height: SIZES.touchTarget,
  },
  appleLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    ...TYPOGRAPHY.button,
  },
});
