'use client';
import { useState } from 'react';
import { ChevronDown, Shield, ShieldOff } from 'lucide-react';
import { useTheme } from 'next-themes';

interface Props {
  id: string;
  episode: string;
  m3u8Url?: string;
  tracks?: any[];
}

// Screenscape.me supports anime via anilist IDs
// Format: https://screenscape.me/embed?anilist=<id>&type=anime&ep=<ep>
// Fallback: direct animepahe.pw embed

const SERVERS = [
  { key: 'screenscape', label: 'SCREENSCAPE', tag: 'REC',  url: (id: string, ep: string) => `https://screenscape.me/embed?anilist=${id}&type=anime&ep=${ep}` },
  { key: 'animepahe',   label: 'ANIMEPAHE',   tag: 'ALT',  url: (id: string, ep: string) => `https://animepahe.pw/play/${id}/${ep}` },
  { key: 'animegg',     label: 'ANIMEGG',      tag: 'ALT2', url: (id: string, ep: string) => `https://animegg.org/anime/${id}/episode-${ep}` },
];

function epNum(ep: string): string {
  const m = ep.match(/(\d+)/);
  return m ? m[1] : '1';
}

export default function AnimePlayerClient({ id, episode }: Props) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const ep = epNum(episode);

  const [server, setServer] = useState('screenscape');
  const [open, setOpen] = useState(false);
  const [adBlock, setAdBlock] = useState(true);
  const [loading, setLoading] = useState(false);

  const current = SERVERS.find(s => s.key === server) ?? SERVERS[0];
  const src = current.url(id, ep);

  const select = (key: string) => {
    setLoading(true);
    setServer(key);
    setOpen(false);
    setTimeout(() => setLoading(false), 500);
  };

  const border = isLight ? 'border-gray-200' : 'border-[hsl(var(--border))]';
  const txt    = isLight ? 'text-gray-500'   : 'text-[hsl(var(--muted-foreground))]';
  const bg     = isLight ? 'bg-gray-50'      : 'bg-[hsl(var(--card))]';
  const mono   = { fontFamily: 'Share Tech Mono, monospace' } as const;

  return (
    <div className="w-full space-y-3">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Server selector */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-2 border rounded-md px-3 py-2 text-[0.65rem] tracking-wider transition-colors ${border} hover:border-[var(--neon-pink)] hover:text-[var(--neon-pink)]`}
            style={mono}
          >
            <span className={txt}>SERVER:</span>
            <span>{current.label}</span>
            <span className="text-[var(--neon-yellow)] text-[0.5rem]">[{current.tag}]</span>
            <ChevronDown size={10} className={`${open ? 'rotate-180' : ''} transition-transform ${txt}`} />
          </button>

          {open && (
            <div className={`absolute top-full left-0 z-50 mt-1 w-56 border rounded-lg shadow-xl overflow-hidden ${
              isLight ? 'border-gray-200 bg-white' : 'border-[hsl(var(--border))] bg-[hsl(var(--popover))]'
            }`}>
              {SERVERS.map(s => (
                <button
                  key={s.key}
                  onClick={() => select(s.key)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-[0.65rem] tracking-wider transition-colors ${
                    s.key === server
                      ? 'text-[var(--neon-pink)] bg-[hsl(var(--primary)/0.08)]'
                      : `${txt} ${isLight ? 'hover:bg-gray-50' : 'hover:bg-[hsl(var(--accent)/0.05)]'}`
                  }`}
                  style={mono}
                >
                  <span>{s.label}</span>
                  <span className="text-[var(--neon-yellow)] text-[0.5rem]">[{s.tag}]</span>
                </button>
              ))}
              <div className={`px-4 py-2 text-[0.5rem] opacity-50 border-t ${
                isLight ? 'border-gray-100' : 'border-[hsl(var(--border))]'
              }`} style={mono}>
                Screenscape recommended for best quality
              </div>
            </div>
          )}
        </div>

        {/* Ad blocker toggle */}
        <button
          onClick={() => setAdBlock(!adBlock)}
          className={`flex items-center gap-1.5 border rounded-md px-3 py-2 text-[0.65rem] tracking-wider transition-all ${
            adBlock
              ? 'border-[var(--neon-green)] text-[var(--neon-green)] bg-[color-mix(in_srgb,var(--neon-green)_8%,transparent)]'
              : `${border} ${txt}`
          }`}
          style={mono}
        >
          {adBlock ? <Shield size={11} /> : <ShieldOff size={11} />}
          {adBlock ? 'ADBLOCK ON' : 'ADBLOCK OFF'}
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--neon-green)' }} />
          <span className={`text-[0.5rem] tracking-widest ${txt}`} style={mono}>STREAM ACTIVE</span>
        </div>
      </div>

      {/* Player */}
      <div className="player-container">
        {loading ? (
          <div className={`flex h-[540px] items-center justify-center ${bg}`}>
            <div className="h-8 w-8 border-2 rounded-full animate-spin"
              style={{ borderColor: 'var(--neon-pink)', borderTopColor: 'transparent' }} />
          </div>
        ) : (
          <iframe
            key={`${server}-${id}-${ep}`}
            src={src}
            width="100%"
            height="540"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            className="block"
            referrerPolicy="no-referrer"
            {...(adBlock ? {
              sandbox: 'allow-scripts allow-same-origin allow-forms allow-presentation allow-top-navigation-by-user-activation'
            } : {})}
          />
        )}
      </div>

      {/* Info */}
      <p className={`text-[0.5rem] tracking-widest ${txt}`} style={mono}>
        NODE: {current.label} · EP: {ep} · ADBLOCK: {adBlock ? 'ON ✓' : 'OFF'}
      </p>
    </div>
  );
}
