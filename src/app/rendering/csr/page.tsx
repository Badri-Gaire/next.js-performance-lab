import { CSRPageClient } from '@/features/rendering/components/CSRPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CSR Performance",
  description: "Learn how Client-Side Rendering works in Next.js. Explore hydration, client-side fetching, and selective rendering patterns.",
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/csr" },
};

// CSR pages in Next.js 16 are dynamic by default (shell rendering).

export default function CSRPage() {
  return <CSRPageClient />;
}
