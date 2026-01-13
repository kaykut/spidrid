# Implement Authentication and Multi-Device Sync for Premium Users

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md at the repository root.


## Purpose / Big Picture

After this change, the Spidrid speed reading app will have two new capabilities. First, all API calls to Supabase Edge Functions will be secured with JWT authentication, preventing unauthorized access to billable services like OpenAI Whisper transcription. Second, premium subscribers will have the option to sign in with Google or email magic link to synchronize their content, reading progress, certificates, and settings across multiple devices.

From a user's perspective, the experience is as follows. A new user downloads the app and begins using it immediately without any signup flow. The app silently creates an anonymous Supabase session in the background, which provides JWT tokens for authenticating API requests. The user notices nothing different—transcription works, articles generate, everything functions as before. However, behind the scenes, API endpoints now reject requests without valid tokens, protecting the developer's OpenAI and Google API quotas from abuse.

When a user purchases a premium subscription and wants to use the app on multiple devices, they navigate to the Journey/Profile screen and tap "Sync Across Devices." This option only appears for premium subscribers. The user chooses to sign in with Google or receives an email magic link. Upon successful authentication, their anonymous account "upgrades" to a real account while preserving all existing data. Any content, progress, or certificates from other devices signed into the same account merge with the local data. From then on, changes synchronize automatically across all devices.

To verify the security improvement works, attempt to call the transcribe Edge Function using curl without authentication—the request should return a 401 Unauthorized error. To verify the sync feature works, create content on Device A, sign in with the same account on Device B, and observe that Device B shows the merged content from both devices.


## Progress

### Milestone 1: Supabase SDK Installation and Client Configuration
- [x] (2026-01-13 00:01) Run npm install @supabase/supabase-js
- [x] (2026-01-13 00:02) Create src/services/supabase.ts with createClient configuration
- [x] (2026-01-13 00:02) Add Supabase mock to jest.setup.js for testing
- [x] (2026-01-13 00:02) Create __tests__/services/supabase.test.ts with TDD approach
- [x] (2026-01-13 00:03) Verify tests pass, typecheck passes

### Milestone 2: Anonymous Authentication Store
- [x] (2026-01-13 00:10) Create __tests__/store/authStore.test.ts with 8 test cases (TDD)
- [x] (2026-01-13 00:11) Create src/store/authStore.ts with AuthState interface
- [x] (2026-01-13 00:11) Implement initialize() action with signInAnonymously
- [x] (2026-01-13 00:11) Implement getAccessToken() action
- [x] (2026-01-13 00:12) Verify all 8 tests pass, typecheck passes, lint passes

