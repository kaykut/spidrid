#!/bin/bash
#
# clean.sh - Quick cache clearing without rebuild
#
# Usage: ./scripts/clean.sh
#

set -e

echo "🧹 Cleaning caches..."

# Kill any running Metro processes
echo "  Killing Metro processes..."
pkill -f "metro" 2>/dev/null || true

# Free port 8081
echo "  Freeing port 8081..."
lsof -ti:8081 | xargs kill -9 2>/dev/null || true

# Clear Expo cache
echo "  Clearing .expo..."
rm -rf .expo

# Clear Metro cache
echo "  Clearing node_modules/.cache..."
rm -rf node_modules/.cache

# Clear temp files
echo "  Clearing temp files..."
rm -rf /tmp/metro-* /tmp/haste-* /tmp/react-* 2>/dev/null || true

# Clear watchman
echo "  Clearing watchman..."
watchman watch-del-all 2>/dev/null || true

echo "✅ Cache cleared!"
