# iOS & Subscription Configuration

This document contains all identifiers and configuration needed for App Store Connect, RevenueCat, and EAS builds.

## Key Identifiers

| Item | Value |
|------|-------|
| Bundle ID | `com.devoro.app` |
| Apple App ID | `6758002830` |
| Apple Team ID | `9AL54PGCAT` |
| SKU | `devoro-ios` |

## RevenueCat Configuration

| Item | Value |
|------|-------|
| Entitlement | `premium` |
| Product ID (Weekly) | `devoro_premium_weekly` |
| Product ID (Monthly) | `devoro_premium_monthly` |
| Product ID (Yearly) | `devoro_premium_yearly` |
| API Key | Set via `REVENUECAT_API_KEY` in `.env.local` |

## Environment Variables

Required in `.env.local`:

    EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
    EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
    REVENUECAT_API_KEY=appl_<your-key>

These are read in `app.config.js` via `process.env` and exposed through `Constants.expoConfig.extra`.

## EAS Build Profiles

| Profile | Distribution | Use Case |
|---------|--------------|----------|
| `development` | internal | Dev client with debugging |
| `preview` | internal | Device testing (ad-hoc) |
| `production` | store | TestFlight & App Store |

## Build Scripts

Located in `scripts/`:

| Script | Purpose |
|--------|---------|
| `clean.sh` | Clear Metro/Expo caches |
| `start.sh` | Clean Metro start |
| `build.sh <mode>` | Unified build script (see below) |

### Unified Build Script

```bash
./scripts/build.sh dev              # Build + run on iOS simulator
./scripts/build.sh dev --device     # Build + run on physical device (dev cert)
./scripts/build.sh adhoc            # Build ad-hoc IPA, install on device
./scripts/build.sh testflight       # Build + upload to TestFlight
./scripts/build.sh --help           # Show help
```

**When to use each mode:**
- `dev` - Fast iteration, hot reload, debugging
- `adhoc` - Test production-like build on device without TestFlight
- `testflight` - Release to testers or App Store

All modes automatically clean caches (Metro, Expo, EAS, Xcode DerivedData) before building.

## Subscription Files

| File | Purpose |
|------|---------|
| `src/services/purchases.ts` | RevenueCat SDK wrapper |
| `src/store/subscriptionStore.ts` | Premium state management |
| `src/components/paywall/Paywall.tsx` | Upgrade modal UI |
| `src/types/subscription.ts` | Limits (FREE: 450 WPM, 5 articles; PREMIUM: 1500 WPM, unlimited) |

## Troubleshooting

- **Bundle ID mismatch**: Must be exactly `com.devoro.app` in App Store Connect, RevenueCat, and `app.config.js`
- **Product IDs case-sensitive**: Must match exactly between App Store Connect and RevenueCat
- **Sandbox testing**: Use a sandbox tester account (never an existing Apple ID)
- **RevenueCat not working in Expo Go**: Expected behavior - SDK gracefully degrades to free tier
