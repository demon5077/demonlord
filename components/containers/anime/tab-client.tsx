'use client';
import { useState } from 'react';
import FeaturedAnime from '@/components/featured/anime';

const TABS = [
  { key: 'trending', label: 'TRENDING' },
  { key: 'popular', label: 'POPULAR' },
  { key: 'recent', label: 'RECENT' },
] as const;
type Tab = typeof TABS[number]['key'];

export default function AnimeTabClient() {
  const [active, setActive] = useState<Tab>('trending');
  return (
    <>
      <div className="flex border-b border-white/8 gap-0">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActive(tab.key)}
            className={`px-4 py-2 text-[0.6rem] tracking-widest uppercase border-b-2 -mb-px transition-all ${
              active === tab.key
                ? 'border-[#BD00FF] text-[#BD00FF]'
                : 'border-transparent text-white/30 hover:text-white/60'
            }`}
            style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            {tab.label}
          </button>
        ))}
      </div>
      <FeaturedAnime featureType={active} />
    </>
  );
}
