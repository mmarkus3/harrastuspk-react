'use client';
import { useAthleteStore } from '@/app/lib/athleteStore';
import { Athlete } from '@/app/models/athlete';
import { useEffect, useState } from 'react';

export default function SelectAthlete({ athletes }: { athletes: Athlete[] }) {
  const { changeAthlete, athlete } = useAthleteStore();
  const [showSelect, setShowSelect] = useState(false);
  const isShowVisible = athlete == null || showSelect;

  useEffect(() => {
    if (athlete && athlete.name === '') {
      const athleteFromList = athletes.find((a) => a.id === athlete.id);
      if (athleteFromList) {
        changeAthlete(athleteFromList);
      }
    }
    if (athlete == null && athletes?.length > 0) {
      changeAthlete(athletes[0]);
    }
  }, [athlete, athletes, changeAthlete]);

  if (isShowVisible) {
    return (
      <select className="select" value={athlete?.id} onChange={(e) => {
        const selectedAthlete = athletes.find((a) => a.id === e.target.value);
        if (selectedAthlete) {
          changeAthlete(selectedAthlete);
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
      {athlete?.name}
    </div>);
  }

}