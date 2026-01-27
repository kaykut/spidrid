import { isNetworkError } from '../../src/utils/networkUtils';

describe('networkUtils', () => {
  describe('isNetworkError', () => {
    it('returns false for non-Error values', () => {
      expect(isNetworkError(null)).toBe(false);
      expect(isNetworkError(undefined)).toBe(false);
      expect(isNetworkError('string error')).toBe(false);
      expect(isNetworkError(123)).toBe(false);
      expect(isNetworkError({ message: 'network error' })).toBe(false);
    });

    it('returns true for network-related errors', () => {
      expect(isNetworkError(new Error('Network request failed'))).toBe(true);
      expect(isNetworkError(new Error('network error'))).toBe(true);
      expect(isNetworkError(new Error('Request timeout'))).toBe(true);
      expect(isNetworkError(new Error('Failed to fetch'))).toBe(true);
      expect(isNetworkError(new Error('fetch failed'))).toBe(true);
    });

    it('returns true for connection errors', () => {
      expect(isNetworkError(new Error('ECONNREFUSED'))).toBe(true);
      expect(isNetworkError(new Error('ENOTFOUND'))).toBe(true);
      expect(isNetworkError(new Error('ETIMEDOUT'))).toBe(true);
    });

    it('returns true for browser/mobile network errors', () => {
      expect(isNetworkError(new Error('ERR_NETWORK'))).toBe(true);
      expect(isNetworkError(new Error('ERR_INTERNET_DISCONNECTED'))).toBe(true);
      expect(isNetworkError(new Error('Device is offline'))).toBe(true);
    });

    it('is case-insensitive', () => {
      expect(isNetworkError(new Error('NETWORK ERROR'))).toBe(true);
      expect(isNetworkError(new Error('Network Error'))).toBe(true);
      expect(isNetworkError(new Error('TIMEOUT'))).toBe(true);
      expect(isNetworkError(new Error('Timeout'))).toBe(true);
    });

    it('returns false for non-network errors', () => {
      expect(isNetworkError(new Error('Invalid JSON'))).toBe(false);
      expect(isNetworkError(new Error('Authentication failed'))).toBe(false);
      expect(isNetworkError(new Error('Permission denied'))).toBe(false);
      expect(isNetworkError(new Error('Something went wrong'))).toBe(false);
    });
  });
});
