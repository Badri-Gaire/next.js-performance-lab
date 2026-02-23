import { RenderingHeader } from '@/features/rendering/components/RenderingHeader';
import { CachingHierarchy } from '@/features/caching-strategies/components/CachingHierarchy';
import { NetworkHeaderVisualizer } from '@/features/caching-strategies/components/NetworkHeaderVisualizer';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Next.js Caching Strategies | Advanced Performance Architecture Lab",
  description: "Master the Next.js caching hierarchy. Learn how to coordinate browser, CDN, and server caches using Cache-Control, SSG, and ISR for global scale.",
  keywords: ["nextjs caching guide", "cdn caching strategy", "browser cache control nextjs", "isr caching nextjs", "frontend performance optimization"],
};

export default function CachingPage() {
  return (
    <div className="space-y-32 pb-20 animate-in fade-in duration-1000">
      <RenderingHeader 
        type="SSG"
        title="Caching Strategies"
        description="Performance is often just a matter of 'not doing the work'. Learn how browsers, CDNs, and frameworks coordinate to store data as close to the user as possible."
        strategyMarkdown="Next.js handles most of this automatically. By using static rendering (SSG/ISR), your application is globally cached by default."
      />

      <section className="space-y-12">
        <CachingHierarchy />
      </section>

      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-white tracking-widest uppercase italic leading-none">Developer Tools Deep Dive</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">How to verify your caching strategy using the browser&apos;s Network tab.</p>
        </div>
        <NetworkHeaderVisualizer />
      </section>

      {/* Logic Note */}
      <div className="max-w-4xl mx-auto p-12 rounded-[3.5rem] bg-zinc-950 border border-zinc-900 flex flex-col items-center text-center space-y-8 relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-green-500" />
         <div className="p-4 rounded-3xl bg-blue-600 shadow-2xl shadow-blue-500/40 relative">
            <ShieldCheck className="w-12 h-12 text-white" />
         </div>
         <h3 className="text-3xl font-black text-white">The Framework Guarantee</h3>
         <p className="text-zinc-400 max-w-2xl font-medium leading-relaxed">
            When you use <strong>Static Rendering</strong> (SSG), Next.js automatically generates the 
            ideal <code>Cache-Control</code> headers for you. You don&apos;t need to manually configure 
            CDNs—the framework ensures that your global assets are distributed globally, while your 
            private routes remain private.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8">
            <div className="space-y-2">
               <div className="text-2xl font-black text-blue-500 tracking-tighter uppercase italic">Auto-Purge</div>
               <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">CDN caches are invalidated automatically on new deployments.</p>
            </div>
            <div className="space-y-2">
               <div className="text-2xl font-black text-purple-500 tracking-tighter uppercase italic">Stale-While</div>
               <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">ISR allows the CDN to serve old data while fetching the new update.</p>
            </div>
            <div className="space-y-2">
               <div className="text-2xl font-black text-green-500 tracking-tighter uppercase italic">Hashed Assets</div>
               <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">Images and CSS are hashed, allowing infinite browser caching.</p>
            </div>
         </div>
      </div>

      <NextTopic 
        title="Mastery Dashboard"
        href="/"
        description="You've completed the full engineering journey. Explore the dashboard for more insights."
      />
    </div>
  );
}
