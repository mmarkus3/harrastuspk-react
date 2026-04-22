import { Record } from '@/app/models/record';
import EditRecord from './editRecord';

export default function Records({ records }: { records: Record[] }) {
  if (records.length === 0) {
    return <p className="mt-4 text-gray-500">Ei ennätyksiä</p>;
  }

  return (<table className="table w-full">
    <thead>
      <tr>
        <th>Päivämäärä</th>
        <th>Laji</th>
        <th>Ennätys</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {records.map((record) => (
        <tr key={record.id}>
          <td>{record.date.toLocaleDateString('fi-FI')}</td>
          <td>{record.name ?? record.type}</td>
          <td>{record.value}</td>
          <td><EditRecord record={record} key={record.id} /></td>
        </tr>
      ))}
    </tbody>
  </table>);
}