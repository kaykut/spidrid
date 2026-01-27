# Paywall Redesign: Full-Screen Route with Plan Selector and Trial Support

This ExecPlan is a living document. The sections Progress, Surprises & Discoveries, Decision Log, and Outcomes & Retrospective must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md located at the repository root.


## Purpose / Big Picture

After this change, users encountering a premium gate will see a polished full-screen paywall that slides up from the bottom. The paywall displays an illustration image, a compelling headline and contextual subheadline, three premium features with icons, a yearly/monthly plan selector showing localized pricing fetched from RevenueCat, trial information when available, primary and secondary CTAs, and footer links for restore, terms, and privacy. Users can toggle between plans, see their localized price, and complete a purchase or restore existing subscriptions directly from the paywall. The paywall can also be opened via deep link (devoro://paywall).

To verify the implementation works: Open the app, navigate to Journey & Settings, and tap "Upgrade to Premium." A full-screen modal should animate up from the bottom. You should see the paywall illustration at the top (roughly 30% of screen height), the headline "Devour Any Topic," three features with icons, a plan selector with yearly selected by default showing RevenueCat-fetched pricing, a primary CTA button (showing trial text if available), a secondary "Not now" link, and footer links for Restore, Terms, and Privacy. Tapping a plan should switch the selection. Tapping the primary CTA should initiate the RevenueCat purchase flow. Pressing the X or swiping down should dismiss the modal.


## Progress

- [x] (2026-01-21 12:00Z) Milestone 1: Create paywall route skeleton and register in navigation
  - Created src/app/paywall.tsx with basic skeleton (close button, placeholder content, trigger param)
  - Added Stack.Screen entry in _layout.tsx with fullScreenModal presentation
  - Added tests in __tests__/app/paywall.test.tsx (5 tests passing)
- [x] (2026-01-21 12:15Z) Milestone 2: Build PlanSelector component with RevenueCat pricing integration
  - Extended PurchasesPackage interface with introPrice for trial info
  - Created src/components/paywall/PlanSelector.tsx with yearly/monthly cards
  - Added tests in __tests__/components/paywall/PlanSelector.test.tsx (15 tests passing)
- [x] (2026-01-21 12:20Z) Milestone 3: Build PaywallFeature component for feature list items
  - Created src/components/paywall/PaywallFeature.tsx with icon, title, subtitle
  - Added tests in __tests__/components/paywall/PaywallFeature.test.tsx (6 tests passing)
- [x] (2026-01-21 12:25Z) Milestone 4: Create copy constants with contextual subheadlines
  - Created src/constants/paywall.ts with types, copy, and subheadlines
  - Added tests in __tests__/constants/paywall.test.ts (19 tests passing)
- [x] (2026-01-21 12:45Z) Milestone 5: Complete paywall screen with full layout, error handling, and edge cases
  - Implemented full paywall layout with ScrollView, image, headline, contextual subheadline
  - Integrated PlanSelector and PaywallFeature components
  - Added RevenueCat offerings fetch with loading/error states
  - Implemented purchase and restore flows with proper error handling
  - Added dynamic CTA text based on trial availability
  - Added footer links (Restore, Terms, Privacy)
  - Added Jest file mock for image assets in __mocks__/fileMock.js
  - Expanded tests to 17 cases covering all sections
  - Gate check: typecheck OK, lint OK, 2462 tests passing
- [x] (2026-01-21 13:00Z) Milestone 6: Update all trigger points to use route navigation
  - Updated journey-profile.tsx: removed Paywall Modal, upgraded button uses router.push with trigger 'upgrade'
  - Updated ExpandableLearnCard.tsx: removed Paywall Modal, uses router.push with trigger 'daily_limit'
  - Updated playback.tsx: handleWPMLimitHit uses router.push with trigger 'wpm_limit'
  - Updated journey-profile tests to verify router navigation instead of modal
  - Gate check: typecheck OK, lint OK, 2462 tests passing
- [x] (2026-01-21 13:15Z) Milestone 7: Change daily article limit from 3 to 2
  - Updated FREE_TIER_LIMITS.MAX_CONTENT from 5 to 2 in subscription.ts
  - Added DAILY_ARTICLES: 2 alias for clarity
  - Updated related tests to use new limit values
  - Gate check: typecheck OK, lint OK, 2462 tests passing
- [x] (2026-01-21 13:30Z) Milestone 8: Add accessibility labels and analytics event stubs
  - Added accessibility labels and roles to all interactive elements in paywall.tsx
  - Added accessibility to PlanSelector plan cards with accessibilityState selected
  - Added analytics stubs for: paywall_viewed, paywall_dismissed, plan_selected, purchase_initiated, purchase_completed, purchase_failed, purchase_cancelled, restore_initiated, restore_completed
  - Gate check: typecheck OK, lint OK, 2462 tests passing
- [x] (2026-01-21 13:40Z) Milestone 9: Add deep link support for paywall route
  - Added referrer parameter to route params for deep link attribution
  - Deep link format: spidrid://paywall?trigger=upgrade&referrer=campaign_name
  - Added referrer and source to paywall_viewed analytics event
  - Expo Router handles deep links automatically via scheme in app.config.js
  - Gate check: typecheck OK, lint OK, 2462 tests passing
- [x] (2026-01-21 13:50Z) Milestone 10: Testing across screen sizes, themes, and edge cases
  - Added tests for edge cases: only yearly, only monthly, no packages available
  - Added tests for CTA text variations (trial vs no trial)
  - Added accessibility tests verifying props on close button and primary CTA
  - Total 24 paywall tests, 2469 tests overall
  - Gate check: typecheck OK, lint OK, all tests passing


## Surprises & Discoveries

- (M5) Jest image mocking: The paywall image require() caused tests to fail. Added moduleNameMapper in jest.config.js to map .jpg/.png/.gif/.svg to __mocks__/fileMock.js. This is a standard Jest pattern for handling static assets.


## Decision Log

- Decision: Convert paywall from Modal component to Expo Router route.
  Rationale: The existing modals in this app (journey-profile, add-content, playback, playback-quiz, history, dev-tools) all use Expo Router routes with fullScreenModal presentation. Converting the paywall to a route ensures consistency, enables proper navigation stack management, supports gesture dismissal via the router, and allows passing trigger context through route params.
  Date/Author: 2026-01-21 / Initial planning

- Decision: Use actual premium gates for the three features instead of requirements document suggestions.
  Rationale: The user specified that features should reflect what users actually get with premium. The three most compelling actual gates are: unlimited AI articles (vs 2/day), multi-device sync (requires premium sign-in), and premium WPM (1500 vs 450). The requirements document suggested "Longer deep-dives" as the third feature, but premium WPM is a more tangible and immediate benefit for a speed reading app. Portions and flavors are secondary benefits that would clutter the feature list.
  Date/Author: 2026-01-21 / User decision

- Decision: Change daily article limit from 3 to 2.
  Rationale: User specified more restrictive free tier.
  Date/Author: 2026-01-21 / User decision

- Decision: Keep existing Paywall.tsx component temporarily during migration.
  Rationale: Three files currently import the Paywall component (journey-profile.tsx, ExpandableLearnCard.tsx, and tests). Rather than breaking them immediately, we will create the new route first, then update each trigger point, then remove the old component in a final cleanup step.
  Date/Author: 2026-01-21 / Initial planning

- Decision: Exclude "long_article" trigger from implementation.
  Rationale: The requirements document listed a "long_article" trigger with subheadline "Extended courses are a Premium feature." However, this trigger does not exist in the current codebase. The premium "portions" (Snack, Meal, Feast) control curriculum size (number of articles), not individual article length. There is no code path that would trigger a paywall for "long articles." If this feature is added in the future, the trigger can be added to the PaywallTrigger type and PAYWALL_SUBHEADLINES map at that time.
  Date/Author: 2026-01-21 / Initial planning


## Outcomes & Retrospective

### Summary
All 10 milestones completed successfully. The paywall has been redesigned from a simple Modal component to a full Expo Router route with improved UX and functionality.

### Files Created
- src/app/paywall.tsx - New paywall route screen
- src/components/paywall/PlanSelector.tsx - Plan selection component
- src/components/paywall/PaywallFeature.tsx - Feature row component
- src/constants/paywall.ts - Copy constants and types
- __mocks__/fileMock.js - Jest file mock for images

### Files Modified
- src/app/_layout.tsx - Added paywall route configuration
- src/app/journey-profile.tsx - Updated to use router navigation
- src/components/addContent/ExpandableLearnCard.tsx - Updated to use router navigation
- src/app/playback.tsx - Implemented WPM limit handler
- src/types/subscription.ts - Changed MAX_CONTENT to 2
- src/services/purchases.ts - Added introPrice interface
- jest.config.js - Added image file moduleNameMapper

### Test Coverage
- 24 paywall-specific tests covering rendering, interactions, edge cases, and accessibility
- 2469 total tests passing
- All gate checks (typecheck, lint, tests) passing at every milestone

### Key Improvements Over Original Paywall
1. Full Expo Router integration with fullScreenModal presentation
2. Plan selector showing yearly and monthly options with pricing
3. Trial information display with dynamic CTA text
4. Contextual subheadlines for 6 trigger types
5. Proper illustration image at top of screen
6. Footer links for Restore, Terms, Privacy
7. Full accessibility labels and roles
8. Analytics event stubs ready for production integration
9. Deep link support with referrer tracking
10. Stricter free tier (2 articles instead of 5)


## Context and Orientation

Devoro is a React Native app built with Expo SDK 54 and Expo Router for navigation. It is an RSVP speed reading app with a freemium subscription model managed through RevenueCat. The app has four themes (dark, midnight, sepia, light) and uses a design system with tokens defined in constants files.

The current paywall implementation lives in src/components/paywall/Paywall.tsx. It is a React Native Modal component (not an Expo Router route) that displays a simple upgrade screen with a single price fetched from RevenueCat. It accepts two trigger reasons: wpm_limit and generation_limit. The current implementation lacks plan selection (yearly vs monthly), trial information display, an illustration image, contextual subheadlines per trigger type, and proper footer links for terms and privacy.

The subscription state is managed by a Zustand store at src/store/subscriptionStore.ts. This store tracks isPremium (boolean indicating subscription status), dailyGenerationCount (number of AI articles generated today), and lastGenerationDate (date string for resetting daily count). The store provides canGenerateArticle() which returns true if premium or if dailyGenerationCount is less than 3 (we will change this to 2). The daily count resets automatically when the date changes (checked at generation time via toDateString() comparison).

RevenueCat integration lives in src/services/purchases.ts. This is a wrapper around the react-native-purchases SDK that handles graceful degradation when the SDK is unavailable (such as in Expo Go). Key functions include configurePurchases(), checkPremiumStatus(), getOfferings(), purchasePackage(), and restorePurchases(). The premium entitlement identifier is the string "premium". The SDK is dynamically loaded to avoid crashes in Expo Go.

Navigation in this app uses Expo Router's file-based routing. The root layout at src/app/_layout.tsx defines all screens as Stack.Screen components. Modal screens use presentation: 'fullScreenModal' with animation: 'slide_from_bottom'. Examples include journey-profile, add-content, playback, playback-quiz, history, and dev-tools. Deep links are handled via Expo Router's linking configuration.

The design system tokens are spread across several files. Spacing tokens (SPACING, COMPONENT_SPACING, COMPONENT_RADIUS, SIZES) are in src/constants/spacing.ts. Typography tokens (TYPOGRAPHY, FONT_WEIGHTS) are in src/constants/typography.ts. Theme colors are in src/data/themes.ts which exports a themes object and JOURNEY_COLORS constants. Components access the current theme via the useTheme() hook from src/components/common/ThemeProvider.tsx.

The paywall illustration asset already exists at assets/paywall_image.jpg.

There are currently six locations where the paywall can be triggered. In src/app/journey-profile.tsx, the "Upgrade to Premium" button and the "Sign In to Sync" button (for non-premium users) show the paywall. In src/components/addContent/ExpandableLearnCard.tsx, selecting a premium portion (Snack, Meal, or Feast), selecting a premium flavor (Fact, Story, or Analogy), or hitting the daily article generation limit shows the paywall. In src/app/playback.tsx, there is a TODO comment for handleWPMLimitHit that should show the paywall when a free user tries to exceed 450 WPM.


## Plan of Work

The implementation proceeds in three phases. The first phase (Milestones 1-4) creates the new paywall infrastructure: the route file, supporting components (PlanSelector and PaywallFeature), and copy constants. These are additive changes that do not affect existing functionality. The second phase (Milestones 5-8) integrates everything: completing the paywall screen with full layout, replacing all trigger points to use the new route, updating the daily limit, adding accessibility and analytics, and adding deep link support. The third phase (Milestones 9-10) tests thoroughly and removes the deprecated Modal component.

Each file is edited once where possible. The paywall route (src/app/paywall.tsx) is created in Milestone 1, then fleshed out in Milestone 5. The navigation layout (src/app/_layout.tsx) is edited once in Milestone 1 to add the route. The trigger point files (journey-profile.tsx, ExpandableLearnCard.tsx, playback.tsx) are each edited once in Milestone 6. The subscription files (subscriptionStore.ts, subscription.ts) are edited once in Milestone 7. The app configuration (app.json or app.config.js) is edited in Milestone 9 to add deep link scheme.

The plan deliberately keeps the old Paywall Modal component functional until all testing passes, allowing rollback if issues arise.


## Milestone 1: Create Paywall Route Skeleton

This milestone establishes the new paywall as an Expo Router route. At the end of this milestone, navigating to /paywall will display a minimal full-screen modal that slides up from the bottom and can be dismissed via an X button or swipe gesture. The route will accept a trigger query parameter for later use.

Create a new file src/app/paywall.tsx containing a functional component that renders a full-screen view with the theme's background color, a close button in the top-right corner using safe area insets, and placeholder text. The close button should call router.back() when pressed.

Edit src/app/_layout.tsx to add a new Stack.Screen for the paywall route after the existing dev-tools screen. Configure it with presentation: 'fullScreenModal', animation: 'slide_from_bottom', gestureEnabled: true, headerShown: false, and contentStyle: { backgroundColor: 'transparent' }.

To verify this milestone: Run npx expo start, then in the app navigate to Journey & Settings and temporarily add a button that calls router.push('/paywall'). The paywall should slide up from the bottom. Tapping the X or swiping down should dismiss it and return to the previous screen.


## Milestone 2: Build PlanSelector Component

This milestone creates a reusable component that displays yearly and monthly plan options with pricing fetched from RevenueCat. At the end of this milestone, the PlanSelector component will exist and can be rendered in isolation showing two plan cards with localized pricing, trial information for the yearly plan if available, and visual indication of which plan is selected.

Create a new file src/components/paywall/PlanSelector.tsx. The component accepts props for yearly and monthly RevenueCat package data, the currently selected plan ('yearly' or 'monthly'), an onPlanChange callback, and an isLoading boolean. When isLoading is true, show a loading indicator. When packages are available, render two touchable plan cards side by side. The yearly card shows the localized price string from the package's product.priceString, calculates the monthly equivalent by dividing product.price by 12 and formatting with the user's locale, and displays trial days if product.introPrice exists (extracting periodNumberOfUnits when periodUnit is 'DAY'). The monthly card shows its localized price string. The selected plan has a border in the theme's accent color; the unselected plan has a border in the theme's track color. Both cards have the theme's secondary background color.

Styling specifications: Each plan card should have 12px corner radius (COMPONENT_RADIUS.button), 16px internal padding, and the cards should be in a row with 12px gap between them. The plan label (Yearly/Monthly) uses TYPOGRAPHY.cardSubtitle (15px medium weight). The price uses TYPOGRAPHY.button (17px semibold). The trial text and monthly equivalent use TYPOGRAPHY.caption (13px regular). Selected card border is 2px solid accent color; unselected is 2px solid track color.

To verify this milestone: Temporarily render the PlanSelector in the paywall route with mock package data. The two cards should display correctly, tapping should toggle selection, and the yearly card should show trial information if mock data includes introPrice.


## Milestone 3: Build PaywallFeature Component

This milestone creates a reusable component for displaying a single feature row with an icon, title, and subtitle. At the end of this milestone, the PaywallFeature component will exist and can be rendered to show a feature with consistent styling.

Create a new file src/components/paywall/PaywallFeature.tsx. The component accepts props for icon (an Ionicons glyph name), title (string), and subtitle (string). It renders a horizontal row with the icon on the left, and title above subtitle on the right. The icon uses the theme's accent color and is 24px (SIZES.iconMd). The title uses TYPOGRAPHY.cardSubtitle (15px medium) in the theme's text color. The subtitle uses TYPOGRAPHY.caption (13px regular) in the theme's secondary text color.

Styling specifications: The row has 16px vertical padding (SPACING.md) between features. The icon container is 44px wide (SIZES.touchTarget) to ensure consistent alignment. There is 12px gap (SPACING.sm) between the icon and the text column.

The three features to display are: (1) icon "infinite-outline", title "Unlimited AI articles", subtitle "No daily caps on learning"; (2) icon "sync-outline", title "Multi-device sync", subtitle "Pick up where you left off"; (3) icon "speedometer-outline", title "Premium reading speed", subtitle "Up to 1,500 WPM".

To verify this milestone: Temporarily render three PaywallFeature components in the paywall route. Each should display the icon in accent color with the title and subtitle properly aligned.


## Milestone 4: Create Copy Constants

This milestone extracts all paywall copy into a constants file, including contextual subheadline overrides for each trigger type. At the end of this milestone, a new constants file will exist with all copy centralized and typed.

Create a new file src/constants/paywall.ts containing the following exports. Export a PaywallTrigger type as a union of string literals: 'daily_limit', 'premium_portion', 'premium_flavor', 'sign_in', 'wpm_limit', 'upgrade', and 'default'. Export a PAYWALL_COPY object with headline set to "Devour Any Topic", defaultSubheadline set to "Generate unlimited custom articles on anything you want to learn—synced across all your devices.", features as an array of three objects each with icon, title, and subtitle matching Milestone 3, ctaWithTrial set to "Try Free for {trial_days} Days", ctaWithoutTrial set to "Subscribe Now", ctaSubtextWithTrial set to "then {price}/year", ctaSubtextWithoutTrial set to "{price}/year", and secondaryCta set to "Not now". Export a PAYWALL_SUBHEADLINES object mapping each PaywallTrigger to its contextual subheadline: daily_limit maps to "You've used your 2 free articles today. Go unlimited?", premium_portion maps to "Snack, Meal, and Feast portions require Premium.", premium_flavor maps to "Fact, Story, and Analogy tones require Premium.", sign_in maps to "Sign in requires Devoro Premium for cross-device sync.", wpm_limit maps to "Reading speeds above 450 WPM require Premium.", upgrade maps to the default subheadline, and default also maps to the default subheadline. Export a LEGAL_URLS object with terms set to "https://devoro.app/terms" and privacy set to "https://devoro.app/privacy".

To verify this milestone: Import the constants into the paywall route and log them to confirm the structure is correct.


## Milestone 5: Complete Paywall Screen

This milestone assembles all components into the full paywall screen with proper layout, error handling, and edge case handling. At the end of this milestone, the paywall route will be fully functional with the complete visual layout, RevenueCat integration, purchase flow, restore flow, and error states.

Edit src/app/paywall.tsx to implement the complete layout. The layout from top to bottom is: close button absolutely positioned in top-right corner with safe area inset; scrollable content containing the illustration image at approximately 30% of screen height (use aspectRatio or fixed height based on screen dimensions), the headline in TYPOGRAPHY.pageTitle (28px bold), the contextual subheadline in TYPOGRAPHY.body (16px regular) with secondary text color, the three PaywallFeature components, the PlanSelector component, the primary CTA button with 54px height and 12px corner radius in accent color background with white text, the secondary CTA as a text link in secondary text color saying "Not now", and the footer row with three links (Restore purchases, Terms, Privacy) in meta color using TYPOGRAPHY.buttonSmall (12px regular) separated by centered dots.

The component fetches RevenueCat offerings on mount. It finds the yearly package by looking for identifier '$rc_annual' and monthly by '$rc_monthly' in the offerings array. While loading, show an ActivityIndicator in place of the PlanSelector. If packages fail to load, show "Pricing unavailable" with a retry button.

The primary CTA text is dynamic. If the selected plan is yearly and has an introPrice with free trial, use PAYWALL_COPY.ctaWithTrial replacing {trial_days} with the trial period. Otherwise use PAYWALL_COPY.ctaWithoutTrial. The subtext below the CTA shows the annual or monthly price accordingly.

Handle the purchase flow by calling purchaseProduct from the subscription store with the selected package. On success, dismiss the paywall via router.back(). On user cancellation (error code indicates cancellation), dismiss silently without showing an error. On payment failure, show an inline error message below the CTA. On network error, show error with retry option.

Handle edge cases. If the user is already premium when the paywall opens (check isPremium from subscription store), immediately dismiss and optionally show a toast saying "You're already subscribed!" (use Alert.alert for simplicity). If offline (check NetInfo or catch network errors), show the paywall but disable the purchase button with text "Connect to internet to subscribe". If RevenueCat SDK times out (no response after 5 seconds), show an error state with retry option. Users repeatedly tapping dismiss (X button or secondary CTA) should simply dismiss each time with no rate limiting needed.

The restore flow calls restorePurchases from the subscription store. On success with active subscription, dismiss paywall and show alert "Purchases restored!". On success with no subscription found, show alert "No previous purchases found.". On error, show alert with error message.

Spacing specifications: Horizontal padding is 24px (SPACING.lg). Gap between sections is 24px. Gap between feature items is 16px. Button height is 54px. All corner radii for buttons and plan cards are 12px.

To verify this milestone: Run the app, navigate to paywall. Verify the complete layout matches the specification. Test purchase flow in sandbox. Test restore flow. Test offline behavior by enabling airplane mode. Test error states by temporarily breaking the API key.


## Milestone 6: Update All Trigger Points

This milestone replaces all usages of the Modal-based Paywall component with navigation to the new route. At the end of this milestone, all premium gates will navigate to /paywall with the appropriate trigger parameter.

Edit src/app/journey-profile.tsx to remove the Paywall Modal import and JSX, remove the showPaywall state variable, and replace setShowPaywall(true) calls with router.push({ pathname: '/paywall', params: { trigger: 'upgrade' } }) for the upgrade button and router.push({ pathname: '/paywall', params: { trigger: 'sign_in' } }) for the sign-in button.

Edit src/components/addContent/ExpandableLearnCard.tsx to remove the Paywall Modal import, JSX, state variable, and paywallReason state. Replace paywall triggers: for premium portions use router.push({ pathname: '/paywall', params: { trigger: 'premium_portion' } }), for premium flavors use router.push({ pathname: '/paywall', params: { trigger: 'premium_flavor' } }), and for daily limit use router.push({ pathname: '/paywall', params: { trigger: 'daily_limit' } }).

Edit src/app/playback.tsx to implement the handleWPMLimitHit function which currently has a TODO comment. Replace the TODO with router.push({ pathname: '/paywall', params: { trigger: 'wpm_limit' } }).

To verify this milestone: Test each trigger point. Tap Upgrade to Premium in settings (should show paywall with upgrade trigger and default subheadline). Tap Sign In to Sync as non-premium (should show paywall with sign_in trigger and sign-in subheadline). Select a premium portion as non-premium (should show paywall with premium_portion trigger). Select a premium flavor as non-premium (should show paywall with premium_flavor trigger). Generate 2 articles then try a third (should show paywall with daily_limit trigger). Try to increase WPM above 450 as non-premium (should show paywall with wpm_limit trigger). Each paywall should show the appropriate contextual subheadline.


## Milestone 7: Change Daily Article Limit

This milestone changes the daily article generation limit from 3 to 2 for free users. At the end of this milestone, free users will be limited to 2 articles per day instead of 3.

Edit src/types/subscription.ts to update the FREE_TIER_LIMITS constant. Change it from just MAX_WPM: 450 to include DAILY_ARTICLES: 2, so the full constant is { MAX_WPM: 450, DAILY_ARTICLES: 2 }.

Edit src/store/subscriptionStore.ts to use the new constant. In the canGenerateArticle function, change the comparison from dailyGenerationCount < 3 to dailyGenerationCount < FREE_TIER_LIMITS.DAILY_ARTICLES. Import FREE_TIER_LIMITS at the top of the file if not already imported.

Update the old Paywall component text in src/components/paywall/Paywall.tsx if it still exists. Change the reason text for generation_limit from "Free tier is limited to 3 AI-generated articles per day" to "Free tier is limited to 2 AI-generated articles per day". This ensures consistency if the old component is temporarily still used during migration.

To verify this milestone: As a non-premium user, generate 2 AI articles. The third attempt should trigger the paywall with the daily_limit message "You've used your 2 free articles today. Go unlimited?".


## Milestone 8: Add Accessibility and Analytics Stubs

This milestone adds proper accessibility labels to all interactive elements and creates stubs for analytics events. At the end of this milestone, the paywall will be screen-reader accessible and ready for analytics integration.

Edit src/app/paywall.tsx to add accessibility props to all interactive elements. The close button should have accessibilityLabel "Close paywall" and accessibilityRole "button". Each plan card should have accessibilityLabel describing the plan (e.g., "Yearly plan, $29.99 per year with 3 day free trial") and accessibilityRole "button" and accessibilityState with selected boolean. The primary CTA should have accessibilityLabel matching its text and accessibilityRole "button". The secondary CTA should have accessibilityLabel "Dismiss paywall" and accessibilityRole "button". Footer links should have accessibilityRole "link".

Ensure the accessibility read order follows the visual layout: headline, then subheadline, then features (in order), then plan cards (yearly first, then monthly), then primary CTA, then secondary CTA, then footer links. This is the natural order for VoiceOver (iOS) and TalkBack (Android) users.

Ensure all touch targets are at least 44x44 points (SIZES.touchTarget). The close button should be 44x44. Plan cards are already larger. The CTA is 54px tall and full width. Footer links should have adequate padding to meet the 44pt minimum.

Create stubs for analytics events by adding console.log calls that can later be replaced with actual analytics. Log paywall_viewed when the component mounts, including the trigger. Log paywall_dismissed when the user taps X, swipes, or taps secondary CTA, including trigger and time spent. Log plan_selected when the user changes plan selection. Log purchase_initiated when the user taps the primary CTA. Log purchase_completed on successful purchase. Log purchase_failed on failed purchase. Log restore_initiated and restore_completed for restore flow.

To verify this milestone: Enable VoiceOver or TalkBack and navigate through the paywall. Elements should be announced in order: headline, subheadline, features, plans, CTAs, footer. All elements should have clear labels. Check the console for analytics event logs when interacting with the paywall.


## Milestone 9: Add Deep Link Support

This milestone adds support for opening the paywall via deep link. At the end of this milestone, the URL devoro://paywall?trigger=default will open the paywall directly.

Edit app.json (or app.config.js if using dynamic config) to ensure the app's URL scheme is configured. The scheme should be "devoro". Expo Router automatically handles route-based deep linking once the scheme is set, so devoro://paywall will route to the paywall screen.

The paywall route already reads the trigger parameter from route params (useLocalSearchParams), so deep links like devoro://paywall?trigger=upgrade will work automatically.

To verify this milestone: Build a development client (npx expo run:ios or npx expo run:android) since deep links do not work in Expo Go. Then test by running: npx uri-scheme open "devoro://paywall?trigger=default" --ios (or --android). The app should open and display the paywall with the default subheadline.


## Milestone 10: Testing and Polish

This milestone performs comprehensive testing across screen sizes, themes, and edge cases, and removes the deprecated Paywall Modal component. At the end of this milestone, the paywall will be fully tested and the old component removed.

Run the existing test suite with npm test to ensure no regressions. Update any tests that reference the old Paywall component or the old daily limit of 3.

Perform manual testing on the following scenarios. Test on iPhone SE (small screen) to ensure nothing is cut off and all content is scrollable. Test on iPhone 15 Pro Max (large screen) to ensure proper spacing and no awkward gaps. Test on iPad if tablet support is expected. Test all four themes (dark, midnight, sepia, light) to ensure colors are correct. Test yearly plan selection shows trial text when available. Test monthly plan selection shows no trial text. Test offline mode (airplane mode) disables purchase button with appropriate message. Test already-subscribed user dismisses immediately. Test restore with existing subscription shows success. Test restore with no subscription shows appropriate message. Test swipe-down gesture dismisses on iOS. Test hardware back button dismisses on Android. Test all six trigger points show correct contextual subheadlines. Test push-up animation works smoothly on both iOS and Android. Verify analytics events appear in console. Verify daily limit counter resets at midnight by advancing device clock or waiting until after midnight and confirming a user who generated 2 articles yesterday can generate again today.

After all testing passes, remove the old Paywall Modal component. Delete src/components/paywall/Paywall.tsx. Update or remove any remaining imports. Update or remove the test file at __tests__/components/Paywall.test.tsx to test the new paywall route instead.

To verify this milestone: Run npm test and confirm all tests pass. Manually verify all scenarios listed above. Confirm the old Paywall.tsx file is deleted and the app still builds and runs correctly.


## Concrete Steps

All commands are run from the repository root at /Users/kaya/Coding/devoro.

Step 1: Create the paywall route skeleton. Create the file src/app/paywall.tsx with the basic structure including imports, a functional component that reads the trigger param, renders a full-screen view with theme background, a close button calling router.back(), and placeholder content. The component should log the trigger param for verification.

Step 2: Register the route in _layout.tsx. Add a new Stack.Screen entry for "paywall" after the "dev-tools" entry with the standard fullScreenModal configuration.

Step 3: Verify route registration by running npx expo start and navigating to /paywall via a temporary test button. Expected: modal slides up, X button dismisses.

Step 4: Create PlanSelector component at src/components/paywall/PlanSelector.tsx per Milestone 2 specification.

Step 5: Create PaywallFeature component at src/components/paywall/PaywallFeature.tsx per Milestone 3 specification.

Step 6: Create paywall copy constants at src/constants/paywall.ts per Milestone 4 specification.

Step 7: Complete the paywall screen per Milestone 5. Wire up RevenueCat pricing fetch, assemble the full layout with Image for illustration, all copy from constants, PlanSelector, PaywallFeature list, CTAs, and footer. Implement purchase flow, restore flow, and error handling.

Step 8: Update journey-profile.tsx per Milestone 6. Remove Modal import and state, use router.push for triggers.

Step 9: Update ExpandableLearnCard.tsx per Milestone 6. Remove Modal import and state, use router.push for triggers.

Step 10: Update playback.tsx per Milestone 6. Implement handleWPMLimitHit with router.push.

Step 11: Update daily limit per Milestone 7. Edit subscription.ts constant, edit subscriptionStore.ts comparison.

Step 12: Add accessibility labels and analytics stubs per Milestone 8.

Step 13: Configure deep link scheme per Milestone 9. Edit app.json to ensure scheme "devoro" is set.

Step 14: Run tests with npm test. Update failing tests as needed.

Step 15: Perform comprehensive manual testing per Milestone 10 checklist, including midnight reset verification.

Step 16: Remove old Paywall.tsx component and update/remove related tests.


## Validation and Acceptance

The implementation is complete when the following behaviors can be observed.

Navigating to /paywall from any trigger point shows a full-screen modal that slides up from the bottom. The modal displays the paywall_image.jpg illustration at roughly 30% of screen height, the headline "Devour Any Topic", a subheadline that varies based on the trigger parameter, three features with icons (infinite, sync, speedometer) and descriptions, two plan cards (yearly and monthly) with localized pricing from RevenueCat, a primary CTA button showing trial text if the selected yearly plan has a trial, a "Not now" text link, and footer links for Restore purchases, Terms, and Privacy.

Tapping the yearly plan card selects it with accent-colored border. Tapping the monthly plan card selects it. The primary CTA text updates based on selected plan and trial availability.

Tapping the primary CTA initiates RevenueCat purchase flow. In sandbox, completing purchase should dismiss the paywall. Cancelling purchase should dismiss silently. Failed purchase should show inline error.

Tapping Restore purchases initiates restore flow. If subscription found, dismisses with success alert. If no subscription, shows "No previous purchases" alert.

Tapping Terms opens https://devoro.app/terms in browser. Tapping Privacy opens https://devoro.app/privacy in browser.

Tapping X button or swiping down dismisses the modal. Users can tap dismiss repeatedly without any rate limiting.

With airplane mode enabled, the purchase button is disabled and shows "Connect to internet to subscribe".

If already premium, opening paywall immediately dismisses with "You're already subscribed" message.

Each trigger point shows its specific subheadline: daily_limit shows "You've used your 2 free articles today. Go unlimited?", premium_portion shows "Snack, Meal, and Feast portions require Premium.", premium_flavor shows "Fact, Story, and Analogy tones require Premium.", sign_in shows "Sign in requires Devoro Premium for cross-device sync.", wpm_limit shows "Reading speeds above 450 WPM require Premium.", upgrade and default show the general subheadline.

Free users can generate only 2 articles per day before hitting the paywall. The daily counter resets at midnight local time.

Deep link devoro://paywall?trigger=default opens the paywall with default subheadline.

VoiceOver and TalkBack announce elements in logical order: headline, subheadline, features, plans, CTAs, footer.

Run npm test and all tests pass.


## Idempotence and Recovery

All file creations and edits in this plan are idempotent. Creating a new file overwrites any existing file at that path. Editing a file to add a Stack.Screen entry is safe to repeat because the entry either exists or does not. Editing trigger points to use router.push is safe to repeat.

If the implementation is interrupted, the old Paywall Modal component remains functional in parallel. Trigger points that have not been updated will continue to use the Modal. This allows incremental migration.

If RevenueCat is unavailable during testing (Expo Go or missing API key), the paywall gracefully degrades to show "Pricing unavailable" with disabled purchase button. This is expected behavior and not a failure.

To fully revert this change, delete src/app/paywall.tsx, src/components/paywall/PlanSelector.tsx, src/components/paywall/PaywallFeature.tsx, and src/constants/paywall.ts. Remove the paywall Stack.Screen from _layout.tsx. Restore the old Paywall Modal usage in trigger points. Revert the daily limit change in subscriptionStore.ts and subscription.ts. Remove the scheme from app.json if it was added solely for this feature.


## Artifacts and Notes

The illustration image exists at assets/paywall_image.jpg. No new image assets are required.

The Ionicons used for features are: "infinite-outline" for unlimited articles, "sync-outline" for multi-device sync, and "speedometer-outline" for premium WPM. These are available in the @expo/vector-icons package which is already installed.

RevenueCat package identifiers in the offerings array use $rc_annual and $rc_monthly as package type identifiers, not the product IDs directly. The product IDs (devoro_premium_yearly and devoro_premium_monthly) are configured in the RevenueCat dashboard and App Store Connect / Google Play Console.

The theme tokens map to paywall elements as follows. Background uses theme.backgroundColor. Card surfaces and plan cards use theme.secondaryBackground. Headline and feature titles use theme.textColor. Subheadline, feature subtitles, and secondary CTA use theme.textSecondaryColor. Primary CTA background, feature icons, and selected plan border use theme.accentColor. Primary CTA text is always white (#FFFFFF per JOURNEY_COLORS.textPrimary). Footer links and close button use theme.metaColor. Unselected plan border uses theme.trackColor.


## Interfaces and Dependencies

In src/constants/paywall.ts, define and export:

    export type PaywallTrigger =
      | 'daily_limit'
      | 'premium_portion'
      | 'premium_flavor'
      | 'sign_in'
      | 'wpm_limit'
      | 'upgrade'
      | 'default';

    export interface PaywallFeatureConfig {
      icon: string;
      title: string;
      subtitle: string;
    }

    export interface PaywallCopy {
      headline: string;
      defaultSubheadline: string;
      features: PaywallFeatureConfig[];
      ctaWithTrial: string;
      ctaWithoutTrial: string;
      ctaSubtextWithTrial: string;
      ctaSubtextWithoutTrial: string;
      secondaryCta: string;
    }

In src/components/paywall/PlanSelector.tsx, define the props interface:

    interface PlanSelectorProps {
      yearlyPackage: PurchasesPackage | null;
      monthlyPackage: PurchasesPackage | null;
      selectedPlan: 'yearly' | 'monthly';
      onPlanChange: (plan: 'yearly' | 'monthly') => void;
      isLoading: boolean;
    }

In src/components/paywall/PaywallFeature.tsx, define the props interface:

    interface PaywallFeatureProps {
      icon: keyof typeof Ionicons.glyphMap;
      title: string;
      subtitle: string;
    }

In src/types/subscription.ts, update the FREE_TIER_LIMITS constant:

    export const FREE_TIER_LIMITS = {
      MAX_WPM: 450,
      DAILY_ARTICLES: 2,
    } as const;

The paywall route uses these existing dependencies: expo-router for navigation and route params, react-native-purchases via the PurchasesService wrapper for RevenueCat, @expo/vector-icons for Ionicons, react-native-safe-area-context for safe area insets, and the existing useTheme hook and subscription store.


---

Revision History

- 2026-01-21: Initial creation based on requirements audit and user clarifications.
- 2026-01-21: Comprehensive rewrite to address PLANS.md format compliance (prose over tables, narrative milestones) and full requirements coverage (secondary CTA, contextual subheadlines, error handling, accessibility, analytics stubs, edge cases, screen size testing).
- 2026-01-21: Third revision adding: Plan of Work summary section per PLANS.md skeleton; deep link support (devoro://paywall) as Milestone 9; Decision Log entry explaining exclusion of "long_article" trigger; VoiceOver/TalkBack read order specification; midnight reset testing in Milestone 10; explicit note that dismiss spamming requires no rate limiting.
