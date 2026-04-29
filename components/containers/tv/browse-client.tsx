'use client';
import { useState } from 'react';
import FeaturedTV from '@/components/featured/tv';
import { Tv2, TrendingUp, Radio, Star, Zap } from 'lucide-react';

const TABS = [
  { key: 'popular', label: 'Popular', icon: TrendingUp },
  { key: 'toprated', label: 'Top Rated', icon: Star },
  { key: 'ontheair', label: 'On The Air', icon: Radio },
  { key: 'airingtoday', label: 'Airing Today', icon: Zap },
] as const;
type Tab = (typeof TABS)[number]['key'];

export default function TVBrowseClient() {
  const [active, setActive] = useState<Tab>('popular');
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 md:px-6">
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: 'var(--neon-blue)' }}
        >
          <Tv2 size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black" style={{ fontFamily: 'Orbitron, monospace' }}>
            TV Shows
          </h1>
          <p
            className="text-xs text-[hsl(var(--muted-foreground))]"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            Powered by TMDB · Stream every season
          </p>
        </div>
      </div>
      <div className="flex w-fit flex-wrap gap-1 rounded-xl border border-[hsl(var(--border))] p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                active === tab.key
                  ? 'text-white'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              }`}
              style={{ background: active === tab.key ? 'var(--neon-blue)' : 'transparent' }}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <FeaturedTV featureType={active} />
    </div>
  );
}
