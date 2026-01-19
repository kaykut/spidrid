#!/bin/bash
set -e  # Exit on error

# Mobile App Build Script with Explicit Flags
# Supports all 4 combinations of RevenueCat keys (test/prod) and targets (device/testflight)
# Usage:
#   ./scripts/mobile-build.sh --target <device|testflight> --env <test|prod>

# Colors for output
RED=$'\033[0;31m'
GREEN=$'\033[0;32m'
YELLOW=$'\033[1;33m'
BLUE=$'\033[0;34m'
NC=$'\033[0m' # No Color

# Get script directory and repo root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
MOBILE_DIR="$REPO_ROOT/apps/mobile"

# Help text
show_help() {
  cat << EOF
${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}
${GREEN}Mobile App Build Script - EAS Build (Standalone Distribution Builds)${NC}
${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}

${YELLOW}USAGE:${NC}
  $0 --target <device|testflight> --env <test|prod>
  $0 --help

${YELLOW}FLAGS:${NC}
  ${GREEN}--target <device|testflight>${NC}  (required)
      Where to deploy the build:
        • ${BLUE}device${NC}     : Build IPA and install on connected iPhone via USB
        • ${BLUE}testflight${NC} : Build IPA and upload to TestFlight for distribution

  ${GREEN}--env <test|prod>${NC}              (required)
      Environment configuration (determines RC keys + build profile):
        • ${BLUE}test${NC} : Sandbox RevenueCat key, Debug build (preview-debug profile)
                   Uses .env.preview (test_* RC key, cloud Supabase)
                   Safe for testing purchases without real charges
        • ${BLUE}prod${NC} : Production RevenueCat key, Release build (preview profile)
                   Uses .env.production (appl_* RC key, cloud Supabase)
                   ⚠️  REAL CHARGES POSSIBLE - only use for final validation

  ${GREEN}--help${NC}
      Show this help message

${YELLOW}BUILD PROFILES:${NC}
  The script automatically selects the correct EAS Build profile based on --env:

  ${BLUE}--env test${NC}  → ${GREEN}preview-debug${NC} (Debug configuration)
    • Xcode Debug build (non-optimized, includes debug symbols)
    • Allows test RevenueCat keys (prevents RC SDK crash)
    • Suitable for: Internal testing, sandbox purchases, debugging

  ${BLUE}--env prod${NC}  → ${GREEN}preview${NC} (Release configuration)
    • Xcode Release build (optimized, stripped symbols)
    • Requires production RevenueCat keys (appl_* or goog_*)
    • Suitable for: Production validation, TestFlight distribution

${YELLOW}EXAMPLES:${NC}
  ${GREEN}# Safe device testing with sandbox (most common during development)${NC}
  $0 --target device --env test

  ${GREEN}# Internal/family beta with sandbox keys (no real charges)${NC}
  $0 --target testflight --env test

  ${GREEN}# Production-like device validation (⚠️  REAL CHARGES POSSIBLE)${NC}
  $0 --target device --env prod

  ${GREEN}# Public TestFlight beta or final validation (⚠️  REAL CHARGES)${NC}
  $0 --target testflight --env prod

${YELLOW}BUILD PROCESS:${NC}
  1. Validates flags and environment files
  2. Copies selected .env file to .env.local (highest precedence)
  3. Installs dependencies (pnpm)
  4. Runs expo prebuild --clean (regenerates native projects)
  5. Runs eas build --local with selected profile
  6. For device: Installs IPA via ios-deploy or Xcode Devices
  7. For testflight: Uploads IPA via eas submit (FREE, no build quota)
  8. Cleans up .env.local on exit

${YELLOW}WHAT THIS SCRIPT CREATES:${NC}
  • ${BLUE}Standalone IPA builds${NC} (no Metro bundler dependency)
  • Distribution-ready builds (similar to TestFlight/App Store)
  • Full rebuild required for every change (slow iteration)

${YELLOW}WHEN TO USE THIS SCRIPT:${NC}
  ✅ Testing subscription flows in distribution-like builds
  ✅ Validating production behavior before TestFlight/App Store
  ✅ Creating TestFlight builds for internal/external testing
  ✅ Final QA before public release

${YELLOW}WHEN NOT TO USE THIS SCRIPT:${NC}
  ❌ Rapid UI iteration (use launch_expo.zsh Option 1 or 2 instead)
  ❌ Testing features that need hot reload (use launch_expo.zsh)
  ❌ Local development with Metro bundler (use launch_expo.zsh)

${YELLOW}COMPARISON WITH launch_expo.zsh:${NC}
  ${GREEN}launch_expo.zsh Option 3${NC} vs ${GREEN}mobile-build.sh${NC}
  ┌─────────────────────────────────────────────────────────────────────┐
  │ Feature         │ Option 3              │ mobile-build.sh          │
  ├─────────────────────────────────────────────────────────────────────┤
  │ Command         │ expo run:ios --device │ eas build --local        │
  │ Build Type      │ Development (Debug)   │ Debug OR Release         │
  │ Metro Bundler   │ ✅ Connected (hot)    │ ❌ Standalone            │
  │ Rebuild Speed   │ Fast (Metro reload)   │ Slow (full rebuild)      │
  │ Production-Like │ Low                   │ High                     │
  │ Use Case        │ Fast iteration        │ Distribution testing     │
  └─────────────────────────────────────────────────────────────────────┘

${YELLOW}RELATED DOCUMENTATION:${NC}
  • docs/expo-env-loading.md
  • docs/subscription-testing-plan.md
  • CLAUDE.md (Mobile Subscription section)

${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}
EOF
  exit 0
}

