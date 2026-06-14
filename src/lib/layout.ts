import type { CladeNode } from '../data/types';

export type Vec3 = [number, number, number];

export interface LaidOutNode {
  node: CladeNode;
  position: Vec3;
  parentId: string | null;
  parentPosition: Vec3 | null;
  depth: number;
}

const MAX_AGE = 3800; // Mya, age of LUCA
const HEIGHT = 64; // vertical extent of the tree (present at top)
const LEVEL_STEP = 3.6; // horizontal radius added per depth level

/** Map an age (Mya) to a vertical position. Non-linear so recent eras spread out. */
export function ageToY(ageMya: number): number {
  const t = Math.min(Math.max(ageMya / MAX_AGE, 0), 1);
  return HEIGHT * (1 - Math.sqrt(t));
}

function countLeaves(node: CladeNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, c) => sum + countLeaves(c), 0);
}

/**
 * Lay the tree out in 3D: vertical = time, radius = depth, angle = wedge
 * allocated proportionally to the number of descendant leaves. Produces an
 * organic upward-flaring tree with LUCA at the base.
 */
export function layoutTree(root: CladeNode): LaidOutNode[] {
  const out: LaidOutNode[] = [];

  function walk(
    node: CladeNode,
    depth: number,
    angleStart: number,
    angleEnd: number,
    parentId: string | null,
    parentPosition: Vec3 | null,
  ) {
    const theta = (angleStart + angleEnd) / 2;
    const r = depth * LEVEL_STEP;
    const position: Vec3 = [r * Math.cos(theta), ageToY(node.ageMya), r * Math.sin(theta)];

    out.push({ node, position, parentId, parentPosition, depth });

    if (node.children && node.children.length > 0) {
      const totalLeaves = countLeaves(node);
      let cursor = angleStart;
      // For the root, use the full circle; otherwise keep within the wedge.
      const span = depth === 0 ? Math.PI * 2 : angleEnd - angleStart;
      const base = depth === 0 ? 0 : angleStart;
      cursor = base;
      for (const child of node.children) {
        const frac = countLeaves(child) / totalLeaves;
        const childStart = cursor;
        const childEnd = cursor + span * frac;
        walk(child, depth + 1, childStart, childEnd, node.id, position);
        cursor = childEnd;
      }
    }
  }

  walk(root, 0, 0, Math.PI * 2, null, null);
  return out;
}

/** Largest horizontal distance from the central axis across the laid-out tree. */
export function canopyRadius(layout: LaidOutNode[]): number {
  let max = 0;
  for (const l of layout) {
    const r = Math.hypot(l.position[0], l.position[2]);
    if (r > max) max = r;
  }
  return max;
}
