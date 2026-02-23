'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ArchitectureComparison() {
  const architectures = [
    {
      title: 'Multi-Page App (MPA)',
      tag: 'Classic',
      desc: 'Browser requests a new page, server sends full HTML. Browser trashes everything and starts the pipeline from scratch.',
      pros: ['Zero JS required', 'Simple SEO'],
      cons: ['White screen flash', 'Lost local state', 'Full CSS/JS re-parse'],
      pipeline: ['REQ', 'HTML', 'DOM', 'CSSOM', 'PAINT'],
      color: 'blue'
    },
    {
      title: 'Single-Page App (SPA)',
      tag: 'Client-Rich',
      desc: 'Initial load is slow, but navigations are instant. Browser handles everything via JavaScript without full reload.',
      pros: ['No fresh reload', 'Smooth transitions'],
      cons: ['Slow initial paint', 'Heavy bundle', 'SEO challenges'],
      pipeline: ['REQ', 'JS', 'JSON', 'DOM', 'PAINT'],
      color: 'purple'
    },
    {
      title: 'Next.js Hybrid (RSC)',
      tag: 'Modern',
      desc: 'Initial load is SSR (fast). Navigations are client-side updates that preserve Layout/Navbar state.',
      pros: ['Fastest TTFB', 'Persistent Layout', 'Zero JS for static'],
      cons: ['Complex logic', 'Strict hydration'],
      pipeline: ['REQ', 'SSR', 'HYDRATE', 'RSC-UP'],
      color: 'teal'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">SPA vs MPA: The Lifecycle</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
          Understanding what happens to your Navbar and CSS when you click a link.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {architectures.map((arch, i) => (
          <motion.div
            key={arch.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 flex flex-col gap-8 relative group hover:border-zinc-700 transition-colors"
          >
            <div className="space-y-4">
              <div className={cn(
                "inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                arch.color === 'blue' && "bg-blue-500/10 text-blue-500",
                arch.color === 'purple' && "bg-purple-500/10 text-purple-500",
                arch.color === 'teal' && "bg-teal-500/10 text-teal-500"
              )}>
                {arch.tag}
              </div>
              <h3 className="text-2xl font-bold text-white">{arch.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                {arch.desc}
              </p>
            </div>

            <div className="flex-1 space-y-4">
               <div className="text-[10px] font-black uppercase tracking-tighter text-zinc-600 mb-2">Nav Lifecycle</div>
               <div className="flex items-center gap-1">
                 {arch.pipeline.map((p, idx) => (
                   <div key={idx} className="flex items-center gap-1 group/p">
                     <span className="text-[9px] font-mono p-1 px-2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">{p}</span>
                     {idx !== arch.pipeline.length - 1 && <ArrowRight className="w-2 h-2 text-zinc-800" />}
                   </div>
                 ))}
               </div>
            </div>

            <div className="space-y-3">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500" />
                 <span className="text-xs font-bold text-zinc-400">Pros: {arch.pros[0]}</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500" />
                 <span className="text-xs font-bold text-zinc-400">Cons: {arch.cons[0]}</span>
               </div>
            </div>

            {arch.title === 'Next.js Hybrid (RSC)' && (
               <div className="absolute -top-4 -right-4 bg-teal-500 text-black px-4 py-1.5 rounded-2xl text-[10px] font-black shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  Navbar Persists!
               </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
