#!/bin/zsh
# ~/Coding/ruyamda/launch_expo.zsh
set -e

# Help text
show_help() {
  cat << 'EOF'
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Expo Development Server Launcher - Interactive Environment Selection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

USAGE:
  ./launch_expo.zsh           # Interactive mode (default)
  echo "1" | ./launch_expo.zsh   # Pipe option (non-interactive)
  ./launch_expo.zsh --help       # Show this help

INTERACTIVE OPTIONS:
  [1] Local (default)
      • Environment: .env.development
      • RevenueCat: 🧪 SANDBOX (test_* key)
      • Supabase: LOCAL (http://127.0.0.1:54321)
      • Debug Bypass: ✅ ENABLED (always grants premium)
      • Command: pnpm expo start --clear
      • Output: Logs to logs/expo.log and logs/expo.color.log

      Use for: Fast UI iteration, local backend testing, feature development

  [2] Preview
      • Environment: .env.preview
      • RevenueCat: 🧪 SANDBOX (test_* key)
      • Supabase: CLOUD (https://unxizwyryahdndkjkroi.supabase.co)
      • Debug Bypass: ❌ DISABLED (real entitlement checks)
      • Command: pnpm expo start --clear
      • Output: Logs to logs/expo.log and logs/expo.color.log

      Use for: Testing against real backend, subscription flow validation

  [3] Production
      • Environment: .env.production
      • RevenueCat: 🏭 PRODUCTION (live key)
      • Supabase: PRODUCTION (https://your-prod.supabase.co)
      • Debug Bypass: ❌ DISABLED
      • Command: pnpm expo start --clear
      • Output: Logs to logs/expo.log and logs/expo.color.log

      Use for: Testing with production environment, final validation before release

  [4] Device Build (Preview)
      • Environment: .env.preview
      • RevenueCat: 🧪 SANDBOX (test_* key)
      • Supabase: PREVIEW CLOUD
      • Debug Bypass: ❌ DISABLED
      • Command: npx expo run:ios --device
      • Build Type: Development build (Debug) with Metro hot reload
      • Output: Builds, installs, connects to Metro

      Use for: On-device testing with preview environment, sandbox purchases

  [5] Device Build (Production)
      • Environment: .env.production
      • RevenueCat: 🏭 PRODUCTION (live key)
      • Supabase: PRODUCTION CLOUD
      • Debug Bypass: ❌ DISABLED
      • Command: npx expo run:ios --device
      • Build Type: Development build (Debug) with Metro hot reload
      • Output: Builds, installs, connects to Metro

      Use for: On-device testing with production environment, final validation

NON-INTERACTIVE USAGE:
  # Pipe the option number to skip interactive prompt
  echo "1" | ./launch_expo.zsh   # Launch in Local mode
  echo "2" | ./launch_expo.zsh   # Launch in Preview mode
  echo "3" | ./launch_expo.zsh   # Launch in Production mode
  echo "4" | ./launch_expo.zsh   # Build for device (Preview)
  echo "5" | ./launch_expo.zsh   # Build for device (Production)

WHAT THIS SCRIPT DOES:
  1. Prompts for environment selection (or accepts piped input)
  2. Displays selected environment configuration
  3. Clears all caches (.expo, node_modules/.cache, watchman)
  4. Sets EXPO_PUBLIC_ENV_FILE to tell app.config.ts which env file to load
  5. For Options 1 & 2: Starts Expo dev server with Metro bundler
  6. For Option 3: Builds and installs development client on device

BUILD TYPES EXPLAINED:

  Options 1 & 2: Expo Dev Server
    • Runs Metro bundler in terminal
    • Supports hot reload (instant changes)
    • Works with Expo Go or development builds
    • Simulator or device connects to your computer
    • Fast iteration cycle (seconds)

  Option 3: Development Build on Device
    • Uses expo run:ios --device (NOT eas build)
    • Creates Debug build with Metro connection
    • Installs directly on connected iPhone
    • Stays connected to Metro (hot reload enabled)
    • Medium iteration cycle (1-2 min for rebuild)

COMPARISON WITH scripts/mobile-build.sh:

  ┌──────────────────────────────────────────────────────────────────────────┐
  │ Feature           │ Option 1/2/3       │ Option 4           │ mobile-   │
  │                   │ (Dev Server)       │ (Device Build)     │ build.sh  │
  ├──────────────────────────────────────────────────────────────────────────┤
  │ Build System      │ Metro Bundler      │ expo run:ios       │ eas build │
  │ Metro Connection  │ ✅ (simulator/dev) │ ✅ (device)        │ ❌        │
  │ Hot Reload        │ ✅ (instant)       │ ✅ (instant)       │ ❌        │
  │ Build Type        │ N/A (bundler)      │ Debug              │ Debug/Rel │
  │ Rebuild Time      │ N/A (no build)     │ 1-2 min            │ 5-10 min  │
  │ Production-Like   │ Med (Opt 3: High)  │ Low                │ High      │
  │ Use Case          │ UI development     │ On-device + reload │ Distribut.│
  └──────────────────────────────────────────────────────────────────────────┘

WHEN TO USE EACH OPTION:

  ✅ Option 1 (Local):
     • Developing UI components
     • Testing with local Supabase
     • Don't need real subscription flow
     • Want fastest possible iteration

  ✅ Option 2 (Preview):
     • Testing against cloud backend
     • Validating subscription flow in simulator
     • Need real entitlement checks (debug bypass OFF)
     • Still want Metro hot reload

  ✅ Option 3 (Production):
     • Final validation before release
     • Testing with production API keys and endpoints
     • Verifying production RevenueCat configuration
     • Testing production-specific features or flags

  ✅ Option 4 (Device Build - Preview):
     • Testing on-device features with preview environment
     • Need sandbox purchase flow testing
     • Want hot reload while testing on device
     • Testing against preview/staging backend

  ✅ Option 5 (Device Build - Production):
     • Final on-device validation with production environment
     • Testing production RevenueCat configuration on device
     • Verifying production API endpoints on real hardware
     • Last check before TestFlight/App Store submission

  ❌ Options 4/5 NOT suitable for:
     • Distribution testing (use mobile-build.sh instead)
     • TestFlight builds (use mobile-build.sh --target testflight)
     • App Store submissions (use mobile-build.sh --target testflight --env prod)

CACHING BEHAVIOR:
  • ALL caches cleared on every run (.expo, Metro, Watchman)
  • Ensures environment changes take effect immediately
  • Forces Metro to rebundle with new env vars

LOGGING:
  Options 1 & 2 create two log files in logs/ directory:
    • expo.color.log   : Raw output with ANSI color codes (debugging)
    • expo.log         : Cleaned output (no color, parseable)

  Option 3 outputs directly to terminal (no log files)

DEBUG BYPASS FLAG:
  EXPO_PUBLIC_DEBUG_BYPASS_ENTITLEMENTS controls entitlement checks:
    • Option 1: ✅ ENABLED (always grants premium, no RC checks)
    • Option 2: ❌ DISABLED (real entitlement checks via RevenueCat)
    • Option 3: ❌ DISABLED (real entitlement checks via RevenueCat)
    • Option 4: ❌ DISABLED (real entitlement checks via RevenueCat)
    • Option 5: ❌ DISABLED (real entitlement checks via RevenueCat)

  This flag ONLY affects .env.development. Other env files don't set it.

PREREQUISITES:
  • Physical iPhone connected via USB (Options 4/5 only)
  • iPhone trusted on computer (Options 4/5 only)
  • pnpm installed
  • Expo CLI installed (npx handles this)
  • ios-deploy installed for automatic device installation (optional)

TROUBLESHOOTING:
  • If environment changes don't take effect: Caches auto-cleared by script
  • If Metro shows wrong env vars: Check EXPO_PUBLIC_ENV_FILE is set correctly
  • If Option 3 fails to find device: Ensure iPhone is connected and trusted
  • If builds are slow: Consider using Option 1/2 with simulator instead

RELATED DOCUMENTATION:
  • docs/expo-env-loading.md
  • docs/subscription-testing-plan.md
  • CLAUDE.md (Mobile Subscription section)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EOF
  exit 0
}

# Check for --help flag before interactive prompt
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
  show_help
fi

ROOT="$HOME/Coding/ruyamda"
APP_DIR="$ROOT/apps/mobile"
LOG_DIR="$ROOT/logs"
RAW="$LOG_DIR/expo.color.log"   # full-color raw log (optional, helpful for debugging)
CLEAN="$LOG_DIR/expo.log"       # cleaned (no ANSI) log

mkdir -p "$LOG_DIR"
: > "$RAW"    # start with clean logs every run
: > "$CLEAN"

cd "$APP_DIR"

# Interactive Environment Selection
echo "Select Environment:"
echo "  [1] Local (default) - Uses .env.development (Test RevenueCat sandbox key)"
echo "  [2] Preview      - Uses .env.preview (Preview RevenueCat key)"
echo "  [3] Production   - Uses .env.production (Production RevenueCat key)"
echo "  [4] Device (Preview) - Build & install on iPhone with .env.preview"
echo "  [5] Device (Production) - Build & install on iPhone with .env.production"
echo "  [h] Help         - Show detailed documentation"
read -k 1 "choice?Enter choice [1/2/3/4/5/h]: "
echo "" # Newline after input

# Handle help option
if [[ "$choice" == "h" || "$choice" == "H" ]]; then
  show_help
fi

case "$choice" in
  2)
    echo "🚀 Launching in PREVIEW mode..."
    ENV_FILE=".env.preview"
    ENV_FILE_PATH="$APP_DIR/.env.preview"
    DEVICE_BUILD=false
    ;;
  3)
    echo "🏭 Launching in PRODUCTION mode..."
    ENV_FILE=".env.production"
    ENV_FILE_PATH="$APP_DIR/.env.production"
    DEVICE_BUILD=false
    ;;
  4)
    echo "📱 Building for DEVICE with PREVIEW environment..."
    ENV_FILE=".env.preview"
    ENV_FILE_PATH="$APP_DIR/.env.preview"
    DEVICE_BUILD=true
    ;;
  5)
    echo "📱🏭 Building for DEVICE with PRODUCTION environment..."
    ENV_FILE=".env.production"
    ENV_FILE_PATH="$APP_DIR/.env.production"
    DEVICE_BUILD=true
    ;;
  *)
    echo "💻 Launching in LOCAL mode..."
    ENV_FILE=".env.development"
    ENV_FILE_PATH="$APP_DIR/.env.development"
    DEVICE_BUILD=false
    ;;
