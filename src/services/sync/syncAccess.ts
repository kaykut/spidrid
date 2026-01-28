export function requireSyncEligibility(): void {
  const authStore = require('../../store/authStore') as typeof import('../../store/authStore');
  const subscriptionStore = require('../../store/subscriptionStore') as typeof import('../../store/subscriptionStore');
  const { isLoggedIn } = authStore.useAuthStore.getState();
  const { isPremium } = subscriptionStore.useSubscriptionStore.getState();

  if (!isLoggedIn || !isPremium) {
    throw new Error('Authentication and premium subscription required');
  }
}
