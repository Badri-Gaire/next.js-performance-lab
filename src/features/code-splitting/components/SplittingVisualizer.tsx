'use client';

import { motion } from 'framer-motion';
import { Box, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function SplittingVisualizer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Monolith Version */}
      <div className="p-10 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 space-y-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000">
          <ShieldAlert className="w-48 h-48 text-red-500" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-400">
             <Box className="w-5 h-5" />
             <h4 className="text-xl font-bold uppercase tracking-widest">The Monolith</h4>
          </div>
          <p className="text-zinc-500 text-sm font-medium leading-relaxed">
            Loading everything at once in a single <code>main.js</code> bundle.
          </p>
        </div>

        <div className="space-y-4">
           <div className="h-20 w-full rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center relative overflow-hidden">
              <span className="text-lg font-black text-red-400">2.4 MB</span>
              <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
           </div>
           
           <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-black uppercase text-zinc-600">
                 <span>Load Time (3G)</span>
                 <span className="text-red-400">8.2s</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: '100.5%' }}
                   viewport={{ once: true }}
                   className="h-full bg-red-500"
                 />
              </div>
           </div>
        </div>

        <ul className="space-y-3">
           {['High initial latency', 'Wasteful bandwidth', 'Slow parsing time'].map(t => (
             <li key={t} className="flex items-center gap-3 text-xs text-zinc-600 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                {t}
             </li>
           ))}
        </ul>
      </div>

      {/* Code Splitting Version */}
      <div className="p-10 rounded-[2.5rem] bg-green-500/5 border border-green-500/10 space-y-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000">
          <CheckCircle2 className="w-48 h-48 text-green-500" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-400">
             <Zap className="w-5 h-5" />
             <h4 className="text-xl font-bold uppercase tracking-widest">Optimized App</h4>
          </div>
          <p className="text-zinc-500 text-sm font-medium leading-relaxed">
            Bundles dynamically partitioned by routes and usage.
          </p>
        </div>

        <div className="flex gap-2">
           {[40, 25, 15, 20].map((size, i) => (
             <motion.div 
               key={i}
               initial={{ scale: 0.8, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               transition={{ delay: i * 0.1 }}
               className="flex-1 h-20 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-[10px] font-black text-green-400"
             >
                {size}kb
             </motion.div>
           ))}
        </div>

        <div className="space-y-2">
           <div className="flex items-center justify-between text-[10px] font-black uppercase text-zinc-600">
              <span>Load Time (3G)</span>
              <span className="text-green-400">1.1s</span>
           </div>
           <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '15%' }}
                viewport={{ once: true }}
                className="h-full bg-green-500"
              />
           </div>
        </div>

        <ul className="space-y-3">
           {['Instant first paint', 'Incremental loading', 'Low CPU usage'].map(t => (
             <li key={t} className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {t}
             </li>
           ))}
        </ul>
      </div>
    </div>
  );
}
