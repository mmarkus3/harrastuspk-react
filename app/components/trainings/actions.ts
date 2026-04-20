import { updateRecord } from '@/app/lib/firebase/firestore';
import { Training } from '@/app/models/training';

export async function handleTrainingDone(item: Training) {
  await updateRecord('items', item.id!, { done: true });
}