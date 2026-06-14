import type { Lang } from './store';

type Dict = Record<string, { it: string; en: string }>;

const STRINGS: Dict = {
  title: { it: 'EvoTree 3D', en: 'EvoTree 3D' },
  subtitle: { it: "L'albero della vita", en: 'The Tree of Life' },
  searchPlaceholder: { it: 'Cerca un gruppo o specie…', en: 'Search a group or species…' },
  timeline: { it: 'Timeline evolutiva', en: 'Evolutionary timeline' },
  showAll: { it: 'Mostra tutto', en: 'Show all' },
  play: { it: 'Anima crescita', en: 'Animate growth' },
  pause: { it: 'Pausa', en: 'Pause' },
  overlays: { it: 'Overlay', en: 'Overlays' },
  events: { it: 'Eventi chiave', en: 'Key events' },
  diversity: { it: 'Diversità', en: 'Diversity' },
  description: { it: 'Descrizione', en: 'Description' },
  characteristics: { it: 'Caratteristiche evolutive', en: 'Evolutionary traits' },
  examples: { it: 'Esempi di specie', en: 'Example species' },
  fossils: { it: 'Fossili importanti', en: 'Key fossils' },
  age: { it: 'Comparsa', en: 'Origin' },
  speciesApprox: { it: 'specie (circa)', en: 'species (approx.)' },
  close: { it: 'Chiudi', en: 'Close' },
  credits: { it: 'Crediti e fonti', en: 'Credits & sources' },
  bornFrom: {
    it: "Progetto nato da un'idea di Giada Magni, biologa del CNR-IFAC.",
    en: 'A project born from an idea by Giada Magni, biologist at CNR-IFAC.',
  },
  sources: { it: 'Fonti scientifiche', en: 'Scientific sources' },
  domains: { it: 'Domini', en: 'Domains' },
  reset: { it: 'Reset vista', en: 'Reset view' },
  hint: {
    it: 'Trascina per ruotare · scorri per zoomare · clicca un nodo',
    en: 'Drag to rotate · scroll to zoom · click a node',
  },
  noResults: { it: 'Nessun risultato', en: 'No results' },
};

export function t(key: keyof typeof STRINGS, lang: Lang): string {
  return STRINGS[key]?.[lang] ?? key;
}

/** Format an age in Mya into a human label. */
export function formatAge(mya: number, lang: Lang): string {
  if (mya >= 1000) {
    const ga = (mya / 1000).toFixed(1);
    return lang === 'it' ? `${ga} miliardi di anni fa` : `${ga} billion years ago`;
  }
  if (mya >= 1) {
    return lang === 'it' ? `${Math.round(mya)} milioni di anni fa` : `${Math.round(mya)} Mya`;
  }
  const ka = Math.round(mya * 1000);
  return lang === 'it' ? `${ka} mila anni fa` : `${ka} ka`;
}
