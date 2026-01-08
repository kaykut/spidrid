import { Certificate, getCertificateDefinition } from '../types/certificates';
import { READING_LANGUAGES } from '../types/settings';

interface CertificateTemplateParams {
  certificate: Certificate;
  userName: string;
  readingLanguage: string;
}

export function generateCertificateHTML(params: CertificateTemplateParams): string {
  const { certificate, userName, readingLanguage } = params;
  const definition = getCertificateDefinition(certificate.type);

  const languageLabel = READING_LANGUAGES.find(
    l => l.code === readingLanguage
  )?.label || 'English';

  const earnedDate = new Date(certificate.earnedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const displayName = userName || 'Speed Reader';
  const accentColor = definition?.color || '#fab005';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 0;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
      min-height: 100vh;
      padding: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .certificate {
      background: linear-gradient(180deg, #ffffff 0%, #fafafa 50%, #f5f5f5 100%);
      border-radius: 20px;
      padding: 48px 56px;
      text-align: center;
      position: relative;
      box-shadow:
        0 25px 80px rgba(0, 0, 0, 0.4),
        0 10px 30px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
      max-width: 900px;
      width: 100%;
    }

    .border-outer {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      bottom: 12px;
      border: 2px solid ${accentColor};
      border-radius: 14px;
      pointer-events: none;
    }

    .border-inner {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      border: 1px solid ${accentColor}40;
      border-radius: 10px;
      pointer-events: none;
    }

    .corner-decoration {
      position: absolute;
      width: 60px;
      height: 60px;
      border: 3px solid ${accentColor};
    }

    .corner-tl { top: 24px; left: 24px; border-right: none; border-bottom: none; border-radius: 8px 0 0 0; }
    .corner-tr { top: 24px; right: 24px; border-left: none; border-bottom: none; border-radius: 0 8px 0 0; }
    .corner-bl { bottom: 24px; left: 24px; border-right: none; border-top: none; border-radius: 0 0 0 8px; }
    .corner-br { bottom: 24px; right: 24px; border-left: none; border-top: none; border-radius: 0 0 8px 0; }

    .icon-container {
      width: 80px;
      height: 80px;
      margin: 0 auto 16px;
      background: linear-gradient(135deg, ${accentColor}20, ${accentColor}10);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px ${accentColor}30;
    }

    .icon {
      font-size: 40px;
      line-height: 1;
    }

    .app-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 14px;
      color: #6c757d;
      letter-spacing: 6px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .certificate-of {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 12px;
      color: #adb5bd;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 42px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 8px;
      line-height: 1.2;
    }

    .achievement-type {
      font-size: 14px;
      color: ${accentColor};
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 28px;
    }

    .presented-to {
      font-size: 13px;
      color: #868e96;
      margin-bottom: 8px;
    }

    .user-name {
      font-family: 'Great Vibes', cursive;
      font-size: 56px;
      color: #212529;
      margin-bottom: 24px;
      line-height: 1.1;
    }

    .description {
      font-size: 15px;
      color: #495057;
      margin-bottom: 16px;
      line-height: 1.6;
    }

    .wpm-badge {
      display: inline-block;
      background: linear-gradient(135deg, ${accentColor}, ${accentColor}dd);
      color: white;
      padding: 14px 48px;
      border-radius: 50px;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 28px;
      box-shadow: 0 4px 20px ${accentColor}50;
    }

    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #e9ecef, transparent);
      margin: 24px 60px;
    }

    .details {
      display: flex;
      justify-content: center;
      gap: 48px;
    }

    .detail-item {
      text-align: center;
    }

    .detail-label {
      font-size: 10px;
      color: #868e96;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 4px;
    }

    .detail-value {
      font-size: 14px;
      color: #343a40;
      font-weight: 600;
    }

    .signature-area {
      margin-top: 28px;
      display: flex;
      justify-content: center;
      gap: 80px;
    }

    .signature {
      text-align: center;
    }

    .signature-line {
      width: 140px;
      height: 1px;
      background: #dee2e6;
      margin-bottom: 8px;
    }

    .signature-title {
      font-size: 10px;
      color: #868e96;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="border-outer"></div>
    <div class="border-inner"></div>
    <div class="corner-decoration corner-tl"></div>
    <div class="corner-decoration corner-tr"></div>
    <div class="corner-decoration corner-bl"></div>
    <div class="corner-decoration corner-br"></div>

    <div class="icon-container">
      <span class="icon">${definition?.icon || '🏆'}</span>
    </div>

    <div class="app-name">Spidrid</div>

    <div class="certificate-of">Certificate of Achievement</div>
    <h1 class="title">${definition?.name || 'Speed Reader'}</h1>
    <div class="achievement-type">Reading Excellence</div>

    <p class="presented-to">This certificate is proudly presented to</p>
    <p class="user-name">${displayName}</p>

    <p class="description">
      For demonstrating exceptional speed reading proficiency<br>
      by achieving a reading speed of
    </p>

    <div class="wpm-badge">${certificate.wpm} WPM</div>

    <div class="divider"></div>

    <div class="details">
      <div class="detail-item">
        <p class="detail-label">Date Achieved</p>
        <p class="detail-value">${earnedDate}</p>
      </div>
      <div class="detail-item">
        <p class="detail-label">Reading Language</p>
        <p class="detail-value">${languageLabel}</p>
      </div>
      <div class="detail-item">
        <p class="detail-label">Certificate ID</p>
        <p class="detail-value">${certificate.id.toUpperCase().slice(0, 8)}</p>
      </div>
    </div>

    <div class="signature-area">
      <div class="signature">
        <div class="signature-line"></div>
        <p class="signature-title">Verified Achievement</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
