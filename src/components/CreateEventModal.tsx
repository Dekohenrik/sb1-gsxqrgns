import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { CalendarEvent, EventParticipant } from '../types/Event';
import { format, addHours } from 'date-fns';
import { PersonSelect } from './PersonSelect';
import { useCalendar } from '../context/CalendarContext';
import { EventParticipants } from './EventParticipants';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  startDate: Date;
  endDate: Date;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  startDate,
  endDate,
}) => {
  const { people } = useCalendar();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [personId, setPersonId] = useState('');
  const [participants, setParticipants] = useState<EventParticipant[]>([]);
  const [start, setStart] = useState(format(startDate, "yyyy-MM-dd'T'HH:mm"));
  const [end, setEnd] = useState(format(endDate, "yyyy-MM-dd'T'HH:mm"));

  useEffect(() => {
    setStart(format(startDate, "yyyy-MM-dd'T'HH:mm"));
    setEnd(format(addHours(startDate, 1), "yyyy-MM-dd'T'HH:mm"));
  }, [startDate]);

  const handleStartChange = (newStart: string) => {
    setStart(newStart);
    const startTime = new Date(newStart);
    setEnd(format(addHours(startTime, 1), "yyyy-MM-dd'T'HH:mm"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const person = people.find(p => p.id === personId);
    const newEvent: CalendarEvent = {
      id: String(new Date().getTime()),
      title,
      start: new Date(start),
      end: new Date(end),
      location,
      description,
      backgroundColor: person?.color || '#3788d8',
      personId,
      participants
    };
    onSave(newEvent);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setLocation('');
    setDescription('');
    setPersonId('');
    setParticipants([]);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full">
          <Dialog.Title className="text-lg font-medium mb-4">Create New Event</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <PersonSelect value={personId} onChange={setPersonId} />
            <EventParticipants
              participants={participants}
              onChange={setParticipants}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => handleStartChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Create Event
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};