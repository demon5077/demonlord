import FeaturedAnime from '@/components/featured/anime';
import Carousal from '@/components/carousal/anime';
import AnimeTabClient from '@/components/containers/anime/tab-client';
import { Antenna } from 'lucide-react';

export default function AnimePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <div className="border border-[#BD00FF]/30 p-2">
          <Antenna size={18} style={{ color: '#BD00FF' }} />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-[0.15em] uppercase"
            style={{ fontFamily: 'Orbitron, monospace' }}>ANIME</h1>
          <p className="text-[0.6rem] tracking-widest text-white/30 uppercase"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            POWERED BY HIANIME // ANILIST DATABASE
          </p>
        </div>
      </div>
      {/* Server component — safe to be async */}
      <Carousal />
      {/* Client tabs + featured grid */}
      <AnimeTabClient />
    </div>
  );
}
