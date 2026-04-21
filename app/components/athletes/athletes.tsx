import { getSnapshotList } from '@/app/lib/firebase/firestore';
import { Athlete } from '@/app/models/athlete';
import { where } from "firebase/firestore";
import SelectAthlete from './selectAthlete';
import { useUser } from '@/app/lib/getUser';
import { useEffect, useState } from 'react';

export const dynamic = "force-dynamic";

export default function Athletes() {
  const user = useUser();
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    if (user) {
      const queryConstraints = [where('users', 'array-contains', user.email)];
      getSnapshotList<Athlete>('athletes', (items) => {
        setAthletes(items);
      }, queryConstraints);
    }
  }, [user]);

  return (
    <SelectAthlete athletes={athletes} />
  );
}