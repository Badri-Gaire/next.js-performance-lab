import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Link from 'next/link';
import { Home, Zap, Server, Database, Layers, Code2, Cpu } from 'lucide-react';
import { CopyrightYear } from "@/features/shared/components/CopyrightYear";
import { ScrollToTop } from "@/features/shared/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Next.js Performance Architecture Lab | Advanced Rendering Showcase",
    template: "%s | Next.js Performance Architecture Lab",
  },
  description: "Deep dive into Next.js 15+ architecture: SSR, SSG, ISR, CSR, and Browser Rendering Pipelines. Optimized for performance and Core Web Vitals.",
  alternates: {
    canonical: "https://lab.badrigaire.com.np",
  },
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lab.badrigaire.com.np",
    title: "Next.js Performance Architecture Lab",
    description: "Master Next.js rendering strategies and browser pipelines.",
    siteName: "Next.js Performance Architecture Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Performance Architecture Lab",
    description: "Master Next.js rendering strategies and browser pipelines.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'SSR', href: '/rendering/ssr', icon: Server },
    { name: 'SSG', href: '/rendering/ssg', icon: Zap },
    { name: 'ISR', href: '/rendering/isr', icon: Database },
    { name: 'CSR', href: '/rendering/csr', icon: Layers },
    { name: 'RSC', href: '/rendering/rsc', icon: Cpu },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Next.js Performance Architecture Lab",
    "description": "Advanced showcase of Rendering Strategies & Performance Patterns",
    "url": "https://lab.badrigaire.com.np",
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold tracking-tight text-xl text-white">Performance<span className="text-blue-500">Architecture</span></span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
              <Link 
                href="https://github.com" 
                target="_blank"
                className="px-5 py-2 rounded-xl bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all active:scale-95"
              >
                Source Code
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
          {children}
        </main>

        <footer className="border-t border-zinc-900 py-12 bg-black">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="font-bold text-lg text-white">Performance Architecture Lab</span>
              </div>
              <p className="text-sm text-zinc-500 max-w-xs leading-relaxed font-medium">
                Advanced Next.js 15 demonstration project focusing on performance and architecture.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
               <div className="flex flex-col gap-3">
                 <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Concepts</span>
                 <Link href="/rendering/ssr" className="text-sm text-zinc-400 hover:text-blue-500 transition-colors">Server Rendering</Link>
                 <Link href="/rendering/isr" className="text-sm text-zinc-400 hover:text-blue-500 transition-colors">Revalidation</Link>
               </div>
               <div className="flex flex-col gap-3">
                 <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Frontend</span>
                 <Link href="/rendering/csr" className="text-sm text-zinc-400 hover:text-blue-500 transition-colors">Client Hydration</Link>
                 <Link href="/" className="text-sm text-zinc-400 hover:text-blue-500 transition-colors">Lazy Loading</Link>
               </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-900 text-center">
            <p className="text-xs text-zinc-700 font-medium">
              © <CopyrightYear /> Next.js Showcase Application. MIT Licensed.
            </p>
          </div>
        </footer>
        <ScrollToTop />
      </body>
    </html>
  );
}
