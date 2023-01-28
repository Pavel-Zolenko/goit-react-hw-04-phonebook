import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Toaster } from 'react-hot-toast';

import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Notification } from 'components/Notification/Notification';

import {
  Container,
  Title,
  SubTitle,
} from './App.styled';

const startData = [
  { id: nanoid(4), name: 'Arnold Schwarzenegger', number: '5558801' },
  { id: nanoid(4), name: 'Sylvester Stallone', number: '5558802' },
  { id: nanoid(4), name: 'Bruce Willis', number: '5558803' },
  { id: nanoid(4), name: 'Jason Statham', number: '5558804' },
];
const savedData = JSON.parse(localStorage.getItem('contacts'));

export const App = () => {
  const [contacts, setContacts] = useState(
    savedData ? savedData : startData
  );
  
  const [filter, setFilter] = useState('')

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])


const addContact = data => {
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase())
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      const newContact = {
        id: nanoid(4),
        name: data.name,
        number: data.number,
      };

      setContacts([...contacts, newContact]);
    }
  };

   const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

 
   const filterChange = event => {
    setFilter(event.currentTarget.value);
  };


   const normalizedFilter = filter.toLowerCase();
   const filteredContacts = contacts.filter(el =>
    el.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Container>
        <Toaster position="top-center" reverseOrder={false} />
        <Title>Phonebook</Title>
       <ContactForm onSubmit={addContact} />
      <SubTitle>Contacts</SubTitle>
       {filteredContacts.length > 0 || filter ? (
          <Filter value={filter} onChange={filterChange} />
        ) : (
          <Notification msg="No contacts added" />
        )}

        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </Container>
  )
}