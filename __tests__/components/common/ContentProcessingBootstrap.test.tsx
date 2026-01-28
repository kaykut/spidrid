import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { ContentProcessingBootstrap } from '../../../src/components/common/ContentProcessingBootstrap';

const mockExtractPdfWithProgress = jest.fn();
jest.mock('../../../src/components/PdfExtractorProvider', () => ({
  usePdfExtractor: () => ({
    extractPdfWithProgress: mockExtractPdfWithProgress,
  }),
}));

const mockRegisterPdfExtractor = jest.fn();
const mockProcessPendingContent = jest.fn().mockResolvedValue(undefined);
jest.mock('../../../src/services/contentProcessingQueue', () => ({
  registerPdfExtractor: (...args: unknown[]) => mockRegisterPdfExtractor(...args),
  processPendingContent: () => mockProcessPendingContent(),
}));

describe('ContentProcessingBootstrap', () => {
  beforeEach(() => {
    mockRegisterPdfExtractor.mockClear();
    mockProcessPendingContent.mockClear();
  });

  it('registers the PDF extractor and starts processing', async () => {
    render(<ContentProcessingBootstrap />);

    await waitFor(() => {
      expect(mockRegisterPdfExtractor).toHaveBeenCalledWith(mockExtractPdfWithProgress);
    });

    expect(mockProcessPendingContent).toHaveBeenCalled();
  });
});
