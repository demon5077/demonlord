import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Star, Info } from 'lucide-react';
import { Show } from '@/types';

interface CarousalCardProps {
  show: Show;
  type?: 'tv' | 'movie' | 'anime';
}

export default function CarousalCard({ show, type }: CarousalCardProps) {
  const title = show.title || show.name || 'Unknown Title';
  const releaseDate = show.release_date || show.first_air_date;
  const year = releaseDate ? format(new Date(releaseDate), 'yyyy') : null;

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '72vh', minHeight: '400px' }}>
      {/* Backdrop image */}
      <Image
        alt={title}
        src={`https://image.tmdb.org/t/p/original${show.backdrop_path || show.poster_path}`}
        fill
        priority
        className="object-cover object-center brightness-[0.6]"
        sizes="100vw"
      />

      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(350 100% 58%) 1px, transparent 1px), linear-gradient(90deg, hsl(350 100% 58%) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Left-side gradient for content readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end px-6 pb-10 md:px-10">
        <div className="flex max-w-xl flex-col gap-3">
          {/* Type + year badge */}
          <div className="flex items-center gap-2">
            <span
              className="border border-[hsl(350_100%_58%/0.6)] px-2 py-0.5 text-[0.6rem] tracking-[0.2em] text-[hsl(350_100%_62%)] uppercase"
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              {type?.toUpperCase() || 'CONTENT'}
            </span>
            {year && (
              <span
                className="text-[0.6rem] tracking-widest text-white/50"
                style={{ fontFamily: 'Share Tech Mono, monospace' }}
              >
                {year}
              </span>
            )}
            {show.vote_average > 0 && (
              <div className="flex items-center gap-1 border border-[hsl(350_100%_58%/0.3)] bg-black/50 px-1.5 py-0.5">
                <Star size={8} className="fill-current text-[hsl(350_100%_58%)]" />
                <span
                  className="text-[0.6rem] text-[hsl(350_100%_62%)]"
                  style={{ fontFamily: 'Share Tech Mono, monospace' }}
                >
                  {show.vote_average?.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h2
            className="text-3xl leading-tight font-black tracking-wide text-white uppercase md:text-5xl"
            style={{ fontFamily: 'Orbitron, monospace', textShadow: '0 0 30px rgba(0,0,0,0.8)' }}
          >
            {title}
          </h2>

          {/* Overview */}
          <p
            className="line-clamp-2 max-w-lg text-sm leading-relaxed text-white/70"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            {show.overview}
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-1">
            <Link href={`/${type}/${show.id}`}>
              <button className="btn-neon flex items-center gap-2">
                <Play size={12} className="fill-current" />
                WATCH NOW
              </button>
            </Link>
            <Link href={`/${type}/${show.id}`}>
              <button
                className="flex items-center gap-2 border border-white/20 px-4 py-2 text-[0.65rem] tracking-widest text-white/70 transition-all hover:border-white/40 hover:text-white"
                style={{ fontFamily: 'Share Tech Mono, monospace' }}
              >
                <Info size={11} />
                MORE INFO
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Corner HUD decorations */}
      <div className="pointer-events-none absolute top-4 right-4 flex flex-col items-end gap-1">
        <div
          className="text-[0.55rem] tracking-widest text-white/30"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}
        >
          NEURAL_CINEMA // LIVE
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-1 animate-pulse rounded-full bg-[hsl(350_100%_58%)]" />
          <span
            className="text-[0.55rem] tracking-widest text-[hsl(350_100%_58%)]"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            STREAMING
          </span>
        </div>
      </div>
    </div>
  );
}
