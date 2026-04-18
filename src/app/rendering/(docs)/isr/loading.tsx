import { Skeleton } from '@/features/rendering/components/Skeleton';

export default function Loading() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-64 rounded-3xl" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden h-[400px]">
            <Skeleton className="aspect-square rounded-none" />
            <div className="p-4 space-y-4">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
