'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tmdb, TvSerie } from '@/lib/tmdb';
import { Star, ImageIcon, AlertCircle } from 'lucide-react';

type FeatureType = 'popular' | 'toprated' | 'ontheair' | 'airingtoday';

const fetchers: Record<FeatureType, (lang: string) => Promise<any>> = {
  popular: (l) => tmdb.tv.popular(l),
  toprated: (l) => tmdb.tv.topRated(l),
  ontheair: (l) => tmdb.tv.onTheAir(l),
  airingtoday: (l) => tmdb.tv.airingToday(l),
};

export default function FeaturedTV({ featureType }: { featureType: FeatureType }) {
  const [items, setItems] = useState<TvSerie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchers[featureType]('en-US')
      .then((d) => setItems(d?.results || []))
      .catch(() => setError('TMDB_API_KEY not configured or network error'))
      .finally(() => setLoading(false));
  }, [featureType]);

  if (loading)
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] animate-pulse border border-[hsl(var(--border))] bg-[hsl(var(--muted))]"
          />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center gap-3 border border-[hsl(0_85%_60%/0.3)] bg-[hsl(0_85%_60%/0.05)] py-16">
        <AlertCircle size={24} className="text-[hsl(0_85%_60%)]" />
        <span
          className="text-[0.65rem] tracking-widest text-[hsl(0_85%_60%)]"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}
        >
          {error}
        </span>
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <Link key={item.id} href={`/tv/${item.id}`} className="group">
          <div className="relative aspect-[2/3] overflow-hidden border border-[hsl(var(--border))] transition-all duration-300 group-hover:border-[hsl(185_100%_48%/0.5)]">
            {item.poster_path ? (
              <Image
                fill
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt={item.name}
                sizes="200px"
                className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[hsl(var(--muted))]">
                <ImageIcon size={24} className="text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            {item.vote_average > 0 && (
              <div className="absolute top-1.5 right-1.5 flex items-center gap-1 border border-[hsl(185_100%_48%/0.3)] bg-black/80 px-1.5 py-0.5">
                <Star size={8} className="fill-current text-[hsl(185_100%_48%)]" />
                <span
                  className="text-[0.6rem] text-[hsl(185_100%_48%)]"
                  style={{ fontFamily: 'Share Tech Mono, monospace' }}
                >
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-2 transition-transform duration-300 group-hover:translate-y-0">
              <p
                className="truncate text-xs font-semibold text-white"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {item.name}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
