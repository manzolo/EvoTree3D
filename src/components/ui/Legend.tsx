import { useStore } from '../../store';
import { t } from '../../i18n';
import { DOMAIN_COLORS, DOMAIN_LABELS } from '../../lib/colors';
import type { Domain } from '../../data/types';

const DOMAINS: Domain[] = ['luca', 'bacteria', 'archaea', 'eukarya'];

export function Legend() {
  const lang = useStore((s) => s.lang);
  const overlays = useStore((s) => s.overlays);
  const toggleOverlay = useStore((s) => s.toggleOverlay);

  return (
    <div className="legend">
      <div className="legend__group">
        <span className="legend__title">{t('domains', lang)}</span>
        {DOMAINS.map((d) => (
          <div className="legend__item" key={d}>
            <span className="legend__dot" style={{ background: DOMAIN_COLORS[d] }} />
            {DOMAIN_LABELS[d][lang]}
          </div>
        ))}
      </div>

      <div className="legend__group">
        <span className="legend__title">{t('overlays', lang)}</span>
        <label className="legend__check">
          <input
            type="checkbox"
            checked={overlays.events}
            onChange={() => toggleOverlay('events')}
          />
          {t('events', lang)}
        </label>
        <label className="legend__check">
          <input
            type="checkbox"
            checked={overlays.diversity}
            onChange={() => toggleOverlay('diversity')}
          />
          {t('diversity', lang)}
        </label>
      </div>
    </div>
  );
}
