import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Tree } from './Tree';
import { EventMarkers } from './EventMarkers';
import { CameraRig } from './CameraRig';
import { useStore } from '../store';

function Loader() {
  return (
    <Html center>
      <div className="loader">Carico l'albero della vita…</div>
    </Html>
  );
}

export function Scene() {
  const controls = useRef<OrbitControlsImpl>(null);
  const deselect = useStore((s) => s.select);

  return (
    <Canvas
      camera={{ position: [60, 45, 60], fov: 55, near: 0.1, far: 2000 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
      onPointerMissed={() => deselect(null)}
    >
      <color attach="background" args={['#05060a']} />
      <fog attach="fog" args={['#05060a', 120, 320]} />

      <ambientLight intensity={0.45} />
      <pointLight position={[0, 80, 0]} intensity={1.2} color="#bcd4ff" distance={400} />
      <pointLight position={[60, 20, 60]} intensity={0.6} color="#ffd9a0" />
      <directionalLight position={[-40, 60, -20]} intensity={0.5} />

      <Stars radius={300} depth={120} count={4000} factor={6} saturation={0} fade speed={0.4} />

      <Suspense fallback={<Loader />}>
        <Tree />
        <EventMarkers />
      </Suspense>

      {/* Ground reference ring at LUCA */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <ringGeometry args={[0, 5, 48]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.08} />
      </mesh>

      <CameraRig controls={controls} />
      <OrbitControls
        ref={controls}
        enablePan
        enableDamping
        dampingFactor={0.08}
        minDistance={6}
        maxDistance={260}
        target={[0, 30, 0]}
      />
    </Canvas>
  );
}
