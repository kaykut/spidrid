// Import built-in jest matchers from @testing-library/react-native
import '@testing-library/react-native/build/matchers/extend-expect';

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

// Mock expo-file-system with new File API
jest.mock('expo-file-system', () => ({
  File: jest.fn().mockImplementation((uri) => ({
    uri,
    exists: true,
    base64: jest.fn().mockResolvedValue('mockBase64Data'),
    delete: jest.fn(),
  })),
}));

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      signInAnonymously: jest.fn().mockResolvedValue({
        data: { user: { id: 'mock-user-id', is_anonymous: true }, session: { access_token: 'mock-token' } },
        error: null,
      }),
      onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      linkIdentity: jest.fn().mockResolvedValue({ data: {}, error: null }),
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
