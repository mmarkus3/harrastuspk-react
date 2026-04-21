export function SelectDate({ date, onChange }: { date: Date; onChange: (date: Date) => void }) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    onChange(selectedDate);
  };

  return (
    <div className="mb-4 w-40">
      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
        Valitse päivä
      </label>
      <input
        type="date"
        id="date"
        name="date"
        value={date.toISOString().split('T')[0]}
        onChange={handleDateChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}