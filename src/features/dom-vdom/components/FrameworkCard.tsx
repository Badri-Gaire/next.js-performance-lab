// FrameworkCard displays a small info card about a rendering framework.
import { cn } from '@/lib/utils';
import { Cpu } from 'lucide-react';

interface FrameworkCardProps {
  name: string;
  description: string;
  icon: typeof Cpu; // any lucide icon component
  color: string; // tailwind text color class, e.g., 'text-purple-400'
  bg: string; // background class, e.g., 'bg-purple-500/10'
}

export function FrameworkCard({ name, description, icon: Icon, color, bg }: FrameworkCardProps) {
  return (
    <div className={cn('p-4 rounded-xl border border-zinc-800 hover:shadow-lg transition-shadow', bg)}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className={cn('w-5 h-5', color)} />
        <h3 className={cn('text-lg font-bold', color)}>{name}</h3>
      </div>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  );
}
