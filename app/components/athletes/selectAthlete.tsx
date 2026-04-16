'use client';

import { useAthleteStore } from '@/app/lib/athleteStore';
import { Athlete } from '@/app/models/athlete';
import { useEffect, useState } from 'react';
import Button from '../button/button';

export default function SelectAthlete({ athletes }: { athletes: Athlete[] }) {
  const { changeAthlete, athlete } = useAthleteStore();
  const [showSelection, setShowSelection] = useState(true);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(athlete);

  useEffect(() => {
    if (athlete) {
      const athleteFromList = athletes.find((a) => a.id === athlete.id);
      if (athleteFromList) {
        setSelectedAthlete(athleteFromList);
      }
      setShowSelection(false);
    }
  }, [athlete, athletes]);

  if (showSelection) {
    return (
      <select className="select" value={athlete?.id} onChange={(e) => {
        const selectedAthlete = athletes.find((a) => a.id === e.target.value);
        if (selectedAthlete) {
          changeAthlete(selectedAthlete);
        }
      }}>
        <option key={undefined} disabled={true}>Valitse urheilija</option>
        {athletes.map((athlete) => (
          <option key={athlete.id} value={athlete.id}>
            {athlete.name}
          </option>
        ))}
      </select>);
  } else {
    return (<div className="flex flex-col gap-4">
      <p>Valittu urheilija: {selectedAthlete?.name}</p>
      <Button onClick={() => setShowSelection(true)}>
        Vaihda
      </Button>
    </div>);
  }

}