esac

# Display which environment will be loaded
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Environment Configuration:"
echo "   Source file: $ENV_FILE"
if [ -f "$ENV_FILE_PATH" ]; then
  REVENUECAT_KEY=$(grep "EXPO_PUBLIC_REVENUECAT_API_KEY" "$ENV_FILE_PATH" | cut -d '=' -f 2 | tr -d '"' | tr -d ' ')
  if [[ $REVENUECAT_KEY == test_* ]]; then
    echo "   RevenueCat: 🧪 SANDBOX (test key)"
  else
    echo "   RevenueCat: 🏭 PREVIEW (live key)"
  fi
  FILE_SUPABASE_URL=$(grep "EXPO_PUBLIC_SUPABASE_URL" "$ENV_FILE_PATH" | cut -d '=' -f 2 | tr -d '"' | tr -d ' ')
  echo "   Supabase URL: $FILE_SUPABASE_URL"
else
  echo "   ⚠️  Error: $ENV_FILE not found!"
  exit 1
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Clear ALL caches to force Metro to rebundle with new env vars
echo "🧹 Clearing all caches..."
# Kill any existing Metro server to prevent attaching to stale instances
if lsof -i :8081 -t >/dev/null; then
  echo "   Killing existing Metro server on port 8081..."
  lsof -i :8081 -t | xargs kill -9 2>/dev/null || true
