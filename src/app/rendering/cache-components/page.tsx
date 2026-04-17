import React from 'react';
import { Network, Database, Info, Terminal, ChevronRight, Activity, Share2, Layers } from 'lucide-react';
import { RenderingBadge } from '@/features/rendering/components/RenderingBadge';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { ZoneDisplay } from '@/features/cache-lab/components/ZoneDisplay';
import { RevalidateButton } from '@/features/cache-lab/components/RevalidateButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cache Components & Zones | Next.js 16 Lab',
  description: 'Master surgical caching in Next.js 16 using Cache Components, cacheLife, and revalidateTag.',
};

export default function CacheComponentsLab() {
  return (
    <div className="space-y-12 pb-20">
      {/* Lab Header */}
      <section className="relative pt-8 md:pt-16 pb-12 border-b border-zinc-900 overflow-hidden px-4 md:px-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-cyan-500/10 via-transparent to-transparent blur-3xl" />
        
        <div className="relative space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black text-cyan-400 uppercase tracking-widest leading-none">
              Optimization Lab
            </span>
            <span className="text-zinc-700 font-mono text-xs">/ v16.1.6</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9]">
            CACHE <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              COMPONENTS
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl font-medium leading-relaxed">
            The evolution of Partial Prerendering. Break your application into granular <strong>Surgical Zones </strong> 
            that can be individually cached, revalidated, or streamed dynamically.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {[
              { label: 'use cache', color: 'text-cyan-400' },
              { label: 'cacheLife', color: 'text-blue-400' },
              { label: 'revalidateTag', color: 'text-zinc-400' }
            ].map(pill => (
              <div key={pill.label} className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full bg-current ${pill.color}`} />
                <span className="text-zinc-300">{pill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Sandbox Interface */}
      <div className="space-y-16">
        {/* Behavior Shift Comparison */}
        <section className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
              <Activity className="w-6 h-6 text-cyan-500" />
              The Behavior Shift
            </h2>
            <p className="text-sm text-zinc-500 max-w-3xl font-medium">
              Next.js 16 moves from an "Opt-out" model to a "Strictly Static" model. This ensures performance is 
              predictable and prevents accidental dynamic rendering of large portions of your app.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mechanism 1: Legacy SSR */}
            <div className="p-8 rounded-[2rem] bg-zinc-900/30 border border-zinc-800/50 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-2xl font-black italic text-yellow-700">LEGACY SSR</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="w-2 h-2 rounded-full bg-zinc-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Opt-Out Model</span>
                </div>
                <h3 className="text-xl font-bold text-white italic">Full-Page Re-rendering</h3>
                <ul className="space-y-3">
                  {[
                    'Layouts re-render on every single request.',
                    'Zero CDN caching for the HTML shell.',
                    'High TTFB (Time to First Byte) because server waits for all data.',
                    'Personalization kills performance for the entire route.'
                  ].map((text, i) => (
                    <li key={i} className="flex gap-2 text-xs text-zinc-500 font-medium leading-relaxed">
                      <span className="text-red-500/50">✕</span> {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-zinc-800 space-y-3">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">The "One-Speed" Route</p>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-red-500/30 animate-pulse" />
                </div>
                <p className="text-[9px] text-zinc-500 italic text-center">Entire response is blocked by the slowest dynamic fetch</p>
              </div>
            </div>

            {/* Mechanism 2: Cache Components / PPR */}
            <div className="p-8 rounded-[2rem] bg-cyan-500/[0.03] border border-cyan-500/10 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-cyan-500">
                <span className="text-2xl font-black italic">UNIFIED CACHE</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-500">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Hybrid Static/Dynamic</span>
                </div>
                <h3 className="text-xl font-bold text-white italic">The "Two-Speed" Mechanism</h3>
                <ul className="space-y-3">
                  {[
                    'Layout Shell is served instantly from the Global CDN.',
                    'Static parts are pre-rendered at build time.',
                    'Dynamic "Holes" stream independently once data is ready.',
                    'Personalization is isolated to specific components.'
                  ].map((text, i) => (
                    <li key={i} className="flex gap-2 text-xs text-zinc-400 font-medium leading-relaxed">
                      <span className="text-cyan-500">✓</span> {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/10 space-y-3">
                <p className="text-[10px] font-black text-cyan-500/60 uppercase tracking-widest">The "Multi-Speed" Route</p>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                  <div className="h-full w-3/4 bg-cyan-500" />
                  <div className="h-full w-1/4 bg-cyan-500/20 animate-pulse" />
                </div>
                <div className="flex justify-between text-[9px] font-black uppercase italic">
                  <span className="text-cyan-400">Static Shell (Instant)</span>
                  <span className="text-zinc-600">Dynamic Hole</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Dive List */}
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-8">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic border-b border-zinc-900 pb-4">
              Mechanics of the Request
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-xs font-black text-cyan-500 uppercase">1. How Layouts are Cached</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  In the old model, a Navbar with <code className="text-zinc-400">cookies()</code> forced the whole page dynamic. 
                  Now, the Navbar itself can be marked with <code className="text-zinc-400">'use cache'</code>. 
                  The compiler extracts the static HTML of the Navbar links and logo, storing them on the CDN.
                </p>
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                  // Navbar remains 100% static on CDN<br/>
                  export default function Navbar() &#123;<br/>
                  &nbsp;&nbsp;return &lt;nav&gt;...&lt;/nav&gt;<br/>
                  &#125;
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-purple-500 uppercase">2. Handling Dynamic Edge Cases</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  What if the Navbar needs the User Name? We wrap <strong>only</strong> the name in <code className="text-zinc-400">Suspense</code>. 
                  The user sees the Navbar instantly from the CDN, then the name "pops in" via streaming.
                </p>
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                  &lt;Suspense fallback=&lt;Skeleton /&gt;&gt;<br/>
                  &nbsp;&nbsp;&lt;UserName /&gt; // Only this is dynamic<br/>
                  &lt;/Suspense&gt;
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-900">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-white">The Unified Secret:</strong> One route, two delivery methods. 
                  The static bytes travel via HTTP/2 immediately, followed by the dynamic bytes over the same connection. 
                  This is why your Layouts never "flicker" anymore—they are already there.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Lab */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
              <Terminal className="w-6 h-6 text-cyan-500" />
              Surgical Zone Sandbox
            </h2>
            <div className="hidden sm:block px-3 py-1 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-[9px] font-black text-cyan-400 uppercase tracking-widest">
              Live Simulation
            </div>
          </div>
          
          <ZoneDisplay />

          {/* Controller Row */}
          <div className="pt-8">
            <RevalidateButton />
          </div>
        </section>

        {/* Educational Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-4xl bg-zinc-900/50 border border-zinc-900 space-y-4">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
               <Share2 className="w-5 h-5 text-cyan-400" />
               Global Persistence
             </h3>
             <p className="text-sm text-zinc-500 leading-relaxed font-medium">
               Data fetched in a <strong>'use cache'</strong> block is cached 1:N. The first visitor triggers the computation; 
               subsequent visitors receive the pre-rendered HTML/RSC payload instantly.
             </p>
          </div>
          <div className="p-8 rounded-4xl bg-zinc-900/50 border border-zinc-900 space-y-4">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
               <Layers className="w-5 h-5 text-purple-400" />
               Streaming Boundaries
             </h3>
             <p className="text-sm text-zinc-500 leading-relaxed font-medium">
               In Next.js 16, dynamic logic is <strong>isolated</strong> to its nearest Suspense boundary. This allows the 
               rest of the page to remain a static shell even when personalization is required.
             </p>
          </div>
        </div>

        {/* Precision Invalidation & Real-time Sync */}
        <section className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
              <Database className="w-6 h-6 text-cyan-500" />
              Precision Invalidation
            </h2>
            <p className="text-sm text-zinc-500 max-w-3xl font-medium">
              Time-based caching (TTL) is never enough for real-time apps. Learn how to bridge the gap between 
              "Static Speed" and "Live Data" using surgical tag invalidation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 md:p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  The Stale Data Problem
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  If you set <code className="text-zinc-400">cacheLife('hours')</code>, your users might see old prices or stock levels 
                  for up to 60 minutes. In a high-traffic app, this leads to lost revenue or synchronization errors. 
                  <strong> Surgical Invalidation</strong> allows you to keep the 1-hour cache but "kill" it the second data changes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-zinc-900">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">1. Set the Tag</h4>
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[9px] font-mono text-zinc-400">
                    async function ProductPrice() &#123;<br/>
                    &nbsp;&nbsp;'use cache';<br/>
                    &nbsp;&nbsp;cacheTag('prices'); // Subscribe<br/>
                    &nbsp;&nbsp;return await getPrice();<br/>
                    &#125;
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-purple-500 uppercase tracking-widest">2. Trigger the Event</h4>
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[9px] font-mono text-zinc-400">
                    // Webhook / Server Action<br/>
                    async function updatePrice() &#123;<br/>
                    &nbsp;&nbsp;await db.save();<br/>
                    &nbsp;&nbsp;revalidateTag('prices'); // Notify<br/>
                    &#125;
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-linear-to-b from-cyan-500/10 to-transparent border border-cyan-500/10 space-y-6">
              <h3 className="text-base font-black text-white uppercase italic tracking-tight">Real-World Use Cases</h3>
              <ul className="space-y-6">
                {[
                  { 
                    title: 'E-commerce Pricing', 
                    desc: 'Instantly update sales across thousands of edge nodes the moment you hit "Publish" in your CMS.' 
                  },
                  { 
                    title: 'Inventory Sync', 
                    desc: 'When a stock hits zero, trigger a global invalidation so users never see an "In Stock" button for an empty shelf.' 
                  },
                  { 
                    title: 'User Permissions', 
                    desc: 'When a user upgrades their plan, revalidate the "Permissions" tag so they get access to PRO features immediately.' 
                  }
                ].map((item, i) => (
                  <li key={i} className="space-y-1">
                    <p className="text-xs font-bold text-cyan-400 uppercase tracking-tighter">{item.title}</p>
                    <p className="text-[10px] text-zinc-500 font-medium leading-normal">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/20 border border-zinc-900 flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Share2 className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-black text-white uppercase italic">The "Real-time" Pipeline</h4>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
                By connecting <strong>Database Webhooks</strong> (from Supabase, Prisma, or Sanity) to a Next.js 
                Route Handler that calls <code className="text-zinc-400">revalidateTag</code>, you transform your 
                static application into an event-driven engine. You get the <strong>1ms response time</strong> of 
                the Edge with the <strong>freshness</strong> of a real-time database.
              </p>
            </div>
          </div>
        </section>

        {/* Architecture Technical Reference (Moved from Sidebar to Bottom) */}
        <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
            <div className="space-y-2">
              <h3 className="text-xs font-black text-zinc-600 uppercase tracking-[0.3em] italic">Architecture Guide</h3>
              <p className="text-2xl font-black text-white italic tracking-tighter">Next.js 16 Caching Philosophy</p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 max-w-sm">
              <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Compiler Tip</p>
              <p className="text-xs text-zinc-500 font-medium leading-normal">
                Next.js uses static analysis to determine which components can be cached. Use <strong>'use cache'</strong> to override defaults.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Stable PPR', 
                desc: 'No more experimental flags. PPR is now the foundation of the Cache Components model.',
                icon: Database 
              },
              { 
                title: 'Granular TTL', 
                desc: 'Set cache duration per-component with cacheLife(\'minutes\') or custom presets.',
                icon: Info 
              },
              { 
                title: 'Tagging System', 
                desc: 'Connect frontend fragments to backend database tags for sub-second invalidation.',
                icon: Network 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <item.icon className="w-6 h-6 transition-colors" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-black text-white uppercase tracking-tight italic">{item.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sequential Navigation */}
      <NextTopic 
        title="Hybrid Architecture"
        description="Combining multiple strategies for massive applications."
        href="/rendering/hybrid"
        type="HYBRID"
      />
    </div>
  );
}
