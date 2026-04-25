import SearchHeader from '@/components/containers/search-bar';
import { Search } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="min-h-[80vh] p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="border border-[hsl(185_100%_48%/0.4)] p-2">
            <Search size={16} className="text-[hsl(185_100%_48%)]" />
          </div>
          <h1 className="text-2xl font-black tracking-[0.15em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>
            SEARCH
          </h1>
        </div>
        <p className="text-[0.6rem] tracking-[0.2em] text-muted-foreground pl-12 uppercase" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          QUERY MOVIES // TV SHOWS // ANIME — POWERED BY TMDB + ANILIST
        </p>
      </div>
      <SearchHeader />
    </div>
  );
}
