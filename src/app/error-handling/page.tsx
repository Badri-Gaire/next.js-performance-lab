import { ErrorVisualizer } from '@/features/error-handling/components/ErrorVisualizer';
import { FetchVsAxios } from '@/features/error-handling/components/FetchVsAxios';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Error Handling Lab | Next.js Architecture',
  description: 'Master resilient architecture in Next.js. Compare Fetch vs Axios error handling and learn to implement global error boundaries.',
};

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <section>
        <ErrorVisualizer />
      </section>

      <div className="h-px bg-zinc-900 w-full" />

      <section>
        <FetchVsAxios />
      </section>
    </div>
  );
}
