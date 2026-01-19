# RevenueCat & App Store Connect Setup Master Plan

**Date:** 2026-01-19
**Status:** In Progress
**App:** Devoro (Speed Reading App)

## Overview

This plan covers the complete setup of in-app subscriptions for Devoro using RevenueCat as the subscription management layer and Apple App Store Connect as the payment processor.

### What's Already Implemented in Code
- [x] `src/services/purchases.ts` - RevenueCat SDK wrapper with graceful degradation
- [x] `src/store/subscriptionStore.ts` - Subscription state management
- [x] `src/components/paywall/Paywall.tsx` - Paywall UI component
- [x] `src/types/subscription.ts` - Subscription types and limits
- [x] Premium entitlement ID: `premium`
- [x] API key reference in `app.config.js` via `extra.revenueCatApiKey`

### What Needs Configuration
- [ ] Install `react-native-purchases` package
- [ ] Apple Developer Program enrollment (if not already)
- [ ] App Store Connect app creation
- [ ] In-app purchase product configuration
- [ ] RevenueCat account and project setup
- [ ] Connect RevenueCat to App Store Connect
- [ ] Configure API keys in app

---

## Phase 1: Prerequisites

### 1.1 Apple Developer Program
**Goal:** Ensure you have an active Apple Developer account

- [x] Verify Apple Developer Program membership at https://developer.apple.com/account
- [x] If not enrolled: Enroll at https://developer.apple.com/programs/enroll/ ($99/year)
- [x] Enable "Paid Applications" agreement (required for in-app purchases)

**How to verify Paid Apps agreement:**
1. Go to https://appstoreconnect.apple.com
2. Click "Agreements, Tax, and Banking" (or "Business" in newer UI)
3. Look for "Paid Apps" agreement status
4. If "Pending", complete the banking and tax forms

### 1.2 Bundle Identifier
**Goal:** Confirm your app's bundle ID

Your app's bundle ID from `app.config.js`: Check `ios.bundleIdentifier`

- [x] Verify bundle ID is set in app.config.js
- [x] Note it down: `com.devoro.app`

---

## Phase 2: App Store Connect Setup

### 2.1 Create App in App Store Connect
**Goal:** Register Devoro in App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Click "Apps" (or "My Apps")
3. Click the "+" button → "New App"
4. Fill in:
   - **Platforms:** iOS
   - **Name:** Devoro (or your desired App Store name)
   - **Primary Language:** English (or preferred)
   - **Bundle ID:** Select from dropdown (must match app.config.js)
   - **SKU:** `devoro-001` (or any unique identifier you choose)
   - **User Access:** Full Access (or as needed)
5. Click "Create"

- [ ] App created in App Store Connect
- [ ] Note the Apple ID (numeric): `___________________________________`

### 2.2 Create Subscription Group
**Goal:** Set up a subscription group for your premium offering

1. In your app in App Store Connect, go to the "Subscriptions" tab (or "In-App Purchases" → "Subscriptions" in older UI)
2. Click "+" next to "Subscription Groups" (or "Create" button)
3. Enter subscription group details:
   - **Reference Name:** `Devoro Premium` (internal name, not shown to users)
4. Click "Create"

- [ ] Subscription group created
- [ ] Note the Subscription Group ID: `___________________________________`

### 2.3 Create Subscription Product
**Goal:** Create the actual subscription product users will purchase

1. In the subscription group you just created, click "+" to add a subscription
2. Fill in:
   - **Reference Name:** `Premium Monthly` (internal, not shown to users)
   - **Product ID:** `devoro_premium_monthly` (this is what code references)
3. Click "Create"
4. Configure the subscription:
   - **Subscription Duration:** 1 Month (or your preferred duration)
   - **Subscription Price:**
     - Click "Add Subscription Price"
     - Select base country/region (e.g., United States)
     - Choose price tier (e.g., $4.99/month - Tier 5)
     - Click "Next" → "Confirm"
   - **Localization:** Add at least one localization
     - Display Name: `Devoro Premium`
     - Description: `Unlock unlimited reading speed and content access`

- [ ] Subscription product created
- [ ] Product ID noted: `devoro_premium_monthly` (or your chosen ID)
- [ ] Pricing configured
- [ ] At least one localization added

### 2.4 (Optional) Additional Subscription Tiers
If you want yearly subscription:

1. In same subscription group, click "+"
2. Create `devoro_premium_yearly` with 1 Year duration
3. Price appropriately (typically ~17% discount, e.g., $49.99/year vs $4.99/month)

- [ ] Yearly subscription created (optional)

### 2.5 Create Sandbox Test Account
**Goal:** Set up a test account for testing purchases without real charges

1. In App Store Connect, go to "Users and Access"
2. Click "Sandbox" tab (or "Sandbox Testers" in left sidebar)
3. Click "+" to create new sandbox tester
4. Fill in:
   - First Name, Last Name
   - Email: Must be a real email you control, but NOT an existing Apple ID
   - Password: Create a strong password
   - Country/Region: Match your primary market
5. Save

**Important:** Use a unique email that's never been used as an Apple ID

