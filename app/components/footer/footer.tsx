import { User } from 'firebase/auth';
import Link from 'next/link';

interface FooterProps {
  initialUser: User | null;
}

export default function Footer({ initialUser }: FooterProps) {
  return (
    <footer className="p-4 bg-gray-100 text-center">
      {initialUser && (
        <nav className="flex items-center justify-center gap-4 mt-1 mb-4">
          <Link className="flex h-12 w-30 items-center justify-center rounded-full border border-solid btn bg-white" href="/">
            Koti
          </Link>
          <Link
            className="flex h-12 w-30 items-center justify-center rounded-full border border-solid btn bg-white"
            href="/records"
          >
            Ennätykset
          </Link>
          <Link
            className="flex h-12 w-30 items-center justify-center rounded-full border border-solid btn bg-white"
            href="/history"
          >
            Historia
          </Link>
        </nav>)}
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Harjoituspäiväkirja. All rights reserved.
      </p>
    </footer>
  );
}