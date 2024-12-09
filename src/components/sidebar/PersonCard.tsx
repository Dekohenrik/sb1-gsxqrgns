import React, { useState } from 'react';
import { Person } from '../../types/Person';
import { NATIONALITIES } from '../../types/Nationality';
import { LANGUAGES } from '../../types/Language';

interface PersonCardProps {
  person: Person;
  onUpdate: (person: Person) => void;
  onRemove: (id: string) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPerson, setEditedPerson] = useState(person);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedPerson);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPerson(person);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={editedPerson.name}
              onChange={(e) => setEditedPerson({ ...editedPerson, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={editedPerson.email || ''}
              onChange={(e) => setEditedPerson({ ...editedPerson, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={editedPerson.phone || ''}
              onChange={(e) => setEditedPerson({ ...editedPerson, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              value={editedPerson.role || ''}
              onChange={(e) => setEditedPerson({ ...editedPerson, role: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Birthday</label>
            <input
              type="date"
              value={editedPerson.birthday || ''}
              onChange={(e) => setEditedPerson({ ...editedPerson, birthday: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="color"
              value={editedPerson.color}
              onChange={(e) => setEditedPerson({ ...editedPerson, color: e.target.value })}
              className="mt-1 block w-full h-8 rounded-md border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nationality</label>
            <select
              value={editedPerson.nationality || ''}
              onChange={(e) => setEditedPerson({ ...editedPerson, nationality: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select nationality...</option>
              {NATIONALITIES.map(nationality => (
                <option key={nationality.code} value={nationality.code}>
                  {nationality.flag} {nationality.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
            <select
              value={editedPerson.language || ''}
              onChange={(e) => setEditedPerson({ ...editedPerson, language: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select language...</option>
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium" style={{ color: person.color }}>
              {person.name}
              {person.nationality && (
                <span className="ml-2">
                  {NATIONALITIES.find(n => n.code === person.nationality)?.flag}
                </span>
              )}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onRemove(person.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
          {person.role && (
            <p className="text-sm text-gray-600 mb-1">Role: {person.role}</p>
          )}
          {person.email && (
            <p className="text-sm text-gray-600 mb-1">Email: {person.email}</p>
          )}
          {person.phone && (
            <p className="text-sm text-gray-600 mb-1">Phone: {person.phone}</p>
          )}
          {person.birthday && (
            <p className="text-sm text-gray-600 mb-1">Birthday: {person.birthday}</p>
          )}
          {person.nationality && (
            <p className="text-sm text-gray-600 mb-1">
              Nationality: {NATIONALITIES.find(n => n.code === person.nationality)?.name}
            </p>
          )}
          {person.language && (
            <p className="text-sm text-gray-600 mb-1">
              Language: {LANGUAGES.find(l => l.code === person.language)?.name}
            </p>
          )}
        </div>
      )}
    </div>
  );
};