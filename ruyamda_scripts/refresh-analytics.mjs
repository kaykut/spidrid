#!/usr/bin/env node
/**
 * Analytics Materialized Views Refresh Script (Node.js version)
 * ============================================
 * Usage: node scripts/refresh-analytics.mjs
 * Purpose: Refresh analytics materialized views using Supabase client
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logSink = (globalThis['console']) ?? console;
const LOG_LEVEL = (process.env.LOG_LEVEL || process.env.RUYAMDA_LOG_LEVEL || 'info').toLowerCase();
const LEVEL_ORDER = { error: 1, warn: 2, info: 3, debug: 4 };
const shouldLog = (target) => (LEVEL_ORDER[LOG_LEVEL] || 3) >= (LEVEL_ORDER[target] || 3);
const log = {
  info: (...args) => shouldLog('info') && logSink.info(...args),
  warn: (...args) => shouldLog('warn') && logSink.warn(...args),
  error: (...args) => logSink.error(...args),
};

// Load environment variables from apps/web/.env.local
const envPath = join(__dirname, '../apps/web/.env.local');
let SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_DB_PASSWORD;

try {
  const envContent = readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');

  for (const line of envLines) {
    if (line.startsWith('VITE_SUPABASE_URL=')) {
      SUPABASE_URL = line.split('=')[1].replace(/"/g, '').trim();
    } else if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) {
      SUPABASE_ANON_KEY = line.split('=')[1].replace(/"/g, '').trim();
    } else if (line.startsWith('SUPABASE_DB_PASSWORD=')) {
      SUPABASE_DB_PASSWORD = line.split('=')[1].replace(/"/g, '').trim();
    }
  }
} catch (error) {
  log.error('❌ Error loading .env.local:', error.message);
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  log.error('❌ Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not found in apps/web/.env.local');
  process.exit(1);
}

const PROJECT_REF = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
log.info('🔄 Starting analytics materialized views refresh...');
log.info('📍 Project:', PROJECT_REF);
log.info('');

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Read the SQL file
const sqlPath = join(__dirname, '../supabase/refresh_analytics_views.sql');
const sqlContent = readFileSync(sqlPath, 'utf8');

log.info('⚙️  Executing refresh via Supabase RPC...');
log.info('');

try {
  // Call the public wrapper function (created via migration 20251110000001)
  const { data, error } = await supabase.rpc('refresh_analytics');

  if (error) {
    log.error('❌ Error refreshing views:', error);
    log.error('   Code:', error.code);
    log.error('   Message:', error.message);
    log.error('   Details:', error.details);
    log.error('   Hint:', error.hint);
    process.exit(1);
  }

  log.info('✅ Analytics materialized views refreshed successfully!');
  log.info('   Result:', data);
  log.info('');
  log.info('Next steps:');
  log.info('  1. Review the output above for verification');
  log.info('  2. Run verification queries against source tables to validate view accuracy');
  log.info('  3. Compare source of truth vs view results');
} catch (err) {
  log.error('❌ Unexpected error:', err.message);
  process.exit(1);
}
