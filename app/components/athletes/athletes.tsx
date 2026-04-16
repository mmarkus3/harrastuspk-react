import { getList } from '@/app/lib/firebase/firestore';
import { getAuthenticatedAppForUser } from '@/app/lib/firebase/serverApp';
import { Athlete } from '@/app/models/athlete';
import { getFirestore, where } from "firebase/firestore";
import SelectAthlete from './selectAthlete';

export const dynamic = "force-dynamic";

export default async function Athletes() {
  const { firebaseServerApp, currentUser } = await getAuthenticatedAppForUser();
  const queryConstraints = [where('users', 'array-contains', currentUser.email)];
  const athletes = await getList<Athlete>('athletes', getFirestore(firebaseServerApp), queryConstraints);

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Urheilijat</h3>
        <SelectAthlete athletes={athletes} />
      </div>
    </div>
  );
}