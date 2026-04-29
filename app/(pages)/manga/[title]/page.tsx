import { anilist } from '@/lib/anilist';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Book } from 'lucide-react';

export default async function MangaSearch({ params }: any) {
  const rawTitle = (await params).title;
  const title = decodeURIComponent(rawTitle);

  let results: any[] = [];
  let error = false;
  try {
    results = await anilist.searchManga(title);
  } catch {
    error = true;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Link
          href="/manga"
          className="inline-flex items-center gap-2 text-[0.6rem] tracking-widest text-white/30 transition-colors hover:text-[#F9F002]"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}
        >
          <ArrowLeft size={10} /> BACK TO MANGA
        </Link>
        <div>
          <h1
            className="text-xl font-black tracking-[0.12em] uppercase"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            RESULTS FOR: <span style={{ color: '#F9F002' }}>{title.toUpperCase()}</span>
          </h1>
          <p
            className="mt-1 text-[0.55rem] tracking-widest text-white/25"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            {results.length} TITLES FOUND VIA ANILIST
          </p>
        </div>
      </div>

      {error && (
        <div className="border border-[#FF006F]/30 bg-[#FF006F]/5 p-4">
          <span
            className="text-[0.6rem] tracking-widest text-[#FF006F]"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            SEARCH FAILED — AniList API error
          </span>
        </div>
      )}

      {results.length === 0 && !error && (
        <div className="flex flex-col items-center gap-3 py-16">
          <Book size={32} className="text-white/10" />
          <span
            className="text-[0.6rem] tracking-widest text-white/30"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            NO RESULTS FOR "{title.toUpperCase()}"
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {results.map((item) => {
          const t = item.title?.english || item.title?.romaji || 'Unknown';
          return (
            <Link key={item.id} href={`/manga/info/${item.id}`} className="group">
              <div className="relative aspect-[2/3] overflow-hidden border border-white/8 transition-all group-hover:border-[#F9F002]/40">
                {item.coverImage?.large && (
                  <Image
                    fill
                    src={item.coverImage.large}
                    alt={t}
                    sizes="160px"
                    className="object-cover brightness-90 transition-all duration-500 group-hover:scale-105 group-hover:brightness-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-2 transition-transform duration-300 group-hover:translate-y-0">
                  <p
                    className="truncate text-xs font-semibold text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {t}
                  </p>
                  <div className="mt-0.5 flex gap-1.5">
                    {item.chapters && (
                      <span
                        className="text-[0.5rem] tracking-widest text-[#F9F002]/60"
                        style={{ fontFamily: 'Share Tech Mono, monospace' }}
                      >
                        {item.chapters}CH
                      </span>
                    )}
                    {item.status && (
                      <span
                        className="text-[0.5rem] tracking-widest text-white/40"
                        style={{ fontFamily: 'Share Tech Mono, monospace' }}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
