#!/bin/bash
# Monorepo Structure Verification Script
# Ensures monorepo follows platform-specific file patterns and workspace conventions

set -e  # Exit on first error

echo "🔍 Verifying monorepo structure..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0

# Check 1: No .web.ts files should exist (use .ts + .native.ts pattern)
echo ""
echo "📋 Check 1: Verifying platform-specific file naming pattern..."
web_files=$(find packages -name "*.web.ts" 2>/dev/null || true)
if [ -n "$web_files" ]; then
  echo -e "${RED}❌ ERROR: Found .web.ts files - use .ts + .native.ts pattern instead${NC}"
  echo "$web_files"
  echo ""
  echo "Expected pattern:"
  echo "  ✅ file.ts (base/web implementation)"
  echo "  ✅ file.native.ts (React Native override)"
  echo "  ❌ file.web.ts (wrong - bypasses platform resolution)"
  errors=$((errors + 1))
else
  echo -e "${GREEN}✅ No .web.ts files found${NC}"
fi

# Check 2: No .web.tsx files should exist
web_tsx_files=$(find packages -name "*.web.tsx" 2>/dev/null || true)
if [ -n "$web_tsx_files" ]; then
  echo -e "${RED}❌ ERROR: Found .web.tsx files - use .tsx + .native.tsx pattern${NC}"
  echo "$web_tsx_files"
  errors=$((errors + 1))
else
  echo -e "${GREEN}✅ No .web.tsx files found${NC}"
fi

# Check 3: Verify workspace protocol usage (no 'file:' protocol)
echo ""
echo "📋 Check 2: Verifying workspace protocol usage..."
file_protocol=$(grep -r '"file:' package.json packages/*/package.json apps/*/package.json 2>/dev/null || true)
if [ -n "$file_protocol" ]; then
  echo -e "${RED}❌ ERROR: Found 'file:' protocol - use 'workspace:*' instead${NC}"
  echo "$file_protocol"
  echo ""
  echo "Example:"
  echo "  ❌ \"@ruyamda/shared-logic\": \"file:../shared-logic\""
  echo "  ✅ \"@ruyamda/shared-logic\": \"workspace:*\""
  errors=$((errors + 1))
else
  echo -e "${GREEN}✅ All internal dependencies use workspace protocol${NC}"
fi

# Check 4: Verify no hardcoded platform extensions in tsconfig path mappings
echo ""
echo "📋 Check 3: Verifying TypeScript path mappings..."
hardcoded_paths=$(grep -r '\.web\.ts"\|\.native\.ts"' apps/*/tsconfig.json packages/*/tsconfig.json 2>/dev/null || true)
if [ -n "$hardcoded_paths" ]; then
  echo -e "${RED}❌ ERROR: Found hardcoded platform extensions in tsconfig paths${NC}"
  echo "$hardcoded_paths"
  echo ""
  echo "Path mappings should be extension-less to enable platform resolution:"
  echo "  ❌ \"@ruyamda/shared-logic/supabase\": [\"path/to/client.web.ts\"]"
  echo "  ✅ \"@ruyamda/shared-logic/supabase\": [\"path/to/client\"]"
  errors=$((errors + 1))
else
  echo -e "${GREEN}✅ No hardcoded platform extensions in tsconfig${NC}"
fi

# Check 5: Verify package.json exports are extension-less
echo ""
echo "📋 Check 4: Verifying package.json exports..."
exports_with_extensions=$(grep -r '"exports"' packages/*/package.json -A 10 | grep '\.web\.ts\|\.native\.ts' || true)
if [ -n "$exports_with_extensions" ]; then
  echo -e "${YELLOW}⚠️  WARNING: Found platform extensions in package.json exports${NC}"
  echo "$exports_with_extensions"
  echo ""
  echo "Exports should be extension-less:"
  echo "  ❌ \".\": \"./src/index.web.ts\""
  echo "  ✅ \".\": \"./src/index.ts\""
  # Warning only, not an error
else
  echo -e "${GREEN}✅ Package exports are extension-less${NC}"
fi

# Check 6: Verify pnpm-lock.yaml exists
echo ""
echo "📋 Check 5: Verifying lock file..."
if [ ! -f "pnpm-lock.yaml" ]; then
  echo -e "${RED}❌ ERROR: pnpm-lock.yaml not found${NC}"
  echo "This project requires pnpm. Run 'pnpm install' to generate lock file."
  errors=$((errors + 1))
else
  echo -e "${GREEN}✅ pnpm-lock.yaml exists${NC}"
fi

# Check 7: Verify no npm lock files
if [ -f "package-lock.json" ] || [ -f "npm-lock.json" ]; then
  echo -e "${RED}❌ ERROR: Found npm lock file - this project uses pnpm only${NC}"
  echo "Remove package-lock.json and run 'pnpm install'"
  errors=$((errors + 1))
else
  echo -e "${GREEN}✅ No npm lock files found${NC}"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $errors -eq 0 ]; then
  echo -e "${GREEN}✅ Monorepo structure verified successfully!${NC}"
  exit 0
else
  echo -e "${RED}❌ Monorepo verification failed with $errors error(s)${NC}"
  echo ""
  echo "Please fix the errors above before committing."
  echo "See CLAUDE.md for platform-specific code guidelines."
  exit 1
fi
