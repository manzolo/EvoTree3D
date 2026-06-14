import { useMemo } from 'react';
import { useStore } from '../../store';
import { t } from '../../i18n';
import { TREE } from '../../data/tree';
import { layoutTree } from '../../lib/layout';

export function TopBar() {
  const lang = useStore((s) => s.lang);
  const toggleLang = useStore((s) => s.toggleLang);
  const query = useStore((s) => s.query);
  const setQuery = useStore((s) => s.setQuery);
  const select = useStore((s) => s.select);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return layoutTree(TREE)
      .filter(
        (l) =>
          l.node.name.toLowerCase().includes(q) ||
          l.node.nameEn.toLowerCase().includes(q) ||
          l.node.examples.some((e) => e.toLowerCase().includes(q)),
      )
      .slice(0, 6);
  }, [query]);

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand__logo">🌳</span>
        <div>
          <div className="brand__title">{t('title', lang)}</div>
          <div className="brand__sub">{t('subtitle', lang)}</div>
        </div>
      </div>

      <div className="search">
        <input
          className="search__input"
          placeholder={t('searchPlaceholder', lang)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query.trim() && (
          <ul className="search__results">
            {results.length === 0 && <li className="search__empty">{t('noResults', lang)}</li>}
            {results.map((l) => (
              <li key={l.node.id}>
                <button
                  onClick={() => {
                    select(l.node.id);
                    setQuery('');
                  }}
                >
                  <span>{lang === 'it' ? l.node.name : l.node.nameEn}</span>
                  <small>{l.node.domain}</small>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="lang-toggle" onClick={toggleLang} aria-label="language">
        {lang === 'it' ? '🇮🇹 IT' : '🇬🇧 EN'}
      </button>
    </header>
  );
}
