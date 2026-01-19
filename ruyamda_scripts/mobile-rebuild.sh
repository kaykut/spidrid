#!/bin/bash
set -e  # Exit on error

# Mobile App Clean Rebuild Script
# Handles complete cleanup and rebuild of the React Native mobile app
# Usage from repo root: ./scripts/mobile-rebuild.sh [ios|android] [--device]

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory and repo root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
MOBILE_DIR="$REPO_ROOT/apps/mobile"

# Parse platform argument
PLATFORM="${1:-ios}"  # Default to ios if not specified
if [[ "$PLATFORM" != "ios" && "$PLATFORM" != "android" ]]; then
  echo -e "${RED}Error: Platform must be 'ios' or 'android'${NC}"
  echo "Usage: ./scripts/mobile-rebuild.sh [ios|android] [--device]"
  exit 1
fi

# Parse device flag
DEVICE_FLAG=""
if [[ "$2" == "--device" ]]; then
  DEVICE_FLAG="--device"
fi

TARGET_TYPE="simulator"
if [[ -n "$DEVICE_FLAG" ]]; then
  TARGET_TYPE="physical device"
fi

echo -e "${BLUE}=== Mobile App Clean Rebuild (${PLATFORM} - ${TARGET_TYPE}) ===${NC}\n"

# Step 1: Kill Metro processes
echo -e "${YELLOW}Step 1/6: Killing Metro processes...${NC}"
pkill -f metro 2>/dev/null || true
sleep 1
# Verify Metro is dead
if ps aux | grep -v grep | grep metro > /dev/null; then
  echo -e "${YELLOW}  Metro still running, force killing...${NC}"
  pkill -9 -f metro 2>/dev/null || true
fi
# Free up port 8081
lsof -ti :8081 2>/dev/null | xargs kill -9 2>/dev/null || true
echo -e "${GREEN}  ✓ Metro processes killed${NC}\n"

# Step 2: Clean Metro and Expo caches
echo -e "${YELLOW}Step 2/6: Cleaning Metro and Expo caches...${NC}"
cd "$MOBILE_DIR"
rm -rf .expo
rm -rf node_modules/.cache
rm -rf /tmp/metro-* 2>/dev/null || true
rm -rf /tmp/haste-* 2>/dev/null || true
rm -rf /tmp/react-* 2>/dev/null || true
echo -e "${GREEN}  ✓ Caches cleaned${NC}\n"

# Step 3: Clean iOS build artifacts
if [[ "$PLATFORM" == "ios" ]]; then
  echo -e "${YELLOW}Step 3/6: Cleaning iOS build artifacts...${NC}"
  rm -rf ios/build
  rm -rf ~/Library/Developer/Xcode/DerivedData/* 2>/dev/null || true
  echo -e "${GREEN}  ✓ iOS artifacts cleaned${NC}\n"
else
  echo -e "${YELLOW}Step 3/6: Cleaning Android build artifacts...${NC}"
  rm -rf android/build
  rm -rf android/app/build
  rm -rf ~/.gradle/caches 2>/dev/null || true
  echo -e "${GREEN}  ✓ Android artifacts cleaned${NC}\n"
fi

# Step 4: Run Expo prebuild
echo -e "${YELLOW}Step 4/6: Running Expo prebuild...${NC}"
npx expo prebuild --clean --platform "$PLATFORM"
echo -e "${GREEN}  ✓ Prebuild complete${NC}\n"

# Step 5: Install native dependencies
if [[ "$PLATFORM" == "ios" ]]; then
  echo -e "${YELLOW}Step 5/6: Installing iOS pods...${NC}"
  cd ios
  pod install
  cd ..
  echo -e "${GREEN}  ✓ Pods installed${NC}\n"
else
  echo -e "${YELLOW}Step 5/6: Syncing Android Gradle...${NC}"
  cd android
  ./gradlew clean 2>/dev/null || true
  cd ..
  echo -e "${GREEN}  ✓ Gradle synced${NC}\n"
fi

# Step 6: Build and run
echo -e "${YELLOW}Step 6/6: Building and running app on ${PLATFORM} ${TARGET_TYPE}...${NC}"
if [[ -n "$DEVICE_FLAG" ]]; then
  echo -e "${BLUE}Make sure your device is connected via USB and trusted.${NC}"
fi
echo -e "${BLUE}This will take a few minutes...${NC}\n"

if [[ "$PLATFORM" == "ios" ]]; then
  npx expo run:ios $DEVICE_FLAG
else
  npx expo run:android $DEVICE_FLAG
fi

echo -e "\n${GREEN}=== Rebuild Complete! ===${NC}"
echo -e "${BLUE}Metro is running in the foreground.${NC}"
echo -e "${BLUE}You can now use the debugger and see Metro logs directly.${NC}"
echo -e "\n${YELLOW}Useful commands:${NC}"
echo -e "  Stop Metro: ${BLUE}Ctrl+C${NC} or ${BLUE}pkill -f metro${NC}"
echo -e "  Restart Metro: ${BLUE}cd apps/mobile && npx expo start --dev-client --clear${NC}"
