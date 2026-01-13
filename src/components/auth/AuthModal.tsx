/**
 * AuthModal Component
 *
 * Bottom sheet modal for authenticating with Google or email magic link.
 * Used by premium users to enable multi-device sync.
 */

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
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
  const { signInWithGoogle, signInWithMagicLink } = useAuthStore();

  const [email, setEmail] = useState('');
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const isLoading = isLoadingGoogle || isLoadingEmail;

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoadingGoogle(true);

    try {
      await signInWithGoogle();
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    setIsLoadingEmail(true);

    try {
      await signInWithMagicLink(email.trim());
      setEmailSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send magic link');
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setEmail('');
      setError(null);
      setEmailSent(false);
      onClose();
    }
  };

  const renderEmailSentConfirmation = () => (
    <View style={styles.emailSentContainer}>
      <View style={[styles.emailSentIcon, { backgroundColor: `${theme.accentColor  }20` }]}>
        <Ionicons name="mail-outline" size={SIZES.iconXl} color={theme.accentColor} />
      </View>
      <Text style={[styles.emailSentTitle, { color: theme.textColor }]}>
        Check your email
      </Text>
      <Text style={[styles.emailSentDescription, { color: JOURNEY_COLORS.textSecondary }]}>
        We sent a magic link to {email}. Click the link in the email to sign in.
      </Text>
      <TouchableOpacity
        style={[styles.doneButton, { backgroundColor: theme.accentColor }]}
        onPress={handleClose}
        activeOpacity={0.8}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAuthOptions = () => (
    <>
      <Text style={[styles.description, { color: JOURNEY_COLORS.textSecondary }]}>
        Sign in to sync your reading progress, certificates, and settings across all your devices.
      </Text>

      {error && (
        <View style={[styles.errorContainer, { backgroundColor: `${JOURNEY_COLORS.low  }20` }]}>
          <Ionicons name="alert-circle" size={SIZES.iconSm} color={JOURNEY_COLORS.low} />
          <Text style={[styles.errorText, { color: JOURNEY_COLORS.low }]}>{error}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.googleButton, { backgroundColor: theme.secondaryBackground }]}
        onPress={handleGoogleSignIn}
        disabled={isLoading}
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

      <View style={styles.dividerContainer}>
        <View style={[styles.divider, { backgroundColor: theme.secondaryBackground }]} />
        <Text style={[styles.dividerText, { color: JOURNEY_COLORS.textTertiary }]}>or</Text>
        <View style={[styles.divider, { backgroundColor: theme.secondaryBackground }]} />
      </View>

      <Text style={[styles.label, { color: theme.textColor }]}>Sign in with email</Text>
      <TextInput
        style={[
          styles.emailInput,
          {
            backgroundColor: theme.secondaryBackground,
            color: theme.textColor,
          },
        ]}
        placeholder="your@email.com"
        placeholderTextColor={JOURNEY_COLORS.textTertiary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isLoading}
      />

      <TouchableOpacity
        style={[
          styles.magicLinkButton,
          { backgroundColor: theme.accentColor },
          (!email.trim() || isLoading) && styles.buttonDisabled,
        ]}
        onPress={handleMagicLink}
        disabled={!email.trim() || isLoading}
        activeOpacity={0.8}
      >
        {isLoadingEmail ? (
          <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
        ) : (
          <Text style={styles.magicLinkButtonText}>Send Magic Link</Text>
        )}
      </TouchableOpacity>
    </>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
          <View style={[styles.header, { borderBottomColor: theme.secondaryBackground }]}>
            <Text style={[styles.headerTitle, { color: theme.textColor }]}>
              {emailSent ? 'Email Sent' : 'Sync Across Devices'}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Ionicons
                name="close"
                size={SIZES.iconMd}
                color={isLoading ? JOURNEY_COLORS.textTertiary : theme.textColor}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {emailSent ? renderEmailSentConfirmation() : renderAuthOptions()}
          </View>
        </View>
      </KeyboardAvoidingView>
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
    gap: SPACING.md,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...TYPOGRAPHY.caption,
  },
  label: {
    ...TYPOGRAPHY.labelSmall,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.sm,
  },
  emailInput: {
    borderRadius: COMPONENT_RADIUS.input,
    padding: SPACING.lg,
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.md,
  },
  magicLinkButton: {
    borderRadius: COMPONENT_RADIUS.button,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  magicLinkButtonText: {
    ...TYPOGRAPHY.button,
    color: JOURNEY_COLORS.textPrimary,
  },
  emailSentContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  emailSentIcon: {
    width: SPACING.huge,
    height: SPACING.huge,
    borderRadius: SPACING.huge / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  emailSentTitle: {
    ...TYPOGRAPHY.sectionTitle,
    marginBottom: SPACING.sm,
  },
  emailSentDescription: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  doneButton: {
    borderRadius: COMPONENT_RADIUS.button,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxl,
    alignItems: 'center',
  },
  doneButtonText: {
    ...TYPOGRAPHY.button,
    color: JOURNEY_COLORS.textPrimary,
  },
});
