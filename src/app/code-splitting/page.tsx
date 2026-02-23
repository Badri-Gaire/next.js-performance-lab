import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { AppLevelSplitting } from '@/features/code-splitting/components/AppLevelSplitting';
import { ComponentLevelSplitting } from '@/features/code-splitting/components/ComponentLevelSplitting';
import { SplittingVisualizer } from '@/features/code-splitting/components/SplittingVisualizer';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Info } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Next.js Code Splitting | Advanced Performance Lab",
  description: "Learn how to optimize Next.js applications using route-based and component-level code splitting. Reduce bundle sizes and improve Core Web Vitals with dynamic imports.",
  keywords: ["nextjs code splitting", "dynamic import nextjs", "next/dynamic guide", "optimizing nextjs bundles", "frontend performance optimization"],
};

export default function CodeSplittingPage() {
  return (
    <div className="space-y-32 pb-20 animate-in fade-in duration-1000">
      <RenderingHeader 
        type="CSR"
        title="Code Splitting Strategies"
        description="Don't make your users pay for what they don't use. Code Splitting allows you to break your app into smaller bundles that load on-demand, dramatically improving performance."
        strategyMarkdown="Next.js handles route-based code splitting out of the box. Use `next/dynamic` for manual, component-level optimizations."
      />

      {/* Intro Stats */}
      <div className="max-w-6xl mx-auto p-12 rounded-[3rem] bg-linear-to-br from-zinc-900 to-black border border-zinc-800 shadow-3xl text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-green-500" />
        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">The Burden of JavaScript</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
          The average modern web app sends over 400kb of compressed JS. Without code splitting, 
          browsers struggle to parse and execute this script, leading to poor Core Web Vitals (LCP, INP).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="space-y-2">
              <div className="text-4xl font-black text-blue-500">70%</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Faster Byte Load</div>
           </div>
           <div className="space-y-2">
              <div className="text-4xl font-black text-purple-500">2.4s</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Saved on TTI</div>
           </div>
           <div className="space-y-2">
              <div className="text-4xl font-black text-green-500">0.1ms</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Execution Blockage</div>
           </div>
        </div>
      </div>

      <section className="space-y-16">
        <div className="text-center space-y-4 px-6">
          <h2 className="text-5xl font-black text-white tracking-widest uppercase italic leading-none">1. Route-Based Splitting</h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-medium italic underline decoration-blue-500/20 underline-offset-8">Automatic physical partitioning by Next.js App Router.</p>
        </div>
        <AppLevelSplitting />
      </section>

      <section className="space-y-16">
        <div className="text-center space-y-4 px-6">
          <h2 className="text-5xl font-black text-white tracking-widest uppercase italic leading-none">2. Component-Level</h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-medium italic underline decoration-purple-500/20 underline-offset-8">Manual optimization for heavy interaction islands.</p>
        </div>
        <ComponentLevelSplitting />
      </section>

      <section className="space-y-16">
        <div className="text-center space-y-4 px-6">
          <h2 className="text-5xl font-black text-white tracking-widest uppercase italic leading-none">Bundle Comparison</h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-medium underline decoration-green-500/20 underline-offset-8">Visualizing the impact on real-world mobile devices.</p>
        </div>
        <SplittingVisualizer />
      </section>

      {/* Technical Tip */}
      <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-blue-600 shadow-2xl shadow-blue-500/20 flex gap-6 items-center">
         <div className="p-4 rounded-2xl bg-white/10 shrink-0">
            <Info className="w-8 h-8 text-white" />
         </div>
         <div className="space-y-1 text-left">
            <h4 className="text-xl font-bold text-white">Pro Tip: Tree Shaking</h4>
            <p className="text-blue-100 text-sm font-medium leading-relaxed">
               Next.js works together with Webpack/Turbopack to perform &quot;Tree Shaking&quot;—removing 
               dead code that you import but never call. This further reduces the size of your split bundles.
            </p>
         </div>
      </div>

      <NextTopic 
        title="React Server Components"
        href="/rendering/rsc"
        description="See how moves logic to the server can eliminate the need for heavy client bundles entirely."
      />
    </div>
  );
}
