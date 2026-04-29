'use client';
import { useState, useEffect } from 'react';
import { Clock, Trash2, Play, Film, Tv2, Antenna, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HistoryItem {
  id: string;
  title: string;
  type: 'movie' | 'tv' | 'anime';
  poster?: string;
  rating?: number;
  episode?: number;
  season?: number;
  progress?: number; // 0-100
  watchedAt: number;
}

const TYPE_COLOR = {
  movie: 'var(--neon-pink)',
  tv: 'var(--neon-blue)',
  anime: 'var(--neon-purple)',
};
const TYPE_ICON = { movie: Film, tv: Tv2, anime: Antenna };
const TYPE_LABEL = { movie: 'Movie', tv: 'TV Show', anime: 'Anime' };

function timeAgo(ms: number) {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return 'Just now';
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<'all' | 'movie' | 'tv' | 'anime'>('all');

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('demonlord_history');
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const save = (next: HistoryItem[]) => {
    setItems(next);
    localStorage.setItem('demonlord_history', JSON.stringify(next));
  };

  const remove = (id: string, watchedAt: number) =>
    save(items.filter((i) => !(i.id === id && i.watchedAt === watchedAt)));

  const clearAll = () => {
    if (confirm('Clear all watch history?')) save([]);
  };

  const filtered = items
    .filter((i) => filter === 'all' || i.type === filter)
    .sort((a, b) => b.watchedAt - a.watchedAt);

  // Group by date
  const grouped: Record<string, HistoryItem[]> = {};
  filtered.forEach((item) => {
    const d = new Date(item.watchedAt);
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);
    let key: string;
    if (d.toDateString() === today.toDateString()) key = 'Today';
    else if (d.toDateString() === yesterday.toDateString()) key = 'Yesterday';
    else key = d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'var(--neon-blue)' }}
          >
            <Clock size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black" style={{ fontFamily: 'Orbitron, monospace' }}>
              Watch History
            </h1>
            <p
              className="text-xs text-[hsl(var(--muted-foreground))]"
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              {items.length} titles watched
            </p>
          </div>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] transition-colors hover:text-red-400"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            <Trash2 size={12} /> Clear history
          </button>
        )}
      </div>

      {items.length > 0 && (
        <div className="flex w-fit gap-1 rounded-xl border border-[hsl(var(--border))] p-1">
          {(['all', 'movie', 'tv', 'anime'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-[0.65rem] tracking-wider transition-all ${
                filter === f ? 'font-bold text-white' : 'text-[hsl(var(--muted-foreground))]'
              }`}
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                background: filter === f ? 'var(--neon-blue)' : 'transparent',
              }}
            >
              {f === 'all' ? 'All' : TYPE_LABEL[f]}
            </button>
          ))}
        </div>
      )}

      {Object.entries(grouped).map(([date, dateItems]) => (
        <div key={date} className="space-y-2">
          <p
            className="text-[0.6rem] tracking-widest text-[hsl(var(--muted-foreground))] uppercase"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            {date}
          </p>
          <div className="space-y-2">
            {dateItems.map((item) => {
              const Icon = TYPE_ICON[item.type];
              const color = TYPE_COLOR[item.type];
              const href =
                item.type === 'anime'
                  ? `/anime/watch/${item.id}/${item.episode ?? 1}`
                  : item.type === 'tv'
                    ? `/tv/watch/${item.id}`
                    : `/movie/watch/${item.id}`;

              return (
                <div
                  key={`${item.id}-${item.watchedAt}`}
                  className="card-cyber group flex items-center gap-4 p-3"
                >
                  {/* Poster / icon */}
                  {item.poster ? (
                    <Image
                      src={item.poster}
                      alt={item.title}
                      width={44}
                      height={66}
                      className="shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-14 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `color-mix(in srgb, ${color} 12%, transparent)` }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.title}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[0.5rem] font-bold tracking-wider text-white"
                        style={{ background: color, fontFamily: 'Share Tech Mono, monospace' }}
                      >
                        {TYPE_LABEL[item.type]}
                      </span>
                      {item.season && (
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">
                          S{item.season} E{item.episode}
                        </span>
                      )}
                      {item.rating && (
                        <span className="text-xs text-yellow-400">★ {item.rating.toFixed(1)}</span>
                      )}
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">
                        {timeAgo(item.watchedAt)}
                      </span>
                    </div>
                    {item.progress !== undefined && (
                      <div className="mt-1.5 h-1 w-full max-w-[160px] overflow-hidden rounded-full bg-[hsl(var(--muted))]">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${item.progress}%`, background: color }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link href={href}>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--border))] transition-all hover:border-[var(--neon-blue)] hover:text-[var(--neon-blue)]">
                        <RotateCcw size={13} />
                      </button>
                    </Link>
                    <button
                      onClick={() => remove(item.id, item.watchedAt)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--border))] transition-all hover:border-red-400 hover:text-red-400"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-24">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl opacity-20"
            style={{ background: 'var(--neon-blue)' }}
          >
            <Clock size={28} className="text-white" />
          </div>
          <p className="text-lg font-bold" style={{ fontFamily: 'Orbitron, monospace' }}>
            No history yet
          </p>
          <p
            className="max-w-xs text-center text-sm text-[hsl(var(--muted-foreground))]"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Start watching and your history will appear here automatically.
          </p>
          <Link href="/movie">
            <button className="btn-neon px-5 py-2 text-xs">Start Watching</button>
          </Link>
        </div>
      )}
    </div>
  );
}
