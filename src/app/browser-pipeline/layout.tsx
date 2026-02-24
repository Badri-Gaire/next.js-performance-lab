import { FeatureNavigator } from '@/features/shared/components/FeatureNavigator';
import { DocsMobileNav } from '@/features/shared/components/DocsMobileNav';

export default function BrowserPipelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <DocsMobileNav />
      <div className="flex flex-1 gap-12 relative">
        {/* Left Sidebar - Navigation */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto pr-4 border-r border-zinc-900">
          <FeatureNavigator />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-20">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
