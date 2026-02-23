'use client';

import { Globe, Wind, Zap, History, Database, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CssAndCacheDetails() {
  const cssTypes = [
    {
      title: 'Inline Styles',
      icon: Zap,
      desc: 'Applied directly via style attribute.',
      impact: 'Blocking',
      reason: 'Increases HTML size, no reusability, but zero network fetch.',
      color: 'text-yellow-400'
    },
    {
      title: 'Internal (Style Tag)',
      icon: ShieldCheck,
      desc: 'Defined in <style> tag in <head>.',
      impact: 'Blocking',
      reason: 'Browser must parse full block before painting.',
      color: 'text-blue-400'
    },
    {
      title: 'External (Link Tag)',
      icon: Globe,
      desc: 'Fetched via <link rel="stylesheet">.',
      impact: 'Partial Blocking',
      reason: 'Parallel fetch, but blocks render until downloaded.',
      color: 'text-green-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* CSS Strategy Section */}
      <div className="p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-3xl space-y-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-xl bg-pink-500/10">
                <Wind className="w-5 h-5 text-pink-500" />
             </div>
             <h3 className="text-2xl font-black text-white uppercase tracking-tighter">CSS Pipeline Impact</h3>
          </div>
          <p className="text-zinc-500 text-sm font-medium">How the browser handles styles during the critical path.</p>
        </div>

        <div className="space-y-6">
          {cssTypes.map((type) => (
            <div key={type.title} className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 group hover:border-zinc-700 transition-all">
               <div className="flex items-start gap-4">
                  <div className={cn("p-2 rounded-xl bg-zinc-800", type.color)}>
                     <type.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                     <div className="flex items-center gap-3">
                        <h4 className="text-sm font-bold text-white">{type.title}</h4>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 uppercase tracking-widest">{type.impact}</span>
                     </div>
                     <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                        {type.reason}
                     </p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caching Strategy Section */}
      <div className="p-10 rounded-[3rem] bg-linear-to-br from-zinc-900 to-black border border-zinc-800 shadow-3xl space-y-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000">
          <History className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
               <div className="p-2 rounded-xl bg-blue-500/10">
                  <Database className="w-5 h-5 text-blue-500" />
               </div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter">The Caching Hierarchy</h3>
            </div>
            <p className="text-zinc-500 text-sm font-medium">Who remembers your code? Server, CDN, or Browser?</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                 <h5 className="text-sm font-black text-blue-400 uppercase tracking-widest">HTTP Cache</h5>
                 <span className="text-[10px] text-zinc-500 font-mono">Browser Memory</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Browsers store External CSS and JS bundles locally. Next.js uses hashes (e.g. <code>main-x123.css</code>) 
                to ensure users always have the latest code while maximizing cache hits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                 <h5 className="text-sm font-black text-green-400 uppercase tracking-widest">Hydration Cache</h5>
                 <span className="text-[10px] text-zinc-500 font-mono">React State</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                React keeps the DOM structure in memory. When navigating between pages in Next.js, 
                the <strong>Navbar</strong> is never unmounted, so it doesn&apos;t re-calculate layout.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                 <h5 className="text-sm font-black text-purple-400 uppercase tracking-widest">BFCache</h5>
                 <span className="text-[10px] text-zinc-500 font-mono">Back/Forward</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                The Back/Forward Cache saves a snapshot of the entire page (including JS state) for instant navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
