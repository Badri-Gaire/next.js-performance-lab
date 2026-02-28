'use client';

// TreeVisualizer renders a simple VDOM/DOM tree with collapsible nodes and animations.
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VNode } from '@/features/dom-vdom/utils/vdomDiff';

interface TreeNodeProps {
  node: VNode;
  depth?: number;
}

export function TreeNode({ node, depth = 0 }: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('ml-4', depth > 0 && 'border-l border-zinc-800 pl-2')}
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="text-purple-400">&lt;{node.type}</span>
        {node.props &&
          Object.entries(node.props).map(([k, v]) => (
            <span key={k} className="text-green-400">{k}=&quot;{String(v)}&quot;</span>
          ))}
        <span className="text-purple-400">&gt;</span>
      </div>
      {hasChildren && (
        <div className="mt-1">
          {node.children!.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function TreeVisualizer({ root }: { root: VNode }) {
  return (
    <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 overflow-auto max-h-96">
      <TreeNode node={root} />
    </div>
  );
}
