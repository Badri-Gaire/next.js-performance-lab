"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * A hidden utility component that refreshes the Iframe context 
 * when it detects a change from the Admin Portal.
 */
export function IframeSync() {
  const router = useRouter();

  useEffect(() => {
    const handleSync = (event: StorageEvent) => {
      if (event.key === "isr-sync") {
        console.log("Sync event detected. Refreshing Iframe...");
        router.refresh();
      }
    };

    window.addEventListener("storage", handleSync);
    return () => window.removeEventListener("storage", handleSync);
  }, [router]);

  return null;
}
