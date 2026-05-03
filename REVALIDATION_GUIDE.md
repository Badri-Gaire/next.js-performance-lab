# Surgical Revalidation: The Master Plan

This document explains how the **On-Demand ISR (Surgical Revalidation)** works in this lab and how to transition it from a simulated environment to a "Real-Time" production system.

## 1. Current Lab Architecture (The "Simulated" Pattern)

Currently, the lab uses a **Server Action** pattern to demonstrate on-demand updates.

-   **Trigger**: User clicks "Update Product" in the Admin Panel.
-   **Execution**: A Next.js Server Action (`updateProduct`) updates the database (Prisma) and calls `revalidateTag('products')`.
-   **Result**: The Public page cache is purged. The next visitor sees the fresh data.
-   **Benefit**: Easy to test without setting up external webhooks.

---

## 2. Production Architecture (The "Real-Time" Pattern)

To make it truly real-time, we shift the responsibility of revalidation from the "Save Button" to the "Database" itself.

### The Lifecycle:
1.  **Event**: A change occurs in the Database (via Supabase Table Editor, a script, or an API).
2.  **Notification**: Supabase observes the change and sends an **HTTP POST Webhook**.
3.  **Reception**: Your Next.js API Route (`/api/revalidate`) receives the webhook.
4.  **Verification**: The API checks the `x-revalidate-secret` to ensure the request is authorized.
5.  **Action**: Next.js calls `revalidateTag('products')`.
6.  **Global Update**: Every Vercel Edge Node globally purges the cache for that tag.

### Why this is better:
-   **Centralized**: No matter *how* the data changes, the cache is always updated.
-   **Decoupled**: Your application code doesn't need to know about the cache; the data layer handles it.

---

## 3. How to implement the Webhook

### Step A: Configure the API Route
Ensure `src/app/api/revalidate/route.ts` is ready. It should look like this:

```typescript
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('products');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
```

### Step B: Setup Supabase Webhook
1.  Go to **Supabase Dashboard** > **Database** > **Webhooks**.
2.  Target the `Product` table for `INSERT`, `UPDATE`, `DELETE`.
3.  URL: `https://your-domain.com/api/revalidate`.
4.  Header: `x-revalidate-secret` = `your_secret_here`.

---

## 4. Verification Check
Check the **Response Headers Lab** on the Public page:
-   Before change: `X-Vercel-Cache: HIT`
-   After DB change: (Next refresh) `X-Vercel-Cache: STALE` or `MISS`
-   Subsequent refresh: `X-Vercel-Cache: HIT` (with new data)
