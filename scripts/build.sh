#!/bin/bash
#
# build.sh - Unified Build Script for Devoro
#
# Usage:
#   ./scripts/build.sh dev              # Build and run on iOS simulator
#   ./scripts/build.sh dev --device     # Build and run on physical device (dev cert)
#   ./scripts/build.sh adhoc            # Build ad-hoc IPA and install on device
#   ./scripts/build.sh testflight       # Build and upload to TestFlight
#   ./scripts/build.sh --help           # Show help
#
# Prerequisites:
#   - EAS CLI installed: npm install -g eas-cli
#   - Logged into EAS: eas login
#   - ios-deploy installed: brew install ios-deploy (for adhoc)
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Load environment variables from specified env file
load_env() {
  local ENV_FILE="$1"
  if [[ -f "$ENV_FILE" ]]; then
    echo -e "${GREEN}Loading environment from $ENV_FILE...${NC}"
    set -a
    source "$ENV_FILE"
    set +a
  else
    echo -e "${RED}Error: $ENV_FILE not found${NC}"
    echo "Create $ENV_FILE with required variables:"
    echo "  EXPO_PUBLIC_SUPABASE_URL=..."
    echo "  EXPO_PUBLIC_SUPABASE_ANON_KEY=..."
    echo "  REVENUECAT_API_KEY=..."
    exit 1
  fi
}

show_help() {
  echo ""
  echo -e "${CYAN}Devoro Build Script${NC}"
  echo ""
  echo "Usage: ./scripts/build.sh <mode> [options]"
  echo ""
  echo "Modes:"
  echo "  dev              Build with dev cert, run on iOS simulator"
  echo "  dev --device     Build with dev cert, run on physical device"
  echo "  adhoc            Build ad-hoc IPA (distribution cert), install on device"
  echo "  testflight       Build production IPA, upload to TestFlight"
  echo ""
  echo "Options:"
  echo "  --help           Show this help message"
  echo ""
  echo "When to use each mode:"
  echo "  • dev            Fast iteration, hot reload, debugging"
  echo "  • adhoc          Test production-like build on device without TestFlight"
  echo "  • testflight     Release to testers or App Store"
  echo ""
}

