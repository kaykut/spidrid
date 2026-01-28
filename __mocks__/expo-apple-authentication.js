// Mock for expo-apple-authentication
module.exports = {
  signInAsync: jest.fn().mockResolvedValue({
    user: 'mock-apple-user',
    identityToken: 'mock-identity-token',
    authorizationCode: 'mock-auth-code',
  }),
  AppleAuthenticationScope: {
    FULL_NAME: 0,
    EMAIL: 1,
  },
  isAvailableAsync: jest.fn().mockResolvedValue(true),
};
