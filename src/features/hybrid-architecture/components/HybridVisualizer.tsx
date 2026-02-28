'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Server, User, Globe, Zap, Layers, Cpu, Box, Share2 } from 'lucide-react';

interface HybridStep {
  id: string;
  title: string;
  description: string;
  icon: typeof Server;
  color: string;
}

const steps: HybridStep[] = [
  {
    id: 'request',
    title: 'Initial Request',
    description: 'Browser requests the page. The server starts rendering RSCs.',
    icon: Globe,
    color: 'text-blue-400',
  },
  {
    id: 'streaming',
    title: 'RSC & SSR Stream',
    description: 'The server streams HTML and RSC payload chunks simultaneously.',
    icon: Server,
    color: 'text-purple-400',
  },
  {
    id: 'placeholder',
    title: 'Client Placeholders',
    description: 'Initial HTML contains "holes" for client interactive components.',
    icon: Box,
    color: 'text-yellow-400',
  },
  {
    id: 'hydration',
    title: 'Hydration & Takeover',
    description: 'RSC payload fills the data, then Client components hydrate and take over.',
    icon: Zap,
    color: 'text-green-400',
  },
];

export function HybridVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="space-y-12">
      {/* Visual Workspace */}
      <div className="relative min-h-[500px] rounded-[3rem] bg-zinc-950 border border-zinc-900 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-linear-to-b from-blue-600/5 to-transparent" />
        
        {/* Connection Lines (Abstract) */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="text-zinc-500">
            <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="relative z-10 h-full lg:p-12 flex flex-col items-center justify-start gap-12">
          <div className="flex items-center justify-between w-full max-w-4xl px-12 h-72 relative">
            
            {/* Server Node */}
            <motion.div 
              animate={{ 
                scale: activeStep === 1 ? 1.05 : 1,
                borderColor: activeStep === 1 ? 'rgba(168, 85, 247, 0.5)' : 'rgba(39, 39, 42, 1)'
              }}
              className="group relative w-48 h-50 lg:h-62 p-8 pt-10 rounded-4xl bg-zinc-900 border-2 border-zinc-800 flex flex-col items-center justify-start gap-4 shadow-xl transition-all duration-500 hover:shadow-purple-500/10"
            >
              <div className="absolute inset-0 bg-linear-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-4xl" />
              <Server className={cn("w-12 h-12 relative z-10", activeStep === 1 ? "text-purple-400" : "text-zinc-600")} />
              <span className="text-xs font-black uppercase tracking-widest text-zinc-500 relative z-10">Server</span>
              
              {/* Added balance element to server node */}
              <div className="mt-4 flex flex-col gap-2 w-full relative z-10 opacity-50">
                <div className="h-1 rounded-full bg-zinc-800" />
                <div className="h-1 rounded-full bg-zinc-800" />
                <div className="h-1 rounded-full bg-zinc-800" />
              </div>
            </motion.div>

            {/* Middle Pipeline: Data Flow */}
            <div className="flex-1 px-4 relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeStep === 1 && (
                  <div className="flex flex-col gap-4 w-full">
                     <motion.div 
                       initial={{ x: -100, opacity: 0 }}
                       animate={{ x: 100, opacity: 0 }}
                       transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                       className="p-2 bg-blue-500 rounded-lg text-[8px] font-bold text-white text-center shadow-lg shadow-blue-500/20"
                     >
                       SSR HTML CHUNK
                     </motion.div>
                     <motion.div 
                       initial={{ x: -100, opacity: 0 }}
                       animate={{ x: 100, opacity: 0 }}
                       transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }}
                       className="p-2 bg-purple-500 rounded-lg text-[8px] font-bold text-white text-center shadow-lg shadow-purple-500/20"
                     >
                       RSC BINARY PAYLOAD
                     </motion.div>
                  </div>
                )}
                {activeStep === 2 && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 text-yellow-400"
                  >
                    <Share2 className="w-12 h-12 animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Client Node */}
            <motion.div 
              animate={{ 
                scale: activeStep >= 2 ? 1.05 : 1,
                borderColor: activeStep === 3 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(39, 39, 42, 1)'
              }}
              className="group relative w-48 h-50 lg:h-62 p-8 pt-10 rounded-4xl bg-zinc-900 border-2 border-zinc-800 flex flex-col items-center justify-start gap-4 shadow-xl transition-all duration-500 hover:shadow-green-500/10"
            >
              <div className="absolute inset-0 bg-linear-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-4xl" />
              <User className={cn("w-12 h-12 relative z-10", activeStep >= 3 ? "text-green-400" : "text-zinc-600")} />
              <span className="text-xs font-black uppercase tracking-widest text-zinc-500 relative z-10">Browser</span>

              {/* Internal State Visualization */}
              <div className="mt-4 flex flex-col gap-2 w-full relative z-10">
                <div className={cn("h-1 rounded-full transition-colors", activeStep >= 1 ? "bg-blue-500" : "bg-zinc-800")} />
                <div className={cn("h-1 rounded-full transition-colors", activeStep >= 2 ? "bg-purple-500" : "bg-zinc-800")} />
                <div className={cn("h-1 rounded-full transition-colors", activeStep >= 3 ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-zinc-800")} />
              </div>
            </motion.div>
          </div>

          {/* Detailed Breakdown */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 px-12">
            <div className="space-y-4">
              <h4 className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em]">Current State</h4>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
                >
                  <div className={cn("inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-zinc-950 text-[10px] font-bold uppercase tracking-widest", steps[activeStep].color)}>
                    {steps[activeStep].title}
                  </div>
                  <p className="text-zinc-400 font-medium leading-relaxed">{steps[activeStep].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em]">Protocol Insight</h4>
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 font-mono text-xs text-zinc-500 space-y-2">
                 <div className={cn("transition-colors", activeStep >= 1 ? "text-blue-400" : "")}>{">"} Sending HTML Document...</div>
                 <div className={cn("transition-colors", activeStep >= 1 ? "text-purple-400" : "")}>{`> Streaming RSC Payload: [1,"client",{"id":"..."}]`}</div>
                 <div className={cn("transition-colors", activeStep >= 2 ? "text-yellow-400" : "")}>{">"} Registering Client Components...</div>
                 <div className={cn("transition-colors", activeStep >= 3 ? "text-green-400" : "")}>{">"} Hydration Complete: App is interactive.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => {
              setActiveStep(i);
              setIsAutoPlaying(false);
            }}
            className={cn(
              "px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
              activeStep === i 
                ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" 
                : "bg-zinc-900 text-zinc-500 hover:text-white"
            )}
          >
            {step.title}
          </button>
        ))}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={cn(
            "ml-4 px-4 py-3 rounded-xl border border-zinc-800 transition-colors",
            isAutoPlaying ? "text-green-400 bg-green-400/5 border-green-400/20" : "text-zinc-500 hover:text-white"
          )}
        >
          {isAutoPlaying ? "Auto-playing" : "Auto-play Vision"}
        </button>
      </div>

      {/* Comparison: Layout vs Client */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
               <Cpu className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">React Server Component</h3>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            The **Base Component**. It executes entirely on the server. The browser never sees its source code, 
            only the rendered result or the instructions for client components it contains.
          </p>
          <ul className="text-xs text-zinc-500 space-y-2">
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-500 rounded-full" /> No client-side JS bundle</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-500 rounded-full" /> Direct DB Access</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-500 rounded-full" /> Initial HTML source</li>
          </ul>
        </div>

        <div className="p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
               <Layers className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Client Component</h3>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            The **Interactive Layer**. Its code is downloaded and hydrated. On initial request, it&apos;s 
            pre-rendered to HTML to avoid &quot;layout shift,&quot; but it only becomes alive after JS loads.
          </p>
          <ul className="text-xs text-zinc-500 space-y-2">
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Event Listeners (onClick, etc)</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Hooks (useState, useEffect)</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Browser APIs (Geolocation)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
