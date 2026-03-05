'use client';

import React from 'react';
import { Network, CheckCircle2, Info } from 'lucide-react';

export function FetchVsAxios() {
  const comparison = [
    {
      feature: 'Default Failure Trigger',
      fetch: 'Only on Network Error (DNS/Timeout)',
      axios: 'Any status code outside 2xx (4xx, 5xx)',
      impact: 'High: Fetch requires manual "res.ok" check.'
    },
    {
      feature: 'JSON Parsing',
      fetch: 'Manual step (await res.json())',
      axios: 'Automatic (data property)',
      impact: 'Convenience: Axios simplifies boilerplate.'
    },
    {
      feature: 'Error Metadata',
      fetch: 'Requires manual construction of Error objects',
      axios: 'Rich error objects with response/config details',
      impact: 'Debuggability: Axios provides more context by default.'
    }
  ];

  return (
    <div className="space-y-8 py-10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
             <Network className="w-6 h-6 text-blue-400" />
             Fetch vs. Axios: The Error Bridge
          </h3>
          <p className="text-zinc-400 text-sm max-w-xl font-medium">
            Understanding how your fetching layer propagates errors is critical for building a predictable UI. 
            Axios throws by default, while Fetch silently succeeds unless the request itself fails.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Client Choice</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Fetch Card */}
        <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-6 group hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-white italic">Native Fetch API</h4>
            <div className="px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[9px] font-bold text-zinc-400">Built-in</div>
          </div>
          <div className="bg-black/50 p-4 rounded-2xl border border-zinc-900 font-mono text-[11px] text-zinc-400">
            <code className="block text-blue-400">const res = await fetch(url);</code>
            <code className="block text-zinc-400 mt-1 italic">{`// Manual check required:`}</code>
            <code className="block text-red-400/80">{`if (!res.ok) throw Error(res.status);`}</code>
          </div>
          <ul className="space-y-3">
            {[
              'Lightweight (0 additional bundle size)',
              'Standard Web API',
              'Requires manual response validation'
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-xs text-zinc-300 font-medium tracking-tight">
                <Info className="w-3.5 h-3.5 text-zinc-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Axios Card */}
        <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-6 group hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-white italic">Axios Library</h4>
            <div className="px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-[9px] font-bold text-purple-400">Library</div>
          </div>
          <div className="bg-black/50 p-4 rounded-2xl border border-zinc-900 font-mono text-[11px] text-zinc-400">
            <code className="block text-purple-400">{`try {`}</code>
            <code className="block text-purple-400 ml-2">{` const res = await axios.get(url);`}</code>
            <code className="block text-purple-400">{`} catch (error) {`}</code>
            <code className="block text-zinc-400 ml-2 italic">{` // Auto-throws on non-2xx statuses!`}</code>
            <code className="block text-purple-400">{`}`}</code>
          </div>
          <ul className="space-y-3">
            {[
              'Automatic JSON transformation',
              'Built-in request/response interceptors',
              'Throw-on-error behavior by default'
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-xs text-zinc-300 font-medium tracking-tight">
                <Info className="w-3.5 h-3.5 text-zinc-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-[2.5rem] bg-zinc-950 border border-zinc-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/50">
              <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900">Feature</th>
              <th className="p-6 text-[10px] font-black text-blue-400 uppercase tracking-widest border-b border-zinc-900">Fetch</th>
              <th className="p-6 text-[10px] font-black text-purple-400 uppercase tracking-widest border-b border-zinc-900">Axios</th>
            </tr>
          </thead>
          <tbody className="text-xs font-medium tracking-tight">
            {comparison.map((item, i) => (
              <tr key={i} className="border-b border-zinc-900/50 last:border-0 hover:bg-zinc-900/20 transition-colors">
                <td className="p-6 text-zinc-300 font-bold">{item.feature}</td>
                <td className="p-6 text-zinc-400">{item.fetch}</td>
                <td className="p-6 text-zinc-400">{item.axios}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
