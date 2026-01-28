import { useEffect } from 'react';
import { registerPdfExtractor, processPendingContent } from '../../services/contentProcessingQueue';
import { usePdfExtractor } from '../PdfExtractorProvider';

export function ContentProcessingBootstrap() {
  const { extractPdfWithProgress } = usePdfExtractor();

  useEffect(() => {
    registerPdfExtractor(extractPdfWithProgress);
    processPendingContent().catch(() => {
      // Processing errors are handled per-item in the queue
    });
  }, [extractPdfWithProgress]);

  return null;
}
