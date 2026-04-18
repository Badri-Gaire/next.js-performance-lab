"use client";

import { useState, useCallback, useEffect } from "react";
import { Product } from "../types/product";

export function useIsrDemo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isRevalidating, setIsRevalidating] = useState(false);
  
  // Phase 2 State Visualization
  const [revalidateTime, setRevalidateTime] = useState(30);
  const [cacheStatus, setCacheStatus] = useState<"Fresh" | "Stale" | "Updating">("Fresh");
  const [lastNotification, setLastNotification] = useState<{ id: string; type: string; timestamp: string } | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
      setCacheStatus("Fresh");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddProduct = useCallback(async (newProduct: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    setIsAdding(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Failed to add product");
        return false;
      }
      
      const product = await res.json();
      
      // Trigger notification for the "Sync Bar"
      setLastNotification({
        id: product.id, 
        type: "CREATE",
        timestamp: new Date().toLocaleTimeString()
      });

      // Mark cache as STALE after a POST
      setCacheStatus("Stale");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setIsAdding(false);
    }
  }, []);

  const triggerRevalidation = useCallback(async () => {
    setIsRevalidating(true);
    setCacheStatus("Updating");
    
    try {
      // Simulate Webhook being hit after revalidateTime seconds
      if (revalidateTime > 0) {
        await new Promise(resolve => setTimeout(resolve, revalidateTime * 1000));
      }
      await fetch('/api/revalidate?tag=isr-products&secret=labnextjs_secret_123', { method: 'POST' });
      
      await fetchProducts();
      
      setLastNotification({
        id: "GLOBAL",
        type: "PURGE",
        timestamp: new Date().toLocaleTimeString()
      });

    } catch (err) {
      console.error(err);
    } finally {
      setIsRevalidating(false);
    }
  }, [fetchProducts, revalidateTime]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    isAdding,
    isRevalidating,
    revalidateTime,
    setRevalidateTime,
    cacheStatus,
    lastNotification,
    handleAddProduct,
    triggerRevalidation,
    refresh: fetchProducts,
  };
}