clean_caches() {
  echo -e "${GREEN}[1/5] Cleaning caches...${NC}"

  # Kill Metro
  pkill -f "metro" 2>/dev/null || true
  lsof -ti:8081 | xargs kill -9 2>/dev/null || true

  # Clean Expo and Metro caches
  rm -rf .expo node_modules/.cache
  rm -rf /tmp/metro-* /tmp/haste-* /tmp/react-* 2>/dev/null || true
  watchman watch-del-all 2>/dev/null || true

  # Clean EAS cache (prevents tar extraction errors)
  find /var/folders -type d -name "eas-build-local-nodejs" -exec rm -rf {} + 2>/dev/null || true
  find /var/folders -type d -name "eas-cli-nodejs" -exec rm -rf {} + 2>/dev/null || true

  # Clean npx eas-cli cache (fixes corrupt tar.gz errors)
  rm -rf ~/.npm/_npx/*eas* 2>/dev/null || true

  # Clean iOS build artifacts
  rm -rf ios/build
  rm -rf ~/Library/Developer/Xcode/DerivedData/devoro-* 2>/dev/null || true
}

build_dev() {
  local DEVICE_FLAG="$1"

  echo ""
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}  Devoro Dev Build${NC}"
  if [[ -n "$DEVICE_FLAG" ]]; then
    echo -e "${GREEN}  Target: Physical Device${NC}"
  else
    echo -e "${GREEN}  Target: iOS Simulator${NC}"
  fi
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo ""

  clean_caches

  echo -e "${GREEN}[2/5] Running expo prebuild --clean...${NC}"
  npx expo prebuild --clean --platform ios

  echo -e "${GREEN}[3/5] Installing pods...${NC}"
  cd ios && pod install && cd ..

  echo -e "${GREEN}[4/5] Skipping (dev mode)...${NC}"

  echo -e "${GREEN}[5/5] Building and running...${NC}"
  npx expo run:ios $DEVICE_FLAG

  echo ""
  echo -e "${GREEN}✅ Dev build complete!${NC}"
}

build_adhoc() {
  echo ""
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}  Devoro Ad-Hoc Build${NC}"
  echo -e "${GREEN}  Distribution: Internal (ad-hoc)${NC}"
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo ""

  clean_caches

  echo -e "${GREEN}[2/5] Installing dependencies...${NC}"
  npm install

  echo -e "${GREEN}[3/5] Running expo prebuild --clean...${NC}"
  npx expo prebuild --clean --platform ios

  echo -e "${GREEN}[4/5] Building with EAS (local, preview profile)...${NC}"
  eas build --local --platform ios --profile preview --non-interactive

  echo -e "${GREEN}[5/5] Installing on device...${NC}"

  # Find the built IPA
  IPA_FILE=$(ls -t build-*.ipa 2>/dev/null | head -1)

  if [[ -z "$IPA_FILE" ]]; then
    echo -e "${YELLOW}No IPA file found in current directory.${NC}"
    echo "Build may have failed or IPA is in a different location."
    exit 1
  fi

  echo "IPA built: $IPA_FILE"
  echo ""

  # Install via ios-deploy
  if command -v ios-deploy &> /dev/null; then
    echo "Installing via ios-deploy..."
    ios-deploy --bundle "$IPA_FILE"
    echo ""
    echo -e "${GREEN}✅ Ad-hoc build installed on device!${NC}"
  else
    echo -e "${RED}Error: ios-deploy not found.${NC}"
    echo "Install it with: brew install ios-deploy"
    echo ""
    echo "Manual install options:"
    echo "  1. Open Xcode → Window → Devices and Simulators"
    echo "  2. Drag $IPA_FILE onto your device"
    exit 1
  fi
}

build_testflight() {
  echo ""
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}  Devoro TestFlight Build${NC}"
  echo -e "${GREEN}  Distribution: App Store (TestFlight)${NC}"
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo ""

  clean_caches

  echo -e "${GREEN}[2/5] Installing dependencies...${NC}"
  npm install

  echo -e "${GREEN}[3/5] Running expo prebuild --clean...${NC}"
  npx expo prebuild --clean --platform ios

  echo -e "${GREEN}[4/5] Building with EAS (local, production profile)...${NC}"
  eas build --local --platform ios --profile production --non-interactive

  echo -e "${GREEN}[5/5] Submitting to TestFlight...${NC}"
  eas submit --platform ios --non-interactive

  echo ""
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}  ✅ TestFlight upload complete!${NC}"
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo ""
}

# Parse arguments
MODE=""
DEVICE_FLAG=""

while [[ $# -gt 0 ]]; do
  case $1 in
    dev)
      MODE="dev"
      shift
      ;;
    adhoc)
      MODE="adhoc"
      shift
      ;;
    testflight)
      MODE="testflight"
      shift
      ;;
    --device)
      DEVICE_FLAG="--device"
      shift
      ;;
    --help|-h)
      show_help
      exit 0
      ;;
    *)
      echo -e "${RED}Error: Unknown option $1${NC}"
      show_help
      exit 1
      ;;
  esac
done

# Validate mode
if [[ -z "$MODE" ]]; then
  echo -e "${RED}Error: Build mode is required${NC}"
  show_help
  exit 1
fi

# Select environment file based on mode
# dev uses test key, adhoc/testflight use production key
if [[ "$MODE" == "dev" ]]; then
  load_env ".env.development"
else
  load_env ".env.production"
fi

# Execute build
case $MODE in
  dev)
    build_dev "$DEVICE_FLAG"
    ;;
  adhoc)
    build_adhoc
    ;;
  testflight)
    build_testflight
    ;;
esac
