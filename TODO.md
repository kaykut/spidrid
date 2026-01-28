# Devoro Future Enhancements

## Pre-Launch Tasks

### Privacy Policy
- [ ] Publish privacy policy page at www.devoro.app/privacy
- Required for App Store submission

## Post-iOS Launch: Android/Google Play

### Google Play Developer Account
- [ ] Create Google Play Developer account ($25 one-time fee)
- [ ] Register app in Google Play Console

### Fastlane Setup for Android Metadata
- [ ] Enable Google Play Developer API in Google Cloud Console
- [ ] Create service account and download JSON key
- [ ] Install Fastlane: `gem install fastlane`
- [ ] Run `fastlane supply` to push localized metadata (already in `fastlane/metadata/android/`)

**Note:** Metadata files for all 11 locales are ready in `fastlane/metadata/android/`. Just need credentials setup.

## Paywall Conversion Optimization

### Visual Trial Timeline
- Add Apple-endorsed timeline graphic showing trial flow
- Show: "Today → Full access" → "Day 7 → First charge"
- Requires free trial to be configured in RevenueCat first

### First-Time User Discounts
- Implement limited-time discount for new users
- Configure introductory pricing in RevenueCat
- Add countdown/urgency UI to paywall
