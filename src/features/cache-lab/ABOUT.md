# Next.js 16: Cache Components Lab

> **Architecture Transition**: This lab demonstrates the shift from the manual `experimental.ppr` and `dynamic = 'force-dynamic'` model to the unified, stable **Cache Components** API.

## The "Zones" Mental Model

In Next.js 16, a single route is divided into three logical execution zones based on developer intent and data consumption:

### 1. Zone 1: Pure Static (The Shell)
- **Nature**: Deterministic at build-time.
- **Trigger**: No async data fetching, no dynamic APIs (cookies, headers).
- **Benefit**: Served instantly from Global Edge. 100% Cache Hit Ratio.

### 2. Zone 2: Cache Component (`'use cache'`)
- **Nature**: Persistent but surgically purgable.
- **Trigger**: Annotated with the `'use cache'` directive in the component body.
- **Surgical purges**: Can be invalidated via `revalidateTag` or `revalidatePath`.
- **Granular Control**: Use `cacheLife` to set TTL (e.g., `cacheLife('minutes')`).

### 3. Zone 3: Dynamic Fragments
- **Nature**: Request-specific and real-time.
- **Trigger**: Consumption of `cookies()`, `headers()`, or `connection()`.
- **Streaming**: These components are streamed into the static shell via `<Suspense>` boundaries.

---

## Technical Implications

1. **Dynamic by Default**: Next.js 16 assumes a component should be dynamic if it hits a dynamic API, but it wraps the rest of the page in a static shell. This completes the **Partial Prerendering (PPR)** vision with a simpler developer API.
2. **Unified Config**: Enabled via `cacheComponents: true` in `next.config.ts`, combining `ppr`, `dynamicIO`, and `unstable_cache`.
3. **No-Store Default**: In dynamic segments, data fetches default to `cache: 'no-store'` unless explicitly cached via `'use cache'`.
