'use client';
import { useAthleteStore } from '@/app/lib/athleteStore';
import { Athlete } from '@/app/models/athlete';
import { useEffect, useState } from 'react';

export default function SelectAthlete({ athletes }: { athletes: Athlete[] }) {
  const { changeAthlete, athlete } = useAthleteStore();
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(athlete);
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    if (athlete && athlete.name === '') {
      const athleteFromList = athletes.find((a) => a.id === athlete.id);
      if (athleteFromList) {
        setSelectedAthlete(athleteFromList);
        changeAthlete(athleteFromList);
      }
    }
  }, [athlete, athletes]);

  if (showSelect) {
    return (
      <select className="select" value={athlete?.id} onChange={(e) => {
        const selectedAthlete = athletes.find((a) => a.id === e.target.value);
        if (selectedAthlete) {
          changeAthlete(selectedAthlete);
          setSelectedAthlete(selectedAthlete);
          setShowSelect(false);
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
    return (<div className="flex flex-col gap-4" onClick={() => setShowSelect(true)}>
      {selectedAthlete?.name}
    </div>);
  }

}