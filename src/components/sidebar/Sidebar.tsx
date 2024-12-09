import React, { useState } from 'react';
import { PersonCard } from './PersonCard';
import { CalendarTitle } from './CalendarTitle';
import { useCalendar } from '../../context/CalendarContext';
import { AddPersonForm } from './AddPersonForm';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { people, updatePerson, removePerson } = useCalendar();
  const [isAddingPerson, setIsAddingPerson] = useState(false);

  return (
    <div 
      className={`fixed top-0 left-0 h-screen w-80 bg-gray-50 p-4 transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="mt-16">
        <CalendarTitle />
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Team Members</h2>
          <button
            onClick={() => setIsAddingPerson(true)}
            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Person
          </button>
        </div>
        <div className="space-y-4">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onUpdate={updatePerson}
              onRemove={removePerson}
            />
          ))}
        </div>
        <AddPersonForm
          isOpen={isAddingPerson}
          onClose={() => setIsAddingPerson(false)}
        />
      </div>
    </div>
  );
};