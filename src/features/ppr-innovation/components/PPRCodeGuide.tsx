'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Code2, Layout, Zap } from 'lucide-react';

const STATIC_CODE = `// 🟢 THE STATIC SHELL
// Rendered at build-time, sent instantly via CDN.
export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection /> {/* Static Content */}
      
      <Suspense fallback={<Skeleton />}>
        <DynamicUserDash />
      </Suspense>
    </main>
  );
}`;

const DYNAMIC_CODE = `// 🟣 THE DYNAMIC HOLE
// Inside <Suspense>, use dynamic functions.
async function DynamicUserDash() {
  // Accessing dynamic headers or un-cached data
  // triggers the "Dynamic Streaming" part of PPR.
  const cookieStore = await cookies();
  const userData = await fetchUser(cookieStore);

  return <Profile data={userData} />;
}`;

const OPTIMIZED_CODE = `// ⚡ THE OPTIMIZED HOLE (Next.js 15/16)
// Using "use cache" allows caching even inside dynamic routes.
async function DynamicUserDash() {
  'use cache'; // Opt-in to data caching
  
  // Rehydrates fast because the HTML fragment
  // is now saved in the Next.js Data Cache.
  const data = await fetchExpensiveData();

  return <Profile data={data} />;
}`;

export function PPRCodeGuide() {
  const [activeTab, setActiveTab] = useState<'static' | 'dynamic' | 'optimized'>('static');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-500/10">
            <Code2 className="w-5 h-5 text-teal-400" />
          </div>
          <h3 className="text-xl font-bold text-white">How to implement in Code?</h3>
        </div>
        <div className="flex p-1 bg-zinc-900 rounded-xl border border-zinc-800">
          {[
            { id: 'static', label: 'Static Shell', color: 'text-teal-400' },
            { id: 'dynamic', label: 'Dynamic Hole', color: 'text-purple-400' },
            { id: 'optimized', label: 'Optimization', color: 'text-orange-400' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                activeTab === tab.id ? `bg-zinc-800 ${tab.color} shadow-lg` : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-teal-500/20 via-purple-500/20 to-orange-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-zinc-900">
             <div className={cn(
               "w-2 h-2 rounded-full animate-pulse", 
               activeTab === 'static' ? "bg-green-500" : activeTab === 'dynamic' ? "bg-purple-500" : "bg-orange-500"
             )} />
             <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
               {activeTab === 'static' ? 'app/page.tsx (Build-time)' : activeTab === 'dynamic' ? 'components/dynamic.tsx (Run-time)' : 'components/cached.tsx (Cache-opt-in)'}
             </span>
          </div>
          <div className="p-6 overflow-auto font-mono text-xs leading-relaxed min-h-[220px]">
            <pre className="text-zinc-300">
              <code>
                {activeTab === 'static' ? (
                  STATIC_CODE.split('\n').map((line, i) => (
                    <div key={i} className={cn(line.includes('//') ? "text-zinc-600 italic" : line.includes('Suspense') ? "text-teal-400 font-bold" : "")}>
                      {line}
                    </div>
                  ))
                ) : activeTab === 'dynamic' ? (
                  DYNAMIC_CODE.split('\n').map((line, i) => (
                    <div key={i} className={cn(line.includes('//') ? "text-zinc-600 italic" : line.includes('await') ? "text-purple-400 font-bold" : "")}>
                      {line}
                    </div>
                  ))
                ) : (
                  OPTIMIZED_CODE.split('\n').map((line, i) => (
                    <div key={i} className={cn(line.includes('//') ? "text-zinc-600 italic" : line.includes("'use cache'") ? "text-orange-400 font-black animate-pulse" : line.includes('await') ? "text-orange-300 font-bold" : "")}>
                      {line}
                    </div>
                  ))
                )}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Layout className="w-4 h-4 text-teal-500" />
            <span className="text-[10px] font-black uppercase text-zinc-600">The Modern Defaults</span>
          </div>
          <p className="text-xs text-zinc-400">
            With <strong>dynamicIO</strong> enabled in Next.js 16, everything is <strong>Dynamic by Default</strong>. Suspense still defines the boundary, but data fetching defaults to no-cache.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] font-black uppercase text-zinc-600">Explicit Optimization</span>
          </div>
          <p className="text-xs text-zinc-400 font-medium whitespace-pre-wrap">
            Use <strong>&quot;use cache&quot;</strong> to manually cache components. This works perfectly with PPR, allowing the dynamic hole to rehydrate instantly from the Data Cache.
          </p>
        </div>
      </div>
    </div>
  );
}
