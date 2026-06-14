import type { Domain } from '../data/types';

export const DOMAIN_COLORS: Record<Domain, string> = {
  luca: '#fbbf24', // gold
  bacteria: '#3b82f6', // blue
  archaea: '#a855f7', // violet
  eukarya: '#22c55e', // green
};

export const DOMAIN_LABELS: Record<Domain, { it: string; en: string }> = {
  luca: { it: 'LUCA', en: 'LUCA' },
  bacteria: { it: 'Bacteria', en: 'Bacteria' },
  archaea: { it: 'Archaea', en: 'Archaea' },
  eukarya: { it: 'Eukarya', en: 'Eukarya' },
};
