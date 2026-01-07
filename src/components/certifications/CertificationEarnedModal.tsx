import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import {
  EarnedCertification,
  getCertificationTierDefinition,
} from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

interface CertificationEarnedModalProps {
  certification: EarnedCertification | null;
  visible: boolean;
  onClose: () => void;
  onViewJourney?: () => void;
}

export function CertificationEarnedModal({
  certification,
  visible,
  onClose,
  onViewJourney,
}: CertificationEarnedModalProps) {
  const { theme } = useTheme();

  if (!certification) { return null; }

  const definition = getCertificationTierDefinition(certification.tier);
  if (!definition) { return null; }

  const { wpm, accuracy, textsCompleted } = certification.earnedStats;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
          {/* Celebration header */}
          <Text style={[styles.celebrationText, { color: definition.color }]}>
            Certification Earned!
          </Text>

          {/* Icon with glow effect */}
          <View style={styles.iconWrapper}>
            <View
              style={[
                styles.iconGlow,
                { backgroundColor: `${definition.color}30` },
              ]}
            />
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${definition.color}20` },
              ]}
            >
              <Text style={styles.icon}>{definition.icon}</Text>
            </View>
          </View>

          <Text style={[styles.title, { color: theme.textColor }]}>
            {definition.title}
          </Text>

          <Text style={[styles.description, { color: theme.textColor }]}>
            {definition.description}
          </Text>

          {/* Stats */}
          <View style={[styles.statsContainer, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: definition.color }]}>
                {wpm}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>WPM</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.secondaryBackground }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: definition.color }]}>
                {accuracy}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>Accuracy</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.secondaryBackground }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: definition.color }]}>
                {textsCompleted}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textColor }]}>Texts</Text>
            </View>
          </View>

          {/* Action buttons */}
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: definition.color }]}
            onPress={onClose}
          >
            <Text style={styles.primaryButtonText}>Awesome!</Text>
          </TouchableOpacity>

          {onViewJourney && (
            <TouchableOpacity
              style={styles.linkButton}
              onPress={onViewJourney}
            >
              <Text style={[styles.linkButtonText, { color: definition.color }]}>
                View Certification Journey
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
  },
  celebrationText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  iconGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    top: -20,
    left: -20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 52,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: '100%',
    marginHorizontal: 8,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkButton: {
    paddingVertical: 8,
  },
  linkButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
