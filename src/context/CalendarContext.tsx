import React, { createContext, useContext, useState, useEffect } from 'react';
import { CalendarEvent } from '../types/Event';
import { Person, INITIAL_PERSON } from '../types/Person';
import { Language } from '../types/Language';
import { format } from 'date-fns';
import { da, enUS, enGB } from 'date-fns/locale';
import { NATIONALITIES } from '../types/Nationality';

interface CalendarContextType {
  events: CalendarEvent[];
  people: Person[];
  calendarTitle: string;
  language: Language;
  setLanguage: (lang: Language) => void;
  setCalendarTitle: (title: string) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  updatePerson: (person: Person) => void;
  addPerson: (person: Omit<Person, 'id'>) => void;
  removePerson: (id: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

const getLocale = (lang: Language) => {
  switch (lang) {
    case 'da': return da;
    case 'en-US': return enUS;
    default: return enGB;
  }
};

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [people, setPeople] = useState<Person[]>([INITIAL_PERSON]);
  const [calendarTitle, setCalendarTitle] = useState("Team Calendar");
  const [language, setLanguage] = useState<Language>('en');

  // Generate birthday events when people or their birthdays change
  useEffect(() => {
    const birthdayEvents = people
      .filter(person => person.birthday)
      .flatMap(person => {
        const currentYear = new Date().getFullYear();
        const birthDate = new Date(person.birthday!);
        const nationality = person.nationality;
        
        // Create birthday events for current year and next year
        return [currentYear, currentYear + 1].map(year => {
          const eventDate = new Date(year, birthDate.getMonth(), birthDate.getDate());
          const flag = nationality ? NATIONALITIES.find(n => n.code === nationality)?.flag : '';
          return {
            id: `birthday-${person.id}-${year}`,
            title: `${flag || '🎂'} ${person.name}'s Birthday`,
            start: eventDate,
            end: eventDate,
            backgroundColor: person.color,
            personId: person.id,
            participants: [],
            description: 'Birthday Celebration'
          };
        });
      });

    // Filter out existing birthday events and add new ones
    const nonBirthdayEvents = events.filter(event => !event.id.startsWith('birthday-'));
    setEvents([...nonBirthdayEvents, ...birthdayEvents]);
  }, [people]);

  const addEvent = (event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  };

  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const updatePerson = (updatedPerson: Person) => {
    setPeople(prev => prev.map(person => 
      person.id === updatedPerson.id ? updatedPerson : person
    ));
  };

  const addPerson = (personData: Omit<Person, 'id'>) => {
    const newPerson: Person = {
      ...personData,
      id: `person-${Date.now()}`
    };
    setPeople(prev => [...prev, newPerson]);
  };

  const removePerson = (id: string) => {
    setPeople(prev => prev.filter(person => person.id !== id));
  };

  return (
    <CalendarContext.Provider value={{
      events,
      people,
      calendarTitle,
      language,
      setLanguage,
      setCalendarTitle,
      addEvent,
      updateEvent,
      updatePerson,
      addPerson,
      removePerson,
    }}>
      {children}
    </CalendarContext.Provider>
  );
};