import { getWeek, getYear } from 'date-fns';
import { ChangeEvent, useState } from 'react';

export function SelectWeek({ date, onChange }: { date: Date; onChange: (week: string) => void }) {
  const [week, setWeek] = useState(`${getYear(date)}-W${getWeek(date)}`);

  const handleWeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    const weekValue = e.target.value;
    onChange(weekValue);
    setWeek(weekValue);
  };

  return (
    <div className="mb-4 w-40">
      <label htmlFor="week" className="block text-sm font-medium text-gray-700">
        Valitse viikko
      </label>
      <input
        type="week"
        id="week"
        name="week"
        value={week}
        onChange={handleWeekChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}