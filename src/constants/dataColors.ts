/**
 * Data-level Color Constants
 *
 * Colors used in curriculum topics and journey certifications.
 * Extracted from inline definitions for maintainability and reusability.
 */

/**
 * Topic Category Colors
 * Used in curriculum topic cards for visual differentiation
 */
export const TOPIC_COLORS = {
  scienceDiscovery: '#4dabf7',       // Blue
  healthMedicine: '#ff6b6b',          // Coral red
  historyCivilization: '#fab005',     // Amber
  technologyInternet: '#69db7c',      // Green
  natureWildlife: '#38d9a9',          // Teal
  climateEnvironment: '#20c997',      // Cyan
  spaceCosmos: '#9775fa',             // Purple
  psychologyMind: '#f783ac',          // Pink
  selfImprovement: '#ffd43b',         // Yellow
  businessCareers: '#748ffc',         // Periwinkle
  financeInvesting: '#ffa94d',        // Orange
  triviaFacts: '#ff922b',             // Dark orange
  worldTravel: '#22b8cf',             // Bright cyan
  artsCulture: '#da77f2',             // Lavender
  lifestyleWellness: '#94d82d',       // Lime green
} as const;

/**
 * Journey Certification Tier Colors
 * Used in certificate cards and achievement displays
 */
export const CERT_TIER_COLORS = {
  speedReader: '#fab005',       // Amber - matches speed_reader tier
  velocityMaster: '#ff6b6b',    // Coral red - matches velocity_master tier
  transcendent: '#9775fa',      // Purple - matches transcendent tier
} as const;
