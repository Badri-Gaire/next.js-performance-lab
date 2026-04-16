'use client';

import { useState } from 'react';
import { RefreshCw, CheckCircle2, Server } from 'lucide-react';
import { revalidateInventoryAction } from '../actions/revalidate';
import { cn } from '@/lib/utils';

export function RevalidateButton() {
  const [isPending, setIsPending] = useState(false);
  const [lastSuccess, setLastSuccess] = useState(false);

  async function handleRevalidate() {
    setIsPending(true);
    setLastSuccess(false);
    
    try {
      await revalidateInventoryAction();
      setLastSuccess(true);
      setTimeout(() => setLastSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to revalidate:', error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="p-6 md:p-8 rounded-4xl bg-linear-to-r from-zinc-900 via-zinc-950 to-black border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl lg:block hidden" />
      
      <div className="relative flex items-center gap-5">
        <div className={cn(
          "shrink-0 w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors",
          lastSuccess 
            ? "bg-green-500/10 border-green-500/20 text-green-400" 
            : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
        )}>
           {isPending ? (
             <RefreshCw className="w-6 h-6 animate-spin" />
           ) : lastSuccess ? (
             <CheckCircle2 className="w-6 h-6 animate-bounce" />
           ) : (
             <Server className="w-6 h-6" />
           )}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-white uppercase tracking-tighter italic">On-Demand Revalidation</h3>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[8px] font-black text-cyan-400 uppercase tracking-widest">Server Action</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-sm leading-relaxed font-medium">
            Update the simulated &quot;Database&quot; and trigger a <code className="text-cyan-400/80">revalidateTag</code> to see Zone 2 update while Zone 1 stays static.
          </p>
        </div>
      </div>

      <button
        onClick={handleRevalidate}
        disabled={isPending}
        className={cn(
          "relative min-w-[200px] py-4 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl active:scale-95 disabled:opacity-50",
          lastSuccess 
            ? "bg-green-600 text-white shadow-green-500/20" 
            : "bg-cyan-600 text-white hover:bg-cyan-500 shadow-cyan-500/20"
        )}
      >
        <span className="flex items-center justify-center gap-3">
          {isPending ? 'Syncing...' : lastSuccess ? 'Cache Purged!' : 'Revalidate Tag'}
        </span>
      </button>
    </div>
  );
}
