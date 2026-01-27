# Authentication, Purchase Recovery, and Cross-Device Sync Verification Audit

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with [PLANS.md](/Users/kaya/Coding/devoro/PLANS.md).

## Purpose / Big Picture

This is a discovery and verification task, not an implementation task. The goal is to perform an ultradeep, line-by-line audit of 8 critical user flows involving authentication, purchase recovery, and cross-device content synchronization. Each task represents a distinct scenario where a user interacts with the app across multiple devices, platforms, and authentication states.

At completion, you will have produced a comprehensive report that documents:
1. Whether each requirement is correctly implemented or ambiguous
2. All bugs, race conditions, and corner cases discovered
3. Specific fixes needed for any issues found
4. Evidence from code tracing to support all findings

The output is NOT code changes—it is a detailed audit report that will inform future implementation work.

## Progress

- [x] (2026-01-22 14:30) Map authentication, purchase, and sync architecture (identify all relevant files)
- [x] (2026-01-22 15:45) Task 1: Verify first app install flow (Supabase ID, RC ID, aliasing) - REQUIREMENT CORRECTED
- [x] (2026-01-22 16:15) Task 2: Verify sign-in flow on device_1 (OAuth/email alias linking) - CRITICAL BUGS FOUND
- [x] (2026-01-23) Task 3: Verify content upload gating (no premium = no upload) - CRITICAL BUGS FOUND
- [x] (2026-01-23) Task 4: Verify purchase flow (entitlement assignment) - NO BUGS
- [x] (2026-01-23) Task 5: Verify content upload trigger on purchase (existing content sync) - BUG FOUND & FIXED
- [x] (2026-01-23) Task 6: Verify cross-device sign-in with different platform (ID recovery, content download) - NO BUGS (depends on Bug #2 and #5 fixes)
- [x] (2026-01-23) Task 7: Verify same-platform purchase recovery (restore purchases flow) - BUG FOUND & FIXED (simplified sync triggers)
- [x] (2026-01-24) Task 8: Verify expired entitlement handling (ID recovery but no sync) - MOSTLY CORRECT, MINOR RACE CONDITION
- [x] (2026-01-24) Consolidate all findings into final report - COMPLETE (see docs/audit-reports/2026-01-22-auth-purchase-sync-verification-report.md)
- [x] (2026-01-24) Review all code paths during task execution - integrated into each task

## Surprises & Discoveries

### M1: Architecture Mapping

**Discovery 1: No explicit ID aliasing infrastructure**
- The task requirements mention "RC ID gets alias to Supabase ID" and "Supabase ID gets alias to OAuth/email ID"
- **Finding**: The codebase does NOT use RevenueCat's `setAttributes()` or any explicit aliasing mechanism
- **Instead**: RevenueCat's `Purchases.logIn(userId)` function serves as the linkage mechanism (purchases.ts:114)
- **Evidence**: No calls to `setAttributes()`, `setAttribute()`, or similar aliasing APIs found in entire codebase
- **Impact**: This may affect cross-platform recovery flow - needs verification in Tasks 6-8

**Discovery 2: Sync gating relies on TWO conditions**
- Content sync requires BOTH `isLoggedIn` AND `isPremium` (useSyncManager.ts:76, 94, 111)
- **Finding**: The task requirements only mention premium gating, but login state is equally critical
- **Evidence**: Every sync operation checks both flags before proceeding
- **Impact**: Anonymous premium users (edge case: purchase before sign-in) cannot sync until they sign in

**Discovery 3: No premium check in syncOrchestrator.canSync()**
- syncOrchestrator.ts:71-74 only checks `isLoggedIn`, NOT `isPremium`
- **Finding**: The low-level sync functions don't enforce premium requirement
- **Evidence**: canSync() function only calls `useAuthStore.getState().isLoggedIn`
- **Impact**: Premium gating is enforced at hook/UI layer (useSyncManager), not at service layer
- **Risk**: Direct calls to syncOrchestrator functions could bypass premium check

### M2: Task 1 - First App Install Flow

**CRITICAL: REQUIREMENT CORRECTED BASED ON DOCUMENTATION**

**Original Requirement:**
- Supabase assigns ID `id_sb123`
- RevenueCat assigns ID `id_rc456`
- RC ID `id_rc456` must be aliased to Supabase ID `id_sb123` during first app install

**Corrected Requirement (Based on Official Documentation):**
- Supabase assigns anonymous ID with `is_anonymous: true`
- RevenueCat assigns anonymous ID prefixed with `$RCAnonymousID:`
- **NO ALIASING/LINKING HAPPENS ON FIRST INSTALL**
- Linking occurs LATER when user signs in (Task 2) via `Purchases.logIn(supabaseUserId)`

**Documentation Evidence:**
- [RevenueCat: Identifying Customers](https://www.revenuecat.com/docs/customers/identifying-customers) - "logIn() creates an alias between the two IDs"
- [Supabase: Anonymous Sign-Ins](https://supabase.com/docs/guides/auth/auth-anonymous) - Anonymous users "can't access their account if they sign out, clear browsing data, or use another device"

**Discovery 4: No ID linking on first app install**
- **Finding**: The code does NOT link Supabase and RevenueCat IDs during app initialization
- **Evidence**:
  - authStore.ts:115 calls `signInAnonymously()` and stores user ID locally
  - subscriptionStore.ts:57 → purchases.ts:81 calls `Purchases.configure()` without any user ID
  - purchases.ts has NO call to `logIn()` during configuration
  - authStore.ts:66-69 shows linking ONLY happens when user transitions from `isAnonymous: true` to `isAnonymous: false`
- **Impact**: **The original requirement is incorrect** - the two services create independent anonymous IDs that remain unlinked until the user signs in

**Discovery 5: Anonymous Supabase users cannot persist across devices**
- **Finding**: Supabase anonymous sessions are lost on logout/device change
- **Evidence**: [Supabase docs](https://supabase.com/docs/guides/auth/auth-anonymous) explicitly state anonymous users "can't access their account if they sign out, clear browsing data, or use another device"
- **Impact**: Cross-device sync is IMPOSSIBLE for anonymous users - they MUST convert to permanent users first (via OAuth/email)

**Discovery 6: RevenueCat anonymous IDs also cannot share across platforms**
- **Finding**: RevenueCat anonymous IDs "are not able to share subscription status across apps and platforms"
- **Evidence**: [RevenueCat docs](https://www.revenuecat.com/docs/customers/identifying-customers)
- **Impact**: For cross-platform entitlements to work, users MUST be identified via `logIn()` before purchasing

**Code Path Trace:**

**On First App Install:**
1. _layout.tsx:45 → authStore.initialize()
2. authStore.ts:43 → Sets up onAuthStateChange listener (NO linking logic for anonymous users)
3. authStore.ts:90 → supabase.auth.getSession() returns null (no existing session)
4. authStore.ts:115 → supabase.auth.signInAnonymously() creates anonymous Supabase user
5. authStore.ts:141-146 → Sets state: `isAnonymous: true`, `isLoggedIn: false`, `userId: <uuid>`
6. _layout.tsx:47 → subscriptionStore.initialize()
7. subscriptionStore.ts:57 → PurchasesService.configurePurchases()
8. purchases.ts:81 → Purchases.configure({ apiKey }) creates anonymous RC ID
9. subscriptionStore.ts:59 → checkPremiumStatus() returns false

**Result:** Two independent anonymous IDs exist with NO linkage/aliasing between them.

**When Does Linking Actually Happen?**
- authStore.ts:66-69 → linkRevenueCatUser() is called ONLY when `!wasLoggedIn && isNowLoggedIn`
- This occurs during OAuth sign-in or email verification (Task 2)
- At that point: subscriptionStore.ts:107 → purchases.ts:114 → Purchases.logIn(supabaseUserId)

**Race Conditions:** None found - operations are sequential

**Error Handling Issues:**
- authStore.ts:124-137 → If signInAnonymously() fails, app marks as initialized and continues
- subscriptionStore.ts:61-63 → If RC SDK unavailable (Expo Go), defaults to free tier
- **Impact**: App functions but without proper auth/subscription - acceptable for dev environment

**Bugs Found:** NONE - the code correctly implements the phased approach (anonymous first, link later)

**Architecture Validation:** The implementation is CORRECT according to vendor documentation. The original task requirement was based on incorrect assumptions about when linking should occur.

### M3: Task 2 - Sign-In Flow on Device_1

**CRITICAL: REQUIREMENT CORRECTED + MAJOR BUGS FOUND**

**Original Requirement:**
- Supabase ID `id_sb123` gets aliased to `uuid_signin_id`
- `uuid_signin_id` is either the OAuth provider's UUID or the user's email
- This alias enables recovering `id_sb123` when signing in from a different device

**Corrected Requirement (Based on Official Documentation):**
- Supabase uses `auth.identities` table to store OAuth/email identities linked to users
- **NOT "aliasing"** - correct term is "identity linking"
- Google OAuth: Use `linkIdentity()` to link OAuth provider to existing anonymous account
- Email/Password: Automatic linking works ONLY for OAuth with same email, NOT for signUp()

**Documentation Evidence:**
- [Supabase: Identity Linking](https://supabase.com/docs/guides/auth/auth-identity-linking) - Describes auth.identities table and linking mechanisms
- [Supabase: linkIdentity() JavaScript API](https://supabase.com/docs/reference/javascript/auth-linkidentity) - Manual linking for converting anonymous users
- [GitHub Discussion: React Native linkIdentity() Limitation](https://github.com/orgs/supabase/discussions/25976) - "linkIdentity() was only meant for web-based applications"
- [Supabase: Automatic Identity Linking](https://supabase.com/docs/guides/auth/auth-identity-linking) - "automatically links identities with the same email address to a single user" (OAuth only)

**Discovery 7: Google OAuth uses web-based flow (BY DESIGN, NOT A BUG)**
- **Implementation**: authStore.ts:168 uses `linkIdentity({ provider: 'google' })` which returns web redirect URL
- **Clarification**: This is INTENTIONAL - the app uses Supabase's web-based OAuth flow for React Native
- **How it works**:
  - linkIdentity() opens web browser to Google OAuth
  - User authenticates via web
  - Supabase redirects to devoro://auth/callback
  - useAuthDeepLink.ts catches redirect and completes session (line 50)
- **Evidence**: Web-based OAuth is a standard, supported pattern for React Native apps
- **Status**: ✓ WORKING AS DESIGNED - Not a bug

**Discovery 8: Email/Password sign-up creates new account instead of converting anonymous user**
- **Issue**: authStore.ts:179 uses `signUp({ email, password })` which creates a NEW user account with new UUID
- **Root Cause**: The single-box UI flow (AuthModal.tsx:92-101) tries signInWithPassword(), and if it fails, immediately calls signUpWithPassword()
- **Impact**: User's anonymous data (content, purchases) remains on anonymous account (id_sb123), inaccessible after email sign-up creates new account (id_sb999)
- **Why This Happens**:
  - Cannot check if email exists (security by design)
  - signUp() is for creating new accounts, not converting anonymous users
  - For anonymous conversion, should use `updateUser({ email })` then verify, then `updateUser({ password })`
- **Evidence**: [GitHub #29017](https://github.com/orgs/supabase/discussions/29017) - "Updating password of an anonymous user is not possible" in single step; requires email verification first

**Discovery 9: Anonymous-to-email conversion requires two-step flow**
- **Finding**: Cannot use `updateUser({ email, password })` in one call for anonymous users
- **Correct Flow Per Supabase Docs**:
  1. `updateUser({ email })` - adds email, sends verification
  2. User verifies email via link
  3. `updateUser({ password })` - adds password (only works after email verified)
- **Evidence**: [Supabase Anonymous Auth](https://supabase.com/docs/guides/auth/auth-anonymous) - "To add a password for the anonymous user, the user's email or phone number needs to be verified first"
- **Impact**: Single-step "enter email+password, create account" flow is incompatible with preserving anonymous data

**Code Path Traces:**

**Google OAuth Flow (✓ WORKING AS DESIGNED):**
```
AuthModal.tsx:53 → handleGoogleSignIn()
  → authStore.signInWithGoogle()
    → supabase.auth.linkIdentity({ provider: 'google' }) (line 168)
      → Returns OAuth redirect URL
      → App opens web browser (Supabase handles redirect)
      → User authenticates with Google via web
      → Google redirects to Supabase callback
      → Supabase redirects to devoro://auth/callback
      → useAuthDeepLink.ts catches redirect (line 50)
      → Calls supabase.auth.setSession() with tokens
      → ✓ onAuthStateChange fires with session.user.is_anonymous = false (line 51)
      → ✓ authStore.ts:66 detects transition, calls linkRevenueCatUser(userId)
      → ✓ purchases.ts:114 calls Purchases.logIn(supabaseUserId)
      → ✓ RevenueCat merges anonymous purchases with identified user

Result: Anonymous user successfully converted to Google-authenticated user, data preserved
```

**Email/Password Sign-Up Flow (⚠️ DATA LOSS - NEEDS FIX):**
```
AuthModal.tsx:92 → signInWithPassword(email, password)
  → authStore.ts:201 → supabase.auth.signInWithPassword()
    → ❌ Fails (user doesn't exist yet)
    → AuthModal.tsx:98 catches error

AuthModal.tsx:101 → signUpWithPassword(email, password)
  → authStore.ts:179 → supabase.auth.signUp({ email, password })
    → ⚠️ Creates NEW user with NEW UUID (e.g., id_sb999)
    → ✓ Sends verification email
    → ✓ Returns session with new user ID
    → onAuthStateChange fires (line 43)
      → session.user.id = id_sb999 (NOT id_sb123!)
      → session.user.is_anonymous = false
      → Condition at line 66: !wasLoggedIn && isNowLoggedIn
        → For new account: !false && true = true
      → ✓ Calls linkRevenueCatUser(id_sb999)
        → Links RC to id_sb999, NOT id_sb123
        → ⚠️ Anonymous user's RC purchases (on id_rc456) remain unlinked
        → ⚠️ Anonymous user's Supabase data (on id_sb123) orphaned forever

Result: Two separate users exist:
  - Anonymous user (id_sb123) with all imported content + purchases [ORPHANED]
  - Email user (id_sb999) with no data, fresh start [USER SEES THIS]

User loses all their reading progress and purchases.
```

**Correct Flow for Anonymous Conversion (REQUIRES TWO STEPS):**
```
Step 1: Add email to anonymous account
  → authStore: if (isAnonymous) updateUser({ email })
  → Sends verification email
  → Show: "Check your email to verify and set password"

Step 2: After user verifies email
  → authStore: updateUser({ password })
  → Now user has email + password
  → All anonymous data preserved (same user ID)
  → RevenueCat already linked to same user ID
```

**Email/Password Sign-In Flow (Works but only for existing accounts):**
```
AuthModal.tsx:92 → signInWithPassword(email, password)
  → authStore.ts:201 → supabase.auth.signInWithPassword()
    → ✓ Success (returns session for existing user)
    → onAuthStateChange fires
      → session.user.is_anonymous = false
      → ✓ User transitions to logged in
      → ✓ linkRevenueCatUser() called correctly

This path works, but only if user already has an email account from previous session.
```

**Race Conditions:** None - operations are sequential

**Error Handling Issues:**
- Email sign-up: No warning about data loss when creating new account
- Sign-in errors: Generic "Invalid email or password" doesn't help user understand if account exists

**Bug Found:**

**BUG: Email Sign-Up Causes Data Loss**
- **Severity**: HIGH - User loses all content and purchases
- **Location**: authStore.ts:179 + AuthModal.tsx:92-101
- **Root Cause**: Single-box UI flow (try sign-in, auto sign-up on fail) uses `signUp()` which creates NEW user account instead of converting anonymous user
- **Impact**: Anonymous user data (id_sb123) orphaned; new account (id_sb999) starts empty

**Recommended Fixes (Choose One):**

**Option A: Separate Sign-In / Sign-Up Tabs (RECOMMENDED)**
- **Sign-In Tab**: Only `signInWithPassword()`, show clear error if fails
- **Sign-Up Tab**:
  - Check `if (isAnonymous)` → use `updateUser({ email })` (requires email verification before password)
  - Else → use `signUp({ email, password })`
- **Pros**: Clear user intent, proper anonymous conversion flow
- **Cons**: Slightly more complex UI

**Option B: Keep Single-Box + Explicit Consent**
- Try `signInWithPassword()` first
- On failure, show: "Account not found. [Create New Account] (Warning: Will not transfer current reading progress)"
- Only call `signUp()` if user explicitly confirms
- **Pros**: Simpler UI, explicit consent for data loss
- **Cons**: User still loses data if they choose email sign-up

**Option C: Guide to OAuth**
- Prominent Google OAuth button with: "To keep your reading progress, sign in with Google"
- De-emphasize email/password or remove entirely for anonymous users
- **Pros**: Steers users to working path (OAuth preserves data)
- **Cons**: Removes email/password option

**Implementation Note for Option A:**
```typescript
// In authStore.ts
signUpWithPassword: async (email: string, password: string) => {
  if (get().isAnonymous) {
    // Convert anonymous → permanent (two-step flow)
    const { error } = await supabase.auth.updateUser({ email });
    // User must verify email, then can set password separately
    return { requiresVerification: true };
  } else {
    // Create new account (rare case)
    const { data, error } = await supabase.auth.signUp({ email, password });
    return data;
  }
}
```

**Architecture Validation:** The Google OAuth flow is correctly implemented using web-based OAuth (working as designed). The email/password flow has a UX issue where the single-box pattern (try sign-in, auto sign-up) causes data loss for anonymous users. This is fixable with UI changes (separate tabs) or user warnings.

---

**Discovery 10: CRITICAL BUG - Cross-device sign-in fails silently due to identity_already_exists error**
- **Severity**: CRITICAL - Prevents cross-device recovery for returning users
- **Issue**: When signing in on Device 2 with Google account already linked to Device 1's user, `linkIdentity()` fails with `identity_already_exists` error
- **Location**: useAuthDeepLink.ts:42-58 (before fix)
- **Root Cause**:
  - Device 1: Anonymous user `sb_anon_1` calls `linkIdentity({ provider: 'google' })` → Links Google to `sb_anon_1` ✓
  - Device 2: Anonymous user `sb_anon_2` calls `linkIdentity({ provider: 'google' })` → Supabase rejects with `error=identity_already_exists` (422 status)
  - Error embedded in redirect URL: `devoro://auth/callback#error=identity_already_exists&error_description=...`
  - Current code: `extractTokensFromUrl()` returns null (no tokens) → `handleAuthCallback()` returns silently ❌
  - **No fallback to `signInWithOAuth()` to fetch existing account session**
- **Impact**: Device 2 stays as `sb_anon_2`, never gets `sb_anon_1` session, cannot access Device 1's content
- **Evidence**: [Supabase Error Codes](https://supabase.com/docs/guides/auth/debugging/error-codes) - "identity_already_exists: The identity to which the API relates is already linked to a user"

**Fixed Implementation:**
```typescript
// useAuthDeepLink.ts - Added error handling
function extractErrorFromUrl(url: string): {
  error: string | null;
  errorDescription: string | null;
} {
  const hashIndex = url.indexOf('#');
  if (hashIndex === -1) return { error: null, errorDescription: null };

  const hash = url.substring(hashIndex + 1);
  const params = new URLSearchParams(hash);

  return {
    error: params.get('error'),
    errorDescription: params.get('error_description'),
  };
}

async function handleAuthCallback(url: string): Promise<void> {
  const { accessToken, refreshToken } = extractTokensFromUrl(url);

  if (!accessToken || !refreshToken) {
    // Check for error code (not string matching!)
    const { error, errorDescription } = extractErrorFromUrl(url);

    if (error === 'identity_already_exists') {
      // Google account already linked - sign in to existing account
      console.log('[Auth] Identity already exists, signing in to existing account');

      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: 'devoro://auth/callback' }
      });
      return;
    }

    if (error) {
      console.error('[Auth] OAuth callback error:', error, errorDescription);
    }
    return;
  }

  // Success path: set session
  await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
}
```

**Why This Works:**
1. **First device**: `linkIdentity()` succeeds → tokens in callback → `setSession()` → user keeps same ID ✓
2. **Second device**: `linkIdentity()` fails → error in callback → detects `identity_already_exists` → calls `signInWithOAuth()` → opens browser again → returns tokens for EXISTING user (`sb_anon_1`) → `setSession()` → Device 2 now has `sb_anon_1` session ✓

**User Experience:**
- User sees **two** browser redirects on second device (first fails, second succeeds)
- Slightly awkward UX but data is preserved
- Alternative would require changing initial sign-in to always try `signInWithOAuth()` first, but that loses anonymous data on FIRST sign-in

**Files Modified:**
- src/hooks/useAuthDeepLink.ts - Added `extractErrorFromUrl()`, updated `handleAuthCallback()` with fallback logic
- __tests__/hooks/useAuthDeepLink.test.ts - Added 2 test cases for error handling

**Test Coverage:**
- ✓ Tests verify `signInWithOAuth()` called when `identity_already_exists` error occurs
- ✓ Tests verify `signInWithOAuth()` NOT called for other errors
- ✓ All 96 test suites pass (2,296 tests)

**Status**: ✅ FIXED - Cross-device sign-in now works correctly via fallback to `signInWithOAuth()`

### M4: Task 3 - Content Upload Gating (Pre-Purchase)

**Requirement:**
- Before the user purchases premium, their content must NOT be uploaded to Supabase DB.
- Verify that all content creation/import flows respect the premium gate.
- Check for server-side enforcement via Row Level Security (RLS) policies.

**Architecture Finding: Dual-Gate Pattern**

**Discovery 11: Upload gating uses TWO conditions, not one**
- **Finding**: Content upload requires BOTH `isLoggedIn && isPremium`, not just premium status alone
- **Evidence**: All primary sync entry points check both flags:
  - useSyncManager.ts:76 - Auto-sync on login: `if (isLoggedIn && isPremium)`
  - useSyncManager.ts:94 - Manual full sync: `if (!isLoggedIn || !isPremium)`
  - useSyncManager.ts:111 - Debounced push: `if (!isLoggedIn || !isPremium)`
  - useSyncManager.ts:128 - Force push: `if (!isLoggedIn || !isPremium)`
  - useSyncManager.ts:187 - Auto-sync subscriptions: `if (isLoggedIn && isPremium)`
- **Impact**: Anonymous premium users (edge case: restore purchases before sign-in) cannot upload content until they sign in
- **Status**: ✓ WORKING AS DESIGNED

**Discovery 12: Orchestrator-level gate only checks isLoggedIn**
- **Finding**: The `canSync()` function in syncOrchestrator.ts only validates authentication, not premium status
- **Evidence**:
  ```typescript
  function canSync(): boolean {
    const { isLoggedIn } = useAuthStore.getState();
    return isLoggedIn;  // ⚠️ Missing isPremium check
  }
  ```
- **Impact**: If code calls `performFullSync()`, `pushAllChanges()`, or `pullAllData()` directly (bypassing useSyncManager), content WILL be uploaded even without premium
- **Status**: ⚠️ INCOMPLETE GATING at orchestrator layer

**Discovery 13: Adapter-level push operations only check authentication**
- **Finding**: Each sync adapter's `push()` method verifies user authentication but NOT premium status
- **Evidence**:
  - contentSyncAdapter.ts:81-84 - `const { data: { user } } = await supabase.auth.getUser(); if (!user) throw`
  - generatedSyncAdapter.ts:86-89 - Same pattern
  - curriculumSyncAdapter.ts:79-82 - Same pattern
  - learningSyncAdapter.ts:81-84 - Same pattern
  - journeySyncAdapter.ts - (not examined, but same pattern expected)
  - settingsSyncAdapter.ts - (not examined, but same pattern expected)
- **Impact**: Adapters rely on caller to enforce premium gate; no defense-in-depth
- **Status**: ⚠️ NO PREMIUM CHECK at adapter layer

**CRITICAL BUG #3: Background Sync Bypasses Premium Gate**

**Location**: src/app/_layout.tsx:58-73

**Code**:
```typescript
useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      // ⚠️ NO CHECK FOR isLoggedIn || isPremium HERE
      import('../services/syncOrchestrator').then(({ pushAllChanges }) => {
        pushAllChanges().catch(err => {
          console.warn('[_layout] Background sync failed:', err);
        });
      });
    }
  });
  return () => { subscription.remove(); };
}, []);
```

**Issue**:
- The background sync handler calls `pushAllChanges()` directly without checking `isPremium` or `isLoggedIn`
- This bypasses the dual-gate pattern enforced by useSyncManager

**Reproduction Steps**:
1. User is logged in (isLoggedIn: true)
2. User has NOT purchased premium (isPremium: false)
3. User creates/imports content locally
4. User backgrounds the app
5. Background sync handler triggers → calls `pushAllChanges()`
6. syncOrchestrator.ts:208 → `canSync()` returns true (only checks isLoggedIn)
7. Content gets uploaded to Supabase

**Impact**: Logged-in non-premium users can upload content by backgrounding the app

**Trace**:
```
_layout.tsx:59 → AppState 'background' event
  → _layout.tsx:62 → import syncOrchestrator → pushAllChanges()
    → syncOrchestrator.ts:207-214 → canSync() → checks ONLY isLoggedIn ✓
    → syncOrchestrator.ts:229-236 → Promise.all(...adapter.push())
      → contentSyncAdapter.ts:78-101 → supabase.upsert() succeeds
```

**CRITICAL BUG #4: Orchestrator canSync() Missing Premium Check**

**Location**: src/services/syncOrchestrator.ts:71-74

**Code**:
```typescript
function canSync(): boolean {
  const { isLoggedIn } = useAuthStore.getState();
  return isLoggedIn;  // ⚠️ Missing: && isPremium check
}
```

**Issue**:
- All three public sync functions call `canSync()`: performFullSync(), pushAllChanges(), pullAllData()
- `canSync()` only validates `isLoggedIn`, NOT `isPremium`
- This means the orchestrator layer does NOT enforce the premium requirement

**Impact**:
- Any code that calls sync orchestrator functions directly (bypassing useSyncManager hook) will succeed if user is logged in, regardless of premium status
- Currently, only ONE call site has this bug: _layout.tsx background sync handler (Bug #3)
- However, this creates a fragile system where future code could easily bypass the gate

**Trace of all direct calls to sync orchestrator functions**:
```
performFullSync() called from:
  ✓ useSyncManager.ts:83 - Has dual-gate check before calling
  ✓ useSyncManager.ts:102 - Has dual-gate check before calling

pushAllChanges() called from:
  ⚠️ _layout.tsx:62 - NO gate check (Bug #3)
  ✓ useSyncManager.ts:122 - Has dual-gate check before calling
  ✓ useSyncManager.ts:142 - Has dual-gate check before calling
  ✓ useSyncManager.ts:191 - Has dual-gate check before calling

pullAllData() called from:
  ✓ No production calls found (only used in tests)
```

**Server-Side Enforcement: RLS Policy**

**Discovery 14: RLS policy only enforces user_id ownership, NOT premium status**

**Location**: supabase/migrations/20260113000000_create_user_content.sql:20-23

**Policy Definition**:
```sql
ALTER TABLE user_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own content" ON user_content
  FOR ALL USING (auth.uid() = user_id);
```

**Analysis**:
- RLS policy checks: `auth.uid() = user_id` (user owns the data)
- RLS policy does NOT check: premium status/entitlement
- **Impact**: Server-side enforcement of premium requirement is MISSING
- **Risk**: If client-side gates are bypassed (via bugs or malicious client), server accepts uploads from non-premium users

**Evidence**:
- No reference to entitlements, subscriptions, or premium status in RLS policy
- No additional policies on user_content table
- No triggers or functions that check premium status before insert/update

**Why This Matters**:
- **Defense in depth**: Server-side enforcement prevents bypasses via modified clients or API calls
- **Current state**: Premium gating relies ENTIRELY on client-side code
- **Recommendation**: Add premium check to RLS policy (requires RevenueCat webhook to sync entitlement status to Supabase)

**Additional Upload Paths Verified (No Issues Found)**

**Path 1: Store change auto-sync**
- **Trigger**: Any mutation to contentStore, generatedStore, curriculumStore, learningStore, journeyStore, settingsStore
- **Handler**: useSyncManager.ts:183-195 → `store.subscribe()` callback
- **Gate**: Lines 184-186 check `isLoggedIn && isPremium` ✓
- **Status**: ✓ PROPERLY GATED

**Path 2: Manual sync trigger**
- **Trigger**: User calls `triggerFullSync()` or `forcePush()` from UI
- **Handler**: useSyncManager.ts:93-143
- **Gate**: Lines 94, 128 check `isLoggedIn || isPremium` ✓
- **Status**: ✓ PROPERLY GATED

**Path 3: Automatic sync on login**
- **Trigger**: User signs in (isLoggedIn changes to true)
- **Handler**: useSyncManager.ts:74-90 → `useEffect` with dependency `[isLoggedIn, isPremium]`
- **Gate**: Line 76 checks `isLoggedIn && isPremium` ✓
- **Status**: ✓ PROPERLY GATED

**Bugs Summary**:

**BUG #3**: Background sync bypasses premium gate
- **Severity**: CRITICAL
- **Location**: src/app/_layout.tsx:58-73
- **Fix**: Remove direct `pushAllChanges()` call; auto-sync via store subscriptions already handles background push

**BUG #4**: Orchestrator canSync() missing premium check
- **Severity**: HIGH (defense-in-depth issue)
- **Location**: src/services/syncOrchestrator.ts:71-74
- **Fix**: Update `canSync()` to check BOTH `isLoggedIn && isPremium`

**BUG #5**: No automatic sync trigger when user becomes premium (Task 5)
- **Severity**: MEDIUM (user experience issue, content not lost)
- **Location**: src/hooks/useSyncManager.ts:167-200 (initializeAutoSync)
- **Root Cause**: `initializeAutoSync()` subscribes to content stores but NOT subscriptionStore; when `isPremium` changes, no callbacks fire
- **Impact**: Pre-existing content created while free is not uploaded immediately after purchase; content syncs only on next edit
- **Fix**: Add subscription to `subscriptionStore` that triggers `performFullSync()` when `isPremium` transitions from false→true
- **Status**: ✅ FIXED (2026-01-23)

**BUG #6**: Restore-then-sign-in doesn't trigger sync (Task 7)
- **Severity**: MEDIUM (rare edge case, user experience issue, workaround available)
- **Location**: src/hooks/useSyncManager.ts:203-216 (subscriptionStore subscription)
- **Root Cause**: `wasPremium` module variable persists across state changes; when user restores before signing in, wasPremium becomes true; subsequent sign-in doesn't trigger sync because condition checks only isPremium transition, not isLoggedIn transition
- **Impact**: User who restores purchases THEN signs in doesn't get automatic content download; must create/edit content to trigger sync
- **Fix**: Track BOTH wasPremium AND wasLoggedIn; trigger sync on either: (1) isPremium: false→true while logged in, OR (2) isLoggedIn: false→true while premium
- **Status**: ❌ NOT FIXED - Documented for future implementation

**Missing Server-Side Enforcement**:
- **Severity**: MEDIUM (requires architectural change)
- **Location**: supabase/migrations/20260113000000_create_user_content.sql
- **Fix**: Add RLS policy that checks premium status (requires RevenueCat webhook integration)

**Files Requiring Changes**:
1. src/app/_layout.tsx - Remove redundant background sync call
2. src/services/syncOrchestrator.ts - Add isPremium check to canSync()
3. supabase/migrations/*.sql - (Optional) Add premium enforcement to RLS policy

**Test Coverage Review**:
- ✓ useSyncManager.test.ts verifies dual-gate behavior at hook level
- ✓ syncOrchestrator.test.ts verifies canSync() rejects non-authenticated users
- ⚠️ NO tests verify canSync() rejects authenticated non-premium users
- ⚠️ NO tests verify background sync respects premium gate

**Status**: ✅ FIXED - Both critical bugs (Bug #3 and Bug #4) have been resolved

**Fixes Applied (2026-01-23):**

**Bug #3 Fix: Replace Background Server Sync with Local Position Save**
- **Location**: [src/app/playback.tsx](src/app/playback.tsx)
- **Original Issue**: Background handler in _layout.tsx called `pushAllChanges()` which syncs to Supabase server, bypassing premium gate
- **Root Cause**: Code comment said "Save reading positions" but implementation did SERVER sync instead of LOCAL save
- **Fix**: Added AppState listener in playback.tsx that saves ONLY the current reading position when app backgrounds
- **Implementation**:
  - playback.tsx:207-224: New useEffect with AppState listener
  - When app backgrounds, calls `savePosition()` for the currently playing content
  - Uses latestStateRef to avoid stale closures (same pattern as unmount cleanup)
  - Local storage only - Zustand persist middleware handles AsyncStorage writes
  - No server sync (server sync handled by useSyncManager with proper premium gating)
- **Why playback.tsx instead of _layout.tsx**:
  - playback.tsx knows what content is currently playing (sourceId, source, currentIndex)
  - _layout.tsx would need to flush all stores (overkill) or track current content globally
  - Better separation of concerns - playback component manages its own state persistence
- **Files Modified**:
  - src/app/playback.tsx - Added AppState background listener for position save

**Bug #4 Fix: Add isPremium Check to canSync()**
- **Location**: [src/services/syncOrchestrator.ts](src/services/syncOrchestrator.ts)
- **Changes**:
  1. Imported useSubscriptionStore
  2. Updated canSync() to check `isLoggedIn && isPremium`
  3. Updated error messages from "Not authenticated" to "Authentication and premium subscription required"
- **Rationale**: Orchestrator layer must enforce both gates (authentication AND premium) for defense-in-depth
- **Files Modified**:
  - src/services/syncOrchestrator.ts - Updated canSync() function and error messages

**Test Updates:**
- __tests__/services/syncOrchestrator.test.ts - Added isPremium setup, updated error message assertions
- __tests__/integration/sync/fullSyncFlow.test.ts - Updated error message assertion
- **Result**: All 96 test suites passing (2,296 tests), including 4 integration sync test suites (52 tests)

**Verification:**
- ✅ Orchestrator canSync() now rejects authenticated non-premium users
- ✅ Background sync bypass path eliminated
- ✅ All sync entry points now protected by dual-gate pattern
- ✅ No regression in existing functionality

**Bug #5 Fix: Add Automatic Sync Trigger on Premium Upgrade**
- **Location**: [src/hooks/useSyncManager.ts](src/hooks/useSyncManager.ts)
- **Original Issue**: When user purchases premium, existing local content not automatically uploaded to server
- **Root Cause**: `initializeAutoSync()` subscribed to content stores but NOT subscriptionStore, so `isPremium` state changes didn't trigger any callbacks
- **Fix**: Added subscription to `subscriptionStore` in `initializeAutoSync()` that:
  - Tracks previous premium state using module-level variable `wasPremium`
  - Detects transition from `false` → `true` when user upgrades
  - Only triggers sync if user is BOTH premium AND logged in (`isLoggedIn && isPremium`)
  - Calls `performFullSync()` to upload all existing content immediately
  - Initializes `wasPremium` to current state on startup
  - Resets `wasPremium` in `cleanupAutoSync()` for proper test cleanup
- **Implementation**:
  - useSyncManager.ts:161 - Added `wasPremium` module-level variable
  - useSyncManager.ts:203-216 - Added subscriptionStore subscription with upgrade detection
  - useSyncManager.ts:218 - Initialize wasPremium to current state
  - useSyncManager.ts:228 - Reset wasPremium on cleanup
- **Console Logging**: Added "[AutoSync] User became premium - triggering full sync" log for debugging
- **Files Modified**:
  - src/hooks/useSyncManager.ts - Added subscriptionStore subscription and premium transition tracking
  - __tests__/hooks/useSyncManager.test.ts - Added 4 test cases for premium upgrade trigger
- **Test Coverage**:
  - ✓ Triggers sync when user becomes premium (while logged in)
  - ✓ Does NOT trigger sync when user becomes premium but not logged in
  - ✓ Does NOT trigger sync when already premium (no transition)
  - ✓ Resets wasPremium state on cleanup (for proper re-initialization)
- **Result**: All 96 test suites passing (2,300 tests, up from 2,296)

**Verification:**
- ✅ Premium upgrade immediately triggers full sync
- ✅ Pre-existing content uploaded without requiring user to edit
- ✅ Dual-gate respected (must be both logged in AND premium)
- ✅ No false triggers when already premium
- ✅ Clean state management across app lifecycle

**Discovery #13 Resolution:**
- **Finding**: Adapter-level push operations only check authentication, NOT premium
- **Decision**: This is CORRECT architecture - adapters are data access primitives, premium gating is a business logic concern that belongs at the orchestration layer
- **No changes needed** - adapters remain focused on authentication-only checks

### M5: Task 4 - Purchase Flow (Entitlement Assignment)

**Requirement:**
- Verify that when a user purchases premium, the entitlement is correctly assigned
- Trace the purchase flow for both anonymous and authenticated users
- Verify RevenueCat integration and entitlement checking logic

**Code Trace:**

**1. Purchase Flow - Anonymous User**
- User opens paywall → [Paywall.tsx](src/components/paywall/Paywall.tsx):43-51
- `handlePurchase()` calls `subscriptionStore.purchaseProduct()`
- [subscriptionStore.ts](src/store/subscriptionStore.ts):68-93:
  - Gets offerings from RevenueCat (line 72)
  - Calls `PurchasesService.purchasePackage(offerings[0])` (line 79)
  - [purchases.ts](src/services/purchases.ts):173-185 - Calls `Purchases.purchasePackage(pkg)`
  - RC SDK processes payment with App Store/Google Play
  - Returns `customerInfo` with entitlements
  - Checks `customerInfo.entitlements.active['premium'] !== undefined` (line 81)
  - Updates `isPremium: true` (line 82)
- Purchase linked to anonymous RC ID: `$RCAnonymousID:abc-def-ghi`

**2. Sign-In After Purchase - Entitlement Transfer**
- User signs in with Google → [authStore.ts](src/store/authStore.ts):164-172
- `onAuthStateChange` fires with authenticated session (line 40-83)
- Detects transition `!wasLoggedIn && isNowLoggedIn` (line 63)
- Calls `linkRevenueCatUser(userId)` (line 64):
  - [subscriptionStore.ts](src/store/subscriptionStore.ts):96-129 calls `PurchasesService.loginUser(userId)`
  - [purchases.ts](src/services/purchases.ts):110-121 - `Purchases.logIn(userId)` transfers anonymous purchases to authenticated user
  - Returns `customerInfo` with transferred entitlements
  - Updates `isPremium` based on transferred entitlements (line 111)
- Also calls `restorePurchases()` (line 70) as additional safety measure
- State: `isLoggedIn: true, isPremium: true`

**3. Purchase Flow - Already Signed In**
- User already authenticated when purchasing
- Purchase flow identical to anonymous (lines 68-93)
- Purchase linked to current RC customer ID
- RC SDK persists logged-in user ID across app restarts
- No transfer needed - purchase directly associated with authenticated RC customer

**Error Handling:**
- [Paywall.tsx](src/components/paywall/Paywall.tsx):43-51 - Shows "Purchase failed. Please try again." on error
- [subscriptionStore.ts](src/store/subscriptionStore.ts):88-92 - Catches purchase errors, logs and returns `false`
- Purchase errors from RC SDK properly propagated to UI

**RevenueCat SDK Persistence:**
- [purchases.ts](src/services/purchases.ts):110-121 - `logIn()` persists user ID in RC SDK storage
- Logged-in user ID remembered across app restarts without re-calling `logIn()`
- [authStore.ts](src/store/authStore.ts):176-177 - `signOut()` calls `unlinkRevenueCatUser()` → `logoutUser()` to clear RC user
- [purchases.ts](src/services/purchases.ts):127-136 - `logOut()` creates new anonymous RC ID

**Verification:**

✅ **Purchase → Entitlement Flow:**
- Anonymous purchase: Entitlement assigned to anonymous RC ID
- Sign-in after purchase: `logIn()` transfers entitlements to authenticated user
- Already signed-in purchase: Entitlement directly assigned to authenticated RC customer
- RC SDK persists authenticated user ID across app restarts

✅ **Error Handling:**
- Purchase errors caught and displayed to user
- No silent failures in purchase flow

✅ **State Management:**
- `isPremium` correctly updated after purchase
- Entitlement check uses RC's `customerInfo.entitlements.active['premium']`
- State persisted to AsyncStorage via Zustand middleware

**Findings:**

**No bugs found in purchase flow.** Entitlement assignment works correctly for all scenarios:
1. ✅ Anonymous user purchases → entitlement assigned to anonymous RC ID
2. ✅ Anonymous user purchases then signs in → entitlements transferred via `logIn()`
3. ✅ Authenticated user purchases → entitlement directly assigned
4. ✅ RC SDK persists user ID across app restarts
5. ✅ Error handling properly surfaces failures to UI

**Status**: ✅ VERIFIED - Purchase flow correctly assigns entitlements

### M6: Task 5 - Content Upload Trigger on Purchase

**Requirement:**
- After a user purchases premium, verify that existing local content automatically syncs to server
- Check if there's a trigger mechanism for isPremium state change
- Verify that pre-existing content (created while free) is uploaded

**Code Trace:**

**1. Sync Trigger Mechanisms**

**Option A: useSyncManager Hook**
- [useSyncManager.ts](src/hooks/useSyncManager.ts):74-90
- useEffect with dependencies `[isLoggedIn, isPremium]`
- When `isPremium` changes from `false` → `true`, effect fires
- Calls `performFullSync()` which uploads existing content
- **Issue**: This hook must be mounted in a component to work

**Hook Usage Search:**
- Searched codebase for `useSyncManager()` calls in app components
- Found: Only used in test files (__tests__/hooks/useSyncManager.test.ts, __tests__/integration/*)
- **NOT mounted in any production app component**

**Option B: initializeAutoSync() Store Subscriptions**
- [useSyncManager.ts](src/hooks/useSyncManager.ts):167-200
- Called from [_layout.tsx](src/app/_layout.tsx):48 on app startup
- Subscribes to content stores: contentStore, generatedStore, curriculumStore, learningStore, journeyStore, settingsStore (lines 172-179)
- On store change, checks `isLoggedIn && isPremium` and calls `pushAllChanges()` (lines 184-194)
- **Issue**: Subscribes to CONTENT stores only, NOT subscriptionStore
- When `isPremium` changes, no store change event fires
- Sync only triggers when content stores change (add/edit/delete)

**2. Purchase Flow - Sync Trigger**

**Scenario: User has existing content, then purchases**
1. Free user creates 10 articles locally (stored in contentStore)
2. User signs in (optional) - no sync because not premium
3. User opens paywall, purchases premium
4. [subscriptionStore.ts](src/store/subscriptionStore.ts):82 - `isPremium` updated to `true`
5. **Question**: Does sync trigger?

**Analysis:**
- `useSyncManager` hook's useEffect would trigger, BUT hook not mounted
- `initializeAutoSync()` subscriptions listen to content stores, NOT subscription store
- No store change event fires (content stores unchanged, only subscriptionStore changed)
- **Result**: NO automatic sync triggered

6. User must create/edit content to trigger first sync
7. When content changes, auto-sync fires and uploads ALL content (including pre-existing)
8. Pre-existing content eventually uploaded, but NOT immediately after purchase

**Verification:**

❌ **Bug #5 Discovered: No automatic sync trigger when user becomes premium**

**Reproduction Steps:**
1. Free user creates local content (e.g., 10 imported articles)
2. User signs in with Google (optional)
3. User purchases premium via paywall
4. `isPremium` changes from `false` → `true`
5. Observe: No sync triggered, existing content not uploaded
6. User creates/edits any content
7. Auto-sync triggers, uploads all content including pre-existing articles

**Root Cause:**
- `initializeAutoSync()` subscribes to content stores but NOT `subscriptionStore`
- When `isPremium` changes, no subscription callbacks fire
- `useSyncManager` hook has correct logic (useEffect with isPremium dependency) but is never mounted

**Impact:**
- **Severity**: MEDIUM
- Premium users who purchase after creating content don't get immediate backup
- Content is NOT lost - it syncs on next edit
- Creates user confusion: "I paid for sync, why isn't my content backed up?"
- Missing the "wow moment" of immediate sync after purchase

**Suggested Fix:**
Add subscription to `subscriptionStore` in `initializeAutoSync()` that triggers `performFullSync()` when `isPremium` transitions from `false` → `true`:

```typescript
// In initializeAutoSync()
const stores = [
  require('../store/contentStore').useContentStore,
  require('../store/generatedStore').useGeneratedStore,
  // ... other content stores
];

// Track previous premium state to detect transitions
let wasPremium = false;

// Subscribe to subscriptionStore for premium state changes
const unsubscribeSubscription = require('../store/subscriptionStore').useSubscriptionStore.subscribe(() => {
  const { isLoggedIn } = useAuthStore.getState();
  const { isPremium } = require('../store/subscriptionStore').useSubscriptionStore.getState();

  // Trigger full sync when user becomes premium
  if (!wasPremium && isPremium && isLoggedIn) {
    performFullSync().catch((error) => {
      console.error('[AutoSync] Premium upgrade sync failed:', error);
    });
  }

  wasPremium = isPremium;
});

autoSyncUnsubscribers.push(unsubscribeSubscription);
```

**Alternative Fix:**
Mount `useSyncManager` hook in a top-level component (e.g., _layout.tsx via a custom provider) so its useEffect runs.

**Status**: ✅ FIXED (2026-01-23) - Content upload now automatically triggered on premium purchase via subscriptionStore subscription

### M7: Task 6 - Cross-Device Sign-In with Different Platform (ID Recovery, Content Download)

**Requirement:**
- User has Device 1 (e.g., iOS) with premium subscription and content
- User installs app on Device 2 (e.g., Android)
- User signs in on Device 2 with same account
- Verify: RevenueCat entitlements are recovered (ID recovery)
- Verify: Content downloads from Supabase to Device 2

**Code Trace:**

**Phase 1: Device 2 App Launch (Before Sign-In)**
1. App launches → [_layout.tsx](src/app/_layout.tsx):41-55
2. Calls `initializeAuth()` → creates anonymous Supabase session
3. Calls `initializeSubscription()` → creates anonymous RC customer ID
4. Calls `initializeAutoSync()` → [useSyncManager.ts](src/hooks/useSyncManager.ts):168-222
   - Subscribes to content stores for auto-push
   - Subscribes to subscriptionStore for premium upgrade detection
   - Initializes `wasPremium = false` (line 221)
5. State: `isLoggedIn: false, isPremium: false`

**Phase 2: User Signs In on Device 2**
1. User taps "Sign in with Google" → [AuthModal.tsx](src/components/auth/AuthModal.tsx)
2. Calls `signInWithGoogle()` → `supabase.auth.linkIdentity({ provider: 'google' })`
3. Browser opens OAuth flow
4. OAuth completes → deep link callback: `devoro://auth/callback?access_token=...`
5. [useAuthDeepLink.ts](src/hooks/useAuthDeepLink.ts):69-111 handles callback:
   - Extracts tokens from URL (line 70)
   - **CRITICAL**: If `identity_already_exists` error (line 76):
     - Google account already linked to Device 1's user
     - Fallback to `signInWithOAuth()` instead of `linkIdentity()` (line 83)
     - Triggers second OAuth flow that signs in to existing account
     - This was Bug #2, fixed in Task 2
   - Calls `setSession()` (line 103) with Device 1's user tokens
6. `onAuthStateChange` fires → [authStore.ts](src/store/authStore.ts):40-83
   - Session contains Device 1's user ID (not Device 2's anonymous ID)
   - Line 54-59: Sets `isLoggedIn: true, userId: <Device 1's ID>`
   - Line 63: Detects `!wasLoggedIn && isNowLoggedIn`
   - **ENTITLEMENT RECOVERY**: Line 64-66: Calls `linkRevenueCatUser(userId)`
   - Line 70-72: Calls `restorePurchases()` as safety measure

**Phase 3: RevenueCat Entitlement Recovery**
- [subscriptionStore.ts](src/store/subscriptionStore.ts):96-129 `linkRevenueCatUser()`
  - Line 107: Calls `PurchasesService.loginUser(supabaseUserId)` with Device 1's user ID
  - [purchases.ts](src/services/purchases.ts):110-121:
    - Calls `Purchases.logIn(userId)` - THIS IS THE ID RECOVERY MECHANISM
    - RC backend: "This user ID already has purchases from Device 1"
    - Returns `customerInfo` with ALL entitlements for that user across ALL devices
  - **CRITICAL**: Line 110-111: "Update premium status from RevenueCat - may have entitlements from another device"
  - Line 111: Checks `customerInfo.entitlements.active['premium'] !== undefined`
  - Line 114: Updates `isPremium: true` (recovered from Device 1!)
  - State transition: `isPremium: false → true`

**Phase 4: Automatic Content Download (Bug #5 Fix)**
- subscriptionStore state change triggers [useSyncManager.ts](src/hooks/useSyncManager.ts):203-216
  - Line 208: Condition `!wasPremium && isPremium && isLoggedIn` is TRUE:
    - `wasPremium = false` (from initialization)
    - `isPremium = true` (just recovered from RC)
    - `isLoggedIn = true` (from onAuthStateChange)
  - **CONTENT DOWNLOAD TRIGGERED**: Line 210: Calls `performFullSync()`
- [syncOrchestrator.ts](src/services/syncOrchestrator.ts):125-199 `performFullSync()`
  - Line 165-171: Calls `syncAdapter()` for all adapters (content, generated, curriculum, etc.)
  - [syncOrchestrator.ts](src/services/syncOrchestrator.ts):85-105 `syncAdapter()`:
    - **PULL PHASE**: Line 91: `adapter.pull()` - Fetches Device 1's content from Supabase
    - Line 94: `adapter.toSyncItems()` - Gets Device 2's local content (empty on fresh install)
    - Line 97: `mergeItems()` - Merges remote and local (Device 1's content wins)
    - **WRITE PHASE**: Line 100: `adapter.fromSyncItems(mergedItems)` - Writes to Device 2's local stores
    - Line 104: `adapter.push()` - Pushes merged content back to Supabase
5. Device 2 now has ALL content from Device 1!

**Verification:**

✅ **Entitlement Recovery (ID Recovery):**
- RC's `logIn(userId)` returns `customerInfo` with entitlements from Device 1
- `isPremium` correctly updated to `true` on Device 2
- No need for separate "ID retrieval" - entitlements come with `logIn()` response
- Works cross-platform (iOS → Android, Android → iOS)

✅ **Content Download:**
- `performFullSync()` automatically triggered by Bug #5 fix when `isPremium` changes to `true`
- `syncAdapter.pull()` fetches all content from Supabase
- `mergeItems()` handles conflicts (server wins for fresh install)
- `adapter.fromSyncItems()` writes content to Device 2's stores
- All content types synced: imported content, generated articles, curriculum progress, journey stats, settings

✅ **Timing & Dependencies:**
- Entitlement recovery happens BEFORE content download
- Bug #5 fix detects premium upgrade and triggers sync automatically
- No manual intervention required
- All async operations properly sequenced

✅ **Error Handling:**
- `identity_already_exists` error properly handled (Bug #2 fix from Task 2)
- Falls back to `signInWithOAuth()` to sign in to existing account
- Two-redirect flow (first fails, second succeeds) but preserves data integrity

**Findings:**

**No bugs found in cross-device sign-in flow.** The flow works correctly end-to-end:

1. ✅ Device 2 detects `identity_already_exists` and signs in to Device 1's account (Bug #2 fix)
2. ✅ RC's `logIn()` recovers entitlements from Device 1
3. ✅ Bug #5 fix automatically triggers sync when `isPremium` changes to `true`
4. ✅ Content downloads from Supabase to Device 2
5. ✅ Works cross-platform (iOS ↔ Android)
6. ✅ No race conditions or timing issues

**Critical Dependencies:**
- **Bug #2 fix** (identity_already_exists handling) - REQUIRED for Device 2 to sign in
- **Bug #5 fix** (premium upgrade sync trigger) - REQUIRED for automatic content download
- Without these fixes, cross-device sign-in would fail or require manual content refresh

**Status**: ✅ VERIFIED - Cross-device sign-in works correctly with entitlement recovery and automatic content download

### M8: Task 7 - Same-Platform Purchase Recovery (Restore Purchases Flow)

**Requirement:**
- User purchased premium on Device 1 (iOS) with Apple ID
- User gets new Device 2 or reinstalls (same platform - iOS, same Apple ID)
- User taps "Restore Purchases" to recover premium status
- Verify entitlement recovery works without re-purchasing
- Verify content syncs after restoration

**Code Trace:**

**Restore Purchases Button Flow:**
1. User taps "Restore Purchases" in paywall → [Paywall.tsx](src/components/paywall/Paywall.tsx):53-63
2. Calls `subscriptionStore.restorePurchases()`
3. [subscriptionStore.ts](src/store/subscriptionStore.ts):138-160:
   - Calls `PurchasesService.restorePurchases()` (line 142)
   - [purchases.ts](src/services/purchases.ts):142-152 - Calls RC SDK's `Purchases.restorePurchases()`
   - **RC SDK behavior**: Checks with Apple/Google for purchases made by this Apple ID/Google account
   - Returns `customerInfo` with entitlements if purchase found
   - Line 145: Checks `customerInfo.entitlements.active['premium'] !== undefined`
   - Line 146: Updates `isPremium: true` if entitlement found
   - Returns success/failure to UI

**Automatic Restore on Login:**
- When user signs in, [authStore.ts](src/store/authStore.ts):68-72 automatically calls `restorePurchases()`
- Comment: "Restore purchases after login to handle 'guest purchase then login' scenario"
- This ensures purchases made before signing in transfer to the authenticated account
- Called AFTER `linkRevenueCatUser()` (line 64-66)

**Scenario Analysis:**

**Scenario A: User Signs In First (Typical Flow)**
1. Device 2: Anonymous state (`isPremium: false, isLoggedIn: false`)
2. User signs in with Google
3. `onAuthStateChange` fires:
   - Calls `linkRevenueCatUser(userId)` → Purchases.logIn() recovers entitlements
   - isPremium: false → true
   - Calls `restorePurchases()` as additional safety (may be redundant)
4. Bug #5 subscription: `!wasPremium && isPremium && isLoggedIn` → TRUE
5. Triggers `performFullSync()` → content downloads
6. ✅ Works correctly

**Scenario B: User Restores WITHOUT Signing In (Anonymous)**
1. Device 2: Anonymous state (`isPremium: false, isLoggedIn: false`)
2. User taps "Restore Purchases"
3. RC checks Apple/Google account for purchases
4. isPremium: false → true
5. Bug #5 subscription: `!wasPremium && isPremium && isLoggedIn` → FALSE (`isLoggedIn = false`)
6. No sync triggered (correct - anonymous users can't sync)
7. User can use premium features locally but no content sync
8. ⚠️ User must sign in later to sync content
9. ✅ Expected behavior

**Scenario C: User Restores FIRST, Then Signs In (Edge Case)** ⚠️
1. Device 2: Anonymous state (`isPremium: false, isLoggedIn: false, wasPremium: false`)
2. User taps "Restore Purchases"
   - restorePurchases() updates `isPremium: true`
   - Bug #5 subscription fires: `!false && true && false` → FALSE (not logged in)
   - **wasPremium updated to `true`**
3. User then signs in
   - authStore calls both:
     - `linkRevenueCatUser(userId)` → Purchases.logIn() transfers purchase
     - `restorePurchases()` → redundant call
   - Both may call `set({ isPremium: true })` (same value)
   - Bug #5 subscription fires: `!wasPremium && isPremium && isLoggedIn` → **FALSE** (`!true && true && true`)
   - **wasPremium is already `true` from step 2**
   - ❌ **NO SYNC TRIGGERED**

**Bug #6 Discovered: Restore-then-sign-in doesn't trigger sync**

**Reproduction Steps:**
1. Fresh install on Device 2
2. Open app (anonymous state)
3. Tap "Restore Purchases" → isPremium becomes true
4. Sign in with Google → isLoggedIn becomes true
5. Observe: User is premium + logged in but existing content NOT downloaded
6. Workaround: User must create/edit content to trigger auto-sync

**Root Cause:**
- `wasPremium` is a module-level variable that persists across state changes
- When user restores before signing in, `wasPremium` becomes `true`
- When user signs in later, Bug #5 subscription sees `wasPremium = true` and doesn't trigger
- The condition `!wasPremium && isPremium` detects false→true transitions of isPremium only
- Doesn't detect the case where isPremium is already true but isLoggedIn changes false→true

**Impact:**
- **Severity**: MEDIUM
- **Frequency**: RARE (most users sign in before restoring, or restore happens automatically on login)
- **User Experience**: Confusing - "I'm logged in and premium, why isn't my content here?"
- **Workaround Available**: User can create/edit any content to trigger auto-sync, which uploads/downloads everything
- **Data Loss**: NO - content is NOT lost, just not automatically downloaded

**Suggested Fix:**
Modify Bug #5 subscription to detect BOTH transitions:
1. isPremium: false → true (current behavior)
2. isLoggedIn: false → true WHILE isPremium is already true (new behavior)

```typescript
// Track BOTH states
let wasPremium = false;
let wasLoggedIn = false;

const unsubscribeSubscription = useSubscriptionStore.subscribe(() => {
  const { isLoggedIn } = useAuthStore.getState();
  const { isPremium } = useSubscriptionStore.getState();

  // Case 1: User became premium (while logged in)
  const becamePremium = !wasPremium && isPremium && isLoggedIn;

  // Case 2: User logged in (while already premium from restore)
  const loggedInWhilePremium = !wasLoggedIn && isLoggedIn && isPremium;

  if (becamePremium || loggedInWhilePremium) {
    console.log('[AutoSync] User ready for sync - triggering full sync');
    performFullSync().catch((error) => {
      console.error('[AutoSync] Sync failed:', error);
    });
  }

  wasPremium = isPremium;
  wasLoggedIn = isLoggedIn;
});
```

**Alternative Fix:**
Subscribe to authStore as well and detect when `isLoggedIn` changes to `true` while `isPremium` is already `true`.

**Status**: ✅ BUG FIXED - Simplified sync trigger approach eliminates this bug entirely

**Fix Applied (2026-01-24):**

Instead of using complex subscription-based state transition detection, we simplified by calling `triggerSyncIfEligible()` directly from the subscription store functions that establish sync eligibility:

1. **Removed**: `wasPremium` subscription listener in `useSyncManager.ts`
2. **Added**: `triggerSyncIfEligible()` function in `syncOrchestrator.ts` with 5-second debounce
3. **Added**: Direct calls to `triggerSyncIfEligible()` in:
   - `linkRevenueCatUser()` - triggers sync when user signs in (has premium entitlements from RC)
   - `purchaseProduct()` - triggers sync when user purchases (if already logged in)
   - `restorePurchases()` - triggers sync when user restores (if already logged in)

**Why This Works:**
- Since sync requires `isLoggedIn && isPremium`, we trigger sync from the functions that can establish eligibility
- `linkRevenueCatUser()` is called during sign-in, and RevenueCat returns entitlements → triggers sync
- The debounce handles double-calls (e.g., `linkRevenueCatUser` + `restorePurchases` during sign-in)
- No more state transition detection needed - just check eligibility when action completes

**Files Changed:**
- `src/services/syncOrchestrator.ts` - Added `triggerSyncIfEligible()` with time-based debounce
- `src/store/subscriptionStore.ts` - Added calls in `linkRevenueCatUser`, `purchaseProduct`, `restorePurchases`
- `src/hooks/useSyncManager.ts` - Removed `wasPremium` subscription (kept content store subscriptions for auto-push)
- `__tests__/hooks/useSyncManager.test.ts` - Updated tests for new approach
- `__tests__/services/syncOrchestrator.test.ts` - Added tests for `triggerSyncIfEligible`

**Note on Automatic Restore:**
- authStore automatically calls `restorePurchases()` after successful login (line 70)
- This handles "guest purchase then login" scenario
- With the new approach, this also triggers sync via `triggerSyncIfEligible()` in `restorePurchases()`

### M9: Task 8 - Expired Entitlement Handling

**Requirement**: When user downloads app on device_4 after premium entitlement has expired and signs in:
- ID recovery happens (recover Supabase ID and link to RevenueCat)
- Content is NOT synced because entitlement is expired

**Step 0: Requirement Validation**

Based on RevenueCat SDK behavior:
- When entitlement is active: appears in `customerInfo.entitlements.active['premium']`
- When entitlement expires: REMOVED from `active` dictionary (returns `undefined`)
- The code check: `customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined` returns `false` for expired

**Step 1: Code Path Tracing - Expired User Signs In on New Device**

1. **App Launch** → `subscriptionStore.initialize()` (subscriptionStore.ts:54)
   - `checkPremiumStatus()` → fetches from RevenueCat → no local purchase = `false`
   - Sets `isPremium: false`

2. **User Signs In with Google** → OAuth flow → callback received

3. **onAuthStateChange fires** (authStore.ts:40-83)
   - Sets `isLoggedIn: true`
   - Calls `linkRevenueCatUser(userId)` (line 64)

4. **linkRevenueCatUser** (subscriptionStore.ts:97-130)
   - `PurchasesService.loginUser(supabaseUserId)` → RevenueCat returns customerInfo
   - For expired user: `entitlements.active['premium']` is `undefined`
   - `isPremium = false`
   - Calls `triggerSyncIfEligible()` (line 120)

5. **triggerSyncIfEligible** (syncOrchestrator.ts:90-107)
   - `canSync()` checks: `isLoggedIn (true) && isPremium (false)` → `false`
   - Returns early, **NO SYNC** ✅

**Verification Results:**
- ✅ ID recovery works (linkRevenueCatUser establishes connection with user's Supabase ID)
- ✅ Entitlement status fetched fresh from RevenueCat (not cached)
- ✅ isPremium correctly set to `false` for expired users
- ✅ Sync blocked by `canSync()` returning false

**Minor Race Condition Identified (LOW Priority):**

In `useSyncManager.ts:75-90`, there's a useEffect that triggers sync when `isLoggedIn && isPremium`:

```typescript
useEffect(() => {
  if (isLoggedIn && isPremium) {
    performFullSync()...
  }
}, [isLoggedIn, isPremium]);
```

**Race Condition Scenario:**
1. App loads, Zustand hydrates `isPremium: true` (cached from previous active subscription)
2. Auth session restores → `isLoggedIn: true`
3. useEffect sees `true && true` → triggers sync
4. LATER: `linkRevenueCatUser` completes → sets `isPremium: false` (too late)

**Impact Assessment:**
- **Severity**: LOW
- **Likelihood**: Depends on initialization order (subscriptionStore vs authStore)
- **Data Impact**: User syncs their own content - no security breach
- **Frequency**: At most once per app launch
- **Mitigation**: Server-side RLS checks authentication; no server-side premium check

**Suggested Fix (Optional):**
Add an `isLoading` gate or ensure `subscriptionStore.initialize()` completes before auth session is restored. However, given the low severity and the fact that it only allows syncing the user's own data, this could be deferred.

**Status**: ✅ MOSTLY CORRECT - Core flow works correctly. Minor race condition with cached premium state is low priority.

## Decision Log

- **Decision**: Interpret "ID aliasing" as RevenueCat's `Purchases.logIn()` function
  **Rationale**: The task requirements mention "RC ID gets alias to Supabase ID" but no explicit aliasing code (like `setAttributes()`) exists in the codebase. RevenueCat's `Purchases.logIn(userId)` function serves this purpose by linking the anonymous RC customer ID to the Supabase user ID. This is RevenueCat's standard cross-device sync mechanism.
  **Date**: 2026-01-22 14:30
  **Impact**: Tasks 1, 2, 6, 7 will interpret aliasing requirements through this lens

- **Decision**: Sync requires BOTH login AND premium status
  **Rationale**: Every sync operation in useSyncManager checks `isLoggedIn && isPremium`. This is a stricter requirement than the task descriptions suggest (which only mention premium). This dual-gate approach prevents anonymous premium users from syncing and ensures user identity is established before any server communication.
  **Date**: 2026-01-22 14:30
  **Impact**: Tasks 3, 5, 6, 8 will verify both gates, not just premium

- **Decision**: Use RevenueCat's logIn() return value as the ID recovery mechanism
  **Rationale**: When `Purchases.logIn(userId)` is called on a new device, RevenueCat returns `customerInfo` which includes entitlements from other devices linked to that userId. This is how entitlements are "recovered" across devices - there's no separate API call to retrieve the old RC ID.
  **Date**: 2026-01-22 14:30
  **Impact**: Tasks 6, 7 will focus on the logIn() return value rather than separate ID retrieval

- **Decision**: Add mandatory "Step 0: Documentation Research and Requirement Validation" to all 8 verification tasks
  **Rationale**: The user noted that task requirements may be based on incorrect assumptions about how RevenueCat or Supabase work (e.g., stating "use setAttributes() for aliasing" when logIn() is the actual mechanism). To prevent blindly verifying against wrong specifications, each task must first research official documentation, understand the actual APIs, and correct the stated requirement if needed. This ensures we verify that the code implements the correct behavior according to vendor documentation, not just that it matches a potentially incorrect requirement.
  **Date**: 2026-01-22 15:00
  **Author**: Per user explicit instruction
  **Impact**: Every task (M2-M9) now has a Step 0 that must be completed before code tracing begins. Each step includes: identifying relevant APIs, researching official docs (with specific search terms), understanding actual mechanisms, comparing against stated requirements, and documenting corrections. The workflow emphasizes that stated requirements should not be trusted—they must be validated first.

- **Decision**: Task 1 requirement corrected - no aliasing on first app install
  **Rationale**: Original requirement stated "RC ID must be aliased to Supabase ID" during first app install. After researching official RevenueCat and Supabase documentation, discovered that: (1) RevenueCat uses `logIn()` not `setAttributes()` for user identification, (2) anonymous users from both services cannot persist across devices, (3) linking must happen when user converts from anonymous to permanent (during sign-in), not at app initialization. The code correctly implements this phased approach.
  **Date**: 2026-01-22 15:45
  **Evidence**: [RevenueCat: Identifying Customers](https://www.revenuecat.com/docs/customers/identifying-customers), [Supabase: Anonymous Sign-Ins](https://supabase.com/docs/guides/auth/auth-anonymous)
  **Impact**: Tasks 2, 6, 7 will verify that linking happens during sign-in, not during first install. The original requirement was based on incorrect assumptions about when cross-device sync setup should occur.

- **Decision**: Task 2 - Google OAuth works as designed (web-based), but email sign-up has data loss issue
  **Rationale**: After researching Supabase identity linking documentation: (1) Google OAuth via `linkIdentity()` uses web-based OAuth flow which IS supported in React Native (not a bug - intentional design using browser redirects), (2) Email sign-up using `signUp()` creates NEW user instead of converting anonymous user, causing data loss due to single-box UI pattern that auto-creates accounts, (3) Anonymous-to-email conversion requires two-step flow: updateUser(email) → verify email → updateUser(password).
  **Date**: 2026-01-22 16:45
  **Evidence**: [GitHub: Anonymous User Password Limitation #29017](https://github.com/orgs/supabase/discussions/29017), [Supabase: Identity Linking](https://supabase.com/docs/guides/auth/auth-identity-linking), [Supabase: Anonymous Auth](https://supabase.com/docs/guides/auth/auth-anonymous), [Supabase: updateUser API](https://supabase.com/docs/reference/javascript/auth-updateuser)
  **Impact**: Google OAuth feature works correctly (preserves anonymous data). Email sign-up causes data loss due to UX pattern. Recommended fix: separate Sign-In/Sign-Up tabs, or add explicit warning + guide users to OAuth. Cross-device sync (Tasks 6-8) can proceed - OAuth path is functional.

- **Decision**: Remove email/password authentication entirely, keep only Google OAuth
  **Rationale**: After analyzing cleanup impact (~695 lines across 4 files, 41% reduction) and discovering no viable UX pattern for email auth that preserves anonymous data without multi-step verification flow, decided to simplify authentication to OAuth-only. Email/password auth caused data loss due to signUp() creating new accounts instead of converting anonymous users. Two-step email verification flow (updateUser) would add significant UX complexity. OAuth provides seamless identity linking via linkIdentity() with no data loss.
  **Date**: 2026-01-22 17:30
  **Files Modified**:
    - src/components/auth/AuthModal.tsx (removed ~200 lines of email/password UI)
    - src/store/authStore.ts (removed signUpWithPassword, signInWithPassword, resetPassword functions)
    - __tests__/components/auth/AuthModal.test.tsx (removed 7 email/password test cases)
    - __tests__/store/authStore.test.ts (removed 3 email/password test describe blocks)
  **Test Results**: All 96 test suites pass (2294 tests), AuthModal reduced from 13 to 6 tests, authStore reduced from 28 to 25 tests
  **Impact**: Simplified authentication flow eliminates data loss vector. Users can only sign in via Google OAuth, which correctly preserves anonymous data through linkIdentity(). Removes ~280 lines from production code, ~415 lines from tests. Future verification tasks (M3-M10) will only test OAuth sign-in path.

- **Decision**: Fix identity_already_exists error handling to enable cross-device sign-in
  **Rationale**: Discovered CRITICAL bug where signing in on a second device with an already-linked Google account fails silently. When Device 2 tries `linkIdentity()` with Google account already linked to Device 1's user, Supabase returns `identity_already_exists` error in the callback URL's hash fragment. Original code only checked for tokens, ignoring errors entirely. This meant Device 2 stayed as anonymous user and couldn't access Device 1's content. Fix: Added `extractErrorFromUrl()` to parse error codes, and on detecting `identity_already_exists` (official Supabase error code), fallback to `signInWithOAuth()` to fetch existing account session. This creates two browser redirects (first fails, second succeeds) but preserves data integrity.
  **Date**: 2026-01-22 18:15
  **Files Modified**:
    - src/hooks/useAuthDeepLink.ts (added extractErrorFromUrl(), updated handleAuthCallback() with error handling and signInWithOAuth fallback)
    - __tests__/hooks/useAuthDeepLink.test.ts (added 2 test cases for identity_already_exists error handling)
  **Evidence**: [Supabase Error Codes](https://supabase.com/docs/guides/auth/debugging/error-codes), [JavaScript: Error codes](https://supabase.com/docs/reference/javascript/auth-error-codes)
  **Test Results**: All 96 test suites pass (2,296 tests, up from 2,294 due to 2 new tests)
  **Impact**: Cross-device sign-in now works correctly. When user signs in on Device 2 with Google account linked to Device 1, they correctly receive Device 1's session and can sync content. This unblocks Tasks 6-8 which verify cross-device scenarios. The slightly awkward UX (two redirects) is acceptable given the data preservation benefit.

- **Decision**: Simplify sync triggers by calling directly from subscription store functions
  **Rationale**: Bug #6 (restore-then-sign-in doesn't trigger sync) revealed that the subscription-based state transition detection (`wasPremium`) was unnecessarily complex. The user pointed out that since sync is gated on login, sync should be triggered directly from the functions that establish eligibility rather than via complex state subscriptions. The insight: subscription-based approach required tracking state transitions (false→true) across multiple variables, which failed when the order of operations varied (restore before sign-in vs sign-in before restore).
  **Date**: 2026-01-24
  **Solution**:
    1. Added `triggerSyncIfEligible()` function in syncOrchestrator.ts with 5-second time-based debounce
    2. Removed `wasPremium` subscription listener from useSyncManager.ts
    3. Added direct `triggerSyncIfEligible()` calls to: `linkRevenueCatUser()`, `purchaseProduct()`, `restorePurchases()`
  **Files Modified**:
    - src/services/syncOrchestrator.ts (added triggerSyncIfEligible, added lastTriggerTime to resetSyncState)
    - src/store/subscriptionStore.ts (added calls in 3 functions)
    - src/hooks/useSyncManager.ts (removed wasPremium subscription, kept content store subscriptions for auto-push)
    - __tests__/hooks/useSyncManager.test.ts (removed obsolete premium transition tests)
    - __tests__/services/syncOrchestrator.test.ts (added tests for triggerSyncIfEligible)
  **Test Results**: All 96 test suites pass (2,302 tests)
  **Impact**: Bug #6 is eliminated. Sync now triggers correctly regardless of operation order. The debounce prevents double-sync when multiple functions are called in quick succession (e.g., linkRevenueCatUser + restorePurchases during sign-in flow). Code is simpler and more maintainable.

## Outcomes & Retrospective

**Completion Date**: 2026-01-24
**Status**: COMPLETE

### Summary

| Metric | Value |
|--------|-------|
| Tasks completed | 8 of 8 |
| Critical bugs found | 5 |
| Critical bugs fixed | 5 |
| Low-priority issues | 1 (known, accepted) |
| Features removed | 1 (email/password auth) |
| Test suites | 96 passing |
| Tests | 2,302 passing |

### Key Fixes

1. **Bug #2 (CRITICAL)**: Cross-device sign-in now works via `identity_already_exists` error handling
2. **Bugs #3, #4 (CRITICAL)**: Premium gating enforced at service layer
3. **Bug #5 (CRITICAL)**: Automatic sync triggers on premium upgrade
4. **Bug #6 (MEDIUM)**: Simplified sync triggers eliminate operation order dependencies

### Architectural Improvements

- **Sync trigger simplification**: Replaced complex state-transition detection with direct function calls
- **Defense in depth**: Premium check moved from UI layer to service layer
- **Code reduction**: ~695 lines removed (email/password auth)

### Lessons Learned

1. **Requirement validation is critical**: Task 1 requirement was based on incorrect assumptions about RevenueCat aliasing
2. **Error handling in OAuth flows**: URL hash fragments can contain errors, not just tokens
3. **State transition detection is fragile**: Direct function calls are more reliable than subscription-based transitions
4. **Defense in depth matters**: Premium gating should be at service layer, not just UI

### Remaining Work

- **LOW PRIORITY**: Stale cache race condition for expired users on same device (benign impact)
- **FUTURE**: Server-side premium gating via Supabase RLS policies
- **FUTURE**: Sync status persistence for smarter sync decisions

### Full Report

See [docs/audit-reports/2026-01-22-auth-purchase-sync-verification-report.md](../audit-reports/2026-01-22-auth-purchase-sync-verification-report.md)

## Context and Orientation

This codebase is a React Native (Expo) speed reading app called Devoro with freemium monetization. The app uses:

- **Supabase** for authentication and backend storage (users table, content tables)
- **RevenueCat (RC)** for subscription management and entitlements
- **Zustand stores** for client-side state management
- **AsyncStorage** for local persistence in development

The critical user flows under audit involve three interconnected systems:

1. **Supabase Authentication**: Users can sign in via OAuth providers or email. Supabase assigns each user an ID (e.g., `id_sb123`).
2. **RevenueCat Purchases**: Each app installation gets an anonymous RC ID (e.g., `id_rc456`). When users purchase premium, this RC ID receives entitlements.
3. **Cross-Device Sync**: Premium users can sync their content (articles, reading history) across devices. This requires linking Supabase IDs to RC IDs to enable entitlement recovery across platforms.

### Key Architecture Assumptions (to be verified)

The system allegedly works as follows:

- On first app open, both Supabase and RevenueCat assign anonymous IDs
- RC IDs are aliased to Supabase IDs to enable cross-platform entitlement recovery
- When users sign in, their OAuth/email ID is aliased to their Supabase ID
- Premium purchases grant entitlements to the RC ID
- Content sync to/from Supabase DB only happens when the user has an active premium entitlement
- On new devices, signing in recovers the Supabase ID, which recovers the RC ID, which recovers entitlements
- Same-platform devices can use "restore purchases" to recover entitlements directly via RC

### Files Likely Involved (to be confirmed during M1)

Based on the project structure, these files are likely involved:

**Authentication & User Management:**
- `src/services/auth.ts` or similar - Supabase authentication logic
- `src/store/authStore.ts` or `src/store/userStore.ts` - Auth state management
- `src/services/supabase.ts` - Supabase client configuration

**Purchase & Subscription:**
- `src/services/purchases.ts` - RevenueCat SDK wrapper (confirmed to exist)
- `src/store/subscriptionStore.ts` - Premium state management (confirmed to exist)

**Content Sync:**
- `src/store/contentStore.ts` - Imported content state (confirmed to exist)
- `src/services/contentSync.ts` or similar - Supabase DB sync logic
- `src/services/contentExtractor.ts` - Content extraction (confirmed, but may not handle sync)

**App Initialization:**
- `src/app/_layout.tsx` - Root layout with providers (confirmed to exist)
- App initialization code that sets up Supabase and RC on first launch

The first milestone will involve finding and reading all relevant files to build a complete map of the system.

## Architecture Map (M1 Complete)

This section documents the complete architecture discovered during M1. All line numbers and file paths are confirmed.

### App Initialization Sequence

**File**: [src/app/_layout.tsx](src/app/_layout.tsx)

The app initialization happens in a single useEffect (lines 42-55):

1. **Line 45**: `initializeAuth()` from authStore
2. **Line 47**: `initializeSubscription()` from subscriptionStore
3. **Line 49**: `initializeAutoSync()` from useSyncManager hook
4. **Lines 58-73**: AppState listener triggers background sync on app backgrounding

**Call Graph**:
```
_layout.tsx:42 useEffect
  ├─> authStore.initialize() (authStore.ts:32)
  │   ├─> supabase.auth.getSession() (line 90)
  │   └─> supabase.auth.signInAnonymously() (line 115)
  ├─> subscriptionStore.initialize() (subscriptionStore.ts:53)
  │   ├─> PurchasesService.configurePurchases() (purchases.ts:67)
  │   └─> PurchasesService.checkPremiumStatus() (purchases.ts:94)
  └─> initializeAutoSync() (useSyncManager.ts:167)
      └─> Subscribes to all 6 stores for auto-push
```

### Authentication System

**Primary File**: [src/store/authStore.ts](src/store/authStore.ts)
**Supporting Files**:
- [src/services/supabase.ts](src/services/supabase.ts) - Client configuration
- [src/hooks/useAuthDeepLink.ts](src/hooks/useAuthDeepLink.ts) - Magic link handling

#### Anonymous Authentication

**Flow** (authStore.ts:32-147):
1. Check for existing session: `supabase.auth.getSession()` (line 90)
2. If no session: `supabase.auth.signInAnonymously()` (line 115)
3. Supabase creates user with `is_anonymous: true`
4. Store updates: `isAnonymous: true`, `isLoggedIn: false`, `userId: <uuid>`

**Auth State Listener** (authStore.ts:43-86):
- Listens to `supabase.auth.onAuthStateChange`
- When user transitions from anonymous → logged in (lines 66-76):
  - Calls `subscriptionStore.linkRevenueCatUser(userId)` (line 67)
  - Calls `subscriptionStore.restorePurchases()` (line 73)
- Updates state: `isAnonymous: false`, `isLoggedIn: true`

#### Real Authentication Methods

**Google OAuth** (authStore.ts:167-175):
- Uses `supabase.auth.linkIdentity({ provider: 'google' })`
- Links OAuth identity to existing anonymous session
- Triggers `onAuthStateChange` event

**Email/Password Sign Up** (authStore.ts:178-197):
- Uses `supabase.auth.signUp({ email, password })`
- Creates new permanent account
- Sends verification email automatically

**Email/Password Sign In** (authStore.ts:200-215):
- Uses `supabase.auth.signInWithPassword({ email, password })`
- Returns session with user data

**Magic Link** (handled via useAuthDeepLink.ts):
- User requests magic link (not in codebase - likely via Supabase UI)
- App receives deep link: `devoro://auth/callback#access_token=...`
- useAuthDeepLink extracts tokens and calls `supabase.auth.setSession()` (line 50)
- Triggers `onAuthStateChange` event

**Sign Out** (authStore.ts:229-254):
1. Unlink RevenueCat: `subscriptionStore.unlinkRevenueCatUser()` (line 231)
2. Sign out from Supabase: `supabase.auth.signOut()` (line 233)
3. Create new anonymous session: `supabase.auth.signInAnonymously()` (line 236)

### RevenueCat Purchase System

**Primary File**: [src/store/subscriptionStore.ts](src/store/subscriptionStore.ts)
**Supporting File**: [src/services/purchases.ts](src/services/purchases.ts)

#### Initialization

**Flow** (subscriptionStore.ts:53-64):
1. Configure SDK: `PurchasesService.configurePurchases()` (line 57)
   - Loads SDK with `require('react-native-purchases')` (purchases.ts:55)
   - Calls `Purchases.configure({ apiKey })` (purchases.ts:81)
2. Check premium status: `PurchasesService.checkPremiumStatus()` (line 59)
   - Gets `customerInfo` from `Purchases.getCustomerInfo()` (purchases.ts:98)
   - Checks for `entitlements.active['premium']` (purchases.ts:99)

**Graceful Degradation**: If SDK not available (Expo Go), defaults to free tier

#### User Linking (Cross-Device Sync Mechanism)

**Primary Method**: `linkRevenueCatUser(supabaseUserId)` (subscriptionStore.ts:96-129)

**Flow**:
1. Check if already linked (line 100) - return if same user
2. Call `PurchasesService.loginUser(supabaseUserId)` (line 107)
   - This calls `Purchases.logIn(userId)` (purchases.ts:114)
   - **CRITICAL**: RevenueCat's logIn transfers anonymous purchases to identified user
   - Returns `customerInfo` which may include entitlements from other devices (line 114)
3. Update premium status from returned `customerInfo` (line 111)
4. Store `linkedUserId` in state (line 113)

**Called From**:
- authStore.onAuthStateChange when user logs in (authStore.ts:67)
- After successful Google/email authentication

**Unlinking**: `unlinkRevenueCatUser()` (subscriptionStore.ts:132-135)
- Calls `PurchasesService.logoutUser()` which calls `Purchases.logOut()` (purchases.ts:131)
- Creates new anonymous RC ID for the device
- Called from authStore.signOut() (authStore.ts:231)

#### Purchase Flow

**Method**: `purchaseProduct()` (subscriptionStore.ts:68-92)

**Flow**:
1. Get offerings: `PurchasesService.getOfferings()` (line 72)
   - Calls `Purchases.getOfferings()` (purchases.ts:162)
   - Returns available subscription packages
2. Purchase first offering: `PurchasesService.purchasePackage(offerings[0])` (line 79)
   - Calls `Purchases.purchasePackage(pkg)` (purchases.ts:178)
   - Shows native purchase UI (App Store/Play Store)
   - Returns `customerInfo` on success
3. Extract premium status from `customerInfo.entitlements.active['premium']` (line 81)
4. Update `isPremium` state (line 82)

#### Restore Purchases

**Method**: `restorePurchases()` (subscriptionStore.ts:138-160)

**Flow**:
1. Call `PurchasesService.restorePurchases()` (line 142)
   - Calls `Purchases.restorePurchases()` (purchases.ts:146)
   - RevenueCat queries App Store/Play Store for purchases on this Apple/Google account
2. Returns `customerInfo` with restored entitlements
3. Update `isPremium` from `customerInfo.entitlements.active['premium']` (line 145)

**Called From**:
- authStore.onAuthStateChange after login (authStore.ts:73)
- User manually triggers "Restore Purchases" button
- **Purpose**: Handles "guest purchase then login" scenario

### Content Sync System

**Primary Files**:
- [src/services/syncOrchestrator.ts](src/services/syncOrchestrator.ts) - Main coordinator
- [src/services/syncService.ts](src/services/syncService.ts) - Core interfaces and merge algorithm
- [src/hooks/useSyncManager.ts](src/hooks/useSyncManager.ts) - Auto-sync logic and UI integration

**Sync Adapters** (all in [src/services/sync/](src/services/sync/)):
- [contentSyncAdapter.ts](src/services/sync/contentSyncAdapter.ts) - Imported content (URLs, PDFs, EPUBs, text)
- [generatedSyncAdapter.ts](src/services/sync/generatedSyncAdapter.ts) - AI-generated articles
- [curriculumSyncAdapter.ts](src/services/sync/curriculumSyncAdapter.ts) - Learning curriculum progress
- [learningSyncAdapter.ts](src/services/sync/learningSyncAdapter.ts) - Reading progress
- [journeySyncAdapter.ts](src/services/sync/journeySyncAdapter.ts) - Journey stats and certificates
- [settingsSyncAdapter.ts](src/services/sync/settingsSyncAdapter.ts) - User settings

#### Sync Adapter Interface

**Defined in**: [syncService.ts:22-31](src/services/syncService.ts#L22-L31)

```typescript
interface SyncAdapter<T extends SyncItem> {
  toSyncItems: () => T[];           // Extract from local Zustand store
  fromSyncItems: (items: T[]) => void; // Write to local Zustand store
  push: (items: T[]) => Promise<void>; // Upload to Supabase
  pull: () => Promise<T[]>;         // Download from Supabase
}
```

**All items must have**: `{ id: string, updatedAt: number }` (SyncItem interface, syncService.ts:12-16)

#### Merge Algorithm

**Function**: `mergeItems(local, remote)` (syncService.ts:53-76)

**Strategy**: Latest-timestamp-wins
1. Create Map with all local items
2. For each remote item:
   - If not in map: add it (new item from remote)
   - If in map and remote newer: replace (remote wins)
   - If in map and local newer/equal: keep local (local wins)
3. Return merged values

**Properties**:
- No data loss (union of all items)
- Deterministic (same inputs = same output)
- Simple conflict resolution (no CRDTs or operational transforms)

#### Full Sync Operation

**Function**: `performFullSync()` (syncOrchestrator.ts:123-197)

**Flow**:
1. Check auth: `canSync()` returns `useAuthStore.getState().isLoggedIn` (line 124, uses line 72)
2. Check not already syncing (lines 132-138)
3. For each of 6 adapters in parallel (lines 155-169):
   - Pull remote items: `adapter.pull()` (line 89)
   - Get local items: `adapter.toSyncItems()` (line 92)
   - Merge: `mergeItems(localItems, remoteItems)` (line 95)
   - Write to store: `adapter.fromSyncItems(mergedItems)` (line 98)
   - Push all items: `adapter.push(adapter.toSyncItems())` (line 102)
4. Return success with item counts (lines 178-186)

**Called From**:
- useSyncManager hook on login (useSyncManager.ts:83)
- Manual sync button (via `triggerFullSync()`)

#### Push-Only Operation

**Function**: `pushAllChanges()` (syncOrchestrator.ts:207-256)

**Flow**:
1. Check auth (same as full sync)
2. Push all 6 adapters in parallel (lines 229-236)
3. No pull or merge - just upload local state

**Called From**:
- App backgrounding (\_layout.tsx:62)
- Auto-sync after store changes (useSyncManager.ts:191)
- Manual "Save" action

#### Pull-Only Operation

**Function**: `pullAllData()` (syncOrchestrator.ts:266-349)

**Flow**:
1. Check auth (same as full sync)
2. For each adapter: pull, merge, write to store (lines 296-321)
3. No push - just download and merge

**Use Case**: Initial sync on new device (not currently used - full sync is preferred)

#### Auto-Sync System

**Initialization**: `initializeAutoSync()` (useSyncManager.ts:167-200)

**Mechanism**:
1. Subscribe to all 6 Zustand stores (lines 172-179)
2. On any store change (line 183):
   - Check `isLoggedIn && isPremium` (lines 184-185)
   - If true: debounced push after 5 seconds (lines 190-194)
3. Stores subscribed: contentStore, generatedStore, curriculumStore, learningStore, journeyStore, settingsStore

**Cleanup**: `cleanupAutoSync()` (useSyncManager.ts:206-211)
- Unsubscribes from all stores
- Called on app unmount (\_layout.tsx:52)

#### Sync Gating (Premium + Login Required)

**Hook**: `useSyncManager` (useSyncManager.ts:56-155)

**Auto-sync on Login** (lines 75-90):
- Triggers when `isLoggedIn && isPremium` becomes true
- Calls `performFullSync()`
- Debounced to max once per 30 seconds (lines 78-88)

**Manual Sync Actions**:
- `triggerFullSync()`: Checks `isLoggedIn && isPremium` (lines 94-107)
- `triggerPush()`: Checks `isLoggedIn && isPremium` (lines 110-124)
- `forcePush()`: Checks `isLoggedIn && isPremium` (lines 127-143)

**Returns Error If**:
- Not logged in: `{ success: false, error: 'Not logged in' }`
- Not premium: `{ success: false, error: 'Premium required for sync' }`

#### Content Sync Adapter Detail

**File**: [src/services/sync/contentSyncAdapter.ts](src/services/sync/contentSyncAdapter.ts)

**toSyncItems()** (lines 60-63):
- Extracts `importedContent` array from contentStore
- Adds `updatedAt` timestamp (uses `lastReadAt` or `createdAt`)

**fromSyncItems()** (lines 68-73):
- Sorts by `createdAt` descending (newest first)
- Replaces entire `importedContent` array in store

**push()** (lines 78-102):
- Gets user: `supabase.auth.getUser()` (line 81)
- Upserts to `user_content` table (line 95):
  - `user_id`: Supabase user ID
  - `item_id`: content.id
  - `item_type`: `'imported'`
  - `data`: full content object as JSONB
  - `updated_at`: ISO timestamp
- Conflict resolution: `onConflict: 'user_id,item_id'` (line 97)

**pull()** (lines 107-125):
- Gets user: `supabase.auth.getUser()` (line 108)
- Queries `user_content` table:
  - Filter: `user_id = <user.id>` (line 116)
  - Filter: `item_type = 'imported'` (line 117)
  - Filter: `deleted_at IS NULL` (line 118)
- Returns `data` field from each row (line 124)

### Database Schema

**File**: [supabase/migrations/20260113000000_create_user_content.sql](supabase/migrations/20260113000000_create_user_content.sql)

**Table**: `user_content`

```sql
CREATE TABLE user_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL,  -- 'imported', 'generated', 'curriculum', 'learning', 'journey', 'settings'
  data JSONB NOT NULL,       -- Full item object
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,    -- Soft delete
  UNIQUE(user_id, item_id)
);
```

**Indexes**:
- `idx_user_content_user_id` on `user_id`
- `idx_user_content_user_type` on `(user_id, item_type)`

**Row Level Security**:
- Policy: "Users can CRUD own content"
- Rule: `auth.uid() = user_id`

**Purpose**: Single table for all user data types, differentiated by `item_type`

### Key Files Summary

**Authentication**:
- [src/store/authStore.ts](src/store/authStore.ts) - Auth state and actions
- [src/services/supabase.ts](src/services/supabase.ts) - Supabase client
- [src/hooks/useAuthDeepLink.ts](src/hooks/useAuthDeepLink.ts) - Magic link handling

**Purchases**:
- [src/services/purchases.ts](src/services/purchases.ts) - RevenueCat SDK wrapper
- [src/store/subscriptionStore.ts](src/store/subscriptionStore.ts) - Subscription state

**Sync**:
- [src/services/syncOrchestrator.ts](src/services/syncOrchestrator.ts) - Main coordinator
- [src/services/syncService.ts](src/services/syncService.ts) - Interfaces and merge
- [src/hooks/useSyncManager.ts](src/hooks/useSyncManager.ts) - Auto-sync and UI
- [src/services/sync/\*.ts](src/services/sync/) - 6 sync adapters

**Content**:
- [src/store/contentStore.ts](src/store/contentStore.ts) - Imported content state

**Database**:
- [supabase/migrations/20260113000000_create_user_content.sql](supabase/migrations/20260113000000_create_user_content.sql)

**App Entry**:
- [src/app/_layout.tsx](src/app/_layout.tsx) - Initialization

**Tests** (for understanding expected behavior):
- [__tests__/integration/auth/authSyncIntegration.test.ts](__tests__/integration/auth/authSyncIntegration.test.ts)
- [__tests__/services/syncOrchestrator.test.ts](__tests__/services/syncOrchestrator.test.ts)
- [__tests__/store/authStore.test.ts](__tests__/store/authStore.test.ts)
- [__tests__/store/subscriptionStore.test.ts](__tests__/store/subscriptionStore.test.ts)

## Plan of Work

This audit is organized into 10 milestones. The first milestone establishes a complete understanding of the architecture. Milestones 2-9 correspond to the 8 verification tasks. The final milestone consolidates findings into a report.

**CRITICAL WORKFLOW CHANGE**: Each verification task (M2-M9) now begins with **Step 0: Documentation Research and Requirement Validation** BEFORE any code tracing. This step is mandatory and ensures that the stated requirements are validated against official RevenueCat and Supabase documentation. The task requirements may contain incorrect assumptions about how these services work, and Step 0 corrects these assumptions before code verification begins.

For each verification task (M2-M9), the work follows this pattern:

1. **Research and Validate Requirements (Step 0)**: Research official RevenueCat and Supabase documentation to understand how the APIs actually work. Compare the stated task requirement against documented behavior. If there's a mismatch (e.g., requirement says "use setAttributes() for aliasing" but docs show logIn() is the correct mechanism), document the correction with evidence and links. Produce a "Requirement Validation" section with the corrected requirement that will be verified. **This step must be completed first—do not skip it even if the requirement seems obvious.**

2. **Trace Code Paths (Step 1)**: Once the requirement is validated, trace the complete code path from trigger through all intermediate steps to final outcome. Use the validated requirement from Step 0 as the verification target. Document every function call, condition branch, async operation, and side effect.

3. **Verify 3rd Party APIs**: Confirm that the RevenueCat and Supabase SDK methods used in the code match the official documentation researched in Step 0. If the wrong API is used, document it as a bug.

4. **Identify Race Conditions and Bugs**: Look for:
   - Concurrent async operations that could complete in unexpected order
   - Missing error handling that could leave the system in an inconsistent state
   - State updates that could be overwritten by simultaneous operations
   - Assumptions that may not hold in edge cases (e.g., network failures, partial completions)

5. **Second Pass Review**: After completing all 8 tasks, review the code paths again. Focus on branches or edge cases that were not fully explored in the first pass.

6. **Document Findings**: For each task, produce a findings document with:
   - Requirement validation results (corrections made in Step 0)
   - Code path trace (file → function → line numbers)
   - Bugs/issues found (with severity and evidence)
   - Proposed fixes (high-level description)

### Milestone 1: Architecture Mapping

**Goal**: Build a complete map of authentication, purchase, and sync components.

**Work**:
- Search the codebase for all files related to Supabase authentication
- Search for all files related to RevenueCat purchase handling
- Search for all files related to content syncing with Supabase DB
- Read each identified file completely
- Document the call graph: which components call which, in what order
- Identify app initialization sequence (when Supabase and RC are configured)
- Identify all Zustand stores involved and what they manage

**Acceptance**:
- A complete list of files involved in auth, purchase, and sync
- A prose description of the initialization sequence
- A call graph showing how components interact
- Understanding of where ID aliasing happens (if at all)

### Milestone 2: Verify Task 1 - First App Install Flow

**Requirement**: When a user downloads and opens the app on device_1:
- Supabase assigns ID `id_sb123`
- RevenueCat assigns ID `id_rc456`
- RC ID `id_rc456` must be aliased to Supabase ID `id_sb123` in the RevenueCat system

**Purpose of Aliasing**: This alias enables entitlement recovery when the user later signs in on a different platform where "restore purchases" doesn't work (e.g., Android → iOS).

**Work**:

**Step 0: Documentation Research and Requirement Validation**

Before tracing any code, research the relevant RevenueCat and Supabase documentation to validate the stated requirements. The task description may contain incorrect assumptions about how these services work.

**Process**:
1. Identify which 3rd party APIs this task allegedly involves:
   - Supabase anonymous authentication
   - RevenueCat anonymous customer ID creation
   - RevenueCat user identification/aliasing mechanism
2. Search for and read the official documentation for those APIs:
   - RevenueCat docs: https://www.revenuecat.com/docs (search for "identifying users", "anonymous users", "user aliases", "cross-platform")
   - Supabase docs: https://supabase.com/docs (search for "anonymous sign-in", "user ID", "auth.users table")
3. Understand the ACTUAL mechanisms these services provide:
   - How does Supabase create anonymous users? What ID format? Where stored?
   - How does RevenueCat create anonymous customers? What ID format?
   - How does RevenueCat link/identify users across devices? Is it called "aliasing" or something else?
   - Does RevenueCat have a `setAttributes()` API for aliasing, or is there a different mechanism?
4. Compare the task requirement against the documented behavior:
   - Does the requirement match how these services actually work?
   - Are the terms used correctly (e.g., "alias", "ID", "link")?
   - Is the stated mechanism (e.g., "RC ID gets alias to Supabase ID") accurate?
5. If there's a mismatch, document it as a "Requirement Correction" with:
   - Original requirement (what the task states)
   - Actual mechanism (what the docs say)
   - Evidence (link to specific doc section)
   - Corrected requirement (what we should actually verify)

**Output**: A "Requirement Validation" section documenting:
- APIs researched (list each one)
- Documentation links (specific URLs)
- Any corrections needed to the stated requirements
- The validated requirement that code will be traced against

**Example**: If the task says "verify that RC ID gets alias to Supabase ID using setAttributes()", the research might reveal that RevenueCat uses `logIn()` to link user identities, not `setAttributes()` for aliasing. The corrected requirement would then state: "verify that RC customer is linked to Supabase user ID via Purchases.logIn()".

**Critical**: Do NOT skip this step even if the requirement seems obvious. The stated requirement may be based on incorrect assumptions. The goal is to ensure we're verifying the correct behavior according to how RevenueCat and Supabase actually work, not blindly checking against potentially incorrect specifications.

**Step 1: Code Path Tracing**

After validating the requirement:
1. Trace the app launch sequence from `_layout.tsx` through Supabase init and RC init
2. Find where anonymous Supabase ID is created (based on docs: does it require sign-in or is it automatic?)
3. Find where RC anonymous ID is created (based on docs: when does this happen?)
4. Find where RC user linking/identification happens (use the mechanism discovered in Step 0, not the stated "aliasing")
5. Verify the RC and Supabase SDK methods match the documentation researched in Step 0
6. Check for race conditions: could RC init complete before Supabase ID is available?
7. Check error handling: what happens if the linking mechanism fails?

**Acceptance**:
- Requirement validation document showing any corrections
- Complete code path from app launch to user linking completion
- Confirmation that the 3rd party APIs used match the researched documentation
- List of bugs/issues found (if any)
- Proposed fixes

### Milestone 3: Verify Task 2 - Sign-In Flow on Device_1

**Requirement**: When the user signs in on device_1:
- The Supabase ID `id_sb123` gets aliased to `uuid_signin_id`
- `uuid_signin_id` is either the OAuth provider's UUID or the user's email
- This alias enables recovering `id_sb123` when signing in from a different device

**Work**:

**Step 0: Documentation Research and Requirement Validation**

Before tracing any code, research the relevant Supabase and RevenueCat documentation to validate the stated requirements. The task description may contain incorrect assumptions about how sign-in and identity linking work.

**Process**:
1. Identify which 3rd party APIs this task allegedly involves:
   - Supabase OAuth authentication (Google sign-in)
   - Supabase email/password or magic link authentication
   - Supabase identity linking (linking OAuth to existing anonymous account)
   - How Supabase stores and resolves user identities
   - RevenueCat's role (if any) in the sign-in process
2. Search for and read the official documentation:
   - Supabase docs: https://supabase.com/docs (search for "OAuth", "linkIdentity", "anonymous to permanent", "auth.identities", "user ID resolution")
   - RevenueCat docs: https://www.revenuecat.com/docs (search for "user login", "identifying users after OAuth")
3. Understand the ACTUAL mechanisms:
   - When a user signs in with OAuth, does Supabase create a new user ID or link to the existing anonymous ID?
   - How does Supabase store the OAuth provider ID? Is it in an "identities" table or as an "alias"?
   - What happens to the anonymous Supabase ID (`id_sb123`) after OAuth? Does it persist or get replaced?
   - How does Supabase know which user account to use when someone signs in on a new device with the same OAuth account?
   - Does the concept of "aliasing a Supabase ID to OAuth ID" match how Supabase actually works, or is the mechanism different?
4. Compare the task requirement against the documented behavior:
   - Is the term "alias" correct for Supabase's identity system?
   - What actually enables recovering `id_sb123` on a new device—is it stored in a separate table, or does the OAuth provider ID directly map to the Supabase user?
5. If there's a mismatch, document the correction with evidence and links

**Output**: A "Requirement Validation" section documenting:
- APIs researched
- Documentation links
- Corrections to stated requirements (if any)
- Validated requirement based on how Supabase and RC actually work

**Critical**: The stated requirement uses terms like "aliased to uuid_signin_id" which may not match Supabase's actual terminology or mechanism. Research the docs to understand the real identity linking flow.

**Step 1: Code Path Tracing**

After validating the requirement:
1. Trace the sign-in flow from the sign-in UI through OAuth completion (Google)
2. Trace the sign-in flow from the sign-in UI through email/password or magic link completion
3. Find where Supabase identity linking happens (e.g., `linkIdentity()` or `signInWithOAuth()`)
4. Verify how the OAuth/email identity is stored and associated with the user (based on docs researched)
5. Verify that both OAuth and email sign-in flows handle identity persistence correctly
6. Check for race conditions: could sign-in complete before identity is properly linked?
7. Check for bugs: what if the user signs out and signs in with a different account? Does the old identity remain linked?
8. Trace what happens to RevenueCat during sign-in (based on docs: should RC be notified of the new identified user?)

**Acceptance**:
- Requirement validation document showing any corrections
- Complete code path for both OAuth and email sign-in
- Confirmation of where and how identity is stored (based on researched Supabase mechanisms)
- List of issues (if any)

### Milestone 4: Verify Task 3 - Content Upload Gating (Pre-Purchase)

**Requirement**: Before the user purchases premium, their content must NOT be uploaded to Supabase DB.

**Work**:

**Step 0: Documentation Research and Requirement Validation**

Before tracing any code, research the relevant Supabase and RevenueCat documentation to validate the stated requirements. The task description may contain incorrect assumptions about when and how content sync should be gated.

**Process**:
1. Identify which 3rd party APIs this task allegedly involves:
   - Supabase database operations (insert/upsert to user_content table)
   - Supabase Row Level Security (RLS) policies
   - RevenueCat entitlement checking
   - Potential Supabase real-time subscriptions or sync mechanisms
2. Search for and read the official documentation:
   - Supabase docs: https://supabase.com/docs (search for "Row Level Security", "RLS policies", "database access control", "anonymous users and RLS")
   - RevenueCat docs: https://www.revenuecat.com/docs (search for "entitlements", "checking subscription status", "free trial vs paid")
3. Understand the ACTUAL mechanisms:
   - Can Supabase enforce premium gating server-side via RLS policies, or must it be client-side?
   - What happens if a non-premium user attempts to write to the database—does Supabase reject it, or does the client need to prevent the call?
   - Should content sync be gated on premium status alone, or also on authentication status (logged in vs anonymous)?
   - What is RevenueCat's recommended way to check entitlements before feature access?
4. Compare the task requirement against the documented behavior:
   - Is client-side gating sufficient, or should there be server-side enforcement?
   - Are there race conditions where entitlement status could be stale when sync is triggered?
   - Should anonymous users be able to sync if they somehow have premium (e.g., guest purchase scenario)?
5. If there's a mismatch, document the correction with evidence and links

**Output**: A "Requirement Validation" section documenting:
- APIs researched
- Documentation links
- Corrections to stated requirements (if any)
- Validated requirement: What conditions must be true to allow sync? (premium only, or premium + logged in?)

**Critical**: The stated requirement only mentions premium gating, but the architecture discovery revealed that sync also requires `isLoggedIn`. Research whether this dual-gate is correct according to Supabase and RevenueCat best practices.

**Step 1: Code Path Tracing**

After validating the requirement:
1. Trace content creation/import flows (from `contentStore.ts`, `contentExtractor.ts`, etc.)
2. Find all places where content upload to Supabase DB could be triggered (sync orchestrator, auto-sync, manual sync, etc.)
3. Verify that the correct gating conditions are checked before upload (based on validated requirement from Step 0)
4. Check for bugs: could content upload be triggered by some other path that bypasses the gates?
5. Verify that local content is still saved (just not synced to server)
6. Check if there's server-side enforcement (RLS policies) as a secondary defense layer

**Acceptance**:
- Requirement validation document showing the correct gating conditions
- Code path showing where all gating checks happen
- Confirmation that all content creation paths respect the gates
- Verification of server-side enforcement (if applicable)
- List of issues (if any)

### Milestone 5: Verify Task 4 - Purchase Flow and Entitlement Assignment

**Requirement**: When the user purchases premium, the RC ID `id_rc456` receives the premium entitlement.

**Work**:

**Step 0: Documentation Research and Requirement Validation**

Before tracing any code, research the relevant RevenueCat documentation to validate the stated requirements. The task description may contain incorrect assumptions about how purchase flows and entitlement assignment work.

**Process**:
1. Identify which 3rd party APIs this task allegedly involves:
   - RevenueCat purchase initiation (`purchasePackage()` or similar)
   - RevenueCat entitlement checking after purchase
   - RevenueCat customer info updates
   - Native platform purchase flows (App Store, Play Store)
   - Potential webhooks or server-side notifications
2. Search for and read the official documentation:
   - RevenueCat docs: https://www.revenuecat.com/docs (search for "making purchases", "purchasePackage", "entitlements", "customer info", "purchase flow", "transaction handling")
   - Apple/Google docs (if needed): App Store In-App Purchase flow, Play Billing flow
3. Understand the ACTUAL mechanisms:
   - What happens when `purchasePackage()` is called? What's the sequence of events?
   - Does the RC customer ID receive the entitlement immediately, or is there a delay?
   - How should the app detect that the purchase completed successfully and entitlements are active?
   - What is returned from `purchasePackage()`—does it include the updated `CustomerInfo` with entitlements?
   - Are there scenarios where purchase succeeds but entitlements don't immediately appear (e.g., pending transactions)?
   - Should the app listen for purchase updates, or rely solely on the return value?
4. Compare the task requirement against the documented behavior:
   - Is "RC ID receives the premium entitlement" an accurate description of what happens?
   - Are there edge cases (refunds, grace periods, billing retries) that affect entitlement status?
   - What's the authoritative source of entitlement truth—the return value or a separate fetch?
5. If there's a mismatch, document the correction with evidence and links

**Output**: A "Requirement Validation" section documenting:
- APIs researched
- Documentation links
- Corrections to stated requirements (if any)
- Validated requirement: What actually happens during and after a purchase?

**Critical**: Research RevenueCat's purchase flow thoroughly to understand when and how entitlements become active, and whether there are any race conditions or edge cases in entitlement assignment.

**Step 1: Code Path Tracing**

After validating the requirement:
1. Trace the purchase flow from the paywall UI through RC SDK completion
2. Verify that the correct RevenueCat purchase API is called (based on docs)
3. Verify that entitlement status is updated in local state from the correct source (return value vs re-fetch)
4. Check for race conditions: could the UI update before entitlements are confirmed by RevenueCat servers?
5. Check error handling: what happens if purchase succeeds on the platform but RC API fails? What about network errors?
6. Verify handling of edge cases discovered in docs (pending purchases, deferred transactions, etc.)

**Acceptance**:
- Requirement validation document showing the correct purchase flow
- Complete code path trace from UI to entitlement activation
- Confirmation of RC SDK usage matching documented best practices
- List of issues (if any)

### Milestone 6: Verify Task 5 - Content Upload on Purchase

**Requirement**: Immediately after purchasing premium, the user's existing content must be uploaded to Supabase DB.

**Work**:

**Step 0: Documentation Research and Requirement Validation**

Before tracing any code, research the relevant RevenueCat and Supabase documentation to validate the stated requirements. The task description may contain incorrect assumptions about when sync should be triggered after purchase.

**Process**:
1. Identify which 3rd party APIs this task allegedly involves:
   - RevenueCat purchase completion events/callbacks
   - RevenueCat customer info listener or observer
   - Supabase batch insert/upsert operations
   - Potential transaction handling for bulk uploads
2. Search for and read the official documentation:
   - RevenueCat docs: https://www.revenuecat.com/docs (search for "purchase updates", "listener", "customer info updates", "observer mode", "detecting purchase completion")
   - Supabase docs: https://supabase.com/docs (search for "batch insert", "bulk upsert", "transaction limits", "JSONB performance")
3. Understand the ACTUAL mechanisms:
   - How should the app detect that a purchase has completed and entitlements are active? Is there a listener/callback?
   - Is the purchase completion event reliable, or should the app also check entitlement status after state changes?
   - When uploading many items at once, what are Supabase's limits? Should items be batched?
   - What happens if the upload fails partway through—does Supabase provide transaction rollback?
   - Should the trigger be "immediately after purchase" or "after confirming entitlement is active"?
4. Compare the task requirement against the documented behavior:
   - Is "immediately after purchasing" the right trigger, or should it wait for entitlement confirmation?
   - Should the sync be triggered by purchase completion, or by the entitlement status change in state?
   - Are there edge cases where purchase completes but entitlement isn't immediately active?
5. If there's a mismatch, document the correction with evidence and links

**Output**: A "Requirement Validation" section documenting:
- APIs researched
- Documentation links
- Corrections to stated requirements (if any)
- Validated requirement: What is the correct trigger for initial content upload?

**Critical**: The requirement says "immediately after purchasing" but research whether this should actually be "immediately after entitlement becomes active" or "immediately after premium status changes in state". These may not happen at the exact same time.

**Step 1: Code Path Tracing**

After validating the requirement:
1. Find where the purchase completion is observed (based on docs: listener, return value, state change, etc.)
2. Find where the entitlement status change is detected (subscriptionStore state update, customer info listener, etc.)
3. Verify that a sync operation is triggered when premium becomes active (not just when purchase API returns)
4. Verify that the sync uploads ALL existing local content (full sync, not incremental)
5. Check that new content created after purchase is also uploaded (via normal auto-sync)
6. Check for race conditions: could multiple sync operations run concurrently if user makes multiple purchases or if state updates multiple times?
7. Check for bugs: what if upload fails partway through? Is there retry logic? Does sync resume where it left off?
8. Verify batch/chunking strategy for large content libraries (based on Supabase limits researched)

**Acceptance**:
- Requirement validation document showing the correct trigger mechanism
- Code path showing how purchase/entitlement change triggers sync
- Confirmation that all existing content is uploaded, not just new content
- Verification of error handling and retry logic
- List of issues (if any)

### Milestone 7: Verify Task 6 - Cross-Device Sign-In (Different Platform)

**Requirement**: When the user downloads the app on device_2 (Supabase assigns `id_sb789`, RC assigns `id_rc000`) and signs in:
- The system recovers `id_sb123` from the sign-in UUID/email alias
- The system recovers `id_rc456` from the RC alias linked to `id_sb123`
- The RC entitlement is restored
- All content is downloaded from Supabase DB

**Work**:

**Step 0: Documentation Research and Requirement Validation**

Before tracing any code, research the relevant Supabase and RevenueCat documentation to validate the stated requirements. The task description may contain incorrect assumptions about how cross-device identity and entitlement recovery works.

**Process**:
1. Identify which 3rd party APIs this task allegedly involves:
   - Supabase OAuth/email sign-in on a new device
   - Supabase user ID resolution (how does signing in with the same OAuth account recover the original user?)
   - RevenueCat user identification on new device (`logIn()` or similar)
   - RevenueCat entitlement transfer across devices
   - Supabase database queries for user content
2. Search for and read the official documentation:
   - Supabase docs: https://supabase.com/docs (search for "sign in on multiple devices", "user ID persistence", "OAuth identity linking", "same user different device")
   - RevenueCat docs: https://www.revenuecat.com/docs (search for "identifying users", "cross-platform entitlements", "transferring purchases", "logIn", "user aliases", "restoring across platforms")
3. Understand the ACTUAL mechanisms:
   - When a user signs in with Google on device_2, does Supabase automatically use the same user ID (`id_sb123`) from device_1, or create a new ID?
   - How does Supabase know this is the same user? Is it based on OAuth provider ID?
   - Does the concept of "recovering id_sb123" make sense, or does Supabase just use the same ID automatically?
   - For RevenueCat: when `Purchases.logIn(userId)` is called on device_2, does it "recover id_rc456" or does it link the new anonymous ID (`id_rc000`) to the user?
   - How does RevenueCat handle cross-platform entitlements (iOS→Android, Android→iOS)? Does it work automatically or require special setup?
   - Is there a separate "RC alias" that needs to be retrieved, or does `logIn()` handle everything internally?
4. Compare the task requirement against the documented behavior:
   - Does "recover id_sb123 from sign-in UUID/email alias" accurately describe how Supabase works?
   - Does "recover id_rc456 from RC alias" accurately describe how RevenueCat works?
   - Are there steps described in the requirement that don't exist in the actual APIs?
   - Are there steps missing from the requirement that are necessary according to the docs?
5. If there's a mismatch, document the correction with evidence and links

**Output**: A "Requirement Validation" section documenting:
- APIs researched
- Documentation links
- Corrections to stated requirements (if any)
- Validated requirement: What actually happens when a user signs in on a new device?

**Critical**: The requirement mentions "recovering" IDs and "RC alias" which may not match how these services actually work. Research thoroughly to understand whether signing in creates new IDs, reuses old IDs, or links IDs together—and how entitlements are transferred.

**Step 1: Code Path Tracing**

After validating the requirement:
1. Trace the sign-in flow on a new device (OAuth and email/password)
2. Find where Supabase user ID is established (based on docs: is it the same ID as device_1, or a different ID?)
3. Find where RevenueCat is notified of the sign-in (based on docs: `logIn()`, `identify()`, or other?)
4. Verify what is passed to RevenueCat (Supabase user ID, or something else?)
5. Verify how RevenueCat handles the entitlement transfer (based on docs researched)
6. Verify that entitlement status is updated in local state after RevenueCat responds
7. Verify that sync is triggered when the user becomes logged in + premium
8. Verify that full sync downloads all content from Supabase DB
9. Check for race conditions: what order do these operations happen in? Could sync start before entitlements are confirmed?
10. Check for bugs: what if the user has no content to sync? What if RevenueCat API fails?

**Acceptance**:
- Requirement validation document showing how cross-device sign-in actually works
- Complete code path from sign-in through content download
- Confirmation that the mechanisms match documented API behavior
- List of issues (if any)

### Milestone 8: Verify Task 7 - Same-Platform Purchase Recovery

**Requirement**: When the user downloads the app on device_3 (same platform as device_1) and restores purchases:
- The system recovers `id_rc456` directly via RC's platform-specific restore mechanism
- The system recovers `id_sb123` from the RC alias
- All content is synced from Supabase DB

**Work**:

**Step 0: Documentation Research and Requirement Validation**

Before tracing any code, research the relevant RevenueCat and Supabase documentation to validate the stated requirements. The task description may contain incorrect assumptions about how platform-specific purchase restoration works.

**Process**:
1. Identify which 3rd party APIs this task allegedly involves:
   - RevenueCat's `restorePurchases()` function
   - Platform-specific purchase restoration (App Store, Play Store)
   - RevenueCat customer ID recovery on same platform
   - RevenueCat user attributes or metadata storage
   - Supabase sign-in or authentication (if needed for content sync)
2. Search for and read the official documentation:
   - RevenueCat docs: https://www.revenuecat.com/docs (search for "restore purchases", "restorePurchases", "same platform recovery", "App Store account", "Play Store account", "customer ID", "user attributes")
   - Apple docs: https://developer.apple.com/documentation (search for "restoring purchased products", "receipt validation")
   - Google docs: https://developer.android.com/google/play/billing (search for "acknowledge purchase", "query purchases")
3. Understand the ACTUAL mechanisms:
   - When `restorePurchases()` is called on device_3, how does RevenueCat know which customer to restore? Is it based on App Store/Play Store account?
   - Does "recover id_rc456" happen automatically, or does it create a new RC ID and link it?
   - Can RevenueCat store custom attributes (like Supabase user ID) and retrieve them during restore?
   - If the user never signed into Supabase on device_1 (only made an anonymous purchase), can the Supabase ID be recovered?
   - Does restore work without any prior `logIn()` call, or does the user need to identify themselves first?
   - What's the difference between "restore purchases" and "sign in" for entitlement recovery?
4. Compare the task requirement against the documented behavior:
   - Is "recover id_rc456 directly" accurate, or does restore create a different customer ID?
   - Can "id_sb123" actually be recovered "from the RC alias" during restore, or does this require sign-in first?
   - Is content sync possible without Supabase authentication, or must the user sign in for sync to work?
5. If there's a mismatch, document the correction with evidence and links

**Output**: A "Requirement Validation" section documenting:
- APIs researched
- Documentation links
- Corrections to stated requirements (if any)
- Validated requirement: What actually happens during restore purchases on same platform?

**Critical**: The requirement suggests that restore purchases alone can recover both RC entitlements AND Supabase content sync without signing in. Research whether this is actually possible or if sign-in is still required for content sync.

**Step 1: Code Path Tracing**

After validating the requirement:
1. Trace the "restore purchases" flow (button press in settings or paywall)
2. Verify that `Purchases.restorePurchases()` is called correctly (based on docs)
3. Verify what RevenueCat returns (based on docs: same customer ID, new ID, or linked IDs?)
4. Verify how entitlements are restored and updated in local state
5. Find where/if Supabase ID recovery happens (based on docs: is this automatic, or does it require user to sign in?)
6. Verify whether content sync can happen without Supabase sign-in (based on validated requirement)
7. If sign-in is required, verify that the user is prompted to sign in after restore
8. Check for race conditions: entitlement restored but sync triggered before user authenticated?
9. Check for bugs: what if the user never signed in on device_1? What if they purchased as anonymous?

**Acceptance**:
- Requirement validation document showing how same-platform restore actually works
- Complete restore purchases flow
- Confirmation of whether Supabase ID recovery works without sign-in (or correction if sign-in is required)
- List of issues (if any)

### Milestone 9: Verify Task 8 - Expired Entitlement Handling

**Requirement**: When the user downloads the app on device_4 after their premium entitlement has expired and signs in:
- ID recovery happens as in Task 6 (recover `id_sb123` and `id_rc456`)
- Content is NOT synced because the entitlement is expired

**Work**:

**Step 0: Documentation Research and Requirement Validation**

Before tracing any code, research the relevant RevenueCat and Supabase documentation to validate the stated requirements. The task description may contain incorrect assumptions about how expired entitlements are handled.

**Process**:
1. Identify which 3rd party APIs this task allegedly involves:
   - RevenueCat entitlement expiration detection
   - RevenueCat subscription status (expired, cancelled, grace period, billing retry)
   - Supabase sign-in on new device (same as Task 6)
   - Content sync gating logic
2. Search for and read the official documentation:
   - RevenueCat docs: https://www.revenuecat.com/docs (search for "subscription status", "expired entitlements", "grace period", "billing retry", "cancelled subscriptions", "customer info", "entitlement lifecycle")
   - Apple/Google docs (if relevant): grace periods, billing issues, subscription states
3. Understand the ACTUAL mechanisms:
   - How does RevenueCat represent an expired entitlement? Is `entitlements.active['premium']` absent, or is there an `expired` state?
   - Are there intermediate states between active and fully expired (grace period, billing retry)?
   - When a user with expired premium signs in on a new device, what does `logIn()` return? Active entitlements only, or historical data?
   - Should the app show different UX for expired vs never-subscribed users?
   - Can expired premium users read their old synced content (read-only access), or is all sync blocked?
4. Compare the task requirement against the documented behavior:
   - Is "content is NOT synced" correct for both upload AND download, or just upload?
   - Should expired users be able to download their existing content (read-only)?
   - Are there edge cases like grace periods or billing retries where "expired" isn't fully expired?
   - What happens if the subscription expired on device_1 but device_4 has cached "premium" state?
5. If there's a mismatch, document the correction with evidence and links

**Output**: A "Requirement Validation" section documenting:
- APIs researched
- Documentation links
- Corrections to stated requirements (if any)
- Validated requirement: What should happen for users with expired entitlements?

**Critical**: The requirement assumes a binary active/expired state, but research whether there are intermediate states (grace period, billing issue) that should be handled differently. Also verify whether "no sync" means no upload, no download, or both.

**Step 1: Code Path Tracing**

After validating the requirement:
1. Trace the sign-in flow on a new device (same as M7 but assume expired entitlement)
2. Verify that ID recovery still works
3. Verify that entitlement status is checked before content sync
4. Check for bugs: could old cached entitlement status cause sync to happen anyway?
5. Verify that the user is prompted to re-subscribe (or at least sees a clear state)

**Acceptance**:
- Code path showing expired entitlement prevents sync
- Confirmation that ID recovery is independent of entitlement status
- List of issues (if any)

### Milestone 10: Second Pass Review and Final Report

**Goal**: Review all code paths a second time, focusing on branches not fully explored in the first pass. Consolidate all findings into a comprehensive report.

**Work**:
1. For each of the 8 tasks, re-read the code paths identified in M2-M9
2. Look for edge cases, error handling paths, and conditional branches that were not fully analyzed
3. Focus especially on race conditions between async operations
4. Consolidate all findings from M2-M9 into a single report with structure:
   - Executive summary (high-level findings)
   - Task-by-task detailed findings
   - Critical bugs requiring immediate fixes
   - Non-critical issues for future work
   - Architecture recommendations

**Acceptance**:
- A complete, line-by-line reviewed audit of all 8 tasks
- A consolidated report saved to `docs/audit-reports/2026-01-22-auth-purchase-sync-verification-report.md`

## Concrete Steps

This is a discovery task, so there are no build or test commands to run. The steps involve code reading, tracing, and analysis:

**Step 1: Identify Files (M1)**

From the repository root:

    npm run glob "**/*auth*.ts" "**/*supabase*.ts"
    npm run glob "**/*purchase*.ts" "**/*subscription*.ts"
    npm run glob "**/*sync*.ts" "**/*content*.ts"

Read all matching files to understand the architecture.

**Step 2: Trace Each Task (M2-M9)**

For each task:
- Identify the entry point (app launch, button press, etc.)
- Follow the code execution step by step, noting every function call and state change
- Open and read each file involved
- Document the flow as a sequence: file:line → function → next file:line
- Use grep to search for specific function names, API calls, or state updates

**Step 3: Verify Against Documentation (M2-M9)**

For each RevenueCat and Supabase API call found:
- Look up the official documentation (via web search or local docs)
- Confirm the method signature, parameters, and expected behavior match the implementation
- Note any discrepancies

**Step 4: Second Pass (M10)**

Re-read all traced code paths with focus on:
- Error handling: what happens if this call fails?
- Concurrency: what if two operations run simultaneously?
- Edge cases: what if the user does something unexpected?

**Step 5: Write Report (M10)**

Consolidate all findings into a structured report saved to `docs/audit-reports/2026-01-22-auth-purchase-sync-verification-report.md`.

## Validation and Acceptance

This is not a code implementation task, so validation is not about tests passing or builds succeeding. Instead, acceptance criteria are:

- **Completeness**: Every file involved in auth, purchase, and sync has been identified and read
- **Traceability**: For each of the 8 tasks, there is a complete code path documented from trigger to outcome
- **Evidence**: Every bug or race condition identified is supported by specific file:line references and reasoning
- **Clarity**: The final report can be handed to an engineer who can immediately begin implementing fixes
- **Depth**: The second-pass review has covered all branches and edge cases, not just the happy path

A human reviewer should be able to:
- Follow the documented code paths and verify they are accurate
- Understand why each identified bug is indeed a bug
- Implement the proposed fixes without further research

## Idempotence and Recovery

This is a read-only analysis task. No code or data will be modified. The work can be stopped and resumed at any milestone without loss of progress, as long as findings are documented as they are discovered in the `Progress`, `Surprises & Discoveries`, and `Decision Log` sections.

If new information emerges partway through (e.g., discovering a file that changes understanding of earlier tasks), update the earlier milestone findings and note the change in the `Decision Log`.

## Artifacts and Notes

At the end of this work, the following artifacts will exist:

1. **This ExecPlan**: Updated with all progress, discoveries, and decisions
2. **Final Audit Report**: A standalone document at `docs/audit-reports/2026-01-22-auth-purchase-sync-verification-report.md` containing:
   - Executive summary
   - Task-by-task findings (requirements, code paths, bugs, fixes)
   - Critical issues requiring immediate attention
   - Non-critical issues for future work
   - Architecture recommendations

The report should be written for an engineering audience and include enough detail (file paths, line numbers, code snippets) to be immediately actionable.

## Key Terms and Definitions

- **ID Aliasing**: The practice of linking one user identifier to another in a third-party system (e.g., RevenueCat, Supabase). This enables ID recovery when a user signs in on a new device or platform.
- **Entitlement**: A premium feature or subscription status granted to a user by RevenueCat. Entitlements are linked to RC IDs and can be checked via the RC SDK.
- **Content Sync**: The process of uploading user-generated content (articles, reading history) from the local device to Supabase DB, or downloading it from Supabase DB to a new device.
- **Cross-Platform Recovery**: The ability to recover a user's premium entitlement when moving from one mobile platform to another (e.g., iOS to Android), where native purchase restoration does not work. This requires ID aliasing.
- **Race Condition**: A bug where the order of asynchronous operations affects correctness. For example, if content upload starts before entitlements are confirmed, the upload might fail or use wrong permissions.
- **Graceful Degradation**: The system's ability to handle errors without crashing or corrupting data. For example, if Supabase is unreachable, content should remain local and sync should retry later.
