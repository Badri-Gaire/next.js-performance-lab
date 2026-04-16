import { ErrorVisualizer } from '@/features/error-handling/components/ErrorVisualizer';
import { FetchVsAxios } from '@/features/error-handling/components/FetchVsAxios';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Error Handling Lab | Next.js Architecture',
  description: 'Master resilient architecture in Next.js. Compare Fetch vs Axios error handling and learn to implement global error boundaries.',
};

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-7xl mx-auto  space-y-20">
      <section>
        <ErrorVisualizer />
      </section>

      <div className="h-px bg-zinc-900 w-full" />

      <section>
        <FetchVsAxios />
      </section>
       <NextTopic 
              title="Mastery Dashboard"
              href="/"
              description="Explore more performance strategies and architectural deep-dives."
            />
    </div>
  );
}
