'use client';
import { useEffect, useState } from 'react';
import { useAthleteStore } from '../lib/athleteStore';
import { Training } from '../models/training';
import { RecordType } from '../models/recordType';
import { getSnapshotList } from '../lib/firebase/firestore';
import { where } from 'firebase/firestore';
import { endOfWeek, parse, startOfWeek, compareAsc } from 'date-fns';
import { SelectWeek } from '../components/date/selectWeek';
import Button from '../components/button/button';
import { FaCircleCheck } from 'react-icons/fa6';
import { handleTrainingDone } from '../components/trainings/actions';

export default function Page() {
  const { athlete } = useAthleteStore();
  const [selectedWeek, setSelectedWeek] = useState<[Date, Date]>([startOfWeek(new Date(), { weekStartsOn: 1 }), endOfWeek(new Date(), { weekStartsOn: 1 })]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [trainingTypes, setTrainingTypes] = useState<RecordType[]>([]);
  const [summary, setSummary] = useState<number>(0);

  function handleWeekChange(value: string) {
    const [year, weekWithW] = value.split('-');
    const week = weekWithW.replace('W', '');
    const startDate = parse(week, 'I', new Date());
    startDate.setFullYear(+year);
    const endDate = endOfWeek(startDate, { weekStartsOn: 1 });
    setSelectedWeek([startDate, endDate]);
  }

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
      const [start, end] = selectedWeek;
      const queryConstraints = [where('athlete', '==', athlete?.id), where('deleted', '!=', true)];
      return getSnapshotList<Training>('items',
        (data) => {
          const trainings = data.filter((it) => it.date >= start && it.date <= end);
          const summary = trainings.filter((it) => it.done).reduce((prev, curr) => prev + (curr.duration ?? 0), 0);
          setSummary(summary);
          setTrainings(trainings.map((record) => {
            const trainingType = trainingTypes.find((type) => type.key === record.type);
            return {
              ...record,
              name: trainingType ? trainingType.name_fi : record.type,
            }
          }).sort((a, b) => compareAsc(a.date, b.date)));
        },
        queryConstraints);
    }
  }, [athlete, selectedWeek, trainingTypes]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center py-16 px-8 bg-white dark:bg-black sm:items-start">
        <div className="w-full flex justify-between">
          <h3 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Historia
          </h3>
          <SelectWeek date={new Date()} onChange={handleWeekChange} />
        </div>
        {trainings.length > 0 ? (
          <>
            <ul className="list bg-base-100 rounded-box shadow-md w-full">
              {trainings.map((training) => (
                <li key={training.id} className="list-row">
                  <div className="text-xl font-thin opacity-30 tabular-nums">
                    {training.date.toLocaleDateString('fi')}
                  </div>
                  <div>
                    {training.name ?? training.type} ({training.duration} min)
                  </div>
                  <p className="list-col-wrap text-xs">
                    {training.desc ?? '-'}
                  </p>
                  <Button onClick={() => handleTrainingDone(training)} disabled={training.done} classNames={['btn-ghost']}>
                    {!training.done && <span className="text-green-500">Kuittaa</span>}
                    {training.done && <span>Kuitattu</span>}
                  </Button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-500">Tehtyjä harjoituksia yhteensä {summary} minuuttia.</p>
          </>
        ) : (
          <p className="mt-4 text-gray-500">Ei harjoituksia valitulla aikavälillä. Yritä valita toinen viikko.</p>
        )}
      </main>
    </div>
  );
}