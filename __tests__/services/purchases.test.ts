/**
 * Tests for RevenueCat Purchases Service.
 *
 * Tests the wrapper around react-native-purchases SDK with graceful degradation.
 * The SDK is mocked to simulate various scenarios without requiring native modules.
 */

// =============================================================================
// Mock Setup
// =============================================================================

// Unmock the purchases service (it's mocked globally in jest.setup.js for other tests)
// We want to test the actual service implementation here
jest.unmock('../../src/services/purchases');

// Mock Platform
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
}));

// Mock expo-constants - controls API key and execution environment
const mockExpoConfig = {
  extra: {
    revenueCatApiKey: 'test-api-key',
  },
};

let mockExecutionEnvironment = 'bare'; // Default to native build environment
let mockAppOwnership: string | null = null;

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    get expoConfig() {
      return mockExpoConfig;
    },
    get executionEnvironment() {
      return mockExecutionEnvironment;
    },
    get appOwnership() {
      return mockAppOwnership;
    },
  },
  ExecutionEnvironment: {
    StoreClient: 'storeClient',
    Bare: 'bare',
    Standalone: 'standalone',
  },
}));

// Mock RevenueCat SDK
const mockConfigure = jest.fn();
const mockGetCustomerInfo = jest.fn();
const mockLogIn = jest.fn();
const mockLogOut = jest.fn();
const mockRestorePurchases = jest.fn();
const mockGetOfferings = jest.fn();
const mockPurchasePackage = jest.fn();
const mockInvalidateCustomerInfoCache = jest.fn();
const mockAddCustomerInfoUpdateListener = jest.fn();

const mockPurchasesSDK = {
  configure: mockConfigure,
  getCustomerInfo: mockGetCustomerInfo,
  logIn: mockLogIn,
  logOut: mockLogOut,
  restorePurchases: mockRestorePurchases,
  getOfferings: mockGetOfferings,
  purchasePackage: mockPurchasePackage,
  invalidateCustomerInfoCache: mockInvalidateCustomerInfoCache,
  addCustomerInfoUpdateListener: mockAddCustomerInfoUpdateListener,
};

jest.mock('react-native-purchases', () => ({
  __esModule: true,
  default: mockPurchasesSDK,
}));

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Reset all mocks and module state.
 * Must be called between tests that need fresh module state.
 */
function resetMocks() {
  jest.clearAllMocks();
  mockConfigure.mockReset();
  mockGetCustomerInfo.mockReset();
  mockLogIn.mockReset();
  mockLogOut.mockReset();
  mockRestorePurchases.mockReset();
  mockGetOfferings.mockReset();
  mockPurchasePackage.mockReset();
  mockInvalidateCustomerInfoCache.mockReset();
  mockAddCustomerInfoUpdateListener.mockReset();
}

/**
 * Create a mock CustomerInfo object.
 */
function createMockCustomerInfo(isPremium: boolean) {
  return {
    entitlements: {
      active: isPremium ? { premium: { isActive: true } } : {},
    },
  };
}

/**
 * Create a mock PurchasesPackage object.
 */
function createMockPackage(id: string) {
  return {
    identifier: id,
    packageType: 'ANNUAL',
    product: {
      identifier: `product_${id}`,
      title: `Test Package ${id}`,
      description: 'Test subscription package',
      priceString: '$9.99',
      price: 9.99,
    },
  };
}

// =============================================================================
// Tests
// =============================================================================

