import { getProducts } from '@/features/rendering/services/product-service';
import { ProductCard } from '@/features/rendering/components/ProductCard';
import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { CodeBlueprint } from '@/features/rendering/components/CodeBlueprint';
import { ArrowUpRight } from 'lucide-react';

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="py-12 text-center">
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
