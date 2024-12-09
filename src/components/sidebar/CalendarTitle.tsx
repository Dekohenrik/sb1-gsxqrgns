import React, { useState } from 'react';
import { useCalendar } from '../../context/CalendarContext';

export const CalendarTitle: React.FC = () => {
  const { calendarTitle, setCalendarTitle } = useCalendar();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(calendarTitle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCalendarTitle(tempTitle);
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter calendar title"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setTempTitle(calendarTitle);
                setIsEditing(false);
              }}
              className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{calendarTitle}</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};