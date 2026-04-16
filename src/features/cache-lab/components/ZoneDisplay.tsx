import React, { Suspense } from 'react';
import { getInventory } from '../services/cache-service';
import { cookies } from 'next/headers';
import { connection } from 'next/server';
import { Package, Zap, Clock, User, Share2, RefreshCw } from 'lucide-react';
import { RevalidateButton } from './RevalidateButton';
import { cn } from '@/lib/utils';

// --- ZONE 1: PURE STATIC ---
// This component has no async logic and no directives.
// It is automatically included in the static HTML shell.
function Zone1StaticShell() {
  return (
    <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-zinc-700 transition-colors">
      <div className="flex items-start gap-4 flex-1">
        <div className="shrink-0 p-3 rounded-2xl bg-green-500/10 text-green-400">
          <Zap className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black text-white uppercase tracking-tighter italic">Zone 1: Static Shell</h4>
          <p className="text-xs text-zinc-500 max-w-md leading-relaxed font-medium">
            Calculated at build-time. This content is identical for all users and served instantly from the edge CDN.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6 px-4 md:px-0">
        <div className="text-right">
          <p className="text-[9px] uppercase font-black tracking-widest text-zinc-600 mb-1">Status</p>
          <p className="text-xs font-bold text-green-500/80">PRERENDERED</p>
        </div>
        <div className="w-px h-8 bg-zinc-800 hidden md:block" />
        <div className="text-right">
          <p className="text-[9px] uppercase font-black tracking-widest text-zinc-600 mb-1">Latency</p>
          <p className="text-xs font-bold text-white">0ms</p>
        </div>
      </div>
    </div>
  );
}

// --- ZONE 2: CACHED OUTPUT ---
// Uses 'use cache' to store the rendered result.
// Note: This is a Server Component.
async function Zone2CachedContent() {
  'use cache';
  const data = await getInventory();
  
  return (
    <div className="p-6 md:p-8 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-cyan-500/20 transition-all relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Clock className="w-24 h-24 text-cyan-400" />
      </div>
      
      <div className="flex items-start gap-4 flex-1 relative">
        <div className="shrink-0 p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
          <Share2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black text-white uppercase tracking-tighter italic">Zone 2: Cached Output</h4>
          <p className="text-xs text-zinc-500 max-w-md leading-relaxed font-medium">
            This component uses <code className="text-cyan-400/80">'use cache'</code>. It is cached globally and shared across all user requests.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8 relative">
        <div className="text-center md:text-right">
          <p className="text-[9px] uppercase font-black tracking-widest text-zinc-600 mb-1">Current State</p>
          <div className="text-3xl font-black text-cyan-400 tracking-tighter tabular-nums leading-none">
            {data.count}
          </div>
        </div>
        <div className="w-px h-10 bg-zinc-800 hidden md:block" />
        <div className="text-right">
          <p className="text-[9px] uppercase font-black tracking-widest text-zinc-600 mb-1">Refreshed</p>
          <p className="text-xs font-bold text-zinc-400 leading-none">
            {new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}

// --- ZONE 3: DYNAMIC ---
// Uses request-time APIs (cookies, headers).
// Must be wrapped in Suspense.
async function Zone3DynamicGreeting() {
  await connection();
  const cookieStore = await cookies();
  const visitorId = cookieStore.get('visitor-id')?.value || 'Guest_User';
  
  return (
    <div className="p-6 md:p-8 rounded-3xl bg-purple-500/5 border border-purple-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-purple-500/20 transition-all">
      <div className="flex items-start gap-4 flex-1">
        <div className="shrink-0 p-3 rounded-2xl bg-purple-500/10 text-purple-400">
          <User className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black text-white uppercase tracking-tighter italic">Zone 3: Dynamic</h4>
          <p className="text-xs text-zinc-500 max-w-md leading-relaxed font-medium">
            Personalized per-request. Consumes <code className="text-purple-400/80">cookies()</code> or <code className="text-purple-400/80">headers()</code>.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950 border border-zinc-900 border-dashed">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs">
            {visitorId[0].toUpperCase()}
          </div>
          <div>
            <p className="text-[8px] uppercase font-black text-zinc-600 tracking-widest leading-none mb-1">User Identifier</p>
            <p className="text-xs font-bold text-white max-w-[100px] truncate">{visitorId}</p>
          </div>
        </div>
        <div className="w-px h-8 bg-zinc-800 hidden md:block" />
        <div className="text-right">
          <p className="text-[9px] uppercase font-black tracking-widest text-zinc-600 mb-1">Type</p>
          <p className="text-xs font-bold text-purple-400">UNCACHED</p>
        </div>
      </div>
    </div>
  );
}

export function ZoneDisplay() {
  return (
    <div className="space-y-6">
      {/* Zones Container Stacked Vertically */}
      <div className="flex flex-col gap-6">
        <Zone1StaticShell />
        
        <Zone2CachedContent />
        
        <Suspense fallback={
          <div className="p-8 h-48 rounded-3xl bg-zinc-900 border border-zinc-800 animate-pulse flex flex-col justify-center items-center">
             <div className="w-10 h-10 rounded-full bg-zinc-800 mb-4" />
             <div className="h-4 w-32 bg-zinc-800 rounded" />
          </div>
        }>
          <Zone3DynamicGreeting />
        </Suspense>
      </div>

    </div>
  );
}
