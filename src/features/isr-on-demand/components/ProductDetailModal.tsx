"use client";

import { Product } from "../types/product";
import { X, Clock, Database, Globe } from "lucide-react";

import Image from "next/image";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal to display detailed information about a product and its cache state.
 */
export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/50 hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors border border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Left: Image */}
          <div className="relative w-full md:w-1/2 aspect-square bg-zinc-900 border-r border-zinc-800">
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill
              priority
              className="object-cover opacity-80"
            />
          </div>

          {/* Right: Data */}
          <div className="flex-1 p-8 space-y-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500">
                  <Database className="w-3 h-3" />
                  Cached Static Data
                </div>
                <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">
                  {product.name}
                </h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-zinc-900">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block">
                    Last Sync
                  </span>
                  <div className="flex items-center gap-2 text-white font-mono text-xs">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    {product.updatedAt}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block">
                    Source
                  </span>
                  <div className="flex items-center gap-2 text-white font-mono text-xs">
                    <Globe className="w-3.5 h-3.5 text-green-500" />
                    Edge Cache
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                  * This data is statically served from the Next.js cache. On-demand revalidation ensures it is always fresh after a data update.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