### Milestone 3: App Initialization Integration
- [ ] Enable Anonymous Sign-Ins in Supabase dashboard (MANUAL: user must enable at https://supabase.com/dashboard)
- [x] (2026-01-13 00:15) Update src/app/_layout.tsx to import useAuthStore
- [x] (2026-01-13 00:15) Add initializeAuth() call in useEffect alongside subscription init
- [x] (2026-01-13 00:16) Verify typecheck passes, lint passes

### Milestone 4: Secure API Calls with JWT
- [x] (2026-01-13 00:20) Update whisperService.test.ts with authStore mock (TDD)
- [x] (2026-01-13 00:20) Add test for Authorization header with Bearer token
- [x] (2026-01-13 00:20) Add test for returning error when no token available
- [x] (2026-01-13 00:21) Update src/services/whisperService.ts - import authStore, add getAccessToken, add Auth header
- [x] (2026-01-13 00:22) Remove debug console.log statements from whisperService.ts (kept console.error)
- [x] (2026-01-13 00:22) Remove debug console.log statements from useWhisperRecording.ts (kept console.error)
- [x] (2026-01-13 00:23) Verify all 31 tests pass, typecheck passes, lint passes

### Milestone 5: Edge Function Security Enforcement
- [x] (2026-01-13 00:25) Re-deploy transcribe function without --no-verify-jwt flag (npx supabase functions deploy transcribe)
- [x] (2026-01-13 00:25) Test: curl without auth returns 401 (confirmed: {"code":401,"message":"Missing authorization header"})
- [ ] Test: app transcription still works (has valid JWT) - requires Anonymous Sign-Ins enabled in dashboard
- [x] (2026-01-13 00:26) Security verification documented in Progress section

### Milestone 6: Database Schema Creation
- [x] (2026-01-13 00:28) Create supabase/migrations/20260113000000_create_user_content.sql
- [x] (2026-01-13 00:28) Create supabase/migrations/20260113000001_create_user_progress.sql
- [x] (2026-01-13 00:28) Create supabase/migrations/20260113000002_create_user_certificates.sql
- [x] (2026-01-13 00:28) Create supabase/migrations/20260113000003_create_user_settings.sql
- [x] (2026-01-13 00:28) Create supabase/migrations/20260113000004_create_user_journey.sql
- [x] (2026-01-13 00:29) Run migrations with npx supabase db push (5 migrations applied)
- [ ] Verify tables exist in Supabase dashboard (manual verification)

### Milestone 7: Row Level Security Policies
- [x] (2026-01-13 00:28) Add RLS policy for user_content table (included in migration)
- [x] (2026-01-13 00:28) Add RLS policy for user_progress table (included in migration)
- [x] (2026-01-13 00:28) Add RLS policy for user_certificates table (included in migration)
- [x] (2026-01-13 00:28) Add RLS policy for user_settings table (included in migration)
- [x] (2026-01-13 00:28) Add RLS policy for user_journey table (included in migration)
- [ ] Test: anonymous user can insert own data (requires dashboard setup)
- [ ] Test: anonymous user cannot read other user's data (requires dashboard setup)

### Milestone 8: OAuth Provider Configuration
- [ ] Enable Google OAuth in Supabase dashboard
- [ ] Configure Google Cloud Console OAuth credentials
- [ ] Enable Email/Magic Link in Supabase dashboard
- [ ] Configure email templates for magic link
- [ ] Test: Google OAuth consent screen appears
- [ ] Test: Magic link email sends successfully

### Milestone 9: Auth Store Real Authentication Methods
- [x] (2026-01-13 00:35) Add signInWithGoogle() method using linkIdentity
- [x] (2026-01-13 00:35) Add signInWithMagicLink(email) method using signInWithOtp (changed from linkIdentity due to API constraints)
- [x] (2026-01-13 00:35) Add signOut() method that reverts to anonymous
- [x] (2026-01-13 00:36) Add onAuthStateChange listener for session updates
- [x] (2026-01-13 00:36) Update isAnonymous and isLoggedIn based on session
- [x] (2026-01-13 00:35) Add unit tests for new auth methods (13 tests pass)

### Milestone 10: Deep Link Handling for Magic Link
- [x] (2026-01-13 00:38) Configure URL scheme in app.config.js (already configured as 'spidrid')
- [x] (2026-01-13 00:38) Create src/hooks/useAuthDeepLink.ts
- [x] (2026-01-13 00:38) Handle magic link callback URL (extracts tokens from URL hash)
- [x] (2026-01-13 00:38) Complete authentication flow on deep link (calls setSession)
- [ ] Test: clicking magic link opens app and signs in (requires OAuth dashboard config)

### Milestone 11: AuthModal Component
- [x] (2026-01-13 00:42) Create src/components/auth/AuthModal.tsx
- [x] (2026-01-13 00:42) Add "Continue with Google" button
- [x] (2026-01-13 00:42) Add "Continue with Email" section with input
- [x] (2026-01-13 00:42) Add loading and error states
- [x] (2026-01-13 00:42) Add success callback prop
- [x] (2026-01-13 00:42) Style according to design system (10 tests pass)

### Milestone 12: Journey Profile Sync Section
- [x] (2026-01-13 00:48) Update src/app/journey-profile.tsx imports (AuthModal, useAuthStore)
- [x] (2026-01-13 00:48) Add "Sync Across Devices" section after Subscription section
- [x] (2026-01-13 00:48) Show section only when isPremium is true
- [x] (2026-01-13 00:48) Show "Sign In" state when isLoggedIn is false
- [x] (2026-01-13 00:48) Show "Signed In as..." state when isLoggedIn is true
- [x] (2026-01-13 00:48) Add "Sign Out" button for logged-in users
- [ ] Test: section hidden for free users (requires manual testing)
- [ ] Test: section visible for premium users (requires manual testing)

### Milestone 13: Sync Service Core Infrastructure
- [x] (2026-01-13 00:52) Create src/services/syncService.ts
- [x] (2026-01-13 00:52) Define SyncItem interface with id and updatedAt
- [x] (2026-01-13 00:52) Define SyncAdapter interface for store adapters
- [x] (2026-01-13 00:52) Implement mergeItems<T> utility function
- [x] (2026-01-13 00:53) Add unit tests for mergeItems covering all edge cases (17 tests, 100% coverage)
- [x] (2026-01-13 00:53) Test: merge with no overlap returns union
- [x] (2026-01-13 00:53) Test: merge with conflict keeps newer timestamp

### Milestone 14: Content Store Sync Adapter
- [ ] Create src/services/sync/contentSyncAdapter.ts
- [ ] Implement toSyncItems() to extract from contentStore
- [ ] Implement fromSyncItems() to write back to contentStore
- [ ] Implement push() to upsert to user_content table
- [ ] Implement pull() to fetch from user_content table
- [ ] Add item_type='imported' filter
- [ ] Test: local content round-trips through adapter

### Milestone 15: Generated Store Sync Adapter
- [ ] Create src/services/sync/generatedSyncAdapter.ts
- [ ] Implement adapter methods for generatedStore
- [ ] Add item_type='generated' filter
- [ ] Test: generated articles sync correctly

### Milestone 16: Curriculum Store Sync Adapter
- [ ] Create src/services/sync/curriculumSyncAdapter.ts
- [ ] Implement adapter methods for curriculumStore
- [ ] Handle nested articles within curriculum JSONB
- [ ] Add item_type='curriculum' filter
- [ ] Test: curricula with articles sync correctly

### Milestone 17: Progress Store Sync Adapter
- [ ] Create src/services/sync/progressSyncAdapter.ts
- [ ] Implement adapter methods for learningStore
- [ ] Map to user_progress table
- [ ] Test: reading progress syncs correctly

### Milestone 18: Certificates Store Sync Adapter
- [ ] Create src/services/sync/certificatesSyncAdapter.ts
- [ ] Implement adapter methods for certificateStore
- [ ] Map to user_certificates table
- [ ] Test: certificates sync correctly

### Milestone 19: Settings and Journey Sync Adapters
- [ ] Create src/services/sync/settingsSyncAdapter.ts
- [ ] Create src/services/sync/journeySyncAdapter.ts
- [ ] Implement single-object sync (not array)
- [ ] Map to user_settings and user_journey tables
- [ ] Test: settings sync correctly
- [ ] Test: journey stats sync correctly

### Milestone 20: Full Sync Implementation
- [ ] Implement fullSync() in syncService.ts
- [ ] Call all adapter pull() methods
- [ ] Merge local and remote for each store
- [ ] Call all adapter push() methods for local-only items
- [ ] Call fullSync() after successful login
- [ ] Test: login merges data from both sources

### Milestone 21: Incremental Sync Implementation
- [ ] Implement incrementalSync() in syncService.ts
- [ ] Track lastSyncTimestamp in AsyncStorage
- [ ] Fetch only items updated since last sync
- [ ] Push only locally changed items
- [ ] Add AppState listener for foreground detection
- [ ] Call incrementalSync() on app foreground
- [ ] Test: changes on one device appear on another

### Milestone 22: Push Changes with Debounce
- [ ] Implement pushChanges() in syncService.ts
- [ ] Add 1-second debounce for rapid changes
- [ ] Queue changes when offline
- [ ] Process queue when connectivity returns
- [ ] Add onChange hooks to relevant store actions
- [ ] Test: rapid changes batch into single push

### Milestone 23: RevenueCat User ID Linking
- [ ] Update src/store/subscriptionStore.ts imports
- [ ] Add linkToSupabaseUser(userId) method
- [ ] Call Purchases.logIn(userId) on real auth
- [ ] Call Purchases.logOut() on sign out
- [ ] Test: subscription persists across sign out/in
- [ ] Test: subscription available on new device after login

### Milestone 24: RevenueCat Logout Integration
- [x] (2026-01-13 01:05) Add unlinkRevenueCatUser() method to subscriptionStore.ts
- [x] (2026-01-13 01:05) Call Purchases.logOut() (simulated in Expo Go)
- [x] (2026-01-13 01:05) Clear linkedUserId state on logout
- [x] (2026-01-13 01:06) Update authStore.signOut() to call unlinkRevenueCatUser()
- [x] (2026-01-13 01:05) Add unit tests for logout flow (3 tests for unlinkRevenueCatUser, 1 test for signOut integration)
- [x] (2026-01-13 01:07) Test: isPremium reflects device state after logout
- [x] (2026-01-13 01:07) Test: linkedUserId is null after logout

### Milestone 25: Restore Purchases Feature
- [x] (2026-01-13 01:12) Add restorePurchases() method to subscriptionStore.ts
- [x] (2026-01-13 01:12) Call Purchases.restorePurchases() (simulated in Expo Go)
- [x] (2026-01-13 01:14) Add "Restore Purchases" button to journey-profile.tsx
- [x] (2026-01-13 01:14) Add loading and success/error states for restore
- [x] (2026-01-13 01:15) Call restorePurchases() after successful login in auth state change listener
- [x] (2026-01-13 01:12) Add unit tests for restore flow (5 tests)
- [ ] Test: reinstall + restore recovers premium (requires manual testing)
- [ ] Test: login as guest with purchase + login to account preserves premium (requires manual testing)

### Milestone 26: Auth Error Handling Improvements
- [x] (2026-01-13 01:20) Add console.error logging when signInAnonymously fails in authStore.ts
- [x] (2026-01-13 01:20) Add user-visible error state (authError) when auth initialization fails
- [ ] Consider retry mechanism for transient auth failures (deferred to future milestone)
- [x] (2026-01-13 01:20) Test: error is logged when Anonymous Sign-Ins is disabled (2 tests added)


## Surprises & Discoveries

- Observation: Transcription "Not authenticated" error originated from client-side, not Edge Function
  Evidence: The error message comes from `whisperService.ts:38` when `getAccessToken()` returns null. Investigation revealed `signInAnonymously()` was failing silently because Anonymous Sign-Ins was not enabled in Supabase dashboard (unchecked manual step in Milestone 3). The silent failure path at `authStore.ts:79-82` sets `isInitialized: true` but leaves `userId` as null, causing all subsequent `getSession()` calls to return null.
  Date: 2026-01-13

- Observation: RevenueCat `Purchases.logOut()` was specified in Milestone 23 but not implemented
  Evidence: Execplan line 195 states "Call Purchases.logOut() on sign out" and line 514 describes the expected behavior. However, `authStore.signOut()` implementation only calls `supabase.auth.signOut()` and `signInAnonymously()`. The `subscriptionStore.ts` has `linkRevenueCatUser()` but no corresponding unlink/logout method.
  Date: 2026-01-13

- Observation: "Restore Purchases" functionality missing entirely from design
  Evidence: Apple App Store Review Guidelines require a restore mechanism for apps with subscriptions. Searched execplan for "restore"—only hit is line 722 about data sync, not purchase restoration. The `subscriptionStore.ts` has `simulateRestore()` for testing but no production-ready `restorePurchases()` method and no UI button.
  Date: 2026-01-13

- Observation: Test mocks mask real authentication failures
  Evidence: `jest.setup.js` mocks `signInAnonymously` to always succeed with `{ data: { user: { id: 'mock-user-id' }, session: mockSession }, error: null }`. This means tests pass even when the real Supabase dashboard configuration would cause failures. No integration tests verify actual Supabase behavior.
  Date: 2026-01-13

- Observation: Supabase RLS policies are correctly designed for this use case
  Evidence: Reviewed Supabase anonymous sign-ins documentation. The `is_anonymous` JWT claim check is only needed when restricting anonymous users from certain actions. In this app, anonymous users SHOULD be able to create their own content (which persists after upgrade), so `auth.uid() = user_id` is the correct policy.
  Date: 2026-01-13


## Decision Log

- Decision: Use invisible anonymous authentication for all users rather than optional authentication
  Rationale: Anonymous auth provides JWT tokens for API security without requiring any user action. The user ID from anonymous sessions persists across app restarts (stored in AsyncStorage), and Supabase's linkIdentity API allows upgrading to a real account while preserving the same user ID. This means local data associations remain valid after upgrade.
  Date/Author: 2026-01-13 / Planning phase

- Decision: Support Google and Email Magic Link only, defer Apple Sign-In
  Rationale: Apple Sign-In requires Apple Developer Program membership and adds iOS-specific complexity (ASAuthorizationController). App Store guidelines require Apple Sign-In only if other social login providers are offered, so we must add it before submission. However, for initial implementation and testing, Google and Magic Link suffice.
  Date/Author: 2026-01-13 / User requirement

- Decision: Use JSONB columns for flexible data storage in sync tables
  Rationale: The Zustand store data structures may evolve as the app develops. Using JSONB allows storing the full object graph without requiring database migrations for every schema change. Row Level Security still protects access based on user_id. The tradeoff is less queryability, but sync operations fetch by user_id anyway.
  Date/Author: 2026-01-13 / Planning phase

- Decision: Merge strategy uses union with latest-timestamp-wins for same-ID conflicts
  Rationale: This approach never loses user data. When the same item exists on both devices, the version with the more recent updatedAt timestamp is kept. This matches user intuition—the latest edit wins. For items that exist only on one device, they are added to the merged result.
  Date/Author: 2026-01-13 / User requirement

- Decision: Login feature gated behind premium subscription
  Rationale: Multi-device sync is a premium value proposition. Free users typically use a single device and have no need for cloud sync. Gating login behind premium reduces backend storage costs for free tier and creates clear value differentiation for the subscription.
  Date/Author: 2026-01-13 / User requirement

- Decision: Use Supabase linkIdentity() rather than separate sign-up flow
  Rationale: linkIdentity() attaches a real identity (Google, email) to the current session without creating a new user. This preserves the anonymous user's ID and any data already associated with it. A separate sign-up would create a new user ID, orphaning local data.
  Date/Author: 2026-01-13 / Planning phase

- Decision: Add RevenueCat logout as separate milestone rather than retrofitting Milestone 23
  Rationale: Milestone 23 items are marked as incomplete. Adding logout as Milestone 24 maintains clear progress tracking and allows independent verification. The implementation is logically connected but technically separate (different store method, different trigger point in auth flow).
  Date/Author: 2026-01-13 / Post-implementation review

- Decision: Make "Restore Purchases" available to all users, not just premium
  Rationale: A user may need to restore after reinstall regardless of current premium status. The button shows their actual entitlement status. Hiding it behind premium status creates a chicken-and-egg problem where users can't restore because they're not premium, but they're not premium because they haven't restored.
  Date/Author: 2026-01-13 / Post-implementation review

- Decision: Call restorePurchases() automatically after login
  Rationale: This handles the "guest purchase then login" scenario described in RevenueCat best practices. When a user buys as guest (anonymous RevenueCat ID) then logs into an existing account, the purchase is on a different RC user ID. Calling restore after login transfers the purchase to the authenticated user ID.
  Date/Author: 2026-01-13 / Post-implementation review


## Outcomes & Retrospective

### Phase J Complete (Milestones 24-26) - 2026-01-13

**Summary:** All three milestones in Phase J (RevenueCat Complete Integration) were successfully implemented using TDD methodology. The implementation provides:

1. **Milestone 24 - RevenueCat Logout**: The `unlinkRevenueCatUser()` method clears RevenueCat state during sign out, preventing entitlement leakage between users.

2. **Milestone 25 - Restore Purchases**: A user-facing "Restore Purchases" button appears in the Subscription section (for all users per Apple guidelines). The feature includes loading states, success/error feedback via Alert, and automatic restoration after login.

3. **Milestone 26 - Error Handling**: Authentication failures now log to console.error and set an `authError` state that can be surfaced in UI.

**Test Coverage:**
- 12 new tests for subscriptionStore (unlinkRevenueCatUser: 3, restorePurchases: 5, existing linkRevenueCatUser: 4)
- 4 new tests for authStore (error logging: 2, signOut integration: 1, error state: 1)
- All 2390 tests pass

**Files Modified:**
- `src/store/subscriptionStore.ts`: Added `unlinkRevenueCatUser()`, `restorePurchases()`, `isRestoring`, `restoreError`
- `src/store/authStore.ts`: Added `authError` state, error logging, calls to subscription store methods
- `src/app/journey-profile.tsx`: Added Restore Purchases button with loading state
- Test files for both stores

**Drift Analysis:** Minor implementation differences from ExecPlan code snippets (using comments for Expo Go simulation instead of isExpoGo guard), functionally equivalent and consistent with existing codebase patterns.

**Remaining Manual Tests:**
- Reinstall + restore recovers premium (requires production RevenueCat)
- Login as guest with purchase + login to account preserves premium (requires production RevenueCat)


## Context and Orientation

The Spidrid application is a React Native speed reading app built with Expo SDK 54 and Expo Router for file-based navigation. It uses Zustand for state management with AsyncStorage persistence. The app has a freemium business model with RevenueCat integration for subscription management, though RevenueCat is currently simulated in Expo Go development builds.

### Current Authentication State

The app currently has no authentication system. Users are not identified, and all data is stored locally on the device using AsyncStorage through Zustand's persist middleware. There is no concept of user accounts, login, or cloud sync.

### Supabase Edge Functions

Three Supabase Edge Functions exist that make external API calls:

The file `supabase/functions/transcribe/index.ts` proxies audio transcription requests to the OpenAI Whisper API. It accepts base64-encoded audio, sends it to OpenAI, and returns the transcribed text. Each transcription incurs OpenAI API costs. This function was deployed with `--no-verify-jwt` for initial testing, meaning any request is accepted regardless of authentication. This is a security vulnerability that allows anyone who discovers the endpoint to make unlimited transcription requests billed to the developer's OpenAI account.

The file `supabase/functions/generate-article/index.ts` calls Google Gemini API to generate educational articles with comprehension questions. It accepts a topic and word count, returns a structured article. This function also has no authentication.

The file `supabase/functions/generate-curriculum-outline/index.ts` calls Google Gemini API to create multi-article learning path outlines. It also has no authentication.

### Client Code Calling Edge Functions

The stores and services that call these Edge Functions use raw fetch() without authentication headers:

In `src/store/generatedStore.ts` at lines 76-88, the generateArticle action calls the generate-article endpoint:

    const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, targetWordCount, tone, tonePrompt, userId }),
    });

