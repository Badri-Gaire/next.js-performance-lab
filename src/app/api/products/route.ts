import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getCachedProducts = unstable_cache(
  async () => {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["isr-products"],
  { tags: ["isr-products"] }
);

export async function GET() {
  const products = await getCachedProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    
    // Rate Limiting Logic
    const now = new Date();
    const rateLimit = await prisma.rateLimit.findUnique({ where: { ip } });
    
    if (rateLimit) {
      if (rateLimit.resetAt < now) {
        await prisma.rateLimit.update({
          where: { ip },
          data: { count: 1, resetAt: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
        });
      } else if (rateLimit.count >= 3) {
        return NextResponse.json({ error: "Rate limit exceeded. Maximum 3 submissions per day." }, { status: 429 });
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

    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        imageTag: body.imageTag,
      },
    });

    // Simulate Webhook Call
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host");
    
    fetch(`${protocol}://${host}/api/revalidate?tag=isr-products&secret=${process.env.REVALIDATE_SECRET || 'labnextjs_secret_123'}`, {
      method: 'POST'
    }).catch(console.error);

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to add product:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