# Parse flags
TARGET=""
ENV=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --help|-h)
      show_help
      ;;
    --target)
      TARGET="$2"
      shift 2
      ;;
    --env)
      ENV="$2"
      shift 2
      ;;
    *)
      echo -e "${RED}Unknown flag: $1${NC}"
      echo -e "Run '$0 --help' for usage information"
      exit 1
      ;;
  esac
done

# Validate required flags
if [[ -z "$TARGET" || -z "$ENV" ]]; then
  echo -e "${RED}Error: Both --target and --env flags are required${NC}\n"
  echo -e "Usage: $0 --target <device|testflight> --env <test|prod>\n"
  echo -e "Examples:"
  echo -e "  $0 --target device --env test       # Safe device testing with sandbox"
  echo -e "  $0 --target testflight --env test   # Internal/family beta with sandbox"
  echo -e "  $0 --target device --env prod       # Production-like device validation"
  echo -e "  $0 --target testflight --env prod   # Public beta or final validation"
  exit 1
fi

# Validate flag values
if [[ "$TARGET" != "device" && "$TARGET" != "testflight" ]]; then
  echo -e "${RED}Error: --target must be 'device' or 'testflight'${NC}"
  exit 1
fi

if [[ "$ENV" != "test" && "$ENV" != "prod" ]]; then
  echo -e "${RED}Error: --env must be 'test' or 'prod'${NC}"
  exit 1
fi

# Select build profile and env file based on --env and --target flags
# Profiles are defined in eas.json with distribution, buildConfiguration, and EXPO_PUBLIC_ENV_FILE
if [[ "$ENV" == "test" ]]; then
  if [[ "$TARGET" == "testflight" ]]; then
    BUILD_PROFILE="preview-testflight"
  else
    BUILD_PROFILE="preview-debug"
  fi
  ENV_FILE="$MOBILE_DIR/.env.preview"
else
  if [[ "$TARGET" == "testflight" ]]; then
    BUILD_PROFILE="production"
  else
    BUILD_PROFILE="preview"
  fi
  ENV_FILE="$MOBILE_DIR/.env.production"
fi

# Verify env file exists
if [[ ! -f "$ENV_FILE" ]]; then
  echo -e "${RED}Error: Environment file not found: $ENV_FILE${NC}"
  exit 1
fi

# Set up .env.local (Expo's highest precedence file)
echo -e "${YELLOW}Setting up .env.local with selected environment...${NC}"
ENV_FILE_NAME=$(basename "$ENV_FILE")
echo -e "  Copying ${GREEN}$ENV_FILE_NAME${NC} → ${GREEN}.env.local${NC}\n"

# Remove any existing .env.local
if [[ -f "$MOBILE_DIR/.env.local" ]]; then
  rm "$MOBILE_DIR/.env.local"
fi

# Copy selected env file to .env.local
cp "$ENV_FILE" "$MOBILE_DIR/.env.local"

