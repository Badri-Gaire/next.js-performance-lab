'use client';

import React, { useState } from 'react';
import { AlertCircle, Terminal, RefreshCw, Layers, ShieldAlert, Code } from 'lucide-react';

type ErrorState = {
  type: 'FETCH' | 'AXIOS' | 'SERVER' | null;
  status: number | null;
  message: string | null;
  raw: unknown | null;
  loading: boolean;
};

export function ErrorVisualizer() {
  const [errorState, setErrorState] = useState<ErrorState>({
    type: null,
    status: null,
    message: null,
    raw: null,
    loading: false
  });

  const simulateError = async (type: 'FETCH' | 'AXIOS' | 'SERVER') => {
    setErrorState(prev => ({ ...prev, type, loading: true, message: null, status: null, raw: null }));
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    try {
      if (type === 'FETCH') {
        const res = await fetch('https://dummyjson.com/invalid-route');
        if (!res.ok) {
          throw {
            message: 'Fetch failed naturally (res.ok is false)',
            status: res.status,
            statusText: res.statusText,
            url: res.url
          };
        }
      } else if (type === 'AXIOS') {
        // Simulating Axios behavior which throws on non-2xx by default
        throw {
          isAxiosError: true,
          response: {
            status: 404,
            statusText: 'Not Found',
            data: { message: 'Resource not found' }
          },
          config: { url: '/api/v1/resource' }
        };
      } else {
        // Simulating a Server Component crash or Runtime error
        throw new Error('Runtime Exception: Unexpected token < in JSON at position 0');
      }
    } catch (err: any) {
      setErrorState(prev => ({
        ...prev,
        loading: false,
        status: err.status || err.response?.status || 500,
        message: err.message || err.response?.data?.message || 'Unexpected Error',
        raw: err
      }));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="p-8 rounded-4xl bg-zinc-950 border border-zinc-900 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldAlert className="w-32 h-32 text-red-500" />
        </div>
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-red-500/40">
            Resilience Lab
          </div>
          <h2 className="text-4xl font-black text-white tracking-widest uppercase italic">Error Strategy Visualizer</h2>
          <p className="text-zinc-400 max-w-2xl font-medium">Test how different fetching libraries and environments surface errors. Learn to differentiate between network failures and application exceptions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <section className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-6">
            <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-500" />
              Trigger Scenarios
            </h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => simulateError('FETCH')}
                disabled={errorState.loading}
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left hover:border-blue-500/50 hover:bg-zinc-900/50 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white mb-1">Standard Fetch</div>
                  <div className="text-[10px] text-zinc-400">Requires manual check (res.ok)</div>
                </div>
                <Code className="w-4 h-4 text-zinc-500 group-hover:text-blue-400" />
              </button>

              <button 
                onClick={() => simulateError('AXIOS')}
                disabled={errorState.loading}
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left hover:border-purple-500/50 hover:bg-zinc-900/50 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white mb-1">Axios Simulation</div>
                  <div className="text-[10px] text-zinc-400">Auto-throws on non-2xx status</div>
                </div>
                <Layers className="w-4 h-4 text-zinc-500 group-hover:text-purple-400" />
              </button>

              <button 
                onClick={() => simulateError('SERVER')}
                disabled={errorState.loading}
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left hover:border-red-500/50 hover:bg-zinc-900/50 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white mb-1">Runtime Exception</div>
                  <div className="text-[10px] text-zinc-400">Unexpected application crash</div>
                </div>
                <AlertCircle className="w-4 h-4 text-zinc-500 group-hover:text-red-400" />
              </button>
            </div>
          </section>

          <div className="p-8 rounded-[2.5rem] bg-linear-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20">
            <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3 italic underline">Expert Tip</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
              Next.js 15+ Server Actions and fetch calls should almost always be wrapped in try/catch or use high-level Error Boundaries to prevent full-page crashes.
            </p>
          </div>
        </div>

        {/* Console / Output */}
        <div className="lg:col-span-2">
          <div className="h-full rounded-[2.5rem] bg-zinc-950 border border-zinc-900 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-zinc-500" />
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Error Console Output</span>
              </div>
              {errorState.type && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[9px] font-bold text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Source: {errorState.type}
                </div>
              )}
            </div>

            <div className="flex-1 p-8 font-mono overflow-auto min-h-[400px]">
              {errorState.loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                  <span className="text-xs text-zinc-500 italic">Intercepting stack trace...</span>
                </div>
              ) : errorState.message ? (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
                    <div className="flex items-center gap-3 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-tight">Intercepted Error!</span>
                    </div>
                    <div className="text-2xl font-black text-white">{errorState.status} {errorState.message}</div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Raw Error Object (Preview)</div>
                    <div className="p-6 rounded-2xl bg-black/40 border border-zinc-900 text-[11px] text-zinc-400 overflow-x-auto">
                      <pre>{JSON.stringify(errorState.raw, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 grayscale">
                  <Terminal className="w-12 h-12 text-zinc-600" />
                  <div className="max-w-xs space-y-2">
                    <p className="text-sm font-bold text-zinc-400">Console Idle</p>
                    <p className="text-[10px] text-zinc-400">Click a scenario to observe how error metadata is surfaced and handled in the application layer.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
