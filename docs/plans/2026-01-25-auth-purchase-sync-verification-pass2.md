I need you to audit the authentication, purchase recovery, and cross-device synchronization flows in this codebase. The app uses:

- **Supabase** for authentication (anonymous users, Google OAuth)
- **RevenueCat** for subscription management and entitlements
- **Zustand** for client-side state management with AsyncStorage persistence
- **Multi-device sync** for premium users to sync content across devices

### System Architecture (to verify)

1. On first app open, both Supabase and RevenueCat assign anonymous IDs independently
2. When users sign in via Google OAuth, their anonymous Supabase session is converted to a permanent identity
3. RevenueCat's `logIn(supabaseUserId)` links the RC customer to the Supabase user for cross-device entitlement recovery
4. Content sync to/from Supabase requires BOTH `isLoggedIn` AND `isPremium` to be true
5. Premium status is determined by checking `customerInfo.entitlements.active['premium']` from RevenueCat

### Use Cases to Verify

Trace through the code for each use case. Document the exact code path, verify it matches expected behavior, and identify any bugs.

---

**Task 1: First App Install**

Scenario: User downloads app for the first time on device_1

Expected behavior:
- Supabase assigns an anonymous user ID with `is_anonymous: true`
- RevenueCat assigns an anonymous customer ID (prefixed with `$RCAnonymousID:`)
- NO linking or aliasing occurs at this stage (linking happens on sign-in)
- User can use the app in free tier mode

Verify:
- Anonymous IDs are assigned correctly
- No premature linking attempts
- Default state is non-premium, not logged in

---

**Task 2: Sign-In Flow on Device 1**

Scenario: User signs in with Google OAuth on device_1

Expected behavior:
- OAuth flow completes via `linkIdentity()` (preserves anonymous user's data)
- Supabase converts anonymous user to permanent identity
- `linkRevenueCatUser(supabaseUserId)` is called to link RC customer
- Premium status is fetched from RevenueCat and updated in local state

Verify:
- `linkIdentity()` is used (not `signInWithOAuth()`) to preserve anonymous data
- RevenueCat `logIn()` is called with the Supabase user ID
- State updates correctly: `isLoggedIn: true`, `isPremium: <from RevenueCat>`

Edge cases to check:
- What happens if OAuth callback contains an error instead of tokens?
- What happens if the Google account is already linked to another Supabase user? (Look for `identity_already_exists` error handling)

---

**Task 3: Content Upload Gating (Premium Check)**

Scenario: User attempts to sync content

Expected behavior:
- Sync operations require BOTH `isLoggedIn === true` AND `isPremium === true`
- Non-premium users cannot upload content to the server
- Anonymous users cannot sync (even if somehow premium)

Verify:
- Premium check exists at the service layer (not just UI)
- The `canSync()` or equivalent function checks both conditions
- Direct calls to sync functions cannot bypass the premium check

Edge cases to check:
- Can a user bypass premium check by calling sync functions directly?
- Is the premium check in the correct location (service layer vs UI layer)?

---

**Task 4: Purchase Flow**

Scenario: User purchases premium subscription on device_1

Expected behavior:
- RevenueCat SDK handles the purchase flow
- On success, `customerInfo` is returned with active entitlements
- Local state updates to `isPremium: true`
- If user is logged in, sync should be triggered automatically

Verify:
- Purchase flow uses RevenueCat SDK correctly
- Entitlement check uses `entitlements.active['premium']` (not `all`)
- State updates happen after successful purchase

---

**Task 5: Content Sync Trigger on Purchase**

Scenario: Logged-in free user purchases premium

Expected behavior:
- After purchase completes and `isPremium` becomes true
- A full sync is automatically triggered (if user is logged in)
- User's existing local content is uploaded to server
- Any content from other devices is downloaded

Verify:
- Sync is triggered after purchase (not requiring manual action)
- Sync trigger checks both `isLoggedIn` and `isPremium`
- The trigger mechanism is reliable (not dependent on specific state transition order)

Edge cases to check:
- What if user purchases while not logged in, then logs in later?
- What if multiple events trigger sync simultaneously? (Is there debouncing?)

---

**Task 6: Cross-Device Sign-In (Different Platform)**

Scenario: User has device_1 (iOS) with premium. Downloads app on device_2 (Android) and signs in with same Google account.

Expected behavior:
- OAuth sign-in on device_2 recognizes the Google account is already linked
- User receives their existing Supabase session (same user ID as device_1)
- `linkRevenueCatUser(supabaseUserId)` is called
- RevenueCat's `logIn()` returns `customerInfo` with premium entitlement from device_1
- Full sync is triggered, downloading content from device_1

Verify:
- Cross-device sign-in correctly recovers the user's identity
- RevenueCat entitlements are recovered via `logIn()` return value
- Content sync is triggered after entitlement recovery

Edge cases to check:
- What if `linkIdentity()` fails because identity is already linked? (Should fallback to `signInWithOAuth()`)
- What if RevenueCat is unavailable? (Graceful degradation)

---

**Task 7: Same-Platform Purchase Recovery (Restore Purchases)**

Scenario: User has device_1 with premium. Downloads app on device_2 (same platform) and uses "Restore Purchases" before or after signing in.

Expected behavior:
- "Restore Purchases" calls RevenueCat's `restorePurchases()`
- If entitlements exist, `isPremium` is set to true
- If user is also logged in, sync should be triggered

Verify:
- Restore purchases flow works correctly
- Sync is triggered when user becomes eligible (logged in + premium)

Edge cases to check:
- What if user restores BEFORE signing in, then signs in later? (Does sync trigger?)
- What if user signs in BEFORE restoring? (Does sync trigger on restore?)
- The order of operations should not affect the final outcome

---

**Task 8: Expired Entitlement Handling**

Scenario: User had premium, subscription expired, downloads app on new device and signs in.

Expected behavior:
- Sign-in recovers user identity (Supabase session)
- `linkRevenueCatUser()` is called, RevenueCat returns `customerInfo`
- `entitlements.active['premium']` is `undefined` (expired = not in active)
- `isPremium` is set to `false`
- NO sync is triggered (premium required)

Verify:
- Expired entitlements are NOT in `entitlements.active` (only active entitlements)
- Premium status correctly reflects expired state
- Sync is blocked for expired users

Edge cases to check:
- What if there's cached `isPremium: true` in AsyncStorage from before expiration?
- Is there a race condition where stale cached state could trigger sync?
- Does the app fetch fresh status from RevenueCat or rely on cache?

---

### Deliverables

1. **Code path documentation** for each task showing the exact sequence of function calls
2. **Bug list** with severity, root cause, and suggested fix for each issue found
3. **Architecture assessment** noting any design weaknesses or missing safeguards
4. **Test coverage gaps** if any flows lack automated tests

### Important Notes

- Do NOT trust the stated requirements blindly. Research the actual behavior of Supabase and RevenueCat APIs.
- Check for race conditions, especially around async state updates
- Verify error handling paths, not just happy paths
- Look for defense-in-depth: premium checks should be at service layer, not just UI
- Consider the order of operations: flows should work regardless of which event happens first