# Ensure cleanup happens even if script fails
# NOTE: This trap runs on EXIT, INT (Ctrl+C), TERM, and ERR signals.
# However, it CANNOT handle SIGKILL (kill -9), which forcibly terminates
# the process without allowing cleanup handlers to run. If the script is
# killed with SIGKILL, .env.local will remain on disk and must be manually
# deleted. This is a fundamental limitation of bash traps, not a bug.
cleanup_env_local() {
  echo -e "${YELLOW}Cleaning up .env.local...${NC}"
  if [[ -f "$MOBILE_DIR/.env.local" ]]; then
    rm "$MOBILE_DIR/.env.local"
  fi
}
trap cleanup_env_local EXIT

# Load environment variables and export to subprocesses
# EAS build will inherit these from the shell environment
set -a
source "$ENV_FILE"
set +a

# Set NODE_ENV for expo prebuild (runs BEFORE EAS sets it from eas.json)
# CRITICAL: Without this, expo prebuild loads wrong .env file and pollutes environment
# eas.json ALSO sets NODE_ENV for the EAS build phase (both are needed!)
if [[ "$BUILD_PROFILE" == "preview" || "$BUILD_PROFILE" == "production" ]]; then
  export NODE_ENV=production
else
  export NODE_ENV=development
fi

# Verify required variables are set
if [[ -z "$EXPO_PUBLIC_REVENUECAT_API_KEY" ]]; then
  echo -e "${RED}Error: EXPO_PUBLIC_REVENUECAT_API_KEY not set in $ENV_FILE_NAME${NC}"
  exit 1
fi

if [[ -z "$EXPO_PUBLIC_SUPABASE_URL" ]]; then
  echo -e "${RED}Error: EXPO_PUBLIC_SUPABASE_URL not set in $ENV_FILE_NAME${NC}"
  exit 1
fi

# Display verification information
echo -e "${BLUE}=== Build Configuration Verification ===${NC}"
echo -e "  Build profile: ${GREEN}$BUILD_PROFILE${NC}"
echo -e "  Env file: ${GREEN}$ENV_FILE_NAME${NC}"

# Verify RevenueCat key type
if [[ "$EXPO_PUBLIC_REVENUECAT_API_KEY" == test_* ]]; then
  echo "✅ Using RevenueCat TEST key"
  RC_TYPE="${YELLOW}TESTKEY${NC} (sandbox)"
  RC_MASKED="${EXPO_PUBLIC_REVENUECAT_API_KEY:0:10}...${EXPO_PUBLIC_REVENUECAT_API_KEY: -3}"
elif [[ "$EXPO_PUBLIC_REVENUECAT_API_KEY" == appl_* ]] || [[ "$EXPO_PUBLIC_REVENUECAT_API_KEY" == goog_* ]]; then
  echo "✅ Using RevenueCat PRODUCTION key"
  RC_TYPE="${GREEN}PRODKEY${NC} (App Store)"
  RC_MASKED="${EXPO_PUBLIC_REVENUECAT_API_KEY:0:10}...${EXPO_PUBLIC_REVENUECAT_API_KEY: -3}"
else
  echo "⚠️ WARNING: RevenueCat API Key format unrecognized (should start with 'appl_', 'goog_', or 'test_')"
  RC_TYPE="${RED}UNKNOWN${NC}"
  RC_MASKED="???"
fi
echo -e "  RevenueCat: $RC_TYPE ($RC_MASKED)"

# Verify Supabase URL
if [[ "$EXPO_PUBLIC_SUPABASE_URL" == *"127.0.0.1"* ]]; then
  SUPABASE_ENV="${YELLOW}LOCAL${NC} (127.0.0.1)"
else
  SUPABASE_ENV="${GREEN}CLOUD${NC} ($EXPO_PUBLIC_SUPABASE_URL)"
fi
echo -e "  Supabase: $SUPABASE_ENV"

# Validate combinations
VALIDATION_FAILED=false

# Production keys should never use local Supabase
if [[ "$ENV" == "prod" && "$EXPO_PUBLIC_SUPABASE_URL" == *"127.0.0.1"* ]]; then
  echo -e "${RED}  ✗ ERROR: Production keys cannot use LOCAL Supabase${NC}"
  VALIDATION_FAILED=true
fi

if [[ "$VALIDATION_FAILED" == true ]]; then
  echo -e "\n${RED}Configuration validation failed. Please check your .env files.${NC}\n"
  exit 1
fi

echo -e "${GREEN}  ✓ Configuration validation passed${NC}\n"

# Install dependencies
echo -e "${YELLOW}Installing mobile dependencies...${NC}"
cd "$REPO_ROOT"
pnpm --filter @ruyamda/mobile install

