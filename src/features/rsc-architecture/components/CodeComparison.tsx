'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Terminal, Code2, MousePointer2, Server, ArrowRight } from 'lucide-react';

const CSR_CODE = `// ❌ BEFORE: The Waterfall (Client-Side)
export default function Dashboard() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // 1st Round-trip: Fetch User
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if (!user) return <Loading />;

  // ⚠️ CHILD starts fetching only after PARENT renders
  return <PostList userId={user.id} />;
}`;

const RSC_CODE = `// ✅ AFTER: RSC Pipeline (Server-Side)
export default async function Dashboard() {
  // 1. Data fetched directly on Server
  // 2. Zero latency between Server and Database
  const user = await db.user.findUnique(...);

  // 3. Rendered directly to HTML
  return <PostList userId={user.id} />;
}`;

export function CodeComparison() {
  const [activeTab, setActiveTab] = useState<'csr' | 'rsc'>('csr');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500/10">
            <Code2 className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Pipeline Code Comparison</h3>
        </div>
        <div className="flex p-1 bg-zinc-900 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('csr')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
              activeTab === 'csr' ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            CSR (Waterfall)
          </button>
          <button
            onClick={() => setActiveTab('rsc')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
              activeTab === 'rsc' ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            RSC (Parallel)
          </button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-zinc-900">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 text-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              {activeTab === 'csr' ? 'dashboard-client.tsx' : 'dashboard-server.tsx'}
            </div>
            <Terminal className="w-3.5 h-3.5 text-zinc-600" />
          </div>
          <div className="p-6 overflow-auto font-mono text-xs leading-relaxed">
            <pre className="text-zinc-300">
              {activeTab === 'csr' ? (
                <code>
                  {CSR_CODE.split('\n').map((line, i) => (
                    <div key={i} className={cn(line.includes('//') ? "text-zinc-600 italic" : "", line.includes('fetch') ? "text-orange-400" : "")}>
                      {line}
                    </div>
                  ))}
                </code>
              ) : (
                <code>
                  {RSC_CODE.split('\n').map((line, i) => (
                    <div key={i} className={cn(line.includes('//') ? "text-zinc-600 italic" : "", line.includes('await') ? "text-blue-400 font-bold" : "")}>
                      {line}
                    </div>
                  ))}
                </code>
              )}
            </pre>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <MousePointer2 className="w-4 h-4 text-zinc-500" />
            <span className="text-[10px] font-black uppercase text-zinc-600">Client Payload</span>
          </div>
          <p className="text-xs text-zinc-400">
            {activeTab === 'csr' 
              ? "Includes heavy useEffect logic, state management, and fetch overhead."
              : "0kb JavaScript payload. Logic stays on the server."}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-4 h-4 text-zinc-500" />
            <span className="text-[10px] font-black uppercase text-zinc-600">Execution</span>
          </div>
          <p className="text-xs text-zinc-400">
            {activeTab === 'csr' 
              ? "Requests travel over the public internet (High Latency)."
              : "Direct access to internal services. Ultra-low latency."}
          </p>
        </div>
      </div>
    </div>
  );
}
