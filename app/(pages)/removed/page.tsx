import Link from 'next/link';
import { ShieldOff } from 'lucide-react';

export default function Removed() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 85% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 60%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative z-10 mx-auto max-w-xl space-y-6 px-6 text-center">
        <div className="flex justify-center">
          <div className="border border-[hsl(0_85%_60%/0.4)] p-4">
            <ShieldOff size={32} className="text-[hsl(0_85%_60%)]" />
          </div>
        </div>
        <div>
          <h1
            className="mb-2 text-3xl font-black tracking-[0.1em] uppercase"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            DMCA TAKEDOWN
          </h1>
          <p
            className="text-[0.6rem] tracking-widest text-[hsl(0_85%_60%)] uppercase"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            CONTENT REMOVED — NODE OFFLINE
          </p>
        </div>
        <p
          className="text-muted-foreground text-sm leading-relaxed"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          This content has been removed in compliance with a DMCA takedown request. Under the
          Digital Millennium Copyright Act, we are required to remove content upon valid copyright
          complaints.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/">
            <button className="btn-neon">HOME BASE</button>
          </Link>
          <Link href="/list/mtv">
            <button
              className="text-muted-foreground hover:border-muted-foreground border border-[hsl(var(--border))] px-5 py-2 text-[0.65rem] tracking-widest transition-colors"
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              OTHER NODES
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
