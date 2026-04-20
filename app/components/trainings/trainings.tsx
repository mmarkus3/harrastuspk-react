'use client';
import { Training } from '../../models/training';

import { useEffect, useState } from 'react';
import { SelectDate } from '../date/selectDate'
import { useAthleteStore } from '@/app/lib/athleteStore';
import { where } from 'firebase/firestore';
import { getSnapshotList } from '@/app/lib/firebase/firestore';
import { RecordType } from '@/app/models/recordType';
import { FaCircleCheck } from 'react-icons/fa6';
import Button from '../button/button';
import { handleTrainingDone } from './actions';

export default function Trainings() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [trainingTypes, setTrainingTypes] = useState<RecordType[]>([]);
  const { athlete } = useAthleteStore();

  useEffect(() => {
    if (athlete) {
      return getSnapshotList<RecordType>('training-types',
        (data) => {
          setTrainingTypes(data);
        });
    }
  }, [athlete]);

  useEffect(() => {
    if (athlete) {
      const queryConstraints = [where('athlete', '==', athlete?.id)];
      return getSnapshotList<Training>('items',
        (data) => (setTrainings(data.map((record) => {
          const trainingType = trainingTypes.find((type) => type.key === record.type);
          return {
            ...record,
            name: trainingType ? trainingType.name_fi : record.type,
          }
        }))),
        queryConstraints);
    }
  }, [athlete, selectedDate, trainingTypes]);

  return (
    <>
      <SelectDate date={selectedDate} onChange={setSelectedDate} />
      {trainings.filter((training) => training.date.toDateString() === selectedDate.toDateString()).length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Laji</th>
              <th>Kesto (min)</th>
              <th>Kuvaus</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trainings.filter((training) => training.date.toDateString() === selectedDate.toDateString()).map((training) => (
              <tr key={training.id}>
                <td>{training.name ?? training.type}</td>
                <td>{training.duration ?? '-'}</td>
                <td>{training.desc ?? '-'}</td>
                <td>
                  <Button onClick={() => handleTrainingDone(training)} disabled={training.done}>
                    {!training.done && <FaCircleCheck className="text-green-500"></FaCircleCheck>}
                    {training.done && <FaCircleCheck></FaCircleCheck>}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-gray-500">Ei harjoituksia valitulla päivällä. Yritä valita toinen päivä.</p>
      )}
    </>);
}