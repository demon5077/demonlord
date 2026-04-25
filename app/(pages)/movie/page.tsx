'use client';
import { useState } from 'react';
import Featured from '@/components/featured/movie';
import { Film } from 'lucide-react';

const TABS = [
  { key: 'popular', label: 'POPULAR' },
  { key: 'nowplaying', label: 'NOW PLAYING' },
  { key: 'toprated', label: 'TOP RATED' },
  { key: 'upcoming', label: 'UPCOMING' },
] as const;

type Tab = typeof TABS[number]['key'];

export default function MoviesPage() {
  const [active, setActive] = useState<Tab>('popular');
  return (
    <div className="space-y-6 p-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="border border-[hsl(350_100%_58%/0.4)] p-2">
          <Film size={18} className="text-[hsl(350_100%_58%)]" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-[0.15em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>MOVIES</h1>
          <p className="text-[0.6rem] tracking-widest text-muted-foreground uppercase" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            POWERED BY TMDB // {new Date().getFullYear()} DATABASE
          </p>
        </div>
      </div>
      {/* Tab bar */}
      <div className="flex border-b border-[hsl(var(--border))] gap-0">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 text-[0.6rem] tracking-widest uppercase border-b-2 -mb-px transition-all ${
              active === tab.key
                ? 'border-[hsl(350_100%_58%)] text-[hsl(350_100%_62%)]'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Grid */}
      <Featured featureType={active} />
    </div>
  );
}
