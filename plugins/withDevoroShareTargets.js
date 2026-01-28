const {
  AndroidConfig,
  createRunOncePlugin,
  withAndroidManifest,
  withPlugins,
} = require('@expo/config-plugins');

const {
  withIosAppInfoPlist,
} = require('expo-share-intent/plugin/build/ios/withIosAppInfoPlist');
const {
  withAppEntitlements,
} = require('expo-share-intent/plugin/build/ios/withIosAppEntitlements');
const {
  withShareExtensionConfig,
} = require('expo-share-intent/plugin/build/ios/withIosShareExtensionConfig');
const {
  withShareExtensionXcodeTarget,
} = require('expo-share-intent/plugin/build/ios/withIosShareExtensionXcodeTarget');
const {
  withAndroidMainActivityAttributes,
} = require('expo-share-intent/plugin/build/android/withAndroidMainActivityAttributes');
const {
  withCompatibilityChecker,
} = require('expo-share-intent/plugin/build/withCompatibilityChecker');

const DEFAULT_ANDROID_MIME_TYPES = [
  'text/plain',
  'text/uri-list',
  'application/pdf',
  'application/epub+zip',
];

const DEFAULT_IOS_ACTIVATION_RULES =
  'SUBQUERY(extensionItems, $extensionItem, SUBQUERY($extensionItem.attachments, $attachment, ' +
  'ANY $attachment.registeredTypeIdentifiers UTI-CONFORMS-TO "public.url" || ' +
  'ANY $attachment.registeredTypeIdentifiers UTI-CONFORMS-TO "public.plain-text" || ' +
  'ANY $attachment.registeredTypeIdentifiers UTI-CONFORMS-TO "com.adobe.pdf" || ' +
  'ANY $attachment.registeredTypeIdentifiers UTI-CONFORMS-TO "org.idpf.epub-container"' +
  ').@count > 0).@count > 0';

const DEFAULT_ANDROID_TARGETS = [
  {
    target: 'open',
    aliasName: '.ShareToDevoroOpen',
    label: 'Devoro Open',
  },
  {
    target: 'add',
    aliasName: '.ShareToDevoroAdd',
    label: 'Devoro Add',
  },
];

const DEFAULT_IOS_TARGETS = (bundleIdentifier) => [
  {
    iosShareExtensionName: 'Devoro Open',
    iosShareExtensionBundleIdentifier: `${bundleIdentifier}.share-open`,
    iosShareExtensionSharedKeySuffix: 'Open',
    iosShareExtensionTarget: 'open',
  },
  {
    iosShareExtensionName: 'Devoro Add',
    iosShareExtensionBundleIdentifier: `${bundleIdentifier}.share-add`,
    iosShareExtensionSharedKeySuffix: 'Add',
    iosShareExtensionTarget: 'add',
  },
];

const createIntentFilter = (action, mimeTypes) => ({
  action: [
    {
      $: {
        'android:name': action,
      },
    },
  ],
  category: [
    {
      $: {
        'android:name': 'android.intent.category.DEFAULT',
      },
    },
  ],
  data: mimeTypes.map((mimeType) => ({
    $: {
      'android:mimeType': mimeType,
    },
  })),
});

const removeShareIntentFilters = (activity) => {
  if (!Array.isArray(activity['intent-filter'])) {
    return;
  }

  activity['intent-filter'] = activity['intent-filter'].filter((filter) => {
    const actions = filter.action || [];
    const actionNames = actions
      .map((action) => action?.$?.['android:name'])
      .filter(Boolean);
    return !actionNames.some(
      (name) =>
        name === 'android.intent.action.SEND' ||
        name === 'android.intent.action.SEND_MULTIPLE'
    );
  });
};

const createAlias = (target, aliasName, label, intentFilters) => ({
  $: {
    'android:name': aliasName,
    'android:enabled': 'true',
    'android:exported': 'true',
    'android:label': label,
    'android:targetActivity': '.MainActivity',
  },
  'intent-filter': intentFilters,
  'meta-data': [
    {
      $: {
        'android:name': 'devoroShareTarget',
        'android:value': target,
      },
    },
  ],
});

const withAndroidShareActivityAliases = (config, params) =>
  withAndroidManifest(config, (config) => {
    const manifest = config.modResults;
    const application = AndroidConfig.Manifest.getMainApplicationOrThrow(manifest);
    const mainActivity = AndroidConfig.Manifest.getMainActivityOrThrow(manifest);

    removeShareIntentFilters(mainActivity);

    const intentFilters = [];
    const shareFilters = params.androidIntentFilters || DEFAULT_ANDROID_MIME_TYPES;
    if (shareFilters.length) {
      intentFilters.push(createIntentFilter('android.intent.action.SEND', shareFilters));
    }
    const multiFilters = params.androidMultiIntentFilters || [];
    if (multiFilters.length) {
      intentFilters.push(
        createIntentFilter('android.intent.action.SEND_MULTIPLE', multiFilters)
      );
    }

    if (!Array.isArray(application['activity-alias'])) {
      application['activity-alias'] = [];
    }

    const targets = params.androidShareTargets || DEFAULT_ANDROID_TARGETS;
    const aliasNames = new Set(targets.map((target) => target.aliasName));
    application['activity-alias'] = application['activity-alias'].filter(
      (alias) => !aliasNames.has(alias?.$?.['android:name'])
    );

    targets.forEach((target) => {
      const alias = createAlias(
        target.target,
        target.aliasName,
        target.label,
        JSON.parse(JSON.stringify(intentFilters))
      );
      application['activity-alias'].push(alias);
    });

    return config;
  });

const withDevoroShareTargets = (config, params = {}) => {
  const bundleIdentifier = config.ios?.bundleIdentifier || 'com.devoro.app';
  const iosShareExtensions = params.iosShareExtensions
    ? params.iosShareExtensions
    : DEFAULT_IOS_TARGETS(bundleIdentifier);
  const iosActivationRules = params.iosActivationRules || DEFAULT_IOS_ACTIVATION_RULES;

  const baseParams = {
    ...params,
    iosActivationRules,
    androidIntentFilters: params.androidIntentFilters || DEFAULT_ANDROID_MIME_TYPES,
  };

  const plugins = [
    (config) => withCompatibilityChecker(config, baseParams),
    (config) => withIosAppInfoPlist(config, baseParams),
    (config) => withAppEntitlements(config, baseParams),
    (config) => withAndroidMainActivityAttributes(config, baseParams),
    (config) => withAndroidShareActivityAliases(config, baseParams),
    ...iosShareExtensions.flatMap((extension) => {
      const extensionParams = {
        ...baseParams,
        ...extension,
      };
      return [
        (config) => withShareExtensionConfig(config, extensionParams),
        (config) => withShareExtensionXcodeTarget(config, extensionParams),
      ];
    }),
  ];

  return withPlugins(config, plugins);
};

module.exports = createRunOncePlugin(
  withDevoroShareTargets,
  'with-devoro-share-targets',
  '1.0.0'
);
