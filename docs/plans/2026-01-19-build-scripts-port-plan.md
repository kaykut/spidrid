# Build Scripts Port Plan

**Date**: 2026-01-19
**Status**: Proposed
**Source**: `ruyamda_scripts/` folder (copied from another project)

---

## User Request

Port 4 build scripts from the ruyamda project to this project (Devoro):
1. `mobile-build.sh` - EAS distribution builds
2. `mobile-clean.sh` - Quick cache clearing
3. `mobile-rebuild.sh` - Full clean rebuild
4. `launch_expo.zsh` - Interactive environment launcher

Key requirement: **Single command to build AND upload to TestFlight**.

---

## Source Script Analysis

### 1. mobile-build.sh (386 lines)
**Purpose**: EAS Build for standalone distribution builds (IPAs)

**Flags**:
- `--target <device|testflight>` - Where to deploy
- `--env <test|prod>` - Environment (RevenueCat keys + build profile)

**Features**:
- 4 build combinations (test/prod × device/testflight)
- Validates .env.preview and .env.production files
- Sets up .env.local with selected environment
- Runs `expo prebuild --clean`
- Runs `eas build --local` with appropriate profile
- For device: Installs via ios-deploy or Xcode Devices
- For testflight: Uploads via `eas submit`
- Cleanup trap for .env.local

**Build Profile Mapping**:
| --env | --target | Profile |
|-------|----------|---------|
| test | device | preview-debug |
| test | testflight | preview-testflight |
| prod | device | preview |
| prod | testflight | production |

### 2. mobile-clean.sh (46 lines)
**Purpose**: Quick cache clearing without rebuild

**Actions**:
- Kill Metro processes
- Free port 8081
- Clear `.expo`, `node_modules/.cache`
- Clear `/tmp/metro-*`, `/tmp/haste-*`, `/tmp/react-*`
- Run `watchman watch-del-all`

### 3. mobile-rebuild.sh (117 lines)
**Purpose**: Full nuclear rebuild

**Arguments**: `[ios|android] [--device]`

**Steps**:
1. Kill Metro processes
2. Clean Metro and Expo caches
3. Clean iOS/Android build artifacts
4. Run `expo prebuild --clean`
5. Install pods (iOS) or gradle sync (Android)
6. Build and run app

### 4. launch_expo.zsh (459 lines)
**Purpose**: Interactive environment selection + Metro launcher

**Options**:
1. Local - .env.development (test RC, local Supabase, debug bypass ON)
2. Preview - .env.preview (test RC, cloud Supabase)
3. Production - .env.production (prod RC, prod Supabase)
4. Device Build (Preview) - expo run:ios --device with .env.preview
5. Device Build (Production) - expo run:ios --device with .env.production

**Features**:
- Clears all caches before start
- Sets EXPO_PUBLIC_ENV_FILE
- Copies env to .env.local (highest precedence)
- Clears AsyncStorage for environment switches
- Verifies environment variables
- Logging to files (expo.log, expo.color.log)

---

## Current Project State (Devoro)

| Aspect | Status |
|--------|--------|
| **Package manager** | npm (not pnpm) |
| **Project structure** | Single app at root (not monorepo) |
| **Bundle ID** | `com.devoro.app` |
| **eas.json** | Does NOT exist (needs creation) |
| **Environment files** | Single `.env.local` |
| **RevenueCat** | `react-native-purchases` added, `REVENUECAT_API_KEY` in .env.local |
| **Supabase** | `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` |

### Current .env.local Contents
```
EXPO_PUBLIC_SUPABASE_URL=https://psyhlugoybsyrlcthshi.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_blbvtghaSBPb3_l07froJg_4-cPgo42
REVENUECAT_API_KEY=appl_EbbSJYXsyUTvsNiKluBrFxiPBom
```

---

## Adaptations Required

