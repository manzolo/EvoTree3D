import { useMemo } from 'react';
import * as THREE from 'three';
import type { Vec3 } from '../lib/layout';

interface BranchProps {
  from: Vec3;
  to: Vec3;
  color: string;
  /** 0..1 — how much of the branch has grown (for timeline animation). */
  progress: number;
  thickness: number;
  dimmed: boolean;
}

const UP = new THREE.Vector3(0, 1, 0);

/** A tapered organic branch drawn as an oriented cylinder between two nodes. */
export function Branch({ from, to, color, progress, thickness, dimmed }: BranchProps) {
  const { quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
    return { quaternion: q, length: len };
  }, [from, to]);

  if (progress <= 0.001 || length <= 0.0001) return null;

  const grownLen = Math.max(length * progress, 0.001);
  // Re-centre so the branch grows from the parent end upward.
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const dir = new THREE.Vector3().subVectors(b, a).normalize();
  const center = a.clone().add(dir.multiplyScalar(grownLen / 2));

  return (
    <mesh position={center} quaternion={quaternion}>
      <cylinderGeometry args={[thickness * 0.6, thickness, grownLen, 8, 1, true]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={dimmed ? 0.05 : 0.35}
        roughness={0.5}
        metalness={0.1}
        transparent
        opacity={dimmed ? 0.12 : 0.9}
      />
    </mesh>
  );
}