- [ ] Sandbox tester created
- [ ] Email: `___________________________________`
- [ ] Password saved securely

---

## Phase 3: RevenueCat Setup

### 3.1 Create RevenueCat Account
**Goal:** Set up RevenueCat account and project

1. Go to https://www.revenuecat.com
2. Click "Get Started" or "Sign Up"
3. Create account with email/password or OAuth
4. Verify email

- [ ] RevenueCat account created

### 3.2 Create Project in RevenueCat
**Goal:** Create a project for Devoro

1. In RevenueCat dashboard, click "Create new project" (or "+ Project")
2. Enter project name: `Devoro`
3. Click "Create"

- [ ] Project created

### 3.3 Add iOS App to Project
**Goal:** Register your iOS app in RevenueCat

1. In your project, click "Project Settings" → "Apps" (or similar navigation)
2. Click "Add App" or "+ New App"
3. Select "App Store" (iOS)
4. Fill in:
   - **App Name:** Devoro iOS
   - **Bundle ID:** (paste your bundle ID from Phase 1.2)
5. Click "Save" / "Add"

- [ ] iOS app added to RevenueCat

### 3.4 Connect RevenueCat to App Store Connect
**Goal:** Enable RevenueCat to verify purchases and manage subscriptions

**Step A: Get App-Specific Shared Secret**
1. In App Store Connect, go to your app
2. Go to "App Information" section (in left sidebar under General)
3. Scroll to "App-Specific Shared Secret"
4. Click "Manage" → "Generate" (or just copy if exists)
5. Copy the shared secret (looks like a long alphanumeric string)

**Step B: Add to RevenueCat**
1. In RevenueCat, go to your iOS app settings
2. Find "App Store Connect App-Specific Shared Secret" field
3. Paste the shared secret
4. Click "Save"

- [ ] Shared secret generated in App Store Connect
- [ ] Shared secret added to RevenueCat

### 3.5 Set Up In-App Purchase Key (App Store Server Notifications v2)
**Goal:** Enable real-time subscription updates via server-to-server notifications

**Step A: Create In-App Purchase Key in App Store Connect**
1. Go to https://appstoreconnect.apple.com → "Users and Access"
2. Click "Integrations" tab (or "Keys" in left sidebar)
3. Click "In-App Purchase" (or look for In-App Purchase Keys section)
4. Click "+" to generate new key
5. Name it: `RevenueCat`
6. Download the `.p8` file (save it securely!)
7. Note the Key ID shown

**Step B: Add to RevenueCat**
1. In RevenueCat iOS app settings
2. Find "In-App Purchase Key" section
3. Upload the `.p8` file
4. Enter the Key ID
5. Enter your Issuer ID (found in App Store Connect Keys page header)
6. Click "Save"

- [ ] In-App Purchase Key created in App Store Connect
- [ ] Key ID noted: `___________________________________`
- [ ] Issuer ID noted: `___________________________________`
- [ ] Key uploaded to RevenueCat

### 3.6 Configure Server Notifications URL
**Goal:** Let Apple notify RevenueCat about subscription events

1. In RevenueCat, find "Apple Server to Server Notification URL" (in app settings)
2. Copy this URL
3. In App Store Connect, go to your app → "App Information"
4. Find "App Store Server Notifications" section
5. Paste the RevenueCat URL in the "Production Server URL" field
6. Set "Version" to "Version 2 Notifications"
7. Save

- [ ] Server notification URL configured in App Store Connect

---

## Phase 4: RevenueCat Products & Entitlements

### 4.1 Create Entitlement
**Goal:** Create the "premium" entitlement your code expects

1. In RevenueCat project, go to "Entitlements" (left sidebar)
2. Click "New" or "+ Entitlement"
3. **Identifier:** `premium` (MUST match your code exactly)
4. **Description:** Premium access
5. Save

- [ ] Entitlement `premium` created

### 4.2 Create Product
**Goal:** Map App Store product to RevenueCat

1. Go to "Products" in RevenueCat
2. Click "New" or "+ Product"
3. **Identifier:** `devoro_premium_monthly` (MUST match App Store Connect Product ID)
4. **App:** Select your iOS app
5. Save

- [ ] Product created in RevenueCat
- [ ] (Optional) Yearly product created if applicable

### 4.3 Attach Product to Entitlement
**Goal:** Link the product to the entitlement

1. Go to "Entitlements"
2. Click on `premium`
3. In the "Products" section, click "Attach"
4. Select `devoro_premium_monthly`
5. Save

- [ ] Product attached to `premium` entitlement

### 4.4 Create Offering
**Goal:** Create an offering that your app will fetch

1. Go to "Offerings" in RevenueCat
2. Click "New" or "+ Offering"
3. **Identifier:** `default`
4. Save
5. Click on the offering to configure packages
6. Add a package:
   - Click "New Package" or "+"
   - Select package type: `$rc_monthly` (for monthly)
   - Attach product: `devoro_premium_monthly`
7. Save

- [ ] Offering `default` created
- [ ] Monthly package added and configured
- [ ] (Optional) Yearly package added if applicable

---

