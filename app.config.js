export default {
  expo: {
    name: 'Devoro',
    slug: 'devoro',
    scheme: 'devoro',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/devoro_icon_dark.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      // No image - just dark background. The animated JS splash shows the logo.
      backgroundColor: '#0a0a0a',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.devoro.app',
      appleTeamId: '9AL54PGCAT',
      usesAppleSignIn: true,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        CFBundleAllowMixedLocalizations: true,
      },
    },
    android: {
      package: 'com.devoro.app',
      adaptiveIcon: {
        foregroundImage: './assets/devoro_icon_dark.png',
        backgroundColor: '#0a0a0a',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-audio',
      'expo-font',
      'expo-asset',
      'expo-apple-authentication',
      [
        './plugins/withDevoroShareTargets',
        {
          androidIntentFilters: [
            'text/plain',
            'text/uri-list',
            'application/pdf',
            'application/epub+zip',
          ],
          androidMultiIntentFilters: [],
          iosActivationRules:
            'SUBQUERY(extensionItems, $extensionItem, SUBQUERY($extensionItem.attachments, $attachment, ' +
            'ANY $attachment.registeredTypeIdentifiers UTI-CONFORMS-TO \"public.url\" || ' +
            'ANY $attachment.registeredTypeIdentifiers UTI-CONFORMS-TO \"public.plain-text\" || ' +
            'ANY $attachment.registeredTypeIdentifiers UTI-CONFORMS-TO \"com.adobe.pdf\" || ' +
            'ANY $attachment.registeredTypeIdentifiers UTI-CONFORMS-TO \"org.idpf.epub-container\"' +
            ').@count > 0).@count > 0',
          iosShareExtensions: [
            {
              iosShareExtensionName: 'Devoro Open',
              iosShareExtensionBundleIdentifier: 'com.devoro.app.share-open',
              iosShareExtensionSharedKeySuffix: 'Open',
              iosShareExtensionTarget: 'open',
            },
            {
              iosShareExtensionName: 'Devoro Add',
              iosShareExtensionBundleIdentifier: 'com.devoro.app.share-add',
              iosShareExtensionSharedKeySuffix: 'Add',
              iosShareExtensionTarget: 'add',
            },
          ],
          androidShareTargets: [
            { target: 'open', aliasName: '.ShareToDevoroOpen', label: 'Devoro Open' },
            { target: 'add', aliasName: '.ShareToDevoroAdd', label: 'Devoro Add' },
          ],
        },
      ],
    ],
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      revenueCatApiKey: process.env.REVENUECAT_API_KEY,
      eas: {
        projectId: 'a7428199-ba1f-420e-b42f-97648b3d0a40',
      },
    },
  },
};
