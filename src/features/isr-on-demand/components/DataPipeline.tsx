"use client";

import { motion } from "framer-motion";
import { Database, Server, MonitorSmartphone, HardDrive } from "lucide-react";

interface DataPipelineProps {
  isAdding: boolean;
  isRevalidating: boolean;
  cacheStatus: string;
}

export function DataPipeline({ isAdding, isRevalidating, cacheStatus }: DataPipelineProps) {
  return (
    <div className="w-full bg-zinc-950/50 border-2 border-dashed border-zinc-800 rounded-[2.5rem] p-8 overflow-hidden relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full">
        
        {/* Client */}
        <Node 
          title="Client App" 
          icon={<MonitorSmartphone />} 
          active={isAdding} 
          color="text-white" 
          bgColor="bg-zinc-900" 
          borderColor="border-zinc-700" 
          className="w-full max-w-xs"
        />
        
        <Path active={isAdding} label="POST /api/products" className="h-12" />

        {/* Server Action */}
        <Node 
          title="Next.js Server Action" 
          icon={<Server />} 
          active={isAdding || isRevalidating} 
          color="text-purple-400" 
          bgColor="bg-purple-500/10" 
          borderColor="border-purple-500/30" 
          className="w-full max-w-xs"
        />

        {/* Split to DB and Cache */}
        <div className="flex w-full mt-2 relative justify-center h-24">
           {/* Horizontal splitting line */}
           <div className={`absolute top-0 w-1/2 h-0.5 border-t-2 ${isAdding ? 'border-dashed border-green-500/50' : 'border-zinc-800'} transition-colors left-1/4 rounded-t-xl`} />
           
           <div className="flex justify-between w-full max-w-sm px-4">
              <div className="flex flex-col items-center">
                <Path active={isAdding} label="INSERT" className="h-10" />
                <Node 
                  title="PostgreSQL" 
                  icon={<Database />} 
                  active={isAdding} 
                  color="text-green-400" 
                  bgColor="bg-green-500/10" 
                  borderColor="border-green-500/30" 
                  className="w-32"
                />
              </div>
              
              <div className="flex flex-col items-center">
                <Path active={isRevalidating || isAdding} label="revalidateTag" className="h-10" />
                <Node 
                  title="Edge Cache" 
                  icon={<HardDrive />} 
                  active={isRevalidating || cacheStatus === 'Updating'} 
                  color={cacheStatus === 'Fresh' ? 'text-green-400' : cacheStatus === 'Stale' ? 'text-orange-400' : 'text-blue-400'} 
                  bgColor={cacheStatus === 'Fresh' ? 'bg-green-500/10' : cacheStatus === 'Stale' ? 'bg-orange-500/10' : 'bg-blue-500/10'} 
                  borderColor={cacheStatus === 'Fresh' ? 'border-green-500/30' : cacheStatus === 'Stale' ? 'border-orange-500/30' : 'border-blue-500/30'} 
                  className="w-32"
                />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

function Node({ title, icon, active, color, bgColor, borderColor, className = "" }: any) {
  return (
    <div className={`relative flex items-center justify-center gap-3 p-4 rounded-2xl border ${borderColor} ${bgColor} transition-all duration-500 z-10 ${active ? 'scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'scale-100'} ${className}`}>
      <div className={`${color} ${active ? 'animate-pulse' : ''}`}>{icon}</div>
      <span className={`font-black text-[10px] sm:text-xs uppercase tracking-widest ${color}`}>{title}</span>
    </div>
  );
}

function Path({ active, label, className = "h-8" }: any) {
  return (
    <div className={`flex flex-col items-center justify-center ${className} relative w-full`}>
      <div className={`w-0.5 h-full ${active ? 'bg-blue-500/50' : 'bg-zinc-800'} transition-colors duration-500 relative overflow-hidden`}>
        {active && (
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-blue-400 shadow-[0_0_10px_#60A5FA]"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          />
        )}
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 bg-zinc-950 px-3 py-1 text-[9px] font-black tracking-widest uppercase text-zinc-400 border border-zinc-800 rounded-full whitespace-nowrap z-20 shadow-xl">
        {label}
      </div>
    </div>
  );
}
