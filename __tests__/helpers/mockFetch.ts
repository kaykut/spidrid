/**
 * Mock fetch helper utilities for testing network requests.
 */

export function mockFetchSuccess(html: string, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    text: () => Promise.resolve(html),
  });
}

export function mockFetchError(message: string) {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
}

export function mockFetchTimeout() {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 100)
      )
  );
}

export function mockFetch404() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 404,
    text: () => Promise.resolve('Not Found'),
  });
}

export function resetFetchMock() {
  if (jest.isMockFunction(global.fetch)) {
    (global.fetch as jest.Mock).mockReset();
  }
}
