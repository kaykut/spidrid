import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import {
  CertificationTier,
  getCertificationTierDefinition,
} from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

interface CertificationReadyModalProps {
  tier: CertificationTier | null;
  currentWPM: number;
  currentAccuracy: number;
  visible: boolean;
  onTakeTest: () => void;
  onKeepPracticing: () => void;
}

export function CertificationReadyModal({
  tier,
  currentWPM,
  currentAccuracy,
  visible,
  onTakeTest,
  onKeepPracticing,
}: CertificationReadyModalProps) {
  const { theme } = useTheme();

  if (!tier) { return null; }

  const definition = getCertificationTierDefinition(tier);
  if (!definition) { return null; }

  const wpmProgress = Math.min(100, Math.round((currentWPM / definition.requirement.minWPM) * 100));
  const accuracyProgress = Math.min(100, Math.round((currentAccuracy / definition.requirement.minAccuracy) * 100));

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onKeepPracticing}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.secondaryBackground }]}>
          <View style={[styles.iconContainer, { backgroundColor: `${definition.color}20` }]}>
            <Text style={styles.icon}>{definition.icon}</Text>
          </View>

          <Text style={[styles.readyText, { color: definition.color }]}>
            You&apos;re Ready!
          </Text>

          <Text style={[styles.title, { color: theme.textColor }]}>
            {definition.title}
          </Text>

          <Text style={[styles.description, { color: theme.textColor }]}>
            Your recent practice shows you&apos;re performing at certification level.
          </Text>

          {/* Requirements Progress */}
          <View style={styles.requirementsContainer}>
            <View style={styles.requirementRow}>
              <Text style={[styles.requirementLabel, { color: theme.textColor }]}>
                Speed
              </Text>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: theme.backgroundColor },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${wpmProgress}%`,
                        backgroundColor: wpmProgress >= 100 ? '#69db7c' : definition.color,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.requirementValue, { color: theme.textColor }]}>
                  {currentWPM}/{definition.requirement.minWPM} WPM
                </Text>
              </View>
            </View>

            <View style={styles.requirementRow}>
              <Text style={[styles.requirementLabel, { color: theme.textColor }]}>
                Accuracy
              </Text>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: theme.backgroundColor },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${accuracyProgress}%`,
                        backgroundColor: accuracyProgress >= 100 ? '#69db7c' : definition.color,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.requirementValue, { color: theme.textColor }]}>
                  {currentAccuracy}%/{definition.requirement.minAccuracy}%
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: definition.color }]}
            onPress={onTakeTest}
          >
            <Text style={styles.primaryButtonText}>Take Certification Test</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: theme.textColor }]}
            onPress={onKeepPracticing}
          >
            <Text style={[styles.secondaryButtonText, { color: theme.textColor }]}>
              Keep Practicing
            </Text>
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
    maxWidth: 340,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 40,
  },
  readyText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  requirementsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 24,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requirementLabel: {
    width: 70,
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  requirementValue: {
    fontSize: 12,
    width: 80,
    textAlign: 'right',
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
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
  },
});
