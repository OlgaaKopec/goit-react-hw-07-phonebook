import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://665edddc1e9017dc16f1cb57.mockapi.io/contacts/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axios.get(baseUrl);
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const response = await axios.post(baseUrl, contact);
  return response.data;
});

export const removeContact = createAsyncThunk('contacts/removeContact', async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
  return id;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        console.log('Contact added:', action.payload);
        state.push(action.payload);
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        return state.filter(contact => contact.id !== action.payload);
      });
  },
});

export default contactsSlice.reducer;