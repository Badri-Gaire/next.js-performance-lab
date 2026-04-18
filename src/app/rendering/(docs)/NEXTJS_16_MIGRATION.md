# Next.js 16 Architecture Migration Guide 🚀

This project has been migrated to the **Next.js 16 Unified Caching Model**. This document outlines the breaking changes encountered and the solutions implemented to achieve a successful production build.

## 1. Unified Configuration (`next.config.ts`)
The experimental flags for PPR and DynamicIO have been merged into a single top-level flag.

**Old Pattern (v14/v15):**
```typescript
experimental: {
  ppr: true,
  dynamicIO: true,
}
```

**New Pattern (v16):**
```typescript
const nextConfig: NextConfig = {
  cacheComponents: true, // Multi-purpose caching & PPR flag
};
```

---

## 2. Deprecation of Route Segment Configs
In the `cacheComponents` model, legacy exports like `dynamic` and `revalidate` are deprecated as they conflict with the explicit nature of the `'use cache'` directive.

**Fix Applied:**
- Removed `export const dynamic = 'force-dynamic'` from SSR and CSR.
- Removed `export const dynamic = 'force-static'` from SSG.
- Removed `export const revalidate = 30` from ISR.

*All caching is now managed surgically within components using the `'use cache'` directive.*

---

## 3. The "Dynamic by Default" Build Constraint
With `cacheComponents` enabled, Next.js tries to statically generate every page by default. If it encounters a dynamic function (headers, cookies, `new Date()`, random) outside of a `Suspense` boundary OR without a dynamic trigger, the build fails.

**The SSR Problem:**
The SSR page used `new Date().toISOString()` at the top level. Next.js tried to pre-render this as static, but failed because the date is dynamic.

**Fix Applied:**
Added `await connection()` from `next/server`. This explicitly tells the Next.js compiler: *"This sequence is tied to a request, stop trying to make it static."*

```tsx
import { connection } from 'next/server';

export default async function Page() {
  await connection(); // ⚡ Build fix for SSR
  const time = new Date().toISOString(); 
}
```

---

## 4. PPR & Hanging Promises
During the build process, Next.js "terminates" the prerender of the static shell early. If there are pending async operations (like `setTimeout`) that aren't properly scoped, the build rejects them as "Hanging Promises".

**Fix Applied:**
- Removed artificial `setTimeout` delays from Server Components.
- Moved top-level fetches into a dedicated `<StaticProducts />` component marked with `'use cache'`. This allows Next.js to cache the "Shell" while leaving the dynamic "Hole" to stream independently.

---

## 5. Caching Strategies Summary

| Strategy | v16 Implementation |
| :--- | :--- |
| **SSG** | `'use cache'` at the top of the component. |
| **ISR** | `'use cache'` + `cacheLife` (or manual revalidate hooks). |
| **RSC** | `'use cache'` to store the RSC binary payload. |
| **SSR** | `await connection()` to force per-request execution. |
| **PPR** | `'use cache'` for the shell, `<Suspense>` for the holes. |
