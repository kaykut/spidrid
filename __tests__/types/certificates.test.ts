/**
 * Tests for Certificate Types - Milestone 1
 *
 * Tests the CertificationTier system, definitions,
 * tier readiness checking, and legacy compatibility.
 */

import {
  CertificationTier,
  CertificationProgress,
  CertificationTierProgress,
  CERTIFICATION_TIER_DEFINITIONS,
  INITIAL_CERTIFICATION_PROGRESS,
  READINESS_WPM_THRESHOLD,
  READINESS_ACCURACY_THRESHOLD,
  getCertificationTierDefinition,
  checkTierReadiness,
  getRequiredTextCounts,
  mapLegacyToTier,
  getCertificateDefinition,
  CERTIFICATE_DEFINITIONS,
} from '../../src/types/certificates';

describe('Certification Tier Definitions', () => {
  describe('CERTIFICATION_TIER_DEFINITIONS', () => {
    it('has exactly 3 tiers', () => {
      expect(CERTIFICATION_TIER_DEFINITIONS.length).toBe(3);
    });

    it('includes quick_reader, speed_reader, lightning_reader', () => {
      const tiers = CERTIFICATION_TIER_DEFINITIONS.map(d => d.tier);
      expect(tiers).toContain('quick_reader');
      expect(tiers).toContain('speed_reader');
      expect(tiers).toContain('lightning_reader');
    });

    describe('quick_reader tier', () => {
      const tier = CERTIFICATION_TIER_DEFINITIONS.find(d => d.tier === 'quick_reader')!;

      it('requires 600 WPM', () => {
        expect(tier.requirement.minWPM).toBe(600);
      });

      it('requires 80% accuracy', () => {
        expect(tier.requirement.minAccuracy).toBe(80);
      });

      it('requires 2 short + 1 medium texts', () => {
        expect(tier.requirement.requiredTexts.short).toBe(2);
        expect(tier.requirement.requiredTexts.medium).toBe(1);
      });

      it('has no prerequisite', () => {
        expect(tier.requirement.prerequisite).toBeUndefined();
      });
    });

    describe('speed_reader tier', () => {
      const tier = CERTIFICATION_TIER_DEFINITIONS.find(d => d.tier === 'speed_reader')!;

      it('requires 900 WPM', () => {
        expect(tier.requirement.minWPM).toBe(900);
      });

      it('requires 85% accuracy', () => {
        expect(tier.requirement.minAccuracy).toBe(85);
      });

      it('requires 1 medium + 2 long texts', () => {
        expect(tier.requirement.requiredTexts.medium).toBe(1);
        expect(tier.requirement.requiredTexts.long).toBe(2);
      });

      it('requires quick_reader as prerequisite', () => {
        expect(tier.requirement.prerequisite).toBe('quick_reader');
      });
    });

    describe('lightning_reader tier', () => {
      const tier = CERTIFICATION_TIER_DEFINITIONS.find(d => d.tier === 'lightning_reader')!;

      it('requires 1200 WPM', () => {
        expect(tier.requirement.minWPM).toBe(1200);
      });

      it('requires 90% accuracy', () => {
        expect(tier.requirement.minAccuracy).toBe(90);
      });

      it('requires 3 long texts', () => {
        expect(tier.requirement.requiredTexts.long).toBe(3);
      });

      it('requires speed_reader as prerequisite', () => {
        expect(tier.requirement.prerequisite).toBe('speed_reader');
      });
    });
  });

  describe('getCertificationTierDefinition', () => {
    it('returns correct definition for valid tier', () => {
      const quickReader = getCertificationTierDefinition('quick_reader');
      expect(quickReader).toBeDefined();
      expect(quickReader!.title).toBe('Quick Reader');

      const speedReader = getCertificationTierDefinition('speed_reader');
      expect(speedReader).toBeDefined();
      expect(speedReader!.title).toBe('Speed Reader');

      const lightningReader = getCertificationTierDefinition('lightning_reader');
      expect(lightningReader).toBeDefined();
      expect(lightningReader!.title).toBe('Lightning Reader');
    });

    it('returns undefined for invalid tier', () => {
      // @ts-expect-error Testing invalid input
      const invalid = getCertificationTierDefinition('invalid_tier');
      expect(invalid).toBeUndefined();
    });
  });
});

