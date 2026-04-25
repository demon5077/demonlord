'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Film, Tv2, Antenna, Book, ArrowRight, Play, ChevronDown, Skull } from 'lucide-react';
import AuthModal from '@/components/auth-modal';
import { useAuth } from '@/lib/firebase/auth-context';
import { useTheme } from 'next-themes';

/* ── Glitch hook ── */
const GLITCH_CHARS = 'アイウエオ0123456789ABCDEF!#$%@';
function useGlitch(text: string, active: boolean) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!active) { setOut(text); return; }
    let f = 0;
    const t = setInterval(() => {
      if (f < 10) {
        setOut(text.split('').map(c =>
          c === ' ' ? c : Math.random() < 0.4
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : c
        ).join(''));
        f++;
      } else { setOut(text); clearInterval(t); }
    }, 55);
    return () => clearInterval(t);
  }, [text, active]);
  return out;
}

/* ── Animated counter ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const step = target / 60;
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [started, target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { target: 50000, suffix: '+', label: 'MOVIES' },
  { target: 10000, suffix: '+', label: 'TV SHOWS' },
  { target: 15000, suffix: '+', label: 'ANIME' },
  { target: 100, suffix: '%', label: 'FREE' },
];

const FEATURES = [
  { icon: Film,    title: 'Movies',   desc: 'Latest releases and classics in HD. Updated daily.',         color: 'var(--neon-pink)',   href: '/movie' },
  { icon: Tv2,     title: 'TV Shows', desc: 'Full series, every season. No subscription needed.',         color: 'var(--neon-blue)',   href: '/tv'    },
  { icon: Antenna, title: 'Anime',    desc: 'Sub & dub. Seasonal to classics. ScreenScape powered.',      color: 'var(--neon-purple)', href: '/anime' },
  { icon: Book,    title: 'Manga',    desc: 'Thousands of chapters from AniList & MangaDex.',             color: 'var(--neon-yellow)', href: '/manga' },
];

export default function Home() {
  const { user } = useAuth();
  const { resolvedTheme } = useTheme();
  const [authOpen, setAuthOpen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isLight = resolvedTheme === 'light';

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 600);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const demonText = useGlitch('DEMON', glitchActive);
  const lordText  = useGlitch('LORD',  glitchActive);

  const mono = { fontFamily: 'Share Tech Mono, monospace' } as const;
  const muted = isLight ? 'text-gray-500' : 'text-[hsl(var(--muted-foreground))]';
  const border = isLight ? 'border-gray-200' : 'border-[hsl(var(--border))]';

  return (
    <div className="w-full">
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {/* ════ HERO ════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Background: Rive-style dot grid is in CSS. Add subtle glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: isLight
              ? 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200,0,85,0.05) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,0,111,0.07) 0%, transparent 70%)',
          }} />

        {/* Content — everything centered */}
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-3xl mx-auto px-6">

          {/* Status pill */}
          <div className={`mb-8 inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-[0.52rem] tracking-widest transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          } ${border}`} style={mono}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--neon-green)' }} />
            <span style={{ color: 'var(--neon-green)' }}>SYSTEM ONLINE</span>
            <span className={muted}>· FREE STREAMING ACTIVE</span>
          </div>

          {/* Giant title */}
          <div className={`transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            {/* DEMON with glitch */}
            <div className="relative select-none" style={{ lineHeight: 0.85 }}>
              {/* Glitch layers */}
              <div className="absolute inset-0 pointer-events-none" style={{
                fontFamily: 'Orbitron, monospace', fontWeight: 900,
                fontSize: 'clamp(4.5rem, 17vw, 13rem)',
                color: 'var(--neon-blue)', opacity: 0.3, letterSpacing: '0.04em',
                animation: glitchActive ? 'glitch-1 0.4s steps(2) forwards' : 'none',
              }}>{demonText}</div>
              <div className="absolute inset-0 pointer-events-none" style={{
                fontFamily: 'Orbitron, monospace', fontWeight: 900,
                fontSize: 'clamp(4.5rem, 17vw, 13rem)',
                color: 'var(--neon-purple)', opacity: 0.25, letterSpacing: '0.04em',
                animation: glitchActive ? 'glitch-2 0.4s steps(2) forwards' : 'none',
              }}>{demonText}</div>
              <h1 style={{
                fontFamily: 'Orbitron, monospace', fontWeight: 900,
                fontSize: 'clamp(4.5rem, 17vw, 13rem)', letterSpacing: '0.04em',
                background: 'linear-gradient(180deg, var(--neon-pink) 0%, var(--neon-pink) 45%, var(--neon-purple) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                lineHeight: 0.85,
              }}>{demonText}</h1>
            </div>

            {/* LORD */}
            <h1 className="select-none" style={{
              fontFamily: 'Orbitron, monospace', fontWeight: 900,
              fontSize: 'clamp(4.5rem, 17vw, 13rem)', letterSpacing: '0.04em',
              color: isLight ? 'hsl(222 30% 8%)' : 'hsl(var(--foreground))',
              lineHeight: 0.85,
            }}>{lordText}</h1>
          </div>

          {/* Tagline */}
          <div className={`mt-6 transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}>
            <p className="text-[0.65rem] tracking-[0.25em] uppercase mb-2"
              style={{ ...mono, color: 'var(--neon-blue)' }}>
              NEURAL CINEMA INTERFACE · v5.0
            </p>
            <p className={`text-sm leading-relaxed max-w-md mx-auto ${muted}`}
              style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem' }}>
              Millions of movies, series and anime streamed for free.
              <span style={{ color: 'var(--neon-pink)' }}> No subscriptions. No limits.</span>
            </p>
          </div>

          {/* CTAs */}
          <div className={`mt-8 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}>
            <Link href="/movie">
              <button className="btn-neon text-sm px-6 py-2.5">
                <Play size={13} className="fill-current" /> Watch Now
              </button>
            </Link>
            <Link href="/anime">
              <button className="btn-outline text-sm px-6 py-2.5">
                <Antenna size={13} /> Anime
              </button>
            </Link>
            {!user && (
              <button onClick={() => setAuthOpen(true)}
                className={`text-[0.65rem] tracking-wider border rounded-md px-5 py-2.5 transition-all ${border} ${muted} hover:border-[var(--neon-pink)] hover:text-[var(--neon-pink)]`}
                style={mono}>
                SIGN IN
              </button>
            )}
          </div>

          {/* Stats */}
          <div className={`mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}>
            {STATS.map((s, i) => {
              const colors = ['var(--neon-pink)', 'var(--neon-blue)', 'var(--neon-purple)', 'var(--neon-green)'];
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-black tabular-nums"
                    style={{ fontFamily: 'Orbitron, monospace', color: colors[i] }}>
                    <Counter target={s.target} suffix={s.suffix} />
                  </span>
                  <span className={`text-[0.48rem] tracking-[0.25em] uppercase ${muted}`} style={mono}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown size={16} className={muted} />
        </div>
      </section>

      {/* ════ FEATURES ════ */}
      <section className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-lg font-black tracking-[0.12em] uppercase mb-2"
              style={{ fontFamily: 'Orbitron, monospace' }}>
              What's inside
            </h2>
            <p className={`text-sm ${muted}`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              All your entertainment, one neural port.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(f => (
              <Link key={f.href} href={f.href} className="group">
                <div className="card-cyber p-5 h-full space-y-3 cursor-pointer">
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, ${f.color} 15%, transparent)` }}>
                    <f.icon size={18} style={{ color: f.color }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}>
                      {f.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${muted}`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {f.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[0.55rem] tracking-wider transition-all group-hover:gap-2"
                    style={{ ...mono, color: f.color }}>
                    Browse <ArrowRight size={9} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════ ABOUT ════ */}
      <section className={`w-full py-16 px-6 border-y ${border}`}>
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--neon-pink)' }}>
              <Skull size={18} className="text-white" />
            </div>
          </div>
          <h2 className="text-xl font-black tracking-[0.08em] uppercase"
            style={{ fontFamily: 'Orbitron, monospace' }}>
            About DemonLord
          </h2>
          <p className={`text-sm leading-relaxed ${muted}`} style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem' }}>
            DemonLord is a free, open-source streaming interface. We connect you to existing streams —
            movies, TV, anime and manga — without hosting any media. Powered by TMDB, AniList, and ScreenScape.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {['No Ads', 'Open Source', 'No Paywall', 'Multi-Provider'].map(t => (
              <span key={t}
                className={`text-[0.55rem] tracking-widest border rounded-full px-3 py-1 uppercase ${border} ${muted}`}
                style={mono}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════ BOTTOM CTA ════ */}
      <section className="w-full py-20 px-6 text-center">
        <div className="max-w-md mx-auto space-y-5">
          <h2 className="text-xl font-black tracking-[0.1em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>
            Ready to watch?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/movie"><button className="btn-neon px-8 py-3">Enter Cinema</button></Link>
            <Link href="/anime"><button className="btn-outline px-8 py-3">Browse Anime</button></Link>
          </div>
          <div className="flex justify-center flex-wrap gap-4 pt-2">
            {[['About','/about'],['Privacy','/privacy'],['Terms','/terms'],['DMCA','/dmca']].map(([l,h]) => (
              <Link key={h} href={h}
                className={`text-[0.52rem] tracking-widest uppercase transition-colors hover:text-[var(--neon-pink)] ${muted}`}
                style={mono}>{l}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
