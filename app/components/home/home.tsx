import Athletes from '../athletes/athletes';
import { getAuthenticatedAppForUser } from '@/app/lib/firebase/serverApp';

export default async function Home() {
  const { currentUser } = await getAuthenticatedAppForUser();

  return currentUser ? (
    <>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">Harjoituspäiväkirja</h1>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">

          <p>Tervetuloa harjoituspäiväkirjaan! Kirjaa ylös harjoituksesi ja seuraa edistymistäsi.</p>
        </div>
      </div>
      <Athletes />
    </>
  ) : (
    <div className="home">
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">Harjoituspäiväkirja</h1>
      <p>Et ole kirjautunut sisään. Kirjaudu sisään nähdäksesi harjoituspäiväkirjan.</p>
    </div>
  );
}