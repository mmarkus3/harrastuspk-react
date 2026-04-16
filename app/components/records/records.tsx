import { Record } from '@/app/models/record';

export default async function Records({ records }: { records: Record[] }) {
  return (<table className="table w-full">
    <thead>
      <tr>
        <th>Päivämäärä</th>
        <th>Laji</th>
        <th>Ennätys</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record) => (
        <tr key={record.id}>
          <td>{record.date.toLocaleDateString('fi-FI')}</td>
          <td>{record.name ?? record.type}</td>
          <td>{record.value}</td>
        </tr>
      ))}
    </tbody>
  </table>);
}