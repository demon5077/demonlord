import Link from 'next/link';
import { Film, Tv, Antenna, BookOpen, ArrowRight } from 'lucide-react';

const sections = [
  { title: 'MOVIE & TV', desc: 'Alternative streaming sites for movies and television.', href: '/list/mtv', icon: Film, color: 'hsl(350 100% 58%)' },
  { title: 'ANIME', desc: 'Alternative anime streaming and download resources.', href: '/list/anime', icon: Antenna, color: 'hsl(280 100% 68%)' },
];

export default function List() {
  return (
    <div className="min-h-[80vh] p-6 space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-black tracking-[0.15em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>ARCHIVE</h1>
        <p className="text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          EXTERNAL RESOURCE DIRECTORY — FREE STREAMING NODES
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
        {sections.map(s => (
          <Link key={s.href} href={s.href}>
            <div
              className="group relative border border-[hsl(var(--border))] p-6 transition-all hover:border-current space-y-3"
              style={{ color: s.color, borderColor: `${s.color}22` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = s.color + '55'; (e.currentTarget as HTMLElement).style.background = s.color + '08'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = s.color + '22'; (e.currentTarget as HTMLElement).style.background = ''; }}
            >
              <s.icon size={24} />
              <div>
                <h2 className="font-black tracking-[0.15em] text-sm uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>{s.title}</h2>
                <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{s.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-[0.6rem] tracking-widest uppercase" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                ACCESS <ArrowRight size={10} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
