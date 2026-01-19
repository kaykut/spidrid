#!/bin/bash
set -e  # Exit on error

# Mobile App Quick Clean Script
# Clears caches and restarts Metro without full rebuild
# Usage from repo root: ./scripts/mobile-clean.sh

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

echo -e "${BLUE}=== Mobile App Quick Clean ===${NC}\n"

# Step 1: Kill Metro
echo -e "${YELLOW}Step 1/2: Killing Metro processes...${NC}"
pkill -f metro 2>/dev/null || true
sleep 1
if ps aux | grep -v grep | grep metro > /dev/null; then
  pkill -9 -f metro 2>/dev/null || true
fi
lsof -ti :8081 2>/dev/null | xargs kill -9 2>/dev/null || true
echo -e "${GREEN}  ✓ Metro stopped${NC}\n"

# Step 2: Clean caches
echo -e "${YELLOW}Step 2/2: Cleaning caches...${NC}"
cd "$MOBILE_DIR"
rm -rf .expo
rm -rf node_modules/.cache
rm -rf /tmp/metro-* 2>/dev/null || true
rm -rf /tmp/haste-* 2>/dev/null || true
rm -rf /tmp/react-* 2>/dev/null || true
watchman watch-del-all 2>/dev/null || true
echo -e "${GREEN}  ✓ Caches cleaned${NC}\n"

echo -e "${GREEN}=== Clean Complete! ===${NC}"
echo -e "${BLUE}Metro has been stopped and caches cleared. Start it manually when ready:${NC}"
echo -e "  ${BLUE}npx expo start --dev-client --clear${NC}"
