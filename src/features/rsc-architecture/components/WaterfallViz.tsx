import { cn } from '@/lib/utils';
import { Network, Timer, AlertCircle, CheckCircle2 } from 'lucide-react';

interface WaterfallStepProps {
  label: string;
  duration: number;
  delay: number;
  type: 'request' | 'parse' | 'render';
  status: 'pending' | 'loading' | 'done';
}

export function WaterfallStep({ label, duration, delay, type, status }: WaterfallStepProps) {
  const typeColors = {
    request: 'bg-blue-500',
    parse: 'bg-purple-500',
    render: 'bg-green-500',
  };

  return (
    <div className="flex items-center gap-4 group">
      <div className="w-32 text-xs font-bold text-zinc-500 uppercase tracking-tighter truncate">{label}</div>
      <div className="flex-1 h-6 bg-zinc-900 rounded-lg overflow-hidden relative border border-zinc-800">
        <div 
          className={cn(
            "absolute h-full transition-all duration-1000 ease-out flex items-center px-2 text-[8px] font-black text-white uppercase",
            typeColors[type],
            status === 'loading' && "animate-pulse"
          )}
          style={{ 
            left: `${delay}%`, 
            width: `${duration}%`,
            transitionDelay: `${delay * 10}ms`
          }}
        >
          {status === 'done' ? <CheckCircle2 className="w-2.5 h-2.5" /> : duration > 5 ? label : ''}
        </div>
      </div>
    </div>
  );
}

export function WaterfallComparison({ mode }: { mode: 'client' | 'rsc' }) {
  return (
    <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 shadow-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl", mode === 'client' ? "bg-red-500/10" : "bg-green-500/10")}>
            <Network className={cn("w-5 h-5", mode === 'client' ? "text-red-500" : "text-green-500")} />
          </div>
          <h3 className="text-xl font-bold text-white capitalize">{mode} Architecture</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-500">
          <Timer className="w-3 h-3" />
          {mode === 'client' ? 'Total Time: ~4500ms' : 'Total Time: ~1200ms'}
        </div>
      </div>

      <div className="space-y-4">
        {mode === 'client' ? (
          <>
            <WaterfallStep label="Root HTML" duration={10} delay={0} type="request" status="done" />
            <WaterfallStep label="React Bundle" duration={30} delay={10} type="request" status="done" />
            <WaterfallStep label="Fetch Layout" duration={20} delay={40} type="request" status="done" />
            <WaterfallStep label="Fetch Profile" duration={15} delay={60} type="request" status="done" />
            <WaterfallStep label="Fetch Posts" duration={20} delay={75} type="request" status="done" />
          </>
        ) : (
          <>
            <WaterfallStep label="Server Render" duration={40} delay={0} type="render" status="done" />
            <WaterfallStep label="Parallel Fetch" duration={40} delay={0} type="request" status="done" />
            <WaterfallStep label="Stream Body" duration={20} delay={40} type="render" status="done" />
          </>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-900 flex items-start gap-4">
        <div className={cn("p-2 rounded-lg shrink-0", mode === 'client' ? "bg-orange-500/10" : "bg-blue-500/10")}>
          {mode === 'client' ? (
            <AlertCircle className="w-4 h-4 text-orange-500" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
          )}
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed font-medium">
          {mode === 'client' 
            ? "The 'Fetch-on-Render' pattern causes children to wait for parent fetches. This is the 'Waterfall' problem." 
            : "RSCs fetch data on the server with zero client latency between requests, delivering a consolidated result."
          }
        </p>
      </div>
    </div>
  );
}
