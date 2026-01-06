import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Certificate, CERTIFICATE_DEFINITIONS } from '../types/certificates';

interface CertificateStore {
  // State
  certificates: Certificate[];
  lastCheckedWPM: number;

  // Actions
  checkAndAwardCertificates: (highestWPM: number) => Certificate[];
  hasCertificate: (type: Certificate['type']) => boolean;
  getCertificate: (type: Certificate['type']) => Certificate | undefined;
  getAllCertificates: () => Certificate[];
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useCertificateStore = create<CertificateStore>()(
  persist(
    (set, get) => ({
      certificates: [],
      lastCheckedWPM: 0,

      checkAndAwardCertificates: (highestWPM) => {
        const state = get();
        const newCertificates: Certificate[] = [];

        CERTIFICATE_DEFINITIONS.forEach((def) => {
          // Skip if already earned
          if (state.certificates.some((c) => c.type === def.type)) {
            return;
          }

          // Check WPM requirements
          if (highestWPM >= def.requirement.wpm) {
            const cert: Certificate = {
              id: generateId(),
              type: def.type,
              earnedAt: Date.now(),
              wpm: highestWPM,
            };
            newCertificates.push(cert);
          }
        });

        if (newCertificates.length > 0) {
          set((state) => ({
            certificates: [...state.certificates, ...newCertificates],
            lastCheckedWPM: highestWPM,
          }));
        }

        return newCertificates;
      },

      hasCertificate: (type) => {
        return get().certificates.some((c) => c.type === type);
      },

      getCertificate: (type) => {
        return get().certificates.find((c) => c.type === type);
      },

      getAllCertificates: () => {
        return get().certificates;
      },
    }),
    {
      name: 'spidrid-certificates',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
