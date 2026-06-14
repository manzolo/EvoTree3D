export type Domain = 'luca' | 'bacteria' | 'archaea' | 'eukarya';

/** A clade (node) in the phylogenetic tree. */
export interface CladeNode {
  id: string;
  /** Italian name */
  name: string;
  /** English name */
  nameEn: string;
  /** Domain this clade belongs to (drives colour). */
  domain: Domain;
  /** Approximate age of origin, in millions of years ago (Mya). */
  ageMya: number;
  /** Relative diversity (approx. described species) — drives branch thickness. */
  diversity: number;
  description: string;
  descriptionEn: string;
  characteristics: string[];
  characteristicsEn: string[];
  examples: string[];
  fossils: string[];
  children?: CladeNode[];
}

/** A key event placed on the evolutionary timeline. */
export interface TimelineEvent {
  id: string;
  ageMya: number;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  /** Overlay layer this event belongs to. */
  layer: 'oxygen' | 'extinction' | 'symbiosis' | 'photosynthesis' | 'landfall' | 'origin';
}

/** A cited scientific source. */
export interface Source {
  label: string;
  url: string;
}
