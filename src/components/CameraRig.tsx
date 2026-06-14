import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { TREE } from '../data/tree';
import { layoutTree } from '../lib/layout';
import { useStore } from '../store';

interface CameraRigProps {
  controls: React.RefObject<OrbitControlsImpl>;
}

/** Smoothly flies the camera to focus the selected clade. */
export function CameraRig({ controls }: CameraRigProps) {
  const focusId = useStore((s) => s.focusId);
  const { camera } = useThree();
  const layout = useMemo(() => layoutTree(TREE), []);
  const posById = useMemo(() => {
    const m = new Map<string, THREE.Vector3>();
    for (const l of layout) m.set(l.node.id, new THREE.Vector3(...l.position));
    return m;
  }, [layout]);

  const lastFocus = useRef<string | null>(null);
  const targetPos = useRef(new THREE.Vector3());
  const targetCam = useRef(new THREE.Vector3());
  const animating = useRef(false);

  useFrame(() => {
    if (focusId !== lastFocus.current) {
      lastFocus.current = focusId;
      const p = focusId ? posById.get(focusId) : null;
      if (p) {
        targetPos.current.copy(p);
        // Place the camera at an offset from the node.
        const offset = new THREE.Vector3(10, 6, 10);
        targetCam.current.copy(p).add(offset);
        animating.current = true;
      }
    }
    if (animating.current && controls.current) {
      controls.current.target.lerp(targetPos.current, 0.08);
      camera.position.lerp(targetCam.current, 0.08);
      controls.current.update();
      if (camera.position.distanceTo(targetCam.current) < 0.4) {
        animating.current = false;
      }
    }
  });

  return null;
}
