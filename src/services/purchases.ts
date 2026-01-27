/**
 * RevenueCat Purchases Service
 *
 * Wrapper around react-native-purchases SDK with graceful degradation.
 *
 * API key selection is handled at build time via environment files:
 * - .env.development: Test Store key for Expo Go and dev builds
 * - .env.production: Production key for adhoc/preview/production builds
 *
 * If the key is not configured, methods return safe defaults.
 */

import Constants from 'expo-constants';

// Types from react-native-purchases - we define minimal interfaces
// to avoid import errors when SDK is not available
export interface CustomerInfo {
  entitlements: {
    active: Record<string, { isActive: boolean } | undefined>;
  };
}

export interface PurchasesIntroPrice {
  price: number;
  priceString: string;
  period: string;
  periodUnit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  periodNumberOfUnits: number;
}

export interface PurchasesPackage {
  identifier: string;
  packageType: string;
  product: {
    identifier: string;
    title: string;
    description: string;
    priceString: string;
    price: number;
    introPrice?: PurchasesIntroPrice;
  };
}

// API key is set at build time via environment files
const REVENUECAT_API_KEY = Constants.expoConfig?.extra?.revenueCatApiKey || '';

const PREMIUM_ENTITLEMENT = 'premium';

let isConfigured = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Purchases: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PurchasesSDK = any;

/**
 * Attempt to load the RevenueCat SDK.
 * Returns null if not available (Expo Go or missing native module).
 */
function loadPurchasesSDK(): PurchasesSDK | null {
  try {
    // Dynamic require to avoid crash in Expo Go
     
    const module = require('react-native-purchases');
    return module.default || module;
  } catch (error) {
    console.warn('[Purchases] SDK not available (likely Expo Go):', error);
    return null;
  }
}

/**
 * Configure RevenueCat SDK.
 *
 * RevenueCat will create its own anonymous ID. When the user signs in,
 * call loginUser() to alias the anonymous ID with the Supabase user ID.
 *
 * @returns true if successfully configured, false if SDK not available.
 */
export async function configurePurchases(): Promise<boolean> {
  if (isConfigured) {return true;}

  Purchases = loadPurchasesSDK();
  if (!Purchases) {
    return false;
  }

  if (!REVENUECAT_API_KEY) {
    console.warn('[Purchases] No REVENUECAT_API_KEY configured in environment');
    return false;
  }

  try {
    await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
    isConfigured = true;
    return true;
  } catch (error) {
    console.error('[Purchases] Failed to configure:', error);
    return false;
  }
}

/**
 * Check if user has active premium entitlement.
 *
 * @param forceFresh - If true, invalidates SDK cache to guarantee fresh data from server.
 *                     Use on app foreground or when you need guaranteed up-to-date status.
 *                     Default false uses SDK's 5-minute cache policy.
 */
export async function checkPremiumStatus(forceFresh = false): Promise<boolean> {
  if (!isConfigured || !Purchases) {return false;}

  try {
    // Invalidate cache to force fresh fetch from RevenueCat server
    if (forceFresh) {
      await Purchases.invalidateCustomerInfoCache();
    }

    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;
  } catch (error) {
    console.error('[Purchases] Failed to check premium status:', error);
    return false;
  }
}

/**
 * Login user to RevenueCat with their Supabase user ID.
 * This transfers any anonymous purchases to the authenticated user.
 */
export async function loginUser(userId: string): Promise<CustomerInfo | null> {
  if (!isConfigured || !Purchases) {return null;}

  try {
    const { customerInfo } = await Purchases.logIn(userId);
    // Debug:('[Purchases] User logged in:', userId);
    return customerInfo as CustomerInfo;
  } catch (error) {
    console.error('[Purchases] Failed to login user:', error);
    return null;
  }
}

/**
 * Logout user from RevenueCat.
 * Creates a new anonymous ID for the device.
 */
export async function logoutUser(): Promise<void> {
  if (!isConfigured || !Purchases) {return;}

  try {
    await Purchases.logOut();
    // Debug:('[Purchases] User logged out');
  } catch (error) {
    console.error('[Purchases] Failed to logout user:', error);
  }
}

/**
 * Restore purchases from App Store/Play Store.
 * Required by Apple App Store guidelines.
 */
export async function restorePurchases(): Promise<CustomerInfo | null> {
  if (!isConfigured || !Purchases) {return null;}

  try {
    const customerInfo = await Purchases.restorePurchases();
    // Debug:('[Purchases] Purchases restored');
    return customerInfo as CustomerInfo;
  } catch (error) {
    console.error('[Purchases] Failed to restore purchases:', error);
    throw error; // Rethrow so caller can show error to user
  }
}

/**
 * Get available subscription offerings.
 */
export async function getOfferings(): Promise<PurchasesPackage[]> {
  if (!isConfigured || !Purchases) {return [];}

  try {
    const offerings = await Purchases.getOfferings();
    return (offerings.current?.availablePackages || []) as PurchasesPackage[];
  } catch (error) {
    console.error('[Purchases] Failed to get offerings:', error);
    return [];
  }
}

/**
 * Purchase a subscription package.
 */
export async function purchasePackage(pkg: PurchasesPackage): Promise<CustomerInfo | null> {
  if (!isConfigured || !Purchases) {return null;}

  try {
    // Cast to any because the real SDK type is more complex
    const { customerInfo } = await Purchases.purchasePackage(pkg as never);
    // Debug:('[Purchases] Purchase completed');
    return customerInfo as CustomerInfo;
  } catch (error) {
    console.error('[Purchases] Purchase failed:', error);
    throw error; // Rethrow so caller can show error to user
  }
}

/**
 * Check if RevenueCat SDK is available and configured.
 */
export function isAvailable(): boolean {
  return isConfigured && Purchases !== null;
}

/**
 * Get the premium entitlement identifier.
 */
export function getPremiumEntitlement(): string {
  return PREMIUM_ENTITLEMENT;
}

/**
 * Set up a listener for CustomerInfo updates from RevenueCat SDK.
 *
 * The listener fires when:
 * - Subscription status changes (expiration, renewal, etc.)
 * - Purchases made on other devices sync
 * - Admin grants/revokes entitlements
 * - Refunds are processed
 *
 * This ensures the app stays in sync with the latest subscription state
 * without manually polling RevenueCat.
 *
 * @param callback - Called with updated premium status whenever CustomerInfo changes
 * @returns Cleanup function to remove the listener
 */
export function setupCustomerInfoListener(
  callback: (isPremium: boolean) => void
): () => void {
  if (!isConfigured || !Purchases) {
    console.warn('[Purchases] Cannot setup listener: SDK not configured');
    return () => {}; // No-op cleanup
  }

  try {
    const listener = Purchases.addCustomerInfoUpdateListener((customerInfo: CustomerInfo) => {
      const isPremium = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;
      callback(isPremium);
    });

    // Return cleanup function
    return () => {
      try {
        listener.remove();
      } catch (error) {
        console.warn('[Purchases] Failed to remove listener:', error);
      }
    };
  } catch (error) {
    console.error('[Purchases] Failed to setup CustomerInfo listener:', error);
    return () => {}; // No-op cleanup
  }
}
