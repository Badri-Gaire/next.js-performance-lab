import { getProducts } from '@/features/rendering/services/product-service';
import { ProductCard } from '@/features/rendering/components/ProductCard';
import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { CodeBlueprint } from '@/features/rendering/components/CodeBlueprint';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Metadata } from 'next';
import { Layout } from 'lucide-react';
import { ExpectedHeader } from '@/features/rendering/types';

export const metadata: Metadata = {
  title: 'SSG Guide',
  description: 'Master Static Site Generation in Next.js. Learn how to use generateStaticParams for world-class performance and SEO.',
  keywords: ['nextjs ssg', 'static site generation nextjs', 'generateStaticParams example', 'nextjs performance', 'nextjs ssg vs ssr'],
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/ssg" },
};

// SSG is achieved via 'use cache' in the component body in Next.js 16.

export default async function SSGPage() {
  'use cache'; // 🟢 Next.js 16: Explicitly opt-in to Static Generation (Dynamic by Default model)
  const buildTime = new Date().toISOString();
  const products = await getProducts(8, 0); 

  const ssgHeaders: ExpectedHeader[] = [
    { 
      key: 'Cache-Control', 
      value: 'public, max-age=0, must-revalidate', 
      description: 'The browser is told to always check with the server (revalidate), but the CDN handles the caching.' 
    },
    { 
      key: 'X-Vercel-Cache', 
      value: 'HIT', 
      description: 'Indicates the page was served from Vercel\'s Edge Cache without hitting the origin server.',
      isVercelSpecific: true 
    },
    { 
      key: 'X-Nextjs-Prerender', 
      value: '1', 
      description: 'Confirms that this page was pre-rendered at build time (SSG).',
      isVercelSpecific: true 
    },
    { 
      key: 'Age', 
      value: '722', 
      description: 'The number of seconds the object has been in the CDN cache.' 
    },
  ];

  const ssgSteps: { icon: 'Cpu' | 'Package' | 'Cloud' | 'Globe'; title: string; desc: string }[] = [
    { icon: 'Cpu', title: 'Build Time', desc: 'Next.js fetches data and generates HTML during "npm run build".' },
    { icon: 'Package', title: 'Static Asset', desc: 'The page is saved as a physical .html file on the server.' },
    { icon: 'Cloud', title: 'Edge Deployment', desc: 'Static files are pushed to the Global CDN Edge.' },
    { icon: 'Globe', title: 'Instant Delivery', desc: 'Users receive the pre-built file in milliseconds (0ms server logic).' },
  ];

  const ssgCode = `// Default behavior (Static)
export default async function Page() {
  // Fetched ONCE during build-time
  const data = await fetch('https://api.com/data');
  
  return (
    <main>
      <h1>Static Content</h1>
      {data.map(item => <Card key={item.id} {...item} />)}
    </main>
  );
}`;

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <RenderingHeader 
        type="SSG"
        title="Static Site Generation"
        description="With Next.js 16, everything is Dynamic by Default. We now use 'use cache' to explicitly pre-render this page at build time. This ensures you receive a pre-built HTML file from the CDN nearly instantly."
        serverTime={buildTime}
        strategyMarkdown="Static Opt-In: Using 'use cache', we manually restore the SSG behavior in the modern dynamic-first pipeline."
        expectedHeaders={ssgHeaders}
      />

      <CodeBlueprint 
        type="SSG"
        title="Static Generation"
        description="SSG is the gold standard for performance. Since the server does zero work at request time, the Time to First Byte (TTFB) is near-zero. Best for marketing pages and public blogs."
        code={ssgCode}
        steps={ssgSteps}
      />

      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 id="demo" className="text-3xl font-bold text-white flex items-center gap-3">
              <Layout className="w-6 h-6 text-green-500" />
              Live Demo
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              These products were fetched using <span className="text-green-400 font-bold italic underline decoration-green-500/30">Static Site Generation (SSG)</span> at Build Time.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
             <span className="text-[10px] font-black text-green-400 uppercase tracking-widest block mb-1">Testing Tip</span>
             <p className="text-[9px] text-zinc-400 font-medium">Refreshing won&apos;t change the time. This HTML is a physical file on the server.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div id="standard-pages" className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">1</span>
            Normal Pages
          </h3>
          <p className="text-zinc-400 leading-relaxed">
            Standard pages like <code className="text-green-400">/about</code> or <code className="text-green-400">/contact</code> are automatically generated as static HTML files during the build process if they don&apos;t use dynamic functions like <code className="text-zinc-500 text-sm">cookies()</code> or <code className="text-zinc-500 text-sm">headers()</code>.
          </p>
        </div>
        <div id="dynamic-params" className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4 shadow-2xl shadow-green-500/5">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">2</span>
            Dynamic ID Pages
          </h3>
          <p className="text-zinc-400 leading-relaxed">
            For dynamic routes like <code className="text-green-400">/blog/[id]</code>, use <code className="text-green-400 font-mono">generateStaticParams</code>. This tells Next.js which specific IDs to pre-render at build time, ensuring those pages load instantly like static ones.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9v8l10-12h-9l10-10z"/></svg>
        </div>
        <h3 className="text-lg font-bold mb-4">The generateStaticParams Pattern (Dynamic SSG)</h3>
        <pre className="text-sm font-mono text-zinc-300 bg-black/50 p-6 rounded-xl border border-white/5 overflow-x-auto">
{`// src/app/blog/[id]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.com/posts').then(res => res.json());
 
  // Next.js will build ALL these pages at Build Time
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}`}
        </pre>
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-zinc-300 uppercase tracking-widest text-[10px]">Production Build Artifact</span>
         </div>
         <span className="text-xs text-zinc-500 font-mono tracking-tighter italic">next build -{">"} serverless architecture ready</span>
      </div>

      {/* The SSG Evolution: Implicit vs Explicit */}
      <section className="space-y-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Architectural Shift</span>
          </div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">
            The SSG Evolution
          </h2>
          <p className="text-zinc-500 text-sm font-medium leading-relaxed">
            Next.js 16 moves from <span className="text-zinc-300 italic">guessing</span> if a page is static to an <span className="text-green-400 font-bold underline decoration-green-500/30 underline-offset-4">Explicit Opt-in</span> model.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Legacy/Standard Approach */}
          <div className="group relative p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 flex flex-col transition-all hover:border-zinc-800">
            <div className="absolute top-6 right-8">
               <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Legacy Pattern</span>
            </div>
            <div className="space-y-4 mb-8">
              <h4 className="text-xl font-black text-zinc-400 italic uppercase">Implicitly Static</h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Next.js assumes static behavior by default. However, non-deterministic functions like <code className="text-zinc-400 italic">new Date()</code> will force the entire page to dynamic on every request.
              </p>
            </div>
            
            <div className="mt-auto p-6 rounded-2xl bg-black/60 border border-zinc-900 font-mono text-[11px] leading-relaxed relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800" />
               <div className="text-zinc-600 mb-2">// Traditional SSG (Pre-v16)</div>
               <div><span className="text-purple-400">export default async function</span> <span className="text-blue-400">Page</span>() &#123;</div>
               <div className="pl-4 opacity-50"><span className="text-zinc-500">// Next.js tries to guess...</span></div>
               <div className="pl-4"><span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> <span className="text-yellow-200">fetch</span>(<span className="text-green-300">'...'</span>);</div>
               <div className="pl-4 text-red-500/50 italic line-through decoration-red-500/80">
                  const buildTime = new Date(); <span className="text-[9px] ml-2 font-sans opacity-100 text-red-400 tracking-tighter uppercase font-black">! Forces Dynamic</span>
               </div>
               <div className="pl-4"><span className="text-purple-400">return</span> &lt;<span className="text-blue-400">main</span>&gt;...&lt;/<span className="text-blue-400">main</span>&gt;;</div>
               <div>&#125;</div>
            </div>
          </div>

          {/* Modern Unified Approach */}
          <div className="group relative p-8 rounded-[2.5rem] bg-zinc-950 border border-green-500/20 flex flex-col transition-all hover:border-green-500/40 shadow-2xl shadow-green-500/5 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-green-500/10 rounded-full blur-3xl transition-all group-hover:bg-green-500/20" />
            <div className="absolute top-6 right-8">
               <span className="px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-[9px] font-bold text-green-500 uppercase tracking-tighter">Unified v16</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <h4 className="text-xl font-black text-white italic uppercase">Explicitly Static</h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Using <code className="text-green-400 font-bold italic">'use cache'</code> forces the compiler to snapshot the component. This <span className="text-white">freezes</span> the result of dynamic functions into the static build.
              </p>
            </div>

            <div className="mt-auto p-6 rounded-2xl bg-black/60 border border-green-900/30 font-mono text-[11px] leading-relaxed relative overflow-hidden shadow-inner">
               <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
               <div className="text-zinc-600 mb-2">// Modern SSG (Next.js 16)</div>
               <div><span className="text-purple-400">export default async function</span> <span className="text-blue-400">Page</span>() &#123;</div>
               <div className="pl-4 text-white font-bold tracking-tight italic select-none">
                  'use cache'; <span className="text-[9px] ml-2 font-sans text-green-500 tracking-tighter uppercase font-black">🟢 Opt-In Success</span>
               </div>
               <div className="pl-4"><span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> <span className="text-yellow-200">fetch</span>(<span className="text-green-300">'...'</span>);</div>
               <div className="pl-4 text-green-400 font-bold underline decoration-green-500/20">
                  const buildTime = new Date(); <span className="text-[9px] ml-2 font-sans text-green-500 tracking-tighter uppercase font-black italic">✓ Captured at build</span>
               </div>
               <div className="pl-4"><span className="text-purple-400">return</span> &lt;<span className="text-blue-400">main</span>&gt;...&lt;/<span className="text-blue-400">main</span>&gt;;</div>
               <div>&#125;</div>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-4 rounded-[2rem] bg-green-500/10 border border-green-500/20 shrink-0">
               <Layout className="w-8 h-8 text-green-500" />
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-black text-white italic uppercase tracking-widest">When to deploy 'use cache'?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-green-500 uppercase">Scenario A</div>
                  <p className="text-xs text-zinc-400 leading-relaxed"><span className="text-zinc-100 font-bold">Build Snapshots</span>: When you need a "Last Updated" timestamp on every page without triggering SSR.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-green-500 uppercase">Scenario B</div>
                  <p className="text-xs text-zinc-400 leading-relaxed"><span className="text-zinc-100 font-bold">Query Isolation</span>: When a component performs a heavy DB query that only needs to run during build.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-green-500 uppercase">Scenario C</div>
                  <p className="text-xs text-zinc-400 leading-relaxed"><span className="text-zinc-100 font-bold">Static Islands</span>: When using PPR to make specific parts of a dynamic route perfectly static.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <NextTopic 
        title="Incremental Static Regeneration"
        href="/rendering/isr"
        description="Discover how to update static content without rebuilding your entire site."
      />
    </div>
  );
}
