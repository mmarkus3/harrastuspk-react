'use client'

import { useAthleteStore } from '@/app/lib/athleteStore';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { getCookie } from 'cookies-next';

interface FooterProps {
  initialUser: User | null;
}

export default function Footer({ initialUser }: FooterProps) {
  const { changeAthlete, athlete } = useAthleteStore();
  const selectedAthleteFromCookie = getCookie('__athlete');
  if (typeof selectedAthleteFromCookie === 'string') {
    const selectedAthleteId = selectedAthleteFromCookie ? selectedAthleteFromCookie : null;

    if (athlete === null && selectedAthleteId) {
      changeAthlete({ id: selectedAthleteId, name: '', users: [], date: new Date() });
    }
  }
  const pathname = usePathname();
  return (
    <footer className="p-4 bg-gray-100 text-center">
      {initialUser && (
        <nav className="dock">
          <Link href="/" className={`${pathname === '/' ? 'dock-active' : ''}`}>
            <span className="dock-label">Koti</span>
          </Link>
          {athlete && (
            <Link
              href="/records"
              className={`${pathname === '/records' ? 'dock-active' : ''}`}
            >
              <span className="dock-label">Ennätykset</span>
            </Link>
          )}
          {athlete && (<Link
            className={`${pathname === '/history' ? 'dock-active' : ''}`}
            href="/history"
          >
            <span className="dock-label">Historia</span>
          </Link>)}
        </nav>)}
    </footer>
  );
}