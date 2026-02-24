'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Server, Zap, Database, Layers, Cpu, Flame, ShieldCheck, Split } from 'lucide-react';

const features = [
  { name: 'Server-Side Rendering', href: '/rendering/ssr', icon: Server, type: 'SSR' },
  { name: 'Static Site Generation', href: '/rendering/ssg', icon: Zap, type: 'SSG' },
  { name: 'Incremental Static Regeneration', href: '/rendering/isr', icon: Database, type: 'ISR' },
  { name: 'Client-Side Rendering', href: '/rendering/csr', icon: Layers, type: 'CSR' },
  { name: 'React Server Components', href: '/rendering/rsc', icon: Cpu, type: 'RSC' },
  { name: 'Partial Prerendering', href: '/rendering/ppr', icon: Flame, type: 'PPR' },
];

const performance = [
  { name: 'Caching Strategies', href: '/caching-strategies', icon: ShieldCheck },
  { name: 'Code Splitting', href: '/code-splitting', icon: Split },
];

export function FeatureNavigator() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 pb-20">
      <div className="px-3 mb-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          Methods
        </h3>
      </div>
      <div className="space-y-1">
        {features.map((feature) => {
          const isActive = pathname === feature.href;
          const Icon = feature.icon;
          
          return (
            <Link
              key={feature.href}
              href={feature.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-lg shadow-blue-500/5" 
                  : "text-zinc-500 hover:text-white hover:bg-zinc-900 border border-transparent"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg shrink-0 transition-colors",
                isActive ? "bg-blue-600 text-white" : "bg-zinc-900 text-zinc-600 group-hover:text-zinc-300"
              )}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">{feature.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="px-3 mt-10 mb-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          Performance
        </h3>
      </div>
      <div className="space-y-1">
        {performance.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "bg-teal-600/10 text-teal-400 border border-teal-600/20 shadow-lg shadow-teal-500/5" 
                  : "text-zinc-500 hover:text-white hover:bg-zinc-900 border border-transparent"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg shrink-0 transition-colors",
                isActive ? "bg-teal-600 text-white" : "bg-zinc-900 text-zinc-600 group-hover:text-zinc-300"
              )}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="px-3 mt-10 mb-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          Architecture
        </h3>
      </div>
      <div className="space-y-1">
        <Link
          href="/browser-pipeline"
          className={cn(
            "group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
            pathname === '/browser-pipeline'
              ? "bg-purple-600/10 text-purple-400 border border-purple-600/20 shadow-lg shadow-purple-500/5"
              : "text-zinc-500 hover:text-white hover:bg-zinc-900 border border-transparent"
          )}
        >
          <div className={cn(
            "p-1.5 rounded-lg shrink-0 transition-colors",
            pathname === '/browser-pipeline' ? "bg-purple-600 text-white" : "bg-zinc-900 text-zinc-600 group-hover:text-zinc-300"
          )}>
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span>Browser Pipeline</span>
        </Link>
      </div>
    </nav>
  );
}
