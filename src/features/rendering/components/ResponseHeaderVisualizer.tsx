'use client';

import { RenderingType, ExpectedHeader } from '../types';
import { cn } from '@/lib/utils';
import { Terminal, ShieldCheck, Info, ChevronRight, Share2, Timer, Zap, Cloud, History } from 'lucide-react';
import { useState } from 'react';

interface ResponseHeaderVisualizerProps {
  type: RenderingType;
  headers: ExpectedHeader[];
}

type SimulationState = 'FIRST_LOAD' | 'CACHE_HIT' | 'REVALIDATING' | 'UPDATED';

export function ResponseHeaderVisualizer({ type, headers }: ResponseHeaderVisualizerProps) {
  const [activeHeader, setActiveHeader] = useState<string | null>(null);
  const [simState, setSimState] = useState<SimulationState>('FIRST_LOAD');

  // Logic to simulate header changes based on state
  const getSimulatedValue = (header: ExpectedHeader) => {
    if (header.key === 'X-Vercel-Cache') {
      switch (simState) {
        case 'FIRST_LOAD': return type === 'SSG' ? 'PRERENDER' : 'MISS';
        case 'CACHE_HIT': return 'HIT';
        case 'REVALIDATING': return 'STALE';
        case 'UPDATED': return 'REVALIDATED';
      }
    }
    if (header.key === 'Age') {
      switch (simState) {
        case 'FIRST_LOAD': return '0';
        case 'CACHE_HIT': return '42';
        case 'REVALIDATING': return '301';
        case 'UPDATED': return '2';
      }
    }
    return header.value;
  };

  const states: { id: SimulationState; label: string; icon: any; desc: string }[] = [
    { id: 'FIRST_LOAD', label: 'First Visit', icon: Zap, desc: 'Cold start. No cache exists yet.' },
    { id: 'CACHE_HIT', label: 'Within 30s', icon: Cloud, desc: 'Instant edge delivery. Zero compute.' },
    { id: 'REVALIDATING', label: 'After 30s', icon: History, desc: 'Stale-While-Revalidate triggered.' },
    { id: 'UPDATED', label: 'Second Visit', icon: ShieldCheck, desc: 'Cache refreshed with new data.' },
  ];

  // Only show simulator for cache-related types
  const showSimulator = ['ISR', 'SSG', 'RSC', 'PPR', 'CACHE'].includes(type);

  return (
    <div className="w-full bg-[#0d0d0d] rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl transition-all duration-500">
      {/* DevTools Header Bar */}
      <div className="bg-[#1a1a1a] border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="h-4 w-[1px] bg-zinc-800 mx-2" />
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" />
            Response Headers Lab
          </div>
        </div>
        
        {showSimulator && (
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black border border-zinc-800">
            {states.map((s) => (
              <button
                key={s.id}
                onClick={() => setSimState(s.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all flex items-center gap-1.5",
                  simState === s.id 
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                )}
              >
                <s.icon className="w-3 h-3" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
        {/* Left: Header List */}
        <div className="flex-1 p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
             <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Response Headers</span>
                <p className="text-[9px] text-zinc-600 font-medium italic">
                  {states.find(s => s.id === simState)?.desc}
                </p>
             </div>
             <span className={cn(
               "px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all",
               simState === 'REVALIDATING' 
                ? "bg-orange-500/10 text-orange-500 border-orange-500/20" 
                : "bg-green-500/10 text-green-500 border-green-500/20"
             )}>
               {simState === 'REVALIDATING' ? '200 STALE' : '200 OK'}
             </span>
          </div>

          <div className="space-y-1.5">
            {headers.map((header) => {
              const displayValue = getSimulatedValue(header);
              const isChanged = displayValue !== header.value && simState !== 'FIRST_LOAD';

              return (
                <div 
                  key={header.key}
                  onMouseEnter={() => setActiveHeader(header.key)}
                  className={cn(
                    "group flex items-start gap-3 p-3 rounded-xl border transition-all cursor-help",
                    activeHeader === header.key 
                      ? "bg-zinc-900 border-zinc-700 shadow-inner" 
                      : "bg-transparent border-transparent hover:bg-zinc-900/50"
                  )}
                >
                  <div className="mt-1 shrink-0">
                     <ChevronRight className={cn(
                       "w-3 h-3 transition-transform",
                       activeHeader === header.key ? "rotate-90 text-blue-500" : "text-zinc-600"
                     )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-[11px] font-bold text-zinc-400 font-mono whitespace-nowrap">{header.key}:</span>
                      <span className={cn(
                        "text-[11px] font-medium font-mono truncate transition-all duration-300",
                        isChanged ? "text-blue-400 font-black" : "text-zinc-200"
                      )}>
                        {displayValue}
                      </span>
                    </div>
                    {header.isVercelSpecific && (
                      <span className="text-[8px] font-black text-blue-500/70 uppercase tracking-tighter">Infrastructure Layer</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Explanation & Lifecycle */}
        <div className="lg:w-96 bg-zinc-900/30 p-8 flex flex-col justify-between">
          <div className="space-y-6">
            {activeHeader ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest truncate">
                      {activeHeader}
                    </h4>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase">Header Logic</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    {headers.find(h => h.key === activeHeader)?.description}
                  </p>
                  
                  {headers.find(h => h.key === activeHeader)?.lifecycle && (
                    <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-zinc-500 uppercase">Lifecycle Stage</span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase">
                          {headers.find(h => h.key === activeHeader)?.lifecycle?.stage}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                        <span className="text-blue-400 font-bold not-italic">Impact:</span> {headers.find(h => h.key === activeHeader)?.lifecycle?.impact}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-zinc-800">
                   <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-500 uppercase">
                      <Info className="w-4 h-4" />
                      Lab Verification
                   </div>
                   <p className="mt-2 text-[10px] text-zinc-600 italic leading-relaxed">
                      Compare the simulated value above with your actual DevTools. If they match, your {type} configuration is verified.
                   </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-12">
                <div className="w-16 h-16 rounded-3xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group shadow-2xl transition-transform hover:scale-105">
                  <Share2 className="w-7 h-7 text-zinc-700 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Architectural Insights</p>
                  <p className="text-[10px] text-zinc-600 font-medium leading-relaxed">
                    Hover over headers to reveal<br/>
                    <span className="text-zinc-500">Infrastructure Lifecycle Data.</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-linear-to-br from-blue-500/5 to-transparent border border-blue-500/10">
             <div className="flex items-center gap-2 mb-2">
                <Timer className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Time-Travel Simulator</span>
             </div>
             <p className="text-[9px] text-zinc-500 leading-relaxed">
                Use the timeline buttons at the top to simulate how headers evolve over time in a production environment.
             </p>
          </div>
        </div>
      </div>

      {/* Modern vs Legacy Banner */}
      <div className="bg-zinc-950 px-6 py-3 border-t border-zinc-900 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Standard:</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800">
               <Zap className="w-3 h-3 text-blue-500" />
               <span className="text-[9px] font-bold text-zinc-400 uppercase">Unified Explicit Caching (v16)</span>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
               <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Infrastructure Verified</span>
            </div>
         </div>
      </div>
    </div>
  );
}
