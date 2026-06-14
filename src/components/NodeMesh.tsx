import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { LaidOutNode } from '../lib/layout';
import { DOMAIN_COLORS } from '../lib/colors';
import { useStore } from '../store';

interface NodeMeshProps {
  laid: LaidOutNode;
  visible: boolean;
  radius: number;
  isSelected: boolean;
  isHovered: boolean;
  isSearchHit: boolean;
  dimmed: boolean;
}

export function NodeMesh({
  laid,
  visible,
  radius,
  isSelected,
  isHovered,
  isSearchHit,
  dimmed,
}: NodeMeshProps) {
  const { node, position } = laid;
  const lang = useStore((s) => s.lang);
  const select = useStore((s) => s.select);
  const hover = useStore((s) => s.hover);
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const [t, setT] = useState(0);

  useFrame((_, delta) => {
    setT((v) => v + delta);
    const target = visible ? 1 : 0.0001;
    if (meshRef.current) {
      const s = THREE.MathUtils.lerp(meshRef.current.scale.x, target, 0.12);
      meshRef.current.scale.setScalar(s);
    }
    if (haloRef.current && (isHovered || isSelected || isSearchHit)) {
      const pulse = 1 + Math.sin(t * 3) * 0.12;
      haloRef.current.scale.setScalar(pulse);
    }
  });

  if (!visible && (!meshRef.current || meshRef.current.scale.x < 0.01)) return null;

  const color = DOMAIN_COLORS[node.domain];
  const highlight = isHovered || isSelected || isSearchHit;
  const emissive = highlight ? 1.4 : node.domain === 'luca' ? 0.9 : 0.4;

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          hover(node.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          hover(null);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          select(node.id);
        }}
      >
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={dimmed ? 0.1 : emissive}
          roughness={0.3}
          metalness={0.2}
          transparent
          opacity={dimmed ? 0.25 : 1}
        />
      </mesh>

      {/* Glow halo */}
      <mesh ref={haloRef} scale={1}>
        <sphereGeometry args={[radius * 1.6, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={highlight ? 0.28 : dimmed ? 0 : 0.1}
          depthWrite={false}
        />
      </mesh>

      {(highlight || laid.depth <= 1) && !dimmed && (
        <Html
          center
          distanceFactor={42}
          style={{ pointerEvents: 'none' }}
          position={[0, radius + 1.4, 0]}
          zIndexRange={[20, 0]}
        >
          <div className={`node-label ${highlight ? 'node-label--hot' : ''}`}>
            {lang === 'it' ? node.name : node.nameEn}
          </div>
        </Html>
      )}
    </group>
  );
}
