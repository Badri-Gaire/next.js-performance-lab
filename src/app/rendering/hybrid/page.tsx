'use client';

import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { HybridVisualizer } from '@/features/hybrid-architecture/components/HybridVisualizer';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Cpu, Layers } from 'lucide-react';

export default function HybridArchitecturePage() {
  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <RenderingHeader
        type="HYBRID"
        title="Hybrid Architecture"
        description="The ultimate orchestration of Server and Client components. See how RSC chunks and SSR HTML merge to create a seamless, interactive experience."
        strategyMarkdown="Next.js coordinates a dual-stream response: structural HTML for the shell and an RSC binary payload for the Virtual-DOM. Interactivity is 'sprinkled' via Client Components."
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <div className="p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3 italic tracking-tight">
            <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-400">
              <Cpu className="w-5 h-5" />
            </div>
            The Structural Stream
          </h3>
          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed font-medium">
            <p>
              When a request hits the server, <strong>React Server Components (RSC)</strong> execute first. 
              They fetch data directly from your database and generate a structural tree.
            </p>
            <p>
              This tree is sent to the browser as a <strong>binary payload</strong>, allowing React to 
              reconstruct the UI without downloading massive JavaScript bundles for static logic.
            </p>
          </div>
        </div>

        <div className="p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3 italic tracking-tight">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            The Interactive Layer
          </h3>
          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed font-medium">
            <p>
              Client Components are defined with the <code>&apos;use client&apos;</code> directive. On the server, 
              these are treated as <strong>interactivity placeholders</strong>.
            </p>
            <p>
              The server sends a pre-rendered HTML version (SSR) for initial paint, but these components only 
              come alive after the browser hydrates them with event listeners.
            </p>
          </div>
        </div>
      </section>

      <section id="hybrid-visualizer" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black tracking-widest uppercase italic bg-linear-to-r from-fuchsia-400 to-purple-600 bg-clip-text text-transparent">
            The Hybrid Pipeline
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            Watch how data and structure travel from the server to the browser, 
            coordinating the takeover of interactive elements.
          </p>
        </div>

        <HybridVisualizer />
      </section>

      <section className="p-12 rounded-[2.5rem] bg-linear-to-br from-zinc-950 via-black to-black border border-zinc-900 shadow-3xl space-y-8">
        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase px-4 border-l-4 border-fuchsia-600">
          Why Hybrid?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="space-y-4">
              <h4 className="text-xl font-bold text-white uppercase tracking-tighter italic">Total Control</h4>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">Choose exactly which code runs where. Keep sensitive API keys on the server while keeping UI interactions snappy on the client.</p>
           </div>
           <div className="space-y-4">
              <h4 className="text-xl font-bold text-white uppercase tracking-tighter italic">Zero Hydration Cost</h4>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">Server components have **zero** hydration cost. They are static pixels until you explicitly add a client component.</p>
           </div>
           <div className="space-y-4">
              <h4 className="text-xl font-bold text-white uppercase tracking-tighter italic">Best of Both Worlds</h4>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">Get the SEO and performance of SSR combined with the complex, stateful experience of a traditional SPA.</p>
           </div>
        </div>
      </section>

      <NextTopic
        title="Caching Strategies"
        href="/caching-strategies"
        description="Explore how Next.js handles caching and revalidation."
      />
    </div>
  );
}
