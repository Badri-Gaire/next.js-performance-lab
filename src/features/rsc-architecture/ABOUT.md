# Feature: RSC Architecture & Waterfall Optimization

## Overview
React Server Components (RSC) represent a paradigm shift in how we build React applications. Introduced fundamentally in Next.js 13 (2022) and matured in Next.js 14/15, RSCs allow components to stay on the server, significantly reducing the JavaScript bundle sent to the client.

## The Evolution Timeline
- **2020**: Facebook shares the initial RFC for "Server Components".
- **2021**: Development focus on React 18 integration.
- **2022**: Next.js 13 introduces the "App Router" as the first production-grade RSC implementation.
- **2023-2024**: Full ecosystem adoption with Server Actions and Streaming.

## The Problem: Data Waterfalls
In traditional Client-Side Rendering (CSR), data fetching often leads to a "Waterfall Model":
1. Client fetches `layout.js`
2. `layout.js` renders a component that fetches `user.json`
3. Once `user.json` arrives, it renders a child that fetches `posts.json`
4. Result: Multiple round-trips from Client to Server, causing slow TTI (Time to Interactive).

## The RSC Solution
RSC allows data fetching to happen **directly on the server**, right next to your database or API.
- **No Client Round-trips**: Data is fetched before the component is even sent to the client.
- **Parallel Fetching**: Server can initiate multiple `fetch` requests simultaneously.
- **Streaming**: Using `Suspense`, the server can stream parts of the UI as they become ready, breaking the waterfall bottleneck.

## Metrics Improvement
- **Bundle Size**: 0kb (for server components).
- **TTFB (Time to First Byte)**: Improved as server renders HTML instead of sending a blank shell.
- **Waterfall Latency**: Reduced from `N` round-trips to `1` consolidated response.

## Feature Structure
Always use this structure for new demo features to ensure consistency:
- `components/`: Feature-specific UI.
- `services/`: Business logic and data fetching.
- `ABOUT.md`: Architectural context for human developers and AI agents.
