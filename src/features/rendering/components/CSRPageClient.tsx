'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/features/rendering/services/product-service';
import { ProductCard } from '@/features/rendering/components/ProductCard';
import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { CodeBlueprint } from '@/features/rendering/components/CodeBlueprint';
import { Product } from '@/features/rendering/types';
import { LazyHydrate } from '@/features/shared/components/LazyHydrate';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { MousePointer2, Loader2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

import { ExpectedHeader } from '@/features/rendering/types';

export function CSRPageClient() {
  const csrHeaders: ExpectedHeader[] = [
    { 
      key: 'Cache-Control', 
      value: 'public, max-age=0, must-revalidate', 
      description: 'The HTML shell is served instantly, but it tells the browser to always check for updates.' 
    },
    { 
      key: 'Vary', 
      value: 'Accept-Encoding, Cookie', 
      description: 'Tells the cache that the response might differ based on the request headers.' 
    },
    { 
      key: 'X-Vercel-Cache', 
      value: 'HIT', 
      description: 'The initial HTML shell (the "empty" page) is served from the edge cache.',
      isVercelSpecific: true 
    },
  ];
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const data = await getProducts(12, 1200); // Artificial delay to show loading state
      setProducts(data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const csrSteps: { icon: 'Monitor' | 'Zap' | 'Globe' | 'MousePointer2'; title: string; desc: string }[] = [
    { icon: 'Monitor', title: 'Empty Shell', desc: 'Server sends a minimal HTML file with almost no content.' },
    { icon: 'Zap', title: 'Load JS', desc: 'Browser downloads large JavaScript bundles (React + App code).' },
    { icon: 'Globe', title: 'Data on Client', desc: 'React executes in browser and makes API calls to fetch data.' },
    { icon: 'MousePointer2', title: 'Hydration', desc: 'The page becomes interactive after JS finishes executing.' },
  ];

  const csrCode = `'use client';
import { useState, useEffect } from 'react';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetched after the page loads in the browser
    fetch('/api/data').then(res => res.json()).then(setData);
  }, []);

  if (!data) return <Loader />;
  
  return (
    <div>{/* Render Data */}</div>
  );
}`;

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <RenderingHeader 
        type="CSR"
        title="Client-Side Rendering"
        description="The browser receives an empty shell and then fetches the data using JavaScript. This allows for rich interactive experiences like real-time filtering and complex state management, but can be slower on initial load."
        strategyMarkdown="Rendered entirely in the browser using `useEffect`. Ideal for interactive dashboards, search interfaces, and private user areas."
        expectedHeaders={csrHeaders}
      />

      <CodeBlueprint 
        type="CSR"
        title="Hydration Pipeline"
        description="CSR moves the rendering work to the user's device. While this increases the 'Time to Interactive', it enables the ultra-smooth transitions and state management that dynamic web apps require."
        code={csrCode}
        steps={csrSteps}
      />

      {/* Interactive Feature: Real-time Search */}
      <div id="search" className="relative max-w-md mx-auto group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
        <input 
          type="text"
          placeholder="Search products in real-time..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <section id="demo" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 id="demo-title" className="text-3xl font-bold text-white flex items-center gap-3">
              <Loader2 className={cn("w-6 h-6 text-blue-500", loading && "animate-spin")} />
              Live Demo
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              These products were fetched using <span className="text-blue-400 font-bold italic underline decoration-blue-500/30">Client-Side Rendering (CSR)</span> in your browser.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 max-w-xs">
             <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">Testing Tip</span>
             <p className="text-[9px] text-zinc-400 font-medium leading-relaxed">
               Refresh to see the &quot;Initializing&quot; state. Notice how the page shell loads first.
               <span className="text-blue-300/80 block mt-1 italic">Note: In this lab, we forced the CSR shell to be dynamic to show fresh cache headers.</span>
             </p>
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-zinc-500 font-medium animate-pulse">Initializing Client Hydration...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              /* We wrap the later products in LazyHydrate to show our special pattern */
              idx > 3 ? (
                <LazyHydrate key={product.id}>
                   <ProductCard product={product} />
                </LazyHydrate>
              ) : (
                <ProductCard key={product.id} product={product} />
              )
            ))}
          </div>
        )}
      </section>

      {/* Technical Deep Dive */}
      <div id="selective-rendering" className="mt-20 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 border-dashed">
        <div className="flex items-center gap-3 mb-6">
          <MousePointer2 className="w-5 h-5 text-purple-500" />
          <h3 className="text-xl font-bold text-white">Advanced Pattern: Selective Rendering</h3>
        </div>
        <p className="text-zinc-400 leading-relaxed mb-6">
          Scroll down to see the <code className="text-blue-400 font-mono">LazyHydrate</code> component in action. 
          Products after the first 4 are wrapped in an Intersection Observer. They won&apos;t actually mount or 
          render until they enter the viewport, saving CPU cycles on the initial hydrate.
        </p>
        <div className="flex flex-wrap gap-2">
           <span className="px-3 py-1 rounded-lg bg-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">React state</span>
           <span className="px-3 py-1 rounded-lg bg-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">useEffect Fetch</span>
           <span className="px-3 py-1 rounded-lg bg-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">Intersection Observer</span>
        </div>
      </div>

      <NextTopic 
        title="React Server Components"
        href="/rendering/rsc"
        description="Consolidate data fetching on the server and eliminate client-side waterfalls."
      />
    </div>
  );
}
