import { useState } from 'react';
import { CalendarEvent } from '../types/Event';

export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Sample Event',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 2)),
      backgroundColor: '#3788d8'
    }
  ]);

  const addEvent = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  return {
    events,
    addEvent,
    updateEvent
  };
};