import { Product } from '../types';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="relative aspect-square overflow-hidden bg-zinc-900">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
          {product.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
          <span className="text-xs font-bold text-zinc-300">
            {product.rating.rate} <span className="text-zinc-500 font-medium">({product.rating.count} reviews)</span>
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-white line-clamp-1 mb-2 group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-sm text-zinc-400 line-clamp-2 mb-6 leading-relaxed font-medium">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between border-t border-zinc-900 pt-4">
          <span className="text-xl font-black text-white">${product.price}</span>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white font-bold text-xs hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
            <ShoppingCart className="w-4 h-4" />
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
