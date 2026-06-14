import { Html } from '@react-three/drei';
import { EVENTS } from '../data/events';
import { ageToY } from '../lib/layout';
import { useStore } from '../store';

const LAYER_COLORS: Record<string, string> = {
  oxygen: '#38bdf8',
  extinction: '#ef4444',
  symbiosis: '#f472b6',
  photosynthesis: '#4ade80',
  landfall: '#f59e0b',
  origin: '#fbbf24',
};

/** Horizontal rings marking key evolutionary events at their time-depth. */
export function EventMarkers() {
  const lang = useStore((s) => s.lang);
  const show = useStore((s) => s.overlays.events);
  const timelineActive = useStore((s) => s.timelineActive);
  const timelineMya = useStore((s) => s.timelineMya);

  if (!show) return null;

  return (
    <group>
      {EVENTS.map((ev) => {
        const y = ageToY(ev.ageMya);
        const visible = !timelineActive || timelineMya <= ev.ageMya + 0.0001;
        if (!visible) return null;
        const color = LAYER_COLORS[ev.layer] ?? '#ffffff';
        return (
          <group key={ev.id} position={[0, y, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[46, 46.5, 96]} />
              <meshBasicMaterial color={color} transparent opacity={0.35} />
            </mesh>
            <Html
              position={[48, 0, 0]}
              distanceFactor={90}
              style={{ pointerEvents: 'none' }}
            >
              <div className="event-label" style={{ borderColor: color }}>
                {lang === 'it' ? ev.name : ev.nameEn}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