In `src/store/curriculumStore.ts` at lines 155-164, the createCurriculum action calls the outline endpoint with the same pattern.

In `src/services/whisperService.ts` at lines 50-59, the transcribeAudio function calls the transcribe endpoint:

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audio: base64Audio, fileType }),
    });

This file also contains extensive debug console.log statements (lines 31-33, 36-40, 44-48, 61-66, 73-77, 81) that were added during troubleshooting and should be removed.

The file `src/hooks/useWhisperRecording.ts` uses expo-audio for recording and calls whisperService. It also has debug logging (lines 78, 82-85, 91, 94, 97, 104, 106, 109, 111, 114, 117, 122) to remove.

### Supabase Configuration

Supabase credentials are already configured. The file `app.config.js` at lines 33-36 reads environment variables:

    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    }

The `.env.local` file contains the actual values. These are accessed in code via `Constants.expoConfig?.extra?.supabaseUrl`.

### App Initialization

The root layout at `src/app/_layout.tsx` initializes the subscription store when the app starts:

    const initialize = useSubscriptionStore(state => state.initialize);
    useEffect(() => {
      initialize();
    }, [initialize]);

This pattern will be extended to also initialize authentication.

### Journey/Profile Screen

The file `src/app/journey-profile.tsx` is a modal screen showing user statistics and settings. This is where the "Sync Across Devices" section will be added for premium users who want multi-device sync.

