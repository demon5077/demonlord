'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/firebase/auth-context';
import AuthModal from '@/components/auth-modal';
import { LogIn, LogOut, User } from 'lucide-react';
import Image from 'next/image';

export default function NavUserClient() {
  const { user, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      {user ? (
        <div className="flex items-center gap-2 px-2">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="avatar"
              width={24}
              height={24}
              className="rounded-full border border-[#FF006F]/30"
            />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center border border-[#FF006F]/30">
              <User size={12} style={{ color: '#FF006F' }} />
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col leading-none">
            <span
              className="truncate text-xs text-white/60"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {user.displayName || user.email?.split('@')[0] || 'User'}
            </span>
            <span
              className="text-[0.45rem] tracking-widest text-white/25"
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              AUTHENTICATED
            </span>
          </div>
          <button
            onClick={signOut}
            className="p-1 text-white/20 transition-colors hover:text-[#FF006F]"
          >
            <LogOut size={12} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAuthOpen(true)}
          className="flex w-full items-center gap-2 border border-white/8 px-3 py-2 transition-colors hover:border-[#FF006F]/40"
        >
          <LogIn size={13} className="text-white/30" />
          <span
            className="text-[0.6rem] tracking-widest text-white/30 hover:text-white/60"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            SIGN IN
          </span>
        </button>
      )}
    </>
  );
}
