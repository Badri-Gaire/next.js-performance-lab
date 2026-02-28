'use client';

// DiffStepper visualizes the steps of a VDOM diff operation.
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Cpu, Layers, Zap, Code, Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  icon: typeof Cpu; // any lucide icon component
  color: string;
  bg: string;
}

const steps: Step[] = [
  {
    id: 'event',
    title: 'User Event',
    icon: Cpu,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    id: 'state',
    title: 'State Update',
    icon: Layers,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    id: 'vdom',
    title: 'New VDOM',
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    id: 'diff',
    title: 'Diff',
    icon: Code,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    id: 'patch',
    title: 'Patch DOM',
    icon: Check,
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
  },
];

export function DiffStepper({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      {steps.map((step, i) => {
        const isActive = activeStep === i;
        const isPast = activeStep > i;
        return (
          <motion.button
            key={step.id}
            className={cn(
              'flex-1 p-3 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2',
              isActive
                ? `bg-zinc-800 border-${step.color.split('-')[1]}-500/30 scale-105 shadow-xl`
                : isPast
                ? `bg-zinc-900/50 border-${step.color.split('-')[1]}-500/20 opacity-80`
                : `bg-zinc-900/30 border-zinc-800 hover:border-${step.color.split('-')[1]}-500/30`
            )}
          >
            <step.icon className={cn('w-6 h-6', isActive ? step.color : 'text-zinc-600')} />
            <span className={cn('text-sm font-medium', isActive ? step.color : 'text-zinc-500')}>{step.title}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
