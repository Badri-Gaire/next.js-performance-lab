import { getProducts } from '@/features/rendering/services/product-service';
import { ProductCard } from '@/features/rendering/components/ProductCard';
import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { CodeBlueprint } from '@/features/rendering/components/CodeBlueprint';
import { ArrowUpRight, RefreshCcw } from 'lucide-react';

// ISR: Revalidate every 30 seconds
export const revalidate = 30;

import { NextTopic } from '@/features/shared/components/NextTopic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ISR Patterns",
  description: "Learn how to use Next.js Incremental Static Regeneration to update static content instantly using the Stale-While-Revalidate pattern.",
  keywords: ["nextjs isr guide", "incremental static regeneration nextjs", "stale-while-revalidate nextjs", "nextjs isr vs ssg", "on-demand revalidation nextjs"],
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/isr" },
};

export default async function ISRPage() {
  const products = await getProducts(8, 0);

  const isrSteps: { icon: 'Globe' | 'RefreshCcw' | 'Server' | 'Database'; title: string; desc: string }[] = [
    { icon: 'Globe', title: 'Server Cache Hit', desc: 'Page is served instantly from the pre-built static cache.' },
    { icon: 'RefreshCcw', title: 'Stale Check', desc: 'Next.js checks if 30s have passed. If yes, it "invalidates" the cache.' },
    { icon: 'Server', title: 'Background Update', desc: 'The NEXT request triggers a background rebuild while serving the old page.' },
    { icon: 'Database', title: 'Fresh Data', desc: 'Database is queried; once finished, the static cache is updated for the NEXT visitor.' },
  ];

  const isrCode = `// Revalidate every 30 seconds
export const revalidate = 30;

export default async function Page() {
  // First build: Dynamic fetch
  // Subequent requests: Static Cache
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
        description="This page is cached as a static file. After 30 seconds, the cache becomes 'stale'. The next visitor triggers a background regeneration, and the visitor after that gets the fresh version."
        strategyMarkdown="Stale-While-Revalidate: Serve static, trigger background update, then serve fresh. Perfect for blogs, catalogs, and high-traffic sites."
      />

      <CodeBlueprint 
        type="ISR"
        title="Regeneration Pipeline"
        description="ISR provides the speed of static sites with the freshness of dynamic sites. It uses the 'Stale-While-Revalidate' pattern, ensuring no user ever has to wait for a database query."
        code={isrCode}
        steps={isrSteps}
      />

      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 id="demo" className="text-3xl font-bold text-white flex items-center gap-3">
              <RefreshCcw className="w-6 h-6 text-blue-500" />
              Live Demo
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              These products were fetched using <span className="text-blue-400 font-bold italic underline decoration-blue-500/30">Incremental Static Regeneration (ISR)</span> with a 30s window.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 max-w-xs">
             <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">Testing Tip</span>
             <p className="text-[9px] text-zinc-400 font-medium leading-relaxed">
               Refresh after 30s. The 1st refresh triggers the update, the 2nd shows it.
               <span className="text-blue-300/80 block mt-1 italic">Note: Internal links might stay stale longer due to the 30s Client Router Cache.</span>
             </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <div id="trigger" className="py-12 text-center">
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-bold text-white hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl">
          Trigger Background Revalidation
          <ArrowUpRight className="w-4 h-4 text-blue-500" />
        </button>
      </div>

      <NextTopic 
        title="Client-Side Rendering"
        href="/rendering/csr"
        description="Learn about the traditional SPA approach and how hydration works in Next.js."
      />
    </div>
  );
}
