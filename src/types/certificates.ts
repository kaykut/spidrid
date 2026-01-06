// Certificate Types

export interface Certificate {
  id: string;
  type: 'speed_900' | 'speed_1500';
  earnedAt: number;
  wpm: number;
}

export interface CertificateDefinition {
  type: Certificate['type'];
  title: string;
  description: string;
  icon: string;
  color: string;
  requirement: {
    wpm: number;
  };
}

export const CERTIFICATE_DEFINITIONS: CertificateDefinition[] = [
  {
    type: 'speed_900',
    title: 'Speed Reader',
    description: 'Achieved 900 WPM reading speed',
    icon: '⚡',
    color: '#fab005',
    requirement: { wpm: 900 },
  },
  {
    type: 'speed_1500',
    title: 'Master Reader',
    description: 'Achieved 1500 WPM reading speed',
    icon: '🏆',
    color: '#9775fa',
    requirement: { wpm: 1500 },
  },
];

export function getCertificateDefinition(type: Certificate['type']): CertificateDefinition | undefined {
  return CERTIFICATE_DEFINITIONS.find(c => c.type === type);
}
