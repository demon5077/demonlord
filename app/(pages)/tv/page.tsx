'use client';
import { useState } from 'react';
import FeaturedTV from '@/components/featured/tv';
import { Tv2 } from 'lucide-react';

const TABS = [
  { key: 'popular', label: 'POPULAR' },
  { key: 'toprated', label: 'TOP RATED' },
  { key: 'ontheair', label: 'ON THE AIR' },
  { key: 'airingtoday', label: 'AIRING TODAY' },
] as const;

type Tab = typeof TABS[number]['key'];

export default function TVPage() {
  const [active, setActive] = useState<Tab>('popular');
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <div className="border border-[hsl(185_100%_48%/0.4)] p-2">
          <Tv2 size={18} className="text-[hsl(185_100%_48%)]" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-[0.15em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>TV SHOWS</h1>
          <p className="text-[0.6rem] tracking-widest text-muted-foreground uppercase" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            POWERED BY TMDB // STREAMING DATABASE
          </p>
        </div>
      </div>
      <div className="flex border-b border-[hsl(var(--border))] gap-0">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 text-[0.6rem] tracking-widest uppercase border-b-2 -mb-px transition-all ${
              active === tab.key
                ? 'border-[hsl(185_100%_48%)] text-[hsl(185_100%_48%)]'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <FeaturedTV featureType={active} />
    </div>
  );
}
