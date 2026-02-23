'use client';

import { Zap, Layers, Box } from 'lucide-react';

export function PPRVisualizer() {
  return (
    <div className="space-y-8 p-10 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-3xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-teal-500/10 shadow-lg shadow-teal-500/5">
            <Zap className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">The &quot;Static Shell + Dynamic Holes&quot; Model</h3>
            <p className="text-xs text-zinc-500 font-medium">Concept introduced in Next.js 14</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-black text-green-400 uppercase tracking-widest">Static Part</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black text-purple-400 uppercase tracking-widest">Dynamic Hole</span>
        </div>
      </div>

      {/* Visual Representation */}
      <div className="relative p-6 rounded-3xl bg-black border border-zinc-900 overflow-hidden min-h-[400px]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#27272a 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="relative z-10 space-y-4">
          {/* Header - Static */}
          <div className="h-10 w-full rounded-xl bg-green-500/20 border border-green-500/30 flex items-center px-4">
             <div className="w-4 h-4 rounded bg-green-500/40 mr-4" />
             <div className="w-20 h-2 rounded bg-green-500/40" />
          </div>

          <div className="grid grid-cols-4 gap-4 h-64">
            {/* Sidebar - Static */}
            <div className="col-span-1 rounded-xl bg-green-500/20 border border-green-500/30 p-4 space-y-3">
               <div className="w-full h-2 rounded bg-green-500/40" />
               <div className="w-3/4 h-2 rounded bg-green-500/40" />
               <div className="w-1/2 h-2 rounded bg-green-500/40" />
            </div>

            {/* Main Content */}
            <div className="col-span-3 space-y-4">
              {/* Product Grid - Static Layout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 rounded-xl bg-green-500/20 border border-green-500/30" />
                <div className="h-24 rounded-xl bg-green-500/20 border border-green-500/30" />
              </div>
              
              {/* Personalized Section - DYNAMIC HOLE */}
              <div className="relative h-32 rounded-xl bg-purple-500/20 border-2 border-dashed border-purple-500/40 flex items-center justify-center group">
                 <div className="absolute inset-0 bg-purple-500/5 animate-pulse" />
                 <div className="flex flex-col items-center gap-2">
                    <Layers className="w-6 h-6 text-purple-400 animate-bounce" />
                    <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">Streaming Dynamic Data...</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-900">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-400">
            <Box className="w-4 h-4" />
            <h4 className="text-sm font-bold uppercase tracking-widest">Immediate TTFB</h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            The green parts are served from the global CDN Edge instantly. The user sees the layout and navigation in milliseconds.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Layers className="w-4 h-4" />
            <h4 className="text-sm font-bold uppercase tracking-widest">Suspense-Driven Streaming</h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            The purple parts are kept in the dynamic state on the server. As soon as the DB query finishes, the server streams the content.
          </p>
        </div>
      </div>
    </div>
  );
}