### Subscription Store

The file `src/store/subscriptionStore.ts` tracks premium subscription status. It exposes `isPremium` which gates premium features. The real RevenueCat integration is disabled in Expo Go; simulated purchases are used for development.

### Zustand Stores Requiring Sync

Seven Zustand stores contain user data that should sync across devices:

1. `src/store/contentStore.ts` - Imported content from URLs, text, PDFs, and EPUBs. Each item has an id, title, content, source, and metadata.

2. `src/store/generatedStore.ts` - AI-generated articles. Each article has an id, topic, title, content, questions, and completion status.

3. `src/store/curriculumStore.ts` - Multi-article learning curricula. Each curriculum contains nested article objects with generation status and completion status.

4. `src/store/learningStore.ts` - Reading progress per article. Tracks current word index, completion status, WPM achieved.

5. `src/store/certificateStore.ts` - Earned certificates for speed milestones and article completions.

6. `src/store/settingsStore.ts` - User preferences including theme, default WPM, reading language.

7. `src/store/journeyStore.ts` - Journey statistics including total words read, streak data, level progress.

### Key Terms

JWT (JSON Web Token): A signed token that proves the holder's identity. Supabase issues JWTs when users authenticate. Edge Functions verify these tokens to ensure requests come from legitimate users.

Anonymous Authentication: A Supabase feature where users get real user accounts and JWTs without providing any credentials. The session persists across app restarts. Anonymous users can later "upgrade" to real accounts by linking an identity.

Link Identity: A Supabase Auth API method that attaches an external identity (Google, email) to an existing user account without creating a new user. This preserves the user ID and any associated data.

Row Level Security (RLS): A PostgreSQL feature where database policies restrict which rows a user can access. Combined with Supabase Auth, RLS ensures users can only read and write their own data.

Edge Function: A serverless function deployed on Supabase's infrastructure. Edge Functions run close to users geographically and can access environment variables like API keys. They receive HTTP requests and return responses.

Restore Purchases: A mechanism required by Apple App Store guidelines that allows users to recover previously purchased subscriptions or non-consumables. In RevenueCat, this is done via `Purchases.restorePurchases()` which queries the App Store/Play Store for the device's purchase history and updates the user's entitlements accordingly.


## Plan of Work

The work proceeds through 26 milestones organized into logical phases. Milestones 24-26 were added during post-implementation review to address gaps discovered against Apple App Store requirements and RevenueCat best practices. Each milestone is independently verifiable and builds upon previous milestones.

### Phase A: Anonymous Authentication (Milestones 1-5)

This phase adds invisible authentication that secures API endpoints without any user-visible changes. After this phase, all users have anonymous Supabase sessions, and Edge Functions verify JWTs before processing requests.

Milestone 1 installs the Supabase JavaScript SDK and creates the client singleton. The SDK provides the createClient function and all authentication methods. The client is configured with AsyncStorage for session persistence, automatic token refresh, and detection of URL-based auth callbacks disabled since React Native does not use URL callbacks for OAuth.

Create the file `src/services/supabase.ts` with the following structure. Import createClient from the SDK and AsyncStorage for persistence. Read the Supabase URL and anon key from expo-constants. Call createClient with auth configuration specifying AsyncStorage as the storage provider, autoRefreshToken true, persistSession true, and detectSessionInUrl false. Export the created client as a named export called supabase.

Milestone 2 creates the authentication store that manages auth state using Zustand. The store tracks whether initialization is complete, whether the current session is anonymous or a real account, and the user ID.

Create the file `src/store/authStore.ts` with the following structure. Define an AuthState interface with isInitialized boolean, isAnonymous boolean, isLoggedIn boolean, and userId string or null. Add an initialize action that checks for an existing session using getSession, and if none exists, calls signInAnonymously. Add a getAccessToken action that returns the current session's access_token for use in API calls. Use Zustand's create function without persist middleware since auth state is managed by Supabase internally.

Milestone 3 integrates authentication into app startup. Before this can work, Anonymous Sign-Ins must be enabled in the Supabase dashboard under Authentication > Providers > Anonymous Sign-Ins.

Update `src/app/_layout.tsx` to import useAuthStore and call the initialize action in the existing useEffect alongside subscription initialization. The auth initialization runs silently—users see nothing different, but the app now has a valid JWT for API calls.

Milestone 4 updates the whisperService to include the JWT in API requests. This is the critical security improvement—without a valid token, requests will be rejected.

Update `src/services/whisperService.ts` to import useAuthStore. At the start of transcribeAudio, call getAccessToken from the auth store. If no token is returned, return an error result immediately. Otherwise, add an Authorization header with the value "Bearer" followed by the token. Also remove all console.log debug statements from this file and from useWhisperRecording.ts.

Update test mocks in jest.setup.js to mock the Supabase SDK with fake auth methods. Update whisperService.test.ts to mock the authStore and provide a fake token.

Milestone 5 enforces security on the Edge Function. Re-deploy the transcribe function using `npx supabase functions deploy transcribe` without the --no-verify-jwt flag. By default, Supabase Edge Functions verify JWTs, so unauthenticated requests receive 401 errors.

