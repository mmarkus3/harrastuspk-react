'use client';
import { Training } from '../../models/training';

import { useEffect, useState } from 'react';
import { SelectDate } from '../date/selectDate'
import { useAthleteStore } from '@/app/lib/athleteStore';
import { where } from 'firebase/firestore';
import { getSnapshotList } from '@/app/lib/firebase/firestore';
import { RecordType } from '@/app/models/recordType';
import { FaCircleCheck, FaTrash } from 'react-icons/fa6';
import Button from '../button/button';
import { handleTrainingDelete, handleTrainingDone } from './actions';
import { AddTraining } from './addTraining';

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
      const queryConstraints = [where('athlete', '==', athlete?.id), where('deleted', '!=', true)];
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold mb-4">Harjoitukset</h3>
        <AddTraining selectedDate={selectedDate} initialTrainingTypes={trainingTypes} />
      </div>
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
                  <div className="md:flex gap-2">
                    <Button onClick={() => handleTrainingDone(training)} disabled={training.done}>
                      {!training.done && <FaCircleCheck className="text-green-500"></FaCircleCheck>}
                      {training.done && <span>Kuitattu</span>}
                    </Button>
                    {!training.done && (
                      <AddTraining training={training} initialTrainingTypes={trainingTypes} selectedDate={training.date} />
                    )}
                    {!training.done && (
                      <Button onClick={() => handleTrainingDelete(training)}>
                        <FaTrash className="text-red-500"></FaTrash>
                      </Button>
                    )}
                  </div>
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