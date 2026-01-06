import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Certificate } from '../types/certificates';
import { generateCertificateHTML } from './certificateTemplate';

interface GeneratePDFParams {
  certificate: Certificate;
  userName: string;
  readingLanguage: string;
}

export async function generateCertificatePDF(
  params: GeneratePDFParams
): Promise<string> {
  const html = generateCertificateHTML(params);

  const { uri } = await Print.printToFileAsync({
    html,
    base64: false,
  });

  return uri;
}

export async function shareCertificate(pdfUri: string): Promise<void> {
  const isAvailable = await Sharing.isAvailableAsync();

  if (!isAvailable) {
    throw new Error('Sharing is not available on this device');
  }

  await Sharing.shareAsync(pdfUri, {
    mimeType: 'application/pdf',
    dialogTitle: 'Share Certificate',
    UTI: 'com.adobe.pdf',
  });
}

export async function deleteCertificatePDF(_pdfUri: string): Promise<void> {
  // PDF files in temp directory are automatically cleaned up by the system
  // No explicit deletion needed
}