Verify security by calling the endpoint with curl without authentication—it should return 401. Verify functionality by using the app to transcribe audio—it should succeed because the app now includes a valid JWT.

### Phase B: Database Schema (Milestones 6-7)

This phase creates the Supabase database tables that will store synchronized user data. Each table uses Row Level Security to ensure users can only access their own data.

Milestone 6 creates the database tables using Supabase migrations. Migrations are SQL files in the supabase/migrations directory with timestamp prefixes.

Create five migration files, one for each table. The user_content table stores all user-generated and imported content with columns for id (UUID primary key), user_id (UUID referencing auth.users), item_id (TEXT for client-generated unique ID), item_type (TEXT distinguishing imported, generated, and curriculum), data (JSONB containing the full object), created_at, updated_at, and deleted_at timestamps, with a unique constraint on user_id and item_id.

The user_progress table stores reading progress with columns for id, user_id, content_id (matching item_id in content), progress (JSONB), and updated_at, with a unique constraint on user_id and content_id.

The user_certificates table stores earned certificates with columns for id, user_id, cert_id, data (JSONB), and earned_at, with a unique constraint on user_id and cert_id.

The user_settings table stores preferences with user_id as the primary key (one row per user), settings (JSONB), and updated_at.

The user_journey table stores journey stats with user_id as the primary key, stats (JSONB), and updated_at.

Run migrations using `npx supabase db push` and verify tables appear in the Supabase dashboard Table Editor.

Milestone 7 adds Row Level Security policies to all tables. For each table, enable RLS and create a policy that allows all operations (SELECT, INSERT, UPDATE, DELETE) only when auth.uid() equals the row's user_id. This ensures users can only access their own data, even with a valid JWT.

Test by inserting data as an anonymous user, then attempting to select data with a different user_id—the query should return no rows.

### Phase C: OAuth Provider Configuration (Milestone 8)

Milestone 8 configures the external authentication providers in both Supabase and the respective identity platforms.

For Google OAuth, navigate to Supabase Dashboard > Authentication > Providers > Google and enable it. Create OAuth credentials in Google Cloud Console: create a new OAuth 2.0 Client ID of type Web application, add the Supabase callback URL as an authorized redirect URI, and copy the Client ID and Client Secret to Supabase.

For Magic Link, navigate to Supabase Dashboard > Authentication > Providers > Email and enable it. Magic Link is part of email authentication—when enabled, users can sign in by clicking a link sent to their email rather than entering a password. Configure the email templates under Authentication > Email Templates to match the app's branding.

Verify Google OAuth by attempting a sign-in (in later milestones) and observing the Google consent screen. Verify Magic Link by requesting a link and checking that the email arrives.

### Phase D: Auth Store Extensions (Milestones 9-10)

This phase adds methods to the auth store for real authentication and handles the deep link callback for magic links.

Milestone 9 extends authStore with methods for signing in with Google, signing in with Magic Link, and signing out.

The signInWithGoogle method calls supabase.auth.linkIdentity with provider set to 'google'. The linkIdentity method is crucial—it attaches the Google identity to the current anonymous user rather than creating a new user. This preserves the user ID and any data associated with it. The method opens a browser for the OAuth flow and returns when complete.

The signInWithMagicLink method accepts an email address and calls supabase.auth.linkIdentity with provider set to 'email' and the email in options. Supabase sends an email containing a magic link.

The signOut method calls supabase.auth.signOut to clear the real identity, then calls signInAnonymously to create a new anonymous session. This ensures the app always has a valid session for API calls.

Add an auth state change listener by calling supabase.auth.onAuthStateChange during store creation. When the session changes, update isAnonymous based on session.user.is_anonymous and isLoggedIn as the inverse.

Milestone 10 handles the deep link callback when users tap the magic link in their email. The magic link URL contains a token that must be processed to complete authentication.

Configure the URL scheme in app.config.js under the scheme property. This determines the custom URL scheme the app responds to, such as spidrid://auth.

Create a hook at `src/hooks/useAuthDeepLink.ts` that uses Expo's Linking API to listen for incoming URLs. When a URL matching the auth callback pattern arrives, extract the token and call supabase.auth.getSessionFromUrl to complete authentication.

Add the hook to the root layout so it runs when the app starts. Test by requesting a magic link, tapping it, and verifying the app opens and completes authentication.

### Phase E: Authentication UI (Milestones 11-12)

This phase creates the user interface for signing in and integrates it into the Journey/Profile screen.

Milestone 11 creates the AuthModal component that presents authentication options.

Create `src/components/auth/AuthModal.tsx` as a modal component using the app's existing modal patterns. The modal displays two authentication options: a "Continue with Google" button that calls signInWithGoogle, and a "Continue with Email" section with a text input for the email address and a "Send Magic Link" button that calls signInWithMagicLink.

Include loading states while authentication is in progress, error states for failed attempts, and a success callback prop that the parent component can use to dismiss the modal and trigger sync.

Style the component using the app's design system tokens from src/constants/ for colors, spacing, and typography.

Milestone 12 integrates authentication into the Journey/Profile screen as a premium feature.

Update `src/app/journey-profile.tsx` to import useAuthStore and useSubscriptionStore. Add a new section called "Sync Across Devices" after the existing content. The section only renders when isPremium from the subscription store is true.

When the user is not logged in (isLoggedIn is false), the section shows explanatory text about multi-device sync benefits and a button that opens the AuthModal. When the user is logged in (isLoggedIn is true), the section shows the user's email or identifier and a "Sign Out" button that calls signOut.

Test by toggling premium status: the section should be hidden for free users and visible for premium users.

### Phase F: Sync Service Core (Milestone 13)

Milestone 13 creates the core sync service infrastructure including the merge algorithm.

Create `src/services/syncService.ts` with the fundamental sync types and utilities. Define a SyncItem interface requiring id (string) and updatedAt (number timestamp) properties, with additional properties allowed. Define a SyncAdapter interface with methods toSyncItems() returning local items, fromSyncItems(items) writing items to the local store, push(items) sending items to Supabase, and pull() fetching items from Supabase.

Implement the mergeItems function that takes two arrays of SyncItems (local and remote) and returns a merged array. The algorithm creates a Map keyed by id, adds all local items, then iterates remote items—for each, if no local item exists with that id, add it; if a local item exists, compare updatedAt timestamps and keep the newer one. Return the map values as an array.

Write comprehensive unit tests for mergeItems covering: empty arrays, non-overlapping items (should return union), identical items (should deduplicate), conflicting items (newer timestamp wins), and equal timestamps (either is acceptable).

### Phase G: Sync Adapters (Milestones 14-19)

This phase creates sync adapters for each Zustand store that needs synchronization.

Milestone 14 creates the adapter for contentStore, which stores imported content (URLs, PDFs, EPUBs).

Create `src/services/sync/contentSyncAdapter.ts` implementing the SyncAdapter interface. The toSyncItems method reads the contents array from useContentStore.getState() and maps each item to include an updatedAt timestamp if not present. The fromSyncItems method calls setContents (or equivalent) to write items back. The push method upserts items to user_content with item_type set to 'imported'. The pull method selects from user_content where user_id matches auth.uid() and item_type equals 'imported'.

Test by creating local content, calling push, verifying it appears in Supabase, calling pull on a fresh store, and verifying the content appears.

Milestone 15 creates the adapter for generatedStore following the same pattern but with item_type set to 'generated'.

