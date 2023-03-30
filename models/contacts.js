const fs = require('fs/promises');
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('models', 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contactById = contacts.filter(contact => contact.id === contactId);

  return contactById;
};

const removeContact = async (contactId) => { 
  if (!contactId) { 
    return; 
  } 
  const data = await listContacts(); 
  const findIndexId = data.findIndex((item) => item.id === contactId); 
  if (findIndexId === -1) { 
    return; 
  } 
  const removedContact = data[findIndexId]; 
  data.splice(findIndexId, 1); 
  await fs.writeFile(contactsPath, JSON.stringify(data)); 
  return removedContact; 
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };

  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], name, email, phone };

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};