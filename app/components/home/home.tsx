import { getAuthenticatedAppForUser } from '@/app/lib/firebase/serverApp';
import Trainings from '../trainings/trainings';

export default async function Home() {
  const { currentUser } = await getAuthenticatedAppForUser();

  return currentUser ? (
    <>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">Harjoituspäiväkirja</h1>
      <p className="text-sm">Tervetuloa harjoituspäiväkirjaan! Kirjaa ylös harjoituksesi ja seuraa edistymistäsi.</p>
      <div className="py-16 px-8 bg-base-100 w-96 sm:w-full">
        <Trainings />
      </div>
    </>
  ) : (
    <div className="home">
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">Harjoituspäiväkirja</h1>
      <p>Et ole kirjautunut sisään. Kirjaudu sisään nähdäksesi harjoituspäiväkirjan.</p>
    </div>
  );
}