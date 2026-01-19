# Scripts

This directory contains utility scripts for the Rüyamda monorepo.

## test-summary.sh

A shell script that runs the full test suite and outputs a concise summary instead of thousands of lines of verbose output.

### Usage

```bash
# Run via pnpm script
pnpm test:summary

# Or run directly
bash scripts/test-summary.sh
```

### Output Format

The script:
1. Runs all tests across all packages (`pnpm test`)
2. Parses the Vitest output from each package
3. Outputs a clean summary showing:
   - Per-package statistics (total, passed, failed, skipped, errors)
   - Overall statistics across all packages
   - Total duration
   - Pass/fail status

### Example Output

```
================================================================================
TEST SUMMARY
================================================================================

Package: @ruyamda/shared-logic
  Total:   165 tests
  Passed:  165 ✓
  Failed:  0
  Skipped: 0
  Errors:  0

Package: @ruyamda/shared-types
  Total:   23 tests
  Passed:  23 ✓
  Failed:  0
  Skipped: 0
  Errors:  0

Package: @ruyamda/web
  Total:   601 tests
  Passed:  575 ✓
  Failed:  0
  Skipped: 26
  Errors:  0

================================================================================
OVERALL SUMMARY
================================================================================
Total Packages: 3
Total Tests:    789
Passed:         763 ✓
Failed:         0
Skipped:        26
Errors:         0

Duration: 14.20s
Status: ✅ ALL TESTS PASSING
================================================================================
```

### Benefits

- **Concise**: Summary fits on one screen instead of thousands of lines
- **Quick Scan**: Color-coded output makes it easy to spot failures
- **Complete**: Shows results from all packages in the monorepo
- **Non-destructive**: Original test output is still visible during execution

### Technical Details

- Written in Bash for portability
- Uses indexed arrays (compatible with older Bash versions)
- Parses Turborepo + Vitest output format
- Handles multiple output formats (passed only, passed + skipped, failed + passed, etc.)
- Exit code reflects test status (0 = passing, 1 = failures)

## mobile-rebuild.sh

Complete rebuild script for the React Native mobile app. Performs full cleanup, prebuild, and launches the app.

### Usage

```bash
# iOS (default)
./scripts/mobile-rebuild.sh
./scripts/mobile-rebuild.sh ios

# Android
./scripts/mobile-rebuild.sh android
```

### What It Does

1. **Kills Metro processes** - Stops all running Metro bundlers and frees port 8081
2. **Cleans caches** - Removes `.expo`, `node_modules/.cache`, Metro temp files
3. **Cleans build artifacts** - Removes iOS build folder and Xcode DerivedData (or Android build folders)
4. **Runs Expo prebuild** - Regenerates native iOS/Android project with all modules
5. **Installs dependencies** - Runs `pod install` (iOS) or Gradle sync (Android)
6. **Starts Metro** - Launches Metro bundler in background
7. **Builds and runs** - Compiles and launches the app on simulator/device

### When To Use

- After adding new native modules (e.g., `react-native-purchases`)
- When app crashes on launch with module not found errors
- After cleaning node_modules or switching branches
- When Metro bundler shows persistent caching issues
- After Expo SDK updates

### Output

Metro logs are written to `/tmp/metro-output.log`. The script displays:
- Color-coded progress for each step
- Metro PID for manual control
- Helpful commands for viewing logs and stopping Metro

## mobile-clean.sh

Quick clean script for the mobile app. Clears caches and restarts Metro without rebuilding.

### Usage

```bash
./scripts/mobile-clean.sh
```

### What It Does

1. **Kills Metro processes** - Stops all running Metro bundlers
2. **Cleans caches** - Removes `.expo`, `node_modules/.cache`, Metro temp files
3. **Restarts Metro** - Launches fresh Metro bundler with cleared cache

### When To Use

- Metro showing stale cached content
- App not reflecting recent code changes
- Need to restart Metro quickly without full rebuild
- After pulling changes from git

### Difference from mobile-rebuild.sh

| Feature | mobile-clean.sh | mobile-rebuild.sh |
|---------|----------------|-------------------|
| Cleans caches | ✅ | ✅ |
| Stops Metro | ✅ | ✅ |
| Restarts Metro | ✅ | ✅ |
| Cleans build artifacts | ❌ | ✅ |
| Runs prebuild | ❌ | ✅ |
| Installs pods/gradle | ❌ | ✅ |
| Builds app | ❌ | ✅ |
| Speed | ~10 seconds | ~3-5 minutes |

**Rule of thumb:** Use `mobile-clean.sh` for cache issues, use `mobile-rebuild.sh` for native module changes.

## mobile-testflight.sh

Automated script for building and deploying iOS builds locally. Supports two modes:
1. **TestFlight Upload Mode** (default) - Builds production IPA and uploads to TestFlight
2. **Device Testing Mode** (`--device` flag) - Builds release IPA for local device testing

Uses `eas build --local` to avoid consuming EAS build credits.

### Usage

```bash
# TestFlight upload mode (default)
# 1. Update build number in apps/mobile/app.json
# 2. Commit your changes
# 3. Run the script
./scripts/mobile-testflight.sh

# Device testing mode (release build for local testing)
./scripts/mobile-testflight.sh --device
```

