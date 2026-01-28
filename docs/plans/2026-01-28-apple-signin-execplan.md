# Add Native Apple ID Sign-In on iOS + Google Web OAuth Everywhere

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md at the repository root.


## Purpose / Big Picture

After this change, Devoro users can sign in with Apple ID on iOS using the native Sign in with Apple UI, while Google sign-in continues to use the existing web OAuth flow on both iOS and Android. Apple sign-in is intentionally not offered on Android. The Apple flow still behaves like Google in user impact: it links the current anonymous Supabase user on the first device, and when the Apple identity is already linked elsewhere it signs in to the existing account. This preserves sync, purchases, and user data behavior. The app remains usable without any sign-in, and Apple sign-in only appears when the user enables multi-device sync.

A human can verify this by opening the Sync Across Devices modal on iOS, using the native “Continue with Apple” button, and seeing the account transition to “Signed In.” On a second iOS device, the same Apple ID should sign into the existing account and synced content should appear. On Android, no Apple sign-in option should be displayed.


## Progress

- [x] (2026-01-28 18:20Z) Drafted ExecPlan and saved to docs/plans/2026-01-28-apple-signin-execplan.md.
- [x] (2026-01-28 19:05Z) Tightened App Review compliance guidance for Sign in with Apple (button usage, privacy, prominence, review notes).
- [x] (2026-01-28 20:20Z) Add native Apple sign-in support in auth store (iOS-only) with identity-linking + fallback sign-in.
- [x] (2026-01-28 20:20Z) Add Apple native button to AuthModal (iOS-only) and keep Google web button on both platforms.
- [ ] (2026-01-28 18:20Z) Configure Apple Developer + Supabase Apple provider settings for native iOS sign-in.
- [ ] (2026-01-28 20:20Z) Update tests and validation (completed: npm test; remaining: npm run typecheck, npm run lint, manual device verification).


## Surprises & Discoveries

- None yet.


## Decision Log

- Decision: Use native Sign in with Apple on iOS and do not offer Apple sign-in on Android.
  Rationale: Native iOS avoids Apple OAuth client-secret rotation and delivers the platform’s expected UX. Android support is intentionally dropped per product decision, while Google web OAuth remains available everywhere.
  Date/Author: 2026-01-28 / Codex

- Decision: Keep deep link fallback specific to Google only.
  Rationale: Apple sign-in is native on iOS and does not use the deep link callback. The only provider that needs a deep link retry is Google’s web OAuth flow.
  Date/Author: 2026-01-28 / Codex

- Decision: Add Apple sign-in strings to the auth localization namespace and update the localization ExecPlan accordingly.
  Rationale: New user-facing strings must be captured by the localization system so M6 integration remains comprehensive and translation files stay in sync with the UI.
  Date/Author: 2026-01-28 / Codex


## Outcomes & Retrospective

(To be filled after implementation and validation.)


## Context and Orientation

Devoro is a React Native app built with Expo Router. Authentication is managed by Supabase and a Zustand store at `src/store/authStore.ts`. The current flow creates an anonymous Supabase user on launch and uses `supabase.auth.linkIdentity({ provider: 'google' })` when the user taps “Continue with Google.” The deep link handler at `src/hooks/useAuthDeepLink.ts` finalizes the session when the OAuth provider redirects back to `devoro://auth/callback`. If the identity is already linked to another user (common on a second device), the deep link handler retries a sign-in via `supabase.auth.signInWithOAuth` for Google.

The sign-in UI lives in `src/components/auth/AuthModal.tsx`, which currently only renders a Google button. The Journey Profile screen opens this modal for premium users. Localization infrastructure exists under `src/locales/` and is governed by the UI localization ExecPlan at `docs/plans/2026-01-20-ui-localization.md`.

“Link identity” means attaching a third-party identity (Apple or Google) to the existing anonymous Supabase user so the user ID stays the same. This is the first-device flow. “Sign in with OAuth” means starting a new OAuth flow that replaces the anonymous session with the already-linked account. This is the second-device fallback when Supabase returns the `identity_already_exists` error.

