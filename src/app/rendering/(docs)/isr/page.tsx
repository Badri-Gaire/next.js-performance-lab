import { getProducts } from '@/features/rendering/services/product-service';
import { ProductCard } from '@/features/rendering/components/ProductCard';
import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { CodeBlueprint } from '@/features/rendering/components/CodeBlueprint';
import { RefreshCcw } from 'lucide-react';

// Revalidation is now managed via 'use cache' logic in Next.js 16.

import { NextTopic } from '@/features/shared/components/NextTopic';
import { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { ExpectedHeader } from '@/features/rendering/types';

export const metadata: Metadata = {
  title: "ISR Patterns",
  description: "Learn how to use Next.js Incremental Static Regeneration to update static content instantly using the Stale-While-Revalidate pattern.",
  keywords: ["nextjs isr guide", "incremental static regeneration nextjs", "stale-while-revalidate nextjs", "nextjs isr vs ssg", "on-demand revalidation nextjs"],
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/isr" },
};

export default async function ISRPage() {
  'use cache'; 
  // 🔵 Next.js 16: Use cacheLife to set the TTL for this cached scope.
  // The 'seconds' profile typically maps to a short revalidation window.
  cacheLife({stale: 0, revalidate: 30, expire: 60});

  const revalidationTime = new Date().toISOString();
  const products = await getProducts(8, 0);

  const isrHeaders: ExpectedHeader[] = [
    { 
      key: 'Cache-Control', 
      value: 'public, s-maxage=30, stale-while-revalidate', 
      description: 'The CDN caches the page for 30s. If requested after 30s, it serves stale content while updating in the background.',
      lifecycle: { stage: 'Edge', impact: 'Prevents the origin server from re-rendering for every visitor.' }
    },
    { 
      key: 'X-Vercel-Cache', 
      value: 'STALE', 
      description: 'The request was served from cache, but a background revalidation was triggered.',
      isVercelSpecific: true,
      lifecycle: { stage: 'Edge', impact: 'Maintains zero-latency TTFB even when data is being updated.' }
    },
    { 
      key: 'X-Nextjs-Stale-Time', 
      value: '300', 
      description: 'The window in which stale content can be served while revalidating.',
      isVercelSpecific: true,
      lifecycle: { stage: 'Origin', impact: 'Defined by your cacheLife profile in the component code.' }
    },
    { 
      key: 'Age', 
      value: '42', 
      description: 'The number of seconds the object has been in the CDN cache.',
      lifecycle: { stage: 'Client', impact: 'Tells the browser how old the cached resource is.' }
    },
  ];

  const isrSteps: { icon: 'Globe' | 'RefreshCcw' | 'Server' | 'Database'; title: string; desc: string }[] = [
    { icon: 'Globe', title: 'Cache Hit', desc: 'The component is served from the Unified Cache.' },
    { icon: 'RefreshCcw', title: 'TTL Expiry', desc: 'Next.js checks the cacheLife profile. If expired, it marks it for revalidation.' },
    { icon: 'Server', title: 'Background Revalidation', desc: 'The NEXT request triggers a background update while serving the cached version.' },
    { icon: 'Database', title: 'Unified Update', desc: 'Data is refreshed and the new version is persisted in the cache for the next visitor.' },
  ];

  const isrCode = `import { unstable_cacheLife as cacheLife } from 'next/cache';

export default async function Page() {
  'use cache'; // ⚡ Mark as cached
  
  // ⏱️ Custom 30s revalidation
  cacheLife({
    stale: 0, 
    revalidate: 30, 
    expire: 60
  }); 
  
  const data = await fetch('https://api.com/data');
  
  return (
    <main>
      <h1>{new Date().toLocaleTimeString()}</h1>
      {data.map(item => <Card key={item.id} {...item} />)}
    </main>
  );
}`;

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <RenderingHeader 
        type="ISR"
        title="Incremental Static Regeneration"
        description="With cacheComponents enabled, we no longer use page-level exports. Instead, we use the 'use cache' directive and the 'cacheLife' profile to define our revalidation window."
        serverTime={revalidationTime}
        strategyMarkdown="Unified ISR: Uses the 'use cache' directive paired with 'cacheLife' for granular, component-level revalidation."
        expectedHeaders={isrHeaders}
      />

      <CodeBlueprint 
        type="ISR"
        title="Modern ISR Pipeline"
        description="ISR provides the speed of static sites with the freshness of dynamic sites. In Next.js 16, this is achieved by caching the component's output and defining a TTL profile."
        code={isrCode}
        steps={isrSteps}
      />

      {/* modern caching */}
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3">
            <div className="w-8 h-1 bg-blue-500" />
            Modern ISR: The cacheLife Profile
          </h2>
          <p className="text-zinc-500 max-w-2xl text-sm font-medium">
            In Next.js 16, <code className="text-blue-400">revalidate</code> is deprecated. The modern way is to use <code className="text-blue-400">cacheLife</code> profiles directly inside your cached scope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile: Seconds */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4">
            <div className="text-blue-500 font-bold text-lg">"seconds"</div>
            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 font-mono text-[10px] text-zinc-400">
              'use cache';<br/>
              cacheLife('seconds');<br/>
              <span className="text-zinc-600">// Short TTL window</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed italic">
              Ideal for stock prices or live scores.
            </p>
          </div>

          {/* Profile: Minutes */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4">
            <div className="text-teal-500 font-bold text-lg">"minutes"</div>
            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 font-mono text-[10px] text-zinc-400">
              'use cache';<br/>
              cacheLife('minutes');<br/>
              <span className="text-zinc-600">// Moderate TTL window</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed italic">
              Perfect for weather or trending topics.
            </p>
          </div>

          {/* Profile: Hours */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4">
            <div className="text-purple-500 font-bold text-lg">"hours"</div>
            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 font-mono text-[10px] text-zinc-400">
              'use cache';<br/>
              cacheLife('hours');<br/>
              <span className="text-zinc-600">// Long TTL window</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed italic">
              Best for blog posts or documentation.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <span className="text-[8px] text-blue-500 italic">i</span>
            </div>
            Default Profile Values
          </h3>
          <div className="overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/50">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-zinc-900/50 border-b border-zinc-900">
                  <th className="px-4 py-3 font-bold text-zinc-300">Profile Name</th>
                  <th className="px-4 py-3 font-bold text-zinc-300">Stale After</th>
                  <th className="px-4 py-3 font-bold text-zinc-300">Revalidate After</th>
                  <th className="px-4 py-3 font-bold text-zinc-300">Max Age (Expire)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {[
                  { name: 'seconds', stale: '1 second', revalidate: '1 minute', expire: '1 minute' },
                  { name: 'minutes', stale: '1 minute', revalidate: '5 minutes', expire: '14 days' },
                  { name: 'hours', stale: '1 hour', revalidate: '1 day', expire: '14 days' },
                  { name: 'days', stale: '1 day', revalidate: '1 week', expire: '14 days' },
                ].map((p) => (
                  <tr key={p.name} className="hover:bg-zinc-900/20 transition-colors">
                    <td className="px-4 py-3 font-mono text-blue-400">{`"${p.name}"`}</td>
                    <td className="px-4 py-3 text-zinc-500">{p.stale}</td>
                    <td className="px-4 py-3 text-zinc-400 font-medium">{p.revalidate}</td>
                    <td className="px-4 py-3 text-zinc-500">{p.expire}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <RefreshCcw className="w-4 h-4 text-blue-500" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest">Why switch to cacheLife?</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Unlike the page-level <code className="text-zinc-300">revalidate</code> export, <code className="text-blue-400">cacheLife</code> allows you to set different TTLs for different components on the <strong>same page</strong>. You can have a Navbar cached for "weeks" and a News Feed cached for "seconds".
              </p>
            </div>
          </div>
        </div>
      </section>
{/* example live demo */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 id="demo" className="text-3xl font-bold text-white flex items-center gap-3">
              <RefreshCcw className="w-6 h-6 text-blue-500" />
              Live Demo
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              These products are cached using <span className="text-blue-400 font-bold italic underline decoration-blue-500/30">Unified ISR</span> with a <code className="text-blue-300">"seconds"</code> profile.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 max-w-xs">
             <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">Testing Tip</span>
             <p className="text-[9px] text-zinc-400 font-medium leading-relaxed">
               Refresh after 30s. The 1st refresh triggers the background update, the 2nd shows it.
               <span className="text-blue-300/80 block mt-1 italic">Note: Granular caching is now managed inside the component itself.</span>
             </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>


      <NextTopic 
        title="Partial Prerendering"
        href="/rendering/ppr"
        description="The ultimate hybrid: instant static shells with streamed dynamic holes."
      />
    </div>
  );
}

