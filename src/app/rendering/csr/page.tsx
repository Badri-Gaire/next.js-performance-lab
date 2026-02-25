import { CSRPageClient } from '@/features/rendering/components/CSRPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CSR Performance",
  description: "Learn how Client-Side Rendering works in Next.js. Explore hydration, client-side fetching, and selective rendering patterns.",
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/csr" },
};

// Force this route to be dynamic at the server level
// This ensures the "Shell" is served with fresh headers (no-store / no-cache)
export const dynamic = 'force-dynamic';

export default function CSRPage() {
  return <CSRPageClient />;
}
