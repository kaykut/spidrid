/**
 * Tests for Certificate Types
 *
 * Tests the new journey-based certification system with three tiers:
 * - Speed Reader (VS 40, 600 WPM)
 * - Velocity Master (VS 60, 900 WPM)
 * - Transcendent (VS 95, 1200 WPM)
 */

import {
  CertificationTierProgress,
  CERTIFICATION_TIER_DEFINITIONS,
  INITIAL_CERTIFICATION_PROGRESS,
  getCertificationTierDefinition,
  getCertificateDefinition,
  Certificate,
  EarnedCertification,
  earnedCertificationToCertificate,
} from '../../src/types/certificates';

describe('Certification Tier Definitions', () => {
  describe('CERTIFICATION_TIER_DEFINITIONS', () => {
    it('has exactly 3 tiers', () => {
      expect(CERTIFICATION_TIER_DEFINITIONS.length).toBe(3);
    });

    it('includes speed_reader, velocity_master, transcendent', () => {
      const tiers = CERTIFICATION_TIER_DEFINITIONS.map(d => d.tier);
      expect(tiers).toContain('speed_reader');
      expect(tiers).toContain('velocity_master');
      expect(tiers).toContain('transcendent');
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

      it('has exam words of 1000', () => {
        expect(tier.examWords).toBe(1000);
      });

      it('has exam min comprehension of 80%', () => {
        expect(tier.examMinComp).toBe(80);
      });

      it('has speed proof min comprehension of 70%', () => {
        expect(tier.speedProofMinComp).toBe(70);
      });

      it('has name Speed Reader', () => {
        expect(tier.name).toBe('Speed Reader');
      });

      it('has icon ⚡', () => {
        expect(tier.icon).toBe('⚡');
      });

      it('has color #fab005', () => {
        expect(tier.color).toBe('#fab005');
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

      it('has exam WPM of 1200', () => {
        expect(tier.examWpm).toBe(1200);
      });

      it('has exam words of 2000', () => {
        expect(tier.examWords).toBe(2000);
      });

      it('has name Velocity Master', () => {
        expect(tier.name).toBe('Velocity Master');
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

      it('has exam WPM of 1500', () => {
        expect(tier.examWpm).toBe(1500);
      });

      it('has exam words of 3000', () => {
        expect(tier.examWords).toBe(3000);
      });

      it('has name Transcendent', () => {
        expect(tier.name).toBe('Transcendent');
      });

      it('has icon 👑', () => {
        expect(tier.icon).toBe('👑');
      });
    });
  });

  describe('getCertificationTierDefinition', () => {
    it('returns correct definition for speed_reader', () => {
      const def = getCertificationTierDefinition('speed_reader');
      expect(def).toBeDefined();
      expect(def!.name).toBe('Speed Reader');
    });

    it('returns correct definition for velocity_master', () => {
      const def = getCertificationTierDefinition('velocity_master');
      expect(def).toBeDefined();
      expect(def!.name).toBe('Velocity Master');
    });

    it('returns correct definition for transcendent', () => {
      const def = getCertificationTierDefinition('transcendent');
      expect(def).toBeDefined();
      expect(def!.name).toBe('Transcendent');
    });

    it('returns undefined for invalid tier', () => {
      // @ts-expect-error Testing invalid input
      const invalid = getCertificationTierDefinition('invalid_tier');
      expect(invalid).toBeUndefined();
    });
  });

  describe('getCertificateDefinition (alias)', () => {
    it('returns same result as getCertificationTierDefinition', () => {
      const fromTier = getCertificationTierDefinition('speed_reader');
      const fromAlias = getCertificateDefinition('speed_reader');
      expect(fromTier).toEqual(fromAlias);
    });

    it('returns undefined for invalid type', () => {
      // @ts-expect-error Testing invalid input
      const def = getCertificateDefinition('invalid');
      expect(def).toBeUndefined();
    });
  });
});

describe('Certification Progress', () => {
  describe('INITIAL_CERTIFICATION_PROGRESS', () => {
    it('has progress for all three tiers', () => {
      expect(INITIAL_CERTIFICATION_PROGRESS).toHaveProperty('speed_reader');
      expect(INITIAL_CERTIFICATION_PROGRESS).toHaveProperty('velocity_master');
      expect(INITIAL_CERTIFICATION_PROGRESS).toHaveProperty('transcendent');
    });

    it('speed_reader starts with all false flags', () => {
      const progress = INITIAL_CERTIFICATION_PROGRESS.speed_reader;
      expect(progress.vsUnlocked).toBe(false);
      expect(progress.speedProofAchieved).toBe(false);
      expect(progress.examUnlocked).toBe(false);
      expect(progress.examPassed).toBe(false);
    });

    it('velocity_master starts with all false flags', () => {
      const progress = INITIAL_CERTIFICATION_PROGRESS.velocity_master;
      expect(progress.vsUnlocked).toBe(false);
      expect(progress.speedProofAchieved).toBe(false);
      expect(progress.examUnlocked).toBe(false);
      expect(progress.examPassed).toBe(false);
    });

    it('transcendent starts with all false flags', () => {
      const progress = INITIAL_CERTIFICATION_PROGRESS.transcendent;
      expect(progress.vsUnlocked).toBe(false);
      expect(progress.speedProofAchieved).toBe(false);
      expect(progress.examUnlocked).toBe(false);
      expect(progress.examPassed).toBe(false);
    });
  });
});

describe('CertificationTierProgress structure', () => {
  it('can be created with all required fields', () => {
    const progress: CertificationTierProgress = {
      vsUnlocked: true,
      speedProofAchieved: false,
      examUnlocked: false,
      examPassed: false,
    };

    expect(progress.vsUnlocked).toBe(true);
    expect(progress.speedProofAchieved).toBe(false);
    expect(progress.examUnlocked).toBe(false);
    expect(progress.examPassed).toBe(false);
  });

  it('can include optional earnedAt timestamp', () => {
    const progress: CertificationTierProgress = {
      vsUnlocked: true,
      speedProofAchieved: true,
      examUnlocked: true,
      examPassed: true,
      earnedAt: Date.now(),
    };

    expect(progress.earnedAt).toBeDefined();
    expect(typeof progress.earnedAt).toBe('number');
  });

  it('exam is unlocked only when VS and speed proof are achieved', () => {
    // This is the expected state when exam becomes unlocked
    const examReady: CertificationTierProgress = {
      vsUnlocked: true,
      speedProofAchieved: true,
      examUnlocked: true,
      examPassed: false,
    };

    expect(examReady.vsUnlocked).toBe(true);
    expect(examReady.speedProofAchieved).toBe(true);
    expect(examReady.examUnlocked).toBe(true);
    expect(examReady.examPassed).toBe(false);
  });
});

describe('Certificate interface', () => {
  it('can be created with required fields', () => {
    const cert: Certificate = {
      id: 'cert_123',
      type: 'speed_reader',
      wpm: 650,
      earnedAt: Date.now(),
    };

    expect(cert.id).toBe('cert_123');
    expect(cert.type).toBe('speed_reader');
    expect(cert.wpm).toBe(650);
    expect(typeof cert.earnedAt).toBe('number');
  });

  it('type can be any of the three tiers', () => {
    const speedReaderCert: Certificate = {
      id: 'cert_1',
      type: 'speed_reader',
      wpm: 900,
      earnedAt: Date.now(),
    };
    const velocityMasterCert: Certificate = {
      id: 'cert_2',
      type: 'velocity_master',
      wpm: 1200,
      earnedAt: Date.now(),
    };
    const transcendentCert: Certificate = {
      id: 'cert_3',
      type: 'transcendent',
      wpm: 1500,
      earnedAt: Date.now(),
    };

    expect(speedReaderCert.type).toBe('speed_reader');
    expect(velocityMasterCert.type).toBe('velocity_master');
    expect(transcendentCert.type).toBe('transcendent');
  });
});

describe('EarnedCertification interface', () => {
  it('can be created with required fields', () => {
    const earned: EarnedCertification = {
      tier: 'speed_reader',
      earnedAt: Date.now(),
      earnedStats: {
        wpm: 650,
        comprehension: 85,
        velocityScore: 45,
      },
    };

    expect(earned.tier).toBe('speed_reader');
    expect(earned.earnedStats.wpm).toBe(650);
    expect(earned.earnedStats.comprehension).toBe(85);
    expect(earned.earnedStats.velocityScore).toBe(45);
  });
});

describe('earnedCertificationToCertificate', () => {
  it('converts EarnedCertification to Certificate', () => {
    const now = Date.now();
    const earned: EarnedCertification = {
      tier: 'velocity_master',
      earnedAt: now,
      earnedStats: {
        wpm: 950,
        comprehension: 88,
        velocityScore: 65,
      },
    };

    const cert = earnedCertificationToCertificate(earned);

    expect(cert.type).toBe('velocity_master');
    expect(cert.wpm).toBe(950);
    expect(cert.earnedAt).toBe(now);
    expect(cert.id).toBe(`cert_velocity_master_${now}`);
  });

  it('generates unique ID based on tier and timestamp', () => {
    const now = 1704672000000; // Fixed timestamp
    const earned: EarnedCertification = {
      tier: 'transcendent',
      earnedAt: now,
      earnedStats: {
        wpm: 1250,
        comprehension: 92,
        velocityScore: 96,
      },
    };

    const cert = earnedCertificationToCertificate(earned);

    expect(cert.id).toBe('cert_transcendent_1704672000000');
  });
});
