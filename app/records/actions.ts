import { saveRecord } from '../lib/firebase/firestore';
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