describe('Certification Progress', () => {
  describe('INITIAL_CERTIFICATION_PROGRESS', () => {
    it('starts with zero WPM and accuracy', () => {
      expect(INITIAL_CERTIFICATION_PROGRESS.highestCertificationWPM).toBe(0);
      expect(INITIAL_CERTIFICATION_PROGRESS.averageCertificationAccuracy).toBe(0);
    });

    it('starts with zero texts passed', () => {
      expect(INITIAL_CERTIFICATION_PROGRESS.shortTextsPassed).toBe(0);
      expect(INITIAL_CERTIFICATION_PROGRESS.mediumTextsPassed).toBe(0);
      expect(INITIAL_CERTIFICATION_PROGRESS.longTextsPassed).toBe(0);
    });

    it('starts with no earned tiers', () => {
      expect(INITIAL_CERTIFICATION_PROGRESS.earnedTiers).toEqual([]);
    });

    it('quick_reader is unlocked by default', () => {
      expect(INITIAL_CERTIFICATION_PROGRESS.tierProgress.quick_reader.isUnlocked).toBe(true);
    });

    it('speed_reader is locked by default', () => {
      expect(INITIAL_CERTIFICATION_PROGRESS.tierProgress.speed_reader.isUnlocked).toBe(false);
    });

    it('lightning_reader is locked by default', () => {
      expect(INITIAL_CERTIFICATION_PROGRESS.tierProgress.lightning_reader.isUnlocked).toBe(false);
    });

    it('no tier is ready or earned initially', () => {
      const tiers: CertificationTier[] = ['quick_reader', 'speed_reader', 'lightning_reader'];
      tiers.forEach(tier => {
        expect(INITIAL_CERTIFICATION_PROGRESS.tierProgress[tier].isReady).toBe(false);
        expect(INITIAL_CERTIFICATION_PROGRESS.tierProgress[tier].isEarned).toBe(false);
      });
    });
  });
});

describe('Readiness Thresholds', () => {
  it('WPM threshold is 90%', () => {
    expect(READINESS_WPM_THRESHOLD).toBe(0.9);
  });

  it('Accuracy threshold is 95%', () => {
    expect(READINESS_ACCURACY_THRESHOLD).toBe(0.95);
  });
});

describe('checkTierReadiness', () => {
  describe('quick_reader (no prerequisite)', () => {
    it('is unlocked with empty earnedTiers', () => {
      const result = checkTierReadiness('quick_reader', 0, 0, []);
      expect(result.isUnlocked).toBe(true);
    });

    it('is ready when WPM >= 540 (90% of 600) and accuracy >= 76% (95% of 80%)', () => {
      const result = checkTierReadiness('quick_reader', 540, 76, []);
      expect(result.isUnlocked).toBe(true);
      expect(result.isReady).toBe(true);
    });

    it('is not ready when WPM < 540', () => {
      const result = checkTierReadiness('quick_reader', 539, 80, []);
      expect(result.isUnlocked).toBe(true);
      expect(result.isReady).toBe(false);
    });

    it('is not ready when accuracy < 76%', () => {
      const result = checkTierReadiness('quick_reader', 600, 75, []);
      expect(result.isUnlocked).toBe(true);
      expect(result.isReady).toBe(false);
    });
  });

  describe('speed_reader (requires quick_reader)', () => {
    it('is not unlocked without quick_reader earned', () => {
      const result = checkTierReadiness('speed_reader', 1000, 90, []);
      expect(result.isUnlocked).toBe(false);
      expect(result.isReady).toBe(false);
    });

    it('is unlocked with quick_reader earned', () => {
      const result = checkTierReadiness('speed_reader', 0, 0, ['quick_reader']);
      expect(result.isUnlocked).toBe(true);
    });

    it('is ready when WPM >= 810 (90% of 900) and accuracy >= 80.75% (95% of 85%)', () => {
      const result = checkTierReadiness('speed_reader', 810, 81, ['quick_reader']);
      expect(result.isUnlocked).toBe(true);
      expect(result.isReady).toBe(true);
    });
  });

  describe('lightning_reader (requires speed_reader)', () => {
    it('is not unlocked without speed_reader earned', () => {
      const result = checkTierReadiness('lightning_reader', 1500, 95, ['quick_reader']);
      expect(result.isUnlocked).toBe(false);
    });

    it('is unlocked with speed_reader earned', () => {
      const result = checkTierReadiness('lightning_reader', 0, 0, ['quick_reader', 'speed_reader']);
      expect(result.isUnlocked).toBe(true);
    });

    it('is ready when WPM >= 1080 (90% of 1200) and accuracy >= 85.5% (95% of 90%)', () => {
      const result = checkTierReadiness('lightning_reader', 1080, 86, ['quick_reader', 'speed_reader']);
      expect(result.isUnlocked).toBe(true);
      expect(result.isReady).toBe(true);
    });
  });
});

