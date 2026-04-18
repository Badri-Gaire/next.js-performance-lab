"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    imageUrl: p.imageUrl,
    imageTag: p.imageTag,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));
}

import { unstable_cache } from "next/cache";

export const getCachedProducts = unstable_cache(
  async () => {
    return await getProducts();
  },
  ["isr-products"],
  { tags: ["isr-products"] }
);

export async function addProduct(
  newProduct: Omit<Product, "id" | "createdAt" | "updatedAt" | "isNew">
): Promise<{ success: boolean; error?: string }> {
  try {
    const reqHeaders = await headers();
    const ip = reqHeaders.get("x-forwarded-for") || "127.0.0.1";
    
    // Rate Limiting Logic (3 submissions per day)
    const now = new Date();
    const rateLimit = await prisma.rateLimit.findUnique({ where: { ip } });
    
    if (rateLimit) {
      if (rateLimit.resetAt < now) {
        // Reset if a day has passed
        await prisma.rateLimit.update({
          where: { ip },
          data: { count: 1, resetAt: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
        });
      } else if (rateLimit.count >= 3) {
        return { success: false, error: "Rate limit exceeded. Maximum 3 submissions per day." };
      } else {
        await prisma.rateLimit.update({
          where: { ip },
          data: { count: { increment: 1 } },
        });
      }
    } else {
      await prisma.rateLimit.create({
        data: {
          ip,
          count: 1,
          resetAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        },
      });
    }

    // Add Product
    await prisma.product.create({
      data: {
        name: newProduct.name,
        description: newProduct.description,
        imageUrl: newProduct.imageUrl,
        imageTag: newProduct.imageTag,
      },
    });

    // Revalidate the cache
    revalidateTag("isr-products", {});

    return { success: true };
  } catch (error: any) {
    console.error("Error adding product:", error);
    return { success: false, error: error?.message || String(error) || "Failed to add product" };
  }
}

export async function forceRevalidateProducts() {
  revalidateTag("isr-products", {});
  return { success: true };
}
