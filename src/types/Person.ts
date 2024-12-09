import { Language } from './Language';

export interface Person {
  id: string;
  name: string;
  color: string;
  email?: string;
  phone?: string;
  role?: string;
  birthday?: string;
  nationality?: string;
  language?: Language;
}

export const INITIAL_PERSON: Person = {
  id: '1',
  name: 'Henrik',
  color: '#3788d8',
  role: 'Owner',
  nationality: 'dk',
  language: 'da'
};