import { getProducts } from '@/features/rendering/services/product-service';
import { ProductCard } from '@/features/rendering/components/ProductCard';
import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { CodeBlueprint } from '@/features/rendering/components/CodeBlueprint';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Next.js SSR | Server-Side Rendering Deep Dive & Architecture Lab",
  description: "Master Next.js Server-Side Rendering (SSR). Learn when to use force-dynamic, how to optimize TTFB, and implementation patterns for personalized data fetching.",
  keywords: ["nextjs ssr guide", "server side rendering nextjs", "force-dynamic nextjs", "ssr vs ssg nextjs", "dynamic rendering nextjs 15"],
};

// Force SSR
export const dynamic = 'force-dynamic';

export default async function SSRPage() {
  const products = await getProducts(8, 1000); // Simulate 1s server delay

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
  const data = await fetch('https://api.com/data');
  
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
        strategyMarkdown="Fetch data at request time using `force-dynamic` or `cache: 'no-store'`. Best for dynamic content that changes per-user or per-request."
      />

      <CodeBlueprint 
        type="SSR"
        title="Server-Side Rendering"
        description="SSR is best when data is highly dynamic or personalized. It ensures the first byte contains the final content for SEO, but the user must wait for the server to finish fetching data."
        code={ssrCode}
        steps={ssrSteps}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
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
