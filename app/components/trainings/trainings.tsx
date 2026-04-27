'use client';
import { Training } from '../../models/training';

import { useEffect, useState } from 'react';
import { SelectDate } from '../date/selectDate'
import { useAthleteStore } from '@/app/lib/athleteStore';
import { where } from 'firebase/firestore';
import { getSnapshotList } from '@/app/lib/firebase/firestore';
import { RecordType } from '@/app/models/recordType';
import { FaTrash } from 'react-icons/fa6';
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
        (data) => (setTrainings(data.filter((training) => training.date.toDateString() === selectedDate.toDateString()).map((record) => {
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
      {trainings.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md">
          {trainings.map((training) => (
            <li key={training.id} className="list-row">
              <div className="text-xl font-thin opacity-30 tabular-nums">
                {training.duration ?? '-'}<br />min
              </div>
              <div>
                {training.name ?? training.type}
              </div>
              <p className="list-col-wrap text-xs">
                {training.desc ?? '-'}<br />
                <Button onClick={() => handleTrainingDone(training)} disabled={training.done} classNames={['btn-ghost']}>
                  {!training.done && <span className="text-green-500">Kuittaa</span>}
                  {training.done && <span>Kuitattu</span>}
                </Button>
              </p>
              <div className="flex flex-wrap max-w-20 justify-end">
                {!training.done && (
                  <AddTraining training={training} initialTrainingTypes={trainingTypes} selectedDate={training.date} classNames={['btn-ghost']} />
                )}
                {!training.done && (
                  <Button onClick={() => handleTrainingDelete(training)} classNames={['btn-ghost']}>
                    <FaTrash className="text-red-500"></FaTrash>
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-500">Ei harjoituksia valitulla päivällä. Yritä valita toinen päivä.</p>
      )}
    </>);
}