## App Review Compliance Notes

Apple’s App Review Guidelines require that apps using third-party login services also offer an equivalent login option that limits data collection to name and email, allows private relay email, and does not track users for advertising without consent. Our Apple ID option satisfies this requirement, and we must keep it as prominent as Google in the sign-in UI so it is an “equivalent option.” We should also avoid gating core app functionality behind login, because Apple expects apps without significant account-based features to allow usage without sign-in; Devoro already does this by defaulting to anonymous sessions.

Use the official Sign in with Apple button patterns and phrasing. On iOS native, render Apple’s provided button component rather than a custom button so the UI matches Apple’s branding requirements. If App Review needs to test login, provide clear notes and any required accounts or configuration in App Store Connect, and ensure backend services (Supabase auth) are live during review.

Ensure the app’s privacy policy covers authentication data collection and explicitly states whether any tracking occurs. Sign in with Apple must not be used for advertising tracking without consent, and the “hidden email” option must be supported (Apple handles this when configured correctly). We must not store Apple credentials outside the device or reuse Apple identity tokens beyond authentication; Supabase should handle token exchange and storage via its SDK.


## Plan of Work

First, extend the auth store to support native Apple sign-in on iOS. Add `signInWithApple()` that uses `expo-apple-authentication` to obtain an Apple ID token and a random nonce, then calls `supabase.auth.linkIdentity({ provider: 'apple', token, nonce })` to attach Apple to the current anonymous user. If Supabase returns `identity_already_exists`, immediately call `supabase.auth.signInWithIdToken({ provider: 'apple', token, nonce })` so Device 2 signs in to the existing account. On Android, `signInWithApple()` should throw a clear “not supported” error so the UI can ignore it safely. When Apple returns the user’s full name (first authorization only), store it via `supabase.auth.updateUser` so the account has a display name.

Next, keep `src/hooks/useAuthDeepLink.ts` unchanged for Google’s web OAuth flow (still needed on both platforms). The deep link fallback continues to retry sign-in for Google when the identity already exists.

Then, update `src/components/auth/AuthModal.tsx` to render Apple’s native button on iOS only using `AppleAuthenticationButton`, and keep the Google web OAuth button on both platforms. The Apple button should only render when `AppleAuthentication.isAvailableAsync()` is true. Reuse the existing error handling pattern (local error + store error). The modal should continue to behave exactly as before for Google, while Apple appears only on iOS.

Add the new Apple label to localization files. Insert a `modal.continue_apple` key in `src/locales/en/auth.json` and all other locale files under `src/locales/*/auth.json`. Update the UI localization ExecPlan to record the new key and its translation requirement. Do not leave untranslated keys missing from any locale files; use a temporary English fallback string if a translation is not yet available so the i18n system always finds the key.

Update tests to cover the new provider. In `__tests__/store/authStore.test.ts`, add coverage for native Apple sign-in behavior and the “identity already exists” fallback. In `__tests__/hooks/useAuthDeepLink.test.ts`, keep the Google fallback coverage as-is.

Finally, perform the Apple Developer and Supabase configuration steps described below, then validate the flow manually on iOS and Android.


## Concrete Steps

1) Update the auth store for native Apple sign-in.

   - Edit `src/store/authStore.ts` to add native `signInWithApple()` using Apple ID token + nonce and Supabase `linkIdentity` / `signInWithIdToken`, plus `updateUser` for full name.
   - Add `expo-apple-authentication` and `expo-crypto` dependencies for native sign-in and secure nonce generation.
   - Update `app.config.js` to include the Apple authentication plugin, set `ios.usesAppleSignIn: true`, and set `CFBundleAllowMixedLocalizations: true` so the Apple button uses the device locale.

2) Update the sign-in UI.

   - Edit `src/components/auth/AuthModal.tsx` to add the native Apple sign-in button on iOS only (use `AppleAuthenticationButton`), and keep the Google button on all platforms.

