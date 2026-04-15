import { getList } from '@/app/lib/firebase/firestore';
import { getAuthenticatedAppForUser } from '@/app/lib/firebase/serverApp';
import { Athlete } from '@/app/models/athlete';
import { getFirestore, where } from "firebase/firestore";

export const dynamic = "force-dynamic";

export default async function Athletes() {
  const { firebaseServerApp, currentUser } = await getAuthenticatedAppForUser();
  const queryConstraints = [where('users', 'array-contains', currentUser.email)];
  const athletes = await getList<Athlete>('athletes', getFirestore(firebaseServerApp), queryConstraints);

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Urheilijat</h3>
        <select defaultValue="Valitse urheilija" className="select">
          <option disabled={true}>Valitse urheilija</option>
          {athletes.map((athlete) => (
            <option key={athlete.id} value={athlete.id}>
              {athlete.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}