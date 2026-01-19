#!/bin/bash
# ============================================
# Analytics Materialized Views Refresh Script
# ============================================
# Usage: ./scripts/refresh-analytics.sh
# Purpose: Refresh analytics materialized views using Supabase CLI

set -e  # Exit on error

echo "🔄 Starting analytics materialized views refresh..."
echo ""

# Auto-load VITE_SUPABASE_URL from apps/web/.env.local if not already set
if [ -z "$VITE_SUPABASE_URL" ]; then
    if [ -f apps/web/.env.local ]; then
        echo "📁 Loading VITE_SUPABASE_URL from apps/web/.env.local..."
        export $(grep -v '^#' apps/web/.env.local | grep VITE_SUPABASE_URL | xargs)
    fi
fi

# Verify VITE_SUPABASE_URL is now set
if [ -z "$VITE_SUPABASE_URL" ]; then
    echo "❌ Error: VITE_SUPABASE_URL not found"
    echo "   Please set it in apps/web/.env.local or as an environment variable"
    exit 1
fi

# Load database password from .env.local
if [ -f apps/web/.env.local ]; then
    export $(grep -v '^#' apps/web/.env.local | grep SUPABASE_DB_PASSWORD | xargs)
fi

# Extract project ID
PROJECT_REF=$(echo "$VITE_SUPABASE_URL" | sed -E 's|https://([^.]+)\.supabase\.co|\1|')
echo "📍 Project: $PROJECT_REF"
echo ""

# Construct database connection string
if [ -n "$SUPABASE_DB_PASSWORD" ]; then
    # URL-encode the password to handle special characters
    # Note: Using printf with %s to safely handle the password
    ENCODED_PASSWORD=$(printf '%s' "$SUPABASE_DB_PASSWORD" | sed 's/!/%21/g; s/@/%40/g; s/#/%23/g; s/\$/%24/g; s/&/%26/g')
    DB_URL="postgresql://postgres:${ENCODED_PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres"
else
    echo "⚠️  SUPABASE_DB_PASSWORD not found in .env.local"
    echo "   You'll be prompted for the database password..."
    DB_URL="postgresql://postgres@db.${PROJECT_REF}.supabase.co:5432/postgres"
fi

# Find psql binary (check homebrew libpq first, then system PATH)
PSQL_BIN=""
if [ -f "/opt/homebrew/opt/libpq/bin/psql" ]; then
    PSQL_BIN="/opt/homebrew/opt/libpq/bin/psql"
elif command -v psql &> /dev/null; then
    PSQL_BIN="psql"
else
    echo "❌ Error: psql not found"
    echo "   Install with: brew install libpq"
    exit 1
fi

# Execute the refresh script using psql
echo "⚙️  Executing refresh script..."
"$PSQL_BIN" "$DB_URL" -f supabase/refresh_analytics_views.sql

echo ""
echo "✅ Analytics materialized views refreshed successfully!"
echo ""
echo "Next steps:"
echo "  1. Review the output above for verification"
echo "  2. Run verification queries against source tables to validate view accuracy"
echo "  3. Compare source of truth vs view results"
