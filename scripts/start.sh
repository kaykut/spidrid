#!/bin/bash
#
# start.sh - Clean Metro start
#
# Usage: ./scripts/start.sh
#

set -e

echo "🚀 Starting Expo with clean cache..."

# Run clean first
./scripts/clean.sh

# Start Expo
echo "  Starting Metro..."
npx expo start --clear
