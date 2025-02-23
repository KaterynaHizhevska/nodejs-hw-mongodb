import createHttpError from 'http-errors';
import { getContactById, getAllContacts, createContact, patchContact, deleteContact } from '../services/contacts.js';

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const getAllContactsController = async (req, res, next) => {

    const contacts = await getAllContacts();
    res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const createContactController = async (req, res, next) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { contact } = await patchContact(contactId, req.body);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};


export const putContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { contact, isNew } = await patchContact(contactId, req.body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upsert a contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};


// fix