### TestFlight Upload Mode (Default)

**What It Does:**
1. **Checks git status** - Ensures working directory is clean (all changes committed)
2. **Prompts for build number** - Reminds you to update `ios.buildNumber` in `app.json`
3. **Loads `.env.production`** - Sources production env vars into shell environment
4. **Builds production IPA** - Uses EAS production profile (App Store distribution)
5. **Uploads to TestFlight** - Uses `eas submit` (free, no credits used)
6. **Cleans up** - Removes the local IPA file

**When To Use:**
- Uploading bug fixes to TestFlight
- Quick iteration on production builds
- Preserving limited EAS build credits

**Requirements:**
- macOS with Xcode 15.0+ installed
- Valid Apple Developer account
- App configured in App Store Connect
- Clean git working directory (no uncommitted changes)
- `.env.production` file with production credentials

### Device Testing Mode (`--device`)

**What It Does:**
1. **Skips git check** - Allows uncommitted changes
2. **Loads `.env.production`** - Sources env vars (or uses `.env` if production unavailable)
3. **Builds release IPA** - Uses EAS preview profile (internal distribution, release mode)
4. **Installs on device** - Attempts automatic install via `ios-deploy`, falls back to Xcode Devices
5. **Shows log instructions** - Guides you to view device console logs

**When To Use:**
- **Reproducing TestFlight crashes locally** - Same release build configuration as production
- Testing production behavior without uploading to TestFlight
- Debugging issues that only appear in release builds (optimizations, no Metro)

**Key Differences from Development Builds:**
- ✅ Release mode (optimizations enabled, no Metro bundler)
- ✅ Replicates TestFlight build exactly
- ✅ Shows real production crash behavior
- ❌ No Metro connection (must view logs via Xcode Device Console)

**Installation Methods:**
1. **Automatic (ios-deploy):** If `ios-deploy` is installed (`npm install -g ios-deploy`)
2. **Manual (Xcode Devices):** Script opens Xcode Devices window for drag-and-drop installation

**Viewing Logs:**
Since release builds don't connect to Metro, use Xcode Device Console:
1. Connect iPhone via USB
2. Xcode → Window → Devices and Simulators (Cmd+Shift+2)
3. Select iPhone → Click "Open Console"
4. Filter by "ruyamda" to see app logs

### Environment Variables

The script loads env vars from `.env.production` (or `.env` for device mode) into the shell environment. When EAS builds locally, it copies the project to a temp directory (gitignored files excluded), but env vars are pre-loaded via `source` command, so `app.config.ts` reads them from `process.env`.

**Expected warnings (safe to ignore):**
```
[app.config.ts] .env.production not found at /var/.../build/apps/mobile/.env.production
[app.config.ts] Release build continuing with env vars from environment (no file found)
```
This is expected - the env file doesn't exist in the temp build directory, but env vars are already loaded.

### Output

Color-coded progress for each step, with links to App Store Connect for checking build processing status.

### Cost Comparison

| Method | EAS Credits | Time | Manual Steps |
|--------|-------------|------|--------------|
| **EAS Build Cloud** | 1 credit | 15-20 min | Low |
| **mobile-testflight.sh** | 0 credits | 10-15 min | 1 (update build #) |
| **Manual Xcode** | 0 credits | 15-20 min | Many |

## setup-fastlane.sh

One-time setup script for Fastlane automation. Installs Fastlane via Bundler for fully automated TestFlight uploads.

### Usage

```bash
# One-time setup
./scripts/setup-fastlane.sh

# Then for each release
cd apps/mobile
bundle exec fastlane beta  # Auto-increments build, builds, uploads
```

### What It Does

1. **Installs Bundler** - If not already present
2. **Creates Gemfile** - Ruby dependency file for Fastlane
3. **Installs Fastlane** - Via `bundle install`

### Available Fastlane Lanes

After setup, you can use these commands from `apps/mobile/`:

```bash
# Build and upload to TestFlight (fully automated)
bundle exec fastlane beta

# Upload an existing IPA
bundle exec fastlane upload --ipa ./path/to/app.ipa
```

### What Fastlane Beta Lane Does

1. **Auto-increments build number** - Updates `ios.buildNumber` in Xcode project
2. **Runs prebuild** - `expo prebuild --platform ios --clean`
3. **Installs pods** - `pod install`
4. **Archives app** - Creates release build
5. **Uploads to TestFlight** - Automatic submission

### When To Use

- You want **zero manual steps** for TestFlight uploads
- Frequent releases (saves time long-term)
- CI/CD automation (can integrate with GitHub Actions)
- Auto-incrementing build numbers

### Comparison to mobile-testflight.sh

| Feature | mobile-testflight.sh | Fastlane |
|---------|---------------------|----------|
| Build number management | Manual | Auto-increment |
| Setup complexity | None | One-time setup |
| Per-release steps | Update build # + run | Just run |
| EAS credits used | 0 | 0 |
| Time per release | 10-15 min | 5-10 min |
| Best for | Occasional releases | Frequent releases |
