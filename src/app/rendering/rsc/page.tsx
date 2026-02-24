import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { WaterfallComparison } from '@/features/rsc-architecture/components/WaterfallViz';
import { CodeComparison } from '@/features/rsc-architecture/components/CodeComparison';
import { CodeBlueprint } from '@/features/rendering/components/CodeBlueprint';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Cpu, Box, Zap, History, Code2, ArrowDown } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "RSC & Waterfalls",
  description: "Explore React Server Components in Next.js. Learn how to eliminate client-side waterfalls and reduce JavaScript bundles.",
  keywords: ["react server components guide", "rsc vs ssr", "nextjs rsc example", "waterfall optimization nextjs", "server components nextjs 15"],
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/rsc" },
};

// Force RSC to be dynamic for this demonstration
export const dynamic = 'force-dynamic';

import { getProducts } from '@/features/rendering/services/product-service';
import { ProductCard } from '@/features/rendering/components/ProductCard';
import { Database } from 'lucide-react';

export default async function RSCPage() {
  // RSC data fetching (at request time due to force-dynamic)
  const products = await getProducts(4, 800, { cache: 'no-store' });

  const rscSteps: { icon: 'Server' | 'Database' | 'Layers' | 'Globe'; title: string; desc: string }[] = [
    { icon: 'Server', title: 'Server Execution', desc: 'The component executes ONLY on the server. Zero JS is sent to the client for this logic.' },
    { icon: 'Database', title: 'Direct DB Access', desc: 'RSCs can query databases or call internal APIs without needing a REST/GraphQL endpoint.' },
    { icon: 'Layers', title: 'Consolidated Payload', desc: 'Multiple fetches are combined into a single serialized stream.' },
    { icon: 'Globe', title: 'Zero-Hydration UI', desc: 'Static parts are rendered as HTML; only Interactive islands are hydrated.' },
  ];

  const rscCode = `// Standard Server Component (Default in Next.js 13+)
export default async function Page() {
  // Direct Server-Side logic (No useEffect/useState needed)
  const data = await db.query('SELECT * FROM products');
  
  return (
    <main>
      <h1>Server-Side Data</h1>
      <ProductGrid items={data} />
      
      {/* Client Component Island */}
      <InteractiveFilter /> 
    </main>
  );
}`;

  return (
    <div className="space-y-20 animate-in fade-in duration-700">
      <RenderingHeader 
        type="RSC"
        title="RSC Architecture & Waterfalls"
        description="React Server Components (RSC) redefine how data travels from your server to the screen. By moving fetching to the server, we eliminate the costly 'Request-Response' cycles that cause slow page loads."
        strategyMarkdown="Server-First rendering introduced in React 18 (2022). Fixes the 'Waterfall' problem by consolidating data fetching on the server before client execution."
      />

      <CodeBlueprint 
        type="RSC"
        title="RSC Pipeline"
        description="React Server Components are not just SSR. They allow you to define parts of your UI that stay on the server forever, reducing bundle size and eliminating client-side data fetching waterfalls."
        code={rscCode}
        steps={rscSteps}
      />

      {/* Live Demo Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 id="demo" className="text-3xl font-bold text-white flex items-center gap-3">
              <Database className="w-6 h-6 text-indigo-500" />
              Live RSC Fetch
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              These products were fetched inside a <span className="text-indigo-400 font-bold italic underline decoration-indigo-500/30">React Server Component (RSC)</span>.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
             <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Testing Tip</span>
             <p className="text-[9px] text-zinc-400 font-medium">RSCs that fetch data often use SSR. Hard Refresh (<kbd className="bg-zinc-800 px-1 rounded text-zinc-200">F5</kbd>) to force re-render.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Code Comparison - NEW */}
      <section id="code-transformation" className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">The Code Transformation</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
            See how the transition from Client-Side to Server-Side components simplifies your 
            pipeline and improves developer experience.
          </p>
        </div>
        <CodeComparison />
      </section>

      {/* Comparison Grid */}
      <section id="waterfall-viz" className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Visualization of the Waterfall</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
            Conceptualizing the network requests: CSR requires chaining, while RSC allows consolidation.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WaterfallComparison mode="client" />
          <WaterfallComparison mode="rsc" />
        </div>
      </section>

      {/* History & Theory Section */}
      <section id="evolution" className="p-10 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-2xl space-y-10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/20">
            <History className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">The RSC Evolution</h2>
            <p className="text-sm text-zinc-500 font-medium">From Client-Heavy to Server-First (2020 - 2025)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Code2 className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">2020: The RFC</span>
            </div>
            <h4 className="text-lg font-bold text-white">Conceptual Birth</h4>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              Facebook introduces RSC to solve the &quot;huge JS bundles&quot; problem. The idea: some components should <strong>never</strong> hydrate on the client.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Box className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">2022: Next.js 13</span>
            </div>
            <h4 className="text-lg font-bold text-white">App Router Launch</h4>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              The first production implementation. Data fetching becomes as simple as <code>await fetch()</code> inside your components.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">2024: Next.js 15</span>
            </div>
            <h4 className="text-lg font-bold text-white">Full Maturity</h4>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              Streaming, Partial Prerendering (PPR), and Server Actions complete the ecosystem, making waterfalls a thing of the past.
            </p>
          </div>
        </div>
      </section>

      {/* Documentation Link */}
      <div id="resources" className="p-8 rounded-3xl bg-linear-to-r from-zinc-900 to-black border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-3xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-zinc-800 border border-zinc-700">
            <Cpu className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Technical Documentation</h3>
            <p className="text-sm text-zinc-500 font-medium">Read the full architecture breakdown in <code>ABOUT.md</code></p>
          </div>
        </div>
        <button className="px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl">
          Open Architecture Manifest
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      <NextTopic 
        title="Partial Prerendering"
        href="/rendering/ppr"
        description="The ultimate hybrid: combine static speed with streaming dynamic content."
      />
    </div>
  );
}
