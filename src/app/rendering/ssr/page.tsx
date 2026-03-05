import { getProducts } from '@/features/rendering/services/product-service';
import { ProductCard } from '@/features/rendering/components/ProductCard';
import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { CodeBlueprint } from '@/features/rendering/components/CodeBlueprint';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Metadata } from 'next';
import { Database } from 'lucide-react';

export const metadata: Metadata = {
  title: "SSR Architecture",
  description: "Deep dive into Next.js Server-Side Rendering. Learn when to use force-dynamic and how to optimize TTFB performance.",
  keywords: ["nextjs ssr guide", "server side rendering nextjs", "force-dynamic nextjs", "ssr vs ssg nextjs", "dynamic rendering nextjs 15"],
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/ssr" },
};

// Force SSR
export const dynamic = 'force-dynamic';

export default async function SSRPage() {
  const requestTime = new Date().toISOString();
  // We pass cache: 'no-store' to ensure the database call is NEVER cached
  const products = await getProducts(8, 1000, { cache: 'no-store' }); 

  const ssrSteps: { icon: 'User' | 'Server' | 'Database' | 'Globe'; title: string; desc: string }[] = [
    { icon: 'User', title: 'Request Received', desc: 'Browser requests the page. No cached version is served.' },
    { icon: 'Server', title: 'Compute on Server', desc: 'Next.js starts executing the page function immediately.' },
    { icon: 'Database', title: 'Fetch Data', desc: 'Server waits for all database/API calls to complete.' },
    { icon: 'Globe', title: 'Stream HTML', desc: 'Full HTML is generated and sent back to the browser.' },
  ];

  const ssrCode = `// Force every request to be fresh
export const dynamic = 'force-dynamic';

export default async function Page() {
  // Fetched on the server for EVERY request
  const data = await fetch('https://api.com/data', { cache: 'no-store' });
  
  return (
    <div>
      {data.map(item => <Card key={item.id} {...item} />)}
    </div>
  );
}`;

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <RenderingHeader 
        type="SSR"
        title="Server-Side Rendering"
        description="Every time you refresh this page, the server fetches fresh data from the API and generates the HTML. This ensures the content is always up-to-date and personalized for the user."
        serverTime={requestTime}
        strategyMarkdown="Fetch data at request time using `force-dynamic` or `cache: 'no-store'`. Best for dynamic content that changes per-user or per-request."
      />

      <CodeBlueprint 
        type="SSR"
        title="Server-Side Rendering"
        description="SSR is best when data is highly dynamic or personalized. It ensures the first byte contains the final content for SEO, but the user must wait for the server to finish fetching data."
        code={ssrCode}
        steps={ssrSteps}
      />

      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 id="demo" className="text-3xl font-bold text-white flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-500" />
              Live Demo
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              These products were fetched using <span className="text-blue-400 font-bold italic underline decoration-blue-500/30">Server-Side Rendering (SSR)</span> logic.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 max-w-xs">
             <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">Testing Tip</span>
             <p className="text-[9px] text-zinc-400 font-medium leading-relaxed">
               Hit <kbd className="bg-zinc-800 px-1 rounded text-zinc-200 uppercase">F5</kbd> for a fresh fetch.
               <span className="text-blue-300/80 block mt-1">Note: Next.js caches internal navigation for 30s (Router Cache). Links might show a stale view until that window passes.</span>
             </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* NEW: Dynamic Triggers Section */}
      <section id="triggers" className="p-10 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-2xl space-y-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-widest uppercase italic">The Dynamic Triggers</h3>
          <p className="text-sm text-zinc-500 font-medium tracking-tight">Any of these APIs will force Next.js to switch this route from Static to Server-Side Rendering (SSR):</p>
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
      
      {products.length === 0 && (
         <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-3xl">
           No products found. Check your connection to DummyJSON.
         </div>
      )}
      
      <NextTopic 
        title="Static Site Generation"
        href="/rendering/ssg"
        description="Learn how to make your pages incredibly fast by pre-rendering them at build time."
      />
    </div>
  );
}
