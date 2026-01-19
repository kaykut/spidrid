# iOS 26 Liquid Glass Implementation

This document describes how Devoro implements Apple's iOS 26 "Liquid Glass" design language with graceful fallbacks for older iOS versions and Android.

## Overview

iOS 26 introduced UIGlassEffect, a translucent material with dynamic refraction and blur that Apple calls "Liquid Glass." Our implementation uses native liquid glass on iOS 26+ while falling back to blur effects elsewhere.

## Architecture

### Dependencies

```json
{
  "dependencies": {
    "react-native-glass-effect-view": "^1.0.0",
    "expo-blur": "~15.0.8",
    "expo-constants": "~17.0.8"
  }
}
```

- **react-native-glass-effect-view**: Wraps iOS 26's native `UIGlassEffect` API
- **expo-blur**: Provides cross-platform blur fallback via `BlurView`
- **expo-constants**: Detects Expo Go vs development build runtime

### The GlassView Component

All glass effects route through a single wrapper component at `src/components/common/GlassView.tsx`. This provides a unified API that automatically selects the best available implementation.

```typescript
import { GlassView } from '../common/GlassView';

// Usage - identical API regardless of platform
<GlassView appearance="dark" style={styles.container}>
  {children}
</GlassView>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `appearance` | `'dark' \| 'light'` | Glass tint matching your theme |
| `style` | `StyleProp<ViewStyle>` | Standard React Native styles |
| `children` | `React.ReactNode` | Content rendered inside the glass |

### Implementation Strategy

The component uses **dynamic require** to conditionally load the native module. This is critical because `react-native-glass-effect-view` uses `codegenNativeComponent` which crashes at import time in Expo Go.

```typescript
// Detection logic (runs once at module load)
const isExpoGo = Constants.appOwnership === 'expo';

const canUseNativeLiquidGlass =
  !isExpoGo &&
  Platform.OS === 'ios' &&
  parseInt(String(Platform.Version).split('.')[0], 10) >= 26;

// Dynamic require prevents Expo Go crashes
let NativeGlassEffectView = null;
if (canUseNativeLiquidGlass) {
  try {
    const nativeModule = require('react-native-glass-effect-view');
    NativeGlassEffectView = nativeModule.GlassEffectView;
  } catch (e) {
    console.warn('Failed to load native GlassEffectView:', e);
  }
}
```

### Rendering Logic

```typescript
export function GlassView({ appearance, style, children }) {
  // iOS 26+ development build: Native liquid glass
  if (NativeGlassEffectView) {
    return (
      <NativeGlassEffectView appearance={appearance} style={style}>
        {children}
      </NativeGlassEffectView>
    );
  }

  // Fallback: expo-blur BlurView
  const tint = appearance === 'dark' ? 'dark' : 'light';
  return (
    <View style={style}>
      <BlurView
        intensity={80}
        tint={tint}
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}
```

## Platform Behavior Matrix

| Environment | Effect |
|-------------|--------|
| iOS 26+ (dev build) | Native UIGlassEffect liquid glass |
| iOS < 26 (dev build) | expo-blur BlurView |
| iOS (Expo Go) | expo-blur BlurView |
| Android (any) | expo-blur with `dimezisBlurView` method |

## How to Add Liquid Glass to a New Component

### Step 1: Import GlassView

```typescript
import { GlassView } from '../common/GlassView';
import { useTheme } from '../common/ThemeProvider';
```

### Step 2: Determine Appearance from Theme

```typescript
const { theme } = useTheme();
const isDarkTheme = theme.id === 'dark' || theme.id === 'midnight';
const appearance = isDarkTheme ? 'dark' : 'light';
```

### Step 3: Wrap Your Content

```typescript
<GlassView appearance={appearance} style={styles.container}>
  {/* Your content here */}
</GlassView>
```

### Step 4: Style Requirements

The style passed to GlassView must include:

```typescript
const styles = StyleSheet.create({
  container: {
    // Required: explicit dimensions or flex layout
    width: 200,        // or use flex: 1, alignSelf: 'stretch', etc.
    height: 50,

    // Required: clips the blur/glass to shape
    overflow: 'hidden',

    // Recommended: rounded corners for glass aesthetic
    borderRadius: 16,

    // Optional: any other layout styles
    padding: 12,
    flexDirection: 'row',
  },
});
```

**Important**: GlassView needs explicit or computed dimensions. It won't render if width/height resolve to 0.

---

## Usage Examples

### Floating Action Button

```typescript
<GlassView appearance={isDarkTheme ? 'dark' : 'light'} style={styles.fab}>
  <TouchableOpacity onPress={onPress} style={styles.touchable}>
    <Ionicons name="add" size={24} color={accentColor} />
  </TouchableOpacity>
</GlassView>

const styles = StyleSheet.create({
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26, // Circular
    overflow: 'hidden',
  },
});
```

### Tab Bar / Navigation Bar

```typescript
<GlassView appearance="dark" style={styles.tabBar}>
  {tabs.map(tab => (
    <TabButton key={tab.id} {...tab} />
  ))}
</GlassView>

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
```

## Development vs Production

### Expo Go (Development)
- Native modules unavailable
- Always uses expo-blur fallback
- Adequate for UI development and testing

### Development Build (`npx expo run:ios`)
- Native modules available
- Liquid glass renders on iOS 26+ simulators/devices
- Requires Xcode 26 beta for iOS 26 simulator

### Production Build
- Same behavior as development build
- Native liquid glass on iOS 26+, blur fallback elsewhere

## Building for iOS 26

To test native liquid glass:

1. Install Xcode 26 beta (includes iOS 26 SDK and simulator)
2. Create a development build:
   ```bash
   npx expo run:ios
   ```
3. For physical device:
   ```bash
   npx expo run:ios --device
   ```

## Known Limitations

1. **Expo Go**: Cannot use native liquid glass; always falls back to blur
2. **Android**: No native glass equivalent; uses blur approximation
3. **iOS < 26**: Uses blur fallback (matches Apple's own behavior for older OS)

## Future Considerations

- When iOS 26 reaches general availability, consider making liquid glass the minimum design baseline
- Android 16 may introduce similar glass effects; update GlassView when native libraries emerge
- Monitor `react-native-glass-effect-view` for API changes or improved Android support