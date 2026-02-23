# Project Manifest: Next.js Performance Architecture Lab

This document serves as the "Source of Truth" for AI agents and developers working on this project. It defines the architecture, design tokens, and implementation standards to ensure every new demo feature is consistent and premium.

## 🎯 Project Goals
Build a comprehensive showcase of modern Next.js 15+ architecture, demonstrating:
1. **Rendering Strategies**: SSR, SSG, ISR, CSR, RSC, and PPR.
2. **Performance Patterns**: Streaming, Suspense, Selective Hydration (Intersection Observer), and Waterfall optimization.
3. **Consistency**: Unified educational flow across diverse technical demonstrations.

---

## 📁 Folder Structure (Feature-Driven)

```text
src/
├── app/                  # Routes and Main Page Layouts
│   ├── rendering/        # Demo routes (ssr, ssg, isr, csr, rsc, ppr)
│   └── globals.css       # Core theme and Tailwind configuration
├── features/             # Self-contained demo modules
│   └── [feature-name]/
│       ├── components/   # Feature-specific UI
│       ├── services/     # Feature-specific logic/fetching
│       ├── types/        # Feature-specific TS definitions
│       └── ABOUT.md      # MANDATORY: Context for AI Agents & Humans
├── lib/                  # Global Utilities (cn, formatting, etc.)
├── types/                # Project-wide global types
└── components/           # Shared UI (Skeleton, Navbar, Footer)
```

---

## 🎨 Design System & Tokens

### Colors (Tailwind v4 / CSS Variables)
*   **Background**: `#000000` (Deep Black)
*   **Surface/Cards**: `bg-zinc-950` with `border-zinc-900`
*   **Text Primary**: `text-white`
*   **Text Secondary**: `text-zinc-400`
*   **Accent Variants**:
    *   **SSR**: Orange (`text-orange-400`, `bg-orange-500/10`)
    *   **SSG**: Green (`text-green-400`, `bg-green-500/10`)
    *   **ISR**: Blue (`text-blue-400`, `bg-blue-500/10`)
    *   **CSR**: Purple (`text-purple-400`, `bg-purple-500/10`)
    *   **RSC**: Indigo (`text-indigo-400`, `bg-indigo-500/10`)
    *   **PPR**: Teal (`text-teal-400`, `bg-teal-500/10`)

---

## 🛠️ Implementation Standards (Standardized Showcase Pattern)

Every rendering demonstration page MUST follow this exact 3-part structure:

### 1. The Header (`RenderingHeader`)
Provides the high-level definition, pros/cons, and core strategy markdown.

### 2. The Blueprint (`CodeBlueprint`)
An interactive educational section that shows:
- **Pipeline Step**: A vertical flowchart (icons + desc) showing the request-to-render lifecycle.
- **Code Blueprint**: A collapsible code snippet showing the minimal implementation of that strategy.

### 3. The Playground
A live demonstration of the strategy (e.g., Product Grid) often with simulated latency to visualize the performance impact.

---

## 🤖 Instructions for AI Agents
1. **Always read this Manifest** and the feature's `ABOUT.md` before starting.
2. **Stick to the Pattern**: When adding a new demo, implement the 3-part Showcase Pattern.
3. **Accessibility**: Maintain high contrast (white on black/dark backgrounds).
4. **No Placeholders**: Use real mock data or generated visuals.