Milestone 16 creates the adapter for curriculumStore with item_type set to 'curriculum'. This adapter handles the nested articles array within each curriculum object—the entire structure is stored in the JSONB data column.

Milestone 17 creates the adapter for learningStore (reading progress). This maps to the user_progress table rather than user_content. The content_id field matches the id of the content being read.

Milestone 18 creates the adapter for certificateStore, mapping to user_certificates.

Milestone 19 creates adapters for settingsStore and journeyStore. These are simpler because they store a single object per user rather than arrays. The merge logic compares timestamps and keeps the newer version wholesale.

### Phase H: Sync Integration (Milestones 20-22)

This phase wires the sync adapters into the app lifecycle.

Milestone 20 implements fullSync, called after a user logs in with a real account.

In syncService.ts, implement fullSync as an async function that orchestrates all adapters. For each adapter: call pull to get remote items, call toSyncItems to get local items, call mergeItems to combine them, call fromSyncItems to write merged results to the local store, and call push with any local-only items to ensure they reach the cloud.

Call fullSync from the auth state change listener when isLoggedIn transitions from false to true.

Test by creating content on Device A, signing in with Google, creating different content, signing in on Device B (fresh install) with the same account, and verifying Device B shows merged content.

Milestone 21 implements incrementalSync, called periodically when the app is in use.

Track the last sync timestamp in AsyncStorage. When incrementalSync runs, fetch only items updated since that timestamp (using a WHERE clause on updated_at). Merge with local changes and push any local modifications.

Use React Native's AppState API to detect when the app comes to the foreground. Add an event listener in the root layout that calls incrementalSync when the state changes to 'active' and the user is logged in.

Test by making changes on Device A, bringing Device B to foreground, and verifying the changes appear within seconds.

Milestone 22 implements pushChanges with debouncing for efficient updates.

Create a debounced push function that waits for 1 second of inactivity before sending changes to Supabase. This batches rapid changes (like typing) into single network requests.

Add an offline queue that stores pending changes when network is unavailable. Use React Native's NetInfo to detect connectivity. When connectivity returns, process the queue.

Add onChange callbacks to relevant store actions. For example, when addContent is called in contentStore, queue a push for that item.

### Phase I: RevenueCat Integration (Milestone 23)

Milestone 23 links the RevenueCat user identifier to the Supabase user ID so subscriptions follow users across devices.

Update `src/store/subscriptionStore.ts` to import useAuthStore. Add a method linkToSupabaseUser that takes a user ID and calls Purchases.logIn(userId). RevenueCat's logIn transfers any purchases associated with the device to the specified user ID.

When auth state changes to logged in (real account), call linkToSupabaseUser with the Supabase user ID. When signOut is called, call Purchases.logOut to revert RevenueCat to anonymous device-based identification.

Test by purchasing a subscription while logged in, signing out (isPremium should become false), signing in again (isPremium should become true without repurchasing), and signing in on a new device (isPremium should be true).

### Phase J: RevenueCat Complete Integration (Milestones 24-26)

This phase completes the RevenueCat integration by adding logout handling, restore purchases functionality, and proper error handling. These milestones address gaps discovered during post-implementation review against Apple App Store requirements and RevenueCat best practices.

Milestone 24 implements RevenueCat logout and proper state cleanup when a user signs out. The current implementation (Milestone 23) links RevenueCat to Supabase on login but does not unlink on logout, which can cause entitlement leakage where the next user on the device inherits the previous user's subscription status.

Update `src/store/subscriptionStore.ts` to add an `unlinkRevenueCatUser()` method that calls `Purchases.logOut()` in production and clears the `linkedUserId` state. Update `src/store/authStore.ts` to call `unlinkRevenueCatUser()` at the beginning of the `signOut()` method before calling `supabase.auth.signOut()`. This ensures RevenueCat returns to anonymous device-based identification before a new anonymous Supabase session is created.

Test by signing in as User A (premium), signing out, then checking that `isPremium` reflects the actual device state (likely false unless User A purchased on this device). Verify `linkedUserId` is null after logout.

Milestone 25 adds a "Restore Purchases" button to the UI, which is required by Apple App Store guidelines for any app with non-consumable purchases or subscriptions. Without this button, users who reinstall the app or switch devices without signing in have no way to recover their premium status.

Add a `restorePurchases()` method to `src/store/subscriptionStore.ts` that calls `Purchases.restorePurchases()` in production. The method should update `isPremium` based on the restored `customerInfo.entitlements.active['premium']`. In Expo Go development mode, simulate restoration by checking if a purchase was previously simulated.

Update `src/app/journey-profile.tsx` to add a "Restore Purchases" button in the Subscription section. The button should appear for all users (both free and premium) since a user may need to restore after reinstall. Show loading state while restoration is in progress and display success/failure feedback.

Additionally, call `restorePurchases()` automatically after a successful login in the auth state change listener. This handles the case where a user buys a subscription as a guest, then logs into an existing account—the purchase transfers to the logged-in account.

Test restoration by: (1) simulating a purchase, (2) clearing AsyncStorage or reinstalling, (3) tapping "Restore Purchases", and (4) verifying premium status is restored. Test the login-restore flow by purchasing as guest, logging in, and verifying premium persists.

Milestone 26 improves error handling in the authentication flow. The current implementation silently fails when `signInAnonymously()` fails, which masks configuration issues like Anonymous Sign-Ins being disabled in the Supabase dashboard.

Update `src/store/authStore.ts` to add `console.error` logging when `signInAnonymously()` fails. Consider adding a user-visible error state or retry mechanism for transient failures. This ensures developers can diagnose authentication issues during development and testing.


## Concrete Steps

All commands assume working directory `/Users/kaya/Coding/spidrid`.

### Milestone 1 Commands

Install the Supabase SDK:

    npm install @supabase/supabase-js

Expected output shows the package added to node_modules and package.json updated.

Verify installation:

    grep supabase package.json

Expected output includes a line like "@supabase/supabase-js": "^2.x.x".

### Milestone 2 Commands

After creating src/store/authStore.ts, verify TypeScript compilation:

    npm run typecheck

Expected output shows no errors related to authStore.

### Milestone 3 Commands

Before this milestone, enable Anonymous Sign-Ins in the Supabase dashboard:

    1. Open https://supabase.com/dashboard/project/psyhlugoybsyrlcthshi/auth/providers
    2. Scroll to "Anonymous Sign-Ins"
    3. Toggle to enabled
    4. Click Save

Start the app and verify auth initialization:

    npm start

In Expo Go, open the app. Check the terminal for any auth-related errors. The app should start normally.

### Milestone 4 Commands

After updating whisperService and test mocks, run tests:

    npm test

Expected output shows all tests passing, including whisperService tests.

### Milestone 5 Commands

Re-deploy the transcribe function with JWT verification:

    npx supabase functions deploy transcribe

Expected output shows successful deployment without errors.

Test security by calling the endpoint without authentication:

    curl -X POST https://psyhlugoybsyrlcthshi.supabase.co/functions/v1/transcribe \
      -H "Content-Type: application/json" \
      -d '{"audio":"dGVzdA==","fileType":"m4a"}'

Expected output is a 401 error like:

    {"msg":"Invalid JWT"}

Test functionality by using the app to record and transcribe audio in the Learn card. Expected result is successful transcription with the text appearing in the input field.

### Milestone 6 Commands

