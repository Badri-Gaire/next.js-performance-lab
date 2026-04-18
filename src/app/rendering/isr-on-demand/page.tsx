import { IsrDemoContainer } from "@/features/isr-on-demand/components/IsrDemoContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "On-Demand ISR Lab | Performance Architecture",
  description: "Experience Incremental Static Regeneration with real-time webhook simulations and cache purging.",
};

export default function IsrOnDemandPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-16 text-[10px] font-black uppercase tracking-widest text-zinc-600 px-4">
          <span>Labs</span>
          <span className="text-zinc-800">/</span>
          <span>Rendering</span>
          <span className="text-zinc-800">/</span>
          <span className="text-white">ISR on Demand</span>
        </div>

        <IsrDemoContainer />
      </div>
    </main>
  );
}
