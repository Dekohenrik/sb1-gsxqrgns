import { useState } from 'react';
import { Person, PEOPLE } from '../types/Person';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>(PEOPLE);

  const updatePerson = (updatedPerson: Person) => {
    setPeople(people.map(person => 
      person.id === updatedPerson.id ? updatedPerson : person
    ));
  };

  return {
    people,
    updatePerson
  };
};