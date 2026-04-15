'use client';
import { useUser } from '@/app/lib/getUser';

export default function Home() {
  const user = useUser();

  return user ? (
    <div className="home">
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">Harjoituspäiväkirja</h1>
      <p>Tervetuloa harjoituspäiväkirjaan! Kirjaa ylös harjoituksesi ja seuraa edistymistäsi.</p>
    </div>
  ) : (
    <div className="home">
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">Harjoituspäiväkirja</h1>
      <p>Et ole kirjautunut sisään. Kirjaudu sisään nähdäksesi harjoituspäiväkirjan.</p>
    </div>
  );
}