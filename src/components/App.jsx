import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContactForm } from './ContactForm/contactForm.jsx';
import { Filter } from './Filter/filter.jsx';
import { ContactList } from './ContactList/contactList.jsx';
import { fetchContacts, addContact, removeContact } from './Redux/contactsSlice.js';
import { setFilter } from './Redux/filterSlice.js';
import './App.css';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const addNewContact = (name, number) => {
    const contactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (contactExists) {
      alert(`${name} is already in the phonebook.`);
    } else {
      dispatch(addContact({ name, number }));
    }
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleRemoveContact = (id) => {
    dispatch(removeContact(id));
  };

  return (
    <div className="appContainer">
      <h1>Phonebook</h1>
      <div>
        <ContactForm onAddContacts={addNewContact} />
      </div>
      <h2>Contacts</h2>
      <div>
        <Filter filterContact={filter} onFilterSearch={handleFilterChange} />
      </div>
      <div>
        <h3>Contact List</h3>
        <ContactList contacts={getFilteredContacts()} onRemoveContact={handleRemoveContact} />
      </div>
    </div>
  );
};