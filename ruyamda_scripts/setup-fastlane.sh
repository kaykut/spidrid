#!/bin/bash
set -e

# Fastlane Setup Script
# One-time setup for Fastlane automation
# Usage from repo root: ./scripts/setup-fastlane.sh

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
MOBILE_DIR="$REPO_ROOT/apps/mobile"

echo "🚀 Setting up Fastlane for iOS automation..."

cd "$MOBILE_DIR"

# Install Bundler if not present
if ! command -v bundle &> /dev/null; then
    echo "📦 Installing Bundler..."
    gem install bundler
fi

# Initialize Gemfile if it doesn't exist
if [ ! -f "Gemfile" ]; then
    echo "📝 Creating Gemfile..."
    cat > Gemfile << 'EOF'
source "https://rubygems.org"

gem "fastlane"
EOF
fi

# Install Fastlane
echo "📦 Installing Fastlane via Bundler..."
bundle install

echo "✅ Fastlane setup complete!"
echo ""
echo "Usage:"
echo "  cd apps/mobile"
echo "  bundle exec fastlane beta    # Build + upload to TestFlight"
echo "  bundle exec fastlane upload  # Upload existing IPA"
