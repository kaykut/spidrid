import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SPACING, RADIUS, COMPONENT_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { Certificate, getCertificateDefinition } from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

interface CertificateCardProps {
  certificate: Certificate;
  size?: 'small' | 'large';
  onPress?: () => void;
}

export function CertificateCard({ certificate, size = 'small', onPress }: CertificateCardProps) {
  const { theme } = useTheme();
  const definition = getCertificateDefinition(certificate.type);

  if (!definition) {return null;}

  const isLarge = size === 'large';
  const earnedDate = new Date(certificate.earnedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const content = (
    <>
      <View
        style={[
          styles.iconContainer,
          isLarge ? styles.iconLarge : styles.iconSmall,
          { backgroundColor: `${definition.color  }20` },
        ]}
      >
        <Text style={isLarge ? styles.iconTextLarge : styles.iconTextSmall}>
          {definition.icon}
        </Text>
      </View>
      <Text
        style={[
          styles.title,
          isLarge ? styles.titleLarge : styles.titleSmall,
          { color: theme.textColor },
        ]}
      >
        {definition.name}
      </Text>
      <Text
        style={[
          styles.description,
          isLarge ? styles.descLarge : styles.descSmall,
          { color: theme.textColor },
        ]}
      >
        {definition.description}
      </Text>
      {isLarge && (
        <Text style={[styles.date, { color: theme.textColor }]}>
          Earned {earnedDate}
        </Text>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          isLarge ? styles.cardLarge : styles.cardSmall,
          { backgroundColor: theme.secondaryBackground },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.card,
        isLarge ? styles.cardLarge : styles.cardSmall,
        { backgroundColor: theme.secondaryBackground },
      ]}
    >
      {content}
    </View>
  );
}

interface LockedCertificateCardProps {
  type: Certificate['type'];
  progress: number; // 0-1
}

export function LockedCertificateCard({ type, progress }: LockedCertificateCardProps) {
  const { theme } = useTheme();
  const definition = getCertificateDefinition(type);

  if (!definition) {return null;}

  return (
    <View style={[styles.card, styles.cardSmall, { backgroundColor: theme.secondaryBackground }]}>
      <View style={[styles.iconContainer, styles.iconSmall, { backgroundColor: theme.crosshairColor }]}>
        <Text style={[styles.iconTextSmall, styles.locked]}>🔒</Text>
      </View>
      <Text style={[styles.title, styles.titleSmall, { color: theme.textColor }, styles.locked]}>
        {definition.name}
      </Text>
      <Text style={[styles.description, styles.descSmall, { color: theme.textColor }, styles.locked]}>
        {definition.description}
      </Text>
      <View style={[styles.progressBar, { backgroundColor: theme.crosshairColor }]}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: definition.color, width: `${Math.min(progress * 100, 100)}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: COMPONENT_RADIUS.card,
    alignItems: 'center',
    padding: SPACING.lg,
  },
  cardSmall: {
    width: '48%',
  },
  cardLarge: {
    width: '100%',
    paddingVertical: SPACING.xxxl,
  },
  iconContainer: {
    borderRadius: COMPONENT_RADIUS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  iconSmall: {
    width: 56,
    height: 56,
  },
  iconLarge: {
    width: 80,
    height: 80,
  },
  iconTextSmall: {
    fontSize: 28,
  },
  iconTextLarge: {
    fontSize: 40,
  },
  title: {
    fontWeight: FONT_WEIGHTS.bold,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  titleSmall: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.bold,
  },
  titleLarge: {
    ...TYPOGRAPHY.metricLarge,
  },
  description: {
    opacity: 0.7,
    textAlign: 'center',
  },
  descSmall: {
    fontSize: 11,
  },
  descLarge: {
    ...TYPOGRAPHY.buttonSmall,
    fontWeight: FONT_WEIGHTS.regular,
  },
  date: {
    ...TYPOGRAPHY.caption,
    opacity: 0.5,
    marginTop: SPACING.sm,
  },
  locked: {
    opacity: 0.5,
  },
  progressBar: {
    width: '100%',
    height: SPACING.xs,
    borderRadius: RADIUS.xs,
    marginTop: SPACING.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
});
