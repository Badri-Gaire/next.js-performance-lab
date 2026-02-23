import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Client-Side Rendering (CSR) | Next.js Architecture Lab",
  description: "Deep dive into Client-Side Rendering (CSR) and Hydration in Next.js 15. Learn when to move rendering to the browser and how to optimize for interactivity.",
  keywords: ["nextjs csr guide", "client side rendering nextjs", "hydration process nextjs", "dynamic dashboards nextjs", "nextjs rendering strategies"],
};

export default function CSRLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
