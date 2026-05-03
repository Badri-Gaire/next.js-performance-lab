'use client';

import { RenderingType, ExpectedHeader } from '../types';
import { cn } from '@/lib/utils';
import { Terminal, ShieldCheck, Info, ChevronRight, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ResponseHeaderVisualizerProps {
  type: RenderingType;
  headers: ExpectedHeader[];
}

export function ResponseHeaderVisualizer({ type, headers }: ResponseHeaderVisualizerProps) {
  const [activeHeader, setActiveHeader] = useState<string | null>(null);

  return (
    <div className="w-full bg-[#0d0d0d] rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
      {/* DevTools Header Bar */}
      <div className="bg-[#1a1a1a] border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="h-4 w-[1px] bg-zinc-800 mx-1" />
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <Terminal className="w-3 h-3" />
            Response Headers Lab
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-tighter">Live Reference</span>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
        {/* Left: Header List */}
        <div className="flex-1 p-4 space-y-3">
          <div className="flex items-center justify-between mb-4">
             <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">General / Response</span>
             <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-500 text-[9px] font-black uppercase border border-green-500/20">200 OK</span>
          </div>

          <div className="space-y-1.5">
            {headers.map((header) => (
              <div 
                key={header.key}
                onMouseEnter={() => setActiveHeader(header.key)}
                className={cn(
                  "group flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-help",
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
                      "text-[11px] font-medium font-mono truncate",
                      header.key === 'Cache-Control' ? "text-orange-400" : "text-zinc-200"
                    )}>
                      {header.value}
                    </span>
                  </div>
                  {header.isVercelSpecific && (
                    <span className="text-[8px] font-black text-blue-500/70 uppercase tracking-tighter">Infrastructure Layer</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Detailed Explanation */}
        <div className="lg:w-80 bg-zinc-900/30 p-6 flex flex-col justify-center">
          {activeHeader ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                </div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest truncate">
                  {activeHeader}
                </h4>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                {headers.find(h => h.key === activeHeader)?.description}
              </p>
              <div className="pt-4 border-t border-zinc-800">
                 <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-500 uppercase">
                    <Info className="w-3 h-3" />
                    Optimization Tip
                 </div>
                 <p className="mt-2 text-[10px] text-zinc-500 italic leading-relaxed">
                    Look for this in your browser DevTools to verify {type} execution.
                 </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group">
                <Share2 className="w-5 h-5 text-zinc-700 group-hover:text-blue-500 transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Deep Metadata</p>
                <p className="text-[9px] text-zinc-600 font-medium">Hover over a header to reveal<br/>architectural insights.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modern vs Legacy Banner */}
      <div className="bg-zinc-950 px-4 py-2 border-t border-zinc-900 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">Pattern:</span>
            <span className="text-[9px] font-bold text-zinc-400 uppercase">Next.js 16 Unified Explicit Cache</span>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
               <span className="text-[9px] font-bold text-zinc-500 uppercase">Verified</span>
            </div>
         </div>
      </div>
    </div>
  );
}
