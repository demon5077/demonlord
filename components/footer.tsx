'use client';
import Link from 'next/link';
import { Skull, Github, Twitter, Instagram, MessageCircle, ExternalLink, Zap } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const NAV = [
  { label: 'Movies', href: '/movie' },
  { label: 'TV Shows', href: '/tv' },
  { label: 'Anime', href: '/anime' },
  { label: 'Manga', href: '/manga' },
];
const LEGAL = [
  { label: 'About', href: '/about' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'DMCA', href: '/dmca' },
];
const NETWORK = [
  { label: 'Arise Music', href: 'https://arise.pp.ua', color: 'var(--neon-pink)' },
  { label: 'AnimeDex', href: 'https://animedex.pp.ua', color: 'var(--neon-purple)' },
  { label: 'Dramzy', href: 'https://dramzy.qd.je', color: 'var(--neon-green)' },
];
const SOCIALS = [
  { icon: Github, href: 'https://github.com/skgupta507', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/sk_gupta143', label: 'X' },
  { icon: Instagram, href: 'https://instagram.com/sk.gupta507', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://discord.com/channels/@skgupta507', label: 'Discord' },
];

export const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === 'light';

  const muted = isLight ? 'text-gray-500' : 'text-[hsl(var(--muted-foreground))]';
  const border = `border-[hsl(var(--border))]`;

  return (
    <footer className={`border-t ${border} mt-auto`}>
      {/* Top gradient accent line matching hero */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            'linear-gradient(90deg, var(--neon-pink) 0%, var(--neon-purple) 35%, var(--neon-blue) 70%, var(--neon-green) 100%)',
        }}
      />

      <div className="mx-auto max-w-5xl px-6 pt-12 pb-8">
        {/* Main grid — mirrors landing page sections layout */}
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand col — same skull+gradient as hero */}
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg"
                style={{ background: 'var(--neon-pink)' }}
              >
                <Skull size={16} className="text-white" />
              </div>
              <span
                className="text-sm font-black tracking-[0.12em]"
                style={{ fontFamily: 'Orbitron, monospace', color: 'var(--neon-pink)' }}
              >
                DEMONLORD
              </span>
            </Link>
            <p
              className={`text-xs leading-relaxed ${muted}`}
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Free streaming aggregator. No media hosted — third-party links only. Built by{' '}
              <a
                href="https://github.com/skgupta507"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
                style={{ color: 'var(--neon-pink)' }}
              >
                SK Gupta
              </a>
              .
            </p>
            {/* Live status — mirrors hero badge */}
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.5rem] tracking-widest ${border}`}
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: 'var(--neon-green)' }}
              />
              <span style={{ color: 'var(--neon-green)' }}>ONLINE</span>
              <span className={muted}>· Free Forever</span>
            </div>
            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`h-8 w-8 rounded-xl border ${border} flex items-center justify-center ${muted} transition-all hover:scale-110 hover:border-[var(--neon-pink)] hover:text-[var(--neon-pink)]`}
                >
                  <s.icon size={14} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Streams — mirrors feature cards section */}
          <div className="space-y-4">
            <p
              className="text-[0.5rem] font-semibold tracking-[0.25em] uppercase"
              style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--neon-pink)' }}
            >
              STREAMS
            </p>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`text-sm ${muted} group flex items-center gap-1.5 transition-colors hover:text-[var(--neon-pink)]`}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    <span
                      className="h-px w-3 transition-all group-hover:w-5"
                      style={{ background: 'var(--neon-pink)' }}
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Network — mirrors the network section on landing */}
          <div className="space-y-4">
            <p
              className="text-[0.5rem] font-semibold tracking-[0.25em] uppercase"
              style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--neon-blue)' }}
            >
              NETWORK
            </p>
            <ul className="space-y-2.5">
              {NETWORK.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm ${muted} group flex items-center gap-2 transition-colors hover:text-[hsl(var(--foreground))]`}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full transition-all group-hover:scale-125"
                      style={{ background: l.color }}
                    />
                    {l.label}
                    <ExternalLink
                      size={9}
                      className="opacity-0 transition-opacity group-hover:opacity-60"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <p
              className="text-[0.5rem] font-semibold tracking-[0.25em] uppercase"
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                color: 'hsl(var(--muted-foreground))',
              }}
            >
              LEGAL
            </p>
            <ul className="space-y-2.5">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`text-sm ${muted} group flex items-center gap-1.5 transition-colors hover:text-[hsl(var(--foreground))]`}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    <span className="h-px w-3 bg-[hsl(var(--muted-foreground))] transition-all group-hover:w-5" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — mirrors hero stats row */}
        <div
          className={`border-t pt-6 ${border} flex flex-col items-center justify-between gap-4 sm:flex-row`}
        >
          <p
            className={`text-[0.5rem] tracking-widest uppercase ${muted}`}
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            © {new Date().getFullYear()} Demonlord · Neural Cinema · No media stored · Third-party
            links only
          </p>
          {/* Neon dots — mirrors hero stats colours */}
          <div className="flex items-center gap-2">
            {[
              'var(--neon-pink)',
              'var(--neon-blue)',
              'var(--neon-purple)',
              'var(--neon-yellow)',
              'var(--neon-green)',
            ].map((c, i) => (
              <div
                key={i}
                className="h-2 w-2 cursor-default rounded-full transition-all hover:scale-150"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
