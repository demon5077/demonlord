import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const sections = [
  { title: 'INFORMATION WE COLLECT', content: 'When you create an account, we collect your email address and display name via Firebase Authentication. If you sign in with Google, we receive your public Google profile (name, email, profile picture). We store this in Firebase Firestore. We do not collect payment information.' },
  { title: 'HOW WE USE YOUR DATA', content: 'We use your information solely to maintain your account, save preferences such as watchlists and watch history, and send authentication emails when you request a password reset or magic link. We do not sell your data. We do not share it with third parties.' },
  { title: 'COOKIES & TRACKING', content: 'We use Firebase Authentication session cookies to keep you signed in. We may use Google Analytics (if configured) to understand aggregate usage patterns. You can disable cookies in your browser at any time.' },
  { title: 'THIRD-PARTY SERVICES', content: 'DemonLord integrates with TMDB, AniList, ScreenScape API, Crysoline API, and various embed providers to fetch content metadata and streams. These services have their own privacy policies. We do not control and are not responsible for their data practices.' },
  { title: 'DATA RETENTION', content: 'Your account data is retained until you request deletion. You may delete your account at any time via Settings. Upon deletion, your data is permanently removed from our Firebase database within 30 days.' },
  { title: 'CONTACT', content: 'For privacy concerns, please reach out via our DMCA page or GitHub repository.' },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto space-y-10">
      <div className="space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 text-[0.6rem] tracking-widest text-white/30 hover:text-[#FF006F] transition-colors"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          <ArrowLeft size={10} /> BACK
        </Link>
        <div>
          <p className="text-[0.55rem] tracking-[0.3em] text-[#FF006F]/60 mb-1" style={{ fontFamily: 'Share Tech Mono, monospace' }}>DEMONLORD // LEGAL</p>
          <h1 className="text-3xl font-black tracking-[0.12em] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>PRIVACY POLICY</h1>
          <p className="text-[0.6rem] tracking-widest text-white/30 mt-1" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            LAST UPDATED: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
          </p>
        </div>
        <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, #FF006F44, transparent)' }} />
      </div>
      <div className="space-y-8">
        {sections.map(s => (
          <div key={s.title} className="space-y-2">
            <h2 className="text-sm font-black tracking-[0.15em] uppercase flex items-center gap-2"
              style={{ fontFamily: 'Orbitron, monospace' }}>
              <span className="text-[#FF006F]">//</span> {s.title}
            </h2>
            <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
