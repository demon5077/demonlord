'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { anilist } from '@/lib/anilist';
import { Star, ImageIcon, AlertCircle } from 'lucide-react';

type FeatureType = 'recent' | 'popular' | 'trending';

export default function FeaturedAnime({ featureType }: { featureType: FeatureType }) {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    const fetchers: Record<FeatureType, () => Promise<any[]>> = {
      trending: anilist.trending,
      popular: anilist.popular,
      recent: anilist.recent,
    };
    fetchers[featureType]()
      .then(setItems)
      .catch(() => setError('Failed to load anime from AniList'))
      .finally(() => setLoading(false));
  }, [featureType]);

  if (loading)
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-[2/3] animate-pulse border border-white/5 bg-white/5" />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center gap-3 border border-[#FF006F]/20 bg-[#FF006F]/5 py-12">
        <AlertCircle size={20} className="text-[#FF006F]" />
        <span
          className="text-[0.6rem] tracking-widest text-[#FF006F]"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}
        >
          {error}
        </span>
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => {
        const title = item.title?.english || item.title?.romaji || 'Unknown';
        const img = item.coverImage?.extraLarge || item.coverImage?.large;
        const score = item.averageScore ? item.averageScore / 10 : 0;

        return (
          <Link key={item.id} href={`/anime/${item.id}`} className="group">
            <div className="relative aspect-[2/3] overflow-hidden border border-white/8 transition-all duration-300 group-hover:border-[#BD00FF]/50">
              {img ? (
                <Image
                  fill
                  src={img}
                  alt={title}
                  sizes="200px"
                  className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-white/5">
                  <ImageIcon size={20} className="text-white/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              {score > 0 && (
                <div className="absolute top-1.5 right-1.5 flex items-center gap-1 border border-[#BD00FF]/40 bg-black/80 px-1.5 py-0.5">
                  <Star size={8} className="fill-current text-[#BD00FF]" />
                  <span
                    className="text-[0.6rem] text-[#BD00FF]"
                    style={{ fontFamily: 'Share Tech Mono, monospace' }}
                  >
                    {score.toFixed(1)}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-2 transition-transform duration-300 group-hover:translate-y-0">
                <p
                  className="truncate text-xs font-semibold text-white"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {title}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
