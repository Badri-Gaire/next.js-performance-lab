import { getProducts } from '@/features/rendering/services/product-service';
import { ProductCard } from '@/features/rendering/components/ProductCard';
import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { CodeBlueprint } from '@/features/rendering/components/CodeBlueprint';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Metadata } from 'next';
import { Layout } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SSG Guide',
  description: 'Master Static Site Generation in Next.js. Learn how to use generateStaticParams for world-class performance and SEO.',
  keywords: ['nextjs ssg', 'static site generation nextjs', 'generateStaticParams example', 'nextjs performance', 'nextjs ssg vs ssr'],
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/ssg" },
};

// SSG is default for components that don't use dynamic data or force-dynamic
export const dynamic = 'force-static';

export default async function SSGPage() {
  const buildTime = new Date().toISOString();
  const products = await getProducts(8, 0); // No artificial delay needed for static

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
        description="This page was generated during the build process. When you visit it, you are receiving a pre-built HTML file from the CDN, making it incredibly fast. This is the foundation of the Jamstack approach."
        serverTime={buildTime}
        strategyMarkdown="Generated at build time. For static content that doesn't change often, like landing pages or blog posts."
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

      <NextTopic 
        title="Incremental Static Regeneration"
        href="/rendering/isr"
        description="Discover how to update static content without rebuilding your entire site."
      />
    </div>
  );
}
