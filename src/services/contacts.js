import { ContactCollection } from "../db/models/contact.js";

export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const createContact = async (payload) => {
  const contacts = await ContactCollection.create(payload);
  return contacts;
};



export const patchContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(
        {
            _id: contactId,
        },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;
    return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
