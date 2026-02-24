import { Zap, ShieldAlert, CheckCircle2, Globe, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PPRvsSSRComparison() {
  const data = [
    {
      label: 'Standard SSR / Dynamic Rendering',
      icon: ShieldAlert,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      steps: [
        { title: 'User Requests Page', desc: 'Server receives request.', status: 'start' },
        { title: 'Dynamic Check', desc: 'Detects `cookies()` or `headers()`.', status: 'process' },
        { title: 'Blocking Wait', desc: 'Server waits for ALL data before sending HTML.', status: 'wait' },
        { title: 'TTFB: Slow', desc: 'Browser sees nothing until server is done.', status: 'result' },
      ]
    },
    {
      label: 'Partial Prerendering (Goal)',
      icon: Zap,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      steps: [
        { title: 'User Requests Page', desc: 'CDN receives request.', status: 'start' },
        { title: 'Instant Shell', desc: 'CDN sends static Layout (Nav/Sidebar) instantly.', status: 'process' },
        { title: 'Streaming Holes', desc: 'Dynamic data streams into Suspense holes.', status: 'wait' },
        { title: 'TTFB: Instant', desc: 'Browser renders shell in 0ms.', status: 'result' },
      ]
    }
  ];

  return (
    <section id="why-ppr" className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white tracking-tight">The &quot;Why&quot;: PPR vs Standard Dynamic Rendering</h2>
        <div className="flex flex-col items-center gap-2">
          <p className="text-zinc-500 max-w-3xl mx-auto text-sm leading-relaxed">
            You might ask: <span className="text-zinc-300 italic"> &quot;If I use Layouts and Suspense, why do I need PPR?&quot;</span> 
            The answer isn&apos;t about <strong>what</strong> is rendered, but <strong>where</strong> it comes from.
          </p>
          <div className="px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-3">
             <Info className="w-4 h-4 text-orange-400" />
             <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                Experimental Note: PPR is currently defaulting to SSR in your Local Build
             </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.map((column) => (
          <div key={column.label} className={cn(
            "p-8 rounded-[2.5rem] border bg-zinc-950/50 backdrop-blur-sm space-y-8",
            column.borderColor
          )}>
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-2xl", column.bgColor)}>
                <column.icon className={cn("w-6 h-6", column.color)} />
              </div>
              <h3 className="text-xl font-bold text-white">{column.label}</h3>
            </div>

            <div className="space-y-6 relative">
              {/* Connector Line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-zinc-900" />
              
              {column.steps.map((step, idx) => (
                <div key={step.title} className="flex gap-6 relative group">
                  <div className={cn(
                    "w-12 h-12 rounded-full shrink-0 flex items-center justify-center border-2 z-10 transition-colors",
                    idx === 0 ? "bg-zinc-900 border-zinc-800" : 
                    idx === column.steps.length - 1 ? (column.color.replace('text', 'bg') + " border-transparent") : 
                    "bg-black border-zinc-900 group-hover:border-zinc-700"
                  )}>
                    {idx === column.steps.length - 1 ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-xs font-black text-zinc-500">{idx + 1}</span>
                    )}
                  </div>
                  <div className="space-y-1 pt-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{step.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" />
          The CDN Caching Difference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="text-xs font-black text-zinc-300 uppercase tracking-widest">Without PPR</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              A dynamic route (using cookies) <strong className="text-zinc-300">cannot be cached</strong> as a static file. 
              The browser must wait for the server to run the layout code for every single visit.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-black text-zinc-300 uppercase tracking-widest">With PPR</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              The Layout (Sidebar/Nav) is <strong className="text-zinc-300">pre-rendered to a static HTML file</strong> at build time. 
              The CDN serves this file instantly, while only the specific dynamic holes are streamed from the server.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-black text-zinc-300 uppercase tracking-widest">The Result</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              You get the <strong className="text-blue-400">Time-to-First-Byte of a static site</strong> with the 
              <strong className="text-purple-400">flexibility of a dynamic app</strong>. This is why it&apos;s the 
              future of Next.js performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