# Regenerate native projects
echo -e "${YELLOW}Running expo prebuild (clean) for ios...${NC}"
cd "$MOBILE_DIR"
echo -e "${BLUE}Watch for 'env: load .env.local' in output below${NC}\n"
npx expo prebuild --clean --platform ios --non-interactive

# Build IPA
# Note: eas build --local handles pod install automatically
echo -e "${YELLOW}Building IPA with profile: $BUILD_PROFILE...${NC}"
echo -e "${BLUE}This will take 5-10 minutes...${NC}\n"

# Remove old artifacts for device builds
if [[ "$TARGET" == "device" ]]; then
  rm -f build-*.ipa 2>/dev/null || true
fi

npx eas-cli build --local --platform ios --profile "$BUILD_PROFILE" --clear-cache --non-interactive

# Find the IPA file
IPA_PATH=$(ls -t build-*.ipa 2>/dev/null | head -n 1)
if [[ -z "$IPA_PATH" ]]; then
  echo -e "${RED}  ✗ IPA file not found${NC}"
  exit 1
fi

IPA_ABSOLUTE_PATH="$(cd "$(dirname "$IPA_PATH")" && pwd)/$(basename "$IPA_PATH")"
echo -e "\n${GREEN}  ✓ IPA built successfully${NC}"
echo -e "${GREEN}  Location: $IPA_ABSOLUTE_PATH${NC}\n"

# Handle target-specific actions
if [[ "$TARGET" == "device" ]]; then
  # Device installation
  echo -e "${BLUE}=== Device Installation ===${NC}\n"

  INSTALL_SUCCESS=false
  if command -v ios-deploy &> /dev/null; then
    echo -e "${YELLOW}Attempting automatic installation via ios-deploy...${NC}"
    echo -e "${BLUE}Make sure your iPhone is connected via USB and trusted${NC}\n"

    if ios-deploy --bundle "$IPA_ABSOLUTE_PATH" 2>/dev/null; then
      INSTALL_SUCCESS=true
      echo -e "\n${GREEN}  ✓ App installed successfully on device${NC}\n"
    else
      echo -e "\n${YELLOW}  ⚠ Automatic installation failed${NC}"
      echo -e "${YELLOW}  Falling back to manual installation...${NC}\n"
    fi
  fi

  if [[ "$INSTALL_SUCCESS" == false ]]; then
    echo -e "${YELLOW}Opening Xcode Devices for manual installation...${NC}\n"
    open "xcode://devices" 2>/dev/null || true
    sleep 2

    echo -e "${BLUE}=== Manual Installation Instructions ===${NC}"
    echo -e "1. In Xcode Devices window, select your iPhone from left sidebar"
    echo -e "2. Drag and drop this IPA onto the 'Installed Apps' section:"
    echo -e "   ${GREEN}$IPA_ABSOLUTE_PATH${NC}"
    echo -e "3. App will install immediately\n"

    if ! command -v ios-deploy &> /dev/null; then
      echo -e "${YELLOW}💡 Tip: Install ios-deploy for automatic installation:${NC}"
      echo -e "   ${BLUE}npm install -g ios-deploy${NC}\n"
    fi
  fi

  echo -e "${GREEN}=== Device Build Complete! ===${NC}"
  echo -e "${BLUE}IPA saved at: ${GREEN}$IPA_ABSOLUTE_PATH${NC}\n"

else
  # TestFlight upload
  echo -e "${BLUE}=== TestFlight Upload ===${NC}\n"
  echo -e "${YELLOW}Uploading to TestFlight...${NC}"
  echo -e "${BLUE}EAS Submit is FREE - doesn't count against build quota${NC}\n"

  npx eas-cli submit --platform ios --path "$IPA_PATH"

  # Cleanup IPA after upload
  echo -e "\n${YELLOW}Cleaning up IPA file...${NC}"
  rm -f "$IPA_PATH"
  echo -e "${GREEN}  ✓ Cleaned up${NC}\n"

  echo -e "${GREEN}=== TestFlight Upload Complete! ===${NC}"
  echo -e "${BLUE}Check App Store Connect for build processing status${NC}"
  echo -e "  ${BLUE}https://appstoreconnect.apple.com${NC}\n"
  echo -e "${YELLOW}Processing time: ${BLUE}10-30 minutes${NC}\n"
fi
