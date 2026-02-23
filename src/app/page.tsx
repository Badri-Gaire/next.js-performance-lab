import Link from 'next/link';
import { Server, Zap, Database, Layers, ArrowRight, Globe, Cpu, Flame, Scaling } from 'lucide-react';
import { RenderingBadge } from '@/features/rendering/components/RenderingBadge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Next.js Performance Architecture Lab | The Ultimate Architecture Sandbox",
  description: "Master Next.js 15+ rendering strategies (SSR, SSG, ISR, CSR, RSC, PPR), browser pipelines, and performance optimization techniques. A comprehensive guide for senior frontend engineers.",
  keywords: ["nextjs performance guide", "nextjs architecture patterns", "rendering strategies nextjs 15", "browser rendering pipeline", "isr nextjs example", "rsc vs ssr"],
};

export default function Home() {
  const demos = [
    {
      title: 'Server-Side Rendering',
      type: 'SSR' as const,
      description: 'Fetch data on every request. High performance for personalized content.',
      href: '/rendering/ssr',
      icon: Server,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
    },
    {
      title: 'Static Site Generation',
      type: 'SSG' as const,
      description: 'Pre-render pages at build time. Instant loading and world-class SEO.',
      href: '/rendering/ssg',
      icon: Zap,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Incremental Static Regeneration',
      type: 'ISR' as const,
      description: 'Update static content in the background without a full rebuild.',
      href: '/rendering/isr',
      icon: Database,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Client-Side Rendering',
      type: 'CSR' as const,
      description: 'Interactive browser rendering with real-time state management.',
      href: '/rendering/csr',
      icon: Layers,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Code Splitting',
      type: 'CSR' as const,
      description: 'Optimize bundle delivery with route-based and dynamic partitioning.',
      href: '/code-splitting',
      icon: Scaling,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Caching Strategies',
      type: 'SSG' as const,
      description: 'Distributed delivery and multi-level caching for global performance.',
      href: '/caching-strategies',
      icon: Database,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'React Server Components',
      type: 'SSR' as const,
      description: 'Explore how Server Components eliminate client-side data fetching waterfalls.',
      href: '/rendering/rsc',
      icon: Cpu,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
    },
    {
      title: 'Partial Prerendering',
      type: 'PPR' as const,
      description: 'The ultimate hybrid: instant static shells with streamed dynamic holes.',
      href: '/rendering/ppr',
      icon: Flame,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
    },
  ];

  return (
    <div className="space-y-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-4 shadow-xl">
          <Cpu className="w-3.5 h-3.5" />
          System Architecture Demo
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[1.1]">
          Next.js <br />
          <span className="bg-linear-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent uppercase italic tracking-tighter">
            Performance Architecture Lab
          </span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
          A blueprint for modern Next.js 15 applications focusing on progressive hydration, 
          streaming patterns, and optimized caching strategies.
        </p>

        <div className="flex justify-center pt-4">
          <Link 
            href="/rendering/ssr" 
            className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-sm hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center gap-3"
          >
            Start Learning Path
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {demos.map((demo) => (
          <Link 
            key={demo.type} 
            href={demo.href}
            className="group relative p-10 rounded-3xl bg-zinc-950 border border-zinc-900 transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-950/50 hover:-translate-y-2 shadow-2xl"
          >
            <div className="flex items-start justify-between mb-8">
              <div className={`p-5 rounded-2xl ${demo.bg}`}>
                <demo.icon className={`w-9 h-9 ${demo.color}`} />
              </div>
              <RenderingBadge type={demo.type} className="px-3 py-1 text-[11px]" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
              {demo.title}
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-10 font-medium">
              {demo.description}
            </p>
            
            <div className="flex items-center text-sm font-black text-white gap-2 uppercase tracking-widest">
              View Implementation 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-blue-500" />
            </div>
          </Link>
        ))}
      </div>

      {/* Advanced Browser Internals - NEW FEATURE */}
      <section className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase italic">The Engine Room</h2>
            <p className="text-zinc-500 max-w-xl font-medium">Beyond simple rendering. Explore how browsers parse DOM, calculate Layout, and handle GPU compositing in modern frameworks.</p>
          </div>
          <Link 
            href="/browser-pipeline" 
            className="group flex items-center gap-4 px-6 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm font-black text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
          >
            Explore Browser Pipeline
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <Link href="/browser-pipeline" className="group block relative p-1 rounded-[3rem] bg-linear-to-r from-blue-600/20 via-transparent to-purple-600/20 border border-zinc-900 hover:border-zinc-700 transition-all">
          <div className="p-12 rounded-[2.8rem] bg-black/40 backdrop-blur-3xl overflow-hidden relative">
            {/* Abstract Visual Elements */}
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
               <Cpu className="w-64 h-64 text-blue-500" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-500/40">
                  New Feature
                </div>
                <h3 className="text-5xl font-black text-white leading-tight tracking-tighter">
                  From Bytes <br /> to Pixels
                </h3>
                <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-md">
                  Deep dive into DOM trees, CSSOM calculation, and why Next.js layouts feel so performant 
                  during navigation.
                </p>
                <div className="flex flex-wrap gap-3">
                   {['DOM/CSSOM', 'Layout Engine', 'GPU Compositing', 'HTTP Caching'].map(tag => (
                     <span key={tag} className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-400 capitalize">
                       {tag}
                     </span>
                   ))}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4">
                 {[
                   { label: 'Browser Responsibility', value: 'Parsing, Styling, Painting', color: 'blue' },
                   { label: 'Framework Responsibility', value: 'Reconciliation, Hydration', color: 'purple' },
                   { label: 'Persistent State', value: 'Shared Navbar & Layouts', color: 'teal' }
                 ].map((item) => (
                   <div key={item.label} className="p-6 rounded-2xl bg-zinc-950/50 border border-zinc-900 group-hover:translate-x-4 transition-transform duration-500">
                      <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{item.label}</div>
                      <div className="text-sm font-bold text-white tracking-tight">{item.value}</div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Features Detail */}
      <div className="max-w-6xl mx-auto p-12 rounded-[2.5rem] bg-linear-to-br from-zinc-900 via-black to-black border border-zinc-800 shadow-3xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/20">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">Engineering Patterns</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Selective Hydration</h4>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">Leveraging Intersection Observer to defer React hydration, reducing Main Thread blockage for a faster TBT.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Streaming Suspense</h4>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">Utilizing server-side streaming to progressively deliver HTML units, providing immediate visual feedback via Skeletons.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Feature-First Logic</h4>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">Domain-driven design folder structure ensuring scalability and strict separation between UI and business services.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
