import FeaturedAnime from '@/components/featured/anime';
import Carousal from '@/components/carousal/anime';
import AnimeTabClient from '@/components/containers/anime/tab-client';
import { Antenna } from 'lucide-react';

export default function AnimePage() {
  return (
    <div className="space-y-0">
      <Carousal />
      <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 md:px-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: 'var(--neon-purple)' }}
          >
            <Antenna size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black" style={{ fontFamily: 'Orbitron, monospace' }}>
              Anime
            </h1>
            <p
              className="text-xs text-[hsl(var(--muted-foreground))]"
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              Powered by AniList · Sub & Dub
            </p>
          </div>
        </div>
        <AnimeTabClient />
      </div>
    </div>
  );
}
