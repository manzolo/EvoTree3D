import { create } from 'zustand';

export type Lang = 'it' | 'en';

interface AppState {
  lang: Lang;
  /** Currently selected clade id (info panel open) or null. */
  selectedId: string | null;
  /** Hovered clade id or null. */
  hoveredId: string | null;
  /** Timeline cursor, in Mya. 3800 = origin, 0 = present. */
  timelineMya: number;
  /** Whether timeline filtering/growth is active. */
  timelineActive: boolean;
  /** Active educational overlay layers. */
  overlays: { events: boolean; diversity: boolean };
  /** Search query string. */
  query: string;
  /** Id of the clade to focus the camera on, or null. */
  focusId: string | null;

  setLang: (l: Lang) => void;
  toggleLang: () => void;
  select: (id: string | null) => void;
  hover: (id: string | null) => void;
  setTimeline: (mya: number) => void;
  setTimelineActive: (on: boolean) => void;
  toggleOverlay: (key: 'events' | 'diversity') => void;
  setQuery: (q: string) => void;
  focus: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  lang: 'it',
  selectedId: null,
  hoveredId: null,
  timelineMya: 0,
  timelineActive: false,
  overlays: { events: true, diversity: true },
  query: '',
  focusId: null,

  setLang: (l) => set({ lang: l }),
  toggleLang: () => set((s) => ({ lang: s.lang === 'it' ? 'en' : 'it' })),
  select: (id) => set({ selectedId: id, focusId: id }),
  hover: (id) => set({ hoveredId: id }),
  setTimeline: (mya) => set({ timelineMya: mya, timelineActive: true }),
  setTimelineActive: (on) => set({ timelineActive: on }),
  toggleOverlay: (key) =>
    set((s) => ({ overlays: { ...s.overlays, [key]: !s.overlays[key] } })),
  setQuery: (q) => set({ query: q }),
  focus: (id) => set({ focusId: id }),
}));
