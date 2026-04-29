'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skull, Search, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function SiteHeader() {
  const isMobile = useIsMobile();
  const { resolvedTheme, setTheme } = useTheme();
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const mono = { fontFamily: 'Share Tech Mono, monospace' } as const;

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-[hsl(var(--border))] px-4 lg:px-5">
      {isMobile ? (
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md"
            style={{ background: 'var(--neon-pink)' }}
          >
            <Skull size={12} className="text-white" />
          </div>
          <span
            className="text-xs font-black tracking-widest text-[var(--neon-pink)]"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            DL
          </span>
        </Link>
      ) : (
        <SidebarTrigger className="rounded-md transition-colors hover:bg-[hsl(var(--muted))]" />
      )}

      {/* Live dot */}
      <div className="ml-1 hidden items-center gap-1.5 md:flex">
        <div
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ background: 'var(--neon-green)' }}
        />
        <span className="text-[0.48rem] tracking-widest opacity-50" style={mono}>
          LIVE
        </span>
      </div>

      <div className="flex-1" />

      {/* Clock */}
      {mounted && (
        <span
          className="hidden text-[0.52rem] tracking-widest tabular-nums opacity-30 lg:block"
          style={mono}
        >
          {time}
        </span>
      )}

      {/* Search shortcut */}
      <Link
        href="/search"
        className="hidden items-center gap-1.5 rounded-md border border-[hsl(var(--border))] px-2.5 py-1.5 text-[0.5rem] tracking-widest text-[hsl(var(--muted-foreground))] transition-all hover:border-[var(--neon-pink)] hover:text-[var(--neon-pink)] md:flex"
        style={mono}
      >
        <Search size={10} /> SEARCH
      </Link>

      {/* Theme toggle */}
      {mounted && (
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] transition-all hover:border-[var(--neon-pink)] hover:text-[var(--neon-pink)]"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={13} /> : <Moon size={13} />}
        </button>
      )}
    </header>
  );
}
