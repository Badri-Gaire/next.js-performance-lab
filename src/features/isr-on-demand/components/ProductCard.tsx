"use client";

import { Product } from "../types/product";
import { Edit2 } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

/**
 * Product Card component for the ISR Demo.
 * Matches the sketch design with 'Edit' at top.
 */
export function ProductCard({ product }: ProductCardProps) {
  // A heuristic to check if the product was created in the last 10 seconds
  const isNew = new Date().getTime() - new Date(product.createdAt).getTime() < 10000;

  return (
    <div className={`group relative p-4 rounded-xl border-2 border-zinc-800 bg-zinc-950 transition-all duration-300 hover:border-blue-500/50 flex flex-col gap-3 ${isNew ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-950 animate-in fade-in slide-in-from-top-4 duration-1000' : ''}`}>
      
      {/* Top Header */}
      <div className="flex items-center justify-between px-1">
         {/* <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
           Edit <Edit2 className="w-3 h-3" />
         </span> */}
         {isNew && (
            <span className="px-2 py-0.5 rounded-sm bg-blue-500 text-white text-[9px] font-bold uppercase tracking-wider animate-pulse">
              New
            </span>
         )}
      </div>

      {/* Product Image Container */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2 px-1 pb-2">
        <h3 className="text-base font-bold text-white truncate capitalize">
          {product.name}
        </h3>
        <div className="space-y-1.5">
          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          {/* Sketch wavy lines simulation */}
          <div className="w-2/3 h-1 bg-zinc-800 rounded-full" />
          <div className="w-1/2 h-1 bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}
