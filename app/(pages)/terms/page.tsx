import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const sections = [
  { title: 'ACCEPTANCE OF TERMS', content: 'By accessing DemonLord, you agree to these Terms of Service. If you do not agree, do not use the site. We reserve the right to modify these terms at any time.' },
  { title: 'USE OF SERVICE', content: 'DemonLord is provided for personal, non-commercial use only. You may not use this service for any illegal purpose. You are responsible for compliance with all applicable laws in your jurisdiction.' },
  { title: 'CONTENT DISCLAIMER', content: 'DemonLord does not host, upload, or own any media content. We aggregate links to streams from third-party sources. We make no representations about the accuracy, legality, or quality of third-party content.' },
  { title: 'INTELLECTUAL PROPERTY', content: 'The DemonLord interface, codebase, and design are open source. Media content displayed through the service belongs to their respective copyright holders. We do not claim ownership over any third-party media.' },
  { title: 'LIMITATION OF LIABILITY', content: 'DemonLord is provided "as is" without any warranty. We are not liable for any damages arising from your use of the service, including but not limited to direct, indirect, incidental, or consequential damages.' },
  { title: 'TERMINATION', content: 'We reserve the right to terminate or suspend access to our service at any time, without prior notice or liability.' },
  { title: 'GOVERNING LAW', content: 'These terms shall be governed by applicable law. Any disputes shall be resolved through good-faith negotiation before legal action.' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto space-y-10">
      <div className="space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 text-[0.6rem] tracking-widest text-white/30 hover:text-[#00D4FF] transition-colors"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          <ArrowLeft size={10} /> BACK
        </Link>
        <div>
          <p className="text-[0.55rem] tracking-[0.3em] text-[#00D4FF]/60 mb-1" style={{ fontFamily: 'Share Tech Mono, monospace' }}>DEMONLORD // LEGAL</p>
          <h1 className="text-3xl font-black tracking-[0.12em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>TERMS OF SERVICE</h1>
          <p className="text-[0.6rem] tracking-widest text-white/30 mt-1" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            LAST UPDATED: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
          </p>
        </div>
        <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, #00D4FF44, transparent)' }} />
      </div>
      <div className="space-y-8">
        {sections.map(s => (
          <div key={s.title} className="space-y-2">
            <h2 className="text-sm font-black tracking-[0.15em] uppercase flex items-center gap-2"
              style={{ fontFamily: 'Orbitron, monospace' }}>
              <span className="text-[#00D4FF]">//</span> {s.title}
            </h2>
            <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
