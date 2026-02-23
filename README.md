# 🧪 Next.js Performance Architecture Lab

A premium, deep-dive demonstration project showcasing modern Next.js 15+ architecture, rendering strategies, and browser-level optimizations. Built to demonstrate mastery of Core Web Vitals and high-performance frontend engineering.

## 🚀 Live Demo
**[View the Lab Live](https://lab.badrigaire.com.np)** 

---

## 🏗️ Architecture & Features

This project is a technical sandbox for exploring how data flows from the server to the browser pixels.

### 1. Rendering Strategies
- **SSR (Server-Side Rendering)**: Per-request dynamic rendering with optimized TTFB.
- **SSG (Static Site Generation)**: Pre-rendered builds including dynamic routes via `generateStaticParams`.
- **ISR (Incremental Static Regeneration)**: Background revalidation using the Stale-While-Revalidate pattern.
- **RSC (React Server Components)**: Eliminating client-side waterfalls and reducing bundle sizes.
- **PPR (Partial Prerendering)**: Experimental hybrid strategy combining static shells with dynamic streaming "holes."

### 2. Performance Engineering
- **Browser Pipeline**: Visual breakdown of the Critical Rendering Path (CRP).
- **Caching Hierarchy**: Coordination between Browser, CDN, and Framework caches.
- **Code Splitting**: Route-based and component-level partitioning using `next/dynamic`.
- **Selective Hydration**: Deferring React hydration using Intersection Observer for faster TBT.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Geist Sans & Mono

---

## 📈 Performance Targets
- **LCP (Largest Contentful Paint)**: < 1.2s
- **CLS (Cumulative Layout Shift)**: 0.0
- **INP (Interaction to Next Paint)**: < 100ms
- **SEO Score**: 100/100 (Google Lighthouse)

---

## 📖 Getting Started

Install dependencies:
```bash
npm install
# or
yarn install
```

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Build for production:
```bash
npm run build
```

---

## 👨‍💻 Author
**Badri Gaire** – Frontend Architect focused on performance and scalable web applications.

---

## ⚖️ License
MIT License.
