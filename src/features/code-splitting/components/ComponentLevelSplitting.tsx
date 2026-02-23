'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Loader2, Play, Code2, Sparkles, Wand2 } from 'lucide-react';

export function ComponentLevelSplitting() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoad = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
    }, 2000);
  };

  return (
    <div className="p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-3xl space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10">
            <Layers className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Component-Level (Dynamic)</h3>
        </div>
        <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xl">
          Use <code>next/dynamic</code> to defer loading heavy components (like charts, editors, or maps) 
          until they are actually needed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Code Visualization */}
        <div className="p-6 rounded-3xl bg-black border border-zinc-900 font-mono text-xs leading-relaxed space-y-4">
          <div className="flex items-center justify-between text-[10px] text-zinc-600 uppercase font-black">
            <span>Implementation</span>
            <Code2 className="w-3 h-3" />
          </div>
          <pre className="text-purple-400">
            {`import dynamic from 'next/dynamic';

const HeavyChart = dynamic(
  () => import('./HeavyChart'), 
  { 
    loading: () => <Skeleton />,
    ssr: false 
  }
);`}
          </pre>
          <div className="pt-4 border-t border-zinc-900">
            <p className="text-zinc-500 italic">
              {`// This bundle is only requested`} <br />
              {`// when the component renders.`}
            </p>
          </div>
        </div>

        {/* Interactive Sandbox */}
        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <AnimatePresence mode="wait">
            {!isLoaded && !isLoading ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto shadow-2xl">
                  <Wand2 className="w-8 h-8 text-zinc-600" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white tracking-tight">Heavy Component Ready</div>
                  <p className="text-[10px] text-zinc-500 font-medium">Currently 0kb loaded on client.</p>
                </div>
                <button 
                  onClick={simulateLoad}
                  className="px-6 py-2 rounded-xl bg-purple-600 text-white text-xs font-black uppercase tracking-widest hover:bg-purple-500 hover:scale-105 transition-all shadow-xl shadow-purple-500/20 flex items-center gap-2 mx-auto"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Load Dynamically
                </button>
              </motion.div>
            ) : isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                <div className="text-xs font-black text-purple-400 uppercase tracking-widest animate-pulse">
                  Fetching Bundle (250kb)...
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="loaded"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full space-y-4"
              >
                <div className="p-6 rounded-2xl bg-zinc-950 border border-purple-500/30 shadow-2xl shadow-purple-500/10">
                   <div className="flex items-center gap-2 text-purple-400 mb-4">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Heavy Feature Rendered</span>
                   </div>
                   <div className="h-32 bg-zinc-900 rounded-xl relative overflow-hidden flex items-end p-4 gap-2">
                      {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.05 }}
                          className="flex-1 bg-purple-600/50 rounded-t-lg"
                        />
                      ))}
                   </div>
                </div>
                <button 
                  onClick={() => setIsLoaded(false)}
                  className="text-[10px] font-black text-zinc-600 hover:text-white uppercase tracking-widest"
                >
                  Unload & Reset Cache
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
