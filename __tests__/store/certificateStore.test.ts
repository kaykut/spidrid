/**
 * Tests for Certificate Store.
 *
 * The certificate store is now a wrapper around journeyStore for backwards compatibility.
 * It provides tier progress and earned status for the certification system.
 */

import { renderHook } from '@testing-library/react-native';
import { useCertificateStore } from '../../src/store/certificateStore';
import { CERTIFICATION_TIER_DEFINITIONS } from '../../src/types/certificates';

// Mock journeyStore
jest.mock('../../src/store/journeyStore', () => ({
  useJourneyStore: {
    getState: jest.fn(() => ({
      certProgress: {
        speed_reader: {
          vsUnlocked: false,
          speedProofAchieved: false,
          examUnlocked: false,
          examPassed: false,
        },
        velocity_master: {
          vsUnlocked: false,
          speedProofAchieved: false,
          examUnlocked: false,
          examPassed: false,
        },
        transcendent: {
          vsUnlocked: false,
          speedProofAchieved: false,
          examUnlocked: false,
          examPassed: false,
        },
      },
    })),
  },
}));

describe('certificateStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTierProgress', () => {
    it('returns progress for speed_reader tier', () => {
      const { result } = renderHook(() => useCertificateStore());

      const progress = result.current.getTierProgress('speed_reader');

      expect(progress).toBeDefined();
      expect(progress).toHaveProperty('vsUnlocked');
      expect(progress).toHaveProperty('speedProofAchieved');
      expect(progress).toHaveProperty('examUnlocked');
      expect(progress).toHaveProperty('examPassed');
    });

    it('returns progress for velocity_master tier', () => {
      const { result } = renderHook(() => useCertificateStore());

      const progress = result.current.getTierProgress('velocity_master');

      expect(progress).toBeDefined();
      expect(progress).toHaveProperty('vsUnlocked');
      expect(progress).toHaveProperty('speedProofAchieved');
    });

    it('returns progress for transcendent tier', () => {
      const { result } = renderHook(() => useCertificateStore());

      const progress = result.current.getTierProgress('transcendent');

      expect(progress).toBeDefined();
      expect(progress).toHaveProperty('vsUnlocked');
      expect(progress).toHaveProperty('examPassed');
    });
  });

  describe('getCertificationProgress', () => {
    it('returns earnedTiers array and tierProgress record', () => {
      const { result } = renderHook(() => useCertificateStore());

      const progress = result.current.getCertificationProgress();

      expect(progress).toHaveProperty('earnedTiers');
      expect(progress).toHaveProperty('tierProgress');
      expect(Array.isArray(progress.earnedTiers)).toBe(true);
      expect(progress.tierProgress).toHaveProperty('speed_reader');
      expect(progress.tierProgress).toHaveProperty('velocity_master');
      expect(progress.tierProgress).toHaveProperty('transcendent');
    });

    it('earnedTiers is empty when no tiers are passed', () => {
      const { result } = renderHook(() => useCertificateStore());

      const progress = result.current.getCertificationProgress();

      expect(progress.earnedTiers).toEqual([]);
    });
  });

  describe('hasTier', () => {
    it('returns false for uneearned tier', () => {
      const { result } = renderHook(() => useCertificateStore());

      expect(result.current.hasTier('speed_reader')).toBe(false);
      expect(result.current.hasTier('velocity_master')).toBe(false);
      expect(result.current.hasTier('transcendent')).toBe(false);
    });
  });
});

describe('CERTIFICATION_TIER_DEFINITIONS', () => {
  it('has 3 certification tiers', () => {
    expect(CERTIFICATION_TIER_DEFINITIONS.length).toBe(3);
  });

  it('includes speed_reader, velocity_master, transcendent tiers', () => {
    const tiers = CERTIFICATION_TIER_DEFINITIONS.map(d => d.tier);
    expect(tiers).toContain('speed_reader');
    expect(tiers).toContain('velocity_master');
    expect(tiers).toContain('transcendent');
  });

  it('each tier has required properties', () => {
    CERTIFICATION_TIER_DEFINITIONS.forEach((def) => {
      expect(def).toHaveProperty('tier');
      expect(def).toHaveProperty('name');
      expect(def).toHaveProperty('description');
      expect(def).toHaveProperty('icon');
      expect(def).toHaveProperty('color');
      expect(def).toHaveProperty('vsThreshold');
      expect(def).toHaveProperty('speedProofWpm');
      expect(def).toHaveProperty('speedProofMinComp');
      expect(def).toHaveProperty('examWpm');
      expect(def).toHaveProperty('examWords');
      expect(def).toHaveProperty('examMinComp');
    });
  });

  describe('speed_reader tier', () => {
    const tier = CERTIFICATION_TIER_DEFINITIONS.find(d => d.tier === 'speed_reader')!;

    it('has VS threshold of 40', () => {
      expect(tier.vsThreshold).toBe(40);
    });

    it('has speed proof of 900 WPM', () => {
      expect(tier.speedProofWpm).toBe(900);
    });

    it('has exam WPM of 900', () => {
      expect(tier.examWpm).toBe(900);
    });

    it('has icon ⚡', () => {
      expect(tier.icon).toBe('⚡');
    });
  });

  describe('velocity_master tier', () => {
    const tier = CERTIFICATION_TIER_DEFINITIONS.find(d => d.tier === 'velocity_master')!;

    it('has VS threshold of 60', () => {
      expect(tier.vsThreshold).toBe(60);
    });

    it('has speed proof of 1200 WPM', () => {
      expect(tier.speedProofWpm).toBe(1200);
    });

    it('has icon 🔥', () => {
      expect(tier.icon).toBe('🔥');
    });
  });

  describe('transcendent tier', () => {
    const tier = CERTIFICATION_TIER_DEFINITIONS.find(d => d.tier === 'transcendent')!;

    it('has VS threshold of 95', () => {
      expect(tier.vsThreshold).toBe(95);
    });

    it('has speed proof of 1500 WPM', () => {
      expect(tier.speedProofWpm).toBe(1500);
    });

    it('has icon 👑', () => {
      expect(tier.icon).toBe('👑');
    });
  });
});
