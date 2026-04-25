import { format } from 'date-fns';
import { Poster } from '@/components/common/poster';
import Link from 'next/link';
import { Play, Star, Globe, ExternalLink, Tv2 } from 'lucide-react';
import { tmdb } from '@/lib/tmdb';

const DetailsContainer = async ({ data, id }: any) => {
  const trailers = (await tmdb.videos('tv', id)).results.filter(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube',
  );
  const seasonsCount = data.number_of_seasons;
  const episodesCount = data.number_of_episodes;

  return (
    <div className="space-y-0">
      {/* Backdrop */}
      <div className="relative h-[35dvh] w-full overflow-hidden md:h-[55dvh]">
        <div
          style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--background)/0.4)] to-[hsl(var(--background))]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background)/0.7)] via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)' }} />
      </div>

      <div className="mx-auto max-w-5xl px-4 md:px-6 -mt-32 relative z-10 pb-10 space-y-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <aside className="w-36 shrink-0 md:w-48 self-end md:self-auto">
            <div className="relative">
              <div className="absolute -inset-[1px] bg-gradient-to-b from-[hsl(185_100%_48%/0.3)] to-transparent z-0" />
              <Poster url={data.poster_path} alt={data.name} />
            </div>
          </aside>
          <article className="flex flex-col gap-3 pt-2 md:pt-24">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 text-[0.6rem] tracking-widest text-muted-foreground uppercase" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
              {data.first_air_date && <span>{format(new Date(data.first_air_date), 'yyyy')}</span>}
              {seasonsCount && <><span className="opacity-30">|</span><span>{seasonsCount}S / {episodesCount}EP</span></>}
              {data.original_language && <><span className="opacity-30">|</span><span className="flex items-center gap-1"><Globe size={9} />{data.original_language.toUpperCase()}</span></>}
              {data.status && <><span className="opacity-30">|</span><span className="text-[hsl(120_80%_55%)]">{data.status}</span></>}
            </div>
            <h1 className="text-2xl font-black tracking-wide uppercase md:text-4xl" style={{ fontFamily: 'Orbitron, monospace', lineHeight: 1.1 }}>{data.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
              {data.vote_average > 0 && (
                <div className="flex items-center gap-1.5 bg-[hsl(185_100%_48%/0.1)] border border-[hsl(185_100%_48%/0.3)] px-2 py-1">
                  <Star size={10} className="text-[hsl(185_100%_48%)] fill-current" />
                  <span className="text-[0.7rem] font-bold text-[hsl(185_100%_48%)]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{data.vote_average.toFixed(1)}</span>
                </div>
              )}
              {data.genres?.map((g: any) => (
                <span key={g.id} className="border border-[hsl(var(--border))] px-2 py-0.5 text-[0.6rem] tracking-widest text-muted-foreground uppercase" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{g.name}</span>
              ))}
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem' }}>{data.overview}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`/tv/watch/${id}`}>
                <button className="flex items-center gap-2 border border-[hsl(185_100%_48%/0.5)] px-5 py-2 text-[0.65rem] tracking-widest text-[hsl(185_100%_48%)] hover:bg-[hsl(185_100%_48%/0.1)] transition-all" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  <Play size={13} className="fill-current" /> WATCH NOW
                </button>
              </Link>
              {trailers[0] && (
                <a href={`https://youtube.com/watch?v=${trailers[0].key}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-[hsl(var(--border))] px-4 py-2 text-[0.65rem] tracking-widest text-muted-foreground hover:border-[hsl(185_100%_48%/0.4)] hover:text-[hsl(185_100%_48%)] transition-all" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  <ExternalLink size={11} /> TRAILER
                </a>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
export default DetailsContainer;