fi

rm -rf "$APP_DIR/.expo"
rm -rf "$APP_DIR/node_modules/.cache"
watchman watch-del-all 2>/dev/null || true

# Clear AsyncStorage for environment switches (prevents stale auth tokens)
# This fixes "Invalid Refresh Token" errors when switching between local/cloud Supabase
echo "🗑️  Clearing AsyncStorage (prevents stale auth sessions)..."

# For iOS Simulator: Clear app container data
if [ "$DEVICE_BUILD" != true ]; then
  # Get the booted simulator and clear app data
  BOOTED_DEVICE=$(xcrun simctl list devices | grep "Booted" | head -1)
  if [ -n "$BOOTED_DEVICE" ]; then
    # Clear AsyncStorage by removing app data container
    xcrun simctl get_app_container booted com.ruyamda.app data 2>/dev/null | \
      xargs -I {} rm -rf "{}/Library/Preferences" 2>/dev/null || true
    xcrun simctl get_app_container booted com.ruyamda.app data 2>/dev/null | \
      xargs -I {} rm -rf "{}/Documents" 2>/dev/null || true
    echo "   ✅ Simulator AsyncStorage cleared"
  else
    echo "   ⚠️  No booted simulator found (will start fresh)"
  fi
else
  # For Device builds: Warn user to logout manually if needed
  echo "   ⚠️  Device build: If switching environments, logout in the app first"
  echo "   (AsyncStorage cannot be cleared remotely on physical devices)"
fi

echo "✨ Caches cleared!"
echo ""

# Set EXPO_PUBLIC_ENV_FILE to tell app.config.ts which env file to load
echo "📝 Setting environment file..."
echo "   EXPO_PUBLIC_ENV_FILE=$ENV_FILE"
echo "   ✅ app.config.ts will load $ENV_FILE_PATH directly"
echo ""

# Export the environment variable for the Expo process
export EXPO_PUBLIC_ENV_FILE="$ENV_FILE"
cd "$APP_DIR"

# FORCE Metro to use the correct environment by hijacking .env.local
# Expo prioritizes .env.local over .env and .env.development, so we MUST write here to win.
echo "📝 Setting up environment priority..."

