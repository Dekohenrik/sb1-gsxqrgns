export interface EventParticipant {
  id: string;
  name: string;
  type: 'team' | 'external';
  email?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  backgroundColor?: string;
  personId?: string;
  participants: EventParticipant[];
}