3) Add localization keys.

   - Edit `src/locales/en/auth.json` and all other locale auth files under `src/locales/` to add `modal.continue_apple`.
   - Update the UI localization ExecPlan (`docs/plans/2026-01-20-ui-localization.md`) to reflect the new key.

4) Update tests.

   - Edit `__tests__/store/authStore.test.ts`.
   - Edit `__tests__/hooks/useAuthDeepLink.test.ts`.

5) Configure Apple Developer and Supabase.

   - In Apple Developer Portal, ensure the App ID for `com.devoro.app` has “Sign in with Apple” enabled.
   - In Supabase Dashboard > Authentication > Providers > Apple, enable Apple and set the client ID to the iOS bundle identifier (`com.devoro.app`). For native sign-in, no web Service ID or rotating client secret is required.
   - Keep `devoro://auth/callback` in Supabase Redirect URLs for Google web OAuth (still required).
   - In Apple Developer “Email Communication” settings, register your app’s email domain if you plan to send emails via Apple’s private relay.

6) Run checks from the repo root (`/Users/kaya/Coding/devoro`).

   - npm test
   - npm run typecheck
   - npm run lint

   Expected: all tests pass and no TypeScript or lint errors.


## Validation and Acceptance

Manual behavior checks are required because the OAuth flow depends on real Apple credentials.

- iOS Device A (first device):
  - Open Journey Profile > Sync Across Devices.
  - Tap the native “Continue with Apple” button.
  - Complete the Apple ID login using the system dialog.
  - The modal closes and the Sync card shows “Signed In” with the user’s email or “Account verified.”
  - RevenueCat linking happens (check logs for linkRevenueCatUser if needed).

- iOS Device B (second device):
  - Install and open the app to create a new anonymous user.
  - Tap the native “Continue with Apple” button.
  - If the Apple identity is already linked to another user, the app signs in to that account using the Apple ID token.
  - After login, synced content from Device A appears.

- Regression check:
  - “Continue with Google” still works on both devices using the existing flow.
  - Signing out returns the app to an anonymous session and removes linked RevenueCat user.

Acceptance is met when iOS can sign in with Apple natively (including second-device fallback), Android does not show Apple, and Google behavior is unchanged.


## Idempotence and Recovery

All code changes are additive and safe to reapply. If a step fails during OAuth configuration, no local data is lost. You can retry Apple Developer or Supabase configuration without changing any code. Keep the Apple private key and generated client secret out of the repository; if the secret is compromised, revoke the key in Apple Developer Portal and generate a new one, then update Supabase.


## Artifacts and Notes

Example log snippets that indicate success:

  [AuthStore] onAuthStateChange event: SIGNED_IN
  [AuthStore] session: { userId: '...', isAnonymous: false }
  [Auth] Identity already exists, signing in to existing account

Example OAuth redirect URL (do not paste secrets into logs):

  devoro://auth/callback#access_token=...&refresh_token=...


## Interfaces and Dependencies

At the end of this plan, these interfaces must exist:

- In `src/store/authStore.ts`, `signInWithApple()` uses:
  - `AppleAuthentication.signInAsync(...)` to obtain an Apple ID token and nonce.
  - `supabase.auth.linkIdentity({ provider: 'apple', token, nonce })` to attach Apple to the current user.
  - `supabase.auth.signInWithIdToken({ provider: 'apple', token, nonce })` as a fallback when the identity already exists.

- In `src/hooks/useAuthDeepLink.ts`, the identity-already-exists path still calls:
  - `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: 'devoro://auth/callback' } })`

- In `src/components/auth/AuthModal.tsx`, the Apple button is only rendered on iOS using `AppleAuthenticationButton`, while Google remains a standard button on all platforms.

- In `src/locales/*/auth.json`, the key `modal.continue_apple` exists for every locale.

Change Note (2026-01-28): Switched the plan to native Sign in with Apple on iOS only (no Android Apple), retained Google web OAuth everywhere, and updated steps to use `expo-apple-authentication` plus Apple’s native button.
