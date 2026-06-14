import type { CladeNode } from '../data/types';

export interface TreeIndex {
  byId: Map<string, CladeNode>;
  parentOf: Map<string, string | null>;
  /** All descendant ids (including self). */
  subtreeOf: Map<string, Set<string>>;
  ancestorsOf: (id: string) => string[];
}

export function buildIndex(root: CladeNode): TreeIndex {
  const byId = new Map<string, CladeNode>();
  const parentOf = new Map<string, string | null>();
  const subtreeOf = new Map<string, Set<string>>();

  function walk(node: CladeNode, parent: string | null): Set<string> {
    byId.set(node.id, node);
    parentOf.set(node.id, parent);
    const set = new Set<string>([node.id]);
    for (const c of node.children ?? []) {
      for (const id of walk(c, node.id)) set.add(id);
    }
    subtreeOf.set(node.id, set);
    return set;
  }
  walk(root, null);

  const ancestorsOf = (id: string): string[] => {
    const out: string[] = [];
    let cur = parentOf.get(id) ?? null;
    while (cur) {
      out.push(cur);
      cur = parentOf.get(cur) ?? null;
    }
    return out;
  };

  return { byId, parentOf, subtreeOf, ancestorsOf };
}
