# Rendering Fundamentals

## Overview
This feature module contains the core rendering strategies provided by Next.js. Understanding the trade-offs between these strategies is essential for building high-performance applications.

## Strategies Included
1. **CSR (Client-Side Rendering)**: Traditional React approach. High interactivity, but poor SEO and slow initial load.
2. **SSR (Server-Side Rendering)**: Better SEO and TTFB. Content is generated on every request.
3. **SSG (Static Site Generation)**: Fastest possible load. Content is generated at build time.
4. **ISR (Incremental Static Regeneration)**: Best of both worlds. Update static content after build without a full redeploy.

## Why this exists?
This sandbox allows developers to switch between these strategies instantly to observe:
- Network waterfall differences.
- Hydration behavior.
- Layout Shift (CLS) impacts.
- Server vs Client execution.
