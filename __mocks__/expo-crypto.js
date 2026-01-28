// Mock for expo-crypto
module.exports = {
  randomUUID: jest.fn().mockReturnValue('mock-uuid-1234'),
  digestStringAsync: jest.fn().mockResolvedValue('mock-hash-digest'),
  CryptoDigestAlgorithm: {
    SHA256: 'SHA-256',
  },
};
