'use client';
import { where } from 'firebase/firestore';
import { getSnapshotList } from '../lib/firebase/firestore';
import { Record } from '../models/record';
import Records from '../components/records/records';
import { RecordType } from '../models/recordType';
import AddRecord from '../components/records/addRecord';
import { useEffect, useState } from 'react';
import { useAthleteStore } from '../lib/athleteStore';

export default function Page() {
  const [recordTypes, setRecordTypes] = useState<RecordType[]>([]);
  const [usableRecordTypes, setUsableRecordTypes] = useState<RecordType[]>([]);
  const [records, setRecords] = useState<Record[]>([]);

  const { athlete } = useAthleteStore();

  useEffect(() => {
    if (athlete) {
      return getSnapshotList<RecordType>('record-types',
        (data) => {
          setUsableRecordTypes(data);
          setRecordTypes(data);
        });
    }
  }, [athlete]);

  useEffect(() => {
    if (athlete && recordTypes.length > 0) {
      const queryConstraints = [where('athlete', '==', athlete?.id)];
      return getSnapshotList<Record>('records',
        (data) => (setRecords(data.map((record) => {
          const recordType = recordTypes.find((type) => type.key === record.type);
          if (recordType) {
            setUsableRecordTypes((prev) => prev.filter((type) => type.key !== recordType.key));
          }
          return {
            ...record,
            name: recordType ? recordType.name_fi : record.type,
          }
        }))),
        queryConstraints);
    }
  }, [athlete, recordTypes]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full items-center justify-between gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Ennätykset
          </h1>
          {athlete && <AddRecord recordTypes={usableRecordTypes} athlete={athlete.id} />}
        </div>
        <Records records={records} />
      </main>
    </div>
  );
}