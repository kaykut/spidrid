// Import built-in jest matchers from @testing-library/react-native
import '@testing-library/react-native/build/matchers/extend-expect';

// Initialize i18n for tests (must be before any module imports that use i18n)
// This fixes tests that import INTERESTS or TOPICS which use i18n.t() at module load time
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      interests: require('./src/locales/en/interests.json'),
      topics: require('./src/locales/en/topics.json'),
    },
  },
  interpolation: { escapeValue: false },
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo-print
jest.mock('expo-print', () => ({
  printToFileAsync: jest.fn().mockResolvedValue({ uri: 'file://mock.pdf' }),
}));

// Mock expo-sharing
jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn().mockResolvedValue(true),
  shareAsync: jest.fn().mockResolvedValue(undefined),
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View, Animated } = require('react-native');

  // Swipeable needs to render children and pass ref
  const Swipeable = React.forwardRef(({ children }, ref) => {
    React.useImperativeHandle(ref, () => ({
      close: jest.fn(),
    }));
    return React.createElement(View, null, children);
  });
  Swipeable.displayName = 'Swipeable';

  return {
    Swipeable,
    GestureHandlerRootView: View,
    PanGestureHandler: View,
    TapGestureHandler: View,
    ScrollView: View,
    FlatList: View,
    State: {},
    Directions: {},
  };
});

// Mock expo-file-system with new File + Directory API
jest.mock('expo-file-system', () => {
  const joinUri = (...parts) => {
    const normalized = parts
      .map((part) => {
        if (typeof part === 'string') {return part;}
        if (part && typeof part.uri === 'string') {return part.uri;}
        return '';
      })
      .filter(Boolean);
    if (normalized.length === 0) {return '';}
    return normalized.slice(1).reduce((acc, part) => {
      const accTrim = acc.replace(/\/+$/, '');
      const partTrim = part.replace(/^\/+/, '');
      return `${accTrim}/${partTrim}`;
    }, normalized[0]);
  };

  const mockFileCopy = jest.fn();
  const mockDirectoryCreate = jest.fn();

  class Directory {
    constructor(...uris) {
      this.uri = joinUri(...uris);
    }
    create(...args) {
      return mockDirectoryCreate(...args);
    }
    createDirectory(name) {
      return new Directory(this, name);
    }
    createFile(name) {
      return new File(this, name);
    }
  }

  const File = jest.fn().mockImplementation((...uris) => ({
    uri: joinUri(...uris),
    exists: true,
    base64: jest.fn().mockResolvedValue('mockBase64Data'),
    delete: jest.fn(),
    copy: mockFileCopy,
  }));

  return {
    File,
    Directory,
    Paths: {
      document: new Directory('file:///app/documents/'),
    },
  };
});

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      refreshSession: jest.fn().mockResolvedValue({
        data: { session: { access_token: 'mock-refreshed-token' } },
        error: null,
      }),
      signInAnonymously: jest.fn().mockResolvedValue({
        data: { user: { id: 'mock-user-id', is_anonymous: true }, session: { access_token: 'mock-token' } },
        error: null,
      }),
      onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      linkIdentity: jest.fn().mockResolvedValue({ data: {}, error: null }),
      signUp: jest.fn().mockResolvedValue({ data: {}, error: null }),
      signInWithPassword: jest.fn().mockResolvedValue({ data: {}, error: null }),
      resetPasswordForEmail: jest.fn().mockResolvedValue({ data: {}, error: null }),
      setSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      signInWithOAuth: jest.fn().mockResolvedValue({ data: {}, error: null }),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
    })),
  })),
}));

// Mock expo-linking for deep link handling
jest.mock('expo-linking', () => ({
  getInitialURL: jest.fn().mockResolvedValue(null),
  addEventListener: jest.fn().mockReturnValue({ remove: jest.fn() }),
}));

// expo-apple-authentication and expo-crypto are mocked via __mocks__ directory

// Mock expo-audio for audio recording
jest.mock('expo-audio', () => ({
  useAudioRecorder: jest.fn(() => ({
    isRecording: false,
    uri: 'file://mock-audio.m4a',
    prepareToRecordAsync: jest.fn().mockResolvedValue(undefined),
    record: jest.fn(),
    stop: jest.fn().mockResolvedValue(undefined),
  })),
  RecordingPresets: {
    HIGH_QUALITY: {},
  },
  requestRecordingPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
  setAudioModeAsync: jest.fn().mockResolvedValue(undefined),
}));

// Mock PurchasesService for subscription store tests
jest.mock('./src/services/purchases', () => ({
  configurePurchases: jest.fn().mockResolvedValue(false), // Default to SDK not available
  checkPremiumStatus: jest.fn().mockResolvedValue(false),
  loginUser: jest.fn().mockResolvedValue(null),
  logoutUser: jest.fn().mockResolvedValue(undefined),
  restorePurchases: jest.fn().mockResolvedValue(null),
  getOfferings: jest.fn().mockResolvedValue([]),
  purchasePackage: jest.fn().mockResolvedValue(null),
  isAvailable: jest.fn().mockReturnValue(false),
  getPremiumEntitlement: jest.fn().mockReturnValue('premium'),
  setupCustomerInfoListener: jest.fn().mockReturnValue(() => {}), // Returns cleanup function
}));

// syncOrchestrator is mocked locally in tests that need it (e.g., subscriptionStore.test.ts)
// The actual module uses dynamic imports which are handled by try-catch in production code

// Mock syncAccess for sync adapter tests
jest.mock('./src/services/sync/syncAccess', () => ({
  requireSyncEligibility: jest.fn(), // Default: no-op (doesn't throw)
}));

// Mock franc-min to avoid ESM module issues
jest.mock('franc-min', () => ({
  franc: jest.fn((text) => {
    // Mock returns ISO 639-3 codes like the real franc
    if (text.includes('quick brown fox')) return 'eng';
    if (text.includes('rápido marrón')) return 'spa';
    if (text.includes('rapide brun')) return 'fra';
    return 'und'; // undetermined
  }),
}));

// Silence console warnings in tests
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0]?.includes?.('Animated') ||
    args[0]?.includes?.('NativeEventEmitter')
  ) {
    return;
  }
  originalWarn(...args);
};

// Reset all mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
