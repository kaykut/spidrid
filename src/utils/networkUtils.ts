/**
 * Network Utilities
 *
 * Helper functions for network-related operations and error handling.
 */

/**
 * Network error patterns to match against error messages.
 * Case-insensitive matching is performed.
 */
const NETWORK_ERROR_PATTERNS = [
  'network',
  'timeout',
  'fetch',
  'ECONNREFUSED',
  'ENOTFOUND',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_INTERNET_DISCONNECTED',
  'offline',
] as const;

/**
 * Checks if an error is a network-related error.
 *
 * @param error - The error to check
 * @returns true if the error appears to be network-related
 *
 * @example
 * try {
 *   await fetch(url);
 * } catch (err) {
 *   if (isNetworkError(err)) {
 *     setError('Please check your internet connection');
 *   }
 * }
 */
export function isNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return NETWORK_ERROR_PATTERNS.some((pattern) =>
    message.includes(pattern.toLowerCase())
  );
}
