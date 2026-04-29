import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Star, Globe, ExternalLink, Tv, Hash, TrendingUp } from 'lucide-react';
import { tmdb } from '@/lib/tmdb';
import { Poster } from '@/components/common/poster';
import AddToWatchlistButton from '@/components/add-to-watchlist';

const DetailsContainer = async ({ data, id }: any) => {
  const [videosRes, creditsRes, similarRes] = await Promise.allSettled([
    tmdb.videos('tv', id),
    tmdb.credits('tv', id, 'en-US'),
    tmdb.tv.related(Number(id), 'similar', 'en-US').catch(() => ({ results: [] })),
  ]);

  const trailer =
    videosRes.status === 'fulfilled'
      ? videosRes.value.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')
      : null;
  const credits = creditsRes.status === 'fulfilled' ? creditsRes.value : { cast: [], crew: [] };
  const similar = (
    similarRes.status === 'fulfilled' ? (similarRes.value?.results ?? []) : []
  ).slice(0, 8);
  const topCast = credits.cast?.slice(0, 8) ?? [];
  const creator = data.created_by?.[0];
  const seasons = data.seasons?.filter((s: any) => s.season_number > 0) ?? [];

  return (
    <div className="pb-12">
      {/* BACKDROP */}
      <div className="relative h-[40dvh] w-full overflow-hidden md:h-[55dvh]">
        {data.backdrop_path && (
          <Image
            fill
            priority
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt={data.name}
            className="object-cover brightness-50"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background)/0.2)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background)/0.8)] via-transparent to-transparent" />
        {trailer && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
            <a
              href={`https://youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/40 px-6 py-3 backdrop-blur-md transition-all hover:bg-black/60"
            >
              <Play size={22} className="fill-white text-white" />
              <span className="text-sm font-bold text-white">Watch Trailer</span>
            </a>
          </div>
        )}
      </div>

      <div className="relative z-10 mx-auto -mt-36 max-w-5xl space-y-10 px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <aside className="w-36 shrink-0 self-end md:w-44 md:self-start">
            <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] shadow-2xl">
              <Poster url={data.poster_path} alt={data.name} />
            </div>
          </aside>
          <article className="flex flex-col gap-4 md:pt-32">
            <div
              className="flex flex-wrap items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]"
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              {data.first_air_date && <span>{format(new Date(data.first_air_date), 'yyyy')}</span>}
              {data.number_of_seasons && (
                <>
                  <span>·</span>
                  <span>{data.number_of_seasons}S</span>
                </>
              )}
              {data.number_of_episodes && (
                <>
                  <span>·</span>
                  <span>{data.number_of_episodes}EP</span>
                </>
              )}
              {data.status && (
                <>
                  <span>·</span>
                  <span
                    style={{
                      color:
                        data.status === 'Returning Series'
                          ? 'var(--neon-green)'
                          : 'var(--neon-yellow)',
                    }}
                  >
                    {data.status}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-3xl leading-none font-black tracking-tight md:text-5xl">
              {data.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {data.vote_average > 0 && (
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{
                    background: 'color-mix(in srgb, var(--neon-blue) 12%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--neon-blue) 30%, transparent)',
                  }}
                >
                  <Star size={11} style={{ color: 'var(--neon-blue)', fill: 'var(--neon-blue)' }} />
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--neon-blue)', fontFamily: 'Share Tech Mono, monospace' }}
                  >
                    {data.vote_average.toFixed(1)}
                  </span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">/ 10</span>
                </div>
              )}
              {data.genres?.map((g: any) => (
                <span
                  key={g.id}
                  className="rounded-full border border-[hsl(var(--border))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]"
                >
                  {g.name}
                </span>
              ))}
            </div>
            <p
              className="max-w-2xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem' }}
            >
              {data.overview}
            </p>
            {creator && (
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Created by{' '}
                <span className="font-semibold text-[hsl(var(--foreground))]">{creator.name}</span>
              </p>
            )}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href={`/tv/watch/${id}`}>
                <button className="btn-neon">
                  <Play size={14} className="fill-white" /> Watch Now
                </button>
              </Link>
              {trailer && (
                <a
                  href={`https://youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-outline">
                    <ExternalLink size={13} /> Trailer
                  </button>
                </a>
              )}
              <AddToWatchlistButton
                item={{
                  id: String(id),
                  title: data.name,
                  type: 'tv',
                  poster: data.poster_path
                    ? `https://image.tmdb.org/t/p/w342${data.poster_path}`
                    : undefined,
                  rating: data.vote_average,
                  year: data.first_air_date?.slice(0, 4),
                }}
              />
            </div>
          </article>
        </div>

        {/* SEASONS */}
        {seasons.length > 0 && (
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <Tv size={15} style={{ color: 'var(--neon-blue)' }} /> Seasons
            </h2>
            <div className="flex flex-wrap gap-3">
              {seasons.map((s: any) => (
                <div key={s.id} className="card-cyber flex min-w-[140px] items-center gap-3 p-3">
                  {s.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${s.poster_path}`}
                      alt={s.name}
                      width={40}
                      height={60}
                      className="shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--muted))]">
                      <Tv size={14} className="text-[hsl(var(--muted-foreground))]" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold">S{String(s.season_number).padStart(2, '0')}</p>
                    <p className="text-[0.6rem] text-[hsl(var(--muted-foreground))]">
                      {s.episode_count} eps
                    </p>
                    {s.air_date && (
                      <p className="text-[0.55rem] text-[hsl(var(--muted-foreground))]">
                        {s.air_date.slice(0, 4)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAST */}
        {topCast.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold">Top Cast</h2>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
              {topCast.map((c: any) => (
                <div key={c.id} className="flex flex-col items-center gap-1.5 text-center">
                  <div className="aspect-square w-full overflow-hidden rounded-xl bg-[hsl(var(--muted))]">
                    {c.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                        alt={c.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-bold text-[hsl(var(--muted-foreground))]">
                        {c.name[0]}
                      </div>
                    )}
                  </div>
                  <p className="line-clamp-1 w-full text-[0.65rem] font-semibold">{c.name}</p>
                  <p className="line-clamp-1 w-full text-[0.58rem] text-[hsl(var(--muted-foreground))]">
                    {c.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SIMILAR */}
        {similar.length > 0 && (
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <TrendingUp size={15} style={{ color: 'var(--neon-blue)' }} /> More Like This
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {similar.map((s: any) => (
                <Link key={s.id} href={`/tv/${s.id}`} className="group">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-[hsl(var(--border))] transition-all duration-200 group-hover:border-[var(--neon-blue)]">
                    {s.poster_path ? (
                      <Image
                        fill
                        src={`https://image.tmdb.org/t/p/w342${s.poster_path}`}
                        alt={s.name}
                        sizes="200px"
                        className="object-cover brightness-90 transition-all group-hover:brightness-100"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[hsl(var(--muted))] text-2xl">
                        📺
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full rounded-b-xl bg-gradient-to-t from-black/80 to-transparent p-2 transition-transform duration-200 group-hover:translate-y-0">
                      <p className="truncate text-xs font-semibold text-white">{s.name}</p>
                    </div>
                    {s.vote_average > 0 && (
                      <div className="absolute top-2 right-2 rounded-full bg-black/70 px-1.5 py-0.5 text-[0.55rem] text-yellow-400">
                        ★ {s.vote_average.toFixed(1)}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DetailsContainer;
