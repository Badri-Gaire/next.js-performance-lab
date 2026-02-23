'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface CodeBlueprintProps {
  type: 'SSR' | 'SSG' | 'ISR' | 'CSR' | 'RSC';
  title: string;
  description: string;
  code: string;
  steps: {
    icon: keyof typeof Icons;
    title: string;
    desc: string;
  }[];
}

export function CodeBlueprint({ type, title, description, code, steps }: CodeBlueprintProps) {
  const [isOpen, setIsOpen] = useState(true);

  const colors = {
    SSR: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    SSG: 'text-green-400 border-green-500/30 bg-green-500/10',
    ISR: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    CSR: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    RSC: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Pipeline Side */}
        <div className="flex-1 w-full space-y-6">
          <div className="flex items-center gap-3">
             <div className={cn("p-2 rounded-xl", colors[type])}>
                <Icons.Server className="w-5 h-5" />
             </div>
             <div>
                <h3 className="text-xl font-bold text-white">{title.endsWith('Pipeline') ? title : `${title} Pipeline`}</h3>
                <p className="text-xs text-zinc-500 font-medium">Order of operations</p>
             </div>
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300",
                    "bg-zinc-900 border-zinc-800 text-zinc-500 group-hover:border-zinc-500 group-hover:text-white"
                  )}>
                    {(() => {
                      const IconComponent = Icons[step.icon] as Icons.LucideIcon;
                      return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
                    })()}
                  </div>
                  {i !== steps.length - 1 && (
                    <div className="w-px h-10 bg-zinc-800 group-hover:bg-zinc-700 transition-colors" />
                  )}
                </div>
                <div className="pt-0.5">
                  <h4 className="text-xs font-black uppercase text-zinc-400 tracking-widest">{step.title}</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Side */}
        <div className="flex-1 w-full space-y-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Icons.Code2 className="w-4 h-4 text-zinc-500" />
                 <span className="text-xs font-bold text-zinc-400">Implementation Blueprint</span>
              </div>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-[10px] font-black text-zinc-600 hover:text-white uppercase tracking-tighter flex items-center gap-1"
              >
                {isOpen ? 'Collapse' : 'Expand'}
              </button>
           </div>

           {isOpen && (
             <div className="relative group">
               <div className={cn("absolute -inset-1 rounded-3xl blur opacity-10 transition duration-1000", colors[type])} />
               <div className="relative bg-black border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
                 <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-zinc-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-[10px] font-mono text-zinc-600">app/page.tsx</span>
                 </div>
                 <pre className="p-6 text-[11px] font-mono leading-relaxed overflow-x-auto">
                    <code className="text-zinc-400">
                      {code}
                    </code>
                 </pre>
               </div>
             </div>
           )}
        </div>
      </div>
      
      <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 flex gap-4">
         <div className="p-2 rounded-xl bg-zinc-800 h-fit">
            <Icons.Globe className="w-4 h-4 text-zinc-400" />
         </div>
         <p className="text-xs text-zinc-500 font-medium leading-relaxed">
            {description}
         </p>
      </div>
    </div>
  );
}
