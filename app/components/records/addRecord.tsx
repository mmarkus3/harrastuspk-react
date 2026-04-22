'use client';
import Button from '../button/button';
import { RecordType } from '@/app/models/recordType';
import { handleRecordSave } from '@/app/records/actions';

export default function AddRecord({ recordTypes, athlete }: { recordTypes?: RecordType[], athlete?: string | null }) {
  const handleOpen = () => {
    const modal = document.getElementById('addRecordModal') as HTMLDialogElement;
    modal?.showModal();
  };

  const handleClose = () => {
    const modal = document.getElementById('addRecordModal') as HTMLDialogElement;
    modal?.close();
  };

  return (
    <>
      <Button onClick={handleOpen}>
        Lisää ennätys
      </Button>
      <dialog id="addRecordModal" className="modal">
        <div className="modal-box">
          <h3 className="text-2xl font-bold text-gray-900">Lisää ennätys</h3>
          <div className="mt-2 px-7 py-3">
            <form action={handleRecordSave} onSubmit={() => {
              handleClose();
            }}>
              <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>✕</div>
              <div className="mb-4">
                <label htmlFor="recordType" className="block text-sm font-medium text-gray-700">
                  Ennätystyyppi
                </label>
                <select id="recordType" name="recordType" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Valitse ennätystyyppi</option>
                  {recordTypes?.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.name_fi}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="recordValue" className="block text-sm font-medium text-gray-700">
                  Arvo
                </label>
                <input
                  type="text"
                  name="recordValue"
                  id="recordValue"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Syötä ennätysarvo"
                />
              </div>
              <input type="hidden" name="athlete" value={athlete || undefined} />
              <div className="modal-action">
                <button type="submit" value="confirm" className="btn btn-primary">
                  Tallenna
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}