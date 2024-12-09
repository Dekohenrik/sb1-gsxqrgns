import React, { useState } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { EventParticipant } from '../types/Event';

interface EventParticipantsProps {
  participants: EventParticipant[];
  onChange: (participants: EventParticipant[]) => void;
}

export const EventParticipants: React.FC<EventParticipantsProps> = ({ participants, onChange }) => {
  const { people } = useCalendar();
  const [newExternalName, setNewExternalName] = useState('');
  const [newExternalEmail, setNewExternalEmail] = useState('');
  const [showExternalForm, setShowExternalForm] = useState(false);

  const handleTeamMemberAdd = (personId: string) => {
    const person = people.find(p => p.id === personId);
    if (!person) return;

    const newParticipant: EventParticipant = {
      id: personId,
      name: person.name,
      type: 'team',
      email: person.email
    };

    if (!participants.some(p => p.id === personId)) {
      onChange([...participants, newParticipant]);
    }
  };

  const handleExternalAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExternalName) return;

    const newParticipant: EventParticipant = {
      id: `ext-${Date.now()}`,
      name: newExternalName,
      type: 'external',
      email: newExternalEmail || undefined
    };

    onChange([...participants, newParticipant]);
    setNewExternalName('');
    setNewExternalEmail('');
    setShowExternalForm(false);
  };

  const handleRemove = (participantId: string) => {
    onChange(participants.filter(p => p.id !== participantId));
  };

  const availableTeamMembers = people.filter(
    person => !participants.some(p => p.id === person.id)
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
        {participants.length > 0 && (
          <div className="mb-3 space-y-2">
            {participants.map(participant => (
              <div key={participant.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span className="font-medium">{participant.name}</span>
                  {participant.email && (
                    <span className="text-sm text-gray-500 ml-2">({participant.email})</span>
                  )}
                  <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-gray-200">
                    {participant.type === 'team' ? 'Team' : 'External'}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(participant.id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {availableTeamMembers.length > 0 && (
            <div>
              <select
                onChange={(e) => handleTeamMemberAdd(e.target.value)}
                value=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Add team member...</option>
                {availableTeamMembers.map(person => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!showExternalForm ? (
            <button
              type="button"
              onClick={() => setShowExternalForm(true)}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              + Add External Participant
            </button>
          ) : (
            <form onSubmit={handleExternalAdd} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={newExternalName}
                  onChange={(e) => setNewExternalName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={newExternalEmail}
                  onChange={(e) => setNewExternalEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowExternalForm(false)}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};