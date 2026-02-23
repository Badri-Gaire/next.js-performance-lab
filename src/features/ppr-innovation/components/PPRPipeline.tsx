'use client';

import { cn } from '@/lib/utils';
import { Server, Globe, User, ArrowRight, Zap, Loader2, Database } from 'lucide-react';

interface PipelineStepProps {
  icon: any;
  title: string;
  desc: string;
  status: 'static' | 'dynamic' | 'active';
  isLast?: boolean;
}

function PipelineStep({ icon: Icon, title, desc, status, isLast }: PipelineStepProps) {
  return (
    <div className="flex items-start gap-4 relative">
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10",
          status === 'static' ? "bg-green-500/20 border-green-500/50 text-green-400" :
          status === 'dynamic' ? "bg-purple-500/20 border-purple-500/50 text-purple-400" :
          "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/50 animate-pulse"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        {!isLast && (
          <div className={cn(
            "w-0.5 h-16 border-l-2 border-dashed my-2",
            status === 'static' ? "border-green-500/30" : "border-purple-500/30"
          )} />
        )}
      </div>
      <div className="pt-1 flex-1">
        <h4 className={cn(
          "text-sm font-bold uppercase tracking-widest",
          status === 'static' ? "text-green-400" : status === 'dynamic' ? "text-purple-400" : "text-white"
        )}>
          {title}
        </h4>
        <p className="text-xs text-zinc-500 font-medium leading-relaxed mt-1">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function PPRPipeline() {
  return (
    <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-3xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-xl bg-blue-500/10">
          <Zap className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">The PPR Request Pipeline</h3>
          <p className="text-xs text-zinc-500 font-medium tracking-wide">Step-by-step visual of "Static Shell + Dynamic Streaming"</p>
        </div>
      </div>

      <div className="space-y-2">
        <PipelineStep 
          icon={User} 
          title="User Requests Page" 
          desc="User hits the URL. No pre-processing needed for the static shell." 
          status="static" 
        />
        <PipelineStep 
          icon={Globe} 
          title="Edge Sends Static Shell" 
          desc="Instantly delivers Navigation, Layout, and Skeletons from the CDN. (0ms Wait)" 
          status="static" 
        />
        <PipelineStep 
          icon={Server} 
          title="Server Resolves 'Hole'" 
          desc="Next.js runs the async database queries only for the dynamic Suspense blocks." 
          status="active" 
        />
        <PipelineStep 
          icon={Database} 
          title="Stream Dynamic Segment" 
          desc="Data is ready! The server streams the final component HTML over the same connection." 
          status="dynamic" 
        />
        <PipelineStep 
          icon={ArrowRight} 
          title="Instant Hydration" 
          desc="React swaps the skeleton for the real content. Page is now fully interactive." 
          status="dynamic" 
          isLast 
        />
      </div>

      <div className="mt-10 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Loader2 className="w-4 h-4 text-zinc-600 animate-spin" />
            <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Total Perceived Wait Time: 0ms</span>
         </div>
         <div className="px-3 py-1 rounded-lg bg-blue-600 text-[10px] font-black text-white hover:scale-105 transition-transform cursor-pointer">
            OPTIMIZED
         </div>
      </div>
    </div>
  );
}