Create migrations directory if needed:

    mkdir -p supabase/migrations

After creating migration files, apply them:

    npx supabase db push

Expected output shows migrations applied successfully.

Verify tables exist by checking Supabase Dashboard > Table Editor. All five tables should appear.

### Milestone 7 Commands

After adding RLS policies, test by attempting to access another user's data:

    1. In app, create some content (creates data for anonymous user A)
    2. Clear AsyncStorage to get new anonymous user B
    3. Attempt to fetch content - should return empty

### Milestone 13 Commands

After implementing mergeItems, run specific tests:

    npm test -- --testPathPattern=syncService

Expected output shows mergeItems tests passing.

### Milestone 24 Commands

In `src/store/subscriptionStore.ts`, add the unlinkRevenueCatUser method:

```typescript
unlinkRevenueCatUser: async () => {
  if (!isExpoGo) {
    // Production: call RevenueCat logOut
    await Purchases.logOut();
  }
  // Clear linked user state
  set({ linkedUserId: null });
},
```

In `src/store/authStore.ts`, update the signOut method to call unlinkRevenueCatUser before signing out:

```typescript
signOut: async () => {
  // First, unlink RevenueCat to prevent entitlement leakage
  await useSubscriptionStore.getState().unlinkRevenueCatUser();

  // Then sign out from Supabase
  await supabase.auth.signOut();

  // Create new anonymous session
  await get().signInAnonymously();
},
```

Run tests:

    npm test -- --testPathPattern=subscriptionStore
    npm test -- --testPathPattern=authStore

### Milestone 25 Commands

In `src/store/subscriptionStore.ts`, add the restorePurchases method:

```typescript
restorePurchases: async () => {
  set({ isRestoring: true, restoreError: null });
  try {
    if (isExpoGo) {
      // Expo Go: check if a simulated purchase exists in AsyncStorage
      const simulatedPurchase = await AsyncStorage.getItem('simulatedPurchase');
      if (simulatedPurchase) {
        set({ isPremium: true, isRestoring: false });
        return { success: true };
      }
      set({ isRestoring: false });
      return { success: false, message: 'No purchases to restore' };
    }
    // Production: call RevenueCat
    const customerInfo = await Purchases.restorePurchases();
    const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
    set({ isPremium, isRestoring: false });
    return { success: isPremium };
  } catch (error) {
    set({ isRestoring: false, restoreError: error.message });
    return { success: false, error: error.message };
  }
},
```

In `src/app/journey-profile.tsx`, add a Restore Purchases button in the Subscription section:

```typescript
<TouchableOpacity
  style={[styles.restoreButton, { backgroundColor: theme.secondaryBackground }]}
  onPress={handleRestorePurchases}
  disabled={isRestoring}
>
  {isRestoring ? (
    <ActivityIndicator color={theme.textColor} />
  ) : (
    <Text style={[styles.restoreButtonText, { color: theme.textColor }]}>
      Restore Purchases
    </Text>
  )}
</TouchableOpacity>
```

In the auth state change listener (authStore or _layout.tsx), call restorePurchases after successful login:

```typescript
// After successful linkIdentity or Google sign-in
await useSubscriptionStore.getState().restorePurchases();
```

Run tests:

    npm test -- --testPathPattern=subscriptionStore
    npm test -- --testPathPattern=journey-profile

### Milestone 26 Commands

In `src/store/authStore.ts`, update the initialize method to log errors:

```typescript
initialize: async () => {
  // ... existing getSession code ...

  const { data, error: signInError } = await supabase.auth.signInAnonymously();

  if (signInError || !data.user) {
    // Log the error for debugging
    console.error('[AuthStore] signInAnonymously failed:', signInError?.message || 'No user returned');

    // Still mark as initialized to prevent infinite retries
    set({ isInitialized: true, authError: signInError?.message });
    return;
  }
  // ... rest of success path ...
},
```

Test by temporarily disabling Anonymous Sign-Ins in Supabase dashboard, reloading the app, and checking console for the error message.

Run tests:

    npm test -- --testPathPattern=authStore


## Validation and Acceptance

### Milestone 1-5 Acceptance (Anonymous Auth and Security)

The anonymous authentication and API security features are complete when:

1. The app starts without any visible authentication prompts or delays.

2. Console logs (if enabled) show successful anonymous authentication with a user ID.

3. The transcribe Edge Function returns 401 for unauthenticated requests. To test, run the curl command from Concrete Steps and observe the "Invalid JWT" error.

4. The transcribe Edge Function succeeds for app requests. To test, open the Learn card, tap the microphone, speak a phrase, stop recording, and observe the transcribed text appearing.

5. All existing tests pass with `npm test`.

### Milestone 6-7 Acceptance (Database Schema)

The database schema is complete when:

1. All five tables (user_content, user_progress, user_certificates, user_settings, user_journey) are visible in Supabase Dashboard > Table Editor.

2. Each table has RLS enabled, shown by the shield icon in the Table Editor.

3. An anonymous user can insert data into their own rows.

4. An anonymous user cannot read rows belonging to other users (queries return empty results).

### Milestone 8-12 Acceptance (Real Auth and UI)

The real authentication features are complete when:

1. Premium users see "Sync Across Devices" in Journey/Profile; free users do not.

2. Tapping "Continue with Google" opens the Google consent screen, and completing the flow returns to the app with isLoggedIn true.

3. Entering an email and tapping "Send Magic Link" sends an email to that address.

4. Tapping the magic link in the email opens the app and completes authentication with isLoggedIn true.

5. After signing in, the user ID shown in the auth store is the same as before (the anonymous session was linked, not replaced).

6. Tapping "Sign Out" reverts to anonymous with a new user ID.

### Milestone 13-22 Acceptance (Sync)

The sync features are complete when:

1. After signing in on a fresh device with an existing account, content from the cloud appears locally within seconds.

2. Content created locally before signing in is preserved and merged with cloud data.

3. Changes made on Device A appear on Device B after bringing Device B to the foreground.

4. Conflicts (same content modified on both devices) resolve by keeping the more recent version.

5. Creating content while offline queues it for sync when connectivity returns.

### Milestone 23 Acceptance (RevenueCat)

The RevenueCat integration is complete when:

1. Purchasing a subscription while signed in associates it with the Supabase user ID.

2. Signing out shows isPremium as false (subscription is tied to the account, not the device).

3. Signing in again shows isPremium as true without requiring a new purchase.

4. Signing in on a new device with the same account shows isPremium as true.

### Milestone 24-26 Acceptance (RevenueCat Complete + Error Handling)

The RevenueCat logout and restore features are complete when:

1. Signing out calls `Purchases.logOut()` (or simulated equivalent) before creating new anonymous session.

2. After signing out, `linkedUserId` in subscriptionStore is null.

3. After signing out, `isPremium` reflects the device's actual entitlement state (not the previous user's).

4. A "Restore Purchases" button is visible in the Subscription section of Journey/Profile.

5. Tapping "Restore Purchases" shows loading state, then success/failure feedback.

6. After reinstalling the app and tapping "Restore Purchases", premium status is restored if the user previously purchased on this Apple/Google account.

7. After signing in with an account, `restorePurchases()` is called automatically.

8. If a user purchases as guest then signs into an existing account, premium status is maintained.

9. If Anonymous Sign-Ins is disabled in Supabase dashboard, a clear error is logged to console during app initialization.


## Idempotence and Recovery

