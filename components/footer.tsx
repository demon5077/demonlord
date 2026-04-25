import Link from 'next/link';
import { Skull, Github, Twitter, Instagram, MessageCircle, ExternalLink } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Movies',   href: '/movie' },
  { label: 'TV Shows', href: '/tv' },
  { label: 'Anime',    href: '/anime' },
  { label: 'Manga',    href: '/manga' },
];

const LEGAL_LINKS = [
  { label: 'About',   href: '/about' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms',   href: '/terms' },
  { label: 'DMCA',    href: '/dmca' },
];

const NETWORK_LINKS = [
  { label: 'Arise Music', href: 'https://arise.pp.ua' },
  { label: 'AnimeDex',    href: 'https://animedex.pp.ua' },
  { label: 'Dramzy',      href: 'https://dramzy.qd.je' },
];

const SOCIALS = [
  { icon: Github,        href: 'https://github.com/skgupta507',           label: 'GitHub'    },
  { icon: Twitter,       href: 'https://x.com/sk_gupta143',               label: 'X'         },
  { icon: Instagram,     href: 'https://instagram.com/sk.gupta507',        label: 'Instagram' },
  { icon: MessageCircle, href: 'https://discord.com/channels/@skgupta507', label: 'Discord'   },
];

export const Footer = () => {
  const mono = { fontFamily: 'Share Tech Mono, monospace' } as const;

  return (
    <footer className="border-t border-[hsl(var(--border))] mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--neon-pink)' }}>
                <Skull size={13} className="text-white" />
              </div>
              <span className="font-black tracking-[0.12em] text-sm text-[var(--neon-pink)]"
                style={{ fontFamily: 'Orbitron, monospace' }}>
                DEMONLORD
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[hsl(var(--muted-foreground))]"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Free streaming aggregator. We don't host any media — third-party links only.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-8 w-8 rounded-lg border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:border-[var(--neon-pink)] hover:text-[var(--neon-pink)] transition-all hover:scale-105">
                  <s.icon size={14} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Streams */}
          <div className="space-y-3">
            <p className="text-[0.5rem] tracking-[0.25em] opacity-50 uppercase" style={mono}>STREAMS</p>
            <ul className="space-y-2">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[var(--neon-pink)] transition-colors"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Network */}
          <div className="space-y-3">
            <p className="text-[0.5rem] tracking-[0.25em] opacity-50 uppercase" style={mono}>NETWORK</p>
            <ul className="space-y-2">
              {NETWORK_LINKS.map(l => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[var(--neon-pink)] transition-colors flex items-center gap-1"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {l.label} <ExternalLink size={9} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <p className="text-[0.5rem] tracking-[0.25em] opacity-50 uppercase" style={mono}>LEGAL</p>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[var(--neon-pink)] transition-colors"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[hsl(var(--border))] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.5rem] tracking-widest opacity-30 uppercase" style={mono}>
            © {new Date().getFullYear()} DEMONLORD · NEURAL CINEMA · NO MEDIA STORED
          </span>
          <div className="flex gap-1.5">
            {['#FF006F','#00D4FF','#BD00FF','#F9F002','#39FF14'].map(c => (
              <div key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
