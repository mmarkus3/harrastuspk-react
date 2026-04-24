'use client';
import { ChangeEvent, useState } from 'react';
import Button from '../button/button';
import { Modal } from '../modal/modal';
import { RecordType } from '@/app/models/recordType';
import { FaTrash } from 'react-icons/fa';
import { Template } from '@/app/models/template';
import { useUser } from '@/app/lib/getUser';
import { handleTemplateSave } from './actions';

export function AddTemplate({ trainingTypes }: { trainingTypes: RecordType[] }) {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<RecordType[]>([]);
  const user = useUser();

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    const newTemplate: Template = {
      id: undefined,
      name,
      types: selectedTypes.map((it) => it.id!),
      author: user!.uid,
    }
    handleTemplateSave(newTemplate);
    handleClose();
  }

  const handleTrainingSelection = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const type = trainingTypes.find((it) => it.id === e.target.value);
    if (type) {
      setSelectedTypes([...selectedTypes, type]);
      (document.getElementById("templateTraining") as HTMLSelectElement).selectedIndex = 0;
    }
  }

  const handleTrainingDelete = (id: string) => {
    setSelectedTypes(selectedTypes.filter((it) => it.id !== id));
  }

  return (
    <>
      <Button type="button" onClick={handleOpen}>
        Uusi pohja
      </Button>
      <Modal isOpen={isOpen}>
        <h3 className="text-2xl font-bold text-gray-900">Uusi mallipohja</h3>
        <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>✕</div>
        <div>
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Nimi
            </label>
            <input
              type="text"
              id="templateName"
              name="templateName"
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="templateTraining" className="block text-sm font-medium text-gray-700">
              Harjoitus
            </label>
            <select id="templateTraining" name="templateTraining"
              onChange={handleTrainingSelection}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">Valitse harjoitus</option>
              {trainingTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name_fi}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <ul>
              {selectedTypes.map((type) => (<li key={type.id} className="flex justify-between mt-1 mb-2">
                {type.name_fi}
                <FaTrash onClick={() => handleTrainingDelete(type.id!)}></FaTrash>
              </li>))}
            </ul>
          </div>
          <div className="modal-action">
            <Button type="button" classNames={["btn-primary"]} onClick={handleSave}>
              Tallenna
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}