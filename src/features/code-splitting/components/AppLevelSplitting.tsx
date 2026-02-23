'use client';

import { motion } from 'framer-motion';
import { Route, Zap, Package, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppLevelSplitting() {
  const routes = [
    { name: '/', size: '45kb', color: 'bg-blue-500', label: 'Home bundle' },
    { name: '/rendering/ssr', size: '12kb', color: 'bg-green-500', label: 'SSR bundle' },
    { name: '/rendering/csr', size: '65kb', color: 'bg-purple-500', label: 'CSR bundle' },
    { name: '/code-splitting', size: '8kb', color: 'bg-orange-500', label: 'Feature bundle' },
  ];

  return (
    <div className="p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-3xl space-y-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Share2 className="w-64 h-64 text-white" />
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10">
            <Route className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Route-Based Splitting</h3>
        </div>
        <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xl">
          Next.js automatically splits your application into small, independent bundles per route. 
          When you visit <code>/ssr</code>, you <strong>only</strong> download the code needed for that page.
        </p>
      </div>

      <div className="space-y-8 relative z-10">
        <div className="flex flex-col gap-4">
          {routes.map((route, i) => (
            <motion.div 
              key={route.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 hover:border-zinc-700 transition-all gap-4"
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-1.5 h-8 rounded-full", route.color)} />
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">{route.name}</div>
                  <div className="text-[10px] text-zinc-600 font-black uppercase">{route.label}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-black text-white">{route.size}</div>
                  <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Initial JS</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-all">
                  <Package className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-blue-600/5 border border-blue-500/10 flex items-start gap-4">
           <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
           <p className="text-xs text-zinc-400 font-medium leading-relaxed">
             <strong>The Result:</strong> Faster Time to Interactive (TTI) because the browser 
             executes less JavaScript. No more loading the entire app&apos;s logic for a single landing page.
           </p>
        </div>
      </div>
    </div>
  );
}
