import { RenderingType } from '../types';
import { RenderingBadge } from './RenderingBadge';
import { formatDate } from '@/lib/utils';
import { Clock, Cpu, Layout, Activity, MousePointer2 } from 'lucide-react';

interface RenderingHeaderProps {
  type: RenderingType;
  title: string;
  description: string;
  strategyMarkdown: string;
}

export function RenderingHeader({ type, title, description, strategyMarkdown }: RenderingHeaderProps) {
  // We use current time. Note: In SSR/ISR, this runs on server. In CSR, it runs on browser.
  const timestamp = new Date();

  return (
    <div className="mb-12 p-10 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-2xl relative overflow-hidden">
      {/* Visual Glare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[120px] -mr-32 -mt-32 pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mb-10 relative z-10">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <RenderingBadge type={type} />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  {type === 'CSR' ? 'Client Fetching' : type === 'CRP' ? 'Static Edge' : `Fetched via ${type} Logic`}
               </span>
            </div>
            <span 
              className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium"
              suppressHydrationWarning
            >
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Generated: {formatDate(timestamp)}
            </span>
          </div>
          
          <div className="space-y-4">
            <h1 id="overview" className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
              {title}
            </h1>
            <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed font-medium">
              {description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 lg:w-72">
           <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest block">Environment</span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  {type === 'CSR' ? 'Browser Window' : 'Vercel Serverless'}
                </span>
                <div className="p-1.5 rounded-lg bg-blue-500/10">
                  <Activity className="w-3 h-3 text-blue-500" />
                </div>
              </div>
           </div>

           <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-2">
              <span className="text-[9px] font-black uppercase text-blue-400 tracking-widest block">Verification Lab</span>
              <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                {type === 'SSR' || type === 'RSC' 
                  ? "Hit F5 (Hard Refresh) to see the server re-render. Internal navigation might use client-cache."
                  : type === 'PPR'
                  ? "In this experimental build, PPR defaults to Dynamic Streaming. Refresh to see the server-side time update."
                  : type === 'SSG' || type === 'CRP'
                  ? "Time is frozen at Build Time. No matter how many times you refresh, this HTML is static."
                  : "Refresh to see the 'Loading' state trigger in your browser."}
              </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-blue-500/30 transition-all group">
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-blue-500" />
            Strategy
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-medium">
            {strategyMarkdown}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-purple-500/30 transition-all group">
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-3">
            <Layout className="w-4 h-4 text-purple-400" />
            Hydration
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-medium">
            {type === 'CSR' 
              ? "React takes over after JS loads. The server sends zero initial content."
              : "Server sends finished HTML. Browser 'hydrates' it for interactivity."
            }
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 border-dashed hover:border-zinc-600 transition-all group lg:col-span-1 md:col-span-2">
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-3">
            <MousePointer2 className="w-4 h-4 text-orange-500" />
            Inspect Network
          </h3>
          <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
            Open DevTools {'>'} Network. Look for 
            <code className="text-orange-400 mx-1 bg-zinc-900 px-1 py-0.5 rounded">Cache-Control</code> 
            header. For {type}, you will see 
            <span className="text-zinc-300 ml-1 italic font-mono uppercase">
              {type === 'SSR' || type === 'RSC' || type === 'PPR'
                ? 'no-store / no-cache' 
                : type === 'CRP'
                  ? 's-maxage=31536000'
                  : type === 'SSG' 
                    ? 'public, max-age=31536000' 
                    : 's-maxage=30, stale-while-revalidate'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