## Phase 5: Code Configuration

### 5.1 Install RevenueCat SDK
**Goal:** Add the RevenueCat package to your project

Run in terminal:
```bash
npm install react-native-purchases
```

Then rebuild (required for native module):
```bash
npx expo prebuild
npx expo run:ios
```

- [ ] `react-native-purchases` installed
- [ ] Native build completed

### 5.2 Configure API Key
**Goal:** Add RevenueCat API key to your app config

1. In RevenueCat, go to Project Settings → API Keys
2. Copy the "Public SDK Key" for iOS (starts with `appl_`)
3. Add to `app.config.js`:

```javascript
export default {
  // ... existing config
  extra: {
    revenueCatApiKey: 'appl_XXXXXXXXXXXXXX', // Your key here
    // ... other extras
  },
};
```

**Security Note:** For production, consider using environment variables:
```javascript
extra: {
  revenueCatApiKey: process.env.REVENUECAT_API_KEY,
},
```

- [ ] API key copied from RevenueCat
- [ ] API key added to app.config.js

### 5.3 Verify Product ID Alignment
**Goal:** Ensure product IDs match across all systems

| Location | Product ID | Status |
|----------|------------|--------|
| App Store Connect | `devoro_premium_monthly` | [ ] Verified |
| RevenueCat Products | `devoro_premium_monthly` | [ ] Verified |
| Code expectations | Fetched from offerings | [ ] Verified |

---

## Phase 6: Testing

### 6.1 Test in Simulator (Limited)
**Goal:** Verify SDK loads without crashing

1. Run app in iOS Simulator
2. Trigger paywall
3. Verify no crash (purchases won't work, but SDK should load)
4. Check console for RevenueCat initialization logs

- [ ] No crash on simulator

### 6.2 Test on Physical Device with Sandbox
**Goal:** Complete end-to-end purchase test

**Prerequisites:**
- Physical iOS device
- Development build installed (`npx expo run:ios`)
- Sandbox tester account ready

**Steps:**
1. Sign out of App Store on device (Settings → Your Name → Sign Out)
2. Open Devoro app
3. Trigger paywall (reach content limit or try high WPM)
4. Tap "Subscribe Now"
5. When prompted, sign in with sandbox tester account
6. Complete purchase
7. Verify premium access is granted

**Expected behavior:**
- "[Sandbox]" label appears in payment sheet
- No real charges occur
- `isPremium` becomes `true` after purchase

- [ ] Sandbox purchase completed successfully
- [ ] Premium status reflected in app
- [ ] Restore purchases works

### 6.3 Verify RevenueCat Dashboard
**Goal:** Confirm purchase data flows to RevenueCat

1. In RevenueCat, go to "Customers"
2. Find the test customer (search by app user ID)
3. Verify:
   - Subscription appears
   - Entitlement `premium` is active
   - Transaction details are correct

- [ ] Customer visible in RevenueCat
- [ ] Entitlements correct

---

## Phase 7: App Store Submission Prep

### 7.1 In-App Purchase Review
**Goal:** Submit subscription for Apple's review

1. In App Store Connect, go to your subscription
2. Ensure status shows "Ready to Submit" (not "Missing Metadata")
3. Add required review information:
   - Review screenshot (if prompted)
   - Review notes (if needed)

- [ ] Subscription product ready for review

### 7.2 App Privacy & Compliance
**Goal:** Complete App Store requirements

1. In App Store Connect → App Privacy section
2. Declare data collection (RevenueCat collects some device info)
3. Update privacy policy URL if needed

- [ ] Privacy declarations completed

### 7.3 Submit App for Review
**Goal:** Include in-app purchases in app submission

When submitting your app:
1. In "Build" section, ensure In-App Purchases are selected
2. The subscription will be reviewed alongside the app

- [ ] App submitted with in-app purchases

---

## Quick Reference

### RevenueCat Dashboard URLs
- Dashboard: https://app.revenuecat.com
- Documentation: https://docs.revenuecat.com

### App Store Connect URLs
- App Store Connect: https://appstoreconnect.apple.com
- Developer Account: https://developer.apple.com/account

### Key Identifiers (Fill as you go)
| Item | Value |
|------|-------|
| Bundle ID | `com.devoro.app` |
| Apple App ID | |
| Subscription Group ID | |
| Product ID (Monthly) | `devoro_premium_monthly` |
| Product ID (Yearly) | |
| RevenueCat Entitlement | `premium` |
| RevenueCat API Key | `appl_...` |
| Sandbox Tester Email | |

### Troubleshooting Checklist
- [ ] Bundle ID matches exactly across all platforms
- [ ] Product IDs match exactly (case-sensitive!)
- [ ] Shared secret is correct and active
- [ ] Agreements & Banking complete in App Store Connect
- [ ] Sandbox tester email has never been an Apple ID before

---

## Notes & Questions Log

Use this section to track questions that arise during setup:

| Step | Question | Answer |
|------|----------|--------|
| | | |
| | | |
| | | |

---

## Change Log

| Date | Change |
|------|--------|
| 2026-01-19 | Initial plan created |
