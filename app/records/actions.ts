import { saveRecord, updateRecord } from '../lib/firebase/firestore';
import { Record } from '../models/record';

export async function handleRecordSave(item: FormData) {
  const record: Partial<Record> = {
    type: item.get('recordType')?.toString(),
    value: item.get('recordValue')?.toString(),
    athlete: item.get('athlete')?.toString(),
  };
  if (!record.type || !record.value) {
    return;
  }
  await saveRecord('records', {
    type: record.type,
    value: record.value,
    athlete: record.athlete,
  });
}

export async function handleRecordUpdate(history: { date: Date; value: string }[], item: FormData) {
  const record: Partial<Record> = {
    id: item.get('id')?.toString(),
    type: item.get('recordType')?.toString(),
    value: item.get('recordValue')?.toString(),
    athlete: item.get('athlete')?.toString(),
    date: item.get('recordDate') ? new Date(item.get('recordDate')?.toString() ?? new Date()) : undefined,
    history: history ? history : [],
  };
  if (!record.value) {
    return;
  }
  await updateRecord('records', record.id!, {
    value: record.value,
    date: record.date,
    history: record.history,
  });
}