import { useState } from 'react';
import { useStore } from '../../store';
import { t } from '../../i18n';
import { SOURCES } from '../../data/events';

export function Credits() {
  const lang = useStore((s) => s.lang);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="credits-btn" onClick={() => setOpen(true)}>
        ℹ {t('credits', lang)}
      </button>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="panel__close" onClick={() => setOpen(false)}>
              ✕ {t('close', lang)}
            </button>
            <h2>{t('title', lang)} — {t('credits', lang)}</h2>

            <p className="credits-idea">⭐ {t('bornFrom', lang)}</p>

            <p>
              {lang === 'it'
                ? "Ideazione e consulenza scientifica: Giada Magni, biologa presso il CNR-IFAC (Istituto di Fisica Applicata «Nello Carrara» — CNR)."
                : 'Concept and scientific advice: Giada Magni, biologist at CNR-IFAC (Institute of Applied Physics “Nello Carrara” — CNR).'}
            </p>

            <h3>{t('sources', lang)}</h3>
            <ul className="sources">
              {SOURCES.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="credits-note">
              {lang === 'it'
                ? 'Dati a scopo didattico, semplificati dalla filogenetica moderna. Topologia e datazioni sono approssimazioni di consenso.'
                : 'Educational, simplified data based on modern phylogenetics. Topology and dates are consensus approximations.'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
