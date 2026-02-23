'use client';

import { motion } from 'framer-motion';
import { Database, Cloud, Monitor, ArrowDown, Globe, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CachingHierarchy() {
  const levels = [
    { 
      id: 'server',
      title: 'Origin Server', 
      icon: Database, 
      color: 'blue',
      cache: 'Data Cache',
      desc: 'Database & Redis caching. Next.js "fetch()" cache persists here.' 
    },
    { 
      id: 'cdn',
      title: 'Global CDN (Edge)', 
      icon: Cloud, 
      color: 'purple',
      cache: 'Edge Cache',
      desc: 'Cached HTML/Images at locations nearest to users (e.g., Tokyo, NYC).' 
    },
    { 
      id: 'browser',
      title: 'Browser Memory', 
      icon: Monitor, 
      color: 'green',
      cache: 'Local Cache',
      desc: 'Assets stored locally on your device for instant repeat visits.' 
    }
  ];

  return (
    <div className="space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">The Multi-Level Cache</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
           Speed isn&apos;t just about rendering; it&apos;s about ensuring data never has to travel 
           to the server if someone else has already seen it.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative px-6 md:px-0">
        {/* Connector Line */}
        <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-linear-to-b from-blue-500/20 via-purple-500/20 to-green-500/20 -translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {levels.map((level, i) => (
            <motion.div 
              key={level.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative"
            >
              <div className={cn(
                "flex flex-col md:flex-row items-center gap-8 md:gap-16",
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              )}>
                {/* Visual Icon Box */}
                <div className="flex-1 flex justify-center md:justify-end md:group-odd:justify-start">
                   <div className={cn(
                     "relative p-8 rounded-3xl bg-zinc-950 border transition-all duration-700 group hover:scale-105",
                     level.color === 'blue' && "border-blue-500/20 shadow-blue-500/5",
                     level.color === 'purple' && "border-purple-500/20 shadow-purple-500/5",
                     level.color === 'green' && "border-green-500/20 shadow-green-500/5"
                   )}>
                      <div className={cn(
                        "absolute -inset-1 blur opacity-20 group-hover:opacity-40 transition-opacity rounded-[2.2rem]",
                        level.color === 'blue' && "bg-blue-600",
                        level.color === 'purple' && "bg-purple-600",
                        level.color === 'green' && "bg-green-600"
                      )} />
                      <level.icon className={cn(
                        "w-12 h-12 relative z-10 transition-transform group-hover:rotate-12",
                        level.color === 'blue' && "text-blue-500",
                        level.color === 'purple' && "text-purple-500",
                        level.color === 'green' && "text-green-500"
                      )} />
                      <div className="absolute -top-3 -right-3 h-6 px-3 rounded-full bg-zinc-900 border border-zinc-800 text-[9px] font-black text-white uppercase tracking-widest flex items-center justify-center shadow-xl">
                        {level.cache}
                      </div>
                   </div>
                </div>

                {/* Content Box */}
                <div className="flex-1 text-center md:text-left">
                   <h3 className="text-2xl font-black text-white mb-2">{level.title}</h3>
                   <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
                     {level.desc}
                   </p>
                   <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                      <span className="px-2 py-1 rounded-md bg-zinc-900 text-[10px] font-mono text-zinc-600">
                        {level.id === 'server' ? 'Server-Cache-Control' : level.id === 'cdn' ? 'Edge-Cache-Control' : 'Cache-Control'}
                      </span>
                   </div>
                </div>
              </div>
              
              {i < levels.length - 1 && (
                <div className="flex justify-center my-6 md:hidden">
                   <ArrowDown className="w-6 h-6 text-zinc-800" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global vs Personal Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-24">
         <div className="p-8 rounded-[2.5rem] bg-linear-to-br from-zinc-900 to-black border border-zinc-800 space-y-6">
            <div className="flex items-center gap-3">
               <Globe className="w-5 h-5 text-blue-400" />
               <h4 className="text-lg font-black text-white uppercase tracking-widest">Global CDN Data</h4>
            </div>
            <p className="text-xs text-zinc-500 font-medium leading-relaxed">
               For SSG and ISR pages. Data is <strong>Global</strong>—the same for every user on earth. 
               This is cached on the Edge Network so it never hits your server.
            </p>
            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 text-[10px] font-black text-green-500 uppercase tracking-widest text-center">
               Safe for CDN (Cache-Control: public)
            </div>
         </div>

         <div className="p-8 rounded-[2.5rem] bg-linear-to-br from-zinc-900 to-black border border-zinc-800 space-y-6">
            <div className="flex items-center gap-3">
               <Zap className="w-5 h-5 text-purple-400" />
               <h4 className="text-lg font-black text-white uppercase tracking-widest">Personalized Data</h4>
            </div>
            <p className="text-xs text-zinc-500 font-medium leading-relaxed">
               Data that belongs to a specific user (Account details, carts). 
               Must <strong>Bypass CDN</strong> to prevent data leaking between users.
            </p>
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-[10px] font-black text-red-500 uppercase tracking-widest text-center">
               Dynamic Only (Cache-Control: private)
            </div>
         </div>
      </div>
    </div>
  );
}
