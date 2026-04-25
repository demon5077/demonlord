'use client';
import { useState } from 'react';
import { useSearch } from '@/hooks/use-search';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, ImageIcon, Star, Film, Tv, Antenna } from 'lucide-react';

const CATEGORIES = [
  { key: 'movie', label: 'MOVIES', icon: Film, color: 'hsl(350 100% 58%)' },
  { key: 'tv', label: 'TV SHOWS', icon: Tv, color: 'hsl(185 100% 48%)' },
  { key: 'anime', label: 'ANIME', icon: Antenna, color: 'hsl(280 100% 68%)' },
] as const;

type Category = 'movie' | 'tv' | 'anime';

const SearchHeader = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('movie');
  const { results, isLoading } = useSearch(query, category);
  const cat = CATEGORIES.find(c => c.key === category)!;

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div className="flex gap-0 border-b border-[hsl(var(--border))]">
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-[0.6rem] tracking-widest uppercase border-b-2 -mb-px transition-all ${
              category === c.key
                ? 'border-current'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            style={{
              fontFamily: 'Share Tech Mono, monospace',
              color: category === c.key ? c.color : undefined,
              borderColor: category === c.key ? c.color : undefined,
            }}
          >
            <c.icon size={11} />
            {c.label}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="flex gap-0">
        <div
          className="flex flex-1 items-center border hover:border-current focus-within:border-current transition-colors"
          style={{ borderColor: `${cat.color}33` }}
        >
          <span
            className="pl-4 text-[0.7rem]"
            style={{ fontFamily: 'Share Tech Mono, monospace', color: cat.color }}
          >
            &gt;_
          </span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`SEARCH ${cat.label}...`}
            className="flex-1 bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-muted-foreground/40"
            style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.8rem', letterSpacing: '0.05em' }}
            autoFocus
          />
          {isLoading && (
            <div className="mr-4 h-4 w-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: cat.color, borderTopColor: 'transparent' }} />
          )}
        </div>
        <button
          className="flex items-center gap-2 px-5 py-3 text-white transition-all hover:opacity-90"
          style={{ background: cat.color, fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em' }}
        >
          <Search size={13} />
          SCAN
        </button>
      </div>

      {/* Results */}
      {query && (
        <div className="space-y-2">
          {/* Result count */}
          <div
            className="text-[0.6rem] tracking-widest text-muted-foreground uppercase"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            {isLoading ? 'SCANNING...' : `${results?.length || 0} SIGNALS FOUND`}
          </div>

          {/* Grid */}
          {results && results.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {results.map((item: any) => {
                const title = item.title || item.name || 'Unknown';
                const poster = item.poster_path
                  ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                  : item.image || null;
                const href = category === 'anime'
                  ? `/anime/${item.id}`
                  : `/${category}/${item.id}`;

                return (
                  <Link key={item.id} href={href} className="group">
                    <div
                      className="relative aspect-[2/3] overflow-hidden border border-[hsl(var(--border))] transition-all"
                      style={{ '--hover-border': cat.color } as any}
                    >
                      {poster ? (
                        <Image
                          fill src={poster} alt={title} sizes="200px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105 brightness-90"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[hsl(var(--muted))]">
                          <ImageIcon size={20} className="text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.vote_average > 0 && (
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/70 px-1.5 py-0.5" style={{ border: `1px solid ${cat.color}44` }}>
                          <Star size={7} style={{ color: cat.color }} className="fill-current" />
                          <span className="text-[0.6rem]" style={{ fontFamily: 'Share Tech Mono, monospace', color: cat.color }}>
                            {(item.vote_average || item.rating / 10 || 0).toFixed(1)}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-xs font-semibold text-white truncate" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                          {title}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {!isLoading && results?.length === 0 && query.length > 2 && (
            <div className="flex flex-col items-center py-16 gap-3">
              <span className="text-4xl opacity-20">
                {category === 'anime' ? '⚡' : category === 'tv' ? '📡' : '🎬'}
              </span>
              <span
                className="text-[0.65rem] tracking-widest text-muted-foreground uppercase"
                style={{ fontFamily: 'Share Tech Mono, monospace' }}
              >
                NO SIGNALS FOUND FOR "{query.toUpperCase()}"
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