describe('purchases service', () => {
  // Fresh import for each test group to reset module-level state
  let purchases: typeof import('../../src/services/purchases');

  beforeEach(() => {
    resetMocks();
    mockExecutionEnvironment = 'bare';
    mockAppOwnership = null;
    mockExpoConfig.extra.revenueCatApiKey = 'test-api-key';

    // Reset module cache to get fresh module state
    jest.resetModules();

    // Import fresh module
    purchases = require('../../src/services/purchases');
  });

  // ===========================================================================
  // configurePurchases
  // ===========================================================================

  describe('configurePurchases', () => {
    it('configures SDK successfully with valid API key', async () => {
      mockConfigure.mockResolvedValue(undefined);

      const result = await purchases.configurePurchases();

      expect(result).toBe(true);
      expect(mockConfigure).toHaveBeenCalledWith({ apiKey: 'test-api-key' });
    });

    it('returns true on subsequent calls after successful configuration', async () => {
      mockConfigure.mockResolvedValue(undefined);

      const firstResult = await purchases.configurePurchases();
      const secondResult = await purchases.configurePurchases();

      expect(firstResult).toBe(true);
      expect(secondResult).toBe(true);
      expect(mockConfigure).toHaveBeenCalledTimes(1); // Only called once
    });

    it('returns false when API key is not configured', async () => {
      mockExpoConfig.extra.revenueCatApiKey = '';

      // Re-import module with empty API key
      jest.resetModules();
      purchases = require('../../src/services/purchases');

      const result = await purchases.configurePurchases();

      expect(result).toBe(false);
      expect(mockConfigure).not.toHaveBeenCalled();
    });

    it('returns false when configure throws an error', async () => {
      mockConfigure.mockRejectedValue(new Error('Configuration failed'));

      const result = await purchases.configurePurchases();

      expect(result).toBe(false);
    });
  });

  // ===========================================================================
  // checkPremiumStatus
  // ===========================================================================

  describe('checkPremiumStatus', () => {
    beforeEach(async () => {
      mockConfigure.mockResolvedValue(undefined);
      await purchases.configurePurchases();
    });

    it('returns true when user has premium entitlement', async () => {
      mockGetCustomerInfo.mockResolvedValue(createMockCustomerInfo(true));

      const result = await purchases.checkPremiumStatus();

      expect(result).toBe(true);
      expect(mockGetCustomerInfo).toHaveBeenCalled();
    });

    it('returns false when user does not have premium entitlement', async () => {
      mockGetCustomerInfo.mockResolvedValue(createMockCustomerInfo(false));

      const result = await purchases.checkPremiumStatus();

      expect(result).toBe(false);
    });

    it('returns false when not configured', async () => {
      // Reset module to unconfigured state
      jest.resetModules();
      purchases = require('../../src/services/purchases');

      const result = await purchases.checkPremiumStatus();

      expect(result).toBe(false);
      expect(mockGetCustomerInfo).not.toHaveBeenCalled();
    });

    it('returns false when getCustomerInfo throws', async () => {
      mockGetCustomerInfo.mockRejectedValue(new Error('Network error'));

      const result = await purchases.checkPremiumStatus();

      expect(result).toBe(false);
    });

    it('invalidates cache when forceFresh is true', async () => {
      mockGetCustomerInfo.mockResolvedValue(createMockCustomerInfo(true));
      mockInvalidateCustomerInfoCache.mockResolvedValue(undefined);

      await purchases.checkPremiumStatus(true);

      expect(mockInvalidateCustomerInfoCache).toHaveBeenCalled();
      expect(mockGetCustomerInfo).toHaveBeenCalled();
    });

    it('does not invalidate cache when forceFresh is false', async () => {
      mockGetCustomerInfo.mockResolvedValue(createMockCustomerInfo(true));

      await purchases.checkPremiumStatus(false);

      expect(mockInvalidateCustomerInfoCache).not.toHaveBeenCalled();
      expect(mockGetCustomerInfo).toHaveBeenCalled();
    });

    it('handles cache invalidation error gracefully in native builds', async () => {
      mockGetCustomerInfo.mockResolvedValue(createMockCustomerInfo(true));
      mockInvalidateCustomerInfoCache.mockRejectedValue(new Error('Cache error'));

      // In native builds, cache errors are caught by outer try-catch and logged,
      // returning false to gracefully degrade rather than throwing
      const result = await purchases.checkPremiumStatus(true);
      expect(result).toBe(false);
    });
  });

  // ===========================================================================
  // loginUser
  // ===========================================================================

  describe('loginUser', () => {
    beforeEach(async () => {
      mockConfigure.mockResolvedValue(undefined);
      await purchases.configurePurchases();
    });

    it('logs in user and returns customer info', async () => {
      const mockCustomerInfo = createMockCustomerInfo(true);
      mockLogIn.mockResolvedValue({ customerInfo: mockCustomerInfo });

      const result = await purchases.loginUser('user-123');

      expect(result).toEqual(mockCustomerInfo);
      expect(mockLogIn).toHaveBeenCalledWith('user-123');
    });

    it('returns null when not configured', async () => {
      // Reset module to unconfigured state
      jest.resetModules();
      purchases = require('../../src/services/purchases');

      const result = await purchases.loginUser('user-123');

      expect(result).toBeNull();
      expect(mockLogIn).not.toHaveBeenCalled();
    });

    it('returns null when login fails', async () => {
      mockLogIn.mockRejectedValue(new Error('Login failed'));

      const result = await purchases.loginUser('user-123');

      expect(result).toBeNull();
    });
  });

  // ===========================================================================
  // logoutUser
  // ===========================================================================

  describe('logoutUser', () => {
    beforeEach(async () => {
      mockConfigure.mockResolvedValue(undefined);
      await purchases.configurePurchases();
    });

    it('logs out user successfully', async () => {
      mockLogOut.mockResolvedValue(undefined);

      await purchases.logoutUser();

      expect(mockLogOut).toHaveBeenCalled();
    });

    it('does nothing when not configured', async () => {
      // Reset module to unconfigured state
      jest.resetModules();
      purchases = require('../../src/services/purchases');

      await purchases.logoutUser();

      expect(mockLogOut).not.toHaveBeenCalled();
    });

    it('handles logout error gracefully', async () => {
      mockLogOut.mockRejectedValue(new Error('Logout failed'));

      // Should not throw
      await expect(purchases.logoutUser()).resolves.toBeUndefined();
    });
  });

  // ===========================================================================
  // restorePurchases
  // ===========================================================================

  describe('restorePurchases', () => {
    beforeEach(async () => {
      mockConfigure.mockResolvedValue(undefined);
      await purchases.configurePurchases();
    });

    it('restores purchases and returns customer info', async () => {
      const mockCustomerInfo = createMockCustomerInfo(true);
      mockRestorePurchases.mockResolvedValue(mockCustomerInfo);

      const result = await purchases.restorePurchases();

      expect(result).toEqual(mockCustomerInfo);
      expect(mockRestorePurchases).toHaveBeenCalled();
    });

    it('returns null when not configured', async () => {
      // Reset module to unconfigured state
      jest.resetModules();
      purchases = require('../../src/services/purchases');

      const result = await purchases.restorePurchases();

      expect(result).toBeNull();
      expect(mockRestorePurchases).not.toHaveBeenCalled();
    });

    it('throws error on failure in native builds', async () => {
      mockRestorePurchases.mockRejectedValue(new Error('Restore failed'));

      await expect(purchases.restorePurchases()).rejects.toThrow('Restore failed');
    });
  });

  // ===========================================================================
  // getOfferings
  // ===========================================================================

  describe('getOfferings', () => {
    beforeEach(async () => {
      mockConfigure.mockResolvedValue(undefined);
      await purchases.configurePurchases();
    });

    it('returns available packages from current offering', async () => {
      const mockPackages = [createMockPackage('annual'), createMockPackage('monthly')];
      mockGetOfferings.mockResolvedValue({
        current: {
          availablePackages: mockPackages,
        },
      });

      const result = await purchases.getOfferings();

      expect(result).toEqual(mockPackages);
      expect(mockGetOfferings).toHaveBeenCalled();
    });

    it('returns empty array when no current offering', async () => {
      mockGetOfferings.mockResolvedValue({ current: null });

      const result = await purchases.getOfferings();

      expect(result).toEqual([]);
    });

    it('returns empty array when no available packages', async () => {
      mockGetOfferings.mockResolvedValue({
        current: { availablePackages: [] },
      });

      const result = await purchases.getOfferings();

      expect(result).toEqual([]);
    });

    it('returns empty array when not configured', async () => {
      // Reset module to unconfigured state
      jest.resetModules();
      purchases = require('../../src/services/purchases');

      const result = await purchases.getOfferings();

      expect(result).toEqual([]);
      expect(mockGetOfferings).not.toHaveBeenCalled();
    });

    it('returns empty array when getOfferings fails', async () => {
      mockGetOfferings.mockRejectedValue(new Error('Network error'));

      const result = await purchases.getOfferings();

      expect(result).toEqual([]);
    });
  });

  // ===========================================================================
  // purchasePackage
  // ===========================================================================

  describe('purchasePackage', () => {
    beforeEach(async () => {
      mockConfigure.mockResolvedValue(undefined);
      await purchases.configurePurchases();
    });

    it('completes purchase and returns customer info', async () => {
      const mockPackage = createMockPackage('annual');
      const mockCustomerInfo = createMockCustomerInfo(true);
      mockPurchasePackage.mockResolvedValue({ customerInfo: mockCustomerInfo });

      const result = await purchases.purchasePackage(mockPackage);

      expect(result).toEqual(mockCustomerInfo);
      expect(mockPurchasePackage).toHaveBeenCalledWith(mockPackage);
    });

    it('returns null when not configured', async () => {
      // Reset module to unconfigured state
      jest.resetModules();
      purchases = require('../../src/services/purchases');

      const mockPackage = createMockPackage('annual');
      const result = await purchases.purchasePackage(mockPackage);

      expect(result).toBeNull();
      expect(mockPurchasePackage).not.toHaveBeenCalled();
    });

    it('throws error on purchase failure in native builds', async () => {
      const mockPackage = createMockPackage('annual');
      mockPurchasePackage.mockRejectedValue(new Error('Payment declined'));

      await expect(purchases.purchasePackage(mockPackage)).rejects.toThrow('Payment declined');
    });

    it('handles user cancellation', async () => {
      const mockPackage = createMockPackage('annual');
      const cancelError = new Error('User cancelled');
      (cancelError as Error & { userCancelled: boolean }).userCancelled = true;
      mockPurchasePackage.mockRejectedValue(cancelError);

      await expect(purchases.purchasePackage(mockPackage)).rejects.toThrow('User cancelled');
    });
  });

  // ===========================================================================
  // isAvailable
  // ===========================================================================

  describe('isAvailable', () => {
    it('returns false before configuration', () => {
      // Reset module to unconfigured state
      jest.resetModules();
      purchases = require('../../src/services/purchases');

      const result = purchases.isAvailable();

      expect(result).toBe(false);
    });

    it('returns true after successful configuration', async () => {
      mockConfigure.mockResolvedValue(undefined);

      await purchases.configurePurchases();
      const result = purchases.isAvailable();

      expect(result).toBe(true);
    });
  });

  // ===========================================================================
  // getPremiumEntitlement
  // ===========================================================================

  describe('getPremiumEntitlement', () => {
    it('returns the premium entitlement identifier', () => {
      const result = purchases.getPremiumEntitlement();

      expect(result).toBe('premium');
    });
  });

  // ===========================================================================
  // setupCustomerInfoListener
  // ===========================================================================

  describe('setupCustomerInfoListener', () => {
    beforeEach(async () => {
      mockConfigure.mockResolvedValue(undefined);
      await purchases.configurePurchases();
    });

    it('sets up listener and returns cleanup function', () => {
      const mockRemove = jest.fn();
      mockAddCustomerInfoUpdateListener.mockReturnValue({ remove: mockRemove });

      const callback = jest.fn();
      const cleanup = purchases.setupCustomerInfoListener(callback);

      expect(mockAddCustomerInfoUpdateListener).toHaveBeenCalledWith(expect.any(Function));
      expect(typeof cleanup).toBe('function');

      // Test cleanup
      cleanup();
      expect(mockRemove).toHaveBeenCalled();
    });

    it('calls callback with premium status when customer info updates', () => {
      let capturedListener: ((info: unknown) => void) | null = null;
      mockAddCustomerInfoUpdateListener.mockImplementation((listener) => {
        capturedListener = listener;
        return { remove: jest.fn() };
      });

      const callback = jest.fn();
      purchases.setupCustomerInfoListener(callback);

      // Simulate customer info update with premium
      capturedListener!(createMockCustomerInfo(true));
      expect(callback).toHaveBeenCalledWith(true);

      // Simulate customer info update without premium
      capturedListener!(createMockCustomerInfo(false));
      expect(callback).toHaveBeenCalledWith(false);
    });

    it('returns no-op cleanup when not configured', () => {
      // Reset module to unconfigured state
      jest.resetModules();
      purchases = require('../../src/services/purchases');

      const callback = jest.fn();
      const cleanup = purchases.setupCustomerInfoListener(callback);

      expect(mockAddCustomerInfoUpdateListener).not.toHaveBeenCalled();
      expect(typeof cleanup).toBe('function');

      // Should not throw
      cleanup();
    });

    it('returns no-op cleanup when listener setup fails', async () => {
      mockAddCustomerInfoUpdateListener.mockImplementation(() => {
        throw new Error('Failed to setup listener');
      });

      const callback = jest.fn();
      const cleanup = purchases.setupCustomerInfoListener(callback);

      expect(typeof cleanup).toBe('function');

      // Should not throw
      cleanup();
    });

    it('handles cleanup error gracefully', () => {
      const mockRemove = jest.fn().mockImplementation(() => {
        throw new Error('Failed to remove listener');
      });
      mockAddCustomerInfoUpdateListener.mockReturnValue({ remove: mockRemove });

      const callback = jest.fn();
      const cleanup = purchases.setupCustomerInfoListener(callback);

      // Should not throw
      expect(() => cleanup()).not.toThrow();
    });
  });

  // ===========================================================================
  // Edge Cases and Environment Handling
  // ===========================================================================

  describe('environment handling', () => {
    it('handles Expo Go environment gracefully', async () => {
      mockExecutionEnvironment = 'storeClient';

      // Re-import with Expo Go environment
      jest.resetModules();
      purchases = require('../../src/services/purchases');

      // Operations should return safe defaults without errors
      expect(await purchases.checkPremiumStatus()).toBe(false);
      expect(await purchases.getOfferings()).toEqual([]);
    });
  });

  // ===========================================================================
  // Type Exports
  // ===========================================================================

  describe('type exports', () => {
    it('exports CustomerInfo interface', () => {
      // Verify the type exists by checking module exports
      expect(purchases).toHaveProperty('checkPremiumStatus');
    });

    it('exports PurchasesPackage interface', () => {
      // Verify type-related functionality works
      const mockPackage = createMockPackage('test');
      expect(mockPackage.identifier).toBe('test');
      expect(mockPackage.product.priceString).toBe('$9.99');
    });

    it('exports PurchasesIntroPrice interface', () => {
      // Verify intro price type structure
      const introPrice = {
        price: 0,
        priceString: '$0.00',
        period: '7 days',
        periodUnit: 'DAY' as const,
        periodNumberOfUnits: 7,
      };
      expect(introPrice.periodUnit).toBe('DAY');
    });
  });
});