# 1. Backup existing .env.local if it exists
if [ -f .env.local ]; then
  echo "   backing up .env.local -> .env.local.bak"
  mv .env.local .env.local.bak
fi

# 2. Copy target env to .env.local (this guarantees it loads)
echo "   copying $ENV_FILE -> .env.local"
cp "$ENV_FILE" .env.local

# Track background process PIDs and FIFOs for cleanup
LOGGING_PIDS=()
RAW_FIFO=""
CLEAN_FIFO=""

# Ensure we restore .env.local on exit and kill any lingering processes
cleanup() {
  echo ""
  echo "🧹 Restoring environment files..."

  # Kill any lingering logging processes from the pipeline
  for pid in "${LOGGING_PIDS[@]}"; do
    kill "$pid" 2>/dev/null || true
  done

  # Also kill any tee/perl processes that might be stuck
  pkill -P $$ 2>/dev/null || true

  # Clean up FIFOs if they exist
  [ -n "$RAW_FIFO" ] && rm -f "$RAW_FIFO"
  [ -n "$CLEAN_FIFO" ] && rm -f "$CLEAN_FIFO"

  # Remove our temporary .env.local
  rm -f .env.local

  # Restore original .env.local if it existed
  if [ -f .env.local.bak ]; then
    echo "   restoring .env.local.bak -> .env.local"
    mv .env.local.bak .env.local
  fi

  echo "   ✅ Done"
}
trap cleanup EXIT INT TERM

# Verify environment variables that Expo will actually see
echo "🔍 Environment variables that Expo/Metro will load:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
node -e "
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load the environment file that app.config.ts will use
const envPath = path.join('$APP_DIR', '$ENV_FILE');
if (fs.existsSync(envPath)) {
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    console.log('   ⚠️  Error loading $ENV_FILE:', result.error.message);
  } else {
    // Print all EXPO_PUBLIC_* variables
    const expoVars = Object.entries(process.env)
      .filter(([key]) => key.startsWith('EXPO_PUBLIC_'))
      .sort(([a], [b]) => a.localeCompare(b));

    if (expoVars.length === 0) {
      console.log('   ⚠️  No EXPO_PUBLIC_* variables found!');
    } else {
      expoVars.forEach(([key, value]) => {
        // Mask sensitive values (show first 8 chars for keys, full value for others)
        let displayValue = value;
        if (key.includes('KEY') || key.includes('SECRET')) {
          displayValue = value.substring(0, 12) + '...' + value.substring(value.length - 4);
        }
        console.log(\`   \${key}=\${displayValue}\`);
      });
    }
  }
} else {
  console.log('   ⚠️  $ENV_FILE not found at:', envPath);
}
"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Run Expo or build for device based on selection
if [ "$DEVICE_BUILD" = true ]; then
  echo "🔨 Building development client for device..."
  echo "   This will build, install, and connect to Metro automatically"
  echo ""

  # Run npx expo run:ios --device which builds, installs, and starts Metro
  npx expo run:ios --device
else
  # Run Expo attached to a TTY so the QR + keypress UI works, and stream to stdout.
  # Then:
  #  - save raw to expo.color.log
  #  - save cleaned copy to expo.log (no ANSI)
  #
  # NOTE: BSD script syntax on macOS (no -f flag): script [-aq] [file [command ...]]
  # IMPORTANT: Removed -l flag to preserve environment variables set above
  #
  # Use named pipes (FIFOs) instead of process substitutions to avoid signal handling issues
  # that cause the script to hang on Ctrl+C
  RAW_FIFO=$(mktemp -u)
  CLEAN_FIFO=$(mktemp -u)
  mkfifo "$RAW_FIFO" "$CLEAN_FIFO"

  # Start background processes to read from FIFOs
  cat < "$RAW_FIFO" > "$RAW" &
  LOGGING_PIDS+=($!)
  perl -pe 's/\r//g; s/\x1B\][^\a\x1b]*(?:\x07|\x1B\\)//g; s/\x1BP.*?\x1B\\//gs; s/\x1B\^.*?\x1B\\//gs; s/\x1B_.*?\x1B\\//gs; s/\x1B\[[0-?]*[ -\/]*[@-~]//g; s/\x1B[][()#%*].//g;' < "$CLEAN_FIFO" > "$CLEAN" &
  LOGGING_PIDS+=($!)

  # Run expo and tee to FIFOs (tee will exit cleanly when expo exits)
  /usr/bin/script -aq /dev/stdout /bin/zsh -c 'pnpm expo start --clear' | tee "$RAW_FIFO" "$CLEAN_FIFO"

  # Cleanup FIFOs
  rm -f "$RAW_FIFO" "$CLEAN_FIFO"
fi
