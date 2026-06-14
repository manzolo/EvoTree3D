import { useMemo } from 'react';
import { useStore } from '../../store';
import { t, formatAge } from '../../i18n';
import { buildIndex } from '../../lib/treeIndex';
import { TREE } from '../../data/tree';
import { DOMAIN_COLORS } from '../../lib/colors';

export function InfoPanel() {
  const lang = useStore((s) => s.lang);
  const selectedId = useStore((s) => s.selectedId);
  const select = useStore((s) => s.select);
  const focus = useStore((s) => s.focus);
  const index = useMemo(() => buildIndex(TREE), []);

  if (!selectedId) return null;
  const node = index.byId.get(selectedId);
  if (!node) return null;

  const color = DOMAIN_COLORS[node.domain];
  const isIt = lang === 'it';
  const parentId = index.parentOf.get(node.id);
  const parent = parentId ? index.byId.get(parentId) : null;

  return (
    <aside className="panel" style={{ ['--accent' as string]: color }}>
      <button className="panel__close" onClick={() => select(null)}>
        ✕ {t('close', lang)}
      </button>

      <div className="panel__domain" style={{ background: color }}>
        {node.domain.toUpperCase()}
      </div>
      <h2 className="panel__title">{isIt ? node.name : node.nameEn}</h2>
      <div className="panel__age">
        {t('age', lang)}: {formatAge(node.ageMya, lang)}
      </div>
      {node.diversity > 1 && (
        <div className="panel__diversity">
          ~{node.diversity.toLocaleString(isIt ? 'it-IT' : 'en-US')} {t('speciesApprox', lang)}
        </div>
      )}

      <section>
        <h3>{t('description', lang)}</h3>
        <p>{isIt ? node.description : node.descriptionEn}</p>
      </section>

      <section>
        <h3>{t('characteristics', lang)}</h3>
        <ul>
          {(isIt ? node.characteristics : node.characteristicsEn).map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>{t('examples', lang)}</h3>
        <div className="chips">
          {node.examples.map((e, i) => (
            <span className="chip" key={i}>
              {e}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3>{t('fossils', lang)}</h3>
        <ul>
          {node.fossils.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>

      <div className="panel__nav">
        {parent && (
          <button className="btn btn--ghost" onClick={() => select(parent.id)}>
            ↑ {isIt ? parent.name : parent.nameEn}
          </button>
        )}
        {node.children?.map((c) => (
          <button className="btn btn--ghost" key={c.id} onClick={() => select(c.id)}>
            ↳ {isIt ? c.name : c.nameEn}
          </button>
        ))}
      </div>

      <button className="btn btn--accent" onClick={() => focus(node.id)}>
        🎯 {isIt ? 'Centra la vista' : 'Center view'}
      </button>
    </aside>
  );
}
