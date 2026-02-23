import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { CriticalRenderingPath } from '@/features/browser-pipeline/components/CriticalRenderingPath';
import { ArchitectureComparison } from '@/features/browser-pipeline/components/ArchitectureComparison';
import { CssAndCacheDetails } from '@/features/browser-pipeline/components/CssAndCacheDetails';
import { ResponsibilityMatrix } from '@/features/browser-pipeline/components/ResponsibilityMatrix';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Globe, MousePointer2, Cpu, Zap, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Browser Pipeline",
  description: "Master the Critical Rendering Path (CRP). Learn how browsers transform HTML into pixels and how Next.js optimizes the process.",
  keywords: ["browser rendering pipeline", "critical rendering path guide", "dom cssom layout paint", "browser internals for devs", "nextjs rendering optimization"],
  alternates: { canonical: "https://lab.badrigaire.com.np/browser-pipeline" },
};

export default function BrowserPipelinePage() {
  const stats = [
    { label: 'DOM Nodes', value: '1,200+', icon: Cpu, color: 'text-blue-500' },
    { label: 'Layout Time', value: '~14ms', icon: Activity, color: 'text-green-500' },
    { label: 'Hydration', value: 'Instant', icon: Zap, color: 'text-yellow-500' },
    { label: 'Network', value: 'HTTP/3', icon: Globe, color: 'text-purple-500' },
  ] as const;

  return (
    <div className="space-y-32 pb-20 animate-in fade-in duration-1000">
      <RenderingHeader 
        type="RSC"
        title="Browser Rendering Pipeline"
        description="Understanding how a request transforms from a string of bytes into a fully interactive user interface. This is the 'Secret Sauce' of high-performance web engineering."
        strategyMarkdown="The Critical Rendering Path (CRP) is the sequence of steps the browser goes through to convert HTML, CSS, and JS into pixels on the screen."
      />

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-3xl bg-zinc-950 border border-zinc-900 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-zinc-900">
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div>
              <div className="text-xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black text-white tracking-widest uppercase italic leading-none">The Visual Journey</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">Click through the stages of the Critical Rendering Path to see how the browser builds this very page.</p>
        </div>
        <CriticalRenderingPath />
      </section>

      <ResponsibilityMatrix />

      <ArchitectureComparison />

      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">Deep Technical Details</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">Parsing strategies and memory management for modern applications.</p>
        </div>
        <CssAndCacheDetails />
      </section>

      {/* Interaction Observer Note */}
      <div className="max-w-4xl mx-auto p-12 rounded-[3.5rem] bg-zinc-950 border border-zinc-900 text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-3xl" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="p-4 rounded-3xl bg-blue-600 shadow-2xl shadow-blue-500/40">
            <MousePointer2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-white tracking-tight">Does the Navbar recalculate?</h3>
          <p className="text-zinc-400 max-w-xl font-medium leading-relaxed">
            In Next.js, the <code>layout.tsx</code> wrap ensures that the Navbar and Footer are hoisted 
            above the page content. When you navigate, only the <code>children</code> slot updates. 
            The browser <strong>does not</strong> re-parse the CSSOM or re-calculate the Layout for the navbar, 
            providing that &quot;App-like&quot; feel.
          </p>
        </div>
      </div>

      <NextTopic 
        title="Caching Strategies"
        href="/caching-strategies"
        description="Learn how browsers, CDNs, and frameworks coordinate to store data as close to the user as possible."
      />
    </div>
  );
}
