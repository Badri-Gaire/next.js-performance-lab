"use server";

import prisma from "@/lib/prisma";
import { Product } from "../types/product";
import { revalidateTag, cacheLife, revalidatePath } from "next/cache";

/**
 * Fetches the current lab configuration using Next.js 16 'use cache'.
 */
export async function getLabConfig() {
  "use cache";
  cacheLife("minutes");
  
  try {
    // Defensive check for dev-server cache issues
    const labConfig = (prisma as any).labConfig;
    if (!labConfig) {
      console.warn("⚠️ prisma.labConfig is undefined. Check if prisma generate was run.");
      return { revalidateSeconds: 30 };
    }

    let config = await labConfig.findUnique({ where: { id: "default" } });
    if (!config) {
      config = await labConfig.create({
        data: { id: "default", revalidateSeconds: 30 }
      });
    }
    return config;
  } catch (error) {
    console.error("❌ Failed to fetch lab config:", error);
    return { revalidateSeconds: 30 };
  }
}

/**
 * Updates the dynamic revalidation timer and purges existing caches.
 */
export async function updateLabConfig(seconds: number) {
  try {
    const labConfig = (prisma as any).labConfig;
    if (!labConfig) {
       console.warn("⚠️ Cannot update TTL: prisma.labConfig is missing.");
       return { success: false, error: "Prisma configuration missing. Please restart dev server." };
    }

    await labConfig.update({
      where: { id: "default" },
      data: { revalidateSeconds: seconds }
    });
    
    // Purge everything related to the ISR lab
    revalidateTag("lab-config", "max");
    revalidateTag("products", "max");
    revalidatePath("/rendering/isr-on-demand/public");
    
    return { success: true };
  } catch (error) {
    console.error("❌ updateLabConfig error:", error);
    return { success: false, error: "Failed to update config" };
  }
}

/**
 * Data Fetching with Pure Next.js 16 'use cache'.
 */
export async function getProducts(): Promise<{ products: Product[], lastGenerated: string }> {
  "use cache";
  cacheLife("seconds"); // Follows the dynamic TTL profile
  
  console.log("♻️ [CACHE-COMPONENT] Re-rendering data from Database...");
  const lastGenerated = new Date().toLocaleTimeString();
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedProducts = products.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    imageUrl: p.imageUrl,
    imageTag: p.imageTag,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return { products: formattedProducts, lastGenerated };
}

/**
 * Adds a new product and triggers the sequential pipeline navigation.
 */
export async function addProduct(
  newProduct: Omit<Product, "id" | "createdAt" | "updatedAt" | "isNew">
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // const reqHeaders = await headers();
    // const ip = reqHeaders.get("x-forwarded-for") || "127.0.0.1";
    const ip = "127.0.0.1"; // Fixed for demo to avoid dynamic header access
    
    // Rate Limiting (3 per day)
    const now = new Date();
    const rateLimit = await prisma.rateLimit.findUnique({ where: { ip } });
    
    if (rateLimit) {
      if (rateLimit.resetAt < now) {
        await prisma.rateLimit.update({
          where: { ip },
          data: { count: 1, resetAt: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
        });
      } else if (rateLimit.count >= 10) { // Increased for demo purposes
        return { success: false, error: "Rate limit exceeded. Try again tomorrow." };
      } else {
        await prisma.rateLimit.update({
          where: { ip },
          data: { count: { increment: 1 } },
        });
      }
    } else {
      await prisma.rateLimit.create({
        data: { ip, count: 1, resetAt: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
      });
    }

    const product = await prisma.product.create({
      data: {
        name: newProduct.name,
        description: newProduct.description,
        imageUrl: newProduct.imageUrl,
        imageTag: newProduct.imageTag,
      },
    });

    // Trigger surgical revalidation immediately
    revalidateTag("products", "max");
    
    return { success: true, id: product.id };
  } catch (error: any) {
    console.error("Error adding product:", error);
    return { success: false, error: "Database error" };
  }
}

/**
 * Updates an existing product.
 */
export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.product.update({
      where: { id },
      data,
    });

    // Surgical revalidation
    revalidateTag("products", "max");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Update failed" };
  }
}

/**
 * Deletes a product.
 */
export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidateTag("products", "max");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Delete failed" };
  }
}

/**
 * Explicitly triggers on-demand revalidation.
 */
export async function triggerManualRevalidate() {
  revalidateTag("products", "max");
  return { success: true, timestamp: new Date().toISOString() };
}
