import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CSR & Hydration",
  description: "Deep dive into Client-Side Rendering and Hydration in Next.js. Learn how to optimize interactive 'islands' for maximum performance.",
  keywords: ["nextjs csr guide", "client side rendering nextjs", "hydration process nextjs", "dynamic dashboards nextjs", "nextjs rendering strategies"],
  alternates: { canonical: "https://lab.badrigaire.com.np/rendering/csr" },
};

export default function CSRLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
