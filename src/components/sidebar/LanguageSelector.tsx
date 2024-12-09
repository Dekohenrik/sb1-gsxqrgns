import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import { LANGUAGES } from '../../types/Language';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useCalendar();

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Calendar Language
      </label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as any)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};