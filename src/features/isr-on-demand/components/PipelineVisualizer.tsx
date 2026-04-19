"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Database, Server, MonitorSmartphone, HardDrive, CheckCircle2, Loader2, Sparkles, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { triggerManualRevalidate } from "../actions/productActions";

interface PipelineVisualizerProps {
  productId: string;
}

export function PipelineVisualizer({ productId }: PipelineVisualizerProps) {
  const [step, setStep] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const router = useRouter();

  const handleSkip = useCallback(async () => {
    setIsSkipped(true);
    setStep(3); // Jump to Revalidation
    await triggerManualRevalidate();
    localStorage.setItem("isr-sync", Date.now().toString());
    setStep(4); // Jump to Complete
    setTimeout(() => router.push("/rendering/isr-on-demand"), 1000);
  }, [router]);

  const steps = [
    { title: "Client Submission", icon: <MonitorSmartphone />, label: "Product packet sent from Browser", description: "Encapsulating data in a POST request..." },
    { title: "Server Processing", icon: <Server />, label: "Next.js Server Action received", description: "Validating inputs and preparing database transaction..." },
    { title: "Database Write", icon: <Database />, label: "Prisma -> PostgreSQL", description: "Atomic insertion of new product record into DB." },
    { title: "Cache Invalidation", icon: <HardDrive />, label: "revalidateTag('products')", description: "Surgical purge of the edge cache entries." },
    { title: "Flow Complete", icon: <CheckCircle2 />, label: "Redistributing Cache", description: "Data is now fresh and ready for global delivery." },
  ];

  useEffect(() => {
    if (isSkipped) return;

    const runPipeline = async () => {
      // Step 0 -> 1
      await new Promise(r => setTimeout(r, 1500));
      if (isSkipped) return;
      setStep(1);

      // Step 1 -> 2
      await new Promise(r => setTimeout(r, 2000));
      if (isSkipped) return;
      setStep(2);

      // Step 2 -> 3
      await new Promise(r => setTimeout(r, 2000));
      if (isSkipped) return;
      setStep(3);
      
      // TRIGGER REVALIDATION HERE
      await triggerManualRevalidate();
      localStorage.setItem("isr-sync", Date.now().toString());

      // Step 3 -> 4
      await new Promise(r => setTimeout(r, 2000));
      if (isSkipped) return;
      setStep(4);

      // FINAL REDIRECT
      await new Promise(r => setTimeout(r, 2000));
      if (isSkipped) return;
      router.push("/rendering/isr-on-demand");
    };

    runPipeline();
  }, [productId, router, isSkipped]);

  return (
    <div className="max-w-4xl mx-auto w-full space-y-20 relative px-4">
      {/* Skip Option */}
      {!isSkipped && step < 4 && (
        <div className="absolute -top-12 right-4 z-50">
          <button 
            onClick={handleSkip}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 transition-all text-[10px] font-black uppercase tracking-widest active:scale-95"
          >
            Skip Animation
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] -z-10" />

      {/* Steps List */}
      <div className="grid grid-cols-1 gap-12">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-8 relative">
            {/* Connection Line */}
            {i < steps.length - 1 && (
              <div className="absolute left-[30px] top-[60px] w-1 h-[80px] bg-zinc-900 overflow-hidden">
                {step > i && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 1 }}
                    className="w-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                  />
                )}
              </div>
            )}

            {/* Node Icon */}
            <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 ${
              step === i ? "bg-blue-600 border-blue-400 scale-125 shadow-[0_0_40px_rgba(59,130,246,0.4)]" : 
              step > i ? "bg-green-600/20 border-green-500/50 scale-100" : "bg-zinc-900 border-zinc-800 opacity-40"
            }`}>
              {step > i ? <CheckCircle2 className="w-8 h-8 text-green-400" /> : 
               step === i ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>{s.icon}</motion.div> : 
               s.icon}
              
              {step === i && (
                <div className="absolute -inset-2 rounded-2xl border border-blue-400/50 animate-ping opacity-20" />
              )}
            </div>

            {/* Content */}
            <div className={`transition-all duration-700 ${step >= i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
              <h3 className={`text-xl font-black italic tracking-tighter uppercase ${step === i ? "text-white" : "text-zinc-500"}`}>
                {s.title}
              </h3>
              <p className="text-sm font-bold text-zinc-400 mb-1">{s.label}</p>
              <p className="text-xs text-zinc-600 max-w-md leading-relaxed">{s.description}</p>
            </div>

            {/* Step Status Indicator */}
            {step === i && (
              <div className="ml-auto flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-3">
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Processing...</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Message */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 p-6 rounded-3xl bg-green-500 text-white shadow-2xl flex items-center gap-4 z-50"
          >
            <Sparkles className="w-6 h-6 animate-bounce" />
            <div>
              <p className="font-black italic uppercase text-lg leading-none">Success!</p>
              <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Redirecting to lab dashboard...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
