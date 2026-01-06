import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useTheme } from '../common/ThemeProvider';
import { Certificate, getCertificateDefinition } from '../../types/certificates';

interface NewCertificateModalProps {
  certificate: Certificate | null;
  visible: boolean;
  onClose: () => void;
}

export function NewCertificateModal({ certificate, visible, onClose }: NewCertificateModalProps) {
  const { theme } = useTheme();

  if (!certificate) return null;

  const definition = getCertificateDefinition(certificate.type);
  if (!definition) return null;

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

          <View style={[styles.iconContainer, { backgroundColor: definition.color + '20' }]}>
            <Text style={styles.icon}>{definition.icon}</Text>
          </View>

          <Text style={[styles.title, { color: theme.textColor }]}>
            {definition.title}
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
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  congrats: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 16,
  },
  stat: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
