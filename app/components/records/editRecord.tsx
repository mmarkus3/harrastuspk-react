'use client';
import { Record } from '@/app/models/record';
import Button from '../button/button';
import { handleRecordUpdate } from '@/app/records/actions';
import { FaPenSquare } from 'react-icons/fa';
import { useState } from 'react';
import { Modal } from '../modal/modal';

export default function EditRecord({ record }: { record: Record }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const history = record?.history == undefined ? [{ date: record.date, value: record.value }] : [...record.history, { date: record.date, value: record.value }];
  const updateWithHistory = handleRecordUpdate.bind(null, history)

  return (
    <>
      <Button onClick={handleOpen}>
        <FaPenSquare />
      </Button>
      <Modal isOpen={isOpen}>
        <h3 className="text-2xl font-bold text-gray-900">Muokkaa ennätys</h3>
        <div className="mt-2 px-7 py-3">
          <form action={updateWithHistory} onSubmit={handleClose}>
            <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>✕</div>
            <div className="mb-4">
              <label htmlFor="recordType" className="block text-sm font-medium text-gray-700">
                Laji
              </label>
              <input
                type="text"
                disabled={true}
                name="recordType"
                id="recordType"
                value={record.name ?? record.type}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="recordValue" className="block text-sm font-medium text-gray-700">
                Ennätys
              </label>
              <input
                type="text"
                name="recordValue"
                id="recordValue"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Syötä ennätys"
                defaultValue={record.value}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="recordDate" className="block text-sm font-medium text-gray-700">
                Päivämäärä
              </label>
              <input
                type="date"
                name="recordDate"
                id="recordDate"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
            <input type="hidden" name="athlete" value={record.athlete || undefined} />
            <input type="hidden" name="id" value={record.id || undefined} />
            <input type="hidden" name="history" value={JSON.stringify(history)} />
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