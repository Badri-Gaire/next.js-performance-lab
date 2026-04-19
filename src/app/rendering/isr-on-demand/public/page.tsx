import { Suspense } from "react";
import { getProducts, getLabConfig } from "@/features/isr-on-demand/actions/productActions";
import { ProductCard } from "@/features/isr-on-demand/components/ProductCard";
import { Clock, RefreshCw, Zap} from "lucide-react";
import { IframeSync } from "@/features/isr-on-demand/components/IframeSync";
import { RevalidateTimer } from "@/features/isr-on-demand/components/RevalidateTimer";


export default async function PublicIsrPage() {
  return (
    <Suspense fallback={<div className="p-8 text-zinc-500 animate-pulse">Loading Cache Component...</div>}>
      <IsrContent />
    </Suspense>
  );
}

async function IsrContent() {
  // Shell is dynamic to react to TTL config changes, 
  // but data-fetching functions called inside are cached.
  
  const config = await getLabConfig();
  const { products, lastGenerated } = await getProducts();
  const ttl = config?.revalidateSeconds ?? 30;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 font-sans">
      {/* Cache Status Header */}
      <div className="sticky top-0 z-50 mb-8 p-6 rounded-[32px] bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-500 animate-ping opacity-20" />
          </div>
          
          <RevalidateTimer ttlSeconds={ttl} />
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            <Clock className="w-3 h-3 text-zinc-400" />
            Cache Snapshot: <span className="text-white bg-zinc-800 px-2 py-0.5 rounded-md">{lastGenerated}</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold text-blue-500 uppercase tracking-tighter">
            <Zap className="w-3 h-3" />
            Next.js 16 Unified Cache
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">Live Data Feed</h1>
            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">
              ISR on Demand
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
            <RefreshCw className="w-3 h-3 animate-spin-slow" />
            TTL Strategy: {ttl}s
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-800 rounded-3xl">
              <p className="text-zinc-500 font-medium">No products available in the static cache.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-12 pt-8 border-t border-zinc-900 flex justify-center">
        <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">
          End of Static Feed
        </div>
      </div>
      <IframeSync />
    </div>
  );
}