All milestones can be safely re-run without causing damage.

Milestone 1 (SDK installation) is idempotent—npm install with an already-installed package does nothing.

Milestones 2-4 (auth store and integration) modify source files. If re-done, the same files are overwritten with the same content.

Milestone 5 (Edge Function deployment) is idempotent—deploying the same function replaces the previous deployment.

Milestones 6-7 (database schema) should use IF NOT EXISTS clauses in SQL. If tables already exist, the migrations do nothing.

Milestones 8 (provider configuration) involves dashboard settings. Re-configuring with the same values is safe.

Milestones 9-22 (auth extensions and sync) modify source files. Re-doing them overwrites with the same content.

If a milestone fails partway:

- For SDK installation, delete node_modules and package-lock.json and retry.
- For source file changes, the partial file can be overwritten.
- For database migrations, check which tables exist and create only missing ones.
- For Edge Function deployment, retry the deploy command.

Recovery from authentication issues:

- Clear AsyncStorage to reset auth state: in the app, navigate to settings and use a "Clear Data" option, or use react-native-debugger to clear AsyncStorage.
- If anonymous auth fails, verify Anonymous Sign-Ins is enabled in Supabase dashboard.
- If JWT verification fails, verify the function was deployed without --no-verify-jwt.

Recovery from sync issues:

- If sync fails, check Supabase logs in the dashboard for errors.
- If data is corrupted, the local AsyncStorage can be cleared and fullSync will restore from cloud.
- If cloud data is corrupted, delete rows in Supabase Table Editor and re-push from local.


## Artifacts and Notes

### Supabase Client Configuration Reference

The createClient options for React Native:

    {
      auth: {
        storage: AsyncStorage,        // Persist session in AsyncStorage
        autoRefreshToken: true,       // Automatically refresh expiring tokens
        persistSession: true,         // Store session across app restarts
        detectSessionInUrl: false,    // Disable URL-based auth (not used in RN)
      },
    }

### Auth Store State Machine

The auth store transitions through these states:

    Initial: { isInitialized: false, isAnonymous: false, isLoggedIn: false, userId: null }
       |
       | initialize() called
       v
    Checking: getSession() to check for existing session
       |
       +-- session exists --> Authenticated (anonymous or real based on is_anonymous)
       |
       +-- no session --> signInAnonymously() --> Anonymous Authenticated

    Anonymous: { isInitialized: true, isAnonymous: true, isLoggedIn: false, userId: "uuid" }
       |
       | linkIdentity() called (Google or Magic Link)
       v
    Real Account: { isInitialized: true, isAnonymous: false, isLoggedIn: true, userId: "uuid" (same!) }
       |
       | signOut() called
       v
    Anonymous: (new session with new userId)

### Migration SQL Template

Each migration file follows this pattern:

    -- Migration: create_user_content
    -- Purpose: Store all user-generated and imported content

    CREATE TABLE IF NOT EXISTS user_content (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users NOT NULL,
      item_id TEXT NOT NULL,
      item_type TEXT NOT NULL,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      deleted_at TIMESTAMPTZ,
      UNIQUE(user_id, item_id)
    );

    ALTER TABLE user_content ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Users can CRUD own content" ON user_content
      FOR ALL USING (auth.uid() = user_id);

### Merge Algorithm Pseudocode

    function mergeItems(local, remote):
      merged = new Map()

      // Add all local items
      for item in local:
        merged.set(item.id, item)

      // Merge remote items
      for item in remote:
        existing = merged.get(item.id)
        if existing is null:
          // New item from remote
          merged.set(item.id, item)
        else if item.updatedAt > existing.updatedAt:
          // Remote is newer
          merged.set(item.id, item)
        // else: local is newer or equal, keep local

      return Array.from(merged.values())


## Interfaces and Dependencies

### NPM Dependencies

    @supabase/supabase-js: ^2.x

This is the only new dependency. The package provides createClient, auth methods, and database query builders.

### Supabase Client Export

File: `src/services/supabase.ts`

    import { createClient, SupabaseClient } from '@supabase/supabase-js';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import Constants from 'expo-constants';

    const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || '';
    const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || '';

    export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });

### Auth Store Interface

File: `src/store/authStore.ts`

    import { create } from 'zustand';

    interface AuthState {
      isInitialized: boolean;
      isAnonymous: boolean;
      isLoggedIn: boolean;
      userId: string | null;

      initialize: () => Promise<void>;
      getAccessToken: () => Promise<string | null>;
      signInWithGoogle: () => Promise<void>;
      signInWithMagicLink: (email: string) => Promise<void>;
      signOut: () => Promise<void>;
    }

    export const useAuthStore: UseBoundStore<StoreApi<AuthState>>;

### Sync Service Interfaces

File: `src/services/syncService.ts`

    export interface SyncItem {
      id: string;
      updatedAt: number;
      [key: string]: unknown;
    }

    export interface SyncAdapter<T extends SyncItem> {
      toSyncItems: () => T[];
      fromSyncItems: (items: T[]) => void;
      push: (items: T[]) => Promise<void>;
      pull: () => Promise<T[]>;
    }

    export function mergeItems<T extends SyncItem>(local: T[], remote: T[]): T[];
    export function fullSync(): Promise<void>;
    export function incrementalSync(): Promise<void>;
    export function pushChanges(adapter: SyncAdapter<any>, items: SyncItem[]): Promise<void>;

### AuthModal Component Props

File: `src/components/auth/AuthModal.tsx`

    interface AuthModalProps {
      visible: boolean;
      onClose: () => void;
      onSuccess: () => void;
    }

    export function AuthModal(props: AuthModalProps): JSX.Element;

### Files to Create

    src/services/supabase.ts
    src/store/authStore.ts
    src/hooks/useAuthDeepLink.ts
    src/components/auth/AuthModal.tsx
    src/services/syncService.ts
    src/services/sync/contentSyncAdapter.ts
    src/services/sync/generatedSyncAdapter.ts
    src/services/sync/curriculumSyncAdapter.ts
    src/services/sync/progressSyncAdapter.ts
    src/services/sync/certificatesSyncAdapter.ts
    src/services/sync/settingsSyncAdapter.ts
    src/services/sync/journeySyncAdapter.ts
    supabase/migrations/20260113000000_create_user_content.sql
    supabase/migrations/20260113000001_create_user_progress.sql
    supabase/migrations/20260113000002_create_user_certificates.sql
    supabase/migrations/20260113000003_create_user_settings.sql
    supabase/migrations/20260113000004_create_user_journey.sql
    __tests__/store/authStore.test.ts
    __tests__/services/syncService.test.ts

### Files to Modify

    package.json - add @supabase/supabase-js dependency
    src/app/_layout.tsx - add auth initialization
    src/services/whisperService.ts - add JWT auth, remove debug logs
    src/hooks/useWhisperRecording.ts - remove debug logs
    src/app/journey-profile.tsx - add sync section
    src/store/subscriptionStore.ts - add RevenueCat user linking
    jest.setup.js - add Supabase mock
    __tests__/services/whisperService.test.ts - add authStore mock
    app.config.js - add URL scheme for deep linking
    src/store/subscriptionStore.ts - add unlinkRevenueCatUser(), add restorePurchases()
    src/store/authStore.ts - call unlinkRevenueCatUser() in signOut(), add error logging to initialize()
    src/app/journey-profile.tsx - add "Restore Purchases" button
