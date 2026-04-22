'use client';
import { Training } from '@/app/models/training';
import Button from '../button/button';
import { useAthleteStore } from '@/app/lib/athleteStore';
import { useEffect, useState } from 'react';
import { RecordType } from '@/app/models/recordType';
import { getRecord } from '@/app/lib/firebase/firestore';
import { Template } from '@/app/models/template';
import { handleTrainingSave } from './actions';
import { FaEdit } from 'react-icons/fa';
import { Modal } from '../modal/modal';

interface AddTrainingProps {
  selectedDate?: Date;
  training?: Training;
  initialTrainingTypes: RecordType[];
}

export function AddTraining({ selectedDate, training, initialTrainingTypes }: AddTrainingProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const { athlete } = useAthleteStore();
  const [trainingTypes, setTrainingTypes] = useState<RecordType[]>(initialTrainingTypes);

  useEffect(() => {
    if (athlete?.template) {
      getRecord<Template>('templates', athlete.template, (data) => {
        if (data) {
          setTrainingTypes(initialTrainingTypes.filter((it) => data.types.includes(it.id!)));
        }
      });
    }
  }, [athlete, initialTrainingTypes]);

  return (
    <>
      {!training ? (
        <Button onClick={handleOpen}>Lisää harjoitus</Button>
      ) : <Button onClick={handleOpen}>
        <FaEdit></FaEdit>
      </Button>}
      <Modal isOpen={isOpen}>
        <h3 className="text-2xl font-bold text-gray-900">{training ? 'Muokkaa harjoitusta' : 'Lisää harjoitus'}</h3>
        <div className="mt-2 px-7 py-3">
          <form action={handleTrainingSave} onSubmit={() => {
            handleClose();
          }}>
            <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>✕</div>
            <div className="mb-4">
              <label htmlFor="trainingDate" className="block text-sm font-medium text-gray-700">
                Päivämäärä
              </label>
              <input
                type="date"
                id="trainingDate"
                name="trainingDate"
                defaultValue={(selectedDate || new Date()).toISOString().split('T')[0]}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="trainingType" className="block text-sm font-medium text-gray-700">
                Laji
              </label>
              <select id="trainingType" name="trainingType"
                defaultValue={training?.type ?? ''}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Valitse laji</option>
                {trainingTypes.map((type) => (
                  <option key={type.key} value={type.key}>
                    {type.name_fi}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Kesto (min)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                defaultValue={training?.duration ?? ''}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Kuvaus
              </label>
              <textarea
                id="desc"
                name="desc"
                rows={3}
                defaultValue={training?.desc ?? ''}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            {athlete && <input type="hidden" name="athlete" value={athlete.id} />}
            {training && <input type="hidden" name="id" value={training.id} />}
            <div className="modal-action">
              <button type="submit" value="confirm" className="btn btn-primary">
                Tallenna
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}