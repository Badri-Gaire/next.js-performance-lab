"use client";

import { useState } from "react";
import { useIsrDemo } from "../hooks/useIsrDemo";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";
import { Product } from "../types/product";
import { Plus, ChevronRight, Activity } from "lucide-react";
import AddProductModal from "./AddProductModal";
import { DataPipeline } from "./DataPipeline";

/**
 * Main Container for the ISR on Demand Demo.
 * Implements the dual-column layout from the design sketch.
 */
export function IsrDemoContainer() {
  const {
    products,
    isLoading,
    isAdding,
    revalidateTime,
    setRevalidateTime,
    lastNotification,
    isRevalidating,
    cacheStatus,
    handleAddProduct,
    triggerRevalidation,
  } = useIsrDemo();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleAddProductWrapper = async (name: string, description: string, imageTag: string) => {
    // Map the 3 strings from the modal to the full object the hook expects
    await handleAddProduct({
      name,
      description,
      imageTag,
      imageUrl: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80` // Default for now
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-12 pb-20 max-w-(--breakpoint-2xl) mx-auto">
      {/* Header Notification Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 animate-in slide-in-from-top-4 duration-700">
          <div className={`w-2 h-2 rounded-full ${cacheStatus === 'Fresh' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'} shadow-[0_0_10px_rgba(59,130,246,0.5)]`} />
          <h1 className="text-sm sm:text-lg font-bold text-white italic tracking-tighter">
            Real time Demo for ISR on Demand with Webhook Express server
          </h1>
          {isRevalidating && (
             <div className="ml-auto flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest">
               <Activity className="w-3 h-3 animate-pulse" />
               Purging Cache...
             </div>
          )}
        </div>
        <div className="flex items-center gap-2 px-6 text-xs font-mono text-zinc-500 animate-in fade-in slide-in-from-left-2 duration-500">
          <ChevronRight className="w-3 h-3 text-blue-500" />
          {isAdding ? "Posting new product..." : lastNotification 
            ? `Product with id ${lastNotification.id} has been change on time: ${lastNotification.timestamp}` 
            : "Product with id ... has been change on time: ..."}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Controls & Pipeline */}
        <div className="lg:col-span-5 space-y-10">
          {/* Showcase Section */}
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <h2 className="text-zinc-400 text-sm font-semibold tracking-wide">
                Showcase After Product Add From User to all Pipeline
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <h3 className="text-5xl font-black italic tracking-tighter text-white">
                  Add product
                </h3>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="group p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-2xl shadow-blue-600/30 active:scale-95 border border-blue-400 flex items-center justify-center"
                >
                  <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* Conditionally render Pipeline vs Description */}
            {(isAdding || isRevalidating) ? (
              <DataPipeline 
                isAdding={isAdding} 
                isRevalidating={isRevalidating} 
                cacheStatus={cacheStatus} 
              />
            ) : (
              <div className="relative p-10 rounded-3xl border-2 border-dashed border-zinc-700 bg-zinc-950/80 space-y-4 min-h-[300px] flex flex-col justify-center">
                <h4 className="text-xl font-bold text-white">ISR on Demand Architecture</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  This demo illustrates how <strong>Incremental Static Regeneration (ISR)</strong> operates using an API Route (Webhook). Instead of rebuilding the entire site, Next.js allows surgical cache invalidation.
                </p>
                <ul className="space-y-3 text-sm text-zinc-300 font-medium list-disc pl-5">
                  <li><strong>Step 1:</strong> Add a product to simulate a database write. The cache status becomes <em>Stale</em>.</li>
                  <li><strong>Step 2:</strong> A webhook is triggered (based on your Revalidate Timer) calling <code>revalidateTag()</code> to purge the edge cache.</li>
                  <li><strong>Step 3:</strong> The cache updates to <em>Fresh</em>, and the new data reflects globally in real-time.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Revalidation Controller */}
          <div className="pt-8 border-t border-zinc-800 space-y-6">
            <h4 className="text-xl font-bold tracking-tight text-white">
              Edit ISR time in Real to See change in Product List
            </h4>
            <div className="flex items-center gap-4">
              <div className="relative w-40">
                <input 
                  type="number"
                  value={revalidateTime}
                  onChange={(e) => setRevalidateTime(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-hidden focus:border-blue-500 transition-all text-center"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-500 pointer-events-none">
                  sec
                </span>
              </div>
              <button 
                onClick={triggerRevalidation}
                disabled={isRevalidating}
                className="flex items-center justify-center px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-400 font-bold hover:bg-blue-600 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isRevalidating ? 'Revalidating...' : 'Revalidate'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Product List */}
        <div className="lg:col-span-7 space-y-6 pl-0 lg:pl-10 lg:border-l-2 lg:border-zinc-800">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="inline-flex items-center justify-center px-6 py-2 rounded-lg border-2 border-zinc-700 bg-zinc-900">
              <span className="text-sm font-bold text-zinc-300 uppercase tracking-widest">
                Cache changed
              </span>
            </div>
            
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-500 ${
              cacheStatus === 'Fresh' 
                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                : cacheStatus === 'Stale'
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                cacheStatus === 'Fresh' ? 'bg-green-500' : cacheStatus === 'Stale' ? 'bg-orange-500' : 'bg-blue-500 animate-pulse'
              }`} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Status: {cacheStatus === 'Fresh' ? 'Fresh' : cacheStatus === 'Stale' ? 'Stale' : 'Updating'}
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-white border-b border-zinc-800 pb-4">
            Latest product at top
          </h3>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 opacity-20">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-zinc-900 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {products.map((product) => (
                <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProductWrapper}
        isAdding={isAdding}
      />

      <ProductDetailModal 
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
}