| Aspect | Ruyamda | Devoro |
|--------|---------|--------|
| Package manager | `pnpm --filter @ruyamda/mobile` | `npm` |
| App directory | `$REPO_ROOT/apps/mobile` | `.` (project root) |
| Bundle ID | `com.ruyamda.app` | `com.devoro.app` |
| Environment files | Multiple (.env.development, .env.preview, .env.production) | Single (.env.local) |
| --env flag | Required (test/prod) | Optional (defaults to .env.local) |

---

## Final Plan

### Scripts to Create

```
scripts/
├── clean.sh      # Quick cache clearing
├── rebuild.sh    # Full nuclear rebuild
├── start.sh      # Clean start Metro
└── build.sh      # EAS build + TestFlight upload
```

### 1. scripts/clean.sh
**Source**: mobile-clean.sh
**Adaptations**: Remove monorepo paths

**Functionality**:
- Kill Metro processes
- Free port 8081
- Clear .expo, node_modules/.cache, watchman, tmp files

### 2. scripts/rebuild.sh
**Source**: mobile-rebuild.sh
**Adaptations**: npm instead of pnpm, single app paths

**Usage**: `./scripts/rebuild.sh [ios|android] [--device]`

**Steps**:
1. Kill Metro
2. Clean caches
3. Clean build artifacts (ios/build, DerivedData)
4. expo prebuild --clean
5. pod install
6. expo run:ios [--device]

### 3. scripts/start.sh
**Source**: Simplified from launch_expo.zsh
**Simplifications**: Remove 5-way env selection, RevenueCat detection, .env.local hijacking

**Usage**: `./scripts/start.sh`

**Functionality**:
- Kill existing Metro on port 8081
- Clear caches (.expo, node_modules/.cache, watchman)
- Run `expo start --clear`

### 4. scripts/build.sh
**Source**: mobile-build.sh
**Adaptations**: npm, single app, simplified env handling

**Usage**:
```bash
./scripts/build.sh --target device       # Build & install on device
./scripts/build.sh --target testflight   # Build & upload to TestFlight
```

**Flags**:
- `--target <device|testflight>` (required)
- `--help` - Show usage

**Flow**:
1. Validate --target flag
2. Display build configuration
3. Run `npm install`
4. Run `expo prebuild --clean --platform ios`
5. Run `eas build --local --platform ios --profile <profile>`
6. For device: Install via ios-deploy or show manual instructions
7. For testflight: Upload via `eas submit`

**Build Profiles**:
| --target | Profile | Distribution |
|----------|---------|--------------|
| device | preview | internal |
| testflight | production | store |

---

### Additional File: eas.json

Required for build.sh to work.

```json
{
  "cli": {
    "version": ">= 10.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false,
        "buildConfiguration": "Release"
      }
    },
    "production": {
      "distribution": "store",
      "ios": {
        "buildConfiguration": "Release"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "YOUR_APPLE_ID",
        "ascAppId": "YOUR_APP_STORE_CONNECT_APP_ID",
        "appleTeamId": "YOUR_TEAM_ID"
      }
    }
  }
}
```

**Note**: User must fill in Apple credentials for TestFlight uploads.

---

## Scripts NOT Ported

| Script | Reason |
|--------|--------|
| Complex launch_expo.zsh env selection | Only 1 env file exists; overkill |
| refresh-analytics.sh | Project-specific to ruyamda |
| setup-fastlane.sh | No Fastlane in this project |
| supabase_debug.sh | Can add later if needed |
| test-summary.sh | Already has npm test |

---

## Post-Implementation Cleanup

After scripts are created and tested:
1. Delete `ruyamda_scripts/` folder
2. Update CLAUDE.md with new scripts documentation

---

## Future Expansion

When multiple environments are needed:
1. Create `.env.preview` (sandbox RC key) and `.env.production` (prod RC key)
2. Add `--env test|prod` flag to build.sh
3. Add more build profiles to eas.json if needed
