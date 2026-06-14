import { useMemo } from 'react';
import { TREE } from '../data/tree';
import { layoutTree } from '../lib/layout';
import { buildIndex } from '../lib/treeIndex';
import { DOMAIN_COLORS } from '../lib/colors';
import { NodeMesh } from './NodeMesh';
import { Branch } from './Branch';
import { useStore } from '../store';

function nodeRadius(diversity: number, isLuca: boolean): number {
  if (isLuca) return 2.2;
  return Math.min(Math.max(0.55 + Math.log10(diversity + 1) * 0.22, 0.6), 1.9);
}

function branchThickness(diversity: number, useDiversity: boolean): number {
  if (!useDiversity) return 0.18;
  return Math.min(Math.max(0.1 + Math.log10(diversity + 10) * 0.07, 0.12), 0.7);
}

export function Tree() {
  const layout = useMemo(() => layoutTree(TREE), []);
  const index = useMemo(() => buildIndex(TREE), []);

  const timelineMya = useStore((s) => s.timelineMya);
  const timelineActive = useStore((s) => s.timelineActive);
  const selectedId = useStore((s) => s.selectedId);
  const hoveredId = useStore((s) => s.hoveredId);
  const query = useStore((s) => s.query);
  const useDiversity = useStore((s) => s.overlays.diversity);

  // Set of ids highlighted when a clade is selected (its lineage + subtree).
  const lineage = useMemo(() => {
    if (!selectedId) return null;
    const set = new Set<string>(index.subtreeOf.get(selectedId) ?? []);
    for (const a of index.ancestorsOf(selectedId)) set.add(a);
    return set;
  }, [selectedId, index]);

  const searchHits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return new Set<string>();
    const hits = new Set<string>();
    for (const { node } of layout) {
      if (
        node.name.toLowerCase().includes(q) ||
        node.nameEn.toLowerCase().includes(q) ||
        node.examples.some((e) => e.toLowerCase().includes(q))
      ) {
        hits.add(node.id);
      }
    }
    return hits;
  }, [query, layout]);

  return (
    <group>
      {/* Branches */}
      {layout.map((l) => {
        if (!l.parentId || !l.parentPosition) return null;
        const parent = index.byId.get(l.parentId)!;
        const parentAge = parent.ageMya;
        const nodeAge = l.node.ageMya;

        let progress = 1;
        if (timelineActive) {
          const span = parentAge - nodeAge;
          progress = span <= 0 ? 1 : (parentAge - timelineMya) / span;
          progress = Math.min(Math.max(progress, 0), 1);
        }

        const dimmed = lineage ? !lineage.has(l.node.id) : false;
        return (
          <Branch
            key={`b-${l.node.id}`}
            from={l.parentPosition}
            to={l.position}
            color={DOMAIN_COLORS[l.node.domain]}
            progress={progress}
            thickness={branchThickness(l.node.diversity, useDiversity)}
            dimmed={dimmed}
          />
        );
      })}

      {/* Nodes */}
      {layout.map((l) => {
        const isLuca = l.node.domain === 'luca';
        const visible = !timelineActive || timelineMya <= l.node.ageMya + 0.0001;
        const dimmed = lineage ? !lineage.has(l.node.id) : false;
        return (
          <NodeMesh
            key={`n-${l.node.id}`}
            laid={l}
            visible={visible}
            radius={nodeRadius(l.node.diversity, isLuca)}
            isSelected={selectedId === l.node.id}
            isHovered={hoveredId === l.node.id}
            isSearchHit={searchHits.has(l.node.id)}
            dimmed={dimmed}
          />
        );
      })}
    </group>
  );
}
