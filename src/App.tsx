import { Scene } from './components/Scene';
import { TopBar } from './components/ui/TopBar';
import { Timeline } from './components/ui/Timeline';
import { InfoPanel } from './components/ui/InfoPanel';
import { Legend } from './components/ui/Legend';
import { Credits } from './components/ui/Credits';
import { useStore } from './store';
import { t } from './i18n';

export default function App() {
  const lang = useStore((s) => s.lang);

  return (
    <div className="app">
      <div className="canvas-wrap">
        <Scene />
      </div>

      <TopBar />
      <Legend />
      <InfoPanel />
      <Timeline />

      <div className="footer">
        <span className="hint">{t('hint', lang)}</span>
        <Credits />
      </div>
    </div>
  );
}
