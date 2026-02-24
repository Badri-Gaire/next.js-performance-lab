'use client';

import { useState } from 'react';
import { Menu, X, Layers } from 'lucide-react';
import { FeatureNavigator } from './FeatureNavigator';

export function DocsMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-20 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-6 py-3">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest"
        >
          <Menu className="w-4 h-4" />
          Browse Methods
        </button>
      </div>

      {/* Slide-over Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-60 lg:hidden"
        >
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-zinc-950 border-r border-zinc-900 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="p-2 rounded-lg bg-blue-600">
                   <Layers className="w-4 h-4 text-white" />
                 </div>
                 <span className="font-lexend font-bold text-white tracking-tight">Navigation</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div onClick={() => setIsOpen(false)}>
                <FeatureNavigator />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
