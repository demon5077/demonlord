'use client';
import { useState, useEffect } from 'react';
import { Heart, Trash2, Play, Film, Tv2, Antenna, Search, Grid, List } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface WatchlistItem {
  id: string;
  title: string;
  type: 'movie' | 'tv' | 'anime';
  poster?: string;
  rating?: number;
  year?: string;
  addedAt: number;
}

const TYPE_ICON = { movie: Film, tv: Tv2, anime: Antenna };
const TYPE_COLOR = {
  movie: 'var(--neon-pink)',
  tv: 'var(--neon-blue)',
  anime: 'var(--neon-purple)',
};
const TYPE_LABEL = { movie: 'Movie', tv: 'TV Show', anime: 'Anime' };

function EmptyState({ filter }: { filter: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl opacity-20"
        style={{ background: 'var(--neon-pink)' }}
      >
        <Heart size={28} className="text-white" />
      </div>
      <p className="text-lg font-bold" style={{ fontFamily: 'Orbitron, monospace' }}>
        {filter === 'all'
          ? 'Your watchlist is empty'
          : `No ${TYPE_LABEL[filter as keyof typeof TYPE_LABEL]}s saved`}
      </p>
      <p
        className="max-w-xs text-center text-sm text-[hsl(var(--muted-foreground))]"
        style={{ fontFamily: 'Rajdhani, sans-serif' }}
      >
        Browse movies, TV shows, and anime then click the bookmark icon to save them here.
      </p>
      <div className="mt-2 flex gap-3">
        <Link href="/movie">
          <button className="btn-neon px-5 py-2 text-xs">Browse Movies</button>
        </Link>
        <Link href="/anime">
          <button className="btn-outline px-5 py-2 text-xs">Browse Anime</button>
        </Link>
      </div>
    </div>
  );
}

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'movie' | 'tv' | 'anime'>('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('demonlord_watchlist');
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const save = (newItems: WatchlistItem[]) => {
    setItems(newItems);
    localStorage.setItem('demonlord_watchlist', JSON.stringify(newItems));
  };

  const remove = (id: string) => save(items.filter((i) => i.id !== id));
  const clearAll = () => {
    if (confirm('Clear your entire watchlist?')) save([]);
  };

  const filtered = items
    .filter((i) => {
      const matchFilter = filter === 'all' || i.type === filter;
      const matchSearch = !search || i.title.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    })
    .sort((a, b) => b.addedAt - a.addedAt);

  const counts = {
    all: items.length,
    movie: items.filter((i) => i.type === 'movie').length,
    tv: items.filter((i) => i.type === 'tv').length,
    anime: items.filter((i) => i.type === 'anime').length,
  };

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'var(--neon-pink)' }}
          >
            <Heart size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black" style={{ fontFamily: 'Orbitron, monospace' }}>
              My Watchlist
            </h1>
            <p
              className="text-xs text-[hsl(var(--muted-foreground))]"
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              {items.length} saved · sorted by newest
            </p>
          </div>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] transition-colors hover:text-red-400"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            <Trash2 size={12} /> Clear all
          </button>
        )}
      </div>

      {items.length > 0 && (
        <>
          {/* Filters + Search + View toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-1 rounded-xl border border-[hsl(var(--border))] p-1">
              {(['all', 'movie', 'tv', 'anime'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-3 py-1.5 text-[0.65rem] tracking-wider transition-all ${
                    filter === f
                      ? 'font-bold text-white'
                      : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }`}
                  style={{
                    fontFamily: 'Share Tech Mono, monospace',
                    background: filter === f ? 'var(--neon-pink)' : 'transparent',
                  }}
                >
                  {f === 'all' ? `All (${counts.all})` : `${TYPE_LABEL[f]} (${counts[f]})`}
                </button>
              ))}
            </div>

            <div className="flex max-w-xs flex-1 items-center gap-2 rounded-xl border border-[hsl(var(--border))] px-3 py-1.5">
              <Search size={13} className="text-[hsl(var(--muted-foreground))]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search watchlist..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[hsl(var(--muted-foreground))]"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              />
            </div>

            <div className="ml-auto flex gap-1">
              <button
                onClick={() => setView('grid')}
                className={`rounded-lg p-2 transition-colors ${view === 'grid' ? 'text-[var(--neon-pink)]' : 'text-[hsl(var(--muted-foreground))]'}`}
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`rounded-lg p-2 transition-colors ${view === 'list' ? 'text-[var(--neon-pink)]' : 'text-[hsl(var(--muted-foreground))]'}`}
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Grid/List view */}
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-[hsl(var(--muted-foreground))]">
              No results for "{search}"
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((item) => {
                const Icon = TYPE_ICON[item.type];
                const color = TYPE_COLOR[item.type];
                const href = `/${item.type === 'tv' ? 'tv' : item.type}/${item.id}`;
                return (
                  <div key={item.id} className="group relative">
                    <Link href={href}>
                      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all group-hover:border-[var(--neon-pink)]">
                        {item.poster ? (
                          <Image
                            fill
                            src={item.poster}
                            alt={item.title}
                            sizes="200px"
                            className="object-cover brightness-90 transition-all group-hover:brightness-100"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Icon size={24} style={{ color }} className="opacity-50" />
                          </div>
                        )}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 translate-y-full p-2 transition-transform duration-200 group-hover:translate-y-0">
                          <p className="truncate text-xs font-semibold text-white">{item.title}</p>
                        </div>
                        <div className="absolute top-2 left-2">
                          <span
                            className="rounded-full px-1.5 py-0.5 text-[0.5rem] font-bold tracking-wider text-white"
                            style={{ background: color, fontFamily: 'Share Tech Mono, monospace' }}
                          >
                            {TYPE_LABEL[item.type]}
                          </span>
                        </div>
                        {item.rating && (
                          <div
                            className="absolute top-2 right-2 rounded-full bg-black/70 px-1.5 py-0.5 text-[0.55rem] text-yellow-400"
                            style={{ fontFamily: 'Share Tech Mono, monospace' }}
                          >
                            ★ {item.rating.toFixed(1)}
                          </div>
                        )}
                      </div>
                    </Link>
                    <button
                      onClick={() => remove(item.id)}
                      className="absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-red-600"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((item) => {
                const Icon = TYPE_ICON[item.type];
                const color = TYPE_COLOR[item.type];
                const href = `/${item.type === 'tv' ? 'tv' : item.type}/${item.id}`;
                return (
                  <div key={item.id} className="card-cyber flex items-center gap-4 p-3">
                    {item.poster ? (
                      <Image
                        src={item.poster}
                        alt={item.title}
                        width={48}
                        height={72}
                        className="shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-16 w-12 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: 'color-mix(in srgb,' + color + ' 10%, transparent)' }}
                      >
                        <Icon size={18} style={{ color }} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{item.title}</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[0.55rem] tracking-wider text-white"
                          style={{ background: color, fontFamily: 'Share Tech Mono, monospace' }}
                        >
                          {TYPE_LABEL[item.type]}
                        </span>
                        {item.year && (
                          <span className="text-xs text-[hsl(var(--muted-foreground))]">
                            {item.year}
                          </span>
                        )}
                        {item.rating && (
                          <span className="text-xs text-yellow-400">
                            ★ {item.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Link href={href}>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--border))] transition-all hover:border-[var(--neon-pink)] hover:text-[var(--neon-pink)]">
                          <Play size={13} />
                        </button>
                      </Link>
                      <button
                        onClick={() => remove(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--border))] transition-all hover:border-red-400 hover:text-red-400"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {items.length === 0 && <EmptyState filter={filter} />}
    </div>
  );
}
