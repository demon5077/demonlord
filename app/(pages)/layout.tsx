'use client';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';
import { usePathname } from 'next/navigation';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div suppressHydrationWarning className="flex min-h-screen w-full flex-col">
      {!isHome && <SiteHeader />}
      <main className="w-full flex-1">{children}</main>
      {!isHome && <Footer />}
    </div>
  );
}
