import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { SPACING, COMPONENT_RADIUS, SIZES, COMPONENT_SIZES } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS, LETTER_SPACING } from '../../constants/typography';
import { withOpacity, OPACITY } from '../../utils/colorUtils';
import { JOURNEY_COLORS, OVERLAY_COLORS } from '../../data/themes';
import { Certificate, getCertificateDefinition } from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

interface NewCertificateModalProps {
  certificate: Certificate | null;
  visible: boolean;
  onClose: () => void;
}

export function NewCertificateModal({ certificate, visible, onClose }: NewCertificateModalProps) {
  const { theme } = useTheme();

  if (!certificate) {return null;}

  const definition = getCertificateDefinition(certificate.type);
  if (!definition) {return null;}

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
          <Text style={[styles.congrats, { color: theme.accentColor }]}>
            Congratulations!
          </Text>

          <View style={[styles.iconContainer, { backgroundColor: withOpacity(definition.color, OPACITY.light) }]}>
            <Text style={styles.icon}>{definition.icon}</Text>
          </View>

          <Text style={[styles.title, { color: theme.textColor }]}>
            {definition.name}
          </Text>

          <Text style={[styles.description, { color: theme.textColor }]}>
            {definition.description}
          </Text>

          <Text style={[styles.stat, { color: definition.color }]}>
            {certificate.wpm} WPM
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accentColor }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Awesome!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: OVERLAY_COLORS.modalBackdrop,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  container: {
    width: '100%',
    maxWidth: 320,
    borderRadius: COMPONENT_RADIUS.modal,
    padding: SPACING.xxxl,
    alignItems: 'center',
  },
  congrats: {
    ...TYPOGRAPHY.button,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.lg,
    textTransform: 'uppercase',
    letterSpacing: LETTER_SPACING.wide,
  },
  iconContainer: {
    width: COMPONENT_SIZES.celebrationIcon,
    height: COMPONENT_SIZES.celebrationIcon,
    borderRadius: COMPONENT_RADIUS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  icon: {
    fontSize: SIZES.iconHuge,
  },
  title: {
    fontSize: TYPOGRAPHY.statLarge.fontSize,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  description: {
    ...TYPOGRAPHY.button,
    fontWeight: FONT_WEIGHTS.regular,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  stat: {
    ...TYPOGRAPHY.metric,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.xxl,
  },
  button: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.massive,
    borderRadius: COMPONENT_RADIUS.button,
  },
  buttonText: {
    color: JOURNEY_COLORS.textPrimary,
    fontSize: TYPOGRAPHY.levelName.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
