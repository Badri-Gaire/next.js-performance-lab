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

export const metadata: Metadata = {
  title: "PPR (Partial Prerendering)",
  description: "Experience the future of Next.js with PPR. Combine static builds with dynamic streaming for the ultimate user experience.",
  keywords: ["nextjs 15 ppr", "partial prerendering guide", "nextjs experimental ppr", "static shell dynamic holes", "nextjs streaming performance"],
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/ppr" },
};

export default async function PPRPage() {
  const products = await getProducts(4);

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
        strategyMarkdown="Experimental Stage: Currently available in Next.js 14/15 via an experimental flag. It enables 'incremental' rollout, allowing you to opt-in per route."
      />

      <PPRvsSSRComparison />

      <div id="pipeline" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Step-by-step Pipeline */}
        <PPRPipeline />
        
        {/* Strategy Decision Table */}
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
                PPR uses &quot;Holes&quot; to control server streaming. You get the same result (fast loads) 
                but via a unified server-first pipeline.
              </p>
           </div>
        </div>
      </div>

      {/* Code Implementation Guide - NEW */}
      <section id="blueprint" className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">The Technical Blueprint</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm font-medium">
            Next.js automatically maps your React code into the PPR pipeline. 
            The secret lies in combining <strong>Suspense</strong> with <strong>Dynamic APIs</strong> like `cookies()`, `headers()`, or uncached data fetches.
          </p>
        </div>
        <PPRCodeGuide />
      </section>

      {/* The Visual Explanation Component */}
      <div id="visualization" className="space-y-8">
        <div className="text-center">
           <h3 className="text-2xl font-bold text-white mb-2 underline decoration-teal-500/30">Architecture visualization</h3>
           <p className="text-sm text-zinc-500 font-medium">Concept: Static Shell + Dynamic Holes</p>
        </div>
        <PPRVisualizer />
      </div>

      {/* Interactive Demo Section */}
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
          {/* Static Sidebar */}
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

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12">
            <div>
               <div className="flex items-center gap-2 mb-6">
                  <div className="h-0.5 flex-1 bg-zinc-900" />
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest whitespace-nowrap">Instantly Rendered Inventory</span>
                  <div className="h-0.5 flex-1 bg-zinc-900" />
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {products.map((product) => (
                   <ProductCard key={product.id} product={product} />
                 ))}
               </div>
            </div>

            {/* DYNAMIC HOLE (Suspense) */}
            <div className="space-y-8 mt-12">
               <div className="flex items-center gap-3 p-4 rounded-2xl bg-purple-600/5 border border-purple-500/20">
                  <Layout className="w-5 h-5 text-purple-500 animate-pulse" />
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Streaming Deep Dynamic Slot (Simulated Delay)</span>
               </div>
               
               <Suspense fallback={
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="bg-zinc-900/50 rounded-3xl animate-pulse h-64 border border-zinc-800" />
                   <div className="bg-zinc-900/50 rounded-3xl animate-pulse h-64 border border-zinc-800" />
                 </div>
               }>
                 <DynamicRecommendations delay={2500} />
               </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* The Shell Paradox Section */}
      <section id="shell-paradox" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">The &quot;Shell&quot; Paradox</h2>
          <p className="text-zinc-500 max-w-3xl mx-auto text-sm font-medium">
            You discovered the most confusing part of Next.js performance: 
            <span className="text-zinc-300 italic block mt-2 text-base">&quot;If we don&apos;t know what the user will click, how can the navigation be static?&quot;</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="p-10 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-3xl space-y-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              1. Static at BUILD Time
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              Next.js renders your <strong>Structural CSS and HTML</strong> (the sidebar frame, the nav icons, the branding) into a physical file during the build. This doesn&apos;t include the &quot;Active Status&quot; yet&mdash;just the <strong>Skeleton Architecture</strong>.
            </p>
          </div>

          <div className="p-10 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-3xl space-y-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              2. Served by CDN at Request
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              When a user navigates to your site (Initial Load), the CDN sends that <strong>Static Skeleton</strong> instantly (0ms). The browser renders the UI frame immediately. The server then streams the <strong>&quot;Contextual Reality&quot;</strong> (which link is active, user data) into that frame.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-4xl bg-blue-600/5 border border-blue-500/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-lg font-bold text-white underline decoration-blue-500/20 underline-offset-8">Client Persistence vs. CDN Shell</h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            Standard React/Next.js Layouts already persist UI when you click links (Client Navigation). 
            <strong>But PPR is for the FIRST time a user arrives.</strong> Without PPR, the server blocks 
            everything until it computes which link should be active. With PPR, the structural shell 
            lives on the CDN globally, delivered even before your server code starts running.
          </p>
        </div>
      </section>


      {/* Dynamic Triggers Section */}
      <section id="triggers" className="p-10 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-2xl space-y-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-widest uppercase italic">The Dynamic Triggers</h3>
          <p className="text-sm text-zinc-500 font-medium tracking-tight">Any of these APIs will force Next.js to switch this part of the page from Static to Streaming Dynamic:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'cookies()', desc: 'Reading cookies for auth or personalization.' },
            { name: 'headers()', desc: 'Accessing request headers like user-agent.' },
            { name: 'searchParams', desc: 'The URL query string (e.g. ?search=next).' },
            { name: "cache: 'no-store'", desc: 'Disabling caching for a specific fetch request.' },
            { name: 'revalidate: 0', desc: 'Forcing data to bypass the cache every time.' },
            { name: 'unstable_noStore()', desc: 'The explicit API to opt-out of static generation.' }
          ].map((trigger) => (
            <div key={trigger.name} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/30 transition-colors group">
              <code className="text-blue-400 font-mono text-sm block mb-2 group-hover:text-blue-300 tracking-tighter">{trigger.name}</code>
              <p className="text-[11px] text-zinc-500 font-medium tracking-tight leading-relaxed">{trigger.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experimental Note & FAQ */}
      <section id="faq" className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest italic">The Experimental Reality</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-4xl bg-zinc-950 border border-zinc-900 space-y-4">
             <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-400" />
                Why use it if it&apos;s experimental?
             </h4>
             <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                PPR is the final piece of the architectural puzzle. While in &quot;Experimental&quot; mode, 
                it allows engineering teams to benchmark the <strong>massive TTFB (Time to First Byte) improvements</strong> 
                before the feature goes stable. It is the roadmap for how high-scale Next.js apps 
                will be built.
             </p>
          </div>

          <div className="p-8 rounded-4xl bg-zinc-950 border border-zinc-900 space-y-4">
             <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-purple-400" />
                Wait, don&apos;t Layouts already persist?
             </h4>
             <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Yes, Layouts keep the UI alive. But <strong>standard SSR</strong> still makes the browser wait 
                for the server to generate that layout for every request. PPR allows the <strong>physical HTML file</strong> 
                of that layout to live on a CDN Edge, delivering it globally in 0ms.
             </p>
          </div>
        </div>
      </section>

      <NextTopic 
        title="Caching Strategies"
        href="/caching-strategies"
        description="Learn how browsers, CDNs, and frameworks coordinate to store data as close to the user as possible."
      />
    </div>
  );
}

// Helper component for UI
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}

async function DynamicRecommendations({ delay }: { delay: number }) {
  // Simulate slow dynamic data source (e.g. Recommendations Engine)
  await new Promise(resolve => setTimeout(resolve, delay));
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
