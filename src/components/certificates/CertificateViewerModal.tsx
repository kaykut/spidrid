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
              paddingTop: insets.top + 8,
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
              <ActivityIndicator size="small" color="#ffffff" />
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
              paddingBottom: insets.bottom + 16,
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
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 8,
    minWidth: 70,
  },
  closeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  shareButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  shareText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    opacity: 0.6,
  },
});
