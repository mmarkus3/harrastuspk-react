'use client'

import { User } from 'firebase/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface FooterProps {
  initialUser: User | null;
}

export default function Footer({ initialUser }: FooterProps) {
  const pathname = usePathname()
  return (
    <footer className="p-4 bg-gray-100 text-center">
      {initialUser && (
        <nav className="dock">
          <Link href="/" className={`${pathname === '/' ? 'dock-active' : ''}`}>
            <span className="dock-label">Koti</span>
          </Link>
          <Link
            href="/records"
            className={`${pathname === '/records' ? 'dock-active' : ''}`}
          >
            <span className="dock-label">Ennätykset</span>
          </Link>
          <Link
            className={`${pathname === '/history' ? 'dock-active' : ''}`}
            href="/history"
          >
            <span className="dock-label">Historia</span>
          </Link>
        </nav>)}
    </footer>
  );
}