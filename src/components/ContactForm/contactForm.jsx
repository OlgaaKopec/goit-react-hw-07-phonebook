import { useState } from 'react';
import PropTypes from 'prop-types';
import './contactForm.css';

export const ContactForm = ({ onAddContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onAddContacts(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        Name:
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+((['\s\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
        />
      </label>
      <label>
        Number:
        <input
          type="tel"
          name="number"
          pattern="^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$"
          title="Please use given format: +459-12-56"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContacts: PropTypes.func.isRequired,}