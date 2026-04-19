"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Image as ImageIcon, Info } from "lucide-react";
import Image from "next/image";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, description: string, imageTag: string) => void;
  isAdding: boolean;
  initialData?: { name: string; description: string; imageTag: string };
  title?: string;
  buttonText?: string;
}

const IMAGE_CATEGORIES = [
  { id: "Headphones", color: "blue", hex: "3b82f6" },
  { id: "Smart Watch", color: "emerald", hex: "10b981" },
  { id: "Desk Lamp", color: "amber", hex: "f59e0b" },
  { id: "Laptop", color: "purple", hex: "a855f7" },
  { id: "Speaker", color: "rose", hex: "f43f5e" },
];

export default function AddProductModal({ 
  isOpen, 
  onClose, 
  onAdd, 
  isAdding,
  initialData,
  title = "Add New Product",
  buttonText = "Create Product"
}: AddProductModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [selectedTag, setSelectedTag] = useState(initialData?.imageTag || IMAGE_CATEGORIES[0].id);

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || "");
      setDescription(initialData?.description || "");
      setSelectedTag(initialData?.imageTag || IMAGE_CATEGORIES[0].id);
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;
    onAdd(name, description, selectedTag);
    // Reset form
    setName("");
    setDescription("");
    onClose();
  };

  const selectedCategory = IMAGE_CATEGORIES.find(c => c.id === selectedTag);
  const previewUrl = `https://placehold.co/400x400/0a0a0a/${selectedCategory?.hex || '3b82f6'}?text=${selectedTag.replace(' ', '+')}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl max-h-[95dvh] sm:max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
          >
            <div className="flex-none flex items-center justify-between border-b border-white/10 p-4 sm:p-6">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Left Side: Image Preview */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-white/50 uppercase tracking-wider">
                    Asset Preview
                  </label>
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 flex items-center justify-center group">
                    <Image 
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      unoptimized // Since it's a dynamic placeholder
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                       <div className="flex items-center gap-2 text-xs text-white/70 font-mono">
                          <ImageIcon size={14} className="text-blue-400" />
                          <span>400x400 SVG Asset</span>
                       </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-blue-500/10 p-3 text-xs text-blue-400">
                    <Info size={16} className="shrink-0" />
                    <p>This image will be stored in the PostgreSQL database and cached via ISR.</p>
                  </div>
                </div>

                {/* Right Side: Inputs */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/50 uppercase tracking-wider">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Ultra Bass Headphones"
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder:text-white/20 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/50 uppercase tracking-wider">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter product details..."
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder:text-white/20 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/50 uppercase tracking-wider">
                      Image Category
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white focus:border-blue-500 focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        {IMAGE_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id} className="bg-[#0a0a0a]">
                            {cat.id}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-none flex justify-end gap-3 sm:gap-4 border-t border-white/10 p-4 sm:p-6 bg-[#0a0a0a]">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-6 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-500 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                  {isAdding ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <Plus size={18} />
                  )}
                  {buttonText}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