describe('getRequiredTextCounts', () => {
  it('returns correct counts for quick_reader', () => {
    const counts = getRequiredTextCounts('quick_reader');
    expect(counts.short).toBe(2);
    expect(counts.medium).toBe(1);
    expect(counts.long).toBe(0);
  });

  it('returns correct counts for speed_reader', () => {
    const counts = getRequiredTextCounts('speed_reader');
    expect(counts.short).toBe(0);
    expect(counts.medium).toBe(1);
    expect(counts.long).toBe(2);
  });

  it('returns correct counts for lightning_reader', () => {
    const counts = getRequiredTextCounts('lightning_reader');
    expect(counts.short).toBe(0);
    expect(counts.medium).toBe(0);
    expect(counts.long).toBe(3);
  });

  it('returns zeros for invalid tier', () => {
    // @ts-expect-error Testing invalid input
    const counts = getRequiredTextCounts('invalid');
    expect(counts.short).toBe(0);
    expect(counts.medium).toBe(0);
    expect(counts.long).toBe(0);
  });
});

describe('Legacy Certificate Compatibility', () => {
  describe('CERTIFICATE_DEFINITIONS (legacy)', () => {
    it('has 2 legacy certificate types', () => {
      expect(CERTIFICATE_DEFINITIONS.length).toBe(2);
    });

    it('includes speed_900 and speed_1500', () => {
      const types = CERTIFICATE_DEFINITIONS.map(d => d.type);
      expect(types).toContain('speed_900');
      expect(types).toContain('speed_1500');
    });
  });

  describe('getCertificateDefinition (legacy)', () => {
    it('returns correct definition for speed_900', () => {
      const def = getCertificateDefinition('speed_900');
      expect(def).toBeDefined();
      expect(def!.requirement.wpm).toBe(900);
    });

    it('returns correct definition for speed_1500', () => {
      const def = getCertificateDefinition('speed_1500');
      expect(def).toBeDefined();
      expect(def!.requirement.wpm).toBe(1500);
    });

    it('returns undefined for invalid type', () => {
      // @ts-expect-error Testing invalid input
      const def = getCertificateDefinition('invalid');
      expect(def).toBeUndefined();
    });
  });

  describe('mapLegacyToTier', () => {
    it('maps speed_900 to speed_reader', () => {
      expect(mapLegacyToTier('speed_900')).toBe('speed_reader');
    });

    it('maps speed_1500 to lightning_reader', () => {
      expect(mapLegacyToTier('speed_1500')).toBe('lightning_reader');
    });

    it('returns undefined for unknown type', () => {
      // @ts-expect-error Testing invalid input
      expect(mapLegacyToTier('unknown')).toBeUndefined();
    });
  });
});

describe('CertificationTierProgress structure', () => {
  it('can be created with all required fields', () => {
    const progress: CertificationTierProgress = {
      speedProgress: 0.8,
      accuracyProgress: 0.9,
      textsProgress: 0.67,
      overallProgress: 0.67,
      isUnlocked: true,
      isReady: false,
      isEarned: false,
    };

    expect(progress.speedProgress).toBe(0.8);
    expect(progress.accuracyProgress).toBe(0.9);
    expect(progress.overallProgress).toBe(0.67);
    expect(progress.isUnlocked).toBe(true);
    expect(progress.isReady).toBe(false);
    expect(progress.isEarned).toBe(false);
  });

  it('can include optional earnedAt timestamp', () => {
    const progress: CertificationTierProgress = {
      speedProgress: 1,
      accuracyProgress: 1,
      textsProgress: 1,
      overallProgress: 1,
      isUnlocked: true,
      isReady: true,
      isEarned: true,
      earnedAt: Date.now(),
    };

    expect(progress.earnedAt).toBeDefined();
    expect(typeof progress.earnedAt).toBe('number');
  });
});

describe('CertificationProgress structure', () => {
  it('can track earned tiers', () => {
    const progress: CertificationProgress = {
      ...INITIAL_CERTIFICATION_PROGRESS,
      earnedTiers: ['quick_reader'],
      tierProgress: {
        ...INITIAL_CERTIFICATION_PROGRESS.tierProgress,
        quick_reader: {
          ...INITIAL_CERTIFICATION_PROGRESS.tierProgress.quick_reader,
          isEarned: true,
          earnedAt: Date.now(),
        },
        speed_reader: {
          ...INITIAL_CERTIFICATION_PROGRESS.tierProgress.speed_reader,
          isUnlocked: true, // Now unlocked since quick_reader is earned
        },
      },
    };

    expect(progress.earnedTiers).toContain('quick_reader');
    expect(progress.tierProgress.quick_reader.isEarned).toBe(true);
    expect(progress.tierProgress.speed_reader.isUnlocked).toBe(true);
  });
});
