'use client';

import { motion } from 'framer-motion';
import { FileCode, Palette, Layout, Paintbrush, Layers, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const steps = [
  {
    id: 'dom',
    title: 'DOM Creation',
    icon: FileCode,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    desc: 'Browser parses HTML tokens into a tree of objects.',
    details: 'The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.'
  },
  {
    id: 'cssom',
    title: 'CSSOM',
    icon: Palette,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    desc: 'CSS is parsed into the CSS Object Model.',
    details: 'While the browser is building the DOM, it encounters a link tag in the head section referencing an external CSS stylesheet. CSSOM contains all the styles of the page.'
  },
  {
    id: 'render-tree',
    title: 'Render Tree',
    icon: Cpu,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    desc: 'DOM + CSSOM = Render Tree.',
    details: 'The render tree contains only the nodes required to render the page. It excludes hidden nodes (like <head> or display: none).'
  },
  {
    id: 'layout',
    title: 'Layout (Reflow)',
    icon: Layout,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    desc: 'Calculating geometry of each node.',
    details: 'The browser calculates exactly where each node should appear on the screen (x, y coordinates and dimensions).'
  },
  {
    id: 'paint',
    title: 'Paint',
    icon: Paintbrush,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    desc: 'Filling in pixels.',
    details: 'Creating the actual pixels on the screen. This includes drawing text, colors, images, borders, and shadows.'
  },
  {
    id: 'composite',
    title: 'Composite',
    icon: Layers,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    desc: 'Layering and GPU handling.',
    details: 'Since parts of the page may be drawn in different layers, the browser needs to draw them to the screen in the correct order.'
  }
];

export function CriticalRenderingPath() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-3xl space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tighter">Critical Rendering Path</h2>
          <p className="text-zinc-500 text-sm font-medium">How the browser turns pixels into code.</p>
        </div>
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
             <button 
              key={i}
              onClick={() => setActiveStep(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500",
                activeStep === i ? "bg-blue-600 w-8" : "bg-zinc-800 hover:bg-zinc-700"
              )}
             />
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-900 -translate-y-1/2 hidden lg:block" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;
            const isPast = activeStep > i;

            return (
              <motion.div 
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "cursor-pointer p-6 rounded-3xl border transition-all duration-500 flex flex-col items-center text-center gap-4 relative z-10",
                  isActive ? "bg-zinc-800 border-blue-500/50 scale-105 shadow-2xl shadow-blue-500/10" : "bg-zinc-900/50 border-zinc-800 opacity-60 hover:opacity-100",
                  isPast && "border-green-500/20"
                )}
              >
                <div className={cn("p-3 rounded-2xl", isActive ? step.bg : "bg-zinc-800")}>
                  <Icon className={cn("w-6 h-6", isActive ? step.color : "text-zinc-600")} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Step {i + 1}</h4>
                  <p className="text-xs font-bold text-white whitespace-nowrap">{step.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div 
        key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800"
      >
        <div className="space-y-4">
          <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", steps[activeStep].bg, steps[activeStep].color)}>
            Deep Dive: {steps[activeStep].title}
          </div>
          <h3 className="text-2xl font-bold text-white">{steps[activeStep].desc}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-medium">
            {steps[activeStep].details}
          </p>
        </div>

        <div className="relative rounded-2xl bg-black border border-zinc-800 p-6 font-mono text-[11px] overflow-hidden group">
           {activeStep === 0 && (
             <pre className="text-blue-400">
               {`<html>
  <body>
    <h1>Hello World</h1>
    <p>Parsing HTML...</p>
  </body>
</html>`}
             </pre>
           )}
           {activeStep === 1 && (
             <pre className="text-pink-400">
               {`h1 { color: blue; }
p { font-size: 16px; }
.hidden { display: none; }`}
             </pre>
           )}
           {activeStep === 2 && (
             <div className="space-y-2">
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded bg-blue-500" />
                 <span className="text-zinc-500">DOM Node</span>
               </div>
               <div className="ml-4 flex items-center gap-2">
                 <div className="w-4 h-4 rounded bg-pink-500" />
                 <span className="text-zinc-500">CSS Styles Applied</span>
               </div>
               <div className="text-[10px] text-zinc-700 mt-4 italic">{"// excluded <head> and display:none"}</div>
             </div>
           )}
           {/* Fallback for others */}
           {activeStep >= 3 && (
             <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-zinc-700">Visualizing calculation...</div>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
}
