"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, RefreshCcw, LayoutDashboard, Clock } from "lucide-react";
import { Product } from "../types/product";
import { addProduct, deleteProduct, updateProduct, triggerManualRevalidate, getLabConfig, updateLabConfig } from "../actions/productActions";
import { useRouter } from "next/navigation";
import AddProductModal from "./AddProductModal";

interface AdminPanelProps {
  initialProducts: Product[];
}

export function AdminPanel({ initialProducts }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [ttl, setTtl] = useState(30);
  const [isUpdatingTtl, setIsUpdatingTtl] = useState(false);

  useEffect(() => {
    // Load initial TTL
    const loadConfig = async () => {
      const config = await getLabConfig();
      if (config) setTtl(config.revalidateSeconds);
    };
    loadConfig();
  }, []);

  const handleUpdateTtl = async () => {
    setIsUpdatingTtl(true);
    await updateLabConfig(ttl);
    triggerSync();
    setIsUpdatingTtl(false);
  };
  const router = useRouter();

  const triggerSync = () => {
    localStorage.setItem("isr-sync", Date.now().toString());
  };

  const handleAddProduct = async (name: string, description: string, imageTag: string) => {
    setIsAdding(true);
    const result = await addProduct({
      name,
      description,
      imageTag,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    });

    if (result.success && result.id) {
      // Update local state for immediate feedback
      setProducts([{
        id: result.id,
        name,
        description,
        imageTag,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, ...products]);
      
      setIsAddModalOpen(false);
      setIsAdding(false);
      triggerSync(); // Notify other tabs/components
    } else {
      alert(result.error || "Failed to add product");
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const result = await deleteProduct(id);
    if (result.success) {
      setProducts(products.filter(p => p.id !== id));
      triggerSync();
    }
  };

  const handleUpdate = async (name: string, description: string, imageTag: string) => {
    if (!editingProduct) return;
    const result = await updateProduct(editingProduct.id, { name, description, imageTag });
    if (result.success) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, name, description, imageTag } : p));
      setEditingProduct(null);
      triggerSync();
    }
  };

  const handleManualRevalidate = async () => {
    await triggerManualRevalidate();
    triggerSync();
    alert("Revalidation triggered! The Public View should update automatically.");
  };

  return (
    <div className="h-full bg-zinc-950 border-r border-zinc-800 flex flex-col overflow-hidden">
      {/* Admin Header */}
      <div className="p-8 border-b border-zinc-900 bg-zinc-900/20 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20">
            <LayoutDashboard className="w-5 h-5 text-blue-500" />
          </div>
          <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Admin Portal</h2>
        </div>
        <p className="text-xs font-medium text-zinc-500 leading-relaxed uppercase tracking-widest">
          Manage real-time data & surgical cache purges
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-blue-600 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20 active:scale-95 border border-blue-400"
          >
            <div className="p-3 rounded-2xl bg-white/10 group-hover:rotate-12 transition-transform">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Add Product</span>
          </button>

          <button 
            onClick={handleManualRevalidate}
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-zinc-900 hover:bg-zinc-800 transition-all border border-zinc-800 active:scale-95"
          >
            <div className="p-3 rounded-2xl bg-zinc-800 group-hover:rotate-[-12deg] transition-transform">
              <RefreshCcw className="w-6 h-6 text-zinc-400 group-hover:text-blue-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Purge Cache</span>
          </button>
        </div>

        {/* Dynamic Revalidation Controller */}
        <div className="p-8 rounded-[40px] bg-zinc-900/40 border border-zinc-800 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-sm font-black uppercase italic tracking-widest text-white">Dynamic TTL</h3>
            </div>
            <div className="px-3 py-1 rounded-full bg-zinc-800 text-[10px] font-black text-white">
              {ttl}s
            </div>
          </div>

          <div className="space-y-6">
            <input 
              type="range" 
              min="1" 
              max="60" 
              value={ttl}
              onChange={(e) => setTtl(parseInt(e.target.value))}
              className="w-full accent-orange-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
            />
            
            <button 
              onClick={handleUpdateTtl}
              disabled={isUpdatingTtl}
              className="w-full py-4 rounded-2xl bg-zinc-800 border border-zinc-700 hover:border-orange-500/50 text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3 group"
            >
              <RefreshCcw className={`w-4 h-4 text-orange-500 ${isUpdatingTtl ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
              {isUpdatingTtl ? 'Updating...' : 'Apply Dynamic TTL'}
            </button>
          </div>
        </div>

        {/* Product Management List */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Management Console</h3>
          
          <div className="space-y-4">
            {products.map((p) => (
              <div key={p.id} className="group p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                    ID
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{p.name}</h4>
                    <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-tighter">ID: {p.id.slice(0, 8)}...</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-100 transition-opacity">
                  <button 
                    onClick={() => setEditingProduct(p)}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-blue-600/20 hover:text-blue-400 transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-red-600/20 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddProduct}
        isAdding={isAdding}
      />

      <AddProductModal 
        isOpen={!!editingProduct} 
        onClose={() => setEditingProduct(null)} 
        onAdd={handleUpdate}
        isAdding={false}
        initialData={editingProduct ? { name: editingProduct.name, description: editingProduct.description, imageTag: editingProduct.imageTag } : undefined}
        title="Edit Product"
        buttonText="Update Product"
      />
    </div>
  );
}
