#!/bin/bash
# Supabase database query helper script
# Usage: ./scripts/supabase_debug.sh [--local] -c "SQL query"
#   --local  Connect to local Supabase (127.0.0.1:54322)
#   (default) Connect to remote Supabase

set -e

# Check for --local flag
USE_LOCAL=false
ARGS=()
for arg in "$@"; do
    if [ "$arg" = "--local" ]; then
        USE_LOCAL=true
    else
        ARGS+=("$arg")
    fi
done

if [ "$USE_LOCAL" = true ]; then
    # Local Supabase connection
    HOST="127.0.0.1"
    PORT="54322"
    USER="postgres"
    DB="postgres"
    PGPASSWORD="postgres"
else
    # Remote Supabase connection - load password from env
    if [ -f apps/web/.env.local ]; then
        export $(grep -v '^#' apps/web/.env.local | grep SUPABASE_DB_PASSWORD | xargs)
    fi

    if [ -z "$SUPABASE_DB_PASSWORD" ]; then
        echo "Error: SUPABASE_DB_PASSWORD not found in apps/web/.env.local"
        exit 1
    fi

    HOST="aws-1-eu-west-3.pooler.supabase.com"
    PORT="6543"
    USER="postgres.unxizwyryahdndkjkroi"
    DB="postgres"
    PGPASSWORD="$SUPABASE_DB_PASSWORD"
fi

# Execute query
PGPASSWORD="$PGPASSWORD" /opt/homebrew/opt/libpq/bin/psql \
    -h "$HOST" -p "$PORT" -U "$USER" -d "$DB" "${ARGS[@]}"
