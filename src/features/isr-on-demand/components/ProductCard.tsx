"use client";

import { Product } from "../types/product";
import { Clock, Tag, ExternalLink } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

/**
 * Enhanced Product Card for Phase 3 ISR Demo.
 */
export function ProductCard({ product }: ProductCardProps) {
  const isNew = new Date().getTime() - new Date(product.createdAt).getTime() < 30000;
  const createdDate = new Date(product.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`group relative p-5 rounded-[2rem] border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-500 hover:border-blue-500/30 flex flex-col gap-4 overflow-hidden ${isNew ? 'ring-1 ring-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.1)]' : ''}`}>
      
      {/* Dynamic Background Blur */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-600/10 blur-[40px] group-hover:bg-blue-600/20 transition-all duration-700" />
      
      {/* Product Image Container */}
      <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-inner">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <div className="px-3 py-1 rounded-full bg-blue-600 text-[9px] font-black uppercase tracking-widest text-white shadow-xl flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              Fresh Cache
            </div>
          )}
          <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-300 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
            <Tag className="w-2.5 h-2.5" />
            {product.imageTag}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-black italic tracking-tighter text-white capitalize leading-tight">
            {product.name}
          </h3>
          <ExternalLink className="w-4 h-4 text-zinc-700 group-hover:text-blue-500 transition-colors" />
        </div>
        
        <p className="text-xs text-zinc-500 font-medium line-clamp-2 leading-relaxed h-8">
          {product.description}
        </p>

        <div className="pt-3 border-t border-zinc-800/50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
           <div className="flex items-center gap-2 text-zinc-600">
             <Clock className="w-3 h-3" />
             <span>Added {createdDate}</span>
           </div>
           <span className="text-zinc-800">Static</span>
        </div>
      </div>
    </div>
  );
}
