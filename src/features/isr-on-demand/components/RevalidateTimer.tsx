"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface RevalidateTimerProps {
  ttlSeconds: number;
}

export function RevalidateTimer({ ttlSeconds }: RevalidateTimerProps) {
  const [timeLeft, setTimeLeft] = useState(ttlSeconds);
  const [status, setStatus] = useState<"FRESH" | "STALE">("FRESH");

  useEffect(() => {
    setTimeLeft(ttlSeconds);
    setStatus("FRESH");
  }, [ttlSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus("STALE");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Cache Integrity</span>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-black italic ${status === "FRESH" ? "text-green-400" : "text-orange-500 animate-pulse"}`}>
            {status}
          </span>
          <div className={`w-2 h-2 rounded-full ${status === "FRESH" ? "bg-green-500" : "bg-orange-500"}`} />
        </div>
      </div>

      <div className="h-8 w-px bg-zinc-800" />

      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Next Revalidate</span>
        <div className="flex items-center gap-2">
          <Clock className={`w-3 h-3 ${status === "STALE" ? "text-orange-500" : "text-zinc-400"}`} />
          <span className="text-sm font-black text-white font-mono">{timeLeft}s</span>
        </div>
      </div>
    </div>
  );
}
