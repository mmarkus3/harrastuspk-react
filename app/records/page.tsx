import { getFirestore, where } from 'firebase/firestore';
import { getAuthenticatedAppForUser } from '../lib/firebase/serverApp';
import { getList } from '../lib/firebase/firestore';
import { Record } from '../models/record';
import { getAthleteFromCookie } from '../lib/cookieStore';
import Records from '../components/records/records';
import { RecordType } from '../models/recordType';

export default async function Page() {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const selectedAthlete = await getAthleteFromCookie();
  const queryConstraints = [where('athlete', '==', selectedAthlete)];
  const recordTypes = await getList<RecordType>('record-types', getFirestore(firebaseServerApp));
  const records = (await getList<Record>('records', getFirestore(firebaseServerApp), queryConstraints)).map((record) => {
    const recordType = recordTypes.find((type) => type.key === record.type);
    return {
      ...record,
      name: recordType ? recordType.name_fi : record.type,
    };
  });


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Ennätykset
        </h1>
        <Records records={records} />
      </main>
    </div>
  );
}