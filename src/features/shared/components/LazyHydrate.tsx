'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyHydrateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LazyHydrate({ children, fallback, className }: LazyHydrateProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Start hydrating slightly before it comes into view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={cn("min-h-[100px]", className)}>
      {shouldRender ? (
        <div className="animate-in fade-in duration-700">
          {children}
        </div>
      ) : (
        fallback || (
          <div className="w-full h-40 bg-zinc-800/20 border border-zinc-700/50 rounded-xl flex items-center justify-center animate-pulse">
            <span className="text-xs text-zinc-500 font-mono tracking-widest uppercase">
              Waiting for Viewport...
            </span>
          </div>
        )
      )}
    </div>
  );
}
