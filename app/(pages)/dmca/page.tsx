import Link from 'next/link';
import { ArrowLeft, ShieldOff, AlertTriangle } from 'lucide-react';

export default function DmcaPage() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto space-y-10">
      <div className="space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 text-[0.6rem] tracking-widest text-white/30 hover:text-[#FF006F] transition-colors"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          <ArrowLeft size={10} /> BACK
        </Link>
        <div className="flex items-center gap-4">
          <div className="border border-[#F9F002]/30 p-3">
            <ShieldOff size={24} style={{ color: '#F9F002' }} />
          </div>
          <div>
            <p className="text-[0.55rem] tracking-[0.3em] text-[#F9F002]/60 mb-1" style={{ fontFamily: 'Share Tech Mono, monospace' }}>DEMONLORD // LEGAL</p>
            <h1 className="text-3xl font-black tracking-[0.12em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>DMCA POLICY</h1>
          </div>
        </div>
        <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, #F9F00244, transparent)' }} />
      </div>

      <div className="border border-[#F9F002]/20 p-5 space-y-2" style={{ background: 'rgba(249,240,2,0.03)' }}>
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} style={{ color: '#F9F002' }} />
          <span className="text-[0.6rem] tracking-widest text-[#F9F002]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>IMPORTANT NOTICE</span>
        </div>
        <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          DemonLord does not host, store, or upload any media files. We aggregate links to content hosted
          by third-party services. We respect the intellectual property rights of others.
        </p>
      </div>

      {[
        { title: 'FOR COPYRIGHT HOLDERS', content: 'If you believe content accessible through DemonLord infringes your copyright, please understand that we do not host this content. You should contact the actual hosting provider directly. However, if you wish to report a specific link or embed source, we will investigate and remove it promptly.' },
        { title: 'DMCA TAKEDOWN PROCEDURE', content: 'To submit a DMCA takedown notice, please include: (1) Identification of the copyrighted work claimed to be infringed. (2) Identification of the specific URL or content on DemonLord. (3) Your contact information. (4) A statement of good faith belief. (5) A statement of accuracy under penalty of perjury. (6) Your electronic or physical signature.' },
        { title: 'REPEAT INFRINGERS', content: 'DemonLord maintains a policy of removing access to content that is the subject of multiple legitimate DMCA notices. We will act expeditiously upon receiving valid takedown requests.' },
        { title: 'COUNTER-NOTIFICATIONS', content: 'If you believe content was removed in error, you may submit a counter-notification with the required information. We will restore removed content within 10-14 business days unless the complainant seeks a court order.' },
      ].map(s => (
        <div key={s.title} className="space-y-2">
          <h2 className="text-sm font-black tracking-[0.15em] uppercase flex items-center gap-2"
            style={{ fontFamily: 'Orbitron, monospace' }}>
            <span className="text-[#F9F002]">//</span> {s.title}
          </h2>
          <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{s.content}</p>
        </div>
      ))}
    </div>
  );
}
