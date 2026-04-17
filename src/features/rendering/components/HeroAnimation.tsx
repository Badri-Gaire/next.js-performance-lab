"use client";

import { useState, useEffect, ReactNode } from "react";

interface HeroAnimationProps {
  children: ReactNode;
  animationOverlay: ReactNode;
}

export function HeroAnimation({ children, animationOverlay }: HeroAnimationProps) {
  const [isForced, setIsForced] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsForced(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={`relative group block sm:inline mt-2 sm:mt-0 px-4 cursor-pointer py-1 min-w-[200px] sm:min-w-[280px] max-w-full h-[1em] sm:h-auto inline-flex items-center justify-center overflow-visible select-none outline-none ${isForced ? "is-playing" : ""}`}>
      {/* The Text - Entirely hidden on hover or when forced */}
      <span className="relative z-10 bg-linear-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent uppercase italic tracking-tighter transition-all duration-300 group-hover:opacity-0 group-[.is-playing]:opacity-0 group-active:opacity-0 group-hover:scale-50 group-[.is-playing]:scale-50 group-active:scale-50 group-hover:blur-sm group-[.is-playing]:blur-sm group-active:blur-sm px-2">
        {children}
      </span>
      
      {/* TURBO MODE OVERDRIVE ANIMATION (Hover, Tap & Auto-mount) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 group-[.is-playing]:opacity-100 group-active:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 group-[.is-playing]:scale-100 group-active:scale-100">
        {animationOverlay}
      </div>
    </span>
  );
}
