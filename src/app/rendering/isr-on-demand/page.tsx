import { Suspense } from "react";
import { getProducts } from "@/features/isr-on-demand/actions/productActions";
import { AdminPanel } from "@/features/isr-on-demand/components/AdminPanel";
import { Globe, ShieldCheck } from "lucide-react";

export default async function IsrOnDemandLab() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">Initializing Lab Engine...</div>}>
      <IsrLabContent />
    </Suspense>
  );
}

async function IsrLabContent() {
  const { products } = await getProducts();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top Banner */}
      <div className="h-14 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">ISR Lab Active</span>
          </div>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            Next.js 16 Edge Engine
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-zinc-600 uppercase">Architecture: Hybrid split-view</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Admin Console (CSR) */}
        <div className="w-[450px] shrink-0">
          <AdminPanel initialProducts={products} />
        </div>

        {/* Right Column: Public View (ISR) */}
        <div className="flex-1 bg-zinc-900 relative flex flex-col">
          {/* Iframe Header */}
          <div className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center px-6 gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            </div>
            <div className="flex-1 max-w-md bg-black rounded-lg h-7 border border-zinc-800 flex items-center px-4 gap-2">
              <Globe className="w-3 h-3 text-zinc-600" />
              <span className="text-[10px] font-mono text-zinc-500">https://your-app.com/public-isr</span>
            </div>
          </div>

          {/* The ISR Iframe */}
          <div className="flex-1 p-8 overflow-hidden bg-zinc-900/50">
            <div className="w-full h-full rounded-3xl overflow-hidden border-4 border-zinc-800 shadow-2xl relative">
              <iframe 
                src="/rendering/isr-on-demand/public" 
                className="w-full h-full bg-zinc-950"
                title="Public ISR View"
              />
              
              {/* Overlay Hint */}
              <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 text-white max-w-[200px] shadow-2xl animate-in slide-in-from-bottom-4 duration-1000">
                <p className="text-[10px] leading-relaxed font-medium text-zinc-300">
                  <span className="text-blue-400 font-black uppercase tracking-widest block mb-1">True ISR View</span>
                  This is a separate browser context. It will only update when the cache is purged or revalidated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
