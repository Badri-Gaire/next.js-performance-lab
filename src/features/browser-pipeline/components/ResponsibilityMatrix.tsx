'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, Zap, ShieldCheck, Layers, GitBranch, RefreshCw, MousePointer2 } from 'lucide-react';

export function ResponsibilityMatrix() {
  const browserTasks = [
    { task: 'Network Fetching', desc: 'Fetching HTML/CSS/JS over HTTP/2 or 3.', icon: Globe },
    { task: 'HTML Parsing', desc: 'Native DOM tree construction (C++ level).', icon: Layers },
    { task: 'CSSOM & Styling', desc: 'Calculating CSS inheritance and specificity.', icon: ShieldCheck },
    { task: 'Layout Engine', desc: 'Blink/WebKit calculating geometry.', icon: Cpu },
    { task: 'Painting & GPU', desc: 'Rasterizing pixels and GPU compositing.', icon: Zap },
  ];

  const frameworkTasks = [
    { task: 'Virtual DOM', desc: 'In-memory representation of UI for diffing.', icon: GitBranch },
    { task: 'Reconciliation', desc: 'Deciding exactly what changed in the state.', icon: RefreshCw },
    { task: 'Hydration', desc: 'Attaching JS event listeners to static HTML.', icon: MousePointer2 },
    { task: 'State Logic', desc: 'Managing app data and side effects (Hooks).', icon: Zap },
    { task: 'Client Routing', desc: 'Intercepting links to prevent full reloads.', icon: Globe },
  ];

  return (
    <div className="space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-white tracking-tight uppercase italic underline decoration-blue-500/20 underline-offset-8">
           The Ownership Matrix
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
          Modern web apps are a symphony between the Browser Engine (Native C++) 
          and the Frontend Framework (JavaScript/React).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Browser Engine Side */}
        <div className="p-8 rounded-[2.5rem] bg-linear-to-b from-blue-900/10 to-zinc-950 border border-blue-500/20 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform">
             <Globe className="w-48 h-48 text-blue-500" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/20">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-white">Browser Engine</h3>
            </div>
            <div className="flex flex-wrap gap-2">
               {['Blink (Chrome/Edge)', 'WebKit (Safari)', 'Gecko (Firefox)'].map(engine => (
                 <span key={engine} className="px-3 py-1 rounded-lg bg-blue-500/10 text-[10px] font-black text-blue-400 uppercase tracking-widest border border-blue-500/20">
                   {engine}
                 </span>
               ))}
            </div>
            <p className="text-sm text-zinc-500 font-medium italic">Native code (C++) optimized for hardware performance.</p>
          </div>

          <div className="space-y-4 relative z-10">
            {browserTasks.map((item, i) => (
              <motion.div 
                key={item.task}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 group/item hover:border-blue-500/30 transition-all"
              >
                <item.icon className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                   <h4 className="text-sm font-bold text-white">{item.task}</h4>
                   <p className="text-xs text-zinc-500 font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Framework Side */}
        <div className="p-8 rounded-[2.5rem] bg-linear-to-b from-purple-900/10 to-zinc-950 border border-purple-500/20 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
             <Zap className="w-48 h-48 text-purple-500" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-2xl font-black text-white">Framework Layer</h3>
            </div>
            <div className="flex flex-wrap gap-2">
               {['React (Next.js)', 'Vue (Nuxt)', 'Svelte (SvelteKit)'].map(fw => (
                 <span key={fw} className="px-3 py-1 rounded-lg bg-purple-500/10 text-[10px] font-black text-purple-400 uppercase tracking-widest border border-purple-500/20">
                   {fw}
                 </span>
               ))}
            </div>
            <p className="text-sm text-zinc-500 font-medium italic">High-level JavaScript abstraction for Developer Experience.</p>
          </div>

          <div className="space-y-4 relative z-10">
            {frameworkTasks.map((item, i) => (
              <motion.div 
                key={item.task}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 group/item hover:border-purple-500/30 transition-all"
              >
                <item.icon className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                <div>
                   <h4 className="text-sm font-bold text-white">{item.task}</h4>
                   <p className="text-xs text-zinc-500 font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Visual Connection Note */}
      <div className="p-8 md:p-12 rounded-[3.5rem] bg-zinc-950 border border-zinc-900 text-center space-y-6 relative group overflow-hidden">
         <div className="absolute inset-0 bg-linear-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
         <h4 className="text-2xl font-bold text-white tracking-widest uppercase">The Bridge: Hydration</h4>
         <p className="text-sm text-zinc-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Hydration is the critical moment where the <strong>Framework</strong> takes over the 
            <strong> Browser&apos;s</strong> static DOM. It doesn&apos;t recreates the DOM from scratch—it 
            walks the existing DOM and &quot;attaches&quot; event listeners, making the page interactive without a re-paint.
         </p>
         <div className="flex items-center justify-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">Static Native DOM</div>
            <ArrowRightIcon className="w-4 h-4 text-zinc-700" />
            <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[10px] font-black text-purple-400 uppercase tracking-widest">Hydrated Interactive UI</div>
         </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}
