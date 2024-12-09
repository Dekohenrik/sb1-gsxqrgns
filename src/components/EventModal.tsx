import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { CalendarEvent } from '../types/Event';
import { format, addHours } from 'date-fns';
import { PersonSelect } from './PersonSelect';
import { useCalendar } from '../context/CalendarContext';
import { EventParticipants } from './EventParticipants';

interface EventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (event: CalendarEvent) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose, onUpdate }) => {
  const { people } = useCalendar();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [personId, setPersonId] = useState('');
  const [participants, setParticipants] = useState(event?.participants || []);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setLocation(event.location || '');
      setDescription(event.description || '');
      setPersonId(event.personId || '');
      setParticipants(event.participants || []);
      setStart(format(new Date(event.start), "yyyy-MM-dd'T'HH:mm"));
      setEnd(format(new Date(event.end), "yyyy-MM-dd'T'HH:mm"));
    }
  }, [event]);

  if (!event) return null;

  const handleStartChange = (newStart: string) => {
    setStart(newStart);
    const startTime = new Date(newStart);
    setEnd(format(addHours(startTime, 1), "yyyy-MM-dd'T'HH:mm"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const person = people.find(p => p.id === personId);
    const updatedEvent: CalendarEvent = {
      ...event,
      title,
      location,
      description,
      start: new Date(start),
      end: new Date(end),
      personId,
      participants,
      backgroundColor: person?.color || event.backgroundColor,
    };
    onUpdate(updatedEvent);
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const assignedPerson = people.find(p => p.id === event.personId);

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Dialog.Title className="text-lg font-medium mb-4">Edit Event</Dialog.Title>
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
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              <Dialog.Title className="text-lg font-medium mb-4">{event.title}</Dialog.Title>
              <div className="space-y-4">
                {assignedPerson && (
                  <div>
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p>{assignedPerson.name}</p>
                  </div>
                )}
                {event.participants && event.participants.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500">Participants</p>
                    <div className="space-y-1 mt-1">
                      {event.participants.map(participant => (
                        <div key={participant.id} className="flex items-center text-sm">
                          <span className="font-medium">{participant.name}</span>
                          {participant.email && (
                            <span className="text-gray-500 ml-2">({participant.email})</span>
                          )}
                          <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-gray-200">
                            {participant.type === 'team' ? 'Team' : 'External'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {event.location && (
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>{event.location}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Start Time</p>
                  <p>{format(new Date(event.start), 'PPpp')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Time</p>
                  <p>{format(new Date(event.end), 'PPpp')}</p>
                </div>
                {event.description && (
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p>{event.description}</p>
                  </div>
                )}
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Edit Event
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};