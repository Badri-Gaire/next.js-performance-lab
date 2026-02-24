import { cn } from '@/lib/utils';
import { RenderingType } from '../types';

interface RenderingBadgeProps {
  type: RenderingType;
  className?: string;
}

const colors: Record<RenderingType, string> = {
  SSR: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  SSG: 'bg-green-500/10 text-green-500 border-green-500/20',
  ISR: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  CSR: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  PPR: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  RSC: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  CRP: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

export function RenderingBadge({ type, className }: RenderingBadgeProps) {
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
      colors[type],
      className
    )}>
      {type}
    </span>
  );
}
