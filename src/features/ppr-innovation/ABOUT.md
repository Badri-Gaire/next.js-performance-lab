# Feature: Partial Prerendering (PPR) & Hybrid Pipelines

## Overview
Partial Prerendering (PPR) is the evolution of the Next.js rendering pipeline. It removes the binary choice between **Static** and **Dynamic** by allowing a single route to contain both.

## The Pipeline Lifecycle (How it works)
When a user requests a PPR-enabled page:
1.  **Immediate Response**: The server sends the **Static Shell** (pre-rendered at build time) instantly from the Edge/CDN.
2.  **HTTP Streaming**: The connection stays open.
3.  **Dynamic Resolution**: The server executes dynamic code (e.g., database queries) for the "holes" (Suspense boundaries).
4.  **Final Payload**: As dynamic data finishes, the server streams the final HTML segments to the browser, which React swaps into place.

## Choosing the Right Strategy: When to use PPR?

| Feature | Use PPR? | Why? |
| :--- | :--- | :--- |
| **Landing Pages** | ✅ YES | Instant load for SEO + dynamic CTAs for users. |
| **E-commerce Product** | ✅ YES | Static product info + dynamic price/stock. |
| **User Settings** | ❌ NO | Entirely dynamic/private. Use SSR or CSR. |
| **Public Blog** | ⚠️ OPTIONAL | Standard SSG or ISR is usually enough. |

## Comparison: The Rendering Spectrum
- **SSG**: Fast build, same for everyone. Hard to personalize.
- **SSR**: Personalized for everyone. Hard to make fast (TTFB is slow).
- **ISR**: Fast and eventually fresh. Hard to do per-user personalization.
- **PPR**: **Instant + Personalized.** The "Holy Grail" of rendering.

## The "Astro" Connection
While Astro uses **Islands** to control *Browser Hydration* (client:visible), Next.js PPR uses **Holes** to control *Server Streaming*.
- **Astro Approach**: "Don't send JS until it's needed."
- **Next.js PPR Approach**: "Don't wait for data to send the UI."
In this sandbox, we combine both: **PPR** for the fast server response, and **LazyHydrate** (using Intersection Observer) for delayed client-side activation.
