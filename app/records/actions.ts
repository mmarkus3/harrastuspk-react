import { saveRecord } from '../lib/firebase/firestore';
import { Record } from '../models/record';

export async function handleRecordSave(item: Partial<Record>) {
  if (!item.type || !item.value) {
    return;
  }
  await saveRecord('records', {
    type: item.type,
    value: item.value,
    athlete: item.athlete,
  });
}