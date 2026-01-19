// @ts-nocheck
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from apps/mobile/.env
config({ path: path.resolve(process.cwd(), 'apps/mobile/.env') });

async function runInvestigation() {
    // Mock localStorage for Node environment
    if (typeof global.localStorage === 'undefined') {
        global.localStorage = {
            getItem: () => null,
            setItem: () => { },
            removeItem: () => { },
            clear: () => { },
            length: 0,
            key: () => null,
        } as any;
    }

    // Dynamic import to ensure env vars are loaded first
    // const { analyticsDatabase } = await import('../packages/shared-logic/src/database/analyticsDatabase');
    // const { supabase } = await import('../packages/shared-logic/src/supabase/client');

    // Ensure config is loaded
    console.log('Available Env Keys:', Object.keys(process.env).filter(k => k.includes('SUPABASE')));

    // Use Service Role Key from npx supabase status output
    const SERVICE_ROLE_KEY = 'sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz';
    const SUPABASE_URL = 'http://127.0.0.1:54321';
    console.log('Using Supabase URL:', SUPABASE_URL);

    console.log('Creating client with Service Role Key...');

    // Create a new client with service role key to bypass RLS
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        }
    });

    try {
        console.log('--- Investigating Feeling Trends (30d) ---');

        // Helper to fetch trends using admin client
        const getTrends = async (type: 'feeling' | 'symbol', window: string, gender?: string, limit: number = 20) => {
            let viewName;
            if (window === '30d') {
                // Use new country-level views
                const prefix = type === 'feeling' ? 'feeling' : 'symbol';
                const suffix = gender ? 'gender' : 'all';
                viewName = `${prefix}_trends_country_${suffix}_30d`;
            } else {
                // Fallback to old views (though we don't expect to use them for trends anymore)
                viewName = type === 'feeling' ? `feeling_trends_${window}_vs_${window}` : `symbol_trends_${window}_vs_${window}`;
            }

            console.log(`Querying view: ${viewName}`);

            let query = supabaseAdmin.schema('analytics').from(viewName).select('*').eq('country', 'TR');
            if (gender) query = query.eq('gender', gender);

            // Filter by min users (threshold is 5 in code, let's check raw data first)
            // query = query.gte('current_user_count', 5);

            const { data, error } = await query.order('growth_rate_percent', { ascending: false, nullsFirst: false }).limit(limit);
            if (error) throw error;
            return data;
        };

        // 1. All Genders
        console.log('\n[All Genders]');
        const allTrends = await getTrends('feeling', '30d', undefined, 20);
        console.table(allTrends.map(t => ({
            name: t.feeling || t.symbol_name,
            growth: t.growth_rate_percent,
            curr_users: t.current_user_count,
            prev_users: t.previous_user_count,
            curr_dreams: t.current_dream_count,
            prev_dreams: t.previous_dream_count
        })));

        // 2. Male
        console.log('\n[Male]');
        const maleTrends = await getTrends('feeling', '30d', 'male', 20);
        console.table(maleTrends.map(t => ({
            name: t.feeling || t.symbol_name,
            growth: t.growth_rate_percent,
            curr_users: t.current_user_count,
            prev_users: t.previous_user_count
        })));

        // 3. Female
        console.log('\n[Female]');
        const femaleTrends = await getTrends('feeling', '30d', 'female', 20);
        console.table(femaleTrends.map(t => ({
            name: t.feeling || t.symbol_name,
            growth: t.growth_rate_percent,
            curr_users: t.current_user_count,
            prev_users: t.previous_user_count
        })));

        console.log('\n--- Investigating Symbol Trends (30d) ---');

        // 4. All Genders (Symbols)
        console.log('\n[All Genders - Symbols]');
        const symbolTrends = await getTrends('symbol', '30d', undefined, 20);
        console.table(symbolTrends.map(t => ({
            name: t.symbol_name,
            growth: t.growth_rate_percent,
            curr_users: t.current_user_count,
            prev_users: t.previous_user_count
        })));

    } catch (error) {
        console.error('Error:', error);
    }
}

runInvestigation();
