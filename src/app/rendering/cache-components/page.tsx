import React from 'react';
import { Network, Database, Info, Terminal, ChevronRight, Activity, Share2, Layers } from 'lucide-react';
import { RenderingBadge } from '@/features/rendering/components/RenderingBadge';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { ZoneDisplay } from '@/features/cache-lab/components/ZoneDisplay';
import { RevalidateButton } from '@/features/cache-lab/components/RevalidateButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cache Components & Zones | Next.js 16 Lab',
  description: 'Master surgical caching in Next.js 16 using Cache Components, cacheLife, and revalidateTag.',
};

export default function CacheComponentsLab() {
  return (
    <div className="space-y-12 pb-20">
      {/* Lab Header */}
      <section className="relative pt-8 md:pt-16 pb-12 border-b border-zinc-900 overflow-hidden px-4 md:px-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-cyan-500/10 via-transparent to-transparent blur-3xl" />
        
        <div className="relative space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black text-cyan-400 uppercase tracking-widest leading-none">
              Optimization Lab
            </span>
            <span className="text-zinc-700 font-mono text-xs">/ v16.1.6</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9]">
            CACHE <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              COMPONENTS
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl font-medium leading-relaxed">
            The evolution of Partial Prerendering. Break your application into granular <strong>Surgical Zones </strong> 
            that can be individually cached, revalidated, or streamed dynamically.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {[
              { label: 'use cache', color: 'text-cyan-400' },
              { label: 'cacheLife', color: 'text-blue-400' },
              { label: 'revalidateTag', color: 'text-zinc-400' }
            ].map(pill => (
              <div key={pill.label} className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full bg-current ${pill.color}`} />
                <span className="text-zinc-300">{pill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Sandbox Interface */}
      <div className="space-y-16">
        {/* Interactive Lab */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
              <Terminal className="w-6 h-6 text-cyan-500" />
              Surgical Zone Sandbox
            </h2>
            <div className="hidden sm:block px-3 py-1 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-[9px] font-black text-cyan-400 uppercase tracking-widest">
              Live Simulation
            </div>
          </div>
          
          <ZoneDisplay />

          {/* Controller Row */}
          <div className="pt-8">
            <RevalidateButton />
          </div>
        </section>

        {/* Educational Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-4xl bg-zinc-900/50 border border-zinc-900 space-y-4">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
               <Share2 className="w-5 h-5 text-cyan-400" />
               Global Persistence
             </h3>
             <p className="text-sm text-zinc-500 leading-relaxed font-medium">
               Data fetched in a <strong>'use cache'</strong> block is cached 1:N. The first visitor triggers the computation; 
               subsequent visitors receive the pre-rendered HTML/RSC payload instantly.
             </p>
          </div>
          <div className="p-8 rounded-4xl bg-zinc-900/50 border border-zinc-900 space-y-4">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
               <Layers className="w-5 h-5 text-purple-400" />
               Streaming Boundaries
             </h3>
             <p className="text-sm text-zinc-500 leading-relaxed font-medium">
               In Next.js 16, dynamic logic is <strong>isolated</strong> to its nearest Suspense boundary. This allows the 
               rest of the page to remain a static shell even when personalization is required.
             </p>
          </div>
        </div>

        {/* Architecture Technical Reference (Moved from Sidebar to Bottom) */}
        <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
            <div className="space-y-2">
              <h3 className="text-xs font-black text-zinc-600 uppercase tracking-[0.3em] italic">Architecture Guide</h3>
              <p className="text-2xl font-black text-white italic tracking-tighter">Next.js 16 Caching Philosophy</p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 max-w-sm">
              <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Compiler Tip</p>
              <p className="text-xs text-zinc-500 font-medium leading-normal">
                Next.js uses static analysis to determine which components can be cached. Use <strong>'use cache'</strong> to override defaults.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Stable PPR', 
                desc: 'No more experimental flags. PPR is now the foundation of the Cache Components model.',
                icon: Database 
              },
              { 
                title: 'Granular TTL', 
                desc: 'Set cache duration per-component with cacheLife(\'minutes\') or custom presets.',
                icon: Info 
              },
              { 
                title: 'Tagging System', 
                desc: 'Connect frontend fragments to backend database tags for sub-second invalidation.',
                icon: Network 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <item.icon className="w-6 h-6 transition-colors" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-black text-white uppercase tracking-tight italic">{item.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sequential Navigation */}
      <NextTopic 
        title="Hybrid Architecture"
        description="Combining multiple strategies for massive applications."
        href="/rendering/hybrid"
        type="HYBRID"
      />
    </div>
  );
}
