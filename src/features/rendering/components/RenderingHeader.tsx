import { RenderingType } from '../types';
import { RenderingBadge } from './RenderingBadge';
import { formatDate } from '@/lib/utils';
import { Clock, Cpu, Layout } from 'lucide-react';

interface RenderingHeaderProps {
  type: RenderingType;
  title: string;
  description: string;
  strategyMarkdown: string;
}

export function RenderingHeader({ type, title, description, strategyMarkdown }: RenderingHeaderProps) {
  const timestamp = new Date();

  return (
    <div className="mb-12 p-8 rounded-3xl bg-zinc-950 border border-zinc-900 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <RenderingBadge type={type} />
            <span 
              className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium"
              suppressHydrationWarning
            >
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              {formatDate(timestamp)}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {title}
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800">
             <span className="block text-[10px] uppercase text-zinc-500 font-bold mb-0.5 tracking-wider">Rendering Env</span>
             <span className="text-sm font-semibold text-blue-400">
               {type === 'CSR' ? 'Client Runtime' : 'Server Runtime'}
             </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-blue-500/30 transition-colors group">
          <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-blue-500" />
            Strategy Details
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-medium">
            {strategyMarkdown}
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-purple-500/30 transition-colors group">
          <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2 mb-3">
            <Layout className="w-4 h-4 text-purple-400" />
            Hydration Logic
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-medium">
            {type === 'CSR' 
              ? "Initialized as an empty shell. React takes over complete control after the JS bundle loads."
              : "Pre-rendered HTML is sent to the client, then React 'hydrates' it to enable full interactivity."
            }
          </p>
        </div>
      </div>
    </div>
  );
}
