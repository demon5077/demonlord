import Link from 'next/link';
import { ArrowLeft, Skull, Zap, Film, Antenna, Globe } from 'lucide-react';

export default function AboutPage() {
  const team = [
    { role: 'ARCHITECTURE', desc: 'Next.js 15 App Router, TypeScript, Tailwind CSS 4' },
    { role: 'MOVIE/TV DATA', desc: 'TMDB API — The Movie Database' },
    { role: 'ANIME DATA', desc: 'AniList GraphQL API, HiAnime' },
    { role: 'EXTENDED API', desc: 'ScreenScape API — KMMovies, AnimeSalt, NetMirror' },
    { role: 'STREAMS', desc: 'Crysoline API (AnimeGG), ScreenScape, embed providers' },
    { role: 'AUTH', desc: 'Firebase Authentication + Firestore' },
  ];
  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto space-y-12">
      <div className="space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 text-[0.6rem] tracking-widest text-white/30 hover:text-[#FF006F] transition-colors uppercase"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          <ArrowLeft size={10} /> BACK TO BASE
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 flex items-center justify-center border border-[#FF006F]/30">
            <Skull size={20} style={{ color: '#FF006F', filter: 'drop-shadow(0 0 8px #FF006F)' }} />
          </div>
          <div>
            <p className="text-[0.55rem] tracking-[0.3em] text-[#FF006F]/60 mb-0.5" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
              DEMONLORD // ABOUT
            </p>
            <h1 className="text-3xl font-black tracking-[0.12em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>
              ABOUT DEMONLORD
            </h1>
          </div>
        </div>
        <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, #FF006F44, #BD00FF44, transparent)' }} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-black tracking-[0.12em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>WHAT IS DEMONLORD?</h2>
          <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            DemonLord is a free, open-source streaming aggregator built on Next.js 15.
            We connect you to existing streams across the web — movies, TV shows, anime, and manga —
            without hosting any content ourselves.
          </p>
          <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Think of us as a neural interface between you and the vast ocean of content already
            available online. No subscriptions. No regional restrictions. No corporate gatekeeping.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-black tracking-[0.12em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>TECH STACK</h2>
          <div className="space-y-2">
            {team.map(t => (
              <div key={t.role} className="flex gap-3 border border-white/6 p-3">
                <span className="text-[0.5rem] tracking-widest text-[#FF006F]/70 uppercase shrink-0 mt-0.5 w-28" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  {t.role}
                </span>
                <span className="text-xs text-white/40" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border border-white/6 p-6 space-y-3" style={{ background: 'rgba(255,0,111,0.02)' }}>
        <h2 className="text-lg font-black tracking-[0.12em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>DISCLAIMER</h2>
        <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          DemonLord does not store, upload, or host any media content. All streams are sourced from
          third-party providers. We are not responsible for the content of external sites.
          If you are a copyright holder and believe your content is being used inappropriately,
          please contact us via our <Link href="/dmca" className="text-[#FF006F] hover:underline">DMCA page</Link>.
        </p>
      </div>
    </div>
  );
}
