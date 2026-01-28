import { useEffect, useRef } from 'react';
import { useLinkingURL } from 'expo-linking';
import { useRouter } from 'expo-router';
import { useShareIntentContext } from 'expo-share-intent';
import { useShareIntentStore } from '../../store/shareIntentStore';
import { PendingImportPayload } from '../../types/content';

interface ShareFile {
  path?: string;
  mimeType?: string;
  fileName?: string;
}

type ShareTarget = 'open' | 'add';

interface ShareIntentPayload {
  text?: string;
  webUrl?: string | null;
  files?: ShareFile[];
  shareTarget?: string | null;
}

function resolveFilePayload(files?: ShareFile[]): PendingImportPayload | null {
  if (!files || files.length === 0) {
    return null;
  }

  const pdfFile = files.find((file) => file.mimeType === 'application/pdf');
  const epubFile = files.find((file) => file.mimeType === 'application/epub+zip');
  const file = pdfFile || epubFile;

  if (!file?.path || !file.fileName) {
    return null;
  }

  return {
    type: 'file',
    uri: file.path,
    fileName: file.fileName,
    mimeType: file.mimeType,
    source: pdfFile ? 'pdf' : 'epub',
  };
}

function resolveSharePayload(shareIntent: ShareIntentPayload): PendingImportPayload | null {
  const filePayload = resolveFilePayload(shareIntent.files);
  if (filePayload) {
    return filePayload;
  }

  if (shareIntent.webUrl) {
    return { type: 'url', url: shareIntent.webUrl };
  }

  if (shareIntent.text) {
    return { type: 'text', text: shareIntent.text };
  }

  return null;
}

function resolveShareTarget(shareIntentTarget?: string | null, url?: string | null): ShareTarget {
  if (shareIntentTarget === 'add' || shareIntentTarget === 'open') {
    return shareIntentTarget;
  }

  if (url) {
    const match = url.match(/[?&]target=([^&#]+)/);
    if (match) {
      const candidate = decodeURIComponent(match[1] || '').toLowerCase();
      if (candidate === 'add' || candidate === 'open') {
        return candidate as ShareTarget;
      }
    }
  }

  return 'open';
}

export function ShareIntentBootstrap() {
  const router = useRouter();
  const url = useLinkingURL();
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntentContext();
  const handledRef = useRef(false);

  useEffect(() => {
    if (!hasShareIntent || !shareIntent || handledRef.current) {
      if (!hasShareIntent) {
        handledRef.current = false;
      }
      return;
    }

    const payload = resolveSharePayload(shareIntent as ShareIntentPayload);
    if (!payload) {
      resetShareIntent();
      handledRef.current = false;
      return;
    }

    handledRef.current = true;
    useShareIntentStore.getState().setPendingPayload(payload);
    resetShareIntent();
    const shareTarget = resolveShareTarget(
      (shareIntent as ShareIntentPayload)?.shareTarget ?? null,
      url
    );
    router.replace(shareTarget === 'add' ? '/share/add' : '/share/open');
  }, [hasShareIntent, shareIntent, resetShareIntent, router, url]);

  return null;
}
