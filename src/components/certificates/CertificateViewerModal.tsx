import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { SPACING, COMPONENT_RADIUS } from '../../constants/spacing';
import { JOURNEY_COLORS, COLORS } from '../../data/themes';
import { TYPOGRAPHY, FONT_WEIGHTS } from '../../constants/typography';
import { generateCertificatePDF, shareCertificate, deleteCertificatePDF } from '../../services/certificatePDF';
import { generateCertificateHTML } from '../../services/certificateTemplate';
import { useSettingsStore } from '../../store/settingsStore';
import { Certificate } from '../../types/certificates';
import { useTheme } from '../common/ThemeProvider';

interface CertificateViewerModalProps {
  certificate: Certificate | null;
  visible: boolean;
  onClose: () => void;
}

export function CertificateViewerModal({
  certificate,
  visible,
  onClose,
}: CertificateViewerModalProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { userName, readingLanguage } = useSettingsStore();

  const [isGenerating, setIsGenerating] = useState(false);

  const html = certificate
    ? generateCertificateHTML({
        certificate,
        userName,
        readingLanguage,
      })
    : '';

  const handleShare = useCallback(async () => {
    if (!certificate) {return;}

    setIsGenerating(true);
    let pdfUri: string | null = null;

    try {
      pdfUri = await generateCertificatePDF({
        certificate,
        userName,
        readingLanguage,
      });

      await shareCertificate(pdfUri);
    } catch (_error) {
      Alert.alert(
        'Share Failed',
        'Could not generate or share the certificate. Please try again.'
      );
    } finally {
      setIsGenerating(false);
      // Clean up the PDF file after sharing
      if (pdfUri) {
        deleteCertificatePDF(pdfUri);
      }
    }
  }, [certificate, userName, readingLanguage]);

  if (!certificate) {return null;}

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              paddingTop: insets.top + SPACING.sm,
              backgroundColor: theme.secondaryBackground,
              borderBottomColor: theme.crosshairColor,
            },
          ]}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.closeText, { color: theme.accentColor }]}>Close</Text>
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: theme.textColor }]}>
            Certificate
          </Text>

          <TouchableOpacity
            onPress={handleShare}
            disabled={isGenerating}
            style={[styles.shareButton, { backgroundColor: theme.accentColor }]}
          >
            {isGenerating ? (
              <ActivityIndicator size="small" color={JOURNEY_COLORS.textPrimary} />
            ) : (
              <Text style={styles.shareText}>Share</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Certificate Preview */}
        <View style={styles.webviewContainer}>
          <WebView
            source={{ html }}
            style={styles.webview}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            scalesPageToFit={true}
          />
        </View>

        {/* Footer hint */}
        <View
          style={[
            styles.footer,
            {
              paddingBottom: insets.bottom + SPACING.lg,
              backgroundColor: theme.secondaryBackground,
            },
          ]}
        >
          <Text style={[styles.footerText, { color: theme.textColor }]}>
            Tap Share to export as PDF
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: SPACING.sm,
    minWidth: 70,
  },
  closeText: {
    ...TYPOGRAPHY.button,
    fontWeight: FONT_WEIGHTS.medium,
  },
  headerTitle: {
    ...TYPOGRAPHY.cardTitle,
  },
  shareButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: COMPONENT_RADIUS.chip,
    minWidth: 70,
    alignItems: 'center',
  },
  shareText: {
    color: JOURNEY_COLORS.textPrimary,
    ...TYPOGRAPHY.body,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    alignItems: 'center',
  },
  footerText: {
    ...TYPOGRAPHY.label,
    opacity: 0.6,
  },
});
