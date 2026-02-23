# SEO & Performance Mastery Standards

This document defines the mandatory SEO and performance requirements for the **Next.js Performance Lab**. Every new feature, demo, or page MUST adhere to these standards to ensure maximum visibility and a premium user experience.

---

## 1. Metadata & Social (The "Next.js Way")

Next.js 15+ uses the `metadata` object or `generateMetadata` function. DO NOT use manual `<meta>` tags in the `layout.tsx` unless absolutely necessary.

### Checklist:
- [ ] **Title**: Unique per page. Format: `[Feature] | Next.js Performance Lab`.
- [ ] **Description**: 150-160 characters. Must contain target keywords (e.g., "Next.js SSG", "Hydration").
- [ ] **Canonical**: Always define `alternates.canonical` to avoid duplicate content issues from UTM parameters.
- [ ] **OpenGraph/Twitter**: Provide absolute image URLs.
- [ ] **Referrer**: Set to `strict-origin-when-cross-origin`.

### Dynamic Metadata Pattern:
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const url = `https://yourdomain.com/rendering/${params.slug}`;
  return {
    title: `${params.slug.toUpperCase()} | Next.js Performance Lab`,
    description: `Deep dive into Next.js ${params.slug} strategy with interactive blueprints.`,
    alternates: { canonical: url },
    openGraph: {
      url,
      images: [{ url: '/og-image.png' }],
    }
  };
}
```

---

## 2. Structured Data (JSON-LD)

Every page must include JSON-LD to help Google understand the content type (WebPage, TechArticle, etc.).

- **Implementation**: Use a script tag with `type="application/ld+json"`.
- **Validation**: Ensure `JSON.stringify` does not escape characters.

---

## 3. Core Web Vitals (CWV)

### Largest Contentful Paint (LCP)
- [ ] **Hero Images**: Use `priority` and `loading="eager"`.
- [ ] **Fetch Priority**: Add `fetchPriority="high"` to the main LCP element.
- [ ] **Fonts**: Use `font-display: swap`. Preconnect to font domains in `layout.tsx`.

### Cumulative Layout Shift (CLS)
- [ ] **Images**: Always set explicit `width` and `height` to reserve aspect-ratio.
- [ ] **Placeholders**: Use skeletons or fixed-height containers for dynamic content.
- [ ] **Animations**: Never animate `width`, `height`, `top`, or `left`. ONLY `transform` and `opacity`.

### Interaction to Next Paint (INP)
- [ ] **Main Thread**: Break up tasks > 50ms.
- [ ] **Promises**: Use `Promise.all()` for independent parallel operations (animations, data fetching).

---

## 4. Semantic HTML & Accessibility

- **H1 Rule**: Exactly ONE `<h1>` per page.
- **Hierarchy**: No skipping levels (`h2` -> `h4` is forbidden).
- **List Integrity**: `<ul>`/`<ol>` can ONLY contain `<li>` direct children.
- **Interactive**: Links `<a>` for navigation, `<button>` for actions. If an `<a>` acts as a button, use `role="button"` and handle keyboard events.

---

## 5. Deployment & Crawling

- **Robots.txt**: Points to a valid sitemap.
- **Sitemap**: Generate using `next-sitemap` or a manual script during build.
- **No PWA Bits**: Do not include `manifest.json`, `apple-touch-icon`, or mobile-web-app tags unless explicitly building a PWA. (Reduces unnecessary requests).

---

## 6. Global Search Targeting (Google Trends)
Target high-interest queries by including them in headings and metadata:
- Keywords: `nextjs`, `react`, `tailwind`, `nextjs ssg`, `rendering strategies`, `performance lab`.
