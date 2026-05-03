import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { PPRVisualizer } from '@/features/ppr-innovation/components/PPRVisualizer';
import { PPRPipeline } from '@/features/ppr-innovation/components/PPRPipeline';
import { PPRCodeGuide } from '@/features/ppr-innovation/components/PPRCodeGuide';
import { PPRvsSSRComparison } from '@/features/ppr-innovation/components/PPRComparison';
import { getProducts } from '@/features/rendering/services/product-service';
import { ProductCard } from '@/features/rendering/components/ProductCard';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Suspense } from 'react';
import { Sparkles, Layout, CheckCircle2, XCircle, Info, HelpCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { ExpectedHeader } from '@/features/rendering/types';

export const metadata: Metadata = {
  title: "PPR (Partial Prerendering)",
  description: "Experience the future of Next.js with PPR. Combine static builds with dynamic streaming for the ultimate user experience.",
  keywords: ["nextjs 15 ppr", "partial prerendering guide", "nextjs experimental ppr", "static shell dynamic holes", "nextjs streaming performance"],
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/ppr" },
};

export default async function PPRPage() {
  const pprHeaders: ExpectedHeader[] = [
    { 
      key: 'Cache-Control', 
      value: 'public, max-age=0, must-revalidate', 
      description: 'The static shell is served from CDN cache, but the stream allows for dynamic holes.' 
    },
    { 
      key: 'X-Vercel-Cache', 
      value: 'HIT', 
      description: 'The static portion (shell) of the page was served instantly from the Edge.',
      isVercelSpecific: true 
    },
    { 
      key: 'Transfer-Encoding', 
      value: 'chunked', 
      description: 'Indicates the response is being streamed in chunks (the "holes" filling in).' 
    },
    { 
      key: 'X-Nextjs-Prerender', 
      value: '1', 
      description: 'Confirms that a static shell exists for this route.',
      isVercelSpecific: true 
    },
  ];

  const useCaseData = [
    { title: 'Landing Pages', use: true, reason: 'Instant SEO Shell + Promo data' },
    { title: 'User Settings', use: false, reason: 'Highly private, no static benefit' },
    { title: 'Product Detail', use: true, reason: 'Static specs + Live stock status' },
    { title: 'Admin Dash', use: false, reason: 'Better as client-side dynamic' },
  ];

  return (
    <div className="space-y-24 animate-in fade-in duration-700">
      <RenderingHeader 
        type="PPR"
        title="Partial Prerendering (PPR)"
        description="PPR is the ultimate rendering optimization. It pre-renders the static shell of your page at build time and streams dynamic content into 'holes' as soon as it's ready."
        strategyMarkdown="Evolutionary Path: Introduced as experimental in **Next.js 14**, refined in **v15**, and now fully integrated with the **Cache Components** model in **v16**. See our [Migration Guide](./NEXTJS_16_MIGRATION.md) for build details."
        expectedHeaders={pprHeaders}
      />

      {/* The PPR Evolution: Standard vs Unified */}
      <section className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
            <div className="w-8 h-1 bg-orange-500" />
            The PPR Evolution: v15 vs v16
          </h2>
          <p className="text-zinc-500 max-w-2xl text-sm font-medium">
            With the introduction of <code className="text-orange-400">cacheComponents</code>, PPR has evolved from a simple "Streaming" feature to a complete "Unified Caching" strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Version 15: Standard PPR */}
          <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-6 group hover:border-zinc-800 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Next.js 15 (Standard PPR)</h3>
              <span className="text-[10px] font-black text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded">Legacy Pipeline</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-900">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                   <Layout className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest">Static Shell</h4>
                  <p className="text-[10px] text-zinc-500 font-medium">Pre-rendered at build time.</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-px h-6 bg-zinc-900" />
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                   <Zap className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest">Dynamic Hole</h4>
                  <p className="text-[10px] text-zinc-500 font-medium italic underline decoration-red-500/30">Always runs on the server.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
               <p className="text-[11px] text-zinc-400 leading-relaxed">
                 <strong className="text-zinc-300">The Problem:</strong> The server must re-execute the logic for the "hole" (DB queries, API calls) on every single request, even if the data hasn't changed.
               </p>
            </div>
          </div>

          {/* Version 16: Unified PPR */}
          <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-orange-500/20 space-y-6 shadow-2xl shadow-orange-500/5 group hover:border-orange-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Next.js 16 (Unified PPR)</h3>
              <span className="text-[10px] font-black text-orange-500 border border-orange-500/20 px-2 py-0.5 rounded bg-orange-500/10 uppercase tracking-widest">Modern Way</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-900">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                   <Layout className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest">Static Shell</h4>
                  <p className="text-[10px] text-zinc-500 font-medium">Pre-rendered at build time.</p>
                </div>
              </div>

              <div className="flex items-center justify-center relative">
                <div className="w-px h-6 bg-orange-500/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-2">
                   <CheckCircle2 className="w-3 h-3 text-orange-500" />
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                   <Sparkles className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest">Cached Hole</h4>
                  <p className="text-[10px] text-zinc-500 font-medium italic underline decoration-orange-500/30">Cached results via <strong>"use cache"</strong>.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/10">
               <p className="text-[11px] text-zinc-400 leading-relaxed">
                 <strong className="text-zinc-300">The Solution:</strong> By marking the hole with <code className="text-teal-400">"use cache"</code>, the output is saved. Subsequent users get the shell AND the hole result in sub-milliseconds.
               </p>
            </div>
          </div>
        </div>
      </section>

      <PPRvsSSRComparison />

      <div id="pipeline" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <PPRPipeline />
        
        <div className="p-8 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-3xl space-y-8">
           <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-500/10">
                <HelpCircle className="w-5 h-5 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold text-white">When to use PPR?</h3>
           </div>

           <div className="space-y-4">
              {useCaseData.map((item) => (
                <div key={item.title} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/30 border border-zinc-900 group hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-4">
                    {item.use ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-zinc-500 font-medium">{item.reason}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                    item.use ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {item.use ? 'Opt-In' : 'Avoid'}
                  </span>
                </div>
              ))}
           </div>

           <div className="p-4 rounded-2xl bg-blue-600/5 border border-blue-500/10 flex gap-4">
              <Info className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                <strong>Astro Note:</strong> Unlike Astro which uses &quot;Islands&quot; to control client JS, 
                PPR uses &quot;Holes&quot; to control server streaming.
              </p>
           </div>
        </div>
      </div>

      <section id="blueprint" className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">The Technical Blueprint</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm font-medium">
            Next.js automatically maps your React code into the PPR pipeline. 
            The secret lies in combining <strong>Suspense</strong> with <strong>Dynamic APIs</strong>.
          </p>
        </div>
        <PPRCodeGuide />
      </section>

      <div id="visualization" className="space-y-8">
        <div className="text-center">
           <h3 className="text-2xl font-bold text-white mb-2 underline decoration-teal-500/30">Architecture visualization</h3>
           <p className="text-sm text-zinc-500 font-medium">Concept: Static Shell + Dynamic Holes</p>
        </div>
        <PPRVisualizer />
      </div>

      <section id="demo" className="space-y-12 pb-20">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-3 rounded-2xl bg-orange-600/10 shadow-lg shadow-orange-500/5">
            <Sparkles className="w-6 h-6 text-orange-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Live PPR Playground</h2>
          <p className="text-zinc-500 max-w-xl text-sm font-medium">
             This storefront demonstrates the instant static load (Left) followed by the 
             dynamic personalized stream (Bottom Right).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 p-8 rounded-3xl bg-zinc-950 border border-zinc-900 h-fit space-y-8 shadow-2xl">
            <h4 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
               Static filters
            </h4>
            <div className="space-y-3">
              {['Electronics', 'Jewelery', 'Men\'s Clothing', 'Women\'s Clothing'].map(cat => (
                <div key={cat} className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-bold hover:bg-zinc-800 hover:text-white transition-all cursor-pointer flex justify-between items-center group">
                  {cat}
                  <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-12">
            <div className="space-y-6">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest whitespace-nowrap">Instantly Rendered Inventory</span>
                    <div className="h-0.5 w-12 bg-green-500/20" />
                  </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <StaticProducts />
               </div>
            </div>

            <div className="space-y-8 mt-12 p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900/50 shadow-inner">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-600/10 border border-purple-500/20">
                      <Layout className="w-4 h-4 text-purple-500 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-purple-300 uppercase tracking-widest block">Streaming Recommendations</span>
                      <p className="text-[10px] text-zinc-600 font-medium">This hole fetches data <span className="text-purple-400">Dynamically</span>.</p>
                    </div>
                  </div>
               </div>
               
               <Suspense fallback={
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="bg-zinc-900/50 rounded-3xl animate-pulse h-64 border border-zinc-800" />
                   <div className="bg-zinc-900/50 rounded-3xl animate-pulse h-64 border border-zinc-800" />
                 </div>
               }>
                 <DynamicRecommendations />
               </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section id="shell-paradox" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">The &quot;Shell&quot; Paradox</h2>
          <p className="text-zinc-500 max-w-3xl mx-auto text-sm font-medium">
            How can the navigation be static if we don&apos;t know the user context?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="p-10 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-3xl space-y-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              1. Static at BUILD Time
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              Next.js renders your <strong>Structural Skeleton</strong> into a physical file during the build.
            </p>
          </div>

          <div className="p-10 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-3xl space-y-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              2. Served by CDN at Request
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              The CDN sends that skeleton instantly. The server then streams the <strong>&quot;Contextual Reality&quot;</strong>.
            </p>
          </div>
        </div>
      </section>

      <section id="triggers" className="p-10 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-2xl space-y-8">
        <h3 className="text-2xl font-bold text-white tracking-widest uppercase italic">The Dynamic Triggers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'cookies()', desc: 'Reading cookies for auth.' },
            { name: 'headers()', desc: 'Accessing request headers.' },
            { name: 'searchParams', desc: 'The URL query string.' },
            { name: "cache: 'no-store'", desc: 'Disabling caching.' },
            { name: 'revalidate: 0', desc: 'Forcing bypass.' },
            { name: 'unstable_noStore()', desc: 'Explicit opt-out.' }
          ].map((trigger) => (
            <div key={trigger.name} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/30 transition-colors group">
              <code className="text-blue-400 font-mono text-sm block mb-2">{trigger.name}</code>
              <p className="text-[11px] text-zinc-500 font-medium">{trigger.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="max-w-4xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-4xl bg-zinc-950 border border-zinc-900 space-y-4">
             <h4 className="text-sm font-bold text-white">Why use it if it&apos;s experimental?</h4>
             <p className="text-xs text-zinc-500 leading-relaxed font-medium">PPR provides massive TTFB improvements for high-scale apps.</p>
          </div>
          <div className="p-8 rounded-4xl bg-zinc-950 border border-zinc-900 space-y-4">
             <h4 className="text-sm font-bold text-white">Wait, don&apos;t Layouts already persist?</h4>
             <p className="text-xs text-zinc-500 leading-relaxed font-medium">Yes, but standard SSR still makes the browser wait for the server to generate that layout.</p>
          </div>
        </div>
      </section>

      <NextTopic 
        title="Cache Components & Zones"
        href="/rendering/cache-components"
        description="Master surgical caching in Next.js 16."
        type="CACHE"
      />
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}

async function StaticProducts() {
  'use cache';
  const products = await getProducts(4);
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

async function DynamicRecommendations() {
  'use cache';
  const dynamicProducts = await getProducts(2, 4); 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {dynamicProducts.map((product) => (
        <div key={product.id} className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-indigo-600 rounded-[2.2rem] blur opacity-10 group-hover:opacity-30 transition duration-700"></div>
          <ProductCard product={product} />
          <div className="absolute -top-3 -right-3 px-4 py-1.5 rounded-full bg-indigo-600 text-[9px] font-black text-white uppercase tracking-widest shadow-xl ring-4 ring-black">
            Personalized For You
          </div>
        </div>
      ))}
    </div>
  );
}
