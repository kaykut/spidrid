import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { SPACING, RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
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

          <View style={[styles.iconContainer, { backgroundColor: `${definition.color  }20` }]}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  container: {
    width: '100%',
    maxWidth: 320,
    borderRadius: SPACING.xxl,
    padding: SPACING.xxxl,
    alignItems: 'center',
  },
  congrats: {
    ...TYPOGRAPHY.button,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.lg,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
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
    borderRadius: RADIUS.lg,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: TYPOGRAPHY.levelName.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
