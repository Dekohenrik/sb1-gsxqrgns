import React from 'react';
import { useCalendar } from '../context/CalendarContext';

interface PersonSelectProps {
  value: string;
  onChange: (personId: string) => void;
}

export const PersonSelect: React.FC<PersonSelectProps> = ({ value, onChange }) => {
  const { people } = useCalendar();
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Assign To</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select a person</option>
        {people.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name}
          </option>
        ))}
      </select>
    </div>
  );
};