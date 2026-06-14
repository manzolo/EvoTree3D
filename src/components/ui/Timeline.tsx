import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import { t, formatAge } from '../../i18n';
import { EVENTS } from '../../data/events';

const MAX_AGE = 3800;

export function Timeline() {
  const lang = useStore((s) => s.lang);
  const timelineMya = useStore((s) => s.timelineMya);
  const timelineActive = useStore((s) => s.timelineActive);
  const setTimeline = useStore((s) => s.setTimeline);
  const setTimelineActive = useStore((s) => s.setTimelineActive);

  const [playing, setPlaying] = useState(false);
  const raf = useRef<number>();

  // "Progress" goes 0 (origin) → MAX_AGE (present); inverse of age.
  const progress = MAX_AGE - timelineMya;

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const next = Math.min(progress + dt * 520, MAX_AGE); // ~7s sweep
      setTimeline(MAX_AGE - next);
      if (next >= MAX_AGE) {
        setPlaying(false);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const startPlay = () => {
    if (progress >= MAX_AGE) setTimeline(MAX_AGE); // restart from origin
    setPlaying(true);
  };

  return (
    <div className="timeline">
      <div className="timeline__head">
        <span className="timeline__label">{t('timeline', lang)}</span>
        <span className="timeline__age">
          {timelineActive ? formatAge(timelineMya, lang) : t('showAll', lang)}
        </span>
      </div>

      <div className="timeline__row">
        <button
          className="btn"
          onClick={() => (playing ? setPlaying(false) : startPlay())}
        >
          {playing ? `⏸ ${t('pause', lang)}` : `▶ ${t('play', lang)}`}
        </button>

        <div className="timeline__track">
          <input
            type="range"
            min={0}
            max={MAX_AGE}
            step={1}
            value={progress}
            onChange={(e) => {
              setPlaying(false);
              setTimeline(MAX_AGE - Number(e.target.value));
            }}
          />
          {/* Event ticks */}
          {EVENTS.map((ev) => (
            <span
              key={ev.id}
              className="timeline__tick"
              style={{ left: `${((MAX_AGE - ev.ageMya) / MAX_AGE) * 100}%` }}
              title={lang === 'it' ? ev.name : ev.nameEn}
            />
          ))}
        </div>

        <button
          className="btn btn--ghost"
          onClick={() => {
            setPlaying(false);
            setTimelineActive(false);
          }}
        >
          {t('showAll', lang)}
        </button>
      </div>

      <div className="timeline__scale">
        <span>LUCA · 3.8 Ga</span>
        <span>{lang === 'it' ? 'Oggi' : 'Today'}</span>
      </div>
    </div>
  );
}
