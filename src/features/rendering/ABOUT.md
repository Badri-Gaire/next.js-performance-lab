# Rendering Fundamentals

## Overview
This feature module contains the core rendering strategies provided by Next.js. Understanding the trade-offs between these strategies is essential for building high-performance applications.

## Strategies Included
1. **CSR (Client-Side Rendering)**: Traditional React approach. High interactivity, but poor SEO and slow initial load.
2. **SSR (Server-Side Rendering)**: Better SEO and TTFB. Content is generated on every request.
3. **SSG (Static Site Generation)**: Fastest possible load. Content is generated at build time.
4. **ISR (Incremental Static Regeneration)**: Best of both worlds. Update static content after build without a full redeploy.
5. **PPR (Partial Prerendering)**: The future. Caches a static HTML shell (Layouts) while streaming dynamic holes.

## The PPR "Shell" Paradox (Deep Dive)
A common confusion among developers is: *"If my Navbar depends on a user's click, how can it be static?"*

### Logic 1: Structural vs. State
PPR doesn't cache the **User State** (like which button is active). It caches the **Structural HTML** (the div tags, the icons, the layout CSS).
- **At Build Time**: Next.js renders the Layout as a physical HTML file.
- **At Request Time**: The CDN serves this "Empty Shell" instantly.
- **The Stream**: The specific "Active State" or "Private Data" is then streamed into that shell using React Suspense.

### Logic 2: Initial Load vs. Client Navigation
- **Client Navigation**: React handles layout persistence (no re-render).
- **Initial Load / Browser Refresh**: There is no React state yet. The browser is empty. 
- **Without PPR**: The server must compute the layout for the first time (Slow).
- **With PPR**: The CDN delivers the structural shell in 0ms, allowing the user to see the UI *before* the server logic even finishes.

## Summary Checklist
- **SSR**: Choose when data is 100% private and changes per-user/request (e.g., Banking).
- **PPR**: Choose for Storefronts or Dashboards where the Layout is fixed but content is dynamic.
