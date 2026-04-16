'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RenderingBadge } from '@/features/rendering/components/RenderingBadge';
import { RenderingType } from '@/features/rendering/types';

interface NextTopicProps {
  title: string;
  href: string;
  description: string;
  type?: RenderingType;
}

export function NextTopic({ title, href, description, type }: NextTopicProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-32 p-1 rounded-[2.5rem] bg-linear-to-b from-zinc-800 to-zinc-950 border border-zinc-900 shadow-3xl"
    >
      <Link href={href} className="group block">
        <div className="p-8 md:p-10 rounded-[2.2rem] bg-black/40 backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-8 group-hover:bg-blue-600/5 transition-all duration-500">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-blue-400">
                Next Topic
              </div>
              {type && <RenderingBadge type={type} className="px-2 py-0.5 text-[10px]" />}
            </div>
            <h3 id="next-steps" className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              {title}
            </h3>
            <p className="text-zinc-500 font-medium max-w-xl text-lg leading-relaxed">
              {description}
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-500">
              <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-zinc-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
