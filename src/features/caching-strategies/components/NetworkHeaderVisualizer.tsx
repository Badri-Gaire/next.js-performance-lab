'use client';

import { motion } from 'framer-motion';
import { Search, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const HEADER_EXAMPLES = [
  {
    type: 'Static Asset (CSS/JS)',
    url: '/_next/static/css/main.css',
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'ETag': 'W/"5d-5f3e2"',
      'X-Vercel-Cache': 'HIT',
      'Age': '45210'
    },
    desc: 'CSS and JS bundles use "immutable" hashes. They stay in the browser cache forever until the filename changes.'
  },
  {
    type: 'Static HTML (SSG)',
    url: '/rendering/ssg',
    headers: {
      'Cache-Control': 's-maxage=31536000, stale-while-revalidate',
      'X-Vercel-Cache': 'HIT',
      'Content-Type': 'text/html',
      'Server': 'Vercel'
    },
    desc: 'SSG pages are cached globally on the CDN. The s-maxage Tells the CDN to keep it for a year.'
  },
  {
    type: 'Personalized Data',
    url: '/api/user-profile',
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Vercel-Cache': 'MISS',
      'Set-Cookie': 'session_id=abc123'
    },
    desc: 'Private data uses "no-store" to prevent CDNs or public proxies from saving sensitive user information.'
  }
];

export function NetworkHeaderVisualizer() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-3xl space-y-10">
      <div className="space-y-4 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="p-2 rounded-xl bg-green-500/10">
            <Search className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Inspection: Network Headers</h3>
        </div>
        <p className="text-zinc-500 text-sm font-medium max-w-xl">
          Open your browser DevTools (F12) $\rightarrow$ Network Tab $\rightarrow$ Click a Request $\rightarrow$ Response Headers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Selector Sidebar */}
        <div className="space-y-3">
          {HEADER_EXAMPLES.map((ex, i) => (
            <button
              key={ex.type}
              onClick={() => setActiveIdx(i)}
              className={cn(
                "w-full p-4 rounded-2xl border transition-all text-left group",
                activeIdx === i 
                  ? "bg-zinc-900 border-green-500/50 shadow-xl" 
                  : "bg-zinc-950 border-zinc-900 hover:border-zinc-700"
              )}
            >
              <div className="flex items-center gap-3">
                 <div className={cn(
                   "w-2 h-2 rounded-full",
                   i === 2 ? "bg-red-500" : "bg-green-500"
                 )} />
                 <span className={cn(
                   "text-xs font-bold transition-colors",
                   activeIdx === i ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                 )}>
                   {ex.type}
                 </span>
              </div>
            </button>
          ))}
          
          <div className="mt-6 p-4 rounded-xl bg-blue-600/5 border border-blue-500/10 flex gap-3">
             <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
             <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
               <strong>Vercel Note:</strong> Next.js automatically sets these headers based on your page configuration (SSG/ISR/SSR).
             </p>
          </div>
        </div>

        {/* Header Display */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-black border border-zinc-900 font-mono text-xs leading-relaxed relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
               <div className="w-32 h-32 rounded-full border-8 border-green-500" />
            </div>

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
               <span className="text-green-500 font-black tracking-widest uppercase text-[10px]">Response Headers</span>
               <span className="text-zinc-700 text-[10px]">{HEADER_EXAMPLES[activeIdx].url}</span>
            </div>

            <div className="space-y-4">
               {Object.entries(HEADER_EXAMPLES[activeIdx].headers).map(([key, value]) => (
                 <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 group/header">
                    <span className="text-zinc-400 font-bold md:col-span-1">{key}:</span>
                    <span className={cn(
                      "md:col-span-2 break-all",
                      key === 'Cache-Control' ? "text-blue-400" : "text-zinc-500"
                    )}>
                      {value}
                    </span>
                 </div>
               ))}
            </div>
          </div>

          <motion.div 
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex items-start gap-4"
          >
            {activeIdx === 2 ? (
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
            )}
            <div>
               <h4 className="text-sm font-bold text-white mb-1">Architecture Impact</h4>
               <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                 {HEADER_EXAMPLES[activeIdx].desc}
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
