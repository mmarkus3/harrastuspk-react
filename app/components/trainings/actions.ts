import { saveRecord, updateRecord } from '@/app/lib/firebase/firestore';
import { Training } from '@/app/models/training';

export async function handleTrainingDone(item: Training) {
  await updateRecord('items', item.id!, { done: true });
}

export async function handleTrainingDelete(item: Training) {
  await updateRecord('items', item.id!, { deleted: true });
}

export async function handleTrainingSave(data: FormData) {
  const training: Partial<Training> = {
    id: data.get('id')?.toString(),
    type: data.get('trainingType')?.toString(),
    desc: data.get('desc')?.toString(),
    duration: data.get('duration') ? parseInt(data.get('duration')!.toString()) : undefined,
    athlete: data.get('athlete')?.toString(),
    date: data.get('trainingDate') ? new Date(data.get('trainingDate')!.toString()) : undefined,
  };
  if (!training.type || !training.duration || !training.athlete || !training.date) {
    return;
  }
  if (training.id) {
    await updateRecord('items', training.id, {
      type: training.type,
      desc: training.desc,
      duration: training.duration,
      date: training.date,
    });
    return;
  }
  await saveRecord('items', {
    type: training.type,
    desc: training.desc,
    duration: training.duration,
    athlete: training.athlete,
    date: training.date,
    deleted: false,
    done: false,
  }, false);
}