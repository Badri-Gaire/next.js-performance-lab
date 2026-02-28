import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { DomVdomDemo } from '@/features/dom-vdom/components/DomVdomDemo';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DOM & Virtual‑DOM Lab',
  description: 'Explore how user interactions generate a new VDOM, diff it, and update the real DOM.',
  keywords: ['dom', 'virtual dom', 'vdom diff', 'react reconciliation', 'framework comparison'],
  alternates: { canonical: 'https://lab.badrigaire.com.np/dom-vdom' },
};

export default function DomVdomPage() {
  return (
    <div className="space-y-32 pb-20 animate-in fade-in duration-1000">
      <RenderingHeader
        type="DOM"
        title="DOM vs Virtual‑DOM"
        description="Visualize how a click creates a new VDOM, how React diffs it, and how the real DOM updates. Also see why some frameworks avoid a VDOM."
        strategyMarkdown="The Virtual‑DOM is a lightweight JavaScript representation of the DOM. React creates a new VDOM on state changes, diffs it against the previous VDOM, and patches the real DOM efficiently."
      />

      <DomVdomDemo />

      <NextTopic
        title="Mastery Dashboard"
        href="/"
        description="You've completed the architectural journey. Return to the dashboard to explore other performance labs."
      />
    </div>
  );
}