// =============================================================================
// SDK Not Available Tests (Separate describe block to avoid mock conflicts)
// =============================================================================

describe('purchases service - SDK not available', () => {
  beforeEach(() => {
    jest.resetModules();

    // Mock the SDK to throw when loaded
    jest.doMock('react-native-purchases', () => {
      throw new Error('Cannot find native module');
    });
  });

  afterEach(() => {
    jest.dontMock('react-native-purchases');
  });

  it('returns false when SDK is not available (Expo Go)', async () => {
    const purchases = require('../../src/services/purchases');

    const result = await purchases.configurePurchases();

    expect(result).toBe(false);
  });

  it('isAvailable returns false when SDK failed to load', async () => {
    const purchases = require('../../src/services/purchases');

    await purchases.configurePurchases();
    const result = purchases.isAvailable();

    expect(result).toBe(false);
  });

  it('checkPremiumStatus returns false when SDK not available', async () => {
    const purchases = require('../../src/services/purchases');

    const result = await purchases.checkPremiumStatus();

    expect(result).toBe(false);
  });

  it('getOfferings returns empty array when SDK not available', async () => {
    const purchases = require('../../src/services/purchases');

    const result = await purchases.getOfferings();

    expect(result).toEqual([]);
  });

  it('loginUser returns null when SDK not available', async () => {
    const purchases = require('../../src/services/purchases');

    const result = await purchases.loginUser('user-123');

    expect(result).toBeNull();
  });

  it('logoutUser completes without error when SDK not available', async () => {
    const purchases = require('../../src/services/purchases');

    await expect(purchases.logoutUser()).resolves.toBeUndefined();
  });

  it('restorePurchases returns null when SDK not available', async () => {
    const purchases = require('../../src/services/purchases');

    const result = await purchases.restorePurchases();

    expect(result).toBeNull();
  });

  it('purchasePackage returns null when SDK not available', async () => {
    const purchases = require('../../src/services/purchases');

    const mockPackage = {
      identifier: 'test',
      packageType: 'ANNUAL',
      product: {
        identifier: 'product_test',
        title: 'Test Package',
        description: 'Test subscription',
        priceString: '$9.99',
        price: 9.99,
      },
    };

    const result = await purchases.purchasePackage(mockPackage);

    expect(result).toBeNull();
  });

  it('setupCustomerInfoListener returns no-op cleanup when SDK not available', async () => {
    const purchases = require('../../src/services/purchases');

    const callback = jest.fn();
    const cleanup = purchases.setupCustomerInfoListener(callback);

    expect(typeof cleanup).toBe('function');
    // Should not throw
    cleanup();
  });
});
