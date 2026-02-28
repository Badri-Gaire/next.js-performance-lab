// Simple educational VDOM diff utility
// It works on a minimal VDOM shape:
// { type: string, props?: Record<string, any>, children?: VNode[] }
// Returns an array of patch objects describing what changed.

type VNode = {
  type: string;
  props?: Record<string, unknown>;
  children?: VNode[];
};

type Patch =
  | { type: 'REPLACE'; oldNode: VNode; newNode: VNode }
  | { type: 'PROPS'; node: VNode; propChanges: Record<string, unknown> }
  | { type: 'TEXT'; node: VNode; text: string }
  | { type: 'REMOVE'; node: VNode }
  | { type: 'INSERT'; node: VNode };

/**
 * Deep compare two plain objects (shallow for props).
 */
function diffProps(oldProps: Record<string, unknown> = {}, newProps: Record<string, unknown> = {}) {
  const patches: Record<string, unknown> = {};
  const allKeys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)]);
  for (const key of allKeys) {
    if (oldProps[key] !== newProps[key]) {
      patches[key] = newProps[key];
    }
  }
  return patches;
}

/**
 * Recursively diff two VNode trees.
 */
export function diff(oldNode: VNode | null, newNode: VNode | null): Patch[] {
  const patches: Patch[] = [];

  // Node removed
  if (!newNode && oldNode) {
    patches.push({ type: 'REMOVE', node: oldNode });
    return patches;
  }

  // Node added
  if (!oldNode && newNode) {
    patches.push({ type: 'INSERT', node: newNode });
    return patches;
  }

  // Both exist – compare type
  if (oldNode && newNode && oldNode.type !== newNode.type) {
    patches.push({ type: 'REPLACE', oldNode, newNode });
    return patches;
  }

  // Same type – compare props
  if (oldNode && newNode) {
    const propChanges = diffProps(oldNode.props, newNode.props);
    if (Object.keys(propChanges).length > 0) {
      patches.push({ type: 'PROPS', node: newNode, propChanges });
    }

    // Diff children (simple index‑by‑index algorithm for demo purposes)
    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];
    const maxLen = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < maxLen; i++) {
      patches.push(...diff(oldChildren[i] || null, newChildren[i] || null));
    }
  }

  return patches;
}

export type { VNode, Patch };
