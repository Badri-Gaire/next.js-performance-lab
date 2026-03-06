import Link from 'next/link';
import { 
  Server, Zap, Database, Layers, ArrowRight, Globe, Cpu, Flame, 
  ShieldCheck, Split, Boxes, Activity, ShieldAlert 
} from 'lucide-react';
import { RenderingBadge } from '@/features/rendering/components/RenderingBadge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Next.js Performance Architecture Lab | The Ultimate Architecture Sandbox",
  description: "Master Next.js 15+ rendering strategies (SSR, SSG, ISR, CSR, RSC, PPR, Hybrid), browser pipelines, and performance optimization techniques.",
};

export default function Home() {
  const demos = [
    // Methods
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
      title: 'React Server Components',
      type: 'RSC' as const,
      description: 'Eliminate client-side data fetching waterfalls with Server Components.',
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
    {
      title: 'Hybrid Architecture',
      type: 'HYBRID' as const,
      description: 'Mixing rendering strategies for optimal performance and flexibility.',
      href: '/rendering/hybrid',
      icon: Boxes,
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/10',
    },
    // Performance
    {
      title: 'Caching Strategies',
      type: 'SSG' as const, // Reusing existing color/badge type
      description: 'Distributed delivery and multi-level caching for global performance.',
      href: '/caching-strategies',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Code Splitting',
      type: 'CSR' as const, // Reusing existing color/badge type
      description: 'Optimize bundle delivery with route-based and dynamic partitioning.',
      href: '/code-splitting',
      icon: Split,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    // Architecture
    {
      title: 'Browser Pipeline',
      type: 'CRP' as const,
      description: 'Deep dive into DOM, CSSOM, and the Critical Rendering Path.',
      href: '/browser-pipeline',
      icon: Globe,
      color: 'text-zinc-400',
      bg: 'bg-zinc-500/10',
    },
    {
      title: 'DOM-VDOM Lab',
      type: 'DOM' as const,
      description: 'Understanding Virtual DOM reconciliation vs direct DOM updates.',
      href: '/dom-vdom',
      icon: Activity,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
    },
    {
      title: 'Error Handling Lab',
      type: 'ERROR' as const,
      description: 'Master resilient architecture with Fetch vs Axios error patterns.',
      href: '/error-handling',
      icon: ShieldAlert,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
    },
  ];

  const methods = demos.slice(0, 7);
  const performance = demos.slice(7, 9);
  const architecture = demos.slice(9);

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16 relative">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] -z-10" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-4 shadow-xl">
          <Cpu className="w-3.5 h-3.5" />
          Advanced System Architecture
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-white leading-[1.1] px-4">
          Next.js <br />
          <span className="bg-linear-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent uppercase italic tracking-tighter block sm:inline mt-2 sm:mt-0">
            Performance Lab
          </span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed font-medium px-6">
          Advanced showcase of Rendering Strategies & Performance Patterns in Next.js 15+ and modern architecture.
        </p>

        <div className="flex justify-center pt-4">
          <Link 
            href="/rendering/ssr" 
            className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-sm hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center gap-3"
          >
            Explore Labs
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Methods Section - Compact Cards */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 px-4">
          <div className="h-px bg-zinc-900 flex-1" />
          <h2 className="text-xs font-black text-zinc-600 uppercase tracking-[0.3em] italic">Rendering Methods</h2>
          <div className="h-px bg-zinc-900 flex-1" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {methods.map((demo) => (
            <Link 
              key={demo.href} 
              href={demo.href}
              className="group p-6 rounded-3xl bg-zinc-950 border border-zinc-900 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/40 hover:-translate-y-1 shadow-xl flex flex-col justify-between h-full"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl ${demo.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <demo.icon className={`w-5 h-5 ${demo.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                  {demo.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-6 font-medium line-clamp-2">
                  {demo.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <RenderingBadge type={demo.type} className="px-2 py-0.5 text-[10px]" />
                <ArrowRight className="w-8 h-8 text-zinc-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Performance Section */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 px-4">
          <div className="h-px bg-zinc-900 flex-1" />
          <h2 className="text-xs font-black text-zinc-600 uppercase tracking-[0.3em] italic">Optimization Labs</h2>
          <div className="h-px bg-zinc-900 flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {performance.map((demo) => (
            <Link 
              key={demo.href} 
              href={demo.href}
              className="group relative p-10 rounded-4xl bg-zinc-950 border border-zinc-900 transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-950/50 hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col md:flex-row gap-8 items-center text-center md:text-left"
            >
              <div className={`p-8 rounded-4xl ${demo.bg} shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-2xl`}>
                <demo.icon className={`w-12 h-12 ${demo.color}`} />
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
                    {demo.title}
                  </h3>
                  <RenderingBadge type={demo.type} className="px-3 py-1 text-[9px]" />
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium max-w-md">
                  {demo.description}
                </p>
                <div className="flex items-center justify-center md:justify-start pt-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                  Explore Lab
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform text-blue-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Architecture Section */}
      <section className="space-y-10 pb-12">
        <div className="flex items-center gap-4 px-4">
          <div className="h-px bg-zinc-900 flex-1" />
          <h2 className="text-xs font-black text-zinc-600 uppercase tracking-[0.3em] italic">Deep Architecture</h2>
          <div className="h-px bg-zinc-900 flex-1" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          {architecture.map((demo) => (
            <Link 
              key={demo.href} 
              href={demo.href}
              className="group p-8 rounded-4xl bg-zinc-950 border border-zinc-900 transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-950/50 hover:shadow-2xl hover:shadow-indigo-500/5 flex flex-col h-full"
            >
              <div className={`p-6 rounded-3xl ${demo.bg} mb-8 w-fit group-hover:scale-105 transition-transform duration-500 shadow-xl`}>
                <demo.icon className={`w-10 h-10 ${demo.color}`} />
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase group-hover:text-blue-400 transition-colors line-clamp-1">
                    {demo.title}
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium line-clamp-3">
                  {demo.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-900/50 group-hover:border-zinc-800 transition-colors">
                <RenderingBadge type={demo.type} className="px-3 py-1 text-[9px]" />
                <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Engineering Standards Footer */}
      <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Engineering Standards</h3>
        <p className="text-zinc-500 text-sm">
          Built with Next.js 15, React 19, and TypeScript. All examples use best practices for performance and scalability.
        </p>
      </div>
    </div>
  );
}
